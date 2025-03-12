import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { auth, db } from "@/firebase";  
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const YogaTherapy = () => {
    const [problem, setProblem] = useState("");
    const [therapyPlan, setTherapyPlan] = useState("");
    const [yogaRoutine, setYogaRoutine] = useState("");
    const [preferences, setPreferences] = useState(null);
    const [editingPreferences, setEditingPreferences] = useState(false);

    const [dietPlan, setDietPlan] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const BACKEND_URL = "https://ai-yoga-backend.onrender.com";
    const [user] = useAuthState(auth);
   
    useEffect(() => {
        if (user) {
            console.log("DEBUG: User logged in. Fetching preferences...");
            fetchPreferences();
        }
    }, [user]);
    

    const fetchPreferences = async () => {
        if (!user) return;
    
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
    
            if (userSnap.exists()) {
                console.log("DEBUG: Preferences found in Firebase:", userSnap.data());
                setPreferences(userSnap.data());
            } else {
                console.log("DEBUG: No preferences found. Setting defaults.");
                setPreferences({ fitnessLevel: "", yogaGoal: "", dietPreference: "" });
            }
        } catch (error) {
            console.error("Error fetching preferences:", error);
        }
    };
    

    const updatePreferences = async () => {
        if (!user) return;
        const userRef = doc(db, "users", user.uid);

        try {
            await setDoc(userRef, preferences, { merge: true });
            setEditingPreferences(false);
            alert("Preferences updated successfully!");
        } catch (error) {
            console.error("Error updating preferences:", error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log("Sending request to API...");
            
            const response = await fetch(`${BACKEND_URL}/generate_yoga_therapy_plan`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ problem_statement: problem }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to generate therapy plan.");
            }

            const data = await response.json();
            console.log("API Response:", data);

            if (data.therapyPlan) {
                setTherapyPlan(data.therapyPlan.content);
            } else {
                setTherapyPlan("No therapy plan received.");
            }
        } catch (error) {
            console.error("Error fetching therapy plan:", error);
            setError(error.message);
        }

        setLoading(false);
    };

    const fetchYogaRoutine = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/generate_yoga_routine`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fitnessLevel: user.fitnessLevel,
                    yogaGoal: user.yogaGoal,
                }),
            });

            const data = await response.json();
            setYogaRoutine(data.routine.content || "No yoga routine received.");
        } catch (error) {
            console.error("Error fetching yoga routine:", error);
            setError("Failed to load yoga routine.");
        }

        setLoading(false);
    };

    const fetchDietPlan = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/generate_diet_plan`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    dietType: user.dietPreference,
                }),
            });

            const data = await response.json();
            setDietPlan(data.dietPlan.content || "No diet plan received.");
        } catch (error) {
            console.error("Error fetching diet plan:", error);
            setError("Failed to load diet plan.");
        }

        setLoading(false);
    };

    return (
        <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Yoga Therapy Plan</h1>
            <p className="text-gray-600 mt-4">Describe your problem, and we’ll generate a personalized yoga therapy plan for you.</p>
             {/* User Preferences Section */}
             {user && preferences && (
                <Card className="mt-8 bg-gray-100 shadow-lg text-left">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-bold text-gray-800">Your Preferences</h2>

                        {!editingPreferences ? (
                            <>
                                <p className="text-gray-600">Fitness Level: {preferences.fitnessLevel}</p>
                                <p className="text-gray-600">Yoga Goal: {preferences.yogaGoal}</p>
                                <p className="text-gray-600">Diet Preference: {preferences.dietPreference}</p>

                                <Button onClick={() => setEditingPreferences(true)} className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
                                    Edit Preferences
                                </Button>
                            </>
                        ) : (
                            <>
                                <label className="block text-gray-700 font-semibold mt-4">Fitness Level</label>
                                <input
                                    type="text"
                                    value={preferences.fitnessLevel}
                                    onChange={(e) => setPreferences({ ...preferences, fitnessLevel: e.target.value })}
                                    className="w-full px-4 py-2 mt-2 border rounded-lg"
                                />

                                <label className="block text-gray-700 font-semibold mt-4">Yoga Goal</label>
                                <input
                                    type="text"
                                    value={preferences.yogaGoal}
                                    onChange={(e) => setPreferences({ ...preferences, yogaGoal: e.target.value })}
                                    className="w-full px-4 py-2 mt-2 border rounded-lg"
                                />

                                <label className="block text-gray-700 font-semibold mt-4">Diet Preference</label>
                                <input
                                    type="text"
                                    value={preferences.dietPreference}
                                    onChange={(e) => setPreferences({ ...preferences, dietPreference: e.target.value })}
                                    className="w-full px-4 py-2 mt-2 border rounded-lg"
                                />

                                <Button onClick={updatePreferences} className="mt-4 bg-green-600 text-white hover:bg-green-700">
                                    Save Preferences
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Describe Your Problem</label>
                    <textarea
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        rows="4"
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                { !user ? <p className="text-red-500">Please login to generate a therapy plan.</p> : <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
                    {loading ? "Generating..." : "Generate Therapy Plan"}
                </Button>}
                <div className="mt-6"></div>
                <p className="text-gray-600">Note: This tool is for informational purposes only and is not a substitute for professional medical advice.</p>
                <p className="text-gray-600">Please consult a healthcare provider before starting any new exercise program.</p>
               
            </form>

            {/* Display Therapy Plan */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {therapyPlan && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800">Your Personalized Yoga Therapy Plan</h2>
                    <Card className="mt-4 bg-gray-100 shadow-lg text-left">
                        <CardContent className="p-6">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-lg max-w-none text-gray-700">
                                {therapyPlan}
                            </ReactMarkdown>
                        </CardContent>
                    </Card>
                </div>
            )}
             {/* Yoga Routine */}
             <Button onClick={fetchYogaRoutine} className="mt-6 bg-green-600 text-white">
                Generate Yoga Routine
            </Button>
            {yogaRoutine && <Card className="mt-4 bg-gray-100 shadow-lg text-left"><CardContent className="p-6"><h2 className="text-lg font-bold">Your Yoga Routine:</h2><p>{yogaRoutine}</p></CardContent></Card>}

            {/* Diet Plan */}
            <Button onClick={fetchDietPlan} className="mt-6 bg-yellow-500 text-white">
                Generate Diet Plan
            </Button>
            {dietPlan && <Card className="mt-4 bg-gray-100 shadow-lg text-left"><CardContent className="p-6"><h2 className="text-lg font-bold">Your Diet Plan:</h2><p>{dietPlan}</p></CardContent></Card>}

        </div>
    );
};

export default YogaTherapy;



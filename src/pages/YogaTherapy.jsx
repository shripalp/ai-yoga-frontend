import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";


const YogaTherapy = () => {
    const [problem, setProblem] = useState("");
    const [therapyPlan, setTherapyPlan] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const BACKEND_URL = "https://ai-yoga-backend.onrender.com";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log("Sending request to API...");
            
            const response = await fetch(`${BACKEND_URL}/generate_yoga_therapy_plan/`, {
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
                setTherapyPlan(data.therapyPlan);
            } else {
                setTherapyPlan("No therapy plan received.");
            }
        } catch (error) {
            console.error("Error fetching therapy plan:", error);
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Yoga Therapy Plan</h1>
            <p className="text-gray-600 mt-4">Describe your problem, and we’ll generate a personalized yoga therapy plan for you.</p>

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
                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
                    {loading ? "Generating..." : "Generate Therapy Plan"}
                </Button>
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
        </div>
    );
};

export default YogaTherapy;



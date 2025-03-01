import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Preferences = () => {
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [yogaGoal, setYogaGoal] = useState("");
  const [dietPreference, setDietPreference] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          navigate("/login"); // Redirect if user is not logged in
        } else {
          setUser(user); // Store user info in state
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setFitnessLevel(data.fitnessLevel || "");
            setYogaGoal(data.yogaGoal || "");
            setDietPreference(data.dietPreference || "");
          }
        }
      });
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // Prevent saving if user is null
    setLoading(true);

    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        fitnessLevel,
        yogaGoal,
        dietPreference,
      },
      { merge: true },
    );

    setLoading(false);
    navigate("/dashboard"); // Redirect after saving
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-lg rounded-lg w-96"
        >
          <h2 className="text-xl font-bold mb-4">Set Your Preferences</h2>

          <label className="block">Fitness Level:</label>
          <select
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select...</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <label className="block">Yoga Goal:</label>
          <select
            value={yogaGoal}
            onChange={(e) => setYogaGoal(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select...</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Strength">Strength</option>
            <option value="Relaxation">Relaxation</option>
            <option value="Weight Loss">Weight Loss</option>
          </select>

          <label className="block">Diet Preference:</label>
          <select
            value={dietPreference}
            onChange={(e) => setDietPreference(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select...</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Preferences"}
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Preferences;

import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot"; // Import Chatbot component
import { jsPDF } from "jspdf";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [yogaRoutine, setYogaRoutine] = useState("");
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState("");
  const [loadingDiet, setLoadingDiet] = useState(false);
  const navigate = useNavigate();
  const BACKEND_URL = "https://ai-yoga-backend.onrender.com";

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          navigate("/login"); // Redirect if user is not logged in
        } else {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUser(data);

            // Ensure preferences are set
            if (!data.fitnessLevel || !data.yogaGoal) {
              navigate("/preferences");
            }
          } else {
            navigate("/preferences");
          }
        }
      });
    };

    fetchUserData();
  }, [navigate]);

  const fetchYogaRoutine = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/generate_yoga_routine/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fitnessLevel: user.fitnessLevel,
          yogaGoal: user.yogaGoal,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setYogaRoutine(data.routine);
    } catch (error) {
      console.error("Error fetching yoga routine:", error);
    }

    setLoading(false);
  };

  const fetchDietPlan = async () => {
    if (!user) return;
    setLoadingDiet(true);

    try {
      const response = await fetch(`${BACKEND_URL}/generate_diet_plan/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dietType: user.dietPreference,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDietPlan(data.dietPlan);
    } catch (error) {
      console.error("Error fetching diet plan:", error);
    }

    setLoadingDiet(false);
  };

  const shareWhatsApp = (text) => {
    const encodedText = encodeURIComponent(text);

    // Detect if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
      ? `whatsapp://send?text=${encodedText}` // Opens WhatsApp mobile app
      : `https://web.whatsapp.com/send?text=${encodedText}`; // Opens WhatsApp Web

    window.open(whatsappUrl, "_blank");
  };

  const shareEmail = (text) => {
    const emailSubject = encodeURIComponent(
      "Check out this AI-generated yoga routine!",
    );
    const emailBody = encodeURIComponent(
      `Hi,\n\nI found this AI-generated yoga routine helpful:\n\n${text}\n\nTry it out!`,
    );
    const mailtoUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;

    // Open the email client
    window.location.href = mailtoUrl;
  };

  const downloadPDF = (title, content) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text(title, 10, 10);
    doc.setFont("helvetica", "normal");
    doc.text(content, 10, 20, { maxWidth: 180 }); // Ensures text wraps within the page
    doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-items-start h-screen">
      <h1 className="text-2xl">Welcome to Your AI Yoga Dashboard</h1>
      <h2 className="text-2xl">Third Limb Yoga</h2>
      {/* Chatbot Section */}
      <div className="mt-6 w-full max-w-lg">
        <Chatbot />
      </div>

      {user ? (
        <>
          <h1 className="text-2xl">Welcome, {user.name}</h1>
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full mt-4"
          />
          <p>Email: {user.email}</p>
          <p>Fitness Level: {user.fitnessLevel}</p>
          <p>Yoga Goal: {user.yogaGoal}</p>
          <p>Diet Plan: {user.dietPreference}</p>

          <button
            onClick={fetchYogaRoutine}
            className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Yoga Routine"}
          </button>

          {yogaRoutine && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full">
              <h2 className="text-lg font-bold">
                Your Personalized Yoga Routine:
              </h2>
              <p className="mt-2 whitespace-pre-wrap">{yogaRoutine}</p>

              {/* Share & Download Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => shareWhatsApp(yogaRoutine)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  📲 Share via WhatsApp
                </button>
                <button
                  onClick={() => shareEmail(yogaRoutine)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  ✉️ Share via Email
                </button>
                <button
                  onClick={() => downloadPDF("Yoga Routine", yogaRoutine)}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  📄 Download as PDF
                </button>
              </div>
            </div>
          )}

          <button
            onClick={fetchDietPlan}
            className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
            disabled={loadingDiet}
          >
            {loadingDiet ? "Generating..." : "Generate Diet Plan"}
          </button>

          {dietPlan && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full">
              <h2 className="text-lg font-bold">
                Your AI-Generated Meal Plan:
              </h2>
              <p className="mt-2 whitespace-pre-wrap">{dietPlan}</p>

              {/* Share & Download Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => shareWhatsApp(dietPlan)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  📲 Share via WhatsApp
                </button>
                <button
                  onClick={() => shareEmail(dietPlan)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  ✉️ Share via Email
                </button>
                <button
                  onClick={() => downloadPDF("Meal Plan", dietPlan)}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  📄 Download as PDF
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

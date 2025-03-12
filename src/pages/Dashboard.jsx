import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot"; // Import Chatbot component

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-items-start h-screen">
      <h1 className="text-2xl">Welcome to Your Third Limb Yoga Dashboard</h1>
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

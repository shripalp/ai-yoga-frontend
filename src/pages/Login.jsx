import { useState } from "react";
import {
  auth,
  googleProvider,
  db,
  registerWithEmail,
  loginWithEmail,
} from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
          fitnessLevel: "",
          yogaGoal: "",
          dietPreference: "",
        });

        navigate("/preferences");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google Sign-In failed", error);
    }
  };

  // Email/Password Sign-Up
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        setError("Please enter your name.");
        return;
      }
      await registerWithEmail(email, password, name);
      navigate("/preferences");
    } catch (error) {
      setError(error.message);
    }
  };

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      navigate("/dashboard");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="md:text-5xl text-xl mb-10">Welcome to Third Limb Yoga by Shripal</h1>
      <div className="bg-white p-6 shadow-lg rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {isRegistering ? "Register" : "Login"}
        </h2>

        {isRegistering && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={isRegistering ? handleRegister : handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isRegistering ? "Register" : "Login"}
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 bg-gray-700 text-white p-2 rounded hover:bg-gray-800"
        >
          Sign in with Google
        </button>

        <p
          className="text-sm text-blue-500 mt-4 cursor-pointer"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Create an account"}
        </p>
      </div>
    </div>
  );
};

export default Login;

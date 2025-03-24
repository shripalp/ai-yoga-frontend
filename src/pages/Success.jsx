import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally, clear cart or user session data here
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-4 text-gray-700">
        Thank you for subscribing! Your yoga class link has been sent to your email.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Success;

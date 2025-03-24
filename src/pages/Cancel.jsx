import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-red-500">❌ Payment Cancelled</h1>
      <p className="mt-4 text-gray-700">
        No worries. You can come back anytime to join a yoga session.
      </p>
      <button
        onClick={() => navigate("/pricing")}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Go to Pricing
      </button>
    </div>
  );
};

export default Cancel;

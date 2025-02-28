import { useState } from "react";

const BACKEND_URL = "https://ai-yoga-backend.onrender.com"; // Update to your backend URL

const Chatbot = () => {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAskQuestion = async () => {
        if (!question.trim()) return;
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/chatbot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setResponse("Sorry, I couldn't process that request.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <h2 className="text-lg font-bold mb-2">Ask our AI Yoga & Diet Chatbot</h2>
            <textarea
                className="w-full p-2 border rounded mb-2"
                rows="3"
                placeholder="Ask about yoga poses, diets, or lifestyle tips..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button
                onClick={handleAskQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? "Thinking..." : "Ask AI"}
            </button>

            {response && (
                <div className="mt-4 p-4 bg-gray-100 rounded w-full">
                    <h3 className="font-bold">AI Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default Chatbot;

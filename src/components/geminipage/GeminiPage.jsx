import React, { useState } from "react";
import Bot from "../../lottie/bot.json";
import Layout from "../layout/Layout";
import Lottie from "lottie-react";
import axios from "axios";

const GeminiPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);

  const keywords = [
    "waste",
    "environment",
    "garbage",
    "scrap",
    "trash",
    "shit",
    "recycling",
    "pollution",
    "sanitation",
    "disposal",
    "compost",
    "reduce",
    "reuse",
    "recycle",
    "sewage",
    "health",
    "ill"
  ];

  const generateAnswer = async () => {
    const isRelevant = keywords.some((keyword) =>
      question.toLowerCase().includes(keyword)
    );

    if (!isRelevant) {
      setAnswer(["No info about this"]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCvZCloLPAWjCqsbiJrYm-Itm8Bd-ldBF4",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const rawAnswer = response["data"]["candidates"][0]["content"][
        "parts"
      ][0]["text"].replace(/\*/g, "");
      const points = rawAnswer
        .split("\n")
        .filter((point) => point.trim() !== "");

      const trimmedPoints = points.map((point) =>
        point.length > 50 ? point.substring(0, 50) + "..." : point
      );

      setAnswer(trimmedPoints);
    } catch (error) {
      setAnswer(["Error fetching the answer. Please try again later."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-green-300 via-blue-500 to-green-300 flex flex-row justify-center items-center p-4">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <Lottie animationData={Bot} />
          <h1>Hey, I am Green Genie, ask me any of your doubt about waste management.</h1>
          
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Green Genie AI Chatbot
          </h1>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            cols="30"
            rows="5"
            placeholder="Ask a question related to waste management..."
            className="border-2 border-gray-300 rounded-lg p-4 w-full max-w-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          ></textarea>

          <button
            className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition font-semibold"
            onClick={generateAnswer}
          >
            Generate Answer
          </button>

          {loading ? (
            <div className="mt-6">
              <div
                className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
                style={{ borderTopColor: "green" }}
              ></div>
            </div>
          ) : (
            <div
              className="mt-6 bg-gray-300 p-4 rounded-lg shadow-lg w-full max-w-lg text-gray-800 text-lg"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {answer.map((point, index) => (
                <p key={index} className="mb-2">
                  • {point}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GeminiPage;

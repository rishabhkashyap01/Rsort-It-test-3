import React from "react";
import { useNavigate } from "react-router-dom";
import Bot from "../../lottie/bot.json";
import Lottie from "lottie-react";

const Gemini = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/gemini");
        }}
        className="fixed right-4 bottom-36 w-[7%] border-2 border-[#00a99d] bg-gray-300 rounded-full py-3 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-110"
        // className='fixed right-4 bottom-36 w-[7%] bg-gradient-to-r from-teal-400 to-teal-600 text-white border-0 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-110 py-4 flex items-center justify-center'
      >
        <Lottie animationData={Bot} />
      </button>
    </div>
  );
};

export default Gemini;

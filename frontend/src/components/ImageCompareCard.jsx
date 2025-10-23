import React, { useState } from "react";
import beforeImg from "../assets/with_bg.jpg";
import afterImg from "../assets/bg_remove.png";

const ImageCompareCard = () => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section className="flex justify-center items-center py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="relative max-w-5xl w-full p-6 sm:p-10 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12">
        
        {/* Images Container */}
        <div
          className={`relative w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${
            showAfter ? "border-4 border-dashed border-blue-400" : "border border-transparent"
          }`}
        >
          {/* Before Image */}
          <img
            src={beforeImg}
            alt="Before"
            className={`absolute inset-0 w-full h-72 sm:h-96 md:h-full object-cover rounded-3xl transition-all duration-700 ease-in-out brightness-110 contrast-105 saturate-125 ${
              showAfter ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            style={{
              filter: "drop-shadow(0px 5px 20px rgba(0,0,0,0.15))",
            }}
          />

          {/* After Image */}
          <img
            src={afterImg}
            alt="After"
            className={`absolute inset-0 w-full h-72 sm:h-96 md:h-full object-cover rounded-3xl transition-all duration-700 ease-in-out brightness-110 contrast-105 saturate-125 ${
              showAfter ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              filter: "drop-shadow(0px 5px 20px rgba(0,0,0,0.15))",
            }}
          />

          {/* Label */}
          <div className="absolute top-4 left-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
            {showAfter ? "After" : "Before"}
          </div>
        </div>

        {/* Info & Button */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 leading-tight">
            Experience the Transformation
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md">
            PixMATE’s AI enhances and removes backgrounds with crystal clarity —
            giving your photos a professional, clean look. Toggle below to see
            the difference.
          </p>
          <button
            onClick={() => setShowAfter(!showAfter)}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
          >
            {showAfter ? "Show Before" : "Show After"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageCompareCard;

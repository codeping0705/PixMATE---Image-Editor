import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const TextImage = () => {
  const { generateImageFromText, resultImage, user, loading } = useContext(AppContext);
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (!user) {
      alert("You must be logged in to generate an image!");
      return;
    }
    if (prompt.trim() === "") {
      alert("Please enter a prompt to generate an image.");
      return;
    }
    generateImageFromText(prompt);
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-2xl rounded-3xl mt-8 sm:mt-12">
      {/* Header & Description */}
      <div className="text-center mb-6 sm:mb-10 px-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2 sm:mb-4">
          AI Text-to-Image
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Generate stunning images from text prompts using AI. Simply type a description and let the AI create the image for you.
        </p>
      </div>

      {/* Text Input */}
      <div className="mb-4 sm:mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image description..."
          className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-gray-700 text-sm sm:text-base"
          rows={4}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={handleGenerate}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:-translate-y-1"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {resultImage && (
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1"
          >
            Download
          </button>
        )}
      </div>

      {/* Result Image */}
      {resultImage && (
        <div className="mt-4 sm:mt-8 flex justify-center px-2">
          <img
            src={resultImage}
            alt="Generated"
            className="max-h-80 sm:max-h-96 md:max-h-[28rem] w-full sm:w-auto object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default TextImage;

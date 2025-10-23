import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const RemoveBgImage = () => {
  const { removeBg, image, setImage, resultImage, loading, user } = useContext(AppContext);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "background-removed.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemoveBg = () => {
    if (!user) {
      alert("You must be logged in to remove background!");
      return;
    }
    if (image) removeBg(image);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-2xl rounded-3xl mt-8 sm:mt-12">
      {/* Feature Header */}
      <div className="text-center mb-6 sm:mb-10 px-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2 sm:mb-4">
          Remove Background
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Easily remove backgrounds from your images in seconds. Perfect for creating clean product photos, professional profile pictures, or removing distractions. Upload your image, let our AI remove the background, and download the result instantly.
        </p>
      </div>

      {/* File Upload */}
      <label className="block mb-4 sm:mb-6">
        <span className="text-gray-700 font-semibold mb-2 block">Upload Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700 transition cursor-pointer"
        />
      </label>

      {/* Preview */}
      {preview && (
        <div className="mb-4 sm:mb-6 p-4 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50 flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="max-h-64 sm:max-h-72 w-full sm:w-auto object-contain rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={handleRemoveBg}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:-translate-y-1"
          disabled={loading}
        >
          {loading ? "Processing..." : "Remove Background"}
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

      {/* Result Display */}
      {resultImage && (
        <div className="mt-4 sm:mt-8 flex justify-center px-2">
          <img
            src={resultImage}
            alt="Result"
            className="max-h-80 sm:max-h-96 md:max-h-[28rem] w-full sm:w-auto object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default RemoveBgImage;

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { resultImage, user, setResultImage, setImage } = useContext(AppContext);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("edited-image.png");
  const [imageInfo, setImageInfo] = useState({ width: 0, height: 0, sizeKB: 0 });

  // Extract image dimensions and approximate size
  useEffect(() => {
    if (!resultImage) return;

    const img = new Image();
    img.src = resultImage;
    img.onload = () => {
      setImageInfo({
        width: img.width,
        height: img.height,
        sizeKB: Math.round((resultImage.length * 3) / 4 / 1024), // rough size estimate
      });
    };
  }, [resultImage]);

  const handleDownload = () => {
    if (!user) {
      navigate("/login"); // redirect if not logged in
      return;
    }
    if (!resultImage) return;

    const link = document.createElement("a");
    link.href = resultImage;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setResultImage(null);
    setImage(null);
    navigate("/tools/remove-bg"); // or wherever user uploads image
  };

  if (!resultImage) {
    return (
      <div className="text-center mt-20 text-gray-600">
        No result found. Please remove or edit a background first.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-12 bg-white shadow-2xl rounded-3xl mt-12">
      <h2 className="text-4xl font-bold text-blue-700 text-center mb-8">
        Your Edited Image
      </h2>

      {/* Image Preview */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-1 flex justify-center p-4 bg-blue-50 rounded-xl shadow-inner border border-blue-200">
          <img
            src={resultImage}
            alt="Result"
            className="max-h-96 w-auto rounded-lg shadow-lg bg-white object-contain"
          />
        </div>

        {/* Details and Actions */}
        <div className="flex-1 flex flex-col gap-6">
          {/* File Name Editor */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Image Info */}
          <div className="text-gray-600 text-sm space-y-1">
            <p><span className="font-semibold">Width:</span> {imageInfo.width}px</p>
            <p><span className="font-semibold">Height:</span> {imageInfo.height}px</p>
            <p><span className="font-semibold">Approx. Size:</span> {imageInfo.sizeKB} KB</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow hover:bg-green-700 transition transform hover:-translate-y-1"
            >
              Download Image
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-full shadow hover:bg-gray-300 transition transform hover:-translate-y-1"
            >
              Edit Another Image
            </button>
          </div>
        </div>
      </div>

      {/* Extra Info / Tips */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        Tip: You can edit the file name before downloading. Make sure the image format is compatible with your project.
      </div>
    </div>
  );
};

export default Result;

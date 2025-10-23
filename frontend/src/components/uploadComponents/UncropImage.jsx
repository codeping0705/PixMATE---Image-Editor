import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const UncropImage = () => {
  const { unCropImage, image, setImage, resultImage, loading, user } = useContext(AppContext);
  const [preview, setPreview] = useState(null);
  const [extendLeft, setExtendLeft] = useState(0);
  const [extendRight, setExtendRight] = useState(0);
  const [extendTop, setExtendTop] = useState(0);
  const [extendBottom, setExtendBottom] = useState(0);

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
    link.download = "uncropped-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUncrop = () => {
    if (!user) return alert("You must be logged in!");
    if (image)
      unCropImage(image, {
        extendLeft,
        extendRight,
        extendTop,
        extendBottom,
      });
  };

  const numberInput = (label, value, setValue) => (
    <div className="flex flex-col items-center w-20">
      <label className="font-semibold text-sm sm:text-base">{label}</label>
      <input
        type="number"
        value={value || 0}
        onChange={(e) => setValue(parseInt(e.target.value) || 0)}
        className="border px-3 py-1 rounded w-full text-center mt-1 text-sm sm:text-base"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-2xl rounded-3xl mt-8 sm:mt-12">
      {/* Title */}
      <div className="text-center mb-6 sm:mb-10 px-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2 sm:mb-4">Uncrop Image</h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Expand edges of your image automatically. Adjust Left, Right, Top, and Bottom values
          to control how much the image should be extended.
        </p>
      </div>

      {/* Upload */}
      <div className="mb-4 sm:mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm sm:text-base text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0 file:text-sm sm:file:text-base file:font-semibold
                     file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition cursor-pointer"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-4 sm:mb-6 flex justify-center px-2">
          <img
            src={preview}
            alt="Preview"
            className="max-h-52 sm:max-h-64 md:max-h-72 w-full sm:w-auto object-contain rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Inputs */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {numberInput("Left", extendLeft, setExtendLeft)}
        {numberInput("Right", extendRight, setExtendRight)}
        {numberInput("Top", extendTop, setExtendTop)}
        {numberInput("Bottom", extendBottom, setExtendBottom)}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
        <button
          onClick={handleUncrop}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:-translate-y-1"
        >
          {loading ? "Processing..." : "Uncrop Image"}
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

      {/* Result */}
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

export default UncropImage;

import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const UpscaleImage = () => {
  const { upscaleImage, resultImage, image, setImage, user, loading } = useContext(AppContext);
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
    link.download = "upscaled-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-2xl rounded-3xl mt-8 sm:mt-12">
      {/* Title */}
      <div className="text-center mb-6 sm:mb-10 px-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2 sm:mb-4">
          Upscale Image
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Enhance your image resolution automatically without losing quality.
          Upload an image and let the AI upscale it seamlessly.
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
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50 flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="max-h-52 sm:max-h-64 md:max-h-72 object-contain rounded-lg shadow-md w-full sm:w-auto"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={() => {
            if (!user) {
              toast.warning("You must be logged in to upscale an image!");
              return;
            }
            if (image) upscaleImage(image);
          }}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:-translate-y-1"
          disabled={loading}
        >
          {loading ? "Processing..." : "Upscale Image"}
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
            alt="Result"
            className="max-h-80 sm:max-h-96 md:max-h-[28rem] rounded-lg shadow-lg object-contain w-full sm:w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default UpscaleImage;

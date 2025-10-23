import React, { useContext, useState, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const ImageCleanUp = () => {
  const { cleanupImageSpecial, image, setImage, resultImage, user, loading } =
    useContext(AppContext);
  const [preview, setPreview] = useState(null);
  const [maskDataUrl, setMaskDataUrl] = useState(null);

  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [brushSize, setBrushSize] = useState(15);
  const [tool, setTool] = useState("brush"); // brush or eraser
  const [actions, setActions] = useState([]); // for undo

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setTimeout(() => {
        if (canvasRef.current && imgRef.current) {
          const canvas = canvasRef.current;
          canvas.width = imgRef.current.clientWidth;
          canvas.height = imgRef.current.clientHeight;
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          setActions([]);
          setMaskDataUrl(null);
        }
      }, 100);
    }
  };

  const handleMouseDown = (e) => {
    if (!imgRef.current) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setLastPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = tool === "brush" ? "rgba(255,0,0,0.7)" : "rgba(0,0,0,1)";
    ctx.globalCompositeOperation =
      tool === "brush" ? "source-over" : "destination-out";
    ctx.lineWidth = brushSize;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPos({ x, y });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (!canvasRef.current) return;
    setActions([...actions, canvasRef.current.toDataURL("image/png")]);
    setMaskDataUrl(canvasRef.current.toDataURL("image/png"));
  };

  const handleUndo = () => {
    if (actions.length === 0) return;
    const last = actions[actions.length - 2] || null;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (last) {
      const img = new Image();
      img.src = last;
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    setActions(actions.slice(0, -1));
    setMaskDataUrl(canvas.toDataURL("image/png"));
  };

  const handleClear = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setMaskDataUrl(null);
    setActions([]);
  };

  const handleCleanUp = () => {
    if (!user) {
      toast.warning("You must be logged in!");
      return;
    }
    if (!image) {
      toast.error("Please upload an image first!");
      return;
    }
    if (!maskDataUrl) {
      toast.error("Please mark the object to clean!");
      return;
    }

    fetch(maskDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const maskFile = new File([blob], "mask.png", { type: "image/png" });
        cleanupImageSpecial(image, maskFile);
      });
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "cleaned-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-2xl rounded-3xl mt-6 sm:mt-12">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-10 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-2 sm:mb-4">
          Image Cleanup Tool
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Mark the object you want to clean. Use brush to select, eraser to
          correct mistakes, then click "Clean Up Image".
        </p>
      </div>

      {/* Upload */}
      <label className="block mb-4 sm:mb-6">
        <span className="text-gray-700 font-semibold mb-1 block text-sm sm:text-base">
          Upload Image
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm sm:text-base text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0 file:text-sm sm:file:text-base file:font-semibold
                     file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition cursor-pointer"
        />
      </label>

      {/* Tools */}
      {preview && (
        <div className="mb-4 flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded ${
              tool === "brush" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTool("brush")}
          >
            Brush
          </button>
          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded ${
              tool === "eraser" ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTool("eraser")}
          >
            Eraser
          </button>
          <input
            type="range"
            min="5"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32 sm:w-48"
          />
          <button
            onClick={handleUndo}
            className="px-3 sm:px-4 py-1 sm:py-2 bg-yellow-400 rounded"
          >
            Undo
          </button>
          <button
            onClick={handleClear}
            className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-300 rounded"
          >
            Clear
          </button>
        </div>
      )}

      {/* Image + Canvas */}
      {preview && (
        <div className="relative w-full sm:w-auto max-w-full mb-4 sm:mb-6 mx-auto">
          <img
            ref={imgRef}
            src={preview}
            alt="Preview"
            className="w-full max-h-64 sm:max-h-96 md:max-h-[28rem] object-contain rounded-lg shadow-md"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full rounded-lg cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
        <button
          onClick={handleCleanUp}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:-translate-y-1"
          disabled={loading}
        >
          {loading ? "Processing..." : "Clean Up Image"}
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
        <div className="mt-6 sm:mt-8 flex justify-center px-2">
          <img
            src={resultImage}
            alt="Result"
            className="max-h-80 sm:max-h-96 rounded-lg shadow-lg object-contain w-full sm:w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ImageCleanUp;

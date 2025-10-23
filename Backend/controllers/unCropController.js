import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/userModel.js";

export const uncropImage = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded!" });
    }

    const imagePath = req.file.path;
    const imageFile = fs.createReadStream(imagePath);

    // Form data for ClipDrop uncrop API
    const form = new FormData();
    form.append("image_file", imageFile);

    // Example: extend image on specific sides
    // Adjust numbers as needed
    form.append("extend_left", "120");   // pixels to extend left
    form.append("extend_right", "0");    // pixels to extend right
    form.append("extend_up", "0");       // pixels to extend up
    form.append("extend_down", "-50");   // negative removes pixels from bottom

    const { data } = await axios.post(
      "https://clipdrop-api.co/uncrop/v1",
      form,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...form.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    res.json({
      success: true,
      resultImage,
      message: "Image uncropped successfully!",
    });
  } catch (error) {
    console.error("Uncrop Error:", error.response?.data || error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



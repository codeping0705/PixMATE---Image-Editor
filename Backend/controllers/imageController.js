import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/userModel.js";

export const removeBgImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const imagePath = req.file.path;
    const imageFile = fs.createReadStream(imagePath);

    const form = new FormData();
    form.append("image_file", imageFile);

    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
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

    res.json({ success: true, resultImage, message: "Background removed" });
  } catch (error) {
    console.error("Remove BG error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

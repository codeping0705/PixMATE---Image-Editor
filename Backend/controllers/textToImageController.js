import axios from "axios";
import FormData from "form-data";
import User from "../models/userModel.js";

const textToImage = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (!req.body.prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required!" });
    }

    const form = new FormData();
    form.append("prompt", req.body.prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
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
    const resultImage = `data:image/png;base64,${base64Image}`;

    res.json({
      success: true,
      resultImage,
      message: "Text-to-image generated successfully!",
    });
  } catch (error) {
    console.error("Text-to-Image Error:", error.response?.data || error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { textToImage };

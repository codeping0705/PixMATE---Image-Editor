import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/userModel.js";

const productPhotography = async (req, res) => {
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

    const form = new FormData();
    form.append("image_file", imageFile);

    const { data } = await axios.post(
      "https://clipdrop-api.co/product-photography/v1",
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
      message: "Product photography image generated successfully!",
    });
  } catch (error) {
    console.error("Product Photography Error:", error.response?.data || error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { productPhotography };

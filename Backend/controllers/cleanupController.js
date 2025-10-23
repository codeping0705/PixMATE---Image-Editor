import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const cleanupImage = async (req, res) => {
  try {
    if (!req.file || !req.body.maskPath) {
      return res.status(400).json({ success: false, message: "Image and mask are required!" });
    }

    const imageFile = fs.createReadStream(req.file.path);
    const maskFile = fs.createReadStream(req.body.maskPath);

    const form = new FormData();
    form.append("image_file", imageFile);
    form.append("mask_file", maskFile);

    const { data } = await axios.post(
      "https://clipdrop-api.co/cleanup/v1",
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
      message: "Cleanup completed successfully!",
    });
  } catch (error) {
    console.error("Cleanup Error:", error.response?.data || error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

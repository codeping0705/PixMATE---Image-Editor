import express from "express";
import auth from "../middleware/auth.js";
import { textToImage } from "../controllers/textToImageController.js";

const textToImageRouter = express.Router();

textToImageRouter.post("/text-to-image", auth, textToImage);

export default textToImageRouter;

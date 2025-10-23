import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { removeBgImage } from "../controllers/imageController.js";

export const imageRouter = express.Router();

// Remove background endpoint
imageRouter.post("/removeBg", upload.single("image"), auth, removeBgImage);

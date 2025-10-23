import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { upscaleImage } from "../controllers/upscaleController.js";

const upscaleRouter = express.Router();

upscaleRouter.post("/upscale", upload.single("image"), auth, upscaleImage);

export default upscaleRouter;

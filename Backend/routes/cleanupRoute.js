import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { cleanupImage } from "../controllers/cleanupController.js";

const router = express.Router();

router.post("/cleanup", auth, upload.single("image"), cleanupImage);

export default router;

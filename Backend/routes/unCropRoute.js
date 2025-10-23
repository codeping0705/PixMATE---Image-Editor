import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { uncropImage } from "../controllers/unCropController.js";

const uncropRouter = express.Router();

uncropRouter.post("/uncrop", upload.single("image"), auth, uncropImage);

export default uncropRouter;

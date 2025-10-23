import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { removeText } from "../controllers/removeTextController.js";

const removeTextRouter = express.Router();

removeTextRouter.post("/remove-text", upload.single("image"), auth, removeText);

export default removeTextRouter;

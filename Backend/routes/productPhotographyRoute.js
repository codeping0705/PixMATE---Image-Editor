import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { productPhotography } from "../controllers/productPhotographyController.js";

const productRouter = express.Router();

productRouter.post("/product", upload.single("image"), auth, productPhotography);

export default productRouter;

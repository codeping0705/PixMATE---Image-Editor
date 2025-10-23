import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import userRouter from "./routes/userRoute.js";
import { imageRouter } from "./routes/imageRoute.js";
import uncropRouter from "./routes/unCropRoute.js";
import cookieParser from "cookie-parser";
import upscaleRouter from "./routes/upscaleRoute.js";
import productRouter from "./routes/productPhotographyRoute.js";
import textToImageRouter from "./routes/textToImageRoute.js";
import removeTextRouter from "./routes/removeTextRoute.js";
import cleanupRouter from "./routes/cleanupRoute.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Fix CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies and authentication headers
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/images", uncropRouter);
app.use("/api/images", upscaleRouter);
app.use("/api/images", productRouter);
app.use("/api/images", textToImageRouter);
app.use("/api/images", removeTextRouter);
app.use("/api/images", cleanupRouter);

app.get("/", (req, res) => {
  res.send({ message: "Server.js is running successfully!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening to port ${PORT}`);
});

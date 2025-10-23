import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";

import userRouter from "./routes/userRoute.js";
import { imageRouter } from "./routes/imageRoute.js";
import uncropRouter from "./routes/unCropRoute.js";
import upscaleRouter from "./routes/upscaleRoute.js";
import productRouter from "./routes/productPhotographyRoute.js";
import textToImageRouter from "./routes/textToImageRoute.js";
import removeTextRouter from "./routes/removeTextRoute.js";
import cleanupRouter from "./routes/cleanupRoute.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Dynamic CORS setup for local + deployed frontend
const allowedOrigins = [
  "http://localhost:5173",            
  "https://pixmate-imageeditor.netlify.app", // your real frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/images", uncropRouter);
app.use("/api/images", upscaleRouter);
app.use("/api/images", productRouter);
app.use("/api/images", textToImageRouter);
app.use("/api/images", removeTextRouter);
app.use("/api/images", cleanupRouter);

// ✅ Health check route (Render needs this sometimes)
app.get("/", (req, res) => {
  res.send({ message: "🚀 Server is running successfully on Render!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB Atlas connected successfully!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

export default connectDB;

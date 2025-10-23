import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register new user
export const register = async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;

    if (!name || !username || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields!" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: pwd, ...userData } = newUser.toObject();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: userData,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password!" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: pwd, ...userData } = user.toObject();

    // user.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User login successful!",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Logout user
export const logout = async (req, res) => {
  try {
    // Clear the cookie named "token"
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production", // use HTTPS in prod
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully!",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};

export const me = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

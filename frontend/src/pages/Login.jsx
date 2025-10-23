import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const { handleLogin } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleLogin(formData);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-blue-50 p-6">
        <div className="bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/30 transition-all">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Log in to your PixMATE account to start creating amazing visuals!
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/80 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent placeholder-gray-400"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/80 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl shadow-md transition transform hover:-translate-y-1"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>

      {/* Right: Animated Blue Background with PixMATE Intro */}
      <div className="flex-1 hidden lg:flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700"></div>
        <div className="relative z-10 text-white text-center p-10 max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Welcome to PixMATE 🎨</h2>
          <p className="text-lg mb-4 opacity-90">
            PixMATE is your AI-powered image editing companion. Remove backgrounds, enhance images, and create stunning visuals effortlessly.
          </p>
          <p className="text-md opacity-80">
            Join thousands of creators who trust PixMATE to bring their ideas to life!
          </p>
        </div>
      </div>

      {/* Tailwind CSS animation */}
      <style>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradientAnimation 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;

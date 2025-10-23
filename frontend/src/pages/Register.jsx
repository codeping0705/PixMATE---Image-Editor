import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaIdBadge } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const { handleRegister } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleRegister(formData);
      toast.success("Registration successful! Please login.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Left: Register Form */}
      <div className="flex-1 flex items-center justify-center bg-blue-50 p-6">
        <div className="bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/30 transition-all ">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Create Your Account ✨
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/80 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/80 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaIdBadge className="text-gray-500 mr-3" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/80 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaPhoneAlt className="text-gray-500 mr-3" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/80 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
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
                placeholder="Password (min 6 characters)"
                minLength="6"
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
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">
              Login
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

export default Register;

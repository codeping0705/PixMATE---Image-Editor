import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // Adjust path to your context

const Headers = () => {
  const { user } = useContext(AppContext); // Get logged-in user

  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white flex items-center py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Text Content */}
        <div className="text-center md:text-left md:max-w-lg">
          {/* Free Badge */}
          <div className="inline-block mb-4 px-3 py-1 bg-white text-blue-600 font-semibold rounded-full shadow-md text-sm">
            100% Free
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug mb-4">
            Transform Your Images <br /> Instantly
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg mb-6 text-white/90">
            Remove backgrounds, upscale images, generate visuals with AI, and more.
            All in one platform designed for creatives and professionals.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
            <Link
              to="/tools"
              className="px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Try Tools
            </Link>

            {/* Show "Get Started" only if not logged in */}
            {!user && (
              <Link
                to="/register"
                className="px-5 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition text-sm sm:text-base"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="hidden md:block md:flex-1">
          <img
            src="https://media.istockphoto.com/id/1362936798/photo/young-freelance-asian-woman-using-laptop-and-tablet-in-living-room-at-home-at-night-working.jpg?s=612x612&w=0&k=20&c=n49shaTUKSfxxllfYxbMEamv3ekQGjzqle0sxCiR9sg="
            alt="Hero Illustration"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </header>
  );
};

export default Headers;

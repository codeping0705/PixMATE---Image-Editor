import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white py-12 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">PixMATE</h2>
          <p className="text-gray-100/90 text-sm sm:text-base">
            Transform your images instantly — remove backgrounds, upscale, generate AI visuals, and more.{" "}
            <span className="font-semibold">Completely free forever.</span>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-100/90 text-sm sm:text-base">
            <li>
              <a href="/" className="hover:text-white transition-colors duration-200">Home</a>
            </li>
            <li>
              <a href="/tools" className="hover:text-white transition-colors duration-200">Tools</a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors duration-200">About</a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition-colors duration-200">Login</a>
            </li>
            <li>
              <a href="/register" className="hover:text-white transition-colors duration-200">Register</a>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:opacity-80 transition-opacity duration-200 text-[#145DBF] text-2xl sm:text-3xl md:text-4xl">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity duration-200 text-[#0C85D0] text-2xl sm:text-3xl md:text-4xl">
              <FaTwitter />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity duration-200 text-[#005582] text-2xl sm:text-3xl md:text-4xl">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity duration-200 text-[#C1354C] text-2xl sm:text-3xl md:text-4xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity duration-200 text-gray-800 text-2xl sm:text-3xl md:text-4xl">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-gray-100/80 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} PixMATE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

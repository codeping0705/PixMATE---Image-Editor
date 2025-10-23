import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  FaImage,
  FaCrop,
  FaExpand,
  FaCamera,
  FaMagic,
  FaFont,
  FaBroom,
} from "react-icons/fa";
import Footer from "../components/Footer";

const tools = [
  {
    icon: <FaImage className="text-blue-600 w-10 h-10" />,
    title: "Remove Background",
    description: "Instantly remove image backgrounds with AI precision.",
    link: "/tools/remove-bg",
    status: "LIVE",
  },
  {
    icon: <FaCrop className="text-blue-600 w-10 h-10" />,
    title: "Uncrop Image",
    description: "Expand your images seamlessly without losing quality.",
    link: "#",
    status: "Coming Soon",
  },
  {
    icon: <FaExpand className="text-blue-600 w-10 h-10" />,
    title: "Image Upscale",
    description: "Enhance image resolution without any quality loss.",
    link: "#",
    status: "Coming Soon",
  },
  {
    icon: <FaCamera className="text-blue-600 w-10 h-10" />,
    title: "Product Photography",
    description: "Transform product photos into professional-grade visuals.",
    link: "#",
    status: "Coming Soon",
  },
  {
    icon: <FaMagic className="text-blue-600 w-10 h-10" />,
    title: "AI Text-to-Image",
    description: "Generate visuals instantly from your text prompts.",
    link: "#",
    status: "Coming Soon",
  },
  {
    icon: <FaFont className="text-blue-600 w-10 h-10" />,
    title: "Remove Text",
    description: "Clean images from unwanted text automatically.",
    link: "#",
    status: "Coming Soon",
  },
  {
    icon: <FaBroom className="text-blue-600 w-10 h-10" />,
    title: "Image Cleanup",
    description: "Remove imperfections and clean up images effortlessly.",
    link: "#",
    status: "Coming Soon",
  },
];

const Tools = () => {
  return (
    <>
      <NavBar />
      <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        {/* Hero Section */}
        <section className="py-16 px-6 text-center md:text-left max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
            Explore All PixMATE Tools
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-3xl mx-auto md:mx-0 mb-8">
            PixMATE provides a suite of free, browser-based image editing tools
            for students, creatives, designers, marketers, and professionals.
            Remove backgrounds, upscale images, generate AI visuals, and more —
            all in one platform.
          </p>
          <Link
            to="/tools/remove-bg"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Try Remove Background
          </Link>
        </section>

        {/* Tools Grid */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tools.map((tool, idx) => (
              <div
                key={idx}
                className={`relative bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center group transition-transform duration-300 ${
                  tool.status === "LIVE" ? "hover:shadow-2xl hover:-translate-y-1" : "opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Status Badge */}
                <span
                  className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${
                    tool.status === "LIVE" ? "bg-green-500 text-white" : "bg-yellow-400 text-white"
                  }`}
                >
                  {tool.status}
                </span>

                <div className="mb-4 text-5xl group-hover:text-blue-700 transition-colors duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                  {tool.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2">{tool.description}</p>

                {tool.status === "LIVE" && (
                  <Link
                    to={tool.link}
                    className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Use Tool
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 py-12 mt-16 mb-4 text-center text-gray-600 rounded-2xl mx-6 md:mx-16 lg:mx-32">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Creating Stunning Images Today
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6">
            All tools are free and browser-based — no downloads or subscriptions required.
          </p>
          <Link
            to="/tools/remove-bg"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Try Now
          </Link>
        </section>
      </main>
    <Footer/>
    </>
  );
};

export default Tools;

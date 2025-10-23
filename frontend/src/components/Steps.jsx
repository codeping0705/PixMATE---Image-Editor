import React from "react";
import { motion } from "framer-motion";
import { FaMagic, FaUpload, FaDownload } from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload className="text-white w-6 h-6" />,
    title: "Upload Your Image",
    description: "Select any image from your device to start editing instantly.",
    bg: "bg-blue-500",
  },
  {
    icon: <FaMagic className="text-white w-6 h-6" />,
    title: "Apply AI Tools",
    description: "Remove backgrounds, upscale, or generate visuals in seconds.",
    bg: "bg-blue-600",
  },
  {
    icon: <FaDownload className="text-white w-6 h-6" />,
    title: "Download & Use",
    description: "Download your edited image and use it anywhere for free.",
    bg: "bg-blue-700",
  },
];

const Steps = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-blue-700 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>

        {/* Steps container */}
        <div className="flex flex-col md:flex-row items-center justify-between relative md:space-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex-1 flex flex-col items-center md:relative mb-10 md:mb-0 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Connector line for horizontal layout */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-7 right-[-50%] w-[100%] h-[3px] bg-blue-200 z-0"></div>
              )}

              {/* Icon with animation */}
              <motion.div
                className={`${step.bg} w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 shadow-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl`}
                whileHover={{ rotate: 8, scale: 1.1 }}
              >
                {step.icon}
              </motion.div>

              {/* Step number */}
              <span className="text-sm text-blue-600 font-semibold tracking-wide mb-1">
                Step {index + 1}
              </span>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base max-w-xs leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;

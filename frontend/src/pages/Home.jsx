import React from "react";
import { motion } from "framer-motion";
import Headers from "../components/Headers";
import { Link } from "react-router-dom";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import Steps from "../components/Steps";
import FAQ from "../components/FAQ";
import ImageCompareCard from "../components/ImageCompareCard";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  return (
    <div className="bg-gray-50 overflow-x-hidden">
      {/* Header Section */}
      <Headers />

      {/* Steps Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Steps />
      </motion.div>

      {/* Image Comparison Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <ImageCompareCard />
      </motion.div>

      {/* Features Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <motion.div
          variants={fadeUp}
          className="text-center md:text-left mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-blue-700">
            All-in-One Free Image Tools
          </h2>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl">
            Remove backgrounds, upscale images, generate AI visuals, and more —
            all completely free and easy to use.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {[
            {
              title: "Background Removal",
              desc: "Remove image backgrounds instantly with AI, no manual effort needed.",
            },
            {
              title: "Image Upscale",
              desc: "Enhance image resolution without losing quality. Perfect for prints or web.",
            },
            {
              title: "AI Text-to-Image",
              desc: "Generate visuals from text prompts with AI in seconds.",
            },
            {
              title: "Product Photography",
              desc: "Transform your product images into professional-quality visuals.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-semibold text-xl mb-2 text-blue-600">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex justify-center md:justify-start"
        >
          <Link
            to="/tools"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-transform transform hover:-translate-y-1"
          >
            Try All Tools for Free
          </Link>
        </motion.div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Testimonial />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <FAQ />
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

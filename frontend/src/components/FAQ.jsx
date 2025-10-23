import React, { useState } from "react";
import { FaQuestionCircle, FaArrowRight } from "react-icons/fa";


const faqs = [
  {
    question: "Is PixMATE completely free?",
    answer:
      "Yes! All tools on PixMATE are completely free and browser-based. No subscriptions or hidden charges.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "Yes, signing up allows you to save your history and access personalized features. Free accounts available!",
  },
  {
    question: "Are my images private?",
    answer:
      "Absolutely. Images are processed securely and never shared publicly. Privacy is our top priority.",
  },
  {
    question: "Which tools are available right now?",
    answer:
      "Currently, 'Remove Background' is LIVE. Other tools like Upscale, Uncrop, AI Text-to-Image, etc., are coming soon.",
  },
  {
    question: "Can I use PixMATE on mobile devices?",
    answer:
      "Yes! PixMATE is fully responsive and works on all phones, tablets, and desktop screens.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="py-12 bg-gradient-to-r from-blue-50 to-white sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Intro Section */}
        <div className="text-center mb-12 sm:mb-16 px-2 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            PixMATE is your all-in-one image enhancement platform. Whether you
            want to remove backgrounds, upscale images, or create AI visuals,
            we have got you covered. Below are the most common questions our
            users ask.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <FaQuestionCircle className="text-blue-500 text-lg sm:text-xl md:text-2xl" />
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                </div>
                <span className="text-blue-600 text-lg sm:text-xl md:text-2xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4">
            Still have questions? Reach out to our support team anytime!
          </p>
          <a
            href="/contact"
            className="inline-block px-5 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>

    </>
  );
};

export default FAQ;

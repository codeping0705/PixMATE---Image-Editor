import React, { useRef, useEffect, useState } from "react";
import { FaQuoteLeft, FaStar, FaRegStar } from "react-icons/fa";
import "../index.css"; // for hiding scrollbar

const testimonials = [
  {
    name: "Sophia Patel",
    role: "Freelance Photographer",
    feedback:
      "PixMATE’s AI tools have simplified my post-processing completely. The background remover is so precise — it saves me hours every week!",
    avatar:
      "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia&backgroundColor=b6e3f4,ffd5dc",
  },
  {
    name: "Liam Anderson",
    role: "Product Designer",
    feedback:
      "I use PixMATE daily for quick image edits and mockups. The upscaler and enhancer tools are insanely good for design presentations!",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Liam&backgroundColor=d1d4f9,ffdfbf",
  },
  {
    name: "Emma Rodriguez",
    role: "Digital Marketer",
    feedback:
      "The interface is sleek, and the processing speed is unmatched. I recommend PixMATE to every marketer who works with visuals!",
    avatar:
      "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Emma&backgroundColor=c0aede,b6e3f4",
  },
  {
    name: "Noah Bennett",
    role: "Social Media Strategist",
    feedback:
      "My team relies on PixMATE to generate content at scale. The AI art tools are a game-changer for campaigns and reels.",
    avatar:
      "https://api.dicebear.com/9.x/adventurer/svg?seed=Noah&backgroundColor=ffdfbf,d1d4f9",
  },
  {
    name: "Ava Thompson",
    role: "Content Creator",
    feedback:
      "I can easily edit thumbnails, banners, and portraits on the go. PixMATE makes editing fun and super fast.",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Ava&backgroundColor=ffd5dc,b6e3f4",
  },
];

const Testimonial = () => {
  const scrollRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Smooth horizontal auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    let scrollLeft = 0;

    const smoothScroll = () => {
      if (!container) return;
      scrollLeft += 0.5; // slower speed
      if (scrollLeft >= container.scrollWidth - container.clientWidth) {
        scrollLeft = 0;
      }
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      requestAnimationFrame(smoothScroll);
    };

    const animation = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animation);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim() || rating === 0) return;
    setSubmitted(true);
    setFeedback("");
    setRating(0);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-blue-700 mb-8 sm:mb-12">
          What Our Users Say 💬
        </h2>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar py-4"
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex-none w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[400px] bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-105 snap-center flex flex-col justify-between"
            >
              <div className="mb-4 sm:mb-6 relative">
                <FaQuoteLeft className="text-blue-400 text-3xl sm:text-4xl md:text-5xl absolute -top-3 left-0 opacity-20" />
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed relative z-10">
                  {item.feedback}
                </p>
              </div>

              <div className="flex items-center mt-auto space-x-3 sm:space-x-4 pt-3 border-t border-gray-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-blue-200 shadow-sm"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Line Divider */}
      <div className="relative my-12 sm:my-16 w-full flex justify-center">
        <div className="h-1 w-5/6 bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 animate-runningLineSlow"></div>
        </div>
      </div>

      {/* Feedback Form Section */}
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 md:p-10 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          We’d Love Your Feedback ❤️
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6">
          We value your insights! Your feedback helps us enhance PixMATE’s
          features, improve performance, and create tools that truly empower
          creators like you. Share your thoughts, ideas, or rate your experience
          to help us deliver an even better image editing experience.
        </p>

        {/* Feedback Form + Submitted Message */}
        <>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think..."
              className="w-full sm:w-4/5 md:w-3/4 border border-gray-300 rounded-xl p-3 sm:p-4 md:p-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4 resize-none"
              rows="4"
              required
            ></textarea>

            <button
              type="submit"
              className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1"
            >
              Submit Feedback
            </button>
          </form>

          {submitted && (
            <p className="mt-4 text-green-600 font-medium text-base sm:text-lg">
              ✅ Thank you for your feedback! You make PixMATE better.
            </p>
          )}
        </>
      </div>
    </section>
  );
};

export default Testimonial;

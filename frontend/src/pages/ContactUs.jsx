import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill all fields!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      // Replace with your API endpoint
      // await axios.post("/api/contact", formData);

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
      <section className="relative min-h-screen bg-gradient-to-r from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Info Section */}
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            Have questions, feedback, or want to collaborate? Fill out the form
            and our team will get back to you promptly.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-start gap-4 mt-6">
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center lg:text-left">
            Send Us a Message
          </h3>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
    <Footer/>
  </>
  );
};

export default ContactUs;

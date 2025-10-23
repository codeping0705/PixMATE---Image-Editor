import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const About = () => {
  return (
    <>
      <NavBar />
      <section className="bg-gray-50 py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16 mb-12 sm:mb-16">
            {/* Text */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4">
                About PixMATE
              </h1>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl mb-3">
                PixMATE is a free, all-in-one image editing platform for
                students, creatives, designers, marketers, photographers, and
                professionals. Instantly remove backgrounds, upscale images,
                generate AI visuals, and produce professional-quality content
                with no cost.
              </p>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
                Whether you're working on a school project, marketing campaign,
                social media content, or creative personal work, PixMATE makes
                editing fast, intuitive, and accessible to everyone.
              </p>
            </div>

            {/* Hero Image */}
            <div className="md:w-1/2 mt-6 md:mt-0">
              <img
                src="https://media.istockphoto.com/id/1446161129/photo/graphic-designer-digital-marketing-and-tablet-in-business-hands-with-website-or-web-design.jpg?s=612x612&w=0&k=20&c=Crn5AzNy1VpMCVbJCCgJYwLlzdw_tMbrE677OsnLAd4="
                alt="About Illustration"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Why Choose PixMATE */}
          <div className="text-center mb-10 sm:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4 sm:mb-6">
              Why Professionals and Creatives Love PixMATE
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
              Many creatives, professionals, and students struggle with
              expensive software and limited tools. PixMATE provides a{" "}
              <strong>completely free, browser-based solution</strong> that
              helps you create visuals, enhance projects, and bring ideas to
              life — no barriers, no subscriptions, no hassle.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12 sm:mb-16">
            {[
              {
                title: "100% Free",
                desc: "No subscriptions, hidden charges, or limitations — free for all users.",
              },
              {
                title: "Professional-Friendly",
                desc: "Designed for students, creatives, designers, marketers, and photographers alike.",
              },
              {
                title: "Easy to Use",
                desc: "Intuitive interface suitable for beginners and experts — no technical skills required.",
              },
              {
                title: "All-in-One Tools",
                desc: "Remove backgrounds, upscale images, AI text-to-image, cleanup, and more — everything in one platform.",
              },
              {
                title: "Boost Creativity",
                desc: "Experiment, create, and enhance visuals for work, school, social media, or personal projects.",
              },
              {
                title: "Safe & Private",
                desc: "Your images remain secure and are never shared publicly — complete privacy guaranteed.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center px-2 ">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-3 sm:mb-4">
              Start Creating for Free Today
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 max-w-2xl mx-auto">
              No sign-ups required. Jump straight into creating amazing images
              and visuals for your projects.
            </p>
            <a
              href="/tools"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Explore All Tools
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;

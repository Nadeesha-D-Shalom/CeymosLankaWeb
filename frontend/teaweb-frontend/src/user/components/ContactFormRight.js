import React, { useEffect } from "react";
import bgLeaf from "../assets/HomePage/contact-f.jpg"; // your background image

export default function ContactFormRight() {

  useEffect(() => {
    const elements = document.querySelectorAll(".contact-animate");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeUpSoft");
            entry.target.classList.remove("opacity-0");
          } else {
            entry.target.classList.remove("animate-fadeUpSoft");
            entry.target.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <section
      className="
        relative w-full 
        py-20 
        bg-no-repeat bg-center bg-cover bg-fixed
      "
      style={{ backgroundImage: `url(${bgLeaf})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      {/* MAIN SECTION */}
      <div className="
        relative z-10 max-w-7xl mx-auto 
        grid grid-cols-1 md:grid-cols-2 
        items-center px-6 gap-10
      ">

        {/* LEFT SIDE — FORM NOW HERE */}
        <div
          className="
            bg-white/90 backdrop-blur-md 
            rounded-xl p-8 md:p-10 
            shadow-lg
          "
        >
          <h2 className="text-3xl md:text-4xl font-serif text-[#3A2F2A] mb-8 contact-animate opacity-0">
            Contact Us
          </h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              className="
                w-full p-4 rounded-lg border border-gray-300 
                contact-animate opacity-0
                focus:border-[#6D4C30] outline-none
              "
              required
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              className="
                w-full p-4 rounded-lg border border-gray-300 
                contact-animate opacity-0
                focus:border-[#6D4C30] outline-none
              "
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="
                w-full p-4 rounded-lg border border-gray-300 
                contact-animate opacity-0
                focus:border-[#6D4C30] outline-none
              "
              required
            />

            <input
              type="text"
              placeholder="Subject"
              className="
                w-full p-4 rounded-lg border border-gray-300 
                contact-animate opacity-0
                focus:border-[#6D4C30] outline-none
              "
              required
            />

            <textarea
              rows="4"
              placeholder="Message"
              className="
                w-full p-4 rounded-lg border border-gray-300 
                contact-animate opacity-0
                focus:border-[#6D4C30] outline-none
              "
              required
            ></textarea>

            <button
              type="submit"
              className="
                w-full p-4 bg-[#6D4C30] text-white font-semibold 
                rounded-lg contact-animate opacity-0
                hover:bg-[#3A2F2A] transition-all duration-300
              "
            >
              Send Message
            </button>

          </form>
        </div>

        {/* RIGHT SIDE — EMPTY TO SHOW BACKGROUND */}
        <div className="h-[280px] md:h-[420px]"></div>

      </div>
    </section>
  );
}

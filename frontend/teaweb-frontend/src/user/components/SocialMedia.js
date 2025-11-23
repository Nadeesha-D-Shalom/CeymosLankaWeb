import React, { useEffect } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function SocialMedia() {

  useEffect(() => {
    const elements = document.querySelectorAll(".social-animate");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.anim);
            entry.target.classList.remove("opacity-0");
          } else {
            entry.target.classList.remove(entry.target.dataset.anim);
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
    <section className="w-full py-4 bg-[#ffffff]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 text-center mb-8">

        {/* LEFT — INSTAGRAM */}
        <div
          className="social-animate opacity-0"
          data-anim="animate-fadeLeft"
        >
          <FaInstagram className="text-[#CBA75A] w-10 h-10 mx-auto mb-4" />

          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] tracking-wide">
            INSTAGRAM
          </h2>

          <a
            href="https://www.instagram.com/ceymoslanka/"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-lg text-[#222] hover:text-[#CBA75A] transition-all"
          >
            @ceymoslanka
          </a>
        </div>

        {/* RIGHT — FACEBOOK */}
        <div
          className="social-animate opacity-0"
          data-anim="animate-fadeRight"
        >
          <FaFacebookF className="text-[#CBA75A] w-10 h-10 mx-auto mb-4" />

          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] tracking-wide">
            FACEBOOK
          </h2>

          <a
            href="https://web.facebook.com/people/Ceymos-Lanka/61576319648785/"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-lg text-[#222] hover:text-[#CBA75A] transition-all"
          >
            Ceymos Lanka
          </a>
        </div>

      </div>
    </section>
  );
}

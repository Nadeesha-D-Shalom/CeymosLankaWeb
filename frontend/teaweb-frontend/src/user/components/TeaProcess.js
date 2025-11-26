import React, { useEffect, useRef } from "react";
import useParallax from "../../hooks/useParallax";
import bgLeaf from "../assets/HomePage/leaf.jpg";
import img1 from "../assets/HomePage/step1.jpg";
import img2 from "../assets/HomePage/step2.jpg";
import img3 from "../assets/HomePage/step3.jpg";

const steps = [
  {
    id: 1,
    title: "Introduction",
    text: "Learn the origins and craftsmanship of authentic Ceylon tea.",
    img: img1
  },
  {
    id: 2,
    title: "Tea Crafting",
    text: "Explore hand-rolling, drying, and artisanal techniques.",
    img: img2
  },
  {
    id: 3,
    title: "Tea Brewing",
    text: "Master perfect brewing for rich aroma and flavor.",
    img: img3
  }
];

export default function TeaProcess() {
  const bgRef = useRef(null);
  useParallax(bgRef, 8);

  useEffect(() => {
    const items = document.querySelectorAll(".tea-animate");
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
      { threshold: 0.2 }
    );

    items.forEach(i => observer.observe(i));
    return () => items.forEach(i => observer.unobserve(i));
  }, []);

  return (
    <section
      ref={bgRef}
      className="relative w-full py-20 bg-cover bg-center text-center transition-all duration-300"
      style={{ backgroundImage: `url(${bgLeaf})` }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

      <h2 className="relative z-10 text-4xl font-serif text-[#3b2b1e] mb-12">
        Tea Making
      </h2>

      <div className="relative z-10 w-11/12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map(step => (
          <div key={step.id} className="tea-animate opacity-0 transition-all duration-700">
            <img
              src={step.img}
              className="w-full h-56 object-cover rounded-xl shadow-md hover:scale-[1.04] transition duration-500"
              alt={step.title}
            />
            <h3 className="mt-4 font-serif text-xl text-[#3b2b1e]">
              {step.id}. {step.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed mt-2 px-2">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

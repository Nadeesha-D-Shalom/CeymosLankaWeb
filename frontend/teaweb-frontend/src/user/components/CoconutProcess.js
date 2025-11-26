import React, { useEffect } from "react";
import bgLeaf from "../assets/HomePage/c-bg3.jpg";
import img1 from "../assets/HomePage/C-Powder.jpg";
import img2 from "../assets/HomePage/c-oil.jpg";
import img3 from "../assets/HomePage/c-chip.jpg";

const steps = [
  {
    id: 1,
    title: "Coconut Powder",
    text: "Fresh coconut is grated and dried to produce fine, aromatic coconut powder.",
    img: img1,
  },
  {
    id: 2,
    title: "Coconut Oil",
    text: "Pure coconut oil is extracted and filtered to retain its natural richness and clarity.",
    img: img2,
  },
  {
    id: 3,
    title: "Coconut Chips",
    text: "Coconut slices are lightly toasted to create crisp, flavorful coconut chips.",
    img: img3,
  },
];


export default function CoconutProcess() {

  useEffect(() => {
    const items = document.querySelectorAll(".spices-animate");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-zoomFade");
            entry.target.classList.remove("opacity-0");
          } else {
            entry.target.classList.remove("animate-zoomFade");
            entry.target.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach(item => observer.observe(item));
    return () => items.forEach(item => observer.unobserve(item));
  }, []);

  return (
    <section
      className="relative w-full py-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLeaf})` }}
    >
      {/* Lighter overlay so content is visible */}
      <div className="absolute inset-0 bg-[#4c3a32]/50 backdrop-blur-[1px]"></div>

      {/* Title */}
      <h2 className="relative z-10 text-4xl font-serif text-white text-center mb-14">
        Coconut Process
      </h2>

      {/* Card Grid */}
      <div className="relative z-10 w-11/12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {steps.map((step) => (
          <div
            key={step.id}
            className="
                spices-animate 
                opacity-0   
                bg-white rounded-2xl shadow-2xl 
                p-6 text-center 
                transition-all duration-700
            "
          >
            <img
              src={step.img}
              className="w-full h-56 rounded-xl object-cover mb-4"
              alt={step.title}
            />

            <h3 className="font-serif text-xl text-[#3b2b1e] mb-2">
              {step.id}. {step.title}
            </h3>

            <p className="text-gray-700 text-sm leading-relaxed px-2">
              {step.text}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

import React, { useEffect } from "react";
import bgLeaf from "../assets/HomePage/rice-bg.jpg";
import img1 from "../assets/HomePage/rice-step1.jpg";
import img2 from "../assets/HomePage/rice-step2.jpg";
import img3 from "../assets/HomePage/rice-step3.jpg";


const steps = [
  {
    id: 1,
    title: "Growing Up",
    text:
      "Rice plants grow in the fields until the grains mature and are ready for harvest.",
    img: img1,
  },
  {
    id: 2,
    title: "Harvesting",
    text:
      "Fully grown rice is harvested carefully to preserve grain quality.",
    img: img2,
  },
  {
    id: 3,
    title: "Pure Rice",
    text:
      "The harvested rice is cleaned and processed to produce pure, high-quality rice.",
    img: img3,
  },
];



export default function RiceProcess() {

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
      <div className="absolute inset-0 bg-[#1a2421]/80 backdrop-blur-[1px]"></div>

      {/* Title */}
      <h2 className="relative z-10 text-4xl font-serif text-white text-center mb-14">
        Rice Process
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

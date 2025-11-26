import React, { useEffect } from "react";
import bgLeaf from "../assets/HomePage/cinnamon-bg1.jpg";
import img1 from "../assets/HomePage/cino-step2.jpg";
import img2 from "../assets/HomePage/cino-step4.jpg";
import img3 from "../assets/HomePage/cino-stp1.jpg";

const steps = [
  {
    id: 1,
    title: "Introduction",
    text:
      "Learn how Ceylon cinnamon grows and how the bark is carefully harvested from the tree.",
    img: img1,
  },
  {
    id: 2,
    title: "Cinnamon Crafting",
    text:
      "See how skilled artisans peel, roll, and prepare cinnamon through traditional crafting methods.",
    img: img2,
  },
  {
    id: 3,
    title: "Cinnamon Brewing",
    text:
      "Understand how cinnamon is used for brewing aroma, steeping, and creating a refined drink experience.",
    img: img3,
  },
];


export default function CinnamonProcess() {

    useEffect(() => {
        const elements = document.querySelectorAll(".tea-animate");

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
            className="relative w-full py-20 bg-cover bg-center text-center"
            style={{ backgroundImage: `url(${bgLeaf})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#f5f5d1]/70 backdrop-blur-[3.5px]"></div>

            <h2 className="relative z-10 text-4xl font-serif text-[#3b2b1e] mb-12">
                Cinnamon Process
            </h2>

            <div className="relative z-10 w-11/12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {steps.map(step => (
                    <div
                        key={step.id}
                        className="tea-animate opacity-0 transition-all duration-700"
                    >
                        <img
                            src={step.img}
                            alt={step.title}
                            className="w-full h-56 object-cover rounded-xl shadow-md hover:scale-[1.04] transition duration-500"
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

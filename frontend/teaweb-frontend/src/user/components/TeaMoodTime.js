import React, { useRef } from "react";

import adventurous from "../assets/HomePage/adventurous-2.png";
import calming from "../assets/HomePage/calming-2.png";
import energized from "../assets/HomePage/energized-2.png";
import feelGood from "../assets/HomePage/feel_good-1.png";
import healing from "../assets/HomePage/healing-2.png";
import relaxing from "../assets/HomePage/relaxing-2.png";
import refreshing from "../assets/HomePage/refreshing-2.png";
import wakeMeUp from "../assets/HomePage/wake_me_up-1.png";

export default function TeaMoodTime() {
  const moods = [
    { title: "Adventurous", img: adventurous },
    { title: "Calming", img: calming },
    { title: "Energizing", img: energized },
    { title: "Feel Good", img: feelGood },
    { title: "Healing", img: healing },
    { title: "Relaxing", img: relaxing },
    { title: "Refreshing", img: refreshing },
    { title: "Wake Me Up", img: wakeMeUp }
  ];

  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) - rect.width / 2;
    const y = (e.clientY - rect.top) - rect.height / 2;

    const rotateX = (-y / 20).toFixed(2);
    const rotateY = (x / 20).toFixed(2);

    const moveX = (x / 18).toFixed(2);
    const moveY = (y / 18).toFixed(2);

    card.style.transition = "transform 0s";
    card.style.transform = `
      perspective(600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateX(${moveX}px)
      translateY(${moveY}px)
      scale(1.12)
    `;
  };

  const resetAnimation = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.transition =
      "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    card.style.transform =
      "perspective(600px) rotateX(0) rotateY(0) translateX(0) translateY(0) scale(1)";
  };

  return (
    <section className="w-full py-24 bg-white">
      <h2 className="text-center text-4xl md:text-5xl font-serif text-[#222] mb-16 tracking-wider">
        WHAT'S YOUR MOOD?
      </h2>

      <div className="flex flex-wrap justify-center gap-10 px-4">

        {moods.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer group flex flex-col items-center text-center"
          >
            <div className="relative">

              {/* Smooth glow pulse */}
              <div
                className="
                  absolute inset-0 rounded-full
                  bg-gradient-to-r from-emerald-300/30 to-teal-300/30
                  blur-xl opacity-0 
                  group-hover:opacity-80
                  transition-all duration-500
                  scale-125
                  -z-10
                  group-hover:animate-pulse
                "
              />

              {/* Main Icon Card */}
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => resetAnimation(index)}
                className="
                  relative w-24 h-24 md:w-28 md:h-28 rounded-full
                  flex items-center justify-center
                  shadow-lg border border-gray-200 bg-white
                  transition-all duration-300
                  hover:shadow-2xl
                "
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md
                             transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Label */}
            <p className="
              text-sm md:text-base text-[#333] font-medium mt-4 tracking-wide
              group-hover:text-[#111] transition-colors
            ">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

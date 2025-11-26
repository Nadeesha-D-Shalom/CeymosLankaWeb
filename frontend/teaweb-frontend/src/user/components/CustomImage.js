import React from "react";
import bgLeaf from "../assets/HomePage/custom-bg.jpg";

export default function CustomImage() {
  return (
    <section
      className="
        relative
        w-full 
        h-[140px] md:h-[400px]
        bg-center bg-no-repeat bg-contain 
        bg-fixed 
        flex justify-center items-center
      "
      style={{
        backgroundImage: `url(${bgLeaf})`,
        backgroundColor: "#ffffff",
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Empty content — just a divider */}
      <div className="relative z-10"></div>

    </section>
  );
}

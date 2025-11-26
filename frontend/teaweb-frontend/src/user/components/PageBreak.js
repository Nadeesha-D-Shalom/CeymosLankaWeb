import React from "react";
import bgLeaf from "../assets/HomePage/line.png";

export default function PageBreak() {
  return (
    <section className="w-full py-0 flex justify-center mb-0">
      <img
        src={bgLeaf}
        alt="Tea Divider"
        className="w-[240px] md:w-[360px] h-[40px] md:h-[200px] object-contain"
      />
    </section>
  );
}

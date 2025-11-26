import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import heroVideo from "../assets/videos/bg-hero2.mp4";
import brandLogo from "../assets/images/log.jpeg";

// Highlight helper
const highlightGold = (text) => {
  const goldWords = [
    "Ceylon Tea", "Handpicked", "Aroma", "Flavor", "Expertise",
    "Coconut", "Fresh", "Quality",
    "Spices", "Pure", "Authentic",
    "Ceylon Cinnamon", "High-grade", "Clean",
    "Sri Lankan rice", "Ethically sourced",
    "Global markets", "Partnerships", "Excellence", "Integrity"
  ];

  let highlighted = text;
  goldWords.forEach((word) => {
    highlighted = highlighted.replace(
      word,
      `<span class="text-[#C8A951]">${word}</span>`
    );
  });

  return highlighted;
};

// TIMELINE → MUST stay outside the component
const timeline = [
  { start: 0, end: 10, text: "Ceymos Lanka Pvt Ltd — Trusted Sri Lankan Exporters." },
  { start: 10, end: 22, text: "Delivering authentic Ceylon products to the world." },
  { start: 22, end: 34, text: "A legacy built on quality and tradition." },

  { start: 34, end: 46, text: "Premium Ceylon Tea from high-grown estates." },
  { start: 46, end: 58, text: "Handpicked leaves, rich aroma, bold flavor." },
  { start: 58, end: 70, text: "Crafted with 30+ years of expertise." },

  { start: 70, end: 82, text: "Pure and fresh coconut-based products." },
  { start: 82, end: 94, text: "Sustainably sourced from Sri Lankan farms." },
  { start: 94, end: 100, text: "Quality you can trust in every batch." },

  { start: 100, end: 106, text: "Authentic Sri Lankan spices, rich in flavor." },
  { start: 106, end: 112, text: "Carefully processed to preserve purity." },
  { start: 112, end: 118, text: "Perfect for premium food production." },

  { start: 118, end: 124, text: "World-renowned Ceylon Cinnamon." },
  { start: 124, end: 130, text: "Naturally fragrant, high-grade, and clean." },
  { start: 130, end: 136, text: "Sri Lanka’s finest export spice." },

  { start: 136, end: 142, text: "Premium Sri Lankan rice varieties." },
  { start: 142, end: 148, text: "Clean, fresh, and ethically sourced." },
  { start: 148, end: 154, text: "Perfect for global culinary markets." },

  { start: 154, end: 160, text: "Supplying to global markets with consistency." },
  { start: 160, end: 166, text: "Strong partnerships in Sri Lanka, Belarus, and Russia." },
  { start: 166, end: 172, text: "Quality assured from sourcing to shipping." },

  { start: 172, end: 178, text: "Ceymos Lanka — Your trusted export partner." },
  { start: 178, end: 184, text: "From Sri Lanka to the world, with integrity." },
  { start: 184, end: 190, text: "Bringing authentic Ceylon excellence to you." }
];

const topics = [
  { start: 190, end: 198, text: "The Art of Tea – Experience the timeless taste of true Ceylon tea." },
  { start: 198, end: 206, text: "Pure Ceylon Heritage – Handpicked leaves crafted with wisdom." },
  { start: 206, end: 214, text: "Sustainable Tea Culture – Grown with respect for nature and people." },
  { start: 214, end: 222, text: "From Leaf to Cup – A journey of aroma, purity, and craftsmanship." }
];

const VIDEO_LENGTH = 111;

const HeroSection = () => {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState("text");
  const [currentSentence, setCurrentSentence] = useState("");

  // REAL TIME SYNC (No loop)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTime = () => {
      const t = video.currentTime;

      if (t >= VIDEO_LENGTH - 3) {
        setPhase("logo");
        setCurrentSentence("");
        return;
      }

      setPhase("text");

      const seg =
        timeline.find((s) => t >= s.start && t < s.end) ||
        topics.find((s) => t >= s.start && t < s.end);

      if (seg) setCurrentSentence(highlightGold(seg.text));
      else setCurrentSentence("");
    };

    video.addEventListener("timeupdate", handleTime);
    return () => video.removeEventListener("timeupdate", handleTime);
  }, []);

  // HANDLE VIDEO LOOP (manual restart)
  const handleVideoEnd = () => {
    setPhase("logo");

    setTimeout(() => {
      setPhase("text");

      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play();
      }
    }, 2000); // logo display duration
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* VIDEO (NO LOOP) */}
      <video
        ref={videoRef}
        src={heroVideo}
        onEnded={handleVideoEnd}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="metadata"
        style={{ objectPosition: "center -140px" }}
      />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">

          {/* TEXT */}
          {phase === "text" && currentSentence !== "" && (
            <motion.p
              key={currentSentence}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 1.1 }}
              className="text-white text-3xl md:text-5xl font-semibold drop-shadow-2xl"
              dangerouslySetInnerHTML={{ __html: currentSentence }}
            />
          )}

          {/* LOGO */}
          {phase === "logo" && (
            <motion.img
              key="brand-logo"
              src={brandLogo}
              className="w-64 md:w-[340px] drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            />
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSection;

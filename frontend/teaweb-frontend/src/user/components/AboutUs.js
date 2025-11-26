import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import aboutImage from "../assets/HomePage/about.jpg";

export default function AboutCompany() {

  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });

  return (
    <section id="about-section" className="w-full py-20 bg-white">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >

        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={aboutImage}
            alt="Ceylon Tea Workers"
            className="w-full h-auto object-contain rounded-xl shadow-md"
          />
        </motion.div>

        {/* RIGHT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#3A2F2A] mb-8">
            About Our Company
          </h2>

          <h3 className="text-lg font-semibold text-[#3A2F2A] mb-4">
            Ceylon tea workers
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to <span className="font-semibold">Ceymos Lanka</span> —
            your gateway to the finest Ceylon tea, spices, and coconut products.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Rooted in over 30 years of family tradition, we bring heritage,
            craftsmanship, and global expertise together.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Our tea is grown in lush Sri Lankan highlands, processed with care
            to preserve richness and authentic flavour.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

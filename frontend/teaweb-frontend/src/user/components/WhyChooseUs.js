import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLeaf, FaChalkboardTeacher, FaMugHot } from "react-icons/fa";

export default function WhyChooseUs() {

  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: false });

  const items = [
    {
      title: "Authentic Interior",
      icon: <FaMugHot className="text-[#8BAA36] w-12 h-12" />,
      desc:
        "Warm wooden textures and natural elements create an inviting space for premium tea tasting and export discussions."
    },
    {
      title: "Expert Guidance",
      icon: <FaChalkboardTeacher className="text-[#8BAA36] w-12 h-12" />,
      desc:
        "We provide personalised sessions on flavour profiles, grading standards, and brewing techniques for international buyers."
    },
    {
      title: "Healthy Tea Pairings",
      icon: <FaLeaf className="text-[#8BAA36] w-12 h-12" />,
      desc:
        "Gluten-free and lactose-free sweets crafted to elevate the tasting experience of premium Ceylon teas."
    }
  ];

  return (
    <section className="w-full py-24 bg-[#F9F7F2]">
      
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl md:text-5xl font-serif text-[#3A2F2A] mb-16"
      >
        Why Choose Us
      </motion.h2>

      <div
        ref={ref}
        className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto px-6 text-center"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 60 }
            }
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group transition-all"
          >
            <div className="
              w-32 h-32 mx-auto rounded-full bg-white shadow-md flex items-center justify-center 
              border border-[#E6E6E6]
              group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mb-6
            ">
              {item.icon}
            </div>

            <h3 className="text-xl font-serif text-[#3A2F2A] mb-3">
              {item.title}
            </h3>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

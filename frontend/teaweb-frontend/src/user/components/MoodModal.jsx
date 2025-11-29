import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MoodModal({ open, onClose, mood, data, onShow }) {
  const [typedText, setTypedText] = useState("");
  const [step, setStep] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    setTypedText("");
    setStep(0);

    const intro = data.intro;
    let i = 0;

    const typeInterval = setInterval(() => {
      setTypedText(intro.slice(0, i));
      i++;
      if (i > intro.length) {
        clearInterval(typeInterval);
        setTimeout(() => setStep(1), 600);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [open, data]);

  useEffect(() => {
    if (step === 1 && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [step]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-[90%] max-w-xl rounded-xl shadow-xl p-8 relative"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
        >
          <button
            className="absolute top-4 right-5 text-xl text-gray-600"
            onClick={onClose}
          >
            ×
          </button>

          <h2 className="text-3xl font-bold mb-3" style={{ color: data.color }}>
            {mood}
          </h2>

          <div
            ref={scrollRef}
            className="max-h-48 overflow-y-auto pr-2 text-gray-700 leading-relaxed"
          >
            <p className="text-gray-800 mb-4">{typedText}</p>

            {step === 1 && (
              <p className="opacity-100 transition-all duration-500">
                {data.description}
              </p>
            )}

            {step === 1 && (
              <p className="mt-3 italic text-gray-600">{data.summary}</p>
            )}
          </div>

          <button
            onClick={onShow}
            className="mt-6 w-full py-3 text-lg font-semibold text-white rounded-lg"
            style={{ backgroundColor: data.color }}
          >
            Show Recommendations
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

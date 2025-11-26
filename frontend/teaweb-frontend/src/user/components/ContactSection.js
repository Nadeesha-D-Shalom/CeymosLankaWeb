import React from "react";

export default function ContactSection() {
  return (
    <section className="relative w-full h-[420px] md:h-[450px] overflow-hidden">

      {/* Google Map (dark mode, scrollable) */}
      <iframe
        title="Ceymos Lanka Map"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.157333347022!2d79.9441281!3d6.8792962!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2517493fc2c4d%3A0xe0e41b4030570b1f!2sCEYMOS%20LANKA%20Private%20Limited!5e0!3m2!1sen!2slk!4v1732605000000!5m2!1sen!2slk&mode=dark">
      </iframe>

      {/* Dark overlay for premium look */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Floating Contact Card */}
      <div
        className="
          absolute right-6 md:right-20 top-1/2 -translate-y-1/2
          bg-white p-8 rounded-xl shadow-2xl w-[310px] md:w-[380px] z-20
        "
      >
        <h2 className="text-3xl md:text-4xl font-serif text-[#3A2F2A] mb-4">
          Contacts
        </h2>

        <p className="text-gray-700 mb-3">
          CEYMOS LANKA (Pvt) Ltd  
          <br />
          270H,Dickland Watta, Hokandara Rd,  
        </p>

        <a href="tel:+94771662828" className="block underline text-[#3A2F2A] mb-2">
          +94 77 195 5100
        </a>

        <a href="mailto:ceymoslanka@gmail.com" className="block underline text-[#3A2F2A]">
          ceymos.lanka@gmail.com
        </a>
      </div>

      {/* Map Label + Pin */}
      <div className="absolute left-1/2 top-1/2 -translate-y-10 -translate-x-1/2 z-20">
        <div className="bg-white/95 p-4 rounded-xl shadow-lg mb-3">
          <h4 className="font-semibold text-[#3A2F2A]">CEYMOS LANKA</h4>
          <p className="text-gray-600 text-sm">Hokandara, Sri Lanka</p>
        </div>

        <div className="w-6 h-6 bg-red-600 rounded-full border-4 border-white mx-auto shadow-md"></div>
      </div>
    </section>
  );
}

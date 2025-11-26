import React from "react";
import teaImg from "../assets/HomePage/green.png";
import coconutImg from "../assets/HomePage/coco.jpg";
import cinnamonImg from "../assets/HomePage/cino.jpg";
import riceImg from "../assets/HomePage/rice.jpg";
import lineImg from "../assets/images/aq2.png";

function HomeProducts() {
  return (
    <section className="relative py-20 bg-[#FFF9F3]">

      {/* FORCE REMOVE ANY BORDER LINE ABOVE */}
      <div className="absolute -top-5 left-0 w-full h-8 bg-[#FFF9F3] pointer-events-none"></div>

      {/* HARD OVERRIDE (removes ANY border from parent layouts) */}
      <style>{`
        section, div, img {
          border: none !important;
          outline: none !important;
        }
        section {
          background-image: none !important;
        }
      `}</style>

      {/* Divider */}
      <div className="flex justify-center mb-12">
        <img
          src={lineImg}
          alt="divider"
          className="w-[260px] md:w-[340px] opacity-90 drop-shadow-sm"
        />
      </div>

      {/* Title */}
      <h2 className="text-center text-4xl md:text-5xl font-serif text-[#4A2C2A] mb-16 animate-fadeUpSoft">
        Our Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6 md:px-16">

        {/* CARD 1 */}
        <div className="animate-fadeLeft bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <img src={teaImg} alt="Tea" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#4A2C2A] mb-3">Ceylon Tea</h3>
            <p className="text-gray-600 mb-4">
              Finest black and green teas from Sri Lanka, handpicked from the lush highlands.
            </p>
            <a href="/tea" className="text-[#C8A951] font-semibold hover:underline">More Info</a>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="animate-fadeRight bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <img src={coconutImg} alt="Coconut" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#4A2C2A] mb-3">Coconut Products</h3>
            <p className="text-gray-600 mb-4">
              Natural coconut oil, milk, sugar and more. Pure, organic and sourced from Sri Lankan farmers.
            </p>
            <a href="/coconut" className="text-[#C8A951] font-semibold hover:underline">More Info</a>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="animate-fadeLeft bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <img src={cinnamonImg} alt="Cinnamon" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#4A2C2A] mb-3">Cinnamon</h3>
            <p className="text-gray-600 mb-4">
              Premium Ceylon cinnamon with unmatched aroma and medicinal properties.
            </p>
            <a href="/spices" className="text-[#C8A951] font-semibold hover:underline">More Info</a>
          </div>
        </div>

        {/* CARD 4 */}
        <div className="animate-fadeRight bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <img src={riceImg} alt="Rice" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#4A2C2A] mb-3">Rice</h3>
            <p className="text-gray-600 mb-4">
              Authentic Sri Lankan rice varieties grown naturally with high hygiene standards.
            </p>
            <a href="/rice" className="text-[#C8A951] font-semibold hover:underline">More Info</a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HomeProducts;

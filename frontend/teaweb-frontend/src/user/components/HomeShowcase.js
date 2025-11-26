import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomeShowcase.css";

/* === IMAGES === */
import teaImg from "../assets/HomePage/green.png";
import coconutImg from "../assets/HomePage/coco2.png";
import cinnamonImg from "../assets/HomePage/cino.png";
import riceImg from "../assets/HomePage/rice.png";

/* === CONTENT SECTIONS === */
const sections = [
  {
    id: 1,
    title: "Ceylon Tea",
    subtitle: "The world’s most celebrated tea heritage.",
    text: `Sri Lanka’s mist-covered highlands produce tea that is globally admired 
for its purity, fragrance, and golden liquor. Handpicked by expert tea pluckers, 
every leaf carries centuries of tradition.

Ceylon Tea is not just a drink — it is a cultural ritual that restores energy, 
improves focus, strengthens immunity, and uplifts the spirit.`,
    img: teaImg,
    link: "/tea",
  },
  {
    id: 2,
    title: "Coconut Products",
    subtitle: "Pure. Natural. Wholesome.",
    text: `Sri Lankan coconut products are prized worldwide for their unmatched freshness. 
From cold-pressed virgin coconut oil to coconut milk, flour, sugar and desiccated coconut — 
every product is processed with world-class hygiene and ethical farming methods.

Coconut is rich in nutrients, supports metabolism, boosts immunity, and is a core 
ingredient in healthy diets.`,
    img: coconutImg,
    link: "/coconut",
  },
  {
    id: 3,
    title: "Ceylon Cinnamon",
    subtitle: "The original ‘True Cinnamon’.",
    text: `Unlike common Cassia cinnamon found elsewhere, Ceylon Cinnamon is delicate, 
fragrant, and highly medicinal. It is hand-crafted using centuries-old peeling techniques 
and harvested every 1.2–2 years.

Celebrated for its antioxidant, anti-diabetic, and anti-inflammatory properties, it is 
one of Sri Lanka’s most precious gifts to the world.`,
    img: cinnamonImg,
    link: "/spices",
  },
  {
    id: 4,
    title: "Premium Sri Lankan Rice",
    subtitle: "Tradition preserved in every grain.",
    text: `Sri Lanka’s traditional rice varieties — such as Suwandel, Kalu Heenati, 
and Pachchaperumal — are known for their aroma, taste, and medicinal value. 

Naturally grown, pesticide-free, and packed with minerals and antioxidants, these 
rice varieties support wellness, strengthen the body, and preserve ancient agriculture.`,
    img: riceImg,
    link: "/rice",
  },
];

export default function HomeShowcase() {
  // === Scroll Animation (Slide + Fade) ===
  useEffect(() => {
    const blocks = document.querySelectorAll(".home-showcase");

    const onScroll = () => {
      blocks.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const visible = rect.top < window.innerHeight - 120 && rect.bottom > 120;

        if (visible) el.classList.add("show");
        else el.classList.remove("show");
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="home-showcase-wrapper">
      {sections.map((sec, i) => (
        <div key={sec.id}>
          <div className={`home-showcase ${i % 2 === 1 ? "reverse" : ""}`}>
            {/* TEXT */}
            <div className="hs-text">
              <h2>{sec.title}</h2>
              <h4>{sec.subtitle}</h4>
              <p>{sec.text}</p>

              <Link to={sec.link} className="hs-btn">
                View Products
              </Link>
            </div>

            {/* IMAGE */}
            <div className="hs-image">
              <img src={sec.img} alt={sec.title} />
            </div>
          </div>

          {/* DIVIDER */}
          {i !== sections.length - 1 && <div className="hs-divider"></div>}
        </div>
      ))}
    </section>
  );
}

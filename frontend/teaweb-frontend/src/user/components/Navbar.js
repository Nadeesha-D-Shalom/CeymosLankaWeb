import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/images/head.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToAbout = () => {
    navigate("/"); 
    setTimeout(() => {
      document.getElementById("about-section")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 300);
    setMobileOpen(false);
  };

  const textColor = isScrolled ? "text-[#4E3421]" : "text-white";
  const hoverColor = isScrolled ? "hover:text-[#6D4C30]" : "hover:text-[#C8A951]";

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b
        ${isScrolled ? "bg-white/95 border-black/10 shadow-md"
                     : "bg-[rgba(0,0,0,0.45)] border-white/10"}`}
    >
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
        
        <button onClick={scrollToTop} className="flex items-center gap-3">
          <img src={logo} alt="Ceymos Lanka" className="w-14 h-14" />
          <span className={`text-2xl font-bold tracking-wide ${textColor}`}>
            CEYMOS LANKA
          </span>
        </button>

        <div className={`hidden md:flex gap-10 text-lg font-medium ${textColor}`}>
          <button onClick={scrollToTop} className={hoverColor}>Home</button>

          <Link to="/tea" className={hoverColor}>Tea</Link>
          <Link to="/coconut" className={hoverColor}>Coconut</Link>
          <Link to="/spices" className={hoverColor}>Spices</Link>
          <Link to="/rice" className={hoverColor}>Rice</Link>
          <Link to="/products" className={hoverColor}>Products</Link>

          <button onClick={scrollToAbout} className={hoverColor}>About</button>

          <Link to="/contact" className={hoverColor}>Contact</Link>
        </div>

        <button
          className={`md:hidden text-4xl ${textColor}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden ${
            isScrolled ? "bg-white/95 text-[#4E3421]" : "bg-black/80 text-white"
          } text-lg py-5 px-6 space-y-4`}
        >
          <button onClick={scrollToTop}>Home</button>
          <Link to="/tea" onClick={() => setMobileOpen(false)}>Tea</Link>
          <Link to="/coconut" onClick={() => setMobileOpen(false)}>Coconut</Link>
          <Link to="/spices" onClick={() => setMobileOpen(false)}>Spices</Link>
          <Link to="/rice" onClick={() => setMobileOpen(false)}>Rice</Link>
          <Link to="/products" onClick={() => setMobileOpen(false)}>Products</Link>

          <button onClick={scrollToAbout}>About</button>

          <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

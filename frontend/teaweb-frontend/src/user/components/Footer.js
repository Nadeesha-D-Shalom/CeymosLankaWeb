import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import footerBg from "../assets/images/footer-new.png";
import logo from "../assets/images/head.png";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">

      {/* Background */}
      <div
        className="
          absolute inset-0 
          bg-center 
          bg-no-repeat 
          bg-cover
        "
        style={{ backgroundImage: `url(${footerBg})` }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-white">

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Quick links</h3>

          <ul className="space-y-2 text-white/90">
            <li>
              <Link
                to="/"
                className="hover:underline underline-offset-4 transition-all"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/tea"
                className="hover:underline underline-offset-4 transition-all"
              >
                Tea
              </Link>
            </li>

            <li>
              <Link
                to="/coconut"
                className="hover:underline underline-offset-4 transition-all"
              >
                Coconut
              </Link>
            </li>

            <li>
              <Link
                to="/spices"
                className="hover:underline underline-offset-4 transition-all"
              >
                Spices
              </Link>
            </li>

            <li>
              <Link
                to="/rice"
                className="hover:underline underline-offset-4 transition-all"
              >
                Rice
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="hover:underline underline-offset-4 transition-all"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:underline underline-offset-4 transition-all"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact us</h3>

          <p className="text-white/90">
            CEYMOS LANKA (PVT) LTD <br />
            No. 35, Colombo, <br />
            Sri Lanka.
          </p>

          <p className="mt-4 text-white/90">+94 77 123 4567</p>

          <a
            href="mailto:info@ceymoslanka.com"
            className="text-white/90 hover:underline underline-offset-4"
          >
            info@ceymoslanka.com
          </a>
        </div>

        {/* FOLLOW US */}
        <div className="text-center md:text-left">
          <img src={logo} alt="ceymos logo" className="w-28 mb-6 mx-auto md:mx-0" />

          <h3 className="text-xl font-semibold mb-6">Follow us on</h3>

          <div className="flex space-x-4 justify-center md:justify-start">

            {/* FACEBOOK */}
            <a
              href="https://web.facebook.com/people/Ceymos-Lanka/61576319648785/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-10 h-10 rounded-full border border-white 
                flex items-center justify-center 
                hover:bg-white hover:text-black transition
              "
            >
              <FaFacebookF size={18} />
            </a>

            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/ceymoslanka/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-10 h-10 rounded-full border border-white 
                flex items-center justify-center 
                hover:bg-white hover:text-black transition
              "
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="relative text-center text-white/80 text-sm py-6">
        Copyright © {new Date().getFullYear()} CEYMOS LANKA — All Rights Reserved
      </div>

    </footer>
  );
}

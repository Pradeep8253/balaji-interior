"use client";

import { FaWhatsapp, FaPhoneAlt, FaArrowUp } from "react-icons/fa";
import Link from "next/link";

const FloatingActionFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50  ">
      <Link
        href="https://wa.me/7019911372"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <FaWhatsapp size={20} />
      </Link>

      <Link
        href="tel:+917483794184"
        aria-label="Call us"
        className="bg-[#3b82f6] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <FaPhoneAlt size={20} />
      </Link>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="bg-[#6b4e20] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
};

export default FloatingActionFooter;

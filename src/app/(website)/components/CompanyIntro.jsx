"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Award, Building2, Users, Hammer, ArrowRight } from "lucide-react";
import Link from "next/link";

const CompanyIntro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: Award,
      text: "20+ Years of Experience",
      color: "text-amber-800",
      delay: "0ms",
    },
    {
      icon: Building2,
      text: "Residential & Commercial Projects",
      color: "text-amber-600",
      delay: "100ms",
    },
    {
      icon: Users,
      text: "Trusted by 1000+ Happy Clients",
      color: "text-amber-800",
      delay: "200ms",
      hidden: "hidden md:flex",
    },
    {
      icon: Hammer,
      text: "Complete Turnkey Interior Solutions",
      color: "text-amber-600",
      delay: "300ms",
      hidden: "hidden md:flex",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 text-center w-full mx-auto bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-amber-600 rounded-full opacity-5 animate-pulse"></div>
        <div
          className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-800 rounded-full opacity-5 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-6 h-6 bg-amber-600 rounded-full opacity-10 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Heading with Staggered Animation */}
      <div
        className={`transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-800 relative">
          <span
            className={`inline-block text-amber-600 transform transition-all duration-700 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            20+ Years
          </span>
          <span
            className={`inline-block transform transition-all duration-700 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {" "}
            of Excellence in Interior Design
          </span>

          {/* Animated Underline */}
          <div
            className={`absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full transform transition-all duration-1000 ease-out ${
              isVisible
                ? "w-32 -translate-x-16 opacity-100"
                : "w-0 -translate-x-0 opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          ></div>
        </h2>
      </div>

      {/* First Paragraph with Slide-in Animation */}
      <div
        className={`transform transition-all duration-800 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <p className="text-gray-800 text-lg max-w-4xl mx-auto mb-6 leading-relaxed">
          At{" "}
          <strong className="text-amber-800 relative">
            Balaji Luxury Interior Designers
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600 transform scale-x-0 origin-left transition-transform duration-500 hover:scale-x-100"></span>
          </strong>
          , we blend creativity with functionality to deliver premium interior
          design solutions tailored to your lifestyle. From elegant living rooms
          and modular kitchens to smart office layouts and luxurious wardrobes —
          we design with purpose and precision.
        </p>
      </div>

      {/* Second Paragraph with Fade-in Animation */}
      <div
        className={`transform transition-all duration-800 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <p className="text-gray-700 text-md max-w-3xl mx-auto mb-8 leading-relaxed">
          Our expertise spans across{" "}
          <strong className="text-amber-600">residential interiors</strong>,{" "}
          <strong className="text-amber-800">commercial spaces</strong>,
          <strong className="text-amber-600"> custom furniture</strong>,{" "}
          <strong className="text-amber-800">space planning</strong>, and
          complete <strong className="text-amber-600">turnkey projects</strong>.
          Whether you're building your dream home or upgrading your workspace,
          we ensure your vision is brought to life with style and care.
        </p>
      </div>

      {/* Animated Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`flex flex-col items-center group cursor-pointer ${
                stat.hidden || ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: isVisible ? "translateY(0px)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0,
                transition: `all 0.6s ease-out`,
                transitionDelay: `${1000 + index * 100}ms`,
              }}
            >
              {/* Icon Container with Animated Background */}
              <div
                className={`relative p-4 rounded-full transition-all duration-300 ease-out transform ${
                  hoveredCard === index
                    ? "scale-110 bg-gradient-to-br from-amber-800 to-amber-600 shadow-lg"
                    : "scale-100 bg-white shadow-md hover:shadow-lg"
                }`}
              >
                <Icon
                  size={40}
                  className={`transition-all duration-300 ${
                    hoveredCard === index ? "text-white" : stat.color
                  }`}
                />

                {/* Animated Ring */}
                <div
                  className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                    hoveredCard === index
                      ? "border-amber-600 scale-125 opacity-100"
                      : "border-transparent scale-100 opacity-0"
                  }`}
                ></div>
              </div>

              {/* Text with Hover Effect */}
              <p
                className={`font-semibold text-gray-800 mt-4 text-center transition-all duration-300 transform ${
                  hoveredCard === index ? "text-amber-800 scale-105" : ""
                }`}
              >
                {stat.text}
              </p>

              {/* Animated Bottom Border */}
              <div
                className={`h-0.5 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full mt-2 transition-all duration-300 ${
                  hoveredCard === index ? "w-12 opacity-100" : "w-0 opacity-0"
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* 3. Conditionally render the CTA Button */}
      {/*    The button will NOT render if isAboutPage is true */}
      {!isAboutPage && (
        <div
          className={`mt-12 flex justify-center transform transition-all duration-800 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "1400ms" }}
        >
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-full transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl transform overflow-hidden">
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <Link
              href="/about"
              className="relative z-10 font-semibold tracking-wide group-hover:tracking-wider transition-all duration-300"
            >
              ABOUT US
            </Link>

            {/* Animated Arrow */}
            <ArrowRight
              size={20}
              className="relative z-10 transform transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110"
            />

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 transform scale-0 group-hover:scale-150 group-hover:opacity-10 transition-all duration-500"></div>

            {/* Shine Effect */}
            <div className="absolute inset-0 -top-2 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform skew-x-12 group-hover:left-full transition-all duration-700"></div>
          </button>
        </div>
      )}

      {/* Floating Elements */}
      <div
        className="absolute top-20 right-10 w-2 h-2 bg-amber-600 rounded-full opacity-30 animate-ping hidden md:block"
        style={{ animationDelay: "3s" }}
      ></div>
      <div
        className="absolute bottom-20 left-10 w-3 h-3 bg-amber-800 rounded-full opacity-20 animate-pulse hidden md:block"
        style={{ animationDelay: "4s" }}
      ></div>
    </section>
  );
};

export default CompanyIntro;

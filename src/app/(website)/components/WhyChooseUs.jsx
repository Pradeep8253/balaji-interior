"use client";
import React, { useState, useEffect, useRef } from "react";
// 1. Import usePathname from next/navigation
import { usePathname } from "next/navigation";
import { ArrowRight, Star, Award, Home, Palette, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Luxury Interior Expertise",
    description:
      "Transforming spaces into timeless luxury with attention to detail.",
    icon: Award,
    gradient: "from-amber-600 to-orange-500",
  },
  {
    title: "Customized Design Approach",
    description: "We design spaces tailored to your taste, lifestyle & budget.",
    icon: Palette,
    gradient: "from-amber-700 to-amber-600",
  },
  {
    title: "Full Home Interiors",
    description:
      "One-stop solution for complete home interior design and execution.",
    icon: Home,
    gradient: "from-orange-600 to-amber-600",
  },
  {
    title: "Trusted By Clients",
    description:
      "20+ years of experience with a proven record of happy clients.",
    icon: Users,
    gradient: "from-amber-800 to-amber-700",
  },
];

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({
    first: false,
    second: false,
  });
  const sectionRef = useRef(null);

  // 2. Get the current path using the hook
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-6 max-w-7xl mx-auto bg-gradient-to-br from-amber-50 via-white to-orange-50 text-gray-800 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-amber-200 rounded-full opacity-10 animate-pulse"></div>
        <div
          className="absolute bottom-10 left-10 w-24 h-24 bg-orange-200 rounded-full opacity-15 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/3 w-4 h-4 bg-amber-600 rounded-full opacity-20 animate-ping"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch h-full relative z-10">
        {/* Text & Features */}
        <div className="order-1 lg:order-2 flex flex-col justify-between h-full">
          {/* Header Section */}
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="relative mb-6">
              <h1 className="md:text-5xl text-3xl font-bold text-amber-800 mb-4 text-center lg:text-left relative">
                <span
                  className={`inline-block transform transition-all duration-700 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  Why Choose
                </span>{" "}
                <span
                  className={`inline-block text-amber-600 transform transition-all duration-700 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  Us
                </span>
                {/* Animated Underline */}
                <div
                  className={`absolute -bottom-2 left-0 lg:left-0 w-full flex justify-center lg:justify-start ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: "800ms" }}
                >
                  <div
                    className="h-1 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? "120px" : "0px" }}
                  ></div>
                </div>
              </h1>

              {/* Floating Stars */}
              <div className="absolute -top-4 -right-4 hidden lg:block">
                <div
                  className={`flex space-x-1 transform transition-all duration-700 ${
                    isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                  style={{ transitionDelay: "1000ms" }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-amber-400 fill-current animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`transform transition-all duration-800 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <p className="text-amber-600 text-xl font-semibold mb-3 text-center lg:text-left">
                Elevating Spaces with Design That Speaks
              </p>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                We specialize in creating elegant, functional, and personalized
                interior spaces. Our experienced team transforms your vision
                into reality with precision and care.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8 w-full">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className={`group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-amber-100 hover:border-amber-300 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 h-full flex flex-col items-center lg:items-start text-center lg:text-left shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${800 + idx * 150}ms`,
                    animationDelay: `${800 + idx * 150}ms`,
                  }}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Icon Container */}
                  <div
                    className={`relative z-10 p-3 rounded-full transition-all duration-300 mb-4 ${
                      hoveredFeature === idx
                        ? `bg-gradient-to-br ${feature.gradient} shadow-lg scale-110`
                        : "bg-amber-50 shadow-md"
                    }`}
                  >
                    <IconComponent
                      size={28}
                      className={`transition-colors duration-300 ${
                        hoveredFeature === idx ? "text-white" : "text-amber-700"
                      }`}
                    />

                    {/* Rotating Ring */}
                    <div
                      className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                        hoveredFeature === idx
                          ? "border-amber-400 scale-125 opacity-100 animate-spin"
                          : "border-transparent scale-100 opacity-0"
                      }`}
                      style={{ animationDuration: "3s" }}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1">
                    <h4
                      className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                        hoveredFeature === idx
                          ? "text-amber-800"
                          : "text-gray-800"
                      }`}
                    >
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect Arrow */}
                  <div
                    className={`absolute bottom-4 right-4 transform transition-all duration-300 ${
                      hoveredFeature === idx
                        ? "translate-x-0 opacity-100 scale-100"
                        : "translate-x-2 opacity-0 scale-75"
                    }`}
                  >
                    <ArrowRight size={16} className="text-amber-600" />
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-2 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-1000"></div>
                </div>
              );
            })}
          </div>

          {/* 3. Conditionally render the CTA Button */}
          {/*    The button will NOT render if isAboutPage is true */}
          {!isAboutPage && (
            <div
              className={`items-center flex justify-center lg:justify-start transform transition-all duration-800 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "1400ms" }}
            >
              <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-full transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl transform overflow-hidden font-semibold tracking-wide">
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <Link
                  href="/about"
                  className="relative z-10 group-hover:tracking-wider transition-all duration-300"
                >
                  ABOUT US
                </Link>
                <ArrowRight
                  size={20}
                  className="relative z-10 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                />

                {/* Shine Effect */}
                <div className="absolute inset-0 -top-2 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-700"></div>
              </button>
            </div>
          )}
        </div>

        {/* Images */}
        <div className="order-2 lg:order-1 flex flex-col gap-8 h-full">
          {/* First Image */}
          <div
            className={`flex-1 relative overflow-hidden rounded-2xl shadow-xl group transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 group-hover:from-black/10 transition-all duration-500"></div>
            <img
              src="/fullhomeinteriors.png"
              alt="Full Home Interior Design"
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded.first ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() =>
                setImageLoaded((prev) => ({ ...prev, first: true }))
              }
            />
            {!imageLoaded.first && (
              <div className="absolute inset-0 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Image Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white font-bold text-lg mb-2">
                Complete Home Solutions
              </h3>
              <p className="text-white/90 text-sm">
                End-to-end interior design services
              </p>
            </div>
          </div>

          {/* Second Image */}
          <div
            className={`flex-1 relative overflow-hidden rounded-2xl shadow-xl group transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 group-hover:from-black/10 transition-all duration-500"></div>
            <img
              src="/lauxuryinterior.png"
              alt="Luxury Interior Design"
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded.second ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() =>
                setImageLoaded((prev) => ({ ...prev, second: true }))
              }
            />
            {!imageLoaded.second && (
              <div className="absolute inset-0 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white font-bold text-lg mb-2">
                Luxury Interiors
              </h3>
              <p className="text-white/90 text-sm">
                Premium design with attention to detail
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

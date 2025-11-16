"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/modulartv.png",
    heading: "Come say hi to beautiful interiors",
    subheading:
      "Visit your nearest Experience Centre to touch, feel and experience our products",
    button: {
      text: "VISIT US",
    },
  },
  {
    src: "/19.jpg",
    heading: "Discover Your Dream Kitchen",
    subheading: "Modular solutions tailored to your lifestyle and needs.",
    button: {
      text: "EXPLORE KITCHENS",
    },
  },
  {
    src: "/20.jpg",
    heading: "Elegant Wardrobe Designs",
    subheading:
      "Maximize your space with our stylish and functional wardrobes.",
    button: {
      text: "SEE DESIGNS",
    },
  },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const length = slides.length;

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(current === length - 1 ? 0 : current + 1);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(current === 0 ? length - 1 : current - 1);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  useEffect(() => {
    if (length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full max-w-10xl mx-auto overflow-hidden group">
      <div className="relative h-96 sm:h-[500px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === current
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.heading}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
            />
            <div className="absolute inset-0  flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                {slide.heading}
              </h1>
              <p className="text-white text-md sm:text-lg mt-4 max-w-xl md:max-w-2xl drop-shadow-lg">
                {slide.subheading}
              </p>
              <a
                href={slide.button.link}
                className="mt-8 bg-red-500 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-red-600 transition-colors duration-300"
              >
                {slide.button.text}
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="text-gray-800" />
      </button>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== current) {
                setIsTransitioning(true);
                setCurrent(index);
                setTimeout(() => setIsTransitioning(false), 700);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-red-500 "
                : "bg-white bg-opacity-60 hover:bg-opacity-80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

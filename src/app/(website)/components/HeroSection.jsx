// components/HeroSection.js

import React from "react";

export default function HeroSection({ title, subtitle, image }) {
  return (
    <section className="relative py-20 px-15 overflow-hidden">
      {/* Background Image */}
      {image && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Optional overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Text Content */}
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-lg mb-6">{subtitle}</p>
        </div>
      </div>

      {/* Decorative blur circle */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10 z-0">
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/30 blur-3xl" />
      </div>
    </section>
  );
}

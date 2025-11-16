import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import QuoteForm from "../quote-form";

const Hero = () => {
  const highlights = [
    "20+ Years of Industry Expertise",
    "Premium Quality Materials",
    "Expert Craftsmanship",
    "Timely Project Delivery",
    "Competitive Pricing",
  ];

  return (
    <section className="relative  pt-6 pb-10 md:py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* ✅ Left Content */}
          <div className="flex flex-col justify-center space-y-8 w-full">
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                BaLaji Luxury
                <span className="text-primary block">Interior Designers</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                BaLaji Luxury Interior Designers brings over{" "}
                <strong>20+ years</strong> of excellence in residential and
                commercial interiors. Our bespoke solutions transform spaces
                into captivating experiences—tailored, timeless, and true to
                your vision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 md:font-medium font-normal text-sm sm:text-base">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/services"
                className="bg-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-amber-900 transition-colors flex items-center justify-center space-x-2 group"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <QuoteForm>
                <button className="border-2 border-primary text-primary px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-amber-800 hover:text-white transition-colors">
                  Get Free Quote
                </button>
              </QuoteForm>
            </div>
          </div>

          {/* ✅ Right Images */}
          <div className="relative w-full">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="space-y-2 sm:space-y-4">
                <img
                  src="https://res.cloudinary.com/dnekarzit/image/upload/v1751049434/IMG-20250627-WA0046_j0lihv.jpg"
                  alt="Interior Design by BaLaji"
                  className="w-full h-40 sm:h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
                <img
                  src="https://res.cloudinary.com/dnekarzit/image/upload/v1751049420/IMG-20250627-WA0014_mxxdit.jpg"
                  alt="Modern Kitchen by BaLaji"
                  className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
              <div className="space-y-2 sm:space-y-4">
                <img
                  src="https://res.cloudinary.com/dnekarzit/image/upload/v1751049424/IMG-20250627-WA0023_jyonhr.jpg"
                  alt="Flooring Work by BaLaji"
                  className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
                <img
                  src="https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Living Room Design by BaLaji"
                  className="w-full h-40 sm:h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
            </div>

            {/* Stats box hidden on small screens */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-gray-600">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import Image from "next/image";
import Link from "next/link";

const data = {
  "luxury-interiors": [
    {
      title: "Bespoke Living Spaces",
      desc: "Custom-designed luxury spaces that reflect elegance and personal style.",
      img: "/18.jpg",
    },
    {
      title: "Premium Materials",
      desc: "Imported marble, designer fixtures, and high-end finishes for a timeless look.",
      img: "/18.jpg",
    },
    {
      title: "Smart Home Integration",
      desc: "Modern automation blended seamlessly with opulent design.",
      img: "/18.jpg",
    },
  ],
  "modular-interiors": [
    {
      title: "Modular Kitchen",
      desc: "Smart storage, sleek finishes, and ergonomic layouts for modern homes.",
      img: "/modularkitchen.png",
    },
    {
      title: "Modular Wardrobes",
      desc: "Customized wardrobes with a variety of finishes and internal configurations.",
      img: "/modularwardrobes.png",
    },
    {
      title: "Modular TV Units",
      desc: "Stylish entertainment units that complement your living space.",
      img: "/modulartv.png",
    },
  ],
  "full-home-interiors": [
    {
      title: "Complete Home Design",
      desc: "Interior design solutions from living room to bedroom to kitchen.",
      img: "/18.jpg",
    },
    {
      title: "End-to-End Execution",
      desc: "From concept to completion, we manage every stage of your home interiors.",
      img: "/18.jpg",
    },
    {
      title: "Design Personalization",
      desc: "Designs tailored to your lifestyle, budget, and taste.",
      img: "/18.jpg",
    },
  ],
  renovations: [
    {
      title: "Space Reconfiguration",
      desc: "Transform existing spaces into modern, functional areas.",
      img: "/18.jpg",
    },
    {
      title: "Material & Finish Upgrade",
      desc: "Upgrade floors, walls, lights, and fixtures for a refreshed look.",
      img: "/18.jpg",
    },
    {
      title: "End-to-End Renovation",
      desc: "Complete renovation solutions with minimal disruption.",
      img: "/18.jpg",
    },
  ],
};

export default function WhatWeOffer({ type }) {
  const offerings = data[type] || [];

  return (
    <section className="bg-[#f7f6f6] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 capitalize">
          What we offer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                <Link
                  href={`/interiors/interiors-details/${decodeURIComponent(
                    item.title
                  )
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}`}
                  className="text-red-600 text-sm font-medium mt-4 inline-flex items-center hover:underline"
                >
                  Get in touch <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-700 mt-12 max-w-4xl mx-auto text-center">
          Whether your project requires electrical work, plumbing, or other
          specialized services,{" "}
          <strong>Balaji Luxury Interior Designers</strong> ensures every detail
          is handled with professionalism. Through our trusted network of
          partners, we offer comprehensive solutions that go beyond interiors —
          delivering excellence from start to finish.
        </p>
      </div>
    </section>
  );
}

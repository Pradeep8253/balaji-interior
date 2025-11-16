"use client";

import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../Bredcrumb";

const content = {
  "modular-interiors": {
    heroHeading: "The finest choice in modular solutions",
    heroDescription:
      "Get your home up and running in a jiffy. Balaji Select offers a wide range of budget-friendly, high-quality modular solutions like kitchens, wardrobes, TV units, bookshelves, shoe racks and more in colours, designs and sizes that can be customised to match your home.",
    sectionHeading: "Bring home woodwork that lasts a lifetime",
    sectionDescription:
      "Get your home up and running in a jiffy. Balaji Select offers a wide range of budget-friendly, high-quality modular solutions like kitchens, wardrobes, TV units, bookshelves, shoe racks and more in colours, designs and sizes that can be customised to match your home.",
    bgImage: "/fullhomeinteriors.png",
  },
  "luxury-interiors": {
    heroHeading: "Redefining elegance with luxury interiors",
    heroDescription:
      "Experience refined craftsmanship, exquisite detailing, and custom elegance. Our luxury interior solutions transform your spaces into timeless works of art.",
    sectionHeading: "Luxury Interiors Designed for You",
    sectionDescription:
      "We craft timeless interiors using premium materials and bespoke design to reflect your unique taste and elevate your lifestyle.",
    bgImage: "/20.jpg",
  },
  "full-home-interiors": {
    heroHeading: "Complete home interiors under one roof",
    heroDescription:
      "From living rooms to bedrooms, kitchens to bathrooms—Balaji delivers full home interior solutions that reflect your lifestyle and personality.",
    sectionHeading: "Complete Solutions. One Stop.",
    sectionDescription:
      "Our full-home interior service covers every corner of your home, ensuring harmony in design and function.",
    bgImage: "/20.jpg",
  },
  renovations: {
    heroHeading: "Smart renovations for modern living",
    heroDescription:
      "Upgrade your space with Balaji’s expert renovation services. Whether it’s a kitchen revamp or a complete makeover, we bring innovation and comfort to every corner.",
    sectionHeading: "Your Home, Upgraded",
    sectionDescription:
      "Balaji renovates with purpose, enhancing utility, aesthetics, and comfort while respecting your budget and timeline.",
    bgImage: "/20.jpg",
  },
};

export default function OfferHero({ type = "modular-interiors" }) {
  const {
    heroHeading,
    heroDescription,
    sectionHeading,
    sectionDescription,
    bgImage,
  } = content[type] || content["modular-interiors"];

  return (
    <>
      <section className="relative h-[500px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt="Hero Background"
            fill
            className="object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{heroHeading}</h1>
          <p className="text-sm md:text-base text-gray-100 mb-6">
            {heroDescription}
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-full">
            BOOK ONLINE CONSULTATION
          </button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center py-12 px-4">
        <Breadcrumb />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {sectionHeading}
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          {sectionDescription}
        </p>
      </section>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Modular Interiors",
    desc: "Functional kitchen, wardrobe and storage",
    img: "https://res.cloudinary.com/dnekarzit/image/upload/v1719837448/IMG-20250627-WA0070_rc55fp.jpg",
  },
  {
    title: "Full Home Interiors",
    desc: "Turnkey interior solutions for your home",
    img: "/fullhomeinteriors.png",
  },
  {
    title: "Luxury Interiors",
    desc: "Tailored interiors that redefine elegance",
    img: "/lauxuryinterior.png",
  },
  {
    title: "Renovations",
    desc: "Expert solutions to upgrade your home",
    img: "/rennovations.png",
  },
  {
    title: "Modular Interiors",
    desc: "Functional kitchen, wardrobe and storage",
    img: "/modularinterion.png",
  },
  {
    title: "Full Home Interiors",
    desc: "Turnkey interior solutions for your home",
    img: "/fullhomeinteriors.png",
  },
  {
    title: "Luxury Interiors",
    desc: "Tailored interiors that redefine elegance",
    img: "/lauxuryinterior.png",
  },
  {
    title: "Renovations",
    desc: "Expert solutions to upgrade your home",
    img: "/rennovations.png",
  },
];

export default function InteriorHero() {
  return (
    <section className="bg-[#f9f8f8] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          One-stop shop for all things interiors
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Be it end-to-end interiors, renovation or modular solutions, we have
          it all for your home or office. With a wide range of furniture &
          decor, we have your back from start to finish.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((item, index) => (
            <Link
              key={index}
              href={`/interiors/${item.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all flex flex-col h-full"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="flex flex-col justify-between flex-grow p-5 text-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                  <div className="mt-6 text-black text-xl flex justify-center">
                    <span className="inline-flex w-8 h-8 items-center justify-center rounded-full hover:bg-black hover:text-white transition">
                      <ChevronRight size={20} />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { designIdeas } from "@/lib/data";

export default function DesginCard({ slug }) {
  const data = designIdeas[slug];

  if (!data) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-8">{data.description}</p>

      <div className="grid gap-6 md:grid-cols-3">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white"
          >
            <div className="relative w-full h-60">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-4">Size: {item.size}</p>
              <div className="flex justify-center">
                <button className="text-sm px-3 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                  Get Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

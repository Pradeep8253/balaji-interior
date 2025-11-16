"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

// Data list from InteriorHero as an array of image objects
const heroImages = [
  { src: "/modularinterion.png", label: "Tiles Flooring Installation" },
  { src: "/fullhomeinteriors.png", label: "Granite Flooring & Cladding" },
  { src: "/lauxuryinterior.png", label: "Interior Design Services" },
  { src: "/rennovations.png", label: "Residential & Commercial Projects" },
  { src: "/modularinterion.png", label: "Modular Kitchens & Wardrobes" },
  { src: "/fullhomeinteriors.png", label: "Carpentry & Furniture" },
  { src: "/lauxuryinterior.png", label: "False Ceiling & POP" },
  { src: "/rennovations.png", label: "Wall & Floor Finishing" },
];

const slides = [
  {
    topLeft: { src: "/fullhomeinteriors.png", label: "Living Room" },
    topRight1: { src: "/19.jpg", label: "Master Bedroom" },
    topRight2: { src: "/20.jpg", label: "False Ceiling" },
    bottomLeft: { src: "/18.jpg", label: "Homes by Balaji Luxury Interior" },
    bottomMiddle: { src: "/modularkitchen.png", label: "Kitchen" },
    bottomRight: { src: "/modularwardrobes.png", label: "Wardrobe" },
  },
  {
    topLeft: { src: "/18.jpg", label: "Living Room 2" },
    topRight1: { src: "/19.jpg", label: "Guest Room" },
    topRight2: { src: "/20.jpg", label: "Ceiling 2" },
    bottomLeft: { src: "/18.jpg", label: "Hallway" },
    bottomMiddle: { src: "/19.jpg", label: "Dining" },
    bottomRight: { src: "/20.jpg", label: "Almirah" },
  },
];

export default function InteriorDesignerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold md:font-bold text-gray-900 md:text-4xl">
            Inspiration for home interior designs
          </h1>
          <p className="text-primary text-lg max-w-3xl mx-auto mb-2 font-semibold hidden md:block">
            Give your home a new look with these interior design ideas curated
            for you
          </p>
        </div>
        <Link
          href="/portfolio"
          className="text-sm text-primary flex items-center gap-1 hover:underline"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[900px] flex flex-col gap-4"
              >
                {/* Top Section */}
                <div className="flex h-[250px] gap-4">
                  {/* Top Left */}
                  <Link
                    href={`/design-concepts/${slugify(slide.topLeft.label)}`}
                    className="w-1/2 relative rounded-xl overflow-hidden block"
                  >
                    <Image
                      src={slide.topLeft.src}
                      alt={slide.topLeft.label}
                      fill
                      className="object-cover"
                    />
                    <Label text={slide.topLeft.label} />
                  </Link>

                  {/* Top Right */}
                  <div className="w-1/2 flex flex-col gap-4">
                    <Link
                      href={`/design-concepts/${slugify(
                        slide.topRight1.label
                      )}`}
                      className="relative h-1/2 rounded-xl overflow-hidden block"
                    >
                      <Image
                        src={slide.topRight1.src}
                        alt={slide.topRight1.label}
                        fill
                        className="object-cover"
                      />
                      <Label text={slide.topRight1.label} />
                    </Link>
                    <Link
                      href={`/design-concepts/${slugify(
                        slide.topRight2.label
                      )}`}
                      className="relative h-1/2 rounded-xl overflow-hidden block"
                    >
                      <Image
                        src={slide.topRight2.src}
                        alt={slide.topRight2.label}
                        fill
                        className="object-cover"
                      />
                      <Label text={slide.topRight2.label} />
                    </Link>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex h-[150px] gap-4">
                  <Link
                    href={`/design-concepts/${slugify(slide.bottomLeft.label)}`}
                    className="w-1/4 relative rounded-xl overflow-hidden block"
                  >
                    <Image
                      src={slide.bottomLeft.src}
                      alt={slide.bottomLeft.label}
                      fill
                      className="object-cover"
                    />
                    <Label text={slide.bottomLeft.label} />
                  </Link>
                  <Link
                    href={`/design-concepts/${slugify(
                      slide.bottomMiddle.label
                    )}`}
                    className="w-1/2 relative rounded-xl overflow-hidden block"
                  >
                    <Image
                      src={slide.bottomMiddle.src}
                      alt={slide.bottomMiddle.label}
                      fill
                      className="object-cover"
                    />
                    <Label text={slide.bottomMiddle.label} />
                  </Link>
                  <Link
                    href={`/design-concepts/${slugify(
                      slide.bottomRight.label
                    )}`}
                    className="w-1/4 relative rounded-xl overflow-hidden block"
                  >
                    <Image
                      src={slide.bottomRight.src}
                      alt={slide.bottomRight.label}
                      fill
                      className="object-cover"
                    />
                    <Label text={slide.bottomRight.label} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {selectedIndex > 0 && (
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <ChevronLeft />
          </button>
        )}
        {selectedIndex < slides.length - 1 && (
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}

function Label({ text }) {
  return (
    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
      {text}
    </div>
  );
}

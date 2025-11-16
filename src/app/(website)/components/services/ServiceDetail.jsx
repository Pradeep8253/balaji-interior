"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  ArrowLeft,
  CheckCircle,
  Star,
  Phone,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import QuoteForm from "../quote-form";

const ImageModal = ({ images, activeIndex, onClose }) => {
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, startIndex: activeIndex },
    [Autoplay({ delay: 3500 })]
  );

  const overlayRef = useRef();

  const handleOutsideClick = useCallback(
    (e) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        onClick={handleOutsideClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-3 md:px-0"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-2xl rounded-2xl"
        >
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1 right-2 md:right-1 md:top-6 z-10 text-white bg-primary hover:bg-amber-900 rounded-full p-2 h-10 w-10 cursor-pointer"
          >
            ✕
          </motion.button>

          <motion.button
            onClick={scrollPrev}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-amber-900 text-white rounded-full p-2 cursor-pointer"
          >
            <ChevronLeft size={28} />
          </motion.button>

          <motion.button
            onClick={scrollNext}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-amber-900 text-white rounded-full p-2 cursor-pointer"
          >
            <ChevronRight size={28} />
          </motion.button>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-lg backdrop-blur-3xl shadow-2xl"
            ref={emblaRef}
          >
            <div className="flex">
              {images?.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img.url}
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full md:h-[70vh] h-full object-contain flex-shrink-0 cursor-pointer"
                  alt={img.fileName || `Preview ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ServiceDetail = ({ service }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openFeatureIndex, setOpenFeatureIndex] = useState(null);
  const [showFull, setShowFull] = useState(false);

  const allImages = service?.image?.length ? service?.image : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveImageIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !emblaApi.plugins().autoplay) return;
    const autoplayPlugin = emblaApi.plugins().autoplay;

    if (modalOpen) {
      autoplayPlugin.stop();
    } else {
      autoplayPlugin.play();
    }
  }, [modalOpen, emblaApi]);

  const handleThumbnailClick = (index) => {
    if (emblaApi) emblaApi.scrollTo(index);
    openModal(index);
  };

  const openModal = (index) => {
    setActiveImageIndex(index);
    setModalOpen(true);
  };

  const displayedThumbnails = useMemo(() => {
    if (!allImages || allImages.length === 0) return [];
    const items = allImages.map((img, index) => ({
      src: img,
      originalIndex: index,
    }));
    const part2 = items.slice(activeImageIndex);
    const part1 = items.slice(0, activeImageIndex);
    return [...part2, ...part1];
  }, [allImages, activeImageIndex]);

  const words = service?.about?.split(" ") || [];
  const isLong = words.length > 100;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ x: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 text-primary hover:text-amber-700 font-medium cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Services</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-2xl shadow-2xl relative"
              ref={emblaRef}
            >
              <div className="flex">
                {allImages.map((img, index) => (
                  <motion.div
                    className="relative flex-shrink-0 w-full cursor-pointer"
                    key={index}
                    style={{ flex: "0 0 100%" }}
                    onClick={() => openModal(index)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={img.url}
                      alt={
                        img.fileName || `${service?.title} - Image ${index + 1}`
                      }
                      className="w-full h-96 object-cover hover:opacity-90 transition"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="grid grid-cols-4 gap-4">
              {displayedThumbnails.slice(0, 4).map((thumbnail, idx) => (
                <motion.div
                  key={thumbnail.originalIndex}
                  className="relative cursor-pointer"
                  onClick={() => handleThumbnailClick(thumbnail.originalIndex)}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <img
                    src={thumbnail.src.url}
                    alt={
                      thumbnail.src.fileName ||
                      `Thumbnail ${thumbnail.originalIndex + 1}`
                    }
                    className="w-full h-24 object-cover rounded-lg shadow-md hover:shadow-lg opacity-70 hover:opacity-100"
                  />
                  {idx === 3 && allImages.length > 4 && (
                    <motion.div className="absolute inset-0 bg-black/60 text-white font-bold text-lg flex items-center justify-center rounded-lg">
                      +{allImages.length - 4}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="pt-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                About
              </h2>
              <div className="mt-4 text-gray-700 relative">
                {!showFull && isLong ? (
                  <div className="relative">
                    <p className="leading-relaxed line-clamp-10">
                      {service?.about}
                    </p>
                    <div className="absolute bottom-0 right-0 bg-white pl-2 ">
                      <button
                        onClick={() => setShowFull(true)}
                        className="text-amber-600 hover:underline cursor-pointer"
                      >
                        View More
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="leading-relaxed">{service?.about}</p>
                    {isLong && (
                      <div className="mt-2">
                        <button
                          onClick={() => setShowFull(false)}
                          className="text-amber-600  cursor-pointer hover:underline"
                        >
                          View Less
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {service?.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {service?.description}
              </p>
            </motion.div>

            <motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What's Included
              </h3>
              <div className="grid gap-4">
                {service?.features.map((feature, index) => {
                  const isOpen = openFeatureIndex === index;
                  return (
                    <motion.div
                      key={index}
                      className="p-4 bg-white rounded-lg shadow-sm cursor-pointer"
                      onClick={() => setOpenFeatureIndex(isOpen ? null : index)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                          <span className="text-gray-700 font-medium">
                            {feature?.title}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 text-gray-600 text-sm leading-relaxed pl-9 pr-1"
                          >
                            {feature?.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl">
              <div className="text-center space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="flex-1 bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-900 flex items-center justify-center space-x-2 cursor-pointer"
                    onClick={() => (window.location.href = "tel:+919980238628")}
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Now</span>
                  </motion.button>
                  <QuoteForm>
                    <motion.button className="flex-1 border-2 border-primary text-primary py-4 px-6 rounded-lg font-semibold hover:bg-primary hover:text-white flex items-center justify-center space-x-2 cursor-pointer">
                      <span>Get Quote</span>
                    </motion.button>
                  </QuoteForm>
                </div>
                <p className="text-sm text-gray-600">
                  Free consultation • 24/7 support • Quality guarantee
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <ImageModal
            images={allImages}
            activeIndex={activeImageIndex}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ServiceDetail;

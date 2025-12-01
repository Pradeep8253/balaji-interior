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

/* ----------------------------------------------------
   IMAGE MODAL
---------------------------------------------------- */
const ImageModal = ({ images = [], activeIndex = 0, onClose }) => {
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, startIndex: activeIndex },
    [Autoplay({ delay: 3500, playOnInit: false })]
  );

  const overlayRef = useRef();

  const handleOutsideClick = useCallback(
    (e) => {
      if (e.target === overlayRef.current) onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Start autoplay after embla is initialized
  useEffect(() => {
    if (!embla) return;

    const autoplayPlugin = embla?.plugins?.()?.autoplay;
    if (autoplayPlugin) {
      // Small delay to ensure slides are rendered
      const timer = setTimeout(() => {
        autoplayPlugin.play();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [embla]);

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
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl rounded-2xl"
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 right-3 z-10 text-white bg-primary hover:bg-amber-900 rounded-full p-2 h-10 w-10"
          >
            ×
          </motion.button>

          {/* Prev */}
          <motion.button
            onClick={() => embla?.scrollPrev()}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-amber-900 text-white rounded-full p-2"
          >
            <ChevronLeft size={28} />
          </motion.button>

          {/* Next */}
          <motion.button
            onClick={() => embla?.scrollNext()}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-amber-900 text-white rounded-full p-2"
          >
            <ChevronRight size={28} />
          </motion.button>

          <motion.div ref={emblaRef} className="overflow-hidden rounded-lg">
            <div className="flex">
              {images?.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img?.url}
                  onClick={(e) => e.stopPropagation() || onClose?.()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full md:h-[70vh] object-contain flex-shrink-0"
                  alt={img?.fileName || `Preview ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ----------------------------------------------------
   SERVICE DETAIL MAIN COMPONENT
---------------------------------------------------- */
const ServiceDetail = ({ service = {} }) => {
  const router = useRouter();

  /* --------------------------------------------
     NORMALIZE IMAGES - Safe with optional chaining
  -------------------------------------------- */
  const allImages = useMemo(() => {
    if (!service?.image || !Array.isArray(service?.image)) return [];

    return (
      service?.image?.map((img) =>
        typeof img === "string"
          ? { url: img, fileName: "" }
          : { url: img?.url ?? "", fileName: img?.fileName ?? "" }
      ) ?? []
    );
  }, [service?.image]);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openFeatureIndex, setOpenFeatureIndex] = useState(null);
  const [showFull, setShowFull] = useState(false);

  /* Embla for main slider - Initialize autoplay with playOnInit: false */
  const autoplayOptions = useMemo(
    () => ({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: false, // Don't auto-start, we'll start it manually
    }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: allImages?.length > 1 },
    allImages?.length > 0 ? [Autoplay(autoplayOptions)] : []
  );

  // Initialize autoplay after emblaApi is ready and has slides
  useEffect(() => {
    if (!emblaApi || allImages?.length === 0) return;

    const startAutoplay = () => {
      const slideNodes = emblaApi?.slideNodes?.();
      const autoplayPlugin = emblaApi?.plugins?.()?.autoplay;

      // Only start if we have slides and autoplay plugin
      if (slideNodes && slideNodes.length > 0 && autoplayPlugin) {
        autoplayPlugin.play();
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(startAutoplay, 150);

    return () => clearTimeout(timer);
  }, [emblaApi, allImages?.length]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () =>
      setActiveImageIndex(emblaApi?.selectedScrollSnap() ?? 0);
    emblaApi?.on("select", onSelect);
    return () => emblaApi?.off("select", onSelect);
  }, [emblaApi]);

  /* Stop/Resume autoplay when modal opens/closes */
  useEffect(() => {
    if (!emblaApi || allImages?.length === 0) return;

    const autoplayPlugin = emblaApi?.plugins?.()?.autoplay;
    if (!autoplayPlugin) return;

    if (modalOpen) {
      autoplayPlugin?.stop?.();
    } else {
      // Only resume if slides exist
      const slideNodes = emblaApi?.slideNodes?.();
      if (slideNodes && slideNodes.length > 0) {
        // Small delay before resuming
        const timer = setTimeout(() => {
          autoplayPlugin?.play?.();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [modalOpen, emblaApi, allImages?.length]);

  /* Thumbnail reorder */
  const displayedThumbnails = useMemo(() => {
    if (!allImages?.length) return [];

    const items =
      allImages?.map((img, index) => ({
        src: img,
        originalIndex: index,
      })) ?? [];

    return [
      ...items.slice(activeImageIndex),
      ...items.slice(0, activeImageIndex),
    ];
  }, [allImages, activeImageIndex]);

  /* About section */
  const words = service?.about?.split(" ") ?? [];
  const isLong = words?.length > 100;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router?.back()}
            className="flex items-center text-primary hover:text-amber-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Services
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT SECTION */}
          <div className="space-y-6">
            {/* MAIN IMAGE SLIDER */}
            {allImages?.length > 0 ? (
              <div
                ref={emblaRef}
                className="overflow-hidden rounded-2xl shadow-xl relative"
              >
                <div className="flex">
                  {allImages?.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-full flex-shrink-0 cursor-pointer"
                      style={{ flex: "0 0 100%" }}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setModalOpen(true);
                      }}
                    >
                      <img
                        src={img?.url}
                        alt={`${service?.title ?? "Service"} ${idx + 1}`}
                        className="w-full h-96 object-cover hover:opacity-90 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-96 flex items-center justify-center text-gray-500">
                No images available
              </div>
            )}

            {/* THUMBNAILS */}
            {allImages?.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {displayedThumbnails?.slice(0, 4)?.map((thumbnail, idx) => (
                  <div
                    key={thumbnail?.originalIndex}
                    className="relative cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => {
                      emblaApi?.scrollTo(thumbnail?.originalIndex);
                      setActiveImageIndex(thumbnail?.originalIndex);
                      setModalOpen(true);
                    }}
                  >
                    <img
                      src={thumbnail?.src?.url}
                      alt={`Thumbnail ${(thumbnail?.originalIndex ?? 0) + 1}`}
                      className="w-full h-24 object-cover hover:opacity-90 transition"
                    />
                    {idx === 3 && allImages?.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 text-white text-lg font-bold flex items-center justify-center rounded-lg">
                        +{allImages?.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ABOUT SECTION */}
            {service?.about && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">About</h2>
                <div className="mt-4 text-gray-700 relative">
                  {!showFull && isLong ? (
                    <>
                      <p className="leading-relaxed line-clamp-10">
                        {service?.about}
                      </p>
                      <button
                        onClick={() => setShowFull(true)}
                        className="text-amber-600 hover:underline absolute bottom-0 right-0 bg-white pl-2"
                      >
                        View More
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="leading-relaxed">{service?.about}</p>
                      {isLong && (
                        <button
                          onClick={() => setShowFull(false)}
                          className="text-amber-600 hover:underline mt-2 inline-block"
                        >
                          View Less
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {service?.title ?? "Untitled Service"}
              </h1>
              <p className="text-xl text-gray-600">
                {service?.description ?? "No description available."}
              </p>
            </div>

            {/* FEATURES LIST */}
            {Array.isArray(service?.features) &&
              service?.features?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    What's Included
                  </h3>

                  <div className="grid gap-4">
                    {service?.features?.map((feature, index) => {
                      const isOpen = openFeatureIndex === index;

                      return (
                        <motion.div
                          key={index}
                          onClick={() =>
                            setOpenFeatureIndex(isOpen ? null : index)
                          }
                          className="p-4 bg-white rounded-lg shadow-sm cursor-pointer border border-gray-100"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex space-x-3">
                              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 font-medium">
                                {feature?.title ?? "Untitled Feature"}
                              </span>
                            </div>

                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </div>

                          <AnimatePresence>
                            {isOpen && feature?.detail && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 text-gray-600 pl-9 text-sm overflow-hidden"
                              >
                                {feature?.detail}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* CTA BUTTONS */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl text-center space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="flex-1 bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-900 flex items-center justify-center transition"
                  onClick={() => (window.location.href = "tel:+919980238628")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </motion.button>

                <QuoteForm>
                  <motion.button
                    className="flex-1 border-2 border-primary text-primary py-4 px-6 rounded-lg font-semibold hover:bg-primary hover:text-white transition flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Quote
                  </motion.button>
                </QuoteForm>
              </div>

              <p className="text-sm text-gray-600">
                Free consultation • 24/7 support • Quality guarantee
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {modalOpen && allImages?.length > 0 && (
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

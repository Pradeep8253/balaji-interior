"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ConsultationForm from "../components/consultation-form";

export default function Portfolio({ data }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const video = document.createElement("video");
    video.src =
      "https://res.cloudinary.com/dnekarzit/video/upload/v1751049454/VID-20250627-WA0003_vdnaod.mp4";
    video.load();
    video.onloadedmetadata = () => setIsVideoLoaded(true);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedImage]);

  const openImageModal = (item, index) => {
    if (item?.image) {
      setSelectedImage({ ...item, index });
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = selectedImage.index;
    const imageItems = data.filter((item) => item?.image);
    const currentImageIndex = imageItems.findIndex(
      (_, idx) =>
        data.findIndex((dataItem) => dataItem === imageItems[idx]) ===
        currentIndex
    );

    let newImageIndex;
    if (direction === "next") {
      newImageIndex = (currentImageIndex + 1) % imageItems.length;
    } else {
      newImageIndex =
        currentImageIndex === 0 ? imageItems.length - 1 : currentImageIndex - 1;
    }

    const newDataIndex = data.findIndex(
      (item) => item === imageItems[newImageIndex]
    );
    setSelectedImage({ ...imageItems[newImageIndex], index: newDataIndex });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {/* Hero Section with Image */}
      <motion.section
        className="relative h-[50vh] md:h-[80vh] lg:h-[70vh] w-full overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Image
          src="/32.png"
          alt="Portfolio Hero"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <motion.div
          className="bg-opacity-50 absolute inset-0 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="text-center px-4">
            <motion.h1
              className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Our Signature Projects
            </motion.h1>
            <motion.p
              className="text-white text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Experience luxury interior design that transforms spaces into
              works of art
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Portfolio Grid */}
      <section
        className="bg-[#f9f5f1] py-12 px-4 sm:px-6 lg:px-8 text-gray-800"
        ref={ref}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold  mb-4 inline-block text-amber-600 transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
          }`"
            >
              Transforming Dreams into Luxurious Realities
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Explore our curated collection of completed projects, each
              reflecting our commitment to craftsmanship, detail, and elegant
              design aesthetics.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {data?.map((item, index) => (
              <motion.div
                key={index}
                className="group bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                variants={item}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className={`relative overflow-hidden aspect-square cursor-pointer`}
                  onClick={() => openImageModal(item, index)}
                >
                  <Image
                    src={item?.image[0]?.url}
                    alt={item?.image[0]?.fileName}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                  {/* Zoom overlay hint */}
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm md:text-base">
                    {item?.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-90"
              onClick={closeImageModal}
            />

            {/* Modal Content */}
            <motion.div
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-200"
                aria-label="Close image"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation Buttons */}
              {data?.filter((item) => item?.image).length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Image */}
              <div className="relative max-w-full max-h-full">
                <Image
                  src={selectedImage?.image[0]?.url}
                  alt={selectedImage?.image[0]?.fileName}
                  width={1200}
                  height={1200}
                  className="max-w-full max-h-[90vh] object-contain"
                  priority
                />

                {/* Image Description */}
                {selectedImage?.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 text-center">
                    <p className="text-sm md:text-base">
                      {selectedImage?.title}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.section
        className="bg-[#5b5159] text-white py-16 px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            className="text-lg mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Let's discuss how we can bring your vision to life with our luxury
            interior design services.
          </motion.p>

          <ConsultationForm>
            <motion.button
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Schedule a Consultation
            </motion.button>
          </ConsultationForm>
        </div>
      </motion.section>
    </>
  );
}

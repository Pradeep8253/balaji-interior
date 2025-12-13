"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Filter,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import HeroSection from "../../components/HeroSection";

export default function ServiceCard({ categories: initialCategories, isHome }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/category/get`
          );
          setCategories(res?.data?.data || []);
        } catch (error) {
          console.error("Error fetching services:", error);
          toast.error("Failed to fetch services.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [initialCategories]);

  const allServices = useMemo(() => {
    return categories.flatMap((cat) =>
      (cat?.services || []).map((s) => ({
        ...s,
        _categoryId: cat?._id,
        _categoryName: cat?.name,
      }))
    );
  }, [categories]);

  const filters = useMemo(() => {
    return [
      {
        id: "all",
        label: "All Services",
        count: allServices.length,
        icon: Sparkles,
      },
      ...categories.map((cat) => ({
        id: cat._id,
        label: cat.name,
        count: (cat.services || []).length,
        icon: Filter,
      })),
    ];
  }, [categories, allServices.length]);

  const filteredServices = useMemo(() => {
    if (activeFilter === "all") return allServices;
    return allServices.filter(
      (service) => String(service._categoryId) === String(activeFilter)
    );
  }, [allServices, activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {!isHome && (
        <HeroSection
          title="Our Services"
          subtitle="Explore the range of professional services we offer."
          image="/21.png"
        />
      )}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Premium Services
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">
              Our Premium Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From consultation to completion, we offer comprehensive interior
              design and renovation solutions tailored to transform your space.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              return (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative flex items-center px-4 py-3 rounded-2xl font-semibold transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg"
                      : "bg-white text-gray-700 hover:text-amber-700 shadow-md border border-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {filter.label}
                  <span className="ml-2 text-sm font-bold">{filter.count}</span>
                </motion.button>
              );
            })}
          </motion.div>
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-2xl border border-gray-100 shadow p-6 h-[380px]"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
                  <div className="w-24 h-6 bg-gray-200 rounded mb-2" />
                  <div className="w-3/4 h-7 bg-gray-200 rounded mb-3" />
                  <div className="w-full h-4 bg-gray-200 rounded mb-2" />
                  <div className="w-2/3 h-4 bg-gray-200 rounded mb-6" />
                  <div className="w-full h-11 bg-gray-200 rounded-xl" />
                </div>
              ))}
            </div>
          )}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service._id || `${service.slug}-${index}`}
                    variants={cardVariants}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-amber-200"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={service?.image?.[0]?.url || "/placeholder.jpg"}
                          alt={service?.title || "Service"}
                          className="w-full h-52 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Rating */}
                        <motion.div
                          className="absolute top-4 right-4 bg-white/95 px-3 py-2 rounded-2xl flex items-center space-x-2 shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-bold text-gray-800">
                            4.9
                          </span>
                        </motion.div>
                        {/* Premium Badge */}
                        <motion.div
                          className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>PREMIUM</span>
                        </motion.div>
                      </div>
                      {/* Content */}
                      <div className="p-6">
                        <span className="inline-flex items-center px-3 py-1.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-xl mb-4 capitalize">
                          {service._categoryName ||
                            service?.category?.name ||
                            "Service"}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700">
                          {service?.title}
                        </h3>
                        <p className="text-gray-600 mb-5 line-clamp-2">
                          {service?.description}
                        </p>
                        <div className="mb-6">
                          <div className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            Key Features:
                          </div>
                          <ul className="space-y-2">
                            {(service?.features || [])
                              .slice(0, 3)
                              .map((feature, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-gray-600 flex items-center"
                                >
                                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3" />
                                  {feature?.title || feature}
                                </li>
                              ))}
                            {(service?.features || []).length > 3 && (
                              <li className="text-sm text-amber-600 font-semibold flex items-center">
                                <Clock className="h-3 w-3 mr-2" />+
                                {(service?.features || []).length - 3} more
                              </li>
                            )}
                          </ul>
                        </div>
                        <motion.div
                          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3.5 px-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>View Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
          {!loading && filteredServices.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No services found
              </h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                No services match the selected category. Try selecting another.
              </p>
              <motion.button
                onClick={() => setActiveFilter("all")}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Services
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
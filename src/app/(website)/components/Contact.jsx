"use client";
import React, { useState } from "react";
// Import motion from framer-motion
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import HeroSection from "./HeroSection";

// --- Animation Variants ---
// We define animation variants here to keep the JSX clean.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We will contact you soon.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9980238628", "+91 7483794184"],
      action: "tel:+919880238628",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["balajiluxuryinteriordesigners@gmail.com"],
      action: "mailto:balajiluxuryinteriordesigners@gmail.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "Office Address: SRI.K. BABU NAIDU, No. 4, 'Skanda Nilaya', near Bangalore One, Subramanyapura Main Road, Uttarahalli, Bangalore South – 560061",
      ],
      action: "#",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      action: "#",
    },
  ];

  return (
    // Animate the whole section on view
    <motion.section
      className=" bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <HeroSection
        title="Contact Us"
        subtitle="Learn more about our mission and values."
        image="/completehomedesign.png"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Ready to transform your space? Contact us for a free consultation
            and quote. Our team is here to help bring your vision to life.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Info & Map - Animate from left */}
          <motion.div className="space-y-10" variants={slideInLeft}>
            <motion.div
              className="space-y-6"
              variants={containerVariants} // Stagger container for info cards
            >
              <motion.h3
                className="text-2xl font-semibold text-gray-800"
                variants={itemVariants}
              >
                Contact Information
              </motion.h3>
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl shadow hover:shadow-md transition"
                  variants={itemVariants} // Each card animates in
                >
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <info.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      {info.title}
                    </h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="rounded-xl overflow-hidden shadow"
              variants={itemVariants} // Animate map as well
            >
              <iframe
                className="w-full h-72 border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.3435650086165!2d77.53718617420216!3d12.89953878740454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fc0eab12f95%3A0x1df55cdefa419b10!2sSubramanyapura%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1721370047349"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Right Side: Contact Form - Animate from right */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg"
            variants={slideInRight}
          >
            <motion.h3
              className="text-2xl font-semibold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Send Us a Message
            </motion.h3>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={containerVariants} // Stagger container for form fields
              initial="hidden"
              animate="visible"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-amber-500 focus:border-amber-500"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-amber-500 focus:border-amber-500"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-amber-500 focus:border-amber-500"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="service"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">Select a service</option>
                  <option value="flooring">Flooring Services</option>
                  <option value="interior">Interior Design</option>
                  <option value="renovation">Renovation & Repair</option>
                  <option value="consultation">Consultation</option>
                </select>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-amber-500 focus:border-amber-500 resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;

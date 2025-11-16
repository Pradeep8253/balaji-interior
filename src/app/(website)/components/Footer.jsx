import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const offerings = [
    {
      name: "Tiles Flooring Installation",
      href: "/services/tiles-flooring-installation",
    },
    {
      name: "Granite Flooring & Cladding",
      href: "/services/granite-flooring-cladding",
    },
    {
      name: "Modular Kitchen & Design",
      href: "/services/modular-kitchen-design",
    },
    {
      name: "Custom Layout & Design",
      href: "/services/custom-layout-design",
    },
    {
      name: "Flooring Repair & Renovation",
      href: "/services/flooring-repair-renovation",
    },
    { name: "Living Room Design", href: "/services/living-room-design" },
  ];

  const inspiration = [
    { name: "Design Gallery", href: "#" },
    { name: "Latest Trends", href: "#" },
    { name: "Before & After", href: "#" },
    { name: "Style Guide", href: "#" },
  ];

  const companyLinks = [
    "About Us",
    "Careers",
    "Our Process",
    "Testimonials",
    "Store Locator",
    "Contact Us",
    "Privacy Policy",
    "Terms & Conditions",
    "Franchise Opportunities",
    "Press & Media",
    "Sustainability",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#1a1a1a] via-[#231717] to-[#2a1f1f] text-white">
      {/* Main Footer Content */}
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Image
                    src="/logo.jpg"
                    alt="Balaji Interiors"
                    width={160}
                    height={160}
                    className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Balaji Interiors
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                    Transforming spaces into beautiful, functional environments
                    that reflect your unique style and personality. Quality
                    craftsmanship meets innovative design.
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm tracking-wide uppercase">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      aria-label={label}
                      className="group relative p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    >
                      <Icon
                        size={18}
                        className="group-hover:text-blue-400 transition-colors duration-300"
                      />
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-sm tracking-wide uppercase relative">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Our Services
                </span>
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h3>
              <ul className="space-y-3">
                {offerings.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <ArrowRight
                        size={14}
                        className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Inspired */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm tracking-wide uppercase relative">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  About Us
                </span>
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500"></div>
              </h3>
              {/*  */}
              <ul className="space-y-3">
                {inspiration.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <ArrowRight
                        size={14}
                        className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm tracking-wide uppercase relative">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Contact Us
                </span>
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-pink-500 to-red-500"></div>
              </h3>
              <div className="space-y-4">
                <div className="group">
                  <div className="flex items-center text-sm text-gray-300 mb-1">
                    <Phone size={14} className="mr-2 text-blue-400" />
                    <span>Call us</span>
                  </div>
                  <a
                    href="tel:7019911372
"
                    className="text-white hover:text-blue-400 transition-colors duration-300 font-semibold"
                  >
                    7019911372
                    <br />
                    7483794184
                  </a>
                </div>

                <div className="group">
                  <div className="flex items-center text-sm text-gray-300 mb-1">
                    <Mail size={14} className="mr-2 " />
                    <span>Email us</span>
                  </div>
                  <a
                    href="mailto:care@balajiinteriors.com"
                    className="text-white text-sm  transition-colors duration-300 font-semibold break-all"
                  >
                    balajiluxuryinteriordesigners@gmail.com
                  </a>
                </div>

                <div className="group">
                  <div className="flex items-center text-sm text-gray-300 mb-1">
                    <MapPin size={14} className="mr-2 text-purple-400" />
                    <span>Visit us</span>
                  </div>
                  <address className="text-white text-sm not-italic leading-relaxed">
                    Office Address : SRI.K. BABU NAIDU, Residing at No. 4,
                    'Skanda Nilaya', near Bangalore one , Subramanyapura Main
                    Road , Uttarahalli Bengalore south , Bengalore -560061
                    <br />
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Company Links */}
          {/* <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="font-bold text-sm tracking-wide uppercase mb-4 relative">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Company
              </span>
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {companyLinks.map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className="group flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>
                © {currentYear} Balaji Interiors. All rights reserved.
              </span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center gap-1">
                Made with{" "}
                <Heart size={14} className="text-red-400 animate-pulse" /> for
                Code5Founders
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

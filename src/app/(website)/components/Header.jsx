"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import QuoteForm from "./quote-form";
import ConsultationForm from "./consultation-form";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Portfolio", href: "/portfolio" },
    // { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-b border-white-100 py-2 hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-amber-800">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 70199 11372</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <Link
                  href="mailto:balajiluxuryinteriordesigner@gmail.com"
                  className="text-sm text-gray-700 hover:text-primary hover:underline"
                >
                  balajiluxuryinteriordesigner@gmail.com
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <marquee
                className="w-40"
                behavior="scroll"
                direction="left"
                scrollamount="4"
              >
                Bangalore, Karnataka
              </marquee>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white shadow-lg border-b border-gray-100"
            : "bg-white"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-amber-800 tracking-wide">
                  <Image
                    src="/logo.jpg"
                    alt="Balaji Interiors"
                    width={150}
                    height={150}
                    className="bg-gradient-to-br from-amber-50 via-white to-orange-50"
                  />
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-gray-700 hover:text-amber-800 font-bold text-md  tracking-wide transition-colors duration-200 relative group"
                >
                  {item.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-800 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <QuoteForm>
                <Button
                  variant="outline"
                  className="border-amber-800 text-amber-800 hover:bg-amber-800 font-medium hover:text-white cursor-pointer rounded-2xl"
                >
                  Get Quote
                </Button>
              </QuoteForm>
              <ConsultationForm>
                <Button className="bg-gradient-to-r  px-7 py-5  rounded-2xl from-amber-600 to-orange-600 hover:bg-amber-900 text-white font-medium cursor-pointer">
                  Book Consultation
                </Button>
              </ConsultationForm>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-white">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="pb-6 border-b">
                    <div className="flex flex-col">
                      <Image
                        src="/logo.jpg"
                        alt="Balaji Interiors"
                        width={150}
                        height={150}
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-6">
                    <div className="space-y-1">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="block px-4 py-3 text-gray-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg font-medium transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  <div className="pt-6 border-t space-y-4 px-10  ">
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-amber-800" />
                        <a
                          href="tel:+917019911372"
                          className="hover:text-amber-900 transition-colors"
                        >
                          +91 7019911372
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-amber-800" />
                        <span>balajidesignersinterior@gmail.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-amber-800" />
                        <span>
                          Office Address : SRI.K. BABU NAIDU, Residing at No. 4,
                          'Skanda Nilaya', near Bangalore one , Subramanyapura
                          Main Road , Uttarahalli Bengalore south , Bengalore
                          -560061
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 py-4">
                      <QuoteForm>
                        <Button
                          variant="outline"
                          className="w-full border-amber-800 text-amber-800 hover:bg-amber-900 hover:text-white "
                        >
                          Get Quote
                        </Button>
                      </QuoteForm>
                      <ConsultationForm>
                        <Button className="w-full bg-primary hover:bg-amber-900 text-white">
                          Book Consultation
                        </Button>
                      </ConsultationForm>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

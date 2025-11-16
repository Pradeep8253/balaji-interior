"use client";
import React, { useState } from "react";
import TopBar from "./TopBar";
import Link from "next/link";

import {
  BiEnvelope,
  BiLogoFacebookCircle,
  BiLogoLinkedinSquare,
  BiPhone,
} from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";

const Header = () => {
  const [isMobileNavActive, setMobileNavActive] = useState(false);

  return (
    <header
      id="header"
      className={`header ${isMobileNavActive ? "mobile-nav-active" : ""}`}
    >
      {/* Top Bar */}
      <div className="topbar flex items-center py-2">
        <div className="container mx-auto flex justify-center md:justify-between px-4">
          <div className="contact-info flex items-center space-x-4">
            <div className="flex items-center">
              <BiEnvelope className="mr-2" />
              <Link
                href="mailto:pr@pressrelease.org.in"
                className="topbar-link"
              >
                pr@pressrelease.org.in
              </Link>
            </div>
            <div className="flex items-center">
              <BiPhone className="mr-2" />
              <Link href="tel:+91.9810359349" className="topbar-link">
                +91.9810359349
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link
              href="https://x.com/PressReleaseMKT"
              target="_blank"
              rel="noopener noreferrer"
              className="social-links"
            >
              <BsTwitterX size={18} />
            </Link>
            <Link
              href="https://www.facebook.com/submitfreepressrelease"
              target="_blank"
              rel="noopener noreferrer"
              className="social-links"
            >
              <BiLogoFacebookCircle size={23} />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-links"
            >
              <BiLogoLinkedinSquare size={23} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="branding flex items-center py-4 ">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <Link href="/" className="logo flex items-center me-auto">
              <img
                src="/assets/logos/weblogo-pr-350x76.png"
                alt="PressRelease.org.in Logo"
              />
            </Link>
          </div>

          <div className="flex">
            <div className="">
              <TopBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

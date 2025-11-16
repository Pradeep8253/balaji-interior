"use client";
import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/parallax";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QuoteForm from "../quote-form";

const Slide = ({ backgroundImage, title, text }) => (
  <div className="swiper-slide">
    <div
      className="slide-inner slide-bg-image relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="container relative z-10">
        <div data-swiper-parallax={300} className="slide-title">
          <h1>{title}</h1>
        </div>
        <div data-swiper-parallax={400} className="slide-text">
          <p>{text}</p>
        </div>
        <div data-swiper-parallax={500} className="slide-btns">
          <QuoteForm>
            <button  className="link-button">
              Get Started
            </button>
          </QuoteForm>
        </div>
      </div>
    </div>
  </div>
);

function HeroSlider() {
  const router = useRouter();

  useEffect(() => {
    new Swiper(".swiper-container", {
      loop: true,
      speed: 1000,
      parallax: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

 const slides = [
  {
    backgroundImage: "/21.png",
    title: "Transform Your Space with Luxury Interiors",
    text: "From concept to creation — experience timeless elegance with Balaji Interior Designers.",
  },
  {
    backgroundImage: "/32.png",
    title: "Elevate Your Lifestyle with Premium Design",
    text: "We design spaces that reflect your personality and aspirations.",
  },
  {
    backgroundImage: "/33.png",
    title: "Crafting Beautiful Homes, One Room at a Time",
    text: "Balaji Luxury Interiors brings you modern aesthetics blended with comfort and functionality.",
  },
];

  return (
    <div className="hero-slider hero-style">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {slides.map((slide, index) => (
            <Slide key={index} {...slide} />
          ))}
        </div>
        <div className="swiper-pagination" />
        {/* <div className="swiper-button-next" />
        <div className="swiper-button-prev" /> */}
      </div>
    </div>
  );
}

export default HeroSlider;

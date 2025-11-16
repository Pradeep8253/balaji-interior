"use client";
import React, { useEffect, useState } from "react";
import {
  FaCalendarDays,
  FaEarthAmericas,
  FaNewspaper,
  FaEye,
} from "react-icons/fa6";
import { useInView } from "react-intersection-observer";
import useIsMobile, { useIsTablet } from "../hooks/useIsMobileHook";

const useCounter = (end, duration, shouldStart) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = 0;
    const increment = end / (duration * 60);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [end, duration, shouldStart]);

  return count;
};

const StatItem = ({ icon: Icon, count, suffix, label }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  return (
    <div className=" w-1/2 lg:w-1/4 md:w-1/4 px-2 flex md:flex-1/4 sm:flex-1/2 mb-6">
      <div className="stats-item">
        <Icon size={isMobile ? 18 : isTablet ? 20 : 32} className="icon" />
        <div className="flex justify-center items-center ">
          <span>{count}</span>
          {suffix && <span className="suffix">{suffix}</span>}
        </div>
        <p>{label}</p>
      </div>
    </div>
  );
};

function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  const count1 = useCounter(15, 2, inView);
  const count2 = useCounter(125, 2, inView);
  const count3 = useCounter(80, 2, inView);
  const count4 = useCounter(950, 2, inView);

  const stats = [
    {
      icon: FaCalendarDays,
      count: count1,
      suffix: "+",
      label: "Years",
    },
    { icon: FaEarthAmericas, count: count2, label: "Countries" },
    {
      icon: FaNewspaper,
      count: count3,
      suffix: "K",
      label: "Interior Designd",
    },
    { icon: FaEye, count: count4, suffix: "M", label: "Views" },
  ];

  return (
    <section id="stats" className="stats">
      <div
        ref={ref}
        className="container mx-auto"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        <div className="flex flex-wrap ">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              count={stat.count}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;

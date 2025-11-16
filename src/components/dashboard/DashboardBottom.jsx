"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Factory, House } from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";

function DashboardBottom() {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");

  const handleTab = (tab) => {
    if (tab === "home") {
      setActive("home");
      router.push("/");
    } else if (tab === "industry") {
      setActive("industry");
      router.push("/industry");
    } else if (tab === "dashboard") {
      setActive("dashboard");
      router.push("/dashboard");
    } else if (tab === "press") {
      setActive("press");
      router.push("/dashboard/submit-press-release");
    }
  };
  

  return (
    <>
      <div className="bottom-menu">
        <div
          className={`bottom-item  ${active === "home" ? "active" : ""}`}
          onClick={() => handleTab("home")}
        >
          <House size={20} />
          <div>home</div>
        </div>

        <div
          className={`bottom-item  ${active === "industry" ? "active" : ""}`}
          onClick={() => handleTab("industry")}
        >
          <Factory size={20} />
          <div>Browse</div>
        </div>

        <div
          className={`bottom-item  ${active === "press" ? "active" : ""}`}
          onClick={() => handleTab("press")}
        >
          <RiSendPlaneFill size={20} />
          <div>Submit PR</div>
        </div>

        <div
          className={`bottom-item  ${active === "dashboard" ? "active" : ""}`}
          onClick={() => handleTab("dashboard")}
        >
          <MdDashboard size={20} />
          <div>Dashboard</div>
        </div>
      </div>
    </>
  );
}

export default DashboardBottom;

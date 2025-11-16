"use client";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import EcommerceMetrics from "@/components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Ecommerce() {
  const [pressStats, setPressStats] = useState(null);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const pressResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/press-release/press-stats`
        );
        setPressStats(pressResponse?.data?.data);
      } catch (error) {
        console.error("Error fetching press stats:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/press-release/user-stats`
        );

        setUserStats(userResponse?.data?.data);
      } catch (error) {
        console.error("Error fetching press stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics data={pressStats} userStats={userStats} />
        <MonthlySalesChart pressStats={pressStats} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget data={pressStats} />
      </div>

      <div className="col-span-12">
        <StatisticsChart pressStats={pressStats} userStats={userStats} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard data={pressStats} />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}

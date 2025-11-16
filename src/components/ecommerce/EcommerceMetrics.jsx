"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { FiUsers, FiBox, FiArrowUp, FiArrowDown } from "react-icons/fi";
import ChartTab from "../common/ChartTab";

const EcommerceMetrics = ({ data, userStats }) => {
  const [userTab, setUserTab] = useState("month");
  const [pressTab, setPressTab] = useState("month");

  const getPercentageChange = (current, previous) => {
    if (!previous || previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const getPressStatsData = () => {
    switch (pressTab) {
      case "three-month":
        return {
          current: data?.countCurrent3Month?.totalInLast30Days,
          previous: data?.countPrev3Month?.totalInLast30Days,
          approvedPress: data?.approvedCurrent3Month?.count,
          totalPress: data?.countCurrent3Month?.totalInLast30Days,
        };
      case "year":
        return {
          current: data?.countCurrentYear?.totalInLast30Days,
          previous: data?.countPrevYear?.totalInLast30Days,
          approvedPress: data?.approvedCurrentYear?.count,
          totalPress: data?.countCurrentYear?.totalInLast30Days,
        };

      case "all":
        return {
          current: data?.countCurrentYear?.totalInLast30Days,
          previous: data?.countPrevYear?.totalInLast30Days,
          approvedPress: data?.totalApproved?.count,
          totalPress: data?.totalPress?.count,
        };
      case "month":
      default:
        return {
          current: data?.countCurrentMonth?.totalInLast30Days,
          previous: data?.countPrevMonth?.totalInLast30Days,
          approvedPress: data?.approvedCurrentMonth?.count,
          totalPress: data?.countCurrentMonth?.totalInLast30Days,
        };
    }
  };

  const getUsersStatsData = () => {
    switch (userTab) {
      case "three-month":
        return {
          current: userStats?.current3Months,
          previous: userStats?.previous3Months,
          totalUsers: userStats?.current3Months,
        };
      case "year":
        return {
          current: userStats?.currentYear,
          previous: userStats?.previousYear,
          totalUsers: userStats?.currentYear,
        };

      case "all":
        return {
          current: userStats?.currentYear,
          previous: userStats?.previousYear,
          totalUsers: userStats?.totalUser,
        };

      case "month":
      default:
        return {
          current: userStats?.currentMonth,
          previous: userStats?.previousMonth,
          totalUsers: userStats?.currentMonth,
        };
    }
  };

  const {
    approvedPress,
    totalPress,
    current: pressCurrent,
    previous: pressPrevious,
  } = getPressStatsData();

  const {
    current: usersCurrent,
    previous: usersPrevious,
    totalUsers,
  } = getUsersStatsData();

  const pressPercentageChange = getPercentageChange(
    pressCurrent,
    pressPrevious
  );
  const usersPercentageChange = getPercentageChange(
    usersCurrent,
    usersPrevious
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <FiUsers className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <ChartTab selected={userTab} onChange={setUserTab} />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Users
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalUsers}
            </h4>
          </div>

          {userTab !== "all" && (
            <Badge className="inline-flex items-center font-semibold text-white">
              {usersPercentageChange >= 0 ? (
                <FiArrowUp className="text-green-500" />
              ) : (
                <FiArrowDown className="text-red-500" />
              )}
              {Math.abs(usersPercentageChange).toFixed(2)}%
            </Badge>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <FiBox className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <ChartTab selected={pressTab} onChange={setPressTab} />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Interior Design
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {approvedPress}
            </h4>
            <span>{totalPress} </span>
          </div>

          {pressTab !== "all" && (
            <Badge className="inline-flex items-center font-semibold text-white">
              {pressPercentageChange >= 0 ? (
                <FiArrowUp className="text-green-500" />
              ) : (
                <FiArrowDown className="text-red-500" />
              )}
              {Math.abs(pressPercentageChange).toFixed(2)}%
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcommerceMetrics;

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCheckAuthentication,
  login,
} from "@/app/store/admin/adminAuthSlice";

export const useAdminAuth = () => {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const isAuthenticated = useSelector(selectCheckAuthentication);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (adminToken && username && password) {
      dispatch(
        login({
          adminToken,
          adminUser: JSON.parse(localStorage.getItem("adminUser") || "{}"),
          username,
          password,
        })
      );
    }

    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return { checkingAuth, isAuthenticated };
};

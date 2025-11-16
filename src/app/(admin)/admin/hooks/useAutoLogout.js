"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCheckAuthentication,
  selectAdminToken,
  checkTokenExpiry,
} from "@/app/store/admin/adminAuthSlice";

export function useAutoLogout() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectCheckAuthentication);
  const adminToken = useSelector(selectAdminToken);
  const intervalRef = useRef(null);

  useEffect(() => {
    const checkExpiry = () => {
      dispatch(checkTokenExpiry());
    };

    if (isAuthenticated && adminToken) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      checkExpiry();

      intervalRef.current = setInterval(checkExpiry, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAuthenticated, adminToken, dispatch]);
}

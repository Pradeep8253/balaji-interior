"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import { useAdminAuth } from "./hooks/useAdminAuth";
import { useAutoLogout } from "./hooks/useAutoLogout";

export default function AdminLayout({ children }) {
  useAutoLogout();
  const { checkingAuth, isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!checkingAuth && mounted) {
      if (!isAuthenticated && pathname !== "/admin/signin") {
        router.replace("/admin/signin");
      }

      if (isAuthenticated && pathname === "/admin/signin") {
        router.replace("/admin");
      }
    }
  }, [checkingAuth, isAuthenticated, pathname, router, mounted]);

  if (
    !mounted ||
    checkingAuth ||
    (!isAuthenticated && pathname !== "/admin/signin")
  ) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}

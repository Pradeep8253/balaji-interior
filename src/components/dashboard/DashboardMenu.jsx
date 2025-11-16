"use client";
import { RiSendPlaneFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

function DashboardMenu() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="left-menu">
      <div
        className={`menu-item ${currentPath === "/dashboard" ? "active" : ""}`}
      >
        <Link href="/dashboard" className="text-decoration-none">
          <span>My Interior Design</span>
        </Link>
      </div>
      <div
        className={`menu-item ${
          currentPath === "/dashboard/billings" ? "active" : ""
        }`}
      >
        <Link href="/dashboard/billings" className="text-decoration-none">
          <span>Billings</span>
        </Link>
      </div>
      <div
        className={`menu-item ${
          currentPath === "/dashboard/user-settings" ? "active" : ""
        }`}
      >
        <Link href="/dashboard/user-settings" className="text-decoration-none">
          <span>Settings</span>
        </Link>
      </div>
      <div
        className={`menu-item ${
          currentPath === "/dashboard/submit-press-release" ? "active" : ""
        }`}
      >
        <Link
          href="/dashboard/submit-press-release"
          className="text-decoration-none"
        >
          <p className="menu-button">
            <RiSendPlaneFill size={16} className="me-1" />
            Submit Interior Design
          </p>
        </Link>
      </div>
    </div>
  );
}

export default DashboardMenu;

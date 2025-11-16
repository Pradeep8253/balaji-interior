"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = [
    <span key="home" className="inline-flex items-center">
      <Link href="/" className="text-red-500 hover:underline font-semibold">
        Home
      </Link>
    </span>,
    ...segments.map((segment, index) => {
      const isLast = index === segments.length - 1;

      const label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      const href =
        segment === "interiors"
          ? "/"
          : "/" + segments.slice(0, index + 1).join("/");

      return (
        <span key={index} className="inline-flex items-center">
          <span className="mx-1 text-gray-400">/</span>
          {isLast ? (
            <span className="text-gray-800">{label}</span>
          ) : (
            <Link href={href} className="text-red-500 hover:underline">
              {label}
            </Link>
          )}
        </span>
      );
    }),
  ];

  return (
    <nav className="text-sm mb-6 px-4 text-center md:text-left">
      <div className="text-gray-600">{breadcrumbItems}</div>
    </nav>
  );
}

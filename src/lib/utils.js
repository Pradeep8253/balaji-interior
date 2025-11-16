import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

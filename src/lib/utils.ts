import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for intelligently merging tailwind classes.
 * Uses clsx to construct className strings conditionally
 * and tailwind-merge to resolve conflicting classes safely.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

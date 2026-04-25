'use client';

/**
 * @fileoverview useDebounce hook.
 * Delays updating a value until after a specified delay.
 * Prevents excessive API calls on search/input fields.
 *
 * @example
 *   const debouncedSearch = useDebounce(searchTerm, 400);
 */

import { useEffect, useState } from 'react';

/**
 * Returns a debounced version of the provided value.
 *
 * @param value - The value to debounce
 * @param delayMs - Delay in milliseconds (default: 400)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delayMs = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

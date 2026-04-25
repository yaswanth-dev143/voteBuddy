'use client';

/**
 * @fileoverview useLocalStorage hook.
 * Safely reads/writes to localStorage with SSR protection.
 * Does NOT store sensitive data — only UI state (theme, plan progress).
 */

import { useCallback, useEffect, useState } from 'react';

/**
 * Syncs a state value with localStorage.
 *
 * @param key - The localStorage key
 * @param initialValue - Default value if nothing is stored
 * @returns [storedValue, setValue] tuple
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Read from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch {
      // localStorage unavailable (SSR or private mode)
    }
  }, [key]);

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Silently fail if storage is full or unavailable
      }
    },
    [key]
  );

  return [storedValue, setValue];
}

'use client';

/**
 * @fileoverview Theme Provider — manages Light/Dark/System color mode.
 * Uses a data-theme attribute on the <html> element to drive CSS variables.
 * Persists user preference in localStorage (no PII).
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Theme } from '@/types';

/* ── Context ──────────────────────────────────────────────── */

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'vj-theme';

/* ── Helpers ──────────────────────────────────────────────── */

/**
 * Resolves the effective theme ('light' | 'dark') given a preference and
 * the current system setting.
 */
function resolveTheme(theme: Theme, systemDark: boolean): 'light' | 'dark' {
  if (theme === 'system') {
    return systemDark ? 'dark' : 'light';
  }
  return theme;
}

/* ── Provider ─────────────────────────────────────────────── */

/**
 * Wraps the application and provides theme state to all children.
 * Must be used as a Client Component since it accesses browser APIs.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemDark, setSystemDark] = useState(false);

  // Initialise from localStorage and system preference
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSystemDark(mq.matches);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(stored);
    }

    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Apply theme to <html> data attribute
  useEffect(() => {
    const resolved = resolveTheme(theme, systemDark);
    document.documentElement.setAttribute('data-theme', resolved);
  }, [theme, systemDark]);

  /** Persists and applies the chosen theme. */
  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const resolvedTheme = resolveTheme(theme, systemDark);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/* ── Hook ─────────────────────────────────────────────────── */

/**
 * Consumes the theme context.
 * @throws {Error} If used outside of ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

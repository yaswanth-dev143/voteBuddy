'use client';

/**
 * @fileoverview Theme toggle button — cycles Light → Dark → System.
 * Uses aria-label to describe current state to screen readers.
 */

import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.css';

/** Maps theme to readable label and icon. */
const THEME_MAP = {
  light:  { icon: '☀️', label: 'Switch to dark mode' },
  dark:   { icon: '🌙', label: 'Switch to system theme' },
  system: { icon: '💻', label: 'Switch to light mode' },
} as const;

const CYCLE = ['light', 'dark', 'system'] as const;

/**
 * Button that toggles through light → dark → system themes.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const current = THEME_MAP[theme];

  const handleClick = () => {
    const idx = CYCLE.indexOf(theme);
    setTheme(CYCLE[(idx + 1) % CYCLE.length]);
  };

  return (
    <button
      type="button"
      id="theme-toggle"
      aria-label={current.label}
      title={current.label}
      className={styles.toggle}
      onClick={handleClick}
    >
      <span className={styles.icon} aria-hidden="true">
        {current.icon}
      </span>
    </button>
  );
}

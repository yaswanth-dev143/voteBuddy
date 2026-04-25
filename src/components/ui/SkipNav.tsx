'use client';

/**
 * @fileoverview Skip Navigation component for WCAG 2.4.1 compliance.
 * Renders a visually hidden link that becomes visible on focus,
 * allowing keyboard users to bypass the navigation and jump to main content.
 */

import styles from './SkipNav.module.css';

/**
 * Renders an accessible skip-to-main-content link.
 * Must be the very first focusable element in the DOM.
 */
export function SkipNav() {
  return (
    <a href="#main-content" className={`skip-nav ${styles.skipNav}`}>
      Skip to main content
    </a>
  );
}

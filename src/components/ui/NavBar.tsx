'use client';

/**
 * @fileoverview Application navigation bar.
 * Fully keyboard-navigable with proper ARIA landmarks and labels.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

import { ThemeToggle } from './ThemeToggle';
import styles from './NavBar.module.css';

interface NavLink {
  href: string;
  label: string;
  ariaLabel?: string;
}

/** Primary navigation links */
const NAV_LINKS: NavLink[] = [
  { href: '/translator',      label: 'Ballot Decoder' },
  { href: '/tracker',         label: 'My Journey'     },
  { href: '/plan',            label: 'Make a Plan'    },
  { href: '/locator',         label: 'Find Polling'   },
  { href: '/deadline-tracker',label: 'Deadlines'      },
  { href: '/crisis-mode',     label: '🚨 Crisis Mode', ariaLabel: 'Election Crisis Mode' },
];

/**
 * Site-wide navigation bar with mobile hamburger menu.
 */
export function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu  = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <Link href="/" className={styles.brand} aria-label="VoterJourney — Go to home page">
          <span className={styles.brandIcon} aria-hidden="true">🗳️</span>
          <span className={styles.brandText}>VoterJourney</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map(({ href, label, ariaLabel }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={ariaLabel}
                  aria-current={pathname === href ? 'page' : undefined}
                  className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle + Hamburger */}
        <div className={styles.actions}>
          <ThemeToggle />
          <button
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`${styles.menuBtn} hidden-desktop`}
            onClick={toggleMenu}
          >
            <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList} role="list">
            {NAV_LINKS.map(({ href, label, ariaLabel }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={ariaLabel}
                  aria-current={pathname === href ? 'page' : undefined}
                  className={`${styles.mobileNavLink} ${pathname === href ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

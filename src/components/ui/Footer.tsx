/**
 * @fileoverview Site footer with landmark role and relevant links.
 */
import Link from 'next/link';
import styles from './Footer.module.css';

/**
 * Accessible site footer with contentinfo landmark.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span aria-hidden="true">🗳️</span>
          <span className={styles.brandText}>VoterJourney</span>
          <p className={styles.tagline}>Empowering every voter, every election.</p>
        </div>

        <nav aria-label="Footer navigation" className={styles.links}>
          <ul role="list">
            <li><Link href="/translator">Ballot Decoder</Link></li>
            <li><Link href="/tracker">My Journey</Link></li>
            <li><Link href="/plan">Make a Plan</Link></li>
            <li><Link href="/locator">Find Polling</Link></li>
            <li><Link href="/deadline-tracker">Deadlines</Link></li>
            <li><Link href="/crisis-mode">Crisis Mode</Link></li>
          </ul>
        </nav>

        <div className={styles.legal}>
          <p>© {year} VoterJourney. Not affiliated with any government agency.</p>
          <p className={styles.disclaimer}>
            Always verify information with your official state election authority.
          </p>
        </div>
      </div>
    </footer>
  );
}

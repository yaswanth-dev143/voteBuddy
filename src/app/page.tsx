/**
 * @fileoverview Home page — Election Crisis Navigator landing page.
 * Server Component — no 'use client' needed.
 */
import type { Metadata } from 'next';
import Link from 'next/link';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Election Crisis Navigator | VoterJourney',
  description:
    'Navigate every step of the election process with confidence. Plain-language ballot tools, deadline tracker, and polling locator.',
};

interface Feature {
  href: string;
  emoji: string;
  title: string;
  description: string;
  badge?: string;
  badgeType?: 'danger' | 'warning' | 'info';
}

const FEATURES: Feature[] = [
  {
    href: '/translator',
    emoji: '📄',
    title: 'Ballot Decoder',
    description:
      'Paste any complex proposition text and get a plain-English translation instantly — no legal degree required.',
  },
  {
    href: '/tracker',
    emoji: '🍕',
    title: 'My Voter Journey',
    description:
      'Track your voting progress from registration all the way to casting your ballot with our interactive stepper.',
  },
  {
    href: '/plan',
    emoji: '📅',
    title: 'Make a Plan',
    description:
      'Answer a few questions and get a personalized, downloadable voting itinerary tailored to your schedule.',
  },
  {
    href: '/locator',
    emoji: '📍',
    title: 'Find Your Polling Place',
    description:
      'Enter your address to find the nearest polling station, hours, and directions — with offline backup.',
  },
  {
    href: '/deadline-tracker',
    emoji: '⏰',
    title: 'Deadline Tracker',
    description:
      'Never miss a registration or mail-in ballot deadline. Get countdown alerts for every critical date.',
    badge: 'Check Now',
    badgeType: 'warning',
  },
  {
    href: '/crisis-mode',
    emoji: '🚨',
    title: 'Election Crisis Mode',
    description:
      'Experiencing a problem at the polls? Get step-by-step guidance for common Election Day issues.',
    badge: 'Emergency',
    badgeType: 'danger',
  },
];

/** Landing page hero section and feature grid. */
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge} aria-hidden="true">
              🗳️ Your Vote. Your Voice.
            </span>
            <h1 id="hero-heading" className={styles.heroTitle}>
              Navigate Election Day with{' '}
              <span className={styles.heroAccent}>Confidence</span>
            </h1>
            <p className={styles.heroSubtitle}>
              From confusing ballot measures to finding your polling place — VoterJourney makes
              civic participation clear, accessible, and stress-free.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/plan" className="btn btn-primary btn-lg">
                Make My Voting Plan
              </Link>
              <Link href="/translator" className="btn btn-outline btn-lg">
                Decode My Ballot
              </Link>
            </div>
            <p className={styles.heroDisclaimer}>
              Free, non-partisan, and accessible for every voter.
            </p>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroCard}>
              <div className={styles.heroCardStep}>
                <span className={styles.heroCardDot} data-complete="true" />
                <span>Registered ✓</span>
              </div>
              <div className={styles.heroCardStep}>
                <span className={styles.heroCardDot} data-complete="true" />
                <span>Location Found ✓</span>
              </div>
              <div className={styles.heroCardStep}>
                <span className={styles.heroCardDot} data-active="true" />
                <span>Ballot Researched ◐</span>
              </div>
              <div className={styles.heroCardStep}>
                <span className={styles.heroCardDot} />
                <span>Voted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.features} aria-labelledby="features-heading">
        <div className="container">
          <h2 id="features-heading" className={styles.featuresTitle}>
            Everything You Need on Election Day
          </h2>
          <p className={styles.featuresSubtitle}>
            Six powerful tools, one mission: make your vote count.
          </p>

          <ul className={styles.featureGrid} role="list">
            {FEATURES.map(({ href, emoji, title, description, badge, badgeType }) => (
              <li key={href}>
                <Link href={href} className={styles.featureCard} aria-label={`Go to ${title}`}>
                  <span className={styles.featureEmoji} aria-hidden="true">
                    {emoji}
                  </span>
                  <div className={styles.featureBody}>
                    <div className={styles.featureHeader}>
                      <h3 className={styles.featureTitle}>{title}</h3>
                      {badge && (
                        <span className={`badge badge-${badgeType ?? 'info'}`}>{badge}</span>
                      )}
                    </div>
                    <p className={styles.featureDescription}>{description}</p>
                  </div>
                  <span className={styles.featureArrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.stats} aria-label="VoterJourney statistics">
        <div className="container">
          <dl className={styles.statsList}>
            {[
              { value: '100%', label: 'Non-Partisan' },
              { value: 'WCAG 2.1 AA', label: 'Accessible' },
              { value: 'Offline', label: 'PWA Support' },
              { value: 'Open Source', label: 'Transparent' },
            ].map(({ value, label }) => (
              <div key={label} className={styles.stat}>
                <dt className={styles.statValue}>{value}</dt>
                <dd className={styles.statLabel}>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

/**
 * @fileoverview Root layout for VoterJourney (Election Crisis Navigator).
 * Implements:
 *  - PWA metadata and service worker registration
 *  - WCAG 2.1 AA: skip navigation, semantic structure
 *  - Theme provider wrapping (Light/Dark/System)
 *  - Global font loading via next/font
 */
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import { GoogleAnalytics } from '@next/third-parties/google';

import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { SkipNav } from '@/components/ui/SkipNav';
import { NavBar } from '@/components/ui/NavBar';
import { Footer } from '@/components/ui/Footer';

import './globals.css';

/* ── Fonts ────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

/* ── Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'Election Crisis Navigator | VoterJourney',
    template: '%s | VoterJourney',
  },
  description:
    'Your trusted guide through every step of the voting process — from registration to the ballot box. Reduce cognitive overload with plain-language tools.',
  keywords: ['voter guide', 'election', 'ballot', 'polling location', 'civic', 'democracy'],
  authors: [{ name: 'VoterJourney' }],
  creator: 'VoterJourney',
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'VoterJourney',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'VoterJourney',
    title: 'Election Crisis Navigator | VoterJourney',
    description: 'Navigate election day with confidence. Plain-language ballot tools, polling locator, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Election Crisis Navigator | VoterJourney',
    description: 'Navigate election day with confidence.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6366f1' },
    { media: '(prefers-color-scheme: dark)',  color: '#4f46e5' },
  ],
};

/* ── Root Layout ──────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        {/* WCAG 2.4.1 — Skip Navigation */}
        <SkipNav />

        <ThemeProvider>
          <div className="app-wrapper">
            <NavBar />
            {/* WCAG landmark: main content region */}
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>

        {/* PWA Service Worker Registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(reg) { console.warn('SW registered:', reg.scope); })
                  .catch(function(err) { console.warn('SW registration failed:', err); });
              });
            }
          `}
        </Script>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}

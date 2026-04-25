'use client';

/**
 * @fileoverview Offline fallback page served by the service worker.
 * Displayed when users navigate to an uncached route without internet.
 */
export default function OfflinePage() {
  return (
    <div
      className="container"
      style={{
        paddingBlock: 'var(--space-20)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-6)',
      }}
    >
      <span style={{ fontSize: '4rem' }} aria-hidden="true">📶</span>
      <h1>You&apos;re Offline</h1>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '40ch', lineHeight: 'var(--line-height-relaxed)' }}>
        No internet connection detected. Your saved voting plan and ballot cheat sheet are still
        available offline.
      </p>
      <a href="/plan" className="btn btn-primary">
        View My Saved Plan
      </a>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
}

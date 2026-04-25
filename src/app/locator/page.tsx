import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your Polling Location',
  description: 'Locate your nearest polling station with address lookup and directions.',
};

export default function LocatorPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <h1>📍 Find Your Polling Place</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
        Enter your address to find your nearest polling station and hours.
      </p>
      <div style={{ padding: 'var(--space-16)', textAlign: 'center', background: 'var(--color-bg-subtle)', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-xl)', marginTop: 'var(--space-8)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)' }}>
        🚧 Polling Locator UI loading…
      </div>
    </div>
  );
}

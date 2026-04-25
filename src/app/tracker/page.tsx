import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Voter Journey',
  description: 'Track your voter journey from registration to casting your ballot.',
};

export default function TrackerPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <h1>🍕 My Voter Journey</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
        Track your progress through the voting process step by step.
      </p>
      <div style={{ padding: 'var(--space-16)', textAlign: 'center', background: 'var(--color-bg-subtle)', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-xl)', marginTop: 'var(--space-8)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)' }}>
        🚧 Journey Tracker UI loading…
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Election Deadlines',
  description: 'Track registration and mail-in ballot deadlines for your state.',
};

export default function DeadlineTrackerPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <h1>⏰ Election Deadline Tracker</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
        Never miss a critical deadline. Track voter registration, mail-in ballot requests, and more.
      </p>
      <div style={{ padding: 'var(--space-16)', textAlign: 'center', background: 'var(--color-bg-subtle)', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-xl)', marginTop: 'var(--space-8)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)' }}>
        🚧 Deadline Tracker UI loading…
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Make a Voting Plan',
  description: 'Create a personalized voting plan with step-by-step guidance.',
};

export default function PlanPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <h1>📅 Make a Voting Plan</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
        Answer a few quick questions and we&apos;ll create a personalized, downloadable voting itinerary.
      </p>
      <div style={{ padding: 'var(--space-16)', textAlign: 'center', background: 'var(--color-bg-subtle)', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-xl)', marginTop: 'var(--space-8)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)' }}>
        🚧 Voting Plan Wizard loading…
      </div>
    </div>
  );
}

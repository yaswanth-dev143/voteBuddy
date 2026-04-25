import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '🚨 Election Crisis Mode',
  description: 'Experiencing a problem at the polls? Get immediate guidance for Election Day issues.',
};

export default function CrisisModePage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <div className="alert alert-danger" role="alert" style={{ marginBottom: 'var(--space-8)' }}>
        <strong>⚠️ Crisis Mode Active</strong> — This section provides emergency guidance for Election Day problems.
        Always contact your local election authority for official assistance.
      </div>
      <h1>🚨 Election Crisis Mode</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
        Having a problem at the polls? Select your issue below for step-by-step guidance.
      </p>
      <div style={{ padding: 'var(--space-16)', textAlign: 'center', background: 'var(--color-bg-subtle)', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-xl)', marginTop: 'var(--space-8)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)' }}>
        🚧 Crisis Navigator UI loading…
      </div>
    </div>
  );
}

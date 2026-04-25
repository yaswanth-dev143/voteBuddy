import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Ballot Decoder',
  description: 'Translate complex ballot proposition text into plain English.',
};

export default function TranslatorPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header className={styles.header}>
        <span className={styles.icon} aria-hidden="true">📄</span>
        <h1 className={styles.title}>Ballot Decoder</h1>
        <p className={styles.subtitle}>
          Paste any complex proposition or ballot measure text below. We&apos;ll translate it into
          plain English so you can vote with confidence.
        </p>
      </header>
      {/* BallotTranslator client component will be mounted here (Task 7) */}
      <div className={styles.placeholder}>
        <p>🚧 Ballot Translator UI loading…</p>
      </div>
    </div>
  );
}

/**
 * @fileoverview Unit tests for ballot translation utilities.
 * Tests the core translation logic and classification functions.
 */

import {
  translateProposition,
  generateSummary,
  classifyMeasure,
} from '@/lib/ballotTranslator';

describe('translateProposition', () => {
  it('replaces "general obligation bonds" with plain English', () => {
    const input = 'Shall the city issue general obligation bonds not to exceed $10 million?';
    const result = translateProposition(input);
    expect(result).toContain('loans that taxpayers repay');
    expect(result).not.toContain('general obligation bonds');
  });

  it('replaces "pursuant to" with "according to"', () => {
    const input = 'Pursuant to state law, the following…';
    const result = translateProposition(input);
    expect(result).toContain('according to');
  });

  it('handles empty string gracefully', () => {
    expect(translateProposition('')).toBe('');
  });

  it('splits semicolons into separate sentences', () => {
    const input = 'First clause; second clause; third clause';
    const result = translateProposition(input);
    expect(result).toContain('.');
  });
});

describe('generateSummary', () => {
  it('creates a summary starting with the title', () => {
    const summary = generateSummary('Prop A', 'This measure would fund new roads.');
    expect(summary).toMatch(/^Prop A:/);
  });

  it('truncates at the first sentence', () => {
    const summary = generateSummary('Prop B', 'Short sentence. Another sentence.');
    expect(summary).not.toContain('Another sentence');
  });
});

describe('classifyMeasure', () => {
  it('classifies bond measures as "spending"', () => {
    expect(classifyMeasure('This measure would fund infrastructure via bonds.')).toBe('spending');
  });

  it('classifies tax measures as "tax"', () => {
    expect(classifyMeasure('A new sales tax would be imposed.')).toBe('tax');
  });

  it('classifies restriction measures correctly', () => {
    expect(classifyMeasure('This would ban certain activities.')).toBe('restriction');
  });

  it('defaults to "general" for ambiguous text', () => {
    expect(classifyMeasure('This measure relates to civic governance.')).toBe('general');
  });
});

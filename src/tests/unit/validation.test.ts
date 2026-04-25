/**
 * @fileoverview Unit tests for input validation utilities.
 */

import {
  sanitizeText,
  isValidZipCode,
  isValidEmail,
  isFutureDate,
  validateTextInput,
  truncateText,
} from '@/lib/validation';

describe('sanitizeText', () => {
  it('escapes HTML special characters', () => {
    expect(sanitizeText('<script>alert("xss")</script>')).not.toContain('<script>');
    expect(sanitizeText('<b>bold</b>')).toContain('&lt;b&gt;');
  });

  it('escapes ampersands', () => {
    expect(sanitizeText('A & B')).toContain('&amp;');
  });

  it('returns empty string unchanged', () => {
    expect(sanitizeText('')).toBe('');
  });
});

describe('isValidZipCode', () => {
  it('accepts valid 5-digit ZIP', () => {
    expect(isValidZipCode('62701')).toBe(true);
  });

  it('accepts valid ZIP+4', () => {
    expect(isValidZipCode('62701-1234')).toBe(true);
  });

  it('rejects short ZIPs', () => {
    expect(isValidZipCode('6270')).toBe(false);
  });

  it('rejects ZIPs with letters', () => {
    expect(isValidZipCode('ABCDE')).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('accepts valid email', () => {
    expect(isValidEmail('voter@example.com')).toBe(true);
  });

  it('rejects email without @', () => {
    expect(isValidEmail('notanemail')).toBe(false);
  });
});

describe('isFutureDate', () => {
  it('accepts a future date', () => {
    expect(isFutureDate('2099-12-31')).toBe(true);
  });

  it('rejects a past date', () => {
    expect(isFutureDate('2000-01-01')).toBe(false);
  });

  it('rejects invalid date string', () => {
    expect(isFutureDate('not-a-date')).toBe(false);
  });
});

describe('validateTextInput', () => {
  it('passes valid input', () => {
    expect(validateTextInput('Hello world').valid).toBe(true);
  });

  it('fails on empty string', () => {
    const result = validateTextInput('');
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('fails when exceeding max length', () => {
    const longText = 'a'.repeat(5001);
    const result = validateTextInput(longText);
    expect(result.valid).toBe(false);
  });
});

describe('truncateText', () => {
  it('returns unchanged text within limit', () => {
    expect(truncateText('Short', 100)).toBe('Short');
  });

  it('truncates long text with ellipsis', () => {
    const result = truncateText('a'.repeat(200), 100);
    expect(result.length).toBeLessThanOrEqual(101); // 100 chars + ellipsis
    expect(result).toContain('…');
  });
});

/**
 * @fileoverview Ballot text translation utilities.
 * Translates complex legal proposition language into plain English.
 * On the server, this runs as part of a React Server Component (zero client latency).
 */

/** Maps common legalese phrases to plain English equivalents. */
const LEGALESE_MAP: Record<string, string> = {
  'general obligation bonds': 'loans that taxpayers repay',
  'shall be authorized to issue': 'is allowed to borrow',
  'in an amount not to exceed': 'up to',
  'acquiring, constructing, and improving': 'building and improving',
  'pursuant to': 'according to',
  'notwithstanding': 'even though',
  'heretofore': 'previously',
  'hereinafter': 'from now on',
  'therein': 'in that',
  'thereof': 'of that',
  'wherein': 'in which',
  'whereas': 'given that',
  'shall be construed': 'should be understood',
  'in perpetuity': 'forever',
  'ad valorem': 'property-based',
  'per annum': 'per year',
  'ipso facto': 'because of that fact',
  'bona fide': 'genuine / real',
  'de facto': 'in practice',
};

/**
 * Translates a single proposition text to plain English.
 * This is a deterministic function — safe to call in Server Components.
 *
 * @param text - The raw, complex legal proposition text
 * @returns Simplified plain-English version
 */
export function translateProposition(text: string): string {
  let result = text;

  // Replace legalese
  for (const [legal, plain] of Object.entries(LEGALESE_MAP)) {
    const pattern = new RegExp(legal, 'gi');
    result = result.replace(pattern, plain);
  }

  // Simplify passive constructions
  result = result.replace(/it is hereby (ordered|resolved|determined)/gi, 'it is decided');

  // Shorten overly long sentences (split at semicolons)
  result = result
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .join('. ');

  return result.trim();
}

/**
 * Generates a one-sentence summary of a ballot measure.
 *
 * @param title - The measure title
 * @param text - The translated text
 * @returns A brief summary string
 */
export function generateSummary(title: string, text: string): string {
  const firstSentence = text.split(/[.!?]/)[0]?.trim() ?? '';
  return `${title}: ${firstSentence}.`;
}

/**
 * Analyzes sentiment / impact direction of a ballot measure.
 * Returns 'spending', 'tax', 'restriction', or 'general'.
 */
export function classifyMeasure(text: string): 'spending' | 'tax' | 'restriction' | 'general' {
  const lower = text.toLowerCase();
  if (/\btax(es|ation|payer)?\b/.test(lower)) {
    return 'tax';
  }
  if (/\bban|restrict|prohibit|limit\b/.test(lower)) {
    return 'restriction';
  }
  if (/\bbond|fund|spend|allocat|invest\b/.test(lower)) {
    return 'spending';
  }
  return 'general';
}

/**
 * @fileoverview Input validation and sanitization utilities.
 * Provides XSS-safe sanitization and validation for all user inputs.
 * Used by both client and server components.
 */

/**
 * Sanitizes a string to prevent XSS attacks.
 * Strips HTML tags and encodes dangerous characters.
 *
 * @param input - Raw user input string
 * @returns Sanitized string safe for display
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates a US ZIP code format (5 digits or ZIP+4).
 *
 * @param zip - ZIP code string to validate
 * @returns true if valid format
 */
export function isValidZipCode(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip.trim());
}

/**
 * Validates an email address format.
 *
 * @param email - Email string to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validates that a date string is a valid future date (YYYY-MM-DD).
 *
 * @param dateStr - ISO date string
 * @returns true if valid and in the future
 */
export function isFutureDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !Number.isNaN(date.getTime()) && date > new Date();
}

/**
 * Truncates text to a maximum character length with ellipsis.
 *
 * @param text - Input text
 * @param maxLength - Maximum characters (default: 500)
 * @returns Truncated string
 */
export function truncateText(text: string, maxLength = 500): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, maxLength)}…`;
}

/**
 * Strips all HTML from a string (server-side safe alternative to DOMPurify).
 *
 * @param html - String potentially containing HTML
 * @returns Plain text string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validates that text input is within acceptable bounds.
 *
 * @param text - User input text
 * @param minLen - Minimum length (default: 1)
 * @param maxLen - Maximum length (default: 5000)
 * @returns Validation result with error message if invalid
 */
export function validateTextInput(
  text: string,
  minLen = 1,
  maxLen = 5000
): { valid: boolean; error?: string } {
  const trimmed = text.trim();

  if (trimmed.length < minLen) {
    return { valid: false, error: `Please enter at least ${minLen} character(s).` };
  }
  if (trimmed.length > maxLen) {
    return { valid: false, error: `Input must be ${maxLen} characters or fewer.` };
  }
  return { valid: true };
}

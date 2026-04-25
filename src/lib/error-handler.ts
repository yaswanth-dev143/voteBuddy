/**
 * @fileoverview Centralized API error handling utility.
 * Standardizes error responses across all Route Handlers.
 */

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Normalizes any caught error into a standard API response format.
 *
 * @param error - The caught error
 * @returns Standardized error object matching { error, code, statusCode }
 */
export function handleAPIError(error: unknown) {
  if (error instanceof APIError) {
    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  // Handle generic / unexpected errors safely without leaking internal stack traces
  console.error('[Unhandled API Error]', error);
  
  return {
    error: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
  };
}

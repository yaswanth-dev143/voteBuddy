import { APIError, handleAPIError } from '@/lib/error-handler';

describe('Error Handler Utilities', () => {
  describe('APIError', () => {
    it('creates an error with expected properties', () => {
      const err = new APIError('Test error', 404, 'NOT_FOUND');
      expect(err.message).toBe('Test error');
      expect(err.statusCode).toBe(404);
      expect(err.code).toBe('NOT_FOUND');
      expect(err.name).toBe('APIError');
    });
  });

  describe('handleAPIError', () => {
    it('formats an APIError correctly', () => {
      const err = new APIError('Custom error', 400, 'BAD_REQUEST');
      const formatted = handleAPIError(err);
      
      expect(formatted).toEqual({
        error: 'Custom error',
        code: 'BAD_REQUEST',
        statusCode: 400,
      });
    });

    it('formats a generic Error safely without leaking stack traces', () => {
      // Suppress console.error for this test to keep output clean
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const err = new Error('Database connection failed - secret_password_123');
      const formatted = handleAPIError(err);
      
      expect(formatted).toEqual({
        error: 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
        statusCode: 500,
      });
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('formats completely unknown objects safely', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const formatted = handleAPIError({ weirdObject: true });
      
      expect(formatted.statusCode).toBe(500);
      expect(formatted.code).toBe('UNKNOWN_ERROR');
      
      consoleSpy.mockRestore();
    });
  });
});

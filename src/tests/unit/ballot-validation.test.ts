import { getBallotRequirements, validateBallotCompletion, getCureInstructions } from '@/lib/ballot-validation';

describe('Ballot Validation Utilities', () => {
  it('fetches correct requirements for a valid state', () => {
    const al = getBallotRequirements('AL');
    expect(al).not.toBeNull();
    expect(al?.requires_id_copy).toBe(true);
    expect(al?.requires_witness).toBe(true);
  });

  it('returns null for an invalid state', () => {
    expect(getBallotRequirements('XX')).toBeNull();
  });

  describe('validateBallotCompletion', () => {
    it('validates correctly when all requirements are met', () => {
      const result = validateBallotCompletion('AL', {
        requires_id_copy: true,
        requires_witness: true,
        requires_notary: true,
      });
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('returns errors when requirements are missing', () => {
      const result = validateBallotCompletion('AL', {
        requires_id_copy: false,
        requires_witness: true,
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('A copy of a valid ID is required to be included with the ballot.');
    });

    it('returns an error for an invalid state', () => {
      const result = validateBallotCompletion('XX', {});
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid state code.');
    });
  });

  describe('getCureInstructions', () => {
    it('returns standard cure process if no specific error type', () => {
      const cure = getCureInstructions('CA');
      expect(cure).toContain('Within 2 days');
    });

    it('adds signature context if errorType is signature', () => {
      const cure = getCureInstructions('CA', 'signature');
      expect(cure).toContain('Signature Issue');
      expect(cure).toContain('Within 2 days');
    });

    it('returns generic message for invalid state', () => {
      const cure = getCureInstructions('XX');
      expect(cure).toContain('Contact your local election office');
    });
  });
});

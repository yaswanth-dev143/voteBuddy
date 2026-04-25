/**
 * @fileoverview Utilities for state-specific ballot validation requirements.
 */

import requirementsData from '../data/ballot-requirements.json';

export interface BallotRequirement {
  requires_id_copy: boolean;
  requires_witness: boolean;
  witness_count: number;
  requires_notary: boolean;
  cure_process: string;
  postmark_accepted: boolean;
}

export function getBallotRequirements(stateCode: string): BallotRequirement | null {
  const upperState = stateCode.toUpperCase();
  const data = (requirementsData.states as Record<string, BallotRequirement>)[upperState];
  return data || null;
}

export function validateBallotCompletion(
  stateCode: string,
  checklist: Partial<BallotRequirement>
): { valid: boolean; errors: string[] } {
  const requirements = getBallotRequirements(stateCode);
  const errors: string[] = [];

  if (!requirements) {
    return { valid: false, errors: ['Invalid state code.'] };
  }

  if (requirements.requires_id_copy && !checklist.requires_id_copy) {
    errors.push('A copy of a valid ID is required to be included with the ballot.');
  }

  if (requirements.requires_witness && !checklist.requires_witness) {
    errors.push(`Witness signature(s) required (${requirements.witness_count}).`);
  }

  if (requirements.requires_notary && !checklist.requires_notary) {
    errors.push('This ballot must be notarized.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function getCureInstructions(stateCode: string, errorType?: string): string {
  const requirements = getBallotRequirements(stateCode);
  
  if (!requirements) return 'Contact your local election office immediately.';
  
  const baseCure = requirements.cure_process !== 'None' 
    ? requirements.cure_process 
    : 'No formal cure process. Contact election officials immediately.';
    
  if (errorType === 'signature') {
    return `Signature Issue: ${baseCure}. Typically requires returning a cure affidavit with a copy of your ID.`;
  }
  
  return baseCure;
}

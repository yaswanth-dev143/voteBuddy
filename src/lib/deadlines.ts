/**
 * @fileoverview Voting deadlines utilities.
 */

import stateDeadlines from '../data/state-deadlines.json';

export interface StateDeadlineInfo {
  registration_deadline: string | null;
  same_day_registration: boolean;
  absentee_deadline: string | null;
  witness_required: boolean;
  notary_required: boolean;
  early_voting_start: string | null;
  special_notes: string;
}

export function getDeadlinesByState(stateCode: string): StateDeadlineInfo | null {
  const upperState = stateCode.toUpperCase();
  const data = (stateDeadlines.states as Record<string, StateDeadlineInfo>)[upperState];
  return data || null;
}

export function calculateDaysRemaining(deadlineDate: string | Date): number {
  const target = typeof deadlineDate === 'string' ? new Date(deadlineDate) : deadlineDate;
  const now = new Date();
  
  // Set times to midnight to calculate full days
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

export function getSameDayRegistrationInfo(stateCode: string): { available: boolean; notes: string } {
  const stateData = getDeadlinesByState(stateCode);
  if (!stateData) {
    return { available: false, notes: 'State not found.' };
  }
  
  return {
    available: stateData.same_day_registration,
    notes: stateData.special_notes,
  };
}

export function getAbsenteeDeadlines(stateCode: string): string | null {
  const stateData = getDeadlinesByState(stateCode);
  return stateData ? stateData.absentee_deadline : null;
}

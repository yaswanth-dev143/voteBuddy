import { getDeadlinesByState, calculateDaysRemaining, getSameDayRegistrationInfo, getAbsenteeDeadlines } from '@/lib/deadlines';

describe('Deadlines Utilities', () => {
  it('fetches correct deadlines for a valid state', () => {
    const ca = getDeadlinesByState('CA');
    expect(ca).not.toBeNull();
    expect(ca?.same_day_registration).toBe(true);
    expect(ca?.registration_deadline).toBe('15_days_before');
  });

  it('returns null for an invalid state', () => {
    expect(getDeadlinesByState('XX')).toBeNull();
  });

  it('is case-insensitive for state codes', () => {
    const tx1 = getDeadlinesByState('TX');
    const tx2 = getDeadlinesByState('tx');
    expect(tx1).toEqual(tx2);
  });

  it('correctly reports same-day registration info', () => {
    const ca = getSameDayRegistrationInfo('CA');
    expect(ca.available).toBe(true);

    const tx = getSameDayRegistrationInfo('TX');
    expect(tx.available).toBe(false);

    const invalid = getSameDayRegistrationInfo('XX');
    expect(invalid.available).toBe(false);
  });

  it('fetches absentee deadlines', () => {
    expect(getAbsenteeDeadlines('FL')).toBe('12_days_before');
    expect(getAbsenteeDeadlines('XX')).toBeNull();
  });

  describe('calculateDaysRemaining', () => {
    it('calculates days correctly for a future date', () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      const future = new Date(now);
      future.setDate(future.getDate() + 5);
      
      expect(calculateDaysRemaining(future)).toBe(5);
    });

    it('calculates days correctly for a past date', () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      const past = new Date(now);
      past.setDate(past.getDate() - 3);
      
      expect(calculateDaysRemaining(past)).toBe(-3);
    });
  });
});

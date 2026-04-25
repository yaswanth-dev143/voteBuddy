import { NextRequest, NextResponse } from 'next/server';
import { getDeadlinesByState } from '@/lib/deadlines';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get('state');

  if (!state || state.length !== 2) {
    return NextResponse.json(
      { error: 'Valid 2-letter state code is required (e.g. CA, NY)' },
      { status: 400 }
    );
  }

  const deadlinesInfo = getDeadlinesByState(state);

  if (!deadlinesInfo) {
    return NextResponse.json(
      { error: `No deadline information found for state: ${state.toUpperCase()}` },
      { status: 404 }
    );
  }

  // Next election date (Mocked for prototype)
  // In a real scenario, this would come from the Google Civic API /elections endpoint
  const ELECTION_DATE = new Date('2026-11-03T00:00:00Z');

  // Convert relative string like "15_days_before" to actual Dates
  const calculateDate = (relativeString: string | null) => {
    if (!relativeString) {return null;}
    if (relativeString === 'election_day') {return ELECTION_DATE.toISOString();}
    
    const match = relativeString.match(/(\d+)_days_before/);
    if (match) {
      const days = parseInt(match[1], 10);
      const targetDate = new Date(ELECTION_DATE);
      targetDate.setDate(targetDate.getDate() - days);
      return targetDate.toISOString();
    }
    return null;
  };

  const deadlinesArray = [];

  if (deadlinesInfo.registration_deadline) {
    deadlinesArray.push({
      id: 'reg_deadline',
      name: 'Voter Registration Deadline',
      date: calculateDate(deadlinesInfo.registration_deadline),
      type: 'registration',
      fallbackOption: deadlinesInfo.same_day_registration ? 'Same-day registration is available at the polls.' : undefined
    });
  }

  if (deadlinesInfo.absentee_deadline) {
    deadlinesArray.push({
      id: 'absentee_deadline',
      name: 'Absentee/Mail-in Ballot Request Deadline',
      date: calculateDate(deadlinesInfo.absentee_deadline),
      type: 'absentee'
    });
  }

  if (deadlinesInfo.early_voting_start) {
    deadlinesArray.push({
      id: 'early_voting',
      name: 'Early Voting Begins',
      date: calculateDate(deadlinesInfo.early_voting_start),
      type: 'early_voting'
    });
  }

  return NextResponse.json({
    state: state.toUpperCase(),
    deadlines: deadlinesArray,
    notes: deadlinesInfo.special_notes
  });
}

/**
 * @fileoverview Mock Google Civic Information API client.
 * In production, replace with actual `https://www.googleapis.com/civicinfo/v2/` calls.
 * Uses `server-only` guard to prevent accidental client-side usage of the API key.
 */

import type { CivicInfoResponse, PollingLocation, BallotContest, BallotMeasure } from '@/types';

/* ── Mock Data ────────────────────────────────────────────── */

const MOCK_POLLING_LOCATIONS: PollingLocation[] = [
  {
    address: {
      locationName: 'Lincoln Community Center',
      line1: '1234 Democracy Ave',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
    },
    pollingHours: '6:00 AM - 7:00 PM',
    notes: 'Accessible entrance on south side. Free parking available.',
  },
  {
    address: {
      locationName: 'Westside Elementary School',
      line1: '789 Civic Blvd',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
    },
    pollingHours: '6:00 AM - 7:00 PM',
    notes: 'Gymnasium entrance. Street parking only.',
  },
];

const MOCK_CONTESTS: BallotContest[] = [
  {
    office: 'United States Senator',
    type: 'General',
    candidates: [
      { name: 'Jane Smith', party: 'Democratic Party', candidateUrl: '#' },
      { name: 'John Doe', party: 'Republican Party', candidateUrl: '#' },
      { name: 'Alex Rivera', party: 'Green Party', candidateUrl: '#' },
    ],
  },
  {
    office: 'State Representative, District 12',
    type: 'General',
    candidates: [
      { name: 'Maria Chen', party: 'Democratic Party' },
      { name: 'Robert Williams', party: 'Republican Party' },
    ],
  },
];

const MOCK_MEASURES: BallotMeasure[] = [
  {
    referendumTitle: 'Proposition A — Public Transit Funding',
    referendumSubtitle: 'Authorizes bond measure for public transit improvements',
    referendumText:
      'Shall the City of Springfield be authorized to issue general obligation bonds in an amount not to exceed $500,000,000 for the purposes of acquiring, constructing, and improving public transit infrastructure…',
    referendumBriefStatements: 'Would fund new bus rapid transit lines and station upgrades.',
  },
  {
    referendumTitle: 'Measure B — School Bond',
    referendumSubtitle: 'School facility improvements',
    referendumText:
      'To improve aging school facilities, including repairing roofs, upgrading HVAC systems, and improving seismic safety, shall Springfield Unified School District issue $120,000,000 in bonds…',
    referendumBriefStatements: 'Funds safety and infrastructure upgrades for public schools.',
  },
];

/* ── API Client Functions ─────────────────────────────────── */

/**
 * Fetches voting information for a given address.
 * In production: `GET /civicinfo/v2/voterinfo?address=...&electionId=...`
 *
 * @param address - Street address of the voter
 * @returns Mocked civic information response
 */
export async function fetchCivicInfo(address: string): Promise<CivicInfoResponse> {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 800));

  if (!address.trim()) {
    throw new Error('Address is required to look up voter information.');
  }

  return {
    pollingLocations: MOCK_POLLING_LOCATIONS,
    contests: MOCK_CONTESTS,
    measures: MOCK_MEASURES,
  };
}

/**
 * Fetches elections list for the current date.
 * In production: `GET /civicinfo/v2/elections`
 */
export async function fetchElections(): Promise<{ id: string; name: string; electionDay: string }[]> {
  await new Promise((res) => setTimeout(res, 400));

  return [
    { id: '2000', name: 'General Election', electionDay: '2026-11-03' },
    { id: '2001', name: 'Primary Election', electionDay: '2026-06-02' },
  ];
}

/**
 * @fileoverview Google Civic Information API Integration.
 */

import { APIError } from './error-handler';
import { VoterInfo, DecodedBallotMeasure } from '@/types/election';
import { PollingLocation, BallotContest } from '@/types/index';

const CIVIC_API_BASE = 'https://www.googleapis.com/civicinfo/v2';
const CACHE_TTL = 300; // 5 minutes

export async function getVoterInfo(address: string): Promise<VoterInfo> {
  if (!address) {
    throw new APIError('Address is required', 400, 'MISSING_ADDRESS');
  }

  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;
  if (!apiKey) {
    throw new APIError('Civic API key is not configured', 500, 'CONFIG_ERROR');
  }

  try {
    const url = new URL(`${CIVIC_API_BASE}/voterinfo`);
    url.searchParams.append('key', apiKey);
    url.searchParams.append('address', address);
    url.searchParams.append('electionId', '2000'); // Default to next general election

    // Next.js fetch with 5-minute cache
    const response = await fetch(url.toString(), {
      next: { revalidate: CACHE_TTL },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new APIError('Rate limit exceeded for Civic API', 429, 'RATE_LIMIT');
      }
      if (response.status === 400) {
        throw new APIError('Address could not be found', 400, 'INVALID_ADDRESS');
      }
      throw new Error(`Civic API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Map the response to our VoterInfo type
    return {
      pollingLocation: data.pollingLocations?.[0] || undefined,
      earlyVoteSites: data.earlyVoteSites || [],
      dropOffLocations: data.dropOffLocations || [],
      contests: data.contests || [],
      state: data.state || [],
    };
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError('Failed to fetch voter information', 500, 'CIVIC_API_ERROR');
  }
}

export async function getElectionData(electionId: string) {
  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;
  if (!apiKey) throw new APIError('API key missing', 500, 'CONFIG_ERROR');

  const url = new URL(`${CIVIC_API_BASE}/elections`);
  url.searchParams.append('key', apiKey);

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new APIError('Failed to fetch election data', response.status, 'ELECTION_API_ERROR');
  }

  const data = await response.json();
  const election = data.elections.find((e: any) => e.id === electionId);
  return election || null;
}

export async function getRepresentatives(address: string) {
  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;
  if (!apiKey) throw new APIError('API key missing', 500, 'CONFIG_ERROR');

  const url = new URL(`${CIVIC_API_BASE}/representatives`);
  url.searchParams.append('key', apiKey);
  url.searchParams.append('address', address);

  const response = await fetch(url.toString(), {
    next: { revalidate: CACHE_TTL },
  });

  if (!response.ok) {
    throw new APIError('Failed to fetch representatives', response.status, 'REP_API_ERROR');
  }

  return response.json();
}

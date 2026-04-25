import { PollingLocation, BallotContest } from './index';

export interface VoterInfo {
  pollingLocation?: PollingLocation;
  earlyVoteSites?: PollingLocation[];
  dropOffLocations?: PollingLocation[];
  contests: BallotContest[];
  state: string[];
}

export interface Deadline {
  id: string;
  name: string;
  date: string; // Stored as ISO string to avoid serialization issues
  type: 'registration' | 'absentee' | 'early_voting';
  daysRemaining: number;
  fallbackOption?: string;
  urgent: boolean;
}

export interface DecodedBallotMeasure {
  id: string;
  title: string;
  originalText: string;
  decodedText?: string;
  yesImpact?: string;
  noImpact?: string;
  confusingPhrases?: string[];
  readingLevel?: number;
}

/**
 * @fileoverview Application type definitions.
 * Centralizes all shared TypeScript interfaces and types.
 */

// ─── Voter Journey State ────────────────────────────────────────────────────

/** Represents each step in the voter's journey tracker */
export interface VoterJourneyStep {
  /** Unique identifier for the step */
  id: string;
  /** Display label for the step */
  label: string;
  /** Step description shown in the tracker */
  description: string;
  /** Icon name (from lucide-react) */
  icon: string;
  /** Whether this step has been completed */
  completed: boolean;
  /** Whether this is the current active step */
  current: boolean;
}

/** Global voter journey state */
export interface VoterJourneyState {
  steps: VoterJourneyStep[];
  currentStepIndex: number;
}

// ─── Ballot Translator ──────────────────────────────────────────────────────

/** A ballot proposition to translate */
export interface BallotProposition {
  id: string;
  originalText: string;
  translatedText: string | null;
  isTranslating: boolean;
}

// ─── Make a Plan Wizard ─────────────────────────────────────────────────────

/** Voting method options */
export type VotingMethod = 'in-person' | 'mail' | 'early';

/** Time-of-day preference */
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

/** User's voting plan data collected by the wizard */
export interface VotingPlan {
  /** Step 1: How they plan to vote */
  votingMethod: VotingMethod | null;
  /** Step 2: Polling location (or mailing address) */
  pollingAddress: string;
  pollingLocationName: string;
  /** Step 3: When they plan to vote */
  votingDate: string;
  votingTime: TimeOfDay | null;
  /** Step 4: Reminders */
  reminderEnabled: boolean;
  reminderTime: string;
  /** Step 5: Notes */
  notes: string;
}

/** Wizard step definition */
export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

// ─── Google Civic API (Mock) ────────────────────────────────────────────────

/** Represents a polling location from the Civic API */
export interface PollingLocation {
  address: {
    locationName: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
  pollingHours: string;
  notes?: string;
}

/** Represents a ballot contest (race) */
export interface BallotContest {
  office: string;
  type: string;
  candidates: Candidate[];
}

/** Represents a candidate */
export interface Candidate {
  name: string;
  party?: string;
  candidateUrl?: string;
  photoUrl?: string;
}

/** Represents a ballot measure */
export interface BallotMeasure {
  referendumTitle: string;
  referendumSubtitle?: string;
  referendumText: string;
  referendumBriefStatements?: string;
}

/** Civic API response structure */
export interface CivicInfoResponse {
  pollingLocations: PollingLocation[];
  contests: BallotContest[];
  measures: BallotMeasure[];
}

// ─── Theme ──────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark' | 'system';

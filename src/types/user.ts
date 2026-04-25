export interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface UserPreferences {
  emailAlerts: boolean;
  smsAlerts: boolean;
  theme: string;
  language?: string;
  defaultState?: string;
}

export interface SavedDeadline {
  id: string;
  name: string;
  date: string;
  type: string;
}

export interface UserProfile {
  uid: string;
  email?: string;
  displayName?: string;
  location?: UserLocation;
  preferences: UserPreferences;
  onboardingCompleted: boolean;
}

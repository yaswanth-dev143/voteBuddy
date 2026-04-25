export interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface UserPreferences {
  notificationsEnabled: boolean;
  language: string;
  defaultState?: string;
}

export interface UserProfile {
  uid: string;
  email?: string;
  displayName?: string;
  location?: UserLocation;
  preferences: UserPreferences;
  onboardingCompleted: boolean;
}

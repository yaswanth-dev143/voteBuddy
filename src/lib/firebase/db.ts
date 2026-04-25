/**
 * @fileoverview Firestore Database Utilities
 */

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db } from './config';
import { UserPreferences, SavedDeadline } from '@/types/user';

// Initialize a user profile document
export async function initializeUserProfile(userId: string, email: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email,
      createdAt: new Date().toISOString(),
      preferences: {
        emailAlerts: true,
        smsAlerts: false,
        theme: 'system',
      },
      savedDeadlines: [],
    });
  }
}

// Update user preferences
export async function updateUserPreferences(userId: string, preferences: Partial<UserPreferences>) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    preferences,
  });
}

// Save a deadline to user profile
export async function saveUserDeadline(userId: string, deadline: SavedDeadline) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    savedDeadlines: arrayUnion(deadline),
  });
}

// Remove a deadline from user profile
export async function removeUserDeadline(userId: string, deadlineId: string) {
  const userRef = doc(db, 'users', userId);
  // Need to fetch current list to remove by ID, as arrayRemove needs exact object match
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const currentDeadlines: SavedDeadline[] = userSnap.data().savedDeadlines || [];
    const updatedDeadlines = currentDeadlines.filter((d) => d.id !== deadlineId);
    
    await updateDoc(userRef, {
      savedDeadlines: updatedDeadlines,
    });
  }
}

// Get user profile data
export async function getUserProfile(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data();
  }
  return null;
}

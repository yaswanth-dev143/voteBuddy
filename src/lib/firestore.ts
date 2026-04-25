/**
 * @fileoverview Firestore database operations.
 */

import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export async function saveUserDeadlines(userId: string, deadlines: any[]) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { deadlines }, { merge: true });
}

export async function getUserPreferences(userId: string) {
  const userRef = doc(db, 'users', userId);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
}

export async function saveBallotMeasures(userId: string, measures: any[]) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { savedMeasures: measures }, { merge: true });
}

export async function updatePollingPlaceAlerts(userId: string, alerts: any[]) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    alerts: arrayUnion(...alerts)
  });
}

import { firebase } from '@nativescript/firebase-core';

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    return firebase().initializeApp();
  }
  return firebase().app();
};

export const getCurrentUserId = (): string | null => {
  return firebase().auth().currentUser?.uid || null;
};
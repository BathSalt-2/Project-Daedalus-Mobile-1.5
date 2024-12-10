import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import { initializeFirebase } from '../../shared/utils/firebase.utils';

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    initializeFirebase();
    this.initializeAuthState();
  }

  private initializeAuthState() {
    firebase().auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUserSubject.next({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        });
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  async signIn(email: string, password: string): Promise<User> {
    const credential = await firebase().auth().signInWithEmailAndPassword(email, password);
    return {
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: credential.user.displayName
    };
  }

  async signUp(email: string, password: string): Promise<User> {
    const credential = await firebase().auth().createUserWithEmailAndPassword(email, password);
    return {
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: credential.user.displayName
    };
  }

  async signOut(): Promise<void> {
    await firebase().auth().signOut();
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
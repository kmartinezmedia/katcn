'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA5bLsKYNwJ6_EBLWGiZ_1qiaqltKh1hh0',
  authDomain: 'katcn-ui.firebaseapp.com',
  projectId: 'katcn-ui',
  storageBucket: 'katcn-ui.firebasestorage.app',
  messagingSenderId: '1005302237649',
  appId: '1:1005302237649:web:b6f4ea6221f3690b55f8f0',
};

const _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const app = getFirestore(_app);
export const auth = getAuth(_app);

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const creds = await signInWithPopup(auth, provider);
    return creds;
  } catch (error) {
    console.error('Error signing in with Google', error);
  }
}

export async function signOut() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
  }
}

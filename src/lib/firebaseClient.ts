import { getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

let authInstance: Auth | null = null;

function getFirebaseConfig() {
  const fallbackConfig = {
    apiKey: 'AIzaSyCoMSZelOh9iA93ZDbBEWFSyOHps_A0wxA',
    authDomain: 'gdgocauth.firebaseapp.com',
    projectId: 'gdgocauth',
    storageBucket: 'gdgocauth.firebasestorage.app',
    messagingSenderId: '108420639393',
    appId: '1:108420639393:web:ef232770e49d653be55ee0',
    measurementId: 'G-Q6EGG9M4FZ',
  };

  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || fallbackConfig.apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || fallbackConfig.appId,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || fallbackConfig.measurementId,
  };
}

export function getFirebaseAuth() {
  if (authInstance) return authInstance;

  const config = getFirebaseConfig();
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Firebase is not configured. Missing: ${missing.join(', ')}`);
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(config);
  authInstance = getAuth(app);

  return authInstance;
}

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDxGXkDTZq8k0McAkVlRm7m0CTwEtM4f8",
  authDomain: "rental-finder-9975a.firebaseapp.com",
  projectId: "rental-finder-9975a",
  storageBucket: "rental-finder-9975a.firebasestorage.app",
  messagingSenderId: "1028087476121",
  appId: "1:1028087476121:web:06768910e7e2b65eb86d08",
  measurementId: "G-NKL64BJDGK"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error: any) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error:', error);
  }
}

// Get Auth instance
const auth = getAuth(app);

// Get Firestore instance
const db = getFirestore(app);

// Enable Firestore offline persistence
const enableOffline = async () => {
  try {
    await db.enablePersistence();
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  }
};

enableOffline().catch(console.error);

export { app, auth, db };
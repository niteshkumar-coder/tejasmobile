import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Test connection as per instructions
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (error.message?.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    }
  }
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Auth error:", error);
    
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup Blocked! Browsers block login windows inside this preview. Please click the "Open in New Tab" button below to continue.');
    }
    
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Login cancelled. Please try again.');
    }

    if (error.code === 'auth/cancelled-popup-request') {
      return null;
    }
    
    throw new Error('Authentication failed: ' + (error.message || 'Unknown error'));
  }
};

export const logout = () => signOut(auth);

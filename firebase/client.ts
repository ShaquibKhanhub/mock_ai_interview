// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfOuHrzXJtU9gWlnUkKgHhavBLHdX6rBA",
  authDomain: "ai-interview-8b15e.firebaseapp.com",
  projectId: "ai-interview-8b15e",
  storageBucket: "ai-interview-8b15e.firebasestorage.app",
  messagingSenderId: "492826438118",
  appId: "1:492826438118:web:4754a866ab898ce0bc4e27",
  measurementId: "G-ELRH4HS2VM",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);
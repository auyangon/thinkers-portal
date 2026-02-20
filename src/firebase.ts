// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Use your official Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBQQGlown08dCxHoYLuokxg_VQxsnCvM4c",
  authDomain: "thinkers-portal.firebaseapp.com",
  projectId: "thinkers-portal",
  storageBucket: "thinkers-portal.firebasestorage.app",
  messagingSenderId: "767829973152",
  appId: "1:767829973152:web:b1df0419d27a8a3efcd1c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);
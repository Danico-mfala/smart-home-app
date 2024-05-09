import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1iC0453UXcCeeBDRI3Yjfde1RV_jyR4Y",
  authDomain: "smarthome-5a0ae.firebaseapp.com",
  projectId: "smarthome-5a0ae",
  storageBucket: "smarthome-5a0ae.appspot.com",
  messagingSenderId: "277618015334",
  appId: "1:277618015334:web:8e1c5b6bb7867854ebc1a7",
  measurementId: "G-8878XZ5ZPN",
};

const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

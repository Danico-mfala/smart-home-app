// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase, ref, onValue } from "firebase/database";

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyC1iC0453UXcCeeBDRI3Yjfde1RV_jyR4Y",
//   authDomain: "smarthome-5a0ae.firebaseapp.com",
//   projectId: "smarthome-5a0ae",
//   storageBucket: "smarthome-5a0ae.appspot.com",
//   messagingSenderId: "277618015334",
//   appId: "1:277618015334:web:8e1c5b6bb7867854ebc1a7",
//   measurementId: "G-8878XZ5ZPN",
// };

// const app = initializeApp(firebaseConfig);
// export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const db = getDatabase();

// export default { db, ref, onValue };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Updated import

import { getReactNativePersistence, initializeAuth } from "firebase/auth"; // Added imports for AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage"; // Added import for AsyncStorage

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
export const FIREBASE_APP = app; // Exporting the initialized app instance
export const FIREBASE_DB = getFirestore(app);
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Configuring AsyncStorage for persistence
});
export const db = getDatabase();

export default { db }; // Exporting db only

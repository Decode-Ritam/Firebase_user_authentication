 import { initializeApp } from "firebase/app";
 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "authentication-ec526.firebaseapp.com",
  projectId: "authentication-ec526",
  storageBucket: "authentication-ec526.appspot.com",
  messagingSenderId: "79389201589",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-57FRBX8FQ9"
};
 // Initialize Firebase
export const app = initializeApp(firebaseConfig);
 
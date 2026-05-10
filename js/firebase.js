// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO70xsrYtKMyNVlIF37Up8383r-TdIq-s",
  authDomain: "darkroom-companion-2da18.firebaseapp.com",
  projectId: "darkroom-companion-2da18",
  storageBucket: "darkroom-companion-2da18.firebasestorage.app",
  messagingSenderId: "653269703444",
  appId: "1:653269703444:web:b7a0cbebad5091c505c001",
  measurementId: "G-3NC8EBQGDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
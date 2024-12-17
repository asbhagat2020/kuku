// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcMu_bw4Z4MZe_6BaPKdA8RD5gRm0n_h4",
  authDomain: "kuku-website.firebaseapp.com",
  projectId: "kuku-website",
  storageBucket: "kuku-website.firebasestorage.app",
  messagingSenderId: "1005967917369",
  appId: "1:1005967917369:web:56892059a64d33f56668e8",
  measurementId: "G-HHVHC86R3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
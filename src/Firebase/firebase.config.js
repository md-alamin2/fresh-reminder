// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5n_ZsApTxxZ9Jt6uUaNAhGWDJprtkfF8",
  authDomain: "fresh-reminder-82973.firebaseapp.com",
  projectId: "fresh-reminder-82973",
  storageBucket: "fresh-reminder-82973.firebasestorage.app",
  messagingSenderId: "656622288902",
  appId: "1:656622288902:web:805c883c6eac43923e4387"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCohpEKA8XUimm8971gKgK7kRYXfvt9Ieg",
  authDomain: "next-auth-username-passwords.firebaseapp.com",
  projectId: "next-auth-username-passwords",
  storageBucket: "next-auth-username-passwords.appspot.com",
  messagingSenderId: "651607236430",
  appId: "1:651607236430:web:75f169a995bc26b86c481f",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };

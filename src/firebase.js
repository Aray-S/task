// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT6z0akQTJBs4DA1bDPdh-sW6FqpEYIfU",
  authDomain: "nfactorial-e821f.firebaseapp.com",
  projectId: "nfactorial-e821f",
  storageBucket: "nfactorial-e821f.appspot.com",
  messagingSenderId: "1027025028992",
  appId: "1:1027025028992:web:a6a9b44ea0ecbf30c16365",
  measurementId: "G-5L8FB79127"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider();



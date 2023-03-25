// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCli_G2YvvuEIgrWnSHzsA86EmoHAYfxJI",
    authDomain: "final-project-web-v0.firebaseapp.com",
    projectId: "final-project-web-v0",
    storageBucket: "final-project-web-v0.appspot.com",
    messagingSenderId: "830255873641",
    appId: "1:830255873641:web:0d4e9f42308013ecf56cf8",
    measurementId: "G-8NZVWFKLPX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
const analytics = getAnalytics(app);

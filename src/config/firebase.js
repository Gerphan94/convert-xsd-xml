// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPhcwIX_GeYXJGs7p4Zls-SzbUKR_6p-U",
    authDomain: "xmlconvert-3f053.firebaseapp.com",
    databaseURL: "https://xmlconvert-3f053-default-rtdb.asia-southeast1.firebasedatabase.app/", // 👈 important
    projectId: "xmlconvert-3f053",
    storageBucket: "xmlconvert-3f053.firebasestorage.app",
    messagingSenderId: "243513545945",
    appId: "1:243513545945:web:ff65e8ebaa48aa77825ac8",
    measurementId: "G-GEMGHF0MM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);

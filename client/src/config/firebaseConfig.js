// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1WFqfq80gPY1xu8ya3QaJHRndF7TfIOU",
    authDomain: "chat-412100.firebaseapp.com",
    projectId: "chat-412100",
    storageBucket: "chat-412100.appspot.com",
    messagingSenderId: "701219564245",
    appId: "1:701219564245:web:6b4f34c4476d2eb0d6905c",
    measurementId: "G-SER7RHFCZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
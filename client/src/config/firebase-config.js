import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJEAH8wP2GnFmb4fM63Ety6VSq5kBhtwo",
  authDomain: "authbudget.firebaseapp.com",
  projectId: "authbudget",
  storageBucket: "authbudget.appspot.com",
  messagingSenderId: "1020012119356",
  appId: "1:1020012119356:web:7b4bb2a7c7660fa3494a39",
  measurementId: "G-9QEEZF4ZRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
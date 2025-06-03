// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0XAMqX6jmGzry-2BPegAEkNiEynW9G_U",
  authDomain: "pixelpal-30370.firebaseapp.com",
  projectId: "pixelpal-30370",
  storageBucket: "pixelpal-30370.firebasestorage.app",
  messagingSenderId: "854639217260",
  appId: "1:854639217260:web:712fd312a04582425b6649",
  measurementId: "G-EMGKCPD7PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw-aA3vHftEWkC91w8Tt3SZVRu-PsS1wk",
  authDomain: "event-application-86ea6.firebaseapp.com",
  databaseURL: "https://event-application-86ea6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "event-application-86ea6",
  storageBucket: "event-application-86ea6.appspot.com",
  messagingSenderId: "123827792492",
  appId: "1:123827792492:web:d6c7143abceecfb0d64649",
  measurementId: "G-QGJKEM94E1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
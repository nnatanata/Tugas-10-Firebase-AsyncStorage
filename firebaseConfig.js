import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbeTrCy4oZnU48AqNIOpUszDRacXjv9ws",
  authDomain: "fir-mahasiswa-71470.firebaseapp.com",
  projectId: "fir-mahasiswa-71470",
  storageBucket: "fir-mahasiswa-71470.firebasestorage.app",
  messagingSenderId: "438527904788",
  appId: "1:438527904788:android:038eb6f703f08d610deb01",
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

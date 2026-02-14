
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNtk0yg-DA8oWVi3MBpJHKcjMBTn4aPwY",
  authDomain: "mydev-diary.firebaseapp.com",
  projectId: "mydev-diary",
  storageBucket: "mydev-diary.firebasestorage.app",
  messagingSenderId: "182862004692",
  appId: "1:182862004692:web:66ddfbb97ade06acbd1641",
  measurementId: "G-EF3YYR4926"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

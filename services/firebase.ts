import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCqRz5Gg3Xh2yRk8gkdGxkHuiwqhns05uA",
  authDomain: "mydev-diary-ce031.firebaseapp.com",
  projectId: "mydev-diary-ce031",
  storageBucket: "mydev-diary-ce031.firebasestorage.app",
  messagingSenderId: "670380489654",
  appId: "1:670380489654:web:7c43c9a021e77f729a1f17",
  measurementId: "G-046NE0DE99"
};

const app = initializeApp(firebaseConfig);

// Analytics는 브라우저 환경에서만 초기화
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW0xnscu8NE4_Ds7TUoZ3h6TcBYiJl3F0",
  authDomain: "urbarbeautyotp.firebaseapp.com",
  projectId: "urbarbeautyotp",
  storageBucket: "urbarbeautyotp.firebasestorage.app",
  messagingSenderId: "955877569314",
  appId: "1:955877569314:web:0411f67a5ae59587c5eb7b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
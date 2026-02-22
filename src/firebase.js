import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Remove analytics for now (optional)

const firebaseConfig = {
  apiKey: "AIzaSyAN_VUzsNvcYJyfbfFFTy6QmHkESVbDUag",
  authDomain: "myurbanhelp.firebaseapp.com",
  projectId: "myurbanhelp",
  storageBucket: "myurbanhelp.firebasestorage.app",
  messagingSenderId: "804628349876",
  appId: "1:804628349876:web:0d6343dc08d24ed5d6e8e1",
  measurementId: "G-V1NM5RLZRW"
};

const app = initializeApp(firebaseConfig);

// ✅ EXPORT THESE
export const auth = getAuth(app);
export const db = getFirestore(app);
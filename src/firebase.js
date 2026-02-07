import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// ✅ THIS LINE IS CRITICAL
const firebaseConfig = {
  apiKey: "AIzaSyAW0xnscu8NE4_Ds7TUoZ3h6TcBYiJl3F0",
  authDomain: "urbarbeautyotp.firebaseapp.com",
  projectId: "urbarbeautyotp",
  storageBucket: "urbarbeautyotp.firebasestorage.app",
  messagingSenderId: "955877569314",
  appId: "1:955877569314:web:ccd29dce977a70f5c5eb7b",
};

const app = initializeApp(firebaseConfig);

// ✅ IMPORTANT
export const auth = getAuth(app);
auth.useDeviceLanguage(); // optional but recommended

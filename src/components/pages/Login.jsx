import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  // ✅ LOGIN + REGISTER (EMAIL)
  const handleEmailAuth = async (e) => {
    e.preventDefault();

    try {
      let userCredential;

      if (isRegister) {
        // REGISTER
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        // LOGIN
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        const ADMIN_EMAILS = ["youradminemail@gmail.com"];

        await setDoc(docRef, {
          email: user.email,
          role: ADMIN_EMAILS.includes(user.email) ? "admin" : "user",
          createdAt: new Date()
        });
      }

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // ✅ GOOGLE LOGIN / REGISTER
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        const ADMIN_EMAILS = ["youradminemail@gmail.com"];

        await setDoc(docRef, {
          email: user.email,
          role: ADMIN_EMAILS.includes(user.email) ? "admin" : "user",
          createdAt: new Date()
        });
      }

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        {/* EMAIL LOGIN / REGISTER */}
        <form onSubmit={handleEmailAuth} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* TOGGLE LOGIN / REGISTER */}
        <p className="text-center text-sm mt-4">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            onClick={() => setIsRegister(!isRegister)}
            className="ml-2 font-medium hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;
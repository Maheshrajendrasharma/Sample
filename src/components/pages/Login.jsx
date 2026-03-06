import {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";

import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  const isPhone = /^[0-9]{10}$/.test(inputValue);

  // TIMER
  useEffect(() => {

    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [timer]);

  // RECAPTCHA
  const setupRecaptcha = () => {

    if (!window.recaptchaVerifier) {

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

    }

  };

  // REDIRECT BASED ON ROLE
  const redirectUser = async (user) => {

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      const role = docSnap.data().role;

      if (role === "provider") {
        navigate("/provider-dashboard");
      }

      else if (role === "admin") {
        navigate("/admin-dashboard");
      }

      else {
        navigate("/");
      }

    } else {

      // fallback
      navigate("/");

    }

  };

  // EMAIL LOGIN
  const handleEmailLogin = async () => {

    try {

      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputValue,
        password
      );

      await redirectUser(userCredential.user);

    } catch (error) {

      setErrorMessage(error.message);

    }

  };

  // SEND OTP
  const sendOtp = async () => {

    try {

      setupRecaptcha();

      const phoneNumber = "+91" + inputValue;

      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );

      setConfirmationResult(result);
      setTimer(1200);

      alert("OTP sent successfully!");

    } catch (error) {

      setErrorMessage(error.message);

    }

  };

  // VERIFY OTP
  const verifyOtp = async () => {

    try {

      const result = await confirmationResult.confirm(otp);

      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {

        await setDoc(docRef, {
          phone: inputValue,
          role: "customer",
          createdAt: new Date()
        });

      }

      await redirectUser(user);

    } catch {

      setErrorMessage("Invalid OTP");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Login
        </h2>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            {errorMessage}
          </div>
        )}

        <input
          type="text"
          placeholder="Email or Phone Number"
          className="w-full border p-2 rounded mb-3"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* EMAIL LOGIN */}
        {!isPhone && (

          <>
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleEmailLogin}
              className="w-full bg-black text-white py-2 rounded"
            >
              Login
            </button>
          </>

        )}

        {/* PHONE LOGIN */}
        {isPhone && (

          <>
            {!confirmationResult ? (

              <button
                onClick={sendOtp}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Send OTP
              </button>

            ) : (

              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border p-2 rounded mt-3"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  onClick={verifyOtp}
                  className="w-full bg-green-600 text-white py-2 rounded mt-2"
                >
                  Verify OTP
                </button>

                {timer > 0 && (

                  <p className="text-sm text-gray-500 mt-2">
                    OTP expires in {Math.floor(timer / 60)}:
                    {("0" + (timer % 60)).slice(-2)}
                  </p>

                )}

              </>

            )}

          </>

        )}

        <div id="recaptcha-container"></div>

      </div>

    </div>

  );

}

export default Login;
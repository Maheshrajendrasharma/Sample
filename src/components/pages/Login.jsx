import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";

import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const isPhone = /^[0-9]{10}$/.test(inputValue);

  // ================= TIMER =================
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ================= RECAPTCHA =================
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = "+91" + inputValue;

      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      setConfirmationResult(result);
      setTimer(1200); // 20 minutes countdown (1200 seconds)
      alert("OTP sent successfully!");

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert("OTP verified successfully!");
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid OTP.");
    }
  };

  // ================= EMAIL LOGIN / REGISTER =================
  const handleEmailAuth = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          inputValue,
          password
        );

        await sendEmailVerification(userCredential.user);
        alert("Verification email sent!");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputValue,
        password
      );

      if (!userCredential.user.emailVerified) {
        alert("Please verify your email.");
        return;
      }

      navigate("/");

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        <input
          type="text"
          placeholder="Email or Phone Number"
          className="w-full border p-2 rounded mb-3"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* EMAIL PASSWORD FIELD */}
        {!isPhone && (
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {/* PHONE FLOW */}
        {isPhone ? (
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
        ) : (
          <button
            onClick={handleEmailAuth}
            className="w-full bg-black text-white py-2 rounded"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        )}

        <div id="recaptcha-container"></div>

        <p className="text-center text-sm mt-4">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
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
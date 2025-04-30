"use client";

import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { googleSignUp, otpSignup, registerOtp } from "@/store/auth/authSlice";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "@/firebase";

export default function Home() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent
  const [timer, setTimer] = useState(120); // Timer for 2 minutes (120 seconds)
  const [error, setError] = useState(false);
  // const [confirmationResult, setConfirmationResult] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const hasSentRef = useRef(false);

  const OtpSent = useSelector((state) => state.auth.otpSend);
  useEffect(() => {
    console.log("OtpSent updated:", OtpSent);
    setIsOtpSent(OtpSent);
  }, [OtpSent]);
  const validateInput = (input) => {
    // Email regex
    console.log(input);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone number regex (supports various international formats)
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (emailRegex.test(input)) {
      return "email";
    } else if (phoneRegex.test(input)) {
      return "phone";
    } else {
      return "invalid";
    }
  };
  // const setupRecaptchaVerifier = () => {
  //   if (typeof window !== 'undefined') {
  //     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //       'size': 'invisible',
  //       'callback': (response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         console.log('Recaptcha resolved');
  //       }
  //     });
  //   }
  // };
  // const sendPhoneOTP = async () => {
  //   try {
  //     setupRecaptchaVerifier();

  //     const phoneNumber = emailOrPhone.startsWith('+')
  //       ? emailOrPhone
  //       : `+1${emailOrPhone}`; // Assumes US phone numbers, modify as needed

  //     const appVerifier = window.recaptchaVerifier;

  //     const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  //     setConfirmationResult(result);
  //     setIsOtpSent(true);
  //     setError("");
  //     console.log(result);

  //   } catch (error) {
  //     console.error("Error sending OTP:", error)
  //     setError("Failed to send OTP. Please try again.");
  //   }
  // };

  const handleOtpsend = () => {
    const inputType = validateInput(emailOrPhone);
    console.log(inputType);

    if (inputType == "phone") {
      sendPhoneOTP();
    } else if (inputType == "email") {
      // Existing email OTP logic
      console.log("dispaching");

      dispatch(registerOtp({ emailOrPhone }));
    } else {
      setError("Please enter a valid email or phone number");
    }
  };
  const handleRegister = async () => {
    const res = await dispatch(otpSignup({ emailOrPhone, otp }));
    if (res.type == "auth/otpSignup/fulfilled") {
      router.push("/account");
    }
  };
  // const sendSessionToServer = async () => {
  //   if (session) {
  //     console.log(session);
  //     const res= await dispatch(googleSignUp({session,status}))
  //     if(res.type==='auth/googleSignUp/fulfilled'){
  //       router.push('/account')
  //     }

  //   }
  // };

  // Watch session status and send data to server when authenticated
  useEffect(() => {
    const sendSessionToServer = async () => {
      console.log(session);
      const res = await dispatch(googleSignUp({ session, status }));
      if (res.type === "auth/googleSignUp/fulfilled") {
        router.push("/account");
      }
    };

    if (session && !hasSentRef.current) {
      hasSentRef.current = true; // Mark the call as already made
      sendSessionToServer();
    }
  }, [session, status, dispatch, router]);

  useEffect(() => {
    let interval = null;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Clean up the interval
  }, [isOtpSent, timer]);

  const handleSignIn = async () => {
    const res = await signIn("google", { redirect: false });
  };

  // const sendOtp = () => {
  //   console.log("Sending OTP to:", emailOrPhone);
  //   setIsOtpSent(true);
  //   setTimer(120); // Reset timer
  //   startTimer(); // Start the countdown timer
  // };

  // const startTimer = () => {
  //   const interval = setInterval(() => {
  //     setTimer((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(interval);
  //         return 0; // Stop the timer at 0
  //       }
  //       return prev - 1; // Decrease the timer by 1 second
  //     });
  //   }, 1000); // Update timer every second
  // };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="max-w-[1550px] mx-auto">
    <div className="flex flex-col md:flex-row h-screen lg:h-[800px]">
    {/* Left Image Section */}
    <div className="w-full md:w-1/2 h-screen bg-gray-100">
      <img
        src="/bag-promotional-image-bag-advertising-image-fashion-banner-poster-fashion-banner-fashion-shop-banner 2.png"
        alt="Promotional"
        className="lg:h-[800px] w-full h-full object-cover"
      />
    </div>

    {/* Right Form Section */}
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8">
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-8">
        <img src="/Group1.svg" alt="KUKU Logo" className="h-10 w-10" />
        <div className="text-black text-2xl font-palanquin_dark font-bold">
          KUKU
        </div>
      </div>
        <div className="text-black text-xl font-Karla font-bold mb-6">
          Create your account
        </div>

        {/* Form */}
        <form className="w-full max-w-md">
          {/* Email or Phone Number */}
          <div id="recaptcha-container"></div>
          <div className="mb-4">
            <label className="text-black text-base font-Karla font-bold mb-2 block">
              Email or Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your e-mail or phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none"
              required
            />
          </div>

          {/* OTP */}
          <div className="mb-2">
            <label className="text-black text-base font-karla font-bold mb-2 block">
              OTP
            </label>
            <input
              type="text"
              placeholder="Enter the OTP received"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none"
              required
              disabled={!isOtpSent} // Disable input until OTP is sent
            />
          </div>

          {/* Timer Display */}
          {isOtpSent && (
            <div className="mt-2 text-[#e4086f] text-sm font-normal font-karla underline leading-none">
              {timer > 0
                ? `Resend OTP in ${Math.floor(timer / 60)}:${
                    timer % 60 < 10 ? "0" : ""
                  }${timer % 60}`
                : "You can resend the OTP now."}
            </div>
          )}

          {/* Checkbox */}
          <div className="flex flex-col items-start h-1 mt-2 mb-12">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <p className=" text-black text-sm font-normal font-karla leading-none">
                I agree with KUKU Terms of Service, Privacy Policy, and Default
                Notification Settings.
              </p>
            </label>
          </div>

          {isOtpSent ? (
            <div>
              {" "}
              {/* Link should only be active when OTP is filled */}
              <button
                type="button"
                onClick={handleRegister}
                className={`w-full p-3 ${
                  otp === ""
                    ? "bg-yellow-300 cursor-not-allowed opacity-50"
                    : "bg-yellow-400"
                } text-black font-semibold rounded-lg`}
                disabled={otp === ""} // Disable when OTP is not filled
              >
                Register
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleOtpsend}
              className="w-full p-3 bg-yellow-400 rounded-lg text-[#070707] text-xl font-normal font-karla leading-[23px]"
            >
              Send OTP
            </button>
          )}
        </form>

        {/* Social Login */}
        <div className="w-full max-w-md mt-6">
          {/* Google Login */}
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4"
          >
            <img
              src="/devicon_google.png"
              alt="Google"
              className="h-5 w-5 mr-3"
            />
            <span className="text-gray-800 font-bold ">
              Sign in with Google
            </span>
          </button>

          {/* Facebook Login */}
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4">
            <img
              src="/devicon_facebook.svg"
              alt="Facebook"
              className="h-5 w-5 mr-3"
            />
            <span className="text-gray-800 font-bold">
              Continue with Facebook
            </span>
          </button>

          {/* Apple Login */}
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg">
            <img
              src="/ic_round-apple.svg"
              alt="Apple"
              className="h-5 w-5 mr-3"
            />
            <span className="text-gray-800 font-bold">Continue with Apple</span>
          </button>
        </div>

        {/* Login */}
        <p className="mt-6 text-center text-[#999999] text-base font-normal font-karla leading-[18.40px]">
          Already have an account?{" "}
          <a href="/login" className="text-pink-600">
            Login
          </a>
        </p>
      </div>
    </div>
    </div>
  );
}

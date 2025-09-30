



// "use client"; // Ensure Client-Side rendering

// import { googleSignIn, signinOtp, verifySigninOtp } from "@/store/auth/authSlice";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { useDispatch } from "react-redux";

// export default function Login() {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isChecked, setIsChecked] = useState(false);
//   const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent
//   const [timer, setTimer] = useState(0); // Timer for 2 minutes (120 seconds)
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const hasSentRef = useRef(false);

//   const handleSendOtp = async () => {
//     const res = await dispatch(signinOtp({ emailOrPhone }));

//     setIsOtpSent(true);

//     // Calculate remaining time to expire
//     const currentTime = Date.now(); // Current time in milliseconds
//     const remainingTimeInMs = +res.payload.otpExpires - currentTime; // Remaining time in milliseconds
//     const remainingTimeInSeconds = Math.ceil(remainingTimeInMs / 1000); // Convert to seconds and round up
//     console.log({ remainingTimeInSeconds, remainingTimeInMs });
//     setTimer(remainingTimeInSeconds);
//     startTimer();
//   };

//   const handleContinue = async () => {
//     console.log("heree");
//     const res = await dispatch(verifySigninOtp({ emailOrPhone, otp }));
//     if (res.type === "auth/otpSignIn/fulfilled") {
//       router.push("/");
//     }
//   };

//   const startTimer = () => {
//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           return 0; // Stop the timer at 0
//         }
//         return prev - 1; // Decrease the timer by 1 second
//       });
//     }, 1000); // Update timer every second
//   };

//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };
//   const handleGoogleSignIn = async () => {
//     signIn('google')
//   };

//   useEffect(() => {
//     const handleGoogleSignIn = async () => {
//       if (session) {
//         const res = await dispatch(googleSignIn({ session, status }));
//         if (res.type === "auth/googleSignIn/fulfilled") {
//           router.push("/");
//         }
//       }
//     };
//     if (session && !hasSentRef.current) {
//       hasSentRef.current = true; // Mark the call as already made
//       handleGoogleSignIn();
//     }

//     // Call the async function inside useEffect
//   }, [session, dispatch, status, router]);

//   return (
//     <div className="max-w-[1550px] mx-auto">
//     <div className="flex flex-col md:flex-row h-screen lg:h-[800px]">
//       {/* Left Image Section */}
//       <div className="w-full md:w-1/2 h-screen bg-gray-100">
//         <img
//           src="/bag-promotional-image-bag-advertising-image-fashion-banner-poster-fashion-banner-fashion-shop-banner 2.png"
//           alt="Promotional"
//           className="lg:h-[800px] w-full h-full object-cover"
//         />
//       </div>

//       {/* Right Form Section */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8">
//         {/* Logo Section */}
//         <div className="flex items-center gap-2 mb-8">
//           <img src="/Group1.svg" alt="KUKU Logo" className="h-10 w-10" />
//           <div className="text-black text-2xl font-palanquin_dark font-bold">
//             KUKU
//           </div>
//         </div>

//         <div className="text-black text-xl font-karla font-bold mb-6">
//           Please sign in to continue
//         </div>

//         {/* Form */}
//         <form className="w-full max-w-md">
//           {/* Email or Phone Number */}
//           <div className="mb-4">
//             <label className="text-black text-base font-karla font-bold mb-2 block">
//               Email or Phone Number
//             </label>
//             <input
//               className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none"
//               type="text"
//               placeholder="Enter your e-mail or phone number"
//               value={emailOrPhone}
//               onChange={(e) => setEmailOrPhone(e.target.value)}
//               required
//             />
//           </div>

//           {/* OTP */}
//           <div className="mb-2">
//             <label className="text-black text-base font-karla font-bold mb-2 block">
//               OTP
//             </label>
//             <input
//               type="text"
//               placeholder="Enter the OTP received"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none"
//               required
//               disabled={!isOtpSent} // Disable input until OTP is sent
//             />
//           </div>
//           {/* Timer Display */}
//           {isOtpSent && (
//             <div className="mt-1 text-[#e4086f] text-sm font-normal font-karla underline leading-none ">
//               {timer > 0
//                 ? `Resend OTP in ${Math.floor(timer / 60)}:${
//                   timer % 60 < 10 ? "0" : ""
//                 }${timer % 60}`
//                 : "You can resend the OTP now."}
//             </div>
//           )}

//           {/* Checkbox */}
//           <div className="flex flex-col items-start h-1 mt-2 mb-6">
//             <label className="flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={handleCheckboxChange}
//                 className="mr-2"
//               />
//               <span className=" text-black text-sm font-normal font-karla leading-none">
//                 Stay signed in
//               </span>
//             </label>
//           </div>

//           <div className="flex flex-col space-y-4">
//             {/* Send OTP Button */}
//             <button
//               type="button"
//               className={`w-full p-3 ${
//                 isOtpSent && timer > 0
//                   ? "bg-gray-300 cursor-not-allowed opacity-50"
//                   : "bg-yellow-400"
//               } text-black font-semibold font-karla rounded-lg`}
//               onClick={handleSendOtp}
//               disabled={isOtpSent && timer > 0} // Disable when timer is running
//             >
//               {isOtpSent && timer > 0
//                 ? `Resend OTP`
//                 : isOtpSent
//                   ? "Resend OTP"
//                   : "Send OTP"}
//             </button>

//             {/* Continue Button */}
//             <button
//               type="button" // Ensure this button does not submit the form
//               onClick={handleContinue} // Call handleContinue when clicked
//               className={`w-full p-3 ${
//                 otp === ""
//                   ? "bg-yellow-300 cursor-not-allowed opacity-50"
//                   : "bg-yellow-400"
//               } text-black font-semibold font-karla rounded-lg`}
//               disabled={otp === ""} // Disable when OTP field is empty
//             >
//               Continue
//             </button>
//           </div>
//         </form>

//         {/* Social Login */}
//         <div className="w-full max-w-md mt-6">
//           {/* Google Login */}
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4"
//           >
//             <img
//               src="/devicon_google.png"
//               alt="Google"
//               className="h-5 w-5 mr-3"
//             />
//             <span className="text-gray-800 font-bold font-karla ">
//               Sign in with Google
//             </span>
//           </button>

//           {/* Facebook Login */}
//           <button
//             className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4"
//           >
//             <img
//               src="/devicon_facebook.svg"
//               alt="Facebook"
//               className="h-5 w-5 mr-3"
//             />
//             <span className="text-gray-800 font-bold font-karla">
//               Continue with Facebook
//             </span>
//           </button>

//           {/* Apple Login */}
//           <button
//             className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg"
//           >
//             <img
//               src="/ic_round-apple.svg"
//               alt="Apple"
//               className="h-5 w-5 mr-3"
//             />
//             <span className="text-gray-800 font-bold font-karla">
//               Continue with Apple
//             </span>
//           </button>
//         </div>

//         {/* Sign Up */}
//         <p className="mt-6 text-center text-[#999999] text-base font-normal font-karla leading-[18.40px]">
//           Don’t have an account?{" "}
//           <a href="/registration" className="text-pink-600 font-karla">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//     </div>
//   );
// }









"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn, signinOtp, verifySigninOtp } from "@/store/auth/authSlice";
import { toast } from "react-hot-toast";

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const hasSentRef = useRef(false);

  const otpSent = useSelector((state) => state.auth.otpSend);

  useEffect(() => {
    setIsOtpSent(otpSent);
  }, [otpSent]);

  const validateInput = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (emailRegex.test(input)) return "email";
    if (phoneRegex.test(input)) return "phone";
    return "invalid";
  };

  const handleSendOtp = async () => {
    const inputType = validateInput(emailOrPhone);
    if (inputType === "invalid") {
      setError("Please enter a valid email or phone number");
      return;
    }

    setError("");
    const res = await dispatch(signinOtp({ emailOrPhone }));
    if (res.type === "auth/sendSigninOtp/fulfilled") {
      setIsOtpSent(true);
      const currentTime = Date.now();
      const remainingTimeInMs = res.payload.otpExpires - currentTime;
      const remainingTimeInSeconds = Math.ceil(remainingTimeInMs / 1000);
      setTimer(remainingTimeInSeconds);
    }
  };

  const handleContinue = async () => {
    const res = await dispatch(verifySigninOtp({ emailOrPhone, otp }));
    if (res.type === "auth/otpSignIn/fulfilled") {
      router.push("/");
    }
  };

  useEffect(() => {
    const handleGoogleSignIn = async () => {
      if (session && !hasSentRef.current) {
        hasSentRef.current = true;
        const res = await dispatch(googleSignIn({ session, status }));
        if (res.type === "auth/googleSignIn/fulfilled") {
          router.push("/");
        }
      }
    };
    handleGoogleSignIn();
  }, [session, dispatch, status, router]);

  useEffect(() => {
    let interval = null;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleGoogleSignIn = () => {
    signIn("google", { redirect: false });
  };

  return (
    <div className="max-w-[1550px] mx-auto">
      <div className="flex flex-col md:flex-row h-screen lg:h-[800px]">
        <div className="w-full md:w-1/2 h-screen bg-gray-100">
          <img
            src="/bag-promotional-image-bag-advertising-image-fashion-banner-poster-fashion-banner-fashion-shop-banner 2.png"
            alt="Promotional"
            className="lg:h-[800px] w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8">
          <div className="flex items-center gap-2 mb-8">
            <img src="/Group1.svg" alt="KUKU Logo" className="h-10 w-10" />
            <div className="text-black text-2xl font-palanquin_dark font-bold">KUKU</div>
          </div>
          <div className="text-black text-xl font-karla font-bold mb-6">Please sign in to continue</div>
          <form className="w-full max-w-md">
            <div className="mb-4">
              <label className="text-black text-base font-karla font-bold mb-2 block">Email or Phone Number</label>
              <input
                className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none"
                type="text"
                placeholder="Enter your email or phone number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="mb-2">
              <label className="text-black text-base font-karla font-bold mb-2 block">OTP</label>
              <input
                type="text"
                placeholder="Enter the OTP received"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none"
                required
                disabled={!isOtpSent}
              />
            </div>
            {isOtpSent && (
              <div className="mt-1 text-[#e4086f] text-sm font-normal font-karla underline leading-none">
                {timer > 0
                  ? `Resend OTP in ${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`
                  : "You can resend the OTP now."}
              </div>
            )}
            <div className="flex flex-col items-start h-1 mt-2 mb-6">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="mr-2" />
                <span className="text-black text-sm font-normal font-karla leading-none">Stay signed in</span>
              </label>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                className={`w-full p-3 ${isOtpSent && timer > 0 ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-yellow-400"} text-black font-semibold font-karla rounded-lg`}
                onClick={handleSendOtp}
                disabled={isOtpSent && timer > 0}
              >
                {isOtpSent && timer > 0 ? "Resend OTP" : isOtpSent ? "Resend OTP" : "Send OTP"}
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className={`w-full p-3 ${otp === "" ? "bg-yellow-300 cursor-not-allowed opacity-50" : "bg-yellow-400"} text-black font-semibold font-karla rounded-lg`}
                disabled={otp === ""}
              >
                Continue
              </button>
            </div>
          </form>
          <div className="w-full max-w-md mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4"
            >
              <img src="/devicon_google.png" alt="Google" className="h-5 w-5 mr-3" />
              <span className="text-gray-800 font-bold font-karla">Sign in with Google</span>
            </button>
            <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4">
              <img src="/devicon_facebook.svg" alt="Facebook" className="h-5 w-5 mr-3" />
              <span className="text-gray-800 font-bold font-karla">Continue with Facebook</span>
            </button>
          </div>
          <p className="mt-6 text-center text-[#999999] text-base font-normal font-karla leading-[18.40px]">
            Don’t have an account? <a href="/registration" className="text-pink-600 font-karla">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
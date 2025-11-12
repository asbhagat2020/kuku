

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   googleSignIn,
//   signinOtp,
//   verifySigninOtp,
// } from "@/store/auth/authSlice";
// import { toast } from "react-hot-toast";
// import Link from "next/link";

// export default function Login() {
//   const [emailOrPhone, setEmailOrPhone] = useState(""); // For email or local UAE phone
//   const [otp, setOtp] = useState("");
//   const [isChecked, setIsChecked] = useState(false);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const hasSentRef = useRef(false);

//   const otpSent = useSelector((state) => state.auth.otpSend);

//   useEffect(() => {
//     setIsOtpSent(otpSent);
//   }, [otpSent]);

//   // Validate email or UAE local phone
//   const validateInput = (input) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegexUAE = /^[5][0-9]{8}$/; // 9 digits starting with 5 for UAE

//     if (emailRegex.test(input)) {
//       return "email";
//     }
//     if (phoneRegexUAE.test(input)) {
//       return "phone";
//     }
//     return "invalid";
//   };

//   const handleSendOtp = async () => {
//     let inputValue = emailOrPhone.trim();
//     if (!inputValue) {
//       setError("Please enter your email or UAE phone number");
//       return;
//     }

//     const inputType = validateInput(inputValue);
//     if (inputType === "invalid") {
//       setError(
//         "Please enter a valid email or 9-digit UAE number starting with 5 (e.g., 543781819)"
//       );
//       return;
//     }

//     setError("");
//     setLoading(true);
//     try {
//       console.log("Sending OTP request:", { emailOrPhone: inputValue });
//       const res = await dispatch(signinOtp({ emailOrPhone: inputValue }));
//       if (res.type === "auth/sendSigninOtp/fulfilled") {
//         setIsOtpSent(true);
//         const currentTime = Date.now();
//         const remainingTimeInMs = res.payload.otpExpires - currentTime;
//         const remainingTimeInSeconds = Math.ceil(remainingTimeInMs / 1000);
//         setTimer(remainingTimeInSeconds);
//         // toast.success("OTP sent successfully!");
//       } else {
//         setError(res.payload || "Failed to send OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("handleSendOtp error:", error);
//       setError("An error occurred while sending OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContinue = async () => {
//     if (!otp.trim()) {
//       setError("Please enter the OTP");
//       return;
//     }

//     let inputValue = emailOrPhone.trim();
//     setLoading(true);
//     try {
//       const res = await dispatch(
//         verifySigninOtp({ emailOrPhone: inputValue, otp })
//       );
//       if (res.type === "auth/otpSignIn/fulfilled") {
//         // toast.success("Login successful!");
//         router.push("/");
//       } else {
//         setError(res.payload || "Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("handleContinue error:", error);
//       setError("An error occurred while verifying OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const handleGoogleSignIn = async () => {
//       if (session && !hasSentRef.current) {
//         hasSentRef.current = true;
//         try {
//           const res = await dispatch(googleSignIn({ session, status }));
//           if (res.type === "auth/googleSignIn/fulfilled") {
//             // toast.success("Google Sign-In successful!");
//             router.push("/");
//           } else {
//             setError(res.payload || "Google Sign-In failed.");
//           }
//         } catch (error) {
//           setError("An error occurred during Google Sign-In.");
//         }
//       }
//     };
//     handleGoogleSignIn();
//   }, [session, dispatch, status, router]);

//   useEffect(() => {
//     let interval = null;
//     if (isOtpSent && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isOtpSent, timer]);

//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   const handleGoogleSignIn = () => {
//     signIn("google", { redirect: false });
//   };

//   return (
//     <div className="max-w-[1550px] mx-auto">
//       <div className="flex flex-col md:flex-row h-screen lg:h-[800px]">
//         <div className="w-full md:w-1/2 h-screen bg-gray-100">
//           <img
//             src="/bag-promotional-image-bag-advertising-image-fashion-banner-poster-fashion-banner-fashion-shop-banner 2.png"
//             alt="Promotional"
//             className="lg:h-[800px] w-full h-full object-cover"
//           />
//         </div>
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8">
//           <div className="flex items-center gap-2 mb-8">
//             <img src="/Group1.svg" alt="KUKU Logo" className="h-10 w-10" />
//             <div className="text-black text-2xl font-palanquin_dark font-bold">
//               KUKU
//             </div>
//           </div>
//           <div className="text-black text-xl font-karla font-bold mb-6">
//             Please sign in to continue
//           </div>
//           <form className="w-full max-w-md">
//             <div className="mb-4">
//               <label className="text-black text-base font-karla font-bold mb-2 block">
//                 Email or Phone Number
//               </label>
//               <input
//                 className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla"
//                 type="text"
//                 placeholder="Enter your email or UAE phone number (e.g., test@example.com or 543781819)"
//                 value={emailOrPhone}
//                 onChange={(e) => {
//                   setEmailOrPhone(e.target.value);
//                 }}
//                 required
//               />
//               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//             </div>
//             <div className="mb-2">
//               <label className="text-black text-base font-karla font-bold mb-2 block">
//                 OTP
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter the OTP received"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none"
//                 required
//                 disabled={!isOtpSent}
//               />
//             </div>
//             {isOtpSent && (
//               <div className="mt-1 text-[#e4086f] text-sm font-normal font-karla underline leading-none">
//                 {timer > 0
//                   ? `Resend OTP in ${Math.floor(timer / 60)}:${
//                       timer % 60 < 10 ? "0" : ""
//                     }${timer % 60}`
//                   : "You can resend the OTP now."}
//               </div>
//             )}
//             <div className="flex flex-col items-start h-1 mt-2 mb-6">
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={handleCheckboxChange}
//                   className="mr-2"
//                 />
//                 <span className="text-black text-sm font-normal font-karla leading-none">
//                   Stay signed in
//                 </span>
//               </label>
//             </div>
//             <div className="flex flex-col space-y-4">
//               <button
//                 type="button"
//                 className={`w-full p-3 ${
//                   (isOtpSent && timer > 0) || loading
//                     ? "bg-gray-300 cursor-not-allowed opacity-50"
//                     : "bg-yellow-400"
//                 } text-black font-semibold font-karla rounded-lg`}
//                 onClick={handleSendOtp}
//                 disabled={(isOtpSent && timer > 0) || loading}
//               >
//                 {loading
//                   ? "Sending..."
//                   : isOtpSent && timer > 0
//                   ? "Resend OTP"
//                   : "Send OTP"}
//               </button>
//               <button
//                 type="button"
//                 onClick={handleContinue}
//                 className={`w-full p-3 ${
//                   otp === "" || loading
//                     ? "bg-yellow-300 cursor-not-allowed opacity-50"
//                     : "bg-yellow-400"
//                 } text-black font-semibold font-karla rounded-lg`}
//                 disabled={otp === "" || loading}
//               >
//                 {loading ? "Verifying..." : "Continue"}
//               </button>
//             </div>
//           </form>
//           <div className="w-full max-w-md mt-6">
//             <button
//               onClick={handleGoogleSignIn}
//               className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4"
//             >
//               <img
//                 src="/devicon_google.png"
//                 alt="Google"
//                 className="h-5 w-5 mr-3"
//               />
//               <span className="text-gray-800 font-bold font-karla">
//                 Sign in with Google
//               </span>
//             </button>
//             <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4">
//               <img
//                 src="/devicon_facebook.svg"
//                 alt="Facebook"
//                 className="h-5 w-5 mr-3"
//               />
//               <span className="text-gray-800 font-bold font-karla">
//                 Continue with Facebook
//               </span>
//             </button>
//           </div>
//           {/* <p className="mt-6 text-center text-[#999999] text-base font-normal font-karla leading-[18.40px]">
//             Don’t have an account? <a href="/registration" className="text-pink-600 font-karla">Sign up</a>
//           </p> */}

//           <p className="mt-6 text-center text-[#999999] text-base font-normal font-karla leading-[18.40px]">
//             Don’t have an account?{" "}
//             <Link
//               href="/registration"
//               className="text-pink-600 font-karla hover:underline"
//             >
//               Sign up
//             </Link>{" "}
//             — read our{" "}
//             <Link
//               href="/sign-up-policy"
//               className="text-pink-600 font-karla hover:underline"
//             >
//               Sign Up Policy
//             </Link>
//             .
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  googleSignIn,
  signinOtp,
  verifySigninOtp,
} from "@/store/auth/authSlice";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const hasSentRef = useRef(false);

  const otpSent = useSelector((state) => state.auth.otpSend);

  useEffect(() => {
    setIsOtpSent(otpSent);
  }, [otpSent]);

  // Validate email or UAE local phone
  const validateInput = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegexUAE = /^[5][0-9]{8}$/;

    if (emailRegex.test(input)) return "email";
    if (phoneRegexUAE.test(input)) return "phone";
    return "invalid";
  };

  const handleSendOtp = async () => {
    let inputValue = emailOrPhone.trim();
    if (!inputValue) {
      setError("Please enter your email or UAE phone number");
      return;
    }

    const inputType = validateInput(inputValue);
    if (inputType === "invalid") {
      setError(
        "Please enter a valid email or 9-digit UAE number starting with 5 (e.g., 543781819)"
      );
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await dispatch(signinOtp({ emailOrPhone: inputValue }));
      if (res.type === "auth/sendSigninOtp/fulfilled") {
        setIsOtpSent(true);
        const currentTime = Date.now();
        const remainingTimeInMs = res.payload.otpExpires - currentTime;
        const remainingTimeInSeconds = Math.ceil(remainingTimeInMs / 1000);
        setTimer(remainingTimeInSeconds);
      } else {
        setError(res.payload || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("handleSendOtp error:", error);
      setError("An error occurred while sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Smart redirect after login - sirf ticket case ke liye
  const handleLoginSuccess = () => {
    const returnTo = searchParams.get("returnTo");
    
    // Agar returnTo hai aur ticket se related hai, to ticket page pe jao
    if (returnTo && returnTo.startsWith("ticket-")) {
      const ticketId = returnTo.replace("ticket-", "");
      setTimeout(() => {
        router.push(`/support?ticket=${ticketId}`);
      }, 100);
    } else {
      // Normal login - homepage pe jao
      router.push("/");
    }
  };

  const handleContinue = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    let inputValue = emailOrPhone.trim();
    setLoading(true);
    try {
      const res = await dispatch(
        verifySigninOtp({ emailOrPhone: inputValue, otp })
      );
      if (res.type === "auth/otpSignIn/fulfilled") {
        setLoading(false);
        handleLoginSuccess();
      } else {
        setError(res.payload || "Invalid OTP. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("handleContinue error:", error);
      setError("An error occurred while verifying OTP. Please try again.");
      setLoading(false);
    }
  };

  // Google Sign-In with redirect back
  useEffect(() => {
    const handleGoogleSignInEffect = async () => {
      if (session && !hasSentRef.current) {
        hasSentRef.current = true;
        try {
          const res = await dispatch(googleSignIn({ session, status }));
          if (res.type === "auth/googleSignIn/fulfilled") {
            setLoading(false);
            handleLoginSuccess();
          } else {
            setError(res.payload || "Google Sign-In failed.");
          }
        } catch (error) {
          setError("An error occurred during Google Sign-In.");
        }
      }
    };
    handleGoogleSignInEffect();
  }, [session, dispatch, status]);

  // Timer for OTP resend
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

  const handleGoogleLogin = () => {
    // Google login ke liye - direct signIn call karo, bina localStorage ke
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
            <div className="text-black text-2xl font-palanquin_dark font-bold">
              KUKU
            </div>
          </div>
          <div className="text-black text-xl font-karla font-bold mb-6">
            Please sign in to continue
          </div>
          <form className="w-full max-w-md">
            <div className="mb-4">
              <label className="text-black text-base font-karla font-bold mb-2 block">
                Email or Phone Number
              </label>
              <input
                className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla"
                type="text"
                placeholder="Enter your email or UAE phone number (e.g., test@example.com or 543781819)"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
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
                disabled={!isOtpSent}
              />
            </div>
            {isOtpSent && (
              <div className="mt-1 text-[#e4086f] text-sm font-normal font-karla underline leading-none">
                {timer > 0
                  ? `Resend OTP in ${Math.floor(timer / 60)}:${
                      timer % 60 < 10 ? "0" : ""
                    }${timer % 60}`
                  : "You can resend the OTP now."}
              </div>
            )}
            <div className="flex flex-col items-start h-1 mt-2 mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <span className="text-black text-sm font-normal font-karla leading-none">
                  Stay signed in
                </span>
              </label>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                className={`w-full p-3 ${
                  (isOtpSent && timer > 0) || loading
                    ? "bg-gray-300 cursor-not-allowed opacity-50"
                    : "bg-yellow-400"
                } text-black font-semibold font-karla rounded-lg`}
                onClick={handleSendOtp}
                disabled={(isOtpSent && timer > 0) || loading}
              >
                {loading
                  ? "Sending..."
                  : isOtpSent && timer > 0
                  ? "Resend OTP"
                  : "Send OTP"}
              </button>
              <button
                type="button"
                onClick={handleContinue}
                className={`w-full p-3 ${
                  otp === "" || loading
                    ? "bg-yellow-300 cursor-not-allowed opacity-50"
                    : "bg-yellow-400"
                } text-black font-semibold font-karla rounded-lg`}
                disabled={otp === "" || loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </div>
          </form>
          <div className="w-full max-w-md mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4"
            >
              <img
                src="/devicon_google.png"
                alt="Google"
                className="h-5 w-5 mr-3"
              />
              <span className="text-gray-800 font-bold font-karla">
                Sign in with Google
              </span>
            </button>
            <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4">
              <img
                src="/devicon_facebook.svg"
                alt="Facebook"
                className="h-5 w-5 mr-3"
              />
              <span className="text-gray-800 font-bold font-karla">
                Continue with Facebook
              </span>
            </button>
          </div>

          <p className="mt-6 text-center text-[#999999] text-base font-normal font-karla leading-[18.40px]">
           Don&apos;t have an account?{" "}
            <Link
              href="/registration"
              className="text-pink-600 font-karla hover:underline"
            >
              Sign up
            </Link>{" "}
            — read our{" "}
            <Link
              href="/sign-up-policy"
              className="text-pink-600 font-karla hover:underline"
            >
              Sign Up Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
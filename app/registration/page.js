





"use client";
import { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { googleRegisterAuth, otpSignup, registerOtp } from "@/store/auth/authSlice";
import { toast } from "react-hot-toast";
export default function Home() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const hasSentRef = useRef(false);
  const isProcessingRef = useRef(false);
  const otpSent = useSelector((state) => state.auth.otpSend);
  useEffect(() => {
    setIsOtpSent(otpSent);
  }, [otpSent]);
  const validateInput = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegexUAE = /^[5][0-9]{8}$/;
    if (emailRegex.test(input)) return "email";
    if (phoneRegexUAE.test(input)) return "phone";
    return "invalid";
  };
  const handleInputChange = (e) => {
    let value = e.target.value;
  
    if (value.includes('@') || inputType === 'email') {
      setEmailOrPhone(value);
      setInputType('email');
      setError("");
      return;
    }
  
    if (/[a-zA-Z]/.test(value)) {
      setEmailOrPhone(value);
      setInputType('email');
      setError("");
      return;
    }
  
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length <= 9) {
      setEmailOrPhone(digitsOnly);
      setInputType(digitsOnly ? 'phone' : '');
      setError("");
    } else if (digitsOnly.length === 0) {
      setEmailOrPhone('');
      setInputType('');
      setError("");
    }
  };
  const handleOtpsend = async () => {
    let inputValue = emailOrPhone.trim();
    if (!inputValue) {
      setError("Please enter your email or UAE phone number");
      return;
    }
    const inputTypeValidation = validateInput(inputValue);
    if (inputTypeValidation === "invalid") {
      setError("Please enter a valid email or 9-digit UAE number starting with 5 (e.g., 543781819)");
      return;
    }
    setError("");
    setLoading(true);
    try {
      console.log("Sending OTP request:", { emailOrPhone: inputValue });
      const res = await dispatch(registerOtp({ emailOrPhone: inputValue }));
      if (res.type === "auth/sendRegistrationOtp/fulfilled") {
        setIsOtpSent(true);
        const currentTime = Date.now();
        const remainingTimeInMs = res.payload.otpExpires - currentTime;
        const remainingTimeInSeconds = Math.ceil(remainingTimeInMs / 1000);
        setTimer(remainingTimeInSeconds);
      } else {
        setError(res.payload || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("handleOtpsend error:", error);
      setError("An error occurred while sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async () => {
    let inputValue = emailOrPhone.trim();
    const inputTypeValidation = validateInput(inputValue);
    if (inputTypeValidation === "invalid") {
      setError("Please enter a valid email or UAE phone number");
      return;
    }
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    if (!isChecked) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    setLoading(true);
    try {
      const res = await dispatch(otpSignup({ emailOrPhone: inputValue, otp }));
      if (res.type === "auth/otpSignup/fulfilled") {
        router.push("/account");
      } else {
        setError(res.payload || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("handleRegister error:", error);
      setError("An error occurred while verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  const handleGoogleRegistration = async () => {
    if (!session || hasSentRef.current || isProcessingRef.current || status === "loading") {
      return;
    }
    hasSentRef.current = true;
    isProcessingRef.current = true;
    try {
      const result = await dispatch(googleRegisterAuth({ session })).unwrap();
    
      // ✅ Backend decides where to go (always /account for registration context)
      const redirectPath = result.redirectTo || "/account";
    
      if (!result.user.isProfileComplete) {
        toast.success("Welcome! Please complete your profile");
      } else {
        toast.success("Welcome back! Please complete your profile to continue");
      }
    
      router.replace(redirectPath);
    
    } catch (error) {
      console.error("❌ Google auth failed:", error);
      setError("Google authentication failed");
      hasSentRef.current = false;
    } finally {
      isProcessingRef.current = false;
    }
  };
  handleGoogleRegistration();
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
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);
const handleSignIn = () => {
  signIn("google", {
    redirect: false,
    callbackUrl: "/registration"
  });
};
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
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
          <div className="text-black text-xl font-Karla font-bold mb-6">Create your account</div>
          <form className="w-full max-w-md">
            <div className="mb-4">
              <label className="text-black text-base font-Karla font-bold mb-2 block">Email or Phone Number</label>
            
              {inputType === 'phone' ? (
                <div className="flex items-center w-full border border-gray-300 bg-gray-100 rounded-lg">
                  <span className="pl-3 text-gray-600 font-medium text-sm">+971</span>
                  <input
                    type="text"
                    placeholder="543781819"
                    value={emailOrPhone}
                    onChange={handleInputChange}
                    className="flex-1 p-3 bg-transparent outline-none text-black text-sm font-normal font-karla leading-none"
                    required
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Enter your email or UAE phone number (e.g., test@example.com or 543781819)"
                  value={emailOrPhone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none"
                  required
                />
              )}
            
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            
              {inputType === 'phone' && (
                <p className="text-gray-500 text-xs mt-1">UAE country code (+971) will be used</p>
              )}
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
              <div className="mt-2 text-[#e4086f] text-sm font-normal font-karla underline leading-none">
                {timer > 0
                  ? `Resend OTP in ${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`
                  : "You can resend the OTP now."}
              </div>
            )}
            <div className="flex flex-col items-start h-1 mt-2 mb-12">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <p className="text-black text-sm font-normal font-karla leading-none">
                  I agree with KUKU Terms of Service, Privacy Policy, and Default Notification Settings.
                </p>
              </label>
            </div>
            {isOtpSent ? (
              <button
                type="button"
                onClick={handleRegister}
                className={`w-full p-3 ${
                  otp === "" || !isChecked || loading
                    ? "bg-yellow-300 cursor-not-allowed opacity-50"
                    : "bg-yellow-400"
                } text-black font-semibold rounded-lg`}
                disabled={otp === "" || !isChecked || loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOtpsend}
                className={`w-full p-3 ${
                  loading ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-yellow-400"
                } rounded-lg text-[#070707] text-xl font-normal font-karla leading-[23px]`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            )}
          </form>
          <div className="w-full max-w-md mt-6">
            <button
              onClick={handleSignIn}
              className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4"
            >
              <img src="/devicon_google.png" alt="Google" className="h-5 w-5 mr-3" />
              <span className="text-gray-800 font-bold">Sign up with Google</span>
            </button>
          </div>
          <p className="mt-6 text-center text-[#999999] text-base font-normal font-karla leading-[18.40px]">
            Already have an account? <a href="/login" className="text-pink-600">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
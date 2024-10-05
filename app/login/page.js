"use client"; // Ensure Client-Side rendering

import { useState } from "react";

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent
  const [timer, setTimer] = useState(120); // Timer for 2 minutes (120 seconds)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP logic here
    if (isOtpSent) {
      // If OTP is already sent, handle continue logic
      console.log("Continuing...", { emailOrPhone, otp });
    } else {
      sendOtp(); // Send OTP if not sent
    }
  };

  const sendOtp = () => {
    console.log("Sending OTP to:", emailOrPhone);
    setIsOtpSent(true);
    setTimer(120); // Reset timer
    startTimer(); // Start the countdown timer
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0; // Stop the timer at 0
        }
        return prev - 1; // Decrease the timer by 1 second
      });
    }, 1000); // Update timer every second
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col md:flex-row h-[800px]">
      {/* Left Image Section */}
      <div className="w-1/2 bg-gray-100">
        <img
          src="/bag-promotional-image-bag-advertising-image-fashion-banner-poster-fashion-banner-fashion-shop-banner 2.png"
          alt="Promotional"
          className="w-[703px] h-[800px] object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-[150px] py-2">
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-8">
          <img src="/Group1.svg" alt="KUKU Logo" className="h-14 w-14" />
          <div className="text-black text-3xl font-['Palanquin Dark'] font-bold">KUKU</div>
        </div>

        <div className="text-black text-xl font-karla font-bold mb-6">
          Please sign in to continue
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* Email or Phone Number */}
          <div className="mb-4">
            <label className="text-black text-base font-karla font-bold mb-2 block">
              Email or Phone Number
            </label>
            <input
            className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none"
              type="text"
              placeholder="Enter your e-mail or phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
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
            <div className="mt-1 text-[#e4086f] text-sm font-normal font-karla underline leading-none ">
              {timer > 0 ? `Resend OTP in ${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}` : "You can resend the OTP now."}
            </div>
          )}

          {/* Checkbox */}
          <div className="flex flex-col items-start h-1 mt-2 mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className=" text-black text-sm font-normal font-karla leading-none">Stay signed in</span>
            </label>
          </div>

<button
  type="submit"
  className={`w-full p-3 ${isOtpSent && otp === "" ? "bg-yellow-300 cursor-not-allowed opacity-50" : "bg-yellow-400"} text-black font-semibold font-karla rounded-lg`}
  disabled={isOtpSent && otp === ""} // Disable when OTP is sent but the OTP field is empty
>
  {isOtpSent ? "Continue" : "Send OTP"}
</button>
        
        </form>

        {/* Social Login */}
        <div className="w-full max-w-md mt-6">
          {/* Google Login */}
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4">
            <img src="/devicon_google.png" alt="Google" className="h-5 w-5 mr-3" />
            <span className="text-gray-800 font-bold font-karla ">Sign in with Google</span>
          </button>

          {/* Facebook Login */}
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4">
            <img src="/devicon_facebook.svg" alt="Facebook" className="h-5 w-5 mr-3" />
            <span className="text-gray-800 font-bold font-karla">Continue with Facebook</span>
          </button>

          {/* Apple Login */}
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg">
            <img src="/ic_round-apple.svg" alt="Apple" className="h-5 w-5 mr-3" />
            <span className="text-gray-800 font-bold font-karla">Continue with Apple</span>
          </button>
        </div>

        {/* Sign Up */}
        <p className="mt-6 text-center text-[#999999] text-base font-normal font-karla leading-[18.40px]">
          Don’t have an account?{" "}
          <a href="/registration" className="text-pink-600 font-karla">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

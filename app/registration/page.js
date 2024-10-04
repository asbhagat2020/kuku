"use client"; // Ensure Client-Side rendering

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
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

        <div className="text-black text-xl font-Karla font-bold mb-6">
          Create your account
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* Email or Phone Number */}
          <div className="mb-4">
            <label className="text-black text-base font-Karla font-bold mb-2 block">
              Email or Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your e-mail or phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg"
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
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg"
              required
              disabled={!isOtpSent} // Disable input until OTP is sent
              
            />
          </div>

          {/* Checkbox */}
          <div className="flex flex-col items-start h-1 mb-12">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <p className=" text-black text-sm font-normal font-karla leading-none">I agree with KUKU Terms of Service, Privacy Policy, and Default Notification Settings.</p>
            </label>
          </div>

          {/* Submit Button */}
          {isOtpSent ? (
            // Only wrap the button in Link when OTP is sent and user clicks "Register"
            <Link href="/account">
              <button
                type="submit"
                className="w-full p-3 bg-yellow-400 text-black font-semibold rounded-lg"
              >
                Register
              </button>
            </Link>
          ) : (
            // If OTP is not sent, just handle OTP send
            <button
              type="submit"
              className="w-full p-3 bg-yellow-400 text-black font-semibold rounded-lg"
            >
              Send OTP
            </button>
          )}

          {/* Timer Display */}
          {isOtpSent && (
            <div className="mt-2 text-gray-600">
              {timer > 0
                ? `Resend OTP in ${Math.floor(timer / 60)}:${
                    timer % 60 < 10 ? "0" : ""
                  }${timer % 60}`
                : "You can resend the OTP now."}
            </div>
          )}
        </form>

        {/* Social Login */}
        <div className="w-full max-w-md mt-6">
          {/* Google Login */}
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4">
            <img src="/devicon_google.png" alt="Google" className="h-5 w-5 mr-3" />
            <span className="text-gray-800 font-bold ">Sign in with Google</span>
          </button>

          {/* Facebook Login */}
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg mb-4">
            <img src="/devicon_facebook.svg" alt="Facebook" className="h-5 w-5 mr-3" />
            <span className="text-gray-800 font-bold">Continue with Facebook</span>
          </button>

          {/* Apple Login */}
          <button className="w-full flex items-center justify-center p-3 bg-gray-100 border border-gray-300 rounded-lg">
            <img src="/ic_round-apple.svg" alt="Apple" className="h-5 w-5 mr-3" />
            <span className="text-gray-800 font-bold">Continue with Apple</span>
          </button>
        </div>

        {/* Login */}
        <p className="mt-6 text-center text-[#999999] text-base font-normal font-karla leading-[18.40px]">
        Already have an account? {" "}
          <a href="/login" className="text-pink-600">
          Login
          </a>
        </p>
      </div>
    </div>
  );
}

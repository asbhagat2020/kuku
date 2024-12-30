"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import clothHangerAnimation from "../public/lottieFiles/cloth_hanger.json";
import playgroundAnimation from "../public/lottieFiles/playground.json";
import giftboxAnimation from "../public/lottieFiles/giftbox.json";
import homeAnimation from "../public/lottieFiles/kukuhome.json";

const Giveaway = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pickTime: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.pickTime) errors.pickTime = "Pick time is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (!validateForm()) return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleFinalScreen = () => {
    setShowFinalScreen(true);
  };

  const handleFinalScreenClick = () => {
    setShowFinalScreen(false);
    setCurrentStep(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">
              Reuse Repurpose Recycle, let KuKu handle your textile by giving
              the reusable to charity or recycling them partnered with textile
              recyclers.
            </h2>
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition border border-black"
            >
              NEXT STEP
            </button>
          </div>
        );
      case 2:
        return (
          <div className="max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold mb-12 text-center">
              Fill Up the details
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.phone ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.address ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {formErrors.address}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <select
                  name="pickTime"
                  value={formData.pickTime}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.pickTime ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  <option value="">Select the Pick time</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
                {formErrors.pickTime && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {formErrors.pickTime}
                  </p>
                )}
              </div>
            </div>
            <div className="text-center mt-12">
              <button
                onClick={handleNext}
                className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition border border-black"
              >
                NEXT STEP
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">
              Lorem ipsum dolor sit amet consectetur. Eget neque ultrices ?
            </h2>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold border border-black hover:bg-gray-100 transition">
                LOREM IPSUM
              </button>
              <button
                onClick={handleFinalScreen}
                className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold border border-black hover:bg-gray-100 transition"
              >
                LOREM IPSUM
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderLottieAnimation = () => {
    const animationData =
      currentStep === 1
        ? homeAnimation
        : currentStep === 2
        ? clothHangerAnimation
        : playgroundAnimation;

    if (isMobileView) {
      return (
        <div className="absolute inset-0 w-full h-full">
          <Lottie
            loop
            play
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            animationData={animationData}
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          />
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center w-full lg:h-[50vh]">
        <Lottie loop play animationData={animationData} className="w-full" />
      </div>
    );
  };

  return (
    <>
      {!showFinalScreen ? (
        <div className="relative flex flex-col items-center min-h-screen w-screen overflow-hidden">
          <div className="fixed inset-0 w-screen h-screen">
            {renderLottieAnimation()}
          </div>

          <div className="relative z-10 w-full max-w-7xl px-6 pt-4">
            <div className="flex justify-between items-center mb-8">
              <Link href="/">
                <img src="/gv_arrow.png" alt="Back" className="w-8 h-8" />
              </Link>
              <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
            </div>

            <div className="w-full md:w-[88%] flex justify-center items-center mb-12 mx-auto">
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  onClick={() => goToStep(step)}
                  className={`w-1/3 h-1 mx-3 cursor-pointer ${
                    currentStep >= step ? "bg-green-500" : "bg-gray-300"
                  } rounded-full`}
                />
              ))}
            </div>

            {renderStepContent()}
          </div>
        </div>
      ) : (
        <div className="final-screen flex flex-col justify-center items-center min-h-screen w-screen p-6">
          <div className="absolute top-4 left-4 w-full max-w-7xl flex justify-start">
            <img
              src="/gv_arrow.png"
              alt="Arrow"
              className="cursor-pointer w-8 h-8 z-50"
              onClick={handleFinalScreenClick}
            />
          </div>
          <div className="text-center mt-[-200px] relative z-10">
            <h1 className="text-green-500 text-4xl font-bold">Giveaway</h1>
          </div>
          <button className="px-8 py-2 mt-8 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition relative z-10">
            Share on social
          </button>
          <Lottie
            loop
            play
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            animationData={giftboxAnimation}
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              left: 0,
              top: 0,
              marginBottom: "10px",
            }}
          />
          <button className="absolute top-4 right-4 z-10">
            <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
          </button>
        </div>
      )}
    </>
  );
};

export default Giveaway;

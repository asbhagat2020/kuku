"use client";

import React, { useState } from "react";

const Giveaway = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }
  };

  const handleFinalScreen = () => {
    setShowFinalScreen(true); // Move to final screen when button clicked on 3rd step
  };

  const handleFinalScreenClick = () => {
    setShowFinalScreen(false); // Redirect back to first slide
    setCurrentStep(1);
  };

  return (
    <>
      {!showFinalScreen ? (
        <div
          className="flex flex-col items-center justify-between min-h-screen p-6"
          style={{
            backgroundImage: "url('/giveaway_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Top Navigation */}
          <div className="flex justify-between w-full">
            {/* Back button */}
            <button onClick={handleBack} className="text-3xl cursor-pointer">
              <img src="/gv_arrow.png" alt="Back" className="w-8 h-8" />
            </button>

            {/* Help button */}
            <button
              onClick={() => alert("Help button clicked")}
              className="cursor-pointer"
            >
              <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
            </button>
          </div>

          {/* Progress Bar as Slider */}
          <div className="flex justify-center items-center w-full mt-4">
            <span
              onClick={() => goToStep(1)}
              className={`w-1/3 h-1 cursor-pointer ${
                currentStep >= 1 ? "bg-green-500" : "bg-gray-300"
              } rounded-full`}
            ></span>
            <span
              onClick={() => goToStep(2)}
              className={`w-1/3 h-1 cursor-pointer ${
                currentStep >= 2 ? "bg-green-500" : "bg-gray-300"
              } rounded-full mx-2`}
            ></span>
            <span
              onClick={() => goToStep(3)}
              className={`w-1/3 h-1 cursor-pointer ${
                currentStep === 3 ? "bg-green-500" : "bg-gray-300"
              } rounded-full`}
            ></span>
          </div>

          {/* Main Content */}
          <div className="text-center my-8">
            <h1 className="text-2xl font-bold mb-4">
              {currentStep === 1 && (
                <>
                  Step 1: Lorem ipsum dolor sit amet <br />
                  consectetur. Eget neque ultrices?
                </>
              )}
              {currentStep === 2 && (
                <>
                  Step 2: Lorem ipsum dolor sit amet <br />
                  consectetur. Eget neque ultrices?
                </>
              )}
              {currentStep === 3 && (
                <>
                  Step 3: Lorem ipsum dolor sit amet <br />
                  consectetur. Eget neque ultrices?
                </>
              )}
            </h1>

            {/* Buttons */}
            <div className="flex justify-center space-x-8 mt-6">
              {currentStep === 3 ? (
                <>
                  <button
                    onClick={handleFinalScreen}
                    className="px-8 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                  >
                    LOREM IPSUM
                  </button>
                  <button
                    onClick={handleFinalScreen}
                    className="px-8 py-2 bg-white text-black font-semibold rounded-md border border-black hover:bg-gray-100 transition"
                  >
                    LOREM IPSUM
                  </button>
                </>
              ) : (
                <>
                  <button className="px-8 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
                    LOREM IPSUM
                  </button>
                  <button className="px-8 py-2 bg-white text-black font-semibold rounded-md border border-black hover:bg-gray-100 transition">
                    LOREM IPSUM
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center w-full">
            {currentStep === 1 && (
              <img
                src="/window_kuku.png"
                alt="Step 1"
                className="w-[404px] h-[430.1px]"
                style={{ marginBottom: "2rem" }}
              />
            )}
            {currentStep === 2 && (
              <img
                src="/cloth_hanger.png"
                alt="Step 2"
                className="w-[1733.46px] h-[313.77px]"
                style={{ marginBottom: "2rem" }}
              />
            )}
            {currentStep === 3 && (
              <img
                src="/playgorund.png"
                alt="Step 3"
                className="w-full"
                style={{ margin: 0, padding: 0 }}
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className="final-screen flex flex-col justify-center items-center p-6"
          style={{
            backgroundImage: "url('/final_bg.png')",
            height: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Arrow at the Top Left */}
          <div className="w-full flex justify-start">
            <img
              src="/gv_arrow.png"
              alt="Arrow"
              className="cursor-pointer w-8 h-8"
              onClick={handleFinalScreenClick}
            />
          </div>

          {/* Final Screen Texts */}
          <div className="text-center mt-8">
            <h1 className="text-green-500 text-4xl font-bold">
              Lorem ipsum dolor
            </h1>
            <p className="text-black mt-4 text-lg">
              Lorem ipsum dolor sit amet consectetur. <br />
              Eget neque ultrices?
            </p>
          </div>

          {/* Share on Social Button */}
          <button className="px-8 py-2 mt-8 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
            Share on social
          </button>

          {/* Giftbox Image */}
          <div className="flex justify-center mt-8">
            <img
              src="/giftbox.png"
              alt="Gift Box"
              className="w-[340px] h-[399.13px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Giveaway;

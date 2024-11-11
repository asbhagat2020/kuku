"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import clothHangerAnimation from "../public/lottieFiles/cloth_hanger.json";
import playgroundAnimation from "../public/lottieFiles/playground.json";
import giftboxAnimation from "../public/lottieFiles/giftbox.json";
import homeAnimation from "../public/lottieFiles/home.json";

const Giveaway = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

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
    setShowFinalScreen(true);
  };

  const handleFinalScreenClick = () => {
    setShowFinalScreen(false);
    setCurrentStep(1);
  };

  return (
    <>
      {!showFinalScreen ? (
        <div className="relative flex flex-col items-center min-h-screen w-screen overflow-hidden">
          {/* Background Layer */}
          <div className="fixed inset-0 w-screen h-screen">
            {currentStep === 1 && (
              <div className="absolute inset-0 w-full h-full">
                <Lottie
                  loop
                  play
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                  }}
                  animationData={homeAnimation}
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
            )}
            {currentStep === 2 && (
              <div className="absolute inset-0 w-full h-auto">
                <Lottie
                  loop
                  play
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                  }}
                  animationData={clothHangerAnimation}
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
            )}
            {currentStep === 3 && (
              <div className="absolute inset-0 w-full h-full">
                <Lottie
                  loop
                  play
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                  }}
                  animationData={playgroundAnimation}
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
            )}
          </div>

          {/* Content Layer */}
          <div className="relative z-10 w-full max-w-7xl px-6">
            {/* Top Navigation */}
            <div className="flex justify-between w-[86%]">
            {/* Back button */}
            <Link href="/">
              <button onClick={handleBack} className="text-3xl cursor-pointer">
                <img src="/gv_arrow.png" alt="Back" className="w-8 h-8" />
              </button>
            </Link>
            {/* Help button */}
            <button className="cursor-pointer">
              <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
            </button>
          </div>

            {/* Progress Bar */}
            <div className="w-full md:w-[88%] flex justify-center items-center mt-8 mx-auto">
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  onClick={() => goToStep(step)}
                  className={`w-1/3 h-1 cursor-pointer mx-3 ${
                    currentStep >= step ? "bg-green-500" : "bg-gray-300"
                  } rounded-full`}
                ></span>
              ))}
            </div>

            {/* Step Content */}
            <div className="text-center my-8">
              <h1 className="text-2xl font-bold mb-4">
                {`Step ${currentStep}: Lorem ipsum dolor sit amet, consectetur.`}
              </h1>

           
              <div className="flex justify-center space-x-8 md:space-x-16 mt-6">
                {currentStep === 3 ? (
                  <>
                    <button className="px-6 md:px-8 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
                      LOREM IPSUM
                    </button>
                    <button
                      onClick={handleFinalScreen}
                      className="px-6 md:px-8 py-2 bg-white text-black font-semibold rounded-md border border-black hover:bg-gray-100 transition"
                    >
                      LOREM IPSUM
                    </button>
                  </>
                ) : (
                  <>
                    <button className="px-6 md:px-8 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
                      LOREM IPSUM
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-6 md:px-8 py-2 bg-white text-black font-semibold rounded-md border border-black hover:bg-gray-100 transition"
                    >
                      LOREM IPSUM
                    </button>
                  </>
                )}
              </div>
            </div>


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
            <h1 className="text-green-500 text-4xl font-bold">
              Lorem ipsum dolor
            </h1>
            <p className="text-black mt-4 text-lg">
              Lorem ipsum dolor sit amet consectetur. Eget neque ultrices?
            </p>
          </div>
          <button className="px-8 py-2 mt-8 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition relative z-10">
            Share on social
          </button>
          <Lottie
            loop
            play
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
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

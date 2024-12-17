"use client";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AnimationSection from "@/components/home/AnimationSection";
import Brands from "@/components/home/Brands";
import Categories from "@/components/home/Categories";
import DownloadKuku from "@/components/home/DownloadKuku";
import Hero from "@/components/home/Hero";
import MarketPlace from "@/components/home/MarketPlace";
import Popup from "@/components/home/Popup";
import Selling from "@/components/home/Selling";
import StriteSection from "@/components/home/StriteSection";
import homeAnimation from "../public/lottieFiles/homes.json";
import { useDispatch, useSelector } from "react-redux";
import { getProducts,resetNotificationFlag } from "@/store/product/productSlice";

const Page = () => {
  // State to handle loading and screen size
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const dispatch=useDispatch();
//   useEffect(() => {
//     dispatch(getProducts());
// }, [dispatch]);

  // Handle screen resize and initial mobile check
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Loading animation component
  const LoadingAnimation = () => {
    if (isMobileView) {
      return (
        <div className="absolute inset-0 w-full h-full">
          <Lottie
            loop
            play
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
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
      );
    } else {
      return (
        <div className="flex justify-center items-center w-full lg:h-[50vh]">
              <Lottie
                loop
                play
                animationData={homeAnimation}
                className="w-full"
              />
            </div>
      );
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Header />
          <Hero />
          <Popup />
          <MarketPlace />
          <Selling />
          <Categories />
          <StriteSection />
          <AnimationSection />
          <Brands />
          <DownloadKuku/>
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
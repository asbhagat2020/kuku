"use client";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useDispatch } from "react-redux";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'));
const Header = dynamic(() => import('@/components/Header'));
const AnimationSection = dynamic(() => import('@/components/home/AnimationSection'));
const Brands = dynamic(() => import('@/components/home/Brands'));
const Categories = dynamic(() => import('@/components/home/Categories'));
const DownloadKuku = dynamic(() => import('@/components/home/DownloadKuku'));
const Hero = dynamic(() => import('@/components/home/Hero'));
const MarketPlace = dynamic(() => import('@/components/home/MarketPlace'));
const Popup = dynamic(() => import('@/components/home/Popup'));
const Selling = dynamic(() => import('@/components/home/Selling'));
const StriteSection = dynamic(() => import('@/components/home/StriteSection'));

import homeAnimation from "../public/lottieFiles/kukuhomenew.json";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Client-side check for first visit
    const hasVisitedBefore = typeof window !== 'undefined' 
      ? sessionStorage.getItem("hasVisitedBefore") 
      : null;
    setIsLoading(!hasVisitedBefore);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem("hasVisitedBefore", "true");
        }
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const LoadingAnimation = () => {
    if (isMobileView) {
      return (
        <div className="absolute inset-0 w-full h-full">
          <Lottie
            loop={true}
            // play={true}
            play="true" 
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
            loop={true}
            // play={true}
            play="true" 
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
          <DownloadKuku />
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;

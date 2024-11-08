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
import homeAnimation from "../public/lottieFiles/home.json";

const Page = () => {
  // State to handle loading
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading delay (optional)
  useEffect(() => {
    // Mimic an API call or data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <>
      {isLoading ? (
      //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '50vh' }}>
      //   <Lottie
      //     loop
      //     animationData={homeAnimation}
      //     // style={{ width: 300, height: 300 }}
      //   />
      // </div>
      <div className="absolute inset-0 w-full h-full">
      <Lottie
        loop
        play
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice"
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

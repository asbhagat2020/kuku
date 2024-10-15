"use client";

import { useRef, useState, useEffect } from "react";
// import { FaRegHandshake } from "react-icons/fa";
import { FaHandshake } from 'react-icons/fa';
import { IoHeartOutline } from "react-icons/io5";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecommendationCard = ({ imageList, price }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Disable arrows to keep the design clean
    customPaging: (i) => (
      <div
        style={{
          width: i === 0 ? "50px" : "26px", // Adjust width for the first dot and smaller width for others
          height: "5px",
          borderRadius: "20px",
          background: i === 0 ? "white" : "#eee", // First dot white, others light gray
          marginRight: i === 0 ? "10px" : "0", // Add spacing after the first dot
          cursor: "pointer",
        }}
      />
    ),
    appendDots: (dots) => (
      <div
        style={{
          padding: "15px",
          display: "flex",
          justifyContent: "center",
          position: "absolute", // Make the dots absolute
          bottom: "60px", // Position above the button
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20, // Ensure it's above other elements
        }}
      >
        <ul style={{ display: "flex", gap: "25px" }}> {/* Adjust gap here */}
          {dots}
        </ul>
      </div>
    ),
  };

  return (
    <div className="p-2 w-64 shrink-0 relative">
      {/* Image Slider */}
      <Slider {...sliderSettings} className="relative">
        {imageList.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="h-80 w-full object-cover rounded-lg" // Set a consistent height here
            />
          </div>
        ))}
      </Slider>

      <div className="absolute top-4 right-4 flex items-center justify-center">
        <div className="bg-transparent border border-white rounded-full p-2 opacity-70">
          <IoHeartOutline className="text-white w-5 h-5" />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center mb-8">
        <Link href="/product" passHref>
          <button className="bg-[#FDE504] w-[150px] h-[48px] rounded-[1rem] font-semibold hover:opacity-80 transition-opacity mr-1">
            Buy Now
          </button>
        </Link>

        <div className="flex items-center bg-white rounded-full p-2 shadow-md">
        <FaHandshake className="mr-2 w-5 h-5" style={{ fill: "none", stroke: "#000000", strokeWidth: "25" }} />
        </div>
      </div>

      <p className="text-lg mt-1 font-semibold text-center">AED {price}</p>
    </div>
  );
};

const Recommendations = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update progress based on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const progress = (scrollLeft / scrollWidth) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center mb-20">
      <div className="flex justify-between items-center mb-10 w-full max-w-screen-xl">
        <h2
          className="ml-6 leading-tight tracking-wide font-luckiest"
          style={{ fontSize: "45px" }}
        >
          YOU MAY ALSO LIKE
        </h2>

        <Link href="/selling-page">
          <button className="border-2 border-[#E4086F] text-[#E4086F] bg-white opacity-100 hover:opacity-80 transition-opacity w-[150px] h-[60px] rounded-[1rem] font-bold">
            View All
          </button>
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-screen-xl">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-scroll scrollbar-hide"
          style={{ scrollBehavior: "smooth", paddingBottom: "60px" }}
        >
          <RecommendationCard
            imageList={["/product1.png", "/product2.png", "/product3.png"]}
            price="120.00"
          />
          <RecommendationCard
            imageList={["/product2.png", "/product3.png", "/product1.png"]}
            price="120.00"
          />
          <RecommendationCard
            imageList={["/product3.png", "/product1.png", "/product2.png"]}
            price="120.00"
          />
          <RecommendationCard
            imageList={["/product4.png", "/product5.png", "/product6.png"]}
            price="120.00"
          />
          <RecommendationCard
            imageList={["/product1.png", "/product2.png", "/product3.png"]}
            price="120.00"
          />
          <RecommendationCard
            imageList={["/product2.png", "/product3.png", "/product1.png"]}
            price="120.00"
          />
          <RecommendationCard
            imageList={["/product3.png", "/product1.png", "/product2.png"]}
            price="120.00"
          />
          <RecommendationCard
            imageList={["/product1.png", "/product2.png", "/product3.png"]}
            price="120.00"
          />
          <RecommendationCard
            imageList={["/product2.png", "/product3.png", "/product1.png"]}
            price="120.00"
          />
          <RecommendationCard
            imageList={["/product3.png", "/product1.png", "/product2.png"]}
            price="120.00"
          />
          {/* Add more cards as needed */}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
          <div
            className="h-full bg-[#E4086F] transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Hide default scrollbar */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default Recommendations;

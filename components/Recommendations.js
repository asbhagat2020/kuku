"use client"; 

import { useRef, useState, useEffect } from 'react';
import { FaRegHandshake } from 'react-icons/fa';
import { IoHeartOutline } from 'react-icons/io5';

const RecommendationCard = ({ image, price }) => (
  <div className="p-2 w-64 shrink-0 relative">
    <img
      src={image}
      alt="Product"
      className="h-72 w-full object-cover rounded-lg"
    />
    <div className="absolute top-4 right-4 flex items-center justify-center">
      <div className="bg-transparent border border-white rounded-full p-2 opacity-70">
        <IoHeartOutline className="text-white w-5 h-5" />
      </div>
    </div>
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center mb-8">
      <button
        className="bg-[#FDE504] w-[150px] h-[48px] rounded-[1rem] font-medium hover:opacity-80 transition-opacity mr-1"
      >
        Buy Now
      </button>
      <div className="flex items-center bg-white rounded-full p-2 shadow-md">
        <FaRegHandshake className="text-black w-5 h-5" />
      </div>
    </div>
    <p className="text-lg mt-1 font-semibold text-center">AED {price}</p>
  </div>
);

const Recommendations = () => {
  const scrollRef = useRef(null);
  const progressBarRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update progress based on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const progress = (scrollLeft / scrollWidth) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex justify-between items-center mb-4 w-full max-w-screen-xl">
        <h2 className="text-3xl font-bold ml-6 leading-tight tracking-wide font-['Luckiest Guy']">
          You May Also Like
        </h2>
        <button
          className="border-2 border-[#E4086F] text-[#E4086F] bg-white opacity-100 hover:opacity-80 transition-opacity w-[150px] h-[60px] rounded-[1rem] font-bold"
        >
          View All
        </button>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-screen-xl">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-scroll scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }} 
        >
          <RecommendationCard image="/product1.png" price="120.00" />
          <RecommendationCard image="/product2.png" price="120.00" />
          <RecommendationCard image="/product3.png" price="120.00" />
          <RecommendationCard image="/product4.png" price="120.00" />
          <RecommendationCard image="/product1.png" price="120.00" />
          <RecommendationCard image="/product1.png" price="120.00" />
          <RecommendationCard image="/product2.png" price="120.00" />
          <RecommendationCard image="/product3.png" price="120.00" />
          <RecommendationCard image="/product1.png" price="120.00" />
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

"use client";

import { useState } from "react";

export const CardComponent = ({ card }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const totalSlides = card.productImgs.length;
  
    const handleNextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };
  
    const handlePrevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };
  
    useEffect(() => {
      const autoSlide = setInterval(() => {
        handleNextSlide();
      }, 3000); // Auto-slide every 3 seconds
  
      return () => clearInterval(autoSlide); // Clear interval on component unmount
    }, []);
  
    return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center space-x-4">
          <div className="flex space-x-4 items-center">
            <div className="flex items-center justify-center rounded-full bg-purple-600 w-10 h-10">
              <img
                src={card.img}
                alt="User avatar"
                className="object-contain h-9 w-7"
              />
            </div>
            <p className="font-bold text-sm">{card.user}</p>
          </div>
          <div className="flex items-center">
            <button className="mt-2 px-6 sm:px-6 py-1 bg-custom-green text-white rounded-full">
              Follow
            </button>
          </div>
        </div>
  
        <div className={`h-80 w-full sm:h-96 relative rounded-2xl shadow-md mt-4`}>
          {/* Slider with background images */}
          <div
            className={`h-full w-full ${card.productImgs[currentSlide]} bg-cover bg-center bg-white rounded-2xl`}
          ></div>
  
          {/* Slider Controls */}
          <button
            onClick={handlePrevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          >
            ◀
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          >
            ▶
          </button>
  
          {/* Heart icon */}
          <div className="absolute top-4 right-4 w-14 h-14 flex items-center justify-center rounded-full bg-custom-gray">
            <img
              src={card.heard_img}
              alt="heard avatar"
              className="w-5 h-4"
            />
          </div>
        </div>
  
        <h5 className="text-sm font-medium text-gray-700 mt-4">
          {card.title}
        </h5>
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
          {card.price}
        </h2>
      </div>
    );
  };
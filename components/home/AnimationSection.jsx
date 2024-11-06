import Image from 'next/image';
import React, { useState } from 'react';
import Slider from 'react-slick'; // Importing Slider from react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Reusable Animation Card Component
const AnimationCard = ({ step, heading, imageSrc }) => {
  return (
    <div className="rounded-[20px] mx-5 lg:mx-[70px] lg:h-[640px] bg-[#FDE504] py-[40px] sm:py-[60px] flex flex-col items-center shadow-lg transition-transform duration-500">
      <div className="flex flex-col sm:flex-row mx-5 sm:mx-[50px] lg:mx-[180px] gap-[30px] sm:gap-[130px] items-center">
        <div className="flex flex-col space-y-5 sm:space-y-[50px] justify-center text-center sm:text-left">
          <p className="text-[#202020] text-sm sm:text-base font-bold font-karla leading-tight">
            {step}
          </p>
          <h1 className="text-[#e4086f] text-[26px] sm:text-[32px] lg:text-[46px] font-normal font-luckiest leading-tight sm:leading-[42px] lg:leading-[55.20px]">
            {heading}
          </h1>
        </div>
        <div className="mt-5 sm:mt-0">
          <Image
            width={250}
            height={250}
            className="sm:w-[305px] sm:h-[305px] lg:w-[405px] lg:h-[405px]"
            src={imageSrc}
            alt=""
          />
        </div>
      </div>
      <div className="mt-5 sm:mt-[38px] mx-2 sm:mx-7">
        <Image
          unoptimized
          width={300}
          height={30}
          className="sm:w-[600px] sm:h-[70px] lg:w-[1200px] lg:h-[90px]"
          src="/animation_slide_image1.png"
          alt=""
        />
      </div>
    </div>
  );
};

// Main Component
const AnimationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active index

  // Slider settings
  const settings = {
    dots: true, // Enable dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Ensure autoplay is true
    autoplaySpeed: 2000, // Speed at which slides will change
    pauseOnHover: true, // Option to pause on hover
    pauseOnFocus: true, // Option to pause on focus
    beforeChange: (current, next) => setActiveIndex(next), // Update active index before slide change
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "0px" }}> {/* Adjust margin as needed */}
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="dot" style={{
        background: activeIndex === i ? '#e4086f' : 'rgba(228, 8, 111, 0.5)', // Faded color for inactive dots
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginTop: '15px', // Space between dots
      }} />
    ),
  };
  

  return (
    <div className="max-w-[1550px] mx-auto mb-[93px] relative h-[800px]"> {/* Increased height */}
      {/* Decorative Image */}
      <div className="absolute top-[-50px] right-[20px] sm:top-[-80px] sm:right-[80px] z-50">
        <Image src="list_top_image.svg" width={111} height={121} alt="" />
      </div>

      {/* Slider for Animation Cards */}
      <Slider {...settings}>
        <AnimationCard
          step="Step-1"
          heading="List what you no longer need"
          imageSrc="/mobile.png"
        />
        <AnimationCard
          step="Step-2"
          heading="Find a buyer easily"
          imageSrc="/mobile.png"
        />
        <AnimationCard
          step="Step-3"
          heading="Get paid quickly"
          imageSrc="/mobile.png"
        />
      </Slider>
    </div>
  );
};

export default AnimationSection;

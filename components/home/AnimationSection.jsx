import React, { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Custom arrow components - now positioned inside the card
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 lg:right-20 sm:right-10 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
    aria-label="Next slide"
  >
    <ChevronRight className="w-6 h-6 text-gray-600" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 lg:left-20 sm:left-10 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
    aria-label="Previous slide"
  >
    <ChevronLeft className="w-6 h-6 text-gray-600" />
  </button>
);

// AnimationCard component with relative positioning to contain arrows
const AnimationCard = ({ step, heading, imageSrc }) => (
  <div className="relative rounded-[20px] mx-5 lg:mx-[70px] lg:h-[640px] bg-[#FDE504] py-[40px] sm:py-[60px] flex flex-col items-center shadow-lg transition-transform duration-500">
    <div className="flex flex-col sm:flex-row mx-5 sm:mx-[50px] lg:mx-[180px] gap-[30px] sm:gap-[130px] items-center">
      <div className="flex flex-col space-y-5 sm:space-y-[50px] justify-center xl:w-[60%] text-center sm:text-left">
        <p className="text-[#202020] text-sm sm:text-base font-bold font-karla leading-tight">
          {step}
        </p>
        <h1 className="text-[#e4086f] text-[26px] sm:text-[32px] lg:text-[46px] font-normal font-luckiest leading-tight sm:leading-[42px] lg:leading-[55.20px]">
          {heading}
        </h1>
      </div>
      <div className="mt-5 sm:mt-0">
        <Image
          unoptimized
          width={250}
          height={250}
          className="sm:w-[305px] sm:h-[305px] lg:w-[405px] lg:h-[405px] object-contain"
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

const AnimationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setActiveIndex(next),
    appendDots: (dots) => (
      <div className="bottom-4">
        <ul className="m-0">
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className="dot transition-colors duration-300"
        style={{
          background: activeIndex === i ? '#e4086f' : 'rgba(228, 8, 111, 0.5)',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          marginTop: '15px',
        }}
      />
    ),
  };

  return (
    <div className="max-w-[1550px] mx-auto mb-[53px] relative lg:h-[700px]">
      <div className="absolute top-[-50px] right-[20px] sm:top-[-80px] sm:right-[80px] z-30">
        <Image src="list_top_image.svg" width={111} height={121} alt="" />
      </div>

      <div className="relative">
        <Slider {...settings}>
          <AnimationCard
            step="Step-1"
            heading="List clothes you no longer need"
            imageSrc="/mobile.png"
          />
          <AnimationCard
            step="Step-2"
            heading=" Buyer purchases your item"
            imageSrc="/mobile.png"
          />
          <AnimationCard
            step="Step-3"
            heading="KuKu picks up your item from your doorstep"
            imageSrc="/mobile.png"
          />
          <AnimationCard
            step="Step-4"
            heading="Leave the rest on KuKu and wait for the money in your account."
            imageSrc="/mobile.png"
          />
        </Slider>
      </div>
    </div>
  );
};

export default AnimationSection;
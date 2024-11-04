"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { OfferPopup } from "@/components/OfferPopup";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";

const Carousels = () => {
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [likedCards, setLikedCards] = useState({});

  
  const handleOpenOfferPopup = () => {
    setIsOfferPopupOpen(true);
  };

  const handleCloseOfferPopup = () => {
    setIsOfferPopupOpen(false);
  };

  const handleOfferSubmit = (price) => {
    console.log("Offer submitted:", price);
    // Add your submission logic here
    setOfferSubmitted(true);
    handleCloseOfferPopup();
  };
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);

  const product = [
    {
      id:1,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_1.png", "/dress_3.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:2,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_2.png", "/dress_1.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:3,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_3.png", "/dress_3.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:4,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_1.png", "/dress_1.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:5,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_2.png", "/dress_3.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:6,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_3.png", "/dress_1.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:7,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_1.png", "/dress_2.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:8,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_2.png", "/dress_3.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:9,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_1.png", "/dress_3.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:10,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_3.png", "/dress_2.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:11,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_2.png", "/dress_1.png", "/dress_2.png"],
      link: "/product",
    },
    {
      id:12,
      title: "Dress",
      price: "12 AED",
      image: ["/dress_1.png", "/dress_2.png", "/dress_2.png"],
      link: "/product",
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    swipe: true, // Keep swipe enabled for outer slider
    draggable: true, // Allow dragging without holding the mouse button
    touchThreshold: 50, // Adjust this if needed for smoother swipe
    cssEase: "ease-in-out",
    useCSS: true,
    useTransform: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (current) => {
      const newProgress = (current / (product.length - 4)) * 100;
      setProgress(newProgress);
    },
  };

  const innerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipe: true, // Disable swipe/scrolling
    draggable: true,

    customPaging: (i) => (
      <div
        className={`custom-dot`}
        style={{
          height: "5px",
          borderRadius: "20px",
          background: "rgba(235, 235, 228, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          marginTop: "-100px",
        }}
      />
    ),
    appendDots: (dots) => (
      <div
        style={{
          padding: "15px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ display: "flex", gap: "5px" }}> {dots} </ul>
      </div>
    ),
  };

  const handleLikeClick = (cardId) => {
    setLikedCards((prevLikedCards) => ({
      ...prevLikedCards,
      [cardId]: !prevLikedCards[cardId],
    }));
  };

  return (
    <div className="lg:pl-[50px] pl-5 outline-none">
      <Slider ref={sliderRef} {...settings}>
        {product.map((item, index) => (
          <div key={index}>
            <div className="w-[307px] h-[404px] rounded-[20px] relative mx-2 outline-none">
              <div className="absolute top-2 right-2 z-10">
                {/* <Link href={item.link}> */}
                <div
                    className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer"
                    onClick={() => handleLikeClick(item.id)}
                  >
                    {likedCards[item.id] ? (
                      <FcLike className="text-2xl w-8 h-8" /> // Filled heart icon if liked
                    ) : (
                      <GoHeart className="text-2xl text-gray-300" /> // Outline heart icon if not liked
                    )}
                  </div>
                {/* </Link> */}
              </div>
              <Link href={item.link}>
                <div className="absolute min-w-[204px] bottom-4 left-4 text-center z-10 bg-[#fde504] px-[50px] py-[20px] rounded-[20px]">
                  <button className="text-[#202020] text-base font-bold font-karla leading-tight">
                    Buy Now
                  </button>
                </div>
              </Link>
              <div className="absolute bottom-6 right-5 z-10">
                <div className="h-[54px] p-[15px] bg-white rounded-[100px] cursor-pointer">
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    src="hand_shake.svg"
                    onClick={() => handleOpenOfferPopup()}
                  />
                </div>
              </div>

              <Slider {...innerSliderSettings}>
                {item.image.map((imgSrc, imgIndex) => (
                  <div key={imgIndex}>
                    <Image
                      src={imgSrc}
                      width={307}
                      height={404}
                      layout="responsive"
                      alt={item.title}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="mt-2">
              <h3 className="font-karla font-bold text-base">{item.title}</h3>
              <p className="text-black text-[25px] font-bold font-karla leading-[30px]">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      <motion.div
        className="progress-bar"
        style={{
          height: "4px",
          backgroundColor: "#e0e0e0",
          marginTop: "20px",
          marginLeft: "6px",
          marginRight: "46px",
          marginTop: "80px",
        }}
      >
        <motion.div
          className="progress"
          style={{
            height: "100%",
            backgroundColor: "#E4086F",
            borderRadius: "20px",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <OfferPopup
        isOpen={isOfferPopupOpen}
        onClose={handleCloseOfferPopup}
        onSubmit={handleOfferSubmit}
      />
    </div>
  );
};

export default Carousels;

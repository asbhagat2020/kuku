"use client";

import Link from "next/link";
import { useState } from "react";
import { Pagination } from "./Pagination"; // Import the Pagination component
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { OfferPopup } from "./OfferPopup";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
const cardData = [
  {
    id: 1,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image1.png", "/bg-custom-image2.png", "/bg-custom-image3.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 2,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image2.png", "/bg-custom-image3.png", "/bg-custom-image1.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 3,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image3.png", "/bg-custom-image1.png", "/bg-custom-image2.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 4,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image4.png", "/bg-custom-image5.png", "/bg-custom-image6.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 5,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image5.png", "/bg-custom-image6.png", "/bg-custom-image4.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 6,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image6.png", "/bg-custom-image4.png", "/bg-custom-image5.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 7,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image1.png", "/bg-custom-image2.png", "/bg-custom-image3.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 8,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image2.png", "/bg-custom-image3.png", "/bg-custom-image1.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 9,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image3.png", "/bg-custom-image1.png", "/bg-custom-image2.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 10,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image1.png", "/bg-custom-image2.png", "/bg-custom-image3.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 11,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image2.png", "/bg-custom-image3.png", "/bg-custom-image1.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 12,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image3.png", "/bg-custom-image1.png", "/bg-custom-image2.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 13,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image4.png", "/bg-custom-image5.png", "/bg-custom-image6.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 14,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image5.png", "/bg-custom-image6.png", "/bg-custom-image4.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 15,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image6.png", "/bg-custom-image4.png", "/bg-custom-image5.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 16,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image1.png", "/bg-custom-image2.png", "/bg-custom-image3.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 17,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image2.png", "/bg-custom-image3.png", "/bg-custom-image1.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 18,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/bg-custom-image3.png", "/bg-custom-image1.png", "/bg-custom-image2.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
];


export const ImagesComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [likedCards, setLikedCards] = useState({});

  const cardsPerPage = 9;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };
  const totalPages = Math.ceil(cardData.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

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

  const handleLikeClick = (cardId) => {
    setLikedCards((prevLikedCards) => ({
      ...prevLikedCards,
      [cardId]: !prevLikedCards[cardId],
    }));
  };

  const innerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
          marginTop: "-80px",
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

  return (
    <div className="p-6 ml-8 h-auto w-auto font-karla">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentCards.map((card) => (
          <div key={card.id} className="flex flex-col">
            <div className="flex justify-between items-center space-x-4">
              <div className="flex space-x-4 items-center">
                <img
                  src={card.img}
                  alt="User avatar"
                  className="object-contain h-12 w-12"
                />
                <p className="font-bold text-sm">{card.user}</p>
              </div>
              <button className="mt-2 px-4 sm:px-6 py-1 bg-custom-green text-white rounded-full">
                Follow
              </button>
            </div>
  
            <div className="relative mt-4">
              {/* Heart icon for like functionality */}
              <div
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10"
                onClick={() => handleLikeClick(card.id)}
              >
                {likedCards[card.id] ? (
                  <FcLike className="text-2xl w-8 h-8" /> // Filled heart icon if liked
                ) : (
                  <GoHeart className="text-2xl text-gray-300" /> // Outline heart icon if not liked
                )}
              </div>
  
              {/* Slider for product images */}
              <Slider {...innerSliderSettings}>
              {card.productImg.map((imgSrc, imgIndex) => (
                  <div key={imgIndex}>
                    <Image
                      src={imgSrc}
                      width={307}
                      height={404}
                      layout="responsive"
                      alt={""}
                    />
                  </div>
                ))}
              </Slider>
  
              {/* Buy Now button and handshake icon - fixed position */}
              <div className="absolute w-full bottom-4 flex justify-evenly items-center px-4">
                <Link href="/product" className="w-[70%]">
                  <button className="w-full p-2 sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1">
                    Buy Now
                  </button>
                </Link>
                
                <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full">
                  <Image
                    unoptimized
                    width={30}
                    height={30}
                    src="handshake_img.png"
                    alt="Open Offer Popup"
                    className="cursor-pointer"
                    onClick={() => handleOpenOfferPopup(card)}
                  />
                </div>
              </div>
            </div>
  
            <OfferPopup
              isOpen={isOfferPopupOpen}
              onClose={handleCloseOfferPopup}
              onSubmit={handleOfferSubmit}
            />
  
            <h5 className="text-sm font-medium text-gray-700 mt-4">
              {card.title}
            </h5>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
              {card.price}
            </h2>
          </div>
        ))}
      </div>
  
      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
  
};

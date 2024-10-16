"use client";

import Link from "next/link";
import { useState } from "react";
import { Pagination } from "./Pagination"; // Import the Pagination component
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const cardData = [
  {
    id: 1,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image1", "bg-custom-image2", "bg-custom-image3"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 2,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image2", "bg-custom-image3", "bg-custom-image1"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 3,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image3", "bg-custom-image1", "bg-custom-image2"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 4,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image4", "bg-custom-image5", "bg-custom-image6"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 5,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image5", "bg-custom-image6", "bg-custom-image4"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 6,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image6", "bg-custom-image4", "bg-custom-image5"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 7,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image1", "bg-custom-image2", "bg-custom-image3"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 8,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image2", "bg-custom-image3", "bg-custom-image1"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 9,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image3", "bg-custom-image1", "bg-custom-image2"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 10,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image1", "bg-custom-image2", "bg-custom-image3"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 11,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image2", "bg-custom-image3", "bg-custom-image1"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 12,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image3", "bg-custom-image1", "bg-custom-image2"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 13,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image4", "bg-custom-image5", "bg-custom-image6"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 14,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image5", "bg-custom-image6", "bg-custom-image4"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 15,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image6", "bg-custom-image4", "bg-custom-image5"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 16,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image1", "bg-custom-image2", "bg-custom-image3"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 17,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image2", "bg-custom-image3", "bg-custom-image1"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 18,
    user: "Kuku1222",
    img: "/kuki_img.png",
    productImg: ["bg-custom-image3", "bg-custom-image1", "bg-custom-image2"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
];

export const ImagesComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

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
          background: "#eee",
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
                <div className="flex items-center justify-center rounded-full bg-purple-600 w-10 h-10">
                  <img
                    src={card.img}
                    alt="User avatar"
                    className="object-contain h-9 w-7"
                  />
                </div>
                <p className="font-bold text-sm">{card.user}</p>
              </div>
              <button className="mt-2 px-4 sm:px-6 py-1 bg-custom-green text-white rounded-full">
                Follow
              </button>
            </div>

            {/* Slider for product images */}
            <Slider {...innerSliderSettings}>
              {card.productImg.map((imgClass, index) => (
                <div
                  key={index}
                  className={`h-64 sm:h-80 w-full ${imgClass} bg-cover bg-center rounded-2xl shadow-md p-6 mt-4 relative`}
                >
                  <Link href="/wishlist">
                  <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray">
                    <img
                      src={card.heard_img}
                      alt="Heart icon"
                      className="w-5 h-4"
                    />
                  </div>
                  </Link>
                  <div className="w-full mr-6 absolute bottom-4 flex justify-evenly">
                    <Link href="/product" className="w-[70%]">
                      {" "}
                      {/* Ensure Link takes the full width */}
                      <button className="w-full p-2 sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1">
                        Buy Now
                      </button>
                    </Link>

                    <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full ml-2 mr-10">
                      {/* Handshake icon */}
                      
                        <Image
                          unoptimized
                          width={30}
                          height={30}
                          src="handshake_img.png"
                          alt="Handshake icon"
                        />
                   
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

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

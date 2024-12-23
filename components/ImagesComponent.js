"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Pagination } from "./Pagination"; // Import the Pagination component
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { OfferPopup } from "./OfferPopup";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/store/wishlist/wishlistSlice";
import axios from 'axios';

const cardData = [
  {
    id: 1,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 2,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 3,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image3.png", "/card_image1.png", "/card_image2.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 4,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image4.png", "/card_image5.png", "/card_image6.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 5,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image5.png", "/card_image6.png", "/card_image4.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 6,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image6.png", "/card_image4.png", "/card_image5.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 7,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 8,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 9,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image3.png", "/card_image1.png", "/card_image2.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 10,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 11,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 12,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image3.png", "/card_image1.png", "/card_image2.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 13,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image4.png", "/card_image5.png", "/card_image6.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 14,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image5.png", "/card_image6.png", "/card_image4.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 15,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image6.png", "/card_image4.png", "/card_image5.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 16,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 17,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
    heard_img: "/heard_img.png",
    title: "Dress",
    price: "AED 120.00",
  },
  {
    id: 18,
    user: "Kuku1222",
    img: "/profile_icon.svg",
    productImg: ["/card_image3.png", "/card_image1.png", "/card_image2.png"],
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
  const [data, setData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const cardsPerPage = 9;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const handleClick = () => {
    setIsLiked(!isLiked);
  };
  const totalPages = Math.ceil(data.length / cardsPerPage);

  useEffect(()=>{
    fetchProducts();
  },[])

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

  // const handleLikeClick = (cardId) => {
  //   setLikedCards((prevLikedCards) => ({
  //     ...prevLikedCards,
  //     [cardId]: !prevLikedCards[cardId],
  //   }));
  // };

  const handleLikeClick = (cardId) => {
    dispatch(toggleWishlist(cardId));
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

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
      );
      const datavalue = response.data.products;
     
      setData(datavalue || []);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFollow = async () => {

    try {
      const endpoint = isFollowing ? "/unfollow" : "/follow";
      const response = await axios.post(`http://localhost:3000${endpoint}`, {
        userId,
        targetId,
      });

      console.log(response.data.message);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred.");
    }
  }

  return (
    <div className="p-6 ml-8 h-auto w-auto font-karla z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((card) => (
          <div key={card._id} className="flex flex-col">
            <div className="flex justify-between items-center space-x-4">
              <div className="flex space-x-4 items-center">
                <img
                  src="/profile_icon.svg"
                  alt="User avatar"
                  className="object-contain h-12 w-12"
                />
                <p className="font-bold text-sm">{card.seller.username}</p>
              </div>
              <button
      className={`mt-2 px-4 sm:px-6 py-1 ${
        isFollowing ? "bg-gray-500" : "bg-custom-green"
      } text-white rounded-full`}
      onClick={handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
            </div>

            <div className="relative mt-4">
              {/* Heart icon for like functionality */}
              <div
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10"
                onClick={() => handleLikeClick(card._id)}
              >
                {wishlist.includes(card._id)  ? (
                  <FcLike className="text-2xl text-red-500" /> // Filled heart for wishlist items
                ) : (
                  <GoHeart className="text-2xl text-gray-300" /> // Outline heart for non-wishlist items
                )}
              </div>

              {/* Slider for product images */}
              <Slider {...innerSliderSettings}>
                {card.images.map((imgSrc, imgIndex) => (
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
                <Link href={`/selling-page/${card._id}`} className="w-[70%]">
                  <button className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1">
                    Buy Now
                  </button>
                </Link>

                <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full">
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
              {card.name}
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

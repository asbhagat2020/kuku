"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { OfferPopup } from "@/components/OfferPopup";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/store/wishlist/wishlistSlice";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { showSuccessNotification } from "@/utils/Notification/notif";

const Carousels = () => {
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const sliderRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [likedCards, setLikedCards] = useState({});
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const details = useSelector((state) => state.auth.user);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userID = details?._id;
  // const handleLikeClick = (cardId) => {
  //   dispatch(toggleWishlist(cardId));
  // };

  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
  const handleLikeClick = async (id) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/wishlist/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        router.push("/wishlist");
      } else {
        setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setErrorPopupOpen(true);
    }
  };
  const handleOpenOfferPopup = () => {
    setIsOfferPopupOpen(true);
  };

  const handleCloseOfferPopup = () => {
    setIsOfferPopupOpen(false);
  };

  const handleOfferSubmit = (price) => {
    console.log("Offer submitted:", price);
    setOfferSubmitted(true);
    handleCloseOfferPopup();
  };

  // const handleLikeClick = (cardId) => {
  //   setLikedCards((prevLikedCards) => ({
  //     ...prevLikedCards,
  //     [cardId]: !prevLikedCards[cardId],
  //   }));
  // };

  // const product = [
  //   {
  //     id: 1,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_1.png", "/dress_3.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 2,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_2.png", "/dress_1.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 3,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_3.png", "/dress_3.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 4,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_1.png", "/dress_1.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 5,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_2.png", "/dress_3.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 6,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_3.png", "/dress_1.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 7,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_1.png", "/dress_2.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 8,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_2.png", "/dress_3.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 9,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_1.png", "/dress_3.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 10,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_3.png", "/dress_2.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 11,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_2.png", "/dress_1.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  //   {
  //     id: 12,
  //     title: "Dress",
  //     price: "12 AED",
  //     image: ["/dress_1.png", "/dress_2.png", "/dress_2.png"],
  //     link: "/product",
  //   },
  // ];

  const handleFollow = async (id, type, sellerID) => {
    setLoading(true);

    try {
      const token = JSON.parse(Cookies.get("auth"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/${type}/${id}`;
      let res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let updatedFollowers = res.data.followers;
      setProduct(
        product.map((item) => {
          if (item.seller._id === sellerID) {
            return {
              ...item,
              seller: {
                ...item.seller,
                followers: updatedFollowers,
              },
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Error while following/unfollowing", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
      );
      const datavalue = response.data.products;

      setProduct(datavalue || []);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(product);
  // Main slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    swipe: !isCardHovered, // Disable swipe when card is hovered
    draggable: !isCardHovered, // Disable drag when card is hovered
    touchThreshold: 50,
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

  // Inner slider settings
  const innerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipe: true,
    draggable: true,
    customPaging: (i) => (
      <div
        className="custom-dot"
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

  console.log(product, "tttt");

  return (
    <div className="lg:pl-[50px] pl-5 outline-none">
      <Slider ref={sliderRef} {...settings}>
        {product.map((item, index) => (
          <div className="" key={index}>
            <div className="flex justify-between items-center mb-2 space-x-4 w-[307px]">
              <div className="flex space-x-4 items-center">
                <Link href={`/user_profile/${item?.seller?._id}`}>
                  <img
                    src={item?.seller?.avatar || "/profile_icon.svg"}
                    alt="User avatar"
                    className="object-contain h-12 w-12"
                  />
                </Link>
                <p className="font-bold text-sm">{item?.seller?.username}</p>
              </div>
              <button
                className={`mt-2 px-4 sm:px-6 py-1 ${
                  item?.seller.followers.includes(userID)
                    ? "bg-gray-500"
                    : "bg-custom-green"
                } text-white rounded-full`}
                onClick={() =>
                  item?.seller.followers.includes(userID)
                    ? handleFollow(
                        item.seller._id,
                        "unfollow",
                        item?.seller?._id
                      )
                    : handleFollow(item.seller._id, "follow", item?.seller?._id)
                }
                disabled={loading}
              >
                {item?.seller.followers.includes(userID)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>
            <div
              className="w-[307px] h-[404px] rounded-[20px] relative  outline-none"
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
              onTouchStart={() => setIsCardHovered(true)}
              onTouchEnd={() => setIsCardHovered(false)}
            >
              <div className="absolute top-2 right-2 z-10">
                {/* <Link href={item.link}> */}
                {/* <div className="h-[54px] p-[15px] bg-white/40 rounded-[100px]">
                    <Image alt="" width={24} height={24} src="wishlist.svg" />
                  </div> */}
                <Link href="/wishlist">
                  <div
                    className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer"
                    onClick={() => handleLikeClick(item._id)}
                  >
                    {wishlist.includes(item.id) ? (
                      <FcLike className="text-2xl w-8 h-8" /> // Filled heart icon if in wishlist
                    ) : (
                      <GoHeart className="text-2xl text-gray-300" /> // Outline heart icon otherwise
                    )}
                  </div>
                </Link>
              </div>
              {token ? (
              <Link href={`/selling-page/${item._id}`}>
                <div className="absolute min-w-[204px] bottom-4 left-4 text-center z-10 bg-[#fde504] px-[50px] py-[20px] rounded-[20px]">
                  <button className="text-[#202020] text-base font-bold font-karla leading-tight">
                    Buy Now
                  </button>
                </div>
              </Link>
               ) : (
                <div className="absolute min-w-[204px] bottom-4 left-4 text-center z-10 bg-[#fde504] px-[50px] py-[20px] rounded-[20px]">
                  <button className="text-[#202020] text-base font-bold font-karla leading-tight"
                   onClick={() => showSuccessNotification("Please Login!")}
                  >
                    Buy Now
                  </button>
                </div>
               )}
              <div className="absolute bottom-6 right-5 z-10">
                <div
                  className="h-[54px] p-[15px] bg-white rounded-[100px] cursor-pointer"
                  onClick={() => handleOpenOfferPopup()}
                >
                  <Image alt="" width={24} height={24} src="hand_shake.svg" />
                </div>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                <Slider {...innerSliderSettings}>
                  {item?.images.map((imgSrc, imgIndex) => (
                    <div key={imgIndex}>
                      <Image
                        src={imgSrc}
                        width={307}
                        height={404}
                        layout="responsive"
                        alt={item.title}
                        className="object-fill min-h-[404px] min-w-[307px] rounded-lg"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="font-karla font-bold text-base">{item.name}</h3>
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
          marginTop: "80px",
          marginLeft: "6px",
          marginRight: "46px",
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
      {errorPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <p className="text-red-600 font-semibold text-center">
              {errorMessage}
            </p>
            <button
              onClick={() => setErrorPopupOpen(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousels;

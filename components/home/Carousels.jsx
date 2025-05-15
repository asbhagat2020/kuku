

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
import { useRouter } from "next/navigation";
// import { showSuccessNotification } from "@/utils/Notification/notif";

const Carousels = () => {
  const router = useRouter();
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
  const [loginNotificationOpen, setLoginNotificationOpen] = useState(false);
  const userID = details?._id;

  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
  const [AllWishlist, setAllWishlist] = useState([]);

  const getUserWishlistdata = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setAllWishlist(res.data.wishlist.products);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    if (token) {
      getUserWishlistdata();
    }
  }, [token])

  const handleLikeClick = async (item) => {
    try {
      console.log("items..............", item);
      let id = item._id;
      const token = JSON.parse(Cookies.get("auth"));

      // Check if product is already in wishlist
      if (isProductInWishlist(id)) {
        // Remove from wishlist
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/remove/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Update local wishlist state
          setAllWishlist(prevWishlist =>
            prevWishlist.filter(item => item.productId !== id)
          );
        }
      } else {
        // Add to wishlist
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
          { productId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Refresh wishlist data
          getUserWishlistdata();
        }
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

  const handleFollow = async (id, type, sellerID) => {
    if (!token) {
      router.push("/login")

    }

    setLoading(true);
    try {
      if (token) {
        const token = JSON.parse(Cookies.get("auth"));
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/${type}/${id}`;
        console.log("Making request to:", url);
        let res = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", res.data);
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
      }

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
      const datavalue = response?.data;
      setProduct(datavalue || []);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const isProductInWishlist = (productId) => {
    return AllWishlist.some(wishlistItem => wishlistItem.productId === productId);
  };

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
    swipe: !isCardHovered,
    draggable: !isCardHovered,
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
      // Calculate progress based on visible slides
      const totalSlides = product.length;
      const visibleSlides = getVisibleSlides();
      const maxProgress = Math.max(0, totalSlides - visibleSlides);
      const newProgress = (current / maxProgress) * 100;
      setProgress(Math.min(newProgress, 100));
    },
  };

  // Function to determine number of visible slides based on screen width
  const getVisibleSlides = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1280;
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
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
          width: "20px",
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

  const handleLoginNotification = () => {

    toast.success("Please Login!")
    setTimeout(() => {
      router.push("/login");
    }, 3000)
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="lg:pl-[50px] pl-5 outline-none">
        <Slider ref={sliderRef} {...settings}>
          {product.map((item, index) => (
            <div className="outline-none px-2" key={index}>
              <div className="flex justify-between items-center mb-2 space-x-4 w-full max-w-[307px]">
                <div className="flex space-x-4 items-center">
                  <Link href={`/user_profile/${item?.seller?._id}`}>
                    <img
                      src={item?.seller?.avatar || "/profile_icon.svg"}
                      alt="User avatar"
                      className="object-contain h-12 w-12 rounded-full"
                    />
                  </Link>
                  <p className="font-bold text-sm">{item?.seller?.username}</p>
                </div>
                <button
                  className={`mt-2 px-4 sm:px-6 py-1 ${item?.seller?.followers?.includes(userID)
                    ? "bg-gray-500"
                    : "bg-custom-green"
                    } text-white rounded-full`}
                  onClick={() =>
                    item?.seller?.followers?.includes(userID)
                      ? handleFollow(
                        item.seller._id,
                        "unfollow",
                        item?.seller?._id
                      )
                      : handleFollow(
                        item.seller._id,
                        "follow",
                        item?.seller?._id
                      )
                  }
                  disabled={loading}
                >
                  {item?.seller?.followers?.includes(userID)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              </div>
              <div
                className="max-w-[307px] h-[404px] rounded-[20px] relative outline-none overflow-hidden"
                style={{ backgroundColor: "#cfcec9" }}
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                onTouchStart={() => setIsCardHovered(true)}
                onTouchEnd={() => setIsCardHovered(false)}
              >
                <div className="absolute top-2 right-2 z-10">
                  {token ? (

                    <div
                      className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer"
                      onClick={() => handleLikeClick(item)}
                    >
                      {isProductInWishlist(item._id) ? (
                        <FcLike className="text-2xl w-8 h-8" />
                      ) : (
                        <GoHeart className="text-2xl text-gray-300" />
                      )}
                    </div>

                  ) : (
                    <div
                      className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer"
                      onClick={handleLoginNotification}
                    >
                      <GoHeart className="text-2xl text-gray-300" />
                    </div>
                  )}
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
                    <button
                      className="text-[#202020] text-base font-bold font-karla leading-tight"
                      // onClick={() => toast.success("Please Login!")}
                      onClick={handleLoginNotification}
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
                    <Image
                      alt=""
                      width={24}
                      height={24}
                      src="/hand_shake.svg"
                    />
                  </div>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="h-full w-full"
                >
                  <Slider {...innerSliderSettings} className="h-full">
                    {item?.images?.map((imgSrc, imgIndex) => (
                      <div key={imgIndex} className="h-full w-full">
                        <div className="relative h-[404px] w-full">
                          <Image
                            src={imgSrc}
                            alt={`Image ${imgIndex + 1} of ${item?.name || "carousel item"
                              }`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-[20px]"
                            priority
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="mt-2 max-w-[307px]">
                <h3 className="font-karla font-bold text-base">{item.name}</h3>
                <p className="text-black text-[25px] font-bold font-karla leading-[30px]">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </Slider>
        <div className="w-full px-5 lg:px-[50px] mt-20">
          <motion.div
            className="progress-bar w-full"
            style={{
              height: "4px",
              backgroundColor: "#e0e0e0",
            }}
          >
            <motion.div
              className="progress"
              style={{
                height: "100%",
                backgroundColor: "#E4086F",
                borderRadius: "20px",
                width: `${progress}%`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </div>
      </div>
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

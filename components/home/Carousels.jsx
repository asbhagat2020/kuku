// "use client";
// import Image from "next/image";
// import React, { useState, useRef, useEffect } from "react";
// import Slider from "react-slick";
// import { motion } from "framer-motion";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Link from "next/link";
// import { OfferPopup } from "@/components/OfferPopup";
// import { FcLike } from "react-icons/fc";
// import { GoHeart } from "react-icons/go";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleWishlist } from "@/store/wishlist/wishlistSlice";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// const Carousels = () => {
//   const router = useRouter();
//   const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
//   const [offerSubmitted, setOfferSubmitted] = useState(false);
//   const [isCardHovered, setIsCardHovered] = useState(false);
//   const sliderRef = useRef(null);
//   const [progress, setProgress] = useState(0);
//   const [product, setProduct] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const details = useSelector((state) => state.auth.user);
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const userID = details?._id;

//   const [userFollowingIds, setUserFollowingIds] = useState([]);

//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//   const [AllWishlist, setAllWishlist] = useState([]);

//   const getUserFollowingList = async () => {
//     try {
//       if (!token) return;
      
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/following-ids`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setUserFollowingIds(res.data?.following || []);
//     } catch (error) {
//       console.log("Error fetching following list:", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getUserFollowingList();
//       getUserWishlistdata();
//     }
//   }, [token]);

//   const getUserWishlistdata = async () => {
//     try {
//       if (!token) return;
      
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAllWishlist(res.data.wishlist.products);
//     } catch (error) {
//       console.log("Error fetching wishlist:", error);
//     }
//   };

//   const handleLikeClick = async (item) => {
//     try {
//       if (!token) {
//         handleLoginNotification();
//         return;
//       }

//       let id = item._id;

//       // Check if product is already in wishlist
//       if (isProductInWishlist(id)) {
//         // Remove from wishlist
//         const response = await axios.put(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/remove/${id}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           // Update local wishlist state
//           setAllWishlist(prevWishlist =>
//             prevWishlist.filter(item => item.productId !== id)
//           );
//         }
//       } else {
//         // Add to wishlist
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
//           { productId: id },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           getUserWishlistdata();
//         }
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || error.message);
//       setErrorPopupOpen(true);
//     }
//   };

//   const handleOpenOfferPopup = () => {
//     if (!token) {
//       handleLoginNotification();
//     } else {
//       setIsOfferPopupOpen(true);
//     }
//   };

//   const handleCloseOfferPopup = () => {
//     setIsOfferPopupOpen(false);
//   };

//   const handleOfferSubmit = (price) => {
//     console.log("Offer submitted:", price);
//     setOfferSubmitted(true);
//     handleCloseOfferPopup();
//   };

//   // Updated toggle follow function to use the backend's single endpoint
//   const handleToggleFollow = async (sellerId) => {
//     if (!token) {
//       handleLoginNotification();
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/toggleFollowUser/${sellerId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
      
//       // Update local state to reflect the change immediately
//       if (response.status === 200) {
//         // If the user was following the seller, remove the sellerId from following list
//         // If the user was not following the seller, add the sellerId to following list
//         setUserFollowingIds(prevFollowingIds => {
//           const isCurrentlyFollowing = prevFollowingIds.includes(sellerId);
//           if (isCurrentlyFollowing) {
//             return prevFollowingIds.filter(id => id !== sellerId);
//           } else {
//             return [...prevFollowingIds, sellerId];
//           }
//         });
//       }
//     } catch (error) {
//       console.error("Error toggling follow status:", error);
//       toast.error("Failed to update follow status");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
//       );
//       setProduct(response?.data || []);
//     } catch (error) {
//       toast.error("Failed to fetch products");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const isProductInWishlist = (productId) => {
//     return AllWishlist.some(wishlistItem => wishlistItem.productId === productId);
//   };

//   // Check if the user is following a seller
//   const isFollowingSeller = (sellerId) => {
//     return userFollowingIds.includes(sellerId);
//   };

//   // Main slider settings
//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: false,
//     autoplaySpeed: 3000,
//     arrows: false,
//     swipe: !isCardHovered,
//     draggable: !isCardHovered,
//     touchThreshold: 50,
//     cssEase: "ease-in-out",
//     useCSS: true,
//     useTransform: true,
//     centerMode: false,
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           centerMode: true,
//           centerPadding: '0px',
//         },
//       },
//     ],
//     afterChange: (current) => {
//       // Calculate progress based on visible slides
//       const totalSlides = product.length;
//       const visibleSlides = getVisibleSlides();
//       const maxProgress = Math.max(0, totalSlides - visibleSlides);
//       const newProgress = (current / maxProgress) * 100;
//       setProgress(Math.min(newProgress, 100));
//     },
//   };

//   // Function to determine number of visible slides based on screen width
//   const getVisibleSlides = () => {
//     const width = typeof window !== "undefined" ? window.innerWidth : 1280;
//     if (width >= 1280) return 4;
//     if (width >= 1024) return 3;
//     if (width >= 768) return 2;
//     return 1;
//   };

//   // Inner slider settings
//   const innerSliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     swipe: true,
//     draggable: true,
//     customPaging: (i) => (
//       <div
//         className="custom-dot"
//         style={{
//           height: "5px",
//           width: "20px",
//           borderRadius: "20px",
//           background: "rgba(235, 235, 228, 0.4)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: "pointer",
//           marginTop: "-100px",
//         }}
//       />
//     ),
//     appendDots: (dots) => (
//       <div
//         style={{
//           padding: "15px",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <ul style={{ display: "flex", gap: "5px" }}> {dots} </ul>
//       </div>
//     ),
//   };

//   const handleLoginNotification = () => {
//     toast.success("Please Login!");
//     setTimeout(() => {
//       router.push("/login");
//     }, 1000);
//   };

//   return (
//     <div className="w-full overflow-hidden">
//       <div className="lg:pl-[50px] sm:pl-5 pl-0 outline-none">
//         <Slider ref={sliderRef} {...settings}>
//           {product.map((item, index) => (
//             <div className="outline-none lg:px-2 sm:px-2 px-0" key={index}>
//               <div className="mx-auto max-w-[307px]">
//                 <div className="flex justify-between items-center mb-2 space-x-4 w-full">
//                   <div className="flex space-x-4 items-center">
//                     <Link href={`/user_profile/${item?.seller?._id}`}>
//                       <img
//                         src={item?.seller?.avatar || "/profile_icon.svg"}
//                         alt="User avatar"
//                         className="object-contain h-12 w-12 rounded-full"
//                       />
//                     </Link>
//                     <p className="font-bold text-sm">{item?.seller?.username}</p>
//                   </div>
//                   <button
//                     className={`mt-2 px-4 sm:px-6 py-1 ${
//                       isFollowingSeller(item?.seller?._id)
//                         ? "bg-gray-500"
//                         : "bg-custom-green"
//                     } text-white rounded-full`}
//                     onClick={() => handleToggleFollow(item?.seller?._id)}
//                     disabled={loading}
//                   >
//                     {isFollowingSeller(item?.seller?._id) ? "Unfollow" : "Follow"}
//                   </button>
//                 </div>
//                 <div
//                   className="w-full h-[404px] rounded-[20px] relative outline-none overflow-hidden"
//                   style={{ backgroundColor: "#cfcec9" }}
//                   onMouseEnter={() => setIsCardHovered(true)}
//                   onMouseLeave={() => setIsCardHovered(false)}
//                   onTouchStart={() => setIsCardHovered(true)}
//                   onTouchEnd={() => setIsCardHovered(false)}
//                 >
//                   <div className="absolute top-2 right-2 z-10">
//                     <div
//                       className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer"
//                       onClick={() => handleLikeClick(item)}
//                     >
//                       {token && isProductInWishlist(item._id) ? (
//                         <FcLike className="text-2xl w-8 h-8" />
//                       ) : (
//                         <GoHeart className="text-2xl text-gray-300" />
//                       )}
//                     </div>
//                   </div>
//                   <div 
//                     className="absolute min-w-[204px] bottom-4 left-4 text-center z-10 bg-[#fde504] px-[50px] py-[20px] rounded-[20px]"
//                     onClick={token ? undefined : handleLoginNotification}
//                   >
//                     {token ? (
//                       <Link href={`/selling-page/${item._id}`}>
//                         <button className="text-[#202020] text-base font-bold font-karla leading-tight">
//                           Buy Now
//                         </button>
//                       </Link>
//                     ) : (
//                       <button className="text-[#202020] text-base font-bold font-karla leading-tight">
//                         Buy Now
//                       </button>
//                     )}
//                   </div>
//                   <div className="absolute bottom-6 right-5 z-10">
//                     <div
//                       className="h-[54px] p-[15px] bg-white rounded-[100px] cursor-pointer"
//                       onClick={handleOpenOfferPopup}
//                     >
//                       <Image
//                         alt=""
//                         width={24}
//                         height={24}
//                         src="/hand_shake.svg"
//                       />
//                     </div>
//                   </div>

//                   <div
//                     onClick={(e) => e.stopPropagation()}
//                     className="h-full w-full"
//                   >
//                     <Slider {...innerSliderSettings} className="h-full">
//                       {item?.images?.map((imgSrc, imgIndex) => (
//                         <div key={imgIndex} className="h-full w-full">
//                           <div className="relative h-[404px] w-full">
//                             <Image
//                               src={imgSrc}
//                               alt={`Image ${imgIndex + 1} of ${item?.name || "carousel item"}`}
//                               layout="fill"
//                               objectFit="cover"
//                               className="rounded-[20px]"
//                               priority
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </Slider>
//                   </div>
//                 </div>
//                 <div className="mt-2 w-full">
//                   <h3 className="font-karla font-bold text-base">{item.name}</h3>
//                   <p className="text-black text-[25px] font-bold font-karla leading-[30px]">
//                     {item.price}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//         <div className="w-full px-5 lg:px-[50px] mt-20">
//           <motion.div
//             className="progress-bar w-full"
//             style={{
//               height: "4px",
//               backgroundColor: "#e0e0e0",
//             }}
//           >
//             <motion.div
//               className="progress"
//               style={{
//                 height: "100%",
//                 backgroundColor: "#E4086F",
//                 borderRadius: "20px",
//                 width: `${progress}%`,
//               }}
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 0.2 }}
//             />
//           </motion.div>
//         </div>
//       </div>
//       <OfferPopup
//         isOpen={isOfferPopupOpen}
//         onClose={handleCloseOfferPopup}
//         onSubmit={handleOfferSubmit}
//       />
//       {errorPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
//             <p className="text-red-600 font-semibold text-center">
//               {errorMessage}
//             </p>
//             <button
//               onClick={() => setErrorPopupOpen(false)}
//               className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Carousels;












"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/store/wishlist/wishlistSlice";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import OfferPopup from "../OfferPopup";

const Carousels = () => {
  const router = useRouter();
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);
  const sliderRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const details = useSelector((state) => state.auth.user);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userID = details?._id;

  const [userFollowingIds, setUserFollowingIds] = useState([]);
  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
  const [AllWishlist, setAllWishlist] = useState([]);

  const getUserFollowingList = async () => {
    try {
      if (!token) return;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/following-ids`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserFollowingIds(res.data?.following || []);
    } catch (error) {
      console.log("Error fetching following list:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserFollowingList();
      getUserWishlistdata();
    }
  }, [token]);

  const getUserWishlistdata = async () => {
    try {
      if (!token) return;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllWishlist(res.data.wishlist.products);
    } catch (error) {
      console.log("Error fetching wishlist:", error);
    }
  };

  const handleLikeClick = async (item) => {
    try {
      if (!token) {
        handleLoginNotification();
        return;
      }

      let id = item._id;

      if (isProductInWishlist(id)) {
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
          setAllWishlist((prevWishlist) =>
            prevWishlist.filter((item) => item.productId !== id)
          );
        }
      } else {
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
          getUserWishlistdata();
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setErrorPopupOpen(true);
    }
  };

  const handleOpenOfferPopup = (item) => {
    if (!token) {
      handleLoginNotification();
    } else {
      setCurrentProduct(item);
      setIsOfferPopupOpen(true);
    }
  };

  const handleCloseOfferPopup = () => {
    setIsOfferPopupOpen(false);
    setSelectedPrice(null);
    setIsSubmitDisabled(true);
    setCurrentProduct(null);
  };

  const handlePriceSelection = (price) => {
    setSelectedPrice(price);
    if (price && !isNaN(price)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleOfferSubmit = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const data = { offerPrice: selectedPrice, seller: currentProduct.seller };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/add/${currentProduct._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setOfferSubmitted(true);
        handleCloseOfferPopup();
        toast.success("Offer submitted successfully!");
      } else {
        setErrorMessage(`Failed to submit offer: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      setErrorMessage(` ${error.response?.data?.message || error.message}`);
      setErrorPopupOpen(true);
    }
  };

  const handleToggleFollow = async (sellerId) => {
    if (!token) {
      handleLoginNotification();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/toggleFollowUser/${sellerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserFollowingIds((prevFollowingIds) => {
          const isCurrentlyFollowing = prevFollowingIds.includes(sellerId);
          if (isCurrentlyFollowing) {
            return prevFollowingIds.filter((id) => id !== sellerId);
          } else {
            return [...prevFollowingIds, sellerId];
          }
        });
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
      toast.error("Failed to update follow status");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
      );
      setProduct(response?.data || []);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const isProductInWishlist = (productId) => {
    return AllWishlist.some((wishlistItem) => wishlistItem.productId === productId);
  };

  const isFollowingSeller = (sellerId) => {
    return userFollowingIds.includes(sellerId);
  };

  const handleLoginNotification = () => {
    toast.success("Please Login!");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

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
    centerMode: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
    afterChange: (current) => {
      const totalSlides = product.length;
      const visibleSlides = getVisibleSlides();
      const maxProgress = Math.max(0, totalSlides - visibleSlides);
      const newProgress = (current / maxProgress) * 100;
      setProgress(Math.min(newProgress, 100));
    },
  };

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

  const getVisibleSlides = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1280;
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="lg:pl-[50px] sm:pl-5 pl-0 outline-none">
        <Slider ref={sliderRef} {...settings}>
          {product.map((item, index) => (
            <div className="outline-none lg:px-2 sm:px-2 px-0" key={index}>
              <div className="mx-auto max-w-[307px]">
                <div className="flex justify-between items-center mb-2 space-x-4 w-full">
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
                    className={`mt-2 px-4 sm:px-6 py-1 ${
                      isFollowingSeller(item?.seller?._id)
                        ? "bg-gray-500"
                        : "bg-custom-green"
                    } text-white rounded-full`}
                    onClick={() => handleToggleFollow(item?.seller?._id)}
                    disabled={loading}
                  >
                    {isFollowingSeller(item?.seller?._id) ? "Unfollow" : "Follow"}
                  </button>
                </div>
                <div
                  className="w-full h-[404px] rounded-[20px] relative outline-none overflow-hidden"
                  style={{ backgroundColor: "#cfcec9" }}
                  onMouseEnter={() => setIsCardHovered(true)}
                  onMouseLeave={() => setIsCardHovered(false)}
                  onTouchStart={() => setIsCardHovered(true)}
                  onTouchEnd={() => setIsCardHovered(false)}
                >
                  <div className="absolute top-2 right-2 z-10">
                    <div
                      className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer"
                      onClick={() => handleLikeClick(item)}
                    >
                      {token && isProductInWishlist(item._id) ? (
                        <FcLike className="text-2xl w-8 h-8" />
                      ) : (
                        <GoHeart className="text-2xl text-gray-300" />
                      )}
                    </div>
                  </div>
                  <div
                    className="absolute min-w-[204px] bottom-4 left-4 text-center z-10 bg-[#fde504] px-[50px] py-[20px] rounded-[20px]"
                    onClick={token ? undefined : handleLoginNotification}
                  >
                    {token ? (
                      <Link href={`/selling-page/${item._id}`}>
                        <button className="text-[#202020] text-base font-bold font-karla leading-tight">
                          Buy Now
                        </button>
                      </Link>
                    ) : (
                      <button className="text-[#202020] text-base font-bold font-karla leading-tight">
                        Buy Now
                      </button>
                    )}
                  </div>
                  <div
                    className="absolute bottom-6 right-5 z-10"
                    onClick={() => handleOpenOfferPopup(item)}
                  >
                    <div className="h-[54px] p-[15px] bg-white rounded-[100px] cursor-pointer">
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
                              alt={`Image ${imgIndex + 1} of ${item?.name || "carousel item"}`}
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
                <div className="mt-2 w-full">
                  <h3 className="font-karla font-bold text-base">{item.name}</h3>
                  <p className="text-black text-[25px] font-bold font-karla leading-[30px]">
                   AED {item.price}
                  </p>
                </div>
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
        isOfferPopupOpen={isOfferPopupOpen}
        product={currentProduct}
        handlePriceSelection={handlePriceSelection}
        handleOpenModal={handleOfferSubmit}
        handleCloseOfferPopup={handleCloseOfferPopup}
        selectedPrice={selectedPrice}
        isSubmitDisabled={isSubmitDisabled}
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
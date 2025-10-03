





// "use client";

// import { useRef, useState, useEffect } from "react";
// import { IoHeartOutline } from "react-icons/io5";
// import Link from "next/link";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FcLike } from "react-icons/fc";
// import { GoHeart } from "react-icons/go";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import OfferPopup from "./OfferPopup";

// const RecommendationCard = ({ id, product, price }) => {
//   const router = useRouter();
//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//   const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
//   const [offerSubmitted, setOfferSubmitted] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//   const [likedCards, setLikedCards] = useState({});
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleOpenOfferPopup = () => {
//     if (!token) {
//       toast.success("Please login");
//       setTimeout(() => {
//         router.push("/login");
//       }, 500);
//     } else {
//       setIsOfferPopupOpen(true);
//     }
//   };

//   const handleCloseOfferPopup = () => {
//     setIsOfferPopupOpen(false);
//     setSelectedPrice(null);
//     setIsSubmitDisabled(true);
//   };

//   const handlePriceSelection = (price) => {
//     setSelectedPrice(price);
//     if (price && !isNaN(price)) {
//       setIsSubmitDisabled(false);
//     } else {
//       setIsSubmitDisabled(true);
//     }
//   };

//   const handleOfferSubmit = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const data = {
//         offerPrice: selectedPrice,
//         seller: product.seller?._id || (product.admin?._id || "admin"),
//       };

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/add/${product._id}`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setOfferSubmitted(true);
//         handleCloseOfferPopup();
//         toast.success("Offer submitted successfully!");
//       } else {
//         setErrorMessage(`Failed to submit offer: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       setErrorMessage(`${error.response?.data?.message || error.message}`);
//       setErrorPopupOpen(true);
//     }
//   };

//   const handleLikeClick = (cardId) => {
//     setLikedCards((prevLikedCards) => ({
//       ...prevLikedCards,
//       [cardId]: !prevLikedCards[cardId],
//     }));
//   };

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     customPaging: (i) => (
//       <div
//         style={{
//           width: i === 0 ? "50px" : "26px",
//           height: "5px",
//           borderRadius: "20px",
//           background: i === 0 ? "white" : "#eee",
//           marginRight: i === 0 ? "10px" : "0",
//           cursor: "pointer",
//         }}
//       />
//     ),
//     appendDots: (dots) => (
//       <div
//         style={{
//           padding: "15px",
//           display: "flex",
//           justifyContent: "center",
//           position: "absolute",
//           bottom: "60px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           zIndex: 20,
//         }}
//       >
//         <ul style={{ display: "flex", gap: "25px" }}>
//           {dots}
//         </ul>
//       </div>
//     ),
//   };

//   return (
//     <div className="p-2 w-64 shrink-0 relative">
//       <Slider {...sliderSettings} className="relative">
//         {product.images && product.images.length > 0 ? (
//           product.images.map((image, index) => (
//             <div key={index}>
//               <img
//                 src={image}
//                 alt={`Product ${index + 1}`}
//                 className="h-80 w-full object-cover rounded-lg"
//               />
//             </div>
//           ))
//         ) : (
//           <div>
//             <img
//               src="/placeholder-image.jpg"
//               alt="Placeholder"
//               className="h-80 w-full object-cover rounded-lg"
//             />
//           </div>
//         )}
//       </Slider>

//       <div
//         className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer"
//         onClick={() => handleLikeClick(id)}
//       >
//         {likedCards[id] ? (
//           <FcLike className="text-2xl w-8 h-8" />
//         ) : (
//           <GoHeart className="text-2xl text-gray-300" />
//         )}
//       </div>

//       <div
//         className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
//         style={{ marginBottom: "5rem" }}
//       >
//         <Link href={`/selling-page/${product._id}`} passHref>
//           <button className="bg-[#FDE504] w-[150px] h-[48px] rounded-[1rem] font-semibold hover:opacity-80 transition-opacity mr-1">
//             Buy Now
//           </button>
//         </Link>

//         <div
//           className="flex items-center justify-center bg-white rounded-full shadow-md ml-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
//           style={{ width: "38px", height: "40px" }}
//         >
//           <img
//             src="/shake_hands.png"
//             alt="Handshake"
//             className="w-6 h-6 hover:scale-110 transition-transform duration-300"
//             style={{ width: "24px", height: "24px" }}
//             onClick={handleOpenOfferPopup}
//           />
//         </div>
//       </div>

//       <OfferPopup
//         isOfferPopupOpen={isOfferPopupOpen}
//         product={product}
//         handlePriceSelection={handlePriceSelection}
//         handleOpenModal={handleOfferSubmit}
//         handleCloseOfferPopup={handleCloseOfferPopup}
//         selectedPrice={selectedPrice}
//         isSubmitDisabled={isSubmitDisabled}
//       />

//       {errorPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
//             <p className="text-red-600 font-semibold text-center text-sm sm:text-base">
//               {errorMessage}
//             </p>
//             <button
//               onClick={() => setErrorPopupOpen(false)}
//               className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300 text-sm sm:text-base"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-4">
//         <p className="text-sm font-semibold text-left">
//           {product.name || "Dress"}
//         </p>
//         <p className="text-lg font-semibold text-left">
//           AED {product.price || price}
//         </p>
//       </div>
//     </div>
//   );
// };

// const Recommendations = ({ product }) => {
//   const scrollRef = useRef(null);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   const handleScroll = () => {
//     if (scrollRef.current) {
//       const scrollLeft = scrollRef.current.scrollLeft;
//       const scrollWidth =
//         scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
//       const progress = (scrollLeft / scrollWidth) * 100;
//       setScrollProgress(progress);
//     }
//   };

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener("scroll", handleScroll);
//       return () => scrollContainer.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   const productList = Array.isArray(product) ? product : [];

//   return (
//     <div className="mt-8 flex flex-col items-center mb-20">
//       <div className="flex justify-between items-center mb-10 w-full max-w-screen-xl">
//         <h2
//           className="ml-6 leading-tight tracking-wide font-luckiest"
//           style={{ fontSize: "45px" }}
//         >
//           YOU MAY ALSO LIKE
//         </h2>

//         <Link href="/selling-page">
//           <button className="border-2 border-[#E4086F] text-[#E4086F] bg-white opacity-100 hover:bg-[#E4086F] hover:text-white hover:opacity-80 transition-all w-[150px] h-[60px] rounded-[1rem] font-bold">
//             View All
//           </button>
//         </Link>
//       </div>

//       <div className="relative w-full max-w-screen-xl">
//         <div
//           ref={scrollRef}
//           className="flex gap-4 overflow-x-scroll scrollbar-hide"
//           style={{ scrollBehavior: "smooth", paddingBottom: "60px" }}
//         >
//           {productList.map((prod) => (
//             <RecommendationCard
//               key={prod._id}
//               id={prod._id}
//               product={prod}
//               price={prod.price}
//             />
//           ))}
//         </div>

//         <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
//           <div
//             className="h-full bg-[#E4086F] transition-all duration-300 ease-out"
//             style={{ width: `${scrollProgress}%` }}
//           />
//         </div>
//       </div>

//       <style>
//         {`
//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//           .scrollbar-hide {
//             scrollbar-width: none;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Recommendations;







"use client";

import { useRef, useState, useEffect } from "react";
import { IoHeartOutline } from "react-icons/io5";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import OfferPopup from "./OfferPopup";

const RecommendationCard = ({ id, product, price }) => {
  const router = useRouter();
  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [offerLimitPopupOpen, setOfferLimitPopupOpen] = useState(false);
  const [remainingOffers, setRemainingOffers] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const fetchRemainingOfferCount = async (productId) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/remaining/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRemainingOffers(res.data.remainingOffers);
    } catch (error) {
      console.log("Error fetching remaining offer count", error);
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const wishlist = res.data.wishlist.products;
      setIsLiked(wishlist.some((item) => item.productId === id));
    } catch (error) {
      console.log("Error checking wishlist status", error);
    }
  };

  useEffect(() => {
    if (token && id) {
      fetchRemainingOfferCount(id);
      checkWishlistStatus();
    }
  }, [id, token]);

  const handleOpenOfferPopup = () => {
    if (!token) {
      toast.success("Please login");
      setTimeout(() => {
        router.push("/login");
      }, 500);
      return;
    }

    // Check remaining offers
    if (remainingOffers <= 0) {
      setErrorMessage("You have reached the maximum limit of 3 offers for this product.");
      setOfferLimitPopupOpen(true);
      return;
    }

    setIsOfferPopupOpen(true);
  };

  const handleCloseOfferPopup = () => {
    setIsOfferPopupOpen(false);
    setSelectedPrice(null);
    setIsSubmitDisabled(true);
  };

  const handlePriceSelection = (price) => {
    const parsedPrice = parseFloat(price);
    setSelectedPrice(parsedPrice);
    if (parsedPrice && !isNaN(parsedPrice) && parsedPrice >= (product?.price * 0.7)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleOfferSubmit = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const data = {
        productId: product._id,
        offerPrice: selectedPrice,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setOfferSubmitted(true);
        handleCloseOfferPopup();
        toast.success("Offer submitted successfully!");
        fetchRemainingOfferCount(product._id);
      } else {
        setErrorMessage(`Failed to submit offer: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to submit offer");
      setErrorPopupOpen(true);
    }
  };

  const handleLikeClick = async () => {
    if (!token) {
      toast.success("Please login");
      setTimeout(() => {
        router.push("/login");
      }, 500);
      return;
    }

    try {
      const token = JSON.parse(Cookies.get("auth"));
      if (isLiked) {
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
          setIsLiked(false);
          toast.success("Removed from wishlist");
        } else {
          setErrorMessage(`Failed to remove from wishlist: ${response.data.message}`);
          setErrorPopupOpen(true);
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
          setIsLiked(true);
          toast.success("Added to wishlist");
        } else {
          setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
          setErrorPopupOpen(true);
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update wishlist");
      setErrorPopupOpen(true);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: (i) => (
      <div
        style={{
          width: i === 0 ? "50px" : "26px",
          height: "5px",
          borderRadius: "20px",
          background: i === 0 ? "white" : "#eee",
          marginRight: i === 0 ? "10px" : "0",
          cursor: "pointer",
        }}
      />
    ),
    appendDots: (dots) => (
      <div
        style={{
          padding: "15px",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
      >
        <ul style={{ display: "flex", gap: "25px" }}>
          {dots}
        </ul>
      </div>
    ),
  };

  return (
    <div className="p-2 w-64 shrink-0 relative">
      <Slider {...sliderSettings} className="relative">
        {product.images && product.images.length > 0 ? (
          product.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="h-80 w-full object-cover rounded-lg"
              />
            </div>
          ))
        ) : (
          <div>
            <img
              src="/placeholder-image.jpg"
              alt="Placeholder"
              className="h-80 w-full object-cover rounded-lg"
            />
          </div>
        )}
      </Slider>

      <div
        className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer"
        onClick={handleLikeClick}
      >
        {isLiked ? (
          <FcLike className="text-2xl w-8 h-8" />
        ) : (
          <GoHeart className="text-2xl text-gray-300" />
        )}
      </div>

      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
        style={{ marginBottom: "5rem" }}
      >
        {token ? (
          <Link href={`/selling-page/${product._id}`} passHref>
            <button className="bg-[#FDE504] w-[150px] h-[48px] rounded-[1rem] font-semibold hover:opacity-80 transition-opacity mr-1">
              Buy Now
            </button>
          </Link>
        ) : (
          <button
            className="bg-[#FDE504] w-[150px] h-[48px] rounded-[1rem] font-semibold hover:opacity-80 transition-opacity mr-1"
            onClick={() => {
              toast.success("Please login");
              setTimeout(() => {
                router.push("/login");
              }, 500);
            }}
          >
            Buy Now
          </button>
        )}

        <div
          className="flex items-center justify-center bg-white rounded-full shadow-md ml-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          style={{ width: "38px", height: "40px" }}
        >
          <img
            src="/shake_hands.png"
            alt="Handshake"
            className="w-6 h-6 hover:scale-110 transition-transform duration-300"
            style={{ width: "24px", height: "24px" }}
            onClick={handleOpenOfferPopup}
          />
        </div>
      </div>

      <OfferPopup
        isOfferPopupOpen={isOfferPopupOpen}
        product={product}
        handlePriceSelection={handlePriceSelection}
        handleOfferSubmit={handleOfferSubmit}
        handleCloseOfferPopup={handleCloseOfferPopup}
        selectedPrice={selectedPrice}
        isSubmitDisabled={isSubmitDisabled}
        remainingOffers={remainingOffers}
      />

      {errorPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
            <p className="text-red-600 font-semibold text-center text-sm sm:text-base">
              {errorMessage}
            </p>
            <button
              onClick={() => setErrorPopupOpen(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300 text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {offerLimitPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
            <p className="text-red-600 font-semibold text-center text-sm sm:text-base">
              You have reached the maximum limit of 3 offers for this product.
            </p>
            <button
              onClick={() => setOfferLimitPopupOpen(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300 text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <p className="text-sm font-semibold text-left">
          {product.name || "Dress"}
        </p>
        <p className="text-lg font-semibold text-left">
          AED {product.price || price}
        </p>
        {/* <p className="text-sm text-gray-600">
          Offers Remaining: {remainingOffers !== undefined ? remainingOffers : "Loading..."}
        </p> */}
      </div>
    </div>
  );
};

const Recommendations = ({ product }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const progress = (scrollWidth > 0 ? scrollLeft / scrollWidth : 0) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const productList = Array.isArray(product) ? product : [];

  return (
    <div className="mt-8 flex flex-col items-center mb-20">
      <div className="flex justify-between items-center mb-10 w-full max-w-screen-xl">
        <h2
          className="ml-6 leading-tight tracking-wide font-luckiest"
          style={{ fontSize: "45px" }}
        >
          YOU MAY ALSO LIKE
        </h2>

        <Link href="/selling-page">
          <button className="border-2 border-[#E4086F] text-[#E4086F] bg-white opacity-100 hover:bg-[#E4086F] hover:text-white hover:opacity-80 transition-all w-[150px] h-[60px] rounded-[1rem] font-bold">
            View All
          </button>
        </Link>
      </div>

      <div className="relative w-full max-w-screen-xl">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-scroll scrollbar-hide"
          style={{ scrollBehavior: "smooth", paddingBottom: "60px" }}
        >
          {productList.map((prod) => (
            <RecommendationCard
              key={prod._id}
              id={prod._id}
              product={prod}
              price={prod.price}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
          <div
            className="h-full bg-[#E4086F] transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default Recommendations;
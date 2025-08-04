





// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import CustomCalendar from "./CustomCalendar";
// import { useState, useEffect, useRef } from "react";
// import {
//   FaStar,
//   FaRegHeart,
//   FaShoppingBag,
//   FaArrowLeft,
//   FaArrowRight,
// } from "react-icons/fa";
// import { FaHandshake } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "@/store/cart/cartSlice";
// import axios from "axios";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import OfferPopup from "./OfferPopup";

// const ProductCard = (productDetails) => {
//   const [product, setProduct] = useState(productDetails?.product);
//   const router = useRouter();
//   const [isRentPopupOpen, setRentPopupOpen] = useState(false);
//   const [rentalDate, setRentalDate] = useState("");
//   const [isOfferPopupOpen, setOfferPopupOpen] = useState(false);
//   const [offerSubmitted, setOfferSubmitted] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDateSelected, setIsDateSelected] = useState(false);
//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);
//   const [isStartFormatted, setIsStartFormatted] = useState("");
//   const [isEndFormatted, setIsEndFormatted] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showExpandedDateSelection, setShowExpandedDateSelection] = useState(false);
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [offerLimitPopupOpen, setOfferLimitPopupOpen] = useState(false);
//   const [remainingOffers, setRemainingOffers] = useState(0);
//   const modalRef = useRef(null);
//   const dispatch = useDispatch();
//   const details = useSelector((state) => state.auth.user);
//   const userID = details?._id;
//   console.log("product details......", productDetails.product);

//   const images = product?.images;

//   const fetchRemainingOfferCount = async (productId) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/remaining/${productId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Remaining offers for product", productId, ":", res.data.remainingOffers);
//       setRemainingOffers(res.data.remainingOffers);
//     } catch (error) {
//       console.log("Error fetching remaining offer count", error);
//     }
//   };

//   useEffect(() => {
//     if (product?._id) {
//       const rawToken = Cookies.get("auth");
//       const token = rawToken ? JSON.parse(rawToken) : null;
//       if (token) {
//         fetchRemainingOfferCount(product._id);
//       }
//     }
//   }, [product?._id]);

//   const handleBuy = async () => {
//     try {
//       const rawToken = Cookies.get("auth");
//       const token = rawToken ? JSON.parse(rawToken) : null;

//       if (!token) {
//         toast.success("Please Login!");
//         setTimeout(() => {
//           router.push("/login");
//         }, 500);
//         return;
//       }

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add`,
//         { productId: product._id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         dispatch(addToCart(product));
//         router.push("/cart");
//       } else {
//         console.error("Failed to add product to cart:", response.statusText);
//         setErrorMessage(`Failed to add to cart: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       console.error("An error occurred while adding product to cart:", error);
//       setErrorMessage(error.response?.data?.message || "Failed to add to cart");
//       setErrorPopupOpen(true);
//     }
//   };

//   const handleWish = async () => {
//     try {
//       const rawToken = Cookies.get("auth");
//       const token = rawToken ? JSON.parse(rawToken) : null;

//       if (!token) {
//         toast.success("Please Login!");
//         setTimeout(() => {
//           router.push("/login");
//         }, 500);
//         return;
//       }

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
//         { productId: product._id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         router.push("/wishlist");
//       } else {
//         console.error("Failed to add product to wishlist:", response.statusText);
//         setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       console.error("An error occurred while adding product to wishlist:", error);
//       setErrorMessage(error.response?.data?.message || "Failed to add to wishlist");
//       setErrorPopupOpen(true);
//     }
//   };

//   const handleFollow = async (id, type, sellerID) => {
//     setLoading(true);

//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/${type}/${id}`;
//       let res = await axios.post(
//         url,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const updatedFollowers = res.data.followers;

//       setProduct((prevProduct) => {
//         if (prevProduct.seller._id === sellerID) {
//           return {
//             ...prevProduct,
//             seller: {
//               ...prevProduct.seller,
//               followers: updatedFollowers,
//             },
//           };
//         }
//         return prevProduct;
//       });
//       toast.success(res.data.message);
//     } catch (error) {
//       console.error("Error while following/unfollowing", error);
//       toast.error("Failed to update follow status");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleCalendar = () => {
//     setShowCalendar(!showCalendar);
//     if (!showCalendar && !showExpandedDateSelection) {
//       setShowExpandedDateSelection(true);
//     }
//   };

//   const closeCalendar = () => {
//     setShowCalendar(false);
//   };

//   const handleDateRangeSelect = (startDate, endDate) => {
//     if (startDate) {
//       setSelectedStartDate(startDate);
//       const formattedStart = new Date(startDate).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//       });
//       setIsStartFormatted(formattedStart);
//       setIsDateSelected(true);
//       setShowExpandedDateSelection(true);
//     } else {
//       setSelectedStartDate(null);
//       setIsStartFormatted("");
//       setIsDateSelected(false);
//     }

//     if (endDate) {
//       setSelectedEndDate(endDate);
//       const formattedEnd = new Date(endDate).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//       });
//       setIsEndFormatted(formattedEnd);
//     } else {
//       setSelectedEndDate(null);
//       setIsEndFormatted("");
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         handleCloseRentPopup();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleOpenOfferPopup = () => {
//     const rawToken = Cookies.get("auth");
//     const token = rawToken ? JSON.parse(rawToken) : null;

//     if (!token) {
//       toast.success("Please login");
//       setTimeout(() => {
//         router.push("/login");
//       }, 500);
//       return;
//     }

//     // Check remaining offers
//     if (remainingOffers <= 0) {
//       setErrorMessage("You have reached the maximum limit of 3 offers for this product.");
//       setOfferLimitPopupOpen(true);
//       return;
//     }

//     setOfferPopupOpen(true);
//   };

//   const handleCloseOfferPopup = () => {
//     setOfferPopupOpen(false);
//     setOfferAmount("");
//     setSelectedPrice(null);
//     setIsSubmitDisabled(true);
//   };

//   const handlePriceSelection = (price) => {
//     const parsedPrice = parseFloat(price);
//     setSelectedPrice(parsedPrice);
//     setOfferAmount(parsedPrice);

//     if (parsedPrice && !isNaN(parsedPrice) && parsedPrice >= (product?.price * 0.7)) {
//       setIsSubmitDisabled(false);
//     } else {
//       setIsSubmitDisabled(true);
//     }
//   };

//   const handleOfferSubmit = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const data = {
//         productId: product._id,
//         offerPrice: selectedPrice,
//       };

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/create`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         setOfferSubmitted(true);
//         handleCloseOfferPopup();
//         toast.success("Offer submitted successfully!");
//         fetchRemainingOfferCount(product._id);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Failed to submit offer");
//       setErrorPopupOpen(true);
//     }
//   };

//   const handleOpenRentPopup = () => {
//     setRentPopupOpen(true);
//   };

//   const handleCloseRentPopup = () => {
//     setRentPopupOpen(false);
//     setRentalDate("");
//     setSelectedStartDate(null);
//     setSelectedEndDate(null);
//     setIsStartFormatted("");
//     setIsEndFormatted("");
//     setShowCalendar(false);
//     setShowExpandedDateSelection(false);
//   };

//   const handleProceed = () => {
//     if (!selectedStartDate || !selectedEndDate) {
//       setErrorMessage("Please select both start and end dates");
//       setErrorPopupOpen(true);
//       return;
//     }

//     router.push(
//       `/renting?startDate=${isStartFormatted}&endDate=${isEndFormatted}&productId=${product._id}`
//     );
//     handleCloseRentPopup();
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrevImage = () => {
//     setCurrentImageIndex(
//       (prevIndex) => (prevIndex - 1 + images.length) % images.length
//     );
//   };

//   return (
//     <div className="max-w-screen-xl mx-auto pl-1 pr-6 font-karla">
//       <div className="breadcrumb text-gray-500 text-sm mb-3 mt-2">
//         <Link href="/" className="hover">
//           Home
//         </Link>
//         {" | "}
//         <Link href="/" className="hover">
//           Categories
//         </Link>{" "}
//         |
//         <Link href="/" className="hover">
//           {product?.category?.categoryName}
//         </Link>{" "}
//         | <span className="font-bold">{product?.title}</span>
//       </div>

//       <hr className="border-gray-300 mb-4" />

//       <div className="flex flex-col md:flex-row items-start gap-6 relative">
//         <div className="w-full md:w-1/2 relative">
//           <Image
//             unoptimized
//             width={650}
//             height={500}
//             src={images[currentImageIndex]}
//             alt="Product Image"
//             className="object-cover rounded-md"
//             style={{
//               width: "100%",
//               height: "500px",
//               maxWidth: "650px",
//               zIndex: 1,
//               position: "relative",
//               transition: "opacity 0.5s ease-in-out",
//             }}
//           />
//           <Image
//             unoptimized
//             width={650}
//             height={500}
//             src={images[(currentImageIndex + 1) % images.length]}
//             alt="Product Image"
//             className="object-cover rounded-md absolute top-0 left-0"
//             style={{
//               width: "100%",
//               height: "500px",
//               maxWidth: "650px",
//               zIndex: 0,
//               position: "absolute",
//               opacity: 0,
//               transition: "opacity 0.5s ease-in-out",
//             }}
//           />
//           <button
//             className="absolute left-1 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md z-20"
//             style={{
//               backgroundColor: "#E5E5E5",
//               boxShadow: "inset -20px -6px 24px rgba(209, 209, 209, 0.07)",
//               filter: "drop-shadow(0px 10px 44px rgba(0, 0, 0, 0.09))",
//             }}
//             onClick={() => {
//               handlePrevImage();
//               document.querySelector(
//                 `img[alt="Product Image"]:nth-child(1)`
//               ).style.opacity = 0;
//               document.querySelector(
//                 `img[alt="Product Image"]:nth-child(2)`
//               ).style.opacity = 1;
//             }}
//           >
//             <FaArrowLeft className="text-black w-4 h-4" />
//           </button>
//           <button
//             className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md z-20"
//             style={{
//               backgroundColor: "#E5E5E5",
//               boxShadow: "inset -20px -6px 24px rgba(209, 209, 209, 0.07)",
//               filter: "drop-shadow(0px 10px 44px rgba(0, 0, 0, 0.09))",
//             }}
//             onClick={() => {
//               handleNextImage();
//               document.querySelector(
//                 `img[alt="Product Image"]:nth-child(1)`
//               ).style.opacity = 1;
//               document.querySelector(
//                 `img[alt="Product Image"]:nth-child(2)`
//               ).style.opacity = 0;
//             }}
//           >
//             <FaArrowRight className="text-black w-4 h-4" />
//           </button>
//         </div>

//         <div
//           className="hidden md:block"
//           style={{
//             width: "1px",
//             backgroundColor: "lightgray",
//             height: "832px",
//             marginLeft: "10px",
//           }}
//         ></div>

//         <div className="w-full md:w-1/2 space-y-4">
//           <div className="flex space-x-2">
//             <span
//               className="inline-block px-4 py-2 text-black rounded-full text-xs font-semibold border shadow-sm"
//               style={{ backgroundColor: "#E6E6E6" }}
//             >
//               {product?.category?.categoryName || "N/A"}
//             </span>
//             <span
//               className="inline-block px-4 py-2 text-black rounded-full text-xs font-semibold border shadow-sm"
//               style={{ backgroundColor: "#E6E6E6" }}
//             >
//               UNISEX
//             </span>
//           </div>

//           <h1 className="text-3xl font-bold">{product?.name}</h1>

//           <div className="text-2xl font-bold">
//             AED {product?.price}{" "}
//           </div>
//           <p className="text-sm text-gray-600">
//             Offers Remaining: {remainingOffers !== undefined ? remainingOffers : "Loading..."}
//           </p>

//           <div className="flex items-center text-gray-600 space-x-4 font-medium">
//             <div>
//               <span className="font-bold">SIZE</span>
//               <span className="inline-block ml-2 px-2 py-1 border border-pink-500 text-red-500 rounded">
//                 {product?.size?.sizeName || "N/A"}
//               </span>
//             </div>
//             <div>
//               <span className="font-bold">CONDITION: </span>
//               <span className="font-bold">
//                 {product?.condition?.conditionName}
//               </span>
//             </div>
//           </div>

//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={handleWish}
//               className="border-2 rounded-md px-6 py-3 flex items-center justify-center font-bold text-pink-500 hover:bg-[#E4086F] hover:text-white transition-all duration-300"
//               style={{
//                 borderColor: "#E4086F",
//                 height: "60px",
//                 width: "200px",
//                 borderRadius: "16px",
//               }}
//             >
//               <FaRegHeart className="mr-2 w-5 h-5" />
//               WISHLIST
//             </button>

//             <button
//               onClick={handleOpenOfferPopup}
//               className="group border-2 rounded-md px-6 py-3 flex items-center justify-center font-bold text-green-500 hover:bg-[#30BD75] hover:text-white transition-all duration-300"
//               style={{
//                 borderColor: "#30BD75",
//                 height: "60px",
//                 width: "377px",
//                 borderRadius: "16px",
//               }}
//             >
//               <FaHandshake
//                 className="mr-2 w-5 h-5 transition-all duration-300 group-hover:text-white"
//                 style={{
//                   fill: "none",
//                   stroke: "currentColor",
//                   strokeWidth: "25",
//                 }}
//               />
//               MAKE AN OFFER
//             </button>
//           </div>

//           <button
//             onClick={handleBuy}
//             className="mt-4 text-black w-full font-bold flex items-center justify-center bg-yellow-300 hover:bg-yellow-400 transition-all duration-300"
//             style={{
//               height: "72px",
//               borderRadius: "16px",
//             }}
//           >
//             <FaShoppingBag className="mr-2" />
//             ADD TO BAG
//           </button>

//           {product.openToRent === "Yes" && (
//             <div className="flex flex-col mt-2">
//               <div className="text-center font-bold text-black">
//                 Or Rent it for
//               </div>

//               <button
//                 onClick={handleOpenRentPopup}
//                 className="mt-2 text-black w-full font-bold bg-[#69D3FA] transition-all duration-300 hover:bg-[#9ee1fb]"
//                 style={{
//                   height: "72px",
//                   borderRadius: "16px",
//                 }}
//               >
//                 AED {product.pricePerDay}
//               </button>
//             </div>
//           )}

//           <div
//             className="mt-10 mb-0.75"
//             style={{ marginTop: "3rem", marginBottom: "0.75rem" }}
//           >
//             <p className="font-bold mb-3">Sold by</p>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <Link href={`/user_profile/${product?.seller?._id}`}>
//                   <Image
//                     src={product?.seller?.avatar || "/emojiKuku.png"}
//                     alt="Seller Avatar"
//                     className="object-contain w-12 h-12"
//                     width={48}
//                     height={48}
//                   />
//                 </Link>

//                 <div className="ml-3">
//                   <p className="font-bold">{product?.seller?.username}</p>
//                 </div>
//               </div>

//               <button
//                 className={`mt-2 px-4 sm:px-6 py-1 ${
//                   product?.seller?.followers?.includes(userID)
//                     ? "bg-gray-500"
//                     : "bg-custom-green"
//                 } text-white rounded-full`}
//                 onClick={() =>
//                   product?.seller?.followers?.includes(userID)
//                     ? handleFollow(
//                         product.seller._id,
//                         "unfollow",
//                         product?.seller?._id
//                       )
//                     : handleFollow(
//                         product.seller._id,
//                         "follow",
//                         product?.seller?._id
//                       )
//                 }
//                 disabled={loading}
//               >
//                 {product?.seller?.followers?.includes(userID)
//                   ? "Unfollow"
//                   : "Follow"}
//               </button>
//             </div>

//             <div className="mt-6">
//               <div className="flex items-center justify-between">
//                 <p
//                   className="text-black-500 text-sm font-medium"
//                   style={{ marginBottom: "10px", marginTop: "10px" }}
//                 >
//                   Seller rating based on 100+ reviews
//                 </p>
//                 <div className="flex items-center">
//                   <span className="text-black font-bold">
//                     {product?.seller?.rating}
//                   </span>
//                   <FaStar className="text-[#69D3FA] ml-1" />
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4">
//               <hr className="border-gray-300 my-3" />
//               <div className="flex items-center justify-between">
//                 <p
//                   className="text-black-500 text-sm font-medium"
//                   style={{ marginBottom: "10px", marginTop: "10px" }}
//                 >
//                   {product?.seller?.products.length} Products Sold
//                 </p>

//                 <button
//                   className="text-[#E4086F] text-sm font-bold"
//                   style={{ border: "none", background: "transparent" }}
//                 >
//                   View
//                 </button>
//               </div>
//             </div>

//             <div className="my-6">
//               <hr className="border-gray-300" />
//             </div>
//           </div>

//           {isRentPopupOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//               <div
//                 ref={modalRef}
//                 className="bg-white p-6 rounded-lg shadow-lg w-[500px] text-start max-h-[90vh] overflow-y-auto"
//               >
//                 <div>
//                   <span className="text-[#E4086F] text-[14px] font-karla font-bold capitalize tracking-[1.12px] break-words">
//                     Rental Price:
//                   </span>
//                   <span className="text-[#070707] text-[14px] font-karla font-bold capitalize tracking-[1.12px] break-words">
//                     AED {product.pricePerDay}
//                   </span>
//                 </div>

//                 <div className="mt-6 mb-4">
//                   {!showExpandedDateSelection ? (
//                     <div>
//                       <div className="text-[#070707] text-[15px] font-bold font-karla mb-3">
//                         Choose Date
//                       </div>

//                       <div className="mb-4">
//                         <div className="flex w-full overflow-hidden items-center justify-between border border-gray-300 rounded-md">
//                           <input
//                             type="text"
//                             placeholder="Choose your rental dates"
//                             value={
//                               isStartFormatted && isEndFormatted
//                                 ? `${isStartFormatted} - ${isEndFormatted}`
//                                 : ""
//                             }
//                             onClick={toggleCalendar}
//                             readOnly
//                             className="p-2 text-[#4C5C6B] text-[16px] font-karla font-normal outline-none cursor-pointer flex-1"
//                           />
//                           <div
//                             className="w-[34px] h-[30px] px-[2px] cursor-pointer"
//                             onClick={toggleCalendar}
//                           >
//                             <Image
//                               src="/Calendar.png"
//                               alt="Calendar Icon"
//                               width={34}
//                               height={30}
//                               className="w-[100%] h-[100%]"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div>
//                       <div className="text-[#070707] text-[15px] font-bold font-karla mb-3">
//                         Select Rental Period
//                       </div>

//                       <div className="grid grid-cols-2 gap-4 mb-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Start Date
//                           </label>
//                           <div className="flex w-full overflow-hidden items-center justify-between border border-gray-300 rounded-md">
//                             <input
//                               type="text"
//                               placeholder="Select start date"
//                               value={isStartFormatted}
//                               onClick={toggleCalendar}
//                               readOnly
//                               className="p-2 text-[#4C5C6B] text-[16px] font-karla font-normal outline-none cursor-pointer"
//                               style={{ width: "calc(100% - 34px)" }}
//                             />
//                             <div
//                               className="w-[34px] h-[30px] px-[2px] cursor-pointer"
//                               onClick={toggleCalendar}
//                             >
//                               <Image
//                                 src="/Calendar.png"
//                                 alt="Calendar Icon"
//                                 width={34}
//                                 height={30}
//                                 className="w-[100%] h-[100%]"
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             End Date
//                           </label>
//                           <div className="flex w-full overflow-hidden items-center justify-between border border-gray-300 rounded-md">
//                             <input
//                               type="text"
//                               placeholder="Select end date"
//                               value={isEndFormatted}
//                               onClick={toggleCalendar}
//                               readOnly
//                               className="p-2 text-[#4C5C6B] text-[16px] font-karla font-normal outline-none cursor-pointer"
//                               style={{ width: "calc(100% - 34px)" }}
//                             />
//                             <div
//                               className="w-[34px] h-[30px] px-[2px] cursor-pointer"
//                               onClick={toggleCalendar}
//                             >
//                               <Image
//                                 src="/Calendar.png"
//                                 alt="Calendar Icon"
//                                 width={34}
//                                 height={30}
//                                 className="w-[100%] h-[100%]"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {showCalendar && (
//                     <div className="mb-4">
//                       <CustomCalendar
//                         onSelectDateRange={handleDateRangeSelect}
//                         productData={productDetails}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div className="w-full text-[#525252] text-[15px] font-karla font-bold break-words mb-[15px] mt-[20px]">
//                   You need to make a one-time deposit for renting the item. The
//                   deposit will be refunded post the return of the item.
//                 </div>
//                 <div className="w-full text-[#E4086F] text-[15px] font-karla font-bold underline break-words mb-[15px]">
//                   View our rental policy
//                 </div>
//                 <button
//                   onClick={handleProceed}
//                   className={`px-4 py-2 w-full mb-2 text-[#E4086F] text-[20px] font-karla font-bold leading-[24px] break-words flex-1 h-[60px] bg-[#FDE504] rounded-[20px] flex justify-center items-center gap-[10px] ${
//                     isEndFormatted === "" || isStartFormatted === ""
//                       ? "opacity-50 cursor-not-allowed"
//                       : ""
//                   }`}
//                   disabled={isEndFormatted === "" || isStartFormatted === ""}
//                 >
//                   PROCEED
//                 </button>

//                 <button
//                   onClick={handleCloseRentPopup}
//                   className="w-full text-[#E4086F] text-[20px] font-karla font-bold leading-[24px] break-words flex-1 h-[60px] rounded-[20px] border border-[#F7B5D4] flex justify-center items-center gap-[10px]"
//                 >
//                   CANCEL
//                 </button>
//               </div>
//             </div>
//           )}

//           <OfferPopup
//             isOfferPopupOpen={isOfferPopupOpen}
//             product={product}
//             handlePriceSelection={handlePriceSelection}
//             handleOfferSubmit={handleOfferSubmit}
//             handleCloseOfferPopup={handleCloseOfferPopup}
//             selectedPrice={selectedPrice}
//             isSubmitDisabled={isSubmitDisabled}
//             remainingOffers={remainingOffers}
//           />

//           {errorPopupOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//               <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
//                 <p className="text-red-600 font-semibold text-center">
//                   {errorMessage}
//                 </p>
//                 <button
//                   onClick={() => setErrorPopupOpen(false)}
//                   className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}

//           {offerLimitPopupOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//               <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
//                 <p className="text-red-600 font-semibold text-center text-sm sm:text-base">
//                   You have reached the maximum limit of 3 offers for this product.
//                 </p>
//                 <button
//                   onClick={() => setOfferLimitPopupOpen(false)}
//                   className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300 text-sm sm:text-base"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;









"use client";

import Link from "next/link";
import Image from "next/image";
import CustomCalendar from "./CustomCalendar";
import { useState, useEffect, useRef } from "react";
import {
  FaStar,
  FaRegHeart,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cart/cartSlice";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import OfferPopup from "./OfferPopup";

const ProductCard = ({ product: productDetails }) => {
  const [product, setProduct] = useState(productDetails);
  const router = useRouter();
  const [isRentPopupOpen, setRentPopupOpen] = useState(false);
  const [rentalDate, setRentalDate] = useState("");
  const [isOfferPopupOpen, setOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isStartFormatted, setIsStartFormatted] = useState("");
  const [isEndFormatted, setIsEndFormatted] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showExpandedDateSelection, setShowExpandedDateSelection] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [offerLimitPopupOpen, setOfferLimitPopupOpen] = useState(false);
  const [remainingOffers, setRemainingOffers] = useState(0);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const details = useSelector((state) => state.auth.user);
  const userID = details?._id;

  const images = product?.images || [];

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
      console.log("Remaining offers for product", productId, ":", res.data.remainingOffers);
      setRemainingOffers(res.data.remainingOffers);
    } catch (error) {
      console.log("Error fetching remaining offer count", error);
    }
  };

  useEffect(() => {
    if (product?._id) {
      const rawToken = Cookies.get("auth");
      const token = rawToken ? JSON.parse(rawToken) : null;
      if (token) {
        fetchRemainingOfferCount(product._id);
      }
    }
  }, [product?._id]);

  const handleBuy = async () => {
    try {
      const rawToken = Cookies.get("auth");
      const token = rawToken ? JSON.parse(rawToken) : null;

      if (!token) {
        toast.success("Please Login!");
        setTimeout(() => {
          router.push("/login");
        }, 500);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(addToCart(product));
        router.push("/cart");
      } else {
        console.error("Failed to add product to cart:", response.statusText);
        setErrorMessage(`Failed to add to cart: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      console.error("An error occurred while adding product to cart:", error);
      setErrorMessage(error.response?.data?.message || "Failed to add to cart");
      setErrorPopupOpen(true);
    }
  };

  const handleWish = async () => {
    try {
      const rawToken = Cookies.get("auth");
      const token = rawToken ? JSON.parse(rawToken) : null;

      if (!token) {
        toast.success("Please Login!");
        setTimeout(() => {
          router.push("/login");
        }, 500);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/wishlist");
      } else {
        console.error("Failed to add product to wishlist:", response.statusText);
        setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      console.error("An error occurred while adding product to wishlist:", error);
      setErrorMessage(error.response?.data?.message || "Failed to add to wishlist");
      setErrorPopupOpen(true);
    }
  };

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

      const updatedFollowers = res.data.followers;

      setProduct((prevProduct) => {
        if (prevProduct.seller._id === sellerID) {
          return {
            ...prevProduct,
            seller: {
              ...prevProduct.seller,
              followers: updatedFollowers,
            },
          };
        }
        return prevProduct;
      });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error while following/unfollowing", error);
      toast.error("Failed to update follow status");
    } finally {
      setLoading(false);
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    if (!showCalendar && !showExpandedDateSelection) {
      setShowExpandedDateSelection(true);
    }
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const handleDateRangeSelect = (startDate, endDate) => {
    if (startDate) {
      setSelectedStartDate(startDate);
      const formattedStart = new Date(startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setIsStartFormatted(formattedStart);
      setIsDateSelected(true);
      setShowExpandedDateSelection(true);
    } else {
      setSelectedStartDate(null);
      setIsStartFormatted("");
      setIsDateSelected(false);
    }

    if (endDate) {
      setSelectedEndDate(endDate);
      const formattedEnd = new Date(endDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setIsEndFormatted(formattedEnd);
    } else {
      setSelectedEndDate(null);
      setIsEndFormatted("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseRentPopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenOfferPopup = () => {
    const rawToken = Cookies.get("auth");
    const token = rawToken ? JSON.parse(rawToken) : null;

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

    setOfferPopupOpen(true);
  };

  const handleCloseOfferPopup = () => {
    setOfferPopupOpen(false);
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
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to submit offer");
      setErrorPopupOpen(true);
    }
  };

  const handleOpenRentPopup = () => {
    setRentPopupOpen(true);
  };

  const handleCloseRentPopup = () => {
    setRentPopupOpen(false);
    setRentalDate("");
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setIsStartFormatted("");
    setIsEndFormatted("");
    setShowCalendar(false);
    setShowExpandedDateSelection(false);
  };

  const handleProceed = () => {
    if (!selectedStartDate || !selectedEndDate) {
      setErrorMessage("Please select both start and end dates");
      setErrorPopupOpen(true);
      return;
    }

    router.push(
      `/renting?startDate=${isStartFormatted}&endDate=${isEndFormatted}&productId=${product._id}`
    );
    handleCloseRentPopup();
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto pl-1 pr-6 font-karla">
      <div className="breadcrumb text-gray-500 text-sm mb-3 mt-2">
        <Link href="/" className="hover">
          Home
        </Link>
        {" | "}
        <Link href="/" className="hover">
          Categories
        </Link>{" "}
        |
        <Link href="/" className="hover">
          {product?.category?.categoryName}
        </Link>{" "}
        | <span className="font-bold">{product?.title}</span>
      </div>

      <hr className="border-gray-300 mb-4" />

      <div className="flex flex-col md:flex-row items-start gap-6 relative">
        <div className="w-full md:w-1/2 relative">
          <Image
            unoptimized
            width={650}
            height={500}
            src={images[currentImageIndex]}
            alt="Product Image"
            className="object-cover rounded-md"
            style={{
              width: "100%",
              height: "500px",
              maxWidth: "650px",
              zIndex: 1,
              position: "relative",
              transition: "opacity 0.5s ease-in-out",
            }}
          />
          <Image
            unoptimized
            width={650}
            height={500}
            src={images[(currentImageIndex + 1) % images.length]}
            alt="Product Image"
            className="object-cover rounded-md absolute top-0 left-0"
            style={{
              width: "100%",
              height: "500px",
              maxWidth: "650px",
              zIndex: 0,
              position: "absolute",
              opacity: 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
          <button
            className="absolute left-1 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md z-20"
            style={{
              backgroundColor: "#E5E5E5",
              boxShadow: "inset -20px -6px 24px rgba(209, 209, 209, 0.07)",
              filter: "drop-shadow(0px 10px 44px rgba(0, 0, 0, 0.09))",
            }}
            onClick={() => {
              handlePrevImage();
              document.querySelector(
                `img[alt="Product Image"]:nth-child(1)`
              ).style.opacity = 0;
              document.querySelector(
                `img[alt="Product Image"]:nth-child(2)`
              ).style.opacity = 1;
            }}
          >
            <FaArrowLeft className="text-black w-4 h-4" />
          </button>
          <button
            className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md z-20"
            style={{
              backgroundColor: "#E5E5E5",
              boxShadow: "inset -20px -6px 24px rgba(209, 209, 209, 0.07)",
              filter: "drop-shadow(0px 10px 44px rgba(0, 0, 0, 0.09))",
            }}
            onClick={() => {
              handleNextImage();
              document.querySelector(
                `img[alt="Product Image"]:nth-child(1)`
              ).style.opacity = 1;
              document.querySelector(
                `img[alt="Product Image"]:nth-child(2)`
              ).style.opacity = 0;
            }}
          >
            <FaArrowRight className="text-black w-4 h-4" />
          </button>
        </div>

        <div
          className="hidden md:block"
          style={{
            width: "1px",
            backgroundColor: "lightgray",
            height: "832px",
            marginLeft: "10px",
          }}
        ></div>

        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex space-x-2">
            <span
              className="inline-block px-4 py-2 text-black rounded-full text-xs font-semibold border shadow-sm"
              style={{ backgroundColor: "#E6E6E6" }}
            >
              {product?.category?.categoryName || "N/A"}
            </span>
            <span
              className="inline-block px-4 py-2 text-black rounded-full text-xs font-semibold border shadow-sm"
              style={{ backgroundColor: "#E6E6E6" }}
            >
              UNISEX
            </span>
          </div>

          <h1 className="text-3xl font-bold">{product?.name}</h1>

          <div className="text-2xl font-bold">
            AED {product?.price}{" "}
          </div>
          <p className="text-sm text-gray-600">
            Offers Remaining: {remainingOffers !== undefined ? remainingOffers : "Loading..."}
          </p>

          <div className="flex items-center text-gray-600 space-x-4 font-medium">
            <div>
              <span className="font-bold">SIZE</span>
              <span className="inline-block ml-2 px-2 py-1 border border-pink-500 text-red-500 rounded">
                {product?.size?.sizeName || "N/A"}
              </span>
            </div>
            <div>
              <span className="font-bold">CONDITION: </span>
              <span className="font-bold">
                {product?.condition?.conditionName}
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleWish}
              className="border-2 rounded-md px-6 py-3 flex items-center justify-center font-bold text-pink-500 hover:bg-[#E4086F] hover:text-white transition-all duration-300"
              style={{
                borderColor: "#E4086F",
                height: "60px",
                width: "200px",
                borderRadius: "16px",
              }}
            >
              <FaRegHeart className="mr-2 w-5 h-5" />
              WISHLIST
            </button>

            <button
              onClick={handleOpenOfferPopup}
              className="group border-2 rounded-md px-6 py-3 flex items-center justify-center font-bold text-green-500 hover:bg-[#30BD75] hover:text-white transition-all duration-300"
              style={{
                borderColor: "#30BD75",
                height: "60px",
                width: "377px",
                borderRadius: "16px",
              }}
            >
              <FaHandshake
                className="mr-2 w-5 h-5 transition-all duration-300 group-hover:text-white"
                style={{
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "25",
                }}
              />
              MAKE AN OFFER
            </button>
          </div>

          <button
            onClick={handleBuy}
            className="mt-4 text-black w-full font-bold flex items-center justify-center bg-yellow-300 hover:bg-yellow-400 transition-all duration-300"
            style={{
              height: "72px",
              borderRadius: "16px",
            }}
          >
            <FaShoppingBag className="mr-2" />
            ADD TO BAG
          </button>

          {product?.openToRent === "Yes" && (
            <div className="flex flex-col mt-2">
              <div className="text-center font-bold text-black">
                Or Rent it for
              </div>

              <button
                onClick={handleOpenRentPopup}
                className="mt-2 text-black w-full font-bold bg-[#69D3FA] transition-all duration-300 hover:bg-[#9ee1fb]"
                style={{
                  height: "72px",
                  borderRadius: "16px",
                }}
              >
                AED {product.pricePerDay}
              </button>
            </div>
          )}

          <div
            className="mt-10 mb-0.75"
            style={{ marginTop: "3rem", marginBottom: "0.75rem" }}
          >
            <p className="font-bold mb-3">Sold by</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href={`/user_profile/${product?.seller?._id}`}>
                  <Image
                    src={product?.seller?.avatar || "/emojiKuku.png"}
                    alt="Seller Avatar"
                    className="object-contain w-12 h-12"
                    width={48}
                    height={48}
                  />
                </Link>

                <div className="ml-3">
                  <p className="font-bold">{product?.seller?.username}</p>
                </div>
              </div>

              <button
                className={`mt-2 px-4 sm:px-6 py-1 ${
                  product?.seller?.followers?.includes(userID)
                    ? "bg-gray-500"
                    : "bg-custom-green"
                } text-white rounded-full`}
                onClick={() =>
                  product?.seller?.followers?.includes(userID)
                    ? handleFollow(
                        product.seller._id,
                        "unfollow",
                        product?.seller?._id
                      )
                    : handleFollow(
                        product.seller._id,
                        "follow",
                        product?.seller?._id
                      )
                }
                disabled={loading}
              >
                {product?.seller?.followers?.includes(userID)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p
                  className="text-black-500 text-sm font-medium"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                >
                  Seller rating based on 100+ reviews
                </p>
                <div className="flex items-center">
                  <span className="text-black font-bold">
                    {product?.seller?.rating}
                  </span>
                  <FaStar className="text-[#69D3FA] ml-1" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <hr className="border-gray-300 my-3" />
              <div className="flex items-center justify-between">
                <p
                  className="text-black-500 text-sm font-medium"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                >
                  {product?.seller?.products?.length} Products Sold
                </p>

                <button
                  className="text-[#E4086F] text-sm font-bold"
                  style={{ border: "none", background: "transparent" }}
                >
                  View
                </button>
              </div>
            </div>

            <div className="my-6">
              <hr className="border-gray-300" />
            </div>
          </div>

          {isRentPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div
                ref={modalRef}
                className="bg-white p-6 rounded-lg shadow-lg w-[500px] text-start max-h-[90vh] overflow-y-auto"
              >
                <div>
                  <span className="text-[#E4086F] text-[14px] font-karla font-bold capitalize tracking-[1.12px] break-words">
                    Rental Price:
                  </span>
                  <span className="text-[#070707] text-[14px] font-karla font-bold capitalize tracking-[1.12px] break-words">
                    AED {product?.pricePerDay}
                  </span>
                </div>

                <div className="mt-6 mb-4">
                  {!showExpandedDateSelection ? (
                    <div>
                      <div className="text-[#070707] text-[15px] font-bold font-karla mb-3">
                        Choose Date
                      </div>

                      <div className="mb-4">
                        <div className="flex w-full overflow-hidden items-center justify-between border border-gray-300 rounded-md">
                          <input
                            type="text"
                            placeholder="Choose your rental dates"
                            value={
                              isStartFormatted && isEndFormatted
                                ? `${isStartFormatted} - ${isEndFormatted}`
                                : ""
                            }
                            onClick={toggleCalendar}
                            readOnly
                            className="p-2 text-[#4C5C6B] text-[16px] font-karla font-normal outline-none cursor-pointer flex-1"
                          />
                          <div
                            className="w-[34px] h-[30px] px-[2px] cursor-pointer"
                            onClick={toggleCalendar}
                          >
                            <Image
                              src="/Calendar.png"
                              alt="Calendar Icon"
                              width={34}
                              height={30}
                              className="w-[100%] h-[100%]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[#070707] text-[15px] font-bold font-karla mb-3">
                        Select Rental Period
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <div className="flex w-full overflow-hidden items-center justify-between border border-gray-300 rounded-md">
                            <input
                              type="text"
                              placeholder="Select start date"
                              value={isStartFormatted}
                              onClick={toggleCalendar}
                              readOnly
                              className="p-2 text-[#4C5C6B] text-[16px] font-karla font-normal outline-none cursor-pointer"
                              style={{ width: "calc(100% - 34px)" }}
                            />
                            <div
                              className="w-[34px] h-[30px] px-[2px] cursor-pointer"
                              onClick={toggleCalendar}
                            >
                              <Image
                                src="/Calendar.png"
                                alt="Calendar Icon"
                                width={34}
                                height={30}
                                className="w-[100%] h-[100%]"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <div className="flex w-full overflow-hidden items-center justify-between border border-gray-300 rounded-md">
                            <input
                              type="text"
                              placeholder="Select end date"
                              value={isEndFormatted}
                              onClick={toggleCalendar}
                              readOnly
                              className="p-2 text-[#4C5C6B] text-[16px] font-karla font-normal outline-none cursor-pointer"
                              style={{ width: "calc(100% - 34px)" }}
                            />
                            <div
                              className="w-[34px] h-[30px] px-[2px] cursor-pointer"
                              onClick={toggleCalendar}
                            >
                              <Image
                                src="/Calendar.png"
                                alt="Calendar Icon"
                                width={34}
                                height={30}
                                className="w-[100%] h-[100%]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showCalendar && (
                    <div className="mb-4">
                      <CustomCalendar
                        onSelectDateRange={handleDateRangeSelect}
                        productData={productDetails}
                      />
                    </div>
                  )}
                </div>

                <div className="w-full text-[#525252] text-[15px] font-karla font-bold break-words mb-[15px] mt-[20px]">
                  You need to make a one-time deposit for renting the item. The
                  deposit will be refunded post the return of the item.
                </div>
                <div className="w-full text-[#E4086F] text-[15px] font-karla font-bold underline break-words mb-[15px]">
                  View our rental policy
                </div>
                <button
                  onClick={handleProceed}
                  className={`px-4 py-2 w-full mb-2 text-[#E4086F] text-[20px] font-karla font-bold leading-[24px] break-words flex-1 h-[60px] bg-[#FDE504] rounded-[20px] flex justify-center items-center gap-[10px] ${
                    isEndFormatted === "" || isStartFormatted === ""
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={isEndFormatted === "" || isStartFormatted === ""}
                >
                  PROCEED
                </button>

                <button
                  onClick={handleCloseRentPopup}
                  className="w-full text-[#E4086F] text-[20px] font-karla font-bold leading-[24px] break-words flex-1 h-[60px] rounded-[20px] border border-[#F7B5D4] flex justify-center items-center gap-[10px]"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
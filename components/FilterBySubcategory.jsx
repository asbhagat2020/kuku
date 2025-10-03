// "use client";

// import { useEffect, useState } from "react";
// import { Pagination } from "./Pagination";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";
// import { FcLike } from "react-icons/fc";
// import { GoHeart } from "react-icons/go";
// import Link from "next/link";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter, useSearchParams } from "next/navigation";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { useFilter } from "../context/FilterContext";
// import OfferPopup from "./OfferPopup";

// export const FilterBySubcategory = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
//   const [offerSubmitted, setOfferSubmitted] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const cardsPerPage = 9;

//   const filterContext = useFilter();
//   const contextFilteredProducts = filterContext?.filteredProducts || [];
//   const apiFilteredProducts = filterContext?.apiFilteredProducts || [];
//   const apiLoading = filterContext?.apiLoading || false;
//   const apiError = filterContext?.apiError || null;
//   const fetchProductsWithFilters = filterContext?.fetchProductsWithFilters;
//   const clearApiFilters = filterContext?.clearApiFilters;

//   const [followingIds, setFollowingIds] = useState([]);
//   const parentCategory = searchParams.get("parentCategory");
//   const categoryName = searchParams.get("categoryName");
//   const subCategoryName = searchParams.get("subCategoryName");

//   const hasFilterParams = Boolean(
//     parentCategory || categoryName || subCategoryName
//   );
//   const productsToDisplay = hasFilterParams
//     ? apiFilteredProducts
//     : contextFilteredProducts;

//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = productsToDisplay.slice(
//     indexOfFirstCard,
//     indexOfLastCard
//   );
//   const totalPages = Math.ceil(productsToDisplay.length / cardsPerPage);

//   const wishlist = useSelector((state) => state.wishlist.items);
//   const details = useSelector((state) => state.auth.user);
//   const userID = details?._id;

//   const [AllWishlist, setAllWishlist] = useState([]);

//   useEffect(() => {
//     if (fetchProductsWithFilters) {
//       fetchProductsWithFilters(parentCategory, categoryName, subCategoryName);
//     }
//   }, [parentCategory, categoryName, subCategoryName, fetchProductsWithFilters]);

//   useEffect(() => {
//     return () => {
//       if (!hasFilterParams && clearApiFilters) {
//         clearApiFilters();
//       }
//     };
//   }, [hasFilterParams, clearApiFilters]);

//   const getUserWishlistdata = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
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
//       console.log("Error", error);
//     }
//   };

//   const getUserFollowingList = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/following-ids`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setFollowingIds(res.data?.following);
//     } catch (error) {
//       console.log("Error", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getUserWishlistdata();
//       getUserFollowingList();
//     }
//   }, [token]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [productsToDisplay.length]);

//   const isProductInWishlist = (productId) => {
//     return AllWishlist.some((wishlistItem) => wishlistItem.productId === productId);
//   };

//   const isFollowingSeller = (sellerId) => {
//     return followingIds.some((id) => id === sellerId);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage);
//   };

//   const handleOpenOfferPopup = (card) => {
//     if (!token) {
//       toast.success("Please login");
//       setTimeout(() => {
//         router.push("/login");
//       }, 500);
//     } else {
//       setCurrentProduct(card);
//       setIsOfferPopupOpen(true);
//     }
//   };

//   const handleCloseOfferPopup = () => {
//     setIsOfferPopupOpen(false);
//     setSelectedPrice(null);
//     setIsSubmitDisabled(true);
//     setCurrentProduct(null);
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
//         seller: currentProduct.seller?._id || (currentProduct.admin?._id || "admin"),
//       };

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/add/${currentProduct._id}`,
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

//   const handleLikeClick = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/remove/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setAllWishlist((prevWishlist) =>
//           prevWishlist.filter((item) => item.productId !== id)
//         );
//       } else {
//         setErrorMessage(`Failed to remove from wishlist: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || error.message);
//       setErrorPopupOpen(true);
//     }
//   };

//   const handleLoginNotification = async (id) => {
//     if (!token) {
//       toast.success("Please Login First.");
//       setTimeout(() => {
//         router.push("/login");
//       }, 500);
//     } else {
//       try {
//         const token = JSON.parse(Cookies.get("auth"));
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
//         } else {
//           setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
//           setErrorPopupOpen(true);
//         }
//       } catch (error) {
//         setErrorMessage(error.response?.data?.message || error.message);
//         setErrorPopupOpen(true);
//       }
//     }
//   };

//   const handleToggleFollow = async (sellerId) => {
//     if (!token) {
//       toast.success("Please Login First.");
//       setTimeout(() => {
//         router.push("/login");
//       }, 500);
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/toggleFollowUser/${sellerId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         if (response.data.isFollowing) {
//           setFollowingIds((prev) => [...prev, sellerId]);
//         } else {
//           setFollowingIds((prev) => prev.filter((id) => id !== sellerId));
//         }
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error while toggling follow status", error);
//       toast.error("Failed to update follow status");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isAdminProduct = (product) => {
//     return !product.seller && product.admin;
//   };

//   const handleCartNavigation = () => {
//     toast.success("Please Login");
//     setTimeout(() => {
//       router.push("/login");
//     }, 500);
//   };

//   const handleClearFilters = () => {
//     if (clearApiFilters) {
//       clearApiFilters();
//     }
//     router.push("/selling-page");
//   };

//   const innerSliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     customPaging: (i) => (
//       <div
//         className="custom-dot"
//         style={{
//           height: "5px",
//           borderRadius: "20px",
//           background: "rgba(235, 235, 228, 0.4)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: "pointer",
//           marginTop: "-80px",
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

//   if (apiLoading) {
//     return (
//       <div className="p-3 sm:p-4 md:p-6 ml-0 sm:ml-4 md:ml-6 lg:ml-8 h-auto w-auto font-karla z-10">
//         <div className="flex flex-col items-center justify-center h-64 px-4">
//           <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-gray-900"></div>
//           <p className="text-lg sm:text-xl text-gray-500 mt-4 text-center">
//             Loading filtered products...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (apiError) {
//     return (
//       <div className="p-3 sm:p-4 md:p-6 ml-0 sm:ml-4 md:ml-6 lg:ml-8 h-auto w-auto font-karla z-10">
//         <div className="flex flex-col items-center justify-center h-64 px-4">
//           <p className="text-lg sm:text-xl text-red-500 mb-4 text-center">Error: {apiError}</p>
//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
//             <button
//               onClick={() => {
//                 if (fetchProductsWithFilters) {
//                   fetchProductsWithFilters(
//                     parentCategory,
//                     categoryName,
//                     subCategoryName
//                   );
//                 }
//               }}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
//             >
//               Retry
//             </button>
//             <button
//               onClick={handleClearFilters}
//               className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
//             >
//               View All Products
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-3 sm:p-4 md:p-6 ml-0 sm:ml-4 md:ml-6 lg:ml-8 h-auto w-auto font-karla z-10">
//       {hasFilterParams && (
//         <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-100 rounded-lg">
//           <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
//             <div className="w-full sm:w-auto">
//               <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
//                 Filtered Results
//               </h2>
//               <div className="flex flex-wrap gap-1 sm:gap-2">
//                 {parentCategory && (
//                   <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
//                     {parentCategory}
//                   </span>
//                 )}
//                 {categoryName && (
//                   <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
//                     {categoryName}
//                   </span>
//                 )}
//                 {subCategoryName && (
//                   <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
//                     {subCategoryName}
//                   </span>
//                 )}
//               </div>
//               <p className="text-xs sm:text-sm text-gray-600 mt-2">
//                 Showing {productsToDisplay.length} product
//                 {productsToDisplay.length !== 1 ? "s" : ""}
//               </p>
//             </div>
//             <button
//               onClick={handleClearFilters}
//               className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm whitespace-nowrap"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       )}

//       {productsToDisplay.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-64 px-4">
//           <p className="text-lg sm:text-xl text-gray-500 mb-4 text-center">
//             {hasFilterParams
//               ? "No products found for the selected filters"
//               : "No products found matching your filters"}
//           </p>
//           <Image
//             src="/no-results.svg"
//             alt="No results"
//             width={150}
//             height={150}
//             className="opacity-50 w-24 h-24 sm:w-36 sm:h-36 md:w-[150px] md:h-[150px]"
//           />
//           <button
//             onClick={handleClearFilters}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
//           >
//             View All Products
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6">
//           {currentCards.map((card) => (
//             <div key={card._id} className="flex flex-col max-w-sm mx-auto w-full">
//               <div className="flex justify-between items-center space-x-2 sm:space-x-4">
//                 <div className="flex space-x-2 sm:space-x-4 items-center min-w-0 flex-1">
//                   {!isAdminProduct(card) ? (
//                     <Link href={`/user_profile/${card?.seller?._id}`}>
//                       <Image
//                         src={card?.seller?.avatar || "/profile_icon.svg"}
//                         alt="User avatar"
//                         width={48}
//                         height={48}
//                         className="object-contain h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex-shrink-0"
//                       />
//                     </Link>
//                   ) : (
//                     <Image
//                       src="/profile_icon.svg"
//                       alt="Admin avatar"
//                       width={48}
//                       height={48}
//                       className="object-contain h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex-shrink-0"
//                     />
//                   )}
//                   <p className="font-bold text-xs sm:text-sm truncate">
//                     {isAdminProduct(card)
//                       ? card.admin?.name || "Admin"
//                       : card?.seller?.username}
//                   </p>
//                 </div>
//                 {!isAdminProduct(card) && card?.seller?._id && (
//                   <button
//                     className={`px-3 sm:px-4 md:px-6 py-1 text-xs sm:text-sm ${
//                       isFollowingSeller(card?.seller?._id)
//                         ? "bg-gray-500"
//                         : "bg-custom-green"
//                     } text-white rounded-full transition-colors duration-300 flex-shrink-0`}
//                     onClick={() => handleToggleFollow(card?.seller?._id)}
//                     disabled={loading}
//                   >
//                     {isFollowingSeller(card?.seller?._id)
//                       ? "Unfollow"
//                       : "Follow"}
//                   </button>
//                 )}
//               </div>

//               <div className="relative mt-3 sm:mt-4">
//                 <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10 hover:bg-gray-300 transition-colors duration-300">
//                   {isProductInWishlist(card._id) ? (
//                     <FcLike
//                       className="text-lg sm:text-xl md:text-2xl text-red-500"
//                       onClick={() => handleLikeClick(card._id)}
//                     />
//                   ) : (
//                     <GoHeart
//                       className="text-lg sm:text-xl md:text-2xl text-gray-300"
//                       onClick={() => handleLoginNotification(card._id)}
//                     />
//                   )}
//                 </div>

//                 <Slider {...innerSliderSettings}>
//                   {card.images.map((imgSrc, imgIndex) => (
//                     <div
//                       key={imgIndex}
//                       className="w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded-md"
//                     >
//                       <Image
//                         src={imgSrc}
//                         width={307}
//                         height={390}
//                         alt={`${card.name} - image ${imgIndex + 1}`}
//                         className="w-full h-full object-cover rounded-xl"
//                       />
//                     </div>
//                   ))}
//                 </Slider>

//                 <div className="absolute w-full bottom-4 sm:bottom-4 flex justify-evenly items-center px-2 sm:px-4 gap-2">
//                   {token ? (
//                     <Link
//                       href={`/selling-page/${card._id}`}
//                       className="w-[70%]"
//                     >
//                       <button className="w-full p-2 py-2 sm:py-3 md:py-[15px] text-xs sm:text-sm md:text-base bg-custom-yellow text-black rounded-xl sm:rounded-2xl font-bold mr-1 hover:bg-yellow-400 transition-colors duration-300">
//                         Buy Now
//                       </button>
//                     </Link>
//                   ) : (
//                     <button
//                       className="w-[70%] p-2 py-2 sm:py-3 md:py-[15px] text-xs sm:text-sm md:text-base bg-custom-yellow text-black rounded-xl sm:rounded-2xl font-bold mr-1 hover:bg-yellow-400 transition-colors duration-300"
//                       onClick={handleCartNavigation}
//                     >
//                       Buy Now
//                     </button>
//                   )}

//                   <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors duration-300">
//                     <Image
//                       unoptimized
//                       width={30}
//                       height={30}
//                       src="/handshake_img.png"
//                       alt="Open Offer Popup"
//                       className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-[30px] md:h-[30px]"
//                       onClick={() => handleOpenOfferPopup(card)}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <h5 className="text-xs sm:text-sm font-medium text-gray-700 mt-3 sm:mt-4 line-clamp-2">
//                 {card.name}
//               </h5>
//               <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
//                 AED {card.price}
//               </h2>

//               <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
//                 {card.category?.parentCategory && (
//                   <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
//                     {card.category.parentCategory}
//                   </span>
//                 )}
//                 {card.size?.sizeName && (
//                   <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
//                     Size: {card.size.sizeName}
//                   </span>
//                 )}
//                 {card.condition?.conditionName && (
//                   <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
//                     {card.condition.conditionName}
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {productsToDisplay.length > 0 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           handleNextPage={handleNextPage}
//           handlePrevPage={handlePrevPage}
//           handlePageChange={handlePageChange}
//         />
//       )}

//       <OfferPopup
//         isOfferPopupOpen={isOfferPopupOpen}
//         product={currentProduct}
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
//     </div>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useFilter } from "../context/FilterContext";
import OfferPopup from "./OfferPopup";

export const FilterBySubcategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [offerLimitPopupOpen, setOfferLimitPopupOpen] = useState(false);
  const [remainingOffers, setRemainingOffers] = useState({});
  const cardsPerPage = 9;

  const filterContext = useFilter();
  const contextFilteredProducts = filterContext?.filteredProducts || [];
  const apiFilteredProducts = filterContext?.apiFilteredProducts || [];
  const apiLoading = filterContext?.apiLoading || false;
  const apiError = filterContext?.apiError || null;
  const fetchProductsWithFilters = filterContext?.fetchProductsWithFilters;
  const clearApiFilters = filterContext?.clearApiFilters;

  const [followingIds, setFollowingIds] = useState([]);
  const parentCategory = searchParams.get("parentCategory");
  const categoryName = searchParams.get("categoryName");
  const subCategoryName = searchParams.get("subCategoryName");

  const hasFilterParams = Boolean(
    parentCategory || categoryName || subCategoryName
  );
  const productsToDisplay = hasFilterParams
    ? apiFilteredProducts
    : contextFilteredProducts;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = productsToDisplay.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const totalPages = Math.ceil(productsToDisplay.length / cardsPerPage);

  const wishlist = useSelector((state) => state.wishlist.items);
  const details = useSelector((state) => state.auth.user);
  const userID = details?._id;

  const [AllWishlist, setAllWishlist] = useState([]);

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
      
      setRemainingOffers((prev) => ({
        ...prev,
        [productId]: res.data.remainingOffers,
      }));
    } catch (error) {
      console.log("Error fetching remaining offer count", error);
    }
  };

  useEffect(() => {
    if (fetchProductsWithFilters) {
      fetchProductsWithFilters(parentCategory, categoryName, subCategoryName);
    }
  }, [parentCategory, categoryName, subCategoryName, fetchProductsWithFilters]);

  useEffect(() => {
    if (token) {
      getUserWishlistdata();
      getUserFollowingList();
      // Fetch remaining offer count for each product
      productsToDisplay.forEach((product) => {
        fetchRemainingOfferCount(product._id);
      });
    }
  }, [token, productsToDisplay]);

  useEffect(() => {
    setCurrentPage(1);
  }, [productsToDisplay.length]);

  const getUserWishlistdata = async () => {
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
      setAllWishlist(res.data.wishlist.products);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getUserFollowingList = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/following-ids`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowingIds(res.data?.following);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const isProductInWishlist = (productId) => {
    return AllWishlist.some(
      (wishlistItem) => wishlistItem.productId === productId
    );
  };

  const isFollowingSeller = (sellerId) => {
    return followingIds.some((id) => id === sellerId);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleOpenOfferPopup = async (card) => {
    if (!token) {
      toast.success("Please login");
      setTimeout(() => {
        router.push("/login");
      }, 500);
      return;
    }

    // Check remaining offers
    const remaining = remainingOffers[card._id] || 0;
    if (remaining <= 0) {
      setErrorMessage(
        "You have reached the maximum limit of 3 offers for this product."
      );
      setOfferLimitPopupOpen(true);
      return;
    }

    setCurrentProduct(card);
    setIsOfferPopupOpen(true);
  };

  const handleCloseOfferPopup = () => {
    setIsOfferPopupOpen(false);
    setSelectedPrice(null);
    setIsSubmitDisabled(true);
    setCurrentProduct(null);
  };

  const handlePriceSelection = (price) => {
    const parsedPrice = parseFloat(price);
    setSelectedPrice(parsedPrice);
    if (
      parsedPrice &&
      !isNaN(parsedPrice) &&
      parsedPrice >= currentProduct?.price * 0.7
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleOfferSubmit = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const data = {
        productId: currentProduct._id,
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
        // Refresh remaining offer count
        fetchRemainingOfferCount(currentProduct._id);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to submit offer"
      );
      setErrorPopupOpen(true);
    }
  };

  const handleLikeClick = async (id) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
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
      } else {
        setErrorMessage(
          `Failed to remove from wishlist: ${response.data.message}`
        );
        setErrorPopupOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setErrorPopupOpen(true);
    }
  };

  const handleLoginNotification = async (id) => {
    if (!token) {
      toast.success("Please Login First.");
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } else {
      try {
        const token = JSON.parse(Cookies.get("auth"));
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
        } else {
          setErrorMessage(
            `Failed to add to wishlist: ${response.data.message}`
          );
          setErrorPopupOpen(true);
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || error.message);
        setErrorPopupOpen(true);
      }
    }
  };

  const handleToggleFollow = async (sellerId) => {
    if (!token) {
      toast.success("Please Login First.");
      setTimeout(() => {
        router.push("/login");
      }, 500);
      return;
    }

    setLoading(true);
    try {
      const token = JSON.parse(Cookies.get("auth"));
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
        if (response.data.isFollowing) {
          setFollowingIds((prev) => [...prev, sellerId]);
        } else {
          setFollowingIds((prev) => prev.filter((id) => id !== sellerId));
        }
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error while toggling follow status", error);
      toast.error("Failed to update follow status");
    } finally {
      setLoading(false);
    }
  };

  const isAdminProduct = (product) => {
    return !product.seller && product.admin;
  };

  const handleCartNavigation = () => {
    toast.success("Please Login");
    setTimeout(() => {
      router.push("/login");
    }, 500);
  };

  const handleClearFilters = () => {
    if (clearApiFilters) {
      clearApiFilters();
    }
    router.push("/selling-page");
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
        className="custom-dot"
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

  if (apiLoading) {
    return (
      <div className="p-3 sm:p-4 md:p-6 ml-0 sm:ml-4 md:ml-6 lg:ml-8 h-auto w-auto font-karla z-10">
        <div className="flex flex-col items-center justify-center h-64 px-4">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-gray-900"></div>
          <p className="text-lg sm:text-xl text-gray-500 mt-4 text-center">
            Loading filtered products...
          </p>
        </div>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="p-3 sm:p-4 md:p-6 ml-0 sm:ml-4 md:ml-6 lg:ml-8 h-auto w-auto font-karla z-10">
        <div className="flex flex-col items-center justify-center h-64 px-4">
          <p className="text-lg sm:text-xl text-red-500 mb-4 text-center">
            Error: {apiError}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                if (fetchProductsWithFilters) {
                  fetchProductsWithFilters(
                    parentCategory,
                    categoryName,
                    subCategoryName
                  );
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              Retry
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              View All Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 ml-0 sm:ml-4 md:ml-6 lg:ml-8 h-auto w-auto font-karla z-10">
      {hasFilterParams && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-100 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
            <div className="w-full sm:w-auto">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                Filtered Results
              </h2>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {parentCategory && (
                  <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {parentCategory}
                  </span>
                )}
                {categoryName && (
                  <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {categoryName}
                  </span>
                )}
                {subCategoryName && (
                  <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {subCategoryName}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Showing {productsToDisplay.length} product
                {productsToDisplay.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={handleClearFilters}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm whitespace-nowrap"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {productsToDisplay.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 px-4">
          <p className="text-lg sm:text-xl text-gray-500 mb-4 text-center">
            {hasFilterParams
              ? "No products found for the selected filters"
              : "No products found matching your filters"}
          </p>
          <Image
            src="/no-results.svg"
            alt="No results"
            width={150}
            height={150}
            className="opacity-50 w-24 h-24 sm:w-36 sm:h-36 md:w-[150px] md:h-[150px]"
          />
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6">
          {currentCards.map((card) => (
            <div
              key={card._id}
              className="flex flex-col max-w-sm mx-auto w-full"
            >
              <div className="flex justify-between items-center space-x-2 sm:space-x-4">
                <div className="flex space-x-2 sm:space-x-4 items-center min-w-0 flex-1">
                  {!isAdminProduct(card) ? (
                    <div
                      className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer"
                      onClick={
                        token
                          ? undefined
                          : () => {
                              toast.success("Please Login First.");
                              setTimeout(() => {
                                router.push("/login");
                              }, 500);
                            }
                      }
                    >
                      {token ? (
                        <Link href={`/user_profile/${card?.seller?._id}`}>
                          <Image
                            src={card?.seller?.avatar || "/profile_icon.svg"}
                            alt="User avatar"
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </Link>
                      ) : (
                        <Image
                          src={card?.seller?.avatar || "/profile_icon.svg"}
                          alt="User avatar"
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image
                        src="/profile_icon.svg"
                        alt="Admin avatar"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="font-bold text-xs sm:text-sm truncate">
                    {isAdminProduct(card)
                      ? card.admin?.name || "Admin"
                      : card?.seller?.username}
                  </p>
                </div>
                {!isAdminProduct(card) && card?.seller?._id && (
                  <button
                    className={`px-3 sm:px-4 md:px-6 py-1 text-xs sm:text-sm ${
                      isFollowingSeller(card?.seller?._id)
                        ? "bg-gray-500"
                        : "bg-custom-green"
                    } text-white rounded-full transition-colors duration-300 flex-shrink-0`}
                    onClick={() => handleToggleFollow(card?.seller?._id)}
                    disabled={loading}
                  >
                    {isFollowingSeller(card?.seller?._id)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                )}
              </div>

              <div className="relative mt-3 sm:mt-4">
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10 hover:bg-gray-300 transition-colors duration-300">
                  {isProductInWishlist(card._id) ? (
                    <FcLike
                      className="text-lg sm:text-xl md:text-2xl text-red-500"
                      onClick={() => handleLikeClick(card._id)}
                    />
                  ) : (
                    <GoHeart
                      className="text-lg sm:text-xl md:text-2xl text-gray-300"
                      onClick={() => handleLoginNotification(card._id)}
                    />
                  )}
                </div>

                <Slider {...innerSliderSettings}>
                  {card.images.map((imgSrc, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded-md"
                    >
                      <Image
                        src={imgSrc}
                        width={307}
                        height={390}
                        alt={`${card.name} - image ${imgIndex + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </Slider>

                <div className="absolute w-full bottom-4 sm:bottom-4 flex justify-evenly items-center px-2 sm:px-4 gap-2">
                  {token ? (
                    <Link
                      href={`/selling-page/${card._id}`}
                      className="w-[70%]"
                    >
                      <button className="w-full p-2 py-2 sm:py-3 md:py-[15px] text-xs sm:text-sm md:text-base bg-custom-yellow text-black rounded-xl sm:rounded-2xl font-bold mr-1 hover:bg-yellow-400 transition-colors duration-300">
                        Buy Now
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="w-[70%] p-2 py-2 sm:py-3 md:py-[15px] text-xs sm:text-sm md:text-base bg-custom-yellow text-black rounded-xl sm:rounded-2xl font-bold mr-1 hover:bg-yellow-400 transition-colors duration-300"
                      onClick={handleCartNavigation}
                    >
                      Buy Now
                    </button>
                  )}

                  <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors duration-300">
                    <Image
                      unoptimized
                      width={30}
                      height={30}
                      src="/handshake_img.png"
                      alt="Open Offer Popup"
                      className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-[30px] md:h-[30px]"
                      onClick={() => handleOpenOfferPopup(card)}
                    />
                  </div>
                </div>
              </div>

              <h5 className="text-xs sm:text-sm font-medium text-gray-700 mt-3 sm:mt-4 line-clamp-2">
                {card.name}
              </h5>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                AED {card.price}
              </h2>
              {/* <p className="text-sm text-gray-600">
                Offers Remaining:{" "}
                {remainingOffers[card._id] !== undefined
                  ? remainingOffers[card._id]
                  : "Loading..."}
              </p> */}
              <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
                {card.category?.parentCategory && (
                  <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
                    {card.category.parentCategory}
                  </span>
                )}
                {card.size?.sizeName && (
                  <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
                    Size: {card.size.sizeName}
                  </span>
                )}
                {card.condition?.conditionName && (
                  <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
                    {card.condition.conditionName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {productsToDisplay.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handlePageChange={handlePageChange}
        />
      )}

      <OfferPopup
        isOfferPopupOpen={isOfferPopupOpen}
        product={currentProduct}
        handlePriceSelection={handlePriceSelection}
        handleOfferSubmit={handleOfferSubmit}
        handleCloseOfferPopup={handleCloseOfferPopup}
        selectedPrice={selectedPrice}
        isSubmitDisabled={isSubmitDisabled}
        remainingOffers={remainingOffers[currentProduct?._id] || 0}
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
    </div>
  );
};

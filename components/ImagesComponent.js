// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Pagination } from "./Pagination"; // Import the Pagination component
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";
// import { OfferPopup } from "./OfferPopup";
// import { FcLike } from "react-icons/fc";
// import { GoHeart } from "react-icons/go";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleWishlist } from "@/store/wishlist/wishlistSlice";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import { showSuccessNotification } from "@/utils/Notification/notif";

// export const ImagesComponent = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
//   const [offerSubmitted, setOfferSubmitted] = useState(false);
//   const [likedCards, setLikedCards] = useState({});
//   const [data, setData] = useState([]);
//   const [selectedProductId, setSelectedProductId] = useState([]);
//   const [selectedSellerId, setSelectedSellerId] = useState([]);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const router = useRouter();
//   const cardsPerPage = 9;

//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

//   const [isLiked, setIsLiked] = useState(false);
//   const dispatch = useDispatch();
//   const wishlist = useSelector((state) => state.wishlist.items);
//   const handleClick = () => {
//     setIsLiked(!isLiked);
//   };
//   const totalPages = Math.ceil(data.length / cardsPerPage);

//   const details = useSelector((state) => state.auth.user);
//   const userID = details?._id;

//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;

//   useEffect(() => {
//     console.log("kjjwkehfkjwekfj");
//     fetchProducts();
//   }, []);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage);
//   };

//   const handleOpenOfferPopup = (id, sellerid) => {
//     setSelectedProductId(id);
//     setSelectedSellerId(sellerid);
//     setIsOfferPopupOpen(true);
//   };

//   const handleCloseOfferPopup = () => {
//     setIsOfferPopupOpen(false);
//   };

//   const handleOfferSubmit = async (price) => {
//     // Add your submission logic here
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const data = { offerPrice: price, seller: selectedSellerId };

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/add/${selectedProductId}`,
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
//       } else {
//         console.error("Failed to submit offer:", response.statusText);
//         setErrorMessage(`Failed to submit offer: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error.message);
//       setErrorMessage(` ${error.response?.data?.message || error.message}`);
//       setErrorPopupOpen(true);
//     }
//   };

//   // const handleLikeClick = (cardId) => {
//   //   setLikedCards((prevLikedCards) => ({
//   //     ...prevLikedCards,
//   //     [cardId]: !prevLikedCards[cardId],
//   //   }));
//   // };

//   // const handleLikeClick = (id) => {
//   //   dispatch(addToWishlist(id));
//   // };
//   const handleLikeClick = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/wishlist/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         router.push("/wishlist");
//       } else {
//         setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || error.message);
//       setErrorPopupOpen(true);
//     }
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
//         className={`custom-dot`}
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

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
//       );
//       const datavalue = response.data;
//       console.log(datavalue, "dataValue");
//       setData(datavalue || []);
//     } catch (error) {
//       alert(error.message);
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

//       let updatedFollowers = res.data.followers;
//       setData(
//         data.map((item) => {
//           if (item.seller._id === sellerID) {
//             return {
//               ...item,
//               seller: {
//                 ...item.seller,
//                 followers: updatedFollowers,
//               },
//             };
//           }
//           return item;
//         })
//       );
//     } catch (error) {
//       console.error("Error while following/unfollowing", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   console.log(data, "ssssssss");
//   return (
//     <div className="p-6 ml-8 h-auto w-auto font-karla z-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {data.map((card) => (
//           <div key={card._id} className="flex flex-col">
//             <div className="flex justify-between items-center space-x-4">
//               <div className="flex space-x-4 items-center">
//                 <Link href={`/user_profile/${card?.seller?._id}`}>
//                   <img
//                     src={card?.seller?.avatar || "/profile_icon.svg"}
//                     alt="User avatar"
//                     className="object-contain h-12 w-12"
//                   />
//                 </Link>
//                 <p className="font-bold text-sm">{card?.seller?.username}</p>
//               </div>
//               <button
//                 className={`mt-2 px-4 sm:px-6 py-1 ${
//                   card?.seller?.followers?.includes(userID)
//                     ? "bg-gray-500"
//                     : "bg-custom-green"
//                 } text-white rounded-full`}
//                 onClick={() =>
//                   card?.seller?.followers?.includes(userID)
//                     ? handleFollow(
//                         card.seller._id,
//                         "unfollow",
//                         card?.seller?._id
//                       )
//                     : handleFollow(card?.seller?._id, "follow", card?.seller?._id)
//                 }
//                 disabled={loading}
//               >
//                 {card?.seller?.followers?.includes(userID)
//                   ? "Unfollow"
//                   : "Follow"}
//               </button>
//             </div>

//             <div className="relative mt-4">
//               {/* Heart icon for like functionality */}
//               <Link href="/wishlist">
//                 <div
//                   className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10"
//                   onClick={() => handleLikeClick(card?._id)}
//                 >
//                   {wishlist.includes(card._id) ? (
//                     <FcLike className="text-2xl text-red-500" /> // Filled heart for wishlist items
//                   ) : (
//                     <GoHeart className="text-2xl text-gray-300" /> // Outline heart for non-wishlist items
//                   )}
//                 </div>
//               </Link>
//               {/* Slider for product images */}
//               <Slider {...innerSliderSettings}>
//                 {card.images.map((imgSrc, imgIndex) => (
//                   <div
//                     key={imgIndex}
//                     className="w-[307px] h-[390px] flex items-center justify-center overflow-hidden rounded-md " // Adds border and rounded corners
//                   >
//                     <Image
//                       src={imgSrc}
//                       width={307}
//                       height={390}
//                       layout="fixed" // Ensures consistent image dimensions
//                       alt=""
//                       className="w-full h-full object-cover rounded-xl" // Ensures the image matches the rounded corners
//                     />
//                   </div>
//                 ))}
//               </Slider>

//               {/* Buy Now button and handshake icon - fixed position */}
//               <div className="absolute w-full bottom-4 flex justify-evenly items-center px-4">
//                 {token ? (
//                   <Link href={`/selling-page/${card._id}`} className="w-[70%]">
//                     <button className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1">
//                       Buy Now
//                     </button>
//                   </Link>
//                 ) : (
//                   <button
//                     className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black  rounded-2xl font-bold mr-1 "
//                     onClick={() => showSuccessNotification("Please Login!")}
//                   >
//                     Buy Now
//                   </button>
//                 )}
//                 <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full">
//                   <Image
//                     unoptimized
//                     width={30}
//                     height={30}
//                     src="handshake_img.png"
//                     alt="Open Offer Popup"
//                     className="cursor-pointer"
//                     onClick={() =>
//                       handleOpenOfferPopup(card._id, card.seller._id)
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <OfferPopup
//               isOpen={isOfferPopupOpen}
//               onClose={handleCloseOfferPopup}
//               onSubmit={handleOfferSubmit}
//             />

//             <h5 className="text-sm font-medium text-gray-700 mt-4">
//               {card.name}
//             </h5>
//             <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
//               {card.price}
//             </h2>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Component */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         handleNextPage={handleNextPage}
//         handlePrevPage={handlePrevPage}
//         handlePageChange={handlePageChange}
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


// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Pagination } from "./Pagination"; // Import the Pagination component
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";
// import { OfferPopup } from "./OfferPopup";
// import { FcLike } from "react-icons/fc";
// import { GoHeart } from "react-icons/go";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleWishlist } from "@/store/wishlist/wishlistSlice";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// // import { showSuccessNotification } from "@/utils/Notification/notif";
// import toast from "react-hot-toast";

// export const ImagesComponent = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
//   const [offerSubmitted, setOfferSubmitted] = useState(false);
//   const [likedCards, setLikedCards] = useState({});
//   const [data, setData] = useState([]);
//   const [selectedProductId, setSelectedProductId] = useState([]);
//   const [selectedSellerId, setSelectedSellerId] = useState([]);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const router = useRouter();
//   const cardsPerPage = 9;

//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

//   const [isLiked, setIsLiked] = useState(false);
//   const dispatch = useDispatch();
//   const wishlist = useSelector((state) => state.wishlist.items);
//   const handleClick = () => {
//     setIsLiked(!isLiked);
//   };
//   const totalPages = Math.ceil(data.length / cardsPerPage);

//   const details = useSelector((state) => state.auth.user);
//   const userID = details?._id;

//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;

//   useEffect(() => {
//     console.log("kjjwkehfkjwekfj");
//     fetchProducts();
//   }, []);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage);
//   };

//   const handleOpenOfferPopup = (id, sellerid) => {
//     setSelectedProductId(id);
//     setSelectedSellerId(sellerid || "admin"); // Default to "admin" if no seller ID
//     setIsOfferPopupOpen(true);
//   };

//   const handleCloseOfferPopup = () => {
//     setIsOfferPopupOpen(false);
//   };

//   const handleOfferSubmit = async (price) => {
//     // Add your submission logic here
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const data = { offerPrice: price, seller: selectedSellerId };

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/add/${selectedProductId}`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("response", response);

//       if (response.status === 200) {
//         setOfferSubmitted(true);
//         handleCloseOfferPopup();
//       } else {
//         console.error("Failed to submit offer:", response);
//         setErrorMessage(`Failed to submit offer: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error.message);
//       setErrorMessage(` ${error.response?.data?.message || error.message}`);
//       setErrorPopupOpen(true);
//     }
//   };


//   const handleLikeClick = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
//         { productId: id },  // Send productId in the body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       if (response.status === 201) {
//         router.push("/wishlist");
//       } else {
//         setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || error.message);
//       setErrorPopupOpen(true);
//     }
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
//         className={`custom-dot`}
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

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
//       );
//       const datavalue = response.data?.filter((item) => item?.approval.status === "Accepted");;
//       console.log(datavalue, "dataValue");
//       setData(datavalue || []);
//     } catch (error) {
//       alert(error.message);
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

//       let updatedFollowers = res.data.followers;
//       setData(
//         data.map((item) => {
//           if (item.seller?._id === sellerID) {
//             return {
//               ...item,
//               seller: {
//                 ...item.seller,
//                 followers: updatedFollowers,
//               },
//             };
//           }
//           return item;
//         })
//       );
//     } catch (error) {
//       console.error("Error while following/unfollowing", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check if a product is admin-created
//   const isAdminProduct = (product) => {
//     return !product.seller && product.admin;
//   };

//   return (
//     <div className="p-6 ml-8 h-auto w-auto font-karla z-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {data.map((card) => (
//           <div key={card._id} className="flex flex-col">
//             <div className="flex justify-between items-center space-x-4">
//               <div className="flex space-x-4 items-center">
//                 {!isAdminProduct(card) ? (
//                   <Link href={`/user_profile/${card?.seller?._id}`}>
//                     <img
//                       src={card?.seller?.avatar || "/profile_icon.svg"}
//                       alt="User avatar"
//                       className="object-contain h-12 w-12"
//                     />
//                   </Link>
//                 ) : (
//                   <img
//                     src={"/profile_icon.svg"}
//                     alt="Admin avatar"
//                     className="object-contain h-12 w-12"
//                   />
//                 )}
//                 <p className="font-bold text-sm">
//                   {isAdminProduct(card)
//                     ? card.admin?.name || "Admin"
//                     : card?.seller?.username}
//                 </p>
//               </div>
//               {!isAdminProduct(card) && (
//                 <button
//                   className={`mt-2 px-4 sm:px-6 py-1 ${card?.seller?.followers?.includes(userID)
//                     ? "bg-gray-500"
//                     : "bg-custom-green"
//                     } text-white rounded-full`}
//                   onClick={() =>
//                     card?.seller?.followers?.includes(userID)
//                       ? handleFollow(
//                         card.seller._id,
//                         "unfollow",
//                         card?.seller?._id
//                       )
//                       : handleFollow(card?.seller?._id, "follow", card?.seller?._id)
//                   }
//                   disabled={loading}
//                 >
//                   {card?.seller?.followers?.includes(userID)
//                     ? "Unfollow"
//                     : "Follow"}
//                 </button>
//               )}
//             </div>

//             <div className="relative mt-4">
//               {/* Heart icon for like functionality */}
//               <Link href="/wishlist">
//                 <div
//                   className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10"
//                   onClick={() => handleLikeClick(card?._id)}
//                 >
//                   {wishlist.includes(card._id) ? (
//                     <FcLike className="text-2xl text-red-500" /> // Filled heart for wishlist items
//                   ) : (
//                     <GoHeart className="text-2xl text-gray-300" /> // Outline heart for non-wishlist items
//                   )}
//                 </div>
//               </Link>
//               {/* Slider for product images */}
//               <Slider {...innerSliderSettings}>
//                 {card.images.map((imgSrc, imgIndex) => (
//                   <div
//                     key={imgIndex}
//                     className="w-[307px] h-[390px] flex items-center justify-center overflow-hidden rounded-md " // Adds border and rounded corners
//                   >
//                     <Image
//                       src={imgSrc}
//                       width={307}
//                       height={390}
//                       layout="fixed" // Ensures consistent image dimensions
//                       alt=""
//                       className="w-full h-full object-cover rounded-xl" // Ensures the image matches the rounded corners
//                     />
//                   </div>
//                 ))}
//               </Slider>

//               {/* Buy Now button and handshake icon - fixed position */}
//               <div className="absolute w-full bottom-4 flex justify-evenly items-center px-4">
//                 {token ? (
//                   <Link href={`/selling-page/${card._id}`} className="w-[70%]">
//                     <button className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1">
//                       Buy Now
//                     </button>
//                   </Link>
//                 ) : (
//                   <button
//                     className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1 "
//                     onClick={() => toast.success("Please Login!")}
//                   >
//                     Buy Now
//                   </button>
//                 )}
//                 <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full">
//                   <Image
//                     unoptimized
//                     width={30}
//                     height={30}
//                     src="handshake_img.png"
//                     alt="Open Offer Popup"
//                     className="cursor-pointer"
//                     onClick={() =>
//                       handleOpenOfferPopup(
//                         card._id,
//                         card.seller?._id || (card.admin?._id || "admin")
//                       )
//                     }
//                   />
//                 </div>
//               </div>
//             </div>

//             <OfferPopup
//               isOpen={isOfferPopupOpen}
//               onClose={handleCloseOfferPopup}
//               onSubmit={handleOfferSubmit}
//             />

//             <h5 className="text-sm font-medium text-gray-700 mt-4">
//               {card.name}
//             </h5>
//             <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
//               {card.price}
//             </h2>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Component */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         handleNextPage={handleNextPage}
//         handlePrevPage={handlePrevPage}
//         handlePageChange={handlePageChange}
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



"use client";

import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { OfferPopup } from "./OfferPopup";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useFilter } from "../context/FilterContext";

export const ImagesComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [selectedSellerId, setSelectedSellerId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const cardsPerPage = 9;

  // Access the filtered products from context
  const { filteredProducts } = useFilter();
  
  // Calculate pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredProducts.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

  const wishlist = useSelector((state) => state.wishlist.items);
  const details = useSelector((state) => state.auth.user);
  const userID = details?._id;
  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleOpenOfferPopup = (id, sellerid) => {
    setSelectedProductId(id);
    setSelectedSellerId(sellerid || "admin");
    setIsOfferPopupOpen(true);
  };

  const handleCloseOfferPopup = () => {
    setIsOfferPopupOpen(false);
  };

  const handleOfferSubmit = async (price) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const data = { offerPrice: price, seller: selectedSellerId };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/add/${selectedProductId}`,
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
      } else {
        setErrorMessage(`Failed to submit offer: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      setErrorMessage(`${error.response?.data?.message || error.message}`);
      setErrorPopupOpen(true);
    }
  };

  const handleLikeClick = async (id) => {
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

  const handleFollow = async (id, type, sellerID) => {
    setLoading(true);
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/${type}/${id}`;
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error while following/unfollowing", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if a product is admin-created
  const isAdminProduct = (product) => {
    return !product.seller && product.admin;
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

  return (
    <div className="p-6 ml-8 h-auto w-auto font-karla z-10">
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl text-gray-500 mb-4">No products found matching your filters</p>
          <Image 
            src="/no-results.svg" 
            alt="No results" 
            width={150} 
            height={150} 
            className="opacity-50"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCards.map((card) => (
            <div key={card._id} className="flex flex-col">
              <div className="flex justify-between items-center space-x-4">
                <div className="flex space-x-4 items-center">
                  {!isAdminProduct(card) ? (
                    <Link href={`/user_profile/${card?.seller?._id}`}>
                      <img
                        src={card?.seller?.avatar || "/profile_icon.svg"}
                        alt="User avatar"
                        className="object-contain h-12 w-12"
                      />
                    </Link>
                  ) : (
                    <img
                      src={"/profile_icon.svg"}
                      alt="Admin avatar"
                      className="object-contain h-12 w-12"
                    />
                  )}
                  <p className="font-bold text-sm">
                    {isAdminProduct(card)
                      ? card.admin?.name || "Admin"
                      : card?.seller?.username}
                  </p>
                </div>
                {!isAdminProduct(card) && (
                  <button
                    className={`mt-2 px-4 sm:px-6 py-1 ${card?.seller?.followers?.includes(userID)
                      ? "bg-gray-500"
                      : "bg-custom-green"
                      } text-white rounded-full transition-colors duration-300`}
                    onClick={() =>
                      card?.seller?.followers?.includes(userID)
                        ? handleFollow(
                          card.seller._id,
                          "unfollow",
                          card?.seller?._id
                        )
                        : handleFollow(card?.seller?._id, "follow", card?.seller?._id)
                    }
                    disabled={loading}
                  >
                    {card?.seller?.followers?.includes(userID)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                )}
              </div>

              <div className="relative mt-4">
                {/* Heart icon for like functionality */}
                <Link href="/wishlist">
                  <div
                    className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10 hover:bg-gray-300 transition-colors duration-300"
                    onClick={() => handleLikeClick(card?._id)}
                  >
                    {wishlist.includes(card._id) ? (
                      <FcLike className="text-2xl text-red-500" />
                    ) : (
                      <GoHeart className="text-2xl text-gray-300" />
                    )}
                  </div>
                </Link>
                
                {/* Slider for product images */}
                <Slider {...innerSliderSettings}>
                  {card.images.map((imgSrc, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="w-[307px] h-[390px] flex items-center justify-center overflow-hidden rounded-md"
                    >
                      <Image
                        src={imgSrc}
                        width={307}
                        height={390}
                        layout="fixed"
                        alt={`${card.name} - image ${imgIndex + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </Slider>

                {/* Buy Now button and handshake icon */}
                <div className="absolute w-full bottom-4 flex justify-evenly items-center px-4">
                  {token ? (
                    <Link href={`/selling-page/${card._id}`} className="w-[70%]">
                      <button className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1 hover:bg-yellow-400 transition-colors duration-300">
                        Buy Now
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="w-[70%] p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1 hover:bg-yellow-400 transition-colors duration-300"
                      onClick={() => toast.success("Please Login!")}
                    >
                      Buy Now
                    </button>
                  )}
                  <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors duration-300">
                    <Image
                      unoptimized
                      width={30}
                      height={30}
                      src="handshake_img.png"
                      alt="Open Offer Popup"
                      className="cursor-pointer"
                      onClick={() =>
                        handleOpenOfferPopup(
                          card._id,
                          card.seller?._id || (card.admin?._id || "admin")
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <h5 className="text-sm font-medium text-gray-700 mt-4">
                {card.name}
              </h5>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                ₹{card.price}
              </h2>
              
              {/* Display additional product details */}
              <div className="mt-2 flex flex-wrap gap-2">
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

      {/* Pagination Component */}
      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handlePageChange={handlePageChange}
        />
      )}
      
      {/* Error Popup */}
      {errorPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <p className="text-red-600 font-semibold text-center">
              {errorMessage}
            </p>
            <button
              onClick={() => setErrorPopupOpen(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Offer Popup */}
      <OfferPopup
        isOpen={isOfferPopupOpen}
        onClose={handleCloseOfferPopup}
        onSubmit={handleOfferSubmit}
      />
    </div>
  );
};

export default ImagesComponent;
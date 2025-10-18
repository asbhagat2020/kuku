

// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import Slider from "react-slick/lib/slider";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Link from "next/link";
// import { FcLike } from "react-icons/fc";
// import { GoHeart } from "react-icons/go";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import OfferPopup from "../OfferPopup";

// const innerSliderSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   arrows: true,
//   customPaging: (i) => (
//     <div
//       className={`custom-dot`}
//       style={{
//         height: "5px",
//         borderRadius: "20px",
//         background: "rgba(235, 235, 228, 0.4)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: "pointer",
//         marginTop: "-100px",
//       }}
//     />
//   ),
//   appendDots: (dots) => (
//     <div
//       style={{
//         padding: "15px",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <ul style={{ display: "flex", gap: "5px" }}> {dots} </ul>
//     </div>
//   ),
// };

// export const SellingProducts = ({ data }) => {
//   const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
//   const [offerSubmitted, setOfferSubmitted] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [activeFilter, setActiveFilter] = useState("All");

//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//   const wishlist = useSelector((state) => state.wishlist.items);

//   const productsData = Array.isArray(data) ? data : (data?.products || []);

//   const filterOptions = [
//     { label: "All Products", value: "All" },
//     { label: "Approved Products", value: "Accepted" },
//     { label: "Pending Products", value: "Pending" },
//     { label: "Rejected Products", value: "Rejected" },
//     { label: "Sold Products", value: "Sold" },
//   ];

//   const filteredData =
//     productsData?.filter((product) => {
//       if (activeFilter === "All") return true;
//       return product.approval?.status === activeFilter;
//     }) || [];

//   const getFilterCount = (status) => {
//     if (status === "All") return productsData?.length || 0;
//     return (
//       productsData?.filter((product) => product.approval?.status === status)
//         .length || 0
//     );
//   };

//   console.log("Original data:", data);
//   console.log("Products data:", productsData);
//   console.log("Filtered data:", filteredData);
//   console.log("Active filter:", activeFilter);

//   const handleOpenOfferPopup = (card) => {
//     if (!token) {
//       toast.success("Please login");
//       setTimeout(() => {
//         window.location.href = "/login";
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
//     if (!currentProduct) {
//       setErrorMessage("No product selected.");
//       setErrorPopupOpen(true);
//       return;
//     }

//     try {
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

//       if (response.status === 201) {
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

//   return (
//     <div className="px-[71px] mb-10">
//       <div className="mb-8">
//         <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
//           {filterOptions.map((option, index) => {
//             const count = getFilterCount(option.value);
//             const isActive = activeFilter === option.value;

//             return (
//               <div key={option.value} className="flex items-center">
//                 <button
//                   onClick={() => setActiveFilter(option.value)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
//                     isActive
//                       ? "bg-custom-yellow text-black shadow-md"
//                       : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//                   }`}
//                 >
//                   {option.label}
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       isActive ? "bg-black text-white" : "bg-gray-200 text-gray-600"
//                     }`}
//                   >
//                     {count}
//                   </span>
//                 </button>
//                 {index < filterOptions.length - 1 && (
//                   <svg
//                     className="w-4 h-4 mx-2 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-4 text-sm text-gray-600">
//           Showing {filteredData.length} of {productsData?.length || 0} products
//           {activeFilter !== "All" && (
//             <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
//               {filterOptions.find((opt) => opt.value === activeFilter)?.label}
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative">
//         {filteredData.length > 0 ? (
//           filteredData.map((card) => (
//             <div key={card._id} className="flex flex-col">
//               <div className="relative">
//                 <div
//                   className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium z-10 ${
//                     card.approval?.status === "Accepted"
//                       ? "bg-green-100 text-green-800"
//                       : card.approval?.status === "Pending"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {card.approval?.status || "Unknown"}
//                 </div>

//                 <Link href="/wishlist">
//                   <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10">
//                     {wishlist.includes(card._id) ? (
//                       <FcLike className="text-2xl text-red-500" />
//                     ) : (
//                       <GoHeart className="text-2xl text-gray-300" />
//                     )}
//                   </div>
//                 </Link>

//                 <Slider {...innerSliderSettings}>
//                   {card.images.map((imgSrc, imgIndex) => (
//                     <div
//                       key={imgIndex}
//                       className="w-[307px] h-[420px] flex items-center justify-center overflow-hidden rounded-md"
//                     >
//                       <Image
//                         src={imgSrc}
//                         width={307}
//                         height={420}
//                         layout="fixed"
//                         alt=""
//                         className="w-full h-full object-cover rounded-xl"
//                       />
//                     </div>
//                   ))}
//                 </Slider>

//                 <div className="absolute w-full bottom-4 flex justify-evenly items-center px-4">
//                   {token ? (
//                     <Link href={`/selling-page/${card._id}`} className="w-[70%]">
//                       <button className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1">
//                         Buy Now
//                       </button>
//                     </Link>
//                   ) : (
//                     <button
//                       className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1"
//                       onClick={() => toast.success("Please Login!")}
//                     >
//                       Buy Now
//                     </button>
//                   )}
//                   <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full">
//                     <Image
//                       unoptimized
//                       width={30}
//                       height={30}
//                       src="/handshake_img.png"
//                       alt="Open Offer Popup"
//                       className="cursor-pointer"
//                       onClick={() => handleOpenOfferPopup(card)}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <OfferPopup
//                 isOfferPopupOpen={isOfferPopupOpen}
//                 product={currentProduct}
//                 handlePriceSelection={handlePriceSelection}
//                 handleOpenModal={handleOfferSubmit}
//                 handleCloseOfferPopup={handleCloseOfferPopup}
//                 selectedPrice={selectedPrice}
//                 isSubmitDisabled={isSubmitDisabled}
//               />

//               <h5 className="text-sm font-medium text-gray-700 mt-4">
//                 {card?.name}
//               </h5>
//               <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
//                 AED {card?.price?.toFixed(2)}
//               </h2>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-12">
//             <div className="text-gray-500 text-lg">
//               No products found for the selected filter
//             </div>
//             <button
//               onClick={() => setActiveFilter("All")}
//               className="mt-4 px-6 py-2 bg-custom-yellow text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
//             >
//               Show All Products
//             </button>
//           </div>
//         )}
//       </div>

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








// "use client";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import Slider from "react-slick/lib/slider";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Link from "next/link";
// import { FcLike } from "react-icons/fc";
// import { GoHeart } from "react-icons/go";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import OfferPopup from "../OfferPopup";
// import EditProductModal from "./EditProductModal";

// const innerSliderSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   arrows: true,
//   customPaging: (i) => (
//     <div
//       className={`custom-dot`}
//       style={{
//         height: "5px",
//         borderRadius: "20px",
//         background: "rgba(235, 235, 228, 0.4)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: "pointer",
//         marginTop: "-100px",
//       }}
//     />
//   ),
//   appendDots: (dots) => (
//     <div
//       style={{
//         padding: "15px",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <ul style={{ display: "flex", gap: "5px" }}> {dots} </ul>
//     </div>
//   ),
// };

// export const SellingProducts = ({ data }) => {
//   const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
//   const [offerSubmitted, setOfferSubmitted] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedEditProduct, setSelectedEditProduct] = useState(null);
//   const [products, setProducts] = useState([]);

//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//   const wishlist = useSelector((state) => state.wishlist.items);

//   useEffect(() => {
//     const productsData = Array.isArray(data) ? data : (data?.products || []);
//     setProducts(productsData);
//   }, [data]);

//   const filterOptions = [
//     { label: "All Products", value: "All" },
//     { label: "Approved Products", value: "Accepted" },
//     { label: "Pending Products", value: "Pending" },
//     { label: "Rejected Products", value: "Rejected" },
//     { label: "Sold Products", value: "Sold" },
//   ];

//   const filteredData =
//     products?.filter((product) => {
//       if (activeFilter === "All") return true;
//       return product.approval?.status === activeFilter;
//     }) || [];

//   const getFilterCount = (status) => {
//     if (status === "All") return products?.length || 0;
//     return (
//       products?.filter((product) => product.approval?.status === status)
//         .length || 0
//     );
//   };

//   console.log("Original data:", data);
//   console.log("Products data:", products);
//   console.log("Filtered data:", filteredData);
//   console.log("Active filter:", activeFilter);

//   const handleOpenOfferPopup = (card) => {
//     if (!token) {
//       toast.success("Please login");
//       setTimeout(() => {
//         window.location.href = "/login";
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
//     if (!currentProduct) {
//       setErrorMessage("No product selected.");
//       setErrorPopupOpen(true);
//       return;
//     }

//     try {
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

//       if (response.status === 201) {
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

//   const handleOpenEditModal = (product) => {
//     if (!token) {
//       toast.success("Please login");
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 500);
//     } else {
//       setSelectedEditProduct(product);
//       setIsEditModalOpen(true);
//     }
//   };

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//     setSelectedEditProduct(null);
//   };

//   const handleSaveEdit = (updatedProduct) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
//     );
//     toast.success("Product updated successfully!");
//     handleCloseEditModal();
//   };

//   return (
//     <div className="px-[71px] mb-10">
//       <div className="mb-8">
//         <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
//           {filterOptions.map((option, index) => {
//             const count = getFilterCount(option.value);
//             const isActive = activeFilter === option.value;

//             return (
//               <div key={option.value} className="flex items-center">
//                 <button
//                   onClick={() => setActiveFilter(option.value)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
//                     isActive
//                       ? "bg-custom-yellow text-black shadow-md"
//                       : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//                   }`}
//                 >
//                   {option.label}
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       isActive ? "bg-black text-white" : "bg-gray-200 text-gray-600"
//                     }`}
//                   >
//                     {count}
//                   </span>
//                 </button>
//                 {index < filterOptions.length - 1 && (
//                   <svg
//                     className="w-4 h-4 mx-2 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-4 text-sm text-gray-600">
//           Showing {filteredData.length} of {products?.length || 0} products
//           {activeFilter !== "All" && (
//             <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
//               {filterOptions.find((opt) => opt.value === activeFilter)?.label}
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative">
//         {filteredData.length > 0 ? (
//           filteredData.map((card) => {
//             const isPending = card.approval?.status === "Pending";

//             return (
//               <div key={card._id} className="flex flex-col">
//                 <div className="relative">
//                   <div
//                     className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium z-10 ${
//                       card.approval?.status === "Accepted"
//                         ? "bg-green-100 text-green-800"
//                         : card.approval?.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {card.approval?.status || "Unknown"}
//                   </div>

//                   {!isPending && (
//                     <Link href="/wishlist">
//                       <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10">
//                         {wishlist.includes(card._id) ? (
//                           <FcLike className="text-2xl text-red-500" />
//                         ) : (
//                           <GoHeart className="text-2xl text-gray-300" />
//                         )}
//                       </div>
//                     </Link>
//                   )}

//                   <Slider {...innerSliderSettings}>
//                     {card.images.map((imgSrc, imgIndex) => (
//                       <div
//                         key={imgIndex}
//                         className="w-[307px] h-[420px] flex items-center justify-center overflow-hidden rounded-md"
//                       >
//                         <Image
//                           src={imgSrc}
//                           width={307}
//                           height={420}
//                           layout="fixed"
//                           alt=""
//                           className="w-full h-full object-cover rounded-xl"
//                         />
//                       </div>
//                     ))}
//                   </Slider>

//                   {isPending ? (
//                     <div className="absolute w-full bottom-4 flex justify-center items-center px-4">
//                       <button
//                         onClick={() => handleOpenEditModal(card)}
//                         className="w-[70%] p-2 py-[15px] bg-blue-500 text-white rounded-2xl font-bold"
//                       >
//                         Edit Product
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="absolute w-full bottom-4 flex justify-evenly items-center px-4">
//                       {token ? (
//                         <Link href={`/selling-page/${card._id}`} className="w-[70%]">
//                           <button className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1">
//                             Buy Now
//                           </button>
//                         </Link>
//                       ) : (
//                         <button
//                           className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1"
//                           onClick={() => toast.success("Please Login!")}
//                         >
//                           Buy Now
//                         </button>
//                       )}
//                       <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full">
//                         <Image
//                           unoptimized
//                           width={30}
//                           height={30}
//                           src="/handshake_img.png"
//                           alt="Open Offer Popup"
//                           className="cursor-pointer"
//                           onClick={() => handleOpenOfferPopup(card)}
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {!isPending && (
//                   <>
//                     <h5 className="text-sm font-medium text-gray-700 mt-4">
//                       {card?.name}
//                     </h5>
//                     <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
//                       AED {card?.price?.toFixed(2)}
//                     </h2>
//                   </>
//                 )}
//               </div>
//             );
//           })
//         ) : (
//           <div className="col-span-full text-center py-12">
//             <div className="text-gray-500 text-lg">
//               No products found for the selected filter
//             </div>
//             <button
//               onClick={() => setActiveFilter("All")}
//               className="mt-4 px-6 py-2 bg-custom-yellow text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
//             >
//               Show All Products
//             </button>
//           </div>
//         )}
//       </div>

//       <OfferPopup
//         isOfferPopupOpen={isOfferPopupOpen}
//         product={currentProduct}
//         handlePriceSelection={handlePriceSelection}
//         handleOpenModal={handleOfferSubmit}
//         handleCloseOfferPopup={handleCloseOfferPopup}
//         selectedPrice={selectedPrice}
//         isSubmitDisabled={isSubmitDisabled}
//       />

//       <EditProductModal
//         isOpen={isEditModalOpen}
//         product={selectedEditProduct}
//         onClose={handleCloseEditModal}
//         onSave={handleSaveEdit}
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
import Image from "next/image";
import { useState, useEffect } from "react";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import OfferPopup from "../OfferPopup";
import EditProductModal from "./EditProductModal";

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

export const SellingProducts = ({ data }) => {
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditProduct, setSelectedEditProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const productsData = Array.isArray(data) ? data : (data?.products || []);
    setProducts(productsData);
  }, [data]);

  const filterOptions = [
    { label: "All Products", value: "All" },
    { label: "Approved Products", value: "Accepted" },
    { label: "Pending Products", value: "Pending" },
    { label: "Rejected Products", value: "Rejected" },
    { label: "Sold Products", value: "Sold" },
    { label: "Edit Products", value: "Edit" },
  ];

  const filteredData =
    products?.filter((product) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Edit") return product.approval?.status === "Pending";
      return product.approval?.status === activeFilter;
    }) || [];

  const getFilterCount = (status) => {
    if (status === "All") return products?.length || 0;
    if (status === "Edit")
      return products?.filter((product) => product.approval?.status === "Pending").length || 0;
    return (
      products?.filter((product) => product.approval?.status === status).length || 0
    );
  };

  const handleOpenOfferPopup = (card) => {
    if (!token) {
      toast.success("Please login");
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } else {
      setCurrentProduct(card);
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
    if (!currentProduct) {
      setErrorMessage("No product selected.");
      setErrorPopupOpen(true);
      return;
    }

    try {
      const data = {
        offerPrice: selectedPrice,
        seller: currentProduct.seller?._id || (currentProduct.admin?._id || "admin"),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/add/${currentProduct._id}`,
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
      } else {
        setErrorMessage(`Failed to submit offer: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      setErrorMessage(`${error.response?.data?.message || error.message}`);
      setErrorPopupOpen(true);
    }
  };

  const handleOpenEditModal = (product) => {
    if (!token) {
      toast.success("Please login");
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } else {
      setSelectedEditProduct(product);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEditProduct(null);
  };

  const handleSaveEdit = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
    toast.success("Product updated successfully!");
    handleCloseEditModal();
  };

  return (
    <div className="px-[71px] mb-10">
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
          {filterOptions.map((option, index) => {
            const count = getFilterCount(option.value);
            const isActive = activeFilter === option.value;

            return (
              <div key={option.value} className="flex items-center">
                <button
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-custom-yellow text-black shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {option.label}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      isActive ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
                {index < filterOptions.length - 1 && (
                  <svg
                    className="w-4 h-4 mx-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredData.length} of {products?.length || 0} products
          {activeFilter !== "All" && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {filterOptions.find((opt) => opt.value === activeFilter)?.label}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative">
        {filteredData.length > 0 ? (
          filteredData.map((card) => {
            const isEditable = activeFilter === "Edit" && card.approval?.status === "Pending";
            const isPending = card.approval?.status === "Pending";

            return (
              <div key={card._id} className="flex flex-col">
                <div className="relative">
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium z-10 ${
                      card.approval?.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : card.approval?.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {card.approval?.status || "Unknown"}
                  </div>

                  <Link href="/wishlist">
                    <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10">
                      {wishlist.includes(card._id) ? (
                        <FcLike className="text-2xl text-red-500" />
                      ) : (
                        <GoHeart className="text-2xl text-gray-300" />
                      )}
                    </div>
                  </Link>

                  <Slider {...innerSliderSettings}>
                    {card.images.map((imgSrc, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="w-[307px] h-[420px] flex items-center justify-center overflow-hidden rounded-md"
                      >
                        <Image
                          src={imgSrc}
                          width={307}
                          height={420}
                          layout="fixed"
                          alt=""
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    ))}
                  </Slider>

                  <div className="absolute w-full bottom-4 flex justify-center items-center px-4">
                    {isEditable ? (
                      <button
                        onClick={() => handleOpenEditModal(card)}
                        className="w-[70%] p-2 py-[15px] bg-blue-500 text-white rounded-2xl font-bold"
                      >
                        Edit Product
                      </button>
                    ) : isPending ? (
                      <div className="w-full flex justify-evenly items-center">
                        <button
                          className="w-[70%] p-2 py-[15px] sm:px-10 bg-gray-300 text-gray-500 rounded-2xl font-bold mr-1 cursor-not-allowed"
                          disabled
                        >
                          Buy Now
                        </button>
                        <div className="h-12 w-12 flex items-center justify-center bg-gray-300 rounded-full cursor-not-allowed">
                          <Image
                            unoptimized
                            width={30}
                            height={30}
                            src="/handshake_img.png"
                            alt="Offer Disabled"
                            className="opacity-50"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex justify-evenly items-center">
                        {token ? (
                          <Link href={`/selling-page/${card._id}`} className="w-[70%]">
                            <button className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1">
                              Buy Now
                            </button>
                          </Link>
                        ) : (
                          <button
                            className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1"
                            onClick={() => toast.success("Please Login!")}
                          >
                            Buy Now
                          </button>
                        )}
                        <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full">
                          <Image
                            unoptimized
                            width={30}
                            height={30}
                            src="/handshake_img.png"
                            alt="Open Offer Popup"
                            className="cursor-pointer"
                            onClick={() => handleOpenOfferPopup(card)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <h5 className="text-sm font-medium text-gray-700 mt-4">
                  {card?.name}
                </h5>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                  AED {card?.price?.toFixed(2)}
                </h2>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 text-lg">
              No products found for the selected filter
            </div>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-4 px-6 py-2 bg-custom-yellow text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}
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

      <EditProductModal
        isOpen={isEditModalOpen}
        product={selectedEditProduct}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
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
    </div>
  );
};
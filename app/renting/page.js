
// "use client";

// import Link from 'next/link';
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import DownloadKuku from "@/components/home/DownloadKuku";
// import { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';
// import axios from "axios";
// import Cookies from "js-cookie";

// export default function Renting() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [rentalProducts, setRentalProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const searchParams = useSearchParams();
//   const startDate = searchParams.get('startDate');
//   const endDate = searchParams.get('endDate');
//   const router = useRouter();

//   const fetchRentalProducts = async () => {
//     try {
//       const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/rental-products`,
//         {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         }
//       );

//       setRentalProducts(response.data.products);
//     } catch (error) {
//       console.error("Failed to fetch rental products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRentalProducts();
//   }, []);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     router.push("/selling-page");
//   };

//   const handleProductSelect = (productId) => {
//     if (selectedProducts.includes(productId)) {
//       setSelectedProducts(selectedProducts.filter(id => id !== productId));
//     } else {
//       setSelectedProducts([...selectedProducts, productId]);
//     }
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedProducts([]);
//     } else {
//       setSelectedProducts(rentalProducts.map(product => product._id));
//     }
//     setSelectAll(!selectAll);
//   };

//   const calculateTotalPrice = () => {
//     return rentalProducts
//       .filter(product => selectedProducts.includes(product._id))
//       .reduce((total, product) => total + product.price, 0);
//   };

//   return (
//     <>
//       <Header />
//       <div className="max-w-[1550px] mx-auto">
//         <div className="px-4 sm:px-6 md:px-[50px] lg:px-[70px] py-4 md:py-[50px] lg:py-[70px]">
//           <div className="text-[#070707] text-[28px] md:text-[36.8px] font-normal font-luckiest leading-[34px] md:leading-[44.16px] mb-6">
//             RENTING
//           </div>
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
//             {/* Products Section - Increased padding on smaller screens, better width control */}
//             <div className="w-full lg:w-[68%] xl:w-2/3">
//               <div className="flex items-center mb-4">
//                 <input
//                   type="checkbox"
//                   checked={selectAll}
//                   onChange={handleSelectAll}
//                   className="form-checkbox h-5 w-5 text-pink-500 border-2 border-pink-500 rounded focus:ring-pink-500"
//                 />
//                 <span className="ml-2 text-black text-[16px] font-bold font-karla">Select All</span>
//               </div>
              
//               {/* Product cards with improved responsive layout */}
//               {rentalProducts.map((product) => (
//                 <div key={product._id} className="flex flex-col sm:flex-row justify-start items-start gap-4 mb-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
//                   <div className="flex items-center self-start pt-1">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(product._id)}
//                       onChange={() => handleProductSelect(product._id)}
//                       className="form-checkbox h-5 w-5 text-pink-500 border-2 border-pink-500 rounded focus:ring-pink-500"
//                     />
//                   </div>
                  
//                   {/* Product image with consistent sizing */}
//                   <img
//                     className="w-[120px] h-[120px] sm:w-[130px] sm:h-[130px] md:w-[159.2px] md:h-[157.6px] rounded-[7.58px] object-cover"
//                     src={product.images[0]}
//                     alt={product.name}
//                   />
                  
//                   {/* Product details with better wrapping */}
//                   <div className="flex flex-col justify-start items-start gap-2 sm:gap-3 flex-grow min-w-0">
//                     <div className="w-full">
//                       <div className="text-black text-[16px] md:text-[18px] font-bold font-Karla leading-[20px] md:leading-[24px]">
//                         {product.name}
//                       </div>
//                       <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla leading-tight">
//                         {product.description}
//                       </div>
//                     </div>
                    
//                     {/* Size and condition with better wrapping for small screens */}
//                     <div className="flex flex-wrap justify-start items-center gap-x-4 gap-y-2 w-full">
//                       <div className="flex justify-start items-center gap-3">
//                         <div className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
//                           SIZE
//                         </div>
//                         <div className="min-w-[24px] px-2 py-1 border border-[#e4086f] flex justify-center items-center">
//                           <div className="text-[#e4086f] text-[14px] md:text-[16px] font-normal font-karla whitespace-nowrap">
//                             {product.size?.sizeName || "N/A"}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex justify-start items-center gap-3">
//                         <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
//                           CONDITION:
//                         </span>
//                         <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
//                           {product.condition?.conditionName || "N/A"}
//                         </span>
//                       </div>
//                     </div>
                    
//                     {/* Buttons with better responsive spacing */}
//                     <div className="flex flex-wrap sm:flex-nowrap justify-start items-start gap-2 sm:gap-4 w-full">
//                       <button className="flex-1 min-w-[110px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center inline-flex hover:bg-[#e4086f] p-2">
//                         <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
//                           Remove
//                         </span>
//                       </button>
//                       <button className="flex-1 min-w-[110px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center inline-flex hover:bg-[#e4086f] p-2">
//                         <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
//                           Add to Wishlist
//                         </span>
//                       </button>
//                     </div>
//                   </div>
                  
//                   {/* Price and date info with better alignment */}
//                   <div className="flex flex-col justify-start items-start gap-2 pt-2 sm:pt-0 w-full sm:w-auto">
//                     <div className="flex justify-start items-center gap-2">
//                       <div className="text-[#E4086F] text-[16px] font-bold font-karla">
//                         Rental Price
//                       </div>
//                       <div className="text-black text-[16px] font-bold font-karla">
//                         AED {product.price}
//                       </div>
//                     </div>
//                     <div className="flex justify-start items-center gap-2">
//                       <div className="text-[#E4086F] text-[16px] font-bold font-karla">
//                         From -
//                       </div>
//                       <div className="text-black text-[16px] font-bold font-karla">
//                         {startDate}
//                       </div>
//                     </div>
//                     <div className="flex justify-start items-center gap-2">
//                       <div className="text-[#E4086F] text-[16px] font-bold font-karla">
//                         To -
//                       </div>
//                       <div className="text-black text-[16px] font-bold font-karla">
//                         {endDate}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             {/* Order summary sidebar with improved sticky positioning */}
//             <div className="w-full sm:w-[400px] md:w-[350px] lg:w-[30%] xl:w-1/4 mt-6 lg:mt-10 sticky top-4">
//               <div className="w-full bg-white p-4 border border-gray-100 rounded-lg shadow-xl">
//                 <div className="flex justify-between items-center mb-3">
//                   <div className="text-[#4f4f4f] text-[16px] font-normal font-karla">
//                     Rental Price
//                   </div>
//                   <div className="text-[#292929] text-[16px] font-normal font-karla">
//                     AED {calculateTotalPrice()}
//                   </div>
//                 </div>
                
//                 <div className="flex justify-between items-center mb-3">
//                   <div className="text-[#4f4f4f] text-[16px] font-normal font-karla">
//                     Deposit
//                   </div>
//                   <div className="text-[#e4086f] text-[16px] font-normal font-karla">
//                     AED 0
//                   </div>
//                 </div>
                
//                 <div className="w-full h-[1.13px] bg-[#e4e4e4] mb-3" />
                
//                 <div className="flex justify-between items-center mb-4">
//                   <div className="text-[#1c1c1c] text-[18px] font-semibold font-['Inter']">
//                     Total:
//                   </div>
//                   <div className="text-[#e4086f] text-[18px] font-bold font-karla">
//                     AED {calculateTotalPrice()}
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleOpenModal}
//                   className="w-full h-[48px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mb-3 hover:bg-[#e9d300] transition-colors"
//                 >
//                   <div className="text-center text-[#070707] text-[14px] font-bold font-karla">
//                     Pay Deposit
//                   </div>
//                 </button>
                
//                 <div className="flex justify-around w-full items-center mt-3">
//                   <img
//                     className="h-[19.2px] w-auto"
//                     src="/payment1.png"
//                     alt="Payment1"
//                   />
//                   <img className="h-[19.2px] w-auto" src="/mastercard.png" alt="Logo1" />
//                   <img className="h-[19.2px] w-auto" src="/paypal.png" alt="Logo2" />
//                   <img className="h-[19.2px] w-auto" src="/visa.png" alt="Logo3" />
//                   <img
//                     className="h-[19.2px] w-auto"
//                     src="/payment.png"
//                     alt="Payment"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Success modal */}
//           {isModalOpen && (
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//               onClick={handleCloseModal}
//             >
//               <div
//                 className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[380px] max-w-md h-auto min-h-[230px] text-center"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-center items-center mb-5">
//                   <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#30BD75] border-4 border-[#9ae6b4] rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M5 12l5 5L20 7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="text-[20px] md:text-[24px] font-bold font-karla mb-4">
//                   Successfully paid deposit!
//                 </div>
//                 <div className="text-[#6B6B6B] text-[14px] md:text-[16px] mb-6">
//                   Thank you for your payment. Your transaction is complete.
//                 </div>
//                 <button
//                   onClick={handleCloseModal}
//                   className="w-full h-[48px] bg-[#e4086f] rounded-[14px] text-white hover:bg-[#c40761] transition-colors"
//                 >
//                   Go to Selling Page
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <DownloadKuku />
//       <Footer />
//     </>
//   );
// }









// "use client";

// import Link from 'next/link';
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import DownloadKuku from "@/components/home/DownloadKuku";
// import { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';
// import axios from "axios";
// import Cookies from "js-cookie";

// export default function Renting() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalDays, setTotalDays] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
  
//   const searchParams = useSearchParams();
//   const startDate = searchParams.get('startDate');
//   const endDate = searchParams.get('endDate');
//   const productId = searchParams.get('productId');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       if (!productId) {
//         setError("No product selected for rental");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}`,
//           {
//             headers: token ? { Authorization: `Bearer ${token}` } : {},
//           }
//         );

//         if (response.data.product) {
//           setProduct(response.data.product);
//           // Calculate number of days between start and end dates
//           if (startDate && endDate) {
//             const start = new Date(startDate.split('/').reverse().join('-'));
//             const end = new Date(endDate.split('/').reverse().join('-'));
//             const diffTime = Math.abs(end - start);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end days
//             setTotalDays(diffDays);
            
//             // Calculate total price
//             const dailyPrice = response.data.product.pricePerDay || 0;
//             setTotalPrice(dailyPrice * diffDays);
//           }
//         } else {
//           setError("Product not found");
//         }
//       } catch (error) {
//         console.error("Failed to fetch product details:", error);
//         setError("Failed to load product details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [productId, startDate, endDate]);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     router.push("/selling-page");
//   };

//   if (loading) {
//     return (
//       <>
//         <Header />
//         <div className="max-w-[1550px] mx-auto py-20 text-center">
//           <div className="animate-pulse flex flex-col items-center">
//             <div className="w-48 h-6 bg-gray-200 rounded mb-4"></div>
//             <div className="w-64 h-4 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Header />
//         <div className="max-w-[1550px] mx-auto py-20 text-center">
//           <div className="text-[#E4086F] text-xl font-bold mb-4">{error}</div>
//           <Link href="/" className="inline-block px-6 py-2 bg-[#FDE504] rounded-lg font-bold">
//             Return to Home
//           </Link>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!product) {
//     return (
//       <>
//         <Header />
//         <div className="max-w-[1550px] mx-auto py-20 text-center">
//           <div className="text-[#E4086F] text-xl font-bold mb-4">Product not found</div>
//           <Link href="/" className="inline-block px-6 py-2 bg-[#FDE504] rounded-lg font-bold">
//             Return to Home
//           </Link>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="max-w-[1550px] mx-auto">
//         <div className="px-4 sm:px-6 md:px-[50px] lg:px-[70px] py-4 md:py-[50px] lg:py-[70px]">
//           <div className="text-[#070707] text-[28px] md:text-[36.8px] font-normal font-luckiest leading-[34px] md:leading-[44.16px] mb-6">
//             RENTING
//           </div>
          
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
//             {/* Product Details Section */}
//             <div className="w-full lg:w-[68%] xl:w-2/3">
//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
//                 <div className="flex flex-col sm:flex-row justify-start items-start gap-6">
//                   {/* Product image */}
//                   <div className="relative overflow-hidden rounded-lg">
//                     <img
//                       className="w-full sm:w-[180px] md:w-[220px] h-auto object-cover rounded-lg transition-transform hover:scale-105 duration-300"
//                       src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
//                       alt={product.name}
//                     />
//                     <div className="absolute top-2 right-2 bg-[#FDE504] text-black text-xs font-bold px-2 py-1 rounded-full">
//                       RENTAL
//                     </div>
//                   </div>
                  
//                   {/* Product details */}
//                   <div className="flex flex-col justify-between flex-grow">
//                     <div>
//                       <h2 className="text-[20px] md:text-[24px] font-bold font-karla mb-2">{product.name}</h2>
//                       <p className="text-gray-600 text-sm md:text-base mb-4">{product.description}</p>
                      
//                       <div className="flex flex-wrap gap-4 mb-4">
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla">SIZE:</span>
//                           <span className="px-2 py-1 border border-[#e4086f] text-[#e4086f]">
//                             {product.size?.sizeName || "N/A"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla">CONDITION:</span>
//                           <span className="font-medium">{product.condition?.conditionName || "N/A"}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="mt-4 space-y-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-[#E4086F] font-bold">Daily Rental Price:</span>
//                         <span className="font-bold">AED {product.pricePerDay}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-[#E4086F] font-bold">Rental Period:</span>
//                         <span className="font-bold">{totalDays} days</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Rental Period Section */}
//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
//                 <h3 className="text-lg font-bold mb-4">Rental Period</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex flex-col">
//                     <span className="text-[#E4086F] font-bold mb-1">From</span>
//                     <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
//                       <span className="font-medium">{startDate}</span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-[#E4086F] font-bold mb-1">To</span>
//                     <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
//                       <span className="font-medium">{endDate}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Rental Policy Section */}
//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm">
//                 <h3 className="text-lg font-bold mb-2">Rental Policy</h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Please ensure you return the item in the same condition as received. Any damage beyond normal wear may result in additional charges.
//                 </p>
//                 <div className="bg-blue-50 p-3 rounded-md">
//                   <p className="text-sm font-medium text-blue-800">
//                     You need to make a one-time deposit for renting this item. The deposit will be refunded after the item is returned in good condition.
//                   </p>
//                 </div>
//                 <div className="mt-3">
//                   <a href="#" className="text-[#E4086F] text-sm font-bold underline">
//                     View our rental policy
//                   </a>
//                 </div>
//               </div>
//             </div>
            
//             {/* Order Summary Sidebar */}
//             <div className="w-full sm:w-[400px] md:w-[350px] lg:w-[30%] xl:w-1/4 mt-6 lg:mt-0 sticky top-4">
//               <div className="w-full bg-white p-5 border border-gray-200 rounded-lg shadow-lg">
//                 <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                
//                 <div className="space-y-3 mb-4">
//                   <div className="flex justify-between items-center">
//                     <div className="text-gray-600 text-sm">
//                       Daily Rental Price
//                     </div>
//                     <div className="font-medium">
//                       AED {product.pricePerDay}
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <div className="text-gray-600 text-sm">
//                       Number of Days
//                     </div>
//                     <div className="font-medium">
//                       {totalDays} days
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <div className="text-gray-600 text-sm">
//                       Subtotal
//                     </div>
//                     <div className="font-medium">
//                       AED {totalPrice}
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <div className="text-gray-600 text-sm">
//                       Security Deposit (refundable)
//                     </div>
//                     <div className="text-[#e4086f] font-medium">
//                       AED {Math.round(product.price * 0.2)} {/* 20% of product price as deposit */}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="w-full h-[1px] bg-gray-200 my-4" />
                
//                 <div className="flex justify-between items-center mb-6">
//                   <div className="text-black text-lg font-bold">
//                     Total:
//                   </div>
//                   <div className="text-[#e4086f] text-lg font-bold">
//                     AED {totalPrice + Math.round(product.price * 0.2)}
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleOpenModal}
//                   className="w-full h-[48px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mb-4 hover:bg-[#e9d300] transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200"
//                 >
//                   <div className="text-center text-black text-[16px] font-bold font-karla">
//                     Pay Now
//                   </div>
//                 </button>
                
//                 <div className="flex justify-around w-full items-center mt-4">
//                   <img className="h-[19.2px] w-auto" src="/payment1.png" alt="Payment1" />
//                   <img className="h-[19.2px] w-auto" src="/mastercard.png" alt="Logo1" />
//                   <img className="h-[19.2px] w-auto" src="/paypal.png" alt="Logo2" />
//                   <img className="h-[19.2px] w-auto" src="/visa.png" alt="Logo3" />
//                   <img className="h-[19.2px] w-auto" src="/payment.png" alt="Payment" />
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Success Modal */}
//           {isModalOpen && (
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//               onClick={handleCloseModal}
//             >
//               <div
//                 className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[380px] max-w-md h-auto min-h-[230px] text-center"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-center items-center mb-5">
//                   <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#30BD75] border-4 border-[#9ae6b4] rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M5 12l5 5L20 7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="text-[20px] md:text-[24px] font-bold font-karla mb-4">
//                   Successfully paid deposit!
//                 </div>
//                 <div className="text-[#6B6B6B] text-[14px] md:text-[16px] mb-6">
//                   Thank you for your payment. Your rental has been confirmed from {startDate} to {endDate}.
//                 </div>
//                 <button
//                   onClick={handleCloseModal}
//                   className="w-full h-[48px] bg-[#e4086f] rounded-[14px] text-white hover:bg-[#c40761] transition-colors"
//                 >
//                   Go to Selling Page
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <DownloadKuku />
//       <Footer />
//     </>
//   );
// }








// "use client";

// import Link from 'next/link';
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import DownloadKuku from "@/components/home/DownloadKuku";
// import { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';
// import axios from "axios";
// import Cookies from "js-cookie";

// export default function Renting() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalHours, setTotalHours] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [deposit, setDeposit] = useState(0);

//   const searchParams = useSearchParams();
//   const startDate = searchParams.get('startDate');
//   const endDate = searchParams.get('endDate');
//   const productId = searchParams.get('productId');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       if (!productId) {
//         setError("No product selected for rental");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}`,
//           {
//             headers: token ? { Authorization: `Bearer ${token}` } : {},
//           }
//         );

//         if (response.data.product) {
//           const productData = response.data.product;
//           // Check if product price is above 500 AED
//           if (productData.price <= 500) {
//             setError("This product is not available for rental as its price is below 500 AED.");
//             setLoading(false);
//             return;
//           }

//           setProduct(productData);
//           setDeposit(productData.deposit || 0); // Use deposit from backend

//           // Calculate rental duration in hours
//           if (startDate && endDate) {
//             const start = new Date(startDate.split('/').reverse().join('-'));
//             const end = new Date(endDate.split('/').reverse().join('-'));
//             const diffTime = Math.abs(end - start);
//             const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); // Convert to hours
//             setTotalHours(diffHours);

//             // Calculate total price: 24-hour base price + hourly overage using pricePerHour
//             const basePrice = productData.pricePerDay || 0;
//             const hourlyRate = productData.pricePerHour || 0; // Use pricePerHour from backend
//             const hoursOver24 = Math.max(0, diffHours - 24);
//             const totalRentalPrice = basePrice + (hoursOver24 * hourlyRate);
//             setTotalPrice(totalRentalPrice);
//           }
//         } else {
//           setError("Product not found");
//         }
//       } catch (error) {
//         console.error("Failed to fetch product details:", error);
//         setError("Failed to load product details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [productId, startDate, endDate]);

//   const handlePayNow = async () => {
//     try {
//       const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//       if (!token) {
//         setError("Please log in to proceed with payment");
//         return;
//       }

//       // Create order
//       const orderResponse = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/order`,
//         {
//           products: [{ product: productId, isRental: true }],
//           totalAmount: totalPrice + deposit,
//           rentalDetails: {
//             startDate,
//             endDate,
//             totalHours,
//           },
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (orderResponse.data.order) {
//         const orderId = orderResponse.data.order._id;

//         // Add rent
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}/rent`,
//           {
//             startDate,
//             endDate,
//             orderId,
//           },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setIsModalOpen(true);
//       } else {
//         setError("Failed to create order");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       setError("Failed to process payment. Please try again.");
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     router.push("/selling-page");
//   };

//   if (loading) {
//     return (
//       <>
//         <Header />
//         <div className="max-w-[1550px] mx-auto py-20 text-center">
//           <div className="animate-pulse flex flex-col items-center">
//             <div className="w-48 h-6 bg-gray-200 rounded mb-4"></div>
//             <div className="w-64 h-4 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Header />
//         <div className="max-w-[1550px] mx-auto py-20 text-center">
//           <div className="text-[#E4086F] text-xl font-bold mb-4">{error}</div>
//           <Link href="/" className="inline-block px-6 py-2 bg-[#FDE504] rounded-lg font-bold">
//             Return to Home
//           </Link>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!product) {
//     return (
//       <>
//         <Header />
//         <div className="max-w-[1550px] mx-auto py-20 text-center">
//           <div className="text-[#E4086F] text-xl font-bold mb-4">Product not found</div>
//           <Link href="/" className="inline-block px-6 py-2 bg-[#FDE504] rounded-lg font-bold">
//             Return to Home
//           </Link>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="max-w-[1550px] mx-auto">
//         <div className="px-4 sm:px-6 md:px-[50px] lg:px-[70px] py-4 md:py-[50px] lg:py-[70px]">
//           <div className="text-[#070707] text-[28px] md:text-[36.8px] font-normal font-luckiest leading-[34px] md:leading-[44.16px] mb-6">
//             RENTING
//           </div>
          
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
//             {/* Product Details Section */}
//             <div className="w-full lg:w-[68%] xl:w-2/3">
//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
//                 <div className="flex flex-col sm:flex-row justify-start items-start gap-6">
//                   {/* Product image */}
//                   <div className="relative overflow-hidden rounded-lg">
//                     <img
//                       className="w-full sm:w-[180px] md:w-[220px] h-auto object-cover rounded-lg transition-transform hover:scale-105 duration-300"
//                       src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
//                       alt={product.name}
//                     />
//                     <div className="absolute top-2 right-2 bg-[#FDE504] text-black text-xs font-bold px-2 py-1 rounded-full">
//                       RENTAL
//                     </div>
//                   </div>
                  
//                   {/* Product details */}
//                   <div className="flex flex-col justify-between flex-grow">
//                     <div>
//                       <h2 className="text-[20px] md:text-[24px] font-bold font-karla mb-2">{product.name}</h2>
//                       <p className="text-gray-600 text-sm md:text-base mb-4">{product.description}</p>
                      
//                       <div className="flex flex-wrap gap-4 mb-4">
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla">SIZE:</span>
//                           <span className="px-2 py-1 border border-[#e4086f] text-[#e4086f]">
//                             {product.size?.sizeName || "N/A"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla">CONDITION:</span>
//                           <span className="font-medium">{product.condition?.conditionName || "N/A"}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="mt-4 space-y-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-[#E4086F] font-bold">Base Rental Price (24 hours):</span>
//                         <span className="font-bold">AED {product.pricePerDay}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-[#E4086F] font-bold">Rental Duration:</span>
//                         <span className="font-bold">{totalHours} hours</span>
//                       </div>
//                       {totalHours > 24 && (
//                         <div className="flex justify-between items-center">
//                           <span className="text-[#E4086F] font-bold">Additional Hourly Rate:</span>
//                           <span className="font-bold">AED {product.pricePerHour.toFixed(2)}/hour</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Rental Period Section */}
//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
//                 <h3 className="text-lg font-bold mb-4">Rental Period</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex flex-col">
//                     <span className="text-[#E4086F] font-bold mb-1">From</span>
//                     <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
//                       <span className="font-medium">{startDate}</span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-[#E4086F] font-bold mb-1">To</span>
//                     <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
//                       <span className="font-medium">{endDate}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Delivery and Return Section */}
//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
//                 <h3 className="text-lg font-bold mb-4">Delivery & Return</h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Your rental item will be delivered to your doorstep by the KuKu team. Upon return, the KuKu team will pick up the item from your location after the rental period.
//                 </p>
//               </div>
              
//               {/* Rental Policy Section */}
//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm">
//                 <h3 className="text-lg font-bold mb-2">Rental Policy</h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Please ensure you return the item in the same condition as received. Any damage beyond normal wear may result in additional charges. The KuKu team will perform a quality check upon return to process your deposit refund.
//                 </p>
//                 <div className="bg-blue-50 p-3 rounded-md">
//                   <p className="text-sm font-medium text-blue-800">
//                     A refundable security deposit of AED {deposit} is required for renting this item. The deposit will be refunded after the KuKu team verifies the item’s condition upon return.
//                   </p>
//                 </div>
//                 <div className="mt-3">
//                   <a href="#" className="text-[#E4086F] text-sm font-bold underline">
//                     View our rental policy
//                   </a>
//                 </div>
//               </div>
//             </div>
            
//             {/* Order Summary Sidebar */}
//             <div className="w-full sm:w-[400px] md:w-[350px] lg:w-[30%] xl:w-1/4 mt-6 lg:mt-0 sticky top-4">
//               <div className="w-full bg-white p-5 border border-gray-200 rounded-lg shadow-lg">
//                 <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                
//                 <div className="space-y-3 mb-4">
//                   <div className="flex justify-between items-center">
//                     <div className="text-gray-600 text-sm">
//                       Base Rental Price (24 hours)
//                     </div>
//                     <div className="font-medium">
//                       AED {product.pricePerDay}
//                     </div>
//                   </div>
                  
//                   {totalHours > 24 && (
//                     <div className="flex justify-between items-center">
//                       <div className="text-gray-600 text-sm">
//                         Additional Hours ({totalHours - 24} hours)
//                       </div>
//                       <div className="font-medium">
//                         AED {((totalHours - 24) * product.pricePerHour).toFixed(2)}
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-between items-center">
//                     <div className="text-gray-600 text-sm">
//                       Subtotal
//                     </div>
//                     <div className="font-medium">
//                       AED {totalPrice.toFixed(2)}
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <div className="text-gray-600 text-sm">
//                       Security Deposit (refundable)
//                     </div>
//                     <div className="text-[#e4086f] font-medium">
//                       AED {deposit}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="w-full h-[1px] bg-gray-200 my-4" />
                
//                 <div className="flex justify-between items-center mb-6">
//                   <div className="text-black text-lg font-bold">
//                     Total:
//                   </div>
//                   <div className="text-[#e4086f] text-lg font-bold">
//                     AED {(totalPrice + deposit).toFixed(2)}
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handlePayNow}
//                   className="w-full h-[48px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mb-4 hover:bg-[#e9d300] transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200"
//                 >
//                   <div className="text-center text-black text-[16px] font-bold font-karla">
//                     Pay Now
//                   </div>
//                 </button>
                
//                 <div className="flex justify-around w-full items-center mt-4">
//                   <img className="h-[19.2px] w-auto" src="/payment1.png" alt="Payment1" />
//                   <img className="h-[19.2px] w-auto" src="/mastercard.png" alt="Logo1" />
//                   <img className="h-[19.2px] w-auto" src="/paypal.png" alt="Logo2" />
//                   <img className="h-[19.2px] w-auto" src="/visa.png" alt="Logo3" />
//                   <img className="h-[19.2px] w-auto" src="/payment.png" alt="Payment" />
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Success Modal */}
//           {isModalOpen && (
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//               onClick={handleCloseModal}
//             >
//               <div
//                 className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[380px] max-w-md h-auto min-h-[230px] text-center"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex justify-center items-center mb-5">
//                   <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#30BD75] border-4 border-[#9ae6b4] rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M5 12l5 5L20 7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="text-[20px] md:text-[24px] font-bold font-karla mb-4">
//                   Successfully paid deposit!
//                 </div>
//                 <div className="text-[#6B6B6B] text-[14px] md:text-[16px] mb-6">
//                   Thank you for your payment. Your rental has been confirmed from {startDate} to {endDate}. The KuKu team will deliver the item to your doorstep and pick it up upon return.
//                 </div>
//                 <button
//                   onClick={handleCloseModal}
//                   className="w-full h-[48px] bg-[#e4086f] rounded-[14px] text-white hover:bg-[#c40761] transition-colors"
//                 >
//                   Go to Selling Page
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <DownloadKuku />
//       <Footer />
//     </>
//   );
// }













"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import CartAddress from "@/components/userProfile/CartAddress";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Renting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [pricePerHour, setPricePerHour] = useState(0); // Keep for UI display
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { token } = useSelector((store) => store.auth);
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate"); // DD/MM/YYYY
  const endDate = searchParams.get("endDate"); // DD/MM/YYYY
  const productId = searchParams.get("productId");
  const router = useRouter();

  // Function to convert DD/MM/YYYY to YYYY-MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        setErrorMessage("No product selected for rental");
        setErrorPopupOpen(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        if (!token) {
          throw new Error("No auth token available");
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.product) {
          const productData = response.data.product;
          if (productData.price <= 500) {
            setErrorMessage(
              "This product is not available for rental as its price is below 500 AED."
            );
            setErrorPopupOpen(true);
            setLoading(false);
            return;
          }

          setProduct(productData);
          setDeposit(Math.round(productData.price * 0.2)); // 20% deposit
          setPricePerHour(13); // Fixed additional hourly rate to match example (312 / 24 = 13)

          if (startDate && endDate) {
            const start = new Date(formatDate(startDate));
            const end = new Date(formatDate(endDate));
            const diffTime = Math.abs(end - start);
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
            setTotalHours(diffHours);

            const basePrice = productData.pricePerDay || 0; // e.g., 199 AED
            let totalRentalPrice = basePrice; // Base price for first 24 hours
            let additionalHours = 0;

            if (diffHours > 24) {
              additionalHours = diffHours - 24; // Hours beyond 24
              totalRentalPrice += additionalHours * 13; // Additional cost at 13 AED/hour
            }

            setTotalPrice(totalRentalPrice);
          }
        } else {
          setErrorMessage("Product not found");
          setErrorPopupOpen(true);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setErrorMessage("Failed to load product details. Please try again.");
        setErrorPopupOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, startDate, endDate, token]);

  const prepareItemForStripe = () => {
    let imageUrl =
      product?.images && product.images.length > 0
        ? product.images[0]
        : "/placeholder.png";
    if (imageUrl && !imageUrl.startsWith("http")) {
      imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`;
    }

    return {
      product: productId,
      name: product?.name || "Rental Product",
      description: `Rental from ${startDate} to ${endDate} (includes refundable deposit)`,
      image: imageUrl,
      price: totalPrice + deposit, // Combined price including deposit
      count: 1,
      size: product?.size?.sizeName || "N/A",
      condition: product?.condition?.conditionName || "N/A",
      depositAmount: deposit, // Added to track deposit separately if needed
    };
  };

const handlePayNow = async () => {
  setProcessingPayment(true);
  try {
    if (!token) {
      setErrorMessage("Please log in to proceed to payment");
      setErrorPopupOpen(true);
      return;
    }

    if (!selectedAddress?._id) {
      setErrorMessage("Please select a delivery address");
      setErrorPopupOpen(true);
      return;
    }

    if (!startDate || !endDate) {
      setErrorMessage("Please provide rental start and end dates");
      setErrorPopupOpen(true);
      return;
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const orderPayload = {
      products: [
        {
          product: productId,
          isRental: true,
          rentalDurationHours: totalHours,
          quantity: 1,
          pricePerHour: pricePerHour,
          totalPrice: totalPrice,
          deposit: deposit,
        },
      ],
      totalAmount: totalPrice + deposit,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      shippingAddress: selectedAddress._id,
      paymentMethod: "Credit Card",
    };

    console.log("Creating order with payload:", orderPayload);

    const orderResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/rentcreate`,
      orderPayload,
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        timeout: 60000,
      }
    );

    if (orderResponse.data.order) {
      const orderId = orderResponse.data.order._id;
      const stripeItem = prepareItemForStripe(orderId);
      const payload = {
        products: [stripeItem],
        orderId: orderId,
        finalAmount: totalPrice + deposit,
      };

      console.log("Calling makePayment with payload:", payload);

      const stripeResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rentMakePayment`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          timeout: 60000,
        }
      );

      const session = stripeResponse.data;
      if (session?.id) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

        if (error) {
          console.error("Stripe redirect error:", error);
          setErrorMessage("Payment processing failed. Please try again.");
          setErrorPopupOpen(true);
          return;
        }

        toast.success("Order created successfully, redirecting to payment...");
        setIsModalOpen(true);
      } else {
        throw new Error("Failed to create payment session");
      }
    } else {
      throw new Error("Failed to create order");
    }
  } catch (error) {
    console.error("Payment error:", {
      message: error.message,
      response: error.response?.data,
      code: error.code,
    });
    setErrorMessage(
      error.code === "ECONNABORTED"
        ? "Request timed out. Please try again later."
        : error.response?.data?.message || error.message || "Failed to process payment"
    );
    setErrorPopupOpen(true);
  } finally {
    setProcessingPayment(false);
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/selling-page");
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-[1550px] mx-auto py-20 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-48 h-6 bg-gray-200 rounded mb-4"></div>
            <div className="w-64 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-[1550px] mx-auto">
        <div className="px-4 sm:px-6 md:px-[50px] lg:px-[70px] py-4 md:py-[50px] lg:py-[70px]">
          <div className="text-[#070707] text-[28px] md:text-[36.8px] font-normal font-luckiest leading-[34px] md:leading-[44.16px] mb-6">
            RENTING
          </div>

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

          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="w-full lg:w-[68%] xl:w-2/3">
              <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row justify-start items-start gap-6">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      className="w-full sm:w-[180px] md:w-[220px] h-auto object-cover rounded-lg transition-transform hover:scale-105 duration-300"
                      src={
                        product?.images && product.images.length > 0
                          ? product.images[0]
                          : "/placeholder.png"
                      }
                      alt={product?.name}
                    />
                    <div className="absolute top-2 right-2 bg-[#FDE504] text-black text-xs font-bold px-2 py-1 rounded-full">
                      RENTAL
                    </div>
                  </div>

                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="text-[20px] md:text-[24px] font-bold font-karla mb-2">
                        {product?.name}
                      </h2>
                      <p className="text-gray-600 text-sm md:text-base mb-4">
                        {product?.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla">
                            SIZE:
                          </span>
                          <span className="px-2 py-1 border border-[#e4086f] text-[#e4086f]">
                            {product?.size?.sizeName || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla">
                            CONDITION:
                          </span>
                          <span className="font-medium">
                            {product?.condition?.conditionName || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#E4086F] font-bold">
                          Base Rental Price (24 hours):
                        </span>
                        <span className="font-bold">
                          AED {product?.pricePerDay}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#E4086F] font-bold">
                          Rental Duration:
                        </span>
                        <span className="font-bold">{totalHours} hours</span>
                      </div>
                      {totalHours > 24 && (
                        <div className="flex justify-between items-center">
                          <span className="text-[#E4086F] font-bold">
                            Additional Hourly Rate:
                          </span>
                          <span className="font-bold">
                            AED {pricePerHour.toFixed(2)}/hour
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-bold mb-4">Rental Period</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[#E4086F] font-bold mb-1">From</span>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <span className="font-medium">{startDate}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#E4086F] font-bold mb-1">To</span>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <span className="font-medium">{endDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-bold mb-4">Delivery & Return</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Your rental item will be delivered to your doorstep by the
                  KuKu team. Upon return, the KuKu team will pick up the item
                  from your location after the rental period.
                </p>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">Rental Policy</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Please ensure you return the item in the same condition as
                  received. Any damage beyond normal wear may result in
                  additional charges. The KuKu team will perform a quality check
                  upon return to process your deposit refund.
                </p>
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-blue-800">
                    A refundable security deposit of AED {deposit} is required
                    for renting this item. The deposit will be refunded after
                    the KuKu team verifies the item’s condition upon return.
                  </p>
                </div>
                <div className="mt-3">
                  <a
                    href="#"
                    className="text-[#E4086F] text-sm font-bold underline"
                  >
                    View our rental policy
                  </a>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg shadow-sm mt-6">
                <h3 className="text-lg font-bold mb-4">Delivery Address</h3>
                <CartAddress onAddressSelect={setSelectedAddress} />
              </div>
            </div>

            <div className="w-full sm:w-[400px] md:w-[350px] lg:w-[30%] xl:w-1/4 mt-6 lg:mt-0 sticky top-4">
              <div className="w-full bg-white p-5 border border-gray-200 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 text-sm">
                      Base Rental Price (24 hours)
                    </div>
                    <div className="font-medium">
                      AED {product?.pricePerDay}
                    </div>
                  </div>

                  {totalHours > 24 && (
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 text-sm">
                        Additional Hours ({totalHours - 24} hours)
                      </div>
                      <div className="font-medium">
                        AED {((totalHours - 24) * pricePerHour).toFixed(2)}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 text-sm">Subtotal</div>
                    <div className="font-medium">
                      AED {totalPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 text-sm">
                      Security Deposit (refundable)
                    </div>
                    <div className="text-[#e4086f] font-medium">
                      AED {deposit}
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gray-200 my-4" />

                <div className="flex justify-between items-center mb-6">
                  <div className="text-black text-lg font-bold">Total:</div>
                  <div className="text-[#e4086f] text-lg font-bold">
                    AED {(totalPrice + deposit).toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={handlePayNow}
                  disabled={processingPayment || !selectedAddress}
                  className="w-full h-[48px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mb-4 hover:bg-[#e9d300] transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-center text-black text-[16px] font-bold font-karla">
                    {processingPayment
                      ? "Processing Payment..."
                      : "Pay with Stripe"}
                  </div>
                </button>

                <div className="flex justify-around w-full items-center mt-4">
                  <img
                    className="h-[19.2px] w-auto"
                    src="/visa.png"
                    alt="Visa"
                  />
                  <img
                    className="h-[19.2px] w-auto"
                    src="/mastercard.png"
                    alt="MasterCard"
                  />
                  <img
                    className="h-[19.2px] w-auto"
                    src="/paypal.png"
                    alt="PayPal"
                  />
                </div>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={handleCloseModal}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[380px] max-w-md h-auto min-h-[230px] text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-center items-center mb-5">
                  <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#30BD75] border-4 border-[#9ae6b4] rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12l5 5L20 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-[20px] md:text-[24px] font-bold font-karla mb-4">
                  Successfully paid deposit!
                </div>
                <div className="text-[#6B6B6B] text-[14px] md:text-[16px] mb-6">
                  Thank you for your payment. Your rental has been confirmed
                  from {startDate} to {endDate}. The KuKu team will deliver the
                  item to your doorstep and pick it up upon return.
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-full h-[48px] bg-[#e4086f] rounded-[14px] text-white hover:bg-[#c40761] transition-colors"
                >
                  Go to Selling Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <DownloadKuku />
      <Footer />
    </>
  );
}
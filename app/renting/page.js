

// "use client";

// import Link from "next/link";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import DownloadKuku from "@/components/home/DownloadKuku";
// import CartAddress from "@/components/userProfile/CartAddress";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// export default function Renting() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalHours, setTotalHours] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [deposit, setDeposit] = useState(0);
//   const [pricePerHour, setPricePerHour] = useState(0);
//   const [processingPayment, setProcessingPayment] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [availabilityChecking, setAvailabilityChecking] = useState(false);
//   const [isAvailable, setIsAvailable] = useState(true);

//   const { token } = useSelector((store) => store.auth);
//   const searchParams = useSearchParams();
//   const startDate = searchParams.get("startDate"); // DD/MM/YYYY
//   const endDate = searchParams.get("endDate"); // DD/MM/YYYY
//   const productId = searchParams.get("productId");
//   const router = useRouter();

//   // Function to convert DD/MM/YYYY to YYYY-MM-DD
//   const formatDate = (dateStr) => {
//     if (!dateStr) return null;
//     const [day, month, year] = dateStr.split("/");
//     return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
//   };

//   // Function to validate dates and check availability
//   const validateDatesAndAvailability = async (productData) => {
//     if (!startDate || !endDate) {
//       setErrorMessage("Start date and end date are required");
//       setErrorPopupOpen(true);
//       return false;
//     }

//     const start = new Date(formatDate(startDate));
//     const end = new Date(formatDate(endDate));
//     const now = new Date();
    
//     // Remove time component for date comparison
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
//     const endDateOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());

//     // Validate dates
//     if (startDateOnly < today) {
//       setErrorMessage("Start date cannot be in the past");
//       setErrorPopupOpen(true);
//       return false;
//     }

//     if (endDateOnly <= startDateOnly) {
//       setErrorMessage("End date must be after start date");
//       setErrorPopupOpen(true);
//       return false;
//     }

//     // Check for conflicts with existing rentals (including buffer time)
//     if (productData.rent && productData.rent.length > 0) {
//       const activeRentals = productData.rent.filter(rental => rental.status === "Active");
      
//       for (const rental of activeRentals) {
//         const rentalStart = new Date(rental.startDate);
//         const rentalEnd = new Date(rental.endDate);
        
//         // Add buffer time: 1 day before and after existing rental
//         const bufferStart = new Date(rentalStart);
//         bufferStart.setDate(bufferStart.getDate() - 1);
        
//         const bufferEnd = new Date(rentalEnd);
//         bufferEnd.setDate(bufferEnd.getDate() + 1);

//         // Check if requested period conflicts with buffered rental period
//         if (startDateOnly < bufferEnd && endDateOnly > bufferStart) {
//           const conflictStartStr = rentalStart.toLocaleDateString('en-GB');
//           const conflictEndStr = rentalEnd.toLocaleDateString('en-GB');
          
//           setErrorMessage(
//             `This product is not available for the selected dates. It's already rented from ${conflictStartStr} to ${conflictEndStr}. Please choose different dates with at least 1 day gap.`
//           );
//           setErrorPopupOpen(true);
//           setIsAvailable(false);
//           return false;
//         }
//       }
//     }

//     setIsAvailable(true);
//     return true;
//   };

//   // Function to check real-time availability with backend
//   const checkRealTimeAvailability = async () => {
//     if (!productId || !startDate || !endDate || !token) return;

//     setAvailabilityChecking(true);
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/check-availability`,
//         {
//           productId,
//           startDate: formatDate(startDate),
//           endDate: formatDate(endDate)
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (!response.data.available) {
//         setErrorMessage(response.data.message || "Product is not available for selected dates");
//         setErrorPopupOpen(true);
//         setIsAvailable(false);
//         return false;
//       }

//       setIsAvailable(true);
//       return true;
//     } catch (error) {
//       console.error("Availability check failed:", error);
//       // Don't show error for availability check failure, just proceed
//       return true;
//     } finally {
//       setAvailabilityChecking(false);
//     }
//   };

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       if (!productId) {
//         setErrorMessage("No product selected for rental");
//         setErrorPopupOpen(true);
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         if (!token) {
//           throw new Error("No auth token available");
//         }
        
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (response.data.product) {
//           const productData = response.data.product;
          
//           // Check if product price is above 500 AED
//           if (productData.price <= 500) {
//             setErrorMessage(
//               "This product is not available for rental as its price is below 500 AED."
//             );
//             setErrorPopupOpen(true);
//             setLoading(false);
//             return;
//           }

//           // Check if product is available for rent
//           if (productData.openToRent !== "Yes") {
//             setErrorMessage("This product is not available for rental.");
//             setErrorPopupOpen(true);
//             setLoading(false);
//             return;
//           }

//           setProduct(productData);
//           setDeposit(productData.deposit || 0);
//           setPricePerHour(productData.pricePerHour || 0);

//           // Validate dates and check availability
//           const datesValid = await validateDatesAndAvailability(productData);
          
//           if (datesValid && startDate && endDate) {
//             const start = new Date(formatDate(startDate));
//             const end = new Date(formatDate(endDate));
//             const diffTime = Math.abs(end - start);
//             const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
//             setTotalHours(diffHours);

//             const basePrice = productData.pricePerDay || 0;
//             let totalRentalPrice = basePrice; // Base price for first 24 hours

//             if (diffHours > 24) {
//               const additionalHours = diffHours - 24;
//               totalRentalPrice += additionalHours * (productData.pricePerHour || 0);
//             }

//             setTotalPrice(totalRentalPrice);

//             // Check real-time availability
//             await checkRealTimeAvailability();
//           }
//         } else {
//           setErrorMessage("Product not found");
//           setErrorPopupOpen(true);
//         }
//       } catch (error) {
//         console.error("Failed to fetch product details:", error);
//         setErrorMessage("Failed to load product details. Please try again.");
//         setErrorPopupOpen(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [productId, startDate, endDate, token]);

//   const prepareItemForStripe = () => {
//     let imageUrl =
//       product?.images && product.images.length > 0
//         ? product.images[0]
//         : "/placeholder.png";
//     if (imageUrl && !imageUrl.startsWith("http")) {
//       imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`;
//     }

//     return {
//       product: productId,
//       name: product?.name || "Rental Product",
//       description: `Rental from ${startDate} to ${endDate} (includes refundable deposit)`,
//       image: imageUrl,
//       price: totalPrice + deposit,
//       count: 1,
//       size: product?.size?.sizeName || "N/A",
//       condition: product?.condition?.conditionName || "N/A",
//       depositAmount: deposit,
//     };
//   };

//   const handlePayNow = async () => {
//     setProcessingPayment(true);
//     try {
//       if (!token) {
//         setErrorMessage("Please log in to proceed to payment");
//         setErrorPopupOpen(true);
//         return;
//       }

//       if (!selectedAddress?._id) {
//         setErrorMessage("Please select a delivery address");
//         setErrorPopupOpen(true);
//         return;
//       }

//       if (!startDate || !endDate) {
//         setErrorMessage("Please provide rental start and end dates");
//         setErrorPopupOpen(true);
//         return;
//       }

//       // Final availability check before payment
//       const availabilityCheck = await checkRealTimeAvailability();
//       if (!availabilityCheck) {
//         return;
//       }

//       const formattedStartDate = formatDate(startDate);
//       const formattedEndDate = formatDate(endDate);

//       const orderPayload = {
//         products: [
//           {
//             product: productId,
//             isRental: true,
//             rentalDurationHours: totalHours,
//             quantity: 1,
//             pricePerHour: pricePerHour,
//             totalPrice: totalPrice,
//             deposit: deposit,
//           },
//         ],
//         totalAmount: totalPrice,
//         depositAmount: deposit,
//         startDate: formattedStartDate,
//         endDate: formattedEndDate,
//         shippingAddress: selectedAddress._id,
//         paymentMethod: "Credit Card",
//       };

//       console.log("Creating order with payload:", orderPayload);

//       const orderResponse = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/rentcreate`,
//         orderPayload,
//         {
//           headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//           timeout: 60000,
//         }
//       );

//       if (orderResponse.data.order) {
//         const orderId = orderResponse.data.order._id;
//         const stripeItem = prepareItemForStripe(orderId);
//         const payload = {
//           products: [stripeItem],
//           orderId: orderId,
//           finalAmount: totalPrice + deposit,
//         };

//         console.log("Calling makePayment with payload:", payload);

//         const stripeResponse = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/rentMakePayment`,
//           payload,
//           {
//             headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//             timeout: 60000,
//           }
//         );

//         const session = stripeResponse.data;
//         if (session?.id) {
//           const stripe = await stripePromise;
//           const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

//           if (error) {
//             console.error("Stripe redirect error:", error);
//             setErrorMessage("Payment processing failed. Please try again.");
//             setErrorPopupOpen(true);
//             return;
//           }

//           toast.success("Order created successfully, redirecting to payment...");
//           setIsModalOpen(true);
//         } else {
//           throw new Error("Failed to create payment session");
//         }
//       } else {
//         throw new Error("Failed to create order");
//       }
//     } catch (error) {
//       console.error("Payment error:", {
//         message: error.message,
//         response: error.response?.data,
//         code: error.code,
//       });
      
//       // Handle specific error messages from backend
//       const errorMsg = error.response?.data?.message || error.message || "Failed to process payment";
      
//       if (errorMsg.includes("already rented") || errorMsg.includes("not available")) {
//         setErrorMessage(`${errorMsg}. Please refresh the page and select different dates.`);
//       } else if (error.code === "ECONNABORTED") {
//         setErrorMessage("Request timed out. Please try again later.");
//       } else {
//         setErrorMessage(errorMsg);
//       }
      
//       setErrorPopupOpen(true);
//     } finally {
//       setProcessingPayment(false);
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

//   return (
//     <>
//       <Header />
//       <div className="max-w-[1550px] mx-auto">
//         <div className="px-4 sm:px-6 md:px-[50px] lg:px-[70px] py-4 md:py-[50px] lg:py-[70px]">
//           <div className="text-[#070707] text-[28px] md:text-[36.8px] font-normal font-luckiest leading-[34px] md:leading-[44.16px] mb-6">
//             RENTING
//           </div>

//           {errorPopupOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//               <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
//                 <p className="text-red-600 font-semibold text-center mb-4">
//                   {errorMessage}
//                 </p>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setErrorPopupOpen(false)}
//                     className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => {
//                       setErrorPopupOpen(false);
//                       router.push(`/product/${productId}`);
//                     }}
//                     className="flex-1 bg-[#e4086f] hover:bg-[#c40761] text-white font-medium py-2 px-4 rounded transition"
//                   >
//                     Select New Dates
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Availability Status Banner */}
//           {!isAvailable && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-sm font-medium text-red-800">
//                     Product Not Available
//                   </h3>
//                   <div className="mt-2 text-sm text-red-700">
//                     <p>This product is not available for the selected rental period. Please choose different dates.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
//             <div className="w-full lg:w-[68%] xl:w-2/3">
//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
//                 <div className="flex flex-col sm:flex-row justify-start items-start gap-6">
//                   <div className="relative overflow-hidden rounded-lg">
//                     <img
//                       className="w-full sm:w-[180px] md:w-[220px] h-auto object-cover rounded-lg transition-transform hover:scale-105 duration-300"
//                       src={
//                         product?.images && product.images.length > 0
//                           ? product.images[0]
//                           : "/placeholder.png"
//                       }
//                       alt={product?.name}
//                     />
//                     <div className="absolute top-2 right-2 bg-[#FDE504] text-black text-xs font-bold px-2 py-1 rounded-full">
//                       RENTAL
//                     </div>
//                     {!isAvailable && (
//                       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                         <span className="text-white font-bold text-sm">NOT AVAILABLE</span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-col justify-between flex-grow">
//                     <div>
//                       <h2 className="text-[20px] md:text-[24px] font-bold font-karla mb-2">
//                         {product?.name}
//                       </h2>
//                       <p className="text-gray-600 text-sm md:text-base mb-4">
//                         {product?.description}
//                       </p>

//                       <div className="flex flex-wrap gap-4 mb-4">
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla">
//                             SIZE:
//                           </span>
//                           <span className="px-2 py-1 border border-[#e4086f] text-[#e4086f]">
//                             {product?.size?.sizeName || "N/A"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla">
//                             CONDITION:
//                           </span>
//                           <span className="font-medium">
//                             {product?.condition?.conditionName || "N/A"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-4 space-y-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-[#E4086F] font-bold">
//                           Base Rental Price (24 hours):
//                         </span>
//                         <span className="font-bold">
//                           AED {product?.pricePerDay}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-[#E4086F] font-bold">
//                           Rental Duration:
//                         </span>
//                         <span className="font-bold">{totalHours} hours</span>
//                       </div>
//                       {totalHours > 24 && (
//                         <div className="flex justify-between items-center">
//                           <span className="text-[#E4086F] font-bold">
//                             Additional Hourly Rate:
//                           </span>
//                           <span className="font-bold">
//                             AED {pricePerHour.toFixed(2)}/hour
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

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
//                 {availabilityChecking && (
//                   <div className="mt-3 text-center text-blue-600">
//                     <span className="animate-pulse">Checking availability...</span>
//                   </div>
//                 )}
//               </div>

//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm mb-6">
//                 <h3 className="text-lg font-bold mb-4">Delivery & Return</h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Your rental item will be delivered to your doorstep by the
//                   KuKu team. Upon return, the KuKu team will pick up the item
//                   from your location after the rental period.
//                 </p>
//               </div>

//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm">
//                 <h3 className="text-lg font-bold mb-2">Rental Policy</h3>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Please ensure you return the item in the same condition as
//                   received. Any damage beyond normal wear may result in
//                   additional charges. The KuKu team will perform a quality check
//                   upon return to process your deposit refund.
//                 </p>
//                 <div className="bg-blue-50 p-3 rounded-md">
//                   <p className="text-sm font-medium text-blue-800">
//                     A refundable security deposit of AED {deposit} is required
//                     for renting this item. The deposit will be refunded after
//                     the KuKu team verifies the item&apos;s condition upon return.
//                   </p>
//                 </div>
//                 <div className="mt-3">
//                   <a
//                     href="#"
//                     className="text-[#E4086F] text-sm font-bold underline"
//                   >
//                     View our rental policy
//                   </a>
//                 </div>
//               </div>

//               <div className="p-5 border border-gray-200 rounded-lg shadow-sm mt-6">
//                 <h3 className="text-lg font-bold mb-4">Delivery Address</h3>
//                 <CartAddress onAddressSelect={setSelectedAddress} />
//               </div>
//             </div>

//             <div className="w-full sm:w-[400px] md:w-[350px] lg:w-[30%] xl:w-1/4 mt-6 lg:mt-0 sticky top-4">
//               <div className="w-full bg-white p-5 border border-gray-200 rounded-lg shadow-lg">
//                 <h3 className="text-lg font-bold mb-4">Order Summary</h3>

//                 <div className="space-y-3 mb-4">
//                   <div className="flex justify-between items-center">
//                     <div className="text-gray-600 text-sm">
//                       Base Rental Price (24 hours)
//                     </div>
//                     <div className="font-medium">
//                       AED {product?.pricePerDay}
//                     </div>
//                   </div>

//                   {totalHours > 24 && (
//                     <div className="flex justify-between items-center">
//                       <div className="text-gray-600 text-sm">
//                         Additional Hours ({totalHours - 24} hours)
//                       </div>
//                       <div className="font-medium">
//                         AED {((totalHours - 24) * pricePerHour).toFixed(2)}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex justify-between items-center">
//                     <div className="text-gray-600 text-sm">Subtotal</div>
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
//                   <div className="text-black text-lg font-bold">Total:</div>
//                   <div className="text-[#e4086f] text-lg font-bold">
//                     AED {(totalPrice + deposit).toFixed(2)}
//                   </div>
//                 </div>

//                 <button
//                   onClick={handlePayNow}
//                   disabled={processingPayment || !selectedAddress || !isAvailable || availabilityChecking}
//                   className="w-full h-[48px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mb-4 hover:bg-[#e9d300] transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <div className="text-center text-black text-[16px] font-bold font-karla">
//                     {processingPayment
//                       ? "Processing Payment..."
//                       : availabilityChecking
//                       ? "Checking Availability..."
//                       : !isAvailable
//                       ? "Not Available"
//                       : "Pay Now"}
//                   </div>
//                 </button>

//                 {!isAvailable && (
//                   <button
//                     onClick={() => router.push(`/product/${productId}`)}
//                     className="w-full h-[48px] p-2 bg-[#e4086f] rounded-[16px] justify-center items-center mb-4 hover:bg-[#c40761] transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200"
//                   >
//                     <div className="text-center text-white text-[16px] font-bold font-karla">
//                       Select New Dates
//                     </div>
//                   </button>
//                 )}

//                 <div className="flex justify-around w-full items-center mt-4">
//                   <img
//                     className="h-[19.2px] w-auto"
//                     src="/visa.png"
//                     alt="Visa"
//                   />
//                   <img
//                     className="h-[19.2px] w-auto"
//                     src="/mastercard.png"
//                     alt="MasterCard"
//                   />
//                   <img
//                     className="h-[19.2px] w-auto"
//                     src="/paypal.png"
//                     alt="PayPal"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

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
//                   Thank you for your payment. Your rental has been confirmed
//                   from {startDate} to {endDate}. The KuKu team will deliver the
//                   item to your doorstep and pick it up upon return.
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
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [availabilityChecking, setAvailabilityChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

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

  // Function to validate dates and check availability
  const validateDatesAndAvailability = async (productData) => {
    if (!startDate || !endDate) {
      setErrorMessage("Start date and end date are required");
      setErrorPopupOpen(true);
      return false;
    }

    const start = new Date(formatDate(startDate));
    const end = new Date(formatDate(endDate));
    const now = new Date();
    
    // Remove time component for date comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDateOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    // Validate dates
    if (startDateOnly < today) {
      setErrorMessage("Start date cannot be in the past");
      setErrorPopupOpen(true);
      return false;
    }

    if (endDateOnly <= startDateOnly) {
      setErrorMessage("End date must be after start date");
      setErrorPopupOpen(true);
      return false;
    }

    // Check for conflicts with existing rentals (including buffer time)
    if (productData.rent && productData.rent.length > 0) {
      const activeRentals = productData.rent.filter(rental => rental.status === "Active");
      
      for (const rental of activeRentals) {
        const rentalStart = new Date(rental.startDate);
        const rentalEnd = new Date(rental.endDate);
        
        // Add buffer time: 1 day before and after existing rental
        const bufferStart = new Date(rentalStart);
        bufferStart.setDate(bufferStart.getDate() - 1);
        
        const bufferEnd = new Date(rentalEnd);
        bufferEnd.setDate(bufferEnd.getDate() + 1);

        // Check if requested period conflicts with buffered rental period
        if (startDateOnly < bufferEnd && endDateOnly > bufferStart) {
          const conflictStartStr = rentalStart.toLocaleDateString('en-GB');
          const conflictEndStr = rentalEnd.toLocaleDateString('en-GB');
          
          setErrorMessage(
            `This product is not available for the selected dates. It's already rented from ${conflictStartStr} to ${conflictEndStr}. Please choose different dates with at least 1 day gap.`
          );
          setErrorPopupOpen(true);
          setIsAvailable(false);
          return false;
        }
      }
    }

    setIsAvailable(true);
    return true;
  };

  // Function to check real-time availability with backend
  const checkRealTimeAvailability = async () => {
    if (!productId || !startDate || !endDate || !token) return;

    setAvailabilityChecking(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/check-availability`,
        {
          productId,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!response.data.available) {
        setErrorMessage(response.data.message || "Product is not available for selected dates");
        setErrorPopupOpen(true);
        setIsAvailable(false);
        return false;
      }

      setIsAvailable(true);
      return true;
    } catch (error) {
      console.error("Availability check failed:", error);
      // Don't show error for availability check failure, just proceed
      return true;
    } finally {
      setAvailabilityChecking(false);
    }
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
          
          // Check if product price is above 500 AED
          if (productData.price <= 500) {
            setErrorMessage(
              "This product is not available for rental as its price is below 500 AED."
            );
            setErrorPopupOpen(true);
            setLoading(false);
            return;
          }

          // Check if product is available for rent
          if (productData.openToRent !== "Yes") {
            setErrorMessage("This product is not available for rental.");
            setErrorPopupOpen(true);
            setLoading(false);
            return;
          }

          setProduct(productData);
          setDeposit(productData.deposit || 0);

          // Validate dates and check availability
          const datesValid = await validateDatesAndAvailability(productData);
          
          if (datesValid && startDate && endDate) {
            const start = new Date(formatDate(startDate));
            const end = new Date(formatDate(endDate));
            const diffTime = Math.abs(end - start);
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
            setTotalHours(diffHours);

            const basePrice = productData.pricePerDay || 0;
            const diffDays = Math.ceil(diffHours / 24); // Convert hours to days, rounding up
            const totalRentalPrice = basePrice * diffDays; // Price per day multiplied by number of days

            setTotalPrice(totalRentalPrice);

            // Check real-time availability
            await checkRealTimeAvailability();
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
      price: totalPrice + deposit,
      count: 1,
      size: product?.size?.sizeName || "N/A",
      condition: product?.condition?.conditionName || "N/A",
      depositAmount: deposit,
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

      // Final availability check before payment
      const availabilityCheck = await checkRealTimeAvailability();
      if (!availabilityCheck) {
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
            totalPrice: totalPrice,
            deposit: deposit,
            quantity: 1,
          },
        ],
        totalAmount: totalPrice,
        depositAmount: deposit,
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
      
      // Handle specific error messages from backend
      const errorMsg = error.response?.data?.message || error.message || "Failed to process payment";
      
      if (errorMsg.includes("already rented") || errorMsg.includes("not available")) {
        setErrorMessage(`${errorMsg}. Please refresh the page and select different dates.`);
      } else if (error.code === "ECONNABORTED") {
        setErrorMessage("Request timed out. Please try again later.");
      } else {
        setErrorMessage(errorMsg);
      }
      
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
                <p className="text-red-600 font-semibold text-center mb-4">
                  {errorMessage}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setErrorPopupOpen(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setErrorPopupOpen(false);
                      router.push(`/product/${productId}`);
                    }}
                    className="flex-1 bg-[#e4086f] hover:bg-[#c40761] text-white font-medium py-2 px-4 rounded transition"
                  >
                    Select New Dates
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Availability Status Banner */}
          {!isAvailable && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Product Not Available
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>This product is not available for the selected rental period. Please choose different dates.</p>
                  </div>
                </div>
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
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">NOT AVAILABLE</span>
                      </div>
                    )}
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
                          Rental Price (per day):
                        </span>
                        <span className="font-bold">
                          AED {product?.pricePerDay}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#E4086F] font-bold">
                          Rental Duration:
                        </span>
                        <span className="font-bold">{Math.ceil(totalHours / 24)} days</span>
                      </div>
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
                {availabilityChecking && (
                  <div className="mt-3 text-center text-blue-600">
                    <span className="animate-pulse">Checking availability...</span>
                  </div>
                )}
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
                    the KuKu team verifies the item&apos;s condition upon return.
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
                      Rental Price (per day)
                    </div>
                    <div className="font-medium">
                      AED {product?.pricePerDay}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 text-sm">
                      Total Days ({Math.ceil(totalHours / 24)} days)
                    </div>
                    <div className="font-medium">
                      AED {(product?.pricePerDay * Math.ceil(totalHours / 24)).toFixed(2)}
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
                  disabled={processingPayment || !selectedAddress || !isAvailable || availabilityChecking}
                  className="w-full h-[48px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mb-4 hover:bg-[#e9d300] transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-center text-black text-[16px] font-bold font-karla">
                    {processingPayment
                      ? "Processing Payment..."
                      : availabilityChecking
                      ? "Checking Availability..."
                      : !isAvailable
                      ? "Not Available"
                      : "Pay Now"}
                  </div>
                </button>

                {!isAvailable && (
                  <button
                    onClick={() => router.push(`/product/${productId}`)}
                    className="w-full h-[48px] p-2 bg-[#e4086f] rounded-[16px] justify-center items-center mb-4 hover:bg-[#c40761] transition-colors transform hover:scale-[1.02] active:scale-[0.98] duration-200"
                  >
                    <div className="text-center text-white text-[16px] font-bold font-karla">
                      Select New Dates
                    </div>
                  </button>
                )}

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

// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import axios from "axios";
// import Cookies from "js-cookie";

// const ReturnOrderPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedCondition, setSelectedCondition] = useState("");
//   const [selectedReasons, setSelectedReasons] = useState([]);
//   const [selectedReimbursement, setSelectedReimbursement] = useState("refund");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showTrackingScreen, setShowTrackingScreen] = useState(false);
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const orderId = searchParams.get("orderId");

//     if (!orderId) {
//       setError("No order ID provided in the URL");
//       setLoading(false);
//       return;
//     }

//     if (pathname.includes("/track-return-status")) {
//       setShowTrackingScreen(true);
//     }

//     const fetchOrderDetails = async () => {
//       try {
//         // Get auth cookie
//         const authCookie = Cookies.get("auth");

//         if (!authCookie) {
//           setError("Please login to view order details");
//           toast.error("Please login to view order details");
//           setTimeout(() => {
//             router.push("/login");
//           }, 1500);
//           return;
//         }

//         let token;

//         // Try to parse as JSON first, if fails then use the string directly
//         try {
//           const parsedAuth = JSON.parse(authCookie);
//           token = parsedAuth.token || parsedAuth; // Handle both formats
//         } catch (parseError) {
//           // If parsing fails, the cookie itself is the token
//           token = authCookie;
//         }

//         if (!token) {
//           setError("Please login to view order details");
//           toast.error("Please login to view order details");
//           setTimeout(() => {
//             router.push("/login");
//           }, 1500);
//           return;
//         }

//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/OrderDetails/${orderId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           setOrder(response.data.order);
//         } else {
//           throw new Error(
//             response.data.message || "Failed to fetch order details"
//           );
//         }
//       } catch (err) {
//         const errorMsg = err.response?.data?.message || err.message;
//         setErrorMessage(errorMsg);
//         setErrorPopupOpen(true);
//         toast.error(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [searchParams, pathname, router]);

//   if (loading) return <div className="text-center p-4 md:p-8">Loading...</div>;
//   if (error)
//     return (
//       <div className="text-center p-4 md:p-8 text-red-500">Error: {error}</div>
//     );
//   if (!order || !order.products || order.products.length === 0) {
//     return (
//       <div className="text-center p-4 md:p-8">No order or products found</div>
//     );
//   }

//   const steps = [
//     { icon: "/bagadd.png", text: "Your Details", active: currentStep === 1 },
//     {
//       icon: "/returnr.png",
//       text: "Reason for Return",
//       active: currentStep === 2,
//     },
//     {
//       icon: "/paymenthand.png",
//       text: "Payment Reimbursement",
//       active: currentStep === 3,
//     },
//     { icon: "/review.png", text: "Review & Submit", active: currentStep === 4 },
//   ];

//   const handleNext = () => {
//     if (
//       currentStep === 2 &&
//       (!selectedCondition || selectedReasons.length === 0)
//     ) {
//       toast.error("Please select a condition and at least one reason");
//       return;
//     }
//     if (currentStep === 3 && !selectedReimbursement) {
//       toast.error("Please select a reimbursement method");
//       return;
//     }
//     setCurrentStep((prev) => prev + 1);
//   };

//   const handlePrevious = () => setCurrentStep((prev) => prev - 1);

//   const handleSubmit = async () => {
//     const orderId = searchParams.get("orderId");
//     if (!orderId) {
//       setErrorMessage("Order ID is missing");
//       setErrorPopupOpen(true);
//       return;
//     }

//     if (
//       !selectedCondition ||
//       selectedReasons.length === 0 ||
//       !selectedReimbursement
//     ) {
//       setErrorMessage("Please complete all steps before submitting");
//       setErrorPopupOpen(true);
//       return;
//     }

//     const authCookie = Cookies.get("auth");
//     if (!authCookie) {
//       setErrorMessage("Please login to submit a return request");
//       setErrorPopupOpen(true);
//       toast.error("Please login to submit a return request");
//       setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//       return;
//     }

//     let token;

//     // Try to parse as JSON first, if fails then use the string directly
//     try {
//       const parsedAuth = JSON.parse(authCookie);
//       token = parsedAuth.token || parsedAuth;
//     } catch (parseError) {
//       // If parsing fails, the cookie itself is the token
//       token = authCookie;
//     }

//     if (!token) {
//       setErrorMessage("Please login to submit a return request");
//       setErrorPopupOpen(true);
//       toast.error("Please login to submit a return request");
//       setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//       return;
//     }

//     const returnData = {
//       condition: selectedCondition,
//       reasons: selectedReasons,
//       reimbursement: selectedReimbursement,
//     };

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/buyer-return/${orderId}`,
//         returnData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setShowSuccessModal(true);
//         toast.success("Return request submitted successfully!");
//       } else {
//         throw new Error(
//           response.data.message || "Failed to submit return request"
//         );
//       }
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.message || "Failed to submit return request";
//       setErrorMessage(errorMsg);
//       setErrorPopupOpen(true);
//       toast.error(errorMsg);
//     }
//   };

//   const handleTrackStatus = () => {
//     const orderId = searchParams.get("orderId");
//     setShowSuccessModal(false);
//     router.push(`/returnorder/track-return-status?orderId=${orderId}`);
//   };

//   const renderProductDetails = (product) => (
//     <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
//       <div className="flex-shrink-0 w-full sm:w-auto">
//         <Image
//           src={
//             product.product.images && product.product.images.length > 0
//               ? product.product.images[0]
//               : "/product-image.png"
//           }
//           alt={product.productName || "Product Image"}
//           width={180}
//           height={160}
//           className="rounded-md object-cover h-[160px] w-full sm:w-[180px]"
//         />
//       </div>
//       <div className="flex-1">
//         <h3 className="font-medium text-base sm:text-lg">
//           {product.productName || "Unknown Product"}
//         </h3>
//         <p className="text-xs sm:text-sm text-gray-500 mt-1">
//           {product.product.description || "No description"}
//         </p>
//         <p className="text-xs sm:text-sm text-gray-600 mt-1">
//           Brand: {product.product.brand?.brandName || "Unknown Brand"}
//         </p>
//         <div className="flex items-center gap-2 mt-2">
//           <span className="font-medium text-base sm:text-lg">
//             AED{order.finalAmount.toFixed(2)}
//           </span>
//           {order.discount > 0 && (
//             <>
//               <span className="text-gray-500 text-xs sm:text-sm line-through">
//                 AED{order.totalAmount.toFixed(2)}
//               </span>
//               <span className="text-green-500 text-xs sm:text-sm font-medium">
//                 {((order.discount / order.totalAmount) * 100).toFixed(0)}% OFF
//               </span>
//             </>
//           )}
//         </div>
//         <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
//           <div className="flex items-center gap-2">
//             <span className="text-gray-500 text-xs sm:text-sm">SIZE:</span>
//             <span className="px-2 py-0.5 border border-[#E4086F] text-[#E4086F] rounded text-xs sm:text-sm">
//               {product.size || "N/A"}
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-xs sm:text-sm">CONDITION:</span>
//             <span className="text-xs sm:text-sm text-gray-500">
//               {product.product.condition?.conditionName || "Unknown Condition"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (showTrackingScreen) {
//     return (
//       <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
//           Track Return Status
//         </h1>
//         <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//             <div className="w-full lg:w-64">
//               <div className="relative">
//                 <div className="flex items-start gap-3 mb-6 sm:mb-8">
//                   <div className="w-6 h-6 rounded-full bg-[#E4086F] flex items-center justify-center flex-shrink-0">
//                     <svg
//                       className="w-4 h-4 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="font-medium text-sm sm:text-base">
//                       Return started
//                     </p>
//                     <p className="text-[#E4086F] text-xs sm:text-sm">
//                       Awaiting admin processing
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 mb-6 sm:mb-8">
//                   <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
//                     <div className="w-2 h-2 rounded-full bg-gray-200"></div>
//                   </div>
//                   <p className="text-gray-500 text-xs sm:text-sm">
//                     Drop off the item by{" "}
//                     {new Date(
//                       Date.now() + 7 * 24 * 60 * 60 * 1000
//                     ).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="absolute left-3 top-6 w-0.5 h-[calc(100%-48px)] bg-gray-200"></div>
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="flex items-start gap-3 sm:gap-4 mb-4">
//                 <Image
//                   src="/delivery_icon.png"
//                   alt="Delivery"
//                   width={28}
//                   height={28}
//                   className="flex-shrink-0"
//                 />
//                 <div>
//                   <span className="text-[#E4086F] font-medium text-sm sm:text-base">
//                     {order.orderStatus || "Buyer Wanted Return Item"}
//                   </span>
//                   <span className="text-gray-400 text-xs sm:text-sm block">
//                     On{" "}
//                     {new Date(
//                       order.processingDetails?.buyerReturnDetail
//                         ?.returnInitiatedAt || order.paidAt
//                     ).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//               {renderProductDetails(order.products[0])}
//               <div className="flex flex-col sm:flex-row sm:justify-between mt-6 gap-4">
//                 <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs sm:text-sm">
//                   <div>
//                     <span className="text-gray-500 block">Order Id:</span>
//                     <span>#{searchParams.get("orderId")}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-500 block">Return Term:</span>
//                     <span>{new Date().toLocaleDateString()}</span>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => router.push("/")}
//                 className="mt-6 sm:mt-8 w-full bg-[#E4086F] text-white py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
//       <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
//         Return My Order(s)
//       </h1>
//       <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
//         <div className="hidden sm:block lg:w-72">
//           <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md lg:h-fit">
//             <div className="flex sm:flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
//               {steps.map((step, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-3 relative flex-shrink-0 lg:flex-shrink lg:mb-0"
//                 >
//                   <div
//                     className={`w-10 h-10 ${
//                       step.active || index + 1 < currentStep
//                         ? "bg-[#B25CF3]"
//                         : "border-2 border-gray-200"
//                     } flex items-center justify-center flex-shrink-0`}
//                   >
//                     <Image
//                       src={step.icon}
//                       alt={step.text}
//                       width={45}
//                       height={45}
//                       className={
//                         step.active || index + 1 < currentStep
//                           ? ""
//                           : "opacity-50"
//                       }
//                     />
//                   </div>
//                   <span
//                     className={`text-xs sm:text-sm whitespace-nowrap lg:whitespace-normal ${
//                       step.active
//                         ? "text-[#E4086F] font-medium"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {step.text}
//                   </span>
//                   {index < steps.length - 1 && (
//                     <div
//                       className={`hidden lg:block absolute left-5 top-10 w-0.5 h-14 ${
//                         index + 1 < currentStep ? "bg-[#B25CF3]" : "bg-gray-200"
//                       }`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="sm:hidden bg-white rounded-lg p-4 shadow-md">
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-[#E4086F]">
//               Step {currentStep} of {steps.length}
//             </span>
//             <span className="text-xs text-gray-500">
//               {steps[currentStep - 1].text}
//             </span>
//           </div>
//           <div className="mt-2 flex gap-1">
//             {steps.map((_, index) => (
//               <div
//                 key={index}
//                 className={`h-1 flex-1 rounded-full ${
//                   index + 1 <= currentStep ? "bg-[#E4086F]" : "bg-gray-200"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="flex-1">
//           {currentStep === 1 && (
//             <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
//               <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
//                 Order Details
//               </h2>
//               <div className="flex flex-col gap-4 sm:gap-8">
//                 <div className="flex-shrink-0">
//                   <div className="flex items-start gap-3 sm:gap-4 mb-4">
//                     <Image
//                       src="/delivery_icon.png"
//                       alt="Delivery"
//                       width={28}
//                       height={28}
//                       className="flex-shrink-0"
//                     />
//                     <div>
//                       <span className="text-[#E4086F] font-medium text-sm sm:text-base">
//                         {order.orderStatus}
//                       </span>
//                       <span className="text-gray-400 text-xs sm:text-sm block">
//                         {new Date(order.paidAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                   {renderProductDetails(order.products[0])}
//                 </div>
//               </div>
//               <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs sm:text-sm">
//                   <div>
//                     <span className="text-gray-500 block">Order Id:</span>
//                     <span>#{searchParams.get("orderId")}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-500 block">Return Term:</span>
//                     <span>{new Date().toLocaleDateString()}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-end mt-6 sm:mt-8">
//                 <button
//                   onClick={handleNext}
//                   className="w-full sm:w-auto bg-[#E4086F] text-white px-8 sm:px-12 py-2.5 rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
//               <h3 className="text-base sm:text-lg font-medium mb-2">
//                 Select the reason for your return
//               </h3>
//               <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
//                 To help us process your request quickly, please answer the
//                 following questions.
//               </p>
//               <div className="space-y-6 sm:space-y-8">
//                 <div>
//                   <h4 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4">
//                     What is the product&apos;s current condition?
//                   </h4>
//                   <div className="space-y-2 sm:space-y-3">
//                     {[
//                       "Sealed product",
//                       "Ordered by mistake",
//                       "Defective or damaged",
//                       "Unsealed but functional",
//                       "Wrong product received",
//                     ].map((option) => (
//                       <label
//                         key={option}
//                         className="flex items-center gap-3 cursor-pointer"
//                       >
//                         <input
//                           type="radio"
//                           name="condition"
//                           value={option}
//                           checked={selectedCondition === option}
//                           onChange={() => setSelectedCondition(option)}
//                           className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F] flex-shrink-0"
//                         />
//                         <span className="text-xs sm:text-sm">{option}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4">
//                     What is the primary reason for returning the product?
//                   </h4>
//                   <div className="space-y-2 sm:space-y-3">
//                     {[
//                       "Unsatisfactory quality",
//                       "Non-functional product",
//                       "Changed my mind",
//                       "Misleading product information",
//                       "Not delivered",
//                     ].map((reason) => (
//                       <label
//                         key={reason}
//                         className="flex items-center gap-3 cursor-pointer"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedReasons.includes(reason)}
//                           onChange={() =>
//                             setSelectedReasons((prev) =>
//                               prev.includes(reason)
//                                 ? prev.filter((r) => r !== reason)
//                                 : [...prev, reason]
//                             )
//                           }
//                           className="w-4 h-4 text-[#E4086F] border-gray-300 rounded focus:ring-[#E4086F] flex-shrink-0"
//                         />
//                         <span className="text-xs sm:text-sm">{reason}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
//                 <button
//                   onClick={handlePrevious}
//                   className="w-full sm:w-auto px-6 sm:px-8 py-2.5 border border-[#E4086F] text-[#E4086F] rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="w-full sm:w-auto px-6 sm:px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md">
//               <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
//                 Choose the method for receiving payment
//               </h2>
//               <div className="space-y-3 sm:space-y-4">
//                 <label className="block p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:border-[#E4086F] hover:bg-pink-50">
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="radio"
//                       name="reimbursement"
//                       value="refund"
//                       checked={selectedReimbursement === "refund"}
//                       onChange={(e) => setSelectedReimbursement(e.target.value)}
//                       className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F] flex-shrink-0"
//                     />
//                     <div className="flex-1">
//                       <div className="flex justify-between items-center">
//                         <span className="font-medium text-sm sm:text-base">
//                           Refund
//                         </span>
//                       </div>
//                       <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                         Refund processed within 7 business days.
//                       </p>
//                     </div>
//                   </div>
//                 </label>
//               </div>
//               <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
//                 <button
//                   onClick={handlePrevious}
//                   className="w-full sm:w-auto px-6 sm:px-8 py-2.5 border border-[#E4086F] text-[#E4086F] rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="w-full sm:w-auto px-6 sm:px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}

//           {currentStep === 4 && (
//             <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md">
//               <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
//                 Review your return request
//               </h2>
//               <div className="space-y-4 sm:space-y-6">
//                 {renderProductDetails(order.products[0])}
//                 <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
//                   <div>
//                     <h4 className="text-xs sm:text-sm font-medium text-gray-500">
//                       Current state of the product:
//                     </h4>
//                     <p className="mt-1 text-sm sm:text-base">
//                       {selectedCondition || "Not selected"}
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs sm:text-sm font-medium text-gray-500">
//                       Main reason for returning the product:
//                     </h4>
//                     <p className="mt-1 text-sm sm:text-base">
//                       {selectedReasons.join(", ") || "Not selected"}
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs sm:text-sm font-medium text-gray-500">
//                       Method for receiving payment:
//                     </h4>
//                     <p className="mt-1 text-sm sm:text-base">
//                       Refund to original payment method
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
//                   <button
//                     onClick={handlePrevious}
//                     className="w-full sm:w-auto px-6 sm:px-8 py-2.5 border border-[#E4086F] text-[#E4086F] rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     onClick={handleSubmit}
//                     className="w-full sm:w-auto px-6 sm:px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full mx-4">
//             <div className="flex flex-col items-center text-center">
//               <div className="w-14 sm:w-16 h-14 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   className="w-7 sm:w-8 h-7 sm:h-8 text-green-500"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg sm:text-xl font-medium mb-2">
//                 Your return request has been successfully received.
//               </h3>
//               <p className="text-sm sm:text-base text-gray-500 mb-6">
//                 We are currently reviewing your request to return your items.
//                 You can track the progress for updates.
//               </p>
//               <button
//                 onClick={handleTrackStatus}
//                 className="w-full px-6 sm:px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
//               >
//                 Track Return Status
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

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

// export default ReturnOrderPage;

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

// Helper to get correct date based on context
const getRelevantDate = (order, context = "delivery") => {
  if (!order) return null;

  // For Delivery date (main use in return page)
  if (context === "delivery" || context === "status") {
    const deliveredEntry =
      order.orderStatusHistory?.find((h) => h.status === "Delivered") ||
      order.processingDetails?.deliveryDetails?.deliveryStatusHistory?.find(
        (h) => h.status === "Delivered"
      );

    if (deliveredEntry?.timestamp) {
      return new Date(deliveredEntry.timestamp);
    }
  }

  // For Return Initiated date (tracking screen)
  if (
    context === "returnInitiated" &&
    order.processingDetails?.buyerReturnDetail?.returnInitiatedAt
  ) {
    return new Date(
      order.processingDetails.buyerReturnDetail.returnInitiatedAt
    );
  }

  // Fallback → paidAt (safety)
  return order.paidAt ? new Date(order.paidAt) : new Date(order.createdAt);
};

// Return Window Countdown Component
const ReturnWindowCountdown = ({ order }) => {
  const deliveryTime = getRelevantDate(order, "delivery");
  if (!deliveryTime) return null;

  const deadline = new Date(deliveryTime.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();
  const hoursLeft = Math.floor((deadline - now) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((deadline - now) / (1000 * 60)) % 60;

  if (hoursLeft > 0) {
    return (
      <p className="text-xs text-green-600 font-medium mt-3 italic bg-green-50 px-3 py-2 rounded-md">
        ⏰ Return window closes in {hoursLeft}h {minutesLeft}m (
        {deadline.toLocaleString()})
      </p>
    );
  } else {
    return (
      <p className="text-xs text-red-600 font-medium mt-3 italic bg-red-50 px-3 py-2 rounded-md">
        ❌ Return window expired on {deadline.toLocaleDateString()} at{" "}
        {deadline.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    );
  }
};

// Yeh line change kar → status display ke liye
const getDisplayStatusForReturn = (status) => {
  if (status === "Buyer Wanted Return Item") return "Return Requested";
  return status; // baaki sab as-it-is
};

const ReturnOrderPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [selectedReimbursement, setSelectedReimbursement] = useState("refund");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTrackingScreen, setShowTrackingScreen] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      setError("No order ID provided in the URL");
      setLoading(false);
      return;
    }

    if (pathname.includes("/track-return-status")) {
      setShowTrackingScreen(true);
    }

    const fetchOrderDetails = async () => {
      try {
        // Get auth cookie
        const authCookie = Cookies.get("auth");

        if (!authCookie) {
          setError("Please login to view order details");
          toast.error("Please login to view order details");
          setTimeout(() => {
            router.push("/login");
          }, 1500);
          return;
        }

        let token;

        // Try to parse as JSON first, if fails then use the string directly
        try {
          const parsedAuth = JSON.parse(authCookie);
          token = parsedAuth.token || parsedAuth;
        } catch (parseError) {
          token = authCookie;
        }

        if (!token) {
          setError("Please login to view order details");
          toast.error("Please login to view order details");
          setTimeout(() => {
            router.push("/login");
          }, 1500);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/OrderDetails/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setOrder(response.data.order);
        } else {
          throw new Error(
            response.data.message || "Failed to fetch order details"
          );
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message;
        setErrorMessage(errorMsg);
        setErrorPopupOpen(true);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [searchParams, pathname, router]);

  if (loading) return <div className="text-center p-4 md:p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-4 md:p-8 text-red-500">Error: {error}</div>
    );
  if (!order || !order.products || order.products.length === 0) {
    return (
      <div className="text-center p-4 md:p-8">No order or products found</div>
    );
  }

  const steps = [
    { icon: "/bagadd.png", text: "Your Details", active: currentStep === 1 },
    {
      icon: "/returnr.png",
      text: "Reason for Return",
      active: currentStep === 2,
    },
    {
      icon: "/paymenthand.png",
      text: "Payment Reimbursement",
      active: currentStep === 3,
    },
    { icon: "/review.png", text: "Review & Submit", active: currentStep === 4 },
  ];

  const handleNext = () => {
    if (
      currentStep === 2 &&
      (!selectedCondition || selectedReasons.length === 0)
    ) {
      toast.error("Please select a condition and at least one reason");
      return;
    }
    if (currentStep === 3 && !selectedReimbursement) {
      toast.error("Please select a reimbursement method");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      setErrorMessage("Order ID is missing");
      setErrorPopupOpen(true);
      return;
    }

    if (
      !selectedCondition ||
      selectedReasons.length === 0 ||
      !selectedReimbursement
    ) {
      setErrorMessage("Please complete all steps before submitting");
      setErrorPopupOpen(true);
      return;
    }

    const authCookie = Cookies.get("auth");
    if (!authCookie) {
      setErrorMessage("Please login to submit a return request");
      setErrorPopupOpen(true);
      toast.error("Please login to submit a return request");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    let token;

    try {
      const parsedAuth = JSON.parse(authCookie);
      token = parsedAuth.token || parsedAuth;
    } catch (parseError) {
      token = authCookie;
    }

    if (!token) {
      setErrorMessage("Please login to submit a return request");
      setErrorPopupOpen(true);
      toast.error("Please login to submit a return request");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    const returnData = {
      condition: selectedCondition,
      reasons: selectedReasons,
      reimbursement: selectedReimbursement,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/buyer-return/${orderId}`,
        returnData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setShowSuccessModal(true);
        toast.success("Return request submitted successfully!");
      } else {
        throw new Error(
          response.data.message || "Failed to submit return request"
        );
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to submit return request";
      setErrorMessage(errorMsg);
      setErrorPopupOpen(true);
      toast.error(errorMsg);
    }
  };

  const handleTrackStatus = () => {
    const orderId = searchParams.get("orderId");
    setShowSuccessModal(false);
    router.push(`/returnorder/track-return-status?orderId=${orderId}`);
  };

  const renderProductDetails = (product) => (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="flex-shrink-0 w-full sm:w-auto">
        <Image
          src={
            product.product.images && product.product.images.length > 0
              ? product.product.images[0]
              : "/product-image.png"
          }
          alt={product.productName || "Product Image"}
          width={180}
          height={160}
          className="rounded-md object-cover h-[160px] w-full sm:w-[180px]"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-base sm:text-lg">
          {product.productName || "Unknown Product"}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {product.product.description || "No description"}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Brand: {product.product.brand?.brandName || "Unknown Brand"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-medium text-base sm:text-lg">
            AED{order.finalAmount.toFixed(2)}
          </span>
          {order.discount > 0 && (
            <>
              <span className="text-gray-500 text-xs sm:text-sm line-through">
                AED{order.totalAmount.toFixed(2)}
              </span>
              <span className="text-green-500 text-xs sm:text-sm font-medium">
                {((order.discount / order.totalAmount) * 100).toFixed(0)}% OFF
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs sm:text-sm">SIZE:</span>
            <span className="px-2 py-0.5 border border-[#E4086F] text-[#E4086F] rounded text-xs sm:text-sm">
              {product.size || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm">CONDITION:</span>
            <span className="text-xs sm:text-sm text-gray-500">
              {product.product.condition?.conditionName || "Unknown Condition"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (showTrackingScreen) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
          Track Return Status
        </h1>
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="w-full lg:w-64">
              <div className="relative">
                <div className="flex items-start gap-3 mb-6 sm:mb-8">
                  <div className="w-6 h-6 rounded-full bg-[#E4086F] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      Return started
                    </p>
                    <p className="text-[#E4086F] text-xs sm:text-sm">
                      Awaiting admin processing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-6 sm:mb-8">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Drop off the item by{" "}
                    {new Date(
                      Date.now() + 7 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="absolute left-3 top-6 w-0.5 h-[calc(100%-48px)] bg-gray-200"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <Image
                  src="/delivery_icon.png"
                  alt="Delivery"
                  width={28}
                  height={28}
                  className="flex-shrink-0"
                />
                <div>
                  <span className="text-[#E4086F] font-medium text-sm sm:text-base">
                    {getDisplayStatusForReturn(
                      order.orderStatus || "Buyer Wanted Return Item"
                    )}
                  </span>
                  <span className="text-gray-400 text-xs sm:text-sm block">
                    Initiated on{" "}
                    {getRelevantDate(
                      order,
                      "returnInitiated"
                    )?.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }) || "Processing..."}
                  </span>
                </div>
              </div>
              {renderProductDetails(order.products[0])}
              <div className="flex flex-col sm:flex-row sm:justify-between mt-6 gap-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block">Order Id:</span>
                    <span>#{searchParams.get("orderId")}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push("/")}
                className="mt-6 sm:mt-8 w-full bg-[#E4086F] text-white py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
        Return My Order(s)
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        <div className="hidden sm:block lg:w-72">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md lg:h-fit">
            <div className="flex sm:flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 relative flex-shrink-0 lg:flex-shrink lg:mb-0"
                >
                  <div
                    className={`w-10 h-10 ${
                      step.active || index + 1 < currentStep
                        ? "bg-[#B25CF3]"
                        : "border-2 border-gray-200"
                    } flex items-center justify-center flex-shrink-0`}
                  >
                    <Image
                      src={step.icon}
                      alt={step.text}
                      width={45}
                      height={45}
                      className={
                        step.active || index + 1 < currentStep
                          ? ""
                          : "opacity-50"
                      }
                    />
                  </div>
                  <span
                    className={`text-xs sm:text-sm whitespace-nowrap lg:whitespace-normal ${
                      step.active
                        ? "text-[#E4086F] font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {step.text}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden lg:block absolute left-5 top-10 w-0.5 h-14 ${
                        index + 1 < currentStep ? "bg-[#B25CF3]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sm:hidden bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#E4086F]">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-xs text-gray-500">
              {steps[currentStep - 1].text}
            </span>
          </div>
          <div className="mt-2 flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full ${
                  index + 1 <= currentStep ? "bg-[#E4086F]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          {currentStep === 1 && (
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
                Order Details
              </h2>
              <div className="flex flex-col gap-4 sm:gap-8">
                <div className="flex-shrink-0">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <Image
                      src="/delivery_icon.png"
                      alt="Delivery"
                      width={28}
                      height={28}
                      className="flex-shrink-0"
                    />
                    <div>
                      <span className="text-[#E4086F] font-medium text-sm sm:text-base">
                        {getDisplayStatusForReturn(order.orderStatus)}
                      </span>
                      <span className="text-gray-400 text-xs sm:text-sm block">
                        Delivered on{" "}
                        {getRelevantDate(order, "delivery")?.toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        ) || "Date not available"}
                      </span>
                    </div>
                  </div>
                  {renderProductDetails(order.products[0])}
                  <ReturnWindowCountdown order={order} />
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block">Order Id:</span>
                    <span>#{searchParams.get("orderId")}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6 sm:mt-8">
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto bg-[#E4086F] text-white px-8 sm:px-12 py-2.5 rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="text-base sm:text-lg font-medium mb-2">
                Select the reason for your return
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                To help us process your request quickly, please answer the earl
                following questions.
              </p>
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    What is the product&apos;s current condition?
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      "Sealed product",
                      "Ordered by mistake",
                      "Defective or damaged",
                      "Unsealed but functional",
                      "Wrong product received",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="condition"
                          value={option}
                          checked={selectedCondition === option}
                          onChange={() => setSelectedCondition(option)}
                          className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F] flex-shrink-0"
                        />
                        <span className="text-xs sm:text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    What is the primary reason for returning the product?
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      "Unsatisfactory quality",
                      "Non-functional product",
                      "Changed my mind",
                      "Misleading product information",
                      "Not delivered",
                    ].map((reason) => (
                      <label
                        key={reason}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedReasons.includes(reason)}
                          onChange={() =>
                            setSelectedReasons((prev) =>
                              prev.includes(reason)
                                ? prev.filter((r) => r !== reason)
                                : [...prev, reason]
                            )
                          }
                          className="w-4 h-4 text-[#E4086F] border-gray-300 rounded focus:ring-[#E4086F] flex-shrink-0"
                        />
                        <span className="text-xs sm:text-sm">{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={handlePrevious}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 border border-[#E4086F] text-[#E4086F] rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md">
              <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
                Choose the method for receiving payment
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <label className="block p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:border-[#E4086F] hover:bg-pink-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="reimbursement"
                      value="refund"
                      checked={selectedReimbursement === "refund"}
                      onChange={(e) => setSelectedReimbursement(e.target.value)}
                      className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F] flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm sm:text-base">
                          Refund
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Refund processed within 7 business days.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={handlePrevious}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 border border-[#E4086F] text-[#E4086F] rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md">
              <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
                Review your return request
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {renderProductDetails(order.products[0])}
                <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">
                      Current state of the product:
                    </h4>
                    <p className="mt-1 text-sm sm:text-base">
                      {selectedCondition || "Not selected"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">
                      Main reason for returning the product:
                    </h4>
                    <p className="mt-1 text-sm sm:text-base">
                      {selectedReasons.join(", ") || "Not selected"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">
                      Method for receiving payment:
                    </h4>
                    <p className="mt-1 text-sm sm:text-base">
                      Refund to original payment method
                    </p>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <button
                    onClick={handlePrevious}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 border border-[#E4086F] text-[#E4086F] rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-7 sm:w-8 h-7 sm:h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium mb-2">
                Your return request has been successfully received.
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-6">
                We are currently reviewing your request to return your items.
                You can track the progress for updates.
              </p>
              <button
                onClick={handleTrackStatus}
                className="w-full px-6 sm:px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
              >
                Track Return Status
              </button>
            </div>
          </div>
        </div>
      )}

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

export default ReturnOrderPage;

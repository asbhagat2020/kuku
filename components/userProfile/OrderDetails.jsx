// "use client";

// import React, { useState, useEffect } from "react";
// import { Check } from "lucide-react";

// // Constants for reusable values
// const CONSTANTS = {
//   COLORS: {
//     PRIMARY: "#E4086F",
//     SECONDARY: "#30BD75",
//     SUCCESS_BG: "#E2FFF0",
//     ITEM_BG: "#F7F7F6",
//     BUTTON_YELLOW: "#FDE504",
//     BUTTON_BORDER: "#F7B5D4"
//   },
//   TIMING: {
//     SUCCESS_MODAL_DURATION: 3000
//   }
// };

// // Progress Step Component
// const ProgressStep = ({ isCompleted, number, title, subtitle, alignment = "start" }) => (
//   <div className={`flex flex-col items-${alignment}`}>
//     <div className={`w-10 h-10 ${isCompleted ? "bg-emerald-500" : "bg-gray-200"} rounded-full flex items-center justify-center mb-2`}>
//       {isCompleted ? (
//         <Check className="w-6 h-6 text-white" />
//       ) : (
//         <span className="text-gray-500">{number}</span>
//       )}
//     </div>
//     <span className="font-karla text-sm md:text-[16px] font-semibold">
//       {title}
//     </span>
//     <span className="text-xs text-gray-500">{subtitle}</span>
//   </div>
// );

// // Modal Component
// const Modal = ({ children, onClose }) => (
//   <div
//     className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50"
//     onClick={(e) => e.target === e.currentTarget && onClose()}
//   >
//     <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
//       <div className="text-center">{children}</div>
//     </div>
//   </div>
// );

// const OrderDetails = () => {
//   const [showCancelDialog, setShowCancelDialog] = useState(false);
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") {
//         setShowCancelDialog(false);
//         setShowSuccessDialog(false);
//       }
//     };

//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, []);

//   useEffect(() => {
//     if (showSuccessDialog) {
//       const timer = setTimeout(() => {
//         setShowSuccessDialog(false);
//       }, CONSTANTS.TIMING.SUCCESS_MODAL_DURATION);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccessDialog]);

//   const handleCancelOrder = () => {
//     setShowCancelDialog(false);
//     setShowSuccessDialog(true);
//   };

//   return (
//     <>
//       <div className="bg-white min-h-screen">
//         <div className="max-w-6xl mx-auto px-6 py-10">
//           {/* Header */}
//           <h1 className="text-4xl font-luckiest mb-8 text-center md:text-left">
//             ORDER DETAILS
//           </h1>

//           {/* Order Info */}
//           <div className="mb-8">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
//               <span className="text-gray-800 font-karla text-lg font-semibold">
//                 Order Details #s2232msds
//               </span>
//               <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-karla uppercase">
//                 Shipping
//               </span>
//             </div>
//             <p className="text-gray-500 text-sm mt-2">Date: 08/12/2025</p>
//           </div>

//           {/* Progress Tracker and Courier Details */}
//           <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-14">
//             {/* Progress Tracker */}
//             <div className="flex-1 relative">
//               <div className="absolute left-0 right-0 h-[2px] bg-gray-200 top-6 z-0" />
//               <div className="relative z-10 flex justify-between">
//                 <ProgressStep
//                   isCompleted={true}
//                   title="Order Confirmed"
//                   subtitle="8:00 AM, Feb 8, 2025"
//                   alignment="start"
//                 />
//                 <ProgressStep
//                   isCompleted={true}
//                   title="Shipping"
//                   subtitle="Shipped with Fedex"
//                   alignment="center"
//                 />
//                 <ProgressStep
//                   isCompleted={false}
//                   number="3"
//                   title="To Deliver"
//                   subtitle="Estimated Date Feb 14, 2025"
//                   alignment="end"
//                 />
//               </div>
//             </div>

//             {/* Courier Details */}
//             <div className="w-full md:w-80 bg-white rounded-lg p-6 shadow-md border border-gray-200">
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <p className="text-black font-karla text-sm md:text-[16px] font-semibold">
//                     Courier Name
//                   </p>
//                   <p className="text-gray-400 text-xs md:text-[12px]">
//                     Al ameen express
//                   </p>
//                 </div>
//                 <hr className="border-gray-200" />
//                 <div className="flex justify-between items-center">
//                   <p className="text-black font-karla text-sm md:text-[16px] font-semibold">
//                     Tracking Number
//                   </p>
//                   <p className="text-gray-400 text-xs md:text-[12px]">
//                     32823u923u29e2
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <h3 className="text-lg md:text-xl font-karla mb-6 font-semibold text-center md:text-left">
//             Item Ordered
//           </h3>

//           {/* Main Content Container */}
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Item Ordered Section */}
//             <div className={`bg-[${CONSTANTS.COLORS.ITEM_BG}] shadow-md border border-gray-200 p-6 rounded-lg flex-1`}>
//               <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
//                 <img
//                   src="/orders-image.png"
//                   alt="White dress"
//                   className="w-28 h-36 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <h4 className="font-karla text-sm md:text-lg flex-1 font-semibold">
//                       Lorem ipsum dolor sit amet consectetur.
//                     </h4>
//                     <div className="text-right">
//                       <div className="flex items-center gap-2">
//                         <span className="font-karla text-sm md:text-lg font-semibold">
//                           AED250.00
//                         </span>
//                         <span className="text-emerald-500 text-xs md:text-sm">
//                           (55% OFF)
//                         </span>
//                       </div>
//                       <span className="text-gray-400 text-xs md:text-sm line-through">
//                         MRP AED650
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-gray-500 text-xs md:text-sm mt-2">
//                     Lorem ipsum dolor sit amet consectetur.
//                     <br />
//                     Sed lobortis diam.
//                   </p>
//                 </div>
//               </div>

//               {/* Price Details */}
//               <div className="border-t pt-4">
//                 <div className="mt-4">
//                   <button
//                     onClick={() => setShowCancelDialog(true)}
//                     className={`font-karla text-[${CONSTANTS.COLORS.PRIMARY}] underline text-sm font-bold`}
//                   >
//                     Cancel Order
//                   </button>
//                 </div>
//                 <div className="flex justify-between mb-4">
//                   <div className="flex-1 ml-[450px]">
//                     <span className="font-karla text-gray-500 text-lg md:text-sm">
//                       Product Total
//                     </span>
//                   </div>
//                   <span className="font-karla text-sm md:text-lg font-semibold">
//                     AED250.00
//                   </span>
//                 </div>
//                 <div className="flex justify-between mb-4">
//                   <div className="flex-1 ml-[450px]">
//                     <span className="font-karla text-gray-500 text-lg md:text-sm">
//                       Shipping Cost
//                     </span>
//                   </div>
//                   <span className="text-emerald-500 text-xs md:text-sm">
//                     Free
//                   </span>
//                 </div>
//                 <div className="border-t w-[300px] ml-auto mb-4"></div>
//                 <div className="flex justify-between">
//                   <div className="flex-1 ml-[450px]">
//                     <span className="font-karla text-sm md:text-lg font-semibold">
//                       Total
//                     </span>
//                   </div>
//                   <span className="font-karla text-sm md:text-lg font-semibold">
//                     AED250.00
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Support Section */}
//             <div className="w-full md:w-80">
//               <div className={`bg-[${CONSTANTS.COLORS.SUCCESS_BG}] p-6 rounded-lg relative w-[341px] h-[210px]`}>
//                 <div className="flex items-start gap-4">
//                   <img
//                     src="/bag-support.png"
//                     alt="Bag Support Icon"
//                     className="w-12 h-12 mt-1"
//                   />
//                   <div className="flex-1">
//                     <h4 className="font-karla font-bold text-lg mb-2">
//                       Have you got issue with Product
//                     </h4>
//                     <div className="border-t border-gray-300 w-[95%] mx-auto my-4"></div>
//                     <p className="font-karla text-sm text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis">
//                       Contact KUKU Customer Support Team
//                     </p>
//                     <button className={`font-karla text-[${CONSTANTS.COLORS.SECONDARY}] text-sm font-semibold hover:text-emerald-700 underline`}>
//                       Click Here
//                     </button>
//                   </div>
//                 </div>
//                 <div className="absolute bottom-2 right-2">
//                   <img
//                     src="/kuku_logo.svg"
//                     alt="Kuku bird"
//                     className="w-12 h-12"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cancel Order Modal */}
//       {showCancelDialog && (
//         <Modal onClose={() => setShowCancelDialog(false)}>
//           <div className="mx-auto mb-4">
//             <div className={`w-16 h-16 bg-[${CONSTANTS.COLORS.SUCCESS_BG}] rounded-full flex items-center justify-center mx-auto`}>
//               <img
//                 src="/greencircle.png"
//                 alt="Green Circle"
//                 className="w-16 h-16"
//               />
//             </div>
//           </div>
//           <h2 className="text-xl font-semibold mb-6">
//             Are you sure, Do you want to cancel order?
//           </h2>
//           <div className="flex justify-center gap-4">
//             <button
//               onClick={handleCancelOrder}
//               className={`px-8 py-2.5 border border-[${CONSTANTS.COLORS.BUTTON_BORDER}] text-[${CONSTANTS.COLORS.PRIMARY}] rounded-[10px] hover:bg-[${CONSTANTS.COLORS.PRIMARY}] hover:text-white transition-colors`}
//             >
//               Yes, Cancel
//             </button>
//             <button
//               onClick={() => setShowCancelDialog(false)}
//               className={`px-8 py-2.5 bg-[${CONSTANTS.COLORS.BUTTON_YELLOW}] text-[${CONSTANTS.COLORS.PRIMARY}] rounded-[10px] hover:bg-yellow-500 transition-colors`}
//             >
//               No, Leave
//             </button>
//           </div>
//         </Modal>
//       )}

//       {/* Success Modal */}
//       {showSuccessDialog && (
//         <Modal onClose={() => setShowSuccessDialog(false)}>
//           <div className="mx-auto mb-4">
//             <div className={`w-16 h-16 bg-[${CONSTANTS.COLORS.SUCCESS_BG}] rounded-full flex items-center justify-center mx-auto`}>
//               <img
//                 src="/greencircle.png"
//                 alt="Green Circle"
//                 className="w-16 h-16"
//               />
//             </div>
//           </div>
//           <h2 className="text-xl font-semibold">
//             Order Cancelled Successfully!
//           </h2>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default OrderDetails;










// "use client";

// import React, { useState, useEffect } from "react";
// import { Check } from "lucide-react";

// const CONSTANTS = {
//   COLORS: {
//     PRIMARY: "#E4086F",
//     SECONDARY: "#30BD75",
//     SUCCESS_BG: "#E2FFF0",
//     ITEM_BG: "#F7F7F6",
//     BUTTON_YELLOW: "#FDE504",
//     BUTTON_BORDER: "#F7B5D4",
//   },
//   TIMING: {
//     SUCCESS_MODAL_DURATION: 3000,
//   },
// };

// const ProgressStep = ({ isCompleted, number, title, subtitle, alignment = "start" }) => (
//   <div className={`flex flex-col items-${alignment}`}>
//     <div className={`w-10 h-10 ${isCompleted ? "bg-emerald-500" : "bg-gray-200"} rounded-full flex items-center justify-center mb-2`}>
//       {isCompleted ? <Check className="w-6 h-6 text-white" /> : <span className="text-gray-500">{number}</span>}
//     </div>
//     <span className="font-karla text-sm md:text-[16px] font-semibold">{title}</span>
//     <span className="text-xs text-gray-500">{subtitle}</span>
//   </div>
// );

// const Modal = ({ children, onClose }) => (
//   <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
//     <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">{children}</div>
//   </div>
// );

// const OrderDetails = ({ params }) => {
//   const [showCancelDialog, setShowCancelDialog] = useState(false);
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const orderId = params.orderId;

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/orders/OrderDetails/${orderId}`);
//         if (!response.ok) throw new Error("Failed to fetch order details");
//         const data = await response.json();
//         setOrder(data.order);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrderDetails();
//   }, [orderId]);

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") {
//         setShowCancelDialog(false);
//         setShowSuccessDialog(false);
//       }
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, []);

//   useEffect(() => {
//     if (showSuccessDialog) {
//       const timer = setTimeout(() => setShowSuccessDialog(false), CONSTANTS.TIMING.SUCCESS_MODAL_DURATION);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccessDialog]);

//   const handleCancelOrder = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/updateOrder/${orderId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderStatus: "Cancelled" }),
//       });
//       if (!response.ok) throw new Error("Failed to cancel order");
//       setShowCancelDialog(false);
//       setShowSuccessDialog(true);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="max-w-6xl mx-auto px-6 py-10">
//         <h1 className="text-4xl font-luckiest mb-8 text-center md:text-left">ORDER DETAILS</h1>
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
//             <span className="text-gray-800 font-karla text-lg font-semibold">Order Details #{orderId}</span>
//             <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-karla uppercase">Shipping</span>
//           </div>
//           <p className="text-gray-500 text-sm mt-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//         </div>
//         <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-14">
//           <div className="flex-1 relative">
//             <div className="absolute left-0 right-0 h-[2px] bg-gray-200 top-6 z-0" />
//             <div className="relative z-10 flex justify-between">
//               <ProgressStep isCompleted={order.orderStatus.includes("Confirmed")} title="Order Confirmed" subtitle={new Date(order.createdAt).toLocaleString()} alignment="start" />
//               <ProgressStep isCompleted={order.orderStatus.includes("Shipping")} title="Shipping" subtitle="Shipped with Fedex" alignment="center" />
//               <ProgressStep isCompleted={order.orderStatus.includes("Delivered")} number="3" title="To Deliver" subtitle={`Estimated Date ${new Date(order.tentativeDelivery).toLocaleDateString()}`} alignment="end" />
//             </div>
//           </div>
//           <div className="w-full md:w-80 bg-white rounded-lg p-6 shadow-md border border-gray-200">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Courier Name</p>
//                 <p className="text-gray-400 text-xs md:text-[12px]">Al ameen express</p>
//               </div>
//               <hr className="border-gray-200" />
//               <div className="flex justify-between items-center">
//                 <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Tracking Number</p>
//                 <p className="text-gray-400 text-xs md:text-[12px]">32823u923u29e2</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <h3 className="text-lg md:text-xl font-karla mb-6 font-semibold text-center md:text-left">Item Ordered</h3>
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className={`bg-[${CONSTANTS.COLORS.ITEM_BG}] shadow-md border border-gray-200 p-6 rounded-lg flex-1`}>
//             <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
//               <img src={order.products[0].product.image || "/orders-image.png"} alt="Ordered Item" className="w-28 h-36 object-cover rounded-lg" />
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <h4 className="font-karla text-sm md:text-lg flex-1 font-semibold">{order.products[0].product.name || "Unknown Product"}</h4>
//                   <div className="text-right">
//                     <div className="flex items-center gap-2">
//                       <span className="font-karla text-sm md:text-lg font-semibold">AED{order.finalAmount.toFixed(2)}</span>
//                       <span className="text-emerald-500 text-xs md:text-sm">(55% OFF)</span>
//                     </div>
//                     <span className="text-gray-400 text-xs md:text-sm line-through">MRP AED{order.totalAmount}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-500 text-xs md:text-sm mt-2">{order.products[0].product.description || "No description"}</p>
//               </div>
//             </div>
//             <div className="border-t pt-4">
//               <div className="mt-4">
//                 <button onClick={() => setShowCancelDialog(true)} className={`font-karla text-[${CONSTANTS.COLORS.PRIMARY}] underline text-sm font-bold`}>Cancel Order</button>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <div className="flex-1 ml-[450px]">
//                   <span className="font-karla text-gray-500 text-lg md:text-sm">Product Total</span>
//                 </div>
//                 <span className="font-karla text-sm md:text-lg font-semibold">AED{order.finalAmount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <div className="flex-1 ml-[450px]">
//                   <span className="font-karla text-gray-500 text-lg md:text-sm">Shipping Cost</span>
//                 </div>
//                 <span className="text-emerald-500 text-xs md:text-sm">Free</span>
//               </div>
//               <div className="border-t w-[300px] ml-auto mb-4"></div>
//               <div className="flex justify-between">
//                 <div className="flex-1 ml-[450px]">
//                   <span className="font-karla text-sm md:text-lg font-semibold">Total</span>
//                 </div>
//                 <span className="font-karla text-sm md:text-lg font-semibold">AED{order.finalAmount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//           <div className="w-full md:w-80">
//             <div className={`bg-[${CONSTANTS.COLORS.SUCCESS_BG}] p-6 rounded-lg relative w-[341px] h-[210px]`}>
//               <div className="flex items-start gap-4">
//                 <img src="/bag-support.png" alt="Bag Support Icon" className="w-12 h-12 mt-1" />
//                 <div className="flex-1">
//                   <h4 className="font-karla font-bold text-lg mb-2">Have you got issue with Product</h4>
//                   <div className="border-t border-gray-300 w-[95%] mx-auto my-4"></div>
//                   <p className="font-karla text-sm text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis">Contact KUKU Customer Support Team</p>
//                   <button className={`font-karla text-[${CONSTANTS.COLORS.SECONDARY}] text-sm font-semibold hover:text-emerald-700 underline`}>Click Here</button>
//                 </div>
//               </div>
//               <div className="absolute bottom-2 right-2">
//                 <img src="/kuku_logo.svg" alt="Kuku bird" className="w-12 h-12" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showCancelDialog && (
//         <Modal onClose={() => setShowCancelDialog(false)}>
//           <div className="mx-auto mb-4">
//             <div className={`w-16 h-16 bg-[${CONSTANTS.COLORS.SUCCESS_BG}] rounded-full flex items-center justify-center mx-auto`}>
//               <img src="/greencircle.png" alt="Green Circle" className="w-16 h-16" />
//             </div>
//           </div>
//           <h2 className="text-xl font-semibold mb-6">Are you sure, Do you want to cancel order?</h2>
//           <div className="flex justify-center gap-4">
//             <button onClick={handleCancelOrder} className={`px-8 py-2.5 border border-[${CONSTANTS.COLORS.BUTTON_BORDER}] text-[${CONSTANTS.COLORS.PRIMARY}] rounded-[10px] hover:bg-[${CONSTANTS.COLORS.PRIMARY}] hover:text-white transition-colors`}>Yes, Cancel</button>
//             <button onClick={() => setShowCancelDialog(false)} className={`px-8 py-2.5 bg-[${CONSTANTS.COLORS.BUTTON_YELLOW}] text-[${CONSTANTS.COLORS.PRIMARY}] rounded-[10px] hover:bg-yellow-500 transition-colors`}>No, Leave</button>
//           </div>
//         </Modal>
//       )}
//       {showSuccessDialog && (
//         <Modal onClose={() => setShowSuccessDialog(false)}>
//           <div className="mx-auto mb-4">
//             <div className={`w-16 h-16 bg-[${CONSTANTS.COLORS.SUCCESS_BG}] rounded-full flex items-center justify-center mx-auto`}>
//               <img src="/greencircle.png" alt="Green Circle" className="w-16 h-16" />
//             </div>
//           </div>
//           <h2 className="text-xl font-semibold">Order Cancelled Successfully!</h2>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;














"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

const CONSTANTS = {
  COLORS: {
    PRIMARY: "#E4086F",
    SECONDARY: "#30BD75",
    SUCCESS_BG: "#E2FFF0",
    ITEM_BG: "#F7F7F6",
    BUTTON_YELLOW: "#FDE504",
    BUTTON_BORDER: "#F7B5D4",
  },
  TIMING: {
    SUCCESS_MODAL_DURATION: 3000,
  },
};

const ProgressStep = ({ isCompleted, number, title, subtitle, alignment = "start" }) => (
  <div className={`flex flex-col items-${alignment}`}>
    <div className={`w-10 h-10 ${isCompleted ? "bg-emerald-500" : "bg-gray-200"} rounded-full flex items-center justify-center mb-2`}>
      {isCompleted ? <Check className="w-6 h-6 text-white" /> : <span className="text-gray-500">{number}</span>}
    </div>
    <span className="font-karla text-sm md:text-[16px] font-semibold">{title}</span>
    <span className="text-xs text-gray-500">{subtitle}</span>
  </div>
);

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">{children}</div>
  </div>
);

const OrderDetails = () => {
  const searchParams = useSearchParams();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get orderId from search params
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided in the URL");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/OrderDetails/${orderId}`);
        if (!response.ok) throw new Error("Failed to fetch order details");
        const data = await response.json();
        setOrder(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowCancelDialog(false);
        setShowSuccessDialog(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (showSuccessDialog) {
      const timer = setTimeout(() => setShowSuccessDialog(false), CONSTANTS.TIMING.SUCCESS_MODAL_DURATION);
      return () => clearTimeout(timer);
    }
  }, [showSuccessDialog]);

  const handleCancelOrder = async () => {
    if (!orderId) {
      setError("Cannot cancel order: No order ID available");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/updateOrder/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: "Cancelled" }),
      });
      if (!response.ok) throw new Error("Failed to cancel order");
      setShowCancelDialog(false);
      setShowSuccessDialog(true);
      // Update the order state to reflect the cancellation
      setOrder(prev => ({ ...prev, orderStatus: "Cancelled" }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-luckiest mb-8 text-center md:text-left">ORDER DETAILS</h1>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <span className="text-gray-800 font-karla text-lg font-semibold">Order Details #{orderId || "Unknown"}</span>
            <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-karla uppercase">
              {order?.orderStatus === "Cancelled" ? "Cancelled" : order?.orderStatus === "Delivered" ? "Delivered" : "Shipping"}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Date: {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-14">
          <div className="flex-1 relative">
            <div className="absolute left-0 right-0 h-[2px] bg-gray-200 top-6 z-0" />
            <div className="relative z-10 flex justify-between">
              <ProgressStep
                isCompleted={order?.orderStatus.includes("Confirmed")}
                title="Order Confirmed"
                subtitle={order?.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
                alignment="start"
              />
              <ProgressStep
                isCompleted={order?.orderStatus.includes("Shipping")}
                title="Shipping"
                subtitle="Shipped with Fedex"
                alignment="center"
              />
              <ProgressStep
                isCompleted={order?.orderStatus.includes("Delivered")}
                number="3"
                title="To Deliver"
                subtitle={order?.tentativeDelivery ? `Estimated Date ${new Date(order.tentativeDelivery).toLocaleDateString()}` : "N/A"}
                alignment="end"
              />
            </div>
          </div>
          <div className="w-full md:w-80 bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Courier Name</p>
                <p className="text-gray-400 text-xs md:text-[12px]">Al ameen express</p>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center">
                <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Tracking Number</p>
                <p className="text-gray-400 text-xs md:text-[12px]">32823u923u29e2</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-lg md:text-xl font-karla mb-6 font-semibold text-center md:text-left">Item Ordered</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className={`bg-[${CONSTANTS.COLORS.ITEM_BG}] shadow-md border border-gray-200 p-6 rounded-lg flex-1`}>
            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
              <img
                src={order?.products?.[0]?.product?.images?.[0] || "/orders-image.png"}
                alt="Ordered Item"
                className="w-28 h-36 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-karla text-sm md:text-lg flex-1 font-semibold">{order?.products?.[0]?.productName || "Unknown Product"}</h4>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-karla text-sm md:text-lg font-semibold">AED{order?.finalAmount?.toFixed(2) || "0.00"}</span>
                      {order?.discount > 0 && (
                        <span className="text-emerald-500 text-xs md:text-sm">
                          {((order.discount / order.totalAmount) * 100).toFixed(0)}% OFF
                        </span>
                      )}
                    </div>
                    {order?.discount > 0 && (
                      <span className="text-gray-400 text-xs md:text-sm line-through">MRP AED{order?.totalAmount?.toFixed(2) || "0.00"}</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-500 text-xs md:text-sm mt-2">{order?.products?.[0]?.product?.description || "No description"}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="mt-4">
                <button onClick={() => setShowCancelDialog(true)} className={`font-karla text-[${CONSTANTS.COLORS.PRIMARY}] underline text-sm font-bold`}>
                  Cancel Order
                </button>
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex-1 ml-[450px]">
                  <span className="font-karla text-gray-500 text-lg md:text-sm">Product Total</span>
                </div>
                <span className="font-karla text-sm md:text-lg font-semibold">AED{order?.finalAmount?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex-1 ml-[450px]">
                  <span className="font-karla text-gray-500 text-lg md:text-sm">Shipping Cost</span>
                </div>
                <span className="text-emerald-500 text-xs md:text-sm">Free</span>
              </div>
              <div className="border-t w-[300px] ml-auto mb-4"></div>
              <div className="flex justify-between">
                <div className="flex-1 ml-[450px]">
                  <span className="font-karla text-sm md:text-lg font-semibold">Total</span>
                </div>
                <span className="font-karla text-sm md:text-lg font-semibold">AED{order?.finalAmount?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-80">
            <div className={`bg-[${CONSTANTS.COLORS.SUCCESS_BG}] p-6 rounded-lg relative w-[341px] h-[210px]`}>
              <div className="flex items-start gap-4">
                <img src="/bag-support.png" alt="Bag Support Icon" className="w-12 h-12 mt-1" />
                <div className="flex-1">
                  <h4 className="font-karla font-bold text-lg mb-2">Have you got issue with Product</h4>
                  <div className="border-t border-gray-300 w-[95%] mx-auto my-4"></div>
                  <p className="font-karla text-sm text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis">Contact KUKU Customer Support Team</p>
                  <button className={`font-karla text-[${CONSTANTS.COLORS.SECONDARY}] text-sm font-semibold hover:text-emerald-700 underline`}>Click Here</button>
                </div>
              </div>
              <div className="absolute bottom-2 right-2">
                <img src="/kuku_logo.svg" alt="Kuku bird" className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCancelDialog && (
        <Modal onClose={() => setShowCancelDialog(false)}>
          <div className="mx-auto mb-4">
            <div className={`w-16 h-16 bg-[${CONSTANTS.COLORS.SUCCESS_BG}] rounded-full flex items-center justify-center mx-auto`}>
              <img src="/greencircle.png" alt="Green Circle" className="w-16 h-16" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-6">Are you sure, Do you want to cancel order?</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleCancelOrder}
              className={`px-8 py-2.5 border border-[${CONSTANTS.COLORS.BUTTON_BORDER}] text-[${CONSTANTS.COLORS.PRIMARY}] rounded-[10px] hover:bg-[${CONSTANTS.COLORS.PRIMARY}] hover:text-white transition-colors`}
            >
              Yes, Cancel
            </button>
            <button
              onClick={() => setShowCancelDialog(false)}
              className={`px-8 py-2.5 bg-[${CONSTANTS.COLORS.BUTTON_YELLOW}] text-[${CONSTANTS.COLORS.PRIMARY}] rounded-[10px] hover:bg-yellow-500 transition-colors`}
            >
              No, Leave
            </button>
          </div>
        </Modal>
      )}
      {showSuccessDialog && (
        <Modal onClose={() => setShowSuccessDialog(false)}>
          <div className="mx-auto mb-4">
            <div className={`w-16 h-16 bg-[${CONSTANTS.COLORS.SUCCESS_BG}] rounded-full flex items-center justify-center mx-auto`}>
              <img src="/greencircle.png" alt="Green Circle" className="w-16 h-16" />
            </div>
          </div>
          <h2 className="text-xl font-semibold">Order Cancelled Successfully!</h2>
        </Modal>
      )}
    </div>
  );
};

export default OrderDetails;
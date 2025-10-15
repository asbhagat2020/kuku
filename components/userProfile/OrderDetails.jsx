



// "use client";

// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { Check } from "lucide-react";
// import Link from "next/link";
// import toast from "react-hot-toast";

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

// const OrderDetails = () => {
//   const searchParams = useSearchParams();
//   const [showCancelDialog, setShowCancelDialog] = useState(false);
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const orderId = searchParams.get("orderId");

//   useEffect(() => {
//     if (!orderId) {
//       setError("No order ID provided in the URL");
//       setLoading(false);
//       return;
//     }

//     const fetchOrderDetails = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/OrderDetails/${orderId}`);
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
//     if (!orderId) {
//       setError("Cannot cancel order: No order ID available");
//       return;
//     }
//     try {
//       // Filter out invalid entries from orderStatusHistory
//       const validHistory = (order?.orderStatusHistory || []).filter(
//         (entry) => entry.status && entry.timestamp
//       );
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/updateOrder/${orderId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           orderStatus: "Cancelled",
//           orderStatusHistory: [
//             ...validHistory,
//             { status: "Cancelled", timestamp: new Date().toISOString() },
//           ],
//         }),
//       });
//       if (!response.ok) throw new Error("Failed to cancel order");
//       setShowCancelDialog(false);
//       setShowSuccessDialog(true);
//       setOrder((prev) => ({ ...prev, orderStatus: "Cancelled" }));
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message);
//     }
//   };

//   if (loading) return <div className="text-center p-8">Loading...</div>;
//   if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

//   const getProgressSteps = () => {
//     const steps = [
//       {
//         title: "Order Confirmed",
//         subtitle: order?.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A",
//         isCompleted: order?.orderStatus !== "Pending",
//       },
//       {
//         title: "Shipped",
//         subtitle: order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.find((h) => h.status === "Out For Delivery")?.timestamp
//           ? new Date(order.processingDetails.deliveryDetails.deliveryStatusHistory.find((h) => h.status === "Out For Delivery").timestamp).toLocaleString()
//           : "Not dispatched",
//         isCompleted:
//           order?.processingDetails?.deliveryDetails?.deliveryStatus === "Out For Delivery" ||
//           order?.orderStatus === "Out for delivery" ||
//           order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.some((h) => h.status === "Out For Delivery"),
//       },
//       {
//         title: "Delivered",
//         subtitle: order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.find((h) => h.status === "Delivered")?.timestamp
//           ? new Date(order.processingDetails.deliveryDetails.deliveryStatusHistory.find((h) => h.status === "Delivered").timestamp).toLocaleString()
//           : order?.tentativeDelivery
//           ? `Est. ${new Date(order.tentativeDelivery).toLocaleDateString()}`
//           : "N/A",
//         isCompleted: 
//           order?.processingDetails?.deliveryDetails?.deliveryStatus === "Delivered" ||
//           order?.orderStatus === "Delivered" ||
//           order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.some((h) => h.status === "Delivered"),
//       },
//     ];

//     // Add reverse shipment steps for rented items after delivery
//     if (order?.products?.[0]?.isRental) {
//       const returnScheduledRecord = order?.processingDetails?.returnDetails?.returnStatusHistory?.find((h) => h.status === "Return Scheduled");
//       const returnPickedUpRecord = order?.processingDetails?.returnDetails?.returnStatusHistory?.find((h) => h.status === "Return Picked Up");
      
//       // Reverse Shipment Created - completed when returnStatus is "Return Scheduled" or later
//       steps.push({
//         title: "Reverse Shipment Created",
//         subtitle: returnScheduledRecord?.timestamp
//           ? new Date(returnScheduledRecord.timestamp).toLocaleString()
//           : "Not scheduled",
//         isCompleted: order?.processingDetails?.returnDetails?.returnStatus && 
//           ["Return Scheduled", "Return Picked Up", "Return Delivered"].includes(order?.processingDetails?.returnDetails?.returnStatus),
//       });

//       // Item Picked Up - completed when returnStatus is "Return Picked Up" or later
//       steps.push({
//         title: "Item Picked Up",
//         subtitle: returnPickedUpRecord?.timestamp
//           ? new Date(returnPickedUpRecord.timestamp).toLocaleString()
//           : "Not picked up",
//         isCompleted: order?.processingDetails?.returnDetails?.returnStatus && 
//           ["Return Picked Up", "Return Delivered"].includes(order?.processingDetails?.returnDetails?.returnStatus),
//       });
//     } else if (order?.orderStatus === "Returned" || order?.orderStatus === "Out for reverse delivery") {
//       steps.push({
//         title: order?.orderStatus === "Returned" ? "Returned" : "Out for Reverse Delivery",
//         subtitle: order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.find((h) => h.status === "RTO Delivered" || h.status === "Out For Reverse Delivery")?.timestamp
//           ? new Date(order.processingDetails.deliveryDetails.deliveryStatusHistory.find((h) => h.status === "RTO Delivered" || h.status === "Out For Reverse Delivery").timestamp).toLocaleString()
//           : "N/A",
//         isCompleted: order?.orderStatus === "Returned",
//       });
//     }

//     return steps;
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="max-w-6xl mx-auto px-6 py-10">
//         <h1 className="text-4xl font-luckiest mb-8 text-center md:text-left">ORDER DETAILS</h1>
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
//             <span className="text-gray-800 font-karla text-lg font-semibold">Order #{orderId || "Unknown"}</span>
//             <span
//               className={`px-3 py-1 rounded-full text-sm font-karla uppercase ${
//                 order?.orderStatus === "Cancelled"
//                   ? "bg-red-100 text-red-600"
//                   : order?.orderStatus === "Delivered"
//                   ? "bg-emerald-100 text-emerald-600"
//                   : order?.orderStatus === "Returned"
//                   ? "bg-yellow-100 text-yellow-600"
//                   : "bg-blue-100 text-blue-600"
//               }`}
//             >
//               {order?.orderStatus}
//             </span>
//           </div>
//           <p className="text-gray-500 text-sm mt-2">Date: {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
//         </div>
//         {order?.orderStatus !== "Cancelled" && (
//           <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-14">
//             <div className="flex-1 relative">
//               <div className="absolute left-0 right-0 h-[2px] bg-gray-200 top-6 z-0" />
//               <div className="relative z-10 flex justify-between flex-wrap">
//                 {getProgressSteps().map((step, index) => (
//                   <ProgressStep
//                     key={index}
//                     isCompleted={step.isCompleted}
//                     number={index + 1}
//                     title={step.title}
//                     subtitle={step.subtitle}
//                     alignment={index === 0 ? "start" : index === getProgressSteps().length - 1 ? "end" : "center"}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="w-full md:w-80 bg-white rounded-lg p-6 shadow-md border border-gray-200">
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Courier Name</p>
//                   <p className="text-gray-400 text-xs md:text-[12px]">{order?.processingDetails?.deliveryDetails?.provider || "Al ameen express"}</p>
//                 </div>
//                 <hr className="border-gray-200" />
//                 <div className="flex justify-between items-center">
//                   <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Tracking Number</p>
//                   <p className="text-gray-400 text-xs md:text-[12px]">
//                     {order?.products?.[0]?.isRental
//                       ? order?.processingDetails?.returnDetails?.trackingNumber || "N/A"
//                       : order?.processingDetails?.deliveryDetails?.trackingNumber || "N/A"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <h3 className="text-lg md:text-xl font-karla mb-6 font-semibold text-center md:text-left">Item Ordered</h3>
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className={`bg-[${CONSTANTS.COLORS.ITEM_BG}] shadow-md border border-gray-200 p-6 rounded-lg flex-1`}>
//             <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
//               <img
//                 src={order?.products?.[0]?.product?.images?.[0] || "/orders-image.png"}
//                 alt="Ordered Item"
//                 className="w-28 h-36 object-cover rounded-lg"
//               />
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <h4 className="font-karla text-sm md:text-lg flex-1 font-semibold">{order?.products?.[0]?.productName || "Unknown Product"}</h4>
//                   <div className="text-right">
//                     <div className="flex items-center gap-2">
//                       <span className="font-karla text-sm md:text-lg font-semibold">AED {order?.finalAmount?.toFixed(2) || "0.00"}</span>
//                       {order?.discount > 0 && (
//                         <span className="text-emerald-500 text-xs md:text-sm">
//                           {((order.discount / order.totalAmount) * 100).toFixed(0)}% OFF
//                         </span>
//                       )}
//                     </div>
//                     {order?.discount > 0 && (
//                       <span className="text-gray-400 text-xs md:text-sm line-through">MRP AED {order?.totalAmount?.toFixed(2) || "0.00"}</span>
//                     )}
//                   </div>
//                 </div>
//                 <p className="text-gray-500 text-xs md:text-sm mt-2">{order?.products?.[0]?.product?.description || "No description"}</p>
//                 <p className="text-gray-500 text-xs md:text-sm mt-2">Brand: {order?.products?.[0]?.product?.brand?.brandName || "Unknown Brand"}</p>
//                 <p className="text-gray-500 text-xs md:text-sm mt-2">Size: {order?.products?.[0]?.product?.size?.sizeName || "N/A"}</p>
//                 <p className="text-gray-500 text-xs md:text-sm mt-2">Condition: {order?.products?.[0]?.product?.condition?.conditionName || "Unknown Condition"}</p>
//                 {order?.products?.[0]?.isRental && (
//                   <p className="text-gray-500 text-xs md:text-sm mt-2">
//                     Rental Period: {order?.products?.[0]?.product?.rent?.[0]?.startDate && order?.products?.[0]?.product?.rent?.[0]?.endDate
//                       ? `${new Date(order.products[0].product.rent[0].startDate).toLocaleDateString()} - ${new Date(order.products[0].product.rent[0].endDate).toLocaleDateString()}`
//                       : "N/A"}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="border-t pt-4">
//               <div className="mt-4">
//                 {order?.orderStatus === "Confirmed" && (
//                   <button onClick={() => setShowCancelDialog(true)} className={`font-karla text-[${CONSTANTS.COLORS.PRIMARY}] underline text-sm font-bold`}>
//                     Cancel Order
//                   </button>
//                 )}
//               </div>
//               <div className="flex justify-between mb-4">
//                 <div className="flex-1 ml-[450px]">
//                   <span className="font-karla text-gray-500 text-lg md:text-sm">Product Total</span>
//                 </div>
//                 <span className="font-karla text-sm md:text-lg font-semibold">AED {order?.finalAmount?.toFixed(2) || "0.00"}</span>
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
//                 <span className="font-karla text-sm md:text-lg font-semibold">AED {order?.finalAmount?.toFixed(2) || "0.00"}</span>
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
import Link from "next/link";
import toast from "react-hot-toast";

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
      // Filter out invalid entries from orderStatusHistory
      const validHistory = (order?.orderStatusHistory || []).filter(
        (entry) => entry.status && entry.timestamp
      );
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/updateOrder/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderStatus: "Cancelled",
          orderStatusHistory: [
            ...validHistory,
            { status: "Cancelled", timestamp: new Date().toISOString() },
          ],
        }),
      });
      if (!response.ok) throw new Error("Failed to cancel order");
      setShowCancelDialog(false);
      setShowSuccessDialog(true);
      setOrder((prev) => ({ ...prev, orderStatus: "Cancelled" }));
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  const getProgressSteps = () => {
    const steps = [
      {
        title: "Order Confirmed",
        subtitle: order?.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A",
        isCompleted: order?.orderStatus !== "Pending",
      },
      {
        title: "Shipped",
        subtitle: order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.find((h) => h.status === "Out For Delivery")?.timestamp
          ? new Date(order.processingDetails.deliveryDetails.deliveryStatusHistory.find((h) => h.status === "Out For Delivery").timestamp).toLocaleString()
          : "Not dispatched",
        isCompleted:
          order?.processingDetails?.deliveryDetails?.deliveryStatus === "Out For Delivery" ||
          order?.orderStatus === "Out for delivery" ||
          order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.some((h) => h.status === "Out For Delivery"),
      },
      {
        title: "Delivered",
        subtitle: order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.find((h) => h.status === "Delivered")?.timestamp
          ? new Date(order.processingDetails.deliveryDetails.deliveryStatusHistory.find((h) => h.status === "Delivered").timestamp).toLocaleString()
          : order?.tentativeDelivery
          ? `Est. ${new Date(order.tentativeDelivery).toLocaleDateString()}`
          : "N/A",
        isCompleted: 
          order?.processingDetails?.deliveryDetails?.deliveryStatus === "Delivered" ||
          order?.orderStatus === "Delivered" ||
          order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.some((h) => h.status === "Delivered"),
      },
    ];

    // Add reverse shipment steps for rented items after delivery
    if (order?.products?.[0]?.isRental) {
      const returnScheduledRecord = order?.processingDetails?.returnDetails?.returnStatusHistory?.find((h) => h.status === "Return Scheduled");
      const returnPickedUpRecord = order?.processingDetails?.returnDetails?.returnStatusHistory?.find((h) => h.status === "Return Picked Up");
      
      // Reverse Shipment Created - completed when returnStatus is "Return Scheduled" or later
      steps.push({
        title: "Reverse Shipment Created",
        subtitle: returnScheduledRecord?.timestamp
          ? new Date(returnScheduledRecord.timestamp).toLocaleString()
          : "Not scheduled",
        isCompleted: order?.processingDetails?.returnDetails?.returnStatus && 
          ["Return Scheduled", "Return Picked Up", "Return Delivered"].includes(order?.processingDetails?.returnDetails?.returnStatus),
      });

      // Item Picked Up - completed when returnStatus is "Return Picked Up" or later
      steps.push({
        title: "Item Picked Up",
        subtitle: returnPickedUpRecord?.timestamp
          ? new Date(returnPickedUpRecord.timestamp).toLocaleString()
          : "Not picked up",
        isCompleted: order?.processingDetails?.returnDetails?.returnStatus && 
          ["Return Picked Up", "Return Delivered"].includes(order?.processingDetails?.returnDetails?.returnStatus),
      });
    } else if (order?.orderStatus === "Returned" || order?.orderStatus === "Out for reverse delivery") {
      steps.push({
        title: order?.orderStatus === "Returned" ? "Returned" : "Out for Reverse Delivery",
        subtitle: order?.processingDetails?.deliveryDetails?.deliveryStatusHistory?.find((h) => h.status === "RTO Delivered" || h.status === "Out For Reverse Delivery")?.timestamp
          ? new Date(order.processingDetails.deliveryDetails.deliveryStatusHistory.find((h) => h.status === "RTO Delivered" || h.status === "Out For Reverse Delivery").timestamp).toLocaleString()
          : "N/A",
        isCompleted: order?.orderStatus === "Returned",
      });
    }

    return steps;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-luckiest mb-8 text-center md:text-left">ORDER DETAILS</h1>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <span className="text-gray-800 font-karla text-lg font-semibold">Order #{orderId || "Unknown"}</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-karla uppercase ${
                order?.orderStatus === "Cancelled"
                  ? "bg-red-100 text-red-600"
                  : order?.orderStatus === "Delivered"
                  ? "bg-emerald-100 text-emerald-600"
                  : order?.orderStatus === "Returned"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {order?.orderStatus}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Date: {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
        {order?.orderStatus !== "Cancelled" && (
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-14">
            <div className="flex-1 relative">
              <div className="absolute left-0 right-0 h-[2px] bg-gray-200 top-6 z-0" />
              <div className="relative z-10 flex justify-between flex-wrap">
                {getProgressSteps().map((step, index) => (
                  <ProgressStep
                    key={index}
                    isCompleted={step.isCompleted}
                    number={index + 1}
                    title={step.title}
                    subtitle={step.subtitle}
                    alignment={index === 0 ? "start" : index === getProgressSteps().length - 1 ? "end" : "center"}
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-80 bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Courier Name</p>
                  <p className="text-gray-400 text-xs md:text-[12px]">{order?.processingDetails?.deliveryDetails?.provider || "Al ameen express"}</p>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Tracking Number</p>
                  <p className="text-gray-400 text-xs md:text-[12px]">
                    {order?.products?.[0]?.isRental
                      ? order?.processingDetails?.returnDetails?.trackingNumber || "N/A"
                      : order?.processingDetails?.deliveryDetails?.trackingNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
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
                      <span className="font-karla text-sm md:text-lg font-semibold">AED {order?.finalAmount?.toFixed(2) || "0.00"}</span>
                      {order?.discount > 0 && (
                        <span className="text-emerald-500 text-xs md:text-sm">
                          {((order.discount / order.totalAmount) * 100).toFixed(0)}% OFF
                        </span>
                      )}
                    </div>
                    {order?.discount > 0 && (
                      <span className="text-gray-400 text-xs md:text-sm line-through">MRP AED {order?.totalAmount?.toFixed(2) || "0.00"}</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-500 text-xs md:text-sm mt-2">{order?.products?.[0]?.product?.description || "No description"}</p>
                <p className="text-gray-500 text-xs md:text-sm mt-2">Brand: {order?.products?.[0]?.product?.brand?.brandName || "Unknown Brand"}</p>
                <p className="text-gray-500 text-xs md:text-sm mt-2">Size: {order?.products?.[0]?.product?.size?.sizeName || "N/A"}</p>
                <p className="text-gray-500 text-xs md:text-sm mt-2">Condition: {order?.products?.[0]?.product?.condition?.conditionName || "Unknown Condition"}</p>
                {order?.products?.[0]?.isRental && (
                  <p className="text-gray-500 text-xs md:text-sm mt-2">
                    Rental Period: {order?.products?.[0]?.product?.rent?.[0]?.startDate && order?.products?.[0]?.product?.rent?.[0]?.endDate
                      ? `${new Date(order.products[0].product.rent[0].startDate).toLocaleDateString()} - ${new Date(order.products[0].product.rent[0].endDate).toLocaleDateString()}`
                      : "N/A"}
                  </p>
                )}
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="mt-4">
                {order?.orderStatus === "Confirmed" && (
                  <button onClick={() => setShowCancelDialog(true)} className={`font-karla text-[${CONSTANTS.COLORS.PRIMARY}] underline text-sm font-bold`}>
                    Cancel Order
                  </button>
                )}
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex-1 ml-[450px]">
                  <span className="font-karla text-gray-500 text-lg md:text-sm">Product Total</span>
                </div>
                <span className="font-karla text-sm md:text-lg font-semibold">AED {order?.finalAmount?.toFixed(2) || "0.00"}</span>
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
                <span className="font-karla text-sm md:text-lg font-semibold">AED {order?.finalAmount?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
          </div>
        </div>
        {order?.isFullRefunded && (
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h3 className="text-lg md:text-xl font-karla mb-4 font-semibold text-center md:text-left">Refund Details</h3>
            <div className="bg-[#F7F7F6] shadow-md border border-gray-200 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Refund Status</p>
                <p className="text-emerald-500 text-xs md:text-[12px]">Fully Refunded</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-black font-karla text-sm md:text-[16px] font-semibold">Refunded Amount</p>
                <p className="text-gray-400 text-xs md:text-[12px]">AED {order?.fullRefundedAmount?.toFixed(2) || "0.00"}</p>
              </div>
            </div>
          </div>
        )}
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
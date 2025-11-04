// //important below code

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";

// const OrdersPage = () => {
//   const [activeSection, setActiveSection] = useState("orders");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [showReturnPolicyModal, setShowReturnPolicyModal] = useState(false); // State for modal

//   const details = useSelector((state) => state.auth.user);
//   const id = details?._id;

//   useEffect(() => {
//     setUserId(id);
//   }, [id]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!userId) {
//         const token = Cookies.get("auth");
//         if (!token) {
//           toast.error("Please login to view orders");
//           setLoading(false);
//           return;
//         }
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/UserOrders/${userId}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch orders");
//         const data = await response.json();
//         setOrders(data.orders || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [userId]);

//   // Function to check if order is within 24-hour return window
//   const isReturnable = (order) => {
//     if (order.orderStatus !== "Delivered") return false;
//     const deliveryTime = new Date(order.paidAt); // Assuming paidAt is delivery time
//     const currentTime = new Date();
//     const timeDiff = currentTime - deliveryTime;
//     const hoursDiff = timeDiff / (1000 * 60 * 60);
//     return hoursDiff <= 24;
//   };

//   // Handle click on disabled return button
//   const handleDisabledReturnClick = () => {
//     toast.error("You cannot return this order. The 24-hour return window has expired.");
//   };

//   // Handle Return Policy button click
//   const handleReturnPolicyClick = () => {
//     setShowReturnPolicyModal(true);
//   };

//   // Close modal
//   const handleCloseModal = () => {
//     setShowReturnPolicyModal(false);
//   };

//   if (loading) return <div className="text-center text-lg">Loading...</div>;
//   if (error) return <div className="text-center text-lg text-red-500">Error: {error}</div>;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
//       <h1 className="text-3xl sm:text-4xl font-luckiest mb-4 sm:mb-6 text-center md:text-left">
//         All Orders
//       </h1>
//       <div className="flex-1 mt-4 sm:mt-6">
//         {orders.length > 0 && (
//           <div className="space-y-4 sm:space-y-6">
//             {orders.map((order) => (
//               <div key={order._id} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
//                 <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-100 pb-2 sm:pb-4">
//                   <Image
//                     src="/delivery_icon.png"
//                     alt="Delivery"
//                     width={20}
//                     height={20}
//                     className="w-6 sm:w-8 h-6 sm:h-8"
//                   />
//                   <div>
//                     <span className="text-pink-500 font-medium text-sm sm:text-base">
//                       {order.orderStatus}
//                     </span>
//                     <span className="text-gray-400 text-xs sm:text-sm ml-1 sm:ml-2">
//                       {new Date(order.paidAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>

//                 {order.products.map((product, index) => (
//                   <div key={product._id} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
//                     <div className="w-full sm:w-[120px] h-[120px] sm:h-[120px] flex-shrink-0">
//                       <Image
//                         src={product.product?.images?.[0] || "/product-image.png"}
//                         alt={product.productName}
//                         width={120}
//                         height={120}
//                         className="w-full h-full object-cover rounded-md"
//                       />
//                     </div>

//                     <div className="flex-1 w-full">
//                       <div className="flex items-start gap-2 sm:gap-4 mb-2">
//                         {product.isRental && (
//                           <div className="flex items-center gap-1 sm:gap-2">
//                             <h2 className="text-xl sm:text-2xl font-bold text-red-500">
//                               Rent
//                             </h2>
//                             {product.product?.rent?.length > 0 && (
//                               <span className="text-xs sm:text-sm text-gray-500">
//                                 (RENTAL PERIOD: {new Date(
//                                   product.product.rent[0].startDate
//                                 ).toLocaleDateString()}{" "}
//                                 -{" "}
//                                 {new Date(
//                                   product.product.rent[0].endDate
//                                 ).toLocaleDateString()})
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex flex-col sm:flex-row justify-between items-start">
//                         <div>
//                           <h3 className="font-karla font-semibold text-gray-900 text-base sm:text-lg mb-1">
//                             {product.productName}
//                           </h3>
//                           <p className="text-xs sm:text-sm text-gray-500">
//                             {product.product?.description || "No description"}
//                           </p>
//                           <p className="text-xs sm:text-sm text-gray-600">
//                             Brand:{" "}
//                             {product.product?.brand?.brandName || "Unknown Brand"}
//                           </p>
//                         </div>
//                         <div className="text-right mt-2 sm:mt-0">
//                           <p className="font-medium text-sm sm:text-[15px] font-semibold">
//                             AED{order.finalAmount.toFixed(2)}
//                           </p>
//                           <p className="text-xs sm:text-sm text-gray-400 line-through">
//                             MRP AED{order.totalAmount.toFixed(2)}
//                           </p>
//                           <span className="text-xs sm:text-sm text-green-500">
//                             {order.discount > 0
//                               ? `${((order.discount / order.totalAmount) * 100).toFixed(0)}%OFF`
//                               : "No Discount"}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mt-4 sm:mt-6 mb-4 sm:mb-6">
//                         <div className="flex items-center gap-1 sm:gap-2">
//                           <span className="text-gray-500 text-xs sm:text-sm">SIZE</span>
//                           <span className="px-1 sm:px-2 py-0.5 border border-[#E4086F] text-[#E4086F] rounded text-xs sm:text-sm bg-white">
//                             {product.product?.size?.sizeName || "N/A"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-1 sm:gap-2">
//                           <span className="font-karla text-xs sm:text-sm font-semibold">
//                             CONDITION:
//                           </span>
//                           <span className="text-xs sm:text-sm text-gray-500 font-semibold">
//                             {product.product?.condition?.conditionName || "Unknown Condition"}
//                           </span>
//                         </div>
//                       </div>

//                       {index === 0 && (
//                         <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
//                           <Link href={`/orderdetails?orderId=${order._id}`}>
//                             <button className="text-blue-500 font-medium text-xs sm:text-sm border-b border-blue-500 hover:text-blue-600">
//                               ORDER DETAILS
//                             </button>
//                           </Link>
//                           {order.orderStatus === "Delivered" && (
//                             <div className="flex flex-col sm:flex-row items-center gap-2">
//                               <Link href={isReturnable(order) ? `/returnorder?orderId=${order._id}` : "#"}>
//                                 <button
//                                   className={`font-medium text-xs sm:text-sm border-b border-pink-500 ${
//                                     isReturnable(order)
//                                       ? "text-pink-500 hover:text-pink-600"
//                                       : "text-gray-400 cursor-not-allowed"
//                                   }`}
//                                   disabled={!isReturnable(order)}
//                                   onClick={!isReturnable(order) ? handleDisabledReturnClick : undefined}
//                                 >
//                                   RETURN ORDER
//                                 </button>
//                               </Link>
//                               <button
//                                 className="text-purple-500 font-medium text-xs sm:text-sm border-b border-purple-500 hover:text-purple-600"
//                                 onClick={handleReturnPolicyClick}
//                               >
//                                 RETURN POLICY
//                               </button>
//                               {isReturnable(order) && (
//                                 <span className="text-xs sm:text-xs text-gray-500 italic">
//                                   Return available within 24 hours of delivery
//                                 </span>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         )}
//         {/* Return Policy Modal */}
//         {showReturnPolicyModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
//             <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-lg w-full mx-2 sm:mx-4">
//               <div className="flex flex-col items-center text-center">
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 text-gray-900">
//                   Return Policy
//                 </h3>
//                 <div className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-4 leading-relaxed text-left">
//                   <p>
//                     We strive to ensure your satisfaction with every purchase. Items can be returned within <strong>24 hours of delivery</strong> provided they meet the following conditions:
//                   </p>
//                   <ul className="list-disc list-inside mt-1 sm:mt-2">
//                     <li className="text-xs sm:text-sm md:text-base">The item must be in its original condition, unused, and with all tags and packaging intact.</li>
//                     <li className="text-xs sm:text-sm md:text-base">Proof of purchase (order ID) is required.</li>
//                     <li className="text-xs sm:text-sm md:text-base">Refunds will be processed to the original payment method within 7 business days after approval.</li>
//                     <li className="text-xs sm:text-sm md:text-base">Rental items are subject to additional terms as per the rental agreement.</li>
//                   </ul>
//                   <p className="mt-1 sm:mt-2">
//                     For any questions, please contact our support team at{" "}
//                     <a href="mailto:Support@letskuku.com" className="text-blue-500 underline">
//                       Support@letskuku.com
//                     </a>.
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleCloseModal}
//                   className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-[#E4086F] text-white rounded-full text-xs sm:text-sm font-medium hover:bg-[#c9075f] transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {/* Always show this CTA section at the end */}
//         <div className="w-full h-[40vh] sm:h-[50vh] flex justify-center items-center mt-6 sm:mt-12 pt-4 sm:pt-8 border-t border-gray-200">
//           <div className="text-center">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-luckiest mb-2 sm:mb-4">
//               Continue shopping to see more orders here :)
//             </h2>
//             <Link
//               className="text-pink-400 font-karla text-lg sm:text-xl underline hover:text-pink-500 transition-colors"
//               href={"/selling-page"}
//             >
//               Continue purchase
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Helper function to get clean display status
const getDisplayStatus = (order) => {
  const status = order.orderStatus;

  if (status === "Delivered") return "Delivered";
  if (status === "Cancelled") return "Cancelled";
  if (status === "Rented Return Delivered") return "Rented Returned";
  if (status === "Return Delivered to Seller") return "Returned";

  if (status === "Pending") {
    return order.isPaid ? "Confirmed" : "Pending";
  }

  if (status === "Confirmed") return "Confirmed";

  return null; // Hide all other statuses
};

const OrdersPage = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showReturnPolicyModal, setShowReturnPolicyModal] = useState(false);

  const details = useSelector((state) => state.auth.user);
  const id = details?._id;

  useEffect(() => {
    setUserId(id);
  }, [id]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        const token = Cookies.get("auth");
        if (!token) {
          toast.error("Please login to view orders");
          setLoading(false);
          return;
        }
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/UserOrders/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  // Check if order is within 24-hour return window
  const isReturnable = (order) => {
    if (order.orderStatus !== "Delivered") return false;
    const deliveryTime = new Date(order.paidAt);
    const currentTime = new Date();
    const timeDiff = currentTime - deliveryTime;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  const handleDisabledReturnClick = () => {
    toast.error(
      "You cannot return this order. The 24-hour return window has expired."
    );
  };

  const handleReturnPolicyClick = () => {
    setShowReturnPolicyModal(true);
  };

  const handleCloseModal = () => {
    setShowReturnPolicyModal(false);
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-lg text-red-500">Error: {error}</div>
    );

  // Filter orders to show only allowed statuses
  const filteredOrders = orders.filter(
    (order) => getDisplayStatus(order) !== null
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl sm:text-4xl font-luckiest mb-4 sm:mb-6 text-center md:text-left">
        All Orders
      </h1>
      <div className="flex-1 mt-4 sm:mt-6">
        {filteredOrders.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {filteredOrders.map((order) => {
              const displayStatus = getDisplayStatus(order);
              const isDelivered = displayStatus === "Delivered";

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-lg p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-100 pb-2 sm:pb-4">
                    <Image
                      src="/delivery_icon.png"
                      alt="Delivery"
                      width={20}
                      height={20}
                      className="w-6 sm:w-8 h-6 sm:h-8"
                    />
                    <div>
                      <span
                        className={`font-medium text-sm sm:text-base ${
                          displayStatus === "Delivered"
                            ? "text-green-600"
                            : displayStatus === "Cancelled" ||
                              displayStatus === "Returned"
                            ? "text-red-600"
                            : displayStatus === "Rented Returned"
                            ? "text-purple-600"
                            : "text-pink-500"
                        }`}
                      >
                        {displayStatus}
                      </span>
                      <span className="text-gray-400 text-xs sm:text-sm ml-1 sm:ml-2">
                        {new Date(
                          order.paidAt || order.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {order.products.map((product, index) => (
                    <div
                      key={product._id}
                      className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6"
                    >
                      <div className="w-full sm:w-[120px] h-[120px] flex-shrink-0">
                        <Image
                          src={
                            product.product?.images?.[0] || "/product-image.png"
                          }
                          alt={product.productName}
                          width={120}
                          height={120}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1 w-full">
                        <div className="flex items-start gap-2 sm:gap-4 mb-2">
                          {product.isRental && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <h2 className="text-xl sm:text-2xl font-bold text-red-500">
                                Rent
                              </h2>
                              {product.product?.rent?.length > 0 && (
                                <span className="text-xs sm:text-sm text-gray-500">
                                  (RENTAL PERIOD:{" "}
                                  {new Date(
                                    product.product.rent[0].startDate
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    product.product.rent[0].endDate
                                  ).toLocaleDateString()}
                                  )
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start">
                          <div>
                            <h3 className="font-karla font-semibold text-gray-900 text-base sm:text-lg mb-1">
                              {product.productName}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {product.product?.description || "No description"}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Brand:{" "}
                              {product.product?.brand?.brandName ||
                                "Unknown Brand"}
                            </p>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <p className="font-medium text-sm sm:text-[15px] font-semibold">
                              AED{order.finalAmount.toFixed(2)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400 line-through">
                              MRP AED{order.totalAmount.toFixed(2)}
                            </p>
                            <span className="text-xs sm:text-sm text-green-500">
                              {order.discount > 0
                                ? `${(
                                    (order.discount / order.totalAmount) *
                                    100
                                  ).toFixed(0)}% OFF`
                                : "No Discount"}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mt-4 sm:mt-6 mb-4 sm:mb-6">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-gray-500 text-xs sm:text-sm">
                              SIZE
                            </span>
                            <span className="px-1 sm:px-2 py-0.5 border border-[#E4086F] text-[#E4086F] rounded text-xs sm:text-sm bg-white">
                              {product.product?.size?.sizeName || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="font-karla text-xs sm:text-sm font-semibold">
                              CONDITION:
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 font-semibold">
                              {product.product?.condition?.conditionName ||
                                "Unknown Condition"}
                            </span>
                          </div>
                        </div>
                        {index === 0 && (
                          <div className="flex flex-col gap-3 mt-4 sm:mt-6">
                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                              <Link href={`/orderdetails?orderId=${order._id}`}>
                                <button className="text-blue-500 font-medium text-xs sm:text-sm border-b border-blue-500 hover:text-blue-600">
                                  ORDER DETAILS
                                </button>
                              </Link>

                              {isDelivered && (
                                <>
                                  {/* Show Return Button only if returnable */}
                                  {isReturnable(order) ? (
                                    <Link
                                      href={`/returnorder?orderId=${order._id}`}
                                    >
                                      <button className="text-pink-500 font-medium text-xs sm:text-sm border-b border-pink-500 hover:text-pink-600">
                                        RETURN ORDER
                                      </button>
                                    </Link>
                                  ) : // Show nothing here if not returnable (button hidden)
                                  null}

                                  <button
                                    className="text-purple-500 font-medium text-xs sm:text-sm border-b border-purple-500 hover:text-purple-600"
                                    onClick={handleReturnPolicyClick}
                                  >
                                    RETURN POLICY
                                  </button>

                                  {/* Return Window Info */}
                                  {isReturnable(order) && (
                                    <span className="text-xs text-text-[#e4086f] italic">
                                      Return available within 24 hours of
                                      delivery
                                    </span>
                                  )}
                                </>
                              )}
                            </div>

                            {/* Expired Return Message - Only if Delivered but NOT returnable */}
                            {isDelivered && !isReturnable(order) && (
                              <p className="text-xs text-[#e4086f] italic text-center sm:text-left">
                                Return window expired (24 hours from delivery)
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No orders found with the selected status.
          </div>
        )}

        {/* Return Policy Modal */}
        {showReturnPolicyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-lg w-full mx-2 sm:mx-4">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 text-gray-900">
                  Return Policy
                </h3>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-4 leading-relaxed text-left">
                  <p>
                    We strive to ensure your satisfaction with every purchase.
                    Items can be returned within{" "}
                    <strong>24 hours of delivery</strong> provided they meet the
                    following conditions:
                  </p>
                  <ul className="list-disc list-inside mt-1 sm:mt-2">
                    <li>
                      The item must be in its original condition, unused, and
                      with all tags and packaging intact.
                    </li>
                    <li>Proof of purchase (order ID) is required.</li>
                    <li>
                      Refunds will be processed to the original payment method
                      within 7 business days after approval.
                    </li>
                    <li>
                      Rental items are subject to additional terms as per the
                      rental agreement.
                    </li>
                  </ul>
                  <p className="mt-1 sm:mt-2">
                    For any questions, please contact our support team at{" "}
                    <a
                      href="mailto:Support@letskuku.com"
                      className="text-blue-500 underline"
                    >
                      Support@letskuku.com
                    </a>
                    .
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-[#E4086F] text-white rounded-full text-xs sm:text-sm font-medium hover:bg-[#c9075f] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="w-full h-[40vh] sm:h-[50vh] flex justify-center items-center mt-6 sm:mt-12 pt-4 sm:pt-8 border-t border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-luckiest mb-2 sm:mb-4">
              Continue shopping to see more orders here :)
            </h2>
            <Link
              className="text-pink-400 font-karla text-lg sm:text-xl underline hover:text-pink-500 transition-colors"
              href="/selling-page"
            >
              Continue purchase
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;




// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import Image from "next/image";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { Bell, Check, X, Filter, Search } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";

// const OfferComponent = ({ setOfferCount }) => {
//   const [offers, setOffers] = useState([]);
//   const [offerNotifications, setOfferNotifications] = useState([]);
//   const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [currentOffer, setCurrentOffer] = useState(null);
//   const [isChecked, setIsChecked] = useState(false);
//   const [activeTab, setActiveTab] = useState("offers");
//   const [filter, setFilter] = useState("ALL");
//   const [searchTerm, setSearchTerm] = useState("");

//   const router = useRouter();
//   const details = useSelector((state) => state.auth.user);
//   const id = details?._id;
//   const token = JSON.parse(Cookies.get("auth") || "null");

//   useEffect(() => {
//     fetchData();

//     const interval = setInterval(() => {
//       fetchData();
//     }, 30000);

//     return () => clearInterval(interval);
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       if (!token) throw new Error("Not authenticated");

//       // Fetch offers
//       const offerResponse = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/get`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const offersData = offerResponse.data.offers || [];
//       // Sort offers by createdAt in descending order to show newest first
//       setOffers(offersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

//       // Fetch offer notifications
//       const notificationResponse = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const notificationsData = Array.isArray(notificationResponse.data)
//         ? notificationResponse.data
//         : [];
//       setOfferNotifications(notificationsData);
//       const unreadCount = notificationsData.filter((n) => !n.read).length;
//       setUnreadNotificationCount(unreadCount);

//       // Count only pending offers and unread notifications for badge
//       const pendingOffers = offersData.filter(offer => offer.status === "Pending");
//       setOfferCount(pendingOffers.length + unreadCount);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to fetch offers or notifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkRemainingOffers = async (productId) => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/remaining/${productId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data.remainingOffers;
//     } catch (error) {
//       console.error("Error checking remaining offers:", error);
//       return 0;
//     }
//   };

//   const markAsRead = async (notificationId) => {
//     try {
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify/read`,
//         { notificationId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setOfferNotifications((prev) =>
//         prev.map((n) =>
//           n._id === notificationId ? { ...n, read: true } : n
//         )
//       );
//       const newUnreadCount = Math.max(0, unreadNotificationCount - 1);
//       setUnreadNotificationCount(newUnreadCount);
//       const pendingOffers = offers.filter(offer => offer.status === "Pending");
//       setOfferCount(pendingOffers.length + newUnreadCount);
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//       toast.error("Failed to mark notification as read");
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify/mark-all-read`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setOfferNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//       setUnreadNotificationCount(0);
//       const pendingOffers = offers.filter(offer => offer.status === "Pending");
//       setOfferCount(pendingOffers.length);
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//       toast.error("Failed to mark all notifications as read");
//     }
//   };

//   const deleteNotification = async (notificationId) => {
//     try {
//       const response = await axios.delete(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify/${notificationId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response.status === 200) {
//         const notification = offerNotifications.find((n) => n._id === notificationId);
//         setOfferNotifications((prev) => prev.filter((n) => n._id !== notificationId));
//         if (!notification?.read) {
//           const newUnreadCount = Math.max(0, unreadNotificationCount - 1);
//           setUnreadNotificationCount(newUnreadCount);
//           const pendingOffers = offers.filter(offer => offer.status === "Pending");
//           setOfferCount(pendingOffers.length + newUnreadCount);
//         }
//         toast.success("Notification deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting notification:", error);
//       toast.error(error.response?.data?.message || "Failed to delete notification");
//     }
//   };

//   const openPopup = (offer) => {
//     setCurrentOffer(offer);
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setCurrentOffer(null);
//     setIsChecked(false);
//   };

//   const updateOfferStatus = async (offer, status) => {
//     if (!isChecked) {
//       toast.error("Please agree to the terms and conditions");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/update`,
//         {
//           offerId: offer._id,
//           status: status
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.status === 200) {
//         setIsPopupOpen(false);
//         setCurrentOffer(null);
//         setIsChecked(false);
//         fetchData();
//         toast.success(`Offer ${status.toLowerCase()} successfully`);
//       }
//     } catch (error) {
//       console.error(`Error ${status.toLowerCase()} offer:`, error);
//       toast.error(`Failed to ${status.toLowerCase()} offer`);
//     }
//   };

//   const rejectOffer = async (offer) => {
//     await updateOfferStatus(offer, "Rejected");
//   };

//   const acceptOffer = async (offer) => {
//     await updateOfferStatus(offer, "Accepted");
//   };

//   const handleReOffer = async (offer) => {
//     const remainingOffers = await checkRemainingOffers(offer.product._id);
//     if (remainingOffers <= 0) {
//       toast.error("You have reached the maximum limit of 3 offers for this product");
//       return;
//     }
//     router.push(`/selling-page/${offer.product._id}`);
//   };

//   const handleProceedToCheckout = async (offer) => {
//     try {
//       if (!token) throw new Error("Not authenticated");
//       if (!id) throw new Error("User ID not found");

//       // Add offer product to cart with offerPrice
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add-offer`,
//         {
//           offerId: offer._id,
//           userId: id
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.status === 200) {
//         setIsPopupOpen(false);
//         router.push("/cart");
//         toast.success("Offer added to cart. Proceeding to checkout...");
//       }
//     } catch (error) {
//       console.error("Error adding offer to cart:", error);
//       toast.error(error.response?.data?.message || "Failed to add offer to cart");
//     }
//   };

//   const formatTimeAgo = (dateString) => {
//     const now = new Date();
//     const date = new Date(dateString);
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) return "Just now";
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
//     return `${Math.floor(diffInSeconds / 86400)}d ago`;
//   };

//   const filteredNotifications = Array.isArray(offerNotifications)
//     ? offerNotifications.filter((notification) => {
//         const matchesFilter =
//           filter === "ALL" ||
//           (filter === "UNREAD" ? !notification.read : notification.read);
//         const matchesSearch =
//           searchTerm === "" ||
//           (notification.message &&
//             notification.message.toLowerCase().includes(searchTerm.toLowerCase()));
//         return matchesFilter && matchesSearch;
//       })
//     : [];

//   const getPriorityColor = (type) => {
//     switch (type) {
//       case "CheckoutFailed":
//         return "bg-red-500";
//       case "OfferCreated":
//         return "bg-orange-500";
//       case "OfferAccepted":
//         return "bg-green-500";
//       case "OfferRejected":
//         return "bg-blue-500";
//       case "ItemSold":
//         return "bg-purple-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   const hideScrollbarStyle = {
//     msOverflowStyle: "none",
//     scrollbarWidth: "none",
//   };

//   const hideScrollbarWebkit = {
//     WebkitScrollbar: { display: "none" },
//   };

//   const pendingOffers = offers.filter(offer => offer.status === "Pending");

//   return (
//     <div>
//       {/* Internal Tabs */}
//       <div className="flex gap-2 items-center border-b-2">
//         <div
//           onClick={() => setActiveTab("offers")}
//           className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[14px] pb-2 flex-grow justify-center ${
//             activeTab === "offers"
//               ? "border-b-4 border-[#FDE504] font-bold"
//               : "font-normal"
//           }`}
//         >
//           Offers
//           {pendingOffers.length > 0 && (
//             <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[20px] w-[20px] flex items-center justify-center text-xs">
//               {pendingOffers.length}
//             </span>
//           )}
//         </div>
//         <div
//           onClick={() => setActiveTab("notifications")}
//           className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[14px] pb-2 flex-grow justify-center ${
//             activeTab === "notifications"
//               ? "border-b-4 border-[#FDE504] font-bold"
//               : "font-normal"
//           }`}
//         >
//           Offer Notifications
//           {unreadNotificationCount > 0 && (
//             <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[20px] w-[20px] flex items-center justify-center text-xs">
//               {unreadNotificationCount}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       {activeTab === "offers" ? (
//         <div
//           className="overflow-y-auto max-h-[400px]"
//           style={{ ...hideScrollbarStyle, ...hideScrollbarWebkit }}
//         >
//           {loading ? (
//             <div className="flex justify-center items-center p-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDE504]"></div>
//             </div>
//           ) : offers.length === 0 ? (
//             <div className="text-center p-6">
//               <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//               <p className="text-gray-500">No offers yet</p>
//             </div>
//           ) : (
//             offers.map((offer) => (
//               <div key={offer._id} className="mb-4 p-4 border-b hover:bg-gray-50">
//                 <div className="flex gap-4 items-start">
//                   <Image
//                     src="/image139.png"
//                     alt="offer"
//                     width={30}
//                     height={30}
//                     className="w-[30px] h-[30px] rounded-full p-1 bg-[#ffdbac]"
//                   />
//                   <div className="flex flex-col gap-2 w-full">
//                     <div className="flex justify-between">
//                       <p className="text-sm text-[#1e1f23] font-bold font-karla">
//                         {id === offer.buyer?._id
//                           ? `You made an offer to ${offer.seller?.name}`
//                           : `Offer received from ${offer.buyer?.name}`}
//                       </p>
//                       <span className="text-xs text-gray-500">
//                         {new Date(offer.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                     {id === offer.buyer?._id ? (
//                       <p className="text-sm text-[#5d5d5d] font-bold font-karla">
//                         {offer.status === "Pending"
//                           ? "Your offer is still in progress"
//                           : offer.status === "Accepted"
//                           ? "Your offer is approved by the seller"
//                           : "Your offer is rejected by the seller"}
//                       </p>
//                     ) : (
//                       <p className="text-sm text-[#5d5d5d] font-bold font-karla">
//                         Great news! <b>{offer.buyer?.name}</b> has made you an offer.
//                       </p>
//                     )}
//                     {id === offer.buyer?._id ? (
//                       offer.status === "Pending" ? (
//                         <button
//                           onClick={() => openPopup(offer)}
//                           className="text-[#30bd75] text-xs font-medium underline"
//                         >
//                           Click to view offer details
//                         </button>
//                       ) : offer.status === "Accepted" ? (
//                         <div className="flex items-center gap-3">
//                           <button
//                             onClick={() => handleProceedToCheckout(offer)}
//                             className="text-[#30bd75] text-xs font-medium underline"
//                           >
//                             Proceed to Checkout
//                           </button>
//                           <span className="text-gray-300 text-xs">|</span>
//                           <button
//                             onClick={() => openPopup(offer)}
//                             className="text-[#30bd75] text-xs font-medium underline"
//                           >
//                             Show Details
//                           </button>
//                         </div>
//                       ) : offer.offerCount >= 3 ? (
//                         <p className="text-[#30bd75] text-xs font-medium">
//                           Sorry...! You have exceeded your offer limit, better luck next time
//                         </p>
//                       ) : (
//                         <div className="flex items-center gap-3">
//                           <button
//                             onClick={() => handleReOffer(offer)}
//                             className="text-[#30bd75] text-xs font-medium underline"
//                           >
//                             Click to make offer again
//                           </button>
//                           <span className="text-gray-300 text-xs">|</span>
//                           <button
//                             onClick={() => openPopup(offer)}
//                             className="text-[#30bd75] text-xs font-medium underline"
//                           >
//                             Show Details
//                           </button>
//                         </div>
//                       )
//                     ) : (
//                       <button
//                         onClick={() => openPopup(offer)}
//                         className="text-[#30bd75] text-xs font-medium underline"
//                       >
//                         {offer.status === "Pending"
//                           ? "Click to review the offer"
//                           : "Show Details"}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       ) : (
//         <div>
//           <div className="p-4 border-b flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center justify-between">
//             <div className="relative">
//               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search offer notifications..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full"
//               />
//             </div>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//             >
//               <option value="ALL">All</option>
//               <option value="UNREAD">Unread</option>
//               <option value="READ">Read</option>
//             </select>
//             {unreadNotificationCount > 0 && (
//               <button
//                 onClick={markAllAsRead}
//                 className="text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
//               >
//                 Mark all read
//               </button>
//             )}
//           </div>
//           <div
//             className="overflow-y-auto max-h-[400px]"
//             style={{ ...hideScrollbarStyle, ...hideScrollbarWebkit }}
//           >
//             {loading ? (
//               <div className="flex justify-center items-center p-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDE504]"></div>
//               </div>
//             ) : filteredNotifications.length === 0 ? (
//               <div className="text-center p-6">
//                 <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//                 <p className="text-gray-500">
//                   {searchTerm || filter !== "ALL"
//                     ? "No offer notifications match your criteria"
//                     : "No offer notifications yet"}
//                 </p>
//               </div>
//             ) : (
//               <AnimatePresence>
//                 {filteredNotifications.map((notification) => (
//                   <motion.div
//                     key={notification._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     className={`p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer ${
//                       !notification.read ? "bg-blue-50" : ""
//                     }`}
//                     onClick={() => markAsRead(notification._id)}
//                   >
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="flex items-start gap-3 flex-1">
//                         <div
//                           className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(
//                             notification.type
//                           )}`}
//                         />
//                         {notification.product?.images?.[0] && (
//                           <div className="flex-shrink-0">
//                             <Image
//                               src={notification.product.images[0]}
//                               alt={notification.product.name || "Product"}
//                               width={48}
//                               height={48}
//                               className="w-12 h-12 rounded-lg object-cover"
//                             />
//                           </div>
//                         )}
//                         <div className="flex-1">
//                           <div className="flex items-center justify-between">
//                             <h3 className="text-sm font-semibold text-gray-900">
//                               {notification.message}
//                             </h3>
//                             <div className="flex items-center gap-2">
//                               <span className="text-xs text-gray-500">
//                                 {formatTimeAgo(notification.createdAt)}
//                               </span>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   deleteNotification(notification._id);
//                                 }}
//                                 className="text-gray-400 hover:text-red-500 transition-colors"
//                               >
//                                 <X className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Offer Popup */}
//       {isPopupOpen && currentOffer && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div
//             className="bg-white p-8 rounded-xl shadow-xl w-[400px] relative"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//           >
//             <button
//               onClick={handleClosePopup}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//               aria-label="Close popup"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
//               Review Offer
//             </h2>
//             <div className="flex items-center gap-5 mb-8">
//               <Image
//                 src={currentOffer.product?.images[0] || "/default-product.png"}
//                 alt="Product"
//                 width={96}
//                 height={96}
//                 className="w-24 h-24 rounded-lg object-cover"
//               />
//               <div>
//                 <p className="font-medium text-base text-gray-800">
//                   {currentOffer.product?.name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Size: {currentOffer.product?.size?.sizeName || "N/A"}
//                 </p>
//               </div>
//             </div>
//             <div className="mb-6">
//               <p className="text-sm font-bold text-[#FDE504] mb-2">Buyer</p>
//               <div className="flex items-center gap-5">
//                 <Image
//                   src={currentOffer.buyer?.ProfileImg || "/default-profile-img.png"}
//                   alt="Buyer"
//                   width={48}
//                   height={48}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <p className="text-sm text-gray-700">{currentOffer.buyer?.name}</p>
//               </div>
//             </div>
//             <div className="mb-8">
//               <p className="text-sm font-bold text-[#FDE504] mb-3">Price Information</p>
//               <div className="flex justify-between text-sm text-gray-700 mb-2">
//                 <p>Seller&apos;s Price</p>
//                 <p className="font-bold text-[#FDE504]">
//                   AED {currentOffer.product?.price}
//                 </p>
//               </div>
//               <div className="flex justify-between text-sm text-gray-700">
//                 <p>Buyer&apos;s Offer</p>
//                 <p className="font-bold text-[#FDE504]">
//                   AED {currentOffer.offerPrice}
//                 </p>
//               </div>
//             </div>
//             {currentOffer.status === "Pending" ? (
//               id === currentOffer.buyer?._id ? (
//                 <div className="text-center">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
//                     <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <p className="text-lg font-semibold text-gray-700 mb-2">Offer Pending</p>
//                   <p className="text-sm text-gray-500">Your offer is waiting for the seller&rsquo;s response</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex items-start gap-3 mb-8">
//                     <input
//                       type="checkbox"
//                       id="terms"
//                       className="w-5 h-5 text-[#FDE504] border-gray-300 rounded focus:ring-[#FDE504]"
//                       onChange={(e) => setIsChecked(e.target.checked)}
//                     />
//                     <label
//                       htmlFor="terms"
//                       className="text-sm text-gray-600 leading-tight"
//                     >
//                       I agree to the terms and conditions by KUKU.
//                       <a href="#" className="text-blue-600 underline">
//                         Click here to know more
//                       </a>
//                     </label>
//                   </div>
//                   <div className="flex justify-between">
//                     <button
//                       onClick={() => rejectOffer(currentOffer)}
//                       className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
//                     >
//                       Reject
//                     </button>
//                     <button
//                       onClick={() => acceptOffer(currentOffer)}
//                       className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
//                     >
//                       Accept
//                     </button>
//                   </div>
//                 </>
//               )
//             ) : currentOffer.status === "Accepted" ? (
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//                   <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <p className="text-lg font-semibold text-green-600 mb-2">Offer Accepted</p>
//                 {id === currentOffer.buyer?._id ? (
//                   <>
//                     <p className="text-sm text-gray-500 mb-4">Proceed to payment at AED {currentOffer.offerPrice} to complete your purchase</p>
//                     <button
//                       onClick={() => handleProceedToCheckout(currentOffer)}
//                       className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
//                     >
//                       Proceed to Checkout
//                     </button>
//                   </>
//                 ) : (
//                   <p className="text-sm text-gray-500">Waiting for buyer to complete payment</p>
//                 )}
//               </div>
//             ) : (
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
//                   <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </div>
//                 <p className="text-lg font-semibold text-red-600 mb-2">Offer Rejected</p>
//                 {id === currentOffer.buyer?._id && currentOffer.offerCount < 3 && (
//                   <p className="text-sm text-gray-500">You can make another offer for this product</p>
//                 )}
//               </div>
//             )}
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfferComponent;









import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Bell, Check, X, Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const OfferComponent = ({ setOfferCount, fetchCounts }) => {
  const [offers, setOffers] = useState([]);
  const [offerNotifications, setOfferNotifications] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("offers");
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const details = useSelector((state) => state.auth.user);
  const id = details?._id;
  const token = JSON.parse(Cookies.get("auth") || "null");

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!token) throw new Error("Not authenticated");

      // Fetch offers
      const offerResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const offersData = offerResponse.data.offers || [];
      // Sort offers by createdAt in descending order to show newest first
      setOffers(offersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

      // Fetch offer notifications
      const notificationResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const notificationsData = Array.isArray(notificationResponse.data)
        ? notificationResponse.data
        : [];
      setOfferNotifications(notificationsData);
      const unreadCount = notificationsData.filter((n) => !n.read).length;
      setUnreadNotificationCount(unreadCount);

      // Count only pending offers and unread notifications for badge
      const pendingOffers = offersData.filter(offer => offer.status === "Pending");
      setOfferCount(pendingOffers.length + unreadCount);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch offers or notifications");
    } finally {
      setLoading(false);
    }
  };

  const checkRemainingOffers = async (productId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/remaining/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.remainingOffers;
    } catch (error) {
      console.error("Error checking remaining offers:", error);
      return 0;
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify/read`,
        { notificationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOfferNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, read: true } : n
        )
      );
      const newUnreadCount = Math.max(0, unreadNotificationCount - 1);
      setUnreadNotificationCount(newUnreadCount);
      const pendingOffers = offers.filter(offer => offer.status === "Pending");
      setOfferCount(pendingOffers.length + newUnreadCount);
      fetchCounts();
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOfferNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadNotificationCount(0);
      const pendingOffers = offers.filter(offer => offer.status === "Pending");
      setOfferCount(pendingOffers.length);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify/${notificationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        const notification = offerNotifications.find((n) => n._id === notificationId);
        setOfferNotifications((prev) => prev.filter((n) => n._id !== notificationId));
        if (!notification?.read) {
          const newUnreadCount = Math.max(0, unreadNotificationCount - 1);
          setUnreadNotificationCount(newUnreadCount);
          const pendingOffers = offers.filter(offer => offer.status === "Pending");
          setOfferCount(pendingOffers.length + newUnreadCount);
        }
        toast.success("Notification deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error(error.response?.data?.message || "Failed to delete notification");
    }
  };

  const openPopup = (offer) => {
    setCurrentOffer(offer);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentOffer(null);
    setIsChecked(false);
  };

  const updateOfferStatus = async (offer, status) => {
    if (!isChecked) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/update`,
        {
          offerId: offer._id,
          status: status
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setIsPopupOpen(false);
        setCurrentOffer(null);
        setIsChecked(false);
        fetchData();
        toast.success(`Offer ${status.toLowerCase()} successfully`);
      }
    } catch (error) {
      console.error(`Error ${status.toLowerCase()} offer:`, error);
      toast.error(`Failed to ${status.toLowerCase()} offer`);
    }
  };

  const rejectOffer = async (offer) => {
    await updateOfferStatus(offer, "Rejected");
  };

  const acceptOffer = async (offer) => {
    await updateOfferStatus(offer, "Accepted");
  };

  const handleReOffer = async (offer) => {
    const remainingOffers = await checkRemainingOffers(offer.product._id);
    if (remainingOffers <= 0) {
      toast.error("You have reached the maximum limit of 3 offers for this product");
      return;
    }
    router.push(`/selling-page/${offer.product._id}`);
  };

  const handleProceedToCheckout = async (offer) => {
    try {
      if (!token) throw new Error("Not authenticated");
      if (!id) throw new Error("User ID not found");

      // Add offer product to cart with offerPrice
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add-offer`,
        {
          offerId: offer._id,
          userId: id
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setIsPopupOpen(false);
        router.push("/cart");
        toast.success("Offer added to cart. Proceeding to checkout...");
      }
    } catch (error) {
      console.error("Error adding offer to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add offer to cart");
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const filteredNotifications = Array.isArray(offerNotifications)
    ? offerNotifications.filter((notification) => {
        const matchesFilter =
          filter === "ALL" ||
          (filter === "UNREAD" ? !notification.read : notification.read);
        const matchesSearch =
          searchTerm === "" ||
          (notification.message &&
            notification.message.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesFilter && matchesSearch;
      })
    : [];

  const getPriorityColor = (type) => {
    switch (type) {
      case "CheckoutFailed":
        return "bg-red-500";
      case "OfferCreated":
        return "bg-orange-500";
      case "OfferAccepted":
        return "bg-green-500";
      case "OfferRejected":
        return "bg-blue-500";
      case "ItemSold":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const hideScrollbarStyle = {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  const hideScrollbarWebkit = {
    WebkitScrollbar: { display: "none" },
  };

  const pendingOffers = offers.filter(offer => offer.status === "Pending");

  return (
    <div>
      {/* Internal Tabs */}
      <div className="flex gap-2 items-center border-b-2">
        <div
          onClick={() => setActiveTab("offers")}
          className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[14px] pb-2 flex-grow justify-center ${
            activeTab === "offers"
              ? "border-b-4 border-[#FDE504] font-bold"
              : "font-normal"
          }`}
        >
          Offers
          {pendingOffers.length > 0 && (
            <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[20px] w-[20px] flex items-center justify-center text-xs">
              {pendingOffers.length}
            </span>
          )}
        </div>
        <div
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[14px] pb-2 flex-grow justify-center ${
            activeTab === "notifications"
              ? "border-b-4 border-[#FDE504] font-bold"
              : "font-normal"
          }`}
        >
          Offer Notifications
          {unreadNotificationCount > 0 && (
            <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[20px] w-[20px] flex items-center justify-center text-xs">
              {unreadNotificationCount}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      {activeTab === "offers" ? (
        <div
          className="overflow-y-auto max-h-[400px]"
          style={{ ...hideScrollbarStyle, ...hideScrollbarWebkit }}
        >
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDE504]"></div>
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center p-6">
              <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No offers yet</p>
            </div>
          ) : (
            offers.map((offer) => (
              <div key={offer._id} className="mb-4 p-4 border-b hover:bg-gray-50">
                <div className="flex gap-4 items-start">
                  <Image
                    src="/image139.png"
                    alt="offer"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full p-1 bg-[#ffdbac]"
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between">
                      <p className="text-sm text-[#1e1f23] font-bold font-karla">
                        {id === offer.buyer?._id
                          ? `You made an offer to ${offer.seller?.name}`
                          : `Offer received from ${offer.buyer?.name}`}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(offer.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {id === offer.buyer?._id ? (
                      <p className="text-sm text-[#5d5d5d] font-bold font-karla">
                        {offer.status === "Pending"
                          ? "Your offer is still in progress"
                          : offer.status === "Accepted"
                          ? "Your offer is approved by the seller"
                          : "Your offer is rejected by the seller"}
                      </p>
                    ) : (
                      <p className="text-sm text-[#5d5d5d] font-bold font-karla">
                        Great news! <b>{offer.buyer?.name}</b> has made you an offer.
                      </p>
                    )}
                    {id === offer.buyer?._id ? (
                      offer.status === "Pending" ? (
                        <button
                          onClick={() => openPopup(offer)}
                          className="text-[#30bd75] text-xs font-medium underline"
                        >
                          Click to view offer details
                        </button>
                      ) : offer.status === "Accepted" ? (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleProceedToCheckout(offer)}
                            className="text-[#30bd75] text-xs font-medium underline"
                          >
                            Proceed to Checkout
                          </button>
                          <span className="text-gray-300 text-xs">|</span>
                          <button
                            onClick={() => openPopup(offer)}
                            className="text-[#30bd75] text-xs font-medium underline"
                          >
                            Show Details
                          </button>
                        </div>
                      ) : offer.offerCount >= 3 ? (
                        <p className="text-[#30bd75] text-xs font-medium">
                          Sorry...! You have exceeded your offer limit, better luck next time
                        </p>
                      ) : (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleReOffer(offer)}
                            className="text-[#30bd75] text-xs font-medium underline"
                          >
                            Click to make offer again
                          </button>
                          <span className="text-gray-300 text-xs">|</span>
                          <button
                            onClick={() => openPopup(offer)}
                            className="text-[#30bd75] text-xs font-medium underline"
                          >
                            Show Details
                          </button>
                        </div>
                      )
                    ) : (
                      <button
                        onClick={() => openPopup(offer)}
                        className="text-[#30bd75] text-xs font-medium underline"
                      >
                        {offer.status === "Pending"
                          ? "Click to review the offer"
                          : "Show Details"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          <div className="p-4 border-b flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center justify-between">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search offer notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="ALL">All</option>
              <option value="UNREAD">Unread</option>
              <option value="READ">Read</option>
            </select>
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
              >
                Mark all read
              </button>
            )}
          </div>
          <div
            className="overflow-y-auto max-h-[400px]"
            style={{ ...hideScrollbarStyle, ...hideScrollbarWebkit }}
          >
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDE504]"></div>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="text-center p-6">
                <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">
                  {searchTerm || filter !== "ALL"
                    ? "No offer notifications match your criteria"
                    : "No offer notifications yet"}
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => markAsRead(notification._id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(
                            notification.type
                          )}`}
                        />
                        {notification.product?.images?.[0] && (
                          <div className="flex-shrink-0">
                            <Image
                              src={notification.product.images[0]}
                              alt={notification.product.name || "Product"}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {notification.message}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {formatTimeAgo(notification.createdAt)}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification._id);
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      )}

      {/* Offer Popup */}
      {isPopupOpen && currentOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl w-[400px] relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
              Review Offer
            </h2>
            <div className="flex items-center gap-5 mb-8">
              <Image
                src={currentOffer.product?.images[0] || "/default-product.png"}
                alt="Product"
                width={96}
                height={96}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-base text-gray-800">
                  {currentOffer.product?.name}
                </p>
                <p className="text-sm text-gray-500">
                  Size: {currentOffer.product?.size?.sizeName || "N/A"}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm font-bold text-[#FDE504] mb-2">Buyer</p>
              <div className="flex items-center gap-5">
                <Image
                  src={currentOffer.buyer?.ProfileImg || "/default-profile-img.png"}
                  alt="Buyer"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-sm text-gray-700">{currentOffer.buyer?.name}</p>
              </div>
            </div>
            <div className="mb-8">
              <p className="text-sm font-bold text-[#FDE504] mb-3">Price Information</p>
              <div className="flex justify-between text-sm text-gray-700 mb-2">
                <p>Seller&apos;s Price</p>
                <p className="font-bold text-[#FDE504]">
                  AED {currentOffer.product?.price}
                </p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Buyer&apos;s Offer</p>
                <p className="font-bold text-[#FDE504]">
                  AED {currentOffer.offerPrice}
                </p>
              </div>
            </div>
            {currentOffer.status === "Pending" ? (
              id === currentOffer.buyer?._id ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">Offer Pending</p>
                  <p className="text-sm text-gray-500">Your offer is waiting for the seller&rsquo;s response</p>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3 mb-8">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-5 h-5 text-[#FDE504] border-gray-300 rounded focus:ring-[#FDE504]"
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 leading-tight"
                    >
                      I agree to the terms and conditions by KUKU.
                      <a href="#" className="text-blue-600 underline">
                        Click here to know more
                      </a>
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => rejectOffer(currentOffer)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => acceptOffer(currentOffer)}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      Accept
                    </button>
                  </div>
                </>
              )
            ) : currentOffer.status === "Accepted" ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-green-600 mb-2">Offer Accepted</p>
                {id === currentOffer.buyer?._id ? (
                  <>
                    <p className="text-sm text-gray-500 mb-4">Proceed to payment at AED {currentOffer.offerPrice} to complete your purchase</p>
                    <button
                      onClick={() => handleProceedToCheckout(currentOffer)}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      Proceed to Checkout
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Waiting for buyer to complete payment</p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-red-600 mb-2">Offer Rejected</p>
                {id === currentOffer.buyer?._id && currentOffer.offerCount < 3 && (
                  <p className="text-sm text-gray-500">You can make another offer for this product</p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OfferComponent;


// import React, { useState, useRef, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { Bell, Check, X, Filter, Search } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const NotificationPanel = ({ onClose }) => {
//   const [activeTab, setActiveTab] = useState("notifications");
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [currentOffer, setCurrentOffer] = useState(null);
//   const [isChecked, setIsChecked] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [offers, setOffers] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("ALL");
//   const [searchTerm, setSearchTerm] = useState("");

//   const panelRef = useRef(null);
//   const router = useRouter();
//   const details = useSelector((state) => state.auth.user);
//   const id = details?._id;

//   const toggleTab = (tab) => setActiveTab(tab);

//   // const handleClickOutside = (event) => {
//   //   if (panelRef.current && !panelRef.current.contains(event.target)) {
//   //     onClose();
//   //   }
//   // };

//   // useEffect(() => {
//   //   document.addEventListener("mousedown", handleClickOutside);
//   //   return () => document.removeEventListener("mousedown", handleClickOutside);
//   // }, []);

//   useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (panelRef.current && !panelRef.current.contains(event.target)) {
//       onClose();
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);
//   return () => document.removeEventListener("mousedown", handleClickOutside);
// }, [onClose]);

//   const openPopup = (offer) => {
//     setCurrentOffer(offer);
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setCurrentOffer(null);
//     setIsChecked(false);
//   };

//   useEffect(() => {
//     fetchNotifications();
//     fetchOffers();

//     const interval = setInterval(() => {
//       fetchNotifications();
//       fetchOffers();
//     }, 30000); // Refresh every 30 seconds

//     return () => clearInterval(interval);
//   }, []);

//   // Dynamic API functions
//   const fetchNotifications = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth")  || 'null');
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(
//         "Notifications response:",
//         response.data?.data?.notifications || response.data || []
//       );
//       const notificationsData =
//         response.data?.data?.notifications || response.data || [];
//       setNotifications(
//         Array.isArray(notificationsData) ? notificationsData : []
//       );

//       const unreadCount =
//         response.data?.data?.unreadCount ||
//         (Array.isArray(notificationsData)
//           ? notificationsData.filter((n) => n.status === "UNREAD").length
//           : 0);
//       setUnreadCount(unreadCount);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   const fetchOffers = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth") || 'null');
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/get`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setOffers(response.data.offers);
//     } catch (error) {
//       console.error("Error fetching offers:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsRead = async (notificationId) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth") || 'null');
//       await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/${notificationId}/read`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setNotifications((prev) =>
//         prev.map((n) =>
//           n._id === notificationId ? { ...n, status: "READ" } : n
//         )
//       );
//       setUnreadCount((prev) => Math.max(0, prev - 1));
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/mark-all-read`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setNotifications((prev) => prev.map((n) => ({ ...n, status: "READ" })));
//       setUnreadCount(0);
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//     }
//   };

//   const deleteNotification = async (notificationId) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth") || 'null');
//       await axios.delete(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/${notificationId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const notification = notifications.find((n) => n._id === notificationId);
//       setNotifications((prev) => prev.filter((n) => n._id !== notificationId));

//       if (notification?.status === "UNREAD") {
//         setUnreadCount((prev) => Math.max(0, prev - 1));
//       }
//     } catch (error) {
//       console.error("Error deleting notification:", error);
//     }
//   };

//   const closePopup = async (offer) => {
//     if (!isChecked) {
//       alert("Please read the Terms and conditions");
//       return;
//     }
//     try {
//       const token = JSON.parse(Cookies.get("auth") || 'null');
//       const data = { buyerID: offer?.buyer?._id, Amount: offer?.offerPrice };
//       const response = await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/reject/${offer?._id}`,
//         { data },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setIsPopupOpen(false);
//         setCurrentOffer(null);
//         fetchOffers();
//       }
//     } catch (error) {
//       console.error(
//         "An error occurred while rejecting the offer:",
//         error.message
//       );
//     }
//   };

//   const closeAcceptPopup = async (offer) => {
//     if (!isChecked) {
//       alert("Please read the Terms and conditions");
//       return;
//     }
//     try {
//       const token = JSON.parse(Cookies.get("auth")  || 'null');
//       const data = { buyerID: offer?.buyer?._id, Amount: offer?.offerPrice };
//       const response = await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/accept/${offer?._id}`,
//         { data },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setIsPopupOpen(false);
//         setCurrentOffer(null);
//         fetchOffers();
//       }
//     } catch (error) {
//       console.error(
//         "An error occurred while accepting the offer:",
//         error.message
//       );
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     fetchOffers();
//   }, []);

//   const hideScrollbarStyle = {
//     msOverflowStyle: "none",
//     scrollbarWidth: "none",
//   };

//   const hideScrollbarWebkit = {
//     WebkitScrollbar: {
//       display: "none",
//     },
//   };

//   const formatTimeAgo = (dateString) => {
//     const now = new Date();
//     const date = new Date(dateString);
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) return "Just now";
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//     if (diffInSeconds < 86400)
//       return `${Math.floor(diffInSeconds / 3600)}h ago`;
//     return `${Math.floor(diffInSeconds / 86400)}d ago`;
//   };

//   const filteredNotifications = Array.isArray(notifications)
//     ? notifications.filter((notification) => {
//         const matchesFilter =
//           filter === "ALL" || notification.status === filter;
//         const matchesSearch =
//           searchTerm === "" ||
//           (notification.title &&
//             notification.title
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase()));
//         return matchesFilter && matchesSearch;
//       })
//     : [];

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "URGENT":
//         return "bg-red-500";
//       case "HIGH":
//         return "bg-orange-500";
//       case "MEDIUM":
//         return "bg-blue-500";
//       case "LOW":
//         return "bg-gray-500";
//       default:
//         return "bg-blue-500";
//     }
//   };

//   return (
//     <motion.div
//       ref={panelRef}
//       className="fixed top-[80px] lg:top-[108px] right-0 sm:right-[10px] w-full sm:w-[400px] bg-white shadow-lg rounded-lg z-50"
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 100 }}
//     >
//       {/* Tab Header */}
//       <div className="flex gap-2 items-center border-b-2">
//         <div
//           onClick={() => toggleTab("notifications")}
//           className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[16px] pb-2 flex-grow justify-center ${
//             activeTab === "notifications"
//               ? "border-b-4 border-[#FDE504] font-bold"
//               : "font-normal"
//           }`}
//         >
//           Notifications
//           {unreadCount > 0 && (
//             <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[24px] w-[24px] flex items-center justify-center">
//               {unreadCount}
//             </span>
//           )}
//         </div>

//         <div
//           onClick={() => toggleTab("offers")}
//           className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[16px] pb-2 flex-grow justify-center ${
//             activeTab === "offers"
//               ? "border-b-4 border-[#FDE504] font-bold"
//               : "font-normal"
//           }`}
//         >
//           Offers
//           {offers.length > 0 && (
//             <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[24px] w-[24px] flex items-center justify-center">
//               {offers.length}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Filter Options (Notifications Tab Only) */}
//       {activeTab === "notifications" && (
//         <div className="p-4 border-b flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center justify-between">
//           <div className="relative">
//             <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             <input
//               type="text"
//               placeholder="Search notifications..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full"
//             />
//           </div>

//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//           >
//             <option value="ALL">All</option>
//             <option value="UNREAD">Unread</option>
//             <option value="READ">Read</option>
//           </select>

//           {unreadCount > 0 && (
//             <button
//               onClick={markAllAsRead}
//               className="text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
//             >
//               Mark all read
//             </button>
//           )}
//         </div>
//       )}

//       {/* Notification & Offer List */}
//       <div
//         className="overflow-y-auto max-h-[400px]"
//         style={{ ...hideScrollbarStyle, ...hideScrollbarWebkit }}
//       >
//         {activeTab === "notifications" ? (
//           loading ? (
//             <div className="flex justify-center items-center p-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDE504]"></div>
//             </div>
//           ) : filteredNotifications.length === 0 ? (
//             <div className="text-center p-6">
//               <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//               <p className="text-gray-500">
//                 {searchTerm || filter !== "ALL"
//                   ? "No notifications match your criteria"
//                   : "No notifications yet"}
//               </p>
//             </div>
//           ) : (
//             <AnimatePresence>
//               {filteredNotifications.map((notification) => (
//                 <motion.div
//                   key={notification._id}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   className={`p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer ${
//                     notification.status === "UNREAD" ? "bg-blue-50" : ""
//                   }`}
//                   onClick={() => markAsRead(notification._id)}
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex items-start gap-3 flex-1">
//                       <div
//                         className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(
//                           notification.priority
//                         )}`}
//                       />

//                       {notification.data?.productImage && (
//                         <div className="flex-shrink-0">
//                           <Image
//                             src={notification.data.productImage}
//                             alt={notification.data?.productName || "Product"}
//                             width={48}
//                             height={48}
//                             className="w-12 h-12 rounded-lg object-cover"
//                           />
//                         </div>
//                       )}

//                       <div className="flex-1">
//                         <div className="flex items-center justify-between">
//                           <h3 className="text-sm font-semibold text-gray-900">
//                             {notification.title}
//                           </h3>
//                           <div className="flex items-center gap-2">
//                             <span className="text-xs text-gray-500">
//                               {formatTimeAgo(notification.createdAt)}
//                             </span>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 deleteNotification(notification._id);
//                               }}
//                               className="text-gray-400 hover:text-red-500 transition-colors"
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>

//                         <p className="text-sm text-gray-600 mt-1">
//                           {notification.message}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           )
//         ) : loading ? (
//           <div className="flex justify-center items-center p-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDE504]"></div>
//           </div>
//         ) : offers.length === 0 ? (
//           <div className="text-center p-6">
//             <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//             <p className="text-gray-500">No offers yet</p>
//           </div>
//         ) : (
//           offers.map((offer, index) => (
//             <div key={index} className="mb-4 p-4 border-b hover:bg-gray-50">
//               <div className="flex gap-4 items-start">
//                 <Image
//                   src="/image 139.png"
//                   alt="offer"
//                   width={30}
//                   height={30}
//                   className="w-[30px] h-[30px] rounded-full p-1 bg-[#ffdbac]"
//                 />
//                 <div className="flex flex-col gap-2 w-full">
//                   {index === 0 && (
//                     <span className="text-xs text-gray-500">
//                       {Math.floor(
//                         (new Date() - new Date(offer.createdAt)) /
//                           (1000 * 60 * 60 * 24)
//                       )}{" "}
//                       days ago
//                     </span>
//                   )}
//                   <div className="flex justify-between">
//                     <p className="text-sm text-[#1e1f23] font-bold font-karla">
//                       {id === offer?.buyer?._id
//                         ? `Your made an offer to ${offer?.seller?.name}`
//                         : "Offer received"}
//                     </p>
//                     <span className="text-xs text-gray-500">
//                       {new Date(offer?.createdAt).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </span>
//                   </div>

//                   {id === offer?.buyer?._id ? (
//                     <p className="text-sm text-[#5d5d5d] font-bold font-karla">
//                       {offer?.status === "Pending"
//                         ? "Your offer is still in Progress"
//                         : offer?.status === "Accepted"
//                         ? "Your offer is Approved by the seller"
//                         : "Your offer is Rejected by the seller"}
//                     </p>
//                   ) : (
//                     <p className="text-sm text-[#5d5d5d] font-bold font-karla">
//                       Great news! <b>{offer?.buyer?.name}</b> has made you an
//                       offer. Tap here to check it out
//                     </p>
//                   )}

//                   {id === offer?.buyer?._id ? (
//                     offer?.status === "Pending" ? null : offer?.status ===
//                       "Accepted" ? (
//                       <button
//                         onClick={() => openPopup(offer)}
//                         className="text-[#30bd75] text-xs font-medium underline"
//                       >
//                         Make a Payment to get your product
//                       </button>
//                     ) : offer?.statusHistory?.length == 3 ? (
//                       <p className="text-[#30bd75] text-xs font-medium">
//                         Sorry...! You have exceeded your Offer limit, Better
//                         luck Next Time
//                       </p>
//                     ) : (
//                       <button
//                         onClick={() =>
//                           router.push(`/selling-page/${offer?.product?._id}`)
//                         }
//                         className="text-[#30bd75] text-xs font-medium underline"
//                       >
//                         Click to make offer again
//                       </button>
//                     )
//                   ) : (
//                     <button
//                       onClick={() => openPopup(offer)}
//                       className="text-[#30bd75] text-xs font-medium underline"
//                     >
//                       Click to review the offer
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Popup */}
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
//                 src={currentOffer?.product?.images[0]}
//                 alt="Product"
//                 width={96}
//                 height={96}
//                 className="w-24 h-24 rounded-lg object-cover"
//               />
//               <div>
//                 <p className="font-medium text-base text-gray-800">
//                   {currentOffer?.product?.name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Size: {currentOffer?.product?.size?.sizeName}
//                 </p>
//               </div>
//             </div>

//             <div className="mb-6">
//               <p className="text-sm font-bold text-[#FDE504] mb-2">Buyer</p>
//               <div className="flex items-center gap-5">
//                 <Image
//                   src={
//                     currentOffer?.buyer?.ProfileImg ||
//                     "/default-profile-img.png"
//                   }
//                   alt="Buyer"
//                   width={48}
//                   height={48}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <p className="text-sm text-gray-700">
//                   {currentOffer?.buyer?.name}
//                 </p>
//               </div>
//             </div>

//             <div className="mb-8">
//               <p className="text-sm font-bold text-[#FDE504] mb-3">
//                 Price Information
//               </p>
//               <div className="flex justify-between text-sm text-gray-700 mb-2">
//                 {/* <p>Seller's Offer</p> */}
//                 <p>Seller&apos;s Offer</p>
//                 <p className="font-bold text-[#FDE504]">
//                   {currentOffer?.product?.price}
//                 </p>
//               </div>
//               {currentOffer?.statusHistory?.map((history, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between text-sm text-gray-700"
//                 >
//                   {/* <p>Buyer's Offer</p> */}
//                   <p>Buyer&apos;s Offer</p>
//                   <p className="font-bold text-[#FDE504]">{history?.Amount}</p>
//                 </div>
//               ))}
//             </div>

//             {currentOffer?.statusHistory?.length > 0 ? (
//               currentOffer?.statusHistory[
//                 currentOffer?.statusHistory?.length - 1
//               ]?.status === "Rejected" ||
//               currentOffer?.statusHistory[
//                 currentOffer?.statusHistory?.length - 1
//               ]?.status == "Accepted" ? null : (
//                 <div className="flex items-start gap-3 mb-8">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     className="w-5 h-5 text-[#FDE504] border-gray-300 rounded focus:ring-[#FDE504]"
//                     onChange={(e) => setIsChecked(e.target.checked)}
//                   />
//                   <label
//                     htmlFor="terms"
//                     className="text-sm text-gray-600 leading-tight"
//                   >
//                     I agree to the terms and conditions by KUKU.
//                     <a href="#" className="text-[#FDE504] underline">
//                       Click here to know more
//                     </a>
//                   </label>
//                 </div>
//               )
//             ) : (
//               <div className="flex items-start gap-3 mb-8">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   className="w-5 h-5 text-[#FDE504] border-gray-300 rounded focus:ring-[#FDE504]"
//                   onChange={(e) => setIsChecked(e.target.checked)}
//                 />
//                 <label
//                   htmlFor="terms"
//                   className="text-sm text-gray-600 leading-tight"
//                 >
//                   I agree to the terms and conditions by KUKU.
//                   <a href="#" className="text-[#FDE504] underline">
//                     Click here to know more
//                   </a>
//                 </label>
//               </div>
//             )}

//             {currentOffer?.statusHistory?.length > 0 ? (
//               currentOffer?.statusHistory[
//                 currentOffer?.statusHistory?.length - 1
//               ]?.status === "Rejected" ||
//               currentOffer?.statusHistory[
//                 currentOffer?.statusHistory?.length - 1
//               ]?.status == "Accepted" ? (
//                 <p className="text-center font-bold my-6">
//                   {
//                     currentOffer?.statusHistory[
//                       currentOffer?.statusHistory?.length - 1
//                     ]?.status
//                   }
//                 </p>
//               ) : (
//                 <div className="flex justify-between">
//                   <button
//                     onClick={() => closePopup(currentOffer)}
//                     className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
//                   >
//                     Reject
//                   </button>
//                   <button
//                     onClick={() => closeAcceptPopup(currentOffer)}
//                     className="px-6 py-3 bg-[#FDE504] text-gray-900 font-bold rounded-lg shadow hover:bg-yellow-400 transition"
//                   >
//                     Accept
//                   </button>
//                 </div>
//               )
//             ) : (
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => closePopup(currentOffer)}
//                   className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
//                 >
//                   Reject
//                 </button>
//                 <button
//                   onClick={() => closeAcceptPopup(currentOffer)}
//                   className="px-6 py-3 bg-[#FDE504] text-gray-900 font-bold rounded-lg shadow hover:bg-yellow-400 transition"
//                 >
//                   Accept
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default NotificationPanel;







// import React, { useState, useRef, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { motion } from "framer-motion";
// import NotificationComponent from "./NotificationComponent";
// import OfferComponent from "./OfferComponent";


// const NotificationPanel = ({ onClose }) => {
//   const [activeTab, setActiveTab] = useState("notifications");
//   const [notificationUnreadCount, setNotificationUnreadCount] = useState(0);
//   const [offerCount, setOfferCount] = useState(0);

//   const panelRef = useRef(null);
//   const details = useSelector((state) => state.auth.user);

//   const toggleTab = (tab) => setActiveTab(tab);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (panelRef.current && !panelRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onClose]);

//   useEffect(() => {
//     fetchCounts();

//     const interval = setInterval(() => {
//       fetchCounts();
//     }, 30000); // Refresh every 30 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const fetchCounts = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth") || 'null');
      
//       // Fetch notification count
//       const notificationResponse = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
      
//       const notificationsData =
//         notificationResponse.data?.data?.notifications || 
//         notificationResponse.data || [];
      
//       const unreadCount =
//         notificationResponse.data?.data?.unreadCount ||
//         (Array.isArray(notificationsData)
//           ? notificationsData.filter((n) => n.status === "UNREAD").length
//           : 0);
      
//       setNotificationUnreadCount(unreadCount);

//       // Fetch offer count
//       const offerResponse = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/get`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
      
//       setOfferCount(offerResponse.data.offers?.length || 0);
//     } catch (error) {
//       console.error("Error fetching counts:", error);
//     }
//   };

//   return (
//     <motion.div
//       ref={panelRef}
//       className="fixed top-[80px] lg:top-[108px] right-0 sm:right-[10px] w-full sm:w-[400px] bg-white shadow-lg rounded-lg z-50"
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 100 }}
//     >
//       {/* Tab Header */}
//       <div className="flex gap-2 items-center border-b-2">
//         <div
//           onClick={() => toggleTab("notifications")}
//           className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[16px] pb-2 flex-grow justify-center ${
//             activeTab === "notifications"
//               ? "border-b-4 border-[#FDE504] font-bold"
//               : "font-normal"
//           }`}
//         >
//           Notifications
//           {notificationUnreadCount > 0 && (
//             <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[24px] w-[24px] flex items-center justify-center">
//               {notificationUnreadCount}
//             </span>
//           )}
//         </div>

//         <div
//           onClick={() => toggleTab("offers")}
//           className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[16px] pb-2 flex-grow justify-center ${
//             activeTab === "offers"
//               ? "border-b-4 border-[#FDE504] font-bold"
//               : "font-normal"
//           }`}
//         >
//           Offers
//           {offerCount > 0 && (
//             <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[24px] w-[24px] flex items-center justify-center">
//               {offerCount}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Content Area */}
//       {activeTab === "notifications" ? (
//         <NotificationComponent />
//       ) : (
//         <OfferComponent />
//       )}
//     </motion.div>
//   );
// };

// export default NotificationPanel;







import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import NotificationComponent from "./NotificationComponent";
import OfferComponent from "./OfferComponent";
import toast from "react-hot-toast";

const NotificationPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [notificationUnreadCount, setNotificationUnreadCount] = useState(0);
  const [offerCount, setOfferCount] = useState(0);

  const panelRef = useRef(null);
  const details = useSelector((state) => state.auth.user);

  const toggleTab = (tab) => setActiveTab(tab);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    fetchCounts();

    const interval = setInterval(() => {
      fetchCounts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchCounts = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth") || "null");
      if (!token) throw new Error("Not authenticated");

      // Fetch notification count
      const notificationResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const notificationsData = Array.isArray(notificationResponse.data)
        ? notificationResponse.data
        : notificationResponse.data?.data?.notifications || [];
      const notificationUnreadCount = notificationsData.filter(
        (n) => n.status === "UNREAD"
      ).length;
      setNotificationUnreadCount(notificationUnreadCount);

      // Fetch offer count and offer notifications
      const offerResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const offerCount = offerResponse.data.offers?.length || 0;

      const offerNotificationResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const offerNotificationsData = Array.isArray(
        offerNotificationResponse.data
      )
        ? offerNotificationResponse.data
        : [];
      const unreadOfferNotificationCount = offerNotificationsData.filter(
        (n) => !n.read
      ).length;

      setOfferCount(offerCount + unreadOfferNotificationCount);
    } catch (error) {
      console.error("Error fetching counts:", error);
      toast.error("Failed to fetch counts");
    }
  };

  return (
    <motion.div
      ref={panelRef}
      className="fixed top-[80px] lg:top-[108px] right-0 sm:right-[20px] w-full sm:w-[400px] bg-white shadow-lg rounded-lg z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <div className="flex gap-2 items-center border-b-2">
        <div
          onClick={() => toggleTab("notifications")}
          className={`flex items-center cursor-pointer gap-2 text-black pt-3 font-karla text-[16px] pb-2 flex-grow justify-center ${
            activeTab === "notifications"
              ? "border-b-4 border-[#FDE504] font-bold"
              : "font-normal"
          }`}
        >
          Notifications
          {notificationUnreadCount > 0 && (
            <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[24px] w-[24px] flex items-center justify-center">
              {notificationUnreadCount}
            </span>
          )}
        </div>
        <div
          onClick={() => toggleTab("offers")}
          className={`flex items-center cursor-pointer gap-2 text-black pt-3 font-karla text-[16px] pb-2 flex-grow justify-center ${
            activeTab === "offers"
              ? "border-b-4 border-[#FDE504] font-bold"
              : "font-normal"
          }`}
        >
          Offers
          {offerCount > 0 && (
            <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[24px] w-[24px] flex items-center justify-center">
              {offerCount}
            </span>
          )}
        </div>
      </div>
      {activeTab === "notifications" ? (
        <NotificationComponent />
      ) : (
        <OfferComponent setOfferCount={setOfferCount} />
      )}
    </motion.div>
  );
};

export default NotificationPanel;



import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import NotificationComponent from "./NotificationComponent";
import OfferComponent from "./OfferComponent";
import toast from "react-hot-toast";

const NotificationPanel = ({ onClose, onCountUpdate }) => {
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
      const pendingOffers = offerResponse.data.offers?.filter(offer => offer.status === "Pending") || [];
      const offerCount = pendingOffers.length;

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

      const totalOfferCount = offerCount + unreadOfferNotificationCount;

      setOfferCount(offerCount + unreadOfferNotificationCount);
      onCountUpdate(notificationUnreadCount, totalOfferCount);
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
        <NotificationComponent fetchCounts={fetchCounts}/>
      ) : (
        <OfferComponent setOfferCount={setOfferCount} fetchCounts={fetchCounts}/>
      )}
    </motion.div>
  );
};

export default NotificationPanel;
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import { Bell, Check, X, Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationComponent = ({ fetchCounts }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth") || 'null');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const notificationsData =
        response.data?.data?.notifications || response.data || [];
      setNotifications(
        Array.isArray(notificationsData) ? notificationsData : []
      );

      const unreadCount =
        response.data?.data?.unreadCount ||
        (Array.isArray(notificationsData)
          ? notificationsData.filter((n) => n.status === "UNREAD").length
          : 0);
      setUnreadCount(unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = JSON.parse(Cookies.get("auth") || 'null');
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, status: "READ" } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      fetchCounts();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications((prev) => prev.map((n) => ({ ...n, status: "READ" })));
      setUnreadCount(0);
      fetchCounts();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const token = JSON.parse(Cookies.get("auth") || 'null');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/${notificationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const notification = notifications.find((n) => n._id === notificationId);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));

      if (notification?.status === "UNREAD") {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const filteredNotifications = Array.isArray(notifications)
    ? notifications.filter((notification) => {
        const matchesFilter =
          filter === "ALL" || notification.status === filter;
        const matchesSearch =
          searchTerm === "" ||
          (notification.title &&
            notification.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase()));
        return matchesFilter && matchesSearch;
      })
    : [];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-500";
      case "HIGH":
        return "bg-orange-500";
      case "MEDIUM":
        return "bg-blue-500";
      case "LOW":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const hideScrollbarStyle = {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  const hideScrollbarWebkit = {
    WebkitScrollbar: {
      display: "none",
    },
  };

  return (
    <div>
      {/* Filter Options */}
      <div className="p-4 border-b flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center justify-between">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notifications..."
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

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notification List */}
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
                ? "No notifications match your criteria"
                : "No notifications yet"}
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
                  notification.status === "UNREAD" ? "bg-blue-50" : ""
                }`}
                onClick={() => markAsRead(notification._id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(
                        notification.priority
                      )}`}
                    />

                    {notification.data?.productImage && (
                      <div className="flex-shrink-0">
                        <Image
                          src={notification.data.productImage}
                          alt={notification.data?.productName || "Product"}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {notification.title}
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

                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;
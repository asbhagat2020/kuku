import React, { useState, useRef, useEffect } from "react";

const NotificationPanel = ({ notifications, offers, onClose }) => {
  const [activeTab, setActiveTab] = useState("notifications");
  const panelRef = useRef(null);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  // Function to close the panel when clicked outside
  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      onClose(); // Call the onClose prop to hide the panel
    }
  };

  // Add event listener for clicks outside of the panel
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Inline styles for hiding the scrollbar
  const hideScrollbarStyle = {
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  };

  const hideScrollbarWebkit = {
    WebkitScrollbar: {
      display: "none", // Chrome, Safari, Opera
    },
  };

  return (
    <div
      ref={panelRef}
      className="fixed top-[80px] lg:top-[108px] right-0 sm:right-[10px] w-full sm:w-[350px] bg-white shadow-lg rounded-lg p-4 z-50"

    >
      {/* Tab Header */}
      <div className="flex gap-2 items-center border-b-2">
        <div
          onClick={() => toggleTab("notifications")}
          className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[16px] pb-2 flex-grow justify-center ${
            activeTab === "notifications"
              ? "border-b-4 border-[#FDE504] font-bold"
              : "font-normal"
          }`}
        >
          Notifications
          <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[24px] w-[24px] flex items-center justify-center">
            {notifications.length}
          </span>
        </div>

        <div
          onClick={() => toggleTab("offers")}
          className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[16px] pb-2 flex-grow justify-center ${
            activeTab === "offers"
              ? "border-b-4 border-[#FDE504] font-bold"
              : "font-normal"
          }`}
        >
          Offers
          <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[24px] w-[24px] flex items-center justify-center">
            {offers.length}
          </span>
        </div>
      </div>

      {/* Notification & Offer List */}
      <ul
        className="mt-4 overflow-y-auto max-h-[400px]"
        style={{ ...hideScrollbarStyle, ...hideScrollbarWebkit }}
      >
        {activeTab === "notifications" &&
          notifications.map((notification, index) => (
            <li key={index} className="mb-2 flex-col gap-4 items-start">
              {index === 0 && (
                <span className="text-xs text-gray-500">Today</span>
              )}
              {index === 1 && (
                <span className="text-xs text-gray-500">Yesterday</span>
              )}
              <div className="flex items-center gap-4 mt-2">
                <img
                  src="Ellipse 4427.svg"
                  alt="notify"
                  className="w-[10px] h-[10px]"
                />
                <div>
                  <p className="text-[#1e1f23] text-[16px] font-medium font-karla">
                    {notification.text}
                  </p>
                  <span className="text-xs text-gray-500">
                    {notification.date}
                  </span>
                </div>
              </div>
              {index !== notifications.length - 1 && (
                <hr className="my-2 border-t border-gray-300" />
              )}
            </li>
          ))}

        {activeTab === "offers" &&
          offers.map((offer, index) => (
            <li key={index} className="mb-4 flex gap-4 items-start">
              <img
                src="image 139.png"
                alt="offer"
                className="w-[30px] h-[30px] rounded-full p-1 bg-[#ffdbac]"
              />
              <div className="flex flex-col gap-2 w-full">
                {index === 0 && (
                  <span className="text-xs text-gray-500">Today</span>
                )}
                <div className="flex justify-between">
                  <p className="text-sm text-[#1e1f23] font-bold font-karla">
                    {offer.text}
                  </p>
                  <span className="text-xs text-gray-500">{offer.time}</span>
                </div>
                <p className="text-sm text-[#5d5d5d] font-bold font-karla">
                  {offer.description}
                </p>
                <a
                  href="#"
                  className="text-[#30bd75] text-xs font-medium underline"
                >
                  Click to review the offer
                </a>
                {index !== offers.length - 1 && (
                  <hr className="my-2 border-t border-gray-300" />
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;

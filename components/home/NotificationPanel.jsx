import React, { useState, useRef, useEffect } from "react";

const NotificationPanel = ({ notifications, offers, onClose }) => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const panelRef = useRef(null);

  const toggleTab = (tab) => setActiveTab(tab);

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openPopup = (offer) => {
    setCurrentOffer(offer);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentOffer(null);
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
                <button
                  onClick={() => openPopup(offer)}
                  className="text-[#30bd75] text-xs font-medium underline"
                >
                  Click to review the offer
                </button>
              </div>
            </li>
          ))}
      </ul>

      {/* Popup */}
      {isPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-xl w-[400px] relative">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        Review Offer
      </h2>

      {/* Product Information */}
      <div className="flex items-center gap-5 mb-8">
        <img
          src="/card_image5.png"
          alt="Product"
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div>
          <p className="font-medium text-base text-gray-800">
            Lulu & Sky - Orange crochet cottage Kurta
          </p>
          <p className="text-sm text-gray-500">Size: XS</p>
        </div>
      </div>

      {/* Buyer Information */}
      <div className="mb-6">
        <p className="text-sm font-bold text-gray-900 mb-2" style={{ color: "#FDE504" }}>
          Buyer
        </p>
        <div className="flex items-center gap-5">
          <img
            src="/emojiKuku.png"
            alt="Buyer"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-sm text-gray-700">Abu Salim</p>
        </div>
      </div>

      {/* Price Information */}
      <div className="mb-8">
        <p className="text-sm font-bold text-gray-900 mb-3" style={{ color: "#FDE504" }}>
          Price Information
        </p>
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <p>Buyer's Offer</p>
          <p className="font-bold text-[#FDE504]">₹120.00</p>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <p>Seller's Offer</p>
          <p className="font-bold text-[#FDE504]">₹140.00</p>
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div className="flex items-start gap-3 mb-8">
        <input
          type="checkbox"
          id="terms"
          className="w-5 h-5 text-[#FDE504] border-gray-300 rounded focus:ring-[#FDE504]"
        />
        <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
          I agree to the terms and conditions by KUKU.{" "}
          <a href="#" className="text-[#FDE504] underline">
            Click here to know more
          </a>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={closePopup}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Reject
        </button>
        <button
          onClick={closePopup}
          className="px-6 py-3 bg-[#FDE504] text-gray-900 font-bold rounded-lg shadow hover:bg-yellow-400 transition"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default NotificationPanel;

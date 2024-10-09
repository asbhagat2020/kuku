import React, { useState } from 'react';

const NotificationPanel = ({ notifications, offers }) => {
  const [activeTab, setActiveTab] = useState('notifications'); // Default tab

  // Switch between Notifications and Offers
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="absolute top-[120px] right-[50px] w-[300px] bg-white shadow-lg rounded-lg p-4 z-20">
      <div className="flex justify-items-end gap-[80px] border-b-2">
        <button
          onClick={() => toggleTab('notifications')}
          className={`relative text-black font-bold font-karla text-[16px] pb-2 ${activeTab === 'notifications' ? 'border-b-4 border-[#FDE504]' : ''}`}
        >
          Notifications
          <span
            className="absolute top-1 right-[-25px] bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[20px] w-[20px] flex items-center justify-center"
          >
            {notifications.length} {/* Notification count inside yellow circle */}
          </span>
        </button>
        
        <button
          onClick={() => toggleTab('offers')}
          className={`relative text-black font-bold font-karla  text-[16px] pb-2 ${activeTab === 'offers' ? 'border-b-4 border-[#FDE504] ' : ''}`}
        >
          Offers
          <span
            className="absolute top-1 right-[-25px] bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[20px] w-[20px] flex items-center justify-center"
          >
            {offers.length} {/* Offer count inside yellow circle */}
          </span>
        </button>
        
      </div>

      <ul className="mt-4">
        {/* Display Notifications */}
        {activeTab === 'notifications' &&
          notifications.map((notification, index) => (
            <li key={index} className="mb-2 flex gap-4 items-center">
            <img
              src="Ellipse 4427.svg"
              alt="notify"
              className="w-[10px] h-[10px]"
            />
            <div>
              <div className="flex gap-4 items-center">
                {/* Display label based on index */}
                {index === 0 && (
                  <span className="mb-4 text-xs text-gray-500">Today</span>
                )}
                {index === 1 && (
                  <span className="mb-4 text-xs text-gray-500">Yesterday</span>
                )}
          
                {/* Add horizontal line based on label presence */}
                {(index === 0 || index === 1) && (
                  <div className="w-[200px] h-3 my-2 border-t border-gray-300" />
                )}
              </div>
          
              {/* Notification text and date */}
              <p className="text-sm font-medium">{notification.text}</p>
              <span className="text-xs text-gray-500">{notification.date}</span>
          
              {/* Add horizontal line after each notification except the last one */}
              {index !== notifications.length - 1 && (
                <hr className="my-2 border-t border-gray-300" />
              )}
            </div>
          </li>
          
          
          
          ))
        }

        {/* Display Offers */}
        {activeTab === 'offers' &&
          offers.map((offer, index) => (
            <li key={index} className="mb-4 flex gap-4 items-start">
              <img
                src="image 139.png"
                alt="offer"
                className="w-[24px] h-[24px]"
              />
              <div>
              {index === 0 && (
                  <span className="mb-4 text-xs text-gray-500">Today</span>
                )}
                <div>
                <p className="text-sm font-medium">{offer.text}</p>
                <span className="text-xs text-gray-500">{offer.time}</span>
                </div>
                <p className="text-sm font-medium">{offer.discription}</p>
                {/* Add horizontal line after each offer except the last one */}
                {index !== offers.length - 1 && <hr className="my-2" />}
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default NotificationPanel;

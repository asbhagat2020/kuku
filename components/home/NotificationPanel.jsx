import React, { useState } from 'react';

const NotificationPanel = ({ notifications, offers }) => {
  const [activeTab, setActiveTab] = useState('notifications'); // Default tab

  // Switch between Notifications and Offers
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="absolute top-[120px] right-[50px] w-[350px] bg-white shadow-lg rounded-lg p-4 z-50">
      <div className="flex gap-[80px] border-b-2">
  <button
    onClick={() => toggleTab('notifications')}
    className={`relative text-black pt-[-10px] font-bold font-karla text-[16px] pb-2 flex-grow ${activeTab === 'notifications' ? 'border-b-4 border-[#FDE504]' : ''}`}
  >
    Notifications
    <span
      className="absolute top-[1px] right-[-1px] bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[20px] w-[20px] flex items-center justify-center"
    >
      {notifications.length} {/* Notification count inside yellow circle */}
    </span>
  </button>
  
  <button
    onClick={() => toggleTab('offers')}
    className={`relative text-black pt-[-10px] font-bold font-karla text-[16px] pb-2 flex-grow ${activeTab === 'offers' ? 'border-b-4 border-[#FDE504]' : ''}`}
  >
    Offers
    <span
      className="absolute top-[-1px] right-[-1px] bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[20px] w-[20px] flex items-center justify-center"
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
                  <div className="w-[225px] h-3 my-2 border-t border-gray-300" />
                )}
              </div>
          
              {/* Notification text and date */}
              <p className="text-black text-[16px] font-medium font-karla">{notification.text}</p>
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
    <li key={index} className="mb-4 flex gap-4 items-center">
      
      <img
        src="image 139.png"
        alt="offer"
        className="w-[30px] h-[30px] rounded-full p-1 bg-[#ffdbac]"
      />
      <div className="flex flex-col gap-2">
        {/* Display label based on index */}
        {index === 0 && (
          <div className="flex ml-[-40px] gap-2">
            <span className="text-xs text-gray-500">Today</span>
            <div className="w-[250px] h-3 mt-1 border-t border-gray-300" />
          </div>
        )}

        {/* Offer details */}
        <div className="flex justify-between">
        <p className="text-sm text-[#1e1f23] font-bold font-karla leading-[18px]">{offer.text}</p>
        <span className="text-xs text-gray-500">{offer.time}</span>
        </div>
        <p className="w-[250px] text-sm text-[#5d5d5d] font-normal font-karla leading-tight">{offer.discription}</p>
        <a href="#" className="text-[#30bd75] text-xs font-medium font-inter underline leading-none">
  Click to review the offer
</a>

        {/* Add horizontal line after each offer except the last one */}
        {index !== offers.length - 1 && (
          <hr className=" ml-[-40px] my-2 border-t border-gray-300" />
        )}
      </div>
    </li>
  ))
}



      </ul>
    </div>
  );
};

export default NotificationPanel;

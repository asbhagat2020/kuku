import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const NotificationPanel = ({ notifications, offers, onClose }) => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const panelRef = useRef(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter()
  const details = useSelector((state) => state.auth.user);
  const id = details?._id;
  console.log(id, "hhhh")

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
    console.log("offer", offer);
    setCurrentOffer(offer);
    setIsPopupOpen(true);
  };
  console.log("isPopupOpen", isPopupOpen, currentOffer);

  const closePopup = async (offer) => {
    if (!isChecked) {
      alert("Please read the Terms and conditions")
      return;
    }
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const data = { buyerID: offer?.buyer?._id, Amount: offer?.offerPrice };
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/reject/${offer?._id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsPopupOpen(false);
        setCurrentOffer(null);
        fetchNotificationDetails(); // Refresh data after rejecting an offer
      } else {
        console.error("Failed to submit offer:", response.statusText);
      }
    } catch (error) {
      console.error(
        "An error occurred while submitting the offer:",
        error.message
      );
    }
  };
  console.log(data, "data")

  const closeAcceptPopup = async (offer) => {
    if (!isChecked) {
      alert("Please read the Terms and conditions")
      return;
    }
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const data = { buyerID: offer?.buyer?._id, Amount: offer?.offerPrice };
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/accept/${offer?._id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsPopupOpen(false);
        setCurrentOffer(null);
        fetchNotificationDetails(); // Refresh data after accepting an offer
      } else {
        console.error("Failed to submit offer:", response.statusText);
      }
    } catch (error) {
      console.error(
        "An error occurred while submitting the offer:",
        error.message
      );
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

  const fetchNotificationDetails = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/get`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response.data.offers", response.data);

      setData(response.data.offers);
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificationDetails();
  }, []);

  return (
    <div
      ref={panelRef}
      className="fixed top-[80px] lg:top-[108px] right-0 sm:right-[10px] w-full sm:w-[350px] bg-white shadow-lg rounded-lg p-4 z-50"
    >
      {/* Tab Header */}
      <div className="flex gap-2 items-center border-b-2">
        <div
          onClick={() => toggleTab("notifications")}
          className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[16px] pb-2 flex-grow justify-center ${activeTab === "notifications"
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
          className={`flex items-center cursor-pointer gap-2 text-black pt-2 font-karla text-[16px] pb-2 flex-grow justify-center ${activeTab === "offers"
            ? "border-b-4 border-[#FDE504] font-bold"
            : "font-normal"
            }`}
        >
          Offers
          <span className="bg-[#FDE504] text-black font-karla font-semibold rounded-full h-[24px] w-[24px] flex items-center justify-center">
            {data.length}
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
                <Image
                  src="/Ellipse 4427.svg"
                  alt="notify"
                  width={10}
                  height={10}
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
          data?.map((offer, index) => (
            <li key={index} className="mb-4 flex gap-4 items-start">
              <Image
                src="/image 139.png"
                alt="offer"
                width={30}
                height={30}
                className="w-[30px] h-[30px] rounded-full p-1 bg-[#ffdbac]"
              />
              <div className="flex flex-col gap-2 w-full">
                {index === 0 && (
                  <span className="text-xs text-gray-500">
                    {Math.floor(
                      (new Date() - new Date(offer.createdAt)) /
                      (1000 * 60 * 60 * 24)
                    )}{" "}
                    days ago
                  </span>
                )}
                <div className="flex justify-between">
                  <p className="text-sm text-[#1e1f23] font-bold font-karla">
                    {id === offer?.buyer?._id ? `Your made an offer to ${offer?.seller?.name}` : "Offer received"}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(offer?.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {id === offer?.buyer?._id ?
                  <p className="text-sm text-[#5d5d5d] font-bold font-karla">

                    {offer?.status === "Pending" ? "Your offer is still in Progress" : offer?.status === "Accepted" ? "Your offer is Approved by the seller" : "Your offer is Rejected by the seller"}
                  </p> :
                  <p className="text-sm text-[#5d5d5d] font-bold font-karla">
                    Great news! <b>{offer?.buyer?.name}</b> has made you an offer. Tap here to check it out
                  </p>
                }
                {id === offer?.buyer?._id ?

                  offer?.status === "Pending" ? <></> :
                    offer?.status === "Accepted" ?

                      <button
                        onClick={() => openPopup(offer)}
                        className="text-[#30bd75] text-xs font-medium underline"
                      >
                        Make a Payment to get your product
                      </button>


                      :
                      offer?.statusHistory?.length == 3 ?
                        <p
                          style={{
                            fontSize: 14,
                            color: "#30bd75",
                            fontWeight: "500",
                            marginBlockStart: 3,
                            textDecorationLine: "underline",
                            fontFamily: 'Inter-Medium'
                          }}
                        >
                          Sorry...! You have exceeded your Offer limit, Better luck Next Time
                        </p> :
                        <button
                          onClick={() => router.push(`/selling-page/${offer?.product?._id}`)}
                          className="text-[#30bd75] text-xs font-medium underline"
                        >
                          Click to make offer again
                        </button>


                  :

                  <button
                    onClick={() => openPopup(offer)}
                    className="text-[#30bd75] text-xs font-medium underline"
                  >
                    Click to review the offer
                  </button>

                }


              </div>
            </li>
          ))}
      </ul>

      {/* Popup */}
      {isPopupOpen && currentOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-[400px] relative">
            {/* Header */}
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
              Review Offer
            </h2>

            {/* Product Information */}
            <div className="flex items-center gap-5 mb-8">
              <Image
                src={currentOffer?.product?.images[0]}
                alt="Product"
                width={96}
                height={96}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-base text-gray-800">
                  {currentOffer?.product?.name}
                </p>
                <p className="text-sm text-gray-500">
                  Size: {currentOffer?.product?.size?.sizeName}
                </p>
              </div>
            </div>

            {/* Buyer Information */}
            <div className="mb-6">
              <p
                className="text-sm font-bold text-gray-900 mb-2"
                style={{ color: "#FDE504" }}
              >
                Buyer
              </p>
              <div className="flex items-center gap-5">
                <Image
                  // src={currentOffer?.buyer?.ProfileImg}
                  src={currentOffer?.buyer?.ProfileImg || "/default-profile-img.png"}
                  alt="Buyer"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-sm text-gray-700">
                  {currentOffer?.buyer?.name}
                </p>
              </div>
            </div>

            {/* Price Information */}
            <div className="mb-8">
              <p
                className="text-sm font-bold text-gray-900 mb-3"
                style={{ color: "#FDE504" }}
              >
                Price Information
              </p>
              <div className="flex justify-between text-sm text-gray-700 mb-2">
                <p>Seller&apos;s Offer</p>

                <p className="font-bold text-[#FDE504]">
                  {currentOffer?.product?.price}
                </p>
              </div>
              {currentOffer?.statusHistory?.map((history,index) =>
                <div className="flex justify-between text-sm text-gray-700" key={index}>
                  <p>Buyer&apos;s Offer</p>
                  <p className="font-bold text-[#FDE504]">
                    {history?.Amount}
                  </p>
                </div>
              )}
            </div>

            {/* Agreement Checkbox */}


            {currentOffer?.statusHistory?.length > 0 ?

              currentOffer?.statusHistory[currentOffer?.statusHistory?.length - 1]?.status === "Rejected" || currentOffer?.statusHistory[currentOffer?.statusHistory?.length - 1]?.status == "Accepted" ?
                <></> :
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
                    I agree to the terms and conditions by KUKU.{" "}
                    <a href="#" className="text-[#FDE504] underline">
                      Click here to know more
                    </a>
                  </label>
                </div>
              :
              <div className="flex items-start gap-3 mb-8">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 text-[#FDE504] border-gray-300 rounded focus:ring-[#FDE504]"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-tight"
                >
                  I agree to the terms and conditions by KUKU.{" "}
                  <a href="#" className="text-[#FDE504] underline">
                    Click here to know more
                  </a>
                </label>
              </div>}



            {/* Action Buttons */}
            {currentOffer?.statusHistory?.length > 0 ?
              currentOffer?.statusHistory[currentOffer?.statusHistory?.length - 1]?.status === "Rejected" || currentOffer?.statusHistory[currentOffer?.statusHistory?.length - 1]?.status == "Accepted" ?
                <p style={{ fontFamily: 'Karla-Bold', textAlign: "center", margin: "10%" }}>{currentOffer?.statusHistory[currentOffer?.statusHistory?.length - 1]?.status}</p>

                :

                <div className="flex justify-between">
                  <button
                    onClick={() => closePopup(currentOffer)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => closeAcceptPopup(currentOffer)}
                    className="px-6 py-3 bg-[#FDE504] text-gray-900 font-bold rounded-lg shadow hover:bg-yellow-400 transition"
                  >
                    Accept
                  </button>
                </div>
              :
              <div className="flex justify-between">
                <button
                  onClick={() => closePopup(currentOffer)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Reject
                </button>
                <button
                  onClick={() => closeAcceptPopup(currentOffer)}
                  className="px-6 py-3 bg-[#FDE504] text-gray-900 font-bold rounded-lg shadow hover:bg-yellow-400 transition"
                >
                  Accept
                </button>
              </div>
            }


          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
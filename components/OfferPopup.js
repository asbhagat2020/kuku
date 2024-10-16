
import React, { useState } from "react";

export const OfferPopup = ({ isOpen, onClose, onSubmit }) => {
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePriceSelection = (price) => {
    setSelectedPrice(price);
    setIsSubmitDisabled(!price); // Enable/disable based on selection
  };

  const handleOpenModal = () => {
    if (selectedPrice) {
      setIsModalOpen(true);
      onSubmit(selectedPrice); // Call the submit function
      setSelectedPrice(""); // Clear the selected price after submitting
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose(); // Call the close function
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-[#7F7F7F] bg-opacity-10 flex justify-center items-center z-50">
          <div className="bg-white p-9 rounded-lg shadow-lg w-[500px] text-start">
            <div>
              <span
                style={{ color: "#E4086F", fontSize: "14px", fontWeight: 700 }}
              >
                Listed Price:{" "}
              </span>
              <span
                style={{ color: "#070707", fontSize: "14px", fontWeight: 700 }}
              >
                AED 250
              </span>
            </div>
            <div>
              <div className="text-[#070707] text-[15px] font-bold font-karla mt-3 mb-3  ">
                Quote your price
              </div>
            </div>
            <div className="flex gap-[8px]">
              <button
                className={`w-[89px] h-[41px] py-[8.66px] px-[10.93px] bg-white rounded-[6.93px] border ${
                  selectedPrice === 200 ? "border-pink-500" : "border-[#878787]"
                } inline-flex items-center justify-center gap-[8.66px]`}
                onClick={() => handlePriceSelection(200)}
              >
                <div className="text-[#4C5C6B] text-[14px] font-karla font-normal break-words">
                  AED 200
                </div>
              </button>
              <button
                className={`w-[89px] h-[41px] py-[8.66px] px-[10.93px] bg-white rounded-[6.93px] border ${
                  selectedPrice === 195 ? "border-pink-500" : "border-[#878787]"
                } inline-flex items-center justify-center gap-[8.66px]`}
                onClick={() => handlePriceSelection(195)}
              >
                <div className="text-[#4C5C6B] text-[14px] font-karla font-normal break-words">
                  AED 195
                </div>
              </button>
              <div>
                <input
                  type="text"
                  placeholder="Enter the custom amount"
                  className="w-[245px] h-[41px] py-[8.66px] px-[19.93px] bg-white rounded-[6.93px] border border-[#878787] text-[#4C5C6B] text-[14px] font-karla font-normal placeholder:text-[#B0B0B0] break-words outline-none"
                  onChange={(e) => handlePriceSelection(e.target.value)}
                />
              </div>
            </div>
            <div className="text-[#E4086F] text-[12px] font-karla font-bold capitalize tracking-[0.96px] break-words mt-1 mb-[30px]">
              Suggested
            </div>
            <p className="text-sm font-bold text-[#525252] mb-4">
              You can only make one offer per item. If the seller accepts your
              offer, you’ll be notified to place the order. Other users can
              still buy the item before you.
            </p>
            <div className="flex flex-col items-center">
              <button
                onClick={handleOpenModal}
                className={`bg-[#FDE504] text-[#E4086F] text-[20px] font-bold font-karla rounded-lg w-[440px] h-[65px] ${
                  isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitDisabled}
              >
                SUBMIT
              </button>
              <button
                onClick={onClose}
                className="border-[#F7B5D4] text-[#E4086F] text-[20px] font-bold rounded-lg  py-2 border w-[455px] h-[65px] mt-3"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Section */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[380px] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-5">
              <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#30BD75] border-4 border-[#9ae6b4] rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="text-[20px] font-bold leading-tight">
              <div>Your offer has been </div>
              <div> sent to the seller</div>
            </div>
            <div className="text-[16px] mt-1">
              <div>Now sit back and relax while the seller</div>
              <div>takes some time to review your offer</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

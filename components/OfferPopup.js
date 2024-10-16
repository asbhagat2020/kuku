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
        <div className="fixed inset-0 bg-[#7F7F7F] bg-opacity-10 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 md:p-9 rounded-lg shadow-lg w-full max-w-[500px] text-start">
            <div>
              <span className="text-[#E4086F] text-sm md:text-base font-bold">
                Listed Price:
              </span>
              <span className="text-[#070707] text-sm md:text-base font-bold ml-2">
                AED 250
              </span>
            </div>
            <div className="text-[#070707] text-sm md:text-base font-bold mt-3 mb-3">
              Quote your price
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className={`w-[85px] h-[40px] bg-white rounded-lg border ${
                  selectedPrice === 200 ? "border-pink-500" : "border-[#878787]"
                } flex items-center justify-center`}
                onClick={() => handlePriceSelection(200)}
              >
                <div className="text-[#4C5C6B] text-sm">AED 200</div>
              </button>
              <button
                className={`w-[85px] h-[40px] bg-white rounded-lg border ${
                  selectedPrice === 195 ? "border-pink-500" : "border-[#878787]"
                } flex items-center justify-center`}
                onClick={() => handlePriceSelection(195)}
              >
                <div className="text-[#4C5C6B] text-sm">AED 195</div>
              </button>
              <input
                type="text"
                placeholder="Enter the custom amount"
                className="flex-1 min-w-[200px] h-[40px] bg-white rounded-lg border border-[#878787] px-4 text-sm placeholder:text-[#B0B0B0] outline-none"
                onChange={(e) => handlePriceSelection(e.target.value)}
              />
            </div>
            <div className="text-[#E4086F] text-xs mt-1 mb-4">
              Suggested
            </div>
            <p className="text-sm text-[#525252] mb-4">
              You can only make one offer per item. If the seller accepts your
              offer, you’ll be notified to place the order. Other users can
              still buy the item before you.
            </p>
            <div className="flex flex-col items-center">
              <button
                onClick={handleOpenModal}
                className={`bg-[#FDE504] text-[#E4086F] text-lg font-bold rounded-lg w-full h-[55px] md:w-[440px] md:h-[65px] ${
                  isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitDisabled}
              >
                SUBMIT
              </button>
              <button
                onClick={onClose}

                className="border-[#F7B5D4] text-[#E4086F] text-lg font-bold rounded-lg px-4 py-2 border w-full h-[55px] md:w-[440px] md:h-[65px] mt-3"

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
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[380px] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
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
            <div className="text-lg font-bold leading-tight">
              Your offer has been sent to the seller
            </div>
            <div className="text-sm mt-2">
              Now sit back and relax while the seller takes some time to review
              your offer.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

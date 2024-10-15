import React from 'react'

export const OfferPopup = () => {
 const [isOfferPopupOpen, setOfferPopupOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null); // State to hold the selected price for the offer
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // State to disable/enable the submit button

 const handleOpenOfferPopup = () => {
    setOfferPopupOpen(true);
  };

  const handleCloseOfferPopup = () => {
    setOfferPopupOpen(false);
    setOfferAmount(""); // Reset offer amount when closing
    setSelectedPrice(null); // Reset selected price
    setIsSubmitDisabled(true); // Disable submit button
  };

  const handlePriceSelection = (price) => {
    setSelectedPrice(price);
    setOfferAmount(price); // Set the offer amount to the selected price

    // Enable submit button if a valid price is selected
    if (price && !isNaN(price)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleSubmitOffer = () => {
    console.log("Submitted offer amount:", offerAmount);
    handleCloseOfferPopup();
  };

  return (
    <div>
           {/* Offer Popup */}
            {isOfferPopupOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-9 rounded-lg shadow-lg w-[500px] text-start">
                  <div>
                    <span
                      style={{
                        color: "#E4086F",
                        fontSize: "14px",
                        fontWeight: 700,
                        marginTop: 70,
                        font: "karla",
                      }}
                    >
                      Listed Price:{" "}
                    </span>
                    <span
                      style={{
                        color: "#070707",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
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
                        selectedPrice === 200
                          ? "border-pink-500"
                          : "border-[#878787]"
                      } inline-flex items-center justify-center gap-[8.66px]`}
                      onClick={() => handlePriceSelection(200)}
                    >
                      <div className="text-[#4C5C6B] text-[14px] font-karla font-normal break-words">
                        AED 200
                      </div>
                    </button>
                    <button
                      className={`w-[89px] h-[41px] py-[8.66px] px-[10.93px] bg-white rounded-[6.93px] border ${
                        selectedPrice === 195
                          ? "border-pink-500"
                          : "border-[#878787]"
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

                  <p className="text-sm font-bold text-[#525252] mb-4 font-karla">
                    You can only make one offer per item. If the seller accepts
                    your offer, you’ll be notified to place the order. Other
                    users can still buy the item before you.
                  </p>

                  <div className="justify-center flex-col ">
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
                      onClick={handleCloseOfferPopup}
                      className="border-[#F7B5D4] text-[#E4086F] text-[20px] font-bold  font-karla rounded-lg px-4 py-2 border w-[455px] h-[65px] mt-3"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            )}
    </div>
  )
}

// "use client";

// import { useState } from "react";

// const OfferPopup = ({
//   isOfferPopupOpen,
//   product,
//   handlePriceSelection,
//   handleOpenModal,
//   handleCloseOfferPopup,
//   selectedPrice,
//   isSubmitDisabled,
// }) => {
//   if (!isOfferPopupOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div
//         className="bg-white p-9 rounded-lg shadow-lg w-[500px] text-start"
//         style={{
//           width: "500px",
//           ...(window.innerWidth <= 768 && {
//             width: "90%",
//             padding: "1.5rem",
//           }),
//         }}
//       >
//         <div>
//           <span
//             style={{
//               color: "#E4086F",
//               fontSize: "14px",
//               fontWeight: 700,
//               marginTop: 70,
//               font: "karla",
//             }}
//           >
//             Listed Price:{" "}
//           </span>
//           <span
//             style={{ color: "#070707", fontSize: "14px", fontWeight: 700 }}
//           >
//             AED {product?.price}
//           </span>
//         </div>
//         <div>
//           <div className="text-[#070707] text-[15px] font-bold font-karla mt-3 mb-3">
//             Quote your price
//           </div>
//         </div>
//         <div
//           className="flex gap-[8px]"
//           style={{
//             flexDirection: window.innerWidth <= 768 ? "column" : "row",
//           }}
//         >
//           <button
//             className={`w-[89px] h-[41px] py-[8.66px] px-[10.93px] bg-white rounded-[6.93px] border ${
//               selectedPrice === 200 ? "border-pink-500" : "border-[#878787]"
//             } inline-flex items-center justify-center gap-[8.66px]`}
//             onClick={() => handlePriceSelection(200)}
//             style={{
//               width: window.innerWidth <= 768 ? "100%" : "89px",
//             }}
//           >
//             <div className="text-[#4C5C6B] text-[14px] font-karla font-normal break-words">
//               AED 200
//             </div>
//           </button>
//           <button
//             className={`w-[89px] h-[41px] py-[8.66px] px-[10.93px] bg-white rounded-[6.93px] border ${
//               selectedPrice === 195 ? "border-pink-500" : "border-[#878787]"
//             } inline-flex items-center justify-center gap-[8.66px]`}
//             onClick={() => handlePriceSelection(195)}
//             style={{
//               width: window.innerWidth <= 768 ? "100%" : "89px",
//             }}
//           >
//             <div className="text-[#4C5C6B] text-[14px] font-karla font-normal break-words">
//               AED 195
//             </div>
//           </button>
//           <div>
//             <input
//               type="text"
//               placeholder="Enter the custom amount"
//               className="w-[245px] h-[41px] py-[8.66px] px-[19.93px] bg-white rounded-[6.93px] border border-[#878787] text-[#4C5C6B] text-[14px] font-karla font-normal placeholder:text-[#B0B0B0] break-words outline-none"
//               onChange={(e) => handlePriceSelection(e.target.value)}
//               style={{
//                 width: window.innerWidth <= 768 ? "100%" : "245px",
//               }}
//             />
//           </div>
//         </div>
//         <div className="text-[#E4086F] text-[12px] font-karla font-bold capitalize tracking-[0.96px] break-words mt-1 mb-[30px]">
//           Suggested
//         </div>

//         <p className="text-sm font-bold text-[#525252] mb-4 font-karla">
//           You can only make one offer per item. If the seller accepts your
//           offer, you&apos;ll be notified to place the order. Other users can
//           still buy the item before you.
//         </p>

//         <div className="justify-center flex-col">
//           <button
//             onClick={handleOpenModal}
//             className={`bg-[#FDE504] text-[#E4086F] text-[20px] font-bold font-karla rounded-lg w-[440px] h-[65px] ${
//               isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitDisabled}
//             style={{
//               width: window.innerWidth <= 768 ? "100%" : "440px",
//             }}
//           >
//             SUBMIT
//           </button>
//           <button
//             onClick={handleCloseOfferPopup}
//             className="border-[#F7B5D4] text-[#E4086F] text-[20px] font-bold font-karla rounded-lg px-4 py-2 border w-[455px] h-[65px] mt-3"
//             style={{
//               width: window.innerWidth <= 768 ? "100%" : "440px",
//             }}
//           >
//             CANCEL
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfferPopup;

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const OfferPopup = ({
  isOfferPopupOpen,
  product,
  handlePriceSelection,
  handleOfferSubmit,
  handleCloseOfferPopup,
  selectedPrice,
  isSubmitDisabled,
  remainingOffers,
}) => {
  const [priceError, setPriceError] = useState("");

  if (!isOfferPopupOpen) return null;

  const minimumPrice = product?.price * 0.7;

  const validatePrice = (price) => {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      setPriceError("Please enter a valid number");
      return false;
    }
    if (parsedPrice < minimumPrice) {
      setPriceError(
        `Offer price must be at least AED ${minimumPrice.toFixed(
          2
        )} (70% of listed price)`
      );
      return false;
    }
    setPriceError("");
    return true;
  };

  const handleInputChange = (e) => {
    const price = e.target.value;
    handlePriceSelection(price);
    validatePrice(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-9 rounded-lg shadow-lg w-[500px] text-start"
        style={{
          width: "500px",
          ...(window.innerWidth <= 768 && {
            width: "90%",
            padding: "1.5rem",
          }),
        }}
      >
        <div>
          <span
            style={{
              color: "#E4086F",
              fontSize: "14px",
              fontWeight: 700,
              font: "karla",
            }}
          >
            Listed Price:{" "}
          </span>
          <span style={{ color: "#070707", fontSize: "14px", fontWeight: 700 }}>
            AED {product?.price}
          </span>
        </div>
        <div>
          <span
            style={{
              color: "#E4086F",
              fontSize: "14px",
              fontWeight: 700,
              font: "karla",
            }}
          >
            Minimum Offer Price:{" "}
          </span>
          <span style={{ color: "#070707", fontSize: "14px", fontWeight: 700 }}>
            AED {minimumPrice.toFixed(2)}
          </span>
        </div>
        <div>
          <span
            style={{
              color: "#E4086F",
              fontSize: "14px",
              fontWeight: 700,
              font: "karla",
            }}
          >
            Offers Remaining:{" "}
          </span>
          <span style={{ color: "#070707", fontSize: "14px", fontWeight: 700 }}>
            {remainingOffers}
          </span>
        </div>
        <div>
          <div className="text-[#070707] text-[15px] font-bold font-karla mt-3 mb-3">
            Quote your price
          </div>
        </div>
        <div
          className="flex gap-[8px]"
          style={{
            flexDirection: window.innerWidth <= 768 ? "column" : "row",
          }}
        >
          <button
            className={`w-[89px] h-[41px] py-[8.66px] px-[10.93px] bg-white rounded-[6.93px] border ${
              selectedPrice === product?.price * 0.8
                ? "border-pink-500"
                : "border-[#878787]"
            } inline-flex items-center justify-center gap-[8.66px]`}
            onClick={() => handlePriceSelection(product?.price * 0.8)}
            style={{
              width: window.innerWidth <= 768 ? "100%" : "89px",
            }}
          >
            <div className="text-[#4C5C6B] text-[14px] font-karla font-normal break-words">
              AED {(product?.price * 0.8).toFixed(2)}
            </div>
          </button>
          <button
            className={`w-[89px] h-[41px] py-[8.66px] px-[10.93px] bg-white rounded-[6.93px] border ${
              selectedPrice === product?.price * 0.85
                ? "border-pink-500"
                : "border-[#878787]"
            } inline-flex items-center justify-center gap-[8.66px]`}
            onClick={() => handlePriceSelection(product?.price * 0.85)}
            style={{
              width: window.innerWidth <= 768 ? "100%" : "89px",
            }}
          >
            <div className="text-[#4C5C6B] text-[14px] font-karla font-normal break-words">
              AED {(product?.price * 0.85).toFixed(2)}
            </div>
          </button>
          <div>
            <input
              type="number"
              placeholder="Enter the custom amount"
              className={`w-[245px] h-[41px] py-[8.66px] px-[19.93px] bg-white rounded-[6.93px] border ${
                priceError ? "border-red-500" : "border-[#878787]"
              } text-[#4C5C6B] text-[14px] font-karla font-normal placeholder:text-[#B0B0B0] break-words outline-none`}
              onChange={handleInputChange}
              style={{
                width: window.innerWidth <= 768 ? "100%" : "245px",
              }}
            />
            {priceError && (
              <p className="text-red-600 text-[12px] font-karla mt-1">
                {priceError}
              </p>
            )}
          </div>
        </div>
        <div className="text-[#E4086F] text-[12px] font-karla font-bold capitalize tracking-[0.96px] break-words mt-1 mb-[30px]">
          Suggested
        </div>
        {/* <p className="text-sm font-bold text-[#525252] mb-4 font-karla">
          You can only make up to three offers per item. If the seller accepts your
          offer, you&apos;ll be notified to place the order. Other users can
          still buy the item before you.
        </p> */}

        <p className="text-sm font-bold text-[#525252] mb-4 font-karla">
          You can make up to three offers per item as per our{" "}
          <Link
            href="/make-an-offer-policy"
            className="text-[#007bff] underline"
            target="_blank"
          >
            offer policy
          </Link>
          . If the seller accepts your offer, you&apos;ll be notified to place
          the order. Please note, other users can still purchase the item before
          you.
        </p>
        <div className="justify-center flex-col">
          <button
            onClick={handleOfferSubmit}
            className={`bg-[#FDE504] text-[#E4086F] text-[20px] font-bold font-karla rounded-lg w-[440px] h-[65px] ${
              isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitDisabled}
            style={{
              width: window.innerWidth <= 768 ? "100%" : "440px",
            }}
          >
            SUBMIT
          </button>
          <button
            onClick={handleCloseOfferPopup}
            className="border-[#F7B5D4] text-[#E4086F] text-[20px] font-bold font-karla rounded-lg px-4 py-2 border w-[455px] h-[65px] mt-3"
            style={{
              width: window.innerWidth <= 768 ? "100%" : "440px",
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;

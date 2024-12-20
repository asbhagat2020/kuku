"use client";

import Link from "next/link";
import Image from "next/image";
import amiriImg from "../public/product-image.png";
import kukuLogo from "../public/emojiKuku.png";
import CustomCalendar from "./CustomCalendar";
import { useState, useEffect, useRef } from "react";
import calendarImg from "../public/Calendar.png";
import {
  FaStar,
  FaRegHeart,
  // FaRegHandshake,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cart/cartSlice";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const [isRentPopupOpen, setRentPopupOpen] = useState(false);
  const [rentalDate, setRentalDate] = useState("");
  const [isOfferPopupOpen, setOfferPopupOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null); // State to hold the selected price for the offer
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // State to disable/enable the submit button
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to keep track of the current image
  const [isDateSelected, setIsDateSelected] = useState(false);
  // const images = [amiriImg, amiriImg];
  const images = product?.images;
  console.log(images);

  // const [isRentPopupOpen, setIsRentPopupOpen] = useState(false);
  const [isStartFormatted, setIsStartFormatted] = useState("");
  const [isEndFormatted, setIsEndFormatted] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const handleBuy = () => {
    dispatch(addToCart(product));
    router.push('/cart')
  };

  const openCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const openEndCalendar = () => {
    setShowEndCalendar(!showEndCalendar);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };
  const closeEndCalendar = () => {
    setShowEndCalendar(false);
  };

  const handleStartDateSelect = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setIsDateSelected(true);
    setIsStartFormatted(formattedDate); // Assume date comes formatted from CustomCalendar
    closeCalendar(); // Close the calendar after selecting a date
  };
  const handleEndDateSelect = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setIsDateSelected(true);
    setIsEndFormatted(formattedDate); // Assume date comes formatted from CustomCalendar
    closeEndCalendar(); // Close the calendar after selecting a date
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseRentPopup();
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);

    setOfferPopupOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenRentPopup = () => {
    setRentPopupOpen(true);
  };

  const handleCloseRentPopup = () => {
    setRentPopupOpen(false);
    setRentalDate(""); // Reset date when closing
    openCalendar(false);
    openEndCalendar(false);
  };

  const handleProceed = () => {
    router.push(
      `/renting?startDate=${isStartFormatted}&endDate=${isEndFormatted}`
    );
    handleCloseRentPopup();
  };

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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Navigate to next image
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    ); // Navigate to previous image
  };

  return (
    <div className="max-w-screen-xl mx-auto pl-1 pr-6 font-karla">
      {/* Breadcrumbs */}
      <div className="breadcrumb text-gray-500 text-sm mb-3 mt-2">
        <Link href="/" className="hover">
          Home
        </Link>
        {" | "}
        <Link href="/" className="hover">
          Categories
        </Link>{" "}
        |
        <Link href="/" className="hover">
          {product?.category}
        </Link>{" "}
        | <span className="font-bold">{product?.title}</span>
      </div>

      <hr className="border-gray-300 mb-4" />

      <div className="flex flex-col md:flex-row items-start gap-6 relative">
        <div className="w-full md:w-1/2 relative">
          {/* Display the current image based on index */}
          <Image
            unoptimized
            width={650}
            height={500}
            src={images[currentImageIndex]}
            alt="AMIRI Men Oversize T-shirt"
            className="object-cover rounded-md"
            style={{
              width: "100%",
              height: "500px",
              maxWidth: "650px",
              zIndex: 1, // Current image has a higher z-index
              position: "relative",
              transition: "opacity 0.5s ease-in-out", // Smooth transition for fading effect
            }}
          />
          <Image
            unoptimized
            width={650}
            height={500}
            src={images[(currentImageIndex + 1) % images.length]} // Show the next image below
            alt="AMIRI Men Oversize T-shirt"
            className="object-cover rounded-md absolute top-0 left-0" // Position on top
            style={{
              width: "100%",
              height: "500px",
              maxWidth: "650px",
              zIndex: 0, // Next image has a lower z-index
              position: "absolute",
              opacity: 0, // Initially hidden
              transition: "opacity 0.5s ease-in-out", // Smooth transition for fading effect
            }}
          />
          <button
            className="absolute left-1 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md z-20"
            style={{
              backgroundColor: "#E5E5E5",
              boxShadow: "inset -20px -6px 24px rgba(209, 209, 209, 0.07)",
              filter: "drop-shadow(0px 10px 44px rgba(0, 0, 0, 0.09))",
            }}
            onClick={() => {
              handlePrevImage();
              // Adjust the opacity of the images on navigation
              document.querySelector(
                `img[alt="AMIRI Men Oversize T-shirt"]:nth-child(1)`
              ).style.opacity = 0;
              document.querySelector(
                `img[alt="AMIRI Men Oversize T-shirt"]:nth-child(2)`
              ).style.opacity = 1;
            }} // Previous image handler
          >
            <FaArrowLeft className="text-black w-4 h-4" />
          </button>
          <button
            className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md z-20"
            style={{
              backgroundColor: "#E5E5E5",
              boxShadow: "inset -20px -6px 24px rgba(209, 209, 209, 0.07)",
              filter: "drop-shadow(0px 10px 44px rgba(0, 0, 0, 0.09))",
            }}
            onClick={() => {
              handleNextImage();
              // Adjust the opacity of the images on navigation
              document.querySelector(
                `img[alt="AMIRI Men Oversize T-shirt"]:nth-child(1)`
              ).style.opacity = 1;
              document.querySelector(
                `img[alt="AMIRI Men Oversize T-shirt"]:nth-child(2)`
              ).style.opacity = 0;
            }} // Next image handler
          >
            <FaArrowRight className="text-black w-4 h-4" />
          </button>
        </div>

        <div
          className="hidden md:block"
          style={{
            width: "1px",
            backgroundColor: "lightgray",
            height: "832px",
            marginLeft: "10px",
          }}
        ></div>

        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex space-x-2">
            <span
              className="inline-block px-4 py-2 text-black rounded-full text-xs font-semibold border  shadow-sm"
              style={{ backgroundColor: "#E6E6E6" }}
            >
              {product?.category}
            </span>
            <span
              className="inline-block px-4 py-2 text-black rounded-full text-xs font-semibold border  shadow-sm"
              style={{ backgroundColor: "#E6E6E6" }}
            >
              UNISEX
            </span>
          </div>

          <h1 className="text-3xl font-bold">{product?.name}</h1>

          <p className="text-gray-400" style={{ marginTop: "0.2rem" }}>
            {product?.description}
          </p>

          <div className="text-2xl font-bold">
            AED {product?.price}{" "}
            <span style={{ color: "#30BD75", fontSize: "1.50rem" }}>
              20% OFF
            </span>
            <p
              className="text-gray-400 line-through"
              style={{ fontSize: "0.985rem", margin: 0, fontWeight: "normal" }}
            >
              MRP AED{product?.price}
            </p>
          </div>

          <div className="flex items-center text-gray-600 space-x-4 font-medium">
            <div>
              <span className="font-bold">SIZE</span>
              <span className="inline-block ml-2 px-2 py-1 border border-pink-500 text-red-500 rounded">
                {product?.size}
              </span>
            </div>
            <div>
              <span className="font-bold">CONDITION: </span>
              <span className="font-bold">
                {product?.usage}
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Link href="/wishlist">
              <button
                className="border-2 rounded-md px-6 py-3 flex items-center justify-center font-bold text-pink-500 hover:bg-[#E4086F] hover:text-white transition-all duration-300"
                style={{
                  borderColor: "#E4086F",
                  height: "60px", // Set to match the height in the image
                  width: "200px", // Set width to be consistent
                  borderRadius: "16px",
                }}
              >
                <FaRegHeart className="mr-2 w-5 h-5" />
                WISHLIST
              </button>
            </Link>

            <button
              onClick={handleOpenOfferPopup}
              className="group border-2 rounded-md px-6 py-3 flex items-center justify-center font-bold text-green-500 hover:bg-[#30BD75] hover:text-white transition-all duration-300"
              style={{
                borderColor: "#30BD75",
                height: "60px",
                width: "377px",
                borderRadius: "16px",
              }}
            >
              <FaHandshake
                className="mr-2 w-5 h-5 transition-all duration-300 group-hover:text-white"
                style={{
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "25",
                }}
              />
              MAKE AN OFFER
            </button>
          </div>

          {/* <Link href="/cart"> */}
          <button
            onClick={handleBuy}
            className="mt-4 text-black w-full font-bold flex items-center justify-center bg-yellow-300 hover:bg-yellow-400 transition-all duration-300"
            style={{
              height: "72px",
              borderRadius: "16px",
            }}
          >
            <FaShoppingBag className="mr-2" />
            ADD TO BAG
          </button>
          {/* </Link> */}

          <div className="flex flex-col mt-2">
            <div className="text-center font-bold text-black">
              Or Rent it for
            </div>

            <button
              onClick={handleOpenRentPopup}
              className="mt-2 text-black w-full font-bold bg-[#69D3FA] transition-all duration-300 hover:bg-[#9ee1fb]"
              style={{
                height: "72px",
                borderRadius: "16px",
              }}
            >
              AED 36
            </button>
          </div>

          <div
            className="mt-10 mb-0.75"
            style={{ marginTop: "3rem", marginBottom: "0.75rem" }}
          >
            <p className="font-bold mb-3">Sold by</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "#AF65E6",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <Image
                    src={kukuLogo}
                    alt="Kuku Logo"
                    className="object-contain w-12 h-12"
                  />
                </div>

                <div className="ml-3">
                  <p className="font-bold">Kuku1222</p>
                </div>
              </div>

              <button
                className="ml-auto rounded-md px-4 py-2 bg-green-500 text-white w-full max-w-[136px] font-bold"
                style={{ borderRadius: "20px" }}
              >
                Follow
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p
                  className="text-black-500 text-sm font-medium"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                >
                  Seller rating based on 100+ reviews
                </p>
                <div className="flex items-center">
                  <span className="text-black font-bold">4.7</span>
                  <FaStar className="text-[#69D3FA] ml-1" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <hr className="border-gray-300 my-3" />
              <div className="flex items-center justify-between">
                <p
                  className="text-black-500 text-sm font-medium"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                >
                  106 Products Sold
                </p>

                <button
                  className="text-[#E4086F] text-sm font-bold"
                  style={{ border: "none", background: "transparent" }}
                >
                  View
                </button>
              </div>
            </div>

            <div className="my-6">
              <hr className="border-gray-300" />
            </div>
          </div>

          {isRentPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div
                ref={modalRef} // Attach ref to the modal content
                className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-start"
              >
                <div>
                  <span className="text-[#E4086F] text-[14px] font-karla font-bold capitalize tracking-[1.12px] break-words">
                    Rental Price:
                  </span>
                  <span className="text-[#070707] text-[14px] font-karla font-bold capitalize tracking-[1.12px] break-words">
                    AED 70
                  </span>
                </div>

                <label
                  htmlFor="rentalDate"
                  className="block text-left mb-[20px] mt-[20px] cursor-pointer text-[#070707] text-[15px] font-karla font-bold break-words"
                  onClick={openCalendar}
                >
                  Choose start Date
                </label>
                <div className="flex w-full overflow-hidden items-center justify-between border border-gray-300 rounded-md">
                  <input
                    type="text"
                    id="rentalDate"
                    placeholder="Choose your rental dates"
                    value={isStartFormatted}
                    onClick={openCalendar} // This is the function to open the calendar
                    readOnly
                    required
                    className="relative p-2 text-[#4C5C6B] text-[16px] font-karla font-normal bg-no-repeat bg-right bg-[length:20px_20px] pr-10 outline-none"
                    style={{ width: "calc(100% - 34px)" }}
                  />
                  <div className="w-[34px] h-[30px] px-[2px] cursor-pointer">
                    <Image
                      src={calendarImg}
                      alt="Calendar Icon"
                      className="w-[100%] h-[100%]"
                      onClick={() =>
                        document.getElementById("rentalDate").click()
                      } // Trigger the input click when image is clicked
                    />
                  </div>
                </div>
                {showCalendar && (
                  <div className="absolute z-50">
                    <CustomCalendar
                      onSelectDate={handleStartDateSelect}
                      closeCalendar={closeCalendar}
                    />
                  </div>
                )}
                <label
                  htmlFor="rentalEndDate"
                  className="block text-left mb-[20px] mt-[20px] cursor-pointer text-[#070707] text-[15px] font-karla font-bold break-words"
                  onClick={openEndCalendar}
                >
                  Choose end Date
                </label>
                <div className="flex w-full overflow-hidden items-center justify-between border border-gray-300 rounded-md">
                  <input
                    type="text"
                    id="rentalEndDate"
                    placeholder="Choose your rental dates"
                    value={isEndFormatted}
                    onClick={openEndCalendar} // This is the function to open the calendar
                    readOnly
                    required
                    className="relative p-2 text-[#4C5C6B] text-[16px] font-karla font-normal bg-no-repeat bg-right bg-[length:20px_20px] pr-10 outline-none"
                    style={{ width: "calc(100% - 34px)" }}
                  />
                  <div className="w-[34px] h-[30px] px-[2px] cursor-pointer">
                    <Image
                      src={calendarImg}
                      alt="Calendar Icon"
                      className="w-[100%] h-[100%]"
                      onClick={() =>
                        document.getElementById("rentalEndDate").click()
                      } // Trigger the input click when image is clicked
                    />
                  </div>
                </div>

                {showEndCalendar && (
                  <div className="absolute z-50">
                    <CustomCalendar
                      onSelectDate={handleEndDateSelect}
                      closeCalendar={closeEndCalendar}
                    />
                  </div>
                )}

                <div className="w-full text-[#525252] text-[15px] font-karla font-bold break-words mb-[15px]">
                  You need to make a one-time deposit for renting the item. The
                  deposit will be refunded post the return of the item.
                </div>
                <div className="w-full text-[#E4086F] text-[15px] font-karla font-bold underline break-words mb-[15px]">
                  View our rental policy
                </div>
                {/* <Link href="/renting"> */}
                <button
                  onClick={handleProceed}
                  className={`px-4 py-2 w-full mb-2 text-[#E4086F] text-[20px] font-karla font-bold leading-[24px] break-words flex-1 h-[60px] bg-[#FDE504] rounded-[20px] flex justify-center items-center gap-[10px] ${
                    isEndFormatted === "" || isStartFormatted === ""
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={isEndFormatted === "" || isStartFormatted === ""} // Disable the button if no date is selected
                >
                  PROCEED
                </button>
                {/* </Link> */}

                <button
                  onClick={handleCloseRentPopup}
                  className="w-full text-[#E4086F] text-[20px] font-karla font-bold leading-[24px] break-words flex-1 h-[60px] rounded-[20px] border border-[#F7B5D4] flex justify-center items-center gap-[10px]"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Offer Popup */}
      {isOfferPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white p-9 rounded-lg shadow-lg w-[500px] text-start"
            style={{
              width: "500px", // Default width for desktop
              ...(window.innerWidth <= 768 && {
                width: "90%",
                padding: "1.5rem",
              }), // Mobile responsive styling
            }}
          >
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
                style={{ color: "#070707", fontSize: "14px", fontWeight: 700 }}
              >
                AED 250
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
                flexDirection: window.innerWidth <= 768 ? "column" : "row", // Stack buttons in mobile view
              }}
            >
              <button
                className={`w-[89px] h-[41px] py-[8.66px] px-[10.93px] bg-white rounded-[6.93px] border ${
                  selectedPrice === 200 ? "border-pink-500" : "border-[#878787]"
                } inline-flex items-center justify-center gap-[8.66px]`}
                onClick={() => handlePriceSelection(200)}
                style={{
                  width: window.innerWidth <= 768 ? "100%" : "89px", // Full width for mobile
                }}
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
                style={{
                  width: window.innerWidth <= 768 ? "100%" : "89px", // Full width for mobile
                }}
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
                  style={{
                    width: window.innerWidth <= 768 ? "100%" : "245px", // Full width for mobile
                  }}
                />
              </div>
            </div>
            <div className="text-[#E4086F] text-[12px] font-karla font-bold capitalize tracking-[0.96px] break-words mt-1 mb-[30px]">
              Suggested
            </div>

            <p className="text-sm font-bold text-[#525252] mb-4 font-karla">
              You can only make one offer per item. If the seller accepts your
              offer, you’ll be notified to place the order. Other users can
              still buy the item before you.
            </p>

            <div className="justify-center flex-col">
              <button
                onClick={handleOpenModal}
                className={`bg-[#FDE504] text-[#E4086F] text-[20px] font-bold font-karla rounded-lg w-[440px] h-[65px] ${
                  isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitDisabled}
                style={{
                  width: window.innerWidth <= 768 ? "100%" : "440px", // Full width for mobile
                }}
              >
                SUBMIT
              </button>
              <button
                onClick={handleCloseOfferPopup}
                className="border-[#F7B5D4] text-[#E4086F] text-[20px] font-bold font-karla rounded-lg px-4 py-2 border w-[455px] h-[65px] mt-3"
                style={{
                  width: window.innerWidth <= 768 ? "100%" : "440px", // Full width for mobile
                }}
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
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" // Set a high z-index value
          onClick={handleCloseModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[380px] h-[230px] text-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Tick Mark */}
            <div className="flex justify-center items-center mb-5">
              <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#30BD75] border-4 border-[#9ae6b4] rounded-full">
                {/* Light green border */}
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

            {/* Title */}
            <div className="text-[rgb(11,12,30)] text-[20px] font-bold text-center font-karla leading-tight">
              <div>Your offer has been </div>
              <div> sent to the seller</div>
            </div>

            {/* Description */}
            <div className="text-[#7F808C] text-[16px] font-normal font-karla leading-tight mt-1">
              <div> Now sit back and relax while the seller</div>
              <div> takes some time to review your offer</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

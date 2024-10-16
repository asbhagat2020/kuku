"use client"; // Ensure Client-Side rendering

import Link from 'next/link';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import { useState } from "react"; // Import useState to track the modal state

export default function Renting() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="px-4 md:px-[70px] py-4 md:py-[70px]"> {/* Responsive padding */}
        {/* Title Section */}
        <div className="text-[#070707] text-[28px] md:text-[36.8px] font-normal font-luckiest leading-[34px] md:leading-[44.16px] mb-6">
          RENTING
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          {/* Left Section: Cart Section */}
          <div className="lg:w-2/3 w-full">
            {/* Product Info Section */}
            <div className="h-auto flex justify-start items-start gap-4 mb-4">
              <img
                className="w-[120px] h-[120px] md:w-[159.2px] md:h-[157.6px] rounded-[7.58px]"
                src="/Rectangle 5201 (1).png"
                alt="Product"
              />

              <div className="flex flex-col justify-start items-start gap-3 flex-grow">
                <div>
                  <div className="text-black text-[16px] md:text-[18px] font-bold font-Karla leading-[20px] md:leading-[24px]">
                    AMIRI | Men Oversize T-shirt
                  </div>
                  <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla leading-tight">
                    Lorem ipsum dolor dummy text
                  </div>
                </div>

                <div className="flex justify-start items-center gap-4">
                  {/* Size and Condition */}
                  <div className="flex justify-start items-center gap-3">
                    <div className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                      SIZE
                    </div>
                    <div className="w-[24px] h-[24px] md:w-[28.8px] md:h-[29.6px] py-2 border border-[#e4086f] flex justify-center items-center">
                      <div className="text-[#e4086f] text-[14px] md:text-[16px] font-normal font-karla">
                        OS
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start items-center gap-3">
                    <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                      CONDITION:
                    </span>
                    <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                      GOOD
                    </span>
                  </div>
                </div>

                <div className="flex justify-start mt-1 items-start gap-4">
                  <Link href="/product">
                    <button className="w-full md:w-[200px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#e4086f]">
                      <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                        Remove
                      </span>
                    </button>
                  </Link>
                  <Link href="/wishlist">
                    <button className="w-full md:w-[200px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#e4086f]">
                      <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                        Add to Wishlist
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start gap-2">
                <div className="flex justify-start items-center gap-2">
                  <div className="text-[#E4086F] text-[16px] font-bold font-karla">
                    Rental Price
                  </div>
                  <div className="text-black text-[16px] font-bold font-karla">
                    AED 70.00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Coupon and Total Section */}
          <div className="lg:w-1/4 w-full mt-4 lg:mt-0">
            <div className="w-full bg-white p-3 border border-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#4f4f4f] text-[16px] font-normal font-karla leading-[27.19px]">
                  Rental Price
                </div>
                <div className="text-[#292929] text-[16px] font-normal font-karla leading-7">
                  AED 70
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#4f4f4f] text-[16px] font-normal font-karla leading-[27.19px]">
                  Deposit
                </div>
                <div className="text-[#e4086f] text-[16px] font-normal font-karla leading-7">
                  AED 160
                </div>
              </div>
              <div className="w-full h-[1.13px] bg-[#e4e4e4] mb-2" />
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#1c1c1c] text-[18px] font-semibold font-['Inter'] mt-1">
                  Total:
                </div>
                <div className="text-[#e4086f] text-[18px] font-bold font-karla leading-7">
                  AED 160
                </div>
              </div>
              <button
                onClick={handleOpenModal}
                className="w-full h-[48px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mt-2 mb-2"
              >
                <div className="text-center text-[#070707] text-[14px] font-medium font-karla">
                  Pay Deposit
                </div>
              </button>

              <div className="flex justify-around w-full mt-3">
                <img
                  className="h-[19.2px] w-auto"
                  src="/payment1.png"
                  alt="Payment1"
                />
                <img className="h-[19.2px] w-auto" src="/mastercard.png" alt="Logo1" />
                <img className="h-[19.2px] w-auto" src="/paypal.png" alt="Logo2" />
                <img className="h-[19.2px] w-auto" src="/visa.png" alt="Logo3" />
                <img
                  className="h-[19.2px] w-auto"
                  src="/payment.png"
                  alt="Payment"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Section */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={handleCloseModal} // Close modal when clicking outside
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[380px] h-[230px] text-center"
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
                <div>Your rental request</div>
                <div>has been confirmed</div>
              </div>

              {/* Description */}
              <div className="text-[#7F808C] text-[16px] font-normal font-karla leading-tight mt-1">
                <div> Kuku team will reach out to you and let</div>
                <div> you know about the further details</div>
              </div>
            </div>
          </div>
        )}

      </div>
      <div>
        <DownloadKuku />
        <Footer />
      </div>

    </>
  );
}

"use client";

import Link from 'next/link';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";

 // Ensure Client-Side rendering

export default function Cart() {
  return (
    <>
    <Header/>
    <div className="px-[70px] py-[70px]">
      {" "}
      {/* Reduced padding */}
      {/* Title Section */}
      <div className="text-[#070707] text-[36.8px] font-normal font-luckiest leading-[44.16px] mb-6">
        YOUR CART
      </div>
      <div className="flex items-center gap-2 mt-2 mb-3">
        <label className="custom-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>

        {/* Selected Items Text */}
        <div className="text-[#4f4f4f] text-xl font-normal font-karla mb-2">
          1/1 Items selected
        </div>
      </div>
      <div className="flex lg:flex-row flex-col justify-between items-start gap-4">
        {/* Left Section: Cart Section */}
        <div className="lg:w-2/3 w-full">
          <div className="h-auto flex justify-start items-start gap-4 mb-4">
            {/* Checkbox for Product */}

            <label className="custom-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            {/* Product Image */}
            <img
              className="w-[159.2px] h-[157.6px] rounded-[7.58px]"
              src="/Rectangle 5201.png"
              alt="Product"
            />

            {/* Product Info */}
            <div className="flex flex-col justify-start items-start gap-3 flex-grow">
              {/* Product Title and Description */}
              <div>
                <div className="text-black text-[18px] font-bold font-Karla leading-[24px]">
                  AMIRI | Men Oversize T-shirt
                </div>
                <div className="text-[#b4b4b4] text-base font-normal font-karla leading-tight">
                  Lorem ipsum dolor dummy text
                </div>
              </div>

              {/* Size and Condition */}
              <div className="flex justify-start items-center gap-4">
                {/* Size */}
                <div className="flex justify-start items-center gap-3">
                  <div className="text-[#383838] text-[16px] font-bold font-karla leading-normal">
                    SIZE
                  </div>
                  <div className="w-[28.8px] h-[29.6px] py-2 border border-[#e4086f] flex justify-center items-center">
                    <div className="text-[#e4086f] text-[16px] font-normal font-karla">
                      OS
                    </div>
                  </div>
                </div>

                {/* Condition */}
                <div className="flex justify-start items-center gap-3">
                  <span className="text-[#383838] text-[16px] font-bold font-karla leading-normal">
                    CONDITION:
                  </span>
                  <span className="text-[#383838] text-[16px] font-bold font-karla leading-normal">
                    GOOD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-start mt-1 items-start gap-4">
                <button className="w-[200px] h-[50px] rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#c0075f]">
                  <span className="text-[14px] font-bold font-karla uppercase leading-snug">
                    Remove
                  </span>
                </button>
                <Link href="/wishlist">
                <button className="w-[200px] h-[50px] rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#c0075f]">
                  <span className="text-[14px] font-bold font-karla uppercase leading-snug">
                    Add to Wishlist
                  </span>
                </button>
                </Link>
              </div>
            </div>

            {/* Price and Discount */}
            <div className="flex flex-col justify-start items-start gap-2">
              <div className="flex justify-start items-center gap-1">
                <div className="text-black text-[16px] font-bold font-karla leading-[16px]">
                  AED250.00
                </div>
                <div className="text-[#30bd75] text-[16px] font-bold font-karla leading-[16px]">
                  (55% OFF)
                </div>
              </div>
              <div className="text-[#b4b4b4] text-xl font-normal font-karla line-through leading-snug">
                MRP AED650
              </div>
            </div>
          </div>
          <div>
            <button className="w-[900px] h-[50px] rounded-[16px] border-2 border-[#e4086f] justify-center items-center gap-[8.8px] inline-flex">
              <div className="text-[#e4086f] text-[14px] font-bold font-karla uppercase leading-snug">
                Add more items
              </div>
            </button>
          </div>
        </div>

        {/* Right Section: Coupon and Total Section */}
        <div className="lg:w-1/4 w-full mt-[-70px]">
          <div className="w-full h-auto bg-white shadow-md flex flex-col justify-center items-center gap-[21.6px] p-3 mb-4">
            <div className="w-full text-[#4f4f4f] text-[16px]  font-normal font-karla">
              Have a coupon?
            </div>
            <div className="flex w-full justify-start items-center gap-[17.6px] ">
              <div className="w-[200px] h-[36px] p-2 bg-white rounded-lg border border-[#f6b4d3] justify-start items-center gap-2 inline-flex ">
                <input
                  type="text"
                  placeholder="Add coupon"
                  className="text-[#515151] text-sm font-normal outline-none font-karla"
                />
              </div>
              <div className="text-center text-[#e4086f] text-[16px] font-medium font-['IBM Plex Sans']">
                Apply
              </div>
            </div>
          </div>

          {/* Pricing Summary Section */}
          <div className="w-full bg-white p-3 border border-gray-100 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[#4f4f4f] text-[16px] font-normal font-karla leading-[27.19px]">
                Subtotal:
              </div>
              <div className="text-[#292929] text-[16px] font-normal font-karla leading-7">
                AED 250
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-[#4f4f4f] text-[16px] font-normal font-karla leading-[27.19px]">
                Discount:
              </div>
              <div className="text-[#e4086f] text-[16px] font-normal font-karla leading-7">
                AED 25
              </div>
            </div>
            <div className="w-full h-[1.13px] bg-[#e4e4e4] mb-2" />
            <div className="flex justify-between items-center mb-2">
              <div className="text-[#1c1c1c] text-[18px] font-semibold font-['Inter'] mt-1">
                Total:
              </div>
              <div className="text-[#e4086f] text-[18px] font-bold font-karla leading-7">
                AED 225
              </div>
            </div>
            <button className="w-full h-[40px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mt-2 mb-2 ">
              <div className="text-center text-[#070707] text-[14px] text-base font-medium font-karla">
                Checkout
              </div>
            </button>

            {/* Images Row */}
            <div className="flex justify-around w-full mt-3">
              <img
                className="h-[19.2px] w-auto"
                src="/payment1.png"
                alt="Payment1"
              />
              <img className="h-[19.2px] w-auto" src="/Logo1.png" alt="Logo1" />
              <img className="h-[19.2px] w-auto" src="/Logo2.png" alt="Logo2" />
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
    </div>
    <DownloadKuku/>
    <Footer/>
    </>
  );
}

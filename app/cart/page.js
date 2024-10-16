"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";

export default function Cart() {
  return (
    <>
      <Header />
      <div className="px-4 py-8 md:px-8 lg:px-[70px] lg:py-[70px]">
        {/* Title Section */}
        <div className="text-[#070707] text-2xl md:text-3xl lg:text-[36.8px] font-normal font-luckiest leading-tight mb-6">
          YOUR CART
        </div>

        {/* Checkbox and Selected Items */}
        <div className="flex items-center gap-2 mb-4">
          <label className="custom-checkbox">
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
          <div className="text-[#4f4f4f] text-sm md:text-xl font-normal font-karla">
            1/1 Items selected
          </div>
        </div>

        {/* Cart and Summary Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          {/* Left Section: Cart */}
          <div className="w-full lg:w-2/3">
            <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>

              {/* Product Image */}
              <img
                className="w-24 h-auto md:w-[159.2px] rounded-md"
                src="/Rectangle 5201.png"
                alt="Product"
              />

              {/* Product Info */}
              <div className="flex flex-col justify-start items-start gap-3 w-full">
                <div>
                  <div className="text-black text-lg md:text-[18px] font-bold font-karla">
                    AMIRI | Men Oversize T-shirt
                  </div>
                  <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla">
                    Lorem ipsum dolor dummy text
                  </div>
                </div>

                <div className="flex justify-between md:justify-start items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                      SIZE
                    </div>
                    <div className="w-8 h-8 md:w-[29.6px] border border-[#e4086f] flex justify-center items-center">
                      <div className="text-[#e4086f] text-sm md:text-[16px] font-normal font-karla">
                        OS
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                      CONDITION:
                    </span>
                    <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                      GOOD
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row mt-2 gap-4 w-full">
                  <Link href="/selling-page">
                    <button className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg hover:border-white hover:text-white text-black border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]">
                      <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
                        Remove
                      </span>
                    </button>
                  </Link>
                  <Link href="/wishlist">
                    <button className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg text-black hover:border-white hover:text-white border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]">
                      <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
                        Add to Wishlist
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Price and Discount */}
              <div className="flex flex-col items-start gap-2 ml-[-15px]">
  <div className="flex items-center gap-1 mr-2"> {/* Adjusted with a negative margin */}
    <div className="text-black text-sm md:text-[16px] font-bold font-karla">
      AED250.00
    </div>
    <div className="text-[#30bd75] text-sm md:text-[16px] font-bold font-karla whitespace-nowrap">
      (55% OFF)
    </div>
  </div>
  <div className="text-[#b4b4b4] text-sm md:text-xl font-normal font-karla line-through">
    MRP AED650
  </div>
</div>

            </div>

            {/* Add More Items Button */}
            <Link href="/selling-page">
              <button className="w-full h-[40px] md:h-[50px] rounded-lg hover:text-white text-[#e4086f] hover:bg-[#e4086f] hover:border-white border-2 border-[#e4086f] flex justify-center items-center">
                <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
                  Add more items
                </span>
              </button>
            </Link>
          </div>

          {/* Right Section: Coupon and Pricing Summary */}
          <div className="w-full lg:w-1/4 mt-8 lg:mt-[-50px]">
            {/* Coupon Section */}
            <div className="bg-white border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
              <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                Have a coupon?
              </div>
              <div className="flex gap-4 mt-2">
                <input
                  type="text"
                  placeholder="Add coupon"
                  className="w-[150px] md:w-[200px] h-[36px] p-2 border border-[#b4b4b4] rounded-lg text-sm font-karla outline-[#e4086f] outline-4"
                />
                <button className="text-[#e4086f] text-sm md:text-[16px] font-medium">
                  Apply
                </button>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                  Subtotal:
                </div>
                <div className="text-[#292929] text-sm md:text-[16px] font-karla">
                  AED 250
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                  Discount:
                </div>
                <div className="text-[#e4086f] text-sm md:text-[16px] font-karla">
                  AED 25
                </div>
              </div>
              <div className="w-full h-px bg-gray-200 mb-2"></div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#1c1c1c] text-base md:text-[18px] font-semibold">
                  Total:
                </div>
                <div className="text-[#e4086f] text-base md:text-[18px] font-bold">
                  AED 225
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full h-[40px] p-2 bg-[#fde504] rounded-lg md:rounded-[16px] mt-2">
                <div className="text-center text-[#070707] text-sm md:text-[14px] font-medium">
                  Checkout
                </div>
              </button>

              {/* Payment Methods */}
              <div className="flex justify-around mt-3">
                <img className="h-5" src="/payment1.png" alt="Payment1" />
                <img className="h-5" src="/mastercard.png" alt="MasterCard" />
                <img className="h-5" src="/paypal.png" alt="PayPal" />
                <img className="h-5" src="/visa.png" alt="Visa" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DownloadKuku />
      <Footer />
    </>
  );
}

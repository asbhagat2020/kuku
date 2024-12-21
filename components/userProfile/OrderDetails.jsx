"use client";
import React from "react";

const OrderDetails = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-luckiest mb-8 text-center md:text-left">
          ORDER DETAILS
        </h1>

        {/* Order Info */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <span className="text-gray-800 font-karla text-lg font-semibold">
              Order Details #s2232msds
            </span>
            <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-karla uppercase">
              Shipping
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Date: 08/12/2025</p>
        </div>

        {/* Progress Tracker and Courier Details */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-14">
          {/* Progress Tracker */}
          <div className="flex-1 relative">
            <div className="absolute left-0 right-0 h-[2px] bg-gray-200 top-6 z-0" />
            <div className="relative z-10 flex justify-between md:gap-0 gap-6">
              {/* Step 1 */}
              <div className="flex flex-col items-start">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-karla text-sm md:text-[16px] font-semibold">
                  Order Confirmed
                </span>
                <span className="text-xs text-gray-500">
                  8:00 AM, Feb 8, 2025
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-karla text-sm md:text-[16px] font-semibold">
                  Shipping
                </span>
                <span className="text-xs text-gray-500">
                  Shipped with Fedex
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-end">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <span className="text-gray-500">3</span>
                </div>
                <span className="font-karla text-sm md:text-[16px] font-semibold ">
                  To Deliver
                </span>
                <span className="text-xs text-gray-500">
                  Estimated Date Feb 14, 2025
                </span>
              </div>
            </div>
          </div>

          {/* Courier Details */}
          <div className="w-full md:w-80 bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-black font-karla text-sm md:text-[16px] font-semibold">
                  Courier Name
                </p>
                <p className="text-gray-400 text-xs md:text-[12px]">
                  Al ameen express
                </p>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center">
                <p className="text-black font-karla text-sm md:text-[16px] font-semibold">
                  Tracking Number
                </p>
                <p className="text-gray-400 text-xs md:text-[12px]">
                  32823u923u29e2
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-karla mb-6 font-semibold text-center md:text-left">
          Item Ordered
        </h3>

        {/* Item Ordered Section */}
        <div
          className="shadow-md border border-gray-200 p-6 rounded-lg mb-10 mx-auto md:mx-0"
          style={{ maxWidth: "750px", backgroundColor: "#F7F7F6" }}
        >
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            {/* Product Image */}
            <img
              src="/orders-image.png"
              alt="White dress"
              className="w-28 h-36 object-cover rounded-lg"
            />
            {/* Product Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-karla text-sm md:text-lg flex-1 font-semibold">
                  Lorem ipsum dolor sit amet consectetur.
                </h4>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="font-karla text-sm md:text-lg font-semibold">
                      AED250.00
                    </span>
                    <span className="text-emerald-500 text-xs md:text-sm">
                      (55% OFF)
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs md:text-sm line-through">
                    MRP AED650
                  </span>
                </div>
              </div>
              <p className="text-gray-500 text-xs md:text-sm mt-2">
                Lorem ipsum dolor sit amet consectetur.
                <br />
                Sed lobortis diam.
              </p>
            </div>
          </div>

          {/* Price Details */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <div className="flex-1 ml-[450px]">
                <span className="font-karla text-gray-500 text-lg md:text-sm">
                  Product Total
                </span>
              </div>
              <span className="font-karla text-sm md:text-lg font-semibold">
                AED250.00
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <div className="flex-1 ml-[450px]">
                <span className="font-karla text-gray-500 text-lg md:text-sm">
                  Shipping Cost
                </span>
              </div>
              <span className="text-emerald-500 text-xs md:text-sm">Free</span>
            </div>
            {/* Shortened border */}
            <div
              className="border-t pt-4"
              style={{ width: "50%", marginLeft: "350px" }}
            ></div>
            <div className="flex justify-between pt-4">
              <div className="flex-1 ml-[450px]">
                <span className="font-karla text-sm md:text-lg font-semibold">
                  Total
                </span>
              </div>
              <span className="font-karla text-sm md:text-lg font-semibold">
                AED250.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

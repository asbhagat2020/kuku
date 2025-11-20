





import React from "react";

export const ReviewOffer = () => {
  return (
    <div className="max-w-[1550px] mx-auto">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[70px] py-6 md:py-[70px]">
        {/* Header */}
        <div className="text-[#070707] text-2xl sm:text-3xl md:text-[36.8px] font-normal font-luckiest leading-tight mb-6">
          Review Offer
        </div>

        {/* Card Grid - Made responsive with grid template */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#ededed]">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0 max-w-[180px] mx-auto sm:mx-0">
                <img
                  className="w-full sm:w-[180px] md:w-[130px] h-auto sm:h-[180px] md:h-[147px] rounded-[9.48px] object-cover"
                  src="/Rectangle 5201.png"
                  alt="Product"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                {/* Product Title */}
                <h2 className="text-black text-base md:text-lg font-bold font-karla truncate sm:overflow-visible sm:whitespace-normal">
                  AMIRI | Men&apos;s Oversize T-shirt
                </h2>

                {/* Product Description */}
                <p className="text-[#b4b4b4] font-karla text-sm md:text-base mt-1">
                  Lorem ipsum dollor dummy text
                </p>

                {/* Size and Condition */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-4">
                  {/* Size */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#383838] text-sm md:text-base font-bold font-karla">
                      SIZE
                    </span>
                    <div className="w-[37px] h-[37px] border border-[#e4086f] flex items-center justify-center">
                      <span className="text-[#e4086f] text-sm md:text-base font-karla">
                        OS
                      </span>
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#383838] text-sm md:text-base font-bold font-karla">
                      CONDITION:
                    </span>
                    <span className="text-[#515151] text-sm md:text-base font-bold font-karla">
                      GOOD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Buyer Info */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#ededed]">
            <div>
              <h2 className="text-black text-base md:text-[18px] font-karla font-bold mb-4">
                Buyer
              </h2>
              <div className="flex items-center justify-between gap-4 border-2 border-[#ededed] rounded-2xl p-3 md:p-4">
                {/* Buyer Image and Name */}
                <div className="flex items-center gap-2 md:gap-4">
                  <img
                    className="w-10 h-10 md:w-[52.82px] md:h-[52.82px] rounded-full"
                    src="/Ellipse 1632.png"
                    alt="Buyer"
                  />
                  <h3 className="text-black text-sm md:text-[16px] font-karla font-medium">
                    Abu Salim
                  </h3>
                </div>

                {/* Alert Icon */}
                <img
                  className="w-8 h-8 md:w-[52.82px] md:h-[52.82px] rounded-full"
                  src="/alert-circle.svg"
                  alt="alert"
                />
              </div>
            </div>
          </div>

          {/* Card 3 - Price Information */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#ededed]">
            <div>
              {/* Price Information Title */}
              <h2 className="text-black text-base md:text-[18px] font-karla font-bold text-left">
                Price Information
              </h2>

              {/* Pricing Information */}
              <div className="mt-5">
                {/* Buyer's Offer Section */}
                <div className="flex items-center justify-between">
                  <span className="text-black font-karla text-sm md:text-[16px] font-bold">
                    Buyer&apos;s Offer
                  </span>

                  <div className="flex items-center">
                    <img
                      className="w-6 h-6 md:w-[29.82px] md:h-[29.82px] rounded-full"
                      src="/dirham-coin-outline-icon 1.svg"
                      alt="coin"
                    />
                    <span className="text-[#eda702] font-karla text-sm md:text-[16px] font-bold mr-2 md:mr-8">
                      120.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Counter Offer */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#ededed]">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-black text-sm md:text-[16px] font-karla font-bold">
                  Your Counter Offer
                </span>

                <div className="flex items-center">
                  <img
                    className="w-6 h-6 md:w-[29.82px] md:h-[29.82px] rounded-full"
                    src="/dirham-coin-outline-icon 1.svg"
                    alt="coin"
                  />
                  <span className="text-[#eda702] text-sm md:text-[16px] font-karla font-bold mr-2 md:mr-8">
                    140.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-end items-center gap-4 mt-8 mb-4">
          {/* Reject Button */}
          <button className="w-full sm:w-[180px] md:w-[200px] h-[50px] md:h-[60px] rounded-[20px] border-2 border-[#383838] flex justify-center items-center gap-[11px] transition-colors hover:bg-[#383838] hover:text-white">
            <span className="text-[#070707] text-lg md:text-xl font-bold font-karla uppercase leading-snug">
              Reject
            </span>
          </button>

          {/* Accept Button */}
          <button className="w-full sm:w-[180px] md:w-[200px] h-[50px] md:h-[60px] bg-[#fde504] rounded-[20px] border-2 flex justify-center items-center gap-[11px] transition-colors hover:bg-[#b2b200]">
            <span className="text-[#070707] text-lg md:text-xl font-bold font-karla uppercase leading-snug">
              Accept
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

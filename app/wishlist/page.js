"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";

 // Ensure Client-Side rendering

export default function Wishlist() {
  return (
    <>
    <Header/>
    <div className="px-[70px] py-[70px]">
      <div className="text-[#070707] text-[36.8px] font-normal font-luckiest Guy leading-[44.16px] mb-6">
        YOUR WISHLIST
      </div>
      <div className="lg:w-full w-full">
        <div className="h-auto flex justify-start items-start gap-4 mb-4">
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
              <button className="w-[200px] h-[50px] rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#fde504]">
                <span className="text-[14px] font-bold font-karla uppercase leading-snug">
                  Add To Bag
                </span>
              </button>
            </div>
          </div>

          {/* Price and Discount */}
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="flex justify-start items-center gap-2">
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
      </div>
    </div>
    <DownloadKuku/>
    <Footer/>
    </>
  );
}

"use client";

import Link from 'next/link';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import { useRouter } from "next/navigation";
import { useEffect} from "react";
import { useSelector } from "react-redux";

export default function Wishlist() {

  const token = useSelector((store)=>store.auth.token)
const router = useRouter()
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);
  return (
    <>
      <Header />
      <div className="px-4 md:px-[70px] py-4 md:py-[70px]"> {/* Responsive padding */}
        <div className="text-[#070707] text-[24px] md:text-[36.8px] font-normal font-luckiest leading-[30px] md:leading-[44.16px] mb-6">
          YOUR WISHLIST
        </div>
        <div className="w-full">
          <div className="h-auto flex flex-col md:flex-row justify-start items-start gap-4 mb-4"> {/* Responsive layout */}
            {/* Product Image */}
            <img
              className="w-[120px] h-[120px] md:w-[159.2px] md:h-[157.6px] rounded-[7.58px]"  // Responsive image size
              src="/Rectangle 5201.png"
              alt="Product"
            />

            {/* Product Info */}
            <div className="flex flex-col justify-start items-start gap-3 flex-grow">
              {/* Product Title and Description */}
              <div>
                <div className="text-black text-[16px] md:text-[18px] font-bold font-Karla leading-[20px] md:leading-[24px]">
                  AMIRI | Men Oversize T-shirt
                </div>
                <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla leading-tight">
                  Lorem ipsum dolor dummy text
                </div>
              </div>

              {/* Size and Condition */}
              <div className="flex justify-start items-center gap-4">
                {/* Size */}
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

                {/* Condition */}
                <div className="flex justify-start items-center gap-3">
                  <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                    CONDITION:
                  </span>
                  <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                    GOOD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row justify-start mt-1 items-start gap-4">
                <Link href="/selling-page">
                  <button className="w-[160px] md:w-[200px] h-[45px] md:h-[50px] rounded-[14px] hover:border-white hover:text-white hover:bg-[#e4086f] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex">
                    <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                      Remove
                    </span>
                  </button>
                </Link>
                <Link href="/cart">
                  <button className="w-[160px] md:w-[200px] h-[45px] md:h-[50px] rounded-[14px] hover:border-white hover:text-white text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#fde504]">
                    <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                      Add To Bag
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Price and Discount */}
            <div className="flex flex-col justify-start items-start gap-2">
              <div className="flex justify-start items-center gap-2">
                <div className="text-black text-[14px] md:text-[16px] font-bold font-karla leading-[16px]">
                  AED250.00
                </div>
                <div className="text-[#30bd75] text-[14px] md:text-[16px] font-bold font-karla leading-[16px]">
                  (55% OFF)
                </div>
              </div>
              <div className="text-[#b4b4b4] text-sm md:text-xl font-normal font-karla line-through leading-snug">
                MRP AED650
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

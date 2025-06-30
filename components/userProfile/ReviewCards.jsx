"use client";
import { useState } from "react";
import Image from "next/image";
import { IoPencil } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { ReviewItem } from "./ReviewItem";
import AddModal from "./AddModal";


export const ReviewCards = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const dataIn = data.reviews;

  const handleSort = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
    console.log(`Sorting by: ${order}`);
  };

  return (
    <div className="px-[20px] lg:px-[71px]">
      <div className="flex">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-center text-neutral-900 lg:text-2xl font-bold font-karla leading-[28.80px]">
              Customer Reviews
            </p>
            <div className="flex items-center justify-center gap-2">
              <Image
                width={26}
                height={26}
                src="/rating.svg"
                alt="Rating Icon"
              />
              <p className="text-center text-[#9c9c9c] text-[26.92px] font-normal font-karla leading-loose">
                {dataIn?.reviews?.length > 0
                  ? (
                    dataIn.reduce(
                      (total, item) => total + (item.rating || 0),
                      0
                    ) / dataIn.length
                  ).toFixed(1)
                  : 0}
                {" "}Rating
              </p>
              <div className="w-2 h-2 rounded-full bg-[#9c9c9c]"></div>
              <div className="text-center text-[#9c9c9c] lg:text-[26.92px] font-normal font-karla leading-loose">
                {dataIn.length > 0 ? `${dataIn.length} Reviews` : "No Reviews"}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-5 relative font-karla font-bold w-[300px]">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Image
                unoptimized
                width={30}
                height={16}
                src="/sort.svg"
                className=""
                alt=""
              />
              <p>Sort by</p>
            </div>

            {!data.self && (
              <>
                <div className="w-5 rotate-90 h-[1px] bg-gray-400"></div>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  <IoPencil className="text-xl" />
                  <span className="text-sm font-weight: 900 text-gray-700">
                    Add Review
                  </span>
                </div>
              </>
            )}

            <AddModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Add Review"
            />

            {isDropdownOpen && (
              <div className="absolute top-[100%] right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-[200px] z-50">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSort("lowToHigh")}
                >
                  Ratings: Low to High
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSort("highToLow")}
                >
                  Ratings: High to Low
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="py-[56px] flex flex-col gap-[56px] pl-5">
        {[1].map((_, index) => (
          <ReviewItem key={index} data={dataIn} />
        ))}
      </div>
    </div>
  );
};

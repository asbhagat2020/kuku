"use client";
import Image from "next/image";
import { useState } from "react";

const ReviewItem = ({ data, canEdit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const getTimeDifference = (createdAt) => {
    const now = new Date(); // Current time: 01:30 AM IST, July 23, 2025
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-[337px] flex-col justify-start items-start gap-[30px] flex shadow rounded-lg px-[20px] lg:px-[56px] py-[30px]">
      <div className="self-stretch justify-between items-center xl:gap-[661px] gap-10 inline-flex">
        <div className="justify-start items-center gap-[18px] flex">
          <Image
            width={60}
            height={60}
            src={data.buyerImage || "/profile_image.svg"}
            alt={`${data.buyerUsername || "Anonymous"}'s Profile`}
            className="rounded-full"
          />
          <div className="text-black lg:text-xl font-medium font-karla leading-normal">
            {data.buyerUsername || "Anonymous"}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                width={26}
                height={26}
                src={i < data.rating ? "/rating.svg" : "/star_gray.svg"}
                alt="Rating"
              />
            ))}
          </div>
          <div className="text-[#9c9c9c] text-sm">{getTimeDifference(data.createdAt)}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="self-stretch text-[#9c9c9c] lg:text-2xl font-normal font-karla leading-9">
          {data.description || "No description available."}
        </div>
        <div className="flex gap-3 pt-[30px]">
          {data.productImage?.map((img, imgIndex) => (
            <Image
              key={imgIndex}
              src={img}
              alt={`Product Image ${imgIndex + 1}`}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
      {/* {canEdit && (
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Edit Review
        </button>
      )} */}
    </div>
  );
};

export default ReviewItem;
"use client";
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewItem = ({ data }) => {
  console.log(data,"rrrrrrr");
  const [reviews, setReviews] = useState(data || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-[337px] flex-col justify-start items-start gap-[30px] flex shadow rounded-lg px-[20px] lg:px-[56px] py-[30px]">
      {reviews?.map((item, index) => (
        <div key={index}>
          <div className="self-stretch justify-between items-center xl:gap-[661px] gap-10 inline-flex">
            <div className="justify-start items-center gap-[18px] flex">
              <Image
                width={60}
                height={60}
                src={item.buyer.avatar || '/profile_image.svg'}
                alt="Profile Image"
              />
              <div className="text-black lg:text-xl font-medium font-karla leading-normal">
                {item.buyer.username}
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    width={26}
                    height={26}
                    src={i < item.rating ? '/rating.svg' : '/star_gray.svg'}
                    alt="Rating"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="self-stretch text-[#9c9c9c] lg:text-2xl font-normal font-karla leading-9">
              {item.description || "No description available."}
            </div>
            <div className="flex gap-3 pt-[30px]">
              {item.images?.map((img, imgIndex) => (
                <Image
                  key={imgIndex}
                  src={img}
                  alt={`Product Image ${imgIndex + 1}`}
                  width={100}
                  height={100}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewItem;

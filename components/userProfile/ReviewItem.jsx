"use client"
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewItem = ({ user }) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState(null);

  const fetchReviewDetails = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/get/${user._id}`;
      const response = await axios.get(url);
      setReview(response.data.reviews);
    } catch (err) {
      setError("Failed to fetch review details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchReviewDetails();
    }
  }, [user]); // Fetch details whenever user changes

  return (
    <div className="min-h-[337px] flex-col justify-start items-start gap-[30px] flex shadow rounded-lg px-[20px] lg:px-[56px] py-[30px]">
      <div className="self-stretch justify-between items-center xl:gap-[661px] gap-10 inline-flex">
        <div className="justify-start items-center gap-[18px] flex">
          <Image width={60} height={60} src='/profile_image.svg' alt='Profile Image' />
          <div className="text-black lg:text-xl font-medium font-karla leading-normal">{review?.buyer?.username}</div>
        </div>
        <div className="flex gap-5">
          <div className='flex gap-2'>
            <Image width={26} height={26} src='/rating.svg' alt='Rating' />
            <Image width={26} height={26} src='/rating.svg' alt='Rating' />
            <Image width={26} height={26} src='/rating.svg' alt='Rating' />
            <Image width={26} height={26} src='/star_gray.svg' alt='Rating' />
            <Image width={26} height={26} src='/star_gray.svg' alt='Rating' />
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className="self-stretch text-[#9c9c9c] lg:text-2xl font-normal font-karla leading-9">
          This trendy T-shirt is very comfortable for me to use. I like it very much!!!
        </div>
        <div className='flex gap-3 pt-[30px]'>
          <Image src='/card_image1.png' alt='Product Image' width={100} height={100}/>
          <Image src='/card_image1.png' alt='Product Image' width={100} height={100}/>
          <Image src='/card_image1.png' alt='Product Image' width={100} height={100}/>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;

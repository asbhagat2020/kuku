"use client";

import Link from 'next/link';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Wishlist () {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = useSelector((store) => store.auth.token)

  const router = useRouter()
  // useEffect(() => {
  //   if (!token) {
  //     router.push("/");
  //   }
  // }, [token]);

  const handleRemove = async (id) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/wishlist/${id}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(response.data.wishlist);
      console.log(response.data, "Wish Data");


    } catch(err) {
      setError("Failed to fetch Wishlist details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (id) => {
    try {

      const token = JSON.parse(Cookies.get('auth'));


      // Make the POST request to your API
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/add/cart/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } // or any other data you need to send
      );

      if(response.status === 201) {
        // If the request is successful, dispatch the action to add to cart


        // Navigate to the cart page
        router.push('/cart');
      } else {
        // Handle the case where the request is not successful
        console.error('Failed to add product to wishlist:', response.statusText);
        setErrorMessage(`Failed to submit offer: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch(error) {
      // Handle any errors that occur during the request
      console.error('An error occurred while adding product to wishlist:', error);
      setErrorMessage(` ${error.response?.data?.message || error.message}`);
      setErrorPopupOpen(true);
    }
  }

  const fetchWishlist = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get/wishlist`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(response.data.wishlist);

    } catch(err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchWishlist();

  }, []);

  return (
    <>
      <Header />
      <div className="px-4 md:px-[70px] py-4 md:py-[70px]"> {/* Responsive padding */}
        <div className="text-[#070707] text-[24px] md:text-[36.8px] font-normal font-luckiest leading-[30px] md:leading-[44.16px] mb-6">
          YOUR WISHLIST
        </div>
        <div className="w-full">
          {/* Check if wishlist is an array and has items */}
          {Array.isArray(wishlist) && wishlist.length > 0 ? (
            wishlist.map((item, index) => (
              <div key={index} className="h-auto flex flex-col md:flex-row justify-start items-start gap-4 mb-4">
                {/* Product Image */}
                <img
                  className="w-[120px] h-[120px] md:w-[159.2px] md:h-[157.6px] rounded-[7.58px]"
                  src={item?.images[0]}
                  alt="Product"
                />

                {/* Product Info */}
                <div className="flex flex-col justify-start items-start gap-3 flex-grow">
                  {/* Product Title and Description */}
                  <div>
                    <div className="text-black text-[16px] md:text-[18px] font-bold font-Karla leading-[20px] md:leading-[24px]">
                      {item?.name}
                    </div>
                    <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla leading-tight">
                      {item?.description}
                    </div>
                  </div>

                  {/* Size and Condition */}
                  <div className="flex justify-start items-center gap-4">
                    {/* Size */}
                    <div className="flex justify-start items-center gap-3">
                      <div className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                        SIZE
                      </div>
                      <div className="py-2 border border-[#e4086f] flex justify-center items-center min-w-[28.8px] min-h-[28.8px] px-3">
                        <div className="text-[#e4086f] text-[14px] md:text-[16px] font-normal font-karla">
                          {item?.size}
                        </div>
                      </div>
                    </div>

                    {/* Condition */}
                    <div className="flex justify-start items-center gap-3">
                      <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                        CONDITION:
                      </span>
                      <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                        {item?.condition}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row justify-start mt-1 items-start gap-4">
                    {/* <Link href="/selling-page"> */}
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="w-[160px] md:w-[200px] h-[45px] md:h-[50px] rounded-[14px] hover:border-white hover:text-white hover:bg-[#e4086f] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex">
                      <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                        Remove
                      </span>
                    </button>
                    {/* </Link> */}
                    {/* <Link href="/cart"> */}
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      className="w-[160px] md:w-[200px] h-[45px] md:h-[50px] rounded-[14px] hover:border-white hover:text-white text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#fde504]">
                      <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                        Add To Bag
                      </span>
                    </button>
                    {/* </Link> */}
                  </div>
                </div>

                {/* Price and Discount */}
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="flex justify-start items-center gap-2">
                    <div className="text-black text-[14px] md:text-[16px] font-bold font-karla leading-[16px]">
                      {item?.price}
                    </div>
                    <div className="text-[#30bd75] text-[14px] md:text-[16px] font-bold font-karla leading-[16px]">
                      {item?.discount}
                    </div>
                  </div>
                  <div className="text-[#b4b4b4] text-sm md:text-xl font-normal font-karla line-through leading-snug">
                    MRP {item?.mrp}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No items in your wishlist</div>
          )}
          {errorPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <p className="text-red-600 font-semibold text-center">
                  {errorMessage}
                </p>
                <button
                  onClick={() => setErrorPopupOpen(false)}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <DownloadKuku />
      <Footer />
    </>
  );


}

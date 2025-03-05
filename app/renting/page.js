"use client";

import Link from 'next/link';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import axios from "axios";
import Cookies from "js-cookie";

export default function Renting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rentalProducts, setRentalProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const router = useRouter();

  const fetchRentalProducts = async () => {
    try {
      const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rental-products`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setRentalProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch rental products:", error);
    }
  };

  useEffect(() => {
    fetchRentalProducts();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/selling-page");
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(rentalProducts.map(product => product._id));
    }
    setSelectAll(!selectAll);
  };

  const calculateTotalPrice = () => {
    return rentalProducts
      .filter(product => selectedProducts.includes(product._id))
      .reduce((total, product) => total + product.price, 0);
  };

  return (
    <>
      <Header />
      <div className="px-4 md:px-[70px] py-4 md:py-[70px]">
        <div className="text-[#070707] text-[28px] md:text-[36.8px] font-normal font-luckiest leading-[34px] md:leading-[44.16px] mb-6">
          RENTING
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="lg:w-2/3 w-full">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="form-checkbox h-5 w-5 text-pink-500 border-2 border-pink-500 rounded focus:ring-pink-500"
              />
              <span className="ml-2 text-black text-[16px] font-bold font-karla">Select All</span>
            </div>
            {rentalProducts.map((product) => (
              <div key={product._id} className="h-auto flex flex-col md:flex-row justify-start items-start gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleProductSelect(product._id)}
                    className="form-checkbox h-5 w-5 text-pink-500 border-2 border-pink-500 rounded focus:ring-pink-500"
                  />
                </div>
                <img
                  className="w-[120px] h-[120px] md:w-[159.2px] md:h-[157.6px] rounded-[7.58px]"
                  src={product.images[0]}
                  alt={product.name}
                />
                <div className="flex flex-col justify-start items-start gap-3 flex-grow">
                  <div>
                    <div className="text-black text-[16px] md:text-[18px] font-bold font-Karla leading-[20px] md:leading-[24px]">
                      {product.name}
                    </div>
                    <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla leading-tight">
                      {product.description}
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-4">
                    <div className="flex justify-start items-center gap-3">
                      <div className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                        SIZE
                      </div>
                      <div className="min-w-[24px] px-2 py-1 border border-[#e4086f] flex justify-center items-center">
                        <div className="text-[#e4086f] text-[14px] md:text-[16px] font-normal font-karla whitespace-nowrap">
                          {product.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-3">
                      <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                        CONDITION:
                      </span>
                      <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                        {product.condition}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-start mt-1 items-start gap-4">
                    <button className="w-full md:w-[200px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#e4086f] p-2">
                      <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                        Remove
                      </span>
                    </button>
                    <button className="w-full md:w-[200px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#e4086f] p-2">
                      <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                        Add to Wishlist
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="flex justify-start items-center gap-2">
                    <div className="text-[#E4086F] text-[16px] font-bold font-karla">
                      Rental Price
                    </div>
                    <div className="text-black text-[16px] font-bold font-karla">
                      AED {product.price}
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <div className="text-[#E4086F] text-[16px] font-bold font-karla">
                      From -
                    </div>
                    <div className="text-black text-[16px] font-bold font-karla">
                      {startDate}
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <div className="text-[#E4086F] text-[16px] font-bold font-karla">
                      To -
                    </div>
                    <div className="text-black text-[16px] font-bold font-karla">
                      {endDate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/4 w-full mt-4 lg:mt-0">
            <div className="w-full bg-white p-3 border border-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#4f4f4f] text-[16px] font-normal font-karla leading-[27.19px]">
                  Rental Price
                </div>
                <div className="text-[#292929] text-[16px] font-normal font-karla leading-7">
                  AED {calculateTotalPrice()}
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#4f4f4f] text-[16px] font-normal font-karla leading-[27.19px]">
                  Deposit
                </div>
                <div className="text-[#e4086f] text-[16px] font-normal font-karla leading-7">
                  AED 0
                </div>
              </div>
              <div className="w-full h-[1.13px] bg-[#e4e4e4] mb-2" />
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#1c1c1c] text-[18px] font-semibold font-['Inter'] mt-1">
                  Total:
                </div>
                <div className="text-[#e4086f] text-[18px] font-bold font-karla leading-7">
                  AED {calculateTotalPrice()}
                </div>
              </div>
              <button
                onClick={handleOpenModal}
                className="w-full h-[48px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mt-2 mb-2"
              >
                <div className="text-center text-[#070707] text-[14px] font-bold font-karla">
                  Pay Deposit
                </div>
              </button>
              <div className="flex justify-around w-full mt-3">
                <img
                  className="h-[19.2px] w-auto"
                  src="/payment1.png"
                  alt="Payment1"
                />
                <img className="h-[19.2px] w-auto" src="/mastercard.png" alt="Logo1" />
                <img className="h-[19.2px] w-auto" src="/paypal.png" alt="Logo2" />
                <img className="h-[19.2px] w-auto" src="/visa.png" alt="Logo3" />
                <img
                  className="h-[19.2px] w-auto"
                  src="/payment.png"
                  alt="Payment"
                />
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[380px] h-[230px] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center items-center mb-5">
                <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#30BD75] border-4 border-[#9ae6b4] rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12l5 5L20 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-[20px] md:text-[24px] font-bold font-karla mb-4">
                Successfully paid deposit!
              </div>
              <div className="text-[#6B6B6B] text-[14px] md:text-[16px] mb-8">
                Thank you for your payment. Your transaction is complete.
              </div>
              <button
                onClick={handleCloseModal}
                className="w-full h-[48px] bg-[#e4086f] rounded-[14px] text-white"
              >
                Go to Selling Page
              </button>
            </div>
          </div>
        )}
      </div>
      <DownloadKuku />
      <Footer />
    </>
  );
}
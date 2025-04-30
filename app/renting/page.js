
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
      <div className="max-w-[1550px] mx-auto">
        <div className="px-4 sm:px-6 md:px-[50px] lg:px-[70px] py-4 md:py-[50px] lg:py-[70px]">
          <div className="text-[#070707] text-[28px] md:text-[36.8px] font-normal font-luckiest leading-[34px] md:leading-[44.16px] mb-6">
            RENTING
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            {/* Products Section - Increased padding on smaller screens, better width control */}
            <div className="w-full lg:w-[68%] xl:w-2/3">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="form-checkbox h-5 w-5 text-pink-500 border-2 border-pink-500 rounded focus:ring-pink-500"
                />
                <span className="ml-2 text-black text-[16px] font-bold font-karla">Select All</span>
              </div>
              
              {/* Product cards with improved responsive layout */}
              {rentalProducts.map((product) => (
                <div key={product._id} className="flex flex-col sm:flex-row justify-start items-start gap-4 mb-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center self-start pt-1">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleProductSelect(product._id)}
                      className="form-checkbox h-5 w-5 text-pink-500 border-2 border-pink-500 rounded focus:ring-pink-500"
                    />
                  </div>
                  
                  {/* Product image with consistent sizing */}
                  <img
                    className="w-[120px] h-[120px] sm:w-[130px] sm:h-[130px] md:w-[159.2px] md:h-[157.6px] rounded-[7.58px] object-cover"
                    src={product.images[0]}
                    alt={product.name}
                  />
                  
                  {/* Product details with better wrapping */}
                  <div className="flex flex-col justify-start items-start gap-2 sm:gap-3 flex-grow min-w-0">
                    <div className="w-full">
                      <div className="text-black text-[16px] md:text-[18px] font-bold font-Karla leading-[20px] md:leading-[24px]">
                        {product.name}
                      </div>
                      <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla leading-tight">
                        {product.description}
                      </div>
                    </div>
                    
                    {/* Size and condition with better wrapping for small screens */}
                    <div className="flex flex-wrap justify-start items-center gap-x-4 gap-y-2 w-full">
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
                    
                    {/* Buttons with better responsive spacing */}
                    <div className="flex flex-wrap sm:flex-nowrap justify-start items-start gap-2 sm:gap-4 w-full">
                      <button className="flex-1 min-w-[110px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center inline-flex hover:bg-[#e4086f] p-2">
                        <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                          Remove
                        </span>
                      </button>
                      <button className="flex-1 min-w-[110px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center inline-flex hover:bg-[#e4086f] p-2">
                        <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                          Add to Wishlist
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Price and date info with better alignment */}
                  <div className="flex flex-col justify-start items-start gap-2 pt-2 sm:pt-0 w-full sm:w-auto">
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
            
            {/* Order summary sidebar with improved sticky positioning */}
            <div className="w-full sm:w-[400px] md:w-[350px] lg:w-[30%] xl:w-1/4 mt-6 lg:mt-10 sticky top-4">
              <div className="w-full bg-white p-4 border border-gray-100 rounded-lg shadow-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-[#4f4f4f] text-[16px] font-normal font-karla">
                    Rental Price
                  </div>
                  <div className="text-[#292929] text-[16px] font-normal font-karla">
                    AED {calculateTotalPrice()}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="text-[#4f4f4f] text-[16px] font-normal font-karla">
                    Deposit
                  </div>
                  <div className="text-[#e4086f] text-[16px] font-normal font-karla">
                    AED 0
                  </div>
                </div>
                
                <div className="w-full h-[1.13px] bg-[#e4e4e4] mb-3" />
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[#1c1c1c] text-[18px] font-semibold font-['Inter']">
                    Total:
                  </div>
                  <div className="text-[#e4086f] text-[18px] font-bold font-karla">
                    AED {calculateTotalPrice()}
                  </div>
                </div>
                
                <button
                  onClick={handleOpenModal}
                  className="w-full h-[48px] p-2 bg-[#fde504] rounded-[16px] justify-center items-center mb-3 hover:bg-[#e9d300] transition-colors"
                >
                  <div className="text-center text-[#070707] text-[14px] font-bold font-karla">
                    Pay Deposit
                  </div>
                </button>
                
                <div className="flex justify-around w-full items-center mt-3">
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
          
          {/* Success modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={handleCloseModal}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[380px] max-w-md h-auto min-h-[230px] text-center"
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
                <div className="text-[#6B6B6B] text-[14px] md:text-[16px] mb-6">
                  Thank you for your payment. Your transaction is complete.
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-full h-[48px] bg-[#e4086f] rounded-[14px] text-white hover:bg-[#c40761] transition-colors"
                >
                  Go to Selling Page
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
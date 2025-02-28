"use client"; // Ensure Client-Side rendering

import Link from 'next/link';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import { useState, useEffect } from "react"; // Import useState to track the modal state
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Renting() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [rentalProducts, setRentalProducts] = useState([]); // State to store rental products
  const [selectedProducts, setSelectedProducts] = useState([]); // State to store selected products
  const [selectAll, setSelectAll] = useState(false); // State to track select all checkbox

  const router = useRouter();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/selling-page");
  };

  useEffect(() => {
    const fetchRentalProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/rental`);
        setRentalProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch rental products:", error);
      }
    };

    fetchRentalProducts();
  }, []);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(rentalProducts.map((product) => product._id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, productId) => {
      const product = rentalProducts.find((product) => product._id === productId);
      return total + product.price;
    }, 0);
  };

  // Function to parse and format the date
  // const formatDate = (dateValue) => {
  //   if (!dateValue) return "Invalid Date";

  //   let date;
  //   // Check if the dateValue is a timestamp (number)
  //   if (!isNaN(dateValue)) {
  //     date = new Date(parseInt(dateValue));
  //   } else {
  //     // Assume it's a date string
  //     date = new Date(dateValue);
  //   }

  //   // Check if the date is valid
  //   if (isNaN(date.getTime())) return "Invalid Date";

  //   // Format as DD/MM/YYYY
  //   return date.toLocaleDateString('en-GB');
  // };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Invalid Date";
  
    let date;
    // Check if the dateValue is a timestamp (number)
    if (!isNaN(dateValue)) {
      date = new Date(parseInt(dateValue));
    } else {
      // Assume it's a date string (e.g., ISO format)
      date = new Date(dateValue);
    }
  
    // Check if the date is valid
    if (isNaN(date.getTime())) return "Invalid Date";
  
    // Format as DD/MM/YYYY
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  
  return (
    <>
      <Header />
      <div className="px-4 md:px-[70px] py-4 md:py-[70px]"> {/* Responsive padding */}
        {/* Title Section */}
        <div className="text-[#070707] text-[28px] md:text-[36.8px] font-normal font-luckiest leading-[34px] md:leading-[44.16px] mb-6">
          RENTING
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          {/* Left Section: Cart Section */}
          <div className="lg:w-2/3 w-full">
            {/* Product Info Section */}
            <div className="flex justify-between items-center mb-4">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-4 h-4 text-[#e4086f] bg-white rounded border-gray-300 focus:ring-[#e4086f]"
              />
              <span className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                Select All
              </span>
            </div>
            {rentalProducts.map((product) => {
              
              // Extract startDate and endDate from the rent array
              const rentDetails = product.rent[0]; // Assuming the first entry is the active rental
              const startDate = rentDetails?.startDate;
              const endDate = rentDetails?.endDate;

              return (
                <div key={product._id} className="h-auto flex flex-col md:flex-row justify-start items-start gap-4 mb-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleSelectProduct(product._id)}
                    className="w-4 h-4 text-[#e4086f] bg-white rounded border-gray-300 focus:ring-[#e4086f]"
                  />
                  <img
                    className="w-[120px] h-[120px] md:w-[159.2px] md:h-[157.6px] rounded-[7.58px]"
                    src={product.images[0]} // Use the first image in the images array
                    alt="Product"
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

                    <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4">
                      {/* Size and Condition */}
                      <div className="flex justify-start items-center gap-3">
                        <div className="text-[#383838] text-[14px] md:text-[16px] font-bold font-karla leading-normal">
                          SIZE
                        </div>
                        <div className="w-[100px] h-[24px] md:w-[120px] md:h-[29.6px] py-2 border border-[#e4086f] flex justify-center items-center">
                          <div className="text-[#e4086f] text-[14px] md:text-[16px] font-normal font-karla">
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

                    <div className="flex flex-col md:flex-row justify-start mt-1 items-start gap-4">
                      <Link href="/product">
                        <button className="w-full md:w-[200px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#e4086f] p-2">
                          <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                            Remove
                          </span>
                        </button>
                      </Link>
                      <Link href="/wishlist">
                        <button className="w-full md:w-[200px] h-[40px] md:h-[50px] hover:text-white hover:border-white rounded-[14px] text-black border-2 border-[#0f0f0f] justify-center items-center gap-[8.8px] inline-flex hover:bg-[#e4086f] p-2">
                          <span className="text-[12px] md:text-[14px] font-bold font-karla uppercase leading-snug">
                            Add to Wishlist
                          </span>
                        </button>
                      </Link>
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
                        {formatDate(startDate)} {/* Use the formatDate function */}
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <div className="text-[#E4086F] text-[16px] font-bold font-karla">
                        To -
                      </div>
                      <div className="text-black text-[16px] font-bold font-karla">
                        {formatDate(endDate)} {/* Use the formatDate function */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Section: Coupon and Total Section */}
          <div className="lg:w-1/4 w-full mt-4 lg:mt-0">
            <div className="w-full bg-white p-3 border border-gray-100 rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#4f4f4f] text-[16px] font-normal font-karla leading-[27.19px]">
                  Rental Price
                </div>
                <div className="text-[#292929] text-[16px] font-normal font-karla leading-7">
                  AED {calculateTotal()}
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#4f4f4f] text-[16px] font-normal font-karla leading-[27.19px]">
                  Deposit
                </div>
                <div className="text-[#e4086f] text-[16px] font-normal font-karla leading-7">
                  AED {calculateTotal()}
                </div>
              </div>
              <div className="w-full h-[1.13px] bg-[#e4e4e4] mb-2" />
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#1c1c1c] text-[18px] font-semibold font-['Inter'] mt-1">
                  Total:
                </div>
                <div className="text-[#e4086f] text-[18px] font-bold font-karla leading-7">
                  AED {calculateTotal()}
                </div>
              </div>
              <button
                onClick={handleOpenModal}
                className="w-full h-[48px] bg-[#e4086f] rounded-[14px] text-white"
              >
                Pay Deposit
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

        {/* Modal Section */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={handleCloseModal} // Close modal when clicking outside
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[380px] h-[230px] text-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              {/* Tick Mark */}
              <div className="flex justify-center items-center mb-5">
                <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#30BD75] border-4 border-[#9ae6b4] rounded-full">
                  {/* Light green border */}
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

              {/* Modal Title */}
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
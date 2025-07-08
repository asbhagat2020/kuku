

"use client";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { OfferPopup } from "../OfferPopup";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const innerSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  customPaging: (i) => (
    <div
      className={`custom-dot`}
      style={{
        height: "5px",
        borderRadius: "20px",
        background: "rgba(235, 235, 228, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        marginTop: "-100px",
      }}
    />
  ),
  appendDots: (dots) => (
    <div
      style={{
        padding: "15px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ul style={{ display: "flex", gap: "5px" }}> {dots} </ul>
    </div>
  ),
};

export const SellingProducts = ({ data }) => {
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All'); // New state for filter
  
  const token = JSON.parse(Cookies.get("auth"));
  const wishlist = useSelector((state) => state.wishlist.items);

  // Handle both direct array and API response object
  const productsData = Array.isArray(data) ? data : (data?.products || []);

  // Filter options with their corresponding approval statuses
  const filterOptions = [
    { label: 'All Products', value: 'All' },
    { label: 'Approved Products', value: 'Accepted' },
    { label: 'Pending Products', value: 'Pending' },
    { label: 'Rejected Products', value: 'Rejected' }
  ];

  // Filter data based on selected filter
  const filteredData = productsData?.filter(product => {
    if (activeFilter === 'All') return true;
    return product.approval?.status === activeFilter;
  }) || [];

  // Get count for each filter type
  const getFilterCount = (status) => {
    if (status === 'All') return productsData?.length || 0;
    return productsData?.filter(product => product.approval?.status === status).length || 0;
  };

  // Debug logging
  console.log('Original data:', data);
  console.log('Products data:', productsData);
  console.log('Filtered data:', filteredData);
  console.log('Active filter:', activeFilter);

  const handleOpenOfferPopup = (id, seller) => {
    setSelectedProductId(id);
    setSelectedSellerId(seller);
    setIsOfferPopupOpen(true);
  };

  const handleCloseOfferPopup = () => {
    setIsOfferPopupOpen(false);
  };

  const handleOfferSubmit = async (price) => {
    console.log("Offer submitted with price:", price);

    if (!selectedProductId) {
      console.error("No product ID selected.");
      return;
    }

    try {
      const data = { offerPrice: price, seller: selectedSellerId };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/add/${selectedProductId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setOfferSubmitted(true);
        handleCloseOfferPopup();
      }
    } catch (error) {
      console.error("An error occurred while submitting the offer:", error.message);
    }
  };

  return (
    <div className="px-[71px] mb-10">
      {/* Breadcrumb Filter Component */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
          {filterOptions.map((option, index) => {
            const count = getFilterCount(option.value);
            const isActive = activeFilter === option.value;
            
            return (
              <div key={option.value} className="flex items-center">
                <button
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-custom-yellow text-black shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {option.label}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isActive 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
                {/* Add separator arrow except for last item */}
                {index < filterOptions.length - 1 && (
                  <svg 
                    className="w-4 h-4 mx-2 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Status indicator */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredData.length} of {productsData?.length || 0} products
          {activeFilter !== 'All' && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {filterOptions.find(opt => opt.value === activeFilter)?.label}
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative">
        {filteredData.length > 0 ? (
          filteredData.map((card) => (
            <div key={card._id} className="flex flex-col">
              {/* Approval Status Badge */}
              <div className="relative">
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium z-10 ${
                  card.approval?.status === 'Accepted' 
                    ? 'bg-green-100 text-green-800'
                    : card.approval?.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {card.approval?.status || 'Unknown'}
                </div>
                
                <Link href="/wishlist">
                  <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10">
                    {wishlist.includes(card._id) ? (
                      <FcLike className="text-2xl text-red-500" />
                    ) : (
                      <GoHeart className="text-2xl text-gray-300" />
                    )}
                  </div>
                </Link>
                
                <Slider {...innerSliderSettings}>
                  {card.images.map((imgSrc, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="w-[307px] h-[420px] flex items-center justify-center overflow-hidden rounded-md"
                    >
                      <Image
                        src={imgSrc}
                        width={307}
                        height={420}
                        layout="fixed"
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </Slider>

                <div className="absolute w-full bottom-4 flex justify-evenly items-center px-4">
                  {token ? (
                    <Link href={`/selling-page/${card._id}`} className="w-[70%]">
                      <button className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1">
                        Buy Now
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1"
                      onClick={() => toast.success("Please Login!")}
                    >
                      Buy Now
                    </button>
                  )}
                  <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full">
                    <Image
                      unoptimized
                      width={30}
                      height={30}
                      src="/handshake_img.png"
                      alt="Open Offer Popup"
                      className="cursor-pointer"
                      onClick={() =>
                        handleOpenOfferPopup(
                          card._id,
                          card.seller?._id || (card.admin?._id || "admin")
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              
              <OfferPopup
                isOpen={isOfferPopupOpen}
                onClose={handleCloseOfferPopup}
                onSubmit={handleOfferSubmit}
              />

              <h5 className="text-sm font-medium text-gray-700 mt-4">
                {card?.name}
              </h5>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                AED {card?.price?.toFixed(2)}
              </h2>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 text-lg">
              No products found for the selected filter
            </div>
            <button 
              onClick={() => setActiveFilter('All')}
              className="mt-4 px-6 py-2 bg-custom-yellow text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
// "use client";
// import Image from "next/image";
// import Slider from "react-slick/lib/slider";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const innerSliderSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   arrows: true,
//   customPaging: (i) => (
//     <div
//       className={`custom-dot`}
//       style={{
//         height: "5px",
//         borderRadius: "20px",
//         background: "rgba(235, 235, 228, 0.4)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: "pointer",
//         marginTop: "-100px",
//       }}
//     />
//   ),
//   appendDots: (dots) => (
//     <div
//       style={{
//         padding: "15px",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <ul style={{ display: "flex", gap: "5px" }}> {dots} </ul>
//     </div>
//   ),
// };

// export const SoldCards = ({ data }) => (
//   <div className="px-[71px] mb-10 opacity-50">
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative place-items-center">
//       {data?.map((i) => (
//         <div key={i.id} className="flex flex-col gap-3">
//           <div className="w-[307px] h-[404px] rounded-[20px] relative mx-2 outline-none">
//             <div className="absolute top-2 right-2 z-10">
//               <div className="h-[54px] p-[15px] bg-white/40 rounded-[100px]">
//                 <Image alt="" width={24} height={24} src="/wishlist.svg" />
//               </div>
//             </div>
//             <div className="absolute min-w-[204px] bottom-4 left-4 text-center z-10 bg-[#fde504] px-[50px] py-[20px] rounded-[20px]">
//               <button className="text-[#202020] text-base font-bold font-karla leading-tight">
//                 Buy Now
//               </button>
//             </div>
//             <div className="absolute bottom-6 right-5 z-10">
//               <div className="h-[54px] p-[15px] bg-white rounded-[100px]">
//                 <Image alt="" width={24} height={24} src="/hand_shake.svg" />
//               </div>
//             </div>
//             <Slider {...innerSliderSettings}>
//               {i?.images?.map((imgSrc, imgIndex) => (
//                 <div
//                   key={`${i.id}-${imgIndex}`} // Add unique key here combining item id and image index
//                   className="w-[307px] h-[390px] flex items-center justify-center overflow-hidden rounded-md"
//                 >
//                   <Image
//                     src={imgSrc}
//                     width={307}
//                     height={390}
//                     layout="fixed"
//                     alt={i.name}
//                     className="w-full h-full object-cover rounded-xl"
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>
//           <div className="flex flex-col gap-3">
//             <p className="h-2.5 text-black text-base font-bold font-karla leading-tight">
//               {i.name}
//             </p>
//             <p className="text-black text-[25px] font-bold font-karla leading-[30px]">
//               {i.price}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );




"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
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

export const SoldCards = ({ data }) => {
  const [soldProducts, setSoldProducts] = useState(data || []);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
  const wishlist = useSelector((state) => state.wishlist.items);

  const filterOptions = [
    { label: "All Sold Products", value: "All" },
    { label: "Completed Sales", value: "Sold" }, // Matches approval.status
  ];

  // Use the filtered data from props
  const filteredData =
    soldProducts?.filter((product) => {
      if (activeFilter === "All") return true;
      return product.approval?.status === activeFilter;
    }) || [];

  // Get count for each filter type
  const getFilterCount = (status) => {
    if (status === "All") return soldProducts?.length || 0;
    return (
      soldProducts?.filter((product) => product.approval?.status === status)
        .length || 0
    );
  };

  console.log("Sold Products data:", soldProducts);
  console.log("Filtered sold data:", filteredData);
  console.log("Active filter:", activeFilter);

  // Update soldProducts when data prop changes
  useEffect(() => {
    setSoldProducts(data || []);
  }, [data]);

  return (
    <div className="px-[71px] mb-10">
      {/* Filter Section */}
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
                      ? "bg-custom-yellow text-black shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {option.label}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
                {index < filterOptions.length - 1 && (
                  <svg
                    className="w-4 h-4 mx-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredData.length} of {soldProducts?.length || 0} sold products
          {activeFilter !== "All" && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {filterOptions.find((opt) => opt.value === activeFilter)?.label}
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative">
          {filteredData.length > 0 ? (
            filteredData.map((card) => (
              <div key={card._id} className="flex flex-col">
                <div className="relative">
                  {/* Approval Status Badge */}
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium z-10 bg-green-100 text-green-800`}
                  >
                    Sold
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
                        key={`${card._id}-${imgIndex}`}
                        className="w-[307px] h-[420px] flex items-center justify-center overflow-hidden rounded-md"
                      >
                        <Image
                          src={imgSrc}
                          width={307}
                          height={420}
                          layout="fixed"
                          alt={card.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

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
                No sold products found for the selected filter
              </div>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-4 px-6 py-2 bg-custom-yellow text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Show All Sold Products
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

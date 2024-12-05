"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import ReviewItem from "./ReviewItem";
import { Chart } from "./Chart";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { OfferPopup } from "../OfferPopup";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { IoPencil } from "react-icons/io5";
import AddModal from "./AddModal";

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

const SellingCards = ({ data }) => {
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [likedCards, setLikedCards] = useState({});
  const handleOpenOfferPopup = () => {
    setIsOfferPopupOpen(true);
  };

  const handleCloseOfferPopup = () => {
    setIsOfferPopupOpen(false);
  };

  const handleOfferSubmit = (price) => {
    console.log("Offer submitted:", price);
    // Add your submission logic here
    setOfferSubmitted(true);
    handleCloseOfferPopup();
  };

  const handleLikeClick = (cardId) => {
    setLikedCards((prevLikedCards) => ({
      ...prevLikedCards,
      [cardId]: !prevLikedCards[cardId],
    }));
  };
  return (
    <div className="px-[71px] mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative place-items-center">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col gap-3">
            <div className="w-[307px] h-[404px] rounded-[20px] relative mx-2 outline-none">
              <div className="absolute top-2 right-2 z-10">
                {/* <div className="h-[54px] p-[15px] bg-white/40 rounded-[100px]">
            <Image alt="" width={24} height={24} src="wishlist.svg" />
           </div> */}

                <div
                  className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer"
                  onClick={() => handleLikeClick(item.id)}
                >
                  {likedCards[item.id] ? (
                    <FcLike className="text-2xl w-8 h-8" /> // Filled heart icon if liked
                  ) : (
                    <GoHeart className="text-2xl text-gray-300" /> // Outline heart icon if not liked
                  )}
                </div>
              </div>
              <Link href={item.link}>
                <div className="absolute min-w-[204px] bottom-4 left-4 text-center z-10 bg-[#fde504] px-[50px] py-[20px] rounded-[20px]">
                  <button className="text-[#202020] text-base font-bold font-karla leading-tight">
                    Buy Now
                  </button>
                </div>
              </Link>
              <div className="absolute bottom-6 right-5 z-10">
                <div className="h-[54px] p-[15px] bg-white rounded-[100px]">
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    src="hand_shake.svg"
                    onClick={() => handleOpenOfferPopup()}
                  />
                </div>
              </div>
              <OfferPopup
                isOpen={isOfferPopupOpen}
                onClose={handleCloseOfferPopup}
                onSubmit={handleOfferSubmit}
              />
              <Slider {...innerSliderSettings}>
                {item.productImg.map((imgSrc, imgIndex) => (
                  <div key={imgIndex}>
                    <Image
                      src={imgSrc}
                      width={307}
                      height={404}
                      layout="responsive"
                      alt={item.title}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="flex flex-col gap-3">
              <p className="w-[68px] h-2.5 text-black text-base font-bold font-karla leading-tight">
                {item.title}
              </p>
              <p className="text-black text-[25px] font-bold font-karla leading-[30px]">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SoldCards = ({ data }) => (
  <div className="px-[71px] mb-10 opacity-50">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative place-items-center">
      {data.map((i) => (
        <div key={i.id} className="flex flex-col gap-3">
          <div className="w-[307px] h-[404px] rounded-[20px] relative mx-2 outline-none">
            <div className="absolute top-2 right-2 z-10">
              <div className="h-[54px] p-[15px] bg-white/40 rounded-[100px]">
                <Image alt="" width={24} height={24} src="wishlist.svg" />
              </div>
            </div>
            <div className="absolute min-w-[204px] bottom-4 left-4 text-center z-10 bg-[#fde504] px-[50px] py-[20px] rounded-[20px]">
              <button className="text-[#202020] text-base font-bold font-karla leading-tight">
                Buy Now
              </button>
            </div>
            <div className="absolute bottom-6 right-5 z-10">
              <div className="h-[54px] p-[15px] bg-white rounded-[100px]">
                <Image alt="" width={24} height={24} src="hand_shake.svg" />
              </div>
            </div>
            <Slider {...innerSliderSettings}>
              {i.productImg.map((imgSrc, imgIndex) => (
                <div key={imgIndex}>
                  <Image
                    src={imgSrc}
                    width={307}
                    height={404}
                    layout="responsive"
                    alt={i.title}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="flex flex-col gap-3">
            <p className="w-[68px] h-2.5 text-black text-base font-bold font-karla leading-tight">
              {i.title}
            </p>
            <p className="text-black text-[25px] font-bold font-karla leading-[30px]">
              {i.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ReviewCards = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(null); // 'lowToHigh' or 'highToLow'

  const handleSort = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
    // Sorting logic can be applied to the data if integrated dynamically in the future
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
              <Image width={26} height={26} src="/rating.svg" alt="" />
              <p className="text-center text-[#9c9c9c] text-[26.92px] font-normal font-karla leading-loose">
                {data.rating}
              </p>
              <div className="w-2 h-2 rounded-full bg-[#9c9c9c]"></div>
              <div className="text-center text-[#9c9c9c] lg:text-[26.92px] font-normal font-karla leading-loose">
                ({data.reviews} Reviews)
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
        {[1, 2, 3].map((_, index) => (
          <ReviewItem key={index} />
        ))}
      </div>
    </div>
  );
};

const StatsCards = ({ data }) => {
  const [fromDisabled, setFromDisabled] = useState(false);
  const [toDisabled, setToDisabled] = useState(false);

  const handleFromChange = (e) => {
    setFromDisabled(e.target.value !== "option1");
  };

  const handleToChange = (e) => {
    setToDisabled(e.target.value !== "option1");
  };
  return (
    <div className="bg-[#B25CF3] min-h-[1818px] pb-10">
      <div className="w-full px-[20px] lg:px-[71px] h-fit">
        <div className="pt-[120px]">
          <div className="max-w-[630px] flex gap-2 rounded-[57px] py-[10px] px-1 bg-white items-center">
            <div className="rounded-full w-12 h-12 bg-green-500 p-1">
              <Image width={40} height={40} src="trend.svg" alt="" />
            </div>

            <p className="text-black lg:text-2xl font-medium font-karla leading-normal">
              Revenue was high up to 16.42% in Last two weeks!
            </p>
          </div>
          <div className="flex flex-col lg:flex-row pt-[26px] gap-[35px]">
            <div className="lg:w-[50%] w-full relative px-[45px] flex flex-col z-10 justify-center rounded-[20px]">
              <div className=" absolute left-0">
                <Image width={747} height={373} src="/stats_bg.png" alt="" />
              </div>
              <div className="flex flex-col gap-[36px] z-20">
                <p className="opacity-80 text-black text-[27.33px] font-normal font-karla leading-7">
                  Overall Revenue
                </p>
                <p className="text-black text-[72.88px] font-bold font-karla leading-[72.88px]">
                  3012 د.إ
                </p>
                <div className="flex items-center gap-3">
                  <div className="opacity-80 text-black text-[27.33px] font-normal font-jarla leading-7">
                    versus last month
                  </div>
                  <Image width={30} height={30} src="/trend-up.svg" alt="" />
                  <p className="text-black text-[27.33px] font-normal font-karla">
                    25.2%
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-[50%] w-full flex flex-col gap-[13px]">
              <div className="flex lg:flex-row flex-col gap-[13px]">
                <div className="min-w-[249px] h-[179px]  bg-white rounded-[19.39px] shadow flex p-4">
                  <div className="flex flex-col gap-3 w-[60%]">
                    <Image src="/sales.svg" alt="" width={42} height={42} />
                    <p className="text-black text-base font-medium font-karla leading-none">
                      New Orders
                    </p>
                    <p className="text-black text-2xl font-bold font-karla leading-normal">
                      2000
                    </p>
                    <div className="text-black text-base font-medium font-karla leading-none">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/green_up.svg" alt="" width={24} height={24} />
                    <p className="text-[#3dff9b] text-lg font-medium font-karla">
                      25.2%
                    </p>
                  </div>
                </div>
                <div className="min-w-[249px] h-[179px]  bg-white rounded-[19.39px] shadow flex p-4">
                  <div className="flex flex-col gap-3 w-[60%]">
                    <Image src="/checkout.svg" alt="" width={42} height={42} />
                    <p className="text-black text-base font-medium font-karla leading-none">
                      Average Order
                    </p>
                    <p className="text-black text-2xl font-bold font-karla leading-normal">
                      300
                    </p>
                    <div className="text-black text-base font-medium font-karla leading-none">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/green_up.svg" alt="" width={24} height={24} />
                    <p className="text-[#3dff9b] text-lg font-medium font-karla">
                      25.2%
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col gap-[15px]">
                <div className="min-w-[249px] h-[179px]  bg-white rounded-[19.39px] shadow flex p-4 gap-4">
                  <div className="flex flex-col gap-3 w-[60%]">
                    <Image
                      src="/add-friend.svg"
                      alt=""
                      width={42}
                      height={42}
                    />
                    <p className="text-black text-base font-medium font-karla leading-none">
                      Total Followers
                    </p>
                    <p className="text-black text-2xl font-bold font-karla leading-normal">
                      200
                    </p>
                    <div className="text-black text-base font-medium font-karla leading-none">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/green_up.svg" alt="" width={24} height={24} />
                    <p className="text-[#3dff9b] text-lg font-medium font-karla">
                      25.2%
                    </p>
                  </div>
                </div>
                <div className="min-w-[249px] h-[179px]  bg-white rounded-[19.39px] shadow flex p-4">
                  <div className="flex flex-col gap-3 w-[60%]">
                    <Image
                      src="/dash_product.svg"
                      alt=""
                      width={42}
                      height={42}
                    />
                    <p className="text-black text-base font-medium font-karla leading-none">
                      Product Sold
                    </p>
                    <p className="text-black text-2xl font-bold font-karla leading-normal">
                      556
                    </p>
                    <div className="text-black text-base font-medium font-karla leading-none">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/green_up.svg" alt="" width={24} height={24} />
                    <p className="text-[#3dff9b] text-lg font-medium font-karla">
                      25.2%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-[126px]">
            <p className="h-6 text-white text-2xl font-bold font-karla leading-[33.60px] tracking-wide">
              Dashboard
            </p>
            <div className="flex pt-[30px]  gap-[20px]">
              <div className="relative">
                <select
                  className={`py-[18px] px-4 rounded-lg font-karla w-[111px] appearance-none ${fromDisabled ? "bg-gray-200" : ""
                    }`}
                  id="fromOptions"
                  name="fromOptions"
                  onChange={handleFromChange}
                  disabled={fromDisabled}
                >
                  <option value="option1">From</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
                <Image
                  className="absolute top-6 right-3"
                  width={16}
                  height={14}
                  src="/drop_down.svg"
                  alt=""
                />
              </div>

              <div className="relative">
                <select
                  className={`py-[18px] px-4 rounded-lg font-karla w-[111px] appearance-none ${toDisabled ? "bg-gray-200" : ""
                    }`}
                  id="toOptions"
                  name="toOptions"
                  onChange={handleToChange}
                  disabled={toDisabled}
                >
                  <option value="option1">To</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
                <Image
                  className="absolute top-6 right-3"
                  width={16}
                  height={14}
                  src="/drop_down.svg"
                  alt=""
                />
              </div>
              <button className="bg-[#fde504] px-[18px] py-[16px] rounded-lg font-karla font-bold">
                Export
              </button>
            </div>
            <div className="max-w-[1300px] h-[550px] bg-white rounded-[32.40px] mt-[60px] p-[18px]">
              <div className="pl-[109px] flex gap-3">
                <div>
                  <p className="text-[#757575] text-xl font-medium font-karla leading-tight">
                    Total orders
                  </p>
                  <p className="text-[#232323] text-5xl font-bold font-karla leading-[48px]">
                    20,321
                  </p>
                </div>
                <div className="flex items-end gap-1">
                  <Image width={20} height={20} src={"/green_up.svg"} alt="" />
                  <p className="text-green-500 text-xl mb-[-5px] font-karla">
                    20%
                  </p>
                </div>
              </div>
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Orders = ({ data }) => {
  console.log(data);

  const [orderData, setOrderData] = useState(data);
  return (
    <>
      <div className="px-[20px] lg:px-[71px] h-fit py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {orderData.map((item) => (
          <>
            <div className="w-full flex lg:flex-row flex-col mb-3 gap-4 min-h-[150px]  rounded-lg bg-[#F0F1F8] p-4">
              <div className="w-full lg:w-1/2">
                <div className="flex gap-2 items-center">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'Completed'
                    ? 'bg-green-300 text-green-800'
                    : item.status === 'Processing'
                      ? 'bg-yellow-300 text-yellow-800'
                      : item.status === 'Shipped'
                        ? 'bg-blue-300 text-blue-800'
                        : 'bg-red-300 text-red-800'
                    }`}
                  ></div>
                  <p>{item.status}</p>
                </div>
                <div className="bg-white shadow-md w-full h-fit p-4 mt-4 rounded-md flex items-center px-2">
                  {item.items.slice(0, 2).map((data, index) => (
                    <div
                      key={index}
                      className={`relative flex gap-2 mr-2 ${index === 1 && item.items.length > 2 ? 'overflow-visible' : ''}`}
                    >
                      <Image
                        className="object-contain"
                        src={data.productImg[0]}
                        alt={data.productName || "Product Image"}
                        width={60}
                        height={60}
                      />
                      {index === 1 && item.items.length > 2 && (
                        <div className="absolute top-6 left-[-1px] transform translate-x-1/2 -translate-y-1/2 text-white font-bold text-[20px]  rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
                          +{item.items.length - 2}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="ml-auto flex flex-col gap-2 w-full h-full">
                    <p>Order {item.id}</p>
                    <p>
                      {item.status === 'Completed' ? 'Delivered on' : 'Ordered on'}{' '}
                      {new Date(item.orderDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col p-4 lg:w-1/2 items-center gap-2">
                <div className="px-6 py-2 bg-green-500 text-white rounded-md cursor-pointer ">Order Details</div>
                <div className="px-6 py-2  text-blue-500 rounded-md cursor-pointer">Get Invoice</div>
                <div className="px-6 py-2 text-blue-500 rounded-md cursor-pointer">Edit order</div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default function DetailsSection() {
  const sellingData = [
    {
      id: 1,
      productImg: ["/card_image2.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
      link: "/product",
    },
    {
      id: 2,
      productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
      link: "/product",
    },
    {
      id: 3,
      productImg: ["/card_image3.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
      link: "/product",
    },
    {
      id: 4,
      productImg: ["/card_image2.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
      link: "/product",
    },
    {
      id: 5,
      productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
      link: "/product",
    },
    {
      id: 6,
      productImg: ["/card_image3.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
      link: "/product",
    },
  ];
  const soldData = [
    {
      id: 7,
      productImg: ["/card_image2.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
    },
    {
      id: 8,
      productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
    },
    {
      id: 9,
      productImg: ["/card_image3.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
    },
    {
      id: 10,
      productImg: ["/card_image2.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
    },
    {
      id: 11,
      productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
    },
    {
      id: 12,
      productImg: ["/card_image3.png", "/card_image2.png", "/card_image3.png"],
      title: "Dress",
      price: "AED 120.00",
    },
  ];
  const reviewData = { rating: 4.8, reviews: 27, review: [1, 2, 3] };

  const statsData = [
    { id: 13, title: "Total Sales", stat: "1,000" },
    { id: 14, title: "Total Revenue", stat: "$120,000" },
    { id: 15, title: "Average Order Value", stat: "$120" },
  ];
  const orderData = [
    {
      id: 1001,
      customerName: "Emily Johnson",
      orderDate: "2024-03-15",
      total: 240,
      status: "Completed",
      items: [
        { productName: "Wireless Headphones", quantity: 1, price: 120, productImg: ["/card_image3.png", "/card_image2.png", "/card_image3.png"], },
        { productName: "Phone Case", quantity: 2, price: 60, productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"], },
        { productName: "Phone Case", quantity: 2, price: 60, productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"], }
      ]
    },
    {
      id: 1002,
      customerName: "Michael Chen",
      orderDate: "2024-03-16",
      total: 180,
      status: "Processing",
      items: [
        { productName: "Smartwatch", quantity: 1, price: 180, productImg: ["/card_image2.png", "/card_image2.png", "/card_image3.png"], }
      ]
    },
    {
      id: 1003,
      customerName: "Sarah Martinez",
      orderDate: "2024-03-17",
      total: 300,
      status: "Shipped",
      items: [
        { productName: "Bluetooth Speaker", quantity: 1, price: 150, productImg: ["/card_image3.png", "/card_image2.png", "/card_image3.png"], },
        { productName: "Portable Charger", quantity: 1, price: 150, productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"], }
      ]
    },
    {
      id: 1004,
      customerName: "David Kim",
      orderDate: "2024-03-18",
      total: 120,
      status: "Completed",
      items: [
        { productName: "Wireless Earbuds", quantity: 1, price: 120, productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"], }
      ]
    },
    {
      id: 1005,
      customerName: "Rachel Thompson",
      orderDate: "2024-03-19",
      total: 360,
      status: "Shipped",
      items: [
        { productName: "Laptop Bag", quantity: 1, price: 120, productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"], },
        { productName: "Wireless Mouse", quantity: 2, price: 120, productImg: ["/card_image1.png", "/card_image2.png", "/card_image3.png"], }
      ]
    }
  ];
  const tabs = [
    {
      label: "Selling",
      component: SellingCards,
      data: sellingData,
      count: "38",
    },
    { label: "Sold", component: SoldCards, data: soldData, count: "108" },
    { label: "Reviews", component: ReviewCards, data: reviewData, count: "27" },
    { label: "Stats", component: StatsCards, data: statsData, count: "" },
    { label: "Orders", component: Orders, data: orderData, count: "" },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="mt-24 flex flex-col items-center">
      <nav className=" w-full max-w-[1300px]">
        <ul className="flex relative">
          {tabs.map((item) => (
            <li
              key={item.label}
              className={`w-full p-3 text-center cursor-pointer relative text-[#383838] lg:text-2xl font-normal font-karla leading-[28.80px] ${selectedTab.label === item.label
                ? "border-b-[5px] border-[#fde504]"
                : ""
                }`}
              onClick={() => setSelectedTab(item)}
            >
              {item.label} {item.count ? `(${item.count})` : ""}
            </li>
          ))}
        </ul>
      </nav>
      <main className="w-full bg-white mt-[56px]">
        <selectedTab.component data={selectedTab.data} />
      </main>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useState } from "react";
import ReviewItem from "./ReviewItem";
import { Chart } from "./Chart";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { OfferPopup } from "../OfferPopup";
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
  return (
    <div className="px-[71px] mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative place-items-center">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col gap-3">
            <div className="w-[307px] h-[404px] rounded-[20px] relative mx-2 outline-none">
              <div className="absolute top-2 right-2 z-10">
                <div className="h-[54px] p-[15px] bg-white/40 rounded-[100px]">
                  <Image alt="" width={24} height={24} src="wishlist.svg" />
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

const ReviewCards = ({ data }) => (
  <div className="px-[20px] lg:px-[71px]">
    <div className="flex">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-center text-neutral-900 lg:text-2xl font-bold font-karla leading-[28.80px]">
            Customer Reviews
          </p>
          <div className="flex items-center justify-center gap-2 ">
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
          <div className="flex gap-2">
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
          <div className="flex gap-2">
            <Image
              width={15}
              height={15}
              src="/filter.svg"
              className=""
              alt=""
            />
            <p>Filter</p>
          </div>
          <div className="w-full h-[1px] bg-gray-400 absolute top-[70px]"></div>
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
            <div className="lg:w-[50%] w-full relative bg-yellow-400 px-[45px] flex flex-col z-10 justify-center rounded-[20px]">
              {/* <div className='w-full h-full absolute left-0'>
                        <Image width={747} height={373} src='/dashboard_bg.png' alt='' />
                    </div> */}
              <div className="flex flex-col gap-[36px]">
                <p className="opacity-80 text-black text-[27.33px] font-normal font-karla leading-7">
                  Overall Revenue
                </p>
                <p className="text-black text-[72.88px] font-bold font-karla leading-[72.88px]">
                  3012 د.إ
                </p>
                <div className="flex">
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
                  className={`py-[18px] px-4 rounded-lg font-karla w-[111px] appearance-none ${
                    fromDisabled ? "bg-gray-200" : ""
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
                  className={`py-[18px] px-4 rounded-lg font-karla w-[111px] appearance-none ${
                    toDisabled ? "bg-gray-200" : ""
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
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="mt-24 flex flex-col items-center">
      <nav className=" w-full max-w-[1300px]">
        <ul className="flex relative">
          {tabs.map((item) => (
            <li
              key={item.label}
              className={`w-full p-3 text-center cursor-pointer relative text-[#383838] lg:text-2xl font-normal font-karla leading-[28.80px] ${
                selectedTab.label === item.label
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

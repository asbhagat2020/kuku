import Link from "next/link";
import Image from "next/image";
import React from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { openPopup, closePopup } from "../../store/popup/popupSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const Hero = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isPopupOpen = useSelector((state) => state.popup.isOpen);
  const token = (() => {
    try {
      const authCookie = Cookies.get("auth");
      return authCookie && authCookie !== "undefined"
        ? JSON.parse(authCookie)
        : null;
    } catch (error) {
      console.error("Error parsing auth cookie:", error);
      return null;
    }
  })();

  const handleSellNowClick = () => {
    if (!token) {
      toast.success("please login");

      setTimeout(() => {
        router.push("/login");
      }, [500]);
    } else {
      dispatch(openPopup());
    }
  };

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  return (
    <div className="relative w-full mx-auto h-[1024px] 2xl-[1400px] bg-gradient-to-l from-[#F3B202] via-[#F4B202] to-[#EDA702] overflow-hidden pb-5">
      <div className="absolute top-10 left-0 w-full h-[90%]">
        <Image
          // unoptimized={true}
          src="/home_bg.webp"
          layout="fill"
          objectFit="cover"
          alt="home_bg"
        />
      </div>
      <div className="absolute top-[100px] left-[350px] w-full h-[90%]">
        <Image
          width={60}
          height={60}
          unoptimized
          src="/star.png"
          objectFit="cover"
          alt="star"
          loading="lazy"
        />
      </div>
      <div className="absolute top-48 right-[350px]">
        <Image
          width={60}
          height={60}
          unoptimized
          src="/smile.png"
          objectFit="cover"
          alt="smile"
        />
      </div>
      <div className="absolute top-[500px] left-[380px] w-full h-[90%]">
        <Image
          width={60}
          height={60}
          unoptimized
          src="/flower.png"
          objectFit="cover"
          alt="flower"
        />
      </div>
      <div className="h-[42px] w-full lg:px-[427px] py-4 bg-gradient-to-r from-[#eda702] via-[#fde504] to-[#eda702] justify-center items-center gap-2.5 inline-flex">
        <div className="text-center text-[#383838] text-base font-bold font-karla leading-tight">
          Discover preloved treasures and sell your wardrobe favorites with
          ease.
        </div>
      </div>
      <div className="flex flex-col justify-center py-[254px]">
        <div className="z-30 flex h-full justify-center items-center w-full">
          <h1 className="text-center w-[50%] text-[#f0fafe] text-3xl lg:text-7xl font-normal font-luckiest lg:leading-[75.60px]">
            Your Sustainable Fashion Marketplace
          </h1>
        </div>
        <div className="flex justify-center gap-[10px] pt-[100px] z-10">
          <div
            onClick={handleSellNowClick}
            className="h-[72px] px-11 py-[15px] bg-[#e4086f] rounded-[22px] justify-start items-center inline-flex cursor-pointer"
          >
            <button className="text-[#fde504] text-xl font-bold font-karla leading-normal">
              Sell Now
            </button>
          </div>
          <Link href="/selling-page">
            <div className="h-[72px] px-11 py-[15px] bg-white/50 rounded-[22px] backdrop-blur-xl justify-start items-center inline-flex gap-[15px]">
              <button className="text-white text-xl font-bold font-karla leading-normal">
                Explore
              </button>
              <Image width={30} height={30} src="/right_arrow.png" alt="" />
            </div>
          </Link>
        </div>
      </div>

      {/* Curved bottom */}
      <svg
        className="absolute bottom-[-1px] left-0 w-full"
        viewBox="0 0 1550 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0 100V0C258.333 40 775 60 1550 0V100H0Z" fill="#E4086F" />
      </svg>

      {/* Popup Component */}
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default Hero;

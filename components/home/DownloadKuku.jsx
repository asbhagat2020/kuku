import Image from "next/image";
import React from "react";
import { useMediaQuery } from "@mui/material"; // Import useMediaQuery from Material-UI
import Link from "next/link";

const DownloadKuku = () => {
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)"); // Check for mobile and tablet view (iPad)

  return (
    <div
      className="max-w-[1550px] mx-auto h-[890px] px-[70px] mb-[0px]"
      style={{
        backgroundImage: "url('/download_bg3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col lg:flex-row pt-[76px] justify-between">
        {/* Left Dress Image - Hidden on Mobile and Tablet */}
        {!isMobileOrTablet && (
          <div className="order-1">
            <Image width={335} height={242} src="/dress_left.png" alt="" />
          </div>
        )}
        {/* Center Content */}
        <div className="flex flex-col items-center gap-[43px] order-2">
          <Image width={80} height={80} src="/round.svg" alt="" />
          <div className="w-[346px] text-center text-[#fde504] text-[46px] font-normal font-luckiest leading-[55.20px]">
            Clear your wardrobe and sell now
          </div>
        </div>
        {/* Right Dress Image - Hidden on Mobile and Tablet */}
        {!isMobileOrTablet && (
          <div className="order-3 mt-4">
            <Image width={335} height={242} src="/dress_right.png" alt="" />
          </div>
        )}
      </div>
      {/* Conditional stacking for mobile view */}
      <div
        className={`flex ${
          isMobileOrTablet
            ? "flex-col items-center"
            : "justify-center ml-3.5 gap-[150px]"
        } pt-[41px]`}
      >
        {/* <Link href={"#"}>
          <Image
            width={284}
            height={111}
            src="/appstore.png"
            className={`w-full max-w-[284px] ${
              isMobileOrTablet ? "mb-[20px]" : ""
            }`}
            alt=""
          />
        </Link> */}
        {/* <Link href={"#"}>
          <Image
            width={284}
            height={111}
            src="/androidstore.png"
            className={`w-full max-w-[284px] ${isMobileOrTablet ? "" : ""}`}
            alt=""
          />
        </Link> */}
      </div>
      {/* Smaller Kuku Logo for Mobile */}
      <div className="flex justify-center mt-[-7px] ">
        <Image
          width={260}
          height={280}
          src="/kuku_bird.png"
          className={`w-[120px] ${isMobileOrTablet ? "" : "lg:w-[256px]"}`}
          alt=""
        />{" "}
        {/* Adjusted size for mobile */}
      </div>
    </div>
  );
};

export default DownloadKuku;

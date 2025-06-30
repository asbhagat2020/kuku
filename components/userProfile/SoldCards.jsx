"use client";
import Image from "next/image";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

export const SoldCards = ({ data }) => (
  <div className="px-[71px] mb-10 opacity-50">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 relative place-items-center">
      {data?.map((i) => (
        <div key={i.id} className="flex flex-col gap-3">
          <div className="w-[307px] h-[404px] rounded-[20px] relative mx-2 outline-none">
            <div className="absolute top-2 right-2 z-10">
              <div className="h-[54px] p-[15px] bg-white/40 rounded-[100px]">
                <Image alt="" width={24} height={24} src="/wishlist.svg" />
              </div>
            </div>
            <div className="absolute min-w-[204px] bottom-4 left-4 text-center z-10 bg-[#fde504] px-[50px] py-[20px] rounded-[20px]">
              <button className="text-[#202020] text-base font-bold font-karla leading-tight">
                Buy Now
              </button>
            </div>
            <div className="absolute bottom-6 right-5 z-10">
              <div className="h-[54px] p-[15px] bg-white rounded-[100px]">
                <Image alt="" width={24} height={24} src="/hand_shake.svg" />
              </div>
            </div>
            <Slider {...innerSliderSettings}>
              {i?.images?.map((imgSrc, imgIndex) => (
                <div
                  key={`${i.id}-${imgIndex}`} // Add unique key here combining item id and image index
                  className="w-[307px] h-[390px] flex items-center justify-center overflow-hidden rounded-md"
                >
                  <Image
                    src={imgSrc}
                    width={307}
                    height={390}
                    layout="fixed"
                    alt={i.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="flex flex-col gap-3">
            <p className="h-2.5 text-black text-base font-bold font-karla leading-tight">
              {i.name}
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

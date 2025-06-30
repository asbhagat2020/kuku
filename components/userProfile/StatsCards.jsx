"use client";
import { useState } from "react";
import Image from "next/image";
import { Chart } from "./Chart";

export const StatsCards = ({ data }) => {
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
              <div className="absolute left-0">
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
                <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
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
                
                <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
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
                <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4 gap-4">
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
                
                <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
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
            
            <div className="flex pt-[30px] gap-[20px]">
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

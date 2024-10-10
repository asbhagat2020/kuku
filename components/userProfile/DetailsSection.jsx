"use client";
import Image from "next/image";
import { useState } from "react";
import ReviewItem from "./ReviewItem";
import { Chart } from "./Chart";

const SellingCards = ({ data }) => (
    <div className='px-[71px]'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
            {data.map((i) => (
                <div key={i.id} className='flex flex-col gap-3'>
                    <div
                        className="rounded-[20px] shadow h-[404px] w-[307px] relative bg-cover bg-center"
                        style={{ backgroundImage: `url(${i.productImg})` }}
                    >
                        <div className='p-4 z-20 relative flex flex-col justify-between h-full'>
                            <div className='flex justify-end'>
                                <div className='h-[54px] w-[54px] p-[15px] bg-white/40 rounded-[100px]'>
                                    <Image alt='' width={24} height={24} src='wishlist.svg' />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="w-[204px] h-[60px] px-[57.38px] py-[27.76px] bg-[#fde504] rounded-[20px] justify-center items-center gap-[9.25px] inline-flex">
                                    <div className="text-[#202020] text-base font-bold font-karla leading-tight">Buy Now</div>
                                </div>
                                <div className='h-[54px] p-[15px] bg-white rounded-[100px]'>
                                    <Image alt='' width={24} height={24} src='hand_shake.svg' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="w-[68px] h-2.5 text-black text-base font-bold font-karla leading-tight">{i.title}</p>
                        <p className="text-black text-[25px] font-bold font-karla leading-[30px]">{i.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SoldCards = ({ data }) => (
    <div className='px-[71px]'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
            {data.map((i) => (
                <div key={i.id} className='flex flex-col gap-3'>
                    <div
                        className="rounded-[20px] shadow h-[404px] w-[307px] relative bg-cover bg-center"
                        style={{ backgroundImage: `url(${i.productImg})` }}
                    >
                        <div className='p-4 z-20 relative flex flex-col justify-between h-full'>
                            <div className='flex justify-end'>
                                <div className='h-[54px] w-[54px] p-[15px] bg-white/40 rounded-[100px]'>
                                    <Image alt='' width={24} height={24} src='wishlist.svg' />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="w-[204px] h-[60px] px-[57.38px] py-[27.76px] bg-[#fde504] rounded-[20px] justify-center items-center gap-[9.25px] inline-flex">
                                    <div className="text-[#202020] text-base font-bold font-karla leading-tight">Buy Now</div>
                                </div>
                                <div className='h-[54px] p-[15px] bg-white rounded-[100px]'>
                                    <Image alt='' width={24} height={24} src='hand_shake.svg' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="w-[68px] h-2.5 text-black text-base font-bold font-karla leading-tight">{i.title}</p>
                        <p className="text-black text-[25px] font-bold font-karla leading-[30px]">{i.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ReviewCards = ({ data }) => (
    <div className='px-[71px]'>
        <div className="flex">
            <div className='flex w-full justify-between'>
                <div className='flex flex-col gap-4'>
                    <p className="text-center text-neutral-900 text-2xl font-bold font-karla leading-[28.80px]">Customer Reviews</p>
                    <div className='flex items-center gap-2'>
                        <Image width={26} height={26} src='/rating.svg' alt='' />
                        <p className="text-center text-[#9c9c9c] text-[26.92px] font-normal font-karla leading-loose">{data.rating}</p>
                        <div className='w-2 h-2 rounded-full bg-[#9c9c9c]'></div>
                        <div className="text-center text-[#9c9c9c] text-[26.92px] font-normal font-karla leading-loose">({data.reviews} Reviews)</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='py-[56px] flex flex-col gap-[56px]'>
            {[1, 2, 3].map((_, index) => (
                <ReviewItem key={index} />
            ))}
        </div>

    </div>
);

const StatsCards = ({ data }) => (
    <div className='bg-[#B25CF3] h-[1818px]'>
        <div className="w-full px-[71px] h-fit">
            <div className='pt-[120px]'>
                <div className='w-[630px] flex gap-2 rounded-[57px] py-[10px] px-1 bg-white items-center'>
                    <div className='rounded-full w-12 h-12 bg-green-500 p-1'>
                        <Image width={40} height={40} src='trend.svg' alt='' />
                    </div>

                    <p className="text-black text-2xl font-medium font-karla leading-normal">Revenue was high up to 16.42% in Last two weeks!</p>
                </div>
                <div className='flex pt-[26px] gap-[35px]'>
                    <div className='w-[50%] relative bg-yellow-400 px-[45px] flex flex-col z-10 justify-center rounded-[20px]'>
                        {/* <div className='w-full h-full absolute left-0'>
                        <Image width={747} height={373} src='/dashboard_bg.png' alt='' />
                    </div> */}
                        <div className='flex flex-col gap-[36px]'>
                            <p className="opacity-80 text-black text-[27.33px] font-normal font-karla leading-7">Overall Revenue</p>
                            <p className="text-black text-[72.88px] font-bold font-karla leading-[72.88px]">3012 د.إ</p>
                            <div className='flex'>
                                <div className="opacity-80 text-black text-[27.33px] font-normal font-jarla leading-7">versus last month</div>
                                <Image width={30} height={30} src='/trend-up.svg' alt='' />
                                <p className="text-black text-[27.33px] font-normal font-karla">25.2%</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-[50%] flex flex-col gap-[13px]'>
                        <div className='flex gap-[13px]'>
                            <div className='min-w-[249px] h-[179px]  bg-white rounded-[19.39px] shadow flex p-4'>
                                <div className='flex flex-col gap-3 w-[60%]'>
                                    <Image src='/sales.svg' alt='' width={42} height={42} />
                                    <p className="text-black text-base font-medium font-karla leading-none">New Orders</p>
                                    <p className="text-black text-2xl font-bold font-karla leading-normal">2000</p>
                                    <div className="text-black text-base font-medium font-karla leading-none">From last weeks</div>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Image src='/green_up.svg' alt='' width={24} height={24} />
                                    <p className="text-[#3dff9b] text-lg font-medium font-karla">25.2%</p>
                                </div>
                            </div>
                            <div className='min-w-[249px] h-[179px]  bg-white rounded-[19.39px] shadow flex p-4'>
                                <div className='flex flex-col gap-3 w-[60%]'>
                                    <Image src='/checkout.svg' alt='' width={42} height={42} />
                                    <p className="text-black text-base font-medium font-karla leading-none">Average Order</p>
                                    <p className="text-black text-2xl font-bold font-karla leading-normal">300</p>
                                    <div className="text-black text-base font-medium font-karla leading-none">From last weeks</div>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Image src='/green_up.svg' alt='' width={24} height={24} />
                                    <p className="text-[#3dff9b] text-lg font-medium font-karla">25.2%</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-[15px]'>
                            <div className='min-w-[249px] h-[179px]  bg-white rounded-[19.39px] shadow flex p-4 gap-4'>
                                <div className='flex flex-col gap-3 w-[60%]'>
                                    <Image src='/add-friend.svg' alt='' width={42} height={42} />
                                    <p className="text-black text-base font-medium font-karla leading-none">Total Followers</p>
                                    <p className="text-black text-2xl font-bold font-karla leading-normal">200</p>
                                    <div className="text-black text-base font-medium font-karla leading-none">From last weeks</div>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Image src='/green_up.svg' alt='' width={24} height={24} />
                                    <p className="text-[#3dff9b] text-lg font-medium font-karla">25.2%</p>
                                </div>
                            </div>
                            <div className='min-w-[249px] h-[179px]  bg-white rounded-[19.39px] shadow flex p-4'>
                                <div className='flex flex-col gap-3 w-[60%]'>
                                    <Image src='/dash_product.svg' alt='' width={42} height={42} />
                                    <p className="text-black text-base font-medium font-karla leading-none">Product Sold</p>
                                    <p className="text-black text-2xl font-bold font-karla leading-normal">556</p>
                                    <div className="text-black text-base font-medium font-karla leading-none">From last weeks</div>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Image src='/green_up.svg' alt='' width={24} height={24} />
                                    <p className="text-[#3dff9b] text-lg font-medium font-karla">25.2%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-[126px]'>
                    <p className="h-6 text-white text-2xl font-bold font-karla leading-[33.60px] tracking-wide">Dashboard</p>
                    <div className='flex pt-[30px] gap-[20px]'>
                        <select className='p-[18px] rounded-lg font-karla' id="options" name="options">
                            <option value="option1">From</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </select>
                        <select className='p-[18px] rounded-lg font-karla' id="options" name="options">
                            <option value="option1 ">To</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </select>
                        <button className='bg-[#fde504] px-[18px] py-[16px] rounded-lg font-karla'>Export</button>
                    </div>
                    <div className="max-w-[1300px] h-[550px] bg-white rounded-[32.40px] mt-[60px] p-[18px]">
                        <div className='pl-[109px]'>
                            <p className="text-[#757575] text-xl font-medium font-karla leading-tight">Total orders</p>
                            <p className="text-[#232323] text-5xl font-bold font-karla leading-[48px]">20,321</p>
                        </div>
                        <Chart />
                    </div>
                </div>
            </div>
        </div></div>
);

export default function DetailsSection() {
    const sellingData = [
        { id: 1, productImg: "/card_image1.png", title: "Dress", price: "AED 120.00" },
        { id: 2, productImg: "/card_image2.png", title: "Dress", price: "AED 120.00" },
        { id: 2, productImg: "/card_image3.png", title: "Dress", price: "AED 120.00" },
        { id: 2, productImg: "/card_image4.png", title: "Dress", price: "AED 120.00" },
        { id: 2, productImg: "/card_image5.png", title: "Dress", price: "AED 120.00" },

    ];

    const soldData = [
        { id: 1, productImg: "/card_image5.png", title: "Sold Dress", price: "AED 100.00" },
        { id: 2, productImg: "/card_image1.png", title: "Sold Dress", price: "AED 90.00" },
        { id: 2, productImg: "/card_image3.png", title: "Sold Dress", price: "AED 90.00" },
        { id: 2, productImg: "/card_image4.png", title: "Sold Dress", price: "AED 90.00" },
        { id: 2, productImg: "/card_image1.png", title: "Sold Dress", price: "AED 90.00" },

    ];

    const reviewData = { rating: 4.8, reviews: 27, review: [1, 2, 3] };

    const statsData = [
        { id: 1, title: "Total Sales", stat: "1,000" },
        { id: 2, title: "Total Revenue", stat: "$120,000" },
        { id: 3, title: "Average Order Value", stat: "$120" },
    ];

    const tabs = [
        { label: "Selling", component: SellingCards, data: sellingData },
        { label: "Sold", component: SoldCards, data: soldData },
        { label: "Reviews", component: ReviewCards, data: reviewData },
        { label: "Stats", component: StatsCards, data: statsData },
    ];

    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    return (
        <div className="mt-24 flex flex-col items-center">
            <nav className=" w-full max-w-[1300px]">
                <ul className="flex relative">
                    {tabs.map((item) => (
                        <li
                            key={item.label}
                            className={`w-full p-3 text-center cursor-pointer relative text-[#383838] text-2xl font-normal font-karla leading-[28.80px] ${selectedTab.label === item.label ? "border-b-2 border-[#fde504]" : ""}`}
                            onClick={() => setSelectedTab(item)}
                        >
                            {item.label}
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

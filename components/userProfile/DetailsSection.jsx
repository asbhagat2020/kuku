"use client";
import Image from "next/image";
import { useState } from "react";
import ReviewItem from "./ReviewItem";

const SellingCards = ({ data }) => (
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
);

const SoldCards = ({ data }) => (
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
);

const ReviewCards = ({ data }) => (
    <div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((i) => (
            <div key={i.id} className="bg-gray-400 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{i.title}</h3>
                <p>{i.stat}</p>
            </div>
        ))}
    </div>
);

export default function DetailsSection() {
    const sellingData = [
        { id: 1, productImg: "/card_image1.png", title: "Dress", price: "AED 120.00" },
        { id: 2, productImg: "/card_image2.png", title: "Dress", price: "AED 120.00" },
        // other selling items...
    ];

    const soldData = [
        { id: 1, productImg: "/card_image5.png", title: "Sold Dress", price: "AED 100.00" },
        { id: 2, productImg: "/card_image6.png", title: "Sold Dress", price: "AED 90.00" },
        // other sold items...
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
            <nav className="bg-white w-full max-w-[1300px]">
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
            <main className="w-full max-w-[1300px] bg-white mt-[56px] p-4">
                <selectedTab.component data={selectedTab.data} />
            </main>
        </div>
    );
}

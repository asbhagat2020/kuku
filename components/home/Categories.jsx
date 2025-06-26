"use client"
import React from 'react'
import dynamic from 'next/dynamic';
const CategoryCarousel = dynamic(() => import('@/components/home/CategoryCarousel'), { ssr: false });



const Categories = () => {
    return (
        <div className='w-full mx-auto h-[939px]  py-[100px]'
        style={{ backgroundImage: "url('/category_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className='flex flex-col items-center px-[20px]'>
                <h1 className="text-[#383838] text-[20px] lg:text-[46px] font-normal font-luckiest leading-[55.20px] text-center">CATEGORIES</h1>
                <p className="lg:w-[574px] h-[34px] text-center text-[#515151] text-base font-normal font-karla leading-[17.60px] mt-[9px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
            </div>
            <div className='mt-[49px]'>
                <CategoryCarousel/>
            </div>
        </div>
    )
}

export default Categories
"use client"
import React from 'react'
import CategoryCarousel from '@/components/home/CategoryCarousel'


const Categories = () => {
    return (
        <div className='max-w-[1550px] mx-auto h-[939px] bg-[#69d3fa] py-[100px]'>
            <div className='flex flex-col items-center'>
                <h1 className="text-[#383838] text-[46px] font-normal font-luckiest leading-[55.20px] text-center">CATEGORIES</h1>
                <p className="w-[574px] h-[34px] text-center text-[#515151] text-base font-normal font-karla leading-[17.60px] mt-[9px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
            </div>
            <div className='mt-[49px]'>
                <CategoryCarousel/>
            </div>
        </div>
    )
}

export default Categories
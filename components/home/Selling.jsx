import Image from 'next/image'
import React from 'react'
import Carousels from '@/components/home/Carousels'
import 'react-multi-carousel/lib/styles.css'
import Link from 'next/link';

const Selling = () => {
    return (
        <div className="min-h-[760px] max-w-[1550px] mx-auto relative bg-white pt-[113px]">
            <Image className='absolute right-[430px] top-[188px]' width={44} height={44} src='/cube.svg' alt='cube' />
            <div className="h-[70px] w-full justify-between items-center inline-flex px-[20px] lg:px-[73px] ">
                <div className='flex gap-4'>
                    <h1 className="text-[#e4086f] text-[25px] lg:text-[46px] font-normal font-luckiest lg:leading-[55.20px]">SEE WHAT’S SELLING</h1>
                    <Image width={73} height={73} src='/Frame.svg' className='mt-[-80px]' alt='' />
                </div>
                <Link href="/selling-page">
                    <div className="h-[70px] px-5 lg:px-12 py-[15px] rounded-[22px] border-2 border-[#e4086f] justify-start items-center gap-[11px] flex cursor-pointer group hover:bg-[#e4086f] hover:border-white">
                        <p className="text-[#e4086f] group-hover:text-white lg:text-xl font-bold font-karla text-center uppercase leading-snug">
                            View all
                        </p>
                    </div>
                </Link>
            </div>
            <div className='pt-[113px] pb-[65px]'>
                <Carousels />
            </div>
            <Image unoptimized className='absolute bottom-[10%] left-[46px]' width={44} height={44} src='/selling_frame-1.png' alt='cube' />
            <Image unoptimized className='absolute right-6 bottom-[0px]' width={44} height={24} src='/selling_frame2.svg' alt='cube' />
        </div>
    )
}

export default Selling
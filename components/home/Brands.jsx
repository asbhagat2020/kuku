import React from 'react'
// import BrandsCurousel from './BrandsCurousel'
import BrandsCurousel from '@/components/home/BrandsCurousel'
const Brands = () => {

    return (
        <div className='max-w-[1550px] mx-auto h-[665px] flex flex-col items-center'
        style={{
            backgroundImage: "url('brands_background.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
            <div className='mt-[72px]'>
                <h1 className="w-[394px] h-24 text-center text-[#fde504] text-[46px] font-normal font-luckiest leading-[55.20px]">Fashion Trends high quality</h1>
            </div>
            <div className="w-[465px] h-[45px] mt-[14px] text-center text-white text-base font-normal font-karla leading-[17.60px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </div>
            <div className='px-[70px] mt-[150px] w-full'>
                <BrandsCurousel/>
            </div>
        </div>
    )
}

export default Brands
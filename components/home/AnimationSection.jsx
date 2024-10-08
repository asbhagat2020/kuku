import Image from 'next/image'
import React from 'react'

const AnimationSection = () => {
  return (
    <div className="max-w-[1550px] mx-auto mb-[93px] ">
        <div className='rounded-[20px] mx-[70px] h-[640px] bg-[#FDE504] py-[60px] flex flex-col items-center'>
            <div className='flex mx-[180px] gap-[130px]'>
                <div className='flex flex-col space-y-[50px] justify-center'>
                    <p className='text-[#202020] text-base font-bold font-karla leading-tight'>Step-1</p>
                    <h1 className='text-[#e4086f] text-[46px] font-normal font-luckiest leading-[55.20px]'>List what you no <br /> longer need</h1>
                </div>
                <div>
                    <Image width={405} height={405} src='/mobile.png' alt=''/>
                </div>
            </div>
            <div className='mt-[38px]'>
            <Image unoptimized width={1200} height={57} src='/animation_slide_image1.png' alt=''/>
            </div>
        </div>
    </div>
  )
}

export default AnimationSection
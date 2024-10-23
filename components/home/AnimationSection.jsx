import Image from 'next/image'
import React from 'react'

const AnimationSection = () => {
  return (
    <div className="max-w-[1550px] mx-auto mb-[93px] relative">
  <div className="absolute top-[-50px] right-[20px] sm:top-[-80px] sm:right-[80px]">
    <Image src="list_top_image.svg" width={111} height={121} alt="" />
  </div>
  
  <div className="rounded-[20px] mx-5 lg:mx-[70px] lg:h-[640px] bg-[#FDE504] py-[40px] sm:py-[60px] flex flex-col items-center">
    
    <div className="flex flex-col sm:flex-row mx-5 sm:mx-[50px] lg:mx-[180px] gap-[30px] sm:gap-[130px] items-center">
      <div className="flex flex-col space-y-5 sm:space-y-[50px] justify-center text-center sm:text-left">
        <p className="text-[#202020] text-sm sm:text-base font-bold font-karla leading-tight">Step-1</p>
        <h1 className="text-[#e4086f] text-[26px] sm:text-[32px] lg:text-[46px] font-normal font-luckiest leading-tight sm:leading-[42px] lg:leading-[55.20px]">
          List what you no <br /> longer need
        </h1>
      </div>

      <div className="mt-5 sm:mt-0">
        <Image width={250} height={250} className="sm:w-[305px] sm:h-[305px] lg:w-[405px] lg:h-[405px]" src="/mobile.png" alt="" />
      </div>
    </div>
    
    <div className="mt-5 sm:mt-[38px] mx-2 sm:mx-7">
      <Image unoptimized width={300} height={30} className="sm:w-[600px] sm:h-[70px] lg:w-[1200px] lg:h-[90px]" src="/animation_slide_image1.png" alt="" />
    </div>
  </div>
</div>

  )
}

export default AnimationSection
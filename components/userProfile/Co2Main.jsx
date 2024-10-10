import Image from 'next/image'
import React from 'react'

const Co2Main = () => {
  return (
    <div className="max-w-[1550px] mx-auto h-fit mb-[100px]">
      <div className='mt-[150px] h-[800px] max-w-[90%]  mx-auto'
        style={{
          backgroundImage: 'url("/co2_bg.png")',
          backgroundSize: "contain",
          backgroundPosition: "center",
          paddingInline: "70px",
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='py-[77px]'>
          <div className='flex'>
            <div>
              <p className=""><span className="text-white text-[64px] font-bold font-karla">Hi Palak, <br /></span><span className="text-white text-[32px] font-bold font-karla">you have saved 68 kgs of CO2 emissions this month  </span></p>
            </div>
            <div></div>

          </div>
        </div>
      </div>
      <div className='pt-[138px] px-[71px]'>
        <p className="text-black text-[32.83px] font-bold font-karla leading-[45.96px] tracking-wider">Your Contribution 🌎</p>
      </div>
      <div className='pt-[58px] px-[71px] flex justify-between'>
        <div className='flex flex-col gap-[54px]'>
          <div className='flex items-center relative'>
            <div className='absolute top-[-14px] left-20 z-20'>
              <Image src='/co2.png' alt="" width={34} height={34}/>
            </div>
            <div className='rounded-full w-[129px] h-[129px] bg-[#d1ffe7] z-10 flex items-center'>
            <Image src='/co2_image.svg' alt="" width={129} height={129}/>
            </div>
            <div className="w-fit ml-[-30px] h-[107.61px] pl-[98.49px] pr-[61.36px] pt-[16.41px] pb-[17.07px] bg-neutral-50 rounded-tr-[21.89px] rounded-br-[21.89px] border-4 border-[#d1ffe8] justify-end items-center inline-flex">
              <div className="w-[349px] self-stretch relative">
                <div className="left-0 top-0 absolute text-black text-[25.53px] font-medium font-karla">Order Placed: 8th May 2024</div>
                <div className="left-0 top-[40.13px] absolute text-[#30bd75] text-[29.18px] font-bold font-karla">Co2 emission saved: 2KG</div>
              </div>
            </div>
          </div>
          <div className='flex items-center relative'>
            <div className='absolute top-[-14px] left-20 z-20'>
              <Image src='/co2.png' alt="" width={34} height={34}/>
            </div>
            <div className='rounded-full w-[129px] h-[129px] bg-[#d1ffe7] z-10 flex items-center'>
            <Image src='/co2_image.svg' alt="" width={129} height={129}/>
            </div>
            <div className="w-fit ml-[-30px] h-[107.61px] pl-[98.49px] pr-[61.36px] pt-[16.41px] pb-[17.07px] bg-neutral-50 rounded-tr-[21.89px] rounded-br-[21.89px] border-4 border-[#d1ffe8] justify-end items-center inline-flex">
              <div className="w-[349px] self-stretch relative">
                <div className="left-0 top-0 absolute text-black text-[25.53px] font-medium font-karla">Order Placed: 8th May 2024</div>
                <div className="left-0 top-[40.13px] absolute text-[#30bd75] text-[29.18px] font-bold font-karla">Co2 emission saved: 2KG</div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[54px]'>
          <div className='flex items-center relative'>
            <div className='absolute top-[-14px] left-20 z-20'>
              <Image src='/co2.png' alt="" width={34} height={34}/>
            </div>
            <div className='rounded-full w-[129px] h-[129px] bg-[#d1ffe7] z-10 flex items-center'>
            <Image src='/co2_image.svg' alt="" width={129} height={129}/>
            </div>
            <div className="w-fit ml-[-30px] h-[107.61px] pl-[98.49px] pr-[61.36px] pt-[16.41px] pb-[17.07px] bg-neutral-50 rounded-tr-[21.89px] rounded-br-[21.89px] border-4 border-[#d1ffe8] justify-end items-center inline-flex">
              <div className="w-[349px] self-stretch relative">
                <div className="left-0 top-0 absolute text-black text-[25.53px] font-medium font-karla">Order Placed: 8th May 2024</div>
                <div className="left-0 top-[40.13px] absolute text-[#30bd75] text-[29.18px] font-bold font-karla">Co2 emission saved: 2KG</div>
              </div>
            </div>
          </div>
          <div className='flex items-center relative'>
            <div className='absolute top-[-14px] left-20 z-20'>
              <Image src='/co2.png' alt="" width={34} height={34}/>
            </div>
            <div className='rounded-full w-[129px] h-[129px] bg-[#d1ffe7] z-10 flex items-center'>
            <Image src='/co2_image.svg' alt="" width={129} height={129}/>
            </div>
            <div className="w-fit ml-[-30px] h-[107.61px] pl-[98.49px] pr-[61.36px] pt-[16.41px] pb-[17.07px] bg-neutral-50 rounded-tr-[21.89px] rounded-br-[21.89px] border-4 border-[#d1ffe8] justify-end items-center inline-flex">
              <div className="w-[349px] self-stretch relative">
                <div className="left-0 top-0 absolute text-black text-[25.53px] font-medium font-karla">Order Placed: 8th May 2024</div>
                <div className="left-0 top-[40.13px] absolute text-[#30bd75] text-[29.18px] font-bold font-karla">Co2 emission saved: 2KG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Co2Main
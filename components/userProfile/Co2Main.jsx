"use client"
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Co2Main = () => {
  const percentage = 68;
  return (
    <div className="max-w-[1550px] mx-auto h-fit mb-[100px]">
      <div className=' mt-10 lg:mt-[150px] min-h-[850px] max-w-[100%]  mx-5 lg:mx-[73px] relative'
        style={{
          backgroundImage: 'url("/co2_bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingInline: "50px",
          backgroundRepeat: 'no-repeat',
          borderRadius: "20px"
        }}
      >
        <div className=''>
          <div className='flex items-center justify-between'>
            <div className='py-[27px] lg:py-[77px] lg:px-5'>
              <p className=""><span className="text-white text-[32px] lg:text-[64px] font-bold font-karla">Hi Palak, <br /></span><span className="text-white text-base lg:text-[32px] font-bold font-karla">you have saved 68 kgs of CO2 emissions this month  </span></p>
            </div>
            <div>
              <Link href={'#'} className='w-24 h-9 bg-white rounded-3xl px-2 flex gap-2 justify-center items-center'>
                <Image width={26} height={26} src={'question_green.svg'} alt=''/>
                <p className='text-green-500 font-karla font-bold'>Help</p>
              </Link>
            </div>

          </div>
        </div>
        <div className='absolute top-1/3  lg:left-[40%] font-karla'>
          <div className='relative'>
            <CircularProgressbar
              value={percentage}
              text={``}
              className="font-karla text-yellow-300"
              styles={buildStyles({
                textColor: '#186940',
                pathColor: '#FBE300',
                trailColor: '#d6d6d6',
                textSize: '15px',
              })}
            >
            </CircularProgressbar>
            <div className='absolute top-[60px] left-[65px] '>
              <h2 className='font-karla text-center text-[50px] lg:text-[90px] font-bold text-[#FBE300] leading-[60px]'>CO2 <br /><span className='text-[40px] text-[#186940]'>68 Kg</span></h2>
            </div>
            <div className='absolute bottom-1/4 left-[85px]'>
              <h2 className='font-karla text-[15px] font-bold text-[#186940]'>Saved this month</h2>
            </div>
          </div>

        </div>
      </div>
      <div className='pt-[138px] px-6 lg:px-[71px] flex justify-center lg:justify-start'>
        <p className="text-black text-[32.83px] font-bold font-karla leading-[45.96px] tracking-wider">Your Contribution 🌎</p>
      </div>
      <div className='pt-[58px] px-[71px] flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between flex-shrink-0'>
        <div className='flex flex-col gap-5 lg:gap-[54px]'>
          <div className='flex items-center relative'>
            <div className='absolute top-[-14px] left-20 z-20'>
              <Image src='/co2.png' alt="" width={34} height={34} />
            </div>
            <div className='rounded-full w-[129px] h-[129px] bg-[#d1ffe7] z-10 flex items-center'>
              <Image src='/co2_image.svg' alt="" width={129} height={129} />
            </div>
            <div className="w-fit ml-[-30px] h-[107.61px] pl-[98.49px] pr-[61.36px] pt-[16.41px] pb-[17.07px] bg-neutral-50 rounded-tr-[21.89px] rounded-br-[21.89px] border-4 border-[#d1ffe8] justify-end items-center inline-flex">
              <div className="w-[200px] xl:w-[349px] self-stretch relative">
                <div className="left-0 top-0 absolute text-black xl:text-[25.53px] font-medium font-karla">Order Placed: 8th May 2024</div>
                <div className="left-0 top-[40.13px] absolute text-[#30bd75] xl:text-[29.18px] font-bold font-karla">Co2 emission saved: 2KG</div>
              </div>
            </div>
          </div>
          <div className='flex items-center relative'>
            <div className='absolute top-[-14px] left-20 z-20'>
              <Image src='/co2.png' alt="" width={34} height={34} />
            </div>
            <div className='rounded-full w-[129px] h-[129px] bg-[#d1ffe7] z-10 flex items-center'>
              <Image src='/co2_image.svg' alt="" width={129} height={129} />
            </div>
            <div className="w-fit ml-[-30px] h-[107.61px] pl-[98.49px] pr-[61.36px] pt-[16.41px] pb-[17.07px] bg-neutral-50 rounded-tr-[21.89px] rounded-br-[21.89px] border-4 border-[#d1ffe8] justify-end items-center inline-flex">
              <div className="w-[200px] xl:w-[349px] self-stretch relative">
                <div className="left-0 top-0 absolute text-black xl:text-[25.53px] font-medium font-karla">Order Placed: 8th May 2024</div>
                <div className="left-0 top-[40.13px] absolute text-[#30bd75] xl:text-[29.18px] font-bold font-karla">Co2 emission saved: 2KG</div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5 lg:gap-[54px]'>
          <div className='flex items-center relative'>
            <div className='absolute top-[-14px] left-20 z-20'>
              <Image src='/co2.png' alt="" width={34} height={34} />
            </div>
            <div className='rounded-full w-[129px] h-[129px] bg-[#d1ffe7] z-10 flex items-center'>
              <Image src='/co2_image.svg' alt="" width={129} height={129} />
            </div>
            <div className="w-fit ml-[-30px] h-[107.61px] pl-[98.49px] pr-[61.36px] pt-[16.41px] pb-[17.07px] bg-neutral-50 rounded-tr-[21.89px] rounded-br-[21.89px] border-4 border-[#d1ffe8] justify-end items-center inline-flex">
              <div className="w-[200px] xl:w-[349px] self-stretch relative">
                <div className="left-0 top-0 absolute text-black xl:text-[25.53px] font-medium font-karla">Order Placed: 8th May 2024</div>
                <div className="left-0 top-[40.13px] absolute text-[#30bd75] xl:text-[29.18px] font-bold font-karla">Co2 emission saved: 2KG</div>
              </div>
            </div>
          </div>
          <div className='flex items-center relative'>
            <div className='absolute top-[-14px] left-20 z-20'>
              <Image src='/co2.png' alt="" width={34} height={34} />
            </div>
            <div className='rounded-full w-[129px] h-[129px] bg-[#d1ffe7] z-10 flex items-center'>
              <Image src='/co2_image.svg' alt="" width={129} height={129} />
            </div>
            <div className="w-fit ml-[-30px] h-[107.61px] pl-[98.49px] pr-[61.36px] pt-[16.41px] pb-[17.07px] bg-neutral-50 rounded-tr-[21.89px] rounded-br-[21.89px] border-4 border-[#d1ffe8] justify-end items-center inline-flex">
              <div className="w-[200px] xl:w-[349px] self-stretch relative">
                <div className="left-0 top-0 absolute text-black xl:text-[25.53px] font-medium font-karla">Order Placed: 8th May 2024</div>
                <div className="left-0 top-[40.13px] absolute text-[#30bd75] xl:text-[29.18px] font-bold font-karla">Co2 emission saved: 2KG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Co2Main
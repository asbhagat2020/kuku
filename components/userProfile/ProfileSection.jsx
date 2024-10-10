
import Image from 'next/image'
import React from 'react'

const ProfileSection = () => {
    return (
        <div className='max-w-[1550px] mx-auto'>
            <div className='px-[70px] pt-[28px]'>
                <div className='flex  items-center '>
                    <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px] mr-1.5">Home</p>
                    <div className="w-[9px] h-[0px] origin-top-left rotate-90 border border-black mt-[-5px]"></div>
                    <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px] mr-1.5">Categories</p>
                    <div className="w-[9px] h-[0px] origin-top-left rotate-90 border border-black mt-[-5px]"></div>
                    <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px] mr-1.5">Tshirt</p>
                    <div className="w-[9px] h-[0px] origin-top-left rotate-90 border border-black mt-[-5px] mr-1.5"></div>
                    <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px]">Tshirt</p>
                </div>
                <div className='w-[95%] h-[1px]  bg-[#e6e6e6] mt-4'></div>
                <div className='flex gap-[21px] mt-[103px]'>
                    <div className='lg:w-1/2 min-h-[302px] rounded-lg shadow relative flex flex-col gap-[80px] '>
                        <Image src="profile_icon.svg" width={155} height={155} layout="" className='absolute left-[49px] top-[-80px]' />
                        <div className='flex px-[64px] pt-[93px] gap-[52px] '>
                            <div className='flex flex-col'>
                                <p className="text-black text-[28px] font-bold font-karla">Rohan</p>
                                <p className="text-black/40 text-[20px] font-normal font-karla">Kuku1222</p>
                            </div>
                            <div className='flex flex-col'>
                                <p className="text-black text-[28px] font-bold font-karla">53</p>
                                <p className="text-black text-xl font-normal font-karla leading-normal">Followers</p>
                            </div>
                            <div className='flex flex-col'>
                                <p className="text-black text-[28px] font-bold font-karla">453</p>
                                <p className="text-black/40 text-[20px] font-normal font-karla">Kuku1222</p>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex gap-[16px]'>
                                    <p className="text-black text-[28px] font-bold font-karla">4.7</p>
                                    <Image width={23} height={23} src='rating.svg' alt='' />
                                </div>

                                <p className="text-black/40 text-[20px] font-normal font-karla">Kuku1222</p>
                            </div>
                        </div>
                        <div className='px-[65px] flex gap-6'>
                            <div className="w-[252px] h-[39.40px] p-[13.70px] rounded-[20px] border border-[#b25cf3] justify-center items-center gap-[13.70px] inline-flex">
                                <div className="text-[#b25cf3] text-[19.18px] font-bold font-karla leading-[23.02px]">Share</div>
                            </div>
                            <div className="w-[250px] h-[39.40px] p-[13.70px] bg-[#2fbc74] rounded-[20px] justify-center items-center gap-[13.70px] inline-flex">
                                <div className="text-white text-[19.18px] font-bold font-karla leading-[23.02px]">Edit</div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/2 min-h-[302px] rounded-lg shadow '>
                        <div className='flex flex-col px-[30px] gap-8 py-8'>
                            <p className="text-black text-base font-bold font-karla leading-tight ">Description</p>
                            <p className="text-[#515151] text-base font-medium font-karla leading-normal">Discover your unique style with our curated collection at my feed. I offer a diverse range of trendy and timeless pieces, from chic dresses and casual wear to statement accessories and footwear.</p>
                            <p className="text-black text-base font-bold font-karla leading-tight ">Lives In</p>
                            <p className=" text-[#515151] text-base font-medium font-karla leading-normal">Dubai, UAE</p>
                            <p className="text-black text-base font-bold font-karla leading-tight ">Joined Kuku</p>
                            <p className=" text-[#515151] text-base font-medium font-karla leading-normal">1 year Ago</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfileSection
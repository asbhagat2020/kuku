import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='max-w-[1550px] mx-auto h-[500px] bg-[#FDE504] pt-[47px] -z-[50]'>
            <div className="px-[95px] justify-start items-start gap-[126px] inline-flex">
                <div className="w-[140px] px-2 py-3 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="self-stretch text-[#202020] text-sm font-extrabold font-karla uppercase leading-none">About</div>
                    <div className="text-[#e6207d] text-base font-normal font-karla leading-[17.60px]">Contact Us</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">About Us</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Locations</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Blogs</div>
                </div>
                <div className="w-[140px] px-2 py-3 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="self-stretch text-[#202020] text-sm font-extrabold font-karla uppercase leading-none">Categories</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Men</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Women</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Kids</div>
                </div>
                <div className="px-2 py-3 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="self-stretch text-[#202020] text-sm font-extrabold font-karla uppercase leading-none">Help</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Payments</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Shipping</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Cancellation & Returns</div>
                </div>
                <div className="px-2 py-3 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="w-[150px] text-[#202020] text-sm font-extrabold font-karla uppercase leading-none">Legal & Privacy</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Terms & Conditions</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Privacy Policy</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Accessibility</div>
                </div>
                <div className="px-2 py-3 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="w-[150px] text-[#202020] text-sm font-extrabold font-karla uppercase leading-none">CUSTOMER SERVICE</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Size Guide</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Shipping Information</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">Wishlist</div>
                    <div className="text-[#6a6a6a] text-base font-normal font-karla leading-[17.60px]">FAQs</div>
                </div>
            </div>
            <div className='px-[95px] pt-[80px] flex justify-between pb-[90px]'>
                <div className='flex flex-col gap-[16px]'>
                    <div className="flex gap-[1rem] items-center">
                        <Image src='kuku_logo.svg' width={56} height={61} />
                        <h1 className="text-black text-[37px] font-bold font-palanquin_dark leading-[44.40px]">KUKU</h1>
                    </div>
                    <div className='flex gap-4'>
                        <Image src='fb_logo.svg' width={24} height={24} />
                        <Image src='x_logo.svg' width={22} height={22} />
                        <Image src='linkedin_logo.svg' width={24} height={24} />
                        <Image src='insta_logo.svg' width={24} height={24} />
                    </div>
                </div>
                <div className='flex flex-col gap-[13px] items-center'>
                    <p className="text-[#6a6a6a] text-sm font-extrabold font-karla uppercase leading-none">Get special offers in our Newsletter</p>
                    <div className="h-[62px] pl-5 pr-[7px] py-1.5 rounded-[20px] border border-black justify-start items-center gap-[70px] inline-flex">
                        <div className="text-[#383838] text-sm font-normal font-karla leading-none">Enter your email</div>
                        <div className="px-[30px] py-5 bg-[#e4086f] rounded-[15px] justify-center items-center gap-[11px] flex">
                            <button className="text-[#fde504] text-base font-bold font-karla leading-[17.60px]">Subscribe</button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-[10px]'>
                    <Image src='/googlePlay.png' width={143} height={41} alt='' />
                    <Image src='/appStoreFooter.png' width={143} height={41} alt='' />
                </div>
            </div>
            <div className='h-[80px] w-full bg-[#E4086F] px-[70px] py-5'>
                <div className='flex justify-between '>
                    <div className='flex gap-[10px]'>
                    <Image src='/paypal.svg' width={35} height={23} alt='' />
                    <Image src='/paypal.svg' width={35} height={23} alt='' />
                    <Image src='/paypal.svg' width={35} height={23} alt='' />
                    <Image src='/paypal.svg' width={35} height={23} alt='' />

                    </div>
                    <div>
                    <p className="text-white text-[13px] font-normal font-karla leading-[14.30px]">Copyright © 2024 Kuku. All Rights Reserved.</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className='w-fit h-[26px] rounded-[12px] px-[8px] bg-white flex items-center gap-2'>
                        <Image src='/download-cloud.svg' width={18} height={18} alt='' />
                        <p className="text-[#2f2f2f] text-xs font-bold font-karla">Download Kuku</p>
                        </div>
                        <div className='flex gap-1 items-center '>
                        <Image src='/globe.svg' width={18} height={18} alt='' />
                        <p className="text-white text-xs font-bold font-karla">Change Region</p>
                        <Image src='/chevron-down.svg' width={16} height={16} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
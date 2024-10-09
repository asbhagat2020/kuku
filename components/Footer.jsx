import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <footer className='max-w-[1550px] mx-auto bg-[#FDE504] pt-12 pb-0'>
            <div className="px-4 sm:px-8 lg:px-[71px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
                <FooterColumn title="About">
                    <FooterLink href="#" highlighted>Contact Us</FooterLink>
                    <FooterLink href="#">About Us</FooterLink>
                    <FooterLink href="#">Locations</FooterLink>
                    <FooterLink href="#">Blogs</FooterLink>
                </FooterColumn>
                <FooterColumn title="Categories">
                    <FooterLink href="#">Men</FooterLink>
                    <FooterLink href="#">Women</FooterLink>
                    <FooterLink href="#">Kids</FooterLink>
                </FooterColumn>
                <FooterColumn title="Help">
                    <FooterLink href="#">Payments</FooterLink>
                    <FooterLink href="#">Shipping</FooterLink>
                    <FooterLink href="#">Cancellation & Returns</FooterLink>
                </FooterColumn>
                <FooterColumn title="Legal & Privacy">
                    <FooterLink href="#">Terms & Conditions</FooterLink>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Accessibility</FooterLink>
                </FooterColumn>
                <FooterColumn title="Customer Service">
                    <FooterLink href="#">Size Guide</FooterLink>
                    <FooterLink href="#">Shipping Information</FooterLink>
                    <FooterLink href="#">Wishlist</FooterLink>
                    <FooterLink href="#">FAQs</FooterLink>
                </FooterColumn>
            </div>

            <div className='px-4 sm:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
                <div className='flex flex-col gap-4'>
                    <div className="flex items-center gap-4">
                        <Image src='/kuku_logo.svg' width={56} height={61} alt="KUKU logo" />
                        <h1 className="text-black text-3xl font-bold font-palanquin_dark">KUKU</h1>
                    </div>
                    <div className='flex gap-4'>
                        <SocialIcon src='/fb_logo.svg' alt="Facebook" />
                        <SocialIcon src='/x_logo.svg' alt="X" />
                        <SocialIcon src='/linkedin_logo.svg' alt="LinkedIn" />
                        <SocialIcon src='/insta_logo.svg' alt="Instagram" />
                    </div>
                </div>

                <div className='flex flex-col gap-4 items-center'>
                    <p className="text-[#6a6a6a] text-sm font-extrabold font-karla uppercase">Get special offers in our Newsletter</p>
                    <div className="w-full max-w-md flex flex-col sm:flex-row items-center gap-2 p-2 rounded-[20px] border border-black">
                        <input type="email" placeholder="Enter your email" className="flex-grow p-2 bg-transparent text-[#383838] text-sm font-normal font-karla" />
                        <button className="w-full sm:w-auto px-6 py-3 bg-[#e4086f] rounded-[15px] text-[#fde504] text-base font-bold font-karla">Subscribe</button>
                    </div>
                </div>

                <div className='flex flex-col gap-4 items-center md:items-end'>
                    <Image src='/googlePlay.png' width={143} height={41} alt='Google Play' />
                    <Image src='/appStoreFooter.png' width={143} height={41} alt='App Store' />
                </div>
            </div>

            <div className='bg-[#E4086F] px-4 sm:px-8 lg:px-16 py-5'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-center'>
                    <div className='flex gap-2 justify-center sm:justify-start'>
                        <PaymentIcon src='/paypal.svg' />
                        <PaymentIcon src='/paypal.svg' />
                        <PaymentIcon src='/paypal.svg' />
                        <PaymentIcon src='/paypal.svg' />
                    </div>
                    <p className="text-white text-xs font-normal font-karla text-center">Copyright © 2024 Kuku. All Rights Reserved.</p>
                    <div className='flex flex-wrap gap-2 justify-center sm:justify-end'>
                        <button className='px-3 py-1 bg-white rounded-full flex items-center gap-2'>
                            <Image src='/download-cloud.svg' width={18} height={18} alt='' />
                            <span className="text-[#2f2f2f] text-xs font-bold font-karla">Download Kuku</span>
                        </button>
                        <button className='flex items-center gap-1'>
                            <Image src='/globe.svg' width={18} height={18} alt='' />
                            <span className="text-white text-xs font-bold font-karla">Change Region</span>
                            <Image src='/chevron-down.svg' width={16} height={16} alt='' />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const FooterColumn = ({ title, children }) => (
    <div className="flex flex-col gap-2.5">
        <h2 className="text-[#202020] text-sm font-extrabold font-karla uppercase">{title}</h2>
        {children}
    </div>
)

const FooterLink = ({ href, children, highlighted }) => (
    <a href={href} className={`text-base font-normal font-karla ${highlighted ? 'text-[#e6207d]' : 'text-[#6a6a6a]'}`}>
        {children}
    </a>
)

const SocialIcon = ({ src, alt }) => (
    <Image src={src} width={24} height={24} alt={alt} />
)

const PaymentIcon = ({ src }) => (
    <Image src={src} width={35} height={23} alt='Payment method' />
)

export default Footer
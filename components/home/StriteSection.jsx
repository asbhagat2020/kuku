import Image from 'next/image';
import React from 'react'
import Marquee from 'react-fast-marquee'

const StriteSection = () => {
    const texts = [
        { title: "Strite" },
        { title: "Stylish" },
        { title: "Stylish" },
        { title: "Strite" },
        { title: "Stylish" },
        { title: "Strite" },
        { title: "Stylish" },
        { title: "Strite" },
        { title: "Stylish" },
        { title: "Stylish" },

    ];

    return (
        <div className="relative max-w-[1550px] mx-auto h-[800px] overflow-hidden">
            <div className='absolute   left-[450px] right-0 top-[80px] z-10'>
                <Image unoptimized={true} alt='' width={550} height={576} src='/teenagers.png' />
            </div>
            {/* First marquee (top-left to bottom-right) */}
            <div className="absolute inset-0 -left-1/2 -top-1/2 w-[200%] h-[200%] transform rotate-[20deg]">
                <div className="absolute left-0 top-1/2 w-full">
                    <Marquee className='bg-[#E4086F] h-[105px] overflow-hidden' speed={50} direction='left' loop={0}>
                        {texts.map((item, index) => (
                            <div key={index} className='flex items-center'>
                                <div>
                                    <p className='mx-5 text-[#fde504] text-[90px] font-luckiest whitespace-nowrap'>{item.title}  -</p>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Second marquee (top-right to bottom-left) */}
            <div className="absolute inset-0 -left-1/2 -top-1/2 w-[200%] h-[200%] transform -rotate-[20deg]">
                <div className="absolute left-0 top-1/2 w-full">
                    <Marquee className='bg-[#b25bf2] h-[105px] overflow-hidden' speed={50} direction='left' loop={0}>
                        {texts.map((item, index) => (
                            <div key={index} className='flex items-center'>
                                <div>
                                    <p className='mx-5 text-[#fde504] text-[90px] font-luckiest whitespace-nowrap'>{item.title} -</p>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default StriteSection
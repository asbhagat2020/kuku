// import Image from 'next/image';
// import React from 'react';

// const MarketPlace = () => {
//     return (
//         <div className='max-w-[1550px] mx-auto h-[736px] bg-[#E4086F] mt-[-10px] z-10 relative'>
//             <div className='absolute top-[-85px] right-[0px]'>
//                 <Image src='/sun_top.png' width={100} height={100} alt=''/>
//             </div>
//             <div className='absolute top-[200px] left-[140px]'>
//                 <Image src='/snail.png' width={100} height={100} alt=''/>
//             </div>
//             <div className='absolute top-[200px] right-[280px]'>
//                 <Image src='/double_star.png' width={100} height={100} alt=''/>
//             </div>
//             <div className='absolute bottom-[150px] left-[280px]'>
//                 <Image src='/double_star.png' width={100} height={100} alt=''/>
//             </div>
//             <div className='absolute bottom-0 left-[70px]'>
//                 <Image src='/bottom_sun.png' width={100} height={100} alt=''/>
//             </div>
//             <div className='absolute bottom-[90px] right-[70px]'>
//                 <Image src='/cube.png' width={70} height={70} alt=''/>
//             </div>
//             <div className='flex h-full justify-center items-center'>
//             <h1 className="w-[50%] text-center text-[#f0fafe] text-7xl font-normal font-luckiest leading-[75.60px]">Your Sustainable Fashion Marketplace</h1>
//             </div>
//         </div>
//     );
// };

// export default MarketPlace;


import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const MarketPlace = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(
        () => {
            const sections = gsap.utils.toArray(".panel");

            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + sectionRef.current.offsetWidth,
                },
            });
        },
        { scope: sectionRef }
    );

    const cardData = [
        {
            number: "1",
            title: "$500 Billion is lost each year because of under-wearing and failure to recycle clothes",
            url:"marketPlace_BG.png"
        },
        {
            number: "2",
            title: "Nearly 10% of microplastics dispersed in the ocean each year come from textiles",
            url:"marketPlaceBg2.png"
        },
        {
            number: "3",
            title: "but You are going to help us avoid doing that :)",
            url:"marketPlaceBg3.png"
        }

    ];

    return (
        <div ref={triggerRef} className="relative overflow-hidden mt-[-10px] h-[900px] max-w-[1550px] mx-auto">
            <div className='absolute top-[-10px] right-0 z-10'>
                <Image width={100} height={100} src='/market_flower.png' alt=""/>
            </div>
            <div ref={sectionRef} className={`flex ${isMobile ? 'w-[300%]' : 'w-[300%]'} h-[906px] transform`}>

                {/* Panels for cards */}
                {cardData.map((card, index) => (
                    <div key={index} className="panel w-full h-full bg-white  relative overflow-hidden flex items-center justify-center "
                    style={{
                        backgroundImage: `url(${card.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    >
                        <div className="px-[27px] lg:px-0 lg:w-[650px]">
                            <div className="text-white  text-center text-2xl lg:text-5xl tracking-wide font-bold font-luckiest">
                               {card.title}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketPlace;
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
    const horizontalRef = useRef(null);
    const triggerRef = useRef(null);
    const verticalRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        // Create horizontal scroll animation
        const horizontalSections = gsap.utils.toArray(".horizontal-panel");

        const horizontalScroll = gsap.to(horizontalSections, {
            xPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: () => "+=" + horizontalRef.current.offsetWidth / 2,
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 1,
                    duration: { min: 0.2, max: 0.3 },
                    delay: 0,
                },
                markers: false,
            },
        });

        // Set up the vertical section to appear after horizontal scroll
        ScrollTrigger.create({
            trigger: verticalRef.current,
            start: "top bottom",
            end: "bottom bottom",
            markers: false,
        });

        return () => {
            horizontalScroll.kill();
        };
    }, { scope: triggerRef });

    const horizontalData = [
        {
            number: "1",
            title: "Nearly 10% of microplastics dispersed in the ocean each year come from textiles",

            url: "marketPlace_BG.png"
        },
        {
            number: "2",
            title: "$50 Billion is lost each year because of under-wearing and failure to recycle clothes",
            url: "marketPlaceBg2.png"
        }
    ];

    const verticalData = {
        number: "3",
        title: "Making just one pair of jeans uses 7,500 liters of water — that’s enough drinking water for one person for 7 years",
        url: "marketPlaceBg3.png"
    };

    return (
        <div className="overflow-x-hidden">
            {/* Horizontal Scroll Section */}
            <div ref={triggerRef} className="relative mt-[-10px] h-[900px] max-w-[1550px] mx-auto">
                <div className="absolute top-[-10px] right-0 z-10">
                    <Image width={100} height={100} src="/market_flower.png" alt="" />
                </div>
                <div
                    ref={horizontalRef}
                    className={`flex ${isMobile ? 'w-[200%]' : 'w-[200%]'} h-[906px] transform`}
                >
                    {horizontalData.map((card, index) => (
                        <div
                            key={index}
                            className="horizontal-panel w-full h-full bg-white relative overflow-hidden flex items-center justify-center"
                            style={{
                                backgroundImage: `url(${card.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <div className={`px-[27px] lg:px-0  ${index==1?"lg:w-[600px]":"lg:w-[650px]"}`}>
                                <div className="text-white text-center text-2xl lg:text-5xl tracking-wider font-bold font-luckiest">
                                    {card.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vertical Scroll Section */}
            <div
                ref={verticalRef}
                className="w-full h-[900px] bg-white relative overflow-hidden flex items-center justify-center max-w-[1550px] mx-auto"
                style={{
                    backgroundImage: `url(${verticalData.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="px-[27px] lg:px-0 lg:w-[650px]">
                    <div className="text-white text-center text-2xl lg:text-5xl tracking-wide font-bold font-luckiest">
                        {verticalData.title}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPlace;
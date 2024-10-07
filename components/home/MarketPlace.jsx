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
            title: " Your Sustainable Fashion Marketplace",
        },
        {
            number: "2",
            title: " Your Sustainable Fashion Marketplace",
        },
        // {
        //     number: "3",
        //     title: " Your Sustainable Fashion Marketplace",
        // },
        // {
        //     number: "4",
        //     title: " Your Sustainable Fashion Marketplace",
        // }

    ];

    return (
        <div ref={triggerRef} className="relative overflow-hidden mt-[-10px] h-[900px]">
            <div className='absolute top-[-10px] right-0 z-10'>
                <Image width={100} height={100} src='/market_flower.png'/>
            </div>
            <div ref={sectionRef} className={`flex ${isMobile ? 'w-[700%]' : 'w-[200%]'} h-[906px] transform`}>

                {/* Panels for cards */}
                {cardData.map((card, index) => (
                    <div key={index} className="panel w-full h-full bg-red-600  relative overflow-hidden flex items-center justify-center "
                        style={{
                            backgroundImage: "url('marketPlace_BG.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <div className="px-[27px] lg:px-0 w-[600px]">
                            <div className="text-white  text-center text-7xl lg:text-5xl font-bold font-luckiest">
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
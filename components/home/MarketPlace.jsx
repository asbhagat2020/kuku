import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const MarketPlace = () => {
    const horizontalRef = useRef(null);
    const triggerRef = useRef(null);
    const verticalRef = useRef(null);

    useGSAP(() => {
        // Create horizontal scroll animation
        const horizontalSections = gsap.utils.toArray(".horizontal-panel");
        
        // Calculate total width of horizontal sections
        const totalWidth = horizontalSections.reduce((sum, section) => 
            sum + section.offsetWidth, 0);
        
        const horizontalScroll = gsap.to(horizontalSections, {
            xPercent: -100 * (horizontalSections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: () => `+=${totalWidth - window.innerWidth}`,
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 1 / (horizontalSections.length - 1),
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
    }, []);

    const horizontalData = [
        {
            number: "1",
            title: "Nearly 10% of microplastics dispersed in the ocean each year come from textiles",
           url: "marketPlace_BG.png"
        },
        {
            number: "2",
            title: "$50 Billion is lost each year because of\nunder-wearing and failure to recycle clothes",
                    url: "marketPlaceBg2.png"
        }
    ];

    const verticalData = {
        number: "3",
        title: "Making just one pair of jeans uses 7,500 liters of water — that’s enough drinking water for one person for 7 years",
         url: "marketPlaceBg3.png"
    };

    return (
        <div className="overflow-x-hidden bg-white">
            {/* Horizontal Scroll Section */}
            <div 
                ref={triggerRef} 
                className="relative w-full h-screen min-h-[600px]"
            >
                <div className="absolute top-[-20px] right-0 z-50">
                    <Image 
                        width={150} 
                        height={150} 
                        src="/market_flower.png" 
                        alt="Decorative flower" 
                        className="w-16 md:w-24 lg:w-32"
                    />
                </div>
                
                <div
                    ref={horizontalRef}
                    className="flex w-auto h-full"
                >
                    {horizontalData.map((card, index) => (
                        <div
                            key={index}
                            className="horizontal-panel w-screen flex-shrink-0 h-full relative overflow-hidden flex items-center justify-center"
                        >
                            {/* Background image with proper sizing */}
                            <div 
                                className="absolute inset-0 w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${card.url})` }}
                            ></div>
                            

                            
                            <div className="relative z-10 px-4 sm:px-8 md:px-16 w-full max-w-4xl">
                                <div className="text-white text-center font-bold font-luckiest
                                    text-2xl sm:text-3xl 
                                    md:text-4xl lg:text-5xl 
                                    xl:text-[3.5rem] 2xl:text-[3.5rem]
                                    tracking-wide lg:tracking-wider
                                    leading-tight md:leading-snug">
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
                className="w-full h-screen min-h-[600px] relative overflow-hidden flex items-center justify-center"
            >
                {/* Background image with proper sizing */}
                <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${verticalData.url})` }}
                ></div>

                
                <div className="relative z-10 px-4 sm:px-8 md:px-16 w-full max-w-4xl">
                    <div className="text-white text-center font-bold font-luckiest
                        text-2xl sm:text-3xl 
                        md:text-4xl lg:text-5xl 
                        xl:text-[3.5rem] 2xl:text-[3.5rem]
                        tracking-wide
                        leading-tight md:leading-snug">
                        {verticalData.title}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPlace;
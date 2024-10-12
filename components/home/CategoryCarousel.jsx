"use client"
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion'

const CategoryCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [centerIndex, setCenterIndex] = useState(2); // Assuming 5 slides are visible
    const sliderRef = useRef(null);

    const products = [
        { title: "Dress", price: "12 AED", image: "/top.png" },
        { title: "Dress", price: "12 AED", image: "/bottom.png" },
        { title: "Dress", price: "12 AED", image: "/t-shirt.png" },
        { title: "Dress", price: "12 AED", image: "/top.png" },
        { title: "Dress", price: "12 AED", image: "/bottom.png" },
        { title: "Dress", price: "12 AED", image: "/t-shirt.png" },
        { title: "Dress", price: "12 AED", image: "/top.png" },
        { title: "Dress", price: "12 AED", image: "/bottom.png" },
        { title: "Dress", price: "12 AED", image: "/t-shirt.png" },
    ];

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4.5,
        slidesToScroll: 1,
        centerMode: false,
        beforeChange: (current, next) => setCurrentSlide(next),
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };
    const [isLeftHovered, setIsLeftHovered] = useState(false);
    const [isRightHovered, setIsRightHovered] = useState(false);


    useEffect(() => {
        // Update centerIndex when window is resized
        const handleResize = () => {
            const slidesToShow = window.innerWidth < 480 ? 1 : window.innerWidth < 600 ? 2 : window.innerWidth < 1024 ? 3 : 4;
            setCenterIndex(Math.floor(slidesToShow / 2));
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePreviousSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className="flex flex-col overflow-hidden px-[20px] md:px-0 md:ml-[-20px]">
            <Slider ref={sliderRef} {...settings}>
                {products.map((item, index) => (
                    <div className='relative' key={index}>
                        {index !== currentSlide + centerIndex && (
                            <div className="absolute top-2 left-10 md:left-[-50px] h-[25px] px-2.5 py-[5px] bg-[#e4086f]/10 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                                <div className="text-black text-xs font-normal font-karla">Top</div>
                            </div>
                        )}
                        <div
                            className={`w-[300px] h-[386px] ml-8 md:ml-[-60px]  bg-white transition-all duration-500 ${index === currentSlide + centerIndex ? "shadow-lg rounded-[155px]" : "rounded-[20px]"
                                }`}
                        >
                            <Image
                                src={item.image}
                                width={307}
                                height={307}
                                layout="responsive"
                                alt={item.title}
                                className='w-[307px] '
                            />
                        </div>
                    </div>
                ))}
            </Slider>
            <div className='flex mt-[76px] justify-center items-center gap-7'>
                <motion.div
                    whileHover={{
                        scale: 1.2,
                        backgroundColor: 'black',
                    }}
                    className='rounded-full w-[60px] h-[60px] bg-white flex justify-center items-center cursor-pointer'
                    onClick={handlePreviousSlide}
                    onMouseEnter={() => setIsLeftHovered(true)}
                    onMouseLeave={() => setIsLeftHovered(false)}
                >
                    <Image
                        width={18}
                        height={18}
                        src={isLeftHovered ? '/arrow_left_white.svg' : '/arrow_left.png'}
                        alt='Previous'
                    />
                </motion.div>
                <div className="h-[84px] px-[70px] py-[30px] bg-[#f0fafe] rounded-[20px] justify-center items-center gap-2.5 inline-flex">
                    <div className="text-[#070707] lg:text-xl font-bold font-karla leading-normal">
                        T-SHIRT
                    </div>
                </div>
                <motion.div
                    whileHover={{
                        scale: 1.2,
                        backgroundColor: 'black',
                    }}
                    className='rounded-full w-[60px] bg-[#f0fafe] h-[60px] flex justify-center items-center cursor-pointer'
                    onClick={handleNextSlide}
                    onMouseEnter={() => setIsRightHovered(true)}
                    onMouseLeave={() => setIsRightHovered(false)}
                >
                    <Image
                        width={18}
                        height={18}
                        src={isRightHovered ? '/arrow_right_white.svg' : '/arrow_right_black.svg'}
                        alt='Next'
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryCarousel;
"use client"
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
                    slidesToShow: 2,
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
        <div className="flex flex-col overflow-hidden ml-[-20px]">
            <Slider ref={sliderRef} {...settings}>
                {products.map((item, index) => (
                    <div key={index}>
                        <div
                            className={`w-[300px] h-[386px] ml-[-60px]  bg-white transition-all duration-500 ${
                                index === currentSlide + centerIndex ? "shadow-lg rounded-[155px]" : "rounded-[20px]"
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
                <div
                    className='rounded-full w-[60px] h-[60px] bg-white flex justify-center items-center cursor-pointer'
                    onClick={handlePreviousSlide}
                >
                    <Image width={18} height={18} src='/arrow_left.png' alt='Previous' />
                </div>
                <div className="h-[84px] px-[70px] py-[30px] bg-[#f0fafe] rounded-[20px] justify-center items-center gap-2.5 inline-flex">
                    <div className="text-[#070707] text-xl font-bold font-karla leading-normal">
                        T-SHIRT
                    </div>
                </div>
                <div
                    className='rounded-full w-[60px] h-[60px] bg-black flex justify-center items-center cursor-pointer'
                    onClick={handleNextSlide}
                >
                    <Image width={18} height={18} src='/arrow_right.png' alt='Next' />
                </div>
            </div>
        </div>
    );
};

export default CategoryCarousel;
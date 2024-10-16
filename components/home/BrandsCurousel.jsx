// "use client"
// import Image from 'next/image';
// import React, { useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const BrandCarousel = () => {
//     const [hoveredIndex, setHoveredIndex] = useState(null);

//     const products = [
//         { title: "Dress", price: "12 AED", image: "/nike.svg", hoverImage: "/nike_white.svg" },
//         { title: "Dress", price: "12 AED", image: "/adidas.png", hoverImage: "/adidas_white.svg" },
//         { title: "Dress", price: "12 AED", image: "/Vector.svg", hoverImage: "/Vector_white.svg" },
//         { title: "Dress", price: "12 AED", image: "/zara.svg", hoverImage: "/zara_white.svg" },
//         { title: "Dress", price: "12 AED", image: "/puma.svg", hoverImage: "/puma_white.svg" },
//         { title: "Dress", price: "12 AED", image: "/hm.svg", hoverImage: "/hm_white.svg" },
//         { title: "Dress", price: "12 AED", image: "/adidas.png", hoverImage: "/adidas_white.svg" },
//     ];

//     const settings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 6,
//         slidesToScroll: 1,
//         centerMode: false,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         infinite:true,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1
//                 }
//             }
//         ]
//     };

//     return (
//         <div className="overflow-hidden">
//             <Slider arrows={false} {...settings}>
//                 {products.map((item, index) => (
//                     <div key={index}>
//                         <div
//                             className={`w-[200px] h-[150px]  rounded-[20px] group bg-white hover:bg-black transition-all duration-500 flex justify-center items-center`}
//                             onMouseEnter={() => setHoveredIndex(index)}
//                             onMouseLeave={() => setHoveredIndex(null)}
//                         >
//                             <Image
//                                 unoptimized
//                                 src={hoveredIndex === index ? item.hoverImage : item.image}
//                                 width={100}
//                                 height={100}
//                                 layout="responsive"
//                                 alt={item.title}
//                                 className='max-w-[100px] h-[100px]'
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default BrandCarousel;

"use client";
import Image from "next/image";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

const BrandCarousel = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const products = [
        { title: "Dress", price: "12 AED", image: "/nike.svg", hoverImage: "/nike_white.svg" },
        { title: "Dress", price: "12 AED", image: "/adidas.png", hoverImage: "/adidas_white.svg" },
        { title: "Dress", price: "12 AED", image: "/Vector.svg", hoverImage: "/Vector_white.svg" },
        { title: "Dress", price: "12 AED", image: "/zara.svg", hoverImage: "/zara_white.svg" },
        { title: "Dress", price: "12 AED", image: "/puma.svg", hoverImage: "/puma_white.svg" },
        { title: "Dress", price: "12 AED", image: "/hm.svg", hoverImage: "/hm_white.svg" },
        { title: "Dress", price: "12 AED", image: "/adidas.png", hoverImage: "/adidas_white.svg" },
    ];

    return (
        <div className="overflow-hidden">
            <Marquee
                gradient={false}
                speed={50}
                pauseOnHover={true}
            >
                {products.map((item, index) => (
                    <div key={index} className="mx-4">
                        <div
                            className={`w-[200px] h-[150px] rounded-[20px] group bg-white hover:bg-black transition-all duration-500 flex justify-center items-center`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Image
                                unoptimized
                                src={hoveredIndex === index ? item.hoverImage : item.image}
                                width={100}
                                height={100}
                                layout="responsive"
                                alt={item.title}
                                className="max-w-[100px] h-[100px]"
                            />
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default BrandCarousel;

// "use client"
// import Image from 'next/image'
// import React from 'react'
// import dynamic from 'next/dynamic'

// const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false })
// import 'react-multi-carousel/lib/styles.css'

// const Carousels = () => {
//     const product = [
//         { title: "Dress", price: "12 AED", image: "/dress_1.png" },
//         { title: "Dress", price: "12 AED", image: "/dress_2.png" },
//         { title: "Dress", price: "12 AED", image: "/dress_3.png" },
//         { title: "Dress", price: "12 AED", image: "/dress_1.png" },
//         { title: "Dress", price: "12 AED", image: "/dress_2.png" },
//         { title: "Dress", price: "12 AED", image: "/dress_3.png" },
//         { title: "Dress", price: "12 AED", image: "/dress_1.png" },
//         { title: "Dress", price: "12 AED", image: "/dress_2.png" },
//         { title: "Dress", price: "12 AED", image: "/dress_3.png" },

//     ]

//     const responsive = {
//         superLargeDesktop: {
//             breakpoint: { max: 4000, min: 3000 },
//             items: 5
//         },
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 5
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 2
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1
//         }
//     }

//     return (
//         <Carousel
//             responsive={responsive}
//             swipeable={true}
//             draggable={true}
//             showDots={false}
//             infinite={false}
//             autoPlay={false}
//             arrows={false}
//             keyBoardControl={true}
//             customTransition="all .5"
//             transitionDuration={500}
//             containerClass="carousel-container"
//             removeArrowOnDeviceType={["tablet", "mobile"]}
//             dotListClass="custom-dot-list-style"
//             itemClass="carousel-item"

//         >

//             {product.map((item, index) => (
//                 <>
//                     <div key={index} className="min-w-[307px] min-h-[404px] rounded-[20px] relative">
//                         <div className="absolute top-2 right-2 z-10">
//                             <div className='h-[54px] p-[15px] bg-white/40 rounded-[100px]'>
//                                 <Image alt='' width={24} height={24} src='wishlist.svg' />
//                             </div>
//                         </div>
//                         <div className="absolute  min-w-[204px] bottom-2 left-4 text-center z-10">
//                             <button className="bg-[#FDE504] text-black/90 py-[20px] px-[57px] rounded-[20px] font-bold font-karla">
//                                 Buy Now
//                             </button>
//                         </div>
//                         <div className="absolute bottom-4 right-5 z-10">
//                             <div className='h-[54px] p-[15px] bg-white rounded-[100px]'>
//                                 <Image alt='' width={24} height={24} src='hand_shake.svg' />
//                             </div>
//                         </div>
//                         <Image src={item.image} width={307} height={404} layout="responsive" alt={item.title} />

//                     </div>
//                     <div className="mt-2">
//                         <h3 className='font-karla font-bold text-base'>{item.title}</h3>
//                         <p className='text-black text-[25px] font-bold font-karla leading-[30px]'>{item.price}</p>
//                     </div>
//                 </>
//             ))}

//         </Carousel>
//     )
// }

// export default Carousels

"use client"
import Image from 'next/image'
import React, { useState, useRef } from 'react'
import Slider from "react-slick"
import { motion } from 'framer-motion'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Carousels = () => {
    const [progress, setProgress] = useState(0)
    const sliderRef = useRef(null)

    const product = [
        { title: "Dress", price: "12 AED", image: "/dress_1.png" },
        { title: "Dress", price: "12 AED", image: "/dress_2.png" },
        { title: "Dress", price: "12 AED", image: "/dress_3.png" },
        { title: "Dress", price: "12 AED", image: "/dress_1.png" },
        { title: "Dress", price: "12 AED", image: "/dress_2.png" },
        { title: "Dress", price: "12 AED", image: "/dress_3.png" },
        { title: "Dress", price: "12 AED", image: "/dress_1.png" },
        { title: "Dress", price: "12 AED", image: "/dress_2.png" },
        { title: "Dress", price: "12 AED", image: "/dress_3.png" },
        { title: "Dress", price: "12 AED", image: "/dress_3.png" },
        { title: "Dress", price: "12 AED", image: "/dress_3.png" },
        { title: "Dress", price: "12 AED", image: "/dress_3.png" },

    ]

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
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
        afterChange: (current) => {
            const newProgress = (current / (product.length-4)) * 100
            setProgress(newProgress)
        }
    }

    return (
        <div className='pl-[50px]'>
            <Slider ref={sliderRef} {...settings}>
                {product.map((item, index) => (
                    <div key={index}>
                        <div className="w-[307px] h-[404px] rounded-[20px] relative mx-2">
                            <div className="absolute top-2 right-2 z-10">
                                <div className='h-[54px] p-[15px] bg-white/40 rounded-[100px]'>
                                    <Image alt='' width={24} height={24} src='wishlist.svg' />
                                </div>
                            </div>
                            <div className="absolute min-w-[204px] bottom-2 left-4 text-center z-10">
                                <button className="bg-[#FDE504] text-black/90 py-[20px] px-[57px] rounded-[20px] font-bold font-karla">
                                    Buy Now
                                </button>
                            </div>
                            <div className="absolute bottom-4 right-5 z-10">
                                <div className='h-[54px] p-[15px] bg-white rounded-[100px]'>
                                    <Image alt='' width={24} height={24} src='hand_shake.svg' />
                                </div>
                            </div>
                            <Image src={item.image} width={307} height={404} layout="responsive" alt={item.title} />
                        </div>
                        <div className="mt-2">
                            <h3 className='font-karla font-bold text-base'>{item.title}</h3>
                            <p className='text-black text-[25px] font-bold font-karla leading-[30px]'>{item.price}</p>
                        </div>
                    </div>
                ))}
            </Slider>
            <motion.div
                className="progress-bar"
                style={{
                    height: '4px',
                    backgroundColor: '#e0e0e0',
                    marginTop: '20px',
                    marginLeft: "70px",
                    marginRight: '70px',

                }}
            >
                <motion.div
                    className="progress"
                    style={{
                        height: '100%',
                        backgroundColor: '#E4086F',
                        borderRadius:"20px"
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </div>
    )
}

export default Carousels
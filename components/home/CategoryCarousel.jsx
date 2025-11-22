// "use client";
// import Image from "next/image";
// import React, { useState, useRef, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { useRouter } from "next/navigation"; // Add useRouter

// const CategoryCarousel = () => {
//   const [products, setProducts] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [centerIndex, setCenterIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const sliderRef = useRef(null);
//   const router = useRouter(); // Initialize router

//   // Fetch categories from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`);
        
//         if (response.data && response.data.data) {
//           const allCategories = response.data.data.flatMap((parentCat) =>
//             parentCat.categories
//               .filter((cat) => cat.status === "active")
//               .map((cat) => ({
//                 title: cat.categoryName,
//                 image: cat.image || "/default-category.png",
//                 price: "12 AED",
//               }))
//           );
//           setProducts(allCategories);
//         } else {
//           setError("No data received from API");
//         }
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         setError("Failed to fetch categories");
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const settings = {
//     dots: false,
//     arrows: false,
//     infinite: products.length > 1,
//     speed: 500,
//     slidesToShow: Math.min(4.36, products.length),
//     slidesToScroll: 1,
//     centerMode: true,
//     centerPadding: "0px",
//     beforeChange: (current, next) => setCurrentSlide(next),
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: Math.min(3, products.length),
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: Math.min(3, products.length),
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: Math.min(2.4, products.length),
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const [isLeftHovered, setIsLeftHovered] = useState(false);
//   const [isRightHovered, setIsRightHovered] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const handleResize = () => {
//         const slidesToShow =
//           window.innerWidth < 480
//             ? 1
//             : window.innerWidth < 600
//             ? 1
//             : window.innerWidth < 1024
//             ? 1
//             : 4;
//         setCenterIndex(Math.floor(slidesToShow / 4));
//       };

//       handleResize();
//       window.addEventListener("resize", handleResize);

//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   const handlePreviousSlide = () => {
//     if (sliderRef.current) {
//       sliderRef.current.slickPrev();
//     }
//   };

//   const handleNextSlide = () => {
//     if (sliderRef.current) {
//       sliderRef.current.slickNext();
//     }
//   };

//   // Handle category click to navigate to selling-page
//   const handleCategoryClick = (categoryName) => {
//     router.push(`/selling-page?categoryName=${encodeURIComponent(categoryName)}`);
//   };

//   const currentTitle = products[currentSlide]?.title.toUpperCase() || "CATEGORY";

//   if (loading) {
//     return (
//       <div className="w-full mx-auto flex flex-col overflow-hidden px-[20px] md:px-0 h-[400px] items-center justify-center">
//         <p>Loading categories...</p>
//       </div>
//     );
//   }

//   if (error || products.length === 0) {
//     return (
//       <div className="w-full mx-auto flex flex-col overflow-hidden px-[20px] md:px-0 h-[400px] items-center justify-center">
//         <p>{error || "No categories available"}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mx-auto flex flex-col overflow-hidden px-[20px] md:px-0 ">
//       <Slider ref={sliderRef} {...settings}>
//         {products.map((item, index) => (
//           <div className="relative" key={index}>
//             <div
//               className="cursor-pointer"
//               onClick={() => handleCategoryClick(item.title)} // Add click handler
//             >
//               {index !== currentSlide && (
//                 <div className="absolute top-2 left-10 md:left-[40px] h-[25px] px-2.5 py-[5px] bg-[#e4086f]/10 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
//                   <div className="text-black text-xs font-normal font-karla">
//                     {item.title}
//                   </div>
//                 </div>
//               )}
//               <div
//                 className={`w-[300px] h-[386px] mx-8 bg-white transition-all duration-500 ${
//                   index === currentSlide
//                     ? "shadow-lg rounded-[155px]"
//                     : "rounded-[20px]"
//                 }`}
//               >
//                 <Image
//                   src={item.image}
//                   width={307}
//                   height={307}
//                   layout="responsive"
//                   alt={item.title}
//                   className="w-[307px]"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//       <div className="flex mt-[76px] justify-center items-center gap-7">
//         {/* Mobile Arrow Buttons */}
//         <div className="sm:hidden flex items-center">
//           <div
//             className="rounded-full w-[60px] h-[60px] bg-white flex justify-center items-center cursor-pointer mr-4"
//             onClick={handlePreviousSlide}
//           >
//             <Image
//               width={18}
//               height={18}
//               src="/arrow_left.png"
//               alt="Previous"
//             />
//           </div>

//           <div className="h-[84px] px-4 py-4 bg-[#f0fafe] rounded-[20px] flex justify-center items-center gap-2.5">
//             <div className="text-[#070707] text-base sm:text-xl font-bold font-karla leading-normal">
//               {currentTitle}
//             </div>
//           </div>

//           <div
//             className="rounded-full w-[60px] h-[60px] bg-[#f0fafe] flex justify-center items-center cursor-pointer ml-4"
//             onClick={handleNextSlide}
//           >
//             <Image
//               width={18}
//               height={18}
//               src="/arrow_right_black.svg"
//               alt="Next"
//             />
//           </div>
//         </div>

//         <div className="hidden sm:flex">
//           <motion.div
//             whileHover={{
//               scale: 1.2,
//               backgroundColor: "black",
//             }}
//             className="rounded-full w-[60px] h-[60px] bg-white flex justify-center items-center cursor-pointer"
//             onClick={handlePreviousSlide}
//             onMouseEnter={() => setIsLeftHovered(true)}
//             onMouseLeave={() => setIsLeftHovered(false)}
//           >
//             <Image
//               width={18}
//               height={18}
//               src={isLeftHovered ? "/arrow_left_white.svg" : "/arrow_left.png"}
//               alt="Previous"
//             />
//           </motion.div>
//         </div>

//         <div className="hidden sm:flex h-[84px] w-[220px] px-4 sm:px-[60px] py-4 sm:py-[30px] bg-[#f0fafe] rounded-[20px] justify-center items-center gap-2.5">
//           <div className="text-[#070707] text-base sm:text-xl font-bold font-karla leading-normal">
//             {currentTitle}
//           </div>
//         </div>

//         <div className="hidden sm:flex">
//           <motion.div
//             whileHover={{
//               scale: 1.2,
//               backgroundColor: "black",
//             }}
//             className="rounded-full w-[60px] bg-[#f0fafe] h-[60px] flex justify-center items-center cursor-pointer"
//             onClick={handleNextSlide}
//             onMouseEnter={() => setIsRightHovered(true)}
//             onMouseLeave={() => setIsRightHovered(false)}
//           >
//             <Image
//               width={18}
//               height={18}
//               src={
//                 isRightHovered
//                   ? "/arrow_right_white.svg"
//                   : "/arrow_right_black.svg"
//               }
//               alt="Next"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;







"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

const CategoryCarousel = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const router = useRouter();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`);
        
        if (response.data && response.data.data) {
          const allCategories = response.data.data.flatMap((parentCat) =>
            parentCat.categories
              .filter((cat) => cat.status === "active")
              .map((cat) => ({
                title: cat.categoryName,
                image: cat.image || "/default-category.png",
                price: "12 AED",
              }))
          );
          setProducts(allCategories);
        } else {
          setError("No data received from API");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: products.length > 1,
    speed: 500,
    slidesToShow: Math.min(4.36, products.length),
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: Math.min(4, products.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: Math.min(3.5, products.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(3, products.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, products.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2.4, products.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const slidesToShow =
          window.innerWidth < 480
            ? 1
            : window.innerWidth < 768
            ? 2.4
            : window.innerWidth < 1024
            ? 3
            : window.innerWidth < 1280
            ? 3
            : window.innerWidth < 1470
            ? 3.5
            : window.innerWidth < 1536
            ? 4
            : 4.36;
        setCenterIndex(Math.floor(slidesToShow / 2));
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
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

  // Handle category click to navigate to selling-page
  const handleCategoryClick = (categoryName) => {
    router.push(`/selling-page?categoryName=${encodeURIComponent(categoryName)}`);
  };

  const currentTitle = products[currentSlide]?.title.toUpperCase() || "CATEGORY";

  if (loading) {
    return (
      <div className="w-full mx-auto flex flex-col overflow-hidden px-[20px] md:px-0 h-[400px] items-center justify-center">
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="w-full mx-auto flex flex-col overflow-hidden px-[20px] md:px-0 h-[400px] items-center justify-center">
        <p>{error || "No categories available"}</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto flex flex-col overflow-hidden px-[20px] md:px-0">
      <Slider ref={sliderRef} {...settings}>
        {products.map((item, index) => (
          <div className="relative" key={index}>
            <div
              className="cursor-pointer"
              onClick={() => handleCategoryClick(item.title)}
            >
              {index !== currentSlide && (
                <div className="absolute top-2 left-10 md:left-[40px] h-[25px] px-2.5 py-[5px] bg-[#e4086f]/10 rounded-[10px] justify-center items-center gap-2.5 inline-flex z-10">
                  <div className="text-black text-xs font-normal font-karla">
                    {item.title}
                  </div>
                </div>
              )}
              <div
                className={`w-[300px] h-[386px] mx-8 bg-white transition-all duration-500 ${
                  index === currentSlide
                    ? "shadow-lg rounded-[155px]"
                    : "rounded-[20px]"
                }`}
              >
                <Image
                  src={item.image}
                  width={307}
                  height={307}
                  layout="responsive"
                  alt={item.title}
                  className="w-[307px]"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex mt-[76px] justify-center items-center gap-7">
        {/* Mobile Arrow Buttons */}
        <div className="sm:hidden flex items-center">
          <div
            className="rounded-full w-[60px] h-[60px] bg-white flex justify-center items-center cursor-pointer mr-4"
            onClick={handlePreviousSlide}
          >
            <Image
              width={18}
              height={18}
              src="/arrow_left.png"
              alt="Previous"
            />
          </div>

          <div className="h-[84px] px-4 py-4 bg-[#f0fafe] rounded-[20px] flex justify-center items-center gap-2.5">
            <div className="text-[#070707] text-base sm:text-xl font-bold font-karla leading-normal">
              {currentTitle}
            </div>
          </div>

          <div
            className="rounded-full w-[60px] h-[60px] bg-[#f0fafe] flex justify-center items-center cursor-pointer ml-4"
            onClick={handleNextSlide}
          >
            <Image
              width={18}
              height={18}
              src="/arrow_right_black.svg"
              alt="Next"
            />
          </div>
        </div>

        <div className="hidden sm:flex">
          <motion.div
            whileHover={{
              scale: 1.2,
              backgroundColor: "black",
            }}
            className="rounded-full w-[60px] h-[60px] bg-white flex justify-center items-center cursor-pointer"
            onClick={handlePreviousSlide}
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
          >
            <Image
              width={18}
              height={18}
              src={isLeftHovered ? "/arrow_left_white.svg" : "/arrow_left.png"}
              alt="Previous"
            />
          </motion.div>
        </div>

        <div className="hidden sm:flex h-[84px] w-[220px] px-4 sm:px-[60px] py-4 sm:py-[30px] bg-[#f0fafe] rounded-[20px] justify-center items-center gap-2.5">
          <div className="text-[#070707] text-base sm:text-xl font-bold font-karla leading-normal">
            {currentTitle}
          </div>
        </div>

        <div className="hidden sm:flex">
          <motion.div
            whileHover={{
              scale: 1.2,
              backgroundColor: "black",
            }}
            className="rounded-full w-[60px] bg-[#f0fafe] h-[60px] flex justify-center items-center cursor-pointer"
            onClick={handleNextSlide}
            onMouseEnter={() => setIsRightHovered(true)}
            onMouseLeave={() => setIsRightHovered(false)}
          >
            <Image
              width={18}
              height={18}
              src={
                isRightHovered
                  ? "/arrow_right_white.svg"
                  : "/arrow_right_black.svg"
              }
              alt="Next"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
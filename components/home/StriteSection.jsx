// import Image from "next/image";
// import React from "react";
// import Marquee from "react-fast-marquee";

// const StriteSection = () => {
//   return (
//     <div
//       className="relative w-full mx-auto min-h-[600px] md:min-h-[800px] lg:min-h-[1050px] overflow-hidden"
//       style={{
//         backgroundImage: "url('/strite_bg.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Image section */}
//       <div className="absolute left-[100px] top-[250px] sm:left-[200px] md:left-[200px] lg:left-[250px] xl:left-[450px] lg:top-[350px] z-10">
//         <Image
//           unoptimized
//           alt="Teenagers"
//           width={300}
//           height={300}
//           className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[576px]"
//           src="/teenagers.png"
//         />
//       </div>

//       {/* First marquee (top-left to bottom-right) */}
//       <div className="absolute inset-0 -left-1/2 -top-1/2 w-[200%] h-[200%] transform rotate-[20deg]">
//         <div className="absolute left-0 top-1/2 w-full">
//           <Marquee
//             className="bg-[#E4086F] h-[55px] sm:h-[75px] md:h-[105px] overflow-hidden"
//             speed={50}
//             direction="left"
//             loop={0}
//           >
//             {[...Array(10)].map((_, index) => (
//               <div key={index} className="flex items-center">
//                 <div>
//                   <p className="mx-5 text-[#fde504] text-[36px] sm:text-[48px] md:text-[65px] lg:text-[90px] font-luckiest whitespace-nowrap">
//                     Sustainable -
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </Marquee>
//         </div>
//       </div>

//       {/* Second marquee (top-right to bottom-left) */}
//       <div className="absolute inset-0 -left-1/2 -top-1/2 w-[200%] h-[200%] transform -rotate-[20deg]">
//         <div className="absolute left-0 top-1/2 w-full">
//           <Marquee
//             className="bg-[#b25bf2] h-[55px] sm:h-[75px] md:h-[105px] overflow-hidden"
//             speed={50}
//             direction="left"
//             loop={0}
//           >
//             {[...Array(10)].map((_, index) => (
//               <div key={index} className="flex items-center">
//                 <div>
//                   <p className="mx-5 text-[#fde504] text-[36px] sm:text-[48px] md:text-[65px] lg:text-[90px] font-luckiest whitespace-nowrap">
//                     Circular Economy -
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </Marquee>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StriteSection;









import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const StriteSection = () => {
  return (
    <div
      className="relative w-full mx-auto min-h-[600px] md:min-h-[800px] lg:min-h-[1050px] overflow-hidden"
      style={{
        backgroundImage: "url('/strite_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Centered Image */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[200px] sm:top-[250px] md:top-[300px] lg:top-[350px] xl:top-[400px] z-10">
        <Image
          unoptimized
          alt="Teenagers"
          width={300}
          height={300}
          className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[576px]"
          src="/teenagers.png"
        />
      </div>

      {/* First Marquee (Sustainable) */}
      <div className="absolute inset-0 -left-1/2 -top-1/2 w-[200%] h-[200%] transform rotate-[20deg]">
        <div className="absolute left-0 top-1/2 w-full">
          <Marquee
            className="bg-[#E4086F] h-[55px] sm:h-[75px] md:h-[105px] overflow-hidden"
            speed={50}
            direction="left"
            loop={0}
          >
            {[...Array(10)].map((_, index) => (
              <p
                key={index}
                className="mx-5 text-[#fde504] text-[36px] sm:text-[48px] md:text-[65px] lg:text-[90px] font-luckiest whitespace-nowrap"
              >
                Sustainable -
              </p>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Second Marquee (Circular Economy) */}
      <div className="absolute inset-0 -left-1/2 -top-1/2 w-[200%] h-[200%] transform -rotate-[20deg]">
        <div className="absolute left-0 top-1/2 w-full">
          <Marquee
            className="bg-[#b25bf2] h-[55px] sm:h-[75px] md:h-[105px] overflow-hidden"
            speed={50}
            direction="left"
            loop={0}
          >
            {[...Array(10)].map((_, index) => (
              <p
                key={index}
                className="mx-5 text-[#fde504] text-[36px] sm:text-[48px] md:text-[65px] lg:text-[90px] font-luckiest whitespace-nowrap"
              >
                Circular Economy -
              </p>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default StriteSection;

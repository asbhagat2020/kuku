// import { useEffect, useState } from "react";

// const categories = [
//   {
//     title: "Tops",
//     items: [
//       "T-Shirts",
//       "Dress Shirts",
//       "Polo Shirts",
//       "Henley Shirts",
//       "Casual Button-Up Shirts",
//       "Sweaters",
//       "Hoodies",
//     ],
//   },
//   {
//     title: "Bottoms",
//     items: [
//       "Jeans",
//       "Trousers",
//       "Chinos",
//       "Shorts",
//       "Cargo Pants",
//       "Sweatpants",
//       "Joggers",
//     ],
//   },
//   {
//     title: "Suits and Formal Wear",
//     items: [
//       "Business Suits",
//       "Tuxedos",
//       "Blazers",
//       "Dress Pants",
//       "Waistcoats",
//       "Dress Shirts",
//     ],
//   },
//   {
//     title: "Outerwear",
//     items: [
//       "Jackets",
//       "Coats",
//       "Overcoats",
//       "Parkas",
//       "Pea Coats",
//       "Bomber Jackets",
//       "Leather Jackets",
//     ],
//   },
//   {
//     title: "Activewear",
//     items: [
//       "Athletic Shorts",
//       "Athletic T-Shirts",
//       "Track Pants",
//       "Running Shorts",
//       "Performance Hoodies",
//       "Sports Jerseys",
//       "Compression Gear",
//     ],
//   },
//   {
//     title: "Underwear",
//     items: [
//       "Boxer Briefs",
//       "Boxers",
//       "Briefs",
//       "Trunks",
//       "Thermal Underwear",
//       "Undershirts",
//       "Long Johns",
//     ],
//   },
//   {
//     title: "Sleepwear",
//     items: [
//       "Pajama Sets",
//       "Sleep Shorts",
//       "Sleep Pants",
//       "Robes",
//       "Lounge Pants",
//       "Onesies",
//     ],
//   },
//   {
//     title: "Swimwear",
//     items: [
//       "Swim Trunks",
//       "Board Shorts",
//       "Swim Briefs",
//       "Rash Guards",
//     ],
//   },
//   {
//     title: "Footwear",
//     items: [
//       "Sneakers",
//       "Dress Shoes",
//       "Casual Shoes",
//       "Boots",
//       "Loafers",
//       "Sandals",
//       "Slippers",
//     ],
//   },
//   {
//     title: "Workwear",
//     items: [
//       "Dress Shirts",
//       "Dress Pants",
//       "Business Suits",
//       "Ties",
//       "Work Boots",
//       "Safety Gear",
//     ],
//   },
//   {
//     title: "Casual Wear",
//     items: [
//       "Graphic T-Shirts",
//       "Cargo Shorts",
//       "Denim Jackets",
//       "Flannel Shirts",
//       "Casual Sneakers",
//       "Baseball Caps",
//     ],
//   },
//   {
//     title: "Outdoor and Adventure",
//     items: [
//       "Hiking Pants",
//       "Outdoor Jackets",
//       "Performance Fleece",
//       "Waterproof Boots",
//       "Camping Gear",
//     ],
//   },
//   {
//     title: "Ethnic and Cultural Attire",
//     items: [
//       "Kimono",
//       "Dashiki",
//       "Kilt",
//       "Sherwani",
//       "Thobe",
//       "Djellaba",
//       "Lederhosen",
//     ],
//   },
// ];

// export default function MenDropdown() {
//   const [isMenHovered, setIsMenHovered] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   // Ensure the component only renders on the client
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null; // Prevent SSR mismatch

//   return (
//     <div
//       className="relative z-50 group md:z-50"
//       onMouseEnter={() => setIsMenHovered(true)}
//       onMouseLeave={() => setIsMenHovered(false)}
//     >
//       {/* Navigation Link with Underline Effect */}
//       <div className="relative lg:py-[33px]">
//         <a href="#" className="text-[#fefae5] hover:text-pink-500">
//           MEN
//         </a>
//         {/* Underline effect */}
//         <div
//           className={`absolute bottom-0 left-0 lg:w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
//             isMenHovered ? 'scale-x-100' : 'scale-x-0'
//           }`}
//         />
//       </div>

//       {/* Invisible bridge to prevent hover gap */}
//       <div className="absolute h-8 w-full" />

//       {/* Dropdown Menu */}
//       {isMenHovered && (
//         <div className="absolute lg:left-[-150px] lg:top-full w-max bg-white shadow-lg p-4 z-10 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
//          <style jsx>{`
//             .thin-scrollbar {
//               scrollbar-width: thin;
//               scrollbar-color: #E5E7EB transparent;
//             }
//             .thin-scrollbar::-webkit-scrollbar {
//               width: 2px;
//             }
//             .thin-scrollbar::-webkit-scrollbar-track {
//               background: transparent;
//             }
//             .thin-scrollbar::-webkit-scrollbar-thumb {
//               background-color: #E5E7EB;
//               border-radius: 20px;
//             }
//             .thin-scrollbar::-webkit-scrollbar-thumb:hover {
//               background-color: #D1D5DB;
//             }
//           `}</style>
//           {categories.map((category) => (
//             <div key={category.title}>
//               <h4 className="font-bold text-pink-500 mb-4 text-sm sm:text-base">
//                 {category.title}
//               </h4>
//               <ul className="space-y-2 text-xs sm:text-sm">
//                 {category.items.map((item) => (
//                   <li key={item}>
//                     <a href="#" className="text-gray-600 hover:text-pink-500">
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
  

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

const categories = [
  {
    title: "Tops",
    items: [
      "T-Shirts",
      "Dress Shirts",
      "Polo Shirts",
      "Henley Shirts",
      "Casual Button-Up Shirts",
      "Sweaters",
      "Hoodies",
    ],
  },
  {
    title: "Bottoms",
    items: [
      "Jeans",
      "Trousers",
      "Chinos",
      "Shorts",
      "Cargo Pants",
      "Sweatpants",
      "Joggers",
    ],
  },
  {
    title: "Suits and Formal Wear",
    items: [
      "Business Suits",
      "Tuxedos",
      "Blazers",
      "Dress Pants",
      "Waistcoats",
      "Dress Shirts",
    ],
  },
  {
    title: "Outerwear",
    items: [
      "Jackets",
      "Coats",
      "Overcoats",
      "Parkas",
      "Pea Coats",
      "Bomber Jackets",
      "Leather Jackets",
    ],
  },
  {
    title: "Activewear",
    items: [
      "Athletic Shorts",
      "Athletic T-Shirts",
      "Track Pants",
      "Running Shorts",
      "Performance Hoodies",
      "Sports Jerseys",
      "Compression Gear",
    ],
  },
  {
    title: "Underwear",
    items: [
      "Boxer Briefs",
      "Boxers",
      "Briefs",
      "Trunks",
      "Thermal Underwear",
      "Undershirts",
      "Long Johns",
    ],
  },
  {
    title: "Sleepwear",
    items: [
      "Pajama Sets",
      "Sleep Shorts",
      "Sleep Pants",
      "Robes",
      "Lounge Pants",
      "Onesies",
    ],
  },
  {
    title: "Swimwear",
    items: [
      "Swim Trunks",
      "Board Shorts",
      "Swim Briefs",
      "Rash Guards",
    ],
  },
  {
    title: "Footwear",
    items: [
      "Sneakers",
      "Dress Shoes",
      "Casual Shoes",
      "Boots",
      "Loafers",
      "Sandals",
      "Slippers",
    ],
  },
  {
    title: "Workwear",
    items: [
      "Dress Shirts",
      "Dress Pants",
      "Business Suits",
      "Ties",
      "Work Boots",
      "Safety Gear",
    ],
  },
  {
    title: "Casual Wear",
    items: [
      "Graphic T-Shirts",
      "Cargo Shorts",
      "Denim Jackets",
      "Flannel Shirts",
      "Casual Sneakers",
      "Baseball Caps",
    ],
  },
  {
    title: "Outdoor and Adventure",
    items: [
      "Hiking Pants",
      "Outdoor Jackets",
      "Performance Fleece",
      "Waterproof Boots",
      "Camping Gear",
    ],
  },
  {
    title: "Ethnic and Cultural Attire",
    items: [
      "Kimono",
      "Dashiki",
      "Kilt",
      "Sherwani",
      "Thobe",
      "Djellaba",
      "Lederhosen",
    ],
  },
];

export default function MenDropdown() {
  const [isMenHovered, setIsMenHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden relative z-50">
        <button
          onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
          className="flex items-center justify-between w-full p-4 text-[#fefae5] hover:text-pink-500"
        >
          <span className="font-bold z-50">MEN</span>
          {isMainMenuOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {isMainMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg max-h-[70vh] overflow-y-auto thin-scrollbar">
            {categories.map((category) => (
              <div key={category.title} className="border-t border-gray-100 z-50">
                <button
                  onClick={() => setOpenCategory(openCategory === category.title ? null : category.title)}
                  className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gray-50"
                >
                  <span className="text-sm font-medium">{category.title}</span>
                  <ChevronRight 
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      openCategory === category.title ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                
                {openCategory === category.title && (
                  <div className="bg-gray-50 px-4 py-2">
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-pink-500"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div
        className="hidden lg:block relative z-50 group"
        onMouseEnter={() => setIsMenHovered(true)}
        onMouseLeave={() => setIsMenHovered(false)}
      >
        <div className="relative lg:py-[33px]">
          <a href="#" className="text-[#fefae5] hover:text-pink-500">
            MEN
          </a>
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
              isMenHovered ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </div>

        <div className="absolute h-8 w-full" />

        {isMenHovered && (
          <div className="absolute lg:left-[-150px] lg:top-full w-max bg-white shadow-lg p-4 z-10 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
            <style jsx>{`
              .thin-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #E5E7EB transparent;
              }
              .thin-scrollbar::-webkit-scrollbar {
                width: 2px;
              }
              .thin-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb {
                background-color: #E5E7EB;
                border-radius: 20px;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #D1D5DB;
              }
            `}</style>
            {categories.map((category) => (
              <div key={category.title}>
                <h4 className="font-bold text-pink-500 mb-4 text-base">
                  {category.title}
                </h4>
                <ul className="space-y-2 text-sm">
                  {category.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 hover:text-pink-500">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// import { useEffect, useState } from "react";
// import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
// import { usePathname } from "next/navigation";


// const categories = [
//   {
//     title: "Tops",
//     items: [
//       "T-shirts",
//       "Tank tops and Camis",
//       "Blouses",
//       "Other Tops",
//     ],
//   },
//   {
//     title: "Bottoms",
//     items: [
//       "Pants",
//       "Jeans",
//       "Skirts",
//       "Sweatpants",
//       "Legging",
//       "Shorts"

//     ],
//   },
//   {
//     title: "Dresses",
//     items: [
//       "Short Dresses",
//       "Long Dresses",
//       "Midi dresses",
//       "Maxi dresses",
//     ],
//   },
//   {
//     title: "Activewear",
//     items: [
//       "Active Sets",
//       "Active Bottoms",
//       "Active Tops",
//       "Active Jackets",
//       "Active Caps",
//     ],
//   },
//   {
//     title: "Denim",
//     items: [
//       "Denim Jeans",
//       "Denim shorts",
//       "Denim skirts",
//       "Denim Jackets",
//       "Denim Tops",
//       "Denim dresses",
//       "Denim Co-Ords"
//     ],
//   },
//   {
//     title: "Jacets and Coats",
//     items: [
//       "Coats, Jackets",
//       "Winter Coats",
//       "Overcoats",
//       "Lightweight Jackets",
//       "Faux Fur Coats",
//       "Trench Coats",
//       "Down Coats"
//     ],
//   },
//   {
//     title: "Suits",
//     items: [
//       "Suit Sets",
//       "Suit Pants",
//       "Blazers",
//       "Lightweight Blazers",
//     ],
//   },
//   {
//     title: "Jumpsuits & Bodysuits",
//     items: [
//       "Jumpsuits",
//       "Bodysuits",
//       " Unitards",
//     ],
//   },

//   {
//     title: "Beachwear",
//     items: [
//       "One-pieces",
//       "Bikini sets",
//       "Cover Ups",
//       "Burkinis",
//       "Kimonos",
//       "Tankinis",
//       "Bikini Bottoms",
//       "Bikini Tops",
//       "Rashguards",
//       "Beach Dresses"
//     ],
//   },
//   {
//     title: "Party Wear",
//     items: [
//       "Prom Dresses",
//       "Evening Dresses",
//       "Cocktail Dresses",
//       "Party Jumpsuits",
//       "Homecoming Dresses",
//       "Semi-Formal Dresses",
//       "Maxi-Party Dresses",
//     ],
//   },
//   {
//     title: "Wedding",
//     items: [
//       "Wedding Dresses",
//       "Bridesmaid Dresses",
//     ],
//   },
//   {
//     title: "Maternity",
//     items: [
//       "Maternity Dresses",
//       "Maternity Bottoms",
//       "Maternity Tops",
//       "Maternity Two-Piece",
//       "Maternity Denim",
//       "Nursing",
//       "Maternity Jumpsuits",
//       "Maternity Party Wear",
//       "Maternity Active Wear",
//       "Maternity Beachwear",
//       "Maternity Coats & Jackets"
//     ],
//   },
//   {
//     title: "Sleep & Lounge",
//     items: [
//       "Sleepwear",
//       "Pyajama Sets",
//       "Night Dresses",
//       "Robes",
//     ],
//   },
//   {
//     title: "Arabian Wear",
//     items: [
//       "Arabian Dresses",
//       "Kaftan and Jalabiya",
//       "Abayas",
//       "Modest Evening Gown"
//     ],
//   },
//   {
//     title: "Sweater and Cardigan",
//     items: [
//     ],
//   },
//   {
//     title: "Hoodie and Sweatshirts",
//     items: [
//     ],
//   },
//   {
//     title: "Co-ords",
//     items: [
//     ],
//   },

// ];



// export default function WomenDropdown({ isOpen, onToggle }) {
//   const [isWomenHovered, setIsWomenHovered] = useState(false);
//   const [isMounted, setIsMounted] = useState(false); // Prevent SSR mismatch
//   const [openCategory, setOpenCategory] = useState(null);
//   const path = usePathname();

//   const isHome = path === "/";

//   // Ensure the component only renders fully on the client
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);



//   if (!isMounted) return null; // Avoid rendering on the server

//   return (
//     <>
//       {/* Mobile View */}
//       <div className="lg:hidden relative z-50">
//         <button
//           onClick={onToggle}
//           className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500 z-0"
//         >
//           <span className="font-bold ">WOMEN</span>
//           {isOpen ? (
//             <ChevronUp className="w-5 h-5" />
//           ) : (
//             <ChevronDown className="w-5 h-5" />
//           )}
//         </button>

//         {isOpen && (
//             <div className="w-full bg-white shadow-lg overflow-y-auto">
//             <style jsx>{`
//               .thin-scrollbar {
//                 scrollbar-width: thin;
//                 scrollbar-color: #e5e7eb transparent;
//               }
//               .thin-scrollbar::-webkit-scrollbar {
//                 width: 2px;
//               }
//               .thin-scrollbar::-webkit-scrollbar-track {
//                 background: transparent;
//               }
//               .thin-scrollbar::-webkit-scrollbar-thumb {
//                 background-color: #e5e7eb;
//                 border-radius: 20px;
//               }
//               .thin-scrollbar::-webkit-scrollbar-thumb:hover {
//                 background-color: #d1d5db;
//               }
//             `}</style>
//             {categories.map((category) => (
//               <div key={category.title} className="border-t border-gray-100">
//                 <button
//                   onClick={() => setOpenCategory(openCategory === category.title ? null : category.title)}
//                   className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gray-50"
//                 >
//                   <span className="text-sm font-medium">{category.title}</span>
//                   <ChevronRight
//                     className={`w-5 h-5 transform transition-transform duration-200 ${
//                       openCategory === category.title ? 'rotate-90' : ''
//                     }`}
//                   />
//                 </button>

//                 {openCategory === category.title && (
//                   <div className="bg-gray-50 px-4 py-2">
//                     <ul className="space-y-2">
//                       {category.items.map((item) => (
//                         <li key={item}>
//                           <a
//                             href="#"
//                             className="block py-2 px-4 text-sm text-gray-600 hover:text-pink-500"
//                           >
//                             {item}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Desktop View */}
//       <div
//         className="hidden lg:block relative z-50 group lg:z-40"
//         onMouseEnter={() => setIsWomenHovered(true)}
//         onMouseLeave={() => setIsWomenHovered(false)}
//       >
//         <div className="relative lg">
//           <a href="#" className={`${
//                   isHome ? "text-[#fefae5]" : "text-black"
//                 } text-base font-bold font-karla leading-tight hover:text-pink-500`}>
//           WOMEN
//           </a>
//           <div
//             className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
//               isWomenHovered ? 'scale-x-100' : 'scale-x-0'
//             }`}
//           />
//         </div>

//         <div className="absolute h-8 w-full" />

//         {isWomenHovered && (
//           <div className="absolute lg:left-[-200px] lg:top-full w-max bg-white shadow-lg p-4 z-10 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
//             <style jsx>{`
//               .thin-scrollbar {
//                 scrollbar-width: thin;
//                 scrollbar-color: #E5E7EB transparent;
//               }
//               .thin-scrollbar::-webkit-scrollbar {
//                 width: 2px;
//               }
//               .thin-scrollbar::-webkit-scrollbar-track {
//                 background: transparent;
//               }
//               .thin-scrollbar::-webkit-scrollbar-thumb {
//                 background-color: #E5E7EB;
//                 border-radius: 20px;
//               }
//               .thin-scrollbar::-webkit-scrollbar-thumb:hover {
//                 background-color: #D1D5DB;
//               }
//             `}</style>
//             {categories.map((category) => (
//               <div key={category.title}>
//                 <h4 className="font-bold text-pink-500 mb-4 text-base">
//                   {category.title}
//                 </h4>
//                 <ul className="space-y-2 text-sm">
//                   {category.items.map((item) => (
//                     <li key={item}>
//                       <a href="#" className="text-gray-600 hover:text-pink-500">
//                         {item}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }






import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function WomenDropdown({ isOpen, onToggle }) {
  const [isWomenHovered, setIsWomenHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const path = usePathname();
  const router = useRouter();

  const isHome = path === "/";

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/parent/Women`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data && result.data.categories) {
          // Transform API data to match component structure
          const transformedCategories = result.data.categories
            .filter((category) => category.status === "active")
            .map((category) => ({
              title: category.categoryName,
              categoryId: category._id,
              items: category.subCategories
                .filter((subCategory) => subCategory.status === "active")
                .map((subCategory) => ({
                  name: subCategory.subCategoryName,
                  id: subCategory._id,
                })),
            }));

          setCategories(transformedCategories);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle subcategory click - close dropdown and navigate with filter params
  const handleSubCategoryClick = (parentCategory, categoryName, subCategoryName) => {
    if (onToggle) {
      onToggle(); // Close mobile dropdown
    }
    
    // Navigate to mega-filter with filter parameters
    const queryParams = new URLSearchParams();
    queryParams.set('parentCategory', parentCategory);
    queryParams.set('categoryName', categoryName);
    queryParams.set('subCategoryName', subCategoryName);
    
    router.push(`/mega-filter?${queryParams.toString()}`);
  };

  // Handle main category click (without subcategory)
  const handleCategoryClick = (parentCategory, categoryName) => {
    if (onToggle) {
      onToggle(); // Close mobile dropdown
    }
    
    // Navigate to mega-filter with category filter only
    const queryParams = new URLSearchParams();
    queryParams.set('parentCategory', parentCategory);
    queryParams.set('categoryName', categoryName);
    
    router.push(`/mega-filter?${queryParams.toString()}`);
  };

  // Handle main "WOMEN" link click - show all women's products
  const handleWomenLinkClick = () => {
    if (onToggle) {
      onToggle(); // Close mobile dropdown
    }
    
    // Navigate to mega-filter with only parent category filter
    router.push(`/mega-filter?parentCategory=Women`);
  };

  if (!isMounted) return null;

  // Loading state
  if (loading) {
    return (
      <>
        {/* Mobile View Loading */}
        <div className="lg:hidden relative">
          <button
            onClick={onToggle}
            className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500"
          >
            <span className="font-bold">WOMEN</span>
            {isOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {isOpen && (
            <div className="w-full bg-white shadow-lg p-4">
              <div className="text-center text-gray-500">
                Loading categories...
              </div>
            </div>
          )}
        </div>

        {/* Desktop View Loading */}
        <div className="hidden lg:block relative z-50 group lg:z-40">
          <button
            onClick={handleWomenLinkClick}
            className={`${
              isHome ? "text-[#fefae5]" : "text-black"
            } text-base font-bold font-karla leading-tight hover:text-pink-500 cursor-pointer`}
          >
            WOMEN
          </button>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        {/* Mobile View Error */}
        <div className="lg:hidden relative">
          <button
            onClick={onToggle}
            className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500"
          >
            <span className="font-bold">WOMEN</span>
            {isOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {isOpen && (
            <div className="w-full bg-white shadow-lg p-4">
              <div className="text-center text-red-500">
                Error loading categories
              </div>
            </div>
          )}
        </div>

        {/* Desktop View Error */}
        <div className="hidden lg:block relative z-50 group lg:z-40">
          <button
            onClick={handleWomenLinkClick}
            className={`${
              isHome ? "text-[#fefae5]" : "text-black"
            } text-base font-bold font-karla leading-tight hover:text-pink-500 cursor-pointer`}
          >
            WOMEN
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden relative">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500"
        >
          <span className="font-bold">WOMEN</span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {isOpen && (
          <div className="w-full bg-white shadow-lg overflow-y-auto">
            <style jsx>{`
              .thin-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #e5e7eb transparent;
              }
              .thin-scrollbar::-webkit-scrollbar {
                width: 2px;
              }
              .thin-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb {
                background-color: #e5e7eb;
                border-radius: 20px;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #d1d5db;
              }
            `}</style>
            
            {/* Add "View All Women's Products" option */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => handleWomenLinkClick()}
                className="w-full p-4 text-left text-gray-700 hover:bg-gray-50 font-medium"
              >
                View All Women's Products
              </button>
            </div>

            {categories.map((category) => (
              <div key={category.title} className="border-t border-gray-100">
                <button
                  onClick={() =>
                    setOpenCategory(
                      openCategory === category.title ? null : category.title
                    )
                  }
                  className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gray-50"
                >
                  <span 
                    className="text-sm font-medium cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick("Women", category.title);
                    }}
                  >
                    {category.title}
                  </span>
                  <ChevronRight
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      openCategory === category.title ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {openCategory === category.title && (
                  <div className="bg-gray-50 px-4 py-2">
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => handleSubCategoryClick("Women", category.title, item.name)}
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-pink-500 w-full text-left"
                          >
                            {item.name}
                          </button>
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
        className="hidden lg:block relative z-50 group lg:z-40"
        onMouseEnter={() => setIsWomenHovered(true)}
        onMouseLeave={() => setIsWomenHovered(false)}
      >
        <div className="relative lg">
          <button
            onClick={handleWomenLinkClick}
            className={`${
              isHome ? "text-[#fefae5]" : "text-black"
            } text-base font-bold font-karla leading-tight hover:text-pink-500 cursor-pointer`}
          >
            WOMEN
          </button>
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
              isWomenHovered ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        <div className="absolute h-8 w-full" />

        {isWomenHovered && (
          <div className="absolute lg:left-[-200px] lg:top-full w-max bg-white shadow-lg p-4 z-10 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
            <style jsx>{`
              .thin-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #e5e7eb transparent;
              }
              .thin-scrollbar::-webkit-scrollbar {
                width: 2px;
              }
              .thin-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb {
                background-color: #e5e7eb;
                border-radius: 20px;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #d1d5db;
              }
            `}</style>
            {categories.map((category) => (
              <div key={category.title}>
                <h4 
                  className="font-bold text-pink-500 mb-4 text-base cursor-pointer hover:underline"
                  onClick={() => handleCategoryClick("Women", category.title)}
                >
                  {category.title}
                </h4>
                <ul className="space-y-2 text-sm">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSubCategoryClick("Women", category.title, item.name)}
                        className="text-gray-600 hover:text-pink-500 text-left w-full"
                      >
                        {item.name}
                      </button>
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
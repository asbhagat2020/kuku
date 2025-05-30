// import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// const categories = [
//   {
//     title: "New Born",
//     items: [
//       "0-9 Months"
//     ],
//   },
//   {
//     title: "Baby Boys",
//     items: [
//       "0-3 Years"
//     ],
//   },
//   {
//     title: "Baby Girls",
//     items: [
//       "0-3 Years"
//     ],
//   },
//   {
//     title: "Young Boys",
//     items: [
//       "3-7 Years"
//     ],
//   },
//   {
//     title: "Young Girls",
//     items: [
//       "3-7 Years"
//     ],
//   },
//   {
//     title: "Tween Boys",
//     items: [
//       "8-12 Years"
//     ],
//   },
//   {
//     title: "Tween Girls",
//     items: [
//       "8-12 Years"
//     ],
//   },
//   {
//     title: "Teen Boys",
//     items: [
//       "13-16 Years"
//     ],
//   },
//   {
//     title: "Teen Girls",
//     items: [
//       "13-16 Years"
//     ],
//   },

// ];

// export default function KidsDropdown({ isOpen, onToggle }) {
//   const [isKidsHovered, setIsKidsHovered] = useState(false);
//   const [isMounted, setIsMounted] = useState(false); // Handle SSR mismatch
//   // const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
//   const [openCategory, setOpenCategory] = useState(null);
//   const path = usePathname();

//   const isHome = path === "/";
//   // Ensure the component only renders interactive content on the client
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//    // Close the dropdown when clicking outside
//    useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         onToggle(false); // Close the dropdown
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("click", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [isOpen, onToggle]);


//   if (!isMounted) return null; // Prevent SSR-client mismatch

//   return (
//     <>
//       {/* Mobile View */}
//       <div className="lg:hidden relative z-50">
//         <button
//           onClick={onToggle}
//           className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500"
//         >
//           <span className="font-bold z-40">KIDS</span>
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
//         onMouseEnter={() => setIsKidsHovered(true)}
//         onMouseLeave={() => setIsKidsHovered(false)}
//       >
//         <div className="relative lg">
//           <a href="#" className={`${
//                   isHome ? "text-[#fefae5]" : "text-black"
//                 } text-base font-bold font-karla leading-tight hover:text-pink-500`}>
//           KIDS
//           </a>
//           <div
//             className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
//               isKidsHovered ? 'scale-x-100' : 'scale-x-0'
//             }`}
//           />
//         </div>

//         <div className="absolute h-8 w-full" />

//         {isKidsHovered && (
//           <div className="absolute lg:left-[-300px] lg:top-full w-max bg-white shadow-lg p-4 z-50 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
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








import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function KidsDropdown({ isOpen, onToggle }) {
  const [isKidsHovered, setIsKidsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const path = usePathname();
  const router = useRouter();

  const isHome = path === "/";

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/parent/Kid`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data && result.data.categories) {
          // Transform API data to match component structure
          const transformedCategories = result.data.categories
            .filter(category => category.status === 'active')
            .map(category => ({
              title: category.categoryName,
              categoryId: category._id,
              items: category.subCategories
                .filter(subCategory => subCategory.status === 'active')
                .map(subCategory => ({
                  name: subCategory.subCategoryName,
                  id: subCategory._id
                }))
            }));
          
          setCategories(transformedCategories);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (err) {
        console.error('Error fetching kids categories:', err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Ensure the component only renders interactive content on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle(false); // Close the dropdown
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onToggle]);

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

  // Handle main "KIDS" link click - show all kids' products
  const handleKidsLinkClick = () => {
    if (onToggle) {
      onToggle(); // Close mobile dropdown
    }
    
    // Navigate to mega-filter with only parent category filter
    router.push(`/mega-filter?parentCategory=Kid`);
  };

  if (!isMounted) return null;

  // Loading state
  if (loading) {
    return (
      <>
        {/* Mobile View Loading */}
        <div className="lg:hidden relative z-50" ref={dropdownRef}>
          <button
            onClick={onToggle}
            className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500"
          >
            <span className="font-bold z-40">KIDS</span>
            {isOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {isOpen && (
            <div className="w-full bg-white shadow-lg p-4">
              <div className="text-center text-gray-500">Loading categories...</div>
            </div>
          )}
        </div>

        {/* Desktop View Loading */}
        <div className="hidden lg:block relative z-50 group lg:z-40">
          <button
            onClick={handleKidsLinkClick}
            className={`${
              isHome ? "text-[#fefae5]" : "text-black"
            } text-base font-bold font-karla leading-tight hover:text-pink-500 cursor-pointer`}
          >
            KIDS
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
        <div className="lg:hidden relative z-50" ref={dropdownRef}>
          <button
            onClick={onToggle}
            className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500"
          >
            <span className="font-bold z-40">KIDS</span>
            {isOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {isOpen && (
            <div className="w-full bg-white shadow-lg p-4">
              <div className="text-center text-red-500">Error loading categories</div>
            </div>
          )}
        </div>

        {/* Desktop View Error */}
        <div className="hidden lg:block relative z-50 group lg:z-40">
          <button
            onClick={handleKidsLinkClick}
            className={`${
              isHome ? "text-[#fefae5]" : "text-black"
            } text-base font-bold font-karla leading-tight hover:text-pink-500 cursor-pointer`}
          >
            KIDS
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden relative z-50" ref={dropdownRef}>
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500"
        >
          <span className="font-bold z-40">KIDS</span>
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
            
            {/* Add "View All Kids' Products" option */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => handleKidsLinkClick()}
                className="w-full p-4 text-left text-gray-700 hover:bg-gray-50 font-medium"
              >
                View All Kids' Products
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
                      handleCategoryClick("Kid", category.title);
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
                            onClick={() => handleSubCategoryClick("Kid", category.title, item.name)}
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
        onMouseEnter={() => setIsKidsHovered(true)}
        onMouseLeave={() => setIsKidsHovered(false)}
      >
        <div className="relative lg">
          <button
            onClick={handleKidsLinkClick}
            className={`${
              isHome ? "text-[#fefae5]" : "text-black"
            } text-base font-bold font-karla leading-tight hover:text-pink-500 cursor-pointer`}
          >
            KIDS
          </button>
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
              isKidsHovered ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        <div className="absolute h-8 w-full" />

        {isKidsHovered && (
          <div className="absolute lg:left-[-300px] lg:top-full w-max bg-white shadow-lg p-4 z-50 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
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
                  onClick={() => handleCategoryClick("Kid", category.title)}
                >
                  {category.title}
                </h4>
                <ul className="space-y-2 text-sm">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleSubCategoryClick("Kid", category.title, item.name)}
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
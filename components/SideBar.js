


// "use client"; 

// import { useState, useEffect, useRef } from "react";
// import { FiMenu, FiChevronUp, FiChevronDown, FiX } from "react-icons/fi";
// import { useFilter } from "../context/FilterContext";

// export const SideBar = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);
  
//   // Access filter context
//   const { filters, toggleFilter, filterOptions } = useFilter();

//   // Toggle sidebar visibility
//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   // Close sidebar when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     if (isSidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen]);

//   // Toggle filter dropdown visibility
//   const handleDropdownToggle = (dropdown) => {
//     setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
//   };

//   // Check if a filter option is currently selected
//   const isFilterSelected = (type, value) => {
//     return filters[type].includes(value);
//   };

//   // Handle filter selection/deselection
//   const handleFilterChange = (type, value) => {
//     toggleFilter(type, value);
//   };

//   // Show selected filters at the top
//   const renderSelectedFilters = (type) => {
//     if (filters[type].length === 0) return null;

//     return (
//       <div className="mt-2 mb-3">
//         <div className="text-sm text-gray-600">Selected:</div>
//         <div className="flex flex-wrap gap-2 mt-1">
//           {filters[type].map(value => (
//             <div key={`selected-${type}-${value}`} 
//               className="bg-custom-pink bg-opacity-10 text-custom-pink text-xs px-2 py-1 rounded-full flex items-center">
//               {value}
//               <button 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleFilterChange(type, value);
//                 }}
//                 className="ml-1 text-custom-pink hover:text-custom-pink"
//               >
//                 <FiX size={14} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* Hamburger Icon for Mobile */}
//       <div className="lg:hidden sticky top-0 left-0 z-0">
//         <button
//           onClick={toggleSidebar}
//           className="text-custom-pink text-3xl focus:outline-none"
//         >
//           <FiMenu />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed lg:sticky top-20 left-0 h-auto lg:h-[calc(100vh-210px)] w-64 pl-0 pr-4 pt-4 pb-4 z-30 transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-[260px] xl:w-80 lg:mt-10 lg:ml-2 lg:block overflow-y-auto scrollbar-hide`}
//       >
//         <div className="p-4 lg:p-4 shadow-md bg-white rounded-lg">
//           <h1 className="text-2xl pt-1 text-custom-pink font-bold">Filter by</h1>

//           <div className="mt-4 filter-section flex flex-col space-y-4">
//             {/* Category Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("category")}
//                 aria-expanded={openDropdown === "category"}
//                 aria-controls="category-options"
//               >
//                 <label className="font-semibold mb-2">Category</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "category" ? (
//                       <FiChevronUp />
//                     ) : (
//                       <FiChevronDown />
//                     )}
//                   </span>
//                 </div>
//               </div>
              
//               {/* Show selected category filters */}
//               {renderSelectedFilters("category")}
              
//               {openDropdown === "category" && (
//                 <div
//                   id="category-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.category.map((category) => (
//                     <div className="flex items-center" key={category}>
//                       <input
//                         type="checkbox"
//                         id={`category-${category}`}
//                         name="category"
//                         value={category}
//                         checked={isFilterSelected("category", category)}
//                         onChange={() => handleFilterChange("category", category)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`category-${category}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span className={`custom-checkbox ${
//                           isFilterSelected("category", category) ? "checked" : ""
//                         }`} />
//                         {category}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Price Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("price")}
//                 aria-expanded={openDropdown === "price"}
//                 aria-controls="price-options"
//               >
//                 <label className="font-semibold mb-2">Price</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "price" ? (
//                       <FiChevronUp />
//                     ) : (
//                       <FiChevronDown />
//                     )}
//                   </span>
//                 </div>
//               </div>
              
//               {/* Show selected price filters */}
//               {renderSelectedFilters("price")}
              
//               {openDropdown === "price" && (
//                 <div
//                   id="price-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.price.map((price) => (
//                     <div className="flex items-center" key={price}>
//                       <input
//                         type="checkbox"
//                         id={`price-${price}`}
//                         name="price"
//                         value={price}
//                         checked={isFilterSelected("price", price)}
//                         onChange={() => handleFilterChange("price", price)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`price-${price}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span className={`custom-checkbox ${
//                           isFilterSelected("price", price) ? "checked" : ""
//                         }`} />
//                         {price}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Size Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("size")}
//                 aria-expanded={openDropdown === "size"}
//                 aria-controls="size-options"
//               >
//                 <label className="font-semibold mb-2">Size</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "size" ? (
//                       <FiChevronUp />
//                     ) : (
//                       <FiChevronDown />
//                     )}
//                   </span>
//                 </div>
//               </div>
              
//               {/* Show selected size filters */}
//               {renderSelectedFilters("size")}
              
//               {openDropdown === "size" && (
//                 <div
//                   id="size-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.size.map((size) => (
//                     <div className="flex items-center" key={size}>
//                       <input
//                         type="checkbox"
//                         id={`size-${size}`}
//                         name="size"
//                         value={size}
//                         checked={isFilterSelected("size", size)}
//                         onChange={() => handleFilterChange("size", size)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`size-${size}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span className={`custom-checkbox ${
//                           isFilterSelected("size", size) ? "checked" : ""
//                         }`} />
//                         {size}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Condition Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("condition")}
//                 aria-expanded={openDropdown === "condition"}
//                 aria-controls="condition-options"
//               >
//                 <label className="font-semibold mb-2">Condition</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "condition" ? (
//                       <FiChevronUp />
//                     ) : (
//                       <FiChevronDown />
//                     )}
//                   </span>
//                 </div>
//               </div>
              
//               {/* Show selected condition filters */}
//               {renderSelectedFilters("condition")}
              
//               {openDropdown === "condition" && (
//                 <div
//                   id="condition-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.condition.map((condition) => (
//                     <div className="flex items-center" key={condition}>
//                       <input
//                         type="checkbox"
//                         id={`condition-${condition}`}
//                         name="condition"
//                         value={condition}
//                         checked={isFilterSelected("condition", condition)}
//                         onChange={() => handleFilterChange("condition", condition)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`condition-${condition}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span className={`custom-checkbox ${
//                           isFilterSelected("condition", condition) ? "checked" : ""
//                         }`} />
//                         {condition}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-checkbox {
//           display: inline-block;
//           width: 20px;
//           height: 20px;
//           background-color: white;
//           border: 2px solid #555;
//           border-radius: 4px;
//           position: relative;
//           margin-right: 8px;
//           transition: all 0.2s ease;
//         }

//         input[type="checkbox"]:checked + label .custom-checkbox,
//         .custom-checkbox.checked {
//           background-color: #e4086f;
//           border-color: #e4086f;
//         }

//         .custom-checkbox::after {
//           content: "";
//           position: absolute;
//           top: 3px;
//           left: 7px;
//           width: 5px;
//           height: 10px;
//           border: solid white;
//           border-width: 0 2px 2px 0;
//           transform: rotate(45deg);
//           opacity: 0;
//           transition: opacity 0.2s ease;
//         }

//         input[type="checkbox"]:checked + label .custom-checkbox::after,
//         .custom-checkbox.checked::after {
//           opacity: 1;
//         }

//         /* Hide scrollbar for webkit browsers */
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
        
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default SideBar;











// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FiMenu, FiChevronUp, FiChevronDown, FiX } from "react-icons/fi";
// import { useFilter } from "../context/FilterContext";
// import axios from "axios";

// export const SideBar = () => {
//   const [openDropdown, setOpenDropdown] = useState("category"); // Default open Category section
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [categoryStructure, setCategoryStructure] = useState([]);
//   const [expandedParentCategories, setExpandedParentCategories] = useState(new Set(["Men"])); // Default expand "Men"
//   const [expandedCategories, setExpandedCategories] = useState(new Set());
//   const sidebarRef = useRef(null);

//   const { filters, toggleFilter, filterOptions } = useFilter();

//   // Fetch category structure from API
//   useEffect(() => {
//     const fetchCategoryStructure = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`
//         );
//         const data = response.data.data || [];
//         console.log("Category Structure:", data);
//         setCategoryStructure(data);
//       } catch (error) {
//         console.error("Error fetching category structure:", error);
//       }
//     };

//     fetchCategoryStructure();
//   }, []);

//   // Log states for debugging
//   useEffect(() => {
//     console.log("Expanded Parent Categories:", [...expandedParentCategories]);
//     console.log("Expanded Categories:", [...expandedCategories]);
//     console.log("Filters:", filters);
//     console.log("Filter Options:", filterOptions);
//   }, [expandedParentCategories, expandedCategories, filters, filterOptions]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     if (isSidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen]);

//   const handleDropdownToggle = (dropdown) => {
//     console.log("Toggling dropdown:", dropdown); // Debug log
//     setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
//   };

//   // Toggle parentCategory expansion
//   const toggleParentCategory = (parentCategory) => {
//     console.log("Toggling parentCategory:", parentCategory); // Debug log
//     setExpandedParentCategories((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(parentCategory)) {
//         newSet.delete(parentCategory);
//         // Clear categoryNames under this parentCategory
//         setExpandedCategories((prevCats) => {
//           const newCats = new Set(prevCats);
//           categoryStructure
//             .find((cat) => cat.parentCategory === parentCategory)
//             ?.categories.forEach((cat) => newCats.delete(cat.categoryName));
//           return newCats;
//         });
//       } else {
//         newSet.add(parentCategory);
//       }
//       console.log("New Parent Categories Set:", [...newSet]); // Debug log
//       return newSet;
//     });
//   };

//   // Toggle categoryName expansion
//   const toggleCategoryName = (categoryName) => {
//     console.log("Toggling categoryName:", categoryName); // Debug log
//     setExpandedCategories((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(categoryName)) {
//         newSet.delete(categoryName);
//       } else {
//         newSet.add(categoryName);
//       }
//       console.log("New Categories Set:", [...newSet]); // Debug log
//       return newSet;
//     });
//   };

//   const isFilterSelected = (type, value) => {
//     return filters[type].includes(value);
//   };

//   const handleFilterChange = (type, value) => {
//     console.log("Filter changed:", { type, value }); // Debug log
//     toggleFilter(type, value);
//   };

//   const renderSelectedFilters = (type) => {
//     if (filters[type].length === 0) return null;

//     return (
//       <div className="mt-2 mb-3">
//         <div className="text-sm text-gray-600">Selected:</div>
//         <div className="flex flex-wrap gap-2 mt-1">
//           {filters[type].map((value) => (
//             <div
//               key={`selected-${type}-${value}`}
//               className="bg-custom-pink bg-opacity-10 text-custom-pink text-xs px-2 py-1 rounded-full flex items-center"
//             >
//               {value}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleFilterChange(type, value);
//                 }}
//                 className="ml-1 text-custom-pink hover:text-custom-pink"
//               >
//                 <FiX size={14} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="lg:hidden sticky top-0 left-0 z-0">
//         <button
//           onClick={toggleSidebar}
//           className="text-custom-pink text-3xl focus:outline-none"
//         >
//           <FiMenu />
//         </button>
//       </div>

//       <div
//         ref={sidebarRef}
//         className={`fixed lg:sticky top-20 left-0 h-auto lg:h-[calc(100vh-210px)] w-64 pl-0 pr-4 pt-4 pb-4 z-30 transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-[260px] xl:w-80 lg:mt-10 lg:ml-2 lg:block overflow-y-auto scrollbar-hide`}
//       >
//         <div className="p-4 lg:p-4 shadow-md bg-white rounded-lg">
//           <h1 className="text-2xl pt-1 text-custom-pink font-bold">Filter by</h1>

//           <div className="mt-4 filter-section flex flex-col space-y-4">
//             {/* Category Filter (Nested) */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("category")}
//                 aria-expanded={openDropdown === "category"}
//                 aria-controls="category-options"
//               >
//                 <label className="font-semibold mb-2">Category</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "category" ? (
//                       <FiChevronUp />
//                     ) : (
//                       <FiChevronDown />
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {renderSelectedFilters("category")}
//               {renderSelectedFilters("categoryName")}
//               {renderSelectedFilters("subCategoryName")}

//               {openDropdown === "category" && (
//                 <div
//                   id="category-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {categoryStructure.length === 0 ? (
//                     <div className="text-gray-500">Loading categories...</div>
//                   ) : (
//                     categoryStructure.map((parentCat) => (
//                       <div key={parentCat._id} className="ml-2">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center">
//                             <input
//                               type="checkbox"
//                               id={`category-${parentCat._id}`}
//                               name="category"
//                               value={parentCat.parentCategory}
//                               checked={isFilterSelected(
//                                 "category",
//                                 parentCat.parentCategory
//                               )}
//                               onChange={() =>
//                                 handleFilterChange("category", parentCat.parentCategory)
//                               }
//                               className="hidden"
//                             />
//                             <label
//                               htmlFor={`category-${parentCat._id}`}
//                               className="flex items-center cursor-pointer font-semibold"
//                             >
//                               <span
//                                 className={`custom-checkbox ${
//                                   isFilterSelected("category", parentCat.parentCategory)
//                                     ? "checked"
//                                     : ""
//                                 }`}
//                               />
//                               {parentCat.parentCategory}
//                             </label>
//                           </div>
//                           <div
//                             className="p-1 cursor-pointer"
//                             onClick={() => toggleParentCategory(parentCat.parentCategory)}
//                           >
//                             <span className="text-gray-500">
//                               {expandedParentCategories.has(parentCat.parentCategory) ? (
//                                 <FiChevronUp />
//                               ) : (
//                                 <FiChevronDown />
//                               )}
//                             </span>
//                           </div>
//                         </div>
//                         {/* Category Names */}
//                         {expandedParentCategories.has(parentCat.parentCategory) && (
//                           <div className="ml-4">
//                             {parentCat.categories.length === 0 ? (
//                               <div className="text-gray-500">No categories available</div>
//                             ) : (
//                               parentCat.categories
//                                 .filter((cat) => cat.status === "active")
//                                 .map((cat) => (
//                                   <div key={cat._id}>
//                                     <div className="flex items-center justify-between mt-1">
//                                       <div className="flex items-center">
//                                         <input
//                                           type="checkbox"
//                                           id={`categoryName-${cat._id}`}
//                                           name="categoryName"
//                                           value={cat.categoryName}
//                                           checked={isFilterSelected(
//                                             "categoryName",
//                                             cat.categoryName
//                                           )}
//                                           onChange={() =>
//                                             handleFilterChange("categoryName", cat.categoryName)
//                                           }
//                                           className="hidden"
//                                         />
//                                         <label
//                                           htmlFor={`categoryName-${cat._id}`}
//                                           className="flex items-center cursor-pointer"
//                                         >
//                                           <span
//                                             className={`custom-checkbox ${
//                                               isFilterSelected("categoryName", cat.categoryName)
//                                                 ? "checked"
//                                                 : ""
//                                             }`}
//                                           />
//                                           {cat.categoryName}
//                                         </label>
//                                       </div>
//                                       <div
//                                         className="p-1 cursor-pointer"
//                                         onClick={() => toggleCategoryName(cat.categoryName)}
//                                       >
//                                         <span className="text-gray-500">
//                                           {expandedCategories.has(cat.categoryName) ? (
//                                             <FiChevronUp />
//                                           ) : (
//                                             <FiChevronDown />
//                                           )}
//                                         </span>
//                                       </div>
//                                     </div>
//                                     {/* SubCategory Names */}
//                                     {expandedCategories.has(cat.categoryName) && (
//                                       <div className="ml-4">
//                                         {cat.subCategories?.length === 0 ? (
//                                           <div className="text-gray-500">
//                                             No subcategories available
//                                           </div>
//                                         ) : (
//                                           cat.subCategories
//                                             .filter((subCat) => subCat.status === "active")
//                                             .map((subCat) => (
//                                               <div
//                                                 key={subCat._id}
//                                                 className="flex items-center mt-1"
//                                               >
//                                                 <input
//                                                   type="checkbox"
//                                                   id={`subCategoryName-${subCat._id}`}
//                                                   name="subCategoryName"
//                                                   value={subCat.subCategoryName}
//                                                   checked={isFilterSelected(
//                                                     "subCategoryName",
//                                                     subCat.subCategoryName
//                                                   )}
//                                                   onChange={() =>
//                                                     handleFilterChange(
//                                                       "subCategoryName",
//                                                       subCat.subCategoryName
//                                                     )
//                                                   }
//                                                   className="hidden"
//                                                 />
//                                                 <label
//                                                   htmlFor={`subCategoryName-${subCat._id}`}
//                                                   className="flex items-center cursor-pointer"
//                                                 >
//                                                   <span
//                                                     className={`custom-checkbox ${
//                                                       isFilterSelected(
//                                                         "subCategoryName",
//                                                         subCat.subCategoryName
//                                                       )
//                                                         ? "checked"
//                                                         : ""
//                                                     }`}
//                                                   />
//                                                   {subCat.subCategoryName}
//                                                 </label>
//                                               </div>
//                                             ))
//                                         )}
//                                       </div>
//                                     )}
//                                   </div>
//                                 ))
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Price Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("price")}
//                 aria-expanded={openDropdown === "price"}
//                 aria-controls="price-options"
//               >
//                 <label className="font-semibold mb-2">Price</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "price" ? <FiChevronUp /> : <FiChevronDown />}
//                   </span>
//                 </div>
//               </div>

//               {renderSelectedFilters("price")}

//               {openDropdown === "price" && (
//                 <div
//                   id="price-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.price.map((price) => (
//                     <div className="flex items-center" key={price}>
//                       <input
//                         type="checkbox"
//                         id={`price-${price}`}
//                         name="price"
//                         value={price}
//                         checked={isFilterSelected("price", price)}
//                         onChange={() => handleFilterChange("price", price)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`price-${price}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span
//                           className={`custom-checkbox ${
//                             isFilterSelected("price", price) ? "checked" : ""
//                           }`}
//                         />
//                         {price}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Size Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("size")}
//                 aria-expanded={openDropdown === "size"}
//                 aria-controls="size-options"
//               >
//                 <label className="font-semibold mb-2">Size</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "size" ? <FiChevronUp /> : <FiChevronDown />}
//                   </span>
//                 </div>
//               </div>

//               {renderSelectedFilters("size")}

//               {openDropdown === "size" && (
//                 <div
//                   id="size-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.size.map((size) => (
//                     <div className="flex items-center" key={size}>
//                       <input
//                         type="checkbox"
//                         id={`size-${size}`}
//                         name="size"
//                         value={size}
//                         checked={isFilterSelected("size", size)}
//                         onChange={() => handleFilterChange("size", size)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`size-${size}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span
//                           className={`custom-checkbox ${
//                             isFilterSelected("size", size) ? "checked" : ""
//                           }`}
//                         />
//                         {size}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Condition Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("condition")}
//                 aria-expanded={openDropdown === "condition"}
//                 aria-controls="condition-options"
//               >
//                 <label className="font-semibold mb-2">Condition</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "condition" ? (
//                       <FiChevronUp />
//                     ) : (
//                       <FiChevronDown />
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {renderSelectedFilters("condition")}

//               {openDropdown === "condition" && (
//                 <div
//                   id="condition-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.condition.map((condition) => (
//                     <div className="flex items-center" key={condition}>
//                       <input
//                         type="checkbox"
//                         id={`condition-${condition}`}
//                         name="condition"
//                         value={condition}
//                         checked={isFilterSelected("condition", condition)}
//                         onChange={() => handleFilterChange("condition", condition)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`condition-${condition}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span
//                           className={`custom-checkbox ${
//                             isFilterSelected("condition", condition) ? "checked" : ""
//                           }`}
//                         />
//                         {condition}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-checkbox {
//           display: inline-block;
//           width: 20px;
//           height: 20px;
//           background-color: white;
//           border: 2px solid #555;
//           border-radius: 4px;
//           position: relative;
//           margin-right: 8px;
//           transition: all 0.2s ease;
//         }

//         input[type="checkbox"]:checked + label .custom-checkbox,
//         .custom-checkbox.checked {
//           background-color: #e4086f;
//           border-color: #e4086f;
//         }

//         .custom-checkbox::after {
//           content: "";
//           position: absolute;
//           top: 3px;
//           left: 7px;
//           width: 5px;
//           height: 10px;
//           border: solid white;
//           border-width: 0 2px 2px 0;
//           transform: rotate(45deg);
//           opacity: 0;
//           transition: opacity 0.2s ease;
//         }

//         input[type="checkbox"]:checked + label .custom-checkbox::after,
//         .custom-checkbox.checked::after {
//           opacity: 1;
//         }

//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }

//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default SideBar;




// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FiMenu, FiChevronUp, FiChevronDown, FiX } from "react-icons/fi";
// import { useFilter } from "../context/FilterContext";
// import axios from "axios";

// export const SideBar = () => {
//   const [openDropdown, setOpenDropdown] = useState("category"); // Default open Category section
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [categoryStructure, setCategoryStructure] = useState([]);
//   const [expandedParentCategories, setExpandedParentCategories] = useState(new Set(["Men"])); // Default expand "Men"
//   const [expandedCategories, setExpandedCategories] = useState(new Set());
//   const sidebarRef = useRef(null);

//   const { filters, toggleFilter, filterOptions } = useFilter();

//   // Fetch category structure from API
//   useEffect(() => {
//     const fetchCategoryStructure = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`
//         );
//         const data = response.data.data || [];
//         console.log("Category Structure:", data);
//         setCategoryStructure(data);
//       } catch (error) {
//         console.error("Error fetching category structure:", error);
//       }
//     };

//     fetchCategoryStructure();
//   }, []);

//   // Log states for debugging
//   useEffect(() => {
//     console.log("Expanded Parent Categories:", [...expandedParentCategories]);
//     console.log("Expanded Categories:", [...expandedCategories]);
//     console.log("Filters:", filters);
//     console.log("Filter Options:", filterOptions);
//   }, [expandedParentCategories, expandedCategories, filters, filterOptions]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     if (isSidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen]);

//   const handleDropdownToggle = (dropdown) => {
//     console.log("Toggling dropdown:", dropdown);
//     setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
//   };

//   // Toggle parentCategory expansion
//   const toggleParentCategory = (parentCategory) => {
//     console.log("Toggling parentCategory:", parentCategory);
//     setExpandedParentCategories((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(parentCategory)) {
//         newSet.delete(parentCategory);
//         // Clear categoryNames under this parentCategory
//         setExpandedCategories((prevCats) => {
//           const newCats = new Set(prevCats);
//           categoryStructure
//             .find((cat) => cat.parentCategory === parentCategory)
//             ?.categories.forEach((cat) => newCats.delete(cat.categoryName));
//           return newCats;
//         });
//       } else {
//         newSet.add(parentCategory);
//       }
//       console.log("New Parent Categories Set:", [...newSet]);
//       return newSet;
//     });
//   };

//   // Toggle categoryName expansion
//   const toggleCategoryName = (categoryName) => {
//     console.log("Toggling categoryName:", categoryName);
//     setExpandedCategories((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(categoryName)) {
//         newSet.delete(categoryName);
//       } else {
//         newSet.add(categoryName);
//       }
//       console.log("New Categories Set:", [...newSet]);
//       return newSet;
//     });
//   };

//   const isFilterSelected = (type, value) => {
//     return filters[type].includes(value);
//   };

//   const handleFilterChange = (type, value) => {
//     console.log("Filter changed:", { type, value });
//     toggleFilter(type, value);
//   };

//   const renderSelectedFilters = (type) => {
//     if (filters[type].length === 0) return null;

//     return (
//       <div className="mt-2 mb-3">
//         <div className="text-sm text-gray-600">Selected:</div>
//         <div className="flex flex-wrap gap-2 mt-1">
//           {filters[type].map((value) => (
//             <div
//               key={`selected-${type}-${value}`}
//               className="bg-custom-pink bg-opacity-10 text-custom-pink text-xs px-2 py-1 rounded-full flex items-center"
//             >
//               {value}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleFilterChange(type, value);
//                 }}
//                 className="ml-1 text-custom-pink hover:text-custom-pink"
//               >
//                 <FiX size={14} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="lg:hidden sticky top-0 left-0 z-0">
//         <button
//           onClick={toggleSidebar}
//           className="text-custom-pink text-3xl focus:outline-none"
//         >
//           <FiMenu />
//         </button>
//       </div>

//       <div
//         ref={sidebarRef}
//         className={`fixed lg:sticky top-20 left-0 h-auto lg:h-[calc(100vh-210px)] w-64 pl-0 pr-4 pt-4 pb-4 z-30 transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-[260px] xl:w-80 lg:mt-10 lg:ml-2 lg:block overflow-y-auto scrollbar-hide`}
//       >
//         <div className="p-4 lg:p-4 shadow-md bg-white rounded-lg">
//           <h1 className="text-2xl pt-1 text-custom-pink font-bold">Filter by</h1>

//           <div className="mt-4 filter-section flex flex-col space-y-4">
//             {/* Category Filter (Nested) */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("category")}
//                 aria-expanded={openDropdown === "category"}
//                 aria-controls="category-options"
//               >
//                 <label className="font-semibold mb-2">Category</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "category" ? (
//                       <FiChevronUp />
//                     ) : (
//                       <FiChevronDown />
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {/* Removed renderSelectedFilters for category, categoryName, subCategoryName */}
//               {openDropdown === "category" && (
//                 <div
//                   id="category-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {categoryStructure.length === 0 ? (
//                     <div className="text-gray-500">Loading categories...</div>
//                   ) : (
//                     categoryStructure.map((parentCat) => (
//                       <div key={parentCat._id} className="ml-2">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center">
//                             <input
//                               type="checkbox"
//                               id={`category-${parentCat._id}`}
//                               name="category"
//                               value={parentCat.parentCategory}
//                               checked={isFilterSelected(
//                                 "category",
//                                 parentCat.parentCategory
//                               )}
//                               onChange={() =>
//                                 handleFilterChange("category", parentCat.parentCategory)
//                               }
//                               className="hidden"
//                             />
//                             <label
//                               htmlFor={`category-${parentCat._id}`}
//                               className="flex items-center cursor-pointer font-semibold"
//                             >
//                               <span
//                                 className={`custom-checkbox ${
//                                   isFilterSelected("category", parentCat.parentCategory)
//                                     ? "checked"
//                                     : ""
//                                 }`}
//                               />
//                               {parentCat.parentCategory}
//                             </label>
//                           </div>
//                           <div
//                             className="p-1 cursor-pointer"
//                             onClick={() => {
//                               console.log("Chevron clicked for parentCategory:", parentCat.parentCategory);
//                               toggleParentCategory(parentCat.parentCategory);
//                             }}
//                           >
//                             <span className="text-gray-500">
//                               {expandedParentCategories.has(parentCat.parentCategory) ? (
//                                 <FiChevronUp />
//                               ) : (
//                                 <FiChevronDown />
//                               )}
//                             </span>
//                           </div>
//                         </div>
//                         {/* Category Names */}
//                         {expandedParentCategories.has(parentCat.parentCategory) && (
//                           <div className="ml-4">
//                             {parentCat.categories.length === 0 ? (
//                               <div className="text-gray-500">No categories available</div>
//                             ) : (
//                               parentCat.categories
//                                 .filter((cat) => cat.status === "active")
//                                 .map((cat) => (
//                                   <div key={cat._id}>
//                                     <div className="flex items-center justify-between mt-1">
//                                       <div className="flex items-center">
//                                         <input
//                                           type="checkbox"
//                                           id={`categoryName-${cat._id}`}
//                                           name="categoryName"
//                                           value={cat.categoryName}
//                                           checked={isFilterSelected(
//                                             "categoryName",
//                                             cat.categoryName
//                                           )}
//                                           onChange={() =>
//                                             handleFilterChange("categoryName", cat.categoryName)
//                                           }
//                                           className="hidden"
//                                         />
//                                         <label
//                                           htmlFor={`categoryName-${cat._id}`}
//                                           className="flex items-center cursor-pointer"
//                                         >
//                                           <span
//                                             className={`custom-checkbox ${
//                                               isFilterSelected("categoryName", cat.categoryName)
//                                                 ? "checked"
//                                                 : ""
//                                             }`}
//                                           />
//                                           {cat.categoryName}
//                                         </label>
//                                       </div>
//                                       <div
//                                         className="p-1 cursor-pointer"
//                                         onClick={() => {
//                                           console.log("Chevron clicked for categoryName:", cat.categoryName);
//                                           toggleCategoryName(cat.categoryName);
//                                         }}
//                                       >
//                                         <span className="text-gray-500">
//                                           {expandedCategories.has(cat.categoryName) ? (
//                                             <FiChevronUp />
//                                           ) : (
//                                             <FiChevronDown />
//                                           )}
//                                         </span>
//                                       </div>
//                                     </div>
//                                     {/* SubCategory Names */}
//                                     {expandedCategories.has(cat.categoryName) && (
//                                       <div className="ml-4">
//                                         {cat.subCategories?.length === 0 ? (
//                                           <div className="text-gray-500">
//                                             No subcategories available
//                                           </div>
//                                         ) : (
//                                           cat.subCategories
//                                             .filter((subCat) => subCat.status === "active")
//                                             .map((subCat) => (
//                                               <div
//                                                 key={subCat._id}
//                                                 className="flex items-center mt-1"
//                                               >
//                                                 <input
//                                                   type="checkbox"
//                                                   id={`subCategoryName-${subCat._id}`}
//                                                   name="subCategoryName"
//                                                   value={subCat.subCategoryName}
//                                                   checked={isFilterSelected(
//                                                     "subCategoryName",
//                                                     subCat.subCategoryName
//                                                   )}
//                                                   onChange={() =>
//                                                     handleFilterChange(
//                                                       "subCategoryName",
//                                                       subCat.subCategoryName
//                                                     )
//                                                   }
//                                                   className="hidden"
//                                                 />
//                                                 <label
//                                                   htmlFor={`subCategoryName-${subCat._id}`}
//                                                   className="flex items-center cursor-pointer"
//                                                 >
//                                                   <span
//                                                     className={`custom-checkbox ${
//                                                       isFilterSelected(
//                                                         "subCategoryName",
//                                                         subCat.subCategoryName
//                                                       )
//                                                         ? "checked"
//                                                         : ""
//                                                     }`}
//                                                   />
//                                                   {subCat.subCategoryName}
//                                                 </label>
//                                               </div>
//                                             ))
//                                         )}
//                                       </div>
//                                     )}
//                                   </div>
//                                 ))
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Price Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("price")}
//                 aria-expanded={openDropdown === "price"}
//                 aria-controls="price-options"
//               >
//                 <label className="font-semibold mb-2">Price</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "price" ? <FiChevronUp /> : <FiChevronDown />}
//                   </span>
//                 </div>
//               </div>

//               {renderSelectedFilters("price")}

//               {openDropdown === "price" && (
//                 <div
//                   id="price-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.price.map((price) => (
//                     <div className="flex items-center" key={price}>
//                       <input
//                         type="checkbox"
//                         id={`price-${price}`}
//                         name="price"
//                         value={price}
//                         checked={isFilterSelected("price", price)}
//                         onChange={() => handleFilterChange("price", price)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`price-${price}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span
//                           className={`custom-checkbox ${
//                             isFilterSelected("price", price) ? "checked" : ""
//                           }`}
//                         />
//                         {price}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Size Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("size")}
//                 aria-expanded={openDropdown === "size"}
//                 aria-controls="size-options"
//               >
//                 <label className="font-semibold mb-2">Size</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "size" ? <FiChevronUp /> : <FiChevronDown />}
//                   </span>
//                 </div>
//               </div>

//               {renderSelectedFilters("size")}

//               {openDropdown === "size" && (
//                 <div
//                   id="size-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.size.map((size) => (
//                     <div className="flex items-center" key={size}>
//                       <input
//                         type="checkbox"
//                         id={`size-${size}`}
//                         name="size"
//                         value={size}
//                         checked={isFilterSelected("size", size)}
//                         onChange={() => handleFilterChange("size", size)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`size-${size}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span
//                           className={`custom-checkbox ${
//                             isFilterSelected("size", size) ? "checked" : ""
//                           }`}
//                         />
//                         {size}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* Condition Filter */}
//             <div className="filter-section flex flex-col">
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => handleDropdownToggle("condition")}
//                 aria-expanded={openDropdown === "condition"}
//                 aria-controls="condition-options"
//               >
//                 <label className="font-semibold mb-2">Condition</label>
//                 <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
//                   <span className="text-gray-500">
//                     {openDropdown === "condition" ? (
//                       <FiChevronUp />
//                     ) : (
//                       <FiChevronDown />
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {renderSelectedFilters("condition")}

//               {openDropdown === "condition" && (
//                 <div
//                   id="condition-options"
//                   className="flex flex-col space-y-1 mt-2 ml-3"
//                 >
//                   {filterOptions.condition.map((condition) => (
//                     <div className="flex items-center" key={condition}>
//                       <input
//                         type="checkbox"
//                         id={`condition-${condition}`}
//                         name="condition"
//                         value={condition}
//                         checked={isFilterSelected("condition", condition)}
//                         onChange={() => handleFilterChange("condition", condition)}
//                         className="hidden"
//                       />
//                       <label
//                         htmlFor={`condition-${condition}`}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <span
//                           className={`custom-checkbox ${
//                             isFilterSelected("condition", condition) ? "checked" : ""
//                           }`}
//                         />
//                         {condition}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-checkbox {
//           display: inline-block;
//           width: 20px;
//           height: 20px;
//           background-color: white;
//           border: 2px solid #555;
//           border-radius: 4px;
//           position: relative;
//           margin-right: 8px;
//           transition: all 0.2s ease;
//         }

//         input[type="checkbox"]:checked + label .custom-checkbox,
//         .custom-checkbox.checked {
//           background-color: #e4086f;
//           border-color: #e4086f;
//         }

//         .custom-checkbox::after {
//           content: "";
//           position: absolute;
//           top: 3px;
//           left: 7px;
//           width: 5px;
//           height: 10px;
//           border: solid white;
//           border-width: 0 2px 2px 0;
//           transform: rotate(45deg);
//           opacity: 0;
//           transition: opacity 0.2s ease;
//         }

//         input[type="checkbox"]:checked + label .custom-checkbox::after,
//         .custom-checkbox.checked::after {
//           opacity: 1;
//         }

//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }

//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default SideBar;









"use client";

import { useState, useEffect, useRef } from "react";
import { FiMenu, FiChevronUp, FiChevronDown, FiX } from "react-icons/fi";
import { useFilter } from "../context/FilterContext";
import axios from "axios";

export const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState("category"); // Default open Category section
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoryStructure, setCategoryStructure] = useState([]);
  const [expandedParentCategories, setExpandedParentCategories] = useState(new Set(["Men"])); // Default expand "Men"
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const sidebarRef = useRef(null);

  const { filters, toggleFilter, filterOptions } = useFilter();

  // Fetch category structure from API
  useEffect(() => {
    const fetchCategoryStructure = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`
        );
        const data = response.data.data || [];
        console.log("Category Structure:", data);
        setCategoryStructure(data);
      } catch (error) {
        console.error("Error fetching category structure:", error);
      }
    };

    fetchCategoryStructure();
  }, []);

  // Log states for debugging
  useEffect(() => {
    console.log("Expanded Parent Categories:", [...expandedParentCategories]);
    console.log("Expanded Categories:", [...expandedCategories]);
    console.log("Filters:", filters);
    console.log("Filter Options:", filterOptions);
  }, [expandedParentCategories, expandedCategories, filters, filterOptions]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleDropdownToggle = (dropdown) => {
    console.log("Toggling dropdown:", dropdown);
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  // Toggle parentCategory expansion
  const toggleParentCategory = (parentCategory) => {
    console.log("Toggling parentCategory:", parentCategory);
    setExpandedParentCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(parentCategory)) {
        newSet.delete(parentCategory);
        // Clear categoryNames under this parentCategory
        setExpandedCategories((prevCats) => {
          const newCats = new Set(prevCats);
          categoryStructure
            .find((cat) => cat.parentCategory === parentCategory)
            ?.categories.forEach((cat) => newCats.delete(cat.categoryName));
          return newCats;
        });
      } else {
        newSet.add(parentCategory);
      }
      console.log("New Parent Categories Set:", [...newSet]);
      return newSet;
    });
  };

  // Toggle categoryName expansion
  const toggleCategoryName = (categoryName) => {
    console.log("Toggling categoryName:", categoryName);
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      console.log("New Categories Set:", [...newSet]);
      return newSet;
    });
  };

  const isFilterSelected = (type, value) => {
    return filters[type].includes(value);
  };

  const handleFilterChange = (type, value) => {
    console.log("Filter changed:", { type, value });
    toggleFilter(type, value);
  };

  const renderSelectedFilters = (type) => {
    if (filters[type].length === 0) return null;

    return (
      <div className="mt-2 mb-3">
        <div className="text-sm text-gray-600">Selected:</div>
        <div className="flex flex-wrap gap-2 mt-1">
          {filters[type].map((value) => (
            <div
              key={`selected-${type}-${value}`}
              className="bg-custom-pink bg-opacity-10 text-custom-pink text-xs px-2 py-1 rounded-full flex items-center"
            >
              {value}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterChange(type, value);
                }}
                className="ml-1 text-custom-pink hover:text-custom-pink"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="lg:hidden sticky top-0 left-0 z-0">
        <button
          onClick={toggleSidebar}
          className="text-custom-pink text-3xl focus:outline-none"
        >
          <FiMenu />
        </button>
      </div>

      <div
        ref={sidebarRef}
        className={`fixed lg:sticky top-20 left-0 h-auto lg:h-[calc(100vh-210px)] w-64 pl-0 pr-4 pt-4 pb-4 z-30 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-[260px] xl:w-80 lg:mt-10 lg:ml-2 lg:block overflow-y-auto scrollbar-hide`}
      >
        <div className="p-4 lg:p-4 shadow-md bg-white rounded-lg">
          <h1 className="text-2xl pt-1 text-custom-pink font-bold">Filter by</h1>

          <div className="mt-4 filter-section flex flex-col space-y-4">
            {/* Category Filter (Nested) */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleDropdownToggle("category")}
                aria-expanded={openDropdown === "category"}
                aria-controls="category-options"
              >
                <label className="font-semibold mb-2">Category</label>
                <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
                  <span className="text-gray-500">
                    {openDropdown === "category" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </span>
                </div>
              </div>

              {openDropdown === "category" && (
                <div
                  id="category-options"
                  className="flex flex-col space-y-1 mt-2 ml-3"
                >
                  {categoryStructure.length === 0 ? (
                    <div className="text-gray-500">Loading categories...</div>
                  ) : (
                    categoryStructure.map((parentCat) => (
                      <div key={parentCat._id} className="ml-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`category-${parentCat._id}`}
                              name="category"
                              value={parentCat.parentCategory}
                              checked={isFilterSelected(
                                "category",
                                parentCat.parentCategory
                              )}
                              onChange={() =>
                                handleFilterChange("category", parentCat.parentCategory)
                              }
                              className="hidden"
                            />
                            <label
                              htmlFor={`category-${parentCat._id}`}
                              className="flex items-center cursor-pointer font-semibold"
                            >
                              <span
                                className={`custom-checkbox ${
                                  isFilterSelected("category", parentCat.parentCategory)
                                    ? "checked"
                                    : ""
                                }`}
                              />
                              {parentCat.parentCategory}
                            </label>
                          </div>
                          <div
                            className="p-1 cursor-pointer"
                            onClick={() => {
                              console.log("Chevron clicked for parentCategory:", parentCat.parentCategory);
                              toggleParentCategory(parentCat.parentCategory);
                            }}
                          >
                            <span className="text-gray-500">
                              {expandedParentCategories.has(parentCat.parentCategory) ? (
                                <FiChevronUp />
                              ) : (
                                <FiChevronDown />
                              )}
                            </span>
                          </div>
                        </div>
                        {/* Category Names */}
                        {expandedParentCategories.has(parentCat.parentCategory) && (
                          <div className="ml-4">
                            {parentCat.categories.length === 0 ? (
                              <div className="text-gray-500">No categories available</div>
                            ) : (
                              parentCat.categories
                                .filter((cat) => cat.status === "active")
                                .map((cat) => (
                                  <div key={cat._id}>
                                    <div className="flex items-center justify-between mt-1">
                                      <div className="flex items-center">
                                        <input
                                          type="checkbox"
                                          id={`categoryName-${cat._id}`}
                                          name="categoryName"
                                          value={cat.categoryName}
                                          checked={isFilterSelected(
                                            "categoryName",
                                            cat.categoryName
                                          )}
                                          onChange={() =>
                                            handleFilterChange("categoryName", cat.categoryName)
                                          }
                                          className="hidden"
                                        />
                                        <label
                                          htmlFor={`categoryName-${cat._id}`}
                                          className="flex items-center cursor-pointer"
                                        >
                                          <span
                                            className={`custom-checkbox ${
                                              isFilterSelected("categoryName", cat.categoryName)
                                                ? "checked"
                                                : ""
                                            }`}
                                          />
                                          {cat.categoryName}
                                        </label>
                                      </div>
                                      <div
                                        className="p-1 cursor-pointer"
                                        onClick={() => {
                                          console.log("Chevron clicked for categoryName:", cat.categoryName);
                                          toggleCategoryName(cat.categoryName);
                                        }}
                                      >
                                        <span className="text-gray-500">
                                          {expandedCategories.has(cat.categoryName) ? (
                                            <FiChevronUp />
                                          ) : (
                                            <FiChevronDown />
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                    {/* SubCategory Names */}
                                    {expandedCategories.has(cat.categoryName) && (
                                      <div className="ml-4">
                                        {cat.subCategories?.length === 0 ? (
                                          <div className="text-gray-500">
                                            No subcategories available
                                          </div>
                                        ) : (
                                          cat.subCategories
                                            .filter((subCat) => subCat.status === "active")
                                            .map((subCat) => (
                                              <div
                                                key={subCat._id}
                                                className="flex items-center mt-1"
                                              >
                                                <input
                                                  type="checkbox"
                                                  id={`subCategoryName-${subCat._id}`}
                                                  name="subCategoryName"
                                                  value={subCat.subCategoryName}
                                                  checked={isFilterSelected(
                                                    "subCategoryName",
                                                    subCat.subCategoryName
                                                  )}
                                                  onChange={() =>
                                                    handleFilterChange(
                                                      "subCategoryName",
                                                      subCat.subCategoryName
                                                    )
                                                  }
                                                  className="hidden"
                                                />
                                                <label
                                                  htmlFor={`subCategoryName-${subCat._id}`}
                                                  className="flex items-center cursor-pointer"
                                                >
                                                  <span
                                                    className={`custom-checkbox ${
                                                      isFilterSelected(
                                                        "subCategoryName",
                                                        subCat.subCategoryName
                                                      )
                                                        ? "checked"
                                                        : ""
                                                    }`}
                                                  />
                                                  {subCat.subCategoryName}
                                                </label>
                                              </div>
                                            ))
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <hr />

            {/* Price Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleDropdownToggle("price")}
                aria-expanded={openDropdown === "price"}
                aria-controls="price-options"
              >
                <label className="font-semibold mb-2">Price</label>
                <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
                  <span className="text-gray-500">
                    {openDropdown === "price" ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
              </div>

              {openDropdown === "price" && (
                <div
                  id="price-options"
                  className="flex flex-col space-y-1 mt-2 ml-3"
                >
                  {filterOptions.price.map((price) => (
                    <div className="flex items-center" key={price}>
                      <input
                        type="checkbox"
                        id={`price-${price}`}
                        name="price"
                        value={price}
                        checked={isFilterSelected("price", price)}
                        onChange={() => handleFilterChange("price", price)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`price-${price}`}
                        className="flex items-center cursor-pointer"
                      >
                        <span
                          className={`custom-checkbox ${
                            isFilterSelected("price", price) ? "checked" : ""
                          }`}
                        />
                        {price}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr />

            {/* Size Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleDropdownToggle("size")}
                aria-expanded={openDropdown === "size"}
                aria-controls="size-options"
              >
                <label className="font-semibold mb-2">Size</label>
                <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
                  <span className="text-gray-500">
                    {openDropdown === "size" ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
              </div>

              {openDropdown === "size" && (
                <div
                  id="size-options"
                  className="flex flex-col space-y-1 mt-2 ml-3"
                >
                  {filterOptions.size.map((size) => (
                    <div className="flex items-center" key={size}>
                      <input
                        type="checkbox"
                        id={`size-${size}`}
                        name="size"
                        value={size}
                        checked={isFilterSelected("size", size)}
                        onChange={() => handleFilterChange("size", size)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className="flex items-center cursor-pointer"
                      >
                        <span
                          className={`custom-checkbox ${
                            isFilterSelected("size", size) ? "checked" : ""
                          }`}
                        />
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr />

            {/* Condition Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleDropdownToggle("condition")}
                aria-expanded={openDropdown === "condition"}
                aria-controls="condition-options"
              >
                <label className="font-semibold mb-2">Condition</label>
                <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
                  <span className="text-gray-500">
                    {openDropdown === "condition" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </span>
                </div>
              </div>

              {openDropdown === "condition" && (
                <div
                  id="condition-options"
                  className="flex flex-col space-y-1 mt-2 ml-3"
                >
                  {filterOptions.condition.map((condition) => (
                    <div className="flex items-center" key={condition}>
                      <input
                        type="checkbox"
                        id={`condition-${condition}`}
                        name="condition"
                        value={condition}
                        checked={isFilterSelected("condition", condition)}
                        onChange={() => handleFilterChange("condition", condition)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`condition-${condition}`}
                        className="flex items-center cursor-pointer"
                      >
                        <span
                          className={`custom-checkbox ${
                            isFilterSelected("condition", condition) ? "checked" : ""
                          }`}
                        />
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-checkbox {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: white;
          border: 2px solid #555;
          border-radius: 4px;
          position: relative;
          margin-right: 8px;
          transition: all 0.2s ease;
        }

        input[type="checkbox"]:checked + label .custom-checkbox,
        .custom-checkbox.checked {
          background-color: #e4086f;
          border-color: #e4086f;
        }

        .custom-checkbox::after {
          content: "";
          position: absolute;
          top: 3px;
          left: 7px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        input[type="checkbox"]:checked + label .custom-checkbox::after,
        .custom-checkbox.checked::after {
          opacity: 1;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default SideBar;
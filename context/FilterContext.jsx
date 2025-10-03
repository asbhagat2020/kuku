
// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
// } from "react";
// import toast from "react-hot-toast";

// // Create context for filter state
// export const FilterContext = createContext();

// export const FilterProvider = ({ children, initialSearch }) => {
//   // Initialize filter state with empty selections
//   const [filters, setFilters] = useState({
//     category: [],
//     price: [],
//     size: [],
//     condition: [],
//   });

//   // Initialize state for products and filtered products
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // State for API filtered products (from URL parameters)
//   const [apiFilteredProducts, setApiFilteredProducts] = useState([]);
//   const [baseApiProducts, setBaseApiProducts] = useState([]); // Store original API results
//   const [apiLoading, setApiLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(initialSearch || "");

//   // Store category information from URL parameters
//   const [categoryInfo, setCategoryInfo] = useState({
//     parentCategory: null,
//     categoryName: null,
//     subCategoryName: null,
//   });

//   // Track available filter options
//   const [filterOptions, setFilterOptions] = useState({
//     category: [],
//     price: ["0 - 300", "300 - 500", "500 Above"],
//     size: [],
//     condition: [],
//   });

//   useEffect(() => {
//     if (initialSearch) {
//       setSearchTerm(initialSearch);
//     }
//   }, [initialSearch]);

//   // Load products from API - KEEP THIS UNCHANGED
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
//         );
//         const data = await response.json();
//         const acceptedProducts = data?.filter(
//           (item) => item?.approval?.status === "Accepted"
//         );

//         setProducts(acceptedProducts || []);
//         setFilteredProducts(acceptedProducts || []);

//         // Extract unique filter options from products
//         if (acceptedProducts && acceptedProducts.length > 0) {
//           extractFilterOptions(acceptedProducts);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Fetch products with URL filter parameters
//   const fetchProductsWithFilters = useCallback(
//     async (parentCategory, categoryName, subCategoryName) => {
//       // Reset previous state
//       setApiError(null);

//       // Store category information
//       setCategoryInfo({
//         parentCategory,
//         categoryName,
//         subCategoryName,
//       });

//       // Clear filters when new API call is made
//       setFilters({
//         category: parentCategory ? [parentCategory] : [], // Pre-select parent category
//         price: [],
//         size: [],
//         condition: [],
//       });

//       // If no filter parameters, clear API filtered products and return
//       if (!parentCategory && !categoryName && !subCategoryName) {
//         setApiFilteredProducts([]);
//         setBaseApiProducts([]);
//         setApiLoading(false);
//         return;
//       }

//       // Set loading state
//       setApiLoading(true);

//       try {
//         // Build URL with available parameters
//         let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/filter?`;
//         const params = [];

//         if (parentCategory)
//           params.push(`parentCategory=${encodeURIComponent(parentCategory)}`);
//         if (categoryName)
//           params.push(`categoryName=${encodeURIComponent(categoryName)}`);
//         if (subCategoryName)
//           params.push(`subCategoryName=${encodeURIComponent(subCategoryName)}`);

//         url += params.join("&");

//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();

//         // Handle different response structures
//         let productsData = [];
//         if (result.success && Array.isArray(result.data)) {
//           productsData = result.data;
//         } else if (result.products && Array.isArray(result.products)) {
//           productsData = result.products;
//         } else if (Array.isArray(result)) {
//           productsData = result;
//         } else {
//           throw new Error("Invalid API response structure");
//         }

//         // Filter for accepted products
//         const acceptedProducts = productsData.filter(
//           (item) => item?.approval?.status === "Accepted"
//         );

//         setBaseApiProducts(acceptedProducts);
//         setApiFilteredProducts(acceptedProducts);

//         // Extract filter options from API results
//         if (acceptedProducts && acceptedProducts.length > 0) {
//           extractFilterOptions(acceptedProducts);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setApiError(err.message);
//         setApiFilteredProducts([]);
//         setBaseApiProducts([]);
//         toast.error("Failed to load filtered products");
//       } finally {
//         setApiLoading(false);
//       }
//     },
//     []
//   );

//   // Extract unique filter options from products
//   const extractFilterOptions = (products) => {
//     const categories = new Set();
//     const sizes = new Set();
//     const conditions = new Set();

//     products.forEach((product) => {
//       // Extract categories
//       if (product.category?.parentCategory) {
//         categories.add(product.category.parentCategory);
//       }

//       // Extract sizes
//       if (product.size?.sizeName) {
//         sizes.add(product.size.sizeName);
//       }

//       // Extract conditions
//       if (product.condition?.conditionName) {
//         conditions.add(product.condition.conditionName);
//       }
//     });

//     setFilterOptions((prevOptions) => ({
//       ...prevOptions,
//       category: Array.from(categories),
//       size: Array.from(sizes),
//       condition: Array.from(conditions),
//     }));
//   };

//   useEffect(() => {
//     if (products.length === 0) return;

//     // Start with all products
//     let filtered = [...products];

//     // Apply search term filter if present - UPDATED TO INCLUDE CATEGORYNAME
//     if (searchTerm) {
//       filtered = filtered.filter((product) => {
//         const matchesSearch =
//           product.category?.subCategoryName
//             ?.toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           product.category?.categoryName // Added this line
//             ?.toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           product.name?.toLowerCase().includes(searchTerm.toLowerCase());
//         product.seller?.username
//           ?.toLowerCase()
//           .includes(searchTerm.toLowerCase());
//         return matchesSearch;
//       });
//     }

//     // Skip further filtering if no filters are selected and there's no search term
//     if (
//       !searchTerm &&
//       Object.values(filters).every((filterGroup) => filterGroup.length === 0)
//     ) {
//       setFilteredProducts(filtered);
//       return;
//     }

//     // Apply remaining filters (category, size, condition, price)
//     filtered = filtered.filter((product) => {
//       // Check category filter
//       if (
//         filters.category.length > 0 &&
//         !filters.category.includes(product.category?.parentCategory)
//       ) {
//         return false;
//       }

//       // Check size filter
//       if (
//         filters.size.length > 0 &&
//         !filters.size.includes(product.size?.sizeName)
//       ) {
//         return false;
//       }

//       // Check condition filter
//       if (
//         filters.condition.length > 0 &&
//         !filters.condition.includes(product.condition?.conditionName)
//       ) {
//         return false;
//       }

//       // Check price filter
//       if (filters.price.length > 0) {
//         const price = product.price;
//         let priceMatch = false;

//         for (const range of filters.price) {
//           if (range === "0 - 300" && price <= 300) {
//             priceMatch = true;
//             break;
//           } else if (range === "300 - 500" && price > 300 && price <= 500) {
//             priceMatch = true;
//             break;
//           } else if (range === "500 Above" && price > 500) {
//             priceMatch = true;
//             break;
//           }
//         }

//         if (!priceMatch) return false;
//       }

//       return true;
//     });

//     setFilteredProducts(filtered);
//   }, [filters, products, searchTerm]);

//   useEffect(() => {
//     if (baseApiProducts.length === 0) return;

//     // If no filters are selected except category (which might be pre-selected), show all API products
//     const hasActiveFilters =
//       filters.price.length > 0 ||
//       filters.size.length > 0 ||
//       filters.condition.length > 0 ||
//       (filters.category.length > 0 &&
//         !filters.category.includes(categoryInfo.parentCategory));

//     // Always apply search term filter regardless of other filters
//     if (searchTerm || hasActiveFilters) {
//       // Apply filters to base API products
//       const filtered = baseApiProducts.filter((product) => {
//         // Always apply search term filter - UPDATED TO INCLUDE CATEGORYNAME
//         if (searchTerm) {
//           const matchesSearch =
//             product.category?.subCategoryName
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             product.category?.categoryName // Added this line
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             product.name?.toLowerCase().includes(searchTerm.toLowerCase());
//             product.seller?.username?.toLowerCase().includes(searchTerm.toLowerCase());
//           if (!matchesSearch) return false;
//         }

//         // Check category filter (only if different from pre-selected parent category)
//         if (filters.category.length > 0) {
//           const nonParentCategoryFilters = filters.category.filter(
//             (cat) => cat !== categoryInfo.parentCategory
//           );
//           if (
//             nonParentCategoryFilters.length > 0 &&
//             !nonParentCategoryFilters.includes(product.category?.parentCategory)
//           ) {
//             return false;
//           }
//         }

//         // Check size filter
//         if (
//           filters.size.length > 0 &&
//           !filters.size.includes(product.size?.sizeName)
//         ) {
//           return false;
//         }

//         // Check condition filter
//         if (
//           filters.condition.length > 0 &&
//           !filters.condition.includes(product.condition?.conditionName)
//         ) {
//           return false;
//         }

//         // Check price filter
//         if (filters.price.length > 0) {
//           const price = product.price;
//           let priceMatch = false;

//           for (const range of filters.price) {
//             if (range === "0 - 300" && price <= 300) {
//               priceMatch = true;
//               break;
//             } else if (range === "300 - 500" && price > 300 && price <= 500) {
//               priceMatch = true;
//               break;
//             } else if (range === "500 Above" && price > 500) {
//               priceMatch = true;
//               break;
//             }
//           }

//           if (!priceMatch) return false;
//         }

//         return true;
//       });

//       setApiFilteredProducts(filtered);
//     } else {
//       setApiFilteredProducts(baseApiProducts);
//     }
//   }, [filters, baseApiProducts, categoryInfo.parentCategory, searchTerm]);

//   // Add search methods
//   const setSearch = useCallback((term) => {
//     setSearchTerm(term);

//     // Update URL with search parameter
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       if (term) {
//         searchParams.set("search", term);
//       } else {
//         searchParams.delete("search");
//       }

//       const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//       window.history.pushState({}, "", newUrl);
//     }
//   }, []);

//   const clearSearch = useCallback(() => {
//     setSearchTerm("");

//     // Remove search parameter from URL
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       searchParams.delete("search");

//       const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//       window.history.pushState({}, "", newUrl);
//     }
//   }, []);

//   // Toggle filter selection
//   const toggleFilter = (type, value) => {
//     setFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters };

//       if (updatedFilters[type].includes(value)) {
//         // Remove filter if already selected
//         updatedFilters[type] = updatedFilters[type].filter(
//           (item) => item !== value
//         );
//       } else {
//         // Add filter if not selected
//         updatedFilters[type] = [...updatedFilters[type], value];
//       }

//       return updatedFilters;
//     });
//   };

//   const clearFilters = () => {
//     if (baseApiProducts.length > 0) {
//       // If we have API products, keep parent category selected
//       setFilters({
//         category: categoryInfo.parentCategory
//           ? [categoryInfo.parentCategory]
//           : [],
//         price: [],
//         size: [],
//         condition: [],
//       });
//     } else {
//       setFilters({
//         category: [],
//         price: [],
//         size: [],
//         condition: [],
//       });
//     }

//     // Don't clear search when clearing other filters
//     // This allows users to maintain their search while adjusting other filters
//   };

//   // Clear API filters
//   const clearApiFilters = useCallback(() => {
//     setApiFilteredProducts([]);
//     setBaseApiProducts([]);
//     setApiError(null);
//     setApiLoading(false);
//     setCategoryInfo({
//       parentCategory: null,
//       categoryName: null,
//       subCategoryName: null,
//     });
//     setFilters({
//       category: [],
//       price: [],
//       size: [],
//       condition: [],
//     });
//     // Keep search term when clearing API filters
//   }, []);

//   // Determine which products to show
//   const currentProducts =
//     baseApiProducts.length > 0 ? apiFilteredProducts : filteredProducts;
//   const currentLoading = apiLoading;

//   return (
//     <FilterContext.Provider
//       value={{
//         filters,
//         toggleFilter,
//         clearFilters,
//         products,
//         filteredProducts: currentProducts, // Use either API filtered or regular filtered products
//         filterOptions,
//         // API filtered products functionality
//         apiFilteredProducts,
//         apiLoading,
//         apiError,
//         fetchProductsWithFilters,
//         clearApiFilters,
//         categoryInfo,
//         loading: currentLoading,
//         searchTerm,
//         setSearch,
//         clearSearch,
//       }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// };

// // Custom hook for easy access to filter context
// export const useFilter = () => useContext(FilterContext);











// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
// } from "react";
// import toast from "react-hot-toast";

// // Create context for filter state
// export const FilterContext = createContext();

// export const FilterProvider = ({ children, initialSearch}) => {
//   // Initialize filter state with empty selections
//   const [filters, setFilters] = useState({
//     category: [],
//     price: [],
//     size: [],
//     condition: [],
//   });

//   // Initialize state for products and filtered products
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // State for API filtered products (from URL parameters)
//   const [apiFilteredProducts, setApiFilteredProducts] = useState([]);
//   const [baseApiProducts, setBaseApiProducts] = useState([]); // Store original API results
//   const [apiLoading, setApiLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(initialSearch || "");

//   // Store category information from URL parameters
//   const [categoryInfo, setCategoryInfo] = useState({
//     parentCategory: null,
//     categoryName: null,
//     subCategoryName: null,
//   });

//   // Track available filter options
//   const [filterOptions, setFilterOptions] = useState({
//     category: [],
//     price: ["0 - 300", "300 - 500", "500 Above"],
//     size: [],
//     condition: [],
//   });

//   useEffect(() => {
//     if (initialSearch) {
//       setSearchTerm(initialSearch);
//     }
//   }, [initialSearch]);

//   // Load products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
//         );
//         const data = await response.json();
//         console.log("Products API response:", data); // Debug log
//         const acceptedProducts = data?.filter(
//           (item) => item?.approval?.status === "Accepted"
//         );

//         setProducts(acceptedProducts || []);
//         setFilteredProducts(acceptedProducts || []);

//         // Extract unique filter options from products
//         if (acceptedProducts && acceptedProducts.length > 0) {
//           extractFilterOptions(acceptedProducts);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         toast.error("Failed to load products");
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Fetch products with URL filter parameters
//   const fetchProductsWithFilters = useCallback(
//     async (parentCategory, categoryName, subCategoryName) => {
//       // Reset previous state
//       setApiError(null);

//       // Store category information
//       setCategoryInfo({
//         parentCategory,
//         categoryName,
//         subCategoryName,
//       });

//       // Clear filters when new API call is made
//       setFilters({
//         category: parentCategory ? [parentCategory] : [], // Pre-select parent category
//         price: [],
//         size: [],
//         condition: [],
//       });

//       // If no filter parameters, clear API filtered products and return
//       if (!parentCategory && !categoryName && !subCategoryName) {
//         setApiFilteredProducts([]);
//         setBaseApiProducts([]);
//         setApiLoading(false);
//         return;
//       }

//       // Set loading state
//       setApiLoading(true);

//       try {
//         // Build URL with available parameters
//         let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/filter?`;
//         const params = [];

//         if (parentCategory)
//           params.push(`parentCategory=${encodeURIComponent(parentCategory)}`);
//         if (categoryName)
//           params.push(`categoryName=${encodeURIComponent(categoryName)}`);
//         if (subCategoryName)
//           params.push(`subCategoryName=${encodeURIComponent(subCategoryName)}`);

//         url += params.join("&");

//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();

//         // Handle different response structures
//         let productsData = [];
//         if (result.success && Array.isArray(result.data)) {
//           productsData = result.data;
//         } else if (result.products && Array.isArray(result.products)) {
//           productsData = result.products;
//         } else if (Array.isArray(result)) {
//           productsData = result;
//         } else {
//           throw new Error("Invalid API response structure");
//         }

//         // Filter for accepted products
//         const acceptedProducts = productsData.filter(
//           (item) => item?.approval?.status === "Accepted"
//         );

//         setBaseApiProducts(acceptedProducts);
//         setApiFilteredProducts(acceptedProducts);

//         // Extract filter options from API results
//         if (acceptedProducts && acceptedProducts.length > 0) {
//           extractFilterOptions(acceptedProducts);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setApiError(err.message);
//         setApiFilteredProducts([]);
//         setBaseApiProducts([]);
//         toast.error("Failed to load filtered products");
//       } finally {
//         setApiLoading(false);
//       }
//     },
//     []
//   );

//   // Extract unique filter options from products
//   const extractFilterOptions = (products) => {
//     const categories = new Set();
//     const sizes = new Set();
//     const conditions = new Set();

//     products.forEach((product) => {
//       // Extract categories
//       if (product.category?.parentCategory) {
//         categories.add(product.category.parentCategory);
//       }

//       // Extract sizes
//       if (product.size?.sizeName) {
//         sizes.add(product.size.sizeName);
//       }

//       // Extract conditions
//       if (product.condition?.conditionName) {
//         conditions.add(product.condition.conditionName);
//       }
//     });

//     setFilterOptions((prevOptions) => ({
//       ...prevOptions,
//       category: Array.from(categories),
//       size: Array.from(sizes),
//       condition: Array.from(conditions),
//     }));
//   };

//   // useEffect for filtering products (non-API)
//   useEffect(() => {
//     if (products.length === 0) return;

//     // Start with all products
//     let filtered = [...products];

//     // Apply search term filter if present
//     if (searchTerm) {
//       filtered = filtered.filter((product) => {
//         const matchesSearch =
//           product.category?.subCategoryName
//             ?.toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           product.category?.categoryName
//             ?.toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           product.seller?.username
//             ?.toLowerCase()
//             .includes(searchTerm.toLowerCase()); // Fixed: Included in matchesSearch
//         return matchesSearch;
//       });
//     }

//     // Skip further filtering if no filters are selected and there's no search term
//     if (
//       !searchTerm &&
//       Object.values(filters).every((filterGroup) => filterGroup.length === 0)
//     ) {
//       setFilteredProducts(filtered);
//       return;
//     }

//     // Apply remaining filters (category, size, condition, price)
//     filtered = filtered.filter((product) => {
//       // Check category filter
//       if (
//         filters.category.length > 0 &&
//         !filters.category.includes(product.category?.parentCategory)
//       ) {
//         return false;
//       }

//       // Check size filter
//       if (
//         filters.size.length > 0 &&
//         !filters.size.includes(product.size?.sizeName)
//       ) {
//         return false;
//       }

//       // Check condition filter
//       if (
//         filters.condition.length > 0 &&
//         !filters.condition.includes(product.condition?.conditionName)
//       ) {
//         return false;
//       }

//       // Check price filter
//       if (filters.price.length > 0) {
//         const price = product.price;
//         let priceMatch = false;

//         for (const range of filters.price) {
//           if (range === "0 - 300" && price <= 300) {
//             priceMatch = true;
//             break;
//           } else if (range === "300 - 500" && price > 300 && price <= 500) {
//             priceMatch = true;
//             break;
//           } else if (range === "500 Above" && price > 500) {
//             priceMatch = true;
//             break;
//           }
//         }

//         if (!priceMatch) return false;
//       }

//       return true;
//     });

//     setFilteredProducts(filtered);
//   }, [filters, products, searchTerm]);

//   // useEffect for filtering API products
//   useEffect(() => {
//     if (baseApiProducts.length === 0) return;

//     // If no filters are selected except category (which might be pre-selected), show all API products
//     const hasActiveFilters =
//       filters.price.length > 0 ||
//       filters.size.length > 0 ||
//       filters.condition.length > 0 ||
//       (filters.category.length > 0 &&
//         !filters.category.includes(categoryInfo.parentCategory));

//     // Always apply search term filter regardless of other filters
//     if (searchTerm || hasActiveFilters) {
//       // Apply filters to base API products
//       const filtered = baseApiProducts.filter((product) => {
//         // Always apply search term filter
//         if (searchTerm) {
//           const matchesSearch =
//             product.category?.subCategoryName
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             product.category?.categoryName
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             product.seller?.username
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()); // Fixed: Included in matchesSearch
//           if (!matchesSearch) return false;
//         }

//         // Check category filter (only if different from pre-selected parent category)
//         if (filters.category.length > 0) {
//           const nonParentCategoryFilters = filters.category.filter(
//             (cat) => cat !== categoryInfo.parentCategory
//           );
//           if (
//             nonParentCategoryFilters.length > 0 &&
//             !nonParentCategoryFilters.includes(product.category?.parentCategory)
//           ) {
//             return false;
//           }
//         }

//         // Check size filter
//         if (
//           filters.size.length > 0 &&
//           !filters.size.includes(product.size?.sizeName)
//         ) {
//           return false;
//         }

//         // Check condition filter
//         if (
//           filters.condition.length > 0 &&
//           !filters.condition.includes(product.condition?.conditionName)
//         ) {
//           return false;
//         }

//         // Check price filter
//         if (filters.price.length > 0) {
//           const price = product.price;
//           let priceMatch = false;

//           for (const range of filters.price) {
//             if (range === "0 - 300" && price <= 300) {
//               priceMatch = true;
//               break;
//             } else if (range === "300 - 500" && price > 300 && price <= 500) {
//               priceMatch = true;
//               break;
//             } else if (range === "500 Above" && price > 500) {
//               priceMatch = true;
//               break;
//             }
//           }

//           if (!priceMatch) return false;
//         }

//         return true;
//       });

//       setApiFilteredProducts(filtered);
//     } else {
//       setApiFilteredProducts(baseApiProducts);
//     }
//   }, [filters, baseApiProducts, categoryInfo.parentCategory, searchTerm]);

//   // Add search methods
//   const setSearch = useCallback((term) => {
//     setSearchTerm(term);

//     // Update URL with search parameter
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       if (term) {
//         searchParams.set("search", term);
//       } else {
//         searchParams.delete("search");
//       }

//       const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//       window.history.pushState({}, "", newUrl);
//     }
//   }, []);

//   const clearSearch = useCallback(() => {
//     setSearchTerm("");

//     // Remove search parameter from URL
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       searchParams.delete("search");

//       const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//       window.history.pushState({}, "", newUrl);
//     }
//   }, []);

//   // Toggle filter selection
//   const toggleFilter = (type, value) => {
//     setFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters };

//       if (updatedFilters[type].includes(value)) {
//         // Remove filter if already selected
//         updatedFilters[type] = updatedFilters[type].filter(
//           (item) => item !== value
//         );
//       } else {
//         // Add filter if not selected
//         updatedFilters[type] = [...updatedFilters[type], value];
//       }

//       return updatedFilters;
//     });
//   };

//   const clearFilters = () => {
//     if (baseApiProducts.length > 0) {
//       // If we have API products, keep parent category selected
//       setFilters({
//         category: categoryInfo.parentCategory
//           ? [categoryInfo.parentCategory]
//           : [],
//         price: [],
//         size: [],
//         condition: [],
//       });
//     } else {
//       setFilters({
//         category: [],
//         price: [],
//         size: [],
//         condition: [],
//       });
//     }

//     // Don't clear search when clearing other filters
//     // This allows users to maintain their search while adjusting other filters
//   };

//   // Clear API filters
//   const clearApiFilters = useCallback(() => {
//     setApiFilteredProducts([]);
//     setBaseApiProducts([]);
//     setApiError(null);
//     setApiLoading(false);
//     setCategoryInfo({
//       parentCategory: null,
//       categoryName: null,
//       subCategoryName: null,
//     });
//     setFilters({
//       category: [],
//       price: [],
//       size: [],
//       condition: [],
//     });
//     // Keep search term when clearing API filters
//   }, []);

//   // Determine which products to show
//   const currentProducts =
//     baseApiProducts.length > 0 ? apiFilteredProducts : filteredProducts;
//   const currentLoading = apiLoading;

//   return (
//     <FilterContext.Provider
//       value={{
//         filters,
//         toggleFilter,
//         clearFilters,
//         products,
//         filteredProducts: currentProducts, // Use either API filtered or regular filtered products
//         filterOptions,
//         // API filtered products functionality
//         apiFilteredProducts,
//         apiLoading,
//         apiError,
//         fetchProductsWithFilters,
//         clearApiFilters,
//         categoryInfo,
//         loading: currentLoading,
//         searchTerm,
//         setSearch,
//         clearSearch,
//       }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// };

// // Custom hook for easy access to filter context
// export const useFilter = () => useContext(FilterContext);






// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
// } from "react";
// import toast from "react-hot-toast";

// export const FilterContext = createContext();

// export const FilterProvider = ({ children, initialSearch, categoryName }) => { // Add categoryName
//   const [filters, setFilters] = useState({
//     category: [],
//     price: [],
//     size: [],
//     condition: [],
//   });

//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [apiFilteredProducts, setApiFilteredProducts] = useState([]);
//   const [baseApiProducts, setBaseApiProducts] = useState([]);
//   const [apiLoading, setApiLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(initialSearch || "");
//   const [categoryInfo, setCategoryInfo] = useState({
//     parentCategory: null,
//     categoryName: null,
//     subCategoryName: null,
//   });

//   const [filterOptions, setFilterOptions] = useState({
//     category: [],
//     price: ["0 - 300", "300 - 500", "500 Above"],
//     size: [],
//     condition: [],
//   });

//   useEffect(() => {
//     if (initialSearch) {
//       setSearchTerm(initialSearch);
//     }
//   }, [initialSearch]);

//   // Load products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
//         );
//         const data = await response.json();
//         console.log("Products API response:", data);
//         const acceptedProducts = data?.filter(
//           (item) => item?.approval?.status === "Accepted"
//         );

//         setProducts(acceptedProducts || []);
//         setFilteredProducts(acceptedProducts || []);

//         if (acceptedProducts && acceptedProducts.length > 0) {
//           extractFilterOptions(acceptedProducts);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         toast.error("Failed to load products");
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Fetch products with URL filter parameters
//   const fetchProductsWithFilters = useCallback(
//     async (parentCategory, categoryNameParam, subCategoryName) => {
//       setApiError(null);
//       setCategoryInfo({
//         parentCategory,
//         categoryName: categoryNameParam,
//         subCategoryName,
//       });

//       setFilters({
//         category: parentCategory ? [parentCategory] : [],
//         price: [],
//         size: [],
//         condition: [],
//       });

//       if (!parentCategory && !categoryNameParam && !subCategoryName) {
//         setApiFilteredProducts([]);
//         setBaseApiProducts([]);
//         setApiLoading(false);
//         return;
//       }

//       setApiLoading(true);

//       try {
//         let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/filter?`;
//         const params = [];

//         if (parentCategory)
//           params.push(`parentCategory=${encodeURIComponent(parentCategory)}`);
//         if (categoryNameParam)
//           params.push(`categoryName=${encodeURIComponent(categoryNameParam)}`);
//         if (subCategoryName)
//           params.push(`subCategoryName=${encodeURIComponent(subCategoryName)}`);

//         url += params.join("&");

//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();

//         let productsData = [];
//         if (result.success && Array.isArray(result.data)) {
//           productsData = result.data;
//         } else if (result.products && Array.isArray(result.products)) {
//           productsData = result.products;
//         } else if (Array.isArray(result)) {
//           productsData = result;
//         } else {
//           throw new Error("Invalid API response structure");
//         }

//         const acceptedProducts = productsData.filter(
//           (item) => item?.approval?.status === "Accepted"
//         );

//         setBaseApiProducts(acceptedProducts);
//         setApiFilteredProducts(acceptedProducts);

//         if (acceptedProducts && acceptedProducts.length > 0) {
//           extractFilterOptions(acceptedProducts);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setApiError(err.message);
//         setApiFilteredProducts([]);
//         setBaseApiProducts([]);
//         toast.error("Failed to load filtered products");
//       } finally {
//         setApiLoading(false);
//       }
//     },
//     []
//   );

//   // Trigger fetchProductsWithFilters when categoryName changes
//   useEffect(() => {
//     if (categoryName) {
//       fetchProductsWithFilters(null, categoryName, null); // Call with categoryName
//     }
//   }, [categoryName, fetchProductsWithFilters]);

//   const extractFilterOptions = (products) => {
//     const categories = new Set();
//     const sizes = new Set();
//     const conditions = new Set();

//     products.forEach((product) => {
//       if (product.category?.parentCategory) {
//         categories.add(product.category.parentCategory);
//       }
//       if (product.size?.sizeName) {
//         sizes.add(product.size.sizeName);
//       }
//       if (product.condition?.conditionName) {
//         conditions.add(product.condition.conditionName);
//       }
//     });

//     setFilterOptions((prevOptions) => ({
//       ...prevOptions,
//       category: Array.from(categories),
//       size: Array.from(sizes),
//       condition: Array.from(conditions),
//     }));
//   };

//   // Filter non-API products
//   useEffect(() => {
//     if (products.length === 0) return;

//     let filtered = [...products];

//     // Apply search term or categoryName filter
//     if (searchTerm || categoryName) {
//       filtered = filtered.filter((product) => {
//         const matchesSearch =
//           (searchTerm &&
//             (product.category?.subCategoryName
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//               product.category?.categoryName
//                 ?.toLowerCase()
//                 .includes(searchTerm.toLowerCase()) ||
//               product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               product.seller?.username
//                 ?.toLowerCase()
//                 .includes(searchTerm.toLowerCase()))) ||
//           (categoryName &&
//             product.category?.categoryName
//               ?.toLowerCase()
//               .includes(categoryName.toLowerCase()));
//         return matchesSearch;
//       });
//     }

//     if (
//       !searchTerm &&
//       !categoryName &&
//       Object.values(filters).every((filterGroup) => filterGroup.length === 0)
//     ) {
//       setFilteredProducts(filtered);
//       return;
//     }

//     filtered = filtered.filter((product) => {
//       if (
//         filters.category.length > 0 &&
//         !filters.category.includes(product.category?.parentCategory)
//       ) {
//         return false;
//       }
//       if (
//         filters.size.length > 0 &&
//         !filters.size.includes(product.size?.sizeName)
//       ) {
//         return false;
//       }
//       if (
//         filters.condition.length > 0 &&
//         !filters.condition.includes(product.condition?.conditionName)
//       ) {
//         return false;
//       }
//       if (filters.price.length > 0) {
//         const price = product.price;
//         let priceMatch = false;

//         for (const range of filters.price) {
//           if (range === "0 - 300" && price <= 300) {
//             priceMatch = true;
//             break;
//           } else if (range === "300 - 500" && price > 300 && price <= 500) {
//             priceMatch = true;
//             break;
//           } else if (range === "500 Above" && price > 500) {
//             priceMatch = true;
//             break;
//           }
//         }

//         if (!priceMatch) return false;
//       }

//       return true;
//     });

//     setFilteredProducts(filtered);
//   }, [filters, products, searchTerm, categoryName]); // Add categoryName to dependencies

//   // Filter API products
//   useEffect(() => {
//     if (baseApiProducts.length === 0) return;

//     const hasActiveFilters =
//       filters.price.length > 0 ||
//       filters.size.length > 0 ||
//       filters.condition.length > 0 ||
//       (filters.category.length > 0 &&
//         !filters.category.includes(categoryInfo.parentCategory));

//     if (searchTerm || categoryName || hasActiveFilters) {
//       const filtered = baseApiProducts.filter((product) => {
//         if (searchTerm || categoryName) {
//           const matchesSearch =
//             (searchTerm &&
//               (product.category?.subCategoryName
//                 ?.toLowerCase()
//                 .includes(searchTerm.toLowerCase()) ||
//                 product.category?.categoryName
//                   ?.toLowerCase()
//                   .includes(searchTerm.toLowerCase()) ||
//                 product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 product.seller?.username
//                   ?.toLowerCase()
//                   .includes(searchTerm.toLowerCase()))) ||
//             (categoryName &&
//               product.category?.categoryName
//                 ?.toLowerCase()
//                 .includes(categoryName.toLowerCase()));
//           if (!matchesSearch) return false;
//         }

//         if (filters.category.length > 0) {
//           const nonParentCategoryFilters = filters.category.filter(
//             (cat) => cat !== categoryInfo.parentCategory
//           );
//           if (
//             nonParentCategoryFilters.length > 0 &&
//             !nonParentCategoryFilters.includes(product.category?.parentCategory)
//           ) {
//             return false;
//           }
//         }

//         if (
//           filters.size.length > 0 &&
//           !filters.size.includes(product.size?.sizeName)
//         ) {
//           return false;
//         }

//         if (
//           filters.condition.length > 0 &&
//           !filters.condition.includes(product.condition?.conditionName)
//         ) {
//           return false;
//         }

//         if (filters.price.length > 0) {
//           const price = product.price;
//           let priceMatch = false;

//           for (const range of filters.price) {
//             if (range === "0 - 300" && price <= 300) {
//               priceMatch = true;
//               break;
//             } else if (range === "300 - 500" && price > 300 && price <= 500) {
//               priceMatch = true;
//               break;
//             } else if (range === "500 Above" && price > 500) {
//               priceMatch = true;
//               break;
//             }
//           }

//           if (!priceMatch) return false;
//         }

//         return true;
//       });

//       setApiFilteredProducts(filtered);
//     } else {
//       setApiFilteredProducts(baseApiProducts);
//     }
//   }, [filters, baseApiProducts, categoryInfo.parentCategory, searchTerm, categoryName]); // Add categoryName

//   const setSearch = useCallback((term) => {
//     setSearchTerm(term);
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       if (term) {
//         searchParams.set("search", term);
//       } else {
//         searchParams.delete("search");
//       }
//       const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//       window.history.pushState({}, "", newUrl);
//     }
//   }, []);

//   const clearSearch = useCallback(() => {
//     setSearchTerm("");
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       searchParams.delete("search");
//       const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//       window.history.pushState({}, "", newUrl);
//     }
//   }, []);

//   const toggleFilter = (type, value) => {
//     setFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters };
//       if (updatedFilters[type].includes(value)) {
//         updatedFilters[type] = updatedFilters[type].filter(
//           (item) => item !== value
//         );
//       } else {
//         updatedFilters[type] = [...updatedFilters[type], value];
//       }
//       return updatedFilters;
//     });
//   };

//   const clearFilters = () => {
//     if (baseApiProducts.length > 0) {
//       setFilters({
//         category: categoryInfo.parentCategory
//           ? [categoryInfo.parentCategory]
//           : [],
//         price: [],
//         size: [],
//         condition: [],
//       });
//     } else {
//       setFilters({
//         category: [],
//         price: [],
//         size: [],
//         condition: [],
//       });
//     }
//   };

//   const clearApiFilters = useCallback(() => {
//     setApiFilteredProducts([]);
//     setBaseApiProducts([]);
//     setApiError(null);
//     setApiLoading(false);
//     setCategoryInfo({
//       parentCategory: null,
//       categoryName: null,
//       subCategoryName: null,
//     });
//     setFilters({
//       category: [],
//       price: [],
//       size: [],
//       condition: [],
//     });
//   }, []);

//   const currentProducts =
//     baseApiProducts.length > 0 ? apiFilteredProducts : filteredProducts;
//   const currentLoading = apiLoading;

//   return (
//     <FilterContext.Provider
//       value={{
//         filters,
//         toggleFilter,
//         clearFilters,
//         products,
//         filteredProducts: currentProducts,
//         filterOptions,
//         apiFilteredProducts,
//         apiLoading,
//         apiError,
//         fetchProductsWithFilters,
//         clearApiFilters,
//         categoryInfo,
//         loading: currentLoading,
//         searchTerm,
//         setSearch,
//         clearSearch,
//       }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilter = () => useContext(FilterContext);










// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
// } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";

// export const FilterContext = createContext();

// export const FilterProvider = ({ children, initialSearch, categoryName }) => {
//   const [filters, setFilters] = useState({
//     category: [],
//     categoryName: [],
//     subCategoryName: [],
//     price: [],
//     size: [],
//     condition: [],
//   });

//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [apiFilteredProducts, setApiFilteredProducts] = useState([]);
//   const [baseApiProducts, setBaseApiProducts] = useState([]);
//   const [apiLoading, setApiLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(initialSearch || "");
//   const [categoryInfo, setCategoryInfo] = useState({
//     parentCategory: null,
//     categoryName: null,
//     subCategoryName: null,
//   });

//   const [filterOptions, setFilterOptions] = useState({
//     category: [],
//     categoryName: [],
//     subCategoryName: [],
//     price: ["0 - 300", "300 - 500", "500 Above"],
//     size: [],
//     condition: [],
//   });

//   useEffect(() => {
//     if (initialSearch) {
//       setSearchTerm(initialSearch);
//     }
//   }, [initialSearch]);

//   // Fetch categories for nested filter options
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         console.log("Fetching categories..."); // Debug log
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`
//         );
//         const data = response.data.data || [];
//         console.log("Categories API response:", data);

//         const categories = new Set();
//         const categoryNames = new Set();
//         const subCategoryNames = new Set();

//         data.forEach((parentCat) => {
//           if (parentCat.parentCategory) {
//             categories.add(parentCat.parentCategory);
//           }
//           parentCat.categories
//             ?.filter((cat) => cat.status === "active")
//             .forEach((cat) => {
//               if (cat.categoryName) {
//                 categoryNames.add(cat.categoryName);
//               }
//               cat.subCategories
//                 ?.filter((subCat) => subCat.status === "active")
//                 .forEach((subCat) => {
//                   if (subCat.subCategoryName) {
//                     subCategoryNames.add(subCat.subCategoryName);
//                   }
//                 });
//             });
//         });

//         const updatedOptions = {
//           ...filterOptions,
//           category: Array.from(categories),
//           categoryName: Array.from(categoryNames),
//           subCategoryName: Array.from(subCategoryNames),
//         };

//         setFilterOptions(updatedOptions);
//         console.log("Updated Filter Options:", updatedOptions);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         toast.error("Failed to load category options");
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Load products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
//         );
//         const data = await response.json();
//         console.log("Products API response:", data);
//         const acceptedProducts = data?.filter(
//           (item) => item?.approval?.status === "Accepted"
//         );

//         setProducts(acceptedProducts || []);
//         setFilteredProducts(acceptedProducts || []);

//         if (acceptedProducts && acceptedProducts.length > 0) {
//           extractFilterOptions(acceptedProducts);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         toast.error("Failed to load products");
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Fetch products with URL filter parameters
//   const fetchProductsWithFilters = useCallback(
//     async (parentCategory, categoryNameParam, subCategoryName) => {
//       setApiError(null);
//       setCategoryInfo({
//         parentCategory,
//         categoryName: categoryNameParam,
//         subCategoryName,
//       });

//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         category: parentCategory ? [parentCategory] : [],
//         categoryName: categoryNameParam ? [categoryNameParam] : [],
//         subCategoryName: subCategoryName ? [subCategoryName] : [],
//       }));

//       if (!parentCategory && !categoryNameParam && !subCategoryName) {
//         setApiFilteredProducts([]);
//         setBaseApiProducts([]);
//         setApiLoading(false);
//         return;
//       }

//       setApiLoading(true);

//       try {
//         let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/filter?`;
//         const params = [];

//         if (parentCategory)
//           params.push(`parentCategory=${encodeURIComponent(parentCategory)}`);
//         if (categoryNameParam)
//           params.push(`categoryName=${encodeURIComponent(categoryNameParam)}`);
//         if (subCategoryName)
//           params.push(`subCategoryName=${encodeURIComponent(subCategoryName)}`);

//         url += params.join("&");

//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();

//         let productsData = [];
//         if (result.success && Array.isArray(result.data)) {
//           productsData = result.data;
//         } else if (result.products && Array.isArray(result.products)) {
//           productsData = result.products;
//         } else if (Array.isArray(result)) {
//           productsData = result;
//         } else {
//           throw new Error("Invalid API response structure");
//         }

//         const acceptedProducts = productsData.filter(
//           (item) => item?.approval?.status === "Accepted"
//         );

//         setBaseApiProducts(acceptedProducts);
//         setApiFilteredProducts(acceptedProducts);

//         if (acceptedProducts && acceptedProducts.length > 0) {
//           extractFilterOptions(acceptedProducts);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setApiError(err.message);
//         setApiFilteredProducts([]);
//         setBaseApiProducts([]);
//         toast.error("Failed to load filtered products");
//       } finally {
//         setApiLoading(false);
//       }
//     },
//     []
//   );

//   // Trigger fetchProductsWithFilters when categoryName changes
//   useEffect(() => {
//     if (categoryName) {
//       fetchProductsWithFilters(null, categoryName, null);
//     }
//   }, [categoryName, fetchProductsWithFilters]);

//   const extractFilterOptions = (products) => {
//     const categories = new Set();
//     const categoryNames = new Set();
//     const subCategoryNames = new Set();
//     const sizes = new Set();
//     const conditions = new Set();

//     products.forEach((product) => {
//       if (product.category?.parentCategory) {
//         categories.add(product.category.parentCategory);
//       }
//       if (product.category?.categoryName) {
//         categoryNames.add(product.category.categoryName);
//       }
//       if (product.category?.subCategoryName) {
//         subCategoryNames.add(product.category.subCategoryName);
//       }
//       if (product.size?.sizeName) {
//         sizes.add(product.size.sizeName);
//       }
//       if (product.condition?.conditionName) {
//         conditions.add(product.condition.conditionName);
//       }
//     });

//     const updatedOptions = {
//       ...filterOptions,
//       category: Array.from(categories),
//       categoryName: Array.from(categoryNames),
//       subCategoryName: Array.from(subCategoryNames),
//       size: Array.from(sizes),
//       condition: Array.from(conditions),
//     };

//     setFilterOptions(updatedOptions);
//     console.log("Extracted Filter Options:", updatedOptions);
//   };

//   // Filter non-API products
//   useEffect(() => {
//     if (products.length === 0) return;

//     let filtered = [...products];

//     if (searchTerm || categoryName) {
//       filtered = filtered.filter((product) => {
//         const matchesSearch =
//           (searchTerm &&
//             (product.category?.subCategoryName
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//               product.category?.categoryName
//                 ?.toLowerCase()
//                 .includes(searchTerm.toLowerCase()) ||
//               product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               product.seller?.username
//                 ?.toLowerCase()
//                 .includes(searchTerm.toLowerCase()))) ||
//           (categoryName &&
//             product.category?.categoryName
//               ?.toLowerCase()
//               .includes(categoryName.toLowerCase()));
//         return matchesSearch;
//       });
//     }

//     if (
//       !searchTerm &&
//       !categoryName &&
//       Object.values(filters).every((filterGroup) => filterGroup.length === 0)
//     ) {
//       setFilteredProducts(filtered);
//       return;
//     }

//     filtered = filtered.filter((product) => {
//       if (
//         filters.category.length > 0 &&
//         !filters.category.includes(product.category?.parentCategory)
//       ) {
//         return false;
//       }
//       if (
//         filters.categoryName.length > 0 &&
//         !filters.categoryName.includes(product.category?.categoryName)
//       ) {
//         return false;
//       }
//       if (
//         filters.subCategoryName.length > 0 &&
//         !filters.subCategoryName.includes(product.category?.subCategoryName)
//       ) {
//         return false;
//       }
//       if (
//         filters.size.length > 0 &&
//         !filters.size.includes(product.size?.sizeName)
//       ) {
//         return false;
//       }
//       if (
//         filters.condition.length > 0 &&
//         !filters.condition.includes(product.condition?.conditionName)
//       ) {
//         return false;
//       }
//       if (filters.price.length > 0) {
//         const price = product.price;
//         let priceMatch = false;

//         for (const range of filters.price) {
//           if (range === "0 - 300" && price <= 300) {
//             priceMatch = true;
//             break;
//           } else if (range === "300 - 500" && price > 300 && price <= 500) {
//             priceMatch = true;
//             break;
//           } else if (range === "500 Above" && price > 500) {
//             priceMatch = true;
//             break;
//           }
//         }

//         if (!priceMatch) return false;
//       }

//       return true;
//     });

//     setFilteredProducts(filtered);
//   }, [filters, products, searchTerm, categoryName]);

//   // Filter API products
//   useEffect(() => {
//     if (baseApiProducts.length === 0) return;

//     const hasActiveFilters =
//       filters.price.length > 0 ||
//       filters.size.length > 0 ||
//       filters.condition.length > 0 ||
//       filters.category.length > 0 ||
//       filters.categoryName.length > 0 ||
//       filters.subCategoryName.length > 0;

//     if (searchTerm || categoryName || hasActiveFilters) {
//       const filtered = baseApiProducts.filter((product) => {
//         if (searchTerm || categoryName) {
//           const matchesSearch =
//             (searchTerm &&
//               (product.category?.subCategoryName
//                 ?.toLowerCase()
//                 .includes(searchTerm.toLowerCase()) ||
//                 product.category?.categoryName
//                   ?.toLowerCase()
//                   .includes(searchTerm.toLowerCase()) ||
//                 product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 product.seller?.username
//                   ?.toLowerCase()
//                   .includes(searchTerm.toLowerCase()))) ||
//             (categoryName &&
//               product.category?.categoryName
//                 ?.toLowerCase()
//                 .includes(categoryName.toLowerCase()));
//           if (!matchesSearch) return false;
//         }

//         if (
//           filters.category.length > 0 &&
//           !filters.category.includes(product.category?.parentCategory)
//         ) {
//           return false;
//         }
//         if (
//           filters.categoryName.length > 0 &&
//           !filters.categoryName.includes(product.category?.categoryName)
//         ) {
//           return false;
//         }
//         if (
//           filters.subCategoryName.length > 0 &&
//           !filters.subCategoryName.includes(product.category?.subCategoryName)
//         ) {
//           return false;
//         }
//         if (
//           filters.size.length > 0 &&
//           !filters.size.includes(product.size?.sizeName)
//         ) {
//           return false;
//         }
//         if (
//           filters.condition.length > 0 &&
//           !filters.condition.includes(product.condition?.conditionName)
//         ) {
//           return false;
//         }
//         if (filters.price.length > 0) {
//           const price = product.price;
//           let priceMatch = false;

//           for (const range of filters.price) {
//             if (range === "0 - 300" && price <= 300) {
//               priceMatch = true;
//               break;
//             } else if (range === "300 - 500" && price > 300 && price <= 500) {
//               priceMatch = true;
//               break;
//             } else if (range === "500 Above" && price > 500) {
//               priceMatch = true;
//               break;
//             }
//           }

//           if (!priceMatch) return false;
//         }

//         return true;
//       });

//       setApiFilteredProducts(filtered);
//     } else {
//       setApiFilteredProducts(baseApiProducts);
//     }
//   }, [filters, baseApiProducts, searchTerm, categoryName]);

//   const setSearch = useCallback((term) => {
//     setSearchTerm(term);
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       if (term) {
//         searchParams.set("search", term);
//       } else {
//         searchParams.delete("search");
//       }
//       const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//       window.history.pushState({}, "", newUrl);
//     }
//   }, []);

//   const clearSearch = useCallback(() => {
//     setSearchTerm("");
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       searchParams.delete("search");
//       const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
//       window.history.pushState({}, "", newUrl);
//     }
//   }, []);

//   const toggleFilter = (type, value) => {
//     setFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters };
//       if (updatedFilters[type].includes(value)) {
//         updatedFilters[type] = updatedFilters[type].filter(
//           (item) => item !== value
//         );
//       } else {
//         updatedFilters[type] = [...updatedFilters[type], value];
//       }
//       return updatedFilters;
//     });
//   };

//   const clearFilters = () => {
//     setFilters({
//       category: categoryInfo.parentCategory ? [categoryInfo.parentCategory] : [],
//       categoryName: categoryInfo.categoryName ? [categoryInfo.categoryName] : [],
//       subCategoryName: categoryInfo.subCategoryName
//         ? [categoryInfo.subCategoryName]
//         : [],
//       price: [],
//       size: [],
//       condition: [],
//     });
//   };

//   const clearApiFilters = useCallback(() => {
//     setApiFilteredProducts([]);
//     setBaseApiProducts([]);
//     setApiError(null);
//     setApiLoading(false);
//     setCategoryInfo({
//       parentCategory: null,
//       categoryName: null,
//       subCategoryName: null,
//     });
//     setFilters({
//       category: [],
//       categoryName: [],
//       subCategoryName: [],
//       price: [],
//       size: [],
//       condition: [],
//     });
//   }, []);

//   const currentProducts =
//     baseApiProducts.length > 0 ? apiFilteredProducts : filteredProducts;
//   const currentLoading = apiLoading;

//   return (
//     <FilterContext.Provider
//       value={{
//         filters,
//         toggleFilter,
//         clearFilters,
//         products,
//         filteredProducts: currentProducts,
//         filterOptions,
//         apiFilteredProducts,
//         apiLoading,
//         apiError,
//         fetchProductsWithFilters,
//         clearApiFilters,
//         categoryInfo,
//         loading: currentLoading,
//         searchTerm,
//         setSearch,
//         clearSearch,
//       }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilter = () => useContext(FilterContext);







import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const FilterContext = createContext();

export const FilterProvider = ({ children, initialSearch, categoryName }) => {
  const [filters, setFilters] = useState({
    category: [],
    categoryName: [],
    subCategoryName: [],
    price: [],
    size: [],
    condition: [],
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [apiFilteredProducts, setApiFilteredProducts] = useState([]);
  const [baseApiProducts, setBaseApiProducts] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");
  const [categoryInfo, setCategoryInfo] = useState({
    parentCategory: null,
    categoryName: null,
    subCategoryName: null,
  });

  const [filterOptions, setFilterOptions] = useState({
    category: [],
    categoryName: [],
    subCategoryName: [],
    price: ["0 - 300", "300 - 500", "500 Above"],
    size: [], // Will populate from products or fallback
    condition: [], // Will populate from products or fallback
  });

  useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  // Fetch categories for nested filter options
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`
        );
        const data = response.data.data || [];
        console.log("Categories API response:", data);

        const categories = new Set();
        const categoryNames = new Set();
        const subCategoryNames = new Set();

        data.forEach((parentCat) => {
          if (parentCat.parentCategory) {
            categories.add(parentCat.parentCategory);
          }
          parentCat.categories
            ?.filter((cat) => cat.status === "active")
            .forEach((cat) => {
              if (cat.categoryName) {
                categoryNames.add(cat.categoryName);
              }
              cat.subCategories
                ?.filter((subCat) => subCat.status === "active")
                .forEach((subCat) => {
                  if (subCat.subCategoryName) {
                    subCategoryNames.add(subCat.subCategoryName);
                  }
                });
            });
        });

        const updatedOptions = {
          ...filterOptions,
          category: Array.from(categories),
          categoryName: Array.from(categoryNames),
          subCategoryName: Array.from(subCategoryNames),
        };

        setFilterOptions(updatedOptions);
        console.log("Updated Filter Options (Categories):", updatedOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load category options");
      }
    };

    fetchCategories();
  }, []);

  // Load products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
        );
        const data = await response.json();
        console.log("Products API response:", data);
        const acceptedProducts = data?.filter(
          (item) => item?.approval?.status === "Accepted"
        );

        setProducts(acceptedProducts || []);
        setFilteredProducts(acceptedProducts || []);

        if (acceptedProducts && acceptedProducts.length > 0) {
          extractFilterOptions(acceptedProducts);
        } else {
          console.log("No accepted products found, setting default size and condition");
          setFilterOptions((prev) => ({
            ...prev,
            size: ["S", "M", "L", "XL"], // Fallback defaults
            condition: ["New", "Used"], // Fallback defaults
          }));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
        setFilterOptions((prev) => ({
          ...prev,
          size: ["S", "M", "L", "XL"], // Fallback defaults
          condition: ["New", "Used"], // Fallback defaults
        }));
      }
    };

    fetchProducts();
  }, []);

  // Fetch products with URL filter parameters
  const fetchProductsWithFilters = useCallback(
    async (parentCategory, categoryNameParam, subCategoryName) => {
      setApiError(null);
      setCategoryInfo({
        parentCategory,
        categoryName: categoryNameParam,
        subCategoryName,
      });

      setFilters((prevFilters) => ({
        ...prevFilters,
        category: parentCategory ? [parentCategory] : [],
        categoryName: categoryNameParam ? [categoryNameParam] : [],
        subCategoryName: subCategoryName ? [subCategoryName] : [],
      }));

      if (!parentCategory && !categoryNameParam && !subCategoryName) {
        setApiFilteredProducts([]);
        setBaseApiProducts([]);
        setApiLoading(false);
        return;
      }

      setApiLoading(true);

      try {
        let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/filter?`;
        const params = [];

        if (parentCategory)
          params.push(`parentCategory=${encodeURIComponent(parentCategory)}`);
        if (categoryNameParam)
          params.push(`categoryName=${encodeURIComponent(categoryNameParam)}`);
        if (subCategoryName)
          params.push(`subCategoryName=${encodeURIComponent(subCategoryName)}`);

        url += params.join("&");

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        let productsData = [];
        if (result.success && Array.isArray(result.data)) {
          productsData = result.data;
        } else if (result.products && Array.isArray(result.products)) {
          productsData = result.products;
        } else if (Array.isArray(result)) {
          productsData = result;
        } else {
          throw new Error("Invalid API response structure");
        }

        const acceptedProducts = productsData.filter(
          (item) => item?.approval?.status === "Accepted"
        );

        setBaseApiProducts(acceptedProducts);
        setApiFilteredProducts(acceptedProducts);

        if (acceptedProducts && acceptedProducts.length > 0) {
          extractFilterOptions(acceptedProducts);
        } else {
          console.log("No filtered accepted products, setting default size and condition");
          setFilterOptions((prev) => ({
            ...prev,
            size: ["S", "M", "L", "XL"], // Fallback defaults
            condition: ["New", "Used"], // Fallback defaults
          }));
        }
      } catch (err) {
        console.error("Error fetching filtered products:", err);
        setApiError(err.message);
        setApiFilteredProducts([]);
        setBaseApiProducts([]);
        toast.error("Failed to load filtered products");
        setFilterOptions((prev) => ({
          ...prev,
          size: ["S", "M", "L", "XL"], // Fallback defaults
          condition: ["New", "Used"], // Fallback defaults
        }));
      } finally {
        setApiLoading(false);
      }
    },
    []
  );

  // Trigger fetchProductsWithFilters when categoryName changes
  useEffect(() => {
    if (categoryName) {
      fetchProductsWithFilters(null, categoryName, null);
    }
  }, [categoryName, fetchProductsWithFilters]);

  const extractFilterOptions = (products) => {
    const categories = new Set();
    const categoryNames = new Set();
    const subCategoryNames = new Set();
    const sizes = new Set();
    const conditions = new Set();

    console.log("Extracting filter options from products:", products);

    products.forEach((product, index) => {
      console.log(`Product ${index}:`, {
        parentCategory: product.category?.parentCategory,
        categoryName: product.category?.categoryName,
        subCategoryName: product.category?.subCategoryName,
        size: product.size?.sizeName,
        condition: product.condition?.conditionName,
      });

      if (product.category?.parentCategory) {
        categories.add(product.category.parentCategory);
      }
      if (product.category?.categoryName) {
        categoryNames.add(product.category.categoryName);
      }
      if (product.category?.subCategoryName) {
        subCategoryNames.add(product.category.subCategoryName);
      }
      if (product.size?.sizeName) {
        sizes.add(product.size.sizeName);
      }
      if (product.condition?.conditionName) {
        conditions.add(product.condition.conditionName);
      }
    });

    const updatedOptions = {
      ...filterOptions,
      category: Array.from(categories),
      categoryName: Array.from(categoryNames),
      subCategoryName: Array.from(subCategoryNames),
      size: sizes.size > 0 ? Array.from(sizes) : ["S", "M", "L", "XL"], // Fallback if empty
      condition: conditions.size > 0 ? Array.from(conditions) : ["New", "Used"], // Fallback if empty
    };

    setFilterOptions(updatedOptions);
    console.log("Extracted Filter Options:", updatedOptions);
  };

  // Filter non-API products
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];

    if (searchTerm || categoryName) {
      filtered = filtered.filter((product) => {
        const matchesSearch =
          (searchTerm &&
            (product.category?.subCategoryName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
              product.category?.categoryName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.seller?.username
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()))) ||
          (categoryName &&
            product.category?.categoryName
              ?.toLowerCase()
              .includes(categoryName.toLowerCase()));
        return matchesSearch;
      });
    }

    if (
      !searchTerm &&
      !categoryName &&
      Object.values(filters).every((filterGroup) => filterGroup.length === 0)
    ) {
      setFilteredProducts(filtered);
      return;
    }

    filtered = filtered.filter((product) => {
      if (
        filters.category.length > 0 &&
        !filters.category.includes(product.category?.parentCategory)
      ) {
        return false;
      }
      if (
        filters.categoryName.length > 0 &&
        !filters.categoryName.includes(product.category?.categoryName)
      ) {
        return false;
      }
      if (
        filters.subCategoryName.length > 0 &&
        !filters.subCategoryName.includes(product.category?.subCategoryName)
      ) {
        return false;
      }
      if (
        filters.size.length > 0 &&
        !filters.size.includes(product.size?.sizeName)
      ) {
        return false;
      }
      if (
        filters.condition.length > 0 &&
        !filters.condition.includes(product.condition?.conditionName)
      ) {
        return false;
      }
      if (filters.price.length > 0) {
        const price = product.price;
        let priceMatch = false;

        for (const range of filters.price) {
          if (range === "0 - 300" && price <= 300) {
            priceMatch = true;
            break;
          } else if (range === "300 - 500" && price > 300 && price <= 500) {
            priceMatch = true;
            break;
          } else if (range === "500 Above" && price > 500) {
            priceMatch = true;
            break;
          }
        }

        if (!priceMatch) return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  }, [filters, products, searchTerm, categoryName]);

  // Filter API products
  useEffect(() => {
    if (baseApiProducts.length === 0) return;

    const hasActiveFilters =
      filters.price.length > 0 ||
      filters.size.length > 0 ||
      filters.condition.length > 0 ||
      filters.category.length > 0 ||
      filters.categoryName.length > 0 ||
      filters.subCategoryName.length > 0;

    if (searchTerm || categoryName || hasActiveFilters) {
      const filtered = baseApiProducts.filter((product) => {
        if (searchTerm || categoryName) {
          const matchesSearch =
            (searchTerm &&
              (product.category?.subCategoryName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
                product.category?.categoryName
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.seller?.username
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()))) ||
            (categoryName &&
              product.category?.categoryName
                ?.toLowerCase()
                .includes(categoryName.toLowerCase()));
          if (!matchesSearch) return false;
        }

        if (
          filters.category.length > 0 &&
          !filters.category.includes(product.category?.parentCategory)
        ) {
          return false;
        }
        if (
          filters.categoryName.length > 0 &&
          !filters.categoryName.includes(product.category?.categoryName)
        ) {
          return false;
        }
        if (
          filters.subCategoryName.length > 0 &&
          !filters.subCategoryName.includes(product.category?.subCategoryName)
        ) {
          return false;
        }
        if (
          filters.size.length > 0 &&
          !filters.size.includes(product.size?.sizeName)
        ) {
          return false;
        }
        if (
          filters.condition.length > 0 &&
          !filters.condition.includes(product.condition?.conditionName)
        ) {
          return false;
        }
        if (filters.price.length > 0) {
          const price = product.price;
          let priceMatch = false;

          for (const range of filters.price) {
            if (range === "0 - 300" && price <= 300) {
              priceMatch = true;
              break;
            } else if (range === "300 - 500" && price > 300 && price <= 500) {
              priceMatch = true;
              break;
            } else if (range === "500 Above" && price > 500) {
              priceMatch = true;
              break;
            }
          }

          if (!priceMatch) return false;
        }

        return true;
      });

      setApiFilteredProducts(filtered);
    } else {
      setApiFilteredProducts(baseApiProducts);
    }
  }, [filters, baseApiProducts, searchTerm, categoryName]);

  const setSearch = useCallback((term) => {
    setSearchTerm(term);
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (term) {
        searchParams.set("search", term);
      } else {
        searchParams.delete("search");
      }
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({}, "", newUrl);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("search");
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({}, "", newUrl);
    }
  }, []);

  const toggleFilter = (type, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (Array.isArray(value)) {
        updatedFilters[type] = [];
      } else if (updatedFilters[type].includes(value)) {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[type] = [...updatedFilters[type], value];
      }
      console.log("Updated Filters:", updatedFilters);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      category: categoryInfo.parentCategory ? [categoryInfo.parentCategory] : [],
      categoryName: categoryInfo.categoryName ? [categoryInfo.categoryName] : [],
      subCategoryName: categoryInfo.subCategoryName
        ? [categoryInfo.subCategoryName]
        : [],
      price: [],
      size: [],
      condition: [],
    });
  };

  const clearApiFilters = useCallback(() => {
    setApiFilteredProducts([]);
    setBaseApiProducts([]);
    setApiError(null);
    setApiLoading(false);
    setCategoryInfo({
      parentCategory: null,
      categoryName: null,
      subCategoryName: null,
    });
    setFilters({
      category: [],
      categoryName: [],
      subCategoryName: [],
      price: [],
      size: [],
      condition: [],
    });
  }, []);

  const currentProducts =
    baseApiProducts.length > 0 ? apiFilteredProducts : filteredProducts;
  const currentLoading = apiLoading;

  return (
    <FilterContext.Provider
      value={{
        filters,
        toggleFilter,
        clearFilters,
        products,
        filteredProducts: currentProducts,
        filterOptions,
        apiFilteredProducts,
        apiLoading,
        apiError,
        fetchProductsWithFilters,
        clearApiFilters,
        categoryInfo,
        loading: currentLoading,
        searchTerm,
        setSearch,
        clearSearch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
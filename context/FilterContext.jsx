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

// export const FilterProvider = ({ children }) => {
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
//   const [searchTerm, setSearchTerm] = useState("");

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

//   // Apply filters to regular products (when not using API filtered products)
//   useEffect(() => {
//     if (products.length === 0 || baseApiProducts.length > 0) return;

//     // If no filters are selected, show all products
//     if (
//       Object.values(filters).every((filterGroup) => filterGroup.length === 0)
//     ) {
//       setFilteredProducts(products);
//       return;
//     }

//     // Apply filters
//     const filtered = products.filter((product) => {
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
//   }, [filters, products, baseApiProducts]);

//   // Apply filters to API filtered products
//   useEffect(() => {
//     if (baseApiProducts.length === 0) return;

//     // If no filters are selected except category (which might be pre-selected), show all API products
//     const hasActiveFilters =
//       filters.price.length > 0 ||
//       filters.size.length > 0 ||
//       filters.condition.length > 0 ||
//       (filters.category.length > 0 &&
//         !filters.category.includes(categoryInfo.parentCategory));

//     if (
//       !hasActiveFilters &&
//       categoryInfo.parentCategory &&
//       filters.category.includes(categoryInfo.parentCategory)
//     ) {
//       setApiFilteredProducts(baseApiProducts);
//       return;
//     }

//     // Apply filters to base API products
//     const filtered = baseApiProducts.filter((product) => {
//       if (searchTerm) {
//         const matchesSearch =
//           product.category?.subCategoryName
//             ?.toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           product.name?.toLowerCase().includes(searchTerm.toLowerCase());
//         if (!matchesSearch) return false;
//       }
//       // Check category filter (only if different from pre-selected parent category)
//       if (filters.category.length > 0) {
//         const nonParentCategoryFilters = filters.category.filter(
//           (cat) => cat !== categoryInfo.parentCategory
//         );
//         if (
//           nonParentCategoryFilters.length > 0 &&
//           !nonParentCategoryFilters.includes(product.category?.parentCategory)
//         ) {
//           return false;
//         }
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

//     setApiFilteredProducts(filtered);
//   }, [filters, baseApiProducts, categoryInfo.parentCategory, searchTerm]);

//   // Add search methods
//   const setSearch = (term) => {
//     setSearchTerm(term);
//   };

//   const clearSearch = () => {
//     setSearchTerm("");
//   };

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










import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import toast from "react-hot-toast";

// Create context for filter state
export const FilterContext = createContext();

export const FilterProvider = ({ children, initialSearch }) => {
  // Initialize filter state with empty selections
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    size: [],
    condition: [],
  });

  // Initialize state for products and filtered products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // State for API filtered products (from URL parameters)
  const [apiFilteredProducts, setApiFilteredProducts] = useState([]);
  const [baseApiProducts, setBaseApiProducts] = useState([]); // Store original API results
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
   const [searchTerm, setSearchTerm] = useState(initialSearch || "");

  // Store category information from URL parameters
  const [categoryInfo, setCategoryInfo] = useState({
    parentCategory: null,
    categoryName: null,
    subCategoryName: null,
  });

  // Track available filter options
  const [filterOptions, setFilterOptions] = useState({
    category: [],
    price: ["0 - 300", "300 - 500", "500 Above"],
    size: [],
    condition: [],
  });

    useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  // Load products from API - KEEP THIS UNCHANGED
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
        );
        const data = await response.json();
        const acceptedProducts = data?.filter(
          (item) => item?.approval?.status === "Accepted"
        );

        setProducts(acceptedProducts || []);
        setFilteredProducts(acceptedProducts || []);

        // Extract unique filter options from products
        if (acceptedProducts && acceptedProducts.length > 0) {
          extractFilterOptions(acceptedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch products with URL filter parameters
  const fetchProductsWithFilters = useCallback(
    async (parentCategory, categoryName, subCategoryName) => {
      // Reset previous state
      setApiError(null);

      // Store category information
      setCategoryInfo({
        parentCategory,
        categoryName,
        subCategoryName,
      });

      // Clear filters when new API call is made
      setFilters({
        category: parentCategory ? [parentCategory] : [], // Pre-select parent category
        price: [],
        size: [],
        condition: [],
      });

      // If no filter parameters, clear API filtered products and return
      if (!parentCategory && !categoryName && !subCategoryName) {
        setApiFilteredProducts([]);
        setBaseApiProducts([]);
        setApiLoading(false);
        return;
      }

      // Set loading state
      setApiLoading(true);

      try {
        // Build URL with available parameters
        let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/filter?`;
        const params = [];

        if (parentCategory)
          params.push(`parentCategory=${encodeURIComponent(parentCategory)}`);
        if (categoryName)
          params.push(`categoryName=${encodeURIComponent(categoryName)}`);
        if (subCategoryName)
          params.push(`subCategoryName=${encodeURIComponent(subCategoryName)}`);

        url += params.join("&");

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Handle different response structures
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

        // Filter for accepted products
        const acceptedProducts = productsData.filter(
          (item) => item?.approval?.status === "Accepted"
        );

        setBaseApiProducts(acceptedProducts);
        setApiFilteredProducts(acceptedProducts);

        // Extract filter options from API results
        if (acceptedProducts && acceptedProducts.length > 0) {
          extractFilterOptions(acceptedProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setApiError(err.message);
        setApiFilteredProducts([]);
        setBaseApiProducts([]);
        toast.error("Failed to load filtered products");
      } finally {
        setApiLoading(false);
      }
    },
    []
  );

  // Extract unique filter options from products
  const extractFilterOptions = (products) => {
    const categories = new Set();
    const sizes = new Set();
    const conditions = new Set();

    products.forEach((product) => {
      // Extract categories
      if (product.category?.parentCategory) {
        categories.add(product.category.parentCategory);
      }

      // Extract sizes
      if (product.size?.sizeName) {
        sizes.add(product.size.sizeName);
      }

      // Extract conditions
      if (product.condition?.conditionName) {
        conditions.add(product.condition.conditionName);
      }
    });

    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      category: Array.from(categories),
      size: Array.from(sizes),
      condition: Array.from(conditions),
    }));
  };

  // Apply filters to regular products (when not using API filtered products)
  useEffect(() => {
    if (products.length === 0) return;
    
    // Start with all products
    let filtered = [...products];
    
    // Apply search term filter if present - THIS IS THE KEY FIX
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const matchesSearch =
          product.category?.subCategoryName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      });
    }
    
    // Skip further filtering if no filters are selected and there's no search term
    if (
      !searchTerm &&
      Object.values(filters).every((filterGroup) => filterGroup.length === 0)
    ) {
      setFilteredProducts(filtered);
      return;
    }

    // Apply remaining filters
    filtered = filtered.filter((product) => {
      // Check category filter
      if (
        filters.category.length > 0 &&
        !filters.category.includes(product.category?.parentCategory)
      ) {
        return false;
      }

      // Check size filter
      if (
        filters.size.length > 0 &&
        !filters.size.includes(product.size?.sizeName)
      ) {
        return false;
      }

      // Check condition filter
      if (
        filters.condition.length > 0 &&
        !filters.condition.includes(product.condition?.conditionName)
      ) {
        return false;
      }

      // Check price filter
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
  }, [filters, products, searchTerm]);

  // Apply filters to API filtered products
  useEffect(() => {
    if (baseApiProducts.length === 0) return;

    // If no filters are selected except category (which might be pre-selected), show all API products
    const hasActiveFilters =
      filters.price.length > 0 ||
      filters.size.length > 0 ||
      filters.condition.length > 0 ||
      (filters.category.length > 0 &&
        !filters.category.includes(categoryInfo.parentCategory));

    // Always apply search term filter regardless of other filters
    if (searchTerm || hasActiveFilters) {
      // Apply filters to base API products
      const filtered = baseApiProducts.filter((product) => {
        // Always apply search term filter
        if (searchTerm) {
          const matchesSearch =
            product.category?.subCategoryName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            product.name?.toLowerCase().includes(searchTerm.toLowerCase());
          if (!matchesSearch) return false;
        }

        // Check category filter (only if different from pre-selected parent category)
        if (filters.category.length > 0) {
          const nonParentCategoryFilters = filters.category.filter(
            (cat) => cat !== categoryInfo.parentCategory
          );
          if (
            nonParentCategoryFilters.length > 0 &&
            !nonParentCategoryFilters.includes(product.category?.parentCategory)
          ) {
            return false;
          }
        }

        // Check size filter
        if (
          filters.size.length > 0 &&
          !filters.size.includes(product.size?.sizeName)
        ) {
          return false;
        }

        // Check condition filter
        if (
          filters.condition.length > 0 &&
          !filters.condition.includes(product.condition?.conditionName)
        ) {
          return false;
        }

        // Check price filter
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
  }, [filters, baseApiProducts, categoryInfo.parentCategory, searchTerm]);

  // Add search methods
const setSearch = useCallback((term) => {
    setSearchTerm(term);
    
    // Update URL with search parameter
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (term) {
        searchParams.set('search', term);
      } else {
        searchParams.delete('search');
      }
      
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    
    // Remove search parameter from URL
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete('search');
      
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  }, []);

  // Toggle filter selection
  const toggleFilter = (type, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (updatedFilters[type].includes(value)) {
        // Remove filter if already selected
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      } else {
        // Add filter if not selected
        updatedFilters[type] = [...updatedFilters[type], value];
      }

      return updatedFilters;
    });
  };

  const clearFilters = () => {
    if (baseApiProducts.length > 0) {
      // If we have API products, keep parent category selected
      setFilters({
        category: categoryInfo.parentCategory
          ? [categoryInfo.parentCategory]
          : [],
        price: [],
        size: [],
        condition: [],
      });
    } else {
      setFilters({
        category: [],
        price: [],
        size: [],
        condition: [],
      });
    }
    
    // Don't clear search when clearing other filters
    // This allows users to maintain their search while adjusting other filters
  };

  // Clear API filters
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
      price: [],
      size: [],
      condition: [],
    });
    // Keep search term when clearing API filters
  }, []);

  // Determine which products to show
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
        filteredProducts: currentProducts, // Use either API filtered or regular filtered products
        filterOptions,
        // API filtered products functionality
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

// Custom hook for easy access to filter context
export const useFilter = () => useContext(FilterContext);
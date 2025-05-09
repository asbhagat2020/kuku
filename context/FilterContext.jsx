import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context for filter state
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  // Initialize filter state with empty selections
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    size: [],
    condition: []
  });

  // Initialize state for products and filtered products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Track available filter options
  const [filterOptions, setFilterOptions] = useState({
    category: [],
    price: ['0 - 300', '300 - 500', '500 Above'],
    size: [],
    condition: []
  });

  // Load products from API
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

  // Extract unique filter options from products
  const extractFilterOptions = (products) => {
    const categories = new Set();
    const sizes = new Set();
    const conditions = new Set();

    products.forEach(product => {
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

    setFilterOptions({
      ...filterOptions,
      category: Array.from(categories),
      size: Array.from(sizes),
      condition: Array.from(conditions)
    });
  };

  // Apply filters to products
  useEffect(() => {
    if (products.length === 0) return;

    // If no filters are selected, show all products
    if (Object.values(filters).every(filterGroup => filterGroup.length === 0)) {
      setFilteredProducts(products);
      return;
    }

    // Apply filters
    const filtered = products.filter(product => {
      // Check category filter
      if (filters.category.length > 0 && 
          !filters.category.includes(product.category?.parentCategory)) {
        return false;
      }

      // Check size filter
      if (filters.size.length > 0 && 
          !filters.size.includes(product.size?.sizeName)) {
        return false;
      }

      // Check condition filter
      if (filters.condition.length > 0 && 
          !filters.condition.includes(product.condition?.conditionName)) {
        return false;
      }

      // Check price filter
      if (filters.price.length > 0) {
        const price = product.price;
        let priceMatch = false;

        for (const range of filters.price) {
          if (range === '0 - 300' && price <= 300) {
            priceMatch = true;
            break;
          } else if (range === '300 - 500' && price > 300 && price <= 500) {
            priceMatch = true;
            break;
          } else if (range === '500 Above' && price > 500) {
            priceMatch = true;
            break;
          }
        }

        if (!priceMatch) return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  }, [filters, products]);

  // Toggle filter selection
  const toggleFilter = (type, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      
      if (updatedFilters[type].includes(value)) {
        // Remove filter if already selected
        updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
      } else {
        // Add filter if not selected
        updatedFilters[type] = [...updatedFilters[type], value];
      }
      
      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: [],
      price: [],
      size: [],
      condition: []
    });
  };

  return (
    <FilterContext.Provider value={{
      filters,
      toggleFilter,
      clearFilters,
      products,
      filteredProducts,
      filterOptions
    }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook for easy access to filter context
export const useFilter = () => useContext(FilterContext);
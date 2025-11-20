// "use client";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import axios from "axios";

// import { SellingProducts } from "./SellingProducts";
// import { SoldCards } from "./SoldCards";
// import { ReviewCards } from "./ReviewCards";
// import { StatsCards } from "./StatsCards";
// import { AddProductComponent } from "./AddProductComponent";

// export const DetailsSection = ({ data, initialTab = null }) => {
//   const [products, setProducts] = useState([]);
//   const [userReviews, setUserReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const details = useSelector((state) => state.auth.user);
//   const currentUserId = details?._id;
//   const isOwnProfile = currentUserId === data?._id;

//   const getProductsByUser = async () => {
//     const token = JSON.parse(Cookies.get("auth"));
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductsByUser/${data?._id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (res.status === 200) {
//         setProducts(res.data.products || []);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserReviews = async () => {
//     const token = JSON.parse(Cookies.get("auth"));
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/buyer-products`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (res.status === 200) {
//         console.log("Reviews from API:", res.data);
//         setUserReviews(res.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//       setUserReviews([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (data?._id) {
//       getProductsByUser();
//       fetchUserReviews();
//     }
//   }, [data]);

//   useEffect(() => {
//     // console.log("Products state updated:", products);
//     // console.log("User Reviews state updated:", userReviews);
//   }, [products, userReviews]);

//   // Calculate review count properly
//   const getReviewCount = () => {
//     if (!userReviews || userReviews.length === 0) return 0;
//     return userReviews.reduce((total, product) => {
//       return total + (product.reviews ? product.reviews.length : 0);
//     }, 0);
//   };

//   // Filter sold products
//   const soldData = products.filter(
//     (product) => product.approval?.status === "Sold"
//   );
//   const reviewData = data || {};
//   const statsData = [
//     { id: 13, title: "Total Sales", stat: "1,000" },
//     { id: 14, title: "Total Revenue", stat: "$120,000" },
//     { id: 15, title: "Average Order Value", stat: "$120" },
//   ];

//   const orderData = [];

//   // Calculate counts dynamically
//   const reviewCount = getReviewCount();

//   const baseTabs = [
//     {
//       label: "Selling",
//       component: SellingProducts,
//       data: products,
//       count: products?.length || 0,
//     },
//     {
//       label: "Sold",
//       component: SoldCards,
//       data: soldData,
//       count: soldData?.length || 0,
//     },
//     {
//       label: "Reviews",
//       component: ReviewCards,
//       data: reviewData,
//       count: reviewCount,
//     },
//     // {
//     //   label: "Stats",
//     //   component: StatsCards,
//     //   data: data, // Pass user data instead of statsData
//     //   statsData: statsData, // Pass statsData separately
//     //   count: statsData?.length || 0,
//     // },
//      {
//       label: "Stats",
//       component: StatsCards,
//       data: null, // No main data needed
//       statsData: null, // Pass statsData separately
//       count: "",
//     },
//   ];

//   const tabs = isOwnProfile
//     ? [
//         ...baseTabs,
//         { label: "Add Products", component: AddProductComponent, data: null, count: "" },
//       ]
//     : baseTabs;

//     const validTabLabels = tabs.map(t => t.label.toLowerCase());
//   const defaultTab = initialTab && validTabLabels.includes(initialTab.toLowerCase())
//     ? tabs.find(t => t.label.toLowerCase() === initialTab.toLowerCase())
//     : tabs[0];

//   // const [selectedTab, setSelectedTab] = useState(tabs[0]);
//   const [selectedTab, setSelectedTab] = useState(defaultTab);

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);

//     const tabSlug = tab.label.toLowerCase().replace(" ", "-");
//     const newPath = `/user_profile/${data._id}/${tabSlug}`;
//     window.history.replaceState(null, "", newPath);
//   };

//   useEffect(() => {
//     if (selectedTab.label === "Selling") {
//       setSelectedTab(tabs[0]);
//     }
//   }, [products]);

//   useEffect(() => {
//     if (selectedTab.label === "Add Products" && !isOwnProfile) {
//       setSelectedTab(tabs[0]);
//     }
//   }, [isOwnProfile]);

//   // Update selected tab when data changes to reflect new counts
//   useEffect(() => {
//     setSelectedTab((prevTab) => {
//       const updatedTab = tabs.find((tab) => tab.label === prevTab.label);
//       return updatedTab || tabs[0];
//     });
//   }, [reviewCount, products.length, soldData.length]);

//   return (
//     <div className="mt-24 flex flex-col items-center">
//       <nav className="w-full max-w-[1300px]">
//         <ul className="flex relative">
//           {tabs.map((item) => (
//             <li
//               key={item.label}
//               className={`w-full p-3 text-center cursor-pointer relative text-[#383838] lg:text-2xl font-normal font-karla leading-[28.80px] gap-12 ${
//                 selectedTab.label === item.label
//                   ? "border-b-[5px] border-[#fde504]"
//                   : ""
//               }`}
//               // onClick={() => {
//               //   console.log("Switching to tab:", item.label, "with data:", item.data);
//               //   setSelectedTab(item);
//               // }}
//               onClick={() => handleTabChange(item)}
//             >
//               {item.label} {item.count !== "" && item.count !== undefined ? `(${item.count})` : ""}
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <main className="w-full bg-white mt-[56px] overflow-hidden">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="text-lg text-gray-600">Loading...</div>
//           </div>
//         ) : selectedTab.component ? (
//           <selectedTab.component
//             data={selectedTab.data}
//             statsData={selectedTab.statsData} // Pass statsData if available
//             userId={data?._id} // Explicitly pass userId
//           />
//         ) : (
//           <div className="flex justify-center items-center h-64">
//             <p className="text-red-500 text-lg">Component not found for {selectedTab.label}</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };





// important component


// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import axios from "axios";

// import { SellingProducts } from "./SellingProducts";
// import { SoldCards } from "./SoldCards";
// import { ReviewCards } from "./ReviewCards";
// import { StatsCards } from "./StatsCards";
// import { AddProductComponent } from "./AddProductComponent";

// export const DetailsSection = ({ data, initialTab = null }) => {
//   const [products, setProducts] = useState([]);
//   const [userReviews, setUserReviews] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const details = useSelector((state) => state.auth.user);
//   const currentUserId = details?._id;
//   const isOwnProfile = currentUserId === data?._id;

//   // Mapping functions
//   const normalizeTab = (slug) => {
//     if (!slug) return null;
//     const map = {
//       selling: "Selling",
//       sold: "Sold",
//       reviews: "Reviews",
//       stats: "Stats",
//       "add-products": "Add Products",
//     };
//     return map[slug.toLowerCase()] || null;
//   };

//   const getSlug = (label) => {
//     const map = {
//       Selling: "selling",
//       Sold: "sold",
//       Reviews: "reviews",
//       Stats: "stats",
//       "Add Products": "add-products",
//     };
//     return map[label] || label.toLowerCase().replace(/\s+/g, "-");
//   };

//   // Data fetching (same as before)
//   const getProductsByUser = async () => {
//     const token = JSON.parse(Cookies.get("auth"));
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductsByUser/${data?._id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.status === 200) setProducts(res.data.products || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserReviews = async () => {
//     const token = JSON.parse(Cookies.get("auth"));
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/buyer-products`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.status === 200) setUserReviews(res.data || []);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//       setUserReviews([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (data?._id) {
//       getProductsByUser();
//       fetchUserReviews();
//     }
//   }, [data]);

//   const getReviewCount = () => {
//     if (!userReviews || userReviews.length === 0) return 0;
//     return userReviews.reduce((total, product) => {
//       return total + (product.reviews ? product.reviews.length : 0);
//     }, 0);
//   };

//   const reviewCount = getReviewCount();
//   const soldData = products.filter(p => p.approval?.status === "Sold");
//   const reviewData = data || {};

//   // Memoized tabs
//   const tabs = useMemo(() => {
//     const base = [
//       { label: "Selling", component: SellingProducts, data: products, count: products?.length || 0 },
//       { label: "Sold", component: SoldCards, data: soldData, count: soldData?.length || 0 },
//       { label: "Reviews", component: ReviewCards, data: reviewData, count: reviewCount },
//       { label: "Stats", component: StatsCards, data: null, statsData: null, count: "" },
//     ];
//     return isOwnProfile
//       ? [...base, { label: "Add Products", component: AddProductComponent, data: null, count: "" }]
//       : base;
//   }, [products, soldData, reviewCount, isOwnProfile, reviewData]);

//   // Initial tab from URL
//   const initialLabel = initialTab ? normalizeTab(initialTab) : null;
//   const defaultTab = initialLabel ? tabs.find(t => t.label === initialLabel) || tabs[0] : tabs[0];
//   const [selectedTab, setSelectedTab] = useState(defaultTab);

//   // FINAL METHOD — NO PAGE REFRESH, URL CHANGES SMOOTHLY
//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//     const slug = getSlug(tab.label);
//     const newUrl = `/user_profile/${data._id}/${slug}`;

//     // This changes URL without any refresh or re-render
//     window.history.pushState({}, "", newUrl);
//   };

//   // Sync URL if someone navigates back/forward
//   useEffect(() => {
//     const handlePopState = () => {
//       const path = window.location.pathname;
//       const match = path.match(/\/user_profile\/[^/]+\/(.+)$/);
//       if (match) {
//         const slug = match[1];
//         const label = normalizeTab(slug);
//         if (label) {
//           const tab = tabs.find(t => t.label === label);
//           if (tab) setSelectedTab(tab);
//         }
//       }
//     };

//     window.addEventListener("popstate", handlePopState);
//     return () => window.removeEventListener("popstate", handlePopState);
//   }, [tabs]);

//   // Keep URL in sync if selectedTab changes from elsewhere
//   useEffect(() => {
//     if (selectedTab && data?._id) {
//       const slug = getSlug(selectedTab.label);
//       const expected = `/user_profile/${data._id}/${slug}`;
//       if (window.location.pathname !== expected) {
//         window.history.replaceState({}, "", expected);
//       }
//     }
//   }, [selectedTab, data]);

//   return (
//     <div className="mt-24 flex flex-col items-center">
//       <nav className="w-full max-w-[1300px]">
//         <ul className="flex relative">
//           {tabs.map((item) => (
//             <li
//               key={item.label}
//               className={`w-full p-3 text-center cursor-pointer relative text-[#383838] lg:text-2xl font-normal font-karla leading-[28.80px] gap-12 ${
//                 selectedTab.label === item.label
//                   ? "border-b-[5px] border-[#fde504]"
//                   : ""
//               }`}
//               onClick={() => handleTabChange(item)}
//             >
//               {item.label}{" "}
//               {item.count !== "" && item.count !== undefined ? `(${item.count})` : ""}
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <main className="w-full bg-white mt-[56px] overflow-hidden">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="text-lg text-gray-600">Loading...</div>
//           </div>
//         ) : selectedTab.component ? (
//           <selectedTab.component
//             data={selectedTab.data}
//             statsData={selectedTab.statsData}
//             userId={data?._id}
//           />
//         ) : (
//           <div className="flex justify-center items-center h-64">
//             <p className="text-red-500 text-lg">
//               Component not found for {selectedTab.label}
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };




"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";

import { SellingProducts } from "./SellingProducts";
import { SoldCards } from "./SoldCards";
import { ReviewCards } from "./ReviewCards";
import { StatsCards } from "./StatsCards";
import { AddProductComponent } from "./AddProductComponent";

export const DetailsSection = ({ data, initialMainTab = null, initialSubTab = null }) => {
  const [products, setProducts] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const details = useSelector((state) => state.auth.user);
  const currentUserId = details?._id;
  const isOwnProfile = currentUserId === data?._id;

  // Mapping: slug → label
  const normalizeMainTab = (slug) => {
    if (!slug) return null;
    const map = { selling: "Selling", sold: "Sold", reviews: "Reviews", stats: "Stats", "add-products": "Add Products" };
    return map[slug.toLowerCase()] || null;
  };

  const normalizeSubTab = (slug) => {
    if (!slug) return "All";
    const map = { all: "All", accepted: "Accepted", pending: "Pending", rejected: "Rejected", sold: "Sold", edit: "Edit" };
    return map[slug.toLowerCase()] || "All";
  };

  const getMainSlug = (label) => {
    const map = { Selling: "selling", Sold: "sold", Reviews: "reviews", Stats: "stats", "Add Products": "add-products" };
    return map[label] || label.toLowerCase().replace(/\s+/g, "-");
  };

  const getSubSlug = (filter) => {
    const map = { All: "all", Accepted: "accepted", Pending: "pending", Rejected: "rejected", Sold: "sold", Edit: "edit" };
    return map[filter] || "all";
  };

  // Fetch data
  const getProductsByUser = async () => {
    const token = JSON.parse(Cookies.get("auth"));
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductsByUser/${data?._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data.products || []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReviews = async () => {
    const token = JSON.parse(Cookies.get("auth"));
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/buyer-products`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserReviews(res.data || []);
    } catch (error) {
      console.error(error);
      setUserReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?._id) {
      getProductsByUser();
      fetchUserReviews();
    }
  }, [data]);

  const getReviewCount = () => {
    if (!userReviews || userReviews.length === 0) return 0;
    return userReviews.reduce((total, product) => total + (product.reviews?.length || 0), 0);
  };

  const reviewCount = getReviewCount();
  const soldData = products.filter(p => p.approval?.status === "Sold");
  const reviewData = data || {};

  const tabs = useMemo(() => {
    const base = [
      { label: "Selling", component: SellingProducts, data: products, count: products.length || 0 },
      { label: "Sold", component: SoldCards, data: soldData, count: soldData.length || 0 },
      { label: "Reviews", component: ReviewCards, data: reviewData, count: reviewCount },
      { label: "Stats", component: StatsCards, data: null, statsData: null, count: "" },
    ];
    return isOwnProfile
      ? [...base, { label: "Add Products", component: AddProductComponent, data: null, count: "" }]
      : base;
  }, [products, soldData, reviewCount, isOwnProfile, reviewData]);

  // Initial tab + sub-filter
  const initialMainLabel = initialMainTab ? normalizeMainTab(initialMainTab) : null;
  const initialSubFilter = initialSubTab ? normalizeSubTab(initialSubTab) : "All";

  const defaultMainTab = initialMainLabel
    ? tabs.find(t => t.label === initialMainLabel) || tabs[0]
    : tabs[0];

  const [selectedTab, setSelectedTab] = useState(defaultMainTab);
  const [activeSubFilter, setActiveSubFilter] = useState(initialSubFilter);

  // Handle main tab change
  const handleMainTabChange = (tab) => {
    setSelectedTab(tab);
    const mainSlug = getMainSlug(tab.label);
    const subSlug = tab.label === "Selling" ? getSubSlug(activeSubFilter) : "";
    const path = subSlug ? `/user_profile/${data._id}/${mainSlug}/${subSlug}` : `/user_profile/${data._id}/${mainSlug}`;
    window.history.pushState({}, "", path);
  };

  // Handle sub-filter change (only for Selling)
  const handleSubFilterChange = (filter) => {
    setActiveSubFilter(filter);
    const subSlug = getSubSlug(filter);
    window.history.pushState({}, "", `/user_profile/${data._id}/selling/${subSlug}`);
  };

  // Back/Forward sync
  useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname;
      const parts = path.split("/").filter(Boolean);
      if (parts.length >= 3) {
        const main = normalizeMainTab(parts[3]);
        const sub = parts[4] ? normalizeSubTab(parts[4]) : "All";
        const tab = tabs.find(t => t.label === main);
        if (tab) {
          setSelectedTab(tab);
          if (main === "Selling") setActiveSubFilter(sub);
        }
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [tabs]);

  return (
    <div className="mt-24 flex flex-col items-center">
      <nav className="w-full max-w-[1300px]">
        <ul className="flex relative">
          {tabs.map((item) => (
            <li
              key={item.label}
              className={`w-full p-3 text-center cursor-pointer relative text-[#383838] lg:text-2xl font-normal font-karla leading-[28.80px] gap-12 ${
                selectedTab.label === item.label ? "border-b-[5px] border-[#fde504]" : ""
              }`}
              onClick={() => handleMainTabChange(item)}
            >
              {item.label} {item.count !== "" && item.count !== undefined ? `(${item.count})` : ""}
            </li>
          ))}
        </ul>
      </nav>

      <main className="w-full bg-white mt-[56px] overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64"><div className="text-lg text-gray-600">Loading...</div></div>
        ) : selectedTab.label === "Selling" ? (
          <SellingProducts
            data={selectedTab.data}
            activeFilter={activeSubFilter}
            setActiveFilter={handleSubFilterChange}
          />
        ) : selectedTab.component ? (
          <selectedTab.component data={selectedTab.data} statsData={selectedTab.statsData} userId={data?._id} />
        ) : (
          <div className="text-center py-20 text-red-500">Component not found</div>
        )}
      </main>
    </div>
  );
};
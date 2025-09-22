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

// export const DetailsSection = ({ data }) => {
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
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductsByUser/${data?._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.status === 200) {
//         console.log("Products from API:", res.data.products);
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
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/buyer-products`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
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
//       fetchUserReviews(); // Fetch reviews for review count
//     }
//   }, [data]);

//   useEffect(() => {
//     console.log("Products state updated:", products);
//     console.log("User Reviews state updated:", userReviews);
//   }, [products, userReviews]);

//   // Calculate review count properly
//   const getReviewCount = () => {
//     if (!userReviews || userReviews.length === 0) return 0;
//     return userReviews.reduce((total, product) => {
//       return total + (product.reviews ? product.reviews.length : 0);
//     }, 0);
//   };

//   const soldData = data?.products || [];
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
//       count: products?.length || 0 
//     },
//     { 
//       label: "Sold", 
//       component: SoldCards, 
//       data: soldData, 
//       count: soldData?.length || 0 
//     },
//     { 
//       label: "Reviews", 
//       component: ReviewCards, 
//       data: reviewData, 
//       count: reviewCount // Use calculated review count
//     },
//     { 
//       label: "Stats", 
//       component: StatsCards, 
//       data: statsData, 
//       count: statsData?.length || 0 
//     },
//   ];

//   const tabs = isOwnProfile 
//     ? [...baseTabs, { label: "Add Products", component: AddProductComponent, data: null, count: "" }]
//     : baseTabs;

//   const [selectedTab, setSelectedTab] = useState(tabs[0]);

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
//     setSelectedTab(prevTab => {
//       const updatedTab = tabs.find(tab => tab.label === prevTab.label);
//       return updatedTab || tabs[0];
//     });
//   }, [reviewCount, products.length, soldData.length]);

//   console.log("Selected tab:", selectedTab.label);
//   console.log("Selected tab data:", selectedTab.data);
//   console.log("Review count:", reviewCount);
//   console.log("Tabs:", tabs);

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
//               onClick={() => {
//                 console.log("Switching to tab:", item.label, "with data:", item.data);
//                 setSelectedTab(item);
//               }}
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
//           <selectedTab.component data={selectedTab.data} />
//         ) : (
//           <div className="flex justify-center items-center h-64">
//             <p className="text-red-500 text-lg">Component not found for {selectedTab.label}</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };









"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";

import { SellingProducts } from "./SellingProducts";
import { SoldCards } from "./SoldCards";
import { ReviewCards } from "./ReviewCards";
import { StatsCards } from "./StatsCards";
import { AddProductComponent } from "./AddProductComponent";

export const DetailsSection = ({ data }) => {
  const [products, setProducts] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const details = useSelector((state) => state.auth.user);
  const currentUserId = details?._id;
  const isOwnProfile = currentUserId === data?._id;

  const getProductsByUser = async () => {
    const token = JSON.parse(Cookies.get("auth"));
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductsByUser/${data?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        console.log("Products from API:", res.data.products);
        setProducts(res.data.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        console.log("Reviews from API:", res.data);
        setUserReviews(res.data || []);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
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

  useEffect(() => {
    console.log("Products state updated:", products);
    console.log("User Reviews state updated:", userReviews);
  }, [products, userReviews]);

  // Calculate review count properly
  const getReviewCount = () => {
    if (!userReviews || userReviews.length === 0) return 0;
    return userReviews.reduce((total, product) => {
      return total + (product.reviews ? product.reviews.length : 0);
    }, 0);
  };

  // Filter sold products
  const soldData = products.filter(
    (product) => product.approval?.status === "Sold"
  );
  const reviewData = data || {};
  const statsData = [
    { id: 13, title: "Total Sales", stat: "1,000" },
    { id: 14, title: "Total Revenue", stat: "$120,000" },
    { id: 15, title: "Average Order Value", stat: "$120" },
  ];

  const orderData = [];

  // Calculate counts dynamically
  const reviewCount = getReviewCount();

  const baseTabs = [
    {
      label: "Selling",
      component: SellingProducts,
      data: products,
      count: products?.length || 0,
    },
    {
      label: "Sold",
      component: SoldCards,
      data: soldData,
      count: soldData?.length || 0, // Correct count for sold products
    },
    {
      label: "Reviews",
      component: ReviewCards,
      data: reviewData,
      count: reviewCount,
    },
    {
      label: "Stats",
      component: StatsCards,
      data: statsData,
      count: statsData?.length || 0,
    },
  ];

  const tabs = isOwnProfile
    ? [
        ...baseTabs,
        { label: "Add Products", component: AddProductComponent, data: null, count: "" },
      ]
    : baseTabs;

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    if (selectedTab.label === "Selling") {
      setSelectedTab(tabs[0]);
    }
  }, [products]);

  useEffect(() => {
    if (selectedTab.label === "Add Products" && !isOwnProfile) {
      setSelectedTab(tabs[0]);
    }
  }, [isOwnProfile]);

  // Update selected tab when data changes to reflect new counts
  useEffect(() => {
    setSelectedTab((prevTab) => {
      const updatedTab = tabs.find((tab) => tab.label === prevTab.label);
      return updatedTab || tabs[0];
    });
  }, [reviewCount, products.length, soldData.length]);

  console.log("Selected tab:", selectedTab.label);
  console.log("Selected tab data:", selectedTab.data);
  console.log("Review count:", reviewCount);
  console.log("Tabs:", tabs);

  return (
    <div className="mt-24 flex flex-col items-center">
      <nav className="w-full max-w-[1300px]">
        <ul className="flex relative">
          {tabs.map((item) => (
            <li
              key={item.label}
              className={`w-full p-3 text-center cursor-pointer relative text-[#383838] lg:text-2xl font-normal font-karla leading-[28.80px] gap-12 ${
                selectedTab.label === item.label
                  ? "border-b-[5px] border-[#fde504]"
                  : ""
              }`}
              onClick={() => {
                console.log("Switching to tab:", item.label, "with data:", item.data);
                setSelectedTab(item);
              }}
            >
              {item.label} {item.count !== "" && item.count !== undefined ? `(${item.count})` : ""}
            </li>
          ))}
        </ul>
      </nav>
      <main className="w-full bg-white mt-[56px] overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        ) : selectedTab.component ? (
          <selectedTab.component data={selectedTab.data} />
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-lg">Component not found for {selectedTab.label}</p>
          </div>
        )}
      </main>
    </div>
  );
};
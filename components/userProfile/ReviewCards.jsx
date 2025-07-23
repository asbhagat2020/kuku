// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { IoPencil } from "react-icons/io5";
// import ReviewAddModal from "./ReviewAddModal";
// import ReviewItem from "./ReviewItem";
// import axios from "axios";
// import Cookies from "js-cookie";

// export const ReviewCards = ({ data }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [sortOrder, setSortOrder] = useState(null);
//   const [userReviews, setUserReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedProductForReview, setSelectedProductForReview] = useState(null);



//   useEffect(() => {
//   try {
//     const userCookie = Cookies.get("user");
//     console.log("Raw user cookie:", userCookie);
    
//     if (userCookie) {
//       const user = JSON.parse(userCookie);
//       console.log("Parsed user:", user);
      
//       if (user && user._id) {
//         console.log("Current User ID from user cookie:", user._id);
//         setCurrentUserId(user._id);
//       } else {
//         console.log("User object is invalid - missing _id");
//       }
//     } else {
//       console.log("No user cookie found");
//     }
//   } catch (error) {
//     console.error("Error parsing user cookie:", error);
//     console.log("Cookie value that failed to parse:", Cookies.get("user"));
//   }
// }, []);

//   const fetchUserReviews = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
//       if (!token) throw new Error("No authentication token found");
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/buyer-products`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.status === 200) {
//         console.log("API Response (userReviews):", res.data); // Debug log
//         setUserReviews(res.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching user reviews:", error);
//       setError("Failed to load reviews. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserReviews();
//   }, []);

//   const handleSort = (order) => {
//     setSortOrder(order);
//     setIsDropdownOpen(false);
//   };

//   const getDisplayItems = () => {
//     const items = [];
//     console.log("Current User ID in getDisplayItems:", currentUserId); // Debug log
//     console.log("Processing userReviews:", userReviews); // Debug log

//     userReviews.forEach(product => {
//       console.log("Processing product:", product); // Debug log
//       // Add reviewed products
//       if (product.hasReviewed && product.reviews?.length > 0) {
//         product.reviews.forEach(review => {
//           console.log("Adding review for product:", product.productName); // Debug log
//           items.push({
//             ...review,
//             productId: product.productId,
//             productImage: product.productImage,
//             productName: product.productName,
//             orderId: product.orderId,
//             hasReviewed: true,
//             type: 'review'
//           });
//         });
//       }
//       // Add non-reviewed products if buyerId matches
//       if (!product.hasReviewed && product.buyerId === currentUserId) {
//         console.log("Adding placeholder for product:", product.productName); // Debug log
//         items.push({
//           productId: product.productId,
//           productImage: product.productImage,
//           productName: product.productName,
//           hasReviewed: false,
//           orderId: product.orderId,
//           buyerId: product.buyerId,
//           rating: 0,
//           comment: "You haven't reviewed this product yet",
//           description: "Click 'Add Review' to share your experience with this product",
//           buyerName: "You",
//           buyerUsername: "You",
//           createdAt: new Date().toISOString(),
//           type: 'placeholder'
//         });
//       }
//     });
//     console.log("Final Display Items:", items); // Debug log
//     return items;
//   };

//   const allDisplayItems = getDisplayItems();

//   const sortedItems = sortOrder
//     ? [...allDisplayItems].sort((a, b) => {
//         if (a.type === 'placeholder' && b.type === 'review') return 1;
//         if (a.type === 'review' && b.type === 'placeholder') return -1;
//         if (a.type === 'placeholder' && b.type === 'placeholder') return 0;
//         return sortOrder === "lowToHigh" ? a.rating - b.rating : b.rating - a.rating;
//       })
//     : allDisplayItems;

//   const actualReviews = sortedItems.filter(item => item.type === 'review');
//   const averageRating = actualReviews.length > 0 
//     ? (actualReviews.reduce((total, item) => total + (item.rating || 0), 0) / actualReviews.length).toFixed(1)
//     : 0;

//   return (
//     <div className="px-[20px] lg:px-[71px]">
//       <div className="flex">
//         <div className="flex w-full justify-between">
//           <div className="flex flex-col gap-4">
//             <p className="text-center text-neutral-900 lg:text-2xl font-bold font-karla leading-[28.80px]">
//               Customer Reviews
//             </p>
//             <div className="flex items-center justify-center gap-2">
//               <Image width={26} height={26} src="/rating.svg" alt="Rating Icon" />
//               <p className="text-center text-[#9c9c9c] text-[26.92px] font-normal font-karla leading-loose">
//                 {averageRating} Rating
//               </p>
//               <div className="w-2 h-2 rounded-full bg-[#9c9c9c]"></div>
//               <div className="text-center text-[#9c9c9c] lg:text-[26.92px] font-normal font-karla leading-loose">
//                 {actualReviews.length > 0 ? `${actualReviews.length} Reviews` : "No Reviews"}
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-center gap-5 relative font-karla font-bold w-[300px]">
//             <div
//               className="flex gap-2 cursor-pointer"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <Image unoptimized width={30} height={16} src="/sort.svg" alt="" />
//               <p>Sort by</p>
//             </div>
//             {isDropdownOpen && (
//               <div className="absolute top-[100%] right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-[200px] z-50">
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   onClick={() => handleSort("lowToHigh")}
//                 >
//                   Ratings: Low to High
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   onClick={() => handleSort("highToLow")}
//                 >
//                   Ratings: High to Low
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="py-[56px] flex flex-col gap-[56px] pl-5">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <p className="text-lg text-gray-600">Loading reviews...</p>
//           </div>
//         ) : error ? (
//           <div className="flex justify-center items-center h-64">
//             <p className="text-red-500 text-lg">{error}</p>
//           </div>
//         ) : sortedItems.length > 0 ? (
//           sortedItems.map((item, index) => (
//             <div key={`${item.productId}-${index}`} className="relative">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <ReviewItem 
//                     data={item} 
//                     canEdit={currentUserId === item.buyerId && item.type === 'review'} 
//                   />
//                 </div>
//                 {item.type === 'placeholder' && item.buyerId === currentUserId && (
//                   <div className="ml-4 flex items-center">
//                     <div
//                       className="flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                       onClick={() => {
//                         console.log("Add Review clicked for:", item); // Debug log
//                         setSelectedProductForReview(item);
//                         setIsOpen(true);
//                       }}
//                     >
//                       <IoPencil className="text-lg" />
//                       <span className="text-sm font-semibold">
//                         Add Review
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex justify-center items-center h-64">
//             <p className="text-gray-600 text-lg">No products available for review. Please check if you are logged in or have purchased products.</p>
//           </div>
//         )}
        
//         <ReviewAddModal
//           isOpen={isOpen}
//           onClose={() => {
//             setIsOpen(false);
//             setSelectedProductForReview(null);
//           }}
//           title="Add Review"
//           productId={selectedProductForReview?.productId}
//           orderId={selectedProductForReview?.orderId}
//           onReviewAdded={fetchUserReviews}
//         />
//       </div>
//     </div>
//   );
// };







"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoPencil } from "react-icons/io5";
import ReviewAddModal from "./ReviewAddModal";
import ReviewItem from "./ReviewItem";
import axios from "axios";
import Cookies from "js-cookie";

export const ReviewCards = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedProductForReview, setSelectedProductForReview] = useState(null);

  useEffect(() => {
    try {
      const userCookie = Cookies.get("user");
      
      if (userCookie) {
        const user = JSON.parse(userCookie);
        
        if (user && user._id) {
          setCurrentUserId(user._id);
        }
      }
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }, []);

  const fetchUserReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
      if (!token) throw new Error("No authentication token found");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/buyer-products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setUserReviews(res.data || []);
      }
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      setError("Failed to load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  const getDisplayItems = () => {
    const items = [];

    userReviews.forEach(product => {
      // Add reviewed products
      if (product.hasReviewed && product.reviews?.length > 0) {
        product.reviews.forEach(review => {
          items.push({
            ...review,
            productId: product.productId,
            productImage: product.productImage,
            productName: product.productName,
            orderId: product.orderId,
            hasReviewed: true,
            type: 'review'
          });
        });
      }
      // Add non-reviewed products if buyerId matches
      if (!product.hasReviewed && product.buyerId === currentUserId) {
        items.push({
          productId: product.productId,
          productImage: product.productImage,
          productName: product.productName,
          hasReviewed: false,
          orderId: product.orderId,
          buyerId: product.buyerId,
          rating: 0,
          comment: "You haven't reviewed this product yet",
          description: "Click 'Add Review' to share your experience with this product",
          buyerName: "You",
          buyerUsername: "You",
          createdAt: new Date().toISOString(),
          type: 'placeholder'
        });
      }
    });
    return items;
  };

  const allDisplayItems = getDisplayItems();

  const sortedItems = sortOrder
    ? [...allDisplayItems].sort((a, b) => {
        if (a.type === 'placeholder' && b.type === 'review') return 1;
        if (a.type === 'review' && b.type === 'placeholder') return -1;
        if (a.type === 'placeholder' && b.type === 'placeholder') return 0;
        return sortOrder === "lowToHigh" ? a.rating - b.rating : b.rating - a.rating;
      })
    : allDisplayItems;

  const actualReviews = sortedItems.filter(item => item.type === 'review');
  const averageRating = actualReviews.length > 0 
    ? (actualReviews.reduce((total, item) => total + (item.rating || 0), 0) / actualReviews.length).toFixed(1)
    : 0;

  return (
    <div className="px-[20px] lg:px-[71px]">
      <div className="flex">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-center text-neutral-900 lg:text-2xl font-bold font-karla leading-[28.80px]">
              Customer Reviews
            </p>
            <div className="flex items-center justify-center gap-2">
              <Image width={26} height={26} src="/rating.svg" alt="Rating Icon" />
              <p className="text-center text-[#9c9c9c] text-[26.92px] font-normal font-karla leading-loose">
                {averageRating} Rating
              </p>
              <div className="w-2 h-2 rounded-full bg-[#9c9c9c]"></div>
              <div className="text-center text-[#9c9c9c] lg:text-[26.92px] font-normal font-karla leading-loose">
                {actualReviews.length > 0 ? `${actualReviews.length} Reviews` : "No Reviews"}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5 relative font-karla font-bold w-[300px]">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Image unoptimized width={30} height={16} src="/sort.svg" alt="" />
              <p>Sort by</p>
            </div>
            {isDropdownOpen && (
              <div className="absolute top-[100%] right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-[200px] z-50">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSort("lowToHigh")}
                >
                  Ratings: Low to High
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSort("highToLow")}
                >
                  Ratings: High to Low
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-[56px] flex flex-col gap-[56px] pl-5">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : sortedItems.length > 0 ? (
          sortedItems.map((item, index) => (
            <div key={`${item.productId}-${index}`} className="relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <ReviewItem 
                    data={item} 
                    canEdit={currentUserId === item.buyerId && item.type === 'review'} 
                  />
                </div>
                {item.type === 'placeholder' && item.buyerId === currentUserId && (
                  <div className="ml-4 flex items-center">
                    <div
                      className="flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      onClick={() => {
                        setSelectedProductForReview(item);
                        setIsOpen(true);
                      }}
                    >
                      <IoPencil className="text-lg" />
                      <span className="text-sm font-semibold">
                        Add Review
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600 text-lg">No products available for review. Please check if you are logged in or have purchased products.</p>
          </div>
        )}
        
        <ReviewAddModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setSelectedProductForReview(null);
          }}
          title="Add Review"
          productId={selectedProductForReview?.productId}
          orderId={selectedProductForReview?.orderId}
          onReviewAdded={fetchUserReviews}
        />
      </div>
    </div>
  );
};
// "use client";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import Image from "next/image";
// import { Chart } from "./Chart";

// export const StatsCards = ({ data, userId, statsData }) => {
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [newOrders, setNewOrders] = useState({ count: 0, percentage: 0 });
//   const [averageOrder, setAverageOrder] = useState({ value: 0, percentage: 0 });
//   const [totalFollowers, setTotalFollowers] = useState({ count: 0, percentage: 0 });
//   const [productsSold, setProductsSold] = useState({ count: 0, percentage: 0 });
//   const [revenueMessage, setRevenueMessage] = useState("");

//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;

//   const fetchOrders = async () => {
//     if (!userId || !token) {
//       console.log("UserId or Token missing:", { userId, token });
//       setLoading(false);
//       setError("User ID or authentication token is missing.");
//       return;
//     }
//     setLoading(true);
//     try {
//       console.log(`Fetching orders for userId: ${userId} with token: ${token.substring(0, 5)}...`);
//       const res = await axios.get(`${API_BASE_URL}/order/UserOrders/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Orders response:", res.data);
//       if (res.status === 200) {
//         setOrders(res.data.orders || []); // Adjusted for API response structure
//       }
//     } catch (err) {
//       console.error("Orders fetch error:", err.response?.data || err.message, err.response?.status);
//       setError(`Failed to load orders: ${err.message}`);
//     }
//   };

//   const fetchProducts = async () => {
//     if (!userId || !token) {
//       console.log("UserId or Token missing:", { userId, token });
//       setLoading(false);
//       setError("User ID or authentication token is missing.");
//       return;
//     }
//     try {
//       console.log(`Fetching products for userId: ${userId} with token: ${token.substring(0, 5)}...`);
//       const res = await axios.get(`${API_BASE_URL}/products/getProductsByUser/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Products response:", res.data);
//       if (res.status === 200) {
//         setProducts(res.data.products || []);
//       }
//     } catch (err) {
//       console.error("Products fetch error:", err.response?.data || err.message, err.response?.status);
//       setError(`Failed to load products: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("Received data in StatsCards:", { data, userId, statsData }); // Debug all props
//     if (userId && token) {
//       fetchOrders();
//       fetchProducts();
//     } else {
//       console.log("UserId or Token not available:", { userId, token });
//       setLoading(false);
//       setError("User ID or authentication token is missing.");
//     }
//   }, [userId, token]);

//   useEffect(() => {
//     if (orders.length > 0 && products.length > 0) {
//       calculateStats();
//     }
//     const followersCount = data?.followers?.length || 0; // Use data for followers if available
//     setTotalFollowers({ count: followersCount, percentage: 0 });
//   }, [orders, products, data]);

//   const calculateStats = () => {
//     const now = new Date();
//     const lastWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//     const prevWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
//     const prevWeekEnd = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);

//     const validOrders = orders.filter(order => 
//       !order.orderStatus.includes("Rejected") && order.isPaid
//     );

//     // Last week orders
//     const lastWeekOrders = validOrders.filter(order => new Date(order.createdAt) >= lastWeekStart);
//     const newOrdersLast = lastWeekOrders.length;
//     const avgOrderLast = newOrdersLast > 0 ? lastWeekOrders.reduce((sum, o) => sum + o.finalAmount, 0) / newOrdersLast : 0;
//     const productsSoldLast = lastWeekOrders.reduce((sum, o) => sum + o.products.reduce((qSum, p) => qSum + (p.quantity || 0), 0), 0);

//     // Previous week orders
//     const prevWeekOrders = validOrders.filter(order => {
//       const created = new Date(order.createdAt);
//       return created >= prevWeekStart && created <= prevWeekEnd;
//     });
//     const newOrdersPrev = prevWeekOrders.length;
//     const avgOrderPrev = newOrdersPrev > 0 ? prevWeekOrders.reduce((sum, o) => sum + o.finalAmount, 0) / newOrdersPrev : 0;
//     const productsSoldPrev = prevWeekOrders.reduce((sum, o) => sum + o.products.reduce((qSum, p) => qSum + (p.quantity || 0), 0), 0);

//     const percentageChange = (current, previous) => {
//       if (previous === 0) return current > 0 ? 100 : 0;
//       return ((current - previous) / previous) * 100;
//     };

//     setNewOrders({ count: newOrdersLast, percentage: percentageChange(newOrdersLast, newOrdersPrev) });
//     setAverageOrder({ value: avgOrderLast.toFixed(2), percentage: percentageChange(avgOrderLast, avgOrderPrev) });
//     setProductsSold({ count: productsSoldLast, percentage: percentageChange(productsSoldLast, productsSoldPrev) });

//     // Revenue message for last two weeks
//     const lastTwoWeeksRevenue = validOrders.filter(o => new Date(o.createdAt) >= new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000))
//       .reduce((sum, o) => sum + o.finalAmount, 0);
//     const prevTwoWeeksRevenue = validOrders.filter(o => {
//       const created = new Date(o.createdAt);
//       return created >= new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000) && created < new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
//     }).reduce((sum, o) => sum + o.finalAmount, 0);
//     const revenuePct = percentageChange(lastTwoWeeksRevenue, prevTwoWeeksRevenue);
//     setRevenueMessage(revenuePct > 0 ? `Revenue was high up to ${revenuePct.toFixed(2)}% in Last two weeks!` : "");
//   };

//   const [fromDisabled, setFromDisabled] = useState(false);
//   const [toDisabled, setToDisabled] = useState(false);

//   const handleFromChange = (e) => {
//     setFromDisabled(e.target.value !== "option1");
//   };

//   const handleToChange = (e) => {
//     setToDisabled(e.target.value !== "option1");
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">Loading stats...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="bg-[#B25CF3] min-h-[1818px] pb-10">
//       <div className="w-full px-[20px] lg:px-[71px] h-fit">
//         <div className="pt-[120px]">
//           <div className="max-w-[630px] flex gap-2 rounded-[57px] py-[10px] px-1 bg-white items-center">
//             <div className="rounded-full w-12 h-12 bg-green-500 p-1">
//               <Image width={40} height={40} src="/trend.svg" alt="Trend Icon" />
//             </div>
//             <p className="text-black lg:text-2xl font-medium font-karla leading-normal">
//               {revenueMessage || "Revenue was high up to 16.42% in Last two weeks!"}
//             </p>
//           </div>
          
//           <div className="flex flex-col lg:flex-row pt-[26px] gap-[35px]">
//             <div className="lg:w-[50%] w-full relative px-[45px] flex flex-col z-10 justify-center rounded-[20px]">
//               <div className="absolute left-0">
//                 <Image width={747} height={373} src="/stats_bg.png" alt="Stats Background" />
//               </div>
//               <div className="flex flex-col gap-[36px] z-20">
//                 <p className="opacity-80 text-black text-[27.33px] font-normal font-karla leading-7">
//                   Overall Revenue
//                 </p>
//                 <p className="text-black text-[72.88px] font-bold font-karla leading-[72.88px]">
//                   3012 د.إ
//                 </p>
//                 <div className="flex items-center gap-3">
//                   <div className="opacity-80 text-black text-[27.33px] font-normal font-karla leading-7">
//                     versus last month
//                   </div>
//                   <Image width={30} height={30} src="/trend-up.svg" alt="Trend Up" />
//                   <p className="text-black text-[27.33px] font-normal font-karla">
//                     25.2%
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:w-[50%] w-full flex flex-col gap-[13px]">
//               <div className="flex lg:flex-row flex-col gap-[13px]">
//                 <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
//                   <div className="flex flex-col gap-3 w-[60%]">
//                     <Image src="/sales.svg" alt="Sales Icon" width={42} height={42} />
//                     <p className="text-black text-base font-medium font-karla leading-none">
//                       New Orders
//                     </p>
//                     <p className="text-black text-2xl font-bold font-karla leading-normal">
//                       {newOrders.count}
//                     </p>
//                     <div className="text-black text-base font-medium font-karla leading-none">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <Image src="/green_up.svg" alt="Green Up" width={24} height={24} />
//                     <p className="text-[#3dff9b] text-lg font-medium font-karla">
//                       {newOrders.percentage.toFixed(2)}%
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
//                   <div className="flex flex-col gap-3 w-[60%]">
//                     <Image src="/checkout.svg" alt="Checkout Icon" width={42} height={42} />
//                     <p className="text-black text-base font-medium font-karla leading-none">
//                       Average Order
//                     </p>
//                     <p className="text-black text-2xl font-bold font-karla leading-normal">
//                       {averageOrder.value}
//                     </p>
//                     <div className="text-black text-base font-medium font-karla leading-none">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <Image src="/green_up.svg" alt="Green Up" width={24} height={24} />
//                     <p className="text-[#3dff9b] text-lg font-medium font-karla">
//                       {averageOrder.percentage.toFixed(2)}%
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex lg:flex-row flex-col gap-[15px]">
//                 <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4 gap-4">
//                   <div className="flex flex-col gap-3 w-[60%]">
//                     <Image src="/add-friend.svg" alt="Add Friend Icon" width={42} height={42} />
//                     <p className="text-black text-base font-medium font-karla leading-none">
//                       Total Followers
//                     </p>
//                     <p className="text-black text-2xl font-bold font-karla leading-normal">
//                       {totalFollowers.count}
//                     </p>
//                     <div className="text-black text-base font-medium font-karla leading-none">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <Image src="/green_up.svg" alt="Green Up" width={24} height={24} />
//                     <p className="text-[#3dff9b] text-lg font-medium font-karla">
//                       {totalFollowers.percentage.toFixed(2)}%
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
//                   <div className="flex flex-col gap-3 w-[60%]">
//                     <Image src="/dash_product.svg" alt="Product Icon" width={42} height={42} />
//                     <p className="text-black text-base font-medium font-karla leading-none">
//                       Product Sold
//                     </p>
//                     <p className="text-black text-2xl font-bold font-karla leading-normal">
//                       {productsSold.count}
//                     </p>
//                     <div className="text-black text-base font-medium font-karla leading-none">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <Image src="/green_up.svg" alt="Green Up" width={24} height={24} />
//                     <p className="text-[#3dff9b] text-lg font-medium font-karla">
//                       {productsSold.percentage.toFixed(2)}%
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="pt-[126px]">
//             <p className="h-6 text-white text-2xl font-bold font-karla leading-[33.60px] tracking-wide">
//               Dashboard
//             </p>
            
//             <div className="flex pt-[30px] gap-[20px]">
//               <div className="relative">
//                 <select
//                   className={`py-[18px] px-4 rounded-lg font-karla w-[111px] appearance-none ${
//                     fromDisabled ? "bg-gray-200" : ""
//                   }`}
//                   id="fromOptions"
//                   name="fromOptions"
//                   onChange={handleFromChange}
//                   disabled={fromDisabled}
//                 >
//                   <option value="option1">From</option>
//                   <option value="option2">Option 2</option>
//                   <option value="option3">Option 3</option>
//                   <option value="option4">Option 4</option>
//                 </select>
//                 <Image
//                   className="absolute top-6 right-3"
//                   width={16}
//                   height={14}
//                   src="/drop_down.svg"
//                   alt="Dropdown Icon"
//                 />
//               </div>

//               <div className="relative">
//                 <select
//                   className={`py-[18px] px-4 rounded-lg font-karla w-[111px] appearance-none ${
//                     toDisabled ? "bg-gray-200" : ""
//                   }`}
//                   id="toOptions"
//                   name="toOptions"
//                   onChange={handleToChange}
//                   disabled={toDisabled}
//                 >
//                   <option value="option1">To</option>
//                   <option value="option2">Option 2</option>
//                   <option value="option3">Option 3</option>
//                   <option value="option4">Option 4</option>
//                 </select>
//                 <Image
//                   className="absolute top-6 right-3"
//                   width={16}
//                   height={14}
//                   src="/drop_down.svg"
//                   alt="Dropdown Icon"
//                 />
//               </div>
              
//               <button className="bg-[#fde504] px-[18px] py-[16px] rounded-lg font-karla font-bold">
//                 Export
//               </button>
//             </div>
            
//             <div className="max-w-[1300px] h-[550px] bg-white rounded-[32.40px] mt-[60px] p-[18px]">
//               <div className="pl-[109px] flex gap-3">
//                 <div>
//                   <p className="text-[#757575] text-xl font-medium font-karla leading-tight">
//                     Total orders
//                   </p>
//                   <p className="text-[#232323] text-5xl font-bold font-karla leading-[48px]">
//                     {orders.length}
//                   </p>
//                 </div>
//                 <div className="flex items-end gap-1">
//                   <Image width={20} height={20} src="/green_up.svg" alt="Trend Up" />
//                   <p className="text-green-500 text-xl mb-[-5px] font-karla">
//                     {newOrders.percentage.toFixed(2)}%
//                   </p>
//                 </div>
//               </div>
//               <Chart />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




// "use client";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import Image from "next/image";
// import { Chart } from "./Chart";

// export const StatsCards = ({ data, userId, statsData }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Dashboard data states from API
//   const [dashboardData, setDashboardData] = useState(null);
//   const [overallRevenue, setOverallRevenue] = useState({
//     current: 0,
//     currentMonth: 0,
//     lastMonth: 0,
//     monthlyPercentageChange: 0,
//     lastTwoWeeks: 0,
//     twoWeeksPercentageChange: 0
//   });
//   const [newOrders, setNewOrders] = useState({ count: 0, percentage: 0 });
//   const [averageOrder, setAverageOrder] = useState({ value: 0, percentage: 0 });
//   const [totalFollowers, setTotalFollowers] = useState({ count: 0, percentage: 0 });
//   const [productsSold, setProductsSold] = useState({ count: 0, percentage: 0 });
//   const [revenueMessage, setRevenueMessage] = useState("");

//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;

//   // Fetch Dashboard Analytics from Backend
//   const fetchDashboardAnalytics = async () => {
//     if (!userId || !token) {
//       console.log("UserId or Token missing:", { userId, token });
//       setLoading(false);
//       setError("User ID or authentication token is missing.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       console.log(`📊 Fetching dashboard analytics for userId: ${userId}`);
      
//       const res = await axios.get(
//         `${API_BASE_URL}/profile/dashboard/analytics`,
//         {
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("✅ Dashboard analytics response:", res.data);

//       if (res.data.success && res.data.data) {
//         const apiData = res.data.data;

//         // Set all dashboard data
//         setDashboardData(apiData);
//         setOverallRevenue(apiData.overallRevenue);
//         setNewOrders(apiData.newOrders);
//         setAverageOrder(apiData.averageOrder);
//         setTotalFollowers(apiData.totalFollowers);
//         setProductsSold(apiData.productsSold);
//         setRevenueMessage(apiData.revenueMessage);

//         console.log("✅ All dashboard states updated successfully");
//       } else {
//         throw new Error("Invalid response format from server");
//       }
//     } catch (err) {
//       console.error("❌ Dashboard fetch error:", err.response?.data || err.message);
//       setError(
//         err.response?.data?.message || 
//         `Failed to load dashboard: ${err.message}`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("🎯 StatsCards mounted with:", { userId, hasToken: !!token });
    
//     if (userId && token) {
//       fetchDashboardAnalytics();
//     } else {
//       console.log("⚠️ UserId or Token not available");
//       setLoading(false);
//       setError("User ID or authentication token is missing.");
//     }
//   }, [userId, token]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="bg-[#B25CF3] pb-6 sm:pb-10">
//         <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[71px] h-fit max-w-[1440px] mx-auto">
//           <div className="flex justify-center items-center h-64 text-white">
//             <div className="flex flex-col items-center gap-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//               <p className="text-lg">Loading dashboard stats...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state with retry
//   if (error) {
//     return (
//       <div className="bg-[#B25CF3] pb-6 sm:pb-10">
//         <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[71px] h-fit max-w-[1440px] mx-auto">
//           <div className="flex justify-center items-center h-64">
//             <div className="bg-white rounded-lg p-6 max-w-md">
//               <p className="text-red-500 text-center mb-4">{error}</p>
//               <button
//                 onClick={fetchDashboardAnalytics}
//                 className="w-full bg-[#B25CF3] text-white px-4 py-2 rounded-lg hover:bg-[#9d4dd4] transition"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#B25CF3] pb-6 sm:pb-10">
//       <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[71px] h-fit max-w-[1440px] mx-auto">
//         <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-[120px]">
//           {/* Revenue Message Banner */}
//           {revenueMessage && (
//             <div className="max-w-full sm:max-w-[630px] flex gap-2 rounded-[57px] py-2 sm:py-[10px] px-2 sm:px-1 bg-white items-center mb-4">
//               <div className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 p-1 flex-shrink-0 ${
//                 overallRevenue.twoWeeksPercentageChange >= 0 ? 'bg-green-500' : 'bg-red-500'
//               }`}>
//                 <Image 
//                   width={40} 
//                   height={40} 
//                   src={overallRevenue.twoWeeksPercentageChange >= 0 ? "/trend.svg" : "/trend-down.svg"} 
//                   alt="Trend Icon" 
//                   className="w-full h-full" 
//                 />
//               </div>
//               <p className="text-black text-sm sm:text-base md:text-lg lg:text-2xl font-medium font-karla leading-tight sm:leading-normal">
//                 {revenueMessage}
//               </p>
//             </div>
//           )}
          
//           {/* Main Stats Section */}
//           <div className="flex flex-col lg:flex-row pt-6 sm:pt-8 md:pt-[26px] gap-6 sm:gap-8 md:gap-[35px]">
//             {/* Overall Revenue Card */}
//             <div className="lg:w-[50%] w-full relative px-6 sm:px-8 md:px-[45px] py-8 sm:py-10 md:py-12 flex flex-col z-10 justify-center rounded-[20px] overflow-hidden">
//               <div className="absolute left-0 top-0 w-full h-full">
//                 <Image 
//                   width={747} 
//                   height={373} 
//                   src="/stats_bg.png" 
//                   alt="Stats Background" 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="flex flex-col gap-6 sm:gap-8 md:gap-[36px] z-20">
//                 <p className="opacity-80 text-black text-lg sm:text-xl md:text-2xl lg:text-[27.33px] font-normal font-karla leading-tight">
//                   Overall Revenue
//                 </p>
//                 <p className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-[72.88px] font-bold font-karla leading-tight lg:leading-[72.88px]">
//                   {overallRevenue.current.toLocaleString('en-AE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} د.إ
//                 </p>
//                 <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//                   <div className="opacity-80 text-black text-lg sm:text-xl md:text-2xl lg:text-[27.33px] font-normal font-karla leading-tight">
//                     versus last month
//                   </div>
//                   <Image 
//                     width={30} 
//                     height={30} 
//                     src={overallRevenue.monthlyPercentageChange >= 0 ? "/trend-up.svg" : "/trend-down.svg"} 
//                     alt={overallRevenue.monthlyPercentageChange >= 0 ? "Trend Up" : "Trend Down"} 
//                     className="w-6 h-6 sm:w-7 sm:h-7 md:w-[30px] md:h-[30px]" 
//                   />
//                   <p className={`text-lg sm:text-xl md:text-2xl lg:text-[27.33px] font-normal font-karla ${
//                     overallRevenue.monthlyPercentageChange >= 0 ? 'text-black' : 'text-red-600'
//                   }`}>
//                     {Math.abs(overallRevenue.monthlyPercentageChange).toFixed(1)}%
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Stats Cards Grid */}
//             <div className="lg:w-[50%] w-full flex flex-col gap-3 sm:gap-[13px]">
//               {/* First Row */}
//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-[13px]">
//                 {/* New Orders Card */}
//                 <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[249px] h-auto sm:h-[179px] bg-white rounded-[19.39px] shadow flex p-3 sm:p-4">
//                   <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
//                     <Image 
//                       src="/sales.svg" 
//                       alt="Sales Icon" 
//                       width={42} 
//                       height={42} 
//                       className="w-8 h-8 sm:w-10 sm:h-10 md:w-[42px] md:h-[42px]" 
//                     />
//                     <p className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
//                       New Orders
//                     </p>
//                     <p className="text-black text-xl sm:text-2xl font-bold font-karla leading-tight sm:leading-normal">
//                       {newOrders.count}
//                     </p>
//                     <div className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex flex-col justify-center items-center ml-2">
//                     <Image 
//                       src={newOrders.percentage >= 0 ? "/green_up.svg" : "/green_up.svg"} 
//                       alt={newOrders.percentage >= 0 ? "Up" : "Down"} 
//                       width={24} 
//                       height={24} 
//                       className={`w-5 h-5 sm:w-6 sm:h-6 ${newOrders.percentage < 0 ? 'rotate-180' : ''}`}
//                     />
//                     <p className={`text-base sm:text-lg font-medium font-karla whitespace-nowrap ${
//                       newOrders.percentage >= 0 ? 'text-[#3dff9b]' : 'text-red-500'
//                     }`}>
//                       {isNaN(newOrders.percentage) || !isFinite(newOrders.percentage) ? '0.00' : Math.abs(newOrders.percentage).toFixed(2)}%
//                     </p>
//                   </div>
//                 </div>
                
//                 {/* Average Order Card */}
//                 <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[249px] h-auto sm:h-[179px] bg-white rounded-[19.39px] shadow flex p-3 sm:p-4">
//                   <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
//                     <Image 
//                       src="/checkout.svg" 
//                       alt="Checkout Icon" 
//                       width={42} 
//                       height={42} 
//                       className="w-8 h-8 sm:w-10 sm:h-10 md:w-[42px] md:h-[42px]" 
//                     />
//                     <p className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
//                       Average Order
//                     </p>
//                     <p className="text-black text-xl sm:text-2xl font-bold font-karla leading-tight sm:leading-normal">
//                       {parseFloat(averageOrder.value).toFixed(2)}
//                     </p>
//                     <div className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex flex-col justify-center items-center ml-2">
//                     <Image 
//                       src={averageOrder.percentage >= 0 ? "/green_up.svg" : "/green_up.svg"} 
//                       alt={averageOrder.percentage >= 0 ? "Up" : "Down"} 
//                       width={24} 
//                       height={24} 
//                       className={`w-5 h-5 sm:w-6 sm:h-6 ${averageOrder.percentage < 0 ? 'rotate-180' : ''}`}
//                     />
//                     <p className={`text-base sm:text-lg font-medium font-karla whitespace-nowrap ${
//                       averageOrder.percentage >= 0 ? 'text-[#3dff9b]' : 'text-red-500'
//                     }`}>
//                       {isNaN(averageOrder.percentage) || !isFinite(averageOrder.percentage) ? '0.00' : Math.abs(averageOrder.percentage).toFixed(2)}%
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Second Row */}
//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-[15px]">
//                 {/* Total Followers Card */}
//                 <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[249px] h-auto sm:h-[179px] bg-white rounded-[19.39px] shadow flex p-3 sm:p-4 gap-2 sm:gap-4">
//                   <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
//                     <Image 
//                       src="/add-friend.svg" 
//                       alt="Add Friend Icon" 
//                       width={42} 
//                       height={42} 
//                       className="w-8 h-8 sm:w-10 sm:h-10 md:w-[42px] md:h-[42px]" 
//                     />
//                     <p className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
//                       Total Followers
//                     </p>
//                     <p className="text-black text-xl sm:text-2xl font-bold font-karla leading-tight sm:leading-normal">
//                       {totalFollowers.count}
//                     </p>
//                     <div className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex flex-col justify-center items-center">
//                     <Image 
//                       src={totalFollowers.percentage >= 0 ? "/green_up.svg" : "/green_up.svg"} 
//                       alt={totalFollowers.percentage >= 0 ? "Up" : "Down"} 
//                       width={24} 
//                       height={24} 
//                       className={`w-5 h-5 sm:w-6 sm:h-6 ${totalFollowers.percentage < 0 ? 'rotate-180' : ''}`}
//                     />
//                     <p className={`text-base sm:text-lg font-medium font-karla whitespace-nowrap ${
//                       totalFollowers.percentage >= 0 ? 'text-[#3dff9b]' : 'text-red-500'
//                     }`}>
//                       {isNaN(totalFollowers.percentage) || !isFinite(totalFollowers.percentage) ? '0.00' : Math.abs(totalFollowers.percentage).toFixed(2)}%
//                     </p>
//                   </div>
//                 </div>
                
//                 {/* Product Sold Card */}
//                 <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[249px] h-auto sm:h-[179px] bg-white rounded-[19.39px] shadow flex p-3 sm:p-4">
//                   <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
//                     <Image 
//                       src="/dash_product.svg" 
//                       alt="Product Icon" 
//                       width={42} 
//                       height={42} 
//                       className="w-8 h-8 sm:w-10 sm:h-10 md:w-[42px] md:h-[42px]" 
//                     />
//                     <p className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
//                       Product Sold
//                     </p>
//                     <p className="text-black text-xl sm:text-2xl font-bold font-karla leading-tight sm:leading-normal">
//                       {productsSold.count}
//                     </p>
//                     <div className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex flex-col justify-center items-center ml-2">
//                     <Image 
//                       src={productsSold.percentage >= 0 ? "/green_up.svg" : "/green_up.svg"} 
//                       alt={productsSold.percentage >= 0 ? "Up" : "Down"} 
//                       width={24} 
//                       height={24} 
//                       className={`w-5 h-5 sm:w-6 sm:h-6 ${productsSold.percentage < 0 ? 'rotate-180' : ''}`}
//                     />
//                     <p className={`text-base sm:text-lg font-medium font-karla whitespace-nowrap ${
//                       productsSold.percentage >= 0 ? 'text-[#3dff9b]' : 'text-red-500'
//                     }`}>
//                       {isNaN(productsSold.percentage) || !isFinite(productsSold.percentage) ? '0.00' : Math.abs(productsSold.percentage).toFixed(2)}%
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import { Chart } from "./Chart";

export const StatsCards = ({ data, userId, statsData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dashboard data states from API
  const [dashboardData, setDashboardData] = useState(null);
  const [overallRevenue, setOverallRevenue] = useState({
    current: 0,
    currentMonth: 0,
    lastMonth: 0,
    monthlyPercentageChange: 0,
    lastTwoWeeks: 0,
    twoWeeksPercentageChange: 0
  });
  const [newOrders, setNewOrders] = useState({ count: 0, percentage: 0 });
  const [averageOrder, setAverageOrder] = useState({ value: 0, percentage: 0 });
  const [totalFollowers, setTotalFollowers] = useState({ count: 0, percentage: 0 });
  const [productsSold, setProductsSold] = useState({ count: 0, percentage: 0 });
  const [revenueMessage, setRevenueMessage] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;

  // Fetch Dashboard Analytics from Backend
  const fetchDashboardAnalytics = async () => {
    if (!userId || !token) {
      console.log("UserId or Token missing:", { userId, token });
      setLoading(false);
      setError("User ID or authentication token is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`📊 Fetching dashboard analytics for userId: ${userId}`);
      
      const res = await axios.get(
        `${API_BASE_URL}/profile/dashboard/analytics`,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("✅ Dashboard analytics response:", res.data);

      if (res.data.success && res.data.data) {
        const apiData = res.data.data;

        // Set all dashboard data
        setDashboardData(apiData);
        setOverallRevenue(apiData.overallRevenue);
        setNewOrders(apiData.newOrders);
        setAverageOrder(apiData.averageOrder);
        setTotalFollowers(apiData.totalFollowers);
        setProductsSold(apiData.productsSold);
        setRevenueMessage(apiData.revenueMessage);

        console.log("✅ All dashboard states updated successfully");
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("❌ Dashboard fetch error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || 
        `Failed to load dashboard: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🎯 StatsCards mounted with:", { userId, hasToken: !!token });
    
    if (userId && token) {
      fetchDashboardAnalytics();
    } else {
      console.log("⚠️ UserId or Token not available");
      setLoading(false);
      setError("User ID or authentication token is missing.");
    }
  }, [userId, token]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#B25CF3] pb-6 sm:pb-10">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[71px] h-fit max-w-[1440px] mx-auto">
          <div className="flex justify-center items-center h-64 text-white">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="text-lg">Loading dashboard stats...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state with retry
  if (error) {
    return (
      <div className="bg-[#B25CF3] pb-6 sm:pb-10">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[71px] h-fit max-w-[1440px] mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="bg-white rounded-lg p-6 max-w-md">
              <p className="text-red-500 text-center mb-4">{error}</p>
              <button
                onClick={fetchDashboardAnalytics}
                className="w-full bg-[#B25CF3] text-white px-4 py-2 rounded-lg hover:bg-[#9d4dd4] transition"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#B25CF3] pb-6 sm:pb-10">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[71px] h-fit max-w-[1440px] mx-auto">
        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-[120px]">
          {/* Revenue Message Banner */}
          {revenueMessage && (
            <div className="max-w-full sm:max-w-[630px] flex gap-2 rounded-[57px] py-2 sm:py-[10px] px-2 sm:px-1 bg-white items-center mb-4">
              <div className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 p-1 flex-shrink-0 ${
                overallRevenue.twoWeeksPercentageChange >= 0 ? 'bg-green-500' : 'bg-red-500'
              }`}>
                <Image 
                  width={40} 
                  height={40} 
                  src="/trend.svg"
                  alt="Trend Icon" 
                  className={`w-full h-full ${overallRevenue.twoWeeksPercentageChange < 0 ? 'rotate-180' : ''}`}
                />
              </div>
              <p className="text-black text-sm sm:text-base md:text-lg lg:text-2xl font-medium font-karla leading-tight sm:leading-normal">
                {revenueMessage}
              </p>
            </div>
          )}
          
          {/* Main Stats Section */}
          <div className="flex flex-col lg:flex-row pt-6 sm:pt-8 md:pt-[26px] gap-6 sm:gap-8 md:gap-[35px]">
            {/* Overall Revenue Card */}
            <div className="lg:w-[50%] w-full relative px-6 sm:px-8 md:px-[45px] py-8 sm:py-10 md:py-12 flex flex-col z-10 justify-center rounded-[20px] overflow-hidden">
              <div className="absolute left-0 top-0 w-full h-full">
                <Image 
                  width={747} 
                  height={373} 
                  src="/stats_bg.png" 
                  alt="Stats Background" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-6 sm:gap-8 md:gap-[36px] z-20">
                <p className="opacity-80 text-black text-lg sm:text-xl md:text-2xl lg:text-[27.33px] font-normal font-karla leading-tight">
                  Overall Revenue
                </p>
                <p className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-[72.88px] font-bold font-karla leading-tight lg:leading-[72.88px]">
                  {overallRevenue.current.toLocaleString('en-AE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} د.إ
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="opacity-80 text-black text-lg sm:text-xl md:text-2xl lg:text-[27.33px] font-normal font-karla leading-tight">
                    versus last month
                  </div>
                  <Image 
                    width={30} 
                    height={30} 
                    src="/trend-up.svg"
                    alt={overallRevenue.monthlyPercentageChange >= 0 ? "Trend Up" : "Trend Down"} 
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-[30px] md:h-[30px] ${
                      overallRevenue.monthlyPercentageChange < 0 ? 'rotate-180' : ''
                    }`}
                  />
                  <p className={`text-lg sm:text-xl md:text-2xl lg:text-[27.33px] font-normal font-karla ${
                    overallRevenue.monthlyPercentageChange >= 0 ? 'text-black' : 'text-red-600'
                  }`}>
                    {Math.abs(overallRevenue.monthlyPercentageChange).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="lg:w-[50%] w-full flex flex-col gap-3 sm:gap-[13px]">
              {/* First Row */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-[13px]">
                {/* New Orders Card */}
                <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[249px] h-auto sm:h-[179px] bg-white rounded-[19.39px] shadow flex p-3 sm:p-4">
                  <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
                    <Image 
                      src="/sales.svg" 
                      alt="Sales Icon" 
                      width={42} 
                      height={42} 
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-[42px] md:h-[42px]" 
                    />
                    <p className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
                      New Orders
                    </p>
                    <p className="text-black text-xl sm:text-2xl font-bold font-karla leading-tight sm:leading-normal">
                      {newOrders.count}
                    </p>
                    <div className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center ml-2">
                    <Image 
                      src={newOrders.percentage >= 0 ? "/green_up.svg" : "/green_up.svg"} 
                      alt={newOrders.percentage >= 0 ? "Up" : "Down"} 
                      width={24} 
                      height={24} 
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${newOrders.percentage < 0 ? 'rotate-180' : ''}`}
                    />
                    <p className={`text-base sm:text-lg font-medium font-karla whitespace-nowrap ${
                      newOrders.percentage >= 0 ? 'text-[#3dff9b]' : 'text-red-500'
                    }`}>
                      {isNaN(newOrders.percentage) || !isFinite(newOrders.percentage) ? '0.00' : Math.abs(newOrders.percentage).toFixed(2)}%
                    </p>
                  </div>
                </div>
                
                {/* Average Order Card */}
                <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[249px] h-auto sm:h-[179px] bg-white rounded-[19.39px] shadow flex p-3 sm:p-4">
                  <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
                    <Image 
                      src="/checkout.svg" 
                      alt="Checkout Icon" 
                      width={42} 
                      height={42} 
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-[42px] md:h-[42px]" 
                    />
                    <p className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
                      Average Order
                    </p>
                    <p className="text-black text-xl sm:text-2xl font-bold font-karla leading-tight sm:leading-normal">
                      {parseFloat(averageOrder.value).toFixed(2)}
                    </p>
                    <div className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center ml-2">
                    <Image 
                      src={averageOrder.percentage >= 0 ? "/green_up.svg" : "/green_up.svg"} 
                      alt={averageOrder.percentage >= 0 ? "Up" : "Down"} 
                      width={24} 
                      height={24} 
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${averageOrder.percentage < 0 ? 'rotate-180' : ''}`}
                    />
                    <p className={`text-base sm:text-lg font-medium font-karla whitespace-nowrap ${
                      averageOrder.percentage >= 0 ? 'text-[#3dff9b]' : 'text-red-500'
                    }`}>
                      {isNaN(averageOrder.percentage) || !isFinite(averageOrder.percentage) ? '0.00' : Math.abs(averageOrder.percentage).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Second Row */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-[15px]">
                {/* Total Followers Card */}
                <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[249px] h-auto sm:h-[179px] bg-white rounded-[19.39px] shadow flex p-3 sm:p-4 gap-2 sm:gap-4">
                  <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
                    <Image 
                      src="/add-friend.svg" 
                      alt="Add Friend Icon" 
                      width={42} 
                      height={42} 
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-[42px] md:h-[42px]" 
                    />
                    <p className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
                      Total Followers
                    </p>
                    <p className="text-black text-xl sm:text-2xl font-bold font-karla leading-tight sm:leading-normal">
                      {totalFollowers.count}
                    </p>
                    <div className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Image 
                      src={totalFollowers.percentage >= 0 ? "/green_up.svg" : "/green_up.svg"} 
                      alt={totalFollowers.percentage >= 0 ? "Up" : "Down"} 
                      width={24} 
                      height={24} 
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${totalFollowers.percentage < 0 ? 'rotate-180' : ''}`}
                    />
                    <p className={`text-base sm:text-lg font-medium font-karla whitespace-nowrap ${
                      totalFollowers.percentage >= 0 ? 'text-[#3dff9b]' : 'text-red-500'
                    }`}>
                      {isNaN(totalFollowers.percentage) || !isFinite(totalFollowers.percentage) ? '0.00' : Math.abs(totalFollowers.percentage).toFixed(2)}%
                    </p>
                  </div>
                </div>
                
                {/* Product Sold Card */}
                <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[249px] h-auto sm:h-[179px] bg-white rounded-[19.39px] shadow flex p-3 sm:p-4">
                  <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
                    <Image 
                      src="/dash_product.svg" 
                      alt="Product Icon" 
                      width={42} 
                      height={42} 
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-[42px] md:h-[42px]" 
                    />
                    <p className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
                      Product Sold
                    </p>
                    <p className="text-black text-xl sm:text-2xl font-bold font-karla leading-tight sm:leading-normal">
                      {productsSold.count}
                    </p>
                    <div className="text-black text-sm sm:text-base font-medium font-karla leading-tight">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center ml-2">
                    <Image 
                      src={productsSold.percentage >= 0 ? "/green_up.svg" : "/green_up.svg"} 
                      alt={productsSold.percentage >= 0 ? "Up" : "Down"} 
                      width={24} 
                      height={24} 
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${productsSold.percentage < 0 ? 'rotate-180' : ''}`}
                    />
                    <p className={`text-base sm:text-lg font-medium font-karla whitespace-nowrap ${
                      productsSold.percentage >= 0 ? 'text-[#3dff9b]' : 'text-red-500'
                    }`}>
                      {isNaN(productsSold.percentage) || !isFinite(productsSold.percentage) ? '0.00' : Math.abs(productsSold.percentage).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
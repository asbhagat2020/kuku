// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { Chart } from "./Chart";

// export const StatsCards = ({ data }) => {
//   const [fromDisabled, setFromDisabled] = useState(false);
//   const [toDisabled, setToDisabled] = useState(false);

//   const handleFromChange = (e) => {
//     setFromDisabled(e.target.value !== "option1");
//   };

//   const handleToChange = (e) => {
//     setToDisabled(e.target.value !== "option1");
//   };
  
//   return (
//     <div className="bg-[#B25CF3] min-h-[1818px] pb-10">
//       <div className="w-full px-[20px] lg:px-[71px] h-fit">
//         <div className="pt-[120px]">
//           <div className="max-w-[630px] flex gap-2 rounded-[57px] py-[10px] px-1 bg-white items-center">
//             <div className="rounded-full w-12 h-12 bg-green-500 p-1">
//               <Image width={40} height={40} src="trend.svg" alt="" />
//             </div>

//             <p className="text-black lg:text-2xl font-medium font-karla leading-normal">
//               Revenue was high up to 16.42% in Last two weeks!
//             </p>
//           </div>
          
//           <div className="flex flex-col lg:flex-row pt-[26px] gap-[35px]">
//             <div className="lg:w-[50%] w-full relative px-[45px] flex flex-col z-10 justify-center rounded-[20px]">
//               <div className="absolute left-0">
//                 <Image width={747} height={373} src="/stats_bg.png" alt="" />
//               </div>
//               <div className="flex flex-col gap-[36px] z-20">
//                 <p className="opacity-80 text-black text-[27.33px] font-normal font-karla leading-7">
//                   Overall Revenue
//                 </p>
//                 <p className="text-black text-[72.88px] font-bold font-karla leading-[72.88px]">
//                   3012 د.إ
//                 </p>
//                 <div className="flex items-center gap-3">
//                   <div className="opacity-80 text-black text-[27.33px] font-normal font-jarla leading-7">
//                     versus last month
//                   </div>
//                   <Image width={30} height={30} src="/trend-up.svg" alt="" />
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
//                     <Image src="/sales.svg" alt="" width={42} height={42} />
//                     <p className="text-black text-base font-medium font-karla leading-none">
//                       New Orders
//                     </p>
//                     <p className="text-black text-2xl font-bold font-karla leading-normal">
//                       2000
//                     </p>
//                     <div className="text-black text-base font-medium font-karla leading-none">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <Image src="/green_up.svg" alt="" width={24} height={24} />
//                     <p className="text-[#3dff9b] text-lg font-medium font-karla">
//                       25.2%
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
//                   <div className="flex flex-col gap-3 w-[60%]">
//                     <Image src="/checkout.svg" alt="" width={42} height={42} />
//                     <p className="text-black text-base font-medium font-karla leading-none">
//                       Average Order
//                     </p>
//                     <p className="text-black text-2xl font-bold font-karla leading-normal">
//                       300
//                     </p>
//                     <div className="text-black text-base font-medium font-karla leading-none">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <Image src="/green_up.svg" alt="" width={24} height={24} />
//                     <p className="text-[#3dff9b] text-lg font-medium font-karla">
//                       25.2%
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex lg:flex-row flex-col gap-[15px]">
//                 <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4 gap-4">
//                   <div className="flex flex-col gap-3 w-[60%]">
//                     <Image
//                       src="/add-friend.svg"
//                       alt=""
//                       width={42}
//                       height={42}
//                     />
//                     <p className="text-black text-base font-medium font-karla leading-none">
//                       Total Followers
//                     </p>
//                     <p className="text-black text-2xl font-bold font-karla leading-normal">
//                       200
//                     </p>
//                     <div className="text-black text-base font-medium font-karla leading-none">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <Image src="/green_up.svg" alt="" width={24} height={24} />
//                     <p className="text-[#3dff9b] text-lg font-medium font-karla">
//                       25.2%
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
//                   <div className="flex flex-col gap-3 w-[60%]">
//                     <Image
//                       src="/dash_product.svg"
//                       alt=""
//                       width={42}
//                       height={42}
//                     />
//                     <p className="text-black text-base font-medium font-karla leading-none">
//                       Product Sold
//                     </p>
//                     <p className="text-black text-2xl font-bold font-karla leading-normal">
//                       556
//                     </p>
//                     <div className="text-black text-base font-medium font-karla leading-none">
//                       From last weeks
//                     </div>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <Image src="/green_up.svg" alt="" width={24} height={24} />
//                     <p className="text-[#3dff9b] text-lg font-medium font-karla">
//                       25.2%
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
//                   alt=""
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
//                   alt=""
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
//                     20,321
//                   </p>
//                 </div>
//                 <div className="flex items-end gap-1">
//                   <Image width={20} height={20} src={"/green_up.svg"} alt="" />
//                   <p className="text-green-500 text-xl mb-[-5px] font-karla">
//                     20%
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

// export const StatsCards = ({ data }) => {
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
//   const userId = data?._id; // Check if data or _id is undefined
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
//         setOrders(res.data || []);
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
//     console.log("Received data in StatsCards:", data); // Debug data passed
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
//     const followersCount = data?.followers?.length || 0;
//     setTotalFollowers({ count: followersCount, percentage: 0 }); // Dynamic count, percentage 0 if no history
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





"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import { Chart } from "./Chart";

export const StatsCards = ({ data, userId, statsData }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newOrders, setNewOrders] = useState({ count: 0, percentage: 0 });
  const [averageOrder, setAverageOrder] = useState({ value: 0, percentage: 0 });
  const [totalFollowers, setTotalFollowers] = useState({ count: 0, percentage: 0 });
  const [productsSold, setProductsSold] = useState({ count: 0, percentage: 0 });
  const [revenueMessage, setRevenueMessage] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;

  const fetchOrders = async () => {
    if (!userId || !token) {
      console.log("UserId or Token missing:", { userId, token });
      setLoading(false);
      setError("User ID or authentication token is missing.");
      return;
    }
    setLoading(true);
    try {
      console.log(`Fetching orders for userId: ${userId} with token: ${token.substring(0, 5)}...`);
      const res = await axios.get(`${API_BASE_URL}/order/UserOrders/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Orders response:", res.data);
      if (res.status === 200) {
        setOrders(res.data.orders || []); // Adjusted for API response structure
      }
    } catch (err) {
      console.error("Orders fetch error:", err.response?.data || err.message, err.response?.status);
      setError(`Failed to load orders: ${err.message}`);
    }
  };

  const fetchProducts = async () => {
    if (!userId || !token) {
      console.log("UserId or Token missing:", { userId, token });
      setLoading(false);
      setError("User ID or authentication token is missing.");
      return;
    }
    try {
      console.log(`Fetching products for userId: ${userId} with token: ${token.substring(0, 5)}...`);
      const res = await axios.get(`${API_BASE_URL}/products/getProductsByUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Products response:", res.data);
      if (res.status === 200) {
        setProducts(res.data.products || []);
      }
    } catch (err) {
      console.error("Products fetch error:", err.response?.data || err.message, err.response?.status);
      setError(`Failed to load products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Received data in StatsCards:", { data, userId, statsData }); // Debug all props
    if (userId && token) {
      fetchOrders();
      fetchProducts();
    } else {
      console.log("UserId or Token not available:", { userId, token });
      setLoading(false);
      setError("User ID or authentication token is missing.");
    }
  }, [userId, token]);

  useEffect(() => {
    if (orders.length > 0 && products.length > 0) {
      calculateStats();
    }
    const followersCount = data?.followers?.length || 0; // Use data for followers if available
    setTotalFollowers({ count: followersCount, percentage: 0 });
  }, [orders, products, data]);

  const calculateStats = () => {
    const now = new Date();
    const lastWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const prevWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const prevWeekEnd = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);

    const validOrders = orders.filter(order => 
      !order.orderStatus.includes("Rejected") && order.isPaid
    );

    // Last week orders
    const lastWeekOrders = validOrders.filter(order => new Date(order.createdAt) >= lastWeekStart);
    const newOrdersLast = lastWeekOrders.length;
    const avgOrderLast = newOrdersLast > 0 ? lastWeekOrders.reduce((sum, o) => sum + o.finalAmount, 0) / newOrdersLast : 0;
    const productsSoldLast = lastWeekOrders.reduce((sum, o) => sum + o.products.reduce((qSum, p) => qSum + (p.quantity || 0), 0), 0);

    // Previous week orders
    const prevWeekOrders = validOrders.filter(order => {
      const created = new Date(order.createdAt);
      return created >= prevWeekStart && created <= prevWeekEnd;
    });
    const newOrdersPrev = prevWeekOrders.length;
    const avgOrderPrev = newOrdersPrev > 0 ? prevWeekOrders.reduce((sum, o) => sum + o.finalAmount, 0) / newOrdersPrev : 0;
    const productsSoldPrev = prevWeekOrders.reduce((sum, o) => sum + o.products.reduce((qSum, p) => qSum + (p.quantity || 0), 0), 0);

    const percentageChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    setNewOrders({ count: newOrdersLast, percentage: percentageChange(newOrdersLast, newOrdersPrev) });
    setAverageOrder({ value: avgOrderLast.toFixed(2), percentage: percentageChange(avgOrderLast, avgOrderPrev) });
    setProductsSold({ count: productsSoldLast, percentage: percentageChange(productsSoldLast, productsSoldPrev) });

    // Revenue message for last two weeks
    const lastTwoWeeksRevenue = validOrders.filter(o => new Date(o.createdAt) >= new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000))
      .reduce((sum, o) => sum + o.finalAmount, 0);
    const prevTwoWeeksRevenue = validOrders.filter(o => {
      const created = new Date(o.createdAt);
      return created >= new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000) && created < new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    }).reduce((sum, o) => sum + o.finalAmount, 0);
    const revenuePct = percentageChange(lastTwoWeeksRevenue, prevTwoWeeksRevenue);
    setRevenueMessage(revenuePct > 0 ? `Revenue was high up to ${revenuePct.toFixed(2)}% in Last two weeks!` : "");
  };

  const [fromDisabled, setFromDisabled] = useState(false);
  const [toDisabled, setToDisabled] = useState(false);

  const handleFromChange = (e) => {
    setFromDisabled(e.target.value !== "option1");
  };

  const handleToChange = (e) => {
    setToDisabled(e.target.value !== "option1");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading stats...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#B25CF3] min-h-[1818px] pb-10">
      <div className="w-full px-[20px] lg:px-[71px] h-fit">
        <div className="pt-[120px]">
          <div className="max-w-[630px] flex gap-2 rounded-[57px] py-[10px] px-1 bg-white items-center">
            <div className="rounded-full w-12 h-12 bg-green-500 p-1">
              <Image width={40} height={40} src="/trend.svg" alt="Trend Icon" />
            </div>
            <p className="text-black lg:text-2xl font-medium font-karla leading-normal">
              {revenueMessage || "Revenue was high up to 16.42% in Last two weeks!"}
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row pt-[26px] gap-[35px]">
            <div className="lg:w-[50%] w-full relative px-[45px] flex flex-col z-10 justify-center rounded-[20px]">
              <div className="absolute left-0">
                <Image width={747} height={373} src="/stats_bg.png" alt="Stats Background" />
              </div>
              <div className="flex flex-col gap-[36px] z-20">
                <p className="opacity-80 text-black text-[27.33px] font-normal font-karla leading-7">
                  Overall Revenue
                </p>
                <p className="text-black text-[72.88px] font-bold font-karla leading-[72.88px]">
                  3012 د.إ
                </p>
                <div className="flex items-center gap-3">
                  <div className="opacity-80 text-black text-[27.33px] font-normal font-karla leading-7">
                    versus last month
                  </div>
                  <Image width={30} height={30} src="/trend-up.svg" alt="Trend Up" />
                  <p className="text-black text-[27.33px] font-normal font-karla">
                    25.2%
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-[50%] w-full flex flex-col gap-[13px]">
              <div className="flex lg:flex-row flex-col gap-[13px]">
                <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
                  <div className="flex flex-col gap-3 w-[60%]">
                    <Image src="/sales.svg" alt="Sales Icon" width={42} height={42} />
                    <p className="text-black text-base font-medium font-karla leading-none">
                      New Orders
                    </p>
                    <p className="text-black text-2xl font-bold font-karla leading-normal">
                      {newOrders.count}
                    </p>
                    <div className="text-black text-base font-medium font-karla leading-none">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/green_up.svg" alt="Green Up" width={24} height={24} />
                    <p className="text-[#3dff9b] text-lg font-medium font-karla">
                      {newOrders.percentage.toFixed(2)}%
                    </p>
                  </div>
                </div>
                
                <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
                  <div className="flex flex-col gap-3 w-[60%]">
                    <Image src="/checkout.svg" alt="Checkout Icon" width={42} height={42} />
                    <p className="text-black text-base font-medium font-karla leading-none">
                      Average Order
                    </p>
                    <p className="text-black text-2xl font-bold font-karla leading-normal">
                      {averageOrder.value}
                    </p>
                    <div className="text-black text-base font-medium font-karla leading-none">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/green_up.svg" alt="Green Up" width={24} height={24} />
                    <p className="text-[#3dff9b] text-lg font-medium font-karla">
                      {averageOrder.percentage.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex lg:flex-row flex-col gap-[15px]">
                <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4 gap-4">
                  <div className="flex flex-col gap-3 w-[60%]">
                    <Image src="/add-friend.svg" alt="Add Friend Icon" width={42} height={42} />
                    <p className="text-black text-base font-medium font-karla leading-none">
                      Total Followers
                    </p>
                    <p className="text-black text-2xl font-bold font-karla leading-normal">
                      {totalFollowers.count}
                    </p>
                    <div className="text-black text-base font-medium font-karla leading-none">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/green_up.svg" alt="Green Up" width={24} height={24} />
                    <p className="text-[#3dff9b] text-lg font-medium font-karla">
                      {totalFollowers.percentage.toFixed(2)}%
                    </p>
                  </div>
                </div>
                
                <div className="min-w-[249px] h-[179px] bg-white rounded-[19.39px] shadow flex p-4">
                  <div className="flex flex-col gap-3 w-[60%]">
                    <Image src="/dash_product.svg" alt="Product Icon" width={42} height={42} />
                    <p className="text-black text-base font-medium font-karla leading-none">
                      Product Sold
                    </p>
                    <p className="text-black text-2xl font-bold font-karla leading-normal">
                      {productsSold.count}
                    </p>
                    <div className="text-black text-base font-medium font-karla leading-none">
                      From last weeks
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Image src="/green_up.svg" alt="Green Up" width={24} height={24} />
                    <p className="text-[#3dff9b] text-lg font-medium font-karla">
                      {productsSold.percentage.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-[126px]">
            <p className="h-6 text-white text-2xl font-bold font-karla leading-[33.60px] tracking-wide">
              Dashboard
            </p>
            
            <div className="flex pt-[30px] gap-[20px]">
              <div className="relative">
                <select
                  className={`py-[18px] px-4 rounded-lg font-karla w-[111px] appearance-none ${
                    fromDisabled ? "bg-gray-200" : ""
                  }`}
                  id="fromOptions"
                  name="fromOptions"
                  onChange={handleFromChange}
                  disabled={fromDisabled}
                >
                  <option value="option1">From</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
                <Image
                  className="absolute top-6 right-3"
                  width={16}
                  height={14}
                  src="/drop_down.svg"
                  alt="Dropdown Icon"
                />
              </div>

              <div className="relative">
                <select
                  className={`py-[18px] px-4 rounded-lg font-karla w-[111px] appearance-none ${
                    toDisabled ? "bg-gray-200" : ""
                  }`}
                  id="toOptions"
                  name="toOptions"
                  onChange={handleToChange}
                  disabled={toDisabled}
                >
                  <option value="option1">To</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
                <Image
                  className="absolute top-6 right-3"
                  width={16}
                  height={14}
                  src="/drop_down.svg"
                  alt="Dropdown Icon"
                />
              </div>
              
              <button className="bg-[#fde504] px-[18px] py-[16px] rounded-lg font-karla font-bold">
                Export
              </button>
            </div>
            
            <div className="max-w-[1300px] h-[550px] bg-white rounded-[32.40px] mt-[60px] p-[18px]">
              <div className="pl-[109px] flex gap-3">
                <div>
                  <p className="text-[#757575] text-xl font-medium font-karla leading-tight">
                    Total orders
                  </p>
                  <p className="text-[#232323] text-5xl font-bold font-karla leading-[48px]">
                    {orders.length}
                  </p>
                </div>
                <div className="flex items-end gap-1">
                  <Image width={20} height={20} src="/green_up.svg" alt="Trend Up" />
                  <p className="text-green-500 text-xl mb-[-5px] font-karla">
                    {newOrders.percentage.toFixed(2)}%
                  </p>
                </div>
              </div>
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
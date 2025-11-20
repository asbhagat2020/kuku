

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";
import axios from "axios";

const Co2Main = () => {
  const [co2Animation, setCo2Animation] = useState(null);
  const token = useSelector((store) => store.auth.token);
  const userId = useSelector((store) => store.auth.user?._id);
  const [userName, setUserName] = useState("");
  const [co2Saved, setCo2Saved] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [loadMoreState, setLoadMoreState] = useState('initial');
  const [currentMonthOrders, setCurrentMonthOrders] = useState([]);
  const [lastMonthOrders, setLastMonthOrders] = useState([]);

  console.log("User ID:", userId);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/userDetails`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserName(res?.data?.name);
    } catch (error) {
      console.log("Error fetching user details", error);
    }
  };

  // Fetch CO2 data
  const fetchCo2Data = async () => {
    try {
      if (!userId) throw new Error("User ID not found");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/co2/monthly?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCo2Saved(res.data.totalCo2Saved || 0);
    } catch (error) {
      console.log("Error fetching CO2 data", error);
      setCo2Saved(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch order data with dynamic userId
  // const fetchOrderData = async () => {
  //   try {
  //     if (!userId) throw new Error("User ID not found");
  //     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/UserCo2/${userId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const allOrders = res.data.orders || [];
      
  //     // Sort orders by date (most recent first)
  //     const sortedOrders = allOrders.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
      
  //     // Get current date
  //     const now = new Date();
  //     const currentMonth = now.getMonth();
  //     const currentYear = now.getFullYear();
      
  //     // Get last month date
  //     const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  //     const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      
  //     // Filter orders by month
  //     const currentMonthFilteredOrders = sortedOrders.filter(order => {
  //       const orderDate = new Date(order.paidAt);
  //       return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
  //     });
      
  //     const lastMonthFilteredOrders = sortedOrders.filter(order => {
  //       const orderDate = new Date(order.paidAt);
  //       return orderDate.getMonth() === lastMonth && orderDate.getFullYear() === lastMonthYear;
  //     });
      
  //     setOrders(sortedOrders);
  //     setCurrentMonthOrders(currentMonthFilteredOrders);
  //     setLastMonthOrders(lastMonthFilteredOrders);
      
  //     // Initially show first 4 orders
  //     setDisplayedOrders(sortedOrders.slice(0, 4));
      
  //     // Set load more state
  //     if (sortedOrders.length <= 4) {
  //       setLoadMoreState('allLoaded');
  //     } else {
  //       setLoadMoreState('initial');
  //     }
  //   } catch (error) {
  //     console.log("Error fetching order data", error);
  //     setOrders([]);
  //   }
  // };

  // Fetch order data with dynamic userId
const fetchOrderData = async () => {
  try {
    if (!userId) throw new Error("User ID not found");
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/UserCo2/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Ye line add kar di - paidAt wale orders ko hi use karenge
    let allOrders = (res.data.orders || []).filter(order => order.paidAt && order.paidAt.trim() !== "");

    // Ab sort karo (safe hai ab Invalid Date nahi aayega)
    const sortedOrders = allOrders.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));

    // Baki sab same rahega...
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const currentMonthFilteredOrders = sortedOrders.filter(order => {
      const orderDate = new Date(order.paidAt);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });
    
    const lastMonthFilteredOrders = sortedOrders.filter(order => {
      const orderDate = new Date(order.paidAt);
      return orderDate.getMonth() === lastMonth && orderDate.getFullYear() === lastMonthYear;
    });
    
    setOrders(sortedOrders);
    setCurrentMonthOrders(currentMonthFilteredOrders);
    setLastMonthOrders(lastMonthFilteredOrders);
    
    setDisplayedOrders(sortedOrders.slice(0, 4));
    
    if (sortedOrders.length <= 4) {
      setLoadMoreState('allLoaded');
    } else {
      setLoadMoreState('initial');
    }
  } catch (error) {
    console.log("Error fetching order data", error);
    setOrders([]);
  }
};

  // Handle Load More functionality
  const handleLoadMore = () => {
    if (loadMoreState === 'initial') {
      // Show current month orders
      if (currentMonthOrders.length > 0) {
        setDisplayedOrders(currentMonthOrders);
        setLoadMoreState('currentMonth');
      } else if (lastMonthOrders.length > 0) {
        setDisplayedOrders(lastMonthOrders);
        setLoadMoreState('lastMonth');
      } else {
        setDisplayedOrders(orders);
        setLoadMoreState('allLoaded');
      }
    } else if (loadMoreState === 'currentMonth') {
      // Show last month orders
      if (lastMonthOrders.length > 0) {
        setDisplayedOrders([...currentMonthOrders, ...lastMonthOrders]);
        setLoadMoreState('lastMonth');
      } else {
        setDisplayedOrders(orders);
        setLoadMoreState('allLoaded');
      }
    } else if (loadMoreState === 'lastMonth') {
      // Show all orders
      setDisplayedOrders(orders);
      setLoadMoreState('allLoaded');
    }
  };

  // Get Load More button text
  const getLoadMoreText = () => {
    switch (loadMoreState) {
      case 'initial':
        if (currentMonthOrders.length > 0) return 'Load Current Month';
        if (lastMonthOrders.length > 0) return 'Load Last Month';
        return 'Load All Orders';
      case 'currentMonth':
        if (lastMonthOrders.length > 0) return 'Load Last Month';
        return 'Load All Orders';
      case 'lastMonth':
        return 'Load All Orders';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchUserDetails();
      fetchCo2Data();
      fetchOrderData();
    }
  }, [token, userId]);

  useEffect(() => {
    const loadAnimation = async () => {
      const response = await fetch("/lottieFiles/co2.json");
      const animationData = await response.json();
      setCo2Animation(animationData);
    };
    loadAnimation();
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  if (!co2Animation || loading) return null;

  // Calculate percentage (e.g., based on a max limit, adjust as needed)
  const maxCo2Limit = 100;
  const percentage = Math.min((co2Saved / maxCo2Limit) * 100, 100);

  return (
    <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Container */}
      <div className="mt-4 sm:mt-8 lg:mt-16 min-h-[400px] sm:min-h-[500px] lg:min-h-[860px] relative rounded-[20px] overflow-hidden">
        {/* Lottie Animation Background */}
        <div className="absolute inset-0 z-0">
          <Lottie
            loop
            play
            animationData={co2Animation}
            className="w-full h-full object-cover"
            style={{ position: "absolute" }}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-4 pt-6 sm:p-6 lg:p-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            {/* Greeting Section */}
            <div className="sm:w-auto py-[60px] lg:pl-[12px] sm:py-6 lg:py-12">
              <p className="space-y-1 sm:space-y-2">
                <span className="block text-white text-xl sm:text-2xl lg:text-5xl font-bold font-karla">
                  Hi {userName},
                </span>
                <span className="block text-white text-sm sm:text-base lg:text-2xl font-bold font-karla">
                  you have saved {co2Saved} kgs of CO
                  <span className="align-text-bottom text-xs sm:text-sm lg:text-xl">2</span> emissions this month
                </span>
              </p>
            </div>

            {/* Help Button */}
            {/* <Link
              href={"#"}
              className="absolute top-4 right-4 pl-[4px] sm:relative top-[90px] sm:top-0 sm:right-0 w-16 sm:w-20 lg:w-24 h-6 sm:h-8 lg:h-10 bg-white rounded-full flex items-center justify-center gap-2"
            >
              <Image width={20} height={20} src={"question_green.svg"} alt="" className="w-4 sm:w-4 lg:w-6" />
              <p className="text-green-500 text-xs sm:text-sm lg:text-base font-karla font-bold">Help</p>
            </Link> */}
          </div>
        </div>

        {/* Circular Progress */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:left-[40%] lg:translate-x-0">
          <div className="relative w-[120px] sm:w-[220px] lg:w-[300px]">
            {/* Progress Circle */}
            <CircularProgressbar
              value={percentage}
              className="font-karla text-yellow-300"
              styles={buildStyles({
                textColor: "#186940",
                pathColor: "#FBE300",
                trailColor: "#d6d6d6",
                textSize: "15px",
                strokeLinecap: "round",
              })}
            />
            {/* Center Content Container */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
              <div className="text-center flex flex-col items-center">
                {/* CO2 Text Container */}
                <div className="relative inline-flex flex-col items-center -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-8">
                  <div className="flex items-baseline">
                    <span className="font-karla font-bold text-[15px] sm:text-[30px] md:text-[72px] lg:text-[94px] leading-none text-[#FBE300] mt-4">
                      CO
                    </span>
                    <span className="font-karla font-bold text-[10px] sm:text-[28px] md:text-[35px] lg:text-[40px] -ml-1 sm:-ml-2 md:-ml-3 lg:-ml-4 text-[#FBE300] translate-y-2 sm:translate-y-3 md:translate-y-4 lg:translate-y-6">
                      2
                    </span>
                  </div>

                  {/* KG Value and Caption */}
                  <div className="flex flex-col items-center mt-2 sm:mt-3 md:mt-4 lg:mt-6">
                    <div className="font-karla font-bold text-[14px] sm:text-[22px] md:text-[36px] lg:text-[40px] text-[#186940]">
                      {co2Saved} kg
                    </div>
                    <div className="font-karla text-[9px] sm:text-xs md:text-sm lg:text-base font-bold text-[#186940] mt-1 sm:mt-2">
                      Saved this month
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Section */}
      <div className="pt-8 sm:pt-12 lg:pt-20">
        <p className="text-black text-lg sm:text-2xl lg:text-3xl font-bold font-karla mb-6 sm:mb-8 lg:mb-12 px-4">
          Your Contribution 🌎
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4">
          {displayedOrders.map((order, index) => (
            <ContributionCard key={index} order={order} />
          ))}
        </div>

        {/* Load More Button */}
        {loadMoreState !== 'allLoaded' && (
          <div className="flex justify-center my-8 sm:my-12 lg:my-14">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-[#30bd75] text-white font-karla font-bold rounded-lg hover:bg-[#28a866] transition-colors duration-200"
            >
              {getLoadMoreText()}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ContributionCard = ({ order }) => {
  const orderDate = new Date(order.paidAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const co2Saved = order.co2Saved > 0 ? order.co2Saved : 0;

  return (
    <div className="flex items-center relative">
      <div className="absolute top-[-6px] left-[40px] sm:left-[45px] lg:left-20 z-20">
        <Image unoptimized src="/co2.png" alt="" width={24} height={24} className="w-4 sm:w-5 lg:w-8" />
      </div>
      <div className="rounded-full w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[129px] lg:h-[129px] bg-[#d1ffe7] z-10 flex items-center justify-center border-4 border-[#d1ffe8] overflow-hidden">
        <Image 
          unoptimized 
          src={order.productImage} 
          alt="" 
          width={90} 
          height={90} 
          className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] lg:w-[115px] lg:h-[115px] rounded-full object-cover" 
        />
      </div>
      <div className="flex-1 ml-[-15px] sm:ml-[-20px] lg:ml-[-30px] py-2 sm:py-3 lg:py-4 pl-[50px] sm:pl-[70px] lg:pl-[98px] pr-3 sm:pr-4 lg:pr-8 bg-neutral-50 rounded-tr-[15px] rounded-br-[15px] border-4 border-[#d1ffe8]">
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="text-black text-xs sm:text-sm lg:text-xl font-medium font-karla">Order Placed: {orderDate}</div>
          <div className="text-[#30bd75] text-sm sm:text-base lg:text-2xl font-bold font-karla">Co2 emission saved: {co2Saved}KG</div>
        </div>
      </div>
    </div>
  );
};

export default Co2Main;
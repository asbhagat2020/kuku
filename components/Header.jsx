"use client";
import Image from "next/image";

import React, { useState, useEffect, useRef } from "react";
import NotificationPanel from "./home/NotificationPanel"; // Import the NotificationPanel component

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import WomenDropdown from "./WomenDropdown";
import MenDropdown from "./MenDropdown";
import KidsDropdown from "./KidsDropdown";
import { BottomNavigation } from "./BottomNavigation";
import SettingsDropdown from "./SettingsDropdown";
import { signIn, signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout, token } from "@/store/auth/authSlice";
import { showSuccessNotification } from "@/utils/Notification/notif";
import toast from "react-hot-toast";
import { useFilter } from "@/context/FilterContext";
import GoogleTranslate from "./GoogleTranslate";
import axios from "axios";

const Header = () => {
  const filterContext = useFilter();
  const setSearch = filterContext?.setSearch;
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();
  const panelRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState(null);
  const [isLocalToken, setIsLocalToken] = useState(false);
  const [userID, setUserID] = useState();
  const { data: session, status } = useSession();
  const [totalNotificationCount, setTotalNotificationCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  // Add ref for timeout management
  const searchTimeoutRef = useRef(null);

  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    setIsLocalToken(token);
  }, [token]);

  const details = useSelector((state) => state.auth.user);
  // console.log(details);
  const id = details?._id;
  useEffect(() => {
    setUserID(id);
  }, [id]);

  useEffect(() => {
    const fetchInitialCounts = async () => {
      try {
        // const token = JSON.parse(Cookies.get("auth") || "null");
        const token = (() => {
          try {
            const authCookie = Cookies.get("auth");
            return authCookie && authCookie !== "undefined"
              ? JSON.parse(authCookie)
              : null;
          } catch (error) {
            console.error("Error parsing auth cookie:", error);
            return null;
          }
        })();
        if (!token) return; // Skip if not authenticated

        // Fetch notification count
        const notificationResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const notificationsData = Array.isArray(notificationResponse.data)
          ? notificationResponse.data
          : notificationResponse.data?.data?.notifications || [];
        const notificationUnreadCount = notificationsData.filter(
          (n) => n.status === "UNREAD"
        ).length;

        // Fetch offer count and offer notifications
        const offerResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/get`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const offerCount = offerResponse.data.offers?.length || 0;

        const offerNotificationResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/offerNotify`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const offerNotificationsData = Array.isArray(
          offerNotificationResponse.data
        )
          ? offerNotificationResponse.data
          : [];
        const unreadOfferNotificationCount = offerNotificationsData.filter(
          (n) => !n.read
        ).length;

        const totalOfferCount = offerCount + unreadOfferNotificationCount;
        setTotalNotificationCount(notificationUnreadCount + totalOfferCount);
      } catch (error) {
        console.error("Error fetching initial counts:", error);
        toast.error("Failed to fetch notification counts");
      }
    };

    fetchInitialCounts();
    const interval = setInterval(() => {
      fetchInitialCounts(); // Fetch every 2 seconds
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationCountUpdate = (notificationCount, offerCount) => {
    setTotalNotificationCount(notificationCount + offerCount);
  };

  const handleToggle = (dropdown) => {
    setCurrentOpenDropdown(currentOpenDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = document.getElementById("header")?.offsetTop || 0;

      if (window.scrollY > headerOffset) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const notifications = [];

  // Fixed offers variable
  const offers = [];

  const fetchSubcategorySuggestions = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
      );
      const products = await response.json();

      // Existing: Matching subcategories
      const matchingSubcategories = products
        .filter((product) =>
          product.category?.subCategoryName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((product) => product.category.subCategoryName)
        .filter((value, index, self) => self.indexOf(value) === index);

      // Existing: Matching categories
      const matchingCategories = products
        .filter((product) =>
          product.category?.categoryName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((product) => product.category.categoryName)
        .filter((value, index, self) => self.indexOf(value) === index);

      // New: Matching seller usernames
      const matchingUsernames = products
        .filter((product) =>
          product.seller?.username
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((product) => product.seller.username) // Username ko suggestion mein daal
        .filter((value, index, self) => self.indexOf(value) === index);

      // Combine all and remove duplicates, limit to 5
      const allSuggestions = [
        ...matchingSubcategories,
        ...matchingCategories,
        ...matchingUsernames,
      ]
        .filter((value, index, self) => self.indexOf(value) === index)
        .slice(0, 5);

      setSuggestions(allSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (subcategory) => {
    try {
      // Set the search term in the filter context
      if (setSearch) {
        setSearch(subcategory);
      }

      // Create URL with search parameter
      const searchParams = new URLSearchParams();
      searchParams.set("search", subcategory);

      // Navigate to selling page with search parameter
      router.push(`/selling-page?${searchParams.toString()}`);

      // Clear local state
      setSearchValue("");
      setSuggestions([]);
      setIsSearchVisible(false);
      setIsMobileSearchVisible(false);
    } catch (error) {
      console.error("Error during search:", error);
      toast.error("Search failed. Please try again.");
    }
  };

  const toggleSearch = () => {
    if (hamburger) {
      // If in mobile menu, toggle mobile search
      setIsMobileSearchVisible(!isMobileSearchVisible);
    } else {
      // If in main header, toggle desktop search
      setIsSearchVisible(!isSearchVisible);
    }
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen); // Toggle the panel on second click
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // FIXED: Safe timeout handling for search debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Clear previous timeout safely
    if (searchTimeoutRef.current && typeof clearTimeout === "function") {
      try {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      } catch (error) {
        console.warn("Failed to clear search timeout:", error);
      }
    }

    // Set new timeout safely
    if (typeof setTimeout === "function") {
      try {
        searchTimeoutRef.current = setTimeout(() => {
          fetchSubcategorySuggestions(value);
        }, 300);
      } catch (error) {
        console.warn("Failed to set search timeout:", error);
        // Fallback to immediate execution if setTimeout fails
        fetchSubcategorySuggestions(value);
      }
    } else {
      // Fallback to immediate execution if setTimeout is not available
      fetchSubcategorySuggestions(value);
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      handleSearch(searchValue.trim());
    }
  };

  const handleGoogleSignOut = () => {
    // Remove cookies
    Cookies.remove("auth");
    Cookies.remove("user");

    // Perform signOut and dispatch logout, then chain actions
    signOut()
      .then(() => {
        // Dispatch Redux logout action after successful signOut
        dispatch(logout());

        // Optional: Log a success message
        console.log("Google sign out successful");
      })
      .catch((error) => {
        // Handle any errors during signOut
        console.error("Google sign out failed:", error);
      });
  };

  // Paths where the notification icon should be disabled
  const disabledNotificationPaths = [""];
  const isNotificationDisabled = disabledNotificationPaths.includes(path);

  // Determine background color based on the path
  const isSpecialPath =
    path === "/listingproduct" ||
    path === "/kukuit" ||
    path === "/renting" ||
    path === "/emergencyrequirement";
  const iconsPath = path === "/user_profile";
  const wishPath = path === "/wishlist";
  const cartPath = path === "/cart";
  const isHome = path === "/";

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click was outside the search box
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
      // Handle mobile search click outside
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setIsMobileSearchVisible(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false); // Close dropdown if clicked outside
      }
      // Check if click was outside the notification panel
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsNotificationVisible(false);
      }
    };

    // Add event listener
    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);

  // Cleanup search timeout on component unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current && typeof clearTimeout === "function") {
        try {
          clearTimeout(searchTimeoutRef.current);
        } catch (error) {
          console.warn("Failed to clear search timeout on unmount:", error);
        }
      }
    };
  }, []);

  const handleHandburger = () => {
    setHamburger(!hamburger);
  };

  const handleBack = () => {
    setHamburger(!hamburger);
    setIsMobileSearchVisible(false); // Close mobile search when closing menu
  };

  const handleLocalSignOut = () => {
    // Remove cookies
    Cookies.remove("auth");
    Cookies.remove("user");

    // Dispatch logout action
    dispatch(logout());

    // Redirect the user to the login page after logout
    router.push("/login");
  };

  const handleLocalSignIn = () => {
    router.push("/login");
  };

  const handleClick = (userID) => {
    const token = Cookies.get("auth");
    if (!token) {
      toast.success("Please Login!");
      setTimeout(() => {
        router.push("/login");
      }, [1000]);
    } else {
      window.location.href = `/user_profile/${userID}`;
    }
  };

  const handleNavigation = (route) => {
    if (isLocalToken) {
      router.push(`/${route}`);
    } else {
      toast.success("please login");
      setTimeout(() => {
        router.push("/login");
      }, [1000]);
    }
  };

  return (
    <header className="w-full mx-auto">
      <div className="bg-[#0D0D0D] px-4 py-2">
        <GoogleTranslate />
      </div>
      <div
        id="header"
        className={`w-full transition-all duration-300 ${
          isFixed ? " top-0 left-0 right-0 shadow-md" : "relative"
        } max-w-full px-4 sm:px-6 md:px-8 lg:px-[70px] py-[23px] h-[80px] lg:h-[108px] z-40`}
        style={{
          backgroundColor: isSpecialPath ? "#FFF" : "#EDA702",
        }}
      >
        <div className="flex justify-between items-center">
          {/* LEFT SECTION - Logo and Navigation */}
          <div className="flex items-center gap-4 sm:gap-[20px] lg:gap-[60px] lg:ml-[-40px]">
            {/* Desktop Logo */}
            <Link href="/" className="flex gap-[1rem] items-center pl-0">
              <Image
                src="/kuku_birds.webp"
                width={56}
                height={61}
                alt=""
                className="hidden lg:block"
              />
              <h1 className="text-black text-[37px] font-bold font-palanquin_dark leading-[44.40px] hidden lg:block">
                KUKU
              </h1>
            </Link>

            {/* Mobile Menu Button */}
            <Image
              onClick={handleHandburger}
              src="/menu.svg"
              width={30}
              height={30}
              alt=""
              className="pl-2 lg:hidden cursor-pointer"
            />

            {/* Mobile Logo */}
            <div
              className={`lg:hidden pl-2 sm:pl-4 ${
                isSearchVisible ? "lg:block hidden" : ""
              }`}
            >
              <Link href="/">
                <Image
                  src="/kuku_logo.svg"
                  width={36}
                  height={41}
                  alt=""
                  className=""
                />
              </Link>
            </div>

            {/* Desktop Navigation Menu */}
            <div
              className={`lg:flex gap-[30px] items-center hidden ${
                isSearchVisible ? "lg:hidden xl:flex" : ""
              }`}
            >
              <div
                className={`${
                  isHome ? "text-[#fefae5]" : "text-black"
                } text-base font-bold font-karla leading-tight hover:text-pink-500`}
              >
                <MenDropdown />
              </div>
              <div
                className={`${
                  isHome ? "text-[#fefae5]" : "text-black"
                } text-base font-bold font-karla leading-tight hover:text-pink-500`}
              >
                <WomenDropdown />
              </div>
              <div
                className={`${
                  isHome ? "text-[#fefae5]" : "text-black"
                } text-base font-bold font-karla leading-tight hover:text-pink-500`}
              >
                <KidsDropdown />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - Search and Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-[10px]">
            {/* Search Section */}
            {isSearchVisible ? (
              <div
                ref={searchRef}
                className="relative h-[42px] sm:h-[48px] lg:h-[54px] pl-2 sm:pl-4 lg:pl-5"
              >
                <input
                  className="w-[180px] xs:w-[220px] sm:w-[280px] md:w-[380px] lg:w-[480px] xl:w-[550px] h-full bg-white rounded-lg px-6 md:px-6 lg:px-8 outline-none appearance-none transition-all duration-300 text-sm sm:text-base"
                  type="text"
                  placeholder="Search by username/category/subcategory"
                  autoFocus
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <style jsx>{`
                  .search-input::-webkit-search-cancel-button {
                    -webkit-appearance: none;
                    appearance: none;
                    display: none;
                  }
                `}</style>

                <div
                  onClick={() =>
                    searchValue.trim() && handleSearch(searchValue.trim())
                  }
                  className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <Image
                    alt="search icon"
                    width={20}
                    height={20}
                    src="/search_button.svg"
                    className="w-5 h-5 lg:w-6 lg:h-6"
                  />
                </div>

                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  </div>
                )}

                {/* Search Suggestions Dropdown */}
                {suggestions.length > 0 && !isLoading && (
                  <div className="absolute top-full left-4 sm:left-6 w-[90%] lg:w-[95%] bg-white border border-gray-300 rounded-bl-lg rounded-br-lg mt-1 z-10">
                    {suggestions.map((suggestion, index) => (
                      <React.Fragment key={index}>
                        <div
                          className="px-4 py-5 sm:py-6 lg:py-7 cursor-pointer hover:bg-gray-100 font-karla flex justify-between gap-4"
                          onClick={() => handleSearch(suggestion)}
                        >
                          <div className="flex gap-3 sm:gap-4">
                            <Image
                              width={20}
                              height={20}
                              src="/search_button.svg"
                              alt=""
                              className="w-5 h-5 lg:w-6 lg:h-6"
                            />
                            <p className="text-[#070707] text-sm sm:text-base font-normal font-karla leading-snug tracking-tight">
                              {suggestion}
                            </p>
                          </div>
                          <Image
                            width={20}
                            height={20}
                            src="/arrow-up-right.svg"
                            alt=""
                            className="w-5 h-5 lg:w-6 lg:h-6"
                          />
                        </div>

                        {/* Separator line */}
                        {index !== suggestions.length - 1 && (
                          <div className="w-[95%] mx-auto h-[1px] bg-[#383838]"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-[54px] lg:w-[54px] flex items-center justify-center bg-[#393939] rounded-full cursor-pointer"
                onClick={toggleSearch}
              >
                <Image
                  alt="search icon"
                  width={20}
                  height={20}
                  src="/search.svg"
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                />
              </div>
            )}

            {(session || isLocalToken) && !isNotificationDisabled && (
              // <div
              //   className={`relative h-8 w-8 sm:h-10 sm:w-10 lg:h-[54px] lg:w-[54px] flex items-center justify-center bg-white/40 rounded-full cursor-pointer ${
              //     isSearchVisible ? "block" : ""
              //   }`}
              //   onClick={toggleNotifications}
              // >
              //   <Image
              //     alt="notification icon"
              //     width={20}
              //     height={20}
              //     src="/notification.svg"
              //     className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              //   />
              //   {totalNotificationCount > 0 && (
              //     <span className="absolute top-2 right-4 translate-x-1/3 -translate-y-1/3 bg-[#FF0000] text-black font-karla font-semibold rounded-full h-[18px] w-[18px] flex items-center justify-center text-[10px]">
              //       {totalNotificationCount}
              //     </span>
              //   )}
              // </div>

              <div
                className={`relative h-8 w-8 sm:h-10 sm:w-10 lg:h-[54px] lg:w-[54px] flex items-center justify-center bg-white/40 rounded-full cursor-pointer group ${
                  isSearchVisible ? "block" : ""
                }`}
                onClick={toggleNotifications}
              >
                <Image
                  alt="notification icon"
                  width={20}
                  height={20}
                  src="/notification.svg"
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                />
                {totalNotificationCount > 0 && (
                  <span className="absolute top-2 right-4 translate-x-1/3 -translate-y-1/3 bg-[#FF0000] text-black font-karla font-semibold rounded-full h-[18px] w-[18px] flex items-center justify-center text-[10px]">
                    {totalNotificationCount}
                  </span>
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  Notifications
                </span>
              </div>
            )}

            {/* Notification Panel */}
            {isNotificationOpen && (
              <NotificationPanel
                notifications={notifications}
                offers={offers}
                onClose={() => setIsNotificationOpen(false)}
                onCountUpdate={handleNotificationCountUpdate}
              />
            )}

            {/* Cart Icon - Desktop Only */}
            {/* <div
              className={`${
                cartPath ? "bg-[#393939]" : "bg-white/40"
              } h-[54px] p-[15px] rounded-[100px] hidden lg:block cursor-pointer`}
              onClick={() => {
                handleNavigation("cart");
              }}
            >
              <Image
                alt="cart icon"
                width={24}
                height={24}
                src={cartPath ? "/cart_white.svg" : "/cart.svg"}
              />
            </div> */}

            <div
              className={`${
                cartPath ? "bg-[#393939]" : "bg-white/40"
              } h-[54px] p-[15px] rounded-[100px] hidden lg:block cursor-pointer relative group`}
              onClick={() => {
                handleNavigation("cart");
              }}
            >
              <Image
                alt="cart icon"
                width={24}
                height={24}
                src={cartPath ? "/cart_white.svg" : "/cart.svg"}
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Cart
              </span>
            </div>

            {/* Wishlist Icon - Fixed spacing and responsive sizing */}
            {/* <div
              className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-[54px] lg:w-[54px] flex items-center justify-center rounded-full cursor-pointer ${
                wishPath ? "bg-[#393939]" : "bg-white/40"
              }`}
              onClick={() => {
                handleNavigation("wishlist");
              }}
            >
              <Image
                alt="wishlist icon"
                width={20}
                height={20}
                src={wishPath ? "/wishlist_white.svg" : "/wishlist.svg"}
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
            </div> */}

            <div
              className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-[54px] lg:w-[54px] flex items-center justify-center rounded-full cursor-pointer relative group ${
                wishPath ? "bg-[#393939]" : "bg-white/40"
              }`}
              onClick={() => {
                handleNavigation("wishlist");
              }}
            >
              <Image
                alt="wishlist icon"
                width={20}
                height={20}
                src={wishPath ? "/wishlist_white.svg" : "/wishlist.svg"}
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Wishlist
              </span>
            </div>

            {/* Profile Icon - Desktop Only */}
            <Link
              href={`/user_profile/${userID}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(userID);
              }}
            >
              {/* <div
                className={`${
                  iconsPath ? "bg-[#393939]" : "bg-white/40"
                } h-[54px] p-[15px] rounded-[100px] hidden lg:block cursor-pointer`}
              >
                <Image
                  alt="profile icon"
                  width={24}
                  height={24}
                  src={iconsPath ? "/profile_white.svg" : "/profile_black.svg"}
                />
              </div> */}

              <div
                className={`${
                  iconsPath ? "bg-[#393939]" : "bg-white/40"
                } h-[54px] p-[15px] rounded-[100px] hidden lg:block cursor-pointer relative group`}
              >
                <Image
                  alt="profile icon"
                  width={24}
                  height={24}
                  src={iconsPath ? "/profile_white.svg" : "/profile_black.svg"}
                />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Profile
                </span>
              </div>
            </Link>

            {/* Dropdown Menu - Desktop Only */}
            <div ref={dropdownRef} className="relative">
              <div onClick={toggleDropdown} className="cursor-pointer">
                <Image
                  alt="dropdown"
                  width={18}
                  height={18}
                  src="/heade_drop_down.svg"
                />
              </div>

              {isDropdownVisible && (
                <div className="absolute py-[26px] px-[10px] right-0 top-[40px] min-w-[160px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 ">
                  {session || isLocalToken ? (
                    <>
                      <Link
                        href={`/user_profile/${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(id);
                        }}
                      >
                        <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla hover:text-pink-500 font-bold">
                          Your Profile
                        </div>
                      </Link>
                      <Link href="/wishlist">
                        <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla hover:text-pink-500 font-bold">
                          Wishlist
                        </div>
                      </Link>
                      <Link href="/co2">
                        <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-bold font-karla hover:text-pink-500">
                          Co2 Savings
                        </div>
                      </Link>
                      <Link href="/addresslist">
                        <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla hover:text-pink-500 font-bold">
                          Address
                        </div>
                      </Link>
                      <Link href="/AllOrders">
                        <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla hover:text-pink-500 font-bold">
                          Orders
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          if (session) {
                            handleGoogleSignOut();
                          } else {
                            handleLocalSignOut();
                          }
                        }}
                        className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla hover:text-pink-500 font-bold"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    // Show only Sign in when user is not logged in
                    <button
                      onClick={() => {
                        handleLocalSignIn();
                      }}
                      className="px-2 hover:bg-gray-100 cursor-pointer font-karla hover:text-pink-500 font-bold"
                    >
                      Sign in
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Component */}
        <BottomNavigation />

        {/* Mobile Hamburger Menu - Enhanced responsive design */}
        <div
          className={`w-full h-screen bg-yellow-500 lg:hidden fixed px-4 sm:px-[20px] py-[20px] top-[-2px] left-0 right-0 bottom-0 z-[1000] transition-transform ease-in-out duration-300 ${
            hamburger
              ? "transform translate-x-0 z-50"
              : "transform translate-x-full z-0"
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex px-4 sm:px-[24px] mt-[20px] justify-between items-center">
            <div
              className="w-[50%] flex items-center gap-1 cursor-pointer"
              onClick={handleBack}
            >
              <Image
                unoptimized
                src="/arrow_left.png"
                width={18}
                height={18}
                alt="back-arrow"
                className="align-middle"
              />
              <p className="font-karla font-bold text-sm sm:text-base">Back</p>
            </div>

            {/* Mobile Search Section - Enhanced responsiveness */}
            <div className="flex items-center justify-evenly gap-4 sm:gap-[40px]">
              {isMobileSearchVisible ? (
                <div
                  ref={mobileSearchRef}
                  className="relative flex-1 mx-2 sm:mx-4"
                >
                  <input
                    className="w-full h-8 sm:h-10 bg-white rounded-lg px-8 sm:px-[50px] outline-none appearance-none text-sm sm:text-base"
                    type="text"
                    placeholder="Search by username/category/subcategory"
                    autoFocus
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <div
                    onClick={() =>
                      searchValue.trim() && handleSearch(searchValue.trim())
                    }
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    <Image
                      alt="search icon"
                      width={16}
                      height={16}
                      src="/search_button.svg"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>

                  {/* Mobile Loading indicator */}
                  {isLoading && (
                    <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"></div>
                    </div>
                  )}

                  {/* Mobile Search Suggestions */}
                  {suggestions.length > 0 && !isLoading && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-bl-lg rounded-br-lg mt-1 z-50">
                      {suggestions.map((suggestion, index) => (
                        <React.Fragment key={index}>
                          <div
                            className="px-3 sm:px-4 py-2 sm:py-3 cursor-pointer hover:bg-gray-100 font-karla flex justify-between gap-2 sm:gap-4"
                            onClick={() => handleSearch(suggestion)}
                          >
                            <div className="flex gap-2 sm:gap-4">
                              <Image
                                width={16}
                                height={16}
                                src="/search_button.svg"
                                alt=""
                                className="w-4 h-4 sm:w-5 sm:h-5"
                              />
                              <p className="text-[#070707] text-xs sm:text-sm font-normal font-karla leading-snug tracking-tight">
                                {suggestion}
                              </p>
                            </div>
                            <Image
                              width={16}
                              height={16}
                              src="/arrow-up-right.svg"
                              alt=""
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                          </div>
                          {index !== suggestions.length - 1 && (
                            <div className="w-[95%] mx-auto h-[1px] bg-[#383838]"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="h-10 w-10 flex items-center justify-center bg-[#393939] rounded-full cursor-pointer"
                  onClick={toggleSearch}
                >
                  <Image
                    alt="search icon"
                    width={24}
                    height={24}
                    src="/search.svg"
                    className="w-4 h-4"
                  />
                </div>
              )}

              <Link href="/">
                <div onClick={handleBack}>
                  <Image
                    src="/kuku_logo.svg"
                    width={36}
                    height={41}
                    alt="img"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="mx-6 pt-5 overflow-y-auto max-h-[80vh] thin-scrollbar">
            <style jsx>{`
              .thin-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #eab308 transparent;
              }
              .thin-scrollbar::-webkit-scrollbar {
                width: 6px;
                height: 6px;
              }
              .thin-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb {
                background-color: #eab308;
                border-radius: 10px;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #eab308;
              }
            `}</style>
            <div className="flex flex-col gap-[30px]">
              <div
                className={`${
                  isHome ? "text-white" : "text-black"
                } text-base font-bold font-karla leading-tight hover:text-pink-500 z-50`}
              >
                {/* MEN */}
                <MenDropdown
                  isOpen={currentOpenDropdown === "men"}
                  onToggle={() => handleToggle("men")}
                />
              </div>
              <div
                className={`${
                  isHome ? "text-white" : "text-black"
                } text-base font-bold font-karla leading-tight hover:text-pink-500 z-40`}
              >
                {/* WOMEN */}
                <WomenDropdown
                  isOpen={currentOpenDropdown === "women"}
                  onToggle={() => handleToggle("women")}
                />
              </div>
              <div
                className={`${
                  isHome ? "text-white" : "text-black"
                } text-base font-bold font-karla leading-tight hover:text-pink-500 z-30`}
              >
                {/* KIDS */}
                <KidsDropdown
                  isOpen={currentOpenDropdown === "kids"}
                  onToggle={() => handleToggle("kids")}
                />
              </div>
              <hr />
            </div>
          </div>
          <div className="flex mx-6 mt-5 justify-between">
            <Link href="/cart">
              <div
                className={`${
                  cartPath ? "bg-[#393939]" : "bg-white/40"
                } h-[54px] p-[15px] rounded-[100px]`}
              >
                <Image
                  alt="cart icon"
                  width={24}
                  height={24}
                  src={cartPath ? "/cart_white.svg" : "/cart.svg"}
                />
              </div>
            </Link>
            <Link href="/wishlist">
              <div
                className={`${
                  wishPath ? "bg-[#393939]" : "bg-white/40"
                } h-[54px] p-[15px] rounded-[100px]`}
              >
                <Image
                  alt="wishlist icon"
                  width={24}
                  height={24}
                  src={wishPath ? "/wishlist_white.svg" : "/wishlist.svg"}
                />
              </div>
            </Link>
            <Link href={userID ? `/user_profile/${userID}` : "/user_profile"}>
              <div
                className={`${
                  iconsPath ? "bg-[#393939]" : "bg-white/40"
                } h-[54px] p-[15px] rounded-[100px]`}
              >
                <Image
                  alt="profile icon"
                  width={24}
                  height={24}
                  src={iconsPath ? "/profile_white.svg" : "/profile_black.svg"}
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Render NotificationPanel conditionally */}
        {isNotificationVisible && (
          <div ref={panelRef}>
            <NotificationPanel notifications={notifications} offers={offers} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;










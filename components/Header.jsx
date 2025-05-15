'use client';
import Image from 'next/image';

import React, { useState, useEffect, useRef } from 'react';
import NotificationPanel from './home/NotificationPanel'; // Import the NotificationPanel component

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import WomenDropdown from './WomenDropdown';
import MenDropdown from './MenDropdown';
import KidsDropdown from './KidsDropdown';
import LanguageSelector from './LanguageSelector';
import { BottomNavigation } from './BottomNavigation';
import SettingsDropdown from './SettingsDropdown';
import { signIn, signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout, token } from '@/store/auth/authSlice';
import { showSuccessNotification } from '@/utils/Notification/notif';
import toast from 'react-hot-toast';

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hamburger, setHamburger] = useState(false);
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
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handleToggle = (dropdown) => {
    setCurrentOpenDropdown(currentOpenDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = document.getElementById('header')?.offsetTop || 0;

      if (window.scrollY > headerOffset) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const notifications = [
    {
      text: 'A Seller has posted item for your emergency requirement',
      date: 'July 28, 2024 at 07:40 AM',
    },
    {
      text: '"Lulu & Sky - Orange crochet cottage Kurta" Bid placed',
      date: 'July 28, 2024 at 07:40 AM',
    },
    {
      text: '"Lulu & Sky - Orange crochet cottage Kurta" Bid placed',
      date: 'July 28, 2024 at 07:40 AM',
    },
    {
      text: '"Lulu & Sky - Orange crochet cottage Kurta" Bid placed',
      date: 'July 28, 2024 at 07:40 AM',
    },
    {
      text: '"Lulu & Sky - Orange crochet cottage Kurta" Bid placed',
      date: 'July 28, 2024 at 07:40 AM',
    },
  ];

  // Offers data
  const offers = [
    {
      text: 'Offer received',
      time: '12:02 AM',
      description: 'Great news! Someone has made you an offer. Tap here to check it out',
    },
    {
      text: 'Offer received',
      time: '12:02 AM',
      description: 'Great news! Someone has made you an offer. Tap here to check it out',
    },
  ];

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
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const mockSuggestions = ['T-shirt', 'Jacket', 'Jeans', 'Shoes', 'Socks'].filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );

      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  const handleGoogleSignOut = () => {
    // Remove cookies
    Cookies.remove('auth');
    Cookies.remove('user');

    // Perform signOut and dispatch logout, then chain actions
    signOut()
      .then(() => {
        // Dispatch Redux logout action after successful signOut
        dispatch(logout());

        // Optional: Log a success message
        console.log('Google sign out successful');
      })
      .catch((error) => {
        // Handle any errors during signOut
        console.error('Google sign out failed:', error);
      });
  };
  // Paths where the notification icon should be disabled
  const disabledNotificationPaths = [''];
  const isNotificationDisabled = disabledNotificationPaths.includes(path);

  // Determine background color based on the path
  const isSpecialPath =
    path === '/listingproduct' || path === '/kukuit' || path === '/renting' || path === '/emergencyrequirement';
  const iconsPath = path === '/user_profile';
  const wishPath = path === '/wishlist';
  const cartPath = path === '/cart';
  const isHome = path === '/';

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click was outside the search box
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
      // Handle mobile search click outside
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
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
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef, dropdownRef, panelRef]);

  const handleHandburger = () => {
    setHamburger(!hamburger);
  };
  const handleBack = () => {
    setHamburger(!hamburger);
    setIsMobileSearchVisible(false); // Close mobile search when closing menu
  };
  const handleLocalSignOut = () => {
    // Remove cookies
    Cookies.remove('auth');
    Cookies.remove('user');

    // Dispatch logout action
    dispatch(logout());

    // Redirect the user to the login page after logout
    router.push('/login');
  };
  const handleLocalSignIn = () => {
    router.push('/login');
  };

  const handleClick = (userID) => {
    const token = Cookies.get('auth');
    if (!token) {
      toast.success('Please Login!');
    } else {
      window.location.href = `/user_profile/${userID}`;
    }
  };

  return (
    <header className='max-w-[1550px] mx-auto'>
      <LanguageSelector />
      <div
        id="header"
        className={`w-full transition-all duration-300 ${isFixed ? ' top-0 left-0 right-0 shadow-md' : 'relative'
          } max-w-full lg:px-[70px] py-[23px] h-[80px] lg:h-[108px] z-40`}
        style={{
          backgroundColor: isSpecialPath ? '#FFF' : '#EDA702',
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center sm:gap-[20px] lg:gap-[60px] lg:ml-[-40px]">
            <Link href="/" className="flex gap-[1rem] items-center pl-0">
              <Image src="/kuku_logo.svg" width={56} height={61} alt="" className="hidden lg:block" />
              <h1 className="text-black text-[37px] font-bold font-palanquin_dark leading-[44.40px] hidden lg:block">
                KUKU
              </h1>
            </Link>
            <Image
              onClick={handleHandburger}
              src="/menu.svg"
              width={30}
              height={30}
              alt=""
              className="pl-2 lg:hidden"
            />
            <div className={`lg:hidden pl-4 ${isSearchVisible ? 'lg:block hidden' : ''}`}>
              <Link href="/">
                <Image src="/kuku_logo.svg" width={36} height={41} alt="" className="" />
              </Link>
            </div>

            <div className={`lg:flex gap-[30px] items-center hidden ${isSearchVisible ? 'lg:hidden xl:flex' : ''}`}>
              <div className={`${isHome ? 'text-[#fefae5]' : 'text-black'
                } text-base font-bold font-karla leading-tight hover:text-pink-500`}>
                {/* Men */}
                <MenDropdown />
              </div>
              <div className={`${isHome ? 'text-[#fefae5]' : 'text-black'
                } text-base font-bold font-karla leading-tight hover:text-pink-500`}>
                {/* Women */}
                <WomenDropdown />
              </div>
              <div className={`${isHome ? 'text-[#fefae5]' : 'text-black'
                } text-base font-bold font-karla leading-tight hover:text-pink-500`}>
                {/* Kids */}
                <KidsDropdown />
              </div>

            </div>
          </div>

          <div className="flex gap-[10px] items-center">
            {isSearchVisible ? (
              <div ref={searchRef} className="relative h-[54px] pl-5">
                <input
                  className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[550px] h-full bg-white rounded-lg px-8 md:px-6 lg:px-8 outline-none appearance-none transition-all duration-300"
                  type="text"
                  placeholder="Search an item"
                  autoFocus
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <style jsx>{`
                  .search-input::-webkit-search-cancel-button {
                    -webkit-appearance: none;
                    appearance: none;
                    display: none;
                  }
                `}</style>

                <div onClick={toggleSearch} className="absolute left-6 top-1/2 transform -translate-y-1/2">
                  <Image alt="search icon" width={24} height={24} src="/search_button.svg" />
                </div>

                {suggestions.length > 0 && (
                  <div className="absolute top-full left-6 w-[50%] lg:w-[95%] bg-white border border-gray-300 rounded-bl-lg rounded-br-lg mt-1 z-10">
                    {suggestions.map((suggestion, index) => (
                      <React.Fragment key={index}>
                        <div className="px-4 py-7 cursor-pointer hover:bg-gray-100 font-karla flex justify-between gap-4">
                          <div className="flex gap-4 ">
                            <Image width={24} height={24} src="/search_button.svg" alt="" />
                            <p className="text-[#070707] text-base font-normal font-karla leading-snug tracking-tight">
                              {suggestion}
                            </p>
                          </div>
                          <Image width={24} height={24} src="/arrow-up-right.svg" alt="" />
                        </div>

                        {/* Conditionally render the line */}
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
                className="h-10 w-10 lg:h-[54px] lg:w-[54px] flex items-center justify-center bg-[#393939] rounded-full cursor-pointer"
                onClick={toggleSearch}
              >
                <Image alt="search icon" width={24} height={24} src="/search.svg" className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            )}

            {!isNotificationDisabled && (
              <div
                className={`h-10 w-10 lg:h-[54px] lg:w-[54px] flex items-center justify-center bg-white/40 rounded-full cursor-pointer ${isSearchVisible ? 'block' : ''
                  }`}
                onClick={toggleNotifications}
              >
                <Image
                  alt="notification icon"
                  width={24}
                  height={24}
                  src="/notification.svg"
                  className="w-5 h-5 lg:w-6 lg:h-6"
                />
              </div>
            )}

            {isNotificationOpen && (
              <NotificationPanel
                notifications={notifications}
                offers={offers}
                onClose={() => setIsNotificationOpen(false)}
              />
            )}

            {/* Cart, Wishlist, Profile Icons */}
            <Link href="/cart">
              <div
                className={`${cartPath ? 'bg-[#393939]' : 'bg-white/40'
                  } h-[54px] p-[15px] rounded-[100px] hidden lg:block`}
              >
                <Image alt="cart icon" width={24} height={24} src={cartPath ? '/cart_white.svg' : '/cart.svg'} />
              </div>
            </Link>
            <Link href="/wishlist">
              <div
                className={` h-10 w-10 lg:h-[54px] lg:w-[54px] flex items-center justify-center rounded-full cursor-pointer  ${wishPath ? 'bg-[#393939]' : 'bg-white/40'
                  } ml-[-10px] lg:ml-0`}
              >
                <Image
                  alt="wishlist icon"
                  width={24}
                  height={24}
                  src={wishPath ? '/wishlist_white.svg' : '/wishlist.svg'}
                  className="w-5 h-5 lg:w-6 lg:h-6"
                />
              </div>
            </Link>
            <Link
              href={`/user_profile/${userID}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(userID);
              }}
            >
              <div
                className={`${iconsPath ? 'bg-[#393939]' : 'bg-white/40'
                  } h-[54px] p-[15px] rounded-[100px] hidden lg:block`}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  alt="profile icon"
                  width={24}
                  height={24}
                  src={iconsPath ? '/profile_white.svg' : '/profile_black.svg'}
                />
              </div>
            </Link>

            <div ref={dropdownRef} className="relative">
              <div onClick={toggleDropdown} className="cursor-pointer hidden lg:block">
                <Image alt="dropdown" width={14} height={14} src="/heade_drop_down.svg" />
              </div>

  
              {isDropdownVisible && (
                <div className="absolute py-[26px] px-[10px] right-0 top-[40px] min-w-[120px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 ">
                  {(session || isLocalToken) ? (
                    <>
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-karla hover:text-pink-500 font-bold">
                        Account
                      </div>
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
                      <Link href="/orderdetails">
                        <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla hover:text-pink-500 font-bold">
                          Purchases
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
                      <Link href="#">
                        <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla hover:text-pink-500 font-bold">
                          Setting
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
        <BottomNavigation />
        <div
          className={`w-full h-screen bg-yellow-500 lg:hidden fixed  px-[20px] py-[20px] top-[-2px] left-0 right-0 bottom-0 z-[1000] transition-transform ease-in-out duration-300 ${hamburger ? 'transform translate-x-0 z-50' : 'transform translate-x-full z-0'
            }`}
        >
          <div className="flex px-[24px] mt-[20px] justify-between">
            <div className="w-[50%] flex items-center gap-1" onClick={handleBack}>
              <Image
                unoptimized
                src="/arrow_left.png"
                width={18}
                height={18}
                alt="back-arrow"
                className="align-middle"
              />
              <p className="font-karla font-bold">Back</p>
            </div>

            {/* Mobile Search Section */}

            <div className="flex items-center justify-evenly gap-[40px]">
              {isMobileSearchVisible ? (
                <div ref={mobileSearchRef} className="relative flex-1 mx-4">
                  <input
                    className="w-full h-10 bg-white rounded-lg px-[50px] outline-none appearance-none"
                    type="text"
                    placeholder="Search an item"
                    autoFocus
                    value={searchValue}
                    onChange={handleInputChange}
                  />
                  <div onClick={toggleSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Image alt="search icon" width={20} height={20} src="/search_button.svg" />
                  </div>

                  {/* Mobile Search Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-bl-lg rounded-br-lg mt-1 z-50">
                      {suggestions.map((suggestion, index) => (
                        <React.Fragment key={index}>
                          <div className="px-4 py-3 cursor-pointer hover:bg-gray-100 font-karla flex justify-between gap-4">
                            <div className="flex gap-4">
                              <Image width={20} height={20} src="/search_button.svg" alt="" />
                              <p className="text-[#070707] text-sm font-normal font-karla leading-snug tracking-tight">
                                {suggestion}
                              </p>
                            </div>
                            <Image width={20} height={20} src="/arrow-up-right.svg" alt="" />
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
                  <Image alt="search icon" width={24} height={24} src="/search.svg" className="w-4 h-4" />
                </div>
              )}

              <Link href="/">
                <div onClick={handleBack}>
                  <Image src="/kuku_logo.svg" width={36} height={41} alt="img" />
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
              <div className={`${isHome ? 'text-white' : 'text-black'
                } text-base font-bold font-karla leading-tight hover:text-pink-500 z-50`}>
                {/* MEN */}
                <MenDropdown isOpen={currentOpenDropdown === 'men'} onToggle={() => handleToggle('men')} />
              </div>
              <div className={`${isHome ? 'text-white' : 'text-black'
                } text-base font-bold font-karla leading-tight hover:text-pink-500 z-40`}>
                {/* WOMEN */}
                <WomenDropdown isOpen={currentOpenDropdown === 'women'} onToggle={() => handleToggle('women')} />
              </div>
              <div className={`${isHome ? 'text-white' : 'text-black'
                } text-base font-bold font-karla leading-tight hover:text-pink-500 z-30`}>
                {/* KIDS */}
                <KidsDropdown isOpen={currentOpenDropdown === 'kids'} onToggle={() => handleToggle('kids')} />
              </div>
              <hr />
              <SettingsDropdown isOpen={currentOpenDropdown === 'setting'} onToggle={() => handleToggle('setting')} />
            </div>
          </div>
          <div className="flex mx-6 mt-5 justify-between">
            <Link href="/cart">
              <div className={`${cartPath ? 'bg-[#393939]' : 'bg-white/40'} h-[54px] p-[15px] rounded-[100px]`}>
                <Image alt="cart icon" width={24} height={24} src={cartPath ? '/cart_white.svg' : '/cart.svg'} />
              </div>
            </Link>
            <Link href="/wishlist">
              <div className={`${wishPath ? 'bg-[#393939]' : 'bg-white/40'} h-[54px] p-[15px] rounded-[100px]`}>
                <Image
                  alt="wishlist icon"
                  width={24}
                  height={24}
                  src={wishPath ? '/wishlist_white.svg' : '/wishlist.svg'}
                />
              </div>
            </Link>
            <Link href="/user_profile">
              <div className={`${iconsPath ? 'bg-[#393939]' : 'bg-white/40'} h-[54px] p-[15px]  rounded-[100px]`}>
                <Image
                  alt="profile icon"
                  width={24}
                  height={24}
                  src={iconsPath ? '/profile_white.svg' : '/profile_black.svg'}
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
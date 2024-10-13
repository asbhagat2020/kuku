
"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import NotificationPanel from './home/NotificationPanel';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const path = usePathname();
  const searchRef = useRef(null);
  // Notifications data
  const notifications = [
    {
      text: "A Seller has posted item for your emergency requirement",
      date: "July 28, 2024 at 07:40 AM",
    },
    {
      text: '"Lulu & Sky - Orange crochet cottage Kurta" Bid placed',
      date: "July 28, 2024 at 07:40 AM",
    },
    {
      text: '"Lulu & Sky - Orange crochet cottage Kurta" Bid placed',
      date: "July 28, 2024 at 07:40 AM",
    },
    {
      text: '"Lulu & Sky - Orange crochet cottage Kurta" Bid placed',
      date: "July 28, 2024 at 07:40 AM",
    },
    {
      text: '"Lulu & Sky - Orange crochet cottage Kurta" Bid placed',
      date: "July 28, 2024 at 07:40 AM",
    },
  ];

  // Offers data
  const offers = [
    {
      text: "Offer received",
      time: "12:02 AM",
      description: "Great news! Someone has made you an offer. Tap here to check it out"
    },
    {
      text: "Offer received",
      time: "12:02 AM",
      description: "Great news! Someone has made you an offer. Tap here to check it out"
    },
  ];

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleNotifications = () => {
    setIsNotificationVisible(!isNotificationVisible);
  };
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const mockSuggestions = [
        'T-shirt',
        'Jacket',
        'Jeans',
        'Shoes',
        'Socks',
      ].filter(item => item.toLowerCase().includes(value.toLowerCase()));

      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Paths where the notification icon should be disabled
  const disabledNotificationPaths = ['/wishlist', '/cart', '/product'];
  const isNotificationDisabled = disabledNotificationPaths.includes(path);

  // Determine background color based on the path
  const isSpecialPath = path === "/listingproduct" || path === "/kukuit" || path === "/renting";
  const iconsPath = path === '/user_profile'
  const wishPath = path === '/wishlist'
  const cartPath = path === '/cart'
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const handleHandburger = () => {
    setHamburger(!hamburger)
  }
  const handleBack = () => {
    setHamburger(!hamburger)
  }
  return (
    <header>
      <div className="max-w-full lg:px-[70px] py-[23px] h-[108px]" style={{ backgroundColor: isSpecialPath ? '#FFF' : '#EDA702' }}>
        <div className='flex justify-between'>
          <div className='flex gap-[60px]'>
            <Link href='/' className="flex gap-[1rem] items-center pl-5">
              <Image src='kuku_logo.svg' width={56} height={61} alt='' className='hidden lg:block' />
              <Image onClick={handleHandburger} src='menu.svg' width={38} height={38} alt='' className='lg:hidden' />
              <h1 className="text-black text-[37px] font-bold font-palanquin_dark leading-[44.40px] hidden lg:block">KUKU</h1>
            </Link>
            <div className={`lg:flex gap-[30px] items-center hidden ${isSearchVisible ? "lg:hidden" : ""}`}>
              <Link href='men' className="text-[#fefae5] text-base font-bold font-karla leading-tight hover:text-pink-500">MEN</Link>
              <Link href='wommen' className="text-[#fefae5] text-base font-bold font-karla leading-tight hover:text-pink-500">WOMEN</Link>
              <Link href='kids' className="text-[#fefae5] text-base font-bold font-karla leading-tight hover:text-pink-500">KIDS</Link>
            </div>
          </div>
          <div className={`lg:hidden pl-10 ${isSearchVisible ? "lg:block hidden" : ""}`}>
            <Image src='kuku_logo.svg' width={56} height={61} alt='' className='' />
          </div>
          <div className="flex gap-[10px] items-center">
            {isSearchVisible ? (
              <div ref={searchRef} className='relative h-[54px] pl-5'>
                <input
                  className='  h-full bg-white rounded-lg px-[50px] outline-none'
                  type="search"
                  placeholder="Search an item"
                  autoFocus
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <div onClick={toggleSearch} className="absolute left-6 top-1/2 transform -translate-y-1/2">
                  <Image alt='search icon' width={24} height={24} src='search_button.svg' />
                </div>

                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-[50%] lg:w-full bg-white border border-gray-300 rounded-bl-lg rounded-br-lg mt-1 z-10">
                    {suggestions.map((suggestion, index) => (
                      <React.Fragment key={index}>
                        <div
                          className="px-4 py-7 cursor-pointer hover:bg-gray-100 font-karla flex justify-between gap-4"
                        >
                          <div className="flex gap-4 ">
                            <Image width={24} height={24} src='search_button.svg' alt='' />
                            <p className="text-[#070707] text-base font-normal font-karla leading-snug tracking-tight">{suggestion}</p>
                          </div>
                          <Image width={24} height={24} src='arrow-up-right.svg' alt='' />
                        </div>

                        {/* Conditionally render the line */}
                        {index !== suggestions.length - 1 && (
                          <div className='w-[95%] mx-auto h-[1px] bg-[#383838]'></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className='h-[54px] p-[15px] bg-[#393939] rounded-[100px] cursor-pointer'
                onClick={toggleSearch}
              >
                <Image alt='search icon' width={24} height={24} src='search.svg' />
              </div>
            )}

            {/* Conditionally render notification icon */}
            {!isNotificationDisabled && (
              <div className={`h-[54px] p-[15px] bg-white/40 rounded-[100px] cursor-pointer ${isSearchVisible ? "lg:block hidden" : ""}`} onClick={toggleNotifications}>
                <Image alt='notification icon' width={24} height={24} src='notification.svg' />
              </div>
            )}

            {/* Cart, Wishlist, Profile Icons */}
            <Link href='/cart'>
              <div className={`${cartPath ? "bg-[#393939]" : "bg-white/40"} h-[54px] p-[15px] rounded-[100px] hidden lg:block`}>
                <Image alt='cart icon' width={24} height={24} src={cartPath ? 'cart_white.svg' : 'cart.svg'} />
              </div></Link>
            <Link href='/wishlist'>
              <div className={`${wishPath ? "bg-[#393939]" : "bg-white/40"} h-[54px] p-[15px] rounded-[100px] hidden lg:block`}>
                <Image alt='wishlist icon' width={24} height={24} src={wishPath ? 'wishlist_white.svg' : 'wishlist.svg'} />
              </div></Link>
            <Link href='/user_profile'>
              <div className={`${iconsPath ? "bg-[#393939]" : "bg-white/40"} h-[54px] p-[15px]  rounded-[100px] hidden lg:block`}>
                <Image alt='profile icon' width={24} height={24} src={iconsPath ? "profile_white.svg" : "profile_black.svg"} />
              </div>
            </Link>
            <div className='relative'>
              <div onClick={toggleDropdown} className='cursor-pointer hidden lg:block'>
                <Image alt='dropdown' width={14} height={14} src='heade_drop_down.svg' />
              </div>

              {isDropdownVisible && (
                <div className="absolute p-[26px] right-0 top-[40px] w-[178px] h-[246px] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {/* Dropdown content goes here */}
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-karla">Account</div>
                  <Link href='/user_profile'>
                  <div className="px-4  pb-2 hover:bg-gray-100 cursor-pointer font-karla">Your Profile</div></Link>
                  <div className="px-4 pb-2  hover:bg-gray-100 cursor-pointer font-karla">Purchases</div>
                  <Link href='/wishlist'>
                  <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla">Wishlist</div></Link>
                  <Link href='/co2'>
                    <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla">Co2 Savings</div>
                  </Link>
                  <div className="px-4 pb-2 hover:bg-gray-100 cursor-pointer font-karla">Address List</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`w-full h-screen bg-yellow-500 lg:hidden fixed  px-[20px] py-[20px] top-[-2px] left-0 right-0 bottom-0 z-[1000] transition-transform ease-in-out duration-300 ${hamburger
            ? "transform translate-x-0 z-50"
            : "transform translate-x-full z-0"
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
              <p className='font-karla font-bold'>Back</p>
            </div>
            <div className="">
              <Image
                src="/kuku_logo.svg"
                width={50}
                height={50}
                alt="img"

              />
            </div>
          </div>
          <div className='mx-6 pt-5'>
            <div className='flex flex-col gap-[30px]'>
              <Link href='men' className="text-black text-base font-bold font-karla leading-tight hover:text-pink-500">MEN</Link>
              <Link href='wommen' className="text-black text-base font-bold font-karla leading-tight hover:text-pink-500">WOMEN</Link>
              <Link href='kids' className="text-black text-base font-bold font-karla leading-tight hover:text-pink-500">KIDS</Link>
            </div>
          </div>
          <div className='flex mx-6 mt-5 justify-between'>
            <Link href='/cart'>
              <div className={`${cartPath ? "bg-[#393939]" : "bg-white/40"} h-[54px] p-[15px] rounded-[100px]`}>
                <Image alt='cart icon' width={24} height={24} src={cartPath ? 'cart_white.svg' : 'cart.svg'} />
              </div></Link>
            <Link href='/wishlist'>
              <div className={`${wishPath ? "bg-[#393939]" : "bg-white/40"} h-[54px] p-[15px] rounded-[100px]`}>
                <Image alt='wishlist icon' width={24} height={24} src={wishPath ? 'wishlist_white.svg' : 'wishlist.svg'} />
              </div></Link>
            <Link href='/user_profile'>
              <div className={`${iconsPath ? "bg-[#393939]" : "bg-white/40"} h-[54px] p-[15px]  rounded-[100px]`}>
                <Image alt='profile icon' width={24} height={24} src={iconsPath ? "profile_white.svg" : "profile_black.svg"} />
              </div>
            </Link>
          </div>
        </div>

        {/* Render NotificationPanel conditionally */}
        {isNotificationVisible && <NotificationPanel notifications={notifications} offers={offers} />}
      </div></header>
  );
};

export default Header;

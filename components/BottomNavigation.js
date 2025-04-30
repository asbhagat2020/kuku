import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Added missing import
import { showSuccessNotification } from '@/utils/Notification/notif';
import { useDispatch, useSelector } from 'react-redux';

export const BottomNavigation = () => {
  const [userID, setUserID] = useState(null); // Initialize properly
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCart = pathname === "/cart";
  const isProfile = pathname.startsWith("/user_profile");


  const details = useSelector((state) => state.auth.user);
  console.log(details);
  const id = details?._id;
    useEffect(() => {
      setUserID(id);
    }, [id]);

  const handleClick = () => {
    const token = Cookies.get("auth");
    if (!token) {
          showSuccessNotification('Please Login!');
    } else if (userID) {
      window.location.href = `/user_profile/${userID}`;
    }
  };

  return (
    <div className="max-w-auto mx-auto fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around lg:hidden z-50">
      {/* Home */}
      <Link href="/">
        <div className="flex flex-col items-center">
          <Image
            src="/kuku_logo.svg"
            width={28}
            height={28}
            alt="Home"
            className={isHome ? "opacity-100" : "opacity-70"}
          />
          <span
            className={`text-xs mt-1 font-karla ${
              isHome
                ? "text-pink-500 font-bold border-b-2 border-pink-500"
                : "text-gray-500"
            }`}
          >
            Home
          </span>
        </div>
      </Link>

      {/* Cart */}
      <Link href="/cart">
        <div className="flex flex-col items-center">
          <div
            className={`${
              isCart ? "bg-[#393939]" : "bg-[#EDA702]/40"
            } h-[35px] w-[35px] flex items-center justify-center rounded-full`}
          >
            <Image
              alt="Cart Icon"
              width={20}
              height={20}
              src={isCart ? "/cart_white.svg" : "/cart.svg"}
            />
          </div>
          <span
            className={`text-xs mt-1 font-karla ${
              isCart
                ? "text-pink-500 font-bold border-b-2 border-pink-500"
                : "text-gray-500"
            }`}
          >
            Cart
          </span>
        </div>
      </Link>

      {/* Profile */}
      <div onClick={handleClick}>
        <div className="flex flex-col items-center cursor-pointer">
          <div
            className={`${
              isProfile ? "bg-[#393939]" : "bg-[#EDA702]/40"
            } h-[35px] w-[35px] flex items-center justify-center rounded-full`}
          >
            <Image
              alt="Profile Icon"
              width={20}
              height={20}
              src={isProfile ? "/profile_white.svg" : "/profile_black.svg"}
            />
          </div>
          <span
            className={`text-xs mt-1 font-karla ${
              isProfile
                ? "text-pink-500 font-bold border-b-2 border-pink-500"
                : "text-gray-500"
            }`}
          >
            Profile
          </span>
        </div>
      </div>
    </div>
  );
};

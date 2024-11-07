import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavigation = () => {
  const pathname = usePathname();
  const iconsPath = pathname === "/user_profile";
  const cartPath = pathname === "/cart";
  const isHome = pathname === "/";

  return (
    <>
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around lg:hidden z-50">
      <Link href="/">
        <div className="flex flex-col items-center">
          <Image
            src="/kuku_logo.svg"
            width={28}
            height={28}
            alt="Home"
            className={`${isHome ? 'opacity-100' : 'opacity-70'}`}
          />
           <span
              className={`text-xs mt-1 font-karla ${
                isHome
                  ? 'text-pink-500 font-bold border-b-2 border-pink-500'
                  : 'text-gray-500'
              }`}
            >
              Home
            </span>
        </div>
      </Link>

      <Link href="/cart">
        <div className="flex flex-col items-center">
          <div className={`${cartPath ? "bg-[#393939]" : "bg-[#EDA702]/40"} h-[35px] w-[35px] flex items-center justify-center rounded-full`}>
            <Image
              alt="cart icon"
              width={20}
              height={20}
              src={cartPath ? "cart_white.svg" : "cart.svg"}
            />
          </div>
          <span className={`text-xs mt-1 font-karla ${cartPath ? 'text-pink-500 font-bold border-b-2 border-pink-500' : 'text-gray-500'}`}>
            Cart
          </span>
        </div>
      </Link>
      
      <Link href="/user_profile">
        <div className="flex flex-col items-center">
          <div className={`${iconsPath ? "bg-[#393939]" : "bg-[#EDA702]/40"} h-[35px] w-[35px] flex items-center justify-center rounded-full`}>
            <Image
              alt="profile icon"
              width={20}
              height={20}
              src={iconsPath ? "profile_white.svg" : "profile_black.svg"}
            />
          </div>
          <span className={`text-xs mt-1 font-karla ${iconsPath ? 'text-pink-500 font-bold border-b-2 border-pink-500' : 'text-gray-500'}`}>
            Profile
          </span>
        </div>
      </Link>
    </div>
    </>
  );
};



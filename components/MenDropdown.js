import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const categories = [
  {
    title: "Tops",
    items: [
      "T-Shirts",
      "Shirt",
      "Polo Shirts",
      "Tank Tops",
    ],
  },
  {
    title: "Bottoms",
    items: [
      "Pants",
      "Sweatpants",
      "Shorts",
      "Cargo Pants",
      "Joggers",
    ],
  },
  {
    title: "Suits",
    items: [
      "Suits",
      "Suit Pants",
      "Blazers",
      "Waist Coats",
      "Tuxedos",
    ],
  },
  {
    title: "Co-Ords",
    items: ["Hoodie and Sweatshirts","Tees","Shirts",
    ],
  },
  {
    title: "Outerwear",
    items: [
      "Jackets",
      "Coats",
      "Winter coats",
      "Overcoats",
      "Down Coats",
      "Trench Coats",
      "Vests",
      "Shackets",
      "Faux Fur Coats"
    ],
  },
  {
    title: "Swimwear",
    items: ["Beach Shorts", "Swim Shorts", "Swim One Pieces", "Rash Guards","Beach Sets"],
  },
  {
    title: "Denim",
    items: ["Jeans","Denim Jackets"," Denim Shirts","Denim Co-Ords",
      "Denim Jumpsuits and Overalls"
    ],
  },
  {
    title: "Sweaters",
    items: ["Pullovers","Knit Tops","Sweater Vests","Cardigans","Sweater Co-Ords"
    ],
  },
  {
    title: "Hoodies & Sweatshirts",
    items: [
    ],
  },
  {
    title: "Sleepwear",
    items: [
    ],
  },
];

export default function MenDropdown({ isOpen, onToggle }) {
  const [isMenHovered, setIsMenHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const path = usePathname();

  const isHome = path === "/";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden relative">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500"
        >
          <span className="font-bold">MEN</span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {isOpen && (
          <div className="w-full bg-white shadow-lg overflow-y-auto">
            <style jsx>{`
              .thin-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #e5e7eb transparent;
              }
              .thin-scrollbar::-webkit-scrollbar {
                width: 2px;
              }
              .thin-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb {
                background-color: #e5e7eb;
                border-radius: 20px;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #d1d5db;
              }
            `}</style>
            {categories.map((category) => (
              <div
                key={category.title}
                className="border-t border-gray-100"
              >
                <button
                  onClick={() =>
                    setOpenCategory(
                      openCategory === category.title ? null : category.title
                    )
                  }
                  className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gray-50"
                >
                  <span className="text-sm font-medium">{category.title}</span>
                  <ChevronRight
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      openCategory === category.title ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {openCategory === category.title && (
                  <div className="bg-gray-50 px-4 py-2">
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item}>
                          <Link
                            href="#"
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-pink-500"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Desktop View */}
      <div
        className="hidden lg:block relative z-50 group lg:z-40"
        onMouseEnter={() => setIsMenHovered(true)}
        onMouseLeave={() => setIsMenHovered(false)}
      >
        <div className="relative lg">
          <Link
            href="#"
            className={`${
              isHome ? "text-[#fefae5]" : "text-black"
            } text-base font-bold font-karla leading-tight hover:text-pink-500`}
          >
            MEN
          </Link>
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
              isMenHovered ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        <div className="absolute h-8 w-full" />

        {isMenHovered && (
          <div className="absolute lg:left-[-150px] lg:top-full w-max bg-white shadow-lg p-4 z-10 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
            <style jsx>{`
              .thin-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #e5e7eb transparent;
              }
              .thin-scrollbar::-webkit-scrollbar {
                width: 2px;
              }
              .thin-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb {
                background-color: #e5e7eb;
                border-radius: 20px;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #d1d5db;
              }
            `}</style>
            {categories.map((category) => (
              <div key={category.title}>
                <h4 className="font-bold text-pink-500 mb-4 text-base">
                  {category.title}
                </h4>
                <ul className="space-y-2 text-sm">
                  {category.items.map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-gray-600 hover:text-pink-500">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
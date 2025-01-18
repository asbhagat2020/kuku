import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
  {
    title: "New Born",
    items: [
      "0-9 Months"
    ],
  },
  {
    title: "Baby Boys",
    items: [
      "0-3 Years"
    ],
  },
  {
    title: "Baby Girls",
    items: [
      "0-3 Years"
    ],
  },
  {
    title: "Young Boys",
    items: [
      "3-7 Years"
    ],
  },
  {
    title: "Young Girls",
    items: [
      "3-7 Years"
    ],
  },
  {
    title: "Tween Boys",
    items: [
      "8-12 Years"
    ],
  },
  {
    title: "Tween Girls",
    items: [
      "8-12 Years"
    ],
  },
  {
    title: "Teen Boys",
    items: [
      "13-16 Years"
    ],
  },
  {
    title: "Teen Girls",
    items: [
      "13-16 Years"
    ],
  },

];

export default function KidsDropdown({ isOpen, onToggle }) {
  const [isKidsHovered, setIsKidsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Handle SSR mismatch
  // const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const path = usePathname();

  const isHome = path === "/";
  // Ensure the component only renders interactive content on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

   // Close the dropdown when clicking outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle(false); // Close the dropdown
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onToggle]);


  if (!isMounted) return null; // Prevent SSR-client mismatch

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden relative z-50">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full p-4 text-black hover:text-pink-500"
        >
          <span className="font-bold z-40">KIDS</span>
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
              <div key={category.title} className="border-t border-gray-100">
                <button
                  onClick={() => setOpenCategory(openCategory === category.title ? null : category.title)}
                  className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gray-50"
                >
                  <span className="text-sm font-medium">{category.title}</span>
                  <ChevronRight
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      openCategory === category.title ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {openCategory === category.title && (
                  <div className="bg-gray-50 px-4 py-2">
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-pink-500"
                          >
                            {item}
                          </a>
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
        onMouseEnter={() => setIsKidsHovered(true)}
        onMouseLeave={() => setIsKidsHovered(false)}
      >
        <div className="relative lg">
          <a href="#" className={`${
                  isHome ? "text-[#fefae5]" : "text-black"
                } text-base font-bold font-karla leading-tight hover:text-pink-500`}>
          KIDS
          </a>
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
              isKidsHovered ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </div>

        <div className="absolute h-8 w-full" />

        {isKidsHovered && (
          <div className="absolute lg:left-[-300px] lg:top-full w-max bg-white shadow-lg p-4 z-50 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
            <style jsx>{`
              .thin-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #E5E7EB transparent;
              }
              .thin-scrollbar::-webkit-scrollbar {
                width: 2px;
              }
              .thin-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb {
                background-color: #E5E7EB;
                border-radius: 20px;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #D1D5DB;
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
                      <a href="#" className="text-gray-600 hover:text-pink-500">
                        {item}
                      </a>
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

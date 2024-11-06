import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";


const categories = [
  {
    title: "Tops",
    items: [
      "T-Shirts",
      "Blouses",
      "Tank Tops",
      "Sweaters",
      "Hoodies",
      "Tunics",
      "Crop Tops",
    ],
  },
  {
    title: "Bottoms",
    items: [
      "Jeans",
      "Leggings",
      "Trousers",
      "Skirts",
      "Shorts",
      "Palazzo Pants",
      "Culottes",
    ],
  },
  {
    title: "Dresses",
    items: [
      "Casual Dresses",
      "Formal Dresses",
      "Maxi Dresses",
      "Midi Dresses",
      "Mini Dresses",
      "Wrap Dresses",
      "Bodycon Dresses",
    ],
  },
  {
    title: "Outerwear",
    items: [
      "Jackets",
      "Coats",
      "Blazers",
      "Parkas",
      "Cardigans",
      "Ponchos",
      "Vests",
    ],
  },
  {
    title: "Activewear",
    items: [
      "Yoga Pants",
      "Sports Bras",
      "Athletic Shorts",
      "Workout Leggings",
      "Running Tops",
      "Athletic Jackets",
    ],
  },
  {
    title: "Footwear",
    items: [
      "Sneakers",
      "Sandals",
      "Boots",
      "Flats",
      "Heels",
      "Wedges",
      "Espadrilles",
    ],
  },
  {
    title: "Maternity Wear",
    items: [
      "Maternity Dresses",
      "Maternity Jeans",
      "Maternity Tops",
      "Maternity Activewear",
      "Maternity Outerwear",
      "Nursing Bras",
    ],
  },
  {
    title: "Plus-Size Clothing",
    items: [
      "Plus-Size Tops",
      "Plus-Size Bottoms",
      "Plus-Size Dresses",
      "Plus-Size Lingerie",
      "Plus-Size Activewear",
      "Plus-Size Outerwear",
    ],
  },
  {
    title: "Special Occasion Wear",
    items: [
      "Evening Gowns",
      "Cocktail Dresses",
      "Ballgowns",
      "Wedding Dresses",
      "Bridesmaid Dresses",
      "Prom Dresses",
    ],
  },
  {
    title: "Workwear",
    items: [
      "Business Suits",
      "Blouses",
      "Pencil Skirts",
      "Dress Pants",
      "Blazer Jackets",
      "Work Dresses",
    ],
  },
  {
    title: "Ethnic and Cultural Attire",
    items: [
      "Sari",
      "Kimono",
      "Abaya",
      "Cheongsam",
      "Dashiki",
      "Hanbok",
      "Dirndl",
    ],
  },
];



export default function WomenDropdown() {
  const [isWomenHovered, setIsWomenHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Prevent SSR mismatch
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const path = usePathname();

  const isHome = path === "/";

  // Ensure the component only renders fully on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid rendering on the server

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden relative z-50">
        <button
          onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
          className="flex items-center justify-between w-full p-4 text-[#fefae5] hover:text-pink-500 z-0"
        >
          <span className="font-bold ">WOMEN</span>
          {isMainMenuOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {isMainMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg max-h-[70vh] overflow-y-auto thin-scrollbar">
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
        onMouseEnter={() => setIsWomenHovered(true)}
        onMouseLeave={() => setIsWomenHovered(false)}
      >
        <div className="relative lg:py-[33px]">
          <a href="#" className={`${
                  isHome ? "text-[#fefae5]" : "text-black"
                } text-base font-bold font-karla leading-tight hover:text-pink-500`}>
          WOMEN
          </a>
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
              isWomenHovered ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </div>

        <div className="absolute h-8 w-full" />

        {isWomenHovered && (
          <div className="absolute lg:left-[-200px] lg:top-full w-max bg-white shadow-lg p-4 z-10 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
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

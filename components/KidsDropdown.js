import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
  {
    title: "Baby Clothing",
    items: [
      "Onesies",
      "Rompers",
      "Baby Sleepers",
      "Baby Bodysuits",
      "Baby T-Shirts",
      "Diaper Covers",
    ],
  },
  {
    title: "Tops",
    items: [
      "T-Shirts",
      "Blouses",
      "Polos",
      "Sweaters",
      "Hoodies",
      "Tank Tops",
    ],
  },
  {
    title: "Bottoms",
    items: [
      "Pants",
      "Leggings",
      "Jeans",
      "Shorts",
      "Skirts",
      "Overalls",
    ],
  },
  {
    title: "Dresses",
    items: [
      "Casual Dresses",
      "Formal Dresses",
      "Sundresses",
      "Party Dresses",
      "Maxi Dresses",
    ],
  },
  {
    title: "Outerwear",
    items: [
      "Jackets",
      "Coats",
      "Snowsuits",
      "Raincoats",
      "Vests",
      "Fleece Jackets",
    ],
  },
  {
    title: "Activewear",
    items: [
      "Athletic Shorts",
      "Sports Jerseys",
      "Tracksuits",
      "Sports Bras",
      "Gym Leggings",
      "Athletic T-Shirts",
    ],
  },
  {
    title: "Sleepwear",
    items: [
      "Pajama Sets",
      "Sleep Gowns",
      "Sleep Shirts",
      "Sleep Pants",
      "Robes",
      "Onesies",
    ],
  },
  {
    title: "Swimwear",
    items: [
      "Swim Trunks",
      "Swimsuits",
      "Rash Guards",
      "Swim Diapers",
      "Cover-Ups",
    ],
  },
  {
    title: "Underwear",
    items: [
      "Underwear Sets",
      "Briefs",
      "Boxer Briefs",
      "Training Pants",
      "Camisoles",
      "Undershirts",
    ],
  },
  {
    title: "Footwear",
    items: [
      "Baby Booties",
      "Infant Shoes",
      "Sneakers",
      "Sandals",
      "Slippers",
    ],
  },
  {
    title: "School Uniforms",
    items: [
      "Polo Shirts",
      "Dress Shirts",
      "Dress Pants",
      "Skirts",
      "Blazers",
      "Ties",
    ],
  },
  {
    title: "Special Occasion Wear",
    items: [
      "Flower Girl Dresses",
      "Boys' Suits",
      "Christening Gowns",
      "Communion Dresses",
      "Holiday Outfits",
    ],
  },
  {
    title: "Toddler and Infant",
    items: [
      "Toddler Suits",
      "Toddler Dresses",
      "Toddler T-Shirts",
      "Baby Sets",
      "Baby Pajamas",
    ],
  },
  {
    title: "Ethnic and Cultural Attire",
    items: [
      "Traditional Cultural Outfits",
      "Ethnic Dresses",
      "Cultural Accessories",
      "Baby Sets",
      "Baby Pajamas",
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
        onMouseEnter={() => setIsKidsHovered(true)}
        onMouseLeave={() => setIsKidsHovered(false)}
      >
        <div className="relative lg:py-[33px]">
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

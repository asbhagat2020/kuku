import { useEffect, useState } from "react";

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

  // Ensure the component only renders fully on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid rendering on the server

  return (
    <div
      className="relative lg:z-50 group md:z-40"
      onMouseEnter={() => setIsWomenHovered(true)}
      onMouseLeave={() => setIsWomenHovered(false)}
    >
      {/* Navigation Link with Underline Effect */}
      <div className="relative lg:py-[33px]">
        <a href="#" className="text-[#fefae5] hover:text-pink-500">
          WOMEN
        </a>
        {/* Underline effect */}
        <div
          className={`absolute bottom-0 left-0 lg:w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
            isWomenHovered ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>

      {/* Invisible bridge to prevent hover gap */}
      <div className="absolute h-8 w-full" />

      {/* Dropdown Menu */}
      {isWomenHovered && (
        <div className="absolute lg:left-[-210px] top-full w-max bg-white shadow-lg p-4 z-10 max-h-60 md:max-h-80 lg:max-h-[25rem] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 thin-scrollbar">
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
              <h4 className="font-bold text-pink-500 mb-4 text-sm sm:text-base">
                {category.title}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
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
  );
}

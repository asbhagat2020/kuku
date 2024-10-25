import { useState } from "react";

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

  return (
    <div
      className="relative z-50"
      onMouseEnter={() => setIsWomenHovered(true)}
      onMouseLeave={() => setIsWomenHovered(false)}
    >
      <a href="#" className="text-[#fefae5] hover:text-pink-500 z-500">
        WOMEN
      </a>
      {/* Dropdown Menu */}
      {isWomenHovered && (
        <div className="absolute left-0 mt-0 w-max bg-white shadow-lg border border-gray-200 p-4 z-10 max-h-60 md:max-h-80 lg:max-h-[32rem] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.title}>
              <h4 className="font-bold text-pink-500 mb-4 text-sm sm:text-base">{category.title}</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {category.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[#3F3F3F] hover:text-pink-500">{item}</a>
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

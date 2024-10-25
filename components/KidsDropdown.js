import { useState } from "react";

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
    title: "Toddler and Infant Clothing",
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

export default function KidsDropdown() {
  const [isKidsHovered, setIsKidsHovered] = useState(false);

  return (
    <div 
      className="relative z-50"
      onMouseEnter={() => setIsKidsHovered(true)}
      onMouseLeave={() => setIsKidsHovered(false)}
    >
      <a href="#" className="text-[#fefae5] hover:text-pink-500 z-500">KIDS</a>
      {/* Dropdown Menu */}
      {isKidsHovered && (
        <div className="absolute left-0 mt-0 w-max bg-white shadow-lg border border-gray-200 p-4 z-0 max-h-60 md:max-h-80 lg:max-h-[32rem] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

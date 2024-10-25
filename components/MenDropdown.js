import { useState } from "react";

const categories = [
  {
    title: "Tops",
    items: [
      "T-Shirts",
      "Dress Shirts",
      "Polo Shirts",
      "Henley Shirts",
      "Casual Button-Up Shirts",
      "Sweaters",
      "Hoodies",
    ],
  },
  {
    title: "Bottoms",
    items: [
      "Jeans",
      "Trousers",
      "Chinos",
      "Shorts",
      "Cargo Pants",
      "Sweatpants",
      "Joggers",
    ],
  },
  {
    title: "Suits and Formal Wear",
    items: [
      "Business Suits",
      "Tuxedos",
      "Blazers",
      "Dress Pants",
      "Waistcoats",
      "Dress Shirts",
    ],
  },
  {
    title: "Outerwear",
    items: [
      "Jackets",
      "Coats",
      "Overcoats",
      "Parkas",
      "Pea Coats",
      "Bomber Jackets",
      "Leather Jackets",
    ],
  },
  {
    title: "Activewear",
    items: [
      "Athletic Shorts",
      "Athletic T-Shirts",
      "Track Pants",
      "Running Shorts",
      "Performance Hoodies",
      "Sports Jerseys",
      "Compression Gear",
    ],
  },
  {
    title: "Underwear",
    items: [
      "Boxer Briefs",
      "Boxers",
      "Briefs",
      "Trunks",
      "Thermal Underwear",
      "Undershirts",
      "Long Johns",
    ],
  },
  {
    title: "Sleepwear",
    items: [
      "Pajama Sets",
      "Sleep Shorts",
      "Sleep Pants",
      "Robes",
      "Lounge Pants",
      "Onesies",
    ],
  },
  {
    title: "Swimwear",
    items: [
      "Swim Trunks",
      "Board Shorts",
      "Swim Briefs",
      "Rash Guards",
    ],
  },
  {
    title: "Footwear",
    items: [
      "Sneakers",
      "Dress Shoes",
      "Casual Shoes",
      "Boots",
      "Loafers",
      "Sandals",
      "Slippers",
    ],
  },
  {
    title: "Workwear",
    items: [
      "Dress Shirts",
      "Dress Pants",
      "Business Suits",
      "Ties",
      "Work Boots",
      "Safety Gear",
    ],
  },
  {
    title: "Casual Wear",
    items: [
      "Graphic T-Shirts",
      "Cargo Shorts",
      "Denim Jackets",
      "Flannel Shirts",
      "Casual Sneakers",
      "Baseball Caps",
    ],
  },
  {
    title: "Outdoor and Adventure Clothing",
    items: [
      "Hiking Pants",
      "Outdoor Jackets",
      "Performance Fleece",
      "Waterproof Boots",
      "Camping Gear",
    ],
  },
  {
    title: "Ethnic and Cultural Attire",
    items: [
      "Kimono",
      "Dashiki",
      "Kilt",
      "Sherwani",
      "Thobe",
      "Djellaba",
      "Lederhosen",
    ],
  },
];

export default function MenDropdown() {
    const [isMenHovered, setIsMenHovered] = useState(false);
  
    return (
      <div
        className="relative z-70"
        onMouseEnter={() => setIsMenHovered(true)}
        onMouseLeave={() => setIsMenHovered(false)}
      >
        <a href="#" className="text-[#fefae5] hover:text-pink-500">MEN</a>
        {/* Dropdown Menu */}
        {isMenHovered && (
          <div className="absolute left-0 mt-0 w-max lg:w-[800px] bg-white shadow-lg border border-gray-200 p-4 z-10 max-h-60 lg:max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  

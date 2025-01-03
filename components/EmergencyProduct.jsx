"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Yellow Blue Top",
    size: "XS",
    reqDate: "24/07/2024",
    postedBy: "Moksha Pratap",
    category: "Women",
    color: "Dark Blue",
    location: "Dubai",
    description:
      "Dark Blue top of any brand with the specified size required urgently before 24th of August, 2024",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
    ],
  },
  {
    id: 2,
    title: "Dark Blue Top",
    size: "XS",
    reqDate: "24/07/2024",
    postedBy: "Moksha Pratap",
    category: "Women",
    color: "Dark Blue",
    location: "Dubai",
    description:
      "Dark Blue top of any brand with the specified size required urgently before 24th of August, 2024",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
    ],
  },
  {
    id: 3,
    title: "Dark Blue Top",
    size: "XS",
    reqDate: "24/07/2024",
    postedBy: "Moksha Pratap",
    category: "Women",
    color: "Dark Blue",
    location: "Dubai",
    description:
      "Dark Blue top of any brand with the specified size required urgently before 24th of August, 2024",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
    ],
  },
  {
    id: 4,
    title: "Dark Blue Top",
    size: "XS",
    reqDate: "24/07/2024",
    postedBy: "Moksha Pratap",
    category: "Women",
    color: "Dark Blue",
    location: "Dubai",
    description:
      "Dark Blue top of any brand with the specified size required urgently before 24th of August, 2024",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=300&h=300",
    ],
  },
];

export default function EmergencyProduct() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-white">
        {/* Pink Hyperbola Header */}
        <div className="relative w-full h-[200px] bg-[#E6007E] overflow-hidden">
          <div className="absolute bottom-0 w-full">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-[190px]"
              preserveAspectRatio="none"
            >
              <path
                fill="white"
                d="M0,64 C288,89.3 576,97.3 720,89 C864,80.7 1152,55.7 1440,48L1440 120L0 120Z"
              />
            </svg>
          </div>
          <div className="absolute top-6 left-6 text-white text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
            Urgent Outfit Needed?
          </div>
          <img
            src="/yellow-bird.png"
            alt="Yellow Bird"
            className="absolute right-24 w-12 h-12 hidden md:block"
            style={{
              marginRight: "450px",
              marginTop: "86px",
            }}
          />

          <div
            className="absolute top-16 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
            style={{
              marginTop: "25px",
              marginRight: "300px",
            }}
          >
            <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-6xl mx-auto px-8 py-12">
          <button
            onClick={() => setSelectedProduct(null)}
            className="mb-8 text-gray-600 hover:text-gray-800"
          >
            ← Back to listings
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <h2 className="text-xl font-karla font-semibold mb-4">
                Item Image References
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {selectedProduct.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg overflow-hidden bg-gray-100"
                  >
                    <img
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div>
              <h2 className="text-xl font-karla font-semibold mb-6">
                Add Info
              </h2>
              <div className="space-y-4">
                <InfoRow label="Category" value={selectedProduct.category} />
                <InfoRow label="Color" value={selectedProduct.color} />
                <InfoRow label="Size" value={selectedProduct.size} />
                <InfoRow label="Location" value={selectedProduct.location} />
                <InfoRow
                  label="Required within"
                  value={selectedProduct.reqDate}
                />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-karla font-semibold mb-4">
                  Description
                </h2>
                <p className="text-gray-600">{selectedProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Pink Hyperbola Header */}
      <div className="relative w-full h-[200px] bg-[#E6007E] overflow-hidden">
        <div className="absolute bottom-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[190px]"
            preserveAspectRatio="none"
          >
            <path
              fill="white"
              d="M0,64 C288,89.3 576,97.3 720,89 C864,80.7 1152,55.7 1440,48L1440 120L0 120Z"
            />
          </svg>
        </div>
        <div className="absolute top-6 left-6 text-white text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
          Urgent Outfit Needed?
        </div>
        <img
          src="/yellow-bird.png"
          alt="Yellow Bird"
          className="absolute right-24 w-12 h-12 hidden md:block"
          style={{
            marginRight: "450px",
            marginTop: "86px",
          }}
        />
        <div
          className="absolute top-16 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
          style={{
            marginTop: "25px",
            marginRight: "300px",
          }}
        >
          <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto -mt-18 px-4 relative z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-yellow-50 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-600">Size: {product.size}</p>
                  <p className="text-sm text-gray-600">
                    Req within: {product.reqDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-pink-600">
                    Requirement Posted by:
                  </p>
                  <p className="text-sm">{product.postedBy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

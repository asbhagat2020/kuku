import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const AddModal = ({ isOpen, onClose, title }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");

  // Static product options (replace this with dynamic data from API later)
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ];

  if (!isOpen) return null;

  const handleRating = (value, isHalf) => {
    if (isHalf) {
      setRating(value - 0.5);
    } else {
      if (Math.ceil(rating) === value) {
        setRating(value - 0.5);
      } else {
        setRating(value);
      }
    }
  };

  const handleMouseMove = (e, value) => {
    const star = e.currentTarget;
    const rect = star.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    setHoverRating(isHalf ? value - 0.5 : value);
  };

  const renderStar = (index) => {
    const activeRating = hoverRating || rating;
    
    if (activeRating >= index) {
      return <FaStar className="text-yellow-500 w-8 h-8" />;
    } else if (activeRating >= index - 0.5) {
      return <FaStarHalfAlt className="text-yellow-500 w-8 h-8" />;
    } else {
      return <FaRegStar className="text-gray-300 w-8 h-8" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-0 mt-8 sm:mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
        <form className="space-y-4">
          {/* Product Name Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="productName">
              Product Name
            </label>
            <select
              id="productName"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Comments Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="comments">
              Comments
            </label>
            <textarea
              id="comments"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter comments"
              rows="4"
            ></textarea>
          </div>

          {/* Product Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="productImage">
              Product Image
            </label>
            <input
              id="productImage"
              type="file"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
          </div>

          {/* Rating Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <div
                  key={value}
                  className="cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const isHalf = e.clientX - rect.left < rect.width / 2;
                    handleRating(value, isHalf);
                  }}
                  onMouseMove={(e) => handleMouseMove(e, value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {renderStar(value)}
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full" />
                    <div className="w-1/2 h-full" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 mt-1">Selected Rating: {rating.toFixed(1)}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;

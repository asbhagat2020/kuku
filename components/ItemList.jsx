"use client";

import React, { useState } from "react";
import Link from 'next/link';

const ItemList = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    brand: "",
    size: "",
    usage: "",
    price: "",
    damages: "",
    rentOption: "",
    images: [],
  });

  const [successPopup, setSuccessPopup] = useState(false); // Added state for success popup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...formData.images];
      newImages[index] = file;
      setFormData({ ...formData, images: newImages });
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure all required fields and at least one image are uploaded
    if (formData.images.length > 0 && formData.itemName) {
      // Simulate form submission logic
      setSuccessPopup(true);

      // Optionally reset the form
      setFormData({
        itemName: "",
        description: "",
        category: "",
        brand: "",
        size: "",
        usage: "",
        price: "",
        damages: "",
        rentOption: "",
        images: [],
      });

      // Hide the success popup after a few seconds
      setTimeout(() => setSuccessPopup(false), 5000); // Popup hides after 5 seconds
    } else {
      alert("Please fill out all required fields and upload at least one image.");
    }
  };

  return (
    <div className="max-w-[800px] bg-white rounded-3xl shadow-md border-4 border-black mx-auto overflow-hidden mt-10">
      {/* Success Popup */}
      {successPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
            <img
              src="/ChechkNotfi.png" // The tick icon from your image (replace with actual path)
              alt="Check Notification"
              className="w-14 h-14 mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold text-black">
              Your product listing request has been successfully received
            </h2>
            <p className="text-gray-500 mt-2">
              Post the approval from our QC team, your product will be visible to other users.
            </p>
          </div>
        </div>
      )}
      {/* Form Header */}
      <div
        className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
        style={{
          backgroundImage: `url('/pink-header.png')`,
          clipPath: "ellipse(70% 100% at 50% 0%)",
        }}
      >
        <div className="text-[#e6e6e6] text-[46px] font-normal font-['Luckiest Guy'] leading-[55.20px]">
          LIST YOUR ITEM
        </div>
        <img
          src="/yellow-bird.png"
          alt="Yellow Bird"
          className="absolute top-6 right-24 w-12 h-12"
          style={{ marginTop: "53px", marginRight: "30px" }}
        />
        <div
          className="absolute top-6 right-6 w-10 h-10 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px]" // Added padding to accommodate the border
          style={{ marginTop: "63px" }}
        >
          <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-black"></div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 md:px-16 lg:px-20 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Images */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Images
            </label>
            <div className="flex space-x-9">
              {Array(4)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 border border-[#E4086F] flex items-center justify-center rounded-lg overflow-hidden"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, idx)}
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                    {formData.images[idx] ? (
                      <>
                        <img
                          src={URL.createObjectURL(formData.images[idx])}
                          alt={`Uploaded ${idx + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
                          aria-label="Remove Image"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <img
                        src="/upload.png"
                        alt="Upload Icon"
                        className="w-10 h-10"
                      />
                    )}
                  </div>
                ))}
            </div>
            <a href="/tips" className="text-[#E4086F] mt-2 underline">
              Read our video and photo tips
            </a>
          </div>

          {/* Product Title */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Title
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Enter your product title"
              className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter your product description"
              className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
              rows={4}
            />
          </div>

          {/* Product Category */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter Product Category"
              className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
            />
          </div>

          {/* Product Brand */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Brand
            </label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
            >
              <option value="">Select Brand</option>
              {/* Add more options as needed */}
              <option value="Brand A">Brand A</option>
              <option value="Brand B">Brand B</option>
              <option value="Brand C">Brand C</option>
            </select>
          </div>

          {/* Product Size */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Size
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
            >
              <option value="">Choose Product Size</option>
              {/* Add more options as needed */}
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          {/* Usage */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Usage
            </label>
            <select
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
            >
              <option value="">Choose Usage Level</option>
              {/* Add more options as needed */}
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="Heavy">Heavy</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter Product Price"
              className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
            />
          </div>

          {/* Damages */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Damages
            </label>
            <textarea
              name="damages"
              value={formData.damages}
              onChange={handleChange}
              placeholder="Mention Damages"
              className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
              rows={4}
            />
          </div>

          {/* Open to Rent */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Open to Rent
            </label>
            <select
              name="rentOption"
              value={formData.rentOption}
              onChange={handleChange}
              className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
            >
              <option value="">Choose One</option>
              {/* Add more options as needed */}
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <p className="text-gray-500 mt-1 text-left max-w-[500px]">
            Renting option is available only when the price of the product is
            above <span className="text-[#E4086F]">300 AED</span>
          </p>

          {/* Buttons */}
          <div className="flex space-x-8 mt-6 justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#E4086F] text-yellow-400 text-lg font-semibold hover:bg-[#d4076e] transition-colors"
              style={{ borderRadius: "22px" }}
            >
              List Now
            </button>
            <Link href="/">
            <button
              type="button"
              className="px-8 py-3 border border-[#E4086F] text-[#E4086F] text-lg font-semibold hover:bg-[#fce4f4] transition-colors"
              style={{ borderRadius: "22px" }}
            >
              Cancel
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemList;

"use client";

import React, { useState } from "react";
import Link from "next/link";

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

  const [errors, setErrors] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for this field when it's changed
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

      // Check if the file type is a valid image type
      if (validImageTypes.includes(file.type)) {
        const newImages = [...formData.images];
        newImages[index] = file;
        setFormData({ ...formData, images: newImages });
        setErrors({ ...errors, images: "" });
      } else {
        // If the file is not an image, set an error message
        setErrors({
          ...errors,
          images: "Only image files (JPEG, PNG) are allowed.",
        });
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.itemName.trim())
      newErrors.itemName = "Product title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.size) newErrors.size = "Size is required";
    if (!formData.usage) newErrors.usage = "Usage is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.rentOption) newErrors.rentOption = "Rent option is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessPopup(true);
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
      setTimeout(() => setSuccessPopup(false), 5000);
    }
  };

  return (
    <div className="max-w-[800px] bg-white rounded-3xl shadow-md border-4 border-black mx-auto overflow-hidden mt-10">
      {successPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
            <img
              src="/ChechkNotfi.png"
              alt="Check Notification"
              className="w-14 h-14 mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold text-black">
              Your product listing request has been successfully received
            </h2>
            <p className="text-gray-500 mt-2">
              Post the approval from our QC team, your product will be visible
              to other users.
            </p>
          </div>
        </div>
      )}
      <div
        className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
        style={{
          backgroundImage: `url('/pink-header.png')`,
          clipPath: "ellipse(90% 100% at 50% 0%)",
        }}
      >
        <div className="text-[#e6e6e6] text-[46px] font-luckiest leading-[55.20px]">
          LIST YOUR ITEM
        </div>

        <img
  src="/yellow-bird.png"
  alt="Yellow Bird"
  className="absolute top-6 right-24 w-12 h-12 hidden md:block" // Hidden on mobile, shown on desktop
  style={{ marginTop: "53px", marginRight: "30px" }}
/>
<div
  className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex" // Hidden on mobile, shown on desktop
  style={{ marginTop: "63px" }}
>
  <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
</div>

      </div>

      <div className="px-6 md:px-16 lg:px-20 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="relative w-24 h-24 border border-[#E4086F] flex items-center justify-center  overflow-hidden"
                  >
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg" // Only accept image files
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
                        className="w-8 h-8"
                      />
                    )}
                  </div>
                ))}
            </div>
            {errors.images && (
              <p className="text-red-500 mt-1">{errors.images}</p>
            )}
            <a href="/tips" className="text-[#E4086F] mt-2 underline">
              Read our video and photo tips
            </a>
          </div>

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
              className={`w-full p-2 border ${
                errors.itemName ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
              required
            />
            {errors.itemName && (
              <p className="text-red-500 mt-1">{errors.itemName}</p>
            )}
          </div>

          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter your product description"
              className={`w-full p-2 border ${
                errors.description ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

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
              className={`w-full p-2 border ${
                errors.category ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
            />
            {errors.category && (
              <p className="text-red-500 mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Brand
            </label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.brand ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
            >
              <option value="">Select Brand</option>
              <option value="Brand A">Brand A</option>
              <option value="Brand B">Brand B</option>
              <option value="Brand C">Brand C</option>
            </select>
            {errors.brand && (
              <p className="text-red-500 mt-1">{errors.brand}</p>
            )}
          </div>

          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Size
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.size ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
            >
              <option value="">Choose Product Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
            {errors.size && <p className="text-red-500 mt-1">{errors.size}</p>}
          </div>

          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Usage
            </label>
            <select
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.usage ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
            >
              <option value="">Choose Usage Level</option>
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="Heavy">Heavy</option>
            </select>
            {errors.usage && (
              <p className="text-red-500 mt-1">{errors.usage}</p>
            )}
          </div>

          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Price
            </label>
            <input
              type="number" // Change the type to 'number'
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter Product Price"
              className={`w-full p-2 border ${
                errors.price ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
              min="0" // Prevent negative numbers
              step="0.01" // Allow decimal values if necessary
              onKeyDown={(e) => {
                if (e.key === "e" || e.key === "+" || e.key === "-") {
                  e.preventDefault(); // Disable 'e', '+' and '-' to avoid invalid input
                }
              }}
            />
            {errors.price && (
              <p className="text-red-500 mt-1">{errors.price}</p>
            )}
          </div>

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

          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Open to Rent
            </label>
            <select
              name="rentOption"
              value={formData.rentOption}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.rentOption ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
            >
              <option value="">Choose One</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.rentOption && (
              <p className="text-red-500 mt-1">{errors.rentOption}</p>
            )}
          </div>

          <p className="text-gray-500 mt-1 text-left max-w-[500px]">
            Renting option is available only when the price of the product is
            above <span className="text-[#E4086F]">300 AED</span>
          </p>

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

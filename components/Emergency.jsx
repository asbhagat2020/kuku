"use client";

import React, { useState } from "react";
import Link from "next/link";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from "next/navigation";

const Emergency = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    brand: "",
    size: "",
    price: "",
    location: "",
    requiredWithinDate: "",
    color: "", // Added color field
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (validImageTypes.includes(file.type)) {
        const newImages = [...formData.images];
        newImages[index] = file;
        setFormData({ ...formData, images: newImages });
        setErrors({ ...errors, images: "" });
      } else {
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
    if (!formData.category.trim()) 
      newErrors.category = "Category is required";
    if (!formData.brand) 
      newErrors.brand = "Brand is required";
    if (!formData.size) 
      newErrors.size = "Size is required";
    if (!formData.price.trim()) 
      newErrors.price = "Price is required";
    if (!formData.location.trim()) 
      newErrors.location = "Location is required";
    if (!formData.requiredWithinDate)
      newErrors.requiredWithinDate = "Required within date is required";
    if (!formData.color.trim())
      newErrors.color = "Color is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    const currentDate = new Date();
    const selectedDate = new Date(formData.requiredWithinDate);
    if (selectedDate < currentDate) {
      newErrors.requiredWithinDate = "Required date cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async (imageFile) => {
    const imageData = new FormData();
    for (let i = 0; i < imageFile?.length; i++) {
      imageData.append("files", imageFile[i]);
      imageData.append("folder", "avatar");
    }

    try {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/multiple`,
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.fileUrls;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let imageUrl = null;

        if (formData.images.length > 0) {
          imageUrl = await uploadImage(formData.images);
        }

        const token = JSON.parse(Cookies.get("auth"));

        const payload = {
          title: formData.itemName, // Using itemName as title
          name: formData.itemName,
          description: formData.description,
          category: formData.category,
          brand: formData.brand,
          size: formData.size,
          price: formData.price,
          location: formData.location,
          requiredWithinDate: formData.requiredWithinDate,
          requiredBy: formData.requiredWithinDate, // Using requiredWithinDate as requiredBy
          color: formData.color,
          images: imageUrl,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/requirement/add`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
            router.push("/");
          }, 2000);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

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
        <div
          className="text-[#e6e6e6] text-[32px] sm:text-[36px] font-luckiest leading-[38px] sm:leading-[55.20px]"
          style={{ marginLeft: "40px" }}
        >
          Emergency requirement
          <br />
          Urgently need this!
        </div>

        <img
          src="/yellow-bird.png"
          alt="Yellow Bird"
          className="absolute top-6 right-24 w-12 h-12 hidden md:block"
          style={{ marginTop: "53px", marginRight: "30px" }}
        />
        <div
          className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
          style={{ marginTop: "63px" }}
        >
          <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image upload section */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Product Images
            </label>
            <div className="flex flex-wrap gap-4 sm:gap-9">
              {Array(4)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 border border-[#E4086F] flex items-center justify-center overflow-hidden"
                  >
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
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
              className={`w-full p-2 border ${
                errors.itemName ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
              required
            />
            {errors.itemName && (
              <p className="text-red-500 mt-1">{errors.itemName}</p>
            )}
          </div>

          {/* Color Field */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Enter product color"
              className={`w-full p-2 border ${
                errors.color ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
              required
            />
            {errors.color && (
              <p className="text-red-500 mt-1">{errors.color}</p>
            )}
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
              className={`w-full p-2 border ${
                errors.description ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className={`w-full p-2 border ${
                errors.location ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
              required
            />
            {errors.location && (
              <p className="text-red-500 mt-1">{errors.location}</p>
            )}
          </div>

          {/* Required Within Date */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Required Within Date
            </label>
            <input
              type="date"
              name="requiredWithinDate"
              value={formData.requiredWithinDate}
              onChange={handleChange}
              min={minDate}
              className={`w-full p-2 border ${
                errors.requiredWithinDate ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
              required
            />
            {errors.requiredWithinDate && (
              <p className="text-red-500 mt-1">{errors.requiredWithinDate}</p>
            )}
          </div>

          {/* Category */}
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

          {/* Brand */}
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

          {/* Size */}
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
              <option value="XS">XS (Extra Small)</option>
              <option value="S">S (Small)</option>
              <option value="M">M (Medium)</option>
              <option value="L">L (Large)</option>
              <option value="XL">XL (Extra Large)</option>
              <option value="XXL">XXL (2X Large)</option>
              <option value="XXXL">XXXL (3X Large)</option>
            </select>
            {errors.size && <p className="text-red-500 mt-1">{errors.size}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-[#151515] text-base font-bold font-karla mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter Product Price"
              className={`w-full p-2 border ${
                errors.price ? "border-red-500" : "border-[#868686]"
              } rounded-lg max-w-[500px]`}
              min="0"
              step="0.01"
              onKeyDown={(e) => {
                if (e.key === "e" || e.key === "+" || e.key === "-") {
                  e.preventDefault();
                }
              }}
            />
            {errors.price && (
              <p className="text-red-500 mt-1">{errors.price}</p>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
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

export default Emergency;
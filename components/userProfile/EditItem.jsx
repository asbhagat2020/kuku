"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditItem = ({ data }) => {

  const [formData, setFormData] = useState({
    id: "",
    itemName: "",
    description: "",
    category: "",
    subCategory: "",
    gender: "",
    condition: "",
    brand: "",
    size: "",
    usage: "",
    price: "",
    damages: "",
    rentOption: "",
    images: [],
    country: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  //   setFormData(data);

  const [caseState, setCaseState] = useState(1);
  const [errors, setErrors] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);
  const [productId, setProductId] = useState({});
  const [successPopups, setSuccessPopups] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (data) {
      setFormData({
        id: data?._id,
        itemName: data?.name || "",
        description: data?.description || "",
        category: data?.category || "",
        subCategory: data?.subCategory || "",
        gender: data?.gender || "",
        condition: data?.condition || "",
        brand: data?.brand || "",
        size: data?.size || "",
        usage: data?.usage || "",
        price: data?.price || "",
        damages: data?.damages || "",
        rentOption: data?.openToRent || "",
        images: data?.images || [],
        country: data?.country || "",
        city: data?.city || "",
        addressLine1: data?.addressLine1 || "",
        addressLine2: data?.addressLine2 || "",
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        email: data?.email || "",
        phone: data?.phone || "",
      });
    }
  }, [data]);
  console.log(formData, "ooooooooo");
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
    if (!formData.gender) newErrors.gender = "gender is required";
    if (!formData.condition) newErrors.condition = "condition is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.size) newErrors.size = "Size is required";
    if (!formData.usage) newErrors.usage = "Usage is required";
    if (!String(formData?.price ?? '').trim()) {
      newErrors.price = "Price is required";
    }
    if (!formData.rentOption) newErrors.rentOption = "Rent option is required";
    if (formData.images.length < 2)
      newErrors.images = "At least two images are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async (imageFiles) => {
    const imageData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      imageData.append("files", imageFiles[i]);
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

  const handleSubmit = async (e, data) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Separate strings and files
        const existingUrls = [];
        const filesToUpload = [];

        formData.images.forEach((image) => {
          if (typeof image === "string") {
            existingUrls.push(image);
          } else {
            filesToUpload.push(image);
          }
        });

        // Upload files if any
        let uploadedUrls = [];
        if (filesToUpload.length > 0) {
          uploadedUrls = await uploadImage(filesToUpload);
        }

        // Combine all URLs
        const allImageUrls = [...existingUrls, ...uploadedUrls];

        // Retrieve the token from cookies
        const token = JSON.parse(Cookies.get("auth"));

        const product = {
          name: formData.itemName,
          description: formData.description,
          category: formData.category,
          subCategory: formData.subCategory,
          gender: formData.gender,
          condition: formData.condition,
          brand: formData.brand,
          size: formData.size,
          usage: formData.usage,
          price: formData.price,
          damages: formData.damages,
          openToRent: formData.rentOption,
          images: allImageUrls, // Use combined image URLs
        };

        const payload = { product };
        ;
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${formData.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response:", response);
        // Handle the success response
        if (response.status === 200) {
          setSuccessPopups(true);
          setTimeout(() => {
            setSuccessPopups(false); // Hide the popup after 2 seconds
            router.push("/"); // Redirect to the homepage
          }, 2000);
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error submitting form:", error);

      }
    }
  };


  return (
    <div className="max-w-[800px] bg-white rounded-3xl shadow-md border-4 border-black mx-auto overflow-hidden mt-10">
      {caseState === 1 ? (
        <>
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
                  Post the approval from our QC team, your product will be
                  visible to other users.
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
            <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
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

          <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                          accept="image/png, image/jpeg, image/jpg" // Only accept image files
                          onChange={(e) => handleFileChange(e, idx)}
                          className="opacity-0 absolute inset-0 cursor-pointer"
                        />
                        {formData && formData.images && formData.images[idx] ? (
                          <>
                            <img
                              src={
                                typeof formData.images[idx] === 'string'
                                  ? formData.images[idx] // If it's a URL
                                  : URL.createObjectURL(formData.images[idx]) // If it's a File
                              }
                              alt={`Uploaded ${idx + 1}`}
                              onError={(e) => { e.target.src = "default-placeholder-image.jpg"; }}
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
                <a href="/tips-and-tricks" className="text-[#E4086F] mt-2 underline">
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
                  className={`w-full p-2 border ${errors.itemName ? "border-red-500" : "border-[#868686]"
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
                  className={`w-full p-2 border ${errors.description ? "border-red-500" : "border-[#868686]"
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
                  className={`w-full p-2 border ${errors.category ? "border-red-500" : "border-[#868686]"
                    } rounded-lg max-w-[500px]`}
                />
                {errors.category && (
                  <p className="text-red-500 mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Product Sub Category
                </label>
                <input
                  type="text"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  placeholder="Enter Product Sub Category"
                  className={`w-full p-2 border ${errors.subCategory ? "border-red-500" : "border-[#868686]"
                    } rounded-lg max-w-[500px]`}
                />
                {errors.subCategory && (
                  <p className="text-red-500 mt-1">{errors.subCategory}</p>
                )}
              </div>
              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.gender ? "border-red-500" : "border-[#868686]"
                    } rounded-lg max-w-[500px]`}
                >
                  <option value="">Select Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.condition ? "border-red-500" : "border-[#868686]"
                    } rounded-lg max-w-[500px]`}
                >
                  <option value="">Select Condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Bad">Bad</option>
                  <option value="Needs Repair">Needs Repair</option>
                  <option value="Like New">Like New</option>
                </select>
                {errors.condition && (
                  <p className="text-red-500 mt-1">{errors.condition}</p>
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
                  className={`w-full p-2 border ${errors.brand ? "border-red-500" : "border-[#868686]"
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
                  className={`w-full p-2 border ${errors.size ? "border-red-500" : "border-[#868686]"
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
                {errors.size && (
                  <p className="text-red-500 mt-1">{errors.size}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Usage
                </label>
                <select
                  name="usage"
                  value={formData.usage}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.usage ? "border-red-500" : "border-[#868686]"
                    } rounded-lg max-w-[500px]`}
                >
                  <option value="">Choose Usage Level</option>
                  <option value="Casual">Casual</option>
                  <option value="Regular">Regular</option>
                  <option value="Frequent">Frequent</option>
                  <option value="Occasional">Occasional</option>
                  <option value="Daily">Daily</option>
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
                  className={`w-full p-2 border ${errors.price ? "border-red-500" : "border-[#868686]"
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
                  className={`w-full p-2 border ${errors.rentOption ? "border-red-500" : "border-[#868686]"
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
                Renting option is available only when the price of the product
                is above <span className="text-[#E4086F]">300 AED</span>
              </p>

              <div className="flex space-x-8 mt-6 justify-center">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-[#E4086F] text-yellow-400 text-lg font-semibold hover:bg-[#d4076e] transition-colors"
                  style={{ borderRadius: "22px" }}
                >
                  submit
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
        </>


      ) : null}
      {successPopups && (
        <div className="popup fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-4 rounded shadow-lg z-50">
          Product updated successfully!
        </div>
      )}
    </div>
  );
};

export default EditItem;

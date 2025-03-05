'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ItemList = () => {
  const [adress, setAdress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  console.log(adress);
  const handleSelect = () => {};
  const fetchAddress = async () => {
    try {
      const token = JSON.parse(Cookies.get('auth'));

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/get`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdress(response?.data?.addresses);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // If unauthorized, clear token and redirect to homepage
        Cookies.remove('auth');
        router.push('/');
      } else {
        console.log('error');
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    subCategory: '',
    gender: '',
    condition: '',
    brand: '',
    size: '',
    usage: '',
    price: '',
    damages: '',
    rentOption: 'No',
    images: [],
    country: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [caseState, setCaseState] = useState(1);
  const [errors, setErrors] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);
  const [successPopups, setSuccessPopups] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      // Check if the file type is a valid image type
      if (validImageTypes.includes(file.type)) {
        const newImages = [...formData.images];
        newImages[index] = file;
        setFormData({ ...formData, images: newImages });
        setErrors({ ...errors, images: '' });
      } else {
        // If the file is not an image, set an error message
        setErrors({
          ...errors,
          images: 'Only image files (JPEG, PNG) are allowed.',
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
    if (!formData.itemName.trim()) newErrors.itemName = 'Product title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.gender) newErrors.gender = 'gender is required';
    if (!formData.condition) newErrors.condition = 'condition is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.size) newErrors.size = 'Size is required';
    if (!formData.usage) newErrors.usage = 'Usage is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (formData.images.length < 2) newErrors.images = 'At least two image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCaseState(2);
    } else {
      // Scroll to the first error
      const firstError = document.querySelector('.text-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  const uploadImage = async (imageFile) => {
    const imageData = new FormData();
    for (let i = 0; i < imageFile?.length; i++) {
      imageData.append('files', imageFile[i]);
      imageData.append('folder', 'avatar');
    }

    try {
      const token = JSON.parse(Cookies.get('auth'));
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/multiple`, imageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.fileUrls;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let imageUrl = null;

        if (formData.images) {
          imageUrl = await uploadImage(formData.images);
        }

        const token = JSON.parse(Cookies.get('auth'));

        let address = selectedAddress
          ? { ...selectedAddress } // Create a copy of selectedAddress
          : {
              country: formData.country,
              city: formData.city,
              addressLine1: formData.addressLine1,
              addressLine2: formData.addressLine2,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
            };

        // Remove the _id property if it exists
        if (address._id) {
          delete address._id;
        }

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
          images: imageUrl,
        };

        const payload = {
          address,
          product,
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/listing/add`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          setSuccessPopups(true);
          setTimeout(() => {
            setSuccessPopups(false);
            router.push('/');
          }, 2000);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  const AddressSelection = ({ addresses, onSelect, onAddNew }) => {
    const [selectedType, setSelectedType] = useState('existing');

    const handleTypeChange = (type) => {
      setSelectedType(type);
      if (type === 'new') {
        onAddNew();
      }
    };

    return (
      <div className="space-y-6 font-karla">
        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="addressType"
              checked={selectedType === 'existing'}
              onChange={() => handleTypeChange('existing')}
              className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
            />
            <span className="text-gray-700">Use Existing Address</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="addressType"
              checked={selectedType === 'new'}
              onChange={() => handleTypeChange('new')}
              className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
            />
            <span className="text-gray-700">Add New Address</span>
          </label>
        </div>

        {selectedType === 'existing' && addresses?.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAddress?._id === address._id
                    ? 'border-2 border-pink-500'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
                onClick={() => onSelect(address)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="font-semibold">
                      {address.firstName} {address.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{address.phone}</p>
                    <p className="text-sm text-gray-600">{address.email}</p>
                    <p className="text-sm text-gray-600">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.country}
                    </p>
                  </div>
                  <div className="mt-2">
                    <input
                      type="radio"
                      checked={selectedAddress?._id === address._id}
                      onChange={() => onSelect(address)}
                      className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : selectedType === 'existing' ? (
          <p className="text-gray-500 italic">No saved addresses found. Please add a new address.</p>
        ) : null}
      </div>
    );
  };

  return (
    <div className="max-w-[800px] bg-white rounded-3xl shadow-md border-4 border-black mx-auto overflow-hidden mt-10">
      {caseState === 1 ? (
        <>
          {successPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
                <img src="/ChechkNotfi.png" alt="Check Notification" className="w-14 h-14 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-black">
                  Your product listing request has been successfully received
                </h2>
                <p className="text-gray-500 mt-2">
                  Post the approval from our QC team, your product will be visible to other users.
                </p>
              </div>
            </div>
          )}

          <div
            className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
            style={{
              backgroundImage: `url('/pink-header.png')`,
              clipPath: 'ellipse(90% 100% at 50% 0%)',
            }}
          >
            {/* Back Button */}
            <button
              className="absolute top-4 left-4 flex items-center space-x-1 px-2 py-1 text-sm text-black bg-white bg-opacity-60 hover:bg-opacity-80 rounded-md transition"
              onClick={() => router.push('/')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>

            <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
              LIST YOUR ITEM
            </div>

            <img
              src="/yellow-bird.png"
              alt="Yellow Bird"
              className="absolute top-6 right-24 w-12 h-12 hidden md:block"
              style={{ marginTop: '53px', marginRight: '30px' }}
            />
            <div
              className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
              style={{ marginTop: '63px' }}
            >
              <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
            </div>
          </div>

          <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Product Images</label>
                <div className="flex flex-wrap gap-4 sm:gap-9">
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
                          <img src="/upload.png" alt="Upload Icon" className="w-8 h-8" />
                        )}
                      </div>
                    ))}
                </div>
                {errors.images && <p className="text-red-500 mt-1">{errors.images}</p>}
                <a href="/tips" className="text-[#E4086F] mt-2 underline">
                  Read our video and photo tips
                </a>
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Product Title</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="Enter your product title"
                  className={`w-full p-2 border ${
                    errors.itemName ? 'border-red-500' : 'border-[#868686]'
                  } rounded-lg max-w-[500px]`}
                  required
                />
                {errors.itemName && <p className="text-red-500 mt-1">{errors.itemName}</p>}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Product Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter your product description"
                  className={`w-full p-2 border ${
                    errors.description ? 'border-red-500' : 'border-[#868686]'
                  } rounded-lg max-w-[500px]`}
                  rows={4}
                />
                {errors.description && <p className="text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Product Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter Product Category"
                  className={`w-full p-2 border ${
                    errors.category ? 'border-red-500' : 'border-[#868686]'
                  } rounded-lg max-w-[500px]`}
                />
                {errors.category && <p className="text-red-500 mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Product Sub Category</label>
                <input
                  type="text"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  placeholder="Enter Product Sub Category"
                  className={`w-full p-2 border ${
                    errors.subCategory ? 'border-red-500' : 'border-[#868686]'
                  } rounded-lg max-w-[500px]`}
                />
                {errors.subCategory && <p className="text-red-500 mt-1">{errors.subCategory}</p>}
              </div>
              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.gender ? 'border-red-500' : 'border-[#868686]'
                  } rounded-lg max-w-[500px]`}
                >
                  <option value="">Select Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  {/* <option value="Kids">Kids</option> */}
                </select>
                {errors.gender && <p className="text-red-500 mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.condition ? 'border-red-500' : 'border-[#868686]'
                  } rounded-lg max-w-[500px]`}
                >
                  <option value="">Select Condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Bad">Bad</option>
                  <option value="Needs Repair">Needs Repair</option>
                  <option value="Like New">Like New</option>
                </select>
                {errors.condition && <p className="text-red-500 mt-1">{errors.condition}</p>}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Product Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter Brand Name"
                  className={`w-full p-2 border ${
                    errors.brand ? 'border-red-500' : 'border-[#868686]'
                  } rounded-lg max-w-[500px]`}
                />
                {errors.brand && <p className="text-red-500 mt-1">{errors.brand}</p>}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Product Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.size ? 'border-red-500' : 'border-[#868686]'
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

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Usage</label>
                <select
                  name="usage"
                  value={formData.usage}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.usage ? 'border-red-500' : 'border-[#868686]'
                  } rounded-lg max-w-[500px]`}
                >
                  <option value="">Choose Usage Level</option>
                  <option value="Casual">Never used</option>
                  <option value="Regular">Rarely used</option>
                  <option value="Frequent">Medium used</option>
                  <option value="Occasional">Well used</option>
                </select>
                {errors.usage && <p className="text-red-500 mt-1">{errors.usage}</p>}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Price (AED)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter Product Price in AED"
                  className={`w-full p-2 border ${
                    errors.price ? 'border-red-500' : 'border-[#868686]'
                  } rounded-lg max-w-[500px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  min="0"
                  step="0.01"
                  onKeyDown={(e) => {
                    if (e.key === 'e' || e.key === '+' || e.key === '-') {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.price && <p className="text-red-500 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">Damages</label>
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
                <div className="mb-4">
                  <label className="flex items-center text-[#151515] text-base font-bold font-karla">
                    <input
                      type="checkbox"
                      name="rentOption"
                      checked={formData.rentOption === 'Yes'}
                      onChange={(e) => {
                        handleChange({
                          target: {
                            name: 'rentOption',
                            value: e.target.checked ? 'Yes' : 'No',
                          },
                        });
                      }}
                      className="mr-2 h-4 w-4"
                    />
                    Open to Rent
                  </label>
                  {/* {errors.rentOption && (
                    <p className="text-red-500 mt-1">{errors.rentOption}</p>
                  )} */}
                </div>

                {formData.rentOption === 'Yes' && (
                  <div>
                    <label className="block text-[#151515] text-base font-bold font-karla mb-2">Rental Price</label>
                    <input
                      type="number"
                      name="rentalPrice"
                      value={formData.rentalPrice}
                      onChange={handleChange}
                      placeholder="Enter rental price"
                      className={`w-full p-2 border ${
                        errors.rentalPrice ? 'border-red-500' : 'border-[#868686]'
                      } rounded-lg max-w-[500px]`}
                    />
                    {errors.rentalPrice && <p className="text-red-500 mt-1">{errors.rentalPrice}</p>}
                  </div>
                )}
              </div>

              <p className="text-gray-500 mt-1 text-left max-w-[500px]">
                Renting option is available only when the price of the product is above{' '}
                <span className="text-[#E4086F]">300 AED</span>
              </p>

              <div className="flex space-x-8 mt-6 justify-center">
                <button
                  type="submit"
                  onClick={handleNext}
                  className="px-8 py-3 bg-[#E4086F] text-yellow-400 text-lg font-semibold hover:bg-[#d4076e] transition-colors"
                  style={{ borderRadius: '22px' }}
                >
                  Next
                </button>

                {/* <Link href="/"> */}
                <button
                  onClick={handleBack}
                  type="button"
                  className="px-8 py-3 border border-[#E4086F] text-[#E4086F] text-lg font-semibold hover:bg-[#fce4f4] transition-colors"
                  style={{ borderRadius: '22px' }}
                >
                  Cancel
                </button>
                {/* </Link> */}
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div
            className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
            style={{
              backgroundImage: `url('/pink-header.png')`,
              clipPath: 'ellipse(90% 100% at 50% 0%)',
            }}
          >
            <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
              PICKUP ADDRESS
            </div>

            <img
              src="/yellow-bird.png"
              alt="Yellow Bird"
              className="absolute top-6 right-24 w-12 h-12 hidden md:block"
              style={{ marginTop: '53px', marginRight: '30px' }}
            />
            <div
              className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
              style={{ marginTop: '63px' }}
            >
              <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
            </div>
          </div>

          <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">Pickup Details</p>
              <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">Step 2 of 2</p>
            </div>
            <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla">
              Please enter your pickup details
            </p>
            <div className="space-y-4">
              <AddressSelection
                addresses={adress}
                onSelect={(address) => {
                  setSelectedAddress(address);
                  setShowAddressForm(false);
                  setFormData({
                    ...formData,
                    firstName: address.firstName,
                    lastName: address.lastName,
                    email: address.email,
                    phone: address.phone,
                    addressLine1: address.addressLine1,
                    addressLine2: address.addressLine2,
                    city: address.city,
                    country: address.country,
                  });
                }}
                onAddNew={() => {
                  setShowAddressForm(true);
                  setSelectedAddress(null);
                  setFormData({
                    ...formData,
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    country: '',
                  });
                }}
              />
            </div>
            {showAddressForm && (
              <div className="flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]">
                <div className="w-full flex flex-col gap-6">
                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Country</p>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      >
                        <option value="">Select a country</option>
                        <option value="uae">UAE</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                      </select>
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">City</p>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      >
                        <option value="">Select a city</option>
                        <option value="dubai">Dubai</option>
                        <option value="abudhabi">Abu Dhabi</option>
                        <option value="sharjah">Sharjah</option>
                        <option value="ajman">Ajman</option>
                      </select>
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Address Line 1</p>
                      <input
                        maxLength={25}
                        placeholder="Enter your address line 1"
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Address Line 2</p>
                      <input
                        maxLength={25}
                        placeholder="Enter your address line 2"
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">First name</p>
                      <input
                        maxLength={25}
                        placeholder="Enter your first name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Last name</p>
                      <input
                        maxLength={25}
                        placeholder="Enter your last name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Email address</p>
                      <input
                        maxLength={50}
                        placeholder="Enter your email address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Phone number</p>
                      <input
                        maxLength={12}
                        placeholder="Enter your phone number"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
              >
                List Now
              </button>
              <button
                onClick={() => setCaseState(1)}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
              >
                Back
              </button>
            </div>
          </div>
        </>
      )}
      {successPopups && (
        <div className="popup fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-4 rounded shadow-lg z-50">
          Product added successfully!
        </div>
      )}
    </div>
  );
};

export default ItemList;

'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const PickupModal = ({ isOpen, onClose, onSave, mode = 'add', initialData = null }) => {
  const [productsData, setProductsData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    phone: '',
    city: '',
    country: '',
    email: '',
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        phone: initialData.phone || '',
        addressLine1: initialData.addressLine1 || '',
        addressLine2: initialData.addressLine2 || '',
        city: initialData.city || '',
        country: initialData.country || '',
        email: initialData.email || '',
      });
    }
  }, [initialData, mode]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
        const datavalue = response.data;

        const uniqueSellersMap = new Map();

        datavalue.forEach((data) => {
          const sellerId = data?.seller?._id;
          const sellerName = data?.seller?.username;

          if (sellerId && sellerName) {
            uniqueSellersMap.set(sellerId, {
              id: sellerId,
              name: sellerName,
            });
          }
        });

        const uniqueSellers = Array.from(uniqueSellersMap.values());
        console.log(uniqueSellers, 'unique sellers');
        setProductsData(uniqueSellers);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'add') {
      addAddress();
    } else if (mode === 'edit') {
      editAddress();
    }
  };

  const addAddress = async () => {
    try {
      const token = JSON.parse(Cookies.get('auth'));
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/address`;

      console.log(formData, 'formdata');
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log('Address added successfully');
        onSave(response.data.address); // Notify parent component with the new address
        onClose();
        resetForm();
      } else {
        console.error('Failed to add address');
      }
    } catch (error) {
      console.error('An error occurred while adding the address:', error);
    }
  };

  const editAddress = async () => {
    console.log(initialData._id, 'kkkk');
    try {
      const token = JSON.parse(Cookies.get('auth'));
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/edit/${initialData._id}`;

      const response = await axios.put(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Address updated successfully');
        onSave(response.data.address); // Notify parent component with the updated address
        onClose();
        resetForm();
      } else {
        console.error('Failed to update address');
      }
    } catch (error) {
      console.error('An error occurred while updating the address:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      phone: '',
      city: '',
      country: '',
      email: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4  overflow-y-auto max-h-[90vh] relative ">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-luckiest">{mode === 'add' ? 'ADD NEW ADDRESS' : 'EDIT ADDRESS'}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-black hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-black" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Enter First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Full First Name"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Enter Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Full Last Name"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Address 1 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Address1</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="Enter addressLine1"
                className="w-full h-20 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Address2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Enter addressLine2"
                className="w-full h-20 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Address 2 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City"
                className="w-full h-20 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country"
                className="w-full h-20 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full h-20 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Select Seller</label>
              <select
                name="seller"
                value={formData.seller}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select Seller</option>
                {productsData?.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="submit"
              className="px-12 py-3 bg-[#FDE504] hover:bg-yellow-500 text-black rounded-lg font-medium"
            >
              SAVE
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-12 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PickupModal;

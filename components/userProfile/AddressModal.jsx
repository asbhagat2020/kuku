"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AddressModal = ({
  isOpen,
  onClose,
  onSave,
  mode = "add",
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone || "",
        address1: initialData.address || "",
        address2: initialData.address2 || "",
      });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({
      name: "",
      phone: "",
      address1: "",
      address2: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 relative">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-luckiest">
              {mode === "add" ? "ADD NEW ADDRESS" : "EDIT ADDRESS"}
            </h2>
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
              <label className="block text-sm font-medium text-gray-700">
                Enter Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
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
          </div>

          {/* Address 1 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Address 1
            </label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Enter Address 1"
              className="w-full h-20 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Address 2 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Address 2
            </label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Enter Address 2"
              className="w-full h-20 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
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

export default AddressModal;

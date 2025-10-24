




"use client";

import { Search } from "lucide-react";
import AddressModal from "./AddressModal";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PickupAddress from "./PickupAddress";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingAddress, setEditingAddress] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth") || "{}");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/get`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(response.data.addresses || []);
    } catch (err) {
      setError("Failed to fetch addresses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (id) => {
    try {
      const token = JSON.parse(Cookies.get("auth") || "{}");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/default/${id}`;
      const response = await axios.patch(apiUrl, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setAddresses(response.data.address || response.data.addresses || []);
        console.log("Default address updated successfully");
      } else {
        console.error("Failed to update default address");
      }
    } catch (error) {
      console.error("Error updating default address:", error);
      setError("Failed to update default address");
    }
  };

  const handleEdit = (address) => {
    setModalMode("edit");
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(Cookies.get("auth") || "{}");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/delete/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(response.data.address || response.data.addresses || []);
      console.log("Address deleted successfully:", response.data);
    } catch (err) {
      setError("Failed to delete address");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setModalMode("add");
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleSave = (address) => {
    if (modalMode === "add") {
      setAddresses([...addresses, address]);
    } else if (modalMode === "edit") {
      setAddresses(
        addresses.map((addr) => (addr._id === address._id ? address : addr))
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-karla">
      <h1 className="text-3xl font-luckiest mb-6">SHIPPING ADDRESS LIST</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <button
          onClick={handleAddNew}
          className="bg-[#FDE504] hover:bg-yellow-500 text-black px-6 py-3 rounded-lg flex items-center gap-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="font-medium text-sm">Add new address</span>
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading addresses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && addresses.length === 0 && (
        <p className="text-gray-500">No addresses found.</p>
      )}

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address._id}
            className={`border rounded-lg p-4 ${
              address.isDefault ? "border-green-500" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-medium">Name: {address.name}</h2>
                <p className="text-gray-600 text-sm">
                  Phone: {address.mob_no_country_code} {address.mobile_number}
                </p>
                {address.alt_ph_country_code && address.alternate_phone && (
                  <p className="text-gray-600 text-sm">
                    Alternate Phone: {address.alt_ph_country_code} {address.alternate_phone}
                  </p>
                )}
                <p className="text-gray-600 text-sm">House No: {address.house_no}</p>
                <p className="text-gray-600 text-sm">Building Name: {address.building_name}</p>
                <p className="text-gray-600 text-sm">Area: {address.area}</p>
                <p className="text-gray-600 text-sm">Landmark: {address.landmark}</p>
                <p className="text-gray-600 text-sm">City: {address.city}</p>
                <p className="text-gray-600 text-sm">Country: {address.country}</p>
                <div className="flex gap-6 mt-3">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-green-500 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <label className="relative">
                <input
                  type="radio"
                  name="address"
                  checked={address.isDefault}
                  onChange={() => handleSelect(address._id)}
                  className="w-5 h-5 border-2 border-gray-300 rounded-full checked:border-green-500 checked:bg-green-500 appearance-none cursor-pointer"
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block w-2 h-2 rounded-full bg-white opacity-0 checked:opacity-100" />
              </label>
            </div>
          </div>
        ))}
      </div>
      <PickupAddress />
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        mode={modalMode}
        initialData={editingAddress}
      />
    </div>
  );
};

export default AddressList;
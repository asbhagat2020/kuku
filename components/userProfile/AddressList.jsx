"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import AddressModal from "./AddressModal";

const AddressList = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Alma Lawson",
      phone: "+971 24353532",
      address: "1/4, Sheikh Zayed Bin Hamdan Al Nahyan Street",
      selected: true,
    },
    {
      id: 2,
      name: "Alma Lawson",
      phone: "+971 24353532",
      address: "1/4, Sheikh Zayed Bin Hamdan Al Nahyan Street",
      selected: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingAddress, setEditingAddress] = useState(null);

  const handleSelect = (id) => {
    setAddresses(
      addresses.map((address) =>
        address.id === id
          ? { ...address, selected: true }
          : { ...address, selected: false }
      )
    );
  };

  const handleEdit = (address) => {
    setModalMode('edit');
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleAddNew = () => {
    setModalMode('add');
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleSaveAddress = (formData) => {
    if (modalMode === 'add') {
      const newAddress = {
        id: addresses.length + 1,
        name: formData.name,
        phone: formData.phone,
        address: formData.address1,
        address2: formData.address2,
        selected: false,
      };
      setAddresses([...addresses, newAddress]);
    } else {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id
          ? {
              ...addr,
              name: formData.name,
              phone: formData.phone,
              address: formData.address1,
              address2: formData.address2,
            }
          : addr
      ));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-karla">
      {/* Heading */}
      <h1 className="text-3xl font-luckiest mb-6">ADDRESS LIST</h1>

      {/* Search and Add Button */}
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

      {/* Address Cards */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 ${
              address.selected ? "border-green-500" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-medium">{address.name}</h2>
                <p className="text-gray-600 text-sm">{address.phone}</p>
                <p className="text-gray-600 text-sm">{address.address}</p>
                <div className="flex gap-6 mt-3">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-green-500 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
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
                  checked={address.selected}
                  onChange={() => handleSelect(address.id)}
                  className="w-5 h-5 border-2 border-gray-300 rounded-full checked:border-green-500 checked:bg-green-500 appearance-none cursor-pointer"
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block w-2 h-2 rounded-full bg-white opacity-0 checked:opacity-100" />
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
        mode={modalMode}
        initialData={editingAddress}
      />
    </div>
  );
};

export default AddressList;
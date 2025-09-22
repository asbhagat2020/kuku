// 'use client';

// import { Search } from 'lucide-react';
// import Cookies from 'js-cookie';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import PickupModal from './PickupModel';

// const PickupAddress = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('add');
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);

//   // Remove the second useEffect that depends on addresses
//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   const handleAddressSelect = async (addressId) => {
//     setSelectedAddressId(addressId);
//     try {
//       const token = JSON.parse(Cookies.get('auth'));
//       const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/defaultAddress/${addressId}`;

//       const response = await axios.put(
//         apiUrl,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (response.status === 200) {
//         // Don't update the entire addresses list, just mark the selected one as default
//         const updatedAddresses = addresses.map((addr) => ({
//           ...addr,
//           isDefault: addr._id === addressId,
//         }));
//         setAddresses(updatedAddresses);
//       }
//     } catch (error) {
//       console.error('An error occurred while updating the address:', error);
//     }
//   };

//   const fetchAddress = async () => {
//     try {
//       const token = JSON.parse(Cookies.get('auth'));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/get`;

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setAddresses(response.data.addresses);

//       // Set default address if exists
//       const defaultAddress = response.data.addresses.find((addr) => addr.isDefault);
//       if (defaultAddress) {
//         setSelectedAddressId(defaultAddress._id);
//       }
//     } catch (err) {
//       setError('Failed to fetch user details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (address) => {
//     setModalMode('edit');
//     setEditingAddress(address);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get('auth'));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/delete/${id}`;

//       const response = await axios.delete(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAddresses(response.data.addresses);
//     } catch (err) {
//       setError('Failed to delete Address');
//     }
//   };

//   const handleAddNew = () => {
//     setModalMode('add');
//     setEditingAddress(null);
//     setIsModalOpen(true);
//   };

//   const handleSave = (address) => {
//     if (modalMode === 'add') {
//       setAddresses([...addresses, address]);
//     } else if (modalMode === 'edit') {
//       setAddresses(addresses.map((addr) => (addr._id === address._id ? address : addr)));
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 font-karla">
//       <h1 className="text-3xl font-luckiest mb-6">PICK UP ADDRESS LIST</h1>

//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <button
//           onClick={handleAddNew}
//           className="bg-[#FDE504] hover:bg-yellow-500 text-black px-6 py-3 rounded-lg flex items-center gap-2 shadow-md"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-5 h-5"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//           </svg>
//           <span className="font-medium text-sm">Add new address</span>
//         </button>
//       </div>

//       <div className="space-y-4">
//         {addresses?.map((address) => (
//           <div
//             key={address._id}
//             className={`border rounded-lg p-4 transition-all ${
//               selectedAddressId === address._id ? 'border-green-500 border-2' : 'border-gray-200'
//             }`}
//           >
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div className="space-y-1">
//                 <h2 className="text-lg font-medium">
//                   Name: {address.firstName} {address.lastName}
//                 </h2>
//                 <p className="text-gray-600 text-sm">Phone: {address.phone}</p>
//                 <p className="text-gray-600 text-sm">Street: {address.addressLine1}</p>
//                 <p className="text-gray-600 text-sm">Street: {address.addressLine2}</p>
//                 <p className="text-gray-600 text-sm">City: {address.city}</p>
//                 <p className="text-gray-600 text-sm">Country: {address.country}</p>
//                 <p className="text-gray-600 text-sm">Email: {address.email}</p>
//                 <div className="flex gap-6 mt-3">
//                   <button onClick={() => handleEdit(address)} className="text-green-500 text-sm hover:underline">
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(address._id)} className="text-red-500 text-sm hover:underline">
//                     Delete
//                   </button>
//                 </div>
//               </div>

//               <div className="relative">
//                 <input
//                   type="radio"
//                   name="address"
//                   checked={selectedAddressId === address._id}
//                   onChange={() => handleAddressSelect(address._id)}
//                   className="w-5 h-5 appearance-none cursor-pointer border-2 border-gray-300 rounded-full checked:border-green-500 checked:border-4"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <PickupModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSave}
//           mode={modalMode}
//           initialData={editingAddress}
//         />
//       )}
//     </div>
//   );
// };

// export default PickupAddress;










"use client";

import { Search } from "lucide-react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PickupModal from './PickupModel';

const PickupAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingAddress, setEditingAddress] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth") || "{}");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/get`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched addresses:", response.data.addresses); // Log to verify
      setAddresses(response.data.addresses || []);

      // Set default address if exists
      const defaultAddress = response.data.addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
      }
    } catch (err) {
      setError("Failed to fetch addresses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = async (addressId) => {
    setSelectedAddressId(addressId);
    try {
      const token = JSON.parse(Cookies.get("auth") || "{}");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/defaultAddress/${addressId}`;

      const response = await axios.put(apiUrl, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedAddresses = addresses.map((addr) => ({
          ...addr,
          isDefault: addr._id === addressId,
        }));
        setAddresses(updatedAddresses);
      }
    } catch (error) {
      console.error("Error updating default address:", error);
      setError("Failed to update default address");
    }
  };

  const handleEdit = (address) => {
    console.log("Editing address:", address); // Log to verify
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
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/delete/${id}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(response.data.addresses || []);
    } catch (err) {
      setError("Failed to delete address");
      console.error(err);
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
      setAddresses(addresses.map((addr) => (addr._id === address._id ? address : addr)));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 font-karla">
      <h1 className="text-3xl font-luckiest mb-6">PICK UP ADDRESS LIST</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
        {addresses?.map((address) => (
          <div
            key={address._id}
            className={`border rounded-lg p-4 transition-all ${
              selectedAddressId === address._id ? "border-green-500 border-2" : "border-gray-200"
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
                <p className="text-gray-600 text-sm">Email: {address.email}</p>
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

              <div className="relative">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddressId === address._id}
                  onChange={() => handleAddressSelect(address._id)}
                  className="w-5 h-5 appearance-none cursor-pointer border-2 border-gray-300 rounded-full checked:border-green-500 checked:border-4"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <PickupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={editingAddress}
        />
      )}
    </div>
  );
};

export default PickupAddress;
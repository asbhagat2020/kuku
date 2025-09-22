// "use client";

// import { Search } from "lucide-react";
// import AddressModal from "./AddressModal";
// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CartAddress = ({ onAddressSelect }) => {
//   const [addresses, setAddresses] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("add");
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   const fetchAddress = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/get`;

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const fetchedAddresses = response.data.addresses || [];
//       setAddresses(fetchedAddresses);

//       // If only one address exists, auto-select it
//       if (fetchedAddresses.length === 1) {
//         const singleAddress = fetchedAddresses[0];
//         onAddressSelect(singleAddress); // Auto-select the single address
//         // Optionally, set it as default on the backend
//         await handleSelect(singleAddress._id);
//       } else {
//         // If multiple addresses, select the default one (if any)
//         const defaultAddress = fetchedAddresses.find((addr) => addr.isDefault);
//         if (defaultAddress) {
//           onAddressSelect(defaultAddress);
//         }
//       }
//     } catch (err) {
//       setError("Failed to fetch addresses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/default/${id}`;

//       const response = await axios.patch(
//         apiUrl,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const updatedAddresses = response.data.address || [];
//         setAddresses(updatedAddresses);
//         const selectedAddress = updatedAddresses.find((addr) => addr._id === id);
//         if (selectedAddress && onAddressSelect) {
//           onAddressSelect(selectedAddress);
//         }
//         console.log("Default address updated successfully");
//       } else {
//         console.error("Failed to update default address");
//         setError("Failed to update default address");
//       }
//     } catch (error) {
//       console.error("An error occurred while updating the address:", error);
//       setError("An error occurred while updating the address");
//     }
//   };

//   const handleEdit = (address) => {
//     setModalMode("edit");
//     setEditingAddress(address);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/delete/${id}`;

//       const response = await axios.delete(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const updatedAddresses = response.data.address || [];
//       setAddresses(updatedAddresses);
//       // Clear selected address if deleted
//       const defaultAddress = updatedAddresses.find((addr) => addr.isDefault);
//       if (onAddressSelect) {
//         onAddressSelect(defaultAddress || null);
//       }
//       console.log("Address deleted successfully");
//     } catch (err) {
//       setError("Failed to delete address");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddNew = () => {
//     setModalMode("add");
//     setEditingAddress(null);
//     setIsModalOpen(true);
//   };

//   const handleSave = (address) => {
//     if (modalMode === "add") {
//       setAddresses([...addresses, address]);
//     } else if (modalMode === "edit") {
//       setAddresses(
//         addresses.map((addr) => (addr._id === address._id ? address : addr))
//       );
//     }
//     if (address.isDefault && onAddressSelect) {
//       onAddressSelect(address);
//     }
//     setIsModalOpen(false);
//   };

//   if (loading) {
//     return <div>Loading addresses...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container px-12 py-8 font-karla">
//       <h1 className="text-3xl font-luckiest mb-6">SHIPPING ADDRESS LIST</h1>

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
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 4.5v15m7.5-7.5h-15"
//             />
//           </svg>
//           <span className="font-medium text-sm">Add new address</span>
//         </button>
//       </div>

//       <div className="space-y-4">
//         {addresses.length === 0 ? (
//           <div>No addresses found. Please add an address.</div>
//         ) : (
//           addresses.map((address) => (
//             <div
//               key={address._id}
//               className={`border rounded-lg p-4 ${
//                 address.isDefault ? "border-green-500" : "border-gray-200"
//               }`}
//             >
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                 <div className="space-y-1">
//                   <h2 className="text-lg font-medium">
//                     Name: {address.addressName}
//                   </h2>
//                   <p className="text-gray-600 text-sm">
//                     Phone: {address.phoneNumber}
//                   </p>
//                   <p className="text-gray-600 text-sm">Street: {address.street}</p>
//                   <p className="text-gray-600 text-sm">City: {address.city}</p>
//                   <p className="text-gray-600 text-sm">State: {address.state}</p>
//                   <p className="text-gray-600 text-sm">
//                     Country: {address.country}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     Postal Code: {address.postalCode}
//                   </p>
//                   <div className="flex gap-6 mt-3">
//                     <button
//                       onClick={() => handleEdit(address)}
//                       className="text-green-500 text-sm hover:underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(address._id)}
//                       className="text-red-500 text-sm hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//                 <label className="relative">
//                   <input
//                     type="radio"
//                     name="address"
//                     checked={address.isDefault}
//                     onChange={() => handleSelect(address._id)}
//                     className="w-5 h-5 border-2 border-gray-300 rounded-full checked:border-green-500 checked:bg-green-500 appearance-none cursor-pointer"
//                   />
//                   <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block w-2 h-2 rounded-full bg-white opacity-0 checked:opacity-100" />
//                 </label>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <AddressModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//         mode={modalMode}
//         initialData={editingAddress}
//       />
//     </div>
//   );
// };

// export default CartAddress;




// "use client";

// import { Search } from "lucide-react";
// import AddressModal from "./AddressModal";
// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CartAddress = ({ onAddressSelect }) => {
//   const [addresses, setAddresses] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("add");
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   const fetchAddress = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/get`;

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const fetchedAddresses = response.data.addresses || [];
//       // Map backend fields to frontend fields
//       const mappedAddresses = fetchedAddresses.map((addr) => ({
//         _id: addr._id,
//         addressName: addr.name,
//         phoneNumber: `${addr.mob_no_country_code}${addr.mobile_number}`,
//         street: `${addr.house_no}, ${addr.building_name}, ${addr.area}${
//           addr.landmark ? `, ${addr.landmark}` : ""
//         }`,
//         city: addr.city,
//         state: null, // Backend mein state nahi hai, isliye null
//         country: addr.country,
//         postalCode: null, // Backend mein postalCode nahi hai, isliye null
//         isDefault: addr.isDefault,
//       }));
//       setAddresses(mappedAddresses);

//       // If only one address exists, auto-select it
//       if (mappedAddresses.length === 1) {
//         const singleAddress = mappedAddresses[0];
//         onAddressSelect(singleAddress);
//         await handleSelect(singleAddress._id);
//       } else {
//         // If multiple addresses, select the default one (if any)
//         const defaultAddress = mappedAddresses.find((addr) => addr.isDefault);
//         if (defaultAddress) {
//           onAddressSelect(defaultAddress);
//         }
//       }
//     } catch (err) {
//       setError("Failed to fetch addresses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/default/${id}`;

//       const response = await axios.patch(
//         apiUrl,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const updatedAddresses = response.data.address || [];
//         // Map updated addresses
//         const mappedAddresses = updatedAddresses.map((addr) => ({
//           _id: addr._id,
//           addressName: addr.name,
//           phoneNumber: `${addr.mob_no_country_code}${addr.mobile_number}`,
//           street: `${addr.house_no}, ${addr.building_name}, ${addr.area}${
//             addr.landmark ? `, ${addr.landmark}` : ""
//           }`,
//           city: addr.city,
//           state: null,
//           country: addr.country,
//           postalCode: null,
//           isDefault: addr.isDefault,
//         }));
//         setAddresses(mappedAddresses);
//         const selectedAddress = mappedAddresses.find((addr) => addr._id === id);
//         if (selectedAddress && onAddressSelect) {
//           onAddressSelect(selectedAddress);
//         }
//         console.log("Default address updated successfully");
//       } else {
//         console.error("Failed to update default address");
//         setError("Failed to update default address");
//       }
//     } catch (error) {
//       console.error("An error occurred while updating the address:", error);
//       setError("An error occurred while updating the address");
//     }
//   };

//   const handleEdit = (address) => {
//     setModalMode("edit");
//     // Map address for editing modal
//     const mappedAddress = {
//       _id: address._id,
//       addressName: address.addressName,
//       phoneNumber: address.phoneNumber,
//       mob_no_country_code: address.phoneNumber.slice(0, 3), // Extract country code
//       mobile_number: address.phoneNumber.slice(3), // Extract mobile number
//       alternate_phone: address.alternate_phone || "", // Ensure alternate phone is handled
//       house_no: address.street.split(",")[0],
//       building_name: address.street.split(",")[1],
//       area: address.street.split(",")[2],
//       landmark: address.street.split(",").slice(3).join(",") || "",
//       city: address.city,
//       country: address.country,
//       isDefault: address.isDefault,
//     };
//     setEditingAddress(mappedAddress);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/delete/${id}`;

//       const response = await axios.delete(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const updatedAddresses = response.data.address || [];
//       // Map updated addresses
//       const mappedAddresses = updatedAddresses.map((addr) => ({
//         _id: addr._id,
//         addressName: addr.name,
//         phoneNumber: `${addr.mob_no_country_code}${addr.mobile_number}`,
//         street: `${addr.house_no}, ${addr.building_name}, ${addr.area}${
//           addr.landmark ? `, ${addr.landmark}` : ""
//         }`,
//         city: addr.city,
//         state: null,
//         country: addr.country,
//         postalCode: null,
//         isDefault: addr.isDefault,
//       }));
//       setAddresses(mappedAddresses);
//       const defaultAddress = mappedAddresses.find((addr) => addr.isDefault);
//       if (onAddressSelect) {
//         onAddressSelect(defaultAddress || null);
//       }
//       console.log("Address deleted successfully");
//     } catch (err) {
//       setError("Failed to delete address");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddNew = () => {
//     setModalMode("add");
//     setEditingAddress(null);
//     setIsModalOpen(true);
//   };

//   const handleSave = (address) => {
//     const mappedAddress = {
//       _id: address._id,
//       addressName: address.addressName,
//       phoneNumber: `${address.mob_no_country_code}${address.mobile_number}`,
//       street: `${address.house_no}, ${address.building_name}, ${address.area}${
//         address.landmark ? `, ${address.landmark}` : ""
//       }`,
//       city: address.city,
//       state: null,
//       country: address.country,
//       postalCode: null,
//       isDefault: address.isDefault,
//     };
//     if (modalMode === "add") {
//       setAddresses([...addresses, mappedAddress]);
//     } else if (modalMode === "edit") {
//       setAddresses(
//         addresses.map((addr) =>
//           addr._id === mappedAddress._id ? mappedAddress : addr
//         )
//       );
//     }
//     if (mappedAddress.isDefault && onAddressSelect) {
//       onAddressSelect(mappedAddress);
//     }
//     setIsModalOpen(false);
//   };

//   if (loading) {
//     return <div>Loading addresses...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container px-12 py-8 font-karla">
//       <h1 className="text-3xl font-luckiest mb-6">SHIPPING ADDRESS LIST</h1>

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
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 4.5v15m7.5-7.5h-15"
//             />
//           </svg>
//           <span className="font-medium text-sm">Add new address</span>
//         </button>
//       </div>

//       <div className="space-y-4">
//         {addresses.length === 0 ? (
//           <div>No addresses found. Please add an address.</div>
//         ) : (
//           addresses.map((address) => (
//             <div
//               key={address._id}
//               className={`border rounded-lg p-4 ${
//                 address.isDefault ? "border-green-500" : "border-gray-200"
//               }`}
//             >
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                 <div className="space-y-1">
//                   <h2 className="text-lg font-medium">
//                     Name: {address.addressName}
//                   </h2>
//                   <p className="text-gray-600 text-sm">
//                     Phone: {address.phoneNumber}
//                   </p>
//                   <p className="text-gray-600 text-sm">Street: {address.street}</p>
//                   <p className="text-gray-600 text-sm">City: {address.city}</p>
//                   {/* <p className="text-gray-600 text-sm">
//                     State: {address.state || "N/A"}
//                   </p> */}
//                   <p className="text-gray-600 text-sm">
//                     Country: {address.country}
//                   </p>
//                   {/* <p className="text-gray-600 text-sm">
//                     Postal Code: {address.postalCode || "N/A"}
//                   </p> */}
//                   <div className="flex gap-6 mt-3">
//                     <button
//                       onClick={() => handleEdit(address)}
//                       className="text-green-500 text-sm hover:underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(address._id)}
//                       className="text-red-500 text-sm hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//                 <label className="relative">
//                   <input
//                     type="radio"
//                     name="address"
//                     checked={address.isDefault}
//                     onChange={() => handleSelect(address._id)}
//                     className="w-5 h-5 border-2 border-gray-300 rounded-full checked:border-green-500 checked:bg-green-500 appearance-none cursor-pointer"
//                   />
//                   <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block w-2 h-2 rounded-full bg-white opacity-0 checked:opacity-100" />
//                 </label>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <AddressModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//         mode={modalMode}
//         initialData={editingAddress}
//       />
//     </div>
//   );
// };

// export default CartAddress;






"use client";

import { Search } from "lucide-react";
import AddressModal from "./AddressModal";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CartAddress = ({ onAddressSelect }) => {
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
      const token = JSON.parse(Cookies.get("auth"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/get`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedAddresses = response.data.addresses || [];
      const mappedAddresses = fetchedAddresses.map((addr) => ({
        _id: addr._id,
        addressName: addr.name,
        phoneNumber: `${addr.mob_no_country_code}${addr.mobile_number}`,
        street: `${addr.house_no}, ${addr.building_name}, ${addr.area}${
          addr.landmark ? `, ${addr.landmark}` : ""
        }`,
        city: addr.city,
        state: null,
        country: addr.country,
        postalCode: null,
        isDefault: addr.isDefault,
      }));
      setAddresses(mappedAddresses);

      if (mappedAddresses.length === 1) {
        const singleAddress = mappedAddresses[0];
        onAddressSelect(singleAddress);
        await handleSelect(singleAddress._id);
      } else {
        const defaultAddress = mappedAddresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          onAddressSelect(defaultAddress);
        }
      }
    } catch (err) {
      setError("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (id) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/default/${id}`;

      const response = await axios.patch(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedAddresses = response.data.address || [];
        const mappedAddresses = updatedAddresses.map((addr) => ({
          _id: addr._id,
          addressName: addr.name,
          phoneNumber: `${addr.mob_no_country_code}${addr.mobile_number}`,
          street: `${addr.house_no}, ${addr.building_name}, ${addr.area}${
            addr.landmark ? `, ${addr.landmark}` : ""
          }`,
          city: addr.city,
          state: null,
          country: addr.country,
          postalCode: null,
          isDefault: addr.isDefault,
        }));
        setAddresses(mappedAddresses);
        const selectedAddress = mappedAddresses.find((addr) => addr._id === id);
        if (selectedAddress && onAddressSelect) {
          onAddressSelect(selectedAddress);
        }
        console.log("Default address updated successfully");
      } else {
        console.error("Failed to update default address");
        setError("Failed to update default address");
      }
    } catch (error) {
      console.error("An error occurred while updating the address:", error);
      setError("An error occurred while updating the address");
    }
  };

  const handleEdit = (address) => {
    setModalMode("edit");
    const mappedAddress = {
      _id: address._id,
      addressName: address.addressName,
      phoneNumber: address.phoneNumber,
      house_no: address.street.split(",")[0].trim(),
      building_name: address.street.split(",")[1]?.trim() || "",
      area: address.street.split(",")[2]?.trim() || "",
      landmark: address.street.split(",").slice(3).join(",").trim() || "",
      city: address.city,
      country: address.country,
      address_type: "Normal", // Default or fetch from backend if available
      alternate_phone: "", // Not directly available, set empty or fetch if needed
      isDefault: address.isDefault,
    };
    setEditingAddress(mappedAddress);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/delete/${id}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedAddresses = response.data.address || [];
      const mappedAddresses = updatedAddresses.map((addr) => ({
        _id: addr._id,
        addressName: addr.name,
        phoneNumber: `${addr.mob_no_country_code}${addr.mobile_number}`,
        street: `${addr.house_no}, ${addr.building_name}, ${addr.area}${
          addr.landmark ? `, ${addr.landmark}` : ""
        }`,
        city: addr.city,
        state: null,
        country: addr.country,
        postalCode: null,
        isDefault: addr.isDefault,
      }));
      setAddresses(mappedAddresses);
      const defaultAddress = mappedAddresses.find((addr) => addr.isDefault);
      if (onAddressSelect) {
        onAddressSelect(defaultAddress || null);
      }
      console.log("Address deleted successfully");
    } catch (err) {
      setError("Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setModalMode("add");
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleSave = (savedAddress) => {
    // Log the savedAddress to debug
    console.log("Saved Address:", savedAddress);

    const mappedAddress = {
      _id: savedAddress._id,
      addressName: savedAddress.addressName || savedAddress.name, // Fallback to name if addressName is missing
      phoneNumber: savedAddress.phoneNumber || `${savedAddress.mob_no_country_code}${savedAddress.mobile_number}`,
      street: `${savedAddress.house_no}, ${savedAddress.building_name}, ${savedAddress.area}${
        savedAddress.landmark ? `, ${savedAddress.landmark}` : ""
      }`,
      city: savedAddress.city,
      state: null,
      country: savedAddress.country,
      postalCode: null,
      isDefault: savedAddress.isDefault,
    };

    if (modalMode === "add") {
      setAddresses([...addresses, mappedAddress]);
    } else if (modalMode === "edit") {
      setAddresses(
        addresses.map((addr) =>
          addr._id === mappedAddress._id ? mappedAddress : addr
        )
      );
    }
    if (mappedAddress.isDefault && onAddressSelect) {
      onAddressSelect(mappedAddress);
    }
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading addresses...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container px-12 py-8 font-karla">
      <h1 className="text-3xl font-luckiest mb-6">SHIPPING ADDRESS LIST</h1>

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="font-medium text-sm">Add new address</span>
        </button>
      </div>

      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div>No addresses found. Please add an address.</div>
        ) : (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`border rounded-lg p-4 ${
                address.isDefault ? "border-green-500" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium">
                    Name: {address.addressName}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Phone: {address.phoneNumber}
                  </p>
                  <p className="text-gray-600 text-sm">Street: {address.street}</p>
                  <p className="text-gray-600 text-sm">City: {address.city}</p>
                  <p className="text-gray-600 text-sm">
                    Country: {address.country}
                  </p>
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
          ))
        )}
      </div>

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

export default CartAddress;




// "use client";

// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const PickupModal = ({ isOpen, onClose, onSave, mode = "add", initialData = null }) => {
//   const [productsData, setProductsData] = useState([]);
//   const [formData, setFormData] = useState({
//     addressName: "",
//     mob_no_country_code: "971",
//     phoneNumber: "",
//     alt_ph_country_code: "971",
//     alternate_phone: "",
//     apartmentDetails: "",
//     apartmentName: "",
//     area: "",
//     landmark: "",
//     city: "",
//     country: "UAE",
//     address_type: "Normal",
//     email: "",
//     seller: "",
//     isDefault: false,
//   });

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
//         const datavalue = response.data;

//         const uniqueSellersMap = new Map();
//         datavalue.forEach((data) => {
//           const sellerId = data?.seller?._id;
//           const sellerName = data?.seller?.username;
//           if (sellerId && sellerName) {
//             uniqueSellersMap.set(sellerId, {
//               id: sellerId,
//               name: sellerName,
//             });
//           }
//         });

//         const uniqueSellers = Array.from(uniqueSellersMap.values());
//         console.log("Unique sellers:", uniqueSellers);
//         setProductsData(uniqueSellers);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (mode === "edit" && initialData) {
//       setFormData({
//         addressName: initialData.name || initialData.addressName || "",
//         mob_no_country_code: initialData.mob_no_country_code || (initialData.phoneNumber?.startsWith("971") ? "971" : "971"),
//         phoneNumber: initialData.mobile_number || (initialData.phoneNumber?.startsWith("971") ? initialData.phoneNumber.slice(3) : initialData.phoneNumber) || "",
//         alt_ph_country_code: initialData.alt_ph_country_code || (initialData.alternate_phone?.startsWith("971") ? "971" : "971"),
//         alternate_phone: initialData.alternate_phone || (initialData.alternate_phone?.startsWith("971") ? initialData.alternate_phone.slice(3) : initialData.alternate_phone) || "",
//         apartmentDetails: initialData.house_no || initialData.apartmentDetails || "",
//         apartmentName: initialData.building_name || initialData.apartmentName || "",
//         area: initialData.area || "",
//         landmark: initialData.landmark || "",
//         city: initialData.city || "",
//         country: initialData.country || "UAE",
//         address_type: initialData.address_type || "Normal",
//         email: initialData.email || "",
//         seller: initialData.seller || "",
//         isDefault: initialData.isDefault || false,
//       });
//     }
//   }, [initialData, mode]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === "phoneNumber" || name === "alternate_phone") {
//       const cleanedValue = value.replace(/\D/g, "").slice(0, 9);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: cleanedValue,
//       }));
//     } else if (name === "mob_no_country_code" || name === "alt_ph_country_code") {
//       const cleanedValue = value.replace(/\D/g, "").slice(0, 4);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: cleanedValue || "971",
//       }));
//     } else if (name === "country") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: "UAE",
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       !formData.addressName ||
//       !formData.phoneNumber ||
//       !formData.apartmentDetails ||
//       !formData.apartmentName ||
//       !formData.area ||
//       !formData.landmark ||
//       !formData.city ||
//       !formData.email ||
//       !formData.seller
//     ) {
//       alert("Please fill all required fields");
//       return;
//     }
//     if (mode === "add") {
//       addAddress();
//     } else if (mode === "edit") {
//       editAddress();
//     }
//   };

//   const addAddress = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth") || "{}");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/address`;

//       const payload = {
//         addressName: formData.addressName,
//         phoneNumber: `${formData.mob_no_country_code}${formData.phoneNumber}`,
//         apartmentDetails: formData.apartmentDetails,
//         apartmentName: formData.apartmentName,
//         area: formData.area,
//         landmark: formData.landmark,
//         city: formData.city,
//         country: formData.country,
//         address_type: formData.address_type,
//         email: formData.email,
//         seller: formData.seller,
//         isDefault: formData.isDefault,
//         ...(formData.alternate_phone && {
//           alternate_phone: `${formData.alt_ph_country_code}${formData.alternate_phone}`,
//         }),
//       };

//       console.log("Add payload:", payload);

//       const response = await axios.post(apiUrl, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 201) {
//         console.log("Address added successfully:", response.data);
//         const savedAddress = {
//           ...response.data.address,
//           name: response.data.address.name,
//           mobile_number: response.data.address.mobile_number,
//           house_no: response.data.address.house_no,
//           building_name: response.data.address.building_name,
//         };
//         onSave(savedAddress);
//         onClose();
//         resetForm();
//       } else {
//         console.error("Failed to add address:", response.data);
//         alert("Failed to add address");
//       }
//     } catch (error) {
//       console.error("Error adding address:", error.response?.data || error.message);
//       alert("Error adding address: " + (error.response?.data?.message || error.message));
//     }
//   };

//   const editAddress = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth") || "{}");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/edit/${initialData._id}`;

//       const payload = {
//         addressName: formData.addressName,
//         phoneNumber: `${formData.mob_no_country_code}${formData.phoneNumber}`,
//         apartmentDetails: formData.apartmentDetails,
//         apartmentName: formData.apartmentName,
//         area: formData.area,
//         landmark: formData.landmark,
//         city: formData.city,
//         country: formData.country,
//         address_type: formData.address_type,
//         email: formData.email,
//         seller: formData.seller,
//         isDefault: formData.isDefault,
//         ...(formData.alternate_phone && {
//           alternate_phone: `${formData.alt_ph_country_code}${formData.alternate_phone}`,
//         }),
//       };

//       console.log("Edit payload:", payload);

//       const response = await axios.put(apiUrl, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         console.log("Address updated successfully:", response.data);
//         const updatedAddress = {
//           ...response.data.address,
//           name: response.data.address.name,
//           mobile_number: response.data.address.mobile_number,
//           house_no: response.data.address.house_no,
//           building_name: response.data.address.building_name,
//         };
//         onSave(updatedAddress);
//         onClose();
//         resetForm();
//       } else {
//         console.error("Failed to update address:", response.data);
//         alert("Failed to update address");
//       }
//     } catch (error) {
//       console.error("Error updating address:", error.response?.data || error.message);
//       alert("Error updating address: " + (error.response?.data?.message || error.message));
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       addressName: "",
//       mob_no_country_code: "971",
//       phoneNumber: "",
//       alt_ph_country_code: "971",
//       alternate_phone: "",
//       apartmentDetails: "",
//       apartmentName: "",
//       area: "",
//       landmark: "",
//       city: "",
//       country: "UAE",
//       address_type: "Normal",
//       email: "",
//       seller: "",
//       isDefault: false,
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-2xl mx-4 overflow-y-auto max-h-[90vh] relative">
//         <div className="px-8 py-6 border-b border-gray-100">
//           <div className="flex justify-between items-center">
//             <h2 className="text-3xl font-luckiest">
//               {mode === "add" ? "ADD NEW PICKUP ADDRESS" : "EDIT PICKUP ADDRESS"}
//             </h2>
//             <button
//               onClick={onClose}
//               className="w-8 h-8 rounded-full flex items-center justify-center border border-black hover:bg-gray-100"
//             >
//               <X className="w-5 h-5 text-black" strokeWidth={3} />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Full Name</label>
//               <input
//                 type="text"
//                 name="addressName"
//                 value={formData.addressName}
//                 onChange={handleChange}
//                 placeholder="Enter Full Name (e.g., Ashwin Bhagat)"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Mobile Country Code</label>
//               <input
//                 type="text"
//                 name="mob_no_country_code"
//                 value={formData.mob_no_country_code}
//                 onChange={handleChange}
//                 placeholder="e.g., 971"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 placeholder="Enter Mobile Number (e.g., 501234567)"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Alternate Country Code (Optional)</label>
//               <input
//                 type="text"
//                 name="alt_ph_country_code"
//                 value={formData.alt_ph_country_code}
//                 onChange={handleChange}
//                 placeholder="e.g., 971"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Alternate Phone Number (Optional)</label>
//               <input
//                 type="tel"
//                 name="alternate_phone"
//                 value={formData.alternate_phone}
//                 onChange={handleChange}
//                 placeholder="Enter Alternate Phone Number (e.g., 528765432)"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">House No</label>
//               <input
//                 type="text"
//                 name="apartmentDetails"
//                 value={formData.apartmentDetails}
//                 onChange={handleChange}
//                 placeholder="Enter House No (e.g., A-15)"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Building Name</label>
//               <input
//                 type="text"
//                 name="apartmentName"
//                 value={formData.apartmentName}
//                 onChange={handleChange}
//                 placeholder="Enter Building Name (e.g., Dubai Marina Mall)"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Area</label>
//               <input
//                 type="text"
//                 name="area"
//                 value={formData.area}
//                 onChange={handleChange}
//                 placeholder="Enter Area (e.g., Dubai Marina)"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Landmark</label>
//               <input
//                 type="text"
//                 name="landmark"
//                 value={formData.landmark}
//                 onChange={handleChange}
//                 placeholder="Enter Landmark (e.g., Near Marina Walk)"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">City</label>
//               <select
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               >
//                 <option value="">Select City</option>
//                 <option value="Abu Dhabi">Abu Dhabi</option>
//                 <option value="Ajman">Ajman</option>
//                 <option value="Al-Ain">Al-Ain</option>
//                 <option value="Dubai">Dubai</option>
//                 <option value="Fujairah">Fujairah</option>
//                 <option value="Ras Al Khaimah">Ras Al Khaimah</option>
//                 <option value="Sharjah">Sharjah</option>
//                 <option value="Umm Al-Quwain">Umm Al-Quwain</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 placeholder="Enter Country"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 readOnly
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter Email (e.g., ashwinbt.moshimoshi@gmail.com)"
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Select Seller</label>
//               <select
//                 name="seller"
//                 value={formData.seller}
//                 onChange={handleChange}
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               >
//                 <option value="">Select Seller</option>
//                 {productsData?.map((product) => (
//                   <option key={product.id} value={product.id}>
//                     {product.name}
//                   </option>
//                 ))}
//               </select>
//             </div> */}

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Set as Default Address</label>
//               <input
//                 type="checkbox"
//                 name="isDefault"
//                 checked={formData.isDefault}
//                 onChange={handleChange}
//                 className="h-5 w-5 text-yellow-500 focus:ring-yellow-500"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end space-x-4 pt-6">
//             <button
//               type="submit"
//               className="px-12 py-3 bg-[#FDE504] hover:bg-yellow-500 text-black rounded-lg font-medium"
//             >
//               SAVE
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-12 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
//             >
//               CANCEL
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PickupModal;








"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast"; // Import react-hot-toast

const PickupModal = ({ isOpen, onClose, onSave, mode = "add", initialData = null }) => {
  const [productsData, setProductsData] = useState([]);
  const [formData, setFormData] = useState({
    addressName: "",
    mob_no_country_code: "971",
    phoneNumber: "",
    alt_ph_country_code: "971",
    alternate_phone: "",
    apartmentDetails: "",
    apartmentName: "",
    area: "",
    landmark: "",
    city: "",
    country: "UAE",
    address_type: "Normal",
    email: "",
    seller: "",
    isDefault: false,
  });

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
        console.log("Unique sellers:", uniqueSellers);
        setProductsData(uniqueSellers);
        
        // Automatically set first seller if available
        if (uniqueSellers.length > 0 && !formData.seller) {
          setFormData((prev) => ({
            ...prev,
            seller: uniqueSellers[0].id,
          }));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch sellers");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        addressName: initialData.name || initialData.addressName || "",
        mob_no_country_code: initialData.mob_no_country_code || "971",
        phoneNumber: initialData.mobile_number || "",
        alt_ph_country_code: initialData.alt_ph_country_code || "971",
        alternate_phone: initialData.alternate_phone || "",
        apartmentDetails: initialData.house_no || initialData.apartmentDetails || "",
        apartmentName: initialData.building_name || initialData.apartmentName || "",
        area: initialData.area || "",
        landmark: initialData.landmark || "",
        city: initialData.city || "",
        country: initialData.country || "UAE",
        address_type: initialData.address_type || "Normal",
        email: initialData.email || "",
        seller: initialData.seller || "",
        isDefault: initialData.isDefault || false,
      });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "phoneNumber" || name === "alternate_phone") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 9);
      setFormData((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
    } else if (name === "mob_no_country_code" || name === "alt_ph_country_code") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 4);
      setFormData((prev) => ({
        ...prev,
        [name]: cleanedValue || "971",
      }));
    } else if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        [name]: "UAE",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.addressName ||
      !formData.phoneNumber ||
      !formData.apartmentDetails ||
      !formData.apartmentName ||
      !formData.area ||
      !formData.landmark ||
      !formData.city ||
      !formData.email
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (mode === "add") {
      addAddress();
    } else if (mode === "edit") {
      editAddress();
    }
  };

  const addAddress = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth") || "{}");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/address`;

      const payload = {
        name: formData.addressName,
        mob_no_country_code: formData.mob_no_country_code,
        mobile_number: formData.phoneNumber,
        house_no: formData.apartmentDetails,
        building_name: formData.apartmentName,
        area: formData.area,
        landmark: formData.landmark,
        city: formData.city,
        country: formData.country,
        address_type: formData.address_type,
        email: formData.email,
        seller: formData.seller,
        isDefault: formData.isDefault,
        ...(formData.alternate_phone && {
          alt_ph_country_code: formData.alt_ph_country_code,
          alternate_phone: formData.alternate_phone,
        }),
      };

      console.log("Add payload:", payload);

      const response = await axios.post(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log("Address added successfully:", response.data);
        toast.success("Pickup address added successfully!");
        const savedAddress = {
          ...response.data.address,
          name: response.data.address.name,
          mobile_number: response.data.address.mobile_number,
          house_no: response.data.address.house_no,
          building_name: response.data.address.building_name,
        };
        onSave(savedAddress);
        onClose();
        resetForm();
      } else {
        console.error("Failed to add address:", response.data);
        toast.error("Failed to add pickup address");
      }
    } catch (error) {
      console.error("Error adding address:", error.response?.data || error.message);
      toast.error(`Error adding pickup address: ${error.response?.data?.message || error.message}`);
    }
  };

  const editAddress = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth") || "{}");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/edit/${initialData._id}`;

      const payload = {
        name: formData.addressName,
        mob_no_country_code: formData.mob_no_country_code,
        mobile_number: formData.phoneNumber,
        house_no: formData.apartmentDetails,
        building_name: formData.apartmentName,
        area: formData.area,
        landmark: formData.landmark,
        city: formData.city,
        country: formData.country,
        address_type: formData.address_type,
        email: formData.email,
        seller: formData.seller,
        isDefault: formData.isDefault,
        ...(formData.alternate_phone && {
          alt_ph_country_code: formData.alt_ph_country_code,
          alternate_phone: formData.alternate_phone,
        }),
      };

      console.log("Edit payload:", payload);

      const response = await axios.put(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Address updated successfully:", response.data);
        toast.success("Pickup address updated successfully!");
        const updatedAddress = {
          ...response.data.address,
          name: response.data.address.name,
          mobile_number: response.data.address.mobile_number,
          house_no: response.data.address.house_no,
          building_name: response.data.address.building_name,
        };
        onSave(updatedAddress);
        onClose();
        resetForm();
      } else {
        console.error("Failed to update address:", response.data);
        toast.error("Failed to update pickup address");
      }
    } catch (error) {
      console.error("Error updating address:", error.response?.data || error.message);
      toast.error(`Error updating pickup address: ${error.response?.data?.message || error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      addressName: "",
      mob_no_country_code: "971",
      phoneNumber: "",
      alt_ph_country_code: "971",
      alternate_phone: "",
      apartmentDetails: "",
      apartmentName: "",
      area: "",
      landmark: "",
      city: "",
      country: "UAE",
      address_type: "Normal",
      email: "",
      seller: "",
      isDefault: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 overflow-y-auto max-h-[90vh] relative">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-luckiest">
              {mode === "add" ? "ADD NEW PICKUP ADDRESS" : "EDIT PICKUP ADDRESS"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-black hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-black" strokeWidth={3} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="addressName"
                value={formData.addressName}
                onChange={handleChange}
                placeholder="Enter Full Name (e.g., Ashwin Bhagat)"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Mobile Country Code</label>
              <input
                type="text"
                name="mob_no_country_code"
                value={formData.mob_no_country_code}
                onChange={handleChange}
                placeholder="e.g., 971"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Mobile Number (e.g., 501234567)"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Alternate Country Code (Optional)</label>
              <input
                type="text"
                name="alt_ph_country_code"
                value={formData.alt_ph_country_code}
                onChange={handleChange}
                placeholder="e.g., 971"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Alternate Phone Number (Optional)</label>
              <input
                type="tel"
                name="alternate_phone"
                value={formData.alternate_phone}
                onChange={handleChange}
                placeholder="Enter Alternate Phone Number (e.g., 528765432)"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">House No</label>
              <input
                type="text"
                name="apartmentDetails"
                value={formData.apartmentDetails}
                onChange={handleChange}
                placeholder="Enter House No (e.g., A-15)"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Building Name</label>
              <input
                type="text"
                name="apartmentName"
                value={formData.apartmentName}
                onChange={handleChange}
                placeholder="Enter Building Name (e.g., Dubai Marina Mall)"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Enter Area (e.g., Dubai Marina)"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Enter Landmark (e.g., Near Marina Walk)"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select City</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Ajman">Ajman</option>
                <option value="Al-Ain">Al-Ain</option>
                <option value="Dubai">Dubai</option>
                <option value="Fujairah">Fujairah</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Umm Al-Quwain">Umm Al-Quwain</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email (e.g., ashwinbt.moshimoshi@gmail.com)"
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          </div>

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
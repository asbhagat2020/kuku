



// "use client";

// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const AddressModal = ({ isOpen, onClose, onSave, mode = "add", initialData = null }) => {
//   const [formData, setFormData] = useState({
//     addressName: "",
//     mob_no_country_code: "971",
//     phoneNumber: "", // Store only the number part (e.g., "0505186403")
//     alt_ph_country_code: "971",
//     alternate_phone: "", // Store only the number part
//     apartmentDetails: "",
//     apartmentName: "",
//     area: "",
//     landmark: "",
//     city: "",
//     country: "UAE",
//     address_type: "Normal",
//     isDefault: false,
//   });

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
//         isDefault: initialData.isDefault || false,
//       });
//     }
//   }, [initialData, mode]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === "phoneNumber" || name === "alternate_phone") {
//       // Allow only digits, limit to 9 digits
//       const cleanedValue = value.replace(/\D/g, "").slice(0, 9);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: cleanedValue,
//       }));
//     } else if (name === "mob_no_country_code" || name === "alt_ph_country_code") {
//       // Limit country code to 4 digits
//       const cleanedValue = value.replace(/\D/g, "").slice(0, 4);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: cleanedValue || "971",
//       }));
//     } else if (name === "country") {
//       // Keep country as UAE
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
//     // Basic validation
//     if (
//       !formData.addressName ||
//       !formData.phoneNumber ||
//       !formData.apartmentDetails ||
//       !formData.apartmentName ||
//       !formData.area ||
//       !formData.landmark ||
//       !formData.city
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

// const addAddress = async () => {
//   try {
//     const token = JSON.parse(Cookies.get("auth") || "{}");
//     if (!token) {
//       throw new Error("No authentication token found");
//     }
//     const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/add`;

//     const payload = {
//       name: formData.addressName,
//       mob_no_country_code: formData.mob_no_country_code,
//       mobile_number: formData.phoneNumber,
//       house_no: formData.apartmentDetails,
//       building_name: formData.apartmentName,
//       area: formData.area,
//       landmark: formData.landmark,
//       city: formData.city,
//       country: formData.country,
//       address_type: formData.address_type,
//       isDefault: formData.isDefault,
//       ...(formData.alternate_phone && {
//         alt_ph_country_code: formData.alt_ph_country_code,
//         alternate_phone: formData.alternate_phone,
//       }),
//     };

//     const response = await axios.post(apiUrl, payload, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.status === 201) {
//       console.log("Address added successfully:", response.data);
//       const savedAddress = {
//         ...response.data.address,
//         name: response.data.address.name,
//         mobile_number: response.data.address.mobile_number,
//         house_no: response.data.address.house_no,
//         building_name: response.data.address.building_name,
//       };
//       onSave(savedAddress);
//       onClose();
//       resetForm();
//     } else {
//       console.error("Failed to add address:", response.data);
//       alert("Failed to add address");
//     }
//   } catch (error) {
//     console.error("Error adding address:", error.response?.data || error.message);
//     alert("Error adding address: " + (error.response?.data?.message || error.message));
//   }
// };

// const editAddress = async () => {
//   try {
//     const token = JSON.parse(Cookies.get("auth") || "{}");
//     if (!token) {
//       throw new Error("No authentication token found");
//     }
//     const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/edit/${initialData._id}`;

//     const payload = {
//       name: formData.addressName,
//       mob_no_country_code: formData.mob_no_country_code,
//       mobile_number: formData.phoneNumber,
//       house_no: formData.apartmentDetails,
//       building_name: formData.apartmentName,
//       area: formData.area,
//       landmark: formData.landmark,
//       city: formData.city,
//       country: formData.country,
//       address_type: formData.address_type,
//       isDefault: formData.isDefault,
//       ...(formData.alternate_phone && {
//         alt_ph_country_code: formData.alt_ph_country_code,
//         alternate_phone: formData.alternate_phone,
//       }),
//     };

//     console.log("Edit payload:", payload); // Log to verify

//     const response = await axios.put(apiUrl, payload, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.status === 200) {
//       console.log("Address updated successfully:", response.data);
//       const updatedAddress = {
//         ...response.data.address,
//         name: response.data.address.name,
//         mobile_number: response.data.address.mobile_number,
//         house_no: response.data.address.house_no,
//         building_name: response.data.address.building_name,
//       };
//       onSave(updatedAddress);
//       onClose();
//       resetForm();
//     } else {
//       console.error("Failed to update address:", response.data);
//       alert("Failed to update address");
//     }
//   } catch (error) {
//     console.error("Error updating address:", error.response?.data || error.message);
//     alert("Error updating address: " + (error.response?.data?.message || error.message));
//   }
// };

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
//               {mode === "add" ? "ADD NEW ADDRESS" : "EDIT ADDRESS"}
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
//                 placeholder="Enter Full Name"
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
//                 placeholder="Enter Mobile Number (e.g., 505186403)"
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
//                 placeholder="Enter Alternate Phone Number (e.g., 789654123)"
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
//                 placeholder="Enter House No (e.g., 43)"
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
//                 placeholder="Enter Building Name (e.g., Marina Heights)"
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
//               <label className="block text-sm font-medium text-gray-700">Address Type</label>
//               <select
//                 name="address_type"
//                 value={formData.address_type}
//                 onChange={handleChange}
//                 className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               >
//                 <option value="Normal">Normal</option>
//                 <option value="Western">Western</option>
//               </select>
//             </div>

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

// export default AddressModal;









"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast"; // Import react-hot-toast

const AddressModal = ({ isOpen, onClose, onSave, mode = "add", initialData = null }) => {
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
    isDefault: false,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        addressName: initialData.name || initialData.addressName || "",
        mob_no_country_code: initialData.mob_no_country_code || (initialData.phoneNumber?.startsWith("971") ? "971" : "971"),
        phoneNumber: initialData.mobile_number || (initialData.phoneNumber?.startsWith("971") ? initialData.phoneNumber.slice(3) : initialData.phoneNumber) || "",
        alt_ph_country_code: initialData.alt_ph_country_code || (initialData.alternate_phone?.startsWith("971") ? "971" : "971"),
        alternate_phone: initialData.alternate_phone || (initialData.alternate_phone?.startsWith("971") ? initialData.alternate_phone.slice(3) : initialData.alternate_phone) || "",
        apartmentDetails: initialData.house_no || initialData.apartmentDetails || "",
        apartmentName: initialData.building_name || initialData.apartmentName || "",
        area: initialData.area || "",
        landmark: initialData.landmark || "",
        city: initialData.city || "",
        country: initialData.country || "UAE",
        address_type: initialData.address_type || "Normal",
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
      !formData.city
    ) {
      toast.error("Please fill all required fields"); // Toast for validation error
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
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/add`;

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
        isDefault: formData.isDefault,
        ...(formData.alternate_phone && {
          alt_ph_country_code: formData.alt_ph_country_code,
          alternate_phone: formData.alternate_phone,
        }),
      };

      const response = await axios.post(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log("Address added successfully:", response.data);
        toast.success("Address added successfully!"); // Success toast
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
        toast.error("Failed to add address"); // Error toast
      }
    } catch (error) {
      console.error("Error adding address:", error.response?.data || error.message);
      toast.error(`Error adding address: ${error.response?.data?.message || error.message}`); // Error toast
    }
  };

  const editAddress = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth") || "{}");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/edit/${initialData._id}`;

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
        isDefault: formData.isDefault,
        ...(formData.alternate_phone && {
          alt_ph_country_code: formData.alt_ph_country_code,
          alternate_phone: formData.alternate_phone,
        }),
      };

      console.log("Edit payload:", payload); // Log to verify

      const response = await axios.put(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Address updated successfully:", response.data);
        toast.success("Address updated successfully!"); // Success toast
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
        toast.error("Failed to update address"); // Error toast
      }
    } catch (error) {
      console.error("Error updating address:", error.response?.data || error.message);
      toast.error(`Error updating address: ${error.response?.data?.message || error.message}`); // Error toast
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

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="addressName"
                value={formData.addressName}
                onChange={handleChange}
                placeholder="Enter Full Name"
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
                placeholder="Enter Mobile Number (e.g., 505186403)"
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
                placeholder="Enter Alternate Phone Number (e.g., 789654123)"
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
                placeholder="Enter House No (e.g., 43)"
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
                placeholder="Enter Building Name (e.g., Marina Heights)"
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
              <label className="block text-sm font-medium text-gray-700">Address Type</label>
              <select
                name="address_type"
                value={formData.address_type}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="Normal">Normal</option>
                <option value="Western">Western</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Set as Default Address</label>
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-5 w-5 text-yellow-500 focus:ring-yellow-500"
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

export default AddressModal;
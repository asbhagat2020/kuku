





// "use client";

// import React, { useState, useEffect } from "react";
// import Lottie from "react-lottie-player";
// import clothHangerAnimation from "../public/lottieFiles/cloth_hanger.json";
// import playgroundAnimation from "../public/lottieFiles/playground.json";
// import giftboxAnimation from "../public/lottieFiles/giftbox.json";
// import homeAnimation from "../public/lottieFiles/kukuhomenew.json";
// import axios from "axios";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import GiveAwayShareModal from "./GiveAwayShareModal";

// const AddressSelection = ({ addresses, selectedAddress, onSelect, onAddNew }) => {
//   const [selectedType, setSelectedType] = useState("existing");

//   const handleTypeChange = (type) => {
//     setSelectedType(type);
//     if (type === "new") {
//       onAddNew();
//     }
//   };

//   return (
//     <div className="space-y-6 font-karla">
//       <div className="flex gap-6 mb-6">
//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="radio"
//             name="addressType"
//             checked={selectedType === "existing"}
//             onChange={() => handleTypeChange("existing")}
//             className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//           />
//           <span className="text-gray-700">Use Existing Address</span>
//         </label>
//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="radio"
//             name="addressType"
//             checked={selectedType === "new"}
//             onChange={() => handleTypeChange("new")}
//             className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//           />
//           <span className="text-gray-700">Add New Address</span>
//         </label>
//       </div>

//       {selectedType === "existing" && addresses?.length > 0 ? (
//         <div className="space-y-4">
//           {addresses.map((address) => (
//             <div
//               key={address._id}
//               className={`border rounded-lg p-4 cursor-pointer transition-all ${
//                 selectedAddress?._id === address._id
//                   ? "border-2 border-pink-500"
//                   : "border-gray-200 hover:border-pink-300"
//               }`}
//               onClick={() => onSelect(address)}
//             >
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   <p className="font-semibold">{address.name}</p>
//                   <p className="text-sm text-gray-600">
//                     {`+971${address.mobile_number}`}
//                   </p>
//                   <p className="text-sm text-gray-600">{address.email}</p>
//                   <p className="text-sm text-gray-600">
//                     {`${address.house_no}, ${address.building_name}, ${address.area}`}
//                     {address.landmark && `, ${address.landmark}`}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {address.city}, {address.country}
//                   </p>
//                 </div>
//                 <div className="mt-2">
//                   <input
//                     type="radio"
//                     checked={selectedAddress?._id === address._id}
//                     onChange={() => onSelect(address)}
//                     className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : selectedType === "existing" ? (
//         <p className="text-gray-500 italic">
//           No saved addresses found. Please add a new address.
//         </p>
//       ) : null}
//     </div>
//   );
// };

// const Giveaway = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showFinalScreen, setShowFinalScreen] = useState(false);
//   const [isMobileView, setIsMobileView] = useState(false);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [createdGiveawayId, setCreatedGiveawayId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     mob_no_country_code: "+971",
//     mobile_number: "",
//     house_no: "",
//     building_name: "",
//     area: "",
//     landmark: "",
//     city: "",
//     email: "",
//     country: "UAE",
//     pickTime: "",
//     weight: "",
//     items: [],
//     category: "",
//     agreeTerms: false,
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [sampleAddresses, setSampleAddresses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const fetchAddress = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       if (!token) {
//         toast.error("Please login to access addresses");
//         return;
//       }

//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/get`;
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSampleAddresses(response?.data?.addresses || []);
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         Cookies.remove("auth");
//         toast.error("Session expired. Please login again");
//         router.push("/login");
//       } else {
//         toast.error("Error fetching addresses");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const validateForm = () => {
//     const errors = {};

//     if (currentStep === 2) {
//       if (!formData.name.trim()) errors.name = "Name is required";
//       if (!formData.mobile_number.trim()) errors.mobile_number = "Mobile number is required";
//       if (!formData.email.trim()) {
//         errors.email = "Email is required";
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//         errors.email = "Please enter a valid email address";
//       }
//     }

//     if (currentStep === 3) {
//       if (!selectedAddress && !showAddressForm) {
//         errors.pickupAddress = "Please select an existing address or add a new one";
//       }
//       if (showAddressForm) {
//         if (!formData.name.trim()) errors.name = "Name is required";
//         if (!formData.mobile_number.trim()) errors.mobile_number = "Mobile number is required";
//         if (!formData.email.trim()) {
//           errors.email = "Email is required";
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//           errors.email = "Please enter a valid email address";
//         }
//         if (!formData.house_no.trim()) errors.house_no = "House number is required";
//         if (!formData.building_name.trim()) errors.building_name = "Building name is required";
//         if (!formData.area.trim()) errors.area = "Area is required";
//         if (!formData.landmark.trim()) errors.landmark = "Landmark is required";
//         if (!formData.city.trim()) errors.city = "City is required";
//       }
//       if (!formData.pickTime) errors.pickTime = "Pick time is required";
//       if (!formData.weight || Number(formData.weight) <= 0) {
//         errors.weight = "Number of items is required";
//       } else if (Number(formData.weight) < 10) {
//         errors.weight = "Minimum 10 items required";
//       }
//       if (!formData.items || formData.items.length === 0)
//         errors.items = "At least one item must be selected";
//       if (!formData.agreeTerms) errors.agreeTerms = "You must agree to the terms";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleNext = () => {
//     if (currentStep === 2 || currentStep === 3) {
//       if (!validateForm()) {
//         const firstError = document.querySelector(".text-red-500");
//         if (firstError) {
//           firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//         return;
//       }
//     }
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const goToStep = (step) => {
//     if (step <= currentStep) {
//       setCurrentStep(step);
//     }
//   };

//   const handleFinalScreen = async () => {
//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//       return;
//     }

//     const pickupAddress = selectedAddress
//       ? selectedAddress._id
//       : {
//           name: formData.name,
//           mob_no_country_code: formData.mob_no_country_code,
//           mobile_number: formData.mobile_number,
//           alt_ph_country_code: "",
//           alternate_phone: "",
//           house_no: formData.house_no,
//           building_name: formData.building_name,
//           area: formData.area,
//           landmark: formData.landmark,
//           city: formData.city,
//           email: formData.email,
//           country: formData.country,
//           seller: null,
//           isDefault: false,
//           address_type: "Normal",
//         };

//     const finalData = {
//       pickupAddress,
//       pickupTime: formData.pickTime,
//       numberOfItems: formData.weight,
//       items: formData.items,
//       category: formData.category,
//     };

//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       if (!token) {
//         toast.error("Please login to create giveaway");
//         return;
//       }

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/giveaways/giveaways`,
//         finalData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 201) {
//         toast.success("Giveaway Created successfully! You will be contacted by the KuKu team further.");
//         setCreatedGiveawayId(response.data.id || response.data.giveawayId || Date.now().toString());
//         setShowFinalScreen(true);
//       } else {
//         throw new Error(response.data.message || "Failed to create giveaway");
//       }
//     } catch (error) {
//       console.error("Error creating giveaway:", error);
//       toast.error(error.response?.data?.message || "Failed to create giveaway. Please try again.");
//     }
//   };

//   const handleFinalScreenClick = () => {
//     setShowFinalScreen(false);
//     setShowShareModal(false);
//     setCurrentStep(1);
//     setFormData({
//       name: "",
//       mob_no_country_code: "+971",
//       mobile_number: "",
//       house_no: "",
//       building_name: "",
//       area: "",
//       landmark: "",
//       city: "",
//       email: "",
//       country: "UAE",
//       pickTime: "",
//       weight: "",
//       items: [],
//       category: "",
//       agreeTerms: false,
//     });
//     setSelectedAddress(null);
//     setFormErrors({});
//     setShowAddressForm(false);
//     setCreatedGiveawayId(null);
//   };

//   const handleShareClick = () => {
//     setShowShareModal(true);
//   };

//   const handleCloseShareModal = () => {
//     setShowShareModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (formErrors[name]) {
//       setFormErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleItemsChange = (e) => {
//     const { value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       items: prev.items.includes(value)
//         ? prev.items.filter((item) => item !== value)
//         : [...prev.items, value],
//     }));

//     if (formErrors.items) {
//       setFormErrors((prev) => ({
//         ...prev,
//         items: "",
//       }));
//     }
//   };

//   const handleBackButton = () => {
//     if (currentStep === 1) {
//       router.push("/");
//     } else {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const getGiveawayDetails = () => {
//     const city = selectedAddress ? selectedAddress.city : formData.city;
//     return {
//       id: createdGiveawayId,
//       items: formData.items,
//       numberOfItems: formData.weight,
//       city: city,
//     };
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="text-center max-w-2xl mx-auto">
//             <h2 className="text-2xl font-bold mb-8 font-karla">
//               Reuse Repurpose Recycle, let KuKu handle your textile by giving
//               the reusable to charity or recycling them partnered with textile
//               recyclers.
//             </h2>
//             <button
//               onClick={handleNext}
//               className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition border border-black font-karla"
//             >
//               NEXT STEP
//             </button>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="max-w-md mx-auto px-4">
//             <h2 className="text-2xl font-bold mb-12 text-center font-karla">
//               Fill Up the details
//             </h2>
//             <div className="grid grid-cols-2 gap-6">
//               <div className="col-span-1">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     formErrors.name ? "border-red-500" : "border-gray-300"
//                   } focus:outline-none focus:ring-2 focus:ring-green-500 font-karla`}
//                 />
//                 {formErrors.name && (
//                   <p className="text-red-500 text-sm mt-1 ml-4">
//                     {formErrors.name}
//                   </p>
//                 )}
//               </div>
//               <div className="col-span-1">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     formErrors.email ? "border-red-500" : "border-gray-300"
//                   } focus:outline-none focus:ring-2 focus:ring-green-500 font-karla`}
//                 />
//                 {formErrors.email && (
//                   <p className="text-red-500 text-sm mt-1 ml-4">
//                     {formErrors.email}
//                   </p>
//                 )}
//               </div>
//               <div className="col-span-1">
//                 <input
//                   type="text"
//                   name="mob_no_country_code"
//                   value="+971"
//                   readOnly
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none font-karla"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <input
//                   type="tel"
//                   name="mobile_number"
//                   placeholder="Mobile Number"
//                   value={formData.mobile_number}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     formErrors.mobile_number ? "border-red-500" : "border-gray-300"
//                   } focus:outline-none focus:ring-2 focus:ring-green-500 font-karla`}
//                 />
//                 {formErrors.mobile_number && (
//                   <p className="text-red-500 text-sm mt-1 ml-4">
//                     {formErrors.mobile_number}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="text-center mt-12">
//               <button
//                 onClick={handleNext}
//                 className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition border border-black font-karla"
//               >
//                 NEXT STEP
//               </button>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10 bg-white rounded-2xl font-karla overflow-x-clip">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
//                 Pickup Details
//               </p>
//               <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
//                 Step 3 of 3
//               </p>
//             </div>
//             <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla mb-2">
//               Please enter your pickup details
//             </p>
//             <div className="space-y-4">
//               <AddressSelection
//                 addresses={sampleAddresses}
//                 selectedAddress={selectedAddress}
//                 onSelect={(address) => {
//                   setSelectedAddress(address);
//                   setShowAddressForm(false);
//                   setFormData((prev) => ({
//                     ...prev,
//                     name: address.name || "",
//                     mob_no_country_code: "+971",
//                     mobile_number: address.mobile_number || "",
//                     house_no: address.house_no || "",
//                     building_name: address.building_name || "",
//                     area: address.area || "",
//                     landmark: address.landmark || "",
//                     city: address.city || "",
//                     email: address.email || "",
//                     country: "UAE",
//                   }));
//                   setFormErrors((prev) => ({
//                     ...prev,
//                     name: "",
//                     mobile_number: "",
//                     house_no: "",
//                     building_name: "",
//                     area: "",
//                     landmark: "",
//                     city: "",
//                     email: "",
//                     country: "",
//                     pickupAddress: "",
//                   }));
//                 }}
//                 onAddNew={() => {
//                   setShowAddressForm(true);
//                   setSelectedAddress(null);
//                   setFormData((prev) => ({
//                     ...prev,
//                     name: "",
//                     mob_no_country_code: "+971",
//                     mobile_number: "",
//                     house_no: "",
//                     building_name: "",
//                     area: "",
//                     landmark: "",
//                     city: "",
//                     email: "",
//                     country: "UAE",
//                   }));
//                 }}
//               />
//             </div>
//             {showAddressForm && (
//               <div className="flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]">
//                 <div className="w-full flex flex-col gap-6">
//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Name
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter your name"
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.name && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
//                       )}
//                     </div>
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Mobile Country Code
//                       </p>
//                       <input
//                         maxLength={4}
//                         value="+971"
//                         readOnly
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Mobile Number
//                       </p>
//                       <input
//                         maxLength={12}
//                         placeholder="Enter your mobile number"
//                         type="tel"
//                         name="mobile_number"
//                         value={formData.mobile_number}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.mobile_number && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.mobile_number}</p>
//                       )}
//                     </div>
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         House No
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter house number"
//                         type="text"
//                         name="house_no"
//                         value={formData.house_no}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.house_no && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.house_no}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Building Name
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter building name"
//                         type="text"
//                         name="building_name"
//                         value={formData.building_name}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.building_name && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.building_name}</p>
//                       )}
//                     </div>
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Area
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter area"
//                         type="text"
//                         name="area"
//                         value={formData.area}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.area && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.area}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Landmark
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter landmark"
//                         type="text"
//                         name="landmark"
//                         value={formData.landmark}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.landmark && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.landmark}</p>
//                       )}
//                     </div>
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         City
//                       </p>
//                       <select
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       >
//                         <option value="">Select a city</option>
//                         <option value="Abu Dhabi">Abu Dhabi</option>
//                         <option value="Ajman">Ajman</option>
//                         <option value="Al-Ain">Al-Ain</option>
//                         <option value="Dubai">Dubai</option>
//                         <option value="Fujairah">Fujairah</option>
//                         <option value="Ras Al Khaimah">Ras Al Khaimah</option>
//                         <option value="Sharjah">Sharjah</option>
//                         <option value="Umm Al-Quwain">Umm Al-Quwain</option>
//                       </select>
//                       {formErrors.city && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                       Country
//                     </p>
//                     <input
//                       maxLength={25}
//                       value="UAE"
//                       readOnly
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100"
//                     />
//                     {formErrors.country && (
//                       <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
//                     )}
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                       Email
//                     </p>
//                     <input
//                       maxLength={50}
//                       placeholder="Enter your email address"
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                     />
//                     {formErrors.email && (
//                       <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-6">
//               <div className="flex-1 flex flex-col">
//                 <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                   Time
//                 </p>
//                 <select
//                   name="pickTime"
//                   value={formData.pickTime}
//                   onChange={handleInputChange}
//                   className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
//                     formErrors.pickTime ? "border-red-500" : ""
//                   }`}
//                 >
//                   <option value="">Select pickup time</option>
//                   <option value="morning">9:30-12:00</option>
//                   <option value="afternoon">12:00-4:00</option>
//                   <option value="evening">4:00-8:00</option>
//                 </select>
//                 {formErrors.pickTime && (
//                   <p className="text-red-500 text-sm mt-1">{formErrors.pickTime}</p>
//                 )}
//               </div>
//               <div className="flex-1 flex flex-col">
//                 <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                   Number of items
//                 </p>
//                 <input
//                   maxLength={25}
//                   placeholder="Enter number of items (minimum 10)"
//                   type="number"
//                   name="weight"
//                   min="10"
//                   value={formData.weight}
//                   onChange={handleInputChange}
//                   className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
//                     formErrors.weight ? "border-red-500" : ""
//                   }`}
//                 />
//                 {formErrors.weight && (
//                   <p className="text-red-500 text-sm mt-1">{formErrors.weight}</p>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-6">
//               <div className="flex-1 flex flex-col">
//                 <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                   Items
//                 </p>
//                 <select
//                   name="items"
//                   onChange={handleItemsChange}
//                   className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
//                     formErrors.items ? "border-red-500" : ""
//                   }`}
//                 >
//                   <option value="">Select Item</option>
//                   <option value="cloths">Clothes</option>
//                   <option value="curtain">Curtains</option>
//                   <option value="bedsheet">Bedsheets</option>
//                 </select>
//                 {formErrors.items && (
//                   <p className="text-red-500 text-sm mt-1">{formErrors.items}</p>
//                 )}
//                 {formData.items.length > 0 && (
//                   <div className="mt-3">
//                     <p className="text-sm font-karla font-bold">Selected Items:</p>
//                     <div className="flex flex-wrap gap-2 mt-1">
//                       {formData.items.map((item) => (
//                         <span
//                           key={item}
//                           className="bg-gray-200 text-sm px-3 py-1 rounded-lg flex items-center gap-2"
//                         >
//                           {item}
//                           <button
//                             onClick={() =>
//                               setFormData((prev) => ({
//                                 ...prev,
//                                 items: prev.items.filter((i) => i !== item),
//                               }))
//                             }
//                             className="text-red-500 font-bold ml-2"
//                           >
//                             ✕
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex mt-8 sm:mt-[76px] gap-3 items-start sm:items-center">
//               <label className="custom-checkbox">
//                 <input
//                   type="checkbox"
//                   name="agreeTerms"
//                   checked={formData.agreeTerms}
//                   onChange={handleInputChange}
//                 />
//                 <span className="checkmark"></span>
//               </label>
//               <p className="text-base sm:text-xl font-normal font-karla leading-tight sm:leading-7">
//                 I agree to the{" "}
//                 <Link
//                   href={"/terms"}
//                   target="_blank"
//                   className="text-[#E4086F] underline"
//                 >
//                   KUKU Terms & Conditions.
//                 </Link>{" "}
//                 We protect your privacy and to understand how, Read our{" "}
//                 <Link
//                   target="_blank"
//                   className="text-[#E4086F] underline"
//                   href={"/policies"}
//                 >
//                   Privacy Policies
//                 </Link>{" "}
//               </p>
//             </div>
//             {formErrors.agreeTerms && (
//               <p className="text-red-500 text-sm mt-1">{formErrors.agreeTerms}</p>
//             )}
//             <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
//               <button
//                 onClick={handleFinalScreen}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
//               >
//                 List Now
//               </button>
//               <button
//                 onClick={() => setCurrentStep(2)}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const renderLottieAnimation = () => {
//     const animationData =
//       currentStep === 1
//         ? homeAnimation
//         : currentStep === 2
//         ? clothHangerAnimation
//         : playgroundAnimation;

//     if (isMobileView) {
//       return (
//         <div className="absolute inset-0 w-full h-full">
//           <Lottie
//             loop
//             play
//             rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
//             animationData={animationData}
//             style={{
//               width: "100vw",
//               height: "100vh",
//               objectFit: "cover",
//               position: "absolute",
//               left: 0,
//               top: 0,
//             }}
//           />
//         </div>
//       );
//     }

//     return (
//       <div className="flex justify-center items-center w-full lg:h-[50vh]">
//         <Lottie loop play animationData={animationData} className="w-full" />
//       </div>
//     );
//   };

//   return (
//     <>
//       {!showFinalScreen ? (
//         <div className="relative flex flex-col items-center min-h-screen w-screen overflow-hidden">
//           <div className="fixed inset-0 w-screen h-screen">
//             {renderLottieAnimation()}
//           </div>

//           <div className="relative z-10 w-full max-w-7xl px-6 pt-4">
//             <div className="flex justify-between items-center mb-8">
//               <div onClick={handleBackButton} className="cursor-pointer">
//                 <img src="/gv_arrow.png" alt="Back" className="w-8 h-8" />
//               </div>
//               <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
//             </div>

//             <div className="w-full md:w-[88%] flex justify-center items-center mb-12 mx-auto">
//               {[1, 2, 3].map((step) => (
//                 <span
//                   key={step}
//                   onClick={() => goToStep(step)}
//                   className={`w-1/3 h-1 mx-3 cursor-pointer ${
//                     currentStep >= step ? "bg-green-500" : "bg-gray-300"
//                   } rounded-full`}
//                 />
//               ))}
//             </div>

//             {renderStepContent()}
//           </div>
//         </div>
//       ) : (
//         <div className="final-screen flex flex-col justify-center items-center min-h-screen w-screen p-6">
//           <div className="absolute top-4 left-4 w-full max-w-7xl flex justify-start">
//             <img
//               src="/gv_arrow.png"
//               alt="Arrow"
//               className="cursor-pointer w-8 h-8 z-50"
//               onClick={handleFinalScreenClick}
//             />
//           </div>
//           <div className="text-center mt-[-200px] relative z-10">
//             <h1 className="text-green-500 text-4xl font-bold">Giveaway</h1>
//             <p className="text-[#151515] text-lg font-normal font-karla mt-4">
//               You will be contacted by the KuKu team further.
//             </p>
//           </div>
//           <button
//             onClick={handleShareClick}
//             className="px-8 py-2 mt-8 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition relative z-10"
//           >
//             Share on social
//           </button>
//           <Lottie
//             loop
//             play
//             rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
//             animationData={giftboxAnimation}
//             style={{
//               width: "100vw",
//               height: "100vh",
//               objectFit: "cover",
//               position: "absolute",
//               left: 0,
//               top: 0,
//               marginBottom: "10px",
//             }}
//           />
//           <button className="absolute top-4 right-4 z-10">
//             <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
//           </button>
//         </div>
//       )}

//       <GiveAwayShareModal
//         isOpen={showShareModal}
//         onClose={handleCloseShareModal}
//         giveawayDetails={getGiveawayDetails()}
//       />
//     </>
//   );
// };

// export default Giveaway;









// "use client";

// import React, { useState, useEffect } from "react";
// import Lottie from "react-lottie-player";
// import clothHangerAnimation from "../public/lottieFiles/cloth_hanger.json";
// import playgroundAnimation from "../public/lottieFiles/playground.json";
// import giftboxAnimation from "../public/lottieFiles/giftbox.json";
// import homeAnimation from "../public/lottieFiles/kukuhomenew.json";
// import axios from "axios";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import GiveAwayShareModal from "./GiveAwayShareModal";

// const AddressSelection = ({ addresses, selectedAddress, onSelect, onAddNew }) => {
//   const [selectedType, setSelectedType] = useState("existing");

//   const handleTypeChange = (type) => {
//     setSelectedType(type);
//     if (type === "new") {
//       onAddNew();
//     }
//   };

//   return (
//     <div className="space-y-6 font-karla">
//       <div className="flex gap-6 mb-6">
//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="radio"
//             name="addressType"
//             checked={selectedType === "existing"}
//             onChange={() => handleTypeChange("existing")}
//             className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//           />
//           <span className="text-gray-700">Use Existing Address</span>
//         </label>
//         <label className="flex items-center gap-2 cursor-pointer">
//           <input
//             type="radio"
//             name="addressType"
//             checked={selectedType === "new"}
//             onChange={() => handleTypeChange("new")}
//             className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//           />
//           <span className="text-gray-700">Add New Address</span>
//         </label>
//       </div>

//       {selectedType === "existing" && addresses?.length > 0 ? (
//         <div className="space-y-4">
//           {addresses.map((address) => (
//             <div
//               key={address._id}
//               className={`border rounded-lg p-4 cursor-pointer transition-all ${
//                 selectedAddress?._id === address._id
//                   ? "border-2 border-pink-500"
//                   : "border-gray-200 hover:border-pink-300"
//               }`}
//               onClick={() => onSelect(address)}
//             >
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   <p className="font-semibold">{address.name}</p>
//                   <p className="text-sm text-gray-600">
//                     {`+971${address.mobile_number}`}
//                   </p>
//                   <p className="text-sm text-gray-600">{address.email}</p>
//                   <p className="text-sm text-gray-600">
//                     {`${address.house_no}, ${address.building_name}, ${address.area}`}
//                     {address.landmark && `, ${address.landmark}`}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {address.city}, {address.country}
//                   </p>
//                 </div>
//                 <div className="mt-2">
//                   <input
//                     type="radio"
//                     checked={selectedAddress?._id === address._id}
//                     onChange={() => onSelect(address)}
//                     className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : selectedType === "existing" ? (
//         <p className="text-gray-500 italic">
//           No saved addresses found. Please add a new address.
//         </p>
//       ) : null}
//     </div>
//   );
// };

// const Giveaway = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showFinalScreen, setShowFinalScreen] = useState(false);
//   const [isMobileView, setIsMobileView] = useState(false);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [createdGiveawayId, setCreatedGiveawayId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     mob_no_country_code: "+971",
//     mobile_number: "",
//     house_no: "",
//     building_name: "",
//     area: "",
//     landmark: "",
//     city: "",
//     email: "",
//     country: "UAE",
//     pickTime: "",
//     weight: "",
//     items: [],
//     category: "",
//     agreeTerms: false,
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [sampleAddresses, setSampleAddresses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const fetchAddress = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       if (!token) {
//         toast.error("Please login to access addresses");
//         return;
//       }

//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/get`;
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSampleAddresses(response?.data?.addresses || []);
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         Cookies.remove("auth");
//         toast.error("Session expired. Please login again");
//         router.push("/login");
//       } else {
//         toast.error("Error fetching addresses");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserDetails = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       if (!token) {
//         toast.error("Please login to access user details");
//         return;
//       }

//       const user = JSON.parse(Cookies.get("user"));
//       const id = user._id;

//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/details/${id}`;
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = response.data;
//       setFormData((prev) => ({
//         ...prev,
//         name: data.profile.name || "",
//         email: data.profile.email || "",
//         mobile_number: data.profile.phone || "",
//       }));
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         Cookies.remove("auth");
//         toast.error("Session expired. Please login again");
//         router.push("/login");
//       } else {
//         toast.error("Error fetching user details");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchAddress();
//     fetchUserDetails();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const validateForm = () => {
//     const errors = {};

//     if (currentStep === 2) {
//       if (!formData.name.trim()) errors.name = "Name is required";
//       if (!formData.mobile_number.trim()) errors.mobile_number = "Mobile number is required";
//       if (!formData.email.trim()) {
//         errors.email = "Email is required";
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//         errors.email = "Please enter a valid email address";
//       }
//     }

//     if (currentStep === 3) {
//       if (!selectedAddress && !showAddressForm) {
//         errors.pickupAddress = "Please select an existing address or add a new one";
//       }
//       if (showAddressForm) {
//         if (!formData.name.trim()) errors.name = "Name is required";
//         if (!formData.mobile_number.trim()) errors.mobile_number = "Mobile number is required";
//         if (!formData.email.trim()) {
//           errors.email = "Email is required";
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//           errors.email = "Please enter a valid email address";
//         }
//         if (!formData.house_no.trim()) errors.house_no = "House number is required";
//         if (!formData.building_name.trim()) errors.building_name = "Building name is required";
//         if (!formData.area.trim()) errors.area = "Area is required";
//         if (!formData.landmark.trim()) errors.landmark = "Landmark is required";
//         if (!formData.city.trim()) errors.city = "City is required";
//       }
//       if (!formData.pickTime) errors.pickTime = "Pick time is required";
//       if (!formData.weight || Number(formData.weight) <= 0) {
//         errors.weight = "Number of items is required";
//       } else if (Number(formData.weight) < 10) {
//         errors.weight = "Minimum 10 items required";
//       }
//       if (!formData.items || formData.items.length === 0)
//         errors.items = "At least one item must be selected";
//       if (!formData.agreeTerms) errors.agreeTerms = "You must agree to the terms";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleNext = () => {
//     if (currentStep === 2 || currentStep === 3) {
//       if (!validateForm()) {
//         const firstError = document.querySelector(".text-red-500");
//         if (firstError) {
//           firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//         return;
//       }
//     }
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const goToStep = (step) => {
//     if (step <= currentStep) {
//       setCurrentStep(step);
//     }
//   };

//   const handleFinalScreen = async () => {
//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//       return;
//     }

//     const pickupAddress = selectedAddress
//       ? selectedAddress._id
//       : {
//           name: formData.name,
//           mob_no_country_code: formData.mob_no_country_code,
//           mobile_number: formData.mobile_number,
//           alt_ph_country_code: "",
//           alternate_phone: "",
//           house_no: formData.house_no,
//           building_name: formData.building_name,
//           area: formData.area,
//           landmark: formData.landmark,
//           city: formData.city,
//           email: formData.email,
//           country: formData.country,
//           seller: null,
//           isDefault: false,
//           address_type: "Normal",
//         };

//     const finalData = {
//       pickupAddress,
//       pickupTime: formData.pickTime,
//       numberOfItems: formData.weight,
//       items: formData.items,
//       category: formData.category,
//     };

//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       if (!token) {
//         toast.error("Please login to create giveaway");
//         return;
//       }

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/giveaways/giveaways`,
//         finalData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 201) {
//         toast.success("Giveaway Created successfully! You will be contacted by the KuKu team further.");
//         setCreatedGiveawayId(response.data.id || response.data.giveawayId || Date.now().toString());
//         setShowFinalScreen(true);
//       } else {
//         throw new Error(response.data.message || "Failed to create giveaway");
//       }
//     } catch (error) {
//       console.error("Error creating giveaway:", error);
//       toast.error(error.response?.data?.message || "Failed to create giveaway. Please try again.");
//     }
//   };

//   const handleFinalScreenClick = () => {
//     setShowFinalScreen(false);
//     setShowShareModal(false);
//     setCurrentStep(1);
//     setFormData({
//       name: "",
//       mob_no_country_code: "+971",
//       mobile_number: "",
//       house_no: "",
//       building_name: "",
//       area: "",
//       landmark: "",
//       city: "",
//       email: "",
//       country: "UAE",
//       pickTime: "",
//       weight: "",
//       items: [],
//       category: "",
//       agreeTerms: false,
//     });
//     setSelectedAddress(null);
//     setFormErrors({});
//     setShowAddressForm(false);
//     setCreatedGiveawayId(null);
//     fetchUserDetails(); // Re-fetch user details to reset form
//   };

//   const handleShareClick = () => {
//     setShowShareModal(true);
//   };

//   const handleCloseShareModal = () => {
//     setShowShareModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (formErrors[name]) {
//       setFormErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleItemsChange = (e) => {
//     const { value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       items: prev.items.includes(value)
//         ? prev.items.filter((item) => item !== value)
//         : [...prev.items, value],
//     }));

//     if (formErrors.items) {
//       setFormErrors((prev) => ({
//         ...prev,
//         items: "",
//       }));
//     }
//   };

//   const handleBackButton = () => {
//     if (currentStep === 1) {
//       router.push("/");
//     } else {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const getGiveawayDetails = () => {
//     const city = selectedAddress ? selectedAddress.city : formData.city;
//     return {
//       id: createdGiveawayId,
//       items: formData.items,
//       numberOfItems: formData.weight,
//       city: city,
//     };
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="text-center max-w-2xl mx-auto">
//             <h2 className="text-2xl font-bold mb-8 font-karla">
//               Reuse Repurpose Recycle, let KuKu handle your textile by giving
//               the reusable to charity or recycling them partnered with textile
//               recyclers.
//             </h2>
//             <button
//               onClick={handleNext}
//               className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition border border-black font-karla"
//             >
//               NEXT STEP
//             </button>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="max-w-md mx-auto px-4">
//             <h2 className="text-2xl font-bold mb-12 text-center font-karla">
//               Fill Up the details
//             </h2>
//             <div className="grid grid-cols-2 gap-6">
//               <div className="col-span-1">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   readOnly
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     formErrors.name ? "border-red-500" : "border-gray-300"
//                   } focus:outline-none font-karla bg-gray-100 cursor-not-allowed`}
//                 />
//                 {formErrors.name && (
//                   <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.name}</p>
//                 )}
//               </div>
//               <div className="col-span-1">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   readOnly
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     formErrors.email ? "border-red-500" : "border-gray-300"
//                   } focus:outline-none font-karla bg-gray-100 cursor-not-allowed`}
//                 />
//                 {formErrors.email && (
//                   <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.email}</p>
//                 )}
//               </div>
//               <div className="col-span-1">
//                 <input
//                   type="text"
//                   name="mob_no_country_code"
//                   value="+971"
//                   readOnly
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none font-karla"
//                 />
//               </div>
//               <div className="col-span-1">
//                 <input
//                   type="tel"
//                   name="mobile_number"
//                   placeholder="Mobile Number"
//                   value={formData.mobile_number}
//                   readOnly
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     formErrors.mobile_number ? "border-red-500" : "border-gray-300"
//                   } focus:outline-none font-karla bg-gray-100 cursor-not-allowed`}
//                 />
//                 {formErrors.mobile_number && (
//                   <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.mobile_number}</p>
//                 )}
//               </div>
//             </div>
//             <div className="text-center mt-12">
//               <button
//                 onClick={handleNext}
//                 className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition border border-black font-karla"
//               >
//                 NEXT STEP
//               </button>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10 bg-white rounded-2xl font-karla overflow-x-clip">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
//                 Pickup Details
//               </p>
//               <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
//                 Step 3 of 3
//               </p>
//             </div>
//             <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla mb-2">
//               Please enter your pickup details
//             </p>
//             <div className="space-y-4">
//               <AddressSelection
//                 addresses={sampleAddresses}
//                 selectedAddress={selectedAddress}
//                 onSelect={(address) => {
//                   setSelectedAddress(address);
//                   setShowAddressForm(false);
//                   setFormData((prev) => ({
//                     ...prev,
//                     name: address.name || "",
//                     mob_no_country_code: "+971",
//                     mobile_number: address.mobile_number || "",
//                     house_no: address.house_no || "",
//                     building_name: address.building_name || "",
//                     area: address.area || "",
//                     landmark: address.landmark || "",
//                     city: address.city || "",
//                     email: address.email || "",
//                     country: "UAE",
//                   }));
//                   setFormErrors((prev) => ({
//                     ...prev,
//                     name: "",
//                     mobile_number: "",
//                     house_no: "",
//                     building_name: "",
//                     area: "",
//                     landmark: "",
//                     city: "",
//                     email: "",
//                     country: "",
//                     pickupAddress: "",
//                   }));
//                 }}
//                 onAddNew={() => {
//                   setShowAddressForm(true);
//                   setSelectedAddress(null);
//                   setFormData((prev) => ({
//                     ...prev,
//                     house_no: "",
//                     building_name: "",
//                     area: "",
//                     landmark: "",
//                     city: "",
//                     country: "UAE",
//                   }));
//                 }}
//               />
//             </div>
//             {showAddressForm && (
//               <div className="flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]">
//                 <div className="w-full flex flex-col gap-6">
//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Name
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter your name"
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         readOnly
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100 cursor-not-allowed"
//                       />
//                       {formErrors.name && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
//                       )}
//                     </div>
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Mobile Country Code
//                       </p>
//                       <input
//                         maxLength={4}
//                         value="+971"
//                         readOnly
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Mobile Number
//                       </p>
//                       <input
//                         maxLength={12}
//                         placeholder="Enter your mobile number"
//                         type="tel"
//                         name="mobile_number"
//                         value={formData.mobile_number}
//                         readOnly
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100 cursor-not-allowed"
//                       />
//                       {formErrors.mobile_number && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.mobile_number}</p>
//                       )}
//                     </div>
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         House No
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter house number"
//                         type="text"
//                         name="house_no"
//                         value={formData.house_no}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.house_no && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.house_no}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Building Name
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter building name"
//                         type="text"
//                         name="building_name"
//                         value={formData.building_name}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.building_name && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.building_name}</p>
//                       )}
//                     </div>
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Area
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter area"
//                         type="text"
//                         name="area"
//                         value={formData.area}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.area && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.area}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Landmark
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter landmark"
//                         type="text"
//                         name="landmark"
//                         value={formData.landmark}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {formErrors.landmark && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.landmark}</p>
//                       )}
//                     </div>
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         City
//                       </p>
//                       <select
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       >
//                         <option value="">Select a city</option>
//                         <option value="Abu Dhabi">Abu Dhabi</option>
//                         <option value="Ajman">Ajman</option>
//                         <option value="Al-Ain">Al-Ain</option>
//                         <option value="Dubai">Dubai</option>
//                         <option value="Fujairah">Fujairah</option>
//                         <option value="Ras Al Khaimah">Ras Al Khaimah</option>
//                         <option value="Sharjah">Sharjah</option>
//                         <option value="Umm Al-Quwain">Umm Al-Quwain</option>
//                       </select>
//                       {formErrors.city && (
//                         <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                       Country
//                     </p>
//                     <input
//                       maxLength={25}
//                       value="UAE"
//                       readOnly
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100"
//                     />
//                     {formErrors.country && (
//                       <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
//                     )}
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                       Email
//                     </p>
//                     <input
//                       maxLength={50}
//                       placeholder="Enter your email address"
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       readOnly
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100 cursor-not-allowed"
//                     />
//                     {formErrors.email && (
//                       <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-6">
//               <div className="flex-1 flex flex-col">
//                 <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                   Time
//                 </p>
//                 <select
//                   name="pickTime"
//                   value={formData.pickTime}
//                   onChange={handleInputChange}
//                   className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
//                     formErrors.pickTime ? "border-red-500" : ""
//                   }`}
//                 >
//                   <option value="">Select pickup time</option>
//                   <option value="morning">9:30-12:00</option>
//                   <option value="afternoon">12:00-4:00</option>
//                   <option value="evening">4:00-8:00</option>
//                 </select>
//                 {formErrors.pickTime && (
//                   <p className="text-red-500 text-sm mt-1">{formErrors.pickTime}</p>
//                 )}
//               </div>
//               <div className="flex-1 flex flex-col">
//                 <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                   Number of items
//                 </p>
//                 <input
//                   maxLength={25}
//                   placeholder="Enter number of items (minimum 10)"
//                   type="number"
//                   name="weight"
//                   min="10"
//                   value={formData.weight}
//                   onChange={handleInputChange}
//                   className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
//                     formErrors.weight ? "border-red-500" : ""
//                   }`}
//                 />
//                 {formErrors.weight && (
//                   <p className="text-red-500 text-sm mt-1">{formErrors.weight}</p>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-6">
//               <div className="flex-1 flex flex-col">
//                 <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                   Items
//                 </p>
//                 <select
//                   name="items"
//                   onChange={handleItemsChange}
//                   className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
//                     formErrors.items ? "border-red-500" : ""
//                   }`}
//                 >
//                   <option value="">Select Item</option>
//                   <option value="cloths">Clothes</option>
//                   <option value="curtain">Curtains</option>
//                   <option value="bedsheet">Bedsheets</option>
//                 </select>
//                 {formErrors.items && (
//                   <p className="text-red-500 text-sm mt-1">{formErrors.items}</p>
//                 )}
//                 {formData.items.length > 0 && (
//                   <div className="mt-3">
//                     <p className="text-sm font-karla font-bold">Selected Items:</p>
//                     <div className="flex flex-wrap gap-2 mt-1">
//                       {formData.items.map((item) => (
//                         <span
//                           key={item}
//                           className="bg-gray-200 text-sm px-3 py-1 rounded-lg flex items-center gap-2"
//                         >
//                           {item}
//                           <button
//                             onClick={() =>
//                               setFormData((prev) => ({
//                                 ...prev,
//                                 items: prev.items.filter((i) => i !== item),
//                               }))
//                             }
//                             className="text-red-500 font-bold ml-2"
//                           >
//                             ✕
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex mt-8 sm:mt-[76px] gap-3 items-start sm:items-center">
//               <label className="custom-checkbox">
//                 <input
//                   type="checkbox"
//                   name="agreeTerms"
//                   checked={formData.agreeTerms}
//                   onChange={handleInputChange}
//                 />
//                 <span className="checkmark"></span>
//               </label>
//               <p className="text-base sm:text-xl font-normal font-karla leading-tight sm:leading-7">
//                 I agree to the{" "}
//                 <Link
//                   href={"/terms"}
//                   target="_blank"
//                   className="text-[#E4086F] underline"
//                 >
//                   KUKU Terms & Conditions.
//                 </Link>{" "}
//                 We protect your privacy and to understand how, Read our{" "}
//                 <Link
//                   target="_blank"
//                   className="text-[#E4086F] underline"
//                   href={"/policies"}
//                 >
//                   Privacy Policies
//                 </Link>{" "}
//               </p>
//             </div>
//             {formErrors.agreeTerms && (
//               <p className="text-red-500 text-sm mt-1">{formErrors.agreeTerms}</p>
//             )}
//             <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
//               <button
//                 onClick={handleFinalScreen}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
//               >
//                 List Now
//               </button>
//               <button
//                 onClick={() => setCurrentStep(2)}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const renderLottieAnimation = () => {
//     const animationData =
//       currentStep === 1
//         ? homeAnimation
//         : currentStep === 2
//         ? clothHangerAnimation
//         : playgroundAnimation;

//     if (isMobileView) {
//       return (
//         <div className="absolute inset-0 w-full h-full">
//           <Lottie
//             loop
//             play
//             rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
//             animationData={animationData}
//             style={{
//               width: "100vw",
//               height: "100vh",
//               objectFit: "cover",
//               position: "absolute",
//               left: 0,
//               top: 0,
//             }}
//           />
//         </div>
//       );
//     }

//     return (
//       <div className="flex justify-center items-center w-full lg:h-[50vh]">
//         <Lottie loop play animationData={animationData} className="w-full" />
//       </div>
//     );
//   };

//   return (
//     <>
//       {!showFinalScreen ? (
//         <div className="relative flex flex-col items-center min-h-screen w-screen overflow-hidden">
//           <div className="fixed inset-0 w-screen h-screen">
//             {renderLottieAnimation()}
//           </div>

//           <div className="relative z-10 w-full max-w-7xl px-6 pt-4">
//             <div className="flex justify-between items-center mb-8">
//               <div onClick={handleBackButton} className="cursor-pointer">
//                 <img src="/gv_arrow.png" alt="Back" className="w-8 h-8" />
//               </div>
//               <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
//             </div>

//             <div className="w-full md:w-[88%] flex justify-center items-center mb-12 mx-auto">
//               {[1, 2, 3].map((step) => (
//                 <span
//                   key={step}
//                   onClick={() => goToStep(step)}
//                   className={`w-1/3 h-1 mx-3 cursor-pointer ${
//                     currentStep >= step ? "bg-green-500" : "bg-gray-300"
//                   } rounded-full`}
//                 />
//               ))}
//             </div>

//             {renderStepContent()}
//           </div>
//         </div>
//       ) : (
//         <div className="final-screen flex flex-col justify-center items-center min-h-screen w-screen p-6">
//           <div className="absolute top-4 left-4 w-full max-w-7xl flex justify-start">
//             <img
//               src="/gv_arrow.png"
//               alt="Arrow"
//               className="cursor-pointer w-8 h-8 z-50"
//               onClick={handleFinalScreenClick}
//             />
//           </div>
//           <div className="text-center mt-[-200px] relative z-10">
//             <h1 className="text-green-500 text-4xl font-bold">Giveaway</h1>
//             <p className="text-[#151515] text-lg font-normal font-karla mt-4">
//               You will be contacted by the KuKu team further.
//             </p>
//           </div>
//           <button
//             onClick={handleShareClick}
//             className="px-8 py-2 mt-8 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition relative z-10"
//           >
//             Share on social
//           </button>
//           <Lottie
//             loop
//             play
//             rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
//             animationData={giftboxAnimation}
//             style={{
//               width: "100vw",
//               height: "100vh",
//               objectFit: "cover",
//               position: "absolute",
//               left: 0,
//               top: 0,
//               marginBottom: "10px",
//             }}
//           />
//           <button className="absolute top-4 right-4 z-10">
//             <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
//           </button>
//         </div>
//       )}

//       <GiveAwayShareModal
//         isOpen={showShareModal}
//         onClose={handleCloseShareModal}
//         giveawayDetails={getGiveawayDetails()}
//       />
//     </>
//   );
// };

// export default Giveaway;








"use client";

import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import clothHangerAnimation from "../public/lottieFiles/cloth_hanger.json";
import playgroundAnimation from "../public/lottieFiles/playground.json";
import giftboxAnimation from "../public/lottieFiles/giftbox.json";
import homeAnimation from "../public/lottieFiles/kukuhomenew.json";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GiveAwayShareModal from "./GiveAwayShareModal";

const AddressSelection = ({ addresses, selectedAddress, onSelect, onAddNew }) => {
  const [selectedType, setSelectedType] = useState("existing");

  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === "new") {
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
            checked={selectedType === "existing"}
            onChange={() => handleTypeChange("existing")}
            className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
          />
          <span className="text-gray-700">Use Existing Address</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="addressType"
            checked={selectedType === "new"}
            onChange={() => handleTypeChange("new")}
            className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
          />
          <span className="text-gray-700">Add New Address</span>
        </label>
      </div>

      {selectedType === "existing" && addresses?.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedAddress?._id === address._id
                  ? "border-2 border-pink-500"
                  : "border-gray-200 hover:border-pink-300"
              }`}
              onClick={() => onSelect(address)}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="font-semibold">{address.name}</p>
                  <p className="text-sm text-gray-600">
                    {`+971${address.mobile_number}`}
                  </p>
                  <p className="text-sm text-gray-600">{address.email}</p>
                  <p className="text-sm text-gray-600">
                    {`${address.house_no}, ${address.building_name}, ${address.area}`}
                    {address.landmark && `, ${address.landmark}`}
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
      ) : selectedType === "existing" ? (
        <p className="text-gray-500 italic">
          No saved addresses found. Please add a new address.
        </p>
      ) : null}
    </div>
  );
};

const Giveaway = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [createdGiveawayId, setCreatedGiveawayId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // New state for processing
  const [formData, setFormData] = useState({
    name: "",
    mob_no_country_code: "+971",
    mobile_number: "",
    house_no: "",
    building_name: "",
    area: "",
    landmark: "",
    city: "",
    email: "",
    country: "UAE",
    pickTime: "",
    weight: "",
    items: [],
    category: "",
    agreeTerms: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [sampleAddresses, setSampleAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchAddress = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      if (!token) {
        toast.error("Please login to access addresses");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/get`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSampleAddresses(response?.data?.addresses || []);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        Cookies.remove("auth");
        toast.error("Session expired. Please login again");
        router.push("/login");
      } else {
        toast.error("Error fetching addresses");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      if (!token) {
        toast.error("Please login to access user details");
        return;
      }

      const user = JSON.parse(Cookies.get("user"));
      const id = user._id;

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/details/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setFormData((prev) => ({
        ...prev,
        name: data.profile.name || "",
        email: data.profile.email || "",
        mobile_number: data.profile.phone || "",
      }));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        Cookies.remove("auth");
        toast.error("Session expired. Please login again");
        router.push("/login");
      } else {
        toast.error("Error fetching user details");
      }
    }
  };

  useEffect(() => {
    fetchAddress();
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const validateForm = () => {
    const errors = {};

    if (currentStep === 2) {
      if (!formData.name.trim()) errors.name = "Name is required";
      if (!formData.mobile_number.trim()) errors.mobile_number = "Mobile number is required";
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (currentStep === 3) {
      if (!selectedAddress && !showAddressForm) {
        errors.pickupAddress = "Please select an existing address or add a new one";
      }
      if (showAddressForm) {
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.mobile_number.trim()) errors.mobile_number = "Mobile number is required";
        if (!formData.email.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = "Please enter a valid email address";
        }
        if (!formData.house_no.trim()) errors.house_no = "House number is required";
        if (!formData.building_name.trim()) errors.building_name = "Building name is required";
        if (!formData.area.trim()) errors.area = "Area is required";
        if (!formData.landmark.trim()) errors.landmark = "Landmark is required";
        if (!formData.city.trim()) errors.city = "City is required";
      }
      if (!formData.pickTime) errors.pickTime = "Pick time is required";
      if (!formData.weight || Number(formData.weight) <= 0) {
        errors.weight = "Number of items is required";
      } else if (Number(formData.weight) < 10) {
        errors.weight = "Minimum 10 items required";
      }
      if (!formData.items || formData.items.length === 0)
        errors.items = "At least one item must be selected";
      if (!formData.agreeTerms) errors.agreeTerms = "You must agree to the terms";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 2 || currentStep === 3) {
      if (!validateForm()) {
        const firstError = document.querySelector(".text-red-500");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleFinalScreen = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      const firstError = document.querySelector(".text-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsProcessing(true); // Set processing state

    const pickupAddress = selectedAddress
      ? selectedAddress._id
      : {
          name: formData.name,
          mob_no_country_code: formData.mob_no_country_code,
          mobile_number: formData.mobile_number,
          alt_ph_country_code: "",
          alternate_phone: "",
          house_no: formData.house_no,
          building_name: formData.building_name,
          area: formData.area,
          landmark: formData.landmark,
          city: formData.city,
          email: formData.email,
          country: formData.country,
          seller: null,
          isDefault: false,
          address_type: "Normal",
        };

    const finalData = {
      pickupAddress,
      pickupTime: formData.pickTime,
      numberOfItems: formData.weight,
      items: formData.items,
      category: formData.category,
    };

    try {
      const token = JSON.parse(Cookies.get("auth"));
      if (!token) {
        toast.error("Please login to create giveaway");
        setIsProcessing(false); // Reset processing state
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/giveaways/giveaways`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Giveaway Created successfully! You will be contacted by the KuKu team further.");
        setCreatedGiveawayId(response.data.id || response.data.giveawayId || Date.now().toString());
        setShowFinalScreen(true);
      } else {
        throw new Error(response.data.message || "Failed to create giveaway");
      }
    } catch (error) {
      console.error("Error creating giveaway:", error);
      toast.error(error.response?.data?.message || "Failed to create giveaway. Please try again.");
    } finally {
      setIsProcessing(false); // Reset processing state
    }
  };

  const handleFinalScreenClick = () => {
    setShowFinalScreen(false);
    setShowShareModal(false);
    setCurrentStep(1);
    setFormData({
      name: "",
      mob_no_country_code: "+971",
      mobile_number: "",
      house_no: "",
      building_name: "",
      area: "",
      landmark: "",
      city: "",
      email: "",
      country: "UAE",
      pickTime: "",
      weight: "",
      items: [],
      category: "",
      agreeTerms: false,
    });
    setSelectedAddress(null);
    setFormErrors({});
    setShowAddressForm(false);
    setCreatedGiveawayId(null);
    fetchUserDetails(); // Re-fetch user details to reset form
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleItemsChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      items: prev.items.includes(value)
        ? prev.items.filter((item) => item !== value)
        : [...prev.items, value],
    }));

    if (formErrors.items) {
      setFormErrors((prev) => ({
        ...prev,
        items: "",
      }));
    }
  };

  const handleBackButton = () => {
    if (currentStep === 1) {
      router.push("/");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const getGiveawayDetails = () => {
    const city = selectedAddress ? selectedAddress.city : formData.city;
    return {
      id: createdGiveawayId,
      items: formData.items,
      numberOfItems: formData.weight,
      city: city,
    };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 font-karla">
              Reuse Repurpose Recycle, let KuKu handle your textile by giving
              the reusable to charity or recycling them partnered with textile
              recyclers.
            </h2>
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition border border-black font-karla"
            >
              NEXT STEP
            </button>
          </div>
        );
      case 2:
        return (
          <div className="max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold mb-12 text-center font-karla">
              Fill Up the details
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  readOnly
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none font-karla bg-gray-100 cursor-not-allowed`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.name}</p>
                )}
              </div>
              <div className="col-span-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  readOnly
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none font-karla bg-gray-100 cursor-not-allowed`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.email}</p>
                )}
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  name="mob_no_country_code"
                  value="+971"
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none font-karla"
                />
              </div>
              <div className="col-span-1">
                <input
                  type="tel"
                  name="mobile_number"
                  placeholder="Mobile Number"
                  value={formData.mobile_number}
                  readOnly
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.mobile_number ? "border-red-500" : "border-gray-300"
                  } focus:outline-none font-karla bg-gray-100 cursor-not-allowed`}
                />
                {formErrors.mobile_number && (
                  <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.mobile_number}</p>
                )}
              </div>
            </div>
            <div className="text-center mt-12">
              <button
                onClick={handleNext}
                className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition border border-black font-karla"
              >
                NEXT STEP
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10 bg-white rounded-2xl font-karla overflow-x-clip">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
                Pickup Details
              </p>
              <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
                Step 3 of 3
              </p>
            </div>
            <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla mb-2">
              Please enter your pickup details
            </p>
            <div className="space-y-4">
              <AddressSelection
                addresses={sampleAddresses}
                selectedAddress={selectedAddress}
                onSelect={(address) => {
                  setSelectedAddress(address);
                  setShowAddressForm(false);
                  setFormData((prev) => ({
                    ...prev,
                    name: address.name || "",
                    mob_no_country_code: "+971",
                    mobile_number: address.mobile_number || "",
                    house_no: address.house_no || "",
                    building_name: address.building_name || "",
                    area: address.area || "",
                    landmark: address.landmark || "",
                    city: address.city || "",
                    email: address.email || "",
                    country: "UAE",
                  }));
                  setFormErrors((prev) => ({
                    ...prev,
                    name: "",
                    mobile_number: "",
                    house_no: "",
                    building_name: "",
                    area: "",
                    landmark: "",
                    city: "",
                    email: "",
                    country: "",
                    pickupAddress: "",
                  }));
                }}
                onAddNew={() => {
                  setShowAddressForm(true);
                  setSelectedAddress(null);
                  setFormData((prev) => ({
                    ...prev,
                    house_no: "",
                    building_name: "",
                    area: "",
                    landmark: "",
                    city: "",
                    country: "UAE",
                  }));
                }}
              />
            </div>
            {showAddressForm && (
              <div className="flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]">
                <div className="w-full flex flex-col gap-6">
                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        Name
                      </p>
                      <input
                        maxLength={25}
                        placeholder="Enter your name"
                        type="text"
                        name="name"
                        value={formData.name}
                        readOnly
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100 cursor-not-allowed"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        Mobile Country Code
                      </p>
                      <input
                        maxLength={4}
                        value="+971"
                        readOnly
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        Mobile Number
                      </p>
                      <input
                        maxLength={12}
                        placeholder="Enter your mobile number"
                        type="tel"
                        name="mobile_number"
                        value={formData.mobile_number}
                        readOnly
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100 cursor-not-allowed"
                      />
                      {formErrors.mobile_number && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.mobile_number}</p>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        House No
                      </p>
                      <input
                        maxLength={25}
                        placeholder="Enter house number"
                        type="text"
                        name="house_no"
                        value={formData.house_no}
                        onChange={handleInputChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {formErrors.house_no && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.house_no}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        Building Name
                      </p>
                      <input
                        maxLength={25}
                        placeholder="Enter building name"
                        type="text"
                        name="building_name"
                        value={formData.building_name}
                        onChange={handleInputChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {formErrors.building_name && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.building_name}</p>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        Area
                      </p>
                      <input
                        maxLength={25}
                        placeholder="Enter area"
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {formErrors.area && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.area}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        Landmark
                      </p>
                      <input
                        maxLength={25}
                        placeholder="Enter landmark"
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {formErrors.landmark && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.landmark}</p>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        City
                      </p>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      >
                        <option value="">Select a city</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Ajman">Ajman</option>
                        <option value="Al-Ain">Al-Ain</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Fujairah">Fujairah</option>
                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                        <option value="Sharjah">Sharjah</option>
                        <option value="Umm Al-Quwain">Umm Al-Quwain</option>
                      </select>
                      {formErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                      Country
                    </p>
                    <input
                      maxLength={25}
                      value="UAE"
                      readOnly
                      className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100"
                    />
                    {formErrors.country && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                      Email
                    </p>
                    <input
                      maxLength={50}
                      placeholder="Enter your email address"
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla bg-gray-100 cursor-not-allowed"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-6">
              <div className="flex-1 flex flex-col">
                <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                  Time
                </p>
                <select
                  name="pickTime"
                  value={formData.pickTime}
                  onChange={handleInputChange}
                  className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
                    formErrors.pickTime ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select pickup time</option>
                  <option value="morning">9:30-12:00</option>
                  <option value="afternoon">12:00-4:00</option>
                  <option value="evening">4:00-8:00</option>
                </select>
                {formErrors.pickTime && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.pickTime}</p>
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                  Number of items
                </p>
                <input
                  maxLength={25}
                  placeholder="Enter number of items (minimum 10)"
                  type="number"
                  name="weight"
                  min="10"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
                    formErrors.weight ? "border-red-500" : ""
                  }`}
                />
                {formErrors.weight && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.weight}</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-6">
              <div className="flex-1 flex flex-col">
                <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                  Items
                </p>
                <select
                  name="items"
                  onChange={handleItemsChange}
                  className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
                    formErrors.items ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Item</option>
                  <option value="cloths">Clothes</option>
                  <option value="curtain">Curtains</option>
                  <option value="bedsheet">Bedsheets</option>
                </select>
                {formErrors.items && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.items}</p>
                )}
                {formData.items.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-karla font-bold">Selected Items:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.items.map((item) => (
                        <span
                          key={item}
                          className="bg-gray-200 text-sm px-3 py-1 rounded-lg flex items-center gap-2"
                        >
                          {item}
                          <button
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                items: prev.items.filter((i) => i !== item),
                              }))
                            }
                            className="text-red-500 font-bold ml-2"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-8 sm:mt-[76px] gap-3 items-start sm:items-center">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
              </label>
              <p className="text-base sm:text-xl font-normal font-karla leading-tight sm:leading-7">
                I agree to the{" "}
                <Link
                  href={"/terms"}
                  target="_blank"
                  className="text-[#E4086F] underline"
                >
                  KUKU Terms & Conditions.
                </Link>{" "}
                We protect your privacy and to understand how, Read our{" "}
                <Link
                  target="_blank"
                  className="text-[#E4086F] underline"
                  href={"/policies"}
                >
                  Privacy Policies
                </Link>{" "}
              </p>
            </div>
            {formErrors.agreeTerms && (
              <p className="text-red-500 text-sm mt-1">{formErrors.agreeTerms}</p>
            )}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
              <button
                onClick={handleFinalScreen}
                disabled={isProcessing}
                className={`w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla ${
                  isProcessing
                    ? "bg-[#e4086f] opacity-50 cursor-not-allowed"
                    : "bg-[#e4086f] hover:bg-[#c3075d] transition"
                }`}
              >
                {isProcessing ? "Processing..." : "List Now"}
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
              >
                Back
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderLottieAnimation = () => {
    const animationData =
      currentStep === 1
        ? homeAnimation
        : currentStep === 2
        ? clothHangerAnimation
        : playgroundAnimation;

    if (isMobileView) {
      return (
        <div className="absolute inset-0 w-full h-full">
          <Lottie
            loop
            play
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            animationData={animationData}
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          />
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center w-full lg:h-[50vh]">
        <Lottie loop play animationData={animationData} className="w-full" />
      </div>
    );
  };

  return (
    <>
      {!showFinalScreen ? (
        <div className="relative flex flex-col items-center min-h-screen w-screen overflow-hidden">
          <div className="fixed inset-0 w-screen h-screen">
            {renderLottieAnimation()}
          </div>

          <div className="relative z-10 w-full max-w-7xl px-6 pt-4">
            <div className="flex justify-between items-center mb-8">
              <div onClick={handleBackButton} className="cursor-pointer">
                <img src="/gv_arrow.png" alt="Back" className="w-8 h-8" />
              </div>
              <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
            </div>

            <div className="w-full md:w-[88%] flex justify-center items-center mb-12 mx-auto">
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  onClick={() => goToStep(step)}
                  className={`w-1/3 h-1 mx-3 cursor-pointer ${
                    currentStep >= step ? "bg-green-500" : "bg-gray-300"
                  } rounded-full`}
                />
              ))}
            </div>

            {renderStepContent()}
          </div>
        </div>
      ) : (
        <div className="final-screen flex flex-col justify-center items-center min-h-screen w-screen p-6">
          <div className="absolute top-4 left-4 w-full max-w-7xl flex justify-start">
            <img
              src="/gv_arrow.png"
              alt="Arrow"
              className="cursor-pointer w-8 h-8 z-50"
              onClick={handleFinalScreenClick}
            />
          </div>
          <div className="text-center mt-[-200px] relative z-10">
            <h1 className="text-green-500 text-4xl font-bold">Giveaway</h1>
            <p className="text-[#151515] text-lg font-normal font-karla mt-4">
              You will be contacted by the KuKu team further.
            </p>
          </div>
          <button
            onClick={handleShareClick}
            className="px-8 py-2 mt-8 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition relative z-10"
          >
            Share on social
          </button>
          <Lottie
            loop
            play
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            animationData={giftboxAnimation}
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              left: 0,
              top: 0,
              marginBottom: "10px",
            }}
          />
          <button className="absolute top-4 right-4 z-10">
            <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
          </button>
        </div>
      )}

      <GiveAwayShareModal
        isOpen={showShareModal}
        onClose={handleCloseShareModal}
        giveawayDetails={getGiveawayDetails()}
      />
    </>
  );
};

export default Giveaway;
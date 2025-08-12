



// import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import axios from "axios";
// import toast from "react-hot-toast";
// import DraggableProgressBar from "./DraggableProgressBar";
// import CustomDateInput from "./CustomDateInput";

// const KukuitMain = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   const notify = () => toast.success("Please Login");
//   const [location, setLocation] = useState(null);
//   const [address, setAddress] = useState("");
//   const [markerPosition, setMarkerPosition] = useState([25.276987, 55.296249]); // Default to Dubai
//   const [addressType, setAddressType] = useState(false);
//   const [selectedScale, setSelectedScale] = useState(null);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [submit, setSubmit] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [customNumber, setCustomNumber] = useState("");
//   const [formData, setFormData] = useState({
//     country: "",
//     city: "",
//     addressLine1: "",
//     addressLine2: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     date: "",
//     time: "",
//     agreeTerms: false,
//   });
//   const [errors, setErrors] = useState({});
//   const router = useRouter();

//   // Geolocation to get user's current location (optional)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setMarkerPosition([latitude, longitude]);
//           await fetchAddress(latitude, longitude);
//         },
//         (err) => {
//           console.error("Geolocation error:", err);
//           // Fallback to Dubai if geolocation fails
//           setMarkerPosition([25.276987, 55.296249]);
//           fetchAddress(25.276987, 55.296249);
//         }
//       );
//     } else {
//       // Fallback to Dubai if geolocation not supported
//       setMarkerPosition([25.276987, 55.296249]);
//       fetchAddress(25.276987, 55.296249);
//     }
//   }, []);


// // Fetch address using Google Maps Geocoding API
// const fetchAddress = async (latitude, longitude) => {
//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
//     );
//     const data = await response.json();
//     if (data?.results?.length > 0) {
//       const result = data.results[0];
//       const formattedAddress = result.formatted_address;
//       setAddress(formattedAddress);
//       setLocation({ latitude, longitude });

//       // Extract from address_components
//       const addressComponents = result.address_components;
//       let country = "", city = "", addressLine1 = "", addressLine2 = "";

//       addressComponents.forEach((component) => {
//         if (component.types.includes("country")) country = component.long_name;
//         if (component.types.includes("locality")) city = component.long_name; // Prioritize locality
//         else if (component.types.includes("sublocality") && !city) city = component.long_name; // Fallback to sublocality
//         if (component.types.includes("street_number") || component.types.includes("route") || component.types.includes("premise")) {
//           addressLine1 = (addressLine1 ? addressLine1 + " " : "") + component.long_name;
//         }
//       });

//       // Only set addressLine2 if specific extra details (like apartment or sub-building) are present
//       const extraDetails = addressComponents.find(comp => 
//         comp.types.includes("subpremise") || comp.types.includes("building")
//       );
//       if (extraDetails) {
//         addressLine2 = extraDetails.long_name;
//       }

//       // Fallback logic for India-style addresses with detailed breakup
//       if (!addressLine1 && result.address_components.length > 0) {
//         const streetParts = result.address_components
//           .filter(comp => 
//             comp.types.includes("route") || 
//             comp.types.includes("street_number") || 
//             comp.types.includes("premise")
//           )
//           .map(comp => comp.long_name)
//           .join(" ");
//         addressLine1 = streetParts || addressLine1;

//         // Use formatted address parts if still incomplete
//         if (!addressLine1 && !addressLine2) {
//           const addressParts = formattedAddress.split(",").map(part => part.trim());
//           if (addressParts.length > 2) {
//             addressLine1 = addressParts.slice(0, addressParts.length - 2).join(", ").trim();
//             city = addressParts[addressParts.length - 2] || city;
//             country = addressParts[addressParts.length - 1] || country;
//           }
//         }
//       }

//       // Update form data
//       setFormData((prevData) => ({
//         ...prevData,
//         country,
//         city,
//         addressLine1,
//         addressLine2,
//       }));
//     } else {
//       setAddress("Address not found");
//     }
//   } catch (error) {
//     console.error("Error fetching address:", error);
//   }
// };

//   // Update form data when address changes (no longer needed with new fetchAddress logic)
//   useEffect(() => {
//     if (addressType && address) {
//       // This will now rely on fetchAddress to set the fields
//     }
//   }, [addressType, address]);

//   // Handle map click to update marker and address
//   const handleMapClick = (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     setMarkerPosition([lat, lng]);
//     fetchAddress(lat, lng);
//   };

//   const Modal = ({ onClose }) => {
//     const handleOutsideClick = (e) => {
//       if (e.target === e.currentTarget) {
//         onClose();
//       }
//     };

//     return (
//       <div
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
//         onClick={handleOutsideClick}
//       >
//         <div className="bg-white w-full max-w-[586px] px-6 sm:px-10 rounded-[20px] shadow-lg flex flex-col justify-center items-center py-8 sm:py-12">
//           <Image
//             width={82}
//             height={82}
//             src="/CheckCircle.svg"
//             alt=""
//             className="w-16 sm:w-20"
//           />
//           <h2 className="text-xl sm:text-3xl font-bold font-karla text-center mt-4 sm:mt-8">
//             Your pickup schedule has been sent to us
//           </h2>
//           <div className="text-[#7f808c] text-base sm:text-xl font-normal font-karla leading-7 sm:leading-9 text-center mt-2 sm:mt-4">
//             Sit back and Relax while our team contacts you to confirm the pick up
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleCustomNumberChange = (e) => {
//     const value = e.target.value;
//     if (!isNaN(value)) {
//       setCustomNumber(value);
//       if (value === "") {
//         setSelectedScale(null);
//       } else {
//         const numValue = Number(value);
//         if (numValue >= 5) {
//           setSelectedScale(numValue);
//         } else {
//           setSelectedScale(null);
//         }
//       }
//     }
//   };

//   const validateStep1 = () => {
//     if (!selectedScale || selectedScale < 5) {
//       setErrors({ numberOfItems: "Please select at least 5 items" });
//       return false;
//     }
//     return true;
//   };

//   const validateStep2 = () => {
//     let newErrors = {};
//     if (!formData.date || isNaN(new Date(formData.date).getTime())) {
//       newErrors.date = "Valid pickup date is required";
//     }
//     if (!formData.time) {
//       newErrors.time = "Pickup time is required";
//     }
//     if (!formData.agreeTerms) {
//       newErrors.agreeTerms = "You must agree to the terms";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!selectedScale || selectedScale < 5) {
//       newErrors.numberOfItems = "Please select at least 5 items";
//     }
//     if (!formData.date || isNaN(new Date(formData.date).getTime())) {
//       newErrors.date = "Valid pickup date is required";
//     }
//     if (!formData.time) {
//       newErrors.time = "Pickup time is required";
//     }
//     if (!formData.country) newErrors.country = "Country is required";
//     if (!formData.city) newErrors.city = "City is required";
//     if (!formData.addressLine1) newErrors.addressLine1 = "Address Line 1 is required";
//     if (!formData.firstName) newErrors.firstName = "First name is required";
//     if (!formData.lastName) newErrors.lastName = "Last name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!formData.phone) newErrors.phone = "Phone number is required";
//     else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits";
//     }
//     if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleClick = () => {
//     if (validateForm()) {
//       setSubmit(true);
//       setCurrentStep(3);
//     }
//   };

//   const handleConfirmClick = async () => {
//     if (!validateForm()) return;
//     try {
//       const details = {
//         numberOfItems: selectedScale,
//         pickupDate: formData.date,
//         pickupTime: formData.time,
//         variation: "",
//         Amount: 0,
//       };
//       const pickupLocation = {
//         country: formData.country,
//         city: formData.city,
//         addressLine1: formData.addressLine1,
//         addressLine2: formData.addressLine2,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//       };
//       if (Cookies.get("auth")) {
//         const token = JSON.parse(Cookies.get("auth"));
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/kukuits/add`,
//           { ...details, pickupLocation },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.status === 201 || response.status === 200) {
//           setModal(true);
//         } else {
//           console.error("Failed to add kukuit:", response.statusText);
//           toast.error("Failed to schedule pickup");
//         }
//       } else {
//         notify();
//       }
//     } catch (error) {
//       console.error("API Error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to schedule pickup");
//     }
//   };

//   const handleCloseModal = () => {
//     setModal(false);
//     router.push("/");
//   };

//   const handleStepClick = (step) => {
//     if (step < currentStep) {
//       setCurrentStep(step);
//     }
//   };

//   const handleNextClick = () => {
//     if (validateStep1()) {
//       setCurrentStep(2);
//     } else {
//       alert("Please select a scale or enter a custom number");
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <>
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
//                 Choose the number of items
//               </p>
//               <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
//                 Step 1 of 3
//               </p>
//             </div>
//             <DraggableProgressBar
//               setSelectedScale={setSelectedScale}
//               customNumber={customNumber}
//               min={5}
//               max={35}
//               step={1}
//             />
//             <div className="mt-4">
//               <p className="text-[#151515] text-sm sm:text-base font-bold font-karla mb-2">
//                 Or enter custom number:
//               </p>
//               <input
//                 type="number"
//                 value={customNumber}
//                 onChange={handleCustomNumberChange}
//                 className="w-full sm:w-1/3 h-[50px] border-2 rounded-lg px-5 font-karla"
//                 placeholder="Enter custom number"
//                 min="0"
//               />
//               {(!selectedScale && customNumber === "") && (
//                 <p className="text-red-500 text-sm mt-1">
//                   Please select either from scale or enter the number of items manually
//                 </p>
//               )}
//             </div>
//             <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
//               <button
//                 onClick={handleNextClick}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Next
//               </button>
//               <Link href={"/"}>
//                 <button className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla">
//                   Cancel
//                 </button>
//               </Link>
//             </div>
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
//                 Choose the pickup date
//               </p>
//               <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
//                 Step 2 of 3
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-[56px] mt-4 sm:mt-[56px]">
//               <CustomDateInput
//                 placeholder="Choose pickup date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 error={errors.date}
//               />
//               <select
//                 name="time"
//                 value={formData.time}
//                 onChange={handleInputChange}
//                 className="w-full h-[50px] border-2 rounded-lg px-5 mt-0 font-karla"
//               >
//                 <option value="">Select a time</option>
//                 <option value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</option>
//                 <option value="12:00 PM - 3:00 PM">12:00 PM - 3:00 PM</option>
//                 <option value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</option>
//                 <option value="6:00 PM - 9:00 PM">6:00 PM - 9:00 PM</option>
//               </select>
//               {errors.time && (
//                 <p className="text-red-500 text-sm mt-1">{errors.time}</p>
//               )}
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
//             {errors.agreeTerms && (
//               <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
//             )}
//             <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
//               <button
//                 onClick={() => {
//                   if (validateStep2()) {
//                     setCurrentStep(3);
//                   }
//                 }}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Next
//               </button>
//               <button
//                 onClick={() => setCurrentStep(1)}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Back
//               </button>
//             </div>
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
//                 Pickup Details
//               </p>
//               <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
//                 Step 3 of 3
//               </p>
//             </div>
//             <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla">
//               Please enter your pickup details
//             </p>
//             <div className="w-full h-[200px] sm:h-[392px] mt-6 sm:mt-[36px] shadow">
//               {isLoaded ? (
//                 <GoogleMap
//                   mapContainerStyle={{ width: "100%", height: "100%" }}
//                   center={{ lat: markerPosition[0], lng: markerPosition[1] }}
//                   zoom={13}
//                   onClick={handleMapClick}
//                 >
//                   <MarkerF position={{ lat: markerPosition[0], lng: markerPosition[1] }} />
//                 </GoogleMap>
//               ) : (
//                 <div>Loading map...</div>
//               )}
//             </div>
//             <div>
//               <button
//                 style={{ color: "rgb(228 8 111 / var(--tw-bg-opacity))" }}
//                 onClick={() => setAddressType(!addressType)}
//               >
//                 Select address from Map
//               </button>
//             </div>
//             <div className="flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]">
//               <div className="w-full lg:w-1/2 flex flex-col gap-6">
//                 <div className="flex flex-col">
//                   <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                     Country
//                   </p>
//                   {addressType ? (
//                     <input
//                       maxLength={25}
//                       placeholder="Enter your country"
//                       type="text"
//                       name="country"
//                       value={formData.country}
//                       onChange={handleInputChange}
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                     />
//                   ) : (
//                     <select
//                       name="country"
//                       value={formData.country}
//                       onChange={handleInputChange}
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                     >
//                       <option value="">Select a country</option>
//                       <option value="uae">UAE</option>
//                       <option value="saab">Saab</option>
//                       <option value="fiat">Fiat</option>
//                       <option value="audi">Audi</option>
//                     </select>
//                   )}
//                   {errors.country && (
//                     <p className="text-red-500 text-sm mt-1">{errors.country}</p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                     City
//                   </p>
//                   {addressType ? (
//                     <input
//                       maxLength={25}
//                       placeholder="Enter your city"
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                     />
//                   ) : (
//                     <select
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                     >
//                       <option value="">Select a city</option>
//                       <option value="dubai">Dubai</option>
//                       <option value="abudhabi">Abu Dhabi</option>
//                       <option value="sharjah">Sharjah</option>
//                       <option value="ajman">Ajman</option>
//                     </select>
//                   )}
//                   {errors.city && (
//                     <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                     Address Line 1
//                   </p>
//                   <input
//                     maxLength={25}
//                     placeholder="Enter your address line 1"
//                     type="text"
//                     name="addressLine1"
//                     value={formData.addressLine1}
//                     onChange={handleInputChange}
//                     className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                   />
//                   {errors.addressLine1 && (
//                     <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                     Address Line 2
//                   </p>
//                   <input
//                     maxLength={25}
//                     placeholder="Enter your address line 2"
//                     type="text"
//                     name="addressLine2"
//                     value={formData.addressLine2}
//                     onChange={handleInputChange}
//                     className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                   />
//                 </div>
//               </div>
//               <div className="w-full lg:w-1/2 flex flex-col gap-6">
//                 <div className="flex flex-col">
//                   <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                     First name
//                   </p>
//                   <input
//                     maxLength={25}
//                     placeholder="Enter your first name"
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                   />
//                   {errors.firstName && (
//                     <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                     Last name
//                   </p>
//                   <input
//                     maxLength={25}
//                     placeholder="Enter your last name"
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                   />
//                   {errors.lastName && (
//                     <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                     Email address
//                   </p>
//                   <input
//                     maxLength={50}
//                     placeholder="Enter your email address"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                     Phone number
//                   </p>
//                   <input
//                     maxLength={10}
//                     placeholder="Enter your phone number"
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                   />
//                   {errors.phone && (
//                     <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
//               <button
//                 onClick={handleConfirmClick}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Confirm Pickup
//               </button>
//               <button
//                 onClick={() => setCurrentStep(2)}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Back
//               </button>
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="relative w-full max-w-[1550px] min-h-screen mx-auto py-8 sm:py-16 px-4 sm:px-8">
//       <div
//         className={`absolute inset-0 z-0 transition-opacity duration-300 ${
//           modal ? "opacity-50" : "opacity-100"
//         }`}
//         style={{
//           backgroundImage: "url('kukuit_bg.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       />
//       <div className="w-full max-w-[1020px] bg-white border mx-auto rounded-[20px] relative z-10 overflow-hidden">
//         <div className="w-full">
//           <Image
//             width={1020}
//             height={211}
//             alt=""
//             src="/kukuit_form_top_bg.png"
//             className="w-full h-auto rounded-t-[20px]"
//           />
//         </div>
//         <div className="absolute top-4 sm:top-10 left-4 sm:left-6">
//           <h2 className="text-[#e6e6e6] text-3xl sm:text-[46px] font-normal font-luckiest leading-tight">
//             SCHEDULE PICKUP
//           </h2>
//         </div>
//         <div className="flex justify-center gap-4 mt-8">
//           {[1, 2, 3].map((step) => (
//             <button
//               key={step}
//               onClick={() => handleStepClick(step)}
//               className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
//                 step === currentStep
//                   ? "bg-[#e4086f] text-white"
//                   : step < currentStep
//                   ? "bg-[#e4086f] text-white opacity-70 hover:opacity-100"
//                   : "bg-gray-200 text-gray-600"
//               }`}
//             >
//               {step}
//             </button>
//           ))}
//         </div>
//         <div className="px-4 sm:px-8 lg:px-[94px] mt-8 sm:mt-[56px]">
//           {renderStepContent()}
//         </div>
//       </div>
//       {modal && <Modal onClose={handleCloseModal} />}
//       <style jsx>{`
//         @media (max-width: 768px) {
//           .flex-col {
//             flex-direction: column;
//           }
//           .flex-row {
//             flex-direction: column;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default KukuitMain;







// Updated Frontend Code (KukuitMain component)

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import DraggableProgressBar from "./DraggableProgressBar";
import CustomDateInput from "./CustomDateInput";

const KukuitMain = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const notify = () => toast.success("Please Login");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState([25.276987, 55.296249]); // Default to Dubai
  const [addressType, setAddressType] = useState(false);
  const [selectedScale, setSelectedScale] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [modal, setModal] = useState(false);
  const [customNumber, setCustomNumber] = useState("");
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Geolocation to get user's current location (optional)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
          await fetchAddress(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Fallback to Dubai if geolocation fails
          setMarkerPosition([25.276987, 55.296249]);
          fetchAddress(25.276987, 55.296249);
        }
      );
    } else {
      // Fallback to Dubai if geolocation not supported
      setMarkerPosition([25.276987, 55.296249]);
      fetchAddress(25.276987, 55.296249);
    }
  }, []);

  // Fetch address via backend API route
// Updated fetchAddress function in your React component

const fetchAddress = async (latitude, longitude) => {
  try {
    // Use your backend API URL instead of /api/geocode
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(
      `${backendUrl}/geocode?latitude=${latitude}&longitude=${longitude}`
    );
    
    const data = await response.json();
    
    if (data?.results?.length > 0) {
      const result = data.results[0];
      const formattedAddress = result.formatted_address;
      setAddress(formattedAddress);
      setLocation({ latitude, longitude });

      // Extract from address_components
      const addressComponents = result.address_components;
      let country = "", city = "", addressLine1 = "", addressLine2 = "";

      addressComponents.forEach((component) => {
        if (component.types.includes("country")) country = component.long_name;
        if (component.types.includes("locality")) city = component.long_name;
        else if (component.types.includes("sublocality") && !city) city = component.long_name;
        if (component.types.includes("street_number") || component.types.includes("route") || component.types.includes("premise")) {
          addressLine1 = (addressLine1 ? addressLine1 + " " : "") + component.long_name;
        }
      });

      const extraDetails = addressComponents.find(comp => 
        comp.types.includes("subpremise") || comp.types.includes("building")
      );
      if (extraDetails) {
        addressLine2 = extraDetails.long_name;
      }

      if (!addressLine1 && result.address_components.length > 0) {
        const streetParts = result.address_components
          .filter(comp => 
            comp.types.includes("route") || 
            comp.types.includes("street_number") || 
            comp.types.includes("premise")
          )
          .map(comp => comp.long_name)
          .join(" ");
        addressLine1 = streetParts || addressLine1;

        if (!addressLine1 && !addressLine2) {
          const addressParts = formattedAddress.split(",").map(part => part.trim());
          if (addressParts.length > 2) {
            addressLine1 = addressParts.slice(0, addressParts.length - 2).join(", ").trim();
            city = addressParts[addressParts.length - 2] || city;
            country = addressParts[addressParts.length - 1] || country;
          }
        }
      }

      setFormData((prevData) => ({
        ...prevData,
        country,
        city,
        addressLine1,
        addressLine2,
      }));
    } else {
      setAddress("Address not found");
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    setAddress("Error fetching address");
  }
};

  // Update form data when address changes (no longer needed with new fetchAddress logic)
  useEffect(() => {
    if (addressType && address) {
      // This will now rely on fetchAddress to set the fields
    }
  }, [addressType, address]);

  // Handle map click to update marker and address
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition([lat, lng]);
    fetchAddress(lat, lng);
  };

  const Modal = ({ onClose }) => {
    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={handleOutsideClick}
      >
        <div className="bg-white w-full max-w-[586px] px-6 sm:px-10 rounded-[20px] shadow-lg flex flex-col justify-center items-center py-8 sm:py-12">
          <Image
            width={82}
            height={82}
            src="/CheckCircle.svg"
            alt=""
            className="w-16 sm:w-20"
          />
          <h2 className="text-xl sm:text-3xl font-bold font-karla text-center mt-4 sm:mt-8">
            Your pickup schedule has been sent to us
          </h2>
          <div className="text-[#7f808c] text-base sm:text-xl font-normal font-karla leading-7 sm:leading-9 text-center mt-2 sm:mt-4">
            Sit back and Relax while our team contacts you to confirm the pick up
          </div>
        </div>
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCustomNumberChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setCustomNumber(value);
      if (value === "") {
        setSelectedScale(null);
      } else {
        const numValue = Number(value);
        if (numValue >= 5) {
          setSelectedScale(numValue);
        } else {
          setSelectedScale(null);
        }
      }
    }
  };

  const validateStep1 = () => {
    if (!selectedScale || selectedScale < 5) {
      setErrors({ numberOfItems: "Please select at least 5 items" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.date || isNaN(new Date(formData.date).getTime())) {
      newErrors.date = "Valid pickup date is required";
    }
    if (!formData.time) {
      newErrors.time = "Pickup time is required";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    let newErrors = {};
    if (!selectedScale || selectedScale < 5) {
      newErrors.numberOfItems = "Please select at least 5 items";
    }
    if (!formData.date || isNaN(new Date(formData.date).getTime())) {
      newErrors.date = "Valid pickup date is required";
    }
    if (!formData.time) {
      newErrors.time = "Pickup time is required";
    }
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.addressLine1) newErrors.addressLine1 = "Address Line 1 is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = () => {
    if (validateForm()) {
      setSubmit(true);
      setCurrentStep(3);
    }
  };

  const handleConfirmClick = async () => {
    if (!validateForm()) return;
    try {
      const details = {
        numberOfItems: selectedScale,
        pickupDate: formData.date,
        pickupTime: formData.time,
        variation: "",
        Amount: 0,
      };
      const pickupLocation = {
        country: formData.country,
        city: formData.city,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };
      if (Cookies.get("auth")) {
        const token = JSON.parse(Cookies.get("auth"));
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/kukuits/add`,
          { ...details, pickupLocation },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201 || response.status === 200) {
          setModal(true);
        } else {
          console.error("Failed to add kukuit:", response.statusText);
          toast.error("Failed to schedule pickup");
        }
      } else {
        notify();
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to schedule pickup");
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    router.push("/");
  };

  const handleStepClick = (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleNextClick = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    } else {
      alert("Please select a scale or enter a custom number");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
                Choose the number of items
              </p>
              <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
                Step 1 of 3
              </p>
            </div>
            <DraggableProgressBar
              setSelectedScale={setSelectedScale}
              customNumber={customNumber}
              min={5}
              max={35}
              step={1}
            />
            <div className="mt-4">
              <p className="text-[#151515] text-sm sm:text-base font-bold font-karla mb-2">
                Or enter custom number:
              </p>
              <input
                type="number"
                value={customNumber}
                onChange={handleCustomNumberChange}
                className="w-full sm:w-1/3 h-[50px] border-2 rounded-lg px-5 font-karla"
                placeholder="Enter custom number"
                min="0"
              />
              {(!selectedScale && customNumber === "") && (
                <p className="text-red-500 text-sm mt-1">
                  Please select either from scale or enter the number of items manually
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
              <button
                onClick={handleNextClick}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
              >
                Next
              </button>
              <Link href={"/"}>
                <button className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla">
                  Cancel
                </button>
              </Link>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
                Choose the pickup date
              </p>
              <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
                Step 2 of 3
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-[56px] mt-4 sm:mt-[56px]">
              <CustomDateInput
                placeholder="Choose pickup date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                error={errors.date}
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full h-[50px] border-2 rounded-lg px-5 mt-0 font-karla"
              >
                <option value="">Select a time</option>
                <option value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 3:00 PM">12:00 PM - 3:00 PM</option>
                <option value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</option>
                <option value="6:00 PM - 9:00 PM">6:00 PM - 9:00 PM</option>
              </select>
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time}</p>
              )}
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
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
            )}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
              <button
                onClick={() => {
                  if (validateStep2()) {
                    setCurrentStep(3);
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
              >
                Next
              </button>
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
              >
                Back
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
                Pickup Details
              </p>
              <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
                Step 3 of 3
              </p>
            </div>
            <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla">
              Please enter your pickup details
            </p>
            <div className="w-full h-[200px] sm:h-[392px] mt-6 sm:mt-[36px] shadow">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{ lat: markerPosition[0], lng: markerPosition[1] }}
                  zoom={13}
                  onClick={handleMapClick}
                >
                  <MarkerF position={{ lat: markerPosition[0], lng: markerPosition[1] }} />
                </GoogleMap>
              ) : (
                <div>Loading map...</div>
              )}
            </div>
            <div>
              <button
                style={{ color: "rgb(228 8 111 / var(--tw-bg-opacity))" }}
                onClick={() => setAddressType(!addressType)}
              >
                Select address from Map
              </button>
            </div>
            <div className="flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]">
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    Country
                  </p>
                  {addressType ? (
                    <input
                      maxLength={25}
                      placeholder="Enter your country"
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                    />
                  ) : (
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                    >
                      <option value="">Select a country</option>
                      <option value="uae">UAE</option>
                      <option value="saab">Saab</option>
                      <option value="fiat">Fiat</option>
                      <option value="audi">Audi</option>
                    </select>
                  )}
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    City
                  </p>
                  {addressType ? (
                    <input
                      maxLength={25}
                      placeholder="Enter your city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                    />
                  ) : (
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                    >
                      <option value="">Select a city</option>
                      <option value="dubai">Dubai</option>
                      <option value="abudhabi">Abu Dhabi</option>
                      <option value="sharjah">Sharjah</option>
                      <option value="ajman">Ajman</option>
                    </select>
                  )}
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    Address Line 1
                  </p>
                  <input
                    maxLength={25}
                    placeholder="Enter your address line 1"
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    Address Line 2
                  </p>
                  <input
                    maxLength={25}
                    placeholder="Enter your address line 2"
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    First name
                  </p>
                  <input
                    maxLength={25}
                    placeholder="Enter your first name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    Last name
                  </p>
                  <input
                    maxLength={25}
                    placeholder="Enter your last name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    Email address
                  </p>
                  <input
                    maxLength={50}
                    placeholder="Enter your email address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    Phone number
                  </p>
                  <input
                    maxLength={10}
                    placeholder="Enter your phone number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
              <button
                onClick={handleConfirmClick}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
              >
                Confirm Pickup
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
              >
                Back
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-[1550px] min-h-screen mx-auto py-8 sm:py-16 px-4 sm:px-8">
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${
          modal ? "opacity-50" : "opacity-100"
        }`}
        style={{
          backgroundImage: "url('kukuit_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="w-full max-w-[1020px] bg-white border mx-auto rounded-[20px] relative z-10 overflow-hidden">
        <div className="w-full">
          <Image
            width={1020}
            height={211}
            alt=""
            src="/kukuit_form_top_bg.png"
            className="w-full h-auto rounded-t-[20px]"
          />
        </div>
        <div className="absolute top-4 sm:top-10 left-4 sm:left-6">
          <h2 className="text-[#e6e6e6] text-3xl sm:text-[46px] font-normal font-luckiest leading-tight">
            SCHEDULE PICKUP
          </h2>
        </div>
        <div className="flex justify-center gap-4 mt-8">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => handleStepClick(step)}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                step === currentStep
                  ? "bg-[#e4086f] text-white"
                  : step < currentStep
                  ? "bg-[#e4086f] text-white opacity-70 hover:opacity-100"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </button>
          ))}
        </div>
        <div className="px-4 sm:px-8 lg:px-[94px] mt-8 sm:mt-[56px]">
          {renderStepContent()}
        </div>
      </div>
      {modal && <Modal onClose={handleCloseModal} />}
      <style jsx>{`
        @media (max-width: 768px) {
          .flex-col {
            flex-direction: column;
          }
          .flex-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default KukuitMain;
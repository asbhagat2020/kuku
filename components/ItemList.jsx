
// "use client";

// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import Link from "next/link";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const ItemList = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [conditions, setConditions] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [sizes, setSizes] = useState([]);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");

//   const router = useRouter();

//   const fetchAddress = async () => {
//     try {
//       const token = getAuthToken();
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
//       const fetchedAddresses = response?.data?.addresses;
//       setAddresses(fetchedAddresses);
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

//   const [formData, setFormData] = useState({
//     itemName: "",
//     description: "",
//     category: "",
//     subCategory: "",
//     gender: "",
//     condition: "",
//     brand: "",
//     size: "",
//     price: "",
//     damages: "",
//     rentOption: "No",
//     rentalPrice: "",
//     images: [],
//     // Updated: New schema field names
//     name: "",
//     mob_no_country_code: "971",
//     mobile_number: "",
//     alt_ph_country_code: "971",
//     alternate_phone: "",
//     house_no: "",
//     building_name: "",
//     area: "",
//     landmark: "",
//     city: "",
//     address_type: "Normal",
//     email: "",
//     country: "UAE",
//     color: "",
//   });

//   const [caseState, setCaseState] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [successPopup, setSuccessPopup] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [brandsRes, categoriesRes, conditionsRes, sizesRes, colorRes] =
//           await Promise.all([
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getbrand`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/getcondition`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sizes/getSizes`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/colors/getcolor`),
//           ]);

//         setBrands(brandsRes.data.brands || []);
//         setConditions(conditionsRes.data.conditions || []);
//         setSizes(sizesRes.data.sizes || []);
//         setColors(colorRes.data || []);
//         console.log("colors", colorRes.data || []);

//         const categoriesByGender = {};
//         categoriesRes.data.data.forEach((item) => {
//           categoriesByGender[item.parentCategory] = item.categories;
//         });
//         setCategories(categoriesByGender);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const handleFileChange = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
//       if (validImageTypes.includes(file.type)) {
//         const newImages = [...formData.images];
//         newImages[index] = file;
//         setFormData({ ...formData, images: newImages });
//         setErrors({ ...errors, images: "" });
//       } else {
//         setErrors({
//           ...errors,
//           images: "Only image files (JPEG, PNG) are allowed.",
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     if (Number(formData.price) < 1000 && formData.rentOption === "Yes") {
//       setFormData((prev) => ({
//         ...prev,
//         rentOption: "No",
//         rentalPrice: "",
//       }));
//     }
//   }, [formData.price]);

//   const removeImage = (index) => {
//     const newImages = [...formData.images];
//     newImages.splice(index, 1);
//     setFormData({ ...formData, images: newImages });
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.itemName.trim()) newErrors.itemName = "Product title is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";
//     if (!formData.category.trim()) newErrors.category = "Category is required";
//     if (!formData.gender) newErrors.gender = "Gender is required";
//     if (!formData.condition) newErrors.condition = "Condition is required";
//     if (!formData.brand) newErrors.brand = "Brand is required";
//     if (!formData.size) newErrors.size = "Size is required";
//     if (!formData.subCategory.trim()) newErrors.subCategory = "Sub Category is required";
//     if (!formData.price.trim()) newErrors.price = "Price is required";
//     if (formData.images.length < 2) newErrors.images = "At least two images are required";
//     if (formData.rentOption === "Yes" && !formData.rentalPrice) {
//       newErrors.rentalPrice = "Rental price is required when open to rent";
//     }
//     if (formData.rentOption === "Yes" && Number(formData.price) <= 500) {
//       newErrors.price = "Price must be above 500 AED for rental products";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setCaseState(2);
//     } else {
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     }
//   };

//   const uploadImage = async (imageFile) => {
//     const imageData = new FormData();
//     for (let i = 0; i < imageFile?.length; i++) {
//       imageData.append("files", imageFile[i]);
//       imageData.append("folder", "avatar");
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("No authentication token");
//       }
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/multiple`,
//         imageData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.fileUrls;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw new Error("Failed to upload image");
//     }
//   };

//   const getAuthToken = () => {
//     const token = Cookies.get("auth");
//     if (!token) return null;
//     try {
//       return JSON.parse(token);
//     } catch (error) {
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Updated: Address validation with new field names
//     let addressErrors = {};
//     if (!selectedAddress && !showAddressForm) {
//       addressErrors.pickupAddress = "Please select an existing address or add a new one";
//     }
//     if (showAddressForm) {
//       if (!formData.name.trim()) addressErrors.name = "Name is required";
//       if (!formData.mobile_number.trim()) addressErrors.mobile_number = "Mobile number is required";
//       if (!formData.house_no.trim()) addressErrors.house_no = "House number is required";
//       if (!formData.building_name.trim()) addressErrors.building_name = "Building name is required";
//       if (!formData.area.trim()) addressErrors.area = "Area is required";
//       if (!formData.landmark.trim()) addressErrors.landmark = "Landmark is required";
//       if (!formData.city.trim()) addressErrors.city = "City is required";
//       if (!formData.email.trim()) addressErrors.email = "Email is required";
//     }

//     if (Object.keys(addressErrors).length > 0) {
//       setErrors(addressErrors);
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//       return;
//     }

//     if (validateForm()) {
//       try {
//         const token = getAuthToken();
//         if (!token) {
//           toast.error("Please login to post items");
//           return;
//         }

//         let imageUrl = null;
//         if (formData.images) {
//           imageUrl = await uploadImage(formData.images);
//         }

//         // Updated: Use new field names for pickupAddress object
//         const pickupAddress = selectedAddress
//           ? selectedAddress._id // Send only the ID as a string
//           : {
//               name: formData.name,
//               mob_no_country_code: formData.mob_no_country_code,
//               mobile_number: formData.mobile_number,
//               alt_ph_country_code: formData.alt_ph_country_code,
//               alternate_phone: formData.alternate_phone,
//               house_no: formData.house_no,
//               building_name: formData.building_name,
//               area: formData.area,
//               landmark: formData.landmark,
//               city: formData.city,
//               address_type: formData.address_type,
//               email: formData.email,
//               seller: null,
//               isDefault: false,
//               country: formData.country,
//             };

//         const productData = {
//           approval: { status: "Pending", reason: "", updatedAt: Date.now() },
//           productType: "Listing",
//           condition: formData.condition,
//           name: formData.itemName,
//           size: formData.size,
//           openToRent: formData.rentOption,
//           usage: formData.usage || "",
//           damages: formData.damages || "",
//           seller: null,
//           admin: null,
//           pickupAddress: pickupAddress,
//           pickup: null,
//           color: formData.color || null,
//           category: {
//             parentCategory: selectedGender,
//             categoryName: selectedCategory,
//             subCategoryName: selectedSubCategory,
//           },
//           brand: formData.brand,
//           description: formData.description,
//           price: Number(formData.price),
//           images: imageUrl,
//           pricePerDay: formData.rentOption === "Yes" ? Number(formData.rentalPrice) : 0,
//           pricePerHour: formData.rentOption === "Yes" ? Math.round(Number(formData.price) * 0.02) : 0,
//           deposit: formData.rentOption === "Yes" ? Math.round(Number(formData.price) * 0.2) : 0,
//           orders: [],
//           rent: [],
//           onSale: false,
//           discountPercentage: 0,
//           isTopBrand: false,
//           coupon: [],
//           likesCount: 0,
//           barcode: null,
//           shippingBarcode: null,
//           storageLocation: null,
//           commission: 0.2,
//           netEarning: null,
//         };

//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/product/add`,
//           productData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 201) {
//           toast.success("Product added successfully!");
//           setTimeout(() => {
//             router.push("/");
//           }, 2000);
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         toast.error(error.response?.data?.message || "Error adding product");
//       }
//     } else {
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     }
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   const AddressSelection = ({ addresses, onSelect, onAddNew }) => {
//     const [selectedType, setSelectedType] = useState("existing");

//     const handleTypeChange = (type) => {
//       setSelectedType(type);
//       if (type === "new") {
//         onAddNew();
//       }
//     };

//     return (
//       <div className="space-y-6 font-karla">
//         <div className="flex gap-6 mb-6">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="addressType"
//               checked={selectedType === "existing"}
//               onChange={() => handleTypeChange("existing")}
//               className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="text-gray-700">Use Existing Address</span>
//           </label>
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="addressType"
//               checked={selectedType === "new"}
//               onChange={() => handleTypeChange("new")}
//               className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="text-gray-700">Add New Address</span>
//           </label>
//         </div>

//         {selectedType === "existing" && addresses?.length > 0 ? (
//           <div className="space-y-4">
//             {addresses.map((address) => (
//               <div
//                 key={address._id}
//                 className={`border rounded-lg p-4 cursor-pointer transition-all ${
//                   selectedAddress?._id === address._id
//                     ? "border-2 border-pink-500"
//                     : "border-gray-200 hover:border-pink-300"
//                 }`}
//                 onClick={() => onSelect(address)}
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-2">
//                     <p className="font-semibold">{address.name}</p>
//                     <p className="text-sm text-gray-600">
//                       {`${address.mob_no_country_code}${address.mobile_number}`}
//                     </p>
//                     <p className="text-sm text-gray-600">{address.email}</p>
//                     <p className="text-sm text-gray-600">
//                       {`${address.house_no}, ${address.building_name}, ${address.area}`}
//                       {address.landmark && `, ${address.landmark}`}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {address.city}, {address.country}
//                     </p>
//                   </div>
//                   <div className="mt-2">
//                     <input
//                       type="radio"
//                       checked={selectedAddress?._id === address._id}
//                       onChange={() => onSelect(address)}
//                       className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : selectedType === "existing" ? (
//           <p className="text-gray-500 italic">
//             No saved addresses found. Please add a new address.
//           </p>
//         ) : null}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-[800px] bg-white rounded-3xl shadow-md border-4 border-black mx-auto overflow-hidden mt-10">
//       {caseState === 1 ? (
//         <>
//           {successPopup && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
//                 <img
//                   src="/ChechkNotfi.png"
//                   alt="Check Notification"
//                   className="w-14 h-14 mx-auto mb-4"
//                 />
//                 <h2 className="text-lg font-semibold text-black">
//                   Your product listing request has been successfully received
//                 </h2>
//                 <p className="text-gray-500 mt-2">
//                   Post the approval from our QC team, your product will be
//                   visible to other users.
//                 </p>
//               </div>
//             </div>
//           )}

//           <div
//             className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
//             style={{
//               backgroundImage: `url('/pink-header.png')`,
//               clipPath: "ellipse(90% 100% at 50% 0%)",
//             }}
//           >
//             <button
//               className="absolute top-4 left-4 flex items-center space-x-1 px-2 py-1 text-sm text-black bg-white bg-opacity-60 hover:bg-opacity-80 rounded-md transition"
//               onClick={() => router.push("/")}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 className="w-4 h-4"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//               <span>Back</span>
//             </button>

//             <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
//               LIST YOUR ITEM
//             </div>

//             <img
//               src="/yellow-bird.png"
//               alt="Yellow Bird"
//               className="absolute top-6 right-24 w-12 h-12 hidden md:block"
//               style={{ marginTop: "53px", marginRight: "30px" }}
//             />
//             <div
//               className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
//               style={{ marginTop: "63px" }}
//             >
//               <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
//             </div>
//           </div>

//           <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
//             <form onSubmit={handleNext} className="space-y-6">
//               {/* Product form fields - unchanged */}
//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Images
//                 </label>
//                 <div className="flex flex-wrap gap-4 sm:gap-9">
//                   {Array(4)
//                     .fill()
//                     .map((_, idx) => (
//                       <div
//                         key={idx}
//                         className="relative w-24 h-24 border border-[#E4086F] flex items-center justify-center overflow-hidden"
//                       >
//                         <input
//                           type="file"
//                           accept="image/png, image/jpeg, image/jpg"
//                           onChange={(e) => handleFileChange(e, idx)}
//                           className="opacity-0 absolute inset-0 cursor-pointer"
//                         />
//                         {formData.images[idx] ? (
//                           <>
//                             <img
//                               src={URL.createObjectURL(formData.images[idx])}
//                               alt={`Uploaded ${idx + 1}`}
//                               className="w-full h-full object-cover rounded-lg"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(idx)}
//                               className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
//                               aria-label="Remove Image"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4 text-red-500"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M6 18L18 6M6 6l12 12"
//                                 />
//                               </svg>
//                             </button>
//                           </>
//                         ) : (
//                           <img
//                             src="/upload.png"
//                             alt="Upload Icon"
//                             className="w-8 h-8"
//                           />
//                         )}
//                       </div>
//                     ))}
//                 </div>
//                 {errors.images && (
//                   <p className="text-red-500 mt-1">{errors.images}</p>
//                 )}
//                 <a href="/tips" className="text-[#E4086F] mt-2 underline">
//                   Read our video and photo tips
//                 </a>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Title
//                 </label>
//                 <input
//                   type="text"
//                   name="itemName"
//                   value={formData.itemName}
//                   onChange={handleChange}
//                   placeholder="Enter your product title"
//                   className={`w-full p-2 border ${
//                     errors.itemName ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                   required
//                 />
//                 {errors.itemName && (
//                   <p className="text-red-500 mt-1">{errors.itemName}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Enter your product description"
//                   className={`w-full p-2 border ${
//                     errors.description ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                   rows={4}
//                 />
//                 {errors.description && (
//                   <p className="text-red-500 mt-1">{errors.description}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Gender
//                 </label>
//                 <select
//                   name="gender"
//                   value={selectedGender}
//                   onChange={(e) => {
//                     setSelectedGender(e.target.value);
//                     setSelectedCategory("");
//                     setSelectedSubCategory("");
//                     handleChange(e);
//                   }}
//                   className={`w-full p-2 border ${
//                     errors.gender ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Gender</option>
//                   {Object.keys(categories).map((gender) => (
//                     <option key={gender} value={gender}>
//                       {gender}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Category
//                 </label>
//                 <select
//                   name="category"
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     setSelectedSubCategory("");
//                     handleChange(e);
//                   }}
//                   disabled={!selectedGender}
//                   className={`w-full p-2 border ${
//                     errors.category ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Category</option>
//                   {selectedGender &&
//                     categories[selectedGender]?.map((category) => (
//                       <option key={category._id} value={category.categoryName}>
//                         {category.categoryName}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Sub Category
//                 </label>
//                 <select
//                   name="subCategory"
//                   value={selectedSubCategory}
//                   onChange={(e) => {
//                     setSelectedSubCategory(e.target.value);
//                     handleChange(e);
//                   }}
//                   disabled={!selectedCategory}
//                   className={`w-full p-2 border ${
//                     errors.subCategory ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Sub Category</option>
//                   {selectedGender &&
//                     selectedCategory &&
//                     categories[selectedGender]
//                       ?.find((cat) => cat.categoryName === selectedCategory)
//                       ?.subCategories.map((sub) => (
//                         <option key={sub._id} value={sub.subCategoryName}>
//                           {sub.subCategoryName}
//                         </option>
//                       ))}
//                 </select>
//                 {errors.subCategory && (
//                   <p className="text-red-500 mt-1">{errors.subCategory}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Condition
//                 </label>
//                 <select
//                   name="condition"
//                   value={formData.condition}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.condition ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Condition</option>
//                   {conditions.map((condition) => (
//                     <option key={condition._id} value={condition._id}>
//                       {condition.conditionName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Brand
//                 </label>
//                 <select
//                   name="brand"
//                   value={formData.brand}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.brand ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Brand</option>
//                   {brands.map((brand) => (
//                     <option key={brand._id} value={brand._id}>
//                       {brand.brandName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Size
//                 </label>
//                 <select
//                   name="size"
//                   value={formData.size}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.size ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Choose Product Size</option>
//                   {sizes.map((size) => (
//                     <option key={size._id} value={size._id}>
//                       {size.sizeName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Color
//                 </label>
//                 <select
//                   name="color"
//                   value={formData.color}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.color ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Choose Product color</option>
//                   {colors.map((color) => (
//                     <option key={color._id} value={color._id}>
//                       {color.colorName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Price (AED)
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   placeholder="Enter Product Price in AED"
//                   className={`w-full p-2 border ${
//                     errors.price ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
//                   min="0"
//                   step="0.01"
//                   onKeyDown={(e) => {
//                     if (e.key === "e" || e.key === "+" || e.key === "-") {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//                 {errors.price && (
//                   <p className="text-red-500 mt-1">{errors.price}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Damages
//                 </label>
//                 <textarea
//                   name="damages"
//                   value={formData.damages}
//                   onChange={handleChange}
//                   placeholder="Mention Damages"
//                   className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
//                   rows={4}
//                 />
//               </div>

//               <div>
//                 {Number(formData.price) >= 1000 ? (
//                   <div className="mb-4">
//                     <label className="flex items-center text-[#151515] text-base font-bold font-karla">
//                       <input
//                         type="checkbox"
//                         name="rentOption"
//                         checked={formData.rentOption === "Yes"}
//                         onChange={(e) => {
//                           handleChange({
//                             target: {
//                               name: "rentOption",
//                               value: e.target.checked ? "Yes" : "No",
//                             },
//                           });
//                         }}
//                         className="mr-2 h-4 w-4"
//                       />
//                       Open to Rent
//                     </label>
//                     {errors.rentOption && (
//                       <p className="text-red-500 mt-1">{errors.rentOption}</p>
//                     )}
//                   </div>
//                 ) : null}

//                 {formData.rentOption === "Yes" &&
//                   Number(formData.price) >= 1000 && (
//                     <div>
//                       <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                         Rental Price
//                       </label>
//                       <input
//                         type="number"
//                         name="rentalPrice"
//                         value={formData.rentalPrice}
//                         onChange={handleChange}
//                         placeholder="Enter rental price"
//                         className={`w-full p-2 border ${
//                           errors.rentalPrice
//                             ? "border-red-500"
//                             : "border-[#868686]"
//                         } rounded-lg max-w-[500px]`}
//                       />
//                       {errors.rentalPrice && (
//                         <p className="text-red-500 mt-1">
//                           {errors.rentalPrice}
//                         </p>
//                       )}
//                     </div>
//                   )}
//               </div>

//               <p className="text-gray-500 mt-1 text-left max-w-[500px]">
//                 Renting option is available only when the price of the product
//                 is above <span className="text-[#E4086F]">1000 AED</span>
//               </p>

//               <div className="flex space-x-8 mt-6 justify-center">
//                 <button
//                   type="submit"
//                   className="px-8 py-3 bg-[#E4086F] text-yellow-400 text-lg font-semibold hover:bg-[#d4076e] transition-colors"
//                   style={{ borderRadius: "22px" }}
//                 >
//                   Next
//                 </button>

//                 <button
//                   onClick={handleBack}
//                   type="button"
//                   className="px-8 py-3 border border-[#E4086F] text-[#E4086F] text-lg font-semibold hover:bg-[#fce4f4] transition-colors"
//                   style={{ borderRadius: "22px" }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </>
//       ) : (
//         <>
//           <div
//             className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
//             style={{
//               backgroundImage: `url('/pink-header.png')`,
//               clipPath: "ellipse(90% 100% at 50% 0%)",
//             }}
//           >
//             <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
//               PICKUP ADDRESS
//             </div>

//             <img
//               src="/yellow-bird.png"
//               alt="Yellow Bird"
//               className="absolute top-6 right-24 w-12 h-12 hidden md:block"
//               style={{ marginTop: "53px", marginRight: "30px" }}
//             />
//             <div
//               className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
//               style={{ marginTop: "63px" }}
//             >
//               <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
//             </div>
//           </div>

//           <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
//                 Pickup Details
//               </p>
//               <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
//                 Step 2 of 2
//               </p>
//             </div>
//             <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla">
//               Please enter your pickup details
//             </p>
//             <div className="space-y-4">
//               <AddressSelection
//                 addresses={addresses}
//                 onSelect={(address) => {
//                   setSelectedAddress(address);
//                   setShowAddressForm(false);
//                   // Updated: Map old field names to new ones for formData
//                   setFormData({
//                     ...formData,
//                     name: address.name || "",
//                     mob_no_country_code: address.mob_no_country_code || "971",
//                     mobile_number: address.mobile_number || "",
//                     alt_ph_country_code: address.alt_ph_country_code || "971",
//                     alternate_phone: address.alternate_phone || "",
//                     house_no: address.house_no || "",
//                     building_name: address.building_name || "",
//                     area: address.area || "",
//                     landmark: address.landmark || "",
//                     city: address.city || "",
//                     email: address.email || "",
//                     country: address.country || "UAE",
//                   });
//                 }}
//                 onAddNew={() => {
//                   setShowAddressForm(true);
//                   setSelectedAddress(null);
//                   // Updated: Reset with new field names
//                   setFormData({
//                     ...formData,
//                     name: "",
//                     mob_no_country_code: "971",
//                     mobile_number: "",
//                     alt_ph_country_code: "971",
//                     alternate_phone: "",
//                     house_no: "",
//                     building_name: "",
//                     area: "",
//                     landmark: "",
//                     city: "",
//                     email: "",
//                     country: "UAE",
//                   });
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.name && (
//                         <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                       )}
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Mobile Country Code
//                       </p>
//                       <input
//                         maxLength={4}
//                         placeholder="e.g., 971"
//                         type="text"
//                         name="mob_no_country_code"
//                         value={formData.mob_no_country_code}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.mobile_number && (
//                         <p className="text-red-500 text-sm mt-1">{errors.mobile_number}</p>
//                       )}
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Alternate Mobile Country Code
//                       </p>
//                       <input
//                         maxLength={4}
//                         placeholder="e.g., 971"
//                         type="text"
//                         name="alt_ph_country_code"
//                         value={formData.alt_ph_country_code}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Alternate Mobile Number
//                       </p>
//                       <input
//                         maxLength={12}
//                         placeholder="Enter alternate mobile number"
//                         type="tel"
//                         name="alternate_phone"
//                         value={formData.alternate_phone}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.house_no && (
//                         <p className="text-red-500 text-sm mt-1">{errors.house_no}</p>
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.building_name && (
//                         <p className="text-red-500 text-sm mt-1">{errors.building_name}</p>
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.area && (
//                         <p className="text-red-500 text-sm mt-1">{errors.area}</p>
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.landmark && (
//                         <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>
//                       )}
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         City
//                       </p>
//                       <select
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
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
//                       {errors.city && (
//                         <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Address Type
//                       </p>
//                       <select
//                         name="address_type"
//                         value={formData.address_type}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       >
//                         <option value="Normal">Normal</option>
//                         <option value="Western">Western</option>
//                       </select>
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Country
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter country"
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.country && (
//                         <p className="text-red-500 text-sm mt-1">{errors.country}</p>
//                       )}
//                     </div>
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
//                       onChange={handleChange}
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
//               <button
//                 onClick={handleSubmit}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
//               >
//                 List Now
//               </button>
//               <button
//                 onClick={() => setCaseState(1)}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ItemList;








// "use client";

// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import Link from "next/link";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const ItemList = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [conditions, setConditions] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [sizes, setSizes] = useState([]);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [selectedType, setSelectedType] = useState("existing"); // Move selectedType to parent

//   const router = useRouter();

//   const fetchAddress = async () => {
//     try {
//       const token = getAuthToken();
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
//       const fetchedAddresses = response?.data?.addresses;
//       setAddresses(fetchedAddresses);
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

//   const [formData, setFormData] = useState({
//     itemName: "",
//     description: "",
//     category: "",
//     subCategory: "",
//     gender: "",
//     condition: "",
//     brand: "",
//     size: "",
//     price: "",
//     damages: "",
//     rentOption: "No",
//     rentalPrice: "",
//     images: [],
//     name: "",
//     mob_no_country_code: "971",
//     mobile_number: "",
//     alt_ph_country_code: "971",
//     alternate_phone: "",
//     house_no: "",
//     building_name: "",
//     area: "",
//     landmark: "",
//     city: "",
//     address_type: "Normal",
//     email: "",
//     country: "UAE",
//     color: "",
//   });

//   const [caseState, setCaseState] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [successPopup, setSuccessPopup] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [brandsRes, categoriesRes, conditionsRes, sizesRes, colorRes] =
//           await Promise.all([
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getbrand`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/getcondition`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sizes/getSizes`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/colors/getcolor`),
//           ]);

//         setBrands(brandsRes.data.brands || []);
//         setConditions(conditionsRes.data.conditions || []);
//         setSizes(sizesRes.data.sizes || []);
//         setColors(colorRes.data || []);
//         console.log("colors", colorRes.data || []);

//         const categoriesByGender = {};
//         categoriesRes.data.data.forEach((item) => {
//           categoriesByGender[item.parentCategory] = item.categories;
//         });
//         setCategories(categoriesByGender);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const handleFileChange = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
//       if (validImageTypes.includes(file.type)) {
//         const newImages = [...formData.images];
//         newImages[index] = file;
//         setFormData({ ...formData, images: newImages });
//         setErrors({ ...errors, images: "" });
//       } else {
//         setErrors({
//           ...errors,
//           images: "Only image files (JPEG, PNG) are allowed.",
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     if (Number(formData.price) < 1000 && formData.rentOption === "Yes") {
//       setFormData((prev) => ({
//         ...prev,
//         rentOption: "No",
//         rentalPrice: "",
//       }));
//     }
//   }, [formData.price]);

//   const removeImage = (index) => {
//     const newImages = [...formData.images];
//     newImages.splice(index, 1);
//     setFormData({ ...formData, images: newImages });
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.itemName.trim()) newErrors.itemName = "Product title is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";
//     if (!formData.category.trim()) newErrors.category = "Category is required";
//     if (!formData.gender) newErrors.gender = "Gender is required";
//     if (!formData.condition) newErrors.condition = "Condition is required";
//     if (!formData.brand) newErrors.brand = "Brand is required";
//     if (!formData.size) newErrors.size = "Size is required";
//     if (!formData.subCategory.trim()) newErrors.subCategory = "Sub Category is required";
//     if (!formData.price.trim()) newErrors.price = "Price is required";
//     if (formData.images.length < 2) newErrors.images = "At least two images are required";
//     if (formData.rentOption === "Yes" && !formData.rentalPrice) {
//       newErrors.rentalPrice = "Rental price is required when open to rent";
//     }
//     if (formData.rentOption === "Yes" && Number(formData.price) <= 500) {
//       newErrors.price = "Price must be above 500 AED for rental products";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setCaseState(2);
//     } else {
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     }
//   };

//   const uploadImage = async (imageFile) => {
//     const imageData = new FormData();
//     for (let i = 0; i < imageFile?.length; i++) {
//       imageData.append("files", imageFile[i]);
//       imageData.append("folder", "avatar");
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("No authentication token");
//       }
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/multiple`,
//         imageData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.fileUrls;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw new Error("Failed to upload image");
//     }
//   };

//   const getAuthToken = () => {
//     const token = Cookies.get("auth");
//     if (!token) return null;
//     try {
//       return JSON.parse(token);
//     } catch (error) {
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let addressErrors = {};
//     if (!selectedAddress && !showAddressForm) {
//       addressErrors.pickupAddress = "Please select an existing address or add a new one";
//     }
//     if (showAddressForm) {
//       if (!formData.name.trim()) addressErrors.name = "Name is required";
//       if (!formData.mobile_number.trim()) addressErrors.mobile_number = "Mobile number is required";
//       if (!formData.house_no.trim()) addressErrors.house_no = "House number is required";
//       if (!formData.building_name.trim()) addressErrors.building_name = "Building name is required";
//       if (!formData.area.trim()) addressErrors.area = "Area is required";
//       if (!formData.landmark.trim()) addressErrors.landmark = "Landmark is required";
//       if (!formData.city.trim()) addressErrors.city = "City is required";
//       if (!formData.email.trim()) addressErrors.email = "Email is required";
//     }

//     if (Object.keys(addressErrors).length > 0) {
//       setErrors(addressErrors);
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//       return;
//     }

//     if (validateForm()) {
//       try {
//         const token = getAuthToken();
//         if (!token) {
//           toast.error("Please login to post items");
//           return;
//         }

//         let imageUrl = null;
//         if (formData.images) {
//           imageUrl = await uploadImage(formData.images);
//         }

//         const pickupAddress = selectedAddress
//           ? selectedAddress._id
//           : {
//               name: formData.name,
//               mob_no_country_code: formData.mob_no_country_code,
//               mobile_number: formData.mobile_number,
//               alt_ph_country_code: formData.alt_ph_country_code,
//               alternate_phone: formData.alternate_phone,
//               house_no: formData.house_no,
//               building_name: formData.building_name,
//               area: formData.area,
//               landmark: formData.landmark,
//               city: formData.city,
//               address_type: formData.address_type,
//               email: formData.email,
//               seller: null,
//               isDefault: false,
//               country: formData.country,
//             };

//         const productData = {
//           approval: { status: "Pending", reason: "", updatedAt: Date.now() },
//           productType: "Listing",
//           condition: formData.condition,
//           name: formData.itemName,
//           size: formData.size,
//           openToRent: formData.rentOption,
//           usage: formData.usage || "",
//           damages: formData.damages || "",
//           seller: null,
//           admin: null,
//           pickupAddress: pickupAddress,
//           pickup: null,
//           color: formData.color || null,
//           category: {
//             parentCategory: selectedGender,
//             categoryName: selectedCategory,
//             subCategoryName: selectedSubCategory,
//           },
//           brand: formData.brand,
//           description: formData.description,
//           price: Number(formData.price),
//           images: imageUrl,
//           pricePerDay: formData.rentOption === "Yes" ? Number(formData.rentalPrice) : 0,
//           pricePerHour: formData.rentOption === "Yes" ? Math.round(Number(formData.price) * 0.02) : 0,
//           deposit: formData.rentOption === "Yes" ? Math.round(Number(formData.price) * 0.2) : 0,
//           orders: [],
//           rent: [],
//           onSale: false,
//           discountPercentage: 0,
//           isTopBrand: false,
//           coupon: [],
//           likesCount: 0,
//           barcode: null,
//           shippingBarcode: null,
//           storageLocation: null,
//           commission: 0.2,
//           netEarning: null,
//         };

//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/product/add`,
//           productData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 201) {
//           toast.success("Product added successfully!");
//           setTimeout(() => {
//             router.push("/");
//           }, 2000);
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         toast.error(error.response?.data?.message || "Error adding product");
//       }
//     } else {
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     }
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   const AddressSelection = ({ addresses, onSelect, onAddNew, selectedType, setSelectedType }) => {
//     const handleTypeChange = (type) => {
//       setSelectedType(type);
//       if (type === "new") {
//         onAddNew();
//       } else {
//         setShowAddressForm(false); // Ensure form is hidden when switching back to existing
//       }
//     };

//     return (
//       <div className="space-y-6 font-karla">
//         <div className="flex gap-6 mb-6">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="addressType"
//               checked={selectedType === "existing"}
//               onChange={() => handleTypeChange("existing")}
//               className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="text-gray-700">Use Existing Address</span>
//           </label>
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="addressType"
//               checked={selectedType === "new"}
//               onChange={() => handleTypeChange("new")}
//               className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="text-gray-700">Add New Address</span>
//           </label>
//         </div>

//         {selectedType === "existing" && addresses?.length > 0 ? (
//           <div className="space-y-4">
//             {addresses.map((address) => (
//               <div
//                 key={address._id}
//                 className={`border rounded-lg p-4 cursor-pointer transition-all ${
//                   selectedAddress?._id === address._id
//                     ? "border-2 border-pink-500"
//                     : "border-gray-200 hover:border-pink-300"
//                 }`}
//                 onClick={() => onSelect(address)}
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-2">
//                     <p className="font-semibold">{address.name}</p>
//                     <p className="text-sm text-gray-600">
//                       {`${address.mob_no_country_code}${address.mobile_number}`}
//                     </p>
//                     <p className="text-sm text-gray-600">{address.email}</p>
//                     <p className="text-sm text-gray-600">
//                       {`${address.house_no}, ${address.building_name}, ${address.area}`}
//                       {address.landmark && `, ${address.landmark}`}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {address.city}, {address.country}
//                     </p>
//                   </div>
//                   <div className="mt-2">
//                     <input
//                       type="radio"
//                       checked={selectedAddress?._id === address._id}
//                       onChange={() => onSelect(address)}
//                       className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : selectedType === "existing" ? (
//           <p className="text-gray-500 italic">
//             No saved addresses found. Please add a new address.
//           </p>
//         ) : null}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-[800px] bg-white rounded-3xl shadow-md border-4 border-black mx-auto overflow-hidden mt-10">
//       {caseState === 1 ? (
//         <>
//           {successPopup && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
//                 <img
//                   src="/ChechkNotfi.png"
//                   alt="Check Notification"
//                   className="w-14 h-14 mx-auto mb-4"
//                 />
//                 <h2 className="text-lg font-semibold text-black">
//                   Your product listing request has been successfully received
//                 </h2>
//                 <p className="text-gray-500 mt-2">
//                   Post the approval from our QC team, your product will be
//                   visible to other users.
//                 </p>
//               </div>
//             </div>
//           )}

//           <div
//             className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
//             style={{
//               backgroundImage: `url('/pink-header.png')`,
//               clipPath: "ellipse(90% 100% at 50% 0%)",
//             }}
//           >
//             <button
//               className="absolute top-4 left-4 flex items-center space-x-1 px-2 py-1 text-sm text-black bg-white bg-opacity-60 hover:bg-opacity-80 rounded-md transition"
//               onClick={() => router.push("/")}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 className="w-4 h-4"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//               <span>Back</span>
//             </button>

//             <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
//               LIST YOUR ITEM
//             </div>

//             <img
//               src="/yellow-bird.png"
//               alt="Yellow Bird"
//               className="absolute top-6 right-24 w-12 h-12 hidden md:block"
//               style={{ marginTop: "53px", marginRight: "30px" }}
//             />
//             <div
//               className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
//               style={{ marginTop: "63px" }}
//             >
//               <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
//             </div>
//           </div>

//           <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
//             <form onSubmit={handleNext} className="space-y-6">
//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Images
//                 </label>
//                 <div className="flex flex-wrap gap-4 sm:gap-9">
//                   {Array(4)
//                     .fill()
//                     .map((_, idx) => (
//                       <div
//                         key={idx}
//                         className="relative w-24 h-24 border border-[#E4086F] flex items-center justify-center overflow-hidden"
//                       >
//                         <input
//                           type="file"
//                           accept="image/png, image/jpeg, image/jpg"
//                           onChange={(e) => handleFileChange(e, idx)}
//                           className="opacity-0 absolute inset-0 cursor-pointer"
//                         />
//                         {formData.images[idx] ? (
//                           <>
//                             <img
//                               src={URL.createObjectURL(formData.images[idx])}
//                               alt={`Uploaded ${idx + 1}`}
//                               className="w-full h-full object-cover rounded-lg"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(idx)}
//                               className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
//                               aria-label="Remove Image"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4 text-red-500"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M6 18L18 6M6 6l12 12"
//                                 />
//                               </svg>
//                             </button>
//                           </>
//                         ) : (
//                           <img
//                             src="/upload.png"
//                             alt="Upload Icon"
//                             className="w-8 h-8"
//                           />
//                         )}
//                       </div>
//                     ))}
//                 </div>
//                 {errors.images && (
//                   <p className="text-red-500 mt-1">{errors.images}</p>
//                 )}
//                 <a href="/tips" className="text-[#E4086F] mt-2 underline">
//                   Read our video and photo tips
//                 </a>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Title
//                 </label>
//                 <input
//                   type="text"
//                   name="itemName"
//                   value={formData.itemName}
//                   onChange={handleChange}
//                   placeholder="Enter your product title"
//                   className={`w-full p-2 border ${
//                     errors.itemName ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                   required
//                 />
//                 {errors.itemName && (
//                   <p className="text-red-500 mt-1">{errors.itemName}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Enter your product description"
//                   className={`w-full p-2 border ${
//                     errors.description ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                   rows={4}
//                 />
//                 {errors.description && (
//                   <p className="text-red-500 mt-1">{errors.description}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Gender
//                 </label>
//                 <select
//                   name="gender"
//                   value={selectedGender}
//                   onChange={(e) => {
//                     setSelectedGender(e.target.value);
//                     setSelectedCategory("");
//                     setSelectedSubCategory("");
//                     handleChange(e);
//                   }}
//                   className={`w-full p-2 border ${
//                     errors.gender ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Gender</option>
//                   {Object.keys(categories).map((gender) => (
//                     <option key={gender} value={gender}>
//                       {gender}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Category
//                 </label>
//                 <select
//                   name="category"
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     setSelectedSubCategory("");
//                     handleChange(e);
//                   }}
//                   disabled={!selectedGender}
//                   className={`w-full p-2 border ${
//                     errors.category ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Category</option>
//                   {selectedGender &&
//                     categories[selectedGender]?.map((category) => (
//                       <option key={category._id} value={category.categoryName}>
//                         {category.categoryName}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Sub Category
//                 </label>
//                 <select
//                   name="subCategory"
//                   value={selectedSubCategory}
//                   onChange={(e) => {
//                     setSelectedSubCategory(e.target.value);
//                     handleChange(e);
//                   }}
//                   disabled={!selectedCategory}
//                   className={`w-full p-2 border ${
//                     errors.subCategory ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Sub Category</option>
//                   {selectedGender &&
//                     selectedCategory &&
//                     categories[selectedGender]
//                       ?.find((cat) => cat.categoryName === selectedCategory)
//                       ?.subCategories.map((sub) => (
//                         <option key={sub._id} value={sub.subCategoryName}>
//                           {sub.subCategoryName}
//                         </option>
//                       ))}
//                 </select>
//                 {errors.subCategory && (
//                   <p className="text-red-500 mt-1">{errors.subCategory}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Condition
//                 </label>
//                 <select
//                   name="condition"
//                   value={formData.condition}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.condition ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Condition</option>
//                   {conditions.map((condition) => (
//                     <option key={condition._id} value={condition._id}>
//                       {condition.conditionName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Brand
//                 </label>
//                 <select
//                   name="brand"
//                   value={formData.brand}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.brand ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Brand</option>
//                   {brands.map((brand) => (
//                     <option key={brand._id} value={brand._id}>
//                       {brand.brandName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Size
//                 </label>
//                 <select
//                   name="size"
//                   value={formData.size}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.size ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Choose Product Size</option>
//                   {sizes.map((size) => (
//                     <option key={size._id} value={size._id}>
//                       {size.sizeName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Color
//                 </label>
//                 <select
//                   name="color"
//                   value={formData.color}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.color ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Choose Product color</option>
//                   {colors.map((color) => (
//                     <option key={color._id} value={color._id}>
//                       {color.colorName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Price (AED)
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   placeholder="Enter Product Price in AED"
//                   className={`w-full p-2 border ${
//                     errors.price ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
//                   min="0"
//                   step="0.01"
//                   onKeyDown={(e) => {
//                     if (e.key === "e" || e.key === "+" || e.key === "-") {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//                 {errors.price && (
//                   <p className="text-red-500 mt-1">{errors.price}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Damages
//                 </label>
//                 <textarea
//                   name="damages"
//                   value={formData.damages}
//                   onChange={handleChange}
//                   placeholder="Mention Damages"
//                   className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
//                   rows={4}
//                 />
//               </div>

//               <div>
//                 {Number(formData.price) >= 1000 ? (
//                   <div className="mb-4">
//                     <label className="flex items-center text-[#151515] text-base font-bold font-karla">
//                       <input
//                         type="checkbox"
//                         name="rentOption"
//                         checked={formData.rentOption === "Yes"}
//                         onChange={(e) => {
//                           handleChange({
//                             target: {
//                               name: "rentOption",
//                               value: e.target.checked ? "Yes" : "No",
//                             },
//                           });
//                         }}
//                         className="mr-2 h-4 w-4"
//                       />
//                       Open to Rent
//                     </label>
//                     {errors.rentOption && (
//                       <p className="text-red-500 mt-1">{errors.rentOption}</p>
//                     )}
//                   </div>
//                 ) : null}

//                 {formData.rentOption === "Yes" &&
//                   Number(formData.price) >= 1000 && (
//                     <div>
//                       <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                         Rental Price
//                       </label>
//                       <input
//                         type="number"
//                         name="rentalPrice"
//                         value={formData.rentalPrice}
//                         onChange={handleChange}
//                         placeholder="Enter rental price"
//                         className={`w-full p-2 border ${
//                           errors.rentalPrice
//                             ? "border-red-500"
//                             : "border-[#868686]"
//                         } rounded-lg max-w-[500px]`}
//                       />
//                       {errors.rentalPrice && (
//                         <p className="text-red-500 mt-1">
//                           {errors.rentalPrice}
//                         </p>
//                       )}
//                     </div>
//                   )}
//               </div>

//               <p className="text-gray-500 mt-1 text-left max-w-[500px]">
//                 Renting option is available only when the price of the product
//                 is above <span className="text-[#E4086F]">1000 AED</span>
//               </p>

//               <div className="flex space-x-8 mt-6 justify-center">
//                 <button
//                   type="submit"
//                   className="px-8 py-3 bg-[#E4086F] text-yellow-400 text-lg font-semibold hover:bg-[#d4076e] transition-colors"
//                   style={{ borderRadius: "22px" }}
//                 >
//                   Next
//                 </button>

//                 <button
//                   onClick={handleBack}
//                   type="button"
//                   className="px-8 py-3 border border-[#E4086F] text-[#E4086F] text-lg font-semibold hover:bg-[#fce4f4] transition-colors"
//                   style={{ borderRadius: "22px" }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </>
//       ) : (
//         <>
//           <div
//             className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
//             style={{
//               backgroundImage: `url('/pink-header.png')`,
//               clipPath: "ellipse(90% 100% at 50% 0%)",
//             }}
//           >
//             <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
//               PICKUP ADDRESS
//             </div>

//             <img
//               src="/yellow-bird.png"
//               alt="Yellow Bird"
//               className="absolute top-6 right-24 w-12 h-12 hidden md:block"
//               style={{ marginTop: "53px", marginRight: "30px" }}
//             />
//             <div
//               className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
//               style={{ marginTop: "63px" }}
//             >
//               <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
//             </div>
//           </div>

//           <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
//                 Pickup Details
//               </p>
//               <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
//                 Step 2 of 2
//               </p>
//             </div>
//             <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla">
//               Please enter your pickup details
//             </p>
//             <div className="space-y-4">
//               <AddressSelection
//                 addresses={addresses}
//                 onSelect={(address) => {
//                   setSelectedAddress(address);
//                   setShowAddressForm(false);
//                   setSelectedType("existing");
//                   setFormData({
//                     ...formData,
//                     name: address.name || "",
//                     mob_no_country_code: address.mob_no_country_code || "971",
//                     mobile_number: address.mobile_number || "",
//                     alt_ph_country_code: address.alt_ph_country_code || "971",
//                     alternate_phone: address.alternate_phone || "",
//                     house_no: address.house_no || "",
//                     building_name: address.building_name || "",
//                     area: address.area || "",
//                     landmark: address.landmark || "",
//                     city: address.city || "",
//                     email: address.email || "",
//                     country: address.country || "UAE",
//                   });
//                 }}
//                 onAddNew={() => {
//                   setShowAddressForm(true);
//                   setSelectedAddress(null);
//                   setSelectedType("new");
//                   setFormData({
//                     ...formData,
//                     name: "",
//                     mob_no_country_code: "971",
//                     mobile_number: "",
//                     alt_ph_country_code: "971",
//                     alternate_phone: "",
//                     house_no: "",
//                     building_name: "",
//                     area: "",
//                     landmark: "",
//                     city: "",
//                     email: "",
//                     country: "UAE",
//                   });
//                 }}
//                 selectedType={selectedType}
//                 setSelectedType={setSelectedType}
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.name && (
//                         <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                       )}
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Mobile Country Code
//                       </p>
//                       <input
//                         maxLength={4}
//                         placeholder="e.g., 971"
//                         type="text"
//                         name="mob_no_country_code"
//                         value={formData.mob_no_country_code}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.mobile_number && (
//                         <p className="text-red-500 text-sm mt-1">{errors.mobile_number}</p>
//                       )}
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Alternate Mobile Country Code
//                       </p>
//                       <input
//                         maxLength={4}
//                         placeholder="e.g., 971"
//                         type="text"
//                         name="alt_ph_country_code"
//                         value={formData.alt_ph_country_code}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Alternate Mobile Number
//                       </p>
//                       <input
//                         maxLength={12}
//                         placeholder="Enter alternate mobile number"
//                         type="tel"
//                         name="alternate_phone"
//                         value={formData.alternate_phone}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.house_no && (
//                         <p className="text-red-500 text-sm mt-1">{errors.house_no}</p>
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.building_name && (
//                         <p className="text-red-500 text-sm mt-1">{errors.building_name}</p>
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.area && (
//                         <p className="text-red-500 text-sm mt-1">{errors.area}</p>
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.landmark && (
//                         <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>
//                       )}
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         City
//                       </p>
//                       <select
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
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
//                       {errors.city && (
//                         <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Address Type
//                       </p>
//                       <select
//                         name="address_type"
//                         value={formData.address_type}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       >
//                         <option value="Normal">Normal</option>
//                         <option value="Western">Western</option>
//                       </select>
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Country
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter country"
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.country && (
//                         <p className="text-red-500 text-sm mt-1">{errors.country}</p>
//                       )}
//                     </div>
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
//                       onChange={handleChange}
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
//               <button
//                 onClick={handleSubmit}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
//               >
//                 List Now
//               </button>
//               <button
//                 onClick={() => setCaseState(1)}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ItemList;








// "use client";

// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import Link from "next/link";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux"; // Import useSelector

// const ItemList = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [conditions, setConditions] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [sizes, setSizes] = useState([]);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [selectedType, setSelectedType] = useState("existing");

//   const router = useRouter();

//   // Get userID from Redux state
//   const details = useSelector((state) => state.auth.user);
//   const userID = details?._id;

//   const fetchAddress = async () => {
//     try {
//       const token = getAuthToken();
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
//       const fetchedAddresses = response?.data?.addresses;
//       setAddresses(fetchedAddresses);
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

//   const [formData, setFormData] = useState({
//     itemName: "",
//     description: "",
//     category: "",
//     subCategory: "",
//     gender: "",
//     condition: "",
//     brand: "",
//     size: "",
//     price: "",
//     damages: "",
//     rentOption: "No",
//     rentalPrice: "",
//     images: [],
//     name: "",
//     mob_no_country_code: "971",
//     mobile_number: "",
//     alt_ph_country_code: "",
//     alternate_phone: "",
//     house_no: "",
//     building_name: "",
//     area: "",
//     landmark: "",
//     city: "",
//     address_type: "Normal",
//     email: "",
//     country: "UAE",
//     color: "",
//   });

//   const [caseState, setCaseState] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [successPopup, setSuccessPopup] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [brandsRes, categoriesRes, conditionsRes, sizesRes, colorRes] =
//           await Promise.all([
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getbrand`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/getcondition`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sizes/getSizes`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/colors/getcolor`),
//           ]);

//         setBrands(brandsRes.data.brands || []);
//         setConditions(conditionsRes.data.conditions || []);
//         setSizes(sizesRes.data.sizes || []);
//         setColors(colorRes.data || []);

//         const categoriesByGender = {};
//         categoriesRes.data.data.forEach((item) => {
//           categoriesByGender[item.parentCategory] = item.categories;
//         });
//         setCategories(categoriesByGender);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const handleFileChange = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
//       if (validImageTypes.includes(file.type)) {
//         const newImages = [...formData.images];
//         newImages[index] = file;
//         setFormData({ ...formData, images: newImages });
//         setErrors({ ...errors, images: "" });
//       } else {
//         setErrors({
//           ...errors,
//           images: "Only image files (JPEG, PNG) are allowed.",
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     if (Number(formData.price) < 1000 && formData.rentOption === "Yes") {
//       setFormData((prev) => ({
//         ...prev,
//         rentOption: "No",
//         rentalPrice: "",
//       }));
//     }
//   }, [formData.price]);

//   const removeImage = (index) => {
//     const newImages = [...formData.images];
//     newImages.splice(index, 1);
//     setFormData({ ...formData, images: newImages });
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.itemName.trim()) newErrors.itemName = "Product title is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";
//     if (!formData.category.trim()) newErrors.category = "Category is required";
//     if (!formData.gender) newErrors.gender = "Gender is required";
//     if (!formData.condition) newErrors.condition = "Condition is required";
//     if (!formData.brand) newErrors.brand = "Brand is required";
//     if (!formData.size) newErrors.size = "Size is required";
//     if (!formData.subCategory.trim()) newErrors.subCategory = "Sub Category is required";
//     if (!formData.price.trim()) newErrors.price = "Price is required";
//     if (formData.images.length < 2) newErrors.images = "At least two images are required";
//     if (formData.rentOption === "Yes" && !formData.rentalPrice) {
//       newErrors.rentalPrice = "Rental price is required when open to rent";
//     }
//     if (formData.rentOption === "Yes" && Number(formData.price) <= 500) {
//       newErrors.price = "Price must be above 500 AED for rental products";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setCaseState(2);
//     } else {
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     }
//   };

//   const uploadImage = async (imageFile) => {
//     const imageData = new FormData();
//     for (let i = 0; i < imageFile?.length; i++) {
//       imageData.append("files", imageFile[i]);
//       imageData.append("folder", "avatar");
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("No authentication token");
//       }
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/multiple`,
//         imageData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.fileUrls;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw new Error("Failed to upload image");
//     }
//   };

//   const getAuthToken = () => {
//     const token = Cookies.get("auth");
//     if (!token) return null;
//     try {
//       return JSON.parse(token);
//     } catch (error) {
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let addressErrors = {};
//     if (!selectedAddress && !showAddressForm) {
//       addressErrors.pickupAddress = "Please select an existing address or add a new one";
//     }
//     if (showAddressForm) {
//       if (!formData.name.trim()) addressErrors.name = "Name is required";
//       if (!formData.mobile_number.trim()) addressErrors.mobile_number = "Mobile number is required";
//       if (!formData.house_no.trim()) addressErrors.house_no = "House number is required";
//       if (!formData.building_name.trim()) addressErrors.building_name = "Building name is required";
//       if (!formData.area.trim()) addressErrors.area = "Area is required";
//       if (!formData.landmark.trim()) addressErrors.landmark = "Landmark is required";
//       if (!formData.city.trim()) addressErrors.city = "City is required";
//       if (!formData.email.trim()) addressErrors.email = "Email is required";
//     }

//     if (Object.keys(addressErrors).length > 0) {
//       setErrors(addressErrors);
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//       return;
//     }

//     if (validateForm()) {
//       try {
//         const token = getAuthToken();
//         if (!token) {
//           toast.error("Please login to post items");
//           return;
//         }

//         let imageUrl = null;
//         if (formData.images) {
//           imageUrl = await uploadImage(formData.images);
//         }

//         const pickupAddress = selectedAddress
//           ? selectedAddress._id
//           : {
//               name: formData.name,
//               mob_no_country_code: formData.mob_no_country_code,
//               mobile_number: formData.mobile_number,
//               alt_ph_country_code: "",
//               alternate_phone: "",
//               house_no: formData.house_no,
//               building_name: formData.building_name,
//               area: formData.area,
//               landmark: formData.landmark,
//               city: formData.city,
//               address_type: "Normal",
//               email: formData.email,
//               seller: null,
//               isDefault: false,
//               country: formData.country,
//             };

//         const productData = {
//           approval: { status: "Pending", reason: "", updatedAt: Date.now() },
//           productType: "Listing",
//           condition: formData.condition,
//           name: formData.itemName,
//           size: formData.size,
//           openToRent: formData.rentOption,
//           usage: formData.usage || "",
//           damages: formData.damages || "",
//           seller: null,
//           admin: null,
//           pickupAddress: pickupAddress,
//           pickup: null,
//           color: formData.color || null,
//           category: {
//             parentCategory: selectedGender,
//             categoryName: selectedCategory,
//             subCategoryName: selectedSubCategory,
//           },
//           brand: formData.brand,
//           description: formData.description,
//           price: Number(formData.price),
//           images: imageUrl,
//           pricePerDay: formData.rentOption === "Yes" ? Number(formData.rentalPrice) : 0,
//           pricePerHour: formData.rentOption === "Yes" ? Math.round(Number(formData.price) * 0.02) : 0,
//           deposit: formData.rentOption === "Yes" ? Math.round(Number(formData.price) * 0.2) : 0,
//           orders: [],
//           rent: [],
//           onSale: false,
//           discountPercentage: 0,
//           isTopBrand: false,
//           coupon: [],
//           likesCount: 0,
//           barcode: null,
//           shippingBarcode: null,
//           storageLocation: null,
//           commission: 0.2,
//           netEarning: null,
//         };

//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/product/add`,
//           productData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 201) {
//           toast.success("Product added successfully!");
//           setTimeout(() => {
//             // Redirect to user profile page instead of home
//             router.push(`/user_profile/${userID}`);
//           }, 2000);
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         toast.error(error.response?.data?.message || "Error adding product");
//       }
//     } else {
//       const firstError = document.querySelector(".text-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     }
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   const AddressSelection = ({ addresses, onSelect, onAddNew, selectedType, setSelectedType }) => {
//     const handleTypeChange = (type) => {
//       setSelectedType(type);
//       if (type === "new") {
//         onAddNew();
//       } else {
//         setShowAddressForm(false);
//       }
//     };

//     return (
//       <div className="space-y-6 font-karla">
//         <div className="flex gap-6 mb-6">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="addressType"
//               checked={selectedType === "existing"}
//               onChange={() => handleTypeChange("existing")}
//               className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="text-gray-700">Use Existing Address</span>
//           </label>
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="addressType"
//               checked={selectedType === "new"}
//               onChange={() => handleTypeChange("new")}
//               className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="text-gray-700">Add New Address</span>
//           </label>
//         </div>

//         {selectedType === "existing" && addresses?.length > 0 ? (
//           <div className="space-y-4">
//             {addresses.map((address) => (
//               <div
//                 key={address._id}
//                 className={`border rounded-lg p-4 cursor-pointer transition-all ${
//                   selectedAddress?._id === address._id
//                     ? "border-2 border-pink-500"
//                     : "border-gray-200 hover:border-pink-300"
//                 }`}
//                 onClick={() => onSelect(address)}
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-2">
//                     <p className="font-semibold">{address.name}</p>
//                     <p className="text-sm text-gray-600">
//                       {`${address.mob_no_country_code}${address.mobile_number}`}
//                     </p>
//                     <p className="text-sm text-gray-600">{address.email}</p>
//                     <p className="text-sm text-gray-600">
//                       {`${address.house_no}, ${address.building_name}, ${address.area}`}
//                       {address.landmark && `, ${address.landmark}`}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {address.city}, {address.country}
//                     </p>
//                   </div>
//                   <div className="mt-2">
//                     <input
//                       type="radio"
//                       checked={selectedAddress?._id === address._id}
//                       onChange={() => onSelect(address)}
//                       className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : selectedType === "existing" ? (
//           <p className="text-gray-500 italic">
//             No saved addresses found. Please add a new address.
//           </p>
//         ) : null}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-[800px] bg-white rounded-3xl shadow-md border-4 border-black mx-auto overflow-hidden mt-10">
//       {caseState === 1 ? (
//         <>
//           {successPopup && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
//                 <img
//                   src="/ChechkNotfi.png"
//                   alt="Check Notification"
//                   className="w-14 h-14 mx-auto mb-4"
//                 />
//                 <h2 className="text-lg font-semibold text-black">
//                   Your product listing request has been successfully received
//                 </h2>
//                 <p className="text-gray-500 mt-2">
//                   Post the approval from our QC team, your product will be
//                   visible to other users.
//                 </p>
//               </div>
//             </div>
//           )}

//           <div
//             className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
//             style={{
//               backgroundImage: `url('/pink-header.png')`,
//               clipPath: "ellipse(90% 100% at 50% 0%)",
//             }}
//           >
//             <button
//               className="absolute top-4 left-4 flex items-center space-x-1 px-2 py-1 text-sm text-black bg-white bg-opacity-60 hover:bg-opacity-80 rounded-md transition"
//               onClick={() => router.push("/")}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 className="w-4 h-4"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//               <span>Back</span>
//             </button>

//             <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
//               LIST YOUR ITEM
//             </div>

//             <img
//               src="/yellow-bird.png"
//               alt="Yellow Bird"
//               className="absolute top-6 right-24 w-12 h-12 hidden md:block"
//               style={{ marginTop: "53px", marginRight: "30px" }}
//             />
//             <div
//               className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
//               style={{ marginTop: "63px" }}
//             >
//               <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
//             </div>
//           </div>

//           <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
//             <form onSubmit={handleNext} className="space-y-6">
//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Images
//                 </label>
//                 <div className="flex flex-wrap gap-4 sm:gap-9">
//                   {Array(4)
//                     .fill()
//                     .map((_, idx) => (
//                       <div
//                         key={idx}
//                         className="relative w-24 h-24 border border-[#E4086F] flex items-center justify-center overflow-hidden"
//                       >
//                         <input
//                           type="file"
//                           accept="image/png, image/jpeg, image/jpg"
//                           onChange={(e) => handleFileChange(e, idx)}
//                           className="opacity-0 absolute inset-0 cursor-pointer"
//                         />
//                         {formData.images[idx] ? (
//                           <>
//                             <img
//                               src={URL.createObjectURL(formData.images[idx])}
//                               alt={`Uploaded ${idx + 1}`}
//                               className="w-full h-full object-cover rounded-lg"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(idx)}
//                               className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
//                               aria-label="Remove Image"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-4 w-4 text-red-500"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M6 18L18 6M6 6l12 12"
//                                 />
//                               </svg>
//                             </button>
//                           </>
//                         ) : (
//                           <img
//                             src="/upload.png"
//                             alt="Upload Icon"
//                             className="w-8 h-8"
//                           />
//                         )}
//                       </div>
//                     ))}
//                 </div>
//                 {errors.images && (
//                   <p className="text-red-500 mt-1">{errors.images}</p>
//                 )}
//                 <a href="/tips" className="text-[#E4086F] mt-2 underline">
//                   Read our video and photo tips
//                 </a>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Title
//                 </label>
//                 <input
//                   type="text"
//                   name="itemName"
//                   value={formData.itemName}
//                   onChange={handleChange}
//                   placeholder="Enter your product title"
//                   className={`w-full p-2 border ${
//                     errors.itemName ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                   required
//                 />
//                 {errors.itemName && (
//                   <p className="text-red-500 mt-1">{errors.itemName}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Enter your product description"
//                   className={`w-full p-2 border ${
//                     errors.description ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                   rows={4}
//                 />
//                 {errors.description && (
//                   <p className="text-red-500 mt-1">{errors.description}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Gender
//                 </label>
//                 <select
//                   name="gender"
//                   value={selectedGender}
//                   onChange={(e) => {
//                     setSelectedGender(e.target.value);
//                     setSelectedCategory("");
//                     setSelectedSubCategory("");
//                     handleChange(e);
//                   }}
//                   className={`w-full p-2 border ${
//                     errors.gender ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Gender</option>
//                   {Object.keys(categories).map((gender) => (
//                     <option key={gender} value={gender}>
//                       {gender}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Category
//                 </label>
//                 <select
//                   name="category"
//                   value={selectedCategory}
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     setSelectedSubCategory("");
//                     handleChange(e);
//                   }}
//                   disabled={!selectedGender}
//                   className={`w-full p-2 border ${
//                     errors.category ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Category</option>
//                   {selectedGender &&
//                     categories[selectedGender]?.map((category) => (
//                       <option key={category._id} value={category.categoryName}>
//                         {category.categoryName}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Sub Category
//                 </label>
//                 <select
//                   name="subCategory"
//                   value={selectedSubCategory}
//                   onChange={(e) => {
//                     setSelectedSubCategory(e.target.value);
//                     handleChange(e);
//                   }}
//                   disabled={!selectedCategory}
//                   className={`w-full p-2 border ${
//                     errors.subCategory ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Sub Category</option>
//                   {selectedGender &&
//                     selectedCategory &&
//                     categories[selectedGender]
//                       ?.find((cat) => cat.categoryName === selectedCategory)
//                       ?.subCategories.map((sub) => (
//                         <option key={sub._id} value={sub.subCategoryName}>
//                           {sub.subCategoryName}
//                         </option>
//                       ))}
//                 </select>
//                 {errors.subCategory && (
//                   <p className="text-red-500 mt-1">{errors.subCategory}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Condition
//                 </label>
//                 <select
//                   name="condition"
//                   value={formData.condition}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.condition ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Condition</option>
//                   {conditions.map((condition) => (
//                     <option key={condition._id} value={condition._id}>
//                       {condition.conditionName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Brand
//                 </label>
//                 <select
//                   name="brand"
//                   value={formData.brand}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.brand ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Select Brand</option>
//                   {brands.map((brand) => (
//                     <option key={brand._id} value={brand._id}>
//                       {brand.brandName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Size
//                 </label>
//                 <select
//                   name="size"
//                   value={formData.size}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.size ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Choose Product Size</option>
//                   {sizes.map((size) => (
//                     <option key={size._id} value={size._id}>
//                       {size.sizeName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Product Color
//                 </label>
//                 <select
//                   name="color"
//                   value={formData.color}
//                   onChange={handleChange}
//                   className={`w-full p-2 border ${
//                     errors.color ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px]`}
//                 >
//                   <option value="">Choose Product color</option>
//                   {colors.map((color) => (
//                     <option key={color._id} value={color._id}>
//                       {color.colorName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Price (AED)
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   placeholder="Enter Product Price in AED"
//                   className={`w-full p-2 border ${
//                     errors.price ? "border-red-500" : "border-[#868686]"
//                   } rounded-lg max-w-[500px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
//                   min="0"
//                   step="0.01"
//                   onKeyDown={(e) => {
//                     if (e.key === "e" || e.key === "+" || e.key === "-") {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//                 {errors.price && (
//                   <p className="text-red-500 mt-1">{errors.price}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                   Damages
//                 </label>
//                 <textarea
//                   name="damages"
//                   value={formData.damages}
//                   onChange={handleChange}
//                   placeholder="Mention Damages"
//                   className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
//                   rows={4}
//                 />
//               </div>

//               <div>
//                 {Number(formData.price) >= 1000 ? (
//                   <div className="mb-4">
//                     <label className="flex items-center text-[#151515] text-base font-bold font-karla">
//                       <input
//                         type="checkbox"
//                         name="rentOption"
//                         checked={formData.rentOption === "Yes"}
//                         onChange={(e) => {
//                           handleChange({
//                             target: {
//                               name: "rentOption",
//                               value: e.target.checked ? "Yes" : "No",
//                             },
//                           });
//                         }}
//                         className="mr-2 h-4 w-4"
//                       />
//                       Open to Rent
//                     </label>
//                     {errors.rentOption && (
//                       <p className="text-red-500 mt-1">{errors.rentOption}</p>
//                     )}
//                   </div>
//                 ) : null}

//                 {formData.rentOption === "Yes" &&
//                   Number(formData.price) >= 1000 && (
//                     <div>
//                       <label className="block text-[#151515] text-base font-bold font-karla mb-2">
//                         Rental Price
//                       </label>
//                       <input
//                         type="number"
//                         name="rentalPrice"
//                         value={formData.rentalPrice}
//                         onChange={handleChange}
//                         placeholder="Enter rental price"
//                         className={`w-full p-2 border ${
//                           errors.rentalPrice
//                             ? "border-red-500"
//                             : "border-[#868686]"
//                         } rounded-lg max-w-[500px]`}
//                       />
//                       {errors.rentalPrice && (
//                         <p className="text-red-500 mt-1">
//                           {errors.rentalPrice}
//                         </p>
//                       )}
//                     </div>
//                   )}
//               </div>

//               <p className="text-gray-500 mt-1 text-left max-w-[500px]">
//                 Renting option is available only when the price of the product
//                 is above <span className="text-[#E4086F]">1000 AED</span>
//               </p>

//               <div className="flex space-x-8 mt-6 justify-center">
//                 <button
//                   type="submit"
//                   className="px-8 py-3 bg-[#E4086F] text-yellow-400 text-lg font-semibold hover:bg-[#d4076e] transition-colors"
//                   style={{ borderRadius: "22px" }}
//                 >
//                   Next
//                 </button>

//                 <button
//                   onClick={handleBack}
//                   type="button"
//                   className="px-8 py-3 border border-[#E4086F] text-[#E4086F] text-lg font-semibold hover:bg-[#fce4f4] transition-colors"
//                   style={{ borderRadius: "22px" }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </>
//       ) : (
//         <>
//           <div
//             className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
//             style={{
//               backgroundImage: `url('/pink-header.png')`,
//               clipPath: "ellipse(90% 100% at 50% 0%)",
//             }}
//           >
//             <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
//               PICKUP ADDRESS
//             </div>

//             <img
//               src="/yellow-bird.png"
//               alt="Yellow Bird"
//               className="absolute top-6 right-24 w-12 h-12 hidden md:block"
//               style={{ marginTop: "53px", marginRight: "30px" }}
//             />
//             <div
//               className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
//               style={{ marginTop: "63px" }}
//             >
//               <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
//             </div>
//           </div>

//           <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//               <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
//                 Pickup Details
//               </p>
//               <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
//                 Step 2 of 2
//               </p>
//             </div>
//             <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla">
//               Please enter your pickup details
//             </p>
//             <div className="space-y-4">
//               <AddressSelection
//                 addresses={addresses}
//                 onSelect={(address) => {
//                   setSelectedAddress(address);
//                   setShowAddressForm(false);
//                   setSelectedType("existing");
//                   setFormData({
//                     ...formData,
//                     name: address.name || "",
//                     mob_no_country_code: address.mob_no_country_code || "971",
//                     mobile_number: address.mobile_number || "",
//                     alt_ph_country_code: "",
//                     alternate_phone: "",
//                     house_no: address.house_no || "",
//                     building_name: address.building_name || "",
//                     area: address.area || "",
//                     landmark: address.landmark || "",
//                     city: address.city || "",
//                     email: address.email || "",
//                     country: address.country || "UAE",
//                   });
//                 }}
//                 onAddNew={() => {
//                   setShowAddressForm(true);
//                   setSelectedAddress(null);
//                   setSelectedType("new");
//                   setFormData({
//                     ...formData,
//                     name: "",
//                     mob_no_country_code: "971",
//                     mobile_number: "",
//                     alt_ph_country_code: "",
//                     alternate_phone: "",
//                     house_no: "",
//                     building_name: "",
//                     area: "",
//                     landmark: "",
//                     city: "",
//                     email: "",
//                     country: "UAE",
//                   });
//                 }}
//                 selectedType={selectedType}
//                 setSelectedType={setSelectedType}
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.name && (
//                         <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                       )}
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Mobile Country Code
//                       </p>
//                       <input
//                         maxLength={4}
//                         value="971"
//                         disabled
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.mobile_number && (
//                         <p className="text-red-500 text-sm mt-1">{errors.mobile_number}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.house_no && (
//                         <p className="text-red-500 text-sm mt-1">{errors.house_no}</p>
//                       )}
//                     </div>

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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.building_name && (
//                         <p className="text-red-500 text-sm mt-1">{errors.building_name}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.area && (
//                         <p className="text-red-500 text-sm mt-1">{errors.area}</p>
//                       )}
//                     </div>

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
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.landmark && (
//                         <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap sm:flex-nowrap gap-6">
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         City
//                       </p>
//                       <select
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
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
//                       {errors.city && (
//                         <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                       )}
//                     </div>

//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
//                         Country
//                       </p>
//                       <input
//                         maxLength={25}
//                         placeholder="Enter country"
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                       />
//                       {errors.country && (
//                         <p className="text-red-500 text-sm mt-1">{errors.country}</p>
//                       )}
//                     </div>
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
//                       onChange={handleChange}
//                       className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
//               <button
//                 onClick={handleSubmit}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
//               >
//                 List Now
//               </button>
//               <button
//                 onClick={() => setCaseState(1)}
//                 className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ItemList;







"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ItemList = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedType, setSelectedType] = useState("existing");
  const [customBrand, setCustomBrand] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const details = useSelector((state) => state.auth.user);
  const userID = details?._id;

  const fetchAddress = async () => {
    try {
      const token = getAuthToken();
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
      const fetchedAddresses = response?.data?.addresses;
      setAddresses(fetchedAddresses);
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

  useEffect(() => {
    fetchAddress();
  }, []);

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    subCategory: "",
    gender: "",
    condition: "",
    brand: "",
    size: "",
    price: "",
    damages: "",
    rentOption: "No",
    rentalPrice: "",
    images: [],
    name: "",
    mob_no_country_code: "971",
    mobile_number: "",
    alt_ph_country_code: "",
    alternate_phone: "",
    house_no: "",
    building_name: "",
    area: "",
    landmark: "",
    city: "",
    address_type: "Normal",
    email: "",
    country: "UAE",
    color: "",
  });

  const [caseState, setCaseState] = useState(1);
  const [errors, setErrors] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, categoriesRes, conditionsRes, sizesRes, colorRes] =
          await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getbrand`),
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`),
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/getcondition`),
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sizes/getSizes`),
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/colors/getcolor`),
          ]);

        setBrands(brandsRes.data.brands || []);
        setConditions(conditionsRes.data.conditions || []);
        setSizes(sizesRes.data.sizes || []);
        setColors(colorRes.data || []);

        const categoriesByGender = {};
        categoriesRes.data.data.forEach((item) => {
          categoriesByGender[item.parentCategory] = item.categories;
        });
        setCategories(categoriesByGender);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    if (name === "brand" && value !== "Other") {
      setCustomBrand("");
    }
    if (name === "color" && value !== "Other") {
      setCustomColor("");
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (validImageTypes.includes(file.type)) {
        const newImages = [...formData.images];
        newImages[index] = file;
        setFormData({ ...formData, images: newImages });
        setErrors({ ...errors, images: "" });
      } else {
        setErrors({
          ...errors,
          images: "Only image files (JPEG, PNG) are allowed.",
        });
      }
    }
  };

  useEffect(() => {
    if (Number(formData.price) < 1000 && formData.rentOption === "Yes") {
      setFormData((prev) => ({
        ...prev,
        rentOption: "No",
        rentalPrice: "",
      }));
    }
  }, [formData.price]);

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.itemName.trim()) newErrors.itemName = "Product title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (formData.brand === "Other" && !customBrand.trim()) {
      newErrors.customBrand = "Custom brand name is required";
    }
    if (!formData.size) newErrors.size = "Size is required";
    if (!formData.subCategory.trim()) newErrors.subCategory = "Sub Category is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (formData.color === "Other" && !customColor.trim()) {
      newErrors.customColor = "Custom color name is required";
    }
    if (formData.images.length < 2) newErrors.images = "At least two images are required";
    if (formData.rentOption === "Yes" && !formData.rentalPrice) {
      newErrors.rentalPrice = "Rental price is required when open to rent";
    }
    if (formData.rentOption === "Yes" && Number(formData.price) <= 500) {
      newErrors.price = "Price must be above 500 AED for rental products";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCaseState(2);
    } else {
      const firstError = document.querySelector(".text-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const uploadImage = async (imageFile) => {
    const imageData = new FormData();
    for (let i = 0; i < imageFile?.length; i++) {
      imageData.append("files", imageFile[i]);
      imageData.append("folder", "avatar");
    }

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token");
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/multiple`,
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.fileUrls;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const getAuthToken = () => {
    const token = Cookies.get("auth");
    if (!token) return null;
    try {
      return JSON.parse(token);
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      toast.error("Submission in progress, please wait...");
      return;
    }

    let addressErrors = {};
    if (!selectedAddress && !showAddressForm) {
      addressErrors.pickupAddress = "Please select an existing address or add a new one";
    }
    if (showAddressForm) {
      if (!formData.name.trim()) addressErrors.name = "Name is required";
      if (!formData.mobile_number.trim()) addressErrors.mobile_number = "Mobile number is required";
      if (!formData.house_no.trim()) addressErrors.house_no = "House number is required";
      if (!formData.building_name.trim()) addressErrors.building_name = "Building name is required";
      if (!formData.area.trim()) addressErrors.area = "Area is required";
      if (!formData.landmark.trim()) addressErrors.landmark = "Landmark is required";
      if (!formData.city.trim()) addressErrors.city = "City is required";
      if (!formData.email.trim()) addressErrors.email = "Email is required";
    }

    if (Object.keys(addressErrors).length > 0) {
      setErrors(addressErrors);
      const firstError = document.querySelector(".text-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const token = getAuthToken();
        if (!token) {
          toast.error("Please login to post items");
          setIsSubmitting(false);
          return;
        }

        let imageUrl = null;
        if (formData.images) {
          imageUrl = await uploadImage(formData.images);
        }

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
              address_type: "Normal",
              email: formData.email,
              seller: null,
              isDefault: false,
              country: formData.country,
            };

        const productData = {
          approval: { status: "Pending", reason: "", updatedAt: Date.now() },
          productType: "Listing",
          condition: formData.condition,
          name: formData.itemName,
          size: formData.size,
          openToRent: formData.rentOption,
          usage: formData.usage || "",
          damages: formData.damages || "",
          seller: null,
          admin: null,
          pickupAddress: pickupAddress,
          pickup: null,
          color: formData.color === "Other" ? customColor : formData.color,
          category: {
            parentCategory: selectedGender,
            categoryName: selectedCategory,
            subCategoryName: selectedSubCategory,
          },
          brand: formData.brand === "Other" ? customBrand : formData.brand,
          description: formData.description,
          price: Number(formData.price),
          images: imageUrl,
          pricePerDay: formData.rentOption === "Yes" ? Number(formData.rentalPrice) : 0,
          pricePerHour: formData.rentOption === "Yes" ? Math.round(Number(formData.price) * 0.02) : 0,
          deposit: formData.rentOption === "Yes" ? Math.round(Number(formData.price) * 0.2) : 0,
          orders: [],
          rent: [],
          onSale: false,
          discountPercentage: 0,
          isTopBrand: false,
          coupon: [],
          likesCount: 0,
          barcode: null,
          shippingBarcode: null,
          storageLocation: null,
          commission: 0.2,
          netEarning: null,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/product/add`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("Product added successfully!");
          setSuccessPopup(true);
          setTimeout(() => {
            router.push(`/user_profile/${userID}`);
          }, 2000);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(error.response?.data?.message || "Error adding product");
        setIsSubmitting(false);
      }
    } else {
      const firstError = document.querySelector(".text-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  const AddressSelection = ({ addresses, onSelect, onAddNew, selectedType, setSelectedType }) => {
    const handleTypeChange = (type) => {
      setSelectedType(type);
      if (type === "new") {
        onAddNew();
      } else {
        setShowAddressForm(false);
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
                      {`${address.mob_no_country_code}${address.mobile_number}`}
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
                      disabled={isSubmitting}
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

  return (
    <div className="max-w-[800px] bg-white rounded-3xl shadow-md border-4 border-black mx-auto overflow-hidden mt-10">
      {caseState === 1 ? (
        <>
          {successPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
                <img
                  src="/ChechkNotfi.png"
                  alt="Check Notification"
                  className="w-14 h-14 mx-auto mb-4"
                />
                <h2 className="text-lg font-semibold text-black">
                  Your product listing request has been successfully received
                </h2>
                <p className="text-gray-500 mt-2">
                  Post the approval from our QC team, your product will be
                  visible to other users.
                </p>
              </div>
            </div>
          )}

          <div
            className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
            style={{
              backgroundImage: `url('/pink-header.png')`,
              clipPath: "ellipse(90% 100% at 50% 0%)",
            }}
          >
            <button
              className="absolute top-4 left-4 flex items-center space-x-1 px-2 py-1 text-sm text-black bg-white bg-opacity-60 hover:bg-opacity-80 rounded-md transition"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back</span>
            </button>

            <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
              LIST YOUR ITEM
            </div>

            <img
              src="/yellow-bird.png"
              alt="Yellow Bird"
              className="absolute top-6 right-24 w-12 h-12 hidden md:block"
              style={{ marginTop: "53px", marginRight: "30px" }}
            />
            <div
              className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
              style={{ marginTop: "63px" }}
            >
              <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
            </div>
          </div>

          <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
            <form onSubmit={handleNext} className="space-y-6">
              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Product Images
                </label>
                <div className="flex flex-wrap gap-4 sm:gap-9">
                  {Array(4)
                    .fill()
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="relative w-24 h-24 border border-[#E4086F] flex items-center justify-center overflow-hidden"
                      >
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(e) => handleFileChange(e, idx)}
                          className="opacity-0 absolute inset-0 cursor-pointer"
                          disabled={isSubmitting}
                        />
                        {formData.images[idx] ? (
                          <>
                            <img
                              src={URL.createObjectURL(formData.images[idx])}
                              alt={`Uploaded ${idx + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
                              aria-label="Remove Image"
                              disabled={isSubmitting}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <img
                            src="/upload.png"
                            alt="Upload Icon"
                            className="w-8 h-8"
                          />
                        )}
                      </div>
                    ))}
                </div>
                {errors.images && (
                  <p className="text-red-500 mt-1">{errors.images}</p>
                )}
                <a href="/tips" className="text-[#E4086F] mt-2 underline">
                  Read our video and photo tips
                </a>
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="Enter your product title"
                  className={`w-full p-2 border ${
                    errors.itemName ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px]`}
                  required
                  disabled={isSubmitting}
                />
                {errors.itemName && (
                  <p className="text-red-500 mt-1">{errors.itemName}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Product Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter your product description"
                  className={`w-full p-2 border ${
                    errors.description ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px]`}
                  rows={4}
                  disabled={isSubmitting}
                />
                {errors.description && (
                  <p className="text-red-500 mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={selectedGender}
                  onChange={(e) => {
                    setSelectedGender(e.target.value);
                    setSelectedCategory("");
                    setSelectedSubCategory("");
                    handleChange(e);
                  }}
                  className={`w-full p-2 border ${
                    errors.gender ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px]`}
                  disabled={isSubmitting}
                >
                  <option value="">Select Gender</option>
                  {Object.keys(categories).map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="text-red-500 mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Product Category
                </label>
                <select
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubCategory("");
                    handleChange(e);
                  }}
                  disabled={!selectedGender || isSubmitting}
                  className={`w-full p-2 border ${
                    errors.category ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px]`}
                >
                  <option value="">Select Category</option>
                  {selectedGender &&
                    categories[selectedGender]?.map((category) => (
                      <option key={category._id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Product Sub Category
                </label>
                <select
                  name="subCategory"
                  value={selectedSubCategory}
                  onChange={(e) => {
                    setSelectedSubCategory(e.target.value);
                    handleChange(e);
                  }}
                  disabled={!selectedCategory || isSubmitting}
                  className={`w-full p-2 border ${
                    errors.subCategory ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px]`}
                >
                  <option value="">Select Sub Category</option>
                  {selectedGender &&
                    selectedCategory &&
                    categories[selectedGender]
                      ?.find((cat) => cat.categoryName === selectedCategory)
                      ?.subCategories.map((sub) => (
                        <option key={sub._id} value={sub.subCategoryName}>
                          {sub.subCategoryName}
                        </option>
                      ))}
                </select>
                {errors.subCategory && (
                  <p className="text-red-500 mt-1">{errors.subCategory}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.condition ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px]`}
                  disabled={isSubmitting}
                >
                  <option value="">Select Condition</option>
                  {conditions.map((condition) => (
                    <option key={condition._id} value={condition._id}>
                      {condition.conditionName}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="text-red-500 mt-1">{errors.condition}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Product Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.brand ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px]`}
                  disabled={isSubmitting}
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                {formData.brand === "Other" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={customBrand}
                      onChange={(e) => {
                        setCustomBrand(e.target.value);
                        setErrors({ ...errors, customBrand: "" });
                      }}
                      placeholder="Enter custom brand name"
                      className={`w-full p-2 border ${
                        errors.customBrand ? "border-red-500" : "border-[#868686]"
                      } rounded-lg max-w-[500px]`}
                      disabled={isSubmitting}
                    />
                    {errors.customBrand && (
                      <p className="text-red-500 mt-1">{errors.customBrand}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Product Size
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.size ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px]`}
                  disabled={isSubmitting}
                >
                  <option value="">Choose Product Size</option>
                  {sizes.map((size) => (
                    <option key={size._id} value={size._id}>
                      {size.sizeName}
                    </option>
                  ))}
                </select>
                {errors.size && (
                  <p className="text-red-500 mt-1">{errors.size}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Product Color
                </label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.color ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px]`}
                  disabled={isSubmitting}
                >
                  <option value="">Choose Product color</option>
                  {colors.map((color) => (
                    <option key={color._id} value={color._id}>
                      {color.colorName}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                {formData.color === "Other" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        setErrors({ ...errors, customColor: "" });
                      }}
                      placeholder="Enter custom color name"
                      className={`w-full p-2 border ${
                        errors.customColor ? "border-red-500" : "border-[#868686]"
                      } rounded-lg max-w-[500px]`}
                      disabled={isSubmitting}
                    />
                    {errors.customColor && (
                      <p className="text-red-500 mt-1">{errors.customColor}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Price (AED)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter Product Price in AED"
                  className={`w-full p-2 border ${
                    errors.price ? "border-red-500" : "border-[#868686]"
                  } rounded-lg max-w-[500px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  min="0"
                  step="0.01"
                  onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "+" || e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                  disabled={isSubmitting}
                />
                {errors.price && (
                  <p className="text-red-500 mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                  Damages
                </label>
                <textarea
                  name="damages"
                  value={formData.damages}
                  onChange={handleChange}
                  placeholder="Mention Damages"
                  className="w-full p-2 border border-[#868686] rounded-lg max-w-[500px]"
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                {Number(formData.price) >= 1000 ? (
                  <div className="mb-4">
                    <label className="flex items-center text-[#151515] text-base font-bold font-karla">
                      <input
                        type="checkbox"
                        name="rentOption"
                        checked={formData.rentOption === "Yes"}
                        onChange={(e) => {
                          handleChange({
                            target: {
                              name: "rentOption",
                              value: e.target.checked ? "Yes" : "No",
                            },
                          });
                        }}
                        className="mr-2 h-4 w-4"
                        disabled={isSubmitting}
                      />
                      Open to Rent
                    </label>
                    {errors.rentOption && (
                      <p className="text-red-500 mt-1">{errors.rentOption}</p>
                    )}
                  </div>
                ) : null}

                {formData.rentOption === "Yes" && Number(formData.price) >= 1000 && (
                  <div>
                    <label className="block text-[#151515] text-base font-bold font-karla mb-2">
                      Rental Price
                    </label>
                    <input
                      type="number"
                      name="rentalPrice"
                      value={formData.rentalPrice}
                      onChange={handleChange}
                      placeholder="Enter rental price"
                      className={`w-full p-2 border ${
                        errors.rentalPrice ? "border-red-500" : "border-[#868686]"
                      } rounded-lg max-w-[500px]`}
                      disabled={isSubmitting}
                    />
                    {errors.rentalPrice && (
                      <p className="text-red-500 mt-1">{errors.rentalPrice}</p>
                    )}
                  </div>
                )}
              </div>

              <p className="text-gray-500 mt-1 text-left max-w-[500px]">
                Renting option is available only when the price of the product is
                above <span className="text-[#E4086F]">1000 AED</span>
              </p>

              <div className="flex space-x-8 mt-6 justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#E4086F] text-yellow-400 text-lg font-semibold hover:bg-[#d4076e] transition-colors"
                  style={{ borderRadius: "22px" }}
                  disabled={isSubmitting}
                >
                  Next
                </button>

                <button
                  onClick={handleBack}
                  type="button"
                  className="px-8 py-3 border border-[#E4086F] text-[#E4086F] text-lg font-semibold hover:bg-[#fce4f4] transition-colors"
                  style={{ borderRadius: "22px" }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div
            className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-start pl-6"
            style={{
              backgroundImage: `url('/pink-header.png')`,
              clipPath: "ellipse(90% 100% at 50% 0%)",
            }}
          >
            <div className="text-[#e6e6e6] text-[32px] sm:text-[46px] font-luckiest leading-[38px] sm:leading-[55.20px]">
              PICKUP ADDRESS
            </div>

            <img
              src="/yellow-bird.png"
              alt="Yellow Bird"
              className="absolute top-6 right-24 w-12 h-12 hidden md:block"
              style={{ marginTop: "53px", marginRight: "30px" }}
            />
            <div
              className="absolute top-5 right-6 w-12 h-12 rounded-full border-2 border-black border-dotted flex items-center justify-center p-[2px] hidden md:flex"
              style={{ marginTop: "63px" }}
            >
              <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-black"></div>
            </div>
          </div>

          <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
                Pickup Details
              </p>
              <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
                Step 2 of 2
              </p>
            </div>
            <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla">
              Please enter your pickup details
            </p>
            <div className="space-y-4">
              <AddressSelection
                addresses={addresses}
                onSelect={(address) => {
                  setSelectedAddress(address);
                  setShowAddressForm(false);
                  setSelectedType("existing");
                  setFormData({
                    ...formData,
                    name: address.name || "",
                    mob_no_country_code: address.mob_no_country_code || "971",
                    mobile_number: address.mobile_number || "",
                    alt_ph_country_code: "",
                    alternate_phone: "",
                    house_no: address.house_no || "",
                    building_name: address.building_name || "",
                    area: address.area || "",
                    landmark: address.landmark || "",
                    city: address.city || "",
                    email: address.email || "",
                    country: address.country || "UAE",
                  });
                }}
                onAddNew={() => {
                  setShowAddressForm(true);
                  setSelectedAddress(null);
                  setSelectedType("new");
                  setFormData({
                    ...formData,
                    name: "",
                    mob_no_country_code: "971",
                    mobile_number: "",
                    alt_ph_country_code: "",
                    alternate_phone: "",
                    house_no: "",
                    building_name: "",
                    area: "",
                    landmark: "",
                    city: "",
                    email: "",
                    country: "UAE",
                  });
                }}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
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
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        Mobile Country Code
                      </p>
                      <input
                        maxLength={4}
                        value="971"
                        disabled
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
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                        disabled={isSubmitting}
                      />
                      {errors.mobile_number && (
                        <p className="text-red-500 text-sm mt-1">{errors.mobile_number}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
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
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                        disabled={isSubmitting}
                      />
                      {errors.house_no && (
                        <p className="text-red-500 text-sm mt-1">{errors.house_no}</p>
                      )}
                    </div>

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
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                        disabled={isSubmitting}
                      />
                      {errors.building_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.building_name}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
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
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                        disabled={isSubmitting}
                      />
                      {errors.area && (
                        <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                      )}
                    </div>

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
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                        disabled={isSubmitting}
                      />
                      {errors.landmark && (
                        <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        City
                      </p>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                        disabled={isSubmitting}
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
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                        Country
                      </p>
                      <input
                        maxLength={25}
                        placeholder="Enter country"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                        disabled={isSubmitting}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                      )}
                    </div>
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
                      onChange={handleChange}
                      className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla transition-opacity duration-200 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#d4076e]"
                }`}
              >
                {isSubmitting ? "Listing..." : "List Now"}
              </button>
              <button
                onClick={() => setCaseState(1)}
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla transition-colors duration-200 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#fce4f4]"
                }`}
              >
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemList;
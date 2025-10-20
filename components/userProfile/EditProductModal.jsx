// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import { X } from "lucide-react";

// const EditProductModal = ({ isOpen, product, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     images: ["https://via.placeholder.com/400"],
//     price: "",
//     description: "",
//     condition: "",
//     size: "",
//     color: "",
//     openToRent: "No",
//     pricePerDay: "",
//     pricePerHour: "",
//     deposit: "",
//     damages: "",
//     category: "",
//     brand: "",
//     productType: "Listing",
//     pickupAddress: {
//       _id: "",
//       name: "",
//       mob_no_country_code: "971",
//       mobile_number: "",
//       alt_ph_country_code: "971",
//       alternate_phone: "",
//       house_no: "",
//       building_name: "",
//       area: "",
//       landmark: "",
//       city: "",
//       address_type: "Normal",
//       email: "",
//       country: "UAE",
//     },
//     onSale: false,
//     discountPercentage: 0,
//     isTopBrand: false,
//     coupon: [],
//     approval: { status: "Pending", reason: "" },
//   });
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [conditions, setConditions] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
//   const [uploadingImages, setUploadingImages] = useState(false);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;

//   const cityOptions = [
//     "Abu Dhabi",
//     "Ajman",
//     "Al-Ain",
//     "Dubai",
//     "Fujairah",
//     "Ras Al Khaimah",
//     "Sharjah",
//     "Umm Al-Quwain",
//   ];

//   useEffect(() => {
//     const fetchReferenceData = async () => {
//       try {
//         const [brandsRes, categoriesRes, conditionsRes, sizesRes, colorsRes] =
//           await Promise.all([
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getbrand`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/getcondition`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sizes/getSizes`),
//             axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/colors/getcolor`),
//           ]);

//         const Categories = categoriesRes.data.data.reduce((acc, category) => {
//           if (!acc[category.parentCategory]) {
//             acc[category.parentCategory] = [];
//           }
//           acc[category.parentCategory].push(category);
//           return acc;
//         }, {});
//         setCategories(Categories);
//         setBrands(brandsRes.data.brands || []);
//         setConditions(conditionsRes.data.conditions || []);
//         setSizes(sizesRes.data.sizes || []);
//         setColors(colorsRes.data || []);
//       } catch (error) {
//         console.error("Error fetching reference data:", error);
//         toast.error("Failed to load reference data");
//       }
//     };
//     fetchReferenceData();
//   }, []);

//   useEffect(() => {
//     if (product && categories) {
//       const categoryObj = product.category;
//       const genderName = categoryObj?.parentCategory || "";
//       const categoryName = categoryObj?.categoryName || "";
//       const subCategoryName = categoryObj?.subCategoryName || "";

//       setSelectedGender(genderName);
//       setTimeout(() => {
//         if (genderName && categories[genderName]) {
//           for (const catGroup of categories[genderName]) {
//             if (!catGroup.categories) continue;
//             const foundCategory = catGroup.categories.find(
//               (cat) => cat.categoryName === categoryName
//             );
//             if (foundCategory) {
//               setSelectedCategory(foundCategory._id);
//               if (subCategoryName && foundCategory.subCategories) {
//                 const foundSubCategory = foundCategory.subCategories.find(
//                   (sub) => sub.subCategoryName === subCategoryName
//                 );
//                 if (foundSubCategory) {
//                   setTimeout(() => {
//                     setSelectedSubCategory(foundSubCategory._id);
//                   }, 100);
//                 }
//               }
//               break;
//             }
//           }
//         }
//       }, 100);

//       setFormData({
//         name: product.name || "",
//         images: product.images || ["https://via.placeholder.com/400"],
//         price: product.price || "",
//         description: product.description || "",
//         condition: product.condition?._id || "",
//         size: product.size?._id || "",
//         color: product.color?._id || "",
//         openToRent: product.openToRent || "No",
//         pricePerDay: product.pricePerDay || "",
//         pricePerHour: product.pricePerHour || "",
//         deposit: product.deposit || "",
//         damages: product.damages || "",
//         category: categoryName,
//         brand: product.brand?._id || "",
//         productType: product.productType || "Listing",
//         pickupAddress: {
//           _id: product.pickupAddress?._id || "",
//           name: product.pickupAddress?.name || "",
//           mob_no_country_code: product.pickupAddress?.mob_no_country_code || "971",
//           mobile_number: product.pickupAddress?.mobile_number || "",
//           alt_ph_country_code: product.pickupAddress?.alt_ph_country_code || "971",
//           alternate_phone: product.pickupAddress?.alternate_phone || "",
//           house_no: product.pickupAddress?.house_no || "",
//           building_name: product.pickupAddress?.building_name || "",
//           area: product.pickupAddress?.area || "",
//           landmark: product.pickupAddress?.landmark || "",
//           city: product.pickupAddress?.city || "",
//           address_type: product.pickupAddress?.address_type || "Normal",
//           email: product.pickupAddress?.email || "",
//           country: product.pickupAddress?.country || "UAE",
//         },
//         onSale: product.onSale || false,
//         discountPercentage: product.discountPercentage || 0,
//         isTopBrand: product.isTopBrand || false,
//         coupon: product.coupon || [],
//         approval: product.approval ? { ...product.approval } : { status: "Pending", reason: "" },
//       });
//       setUploadedImageUrls(product.images || []);
//     }
//   }, [product, categories]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes("pickupAddress.")) {
//       const field = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         pickupAddress: {
//           ...prev.pickupAddress,
//           [field]: field === "mobile_number" || field === "alternate_phone"
//             ? value.replace(/[^0-9]/g, "").slice(0, 9)
//             : value,
//           ...(field === "mobile_number" && { mob_no_country_code: "971" }),
//           ...(field === "alternate_phone" && { alt_ph_country_code: "971" }),
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleOpenToRentChange = (e) => {
//     const value = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       openToRent: value,
//       ...(value === "No" && {
//         pricePerDay: "",
//         pricePerHour: "",
//         deposit: "",
//         pickupAddress: {
//           ...prev.pickupAddress,
//           name: "",
//           mobile_number: "",
//           alternate_phone: "",
//           house_no: "",
//           building_name: "",
//           area: "",
//           landmark: "",
//           city: "",
//           address_type: "Normal",
//           email: "",
//           country: "UAE",
//         },
//       }),
//     }));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setSelectedCategory(catId);
//     setSelectedSubCategory("");
//     let categoryName = "";
//     if (selectedGender && categories && categories[selectedGender]) {
//       for (const catObj of categories[selectedGender]) {
//         if (!catObj.categories) continue;
//         const foundCategory = catObj.categories.find((cat) => cat._id === catId);
//         if (foundCategory) {
//           categoryName = foundCategory.categoryName;
//           break;
//         }
//       }
//     }
//     setFormData((prev) => ({
//       ...prev,
//       category: categoryName,
//     }));
//   };

//   const handleSubCategoryChange = (e) => {
//     setSelectedSubCategory(e.target.value);
//   };

//   const handleImageSelect = async (event) => {
//     const files = Array.from(event.target.files);
    
//     const totalImages = uploadedImageUrls.length + files.length;
    
//     if (totalImages > 4) {
//       toast.error("Maximum 4 images allowed!");
//       return;
//     }

//     if (files.length === 0) return;

//     setUploadingImages(true);
    
//     try {
//       const uploadPromises = files.map(async (file) => {
//         const formData = new FormData();
//         formData.append("file", file);
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/single`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         if (response.status === 200 || response.status === 201) {
//           return response.data.fileUrl;
//         } else {
//           throw new Error(`Upload failed with status ${response.status}`);
//         }
//       });
      
//       const newImageUrls = await Promise.all(uploadPromises);
      
//       setUploadedImageUrls((prev) => [...prev, ...newImageUrls]);
      
//       toast.success(`${newImageUrls.length} image(s) uploaded successfully!`);
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       toast.error("Failed to upload images. Please try again.");
//     } finally {
//       setUploadingImages(false);
//       event.target.value = "";
//     }
//   };

//   const handleRemoveImage = (indexToRemove) => {
//     setUploadedImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
//     toast.success("Image removed");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) {
//       toast.error("Please login to edit.");
//       return;
//     }

//     const requiredFields = ["name", "price", "condition", "size", "category", "brand"];
//     if (formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") {
//       requiredFields.push(
//         "pickupAddress.name",
//         "pickupAddress.mobile_number",
//         "pickupAddress.house_no",
//         "pickupAddress.building_name",
//         "pickupAddress.area",
//         "pickupAddress.city",
//         "pickupAddress.address_type"
//       );
//       if (formData.openToRent === "Yes") {
//         requiredFields.push("pricePerDay", "pricePerHour", "deposit");
//       }
//     }

//     if (formData.openToRent === "Yes" && Number(formData.price) <= 1000) {
//       setError("Price must be above 1000 AED for rental products");
//       return;
//     }

//     const missingFields = requiredFields.filter((field) => {
//       if (field.includes(".")) {
//         const [parent, child] = field.split(".");
//         return !formData[parent]?.[child];
//       }
//       return !formData[field];
//     });

//     if (missingFields.length > 0) {
//       setError(`Required fields missing: ${missingFields.join(", ")}`);
//       return;
//     }

//     if (uploadedImageUrls.length < 2) {
//       setError("Please upload at least 2 images");
//       return;
//     }

//     if (uploadedImageUrls.length > 4) {
//       setError("Maximum 4 images allowed");
//       return;
//     }

//     if ((formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") &&
//         !cityOptions.includes(formData.pickupAddress.city)) {
//       setError("Please select a valid city from the list");
//       return;
//     }

//     setError("");

//     let categoryData = {};
//     if (selectedGender && selectedCategory && categories && categories[selectedGender]) {
//       const selectedCategoryData = categories[selectedGender].flatMap((catObj) => catObj.categories || []).find((cat) => cat._id === selectedCategory);
//       if (selectedCategoryData) {
//         const selectedSubCategoryData = selectedSubCategory
//           ? selectedCategoryData.subCategories.find((sub) => sub._id === selectedSubCategory)
//           : null;
//         categoryData = {
//           parentCategory: selectedGender,
//           categoryName: selectedCategoryData.categoryName,
//           subCategoryName: selectedSubCategoryData ? selectedSubCategoryData.subCategoryName : "",
//         };
//       } else {
//         setError("Invalid category selected");
//         return;
//       }
//     } else {
//       setError("Please select gender and category");
//       return;
//     }

//     let pickupAddressId = formData.pickupAddress._id;
//     if (formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") {
//       if (!pickupAddressId) {
//         setError("Pickup address ID is missing");
//         return;
//       }
//       const pickupAddressData = {
//         name: formData.pickupAddress.name,
//         mob_no_country_code: formData.pickupAddress.mob_no_country_code,
//         mobile_number: formData.pickupAddress.mobile_number,
//         alt_ph_country_code: formData.pickupAddress.alternate_phone ? formData.pickupAddress.alt_ph_country_code : undefined,
//         alternate_phone: formData.pickupAddress.alternate_phone || undefined,
//         house_no: formData.pickupAddress.house_no,
//         building_name: formData.pickupAddress.building_name,
//         area: formData.pickupAddress.area,
//         landmark: formData.pickupAddress.landmark || undefined,
//         city: formData.pickupAddress.city,
//         address_type: formData.pickupAddress.address_type,
//         email: formData.pickupAddress.email || undefined,
//         country: formData.pickupAddress.country,
//         seller: product.seller,
//       };

//       try {
//         const response = await axios.patch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/pickupAddress/${pickupAddressId}`,
//           pickupAddressData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         pickupAddressId = response.data.address._id;
//       } catch (error) {
//         console.error("Error updating pickup address:", error);
//         toast.error(error.response?.data?.message || "Failed to update pickup address");
//         setLoading(false);
//         return;
//       }
//     }

//     const productData = {
//       name: formData.name,
//       images: uploadedImageUrls,
//       price: Number(formData.price),
//       description: formData.description,
//       condition: formData.condition,
//       brand: formData.brand,
//       color: formData.color || null,
//       category: categoryData,
//       size: formData.size,
//       openToRent: formData.openToRent,
//       pricePerDay: formData.openToRent === "Yes" ? Number(formData.pricePerDay) : undefined,
//       pricePerHour: formData.openToRent === "Yes" ? Number(formData.pricePerHour) : undefined,
//       deposit: formData.openToRent === "Yes" ? Number(formData.deposit) : undefined,
//       damages: formData.damages,
//       productType: formData.productType,
//       pickupAddress: pickupAddressId || undefined,
//       onSale: formData.onSale,
//       discountPercentage: Number(formData.discountPercentage) || 0,
//       isTopBrand: formData.isTopBrand,
//       coupon: formData.coupon.length > 0 ? formData.coupon : undefined,
//       approval: { ...formData.approval },
//     };

//     setLoading(true);
//     try {
//       const response = await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${product._id}`,
//         productData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         onSave(response.data.product);
//         onClose();
//       } else {
//         toast.error("Failed to update product.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error updating product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   const genderOptions = Object.keys(categories || {});
//   const categoryOptions = selectedGender && categories && categories[selectedGender]
//     ? categories[selectedGender].flatMap((catObj) => (catObj.categories ? catObj.categories : []))
//     : [];
//   const subCategoryOptions = selectedCategory && categories && categories[selectedGender]
//     ? categories[selectedGender]
//         .flatMap((catObj) => catObj.categories || [])
//         .find((cat) => cat._id === selectedCategory)?.subCategories || []
//     : [];

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium text-gray-900">Edit Product</h3>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-500"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             {error && (
//               <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
//                 {error}
//               </div>
//             )}
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Name*
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Price* (AED)
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.price}
//                       onChange={handleChange}
//                       required
//                       min="0"
//                     />
//                     {formData.price && Number(formData.price) <= 1000 && (
//                       <p className="mt-1 text-sm text-gray-500">
//                         Products must be priced above 1000 AED to be available for rent
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Brand*
//                     </label>
//                     <select
//                       name="brand"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.brand}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Brand</option>
//                       {brands.map((brand) => (
//                         <option key={brand._id} value={brand._id}>
//                           {brand.name || brand.brandName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Condition*
//                     </label>
//                     <select
//                       name="condition"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.condition}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Condition</option>
//                       {conditions.map((condition) => (
//                         <option key={condition._id} value={condition._id}>
//                           {condition.conditionName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Size*
//                     </label>
//                     <select
//                       name="size"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.size}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Size</option>
//                       {sizes.map((size) => (
//                         <option key={size._id} value={size._id}>
//                           {size.sizeName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Color
//                     </label>
//                     <select
//                       name="color"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.color}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Color</option>
//                       {colors.map((color) => (
//                         <option key={color._id} value={color._id}>
//                           {color.colorName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Gender*
//                     </label>
//                     <select
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={selectedGender}
//                       onChange={(e) => {
//                         setSelectedGender(e.target.value);
//                         setSelectedCategory("");
//                         setSelectedSubCategory("");
//                       }}
//                       required
//                     >
//                       <option value="">Select Gender</option>
//                       {genderOptions.map((gender) => (
//                         <option key={gender} value={gender}>
//                           {gender}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Category*
//                     </label>
//                     <select
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={selectedCategory}
//                       onChange={handleCategoryChange}
//                       disabled={!selectedGender}
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       {categoryOptions.map((cat) => (
//                         <option key={cat._id} value={cat._id}>
//                           {cat.categoryName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Subcategory
//                     </label>
//                     <select
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={selectedSubCategory}
//                       onChange={handleSubCategoryChange}
//                       disabled={!selectedCategory}
//                     >
//                       <option value="">Select Subcategory</option>
//                       {subCategoryOptions.map((sub) => (
//                         <option key={sub._id} value={sub._id}>
//                           {sub.subCategoryName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Images* (Min: 2, Max: 4)
//                     </label>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       onChange={handleImageSelect}
//                       disabled={uploadingImages || uploadedImageUrls.length >= 4}
//                     />
//                     {uploadingImages && (
//                       <div className="mt-2 text-sm text-blue-600 flex items-center">
//                         <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Uploading...
//                       </div>
//                     )}
//                     {uploadedImageUrls.length > 0 && (
//                       <div className="mt-2">
//                         <p className="text-sm font-medium text-gray-700 mb-2">
//                           Uploaded Images ({uploadedImageUrls.length}/4):
//                         </p>
//                         <div className="flex flex-wrap gap-2">
//                           {uploadedImageUrls.map((url, index) => (
//                             <div key={index} className="relative group">
//                               <img
//                                 src={url}
//                                 alt={`Image ${index + 1}`}
//                                 className="w-20 h-20 object-cover rounded-md border border-gray-200"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => handleRemoveImage(index)}
//                                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
//                               >
//                                 <X className="w-4 h-4" />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                         {uploadedImageUrls.length < 2 && (
//                           <p className="mt-1 text-xs text-red-500">
//                             Please upload at least 2 images
//                           </p>
//                         )}
//                         {uploadedImageUrls.length >= 4 && (
//                           <p className="mt-1 text-xs text-gray-500">
//                             Maximum 4 images reached
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Description
//                     </label>
//                     <textarea
//                       name="description"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       rows="3"
//                       value={formData.description}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Product Type
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.productType}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
//                       disabled
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Open to Rent
//                     </label>
//                     <select
//                       name="openToRent"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.openToRent}
//                       onChange={handleOpenToRentChange}
//                       disabled={Number(formData.price) <= 1000}
//                     >
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                     </select>
//                     {Number(formData.price) <= 1000 && (
//                       <p className="mt-1 text-xs text-gray-500 italic">
//                         Only available for products priced above 1000 AED
//                       </p>
//                     )}
//                   </div>
//                   {(formData.openToRent === "Yes" && Number(formData.price) > 1000) && (
//                     <>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                           Price Per Day* (AED)
//                         </label>
//                         <input
//                           type="number"
//                           name="pricePerDay"
//                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                           value={formData.pricePerDay}
//                           onChange={handleChange}
//                           required
//                           min="0"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                           Price Per Hour* (AED)
//                         </label>
//                         <input
//                           type="number"
//                           name="pricePerHour"
//                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                           value={formData.pricePerHour}
//                           onChange={handleChange}
//                           required
//                           min="0"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                           Deposit* (AED)
//                         </label>
//                         <input
//                           type="number"
//                           name="deposit"
//                           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                           value={formData.deposit}
//                           onChange={handleChange}
//                           required
//                           min="0"
//                         />
//                       </div>
//                     </>
//                   )}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Damages (if any)
//                     </label>
//                     <input
//                       type="text"
//                       name="damages"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.damages}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <h4 className="text-md font-medium text-gray-900 mb-2">
//                   Pickup Address{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Full Name{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
//                     </label>
//                     <input
//                       type="text"
//                       name="pickupAddress.name"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.pickupAddress.name}
//                       onChange={handleChange}
//                       required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Phone{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
//                     </label>
//                     <div className="flex">
//                       <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//                         +971
//                       </span>
//                       <input
//                         type="tel"
//                         name="pickupAddress.mobile_number"
//                         className="mt-1 block w-full border border-gray-300 rounded-r-md shadow-sm p-2"
//                         value={formData.pickupAddress.mobile_number}
//                         onChange={handleChange}
//                         required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
//                         maxLength={9}
//                         pattern="[0-9]{9}"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Alternate Phone
//                     </label>
//                     <div className="flex">
//                       <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//                         +971
//                       </span>
//                       <input
//                         type="tel"
//                         name="pickupAddress.alternate_phone"
//                         className="mt-1 block w-full border border-gray-300 rounded-r-md shadow-sm p-2"
//                         value={formData.pickupAddress.alternate_phone}
//                         onChange={handleChange}
//                         maxLength={9}
//                         pattern="[0-9]{9}"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       House No{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
//                     </label>
//                     <input
//                       type="text"
//                       name="pickupAddress.house_no"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.pickupAddress.house_no}
//                       onChange={handleChange}
//                       required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Building Name{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
//                     </label>
//                     <input
//                       type="text"
//                       name="pickupAddress.building_name"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.pickupAddress.building_name}
//                       onChange={handleChange}
//                       required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Area{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
//                     </label>
//                     <input
//                       type="text"
//                       name="pickupAddress.area"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.pickupAddress.area}
//                       onChange={handleChange}
//                       required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Landmark
//                     </label>
//                     <input
//                       type="text"
//                       name="pickupAddress.landmark"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.pickupAddress.landmark}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       City{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
//                     </label>
//                     <select
//                       name="pickupAddress.city"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.pickupAddress.city}
//                       onChange={handleChange}
//                       required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
//                     >
//                       <option value="">Select City</option>
//                       {cityOptions.map((city) => (
//                         <option key={city} value={city}>
//                           {city}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Address Type{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
//                     </label>
//                     <select
//                       name="pickupAddress.address_type"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.pickupAddress.address_type}
//                       onChange={handleChange}
//                       required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
//                     >
//                       <option value="Normal">Normal</option>
//                       <option value="Western">Western</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="pickupAddress.email"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.pickupAddress.email}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Country*
//                     </label>
//                     <input
//                       type="text"
//                       name="pickupAddress.country"
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                       value={formData.pickupAddress.country}
//                       readOnly
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="submit"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
//                   disabled={loading}
//                 >
//                   {loading ? "Saving..." : "Save"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProductModal;









"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const EditProductModal = ({ isOpen, product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    images: ["https://via.placeholder.com/400"],
    price: "",
    description: "",
    condition: "",
    size: "",
    color: "",
    openToRent: "No",
    pricePerDay: "",
    deposit: "",
    damages: "",
    category: "",
    brand: "",
    productType: "Listing",
    pickupAddress: {
      _id: "",
      name: "",
      mob_no_country_code: "971",
      mobile_number: "",
      alt_ph_country_code: "971",
      alternate_phone: "",
      house_no: "",
      building_name: "",
      area: "",
      landmark: "",
      city: "",
      address_type: "Normal",
      email: "",
      country: "UAE",
    },
    onSale: false,
    discountPercentage: 0,
    isTopBrand: false,
    coupon: [],
    approval: { status: "Pending", reason: "" },
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState({});
  const [conditions, setConditions] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;

  const cityOptions = [
    "Abu Dhabi",
    "Ajman",
    "Al-Ain",
    "Dubai",
    "Fujairah",
    "Ras Al Khaimah",
    "Sharjah",
    "Umm Al-Quwain",
  ];

  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const [brandsRes, categoriesRes, conditionsRes, sizesRes, colorsRes] =
          await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getbrand`),
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`),
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/getcondition`),
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sizes/getSizes`),
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/colors/getcolor`),
          ]);

        const Categories = categoriesRes.data.data.reduce((acc, category) => {
          if (!acc[category.parentCategory]) {
            acc[category.parentCategory] = [];
          }
          acc[category.parentCategory].push(category);
          return acc;
        }, {});
        setCategories(Categories);
        setBrands(brandsRes.data.brands || []);
        setConditions(conditionsRes.data.conditions || []);
        setSizes(sizesRes.data.sizes || []);
        setColors(colorsRes.data || []);
      } catch (error) {
        console.error("Error fetching reference data:", error);
        toast.error("Failed to load reference data");
      }
    };
    fetchReferenceData();
  }, []);

  useEffect(() => {
    if (product && categories) {
      const categoryObj = product.category;
      const genderName = categoryObj?.parentCategory || "";
      const categoryName = categoryObj?.categoryName || "";
      const subCategoryName = categoryObj?.subCategoryName || "";

      setSelectedGender(genderName);
      setTimeout(() => {
        if (genderName && categories[genderName]) {
          for (const catGroup of categories[genderName]) {
            if (!catGroup.categories) continue;
            const foundCategory = catGroup.categories.find(
              (cat) => cat.categoryName === categoryName
            );
            if (foundCategory) {
              setSelectedCategory(foundCategory._id);
              if (subCategoryName && foundCategory.subCategories) {
                const foundSubCategory = foundCategory.subCategories.find(
                  (sub) => sub.subCategoryName === subCategoryName
                );
                if (foundSubCategory) {
                  setTimeout(() => {
                    setSelectedSubCategory(foundSubCategory._id);
                  }, 100);
                }
              }
              break;
            }
          }
        }
      }, 100);

      setFormData({
        name: product.name || "",
        images: product.images || ["https://via.placeholder.com/400"],
        price: product.price || "",
        description: product.description || "",
        condition: product.condition?._id || "",
        size: product.size?._id || "",
        color: product.color?._id || "",
        openToRent: product.openToRent ? "Yes" : "No",
        pricePerDay: product.pricePerDay || "",
        deposit: product.deposit || "",
        damages: product.damages || "",
        category: categoryName,
        brand: product.brand?._id || "",
        productType: product.productType || "Listing",
        pickupAddress: {
          _id: product.pickupAddress?._id || "",
          name: product.pickupAddress?.name || "",
          mob_no_country_code: product.pickupAddress?.mob_no_country_code || "971",
          mobile_number: product.pickupAddress?.mobile_number || "",
          alt_ph_country_code: product.pickupAddress?.alt_ph_country_code || "971",
          alternate_phone: product.pickupAddress?.alternate_phone || "",
          house_no: product.pickupAddress?.house_no || "",
          building_name: product.pickupAddress?.building_name || "",
          area: product.pickupAddress?.area || "",
          landmark: product.pickupAddress?.landmark || "",
          city: product.pickupAddress?.city || "",
          address_type: product.pickupAddress?.address_type || "Normal",
          email: product.pickupAddress?.email || "",
          country: product.pickupAddress?.country || "UAE",
        },
        onSale: product.onSale || false,
        discountPercentage: product.discountPercentage || 0,
        isTopBrand: product.isTopBrand || false,
        coupon: product.coupon || [],
        approval: product.approval ? { ...product.approval } : { status: "Pending", reason: "" },
      });
      setUploadedImageUrls(product.images || []);
    }
  }, [product, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("pickupAddress.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        pickupAddress: {
          ...prev.pickupAddress,
          [field]: field === "mobile_number" || field === "alternate_phone"
            ? value.replace(/[^0-9]/g, "").slice(0, 9)
            : value,
          ...(field === "mobile_number" && { mob_no_country_code: "971" }),
          ...(field === "alternate_phone" && { alt_ph_country_code: "971" }),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "price" && {
          deposit: value ? Math.round(Number(value) * 0.2) : "",
        }),
      }));
    }
  };

  const handleOpenToRentChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      openToRent: value,
      ...(value === "No" && {
        pricePerDay: "",
        deposit: "",
        pickupAddress: {
          ...prev.pickupAddress,
          name: "",
          mobile_number: "",
          alternate_phone: "",
          house_no: "",
          building_name: "",
          area: "",
          landmark: "",
          city: "",
          address_type: "Normal",
          email: "",
          country: "UAE",
        },
      }),
    }));
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setSelectedCategory(catId);
    setSelectedSubCategory("");
    let categoryName = "";
    if (selectedGender && categories && categories[selectedGender]) {
      for (const catObj of categories[selectedGender]) {
        if (!catObj.categories) continue;
        const foundCategory = catObj.categories.find((cat) => cat._id === catId);
        if (foundCategory) {
          categoryName = foundCategory.categoryName;
          break;
        }
      }
    }
    setFormData((prev) => ({
      ...prev,
      category: categoryName,
    }));
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleImageSelect = async (event) => {
    const files = Array.from(event.target.files);
    const totalImages = uploadedImageUrls.length + files.length;
    
    if (totalImages > 4) {
      toast.error("Maximum 4 images allowed!");
      return;
    }

    if (files.length === 0) return;

    setUploadingImages(true);
    
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/single`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          return response.data.fileUrl;
        } else {
          throw new Error(`Upload failed with status ${response.status}`);
        }
      });
      
      const newImageUrls = await Promise.all(uploadPromises);
      
      setUploadedImageUrls((prev) => [...prev, ...newImageUrls]);
      
      toast.success(`${newImageUrls.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setUploadingImages(false);
      event.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setUploadedImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
    toast.success("Image removed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to edit.");
      return;
    }

    const requiredFields = ["name", "price", "condition", "size", "category", "brand"];
    if (formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") {
      requiredFields.push(
        "pickupAddress.name",
        "pickupAddress.mobile_number",
        "pickupAddress.house_no",
        "pickupAddress.building_name",
        "pickupAddress.area",
        "pickupAddress.city",
        "pickupAddress.address_type"
      );
      if (formData.openToRent === "Yes") {
        requiredFields.push("pricePerDay", "deposit");
      }
    }

    if (formData.openToRent === "Yes" && Number(formData.price) <= 1000) {
      setError("Price must be above 1000 AED for rental products");
      return;
    }

    const missingFields = requiredFields.filter((field) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return !formData[parent]?.[child];
      }
      return !formData[field];
    });

    if (missingFields.length > 0) {
      setError(`Required fields missing: ${missingFields.join(", ")}`);
      return;
    }

    if (uploadedImageUrls.length < 2) {
      setError("Please upload at least 2 images");
      return;
    }

    if (uploadedImageUrls.length > 4) {
      setError("Maximum 4 images allowed");
      return;
    }

    if ((formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") &&
        !cityOptions.includes(formData.pickupAddress.city)) {
      setError("Please select a valid city from the list");
      return;
    }

    setError("");

    let categoryData = {};
    if (selectedGender && selectedCategory && categories && categories[selectedGender]) {
      const selectedCategoryData = categories[selectedGender].flatMap((catObj) => catObj.categories || []).find((cat) => cat._id === selectedCategory);
      if (selectedCategoryData) {
        const selectedSubCategoryData = selectedSubCategory
          ? selectedCategoryData.subCategories.find((sub) => sub._id === selectedSubCategory)
          : null;
        categoryData = {
          parentCategory: selectedGender,
          categoryName: selectedCategoryData.categoryName,
          subCategoryName: selectedSubCategoryData ? selectedSubCategoryData.subCategoryName : "",
        };
      } else {
        setError("Invalid category selected");
        return;
      }
    } else {
      setError("Please select gender and category");
      return;
    }

    let pickupAddressId = formData.pickupAddress._id;
    if (formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") {
      if (!pickupAddressId) {
        setError("Pickup address ID is missing");
        return;
      }
      const pickupAddressData = {
        name: formData.pickupAddress.name,
        mob_no_country_code: formData.pickupAddress.mob_no_country_code,
        mobile_number: formData.pickupAddress.mobile_number,
        alt_ph_country_code: formData.pickupAddress.alternate_phone ? formData.pickupAddress.alt_ph_country_code : undefined,
        alternate_phone: formData.pickupAddress.alternate_phone || undefined,
        house_no: formData.pickupAddress.house_no,
        building_name: formData.pickupAddress.building_name,
        area: formData.pickupAddress.area,
        landmark: formData.pickupAddress.landmark || undefined,
        city: formData.pickupAddress.city,
        address_type: formData.pickupAddress.address_type,
        email: formData.pickupAddress.email || undefined,
        country: formData.pickupAddress.country,
        seller: product.seller,
      };

      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/pickupAddress/${pickupAddressId}`,
          pickupAddressData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        pickupAddressId = response.data.address._id;
      } catch (error) {
        console.error("Error updating pickup address:", error);
        toast.error(error.response?.data?.message || "Failed to update pickup address");
        setLoading(false);
        return;
      }
    }

    const productData = {
      name: formData.name,
      images: uploadedImageUrls,
      price: Number(formData.price),
      description: formData.description,
      condition: formData.condition,
      brand: formData.brand,
      color: formData.color || null,
      category: categoryData,
      size: formData.size,
      openToRent: formData.openToRent,
      pricePerDay: formData.openToRent === "Yes" ? Number(formData.pricePerDay) : 0,
      deposit: formData.openToRent === "Yes" ? Number(formData.deposit) : 0,
      damages: formData.damages,
      productType: formData.productType,
      pickupAddress: pickupAddressId || undefined,
      onSale: formData.onSale,
      discountPercentage: Number(formData.discountPercentage) || 0,
      isTopBrand: formData.isTopBrand,
      coupon: formData.coupon.length > 0 ? formData.coupon : undefined,
      approval: { ...formData.approval },
    };

    setLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${product._id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onSave(response.data.product);
        onClose();
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating product.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const genderOptions = Object.keys(categories || {});
  const categoryOptions = selectedGender && categories && categories[selectedGender]
    ? categories[selectedGender].flatMap((catObj) => (catObj.categories ? catObj.categories : []))
    : [];
  const subCategoryOptions = selectedCategory && categories && categories[selectedGender]
    ? categories[selectedGender]
        .flatMap((catObj) => catObj.categories || [])
        .find((cat) => cat._id === selectedCategory)?.subCategories || []
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Product</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price* (AED)
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                    {formData.price && Number(formData.price) <= 1000 && (
                      <p className="mt-1 text-sm text-gray-500">
                        Products must be priced above 1000 AED to be available for rent
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brand*
                    </label>
                    <select
                      name="brand"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name || brand.brandName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Condition*
                    </label>
                    <select
                      name="condition"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.condition}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Condition</option>
                      {conditions.map((condition) => (
                        <option key={condition._id} value={condition._id}>
                          {condition.conditionName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Size*
                    </label>
                    <select
                      name="size"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.size}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Size</option>
                      {sizes.map((size) => (
                        <option key={size._id} value={size._id}>
                          {size.sizeName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <select
                      name="color"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.color}
                      onChange={handleChange}
                    >
                      <option value="">Select Color</option>
                      {colors.map((color) => (
                        <option key={color._id} value={color._id}>
                          {color.colorName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender*
                    </label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={selectedGender}
                      onChange={(e) => {
                        setSelectedGender(e.target.value);
                        setSelectedCategory("");
                        setSelectedSubCategory("");
                      }}
                      required
                    >
                      <option value="">Select Gender</option>
                      {genderOptions.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category*
                    </label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      disabled={!selectedGender}
                      required
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subcategory
                    </label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={selectedSubCategory}
                      onChange={handleSubCategoryChange}
                      disabled={!selectedCategory}
                    >
                      <option value="">Select Subcategory</option>
                      {subCategoryOptions.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.subCategoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Images* (Min: 2, Max: 4)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      onChange={handleImageSelect}
                      disabled={uploadingImages || uploadedImageUrls.length >= 4}
                    />
                    {uploadingImages && (
                      <div className="mt-2 text-sm text-blue-600 flex items-center">
                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Uploading...
                      </div>
                    )}
                    {uploadedImageUrls.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Uploaded Images ({uploadedImageUrls.length}/4):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {uploadedImageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Image ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-md border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        {uploadedImageUrls.length < 2 && (
                          <p className="mt-1 text-xs text-red-500">
                            Please upload at least 2 images
                          </p>
                        )}
                        {uploadedImageUrls.length >= 4 && (
                          <p className="mt-1 text-xs text-gray-500">
                            Maximum 4 images reached
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Type
                    </label>
                    <input
                      type="text"
                      value={formData.productType}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Open to Rent
                    </label>
                    <select
                      name="openToRent"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.openToRent}
                      onChange={handleOpenToRentChange}
                      disabled={Number(formData.price) <= 1000}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {Number(formData.price) <= 1000 && (
                      <p className="mt-1 text-xs text-gray-500 italic">
                        Only available for products priced above 1000 AED
                      </p>
                    )}
                  </div>
                  {(formData.openToRent === "Yes" && Number(formData.price) > 1000) && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Rental Price Per Day* (AED)
                        </label>
                        <input
                          type="number"
                          name="pricePerDay"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          value={formData.pricePerDay}
                          onChange={handleChange}
                          required
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Deposit* (AED)
                        </label>
                        <input
                          type="number"
                          name="deposit"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          value={formData.deposit}
                          disabled
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Damages (if any)
                    </label>
                    <input
                      type="text"
                      name="damages"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.damages}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-2">
                  Pickup Address{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
                    </label>
                    <input
                      type="text"
                      name="pickupAddress.name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.pickupAddress.name}
                      onChange={handleChange}
                      required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +971
                      </span>
                      <input
                        type="tel"
                        name="pickupAddress.mobile_number"
                        className="mt-1 block w-full border border-gray-300 rounded-r-md shadow-sm p-2"
                        value={formData.pickupAddress.mobile_number}
                        onChange={handleChange}
                        required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
                        maxLength={9}
                        pattern="[0-9]{9}"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Alternate Phone
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +971
                      </span>
                      <input
                        type="tel"
                        name="pickupAddress.alternate_phone"
                        className="mt-1 block w-full border border-gray-300 rounded-r-md shadow-sm p-2"
                        value={formData.pickupAddress.alternate_phone}
                        onChange={handleChange}
                        maxLength={9}
                        pattern="[0-9]{9}"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      House No{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
                    </label>
                    <input
                      type="text"
                      name="pickupAddress.house_no"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.pickupAddress.house_no}
                      onChange={handleChange}
                      required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Building Name{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
                    </label>
                    <input
                      type="text"
                      name="pickupAddress.building_name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.pickupAddress.building_name}
                      onChange={handleChange}
                      required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Area{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
                    </label>
                    <input
                      type="text"
                      name="pickupAddress.area"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.pickupAddress.area}
                      onChange={handleChange}
                      required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="pickupAddress.landmark"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.pickupAddress.landmark}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
                    </label>
                    <select
                      name="pickupAddress.city"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.pickupAddress.city}
                      onChange={handleChange}
                      required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
                    >
                      <option value="">Select City</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address Type{(formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental") ? "*" : ""}
                    </label>
                    <select
                      name="pickupAddress.address_type"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.pickupAddress.address_type}
                      onChange={handleChange}
                      required={formData.openToRent === "Yes" || formData.productType === "Listing" || formData.productType === "Rental"}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Western">Western</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="pickupAddress.email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.pickupAddress.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country*
                    </label>
                    <input
                      type="text"
                      name="pickupAddress.country"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={formData.pickupAddress.country}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;

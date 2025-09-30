


// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import Modal from "./Modal";
// import ShareModal from "./ShareModal";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { format } from "timeago.js";
// import FollowersModal from "./FollowersModal";

// const ProfileSection = (userDetails) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
//   const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [imageSrc, setImageSrc] = useState("/kuku-suit 2.png");
//   const [image, setImage] = useState("/kuku-suit 2.png");
//   const [error, setError] = useState();
//   const [successMessage, setSuccessMessage] = useState("");
//   const [user, setUser] = useState(userDetails);
//   const [hasSelectedNewImage, setHasSelectedNewImage] = useState(false);
//   const [followLoading, setFollowLoading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   console.log(user);

//   const details = useSelector((state) => state.auth.user);
//   const id = details?._id;

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setHasSelectedNewImage(true);
//       setFormData((prevState) => ({
//         ...prevState,
//         avatar: file,
//       }));
//     }
//   };

//   const handleEditClick = () => {
//     setIsModalOpen(true);
//     setFormData({
//       ...user.user,
//       description: user.user?.description || "",
//     });
//     setHasSelectedNewImage(false);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setHasSelectedNewImage(false);
//   };

//   const handleShareClick = () => {
//     setIsShareModalOpen(true);
//   };

//   const handleCloseShareModal = () => {
//     setIsShareModalOpen(false);
//   };

//   const handleFollowersClick = () => {
//     setModalType("followers");
//     setIsFollowersModalOpen(true);
//   };

//   const handleFollowingClick = () => {
//     setModalType("following");
//     setIsFollowingModalOpen(true);
//   };

//   const handleCloseFollowersModal = () => {
//     setIsFollowersModalOpen(false);
//     setModalType("");
//   };

//   const handleCloseFollowingModal = () => {
//     setIsFollowingModalOpen(false);
//     setModalType("");
//   };

//   const [formData, setFormData] = useState({
//     avatar: null,
//     name: "",
//     email: "",
//     phone: "",
//     // location: "", // Commented out
//     description: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     avatar: null,
//     name: "",
//     email: "",
//     phone: "",
//     // location: "", // Commented out
//     description: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     let errors = {};
//     if (!formData.name.trim()) {
//       errors.name = "Full Name is required";
//     }
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email address is invalid";
//     }
//     if (!String(formData.phone).trim()) {
//       errors.phone = "Phone Number is required";
//     }
//     // if (!formData.location.trim()) { // Commented out
//     //   errors.location = "Address is required";
//     // }
//     return errors;
//   };

//   const uploadImage = async (imageFile) => {
//     const imageData = new FormData();
//     imageData.append("file", imageFile);
//     imageData.append("folder", "avatar");

//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/single`,
//         imageData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Image upload successful:", response.data);
//       return response.data.fileUrl;
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     const token = JSON.parse(Cookies.get("auth"));

//     if (Object.keys(errors).length === 0) {
//       try {
//         let uploadedImage = formData.avatar;

//         if (uploadedImage && typeof uploadedImage !== "string") {
//           uploadedImage = await uploadImage(uploadedImage);
//         }

//         let data = { ...formData };

//         if (uploadedImage) {
//           data.avatar = uploadedImage;
//         } else {
//           delete data.avatar;
//         }

//         // delete data.location; // Commented out to prevent sending location

//         const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/edit/${id}`;

//         const response = await axios.patch(apiUrl, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Form submission successful:", response.data);

//         setSuccessMessage("Profile updated successfully!");
//         setTimeout(() => {
//           setSuccessMessage("");
//         }, 3000);

//         setIsModalOpen(false);
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);

//         setFormData(response.data.profile);
//         setFormErrors({
//           fullName: "",
//           email: "",
//           phoneNumber: "",
//           // address: "", // Commented out
//           description: "",
//           api: "",
//         });
//       } catch (error) {
//         console.error("Error during form submission:", error);
//         setFormErrors({ api: "An error occurred while submitting the form." });
//       }
//     } else {
//       setFormErrors(errors);
//     }
//   };

//   const handleToggleFollow = async (followerId) => {
//     setFollowLoading(true);
//     setError(null);

//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/toggleFollowUser/${followerId}`;

//       const response = await axios.post(
//         url,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Toggle follow response:", response.data);

//       const currentlyFollowing = user?.user?.followers?.includes(id);
//       let updatedFollowers;

//       if (currentlyFollowing) {
//         updatedFollowers = user.user.followers.filter(
//           (followerId) => followerId !== id
//         );
//       } else {
//         updatedFollowers = [...(user.user.followers || []), id];
//       }

//       setUser({
//         ...user,
//         user: {
//           ...user.user,
//           followers: updatedFollowers,
//         },
//       });

//       setRefreshTrigger((prev) => prev + 1);

//       setSuccessMessage(
//         !currentlyFollowing
//           ? "Successfully followed user!"
//           : "Successfully unfollowed user!"
//       );
//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 3000);
//     } catch (error) {
//       console.error("Error while toggling follow status:", error);
//       setError("Failed to update follow status. Please try again.");
//       setTimeout(() => {
//         setError(null);
//       }, 3000);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const handleRemoveImage = () => {
//     setFormData((prevState) => ({
//       ...prevState,
//       avatar: null,
//     }));
//     setHasSelectedNewImage(false);
//     setSuccessMessage("Profile picture removed!");
//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);
//   };

//   const showRemoveButton =
//     hasSelectedNewImage || (formData.avatar && !hasSelectedNewImage);

//   const isFollowing = user?.user?.followers?.includes(id);

//   console.log("user", user);
//   console.log("Current user ID:", id);
//   console.log("Profile followers:", user?.user?.followers);
//   console.log("Is following:", isFollowing);

//   return (
//     <div className="max-w-[1550px] mx-auto">
//       <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[70px] pt-4 sm:pt-6 md:pt-[28px]">
//         <div className="w-full h-[1px] bg-[#e6e6e6] mt-4"></div>

//         <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-[21px] mt-16 sm:mt-20 md:mt-24 lg:mt-[103px]">
//           <div className="w-full xl:w-1/2 min-h-[250px] sm:min-h-[280px] md:min-h-[302px] rounded-lg shadow-md relative flex flex-col">
//             <Image
//               unoptimized
//               src={user?.user?.avatar || image}
//               width={120}
//               height={120}
//               className="absolute object-cover border bg-[#AF65E6] border-yellow-400 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-[140px] xl:h-[140px] left-4 sm:left-6 md:left-8 lg:left-12 xl:left-[49px] top-[-40px] sm:top-[-48px] md:top-[-56px] lg:top-[-64px] xl:top-[-80px] p-1 sm:p-1.5 md:p-2"
//               alt="Profile"
//             />

//             <div className="flex flex-wrap sm:flex-nowrap px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[64px] pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-[93px] gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-[52px]">
//               <div className="flex flex-col min-w-0 flex-1 sm:flex-none">
//                 <p className="text-black/60 text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla truncate mt-4">
//                   {user?.user?.username}
//                 </p>
//               </div>

//               <div
//                 className="flex flex-col text-center sm:text-left cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
//                 onClick={handleFollowersClick}
//               >
//                 <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
//                   {user?.user?.followers?.length}
//                 </p>
//                 <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-normal font-karla leading-normal">
//                   Followers
//                 </p>
//               </div>

//               <div
//                 className="flex flex-col text-center sm:text-left cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
//                 onClick={handleFollowingClick}
//               >
//                 <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
//                   {user?.user?.following?.length}
//                 </p>
//                 <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla">
//                   Following
//                 </p>
//               </div>

//               <div className="flex flex-col text-center sm:text-left">
//                 <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
//                   <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
//                     {user?.user?.averageSellerRating?.toFixed(1) || "0"}
//                   </p>
//                   <Image
//                     width={18}
//                     height={18}
//                     className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
//                     src="/rating.svg"
//                     alt="Rating"
//                   />
//                 </div>
//                 <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla">
//                   Rating
//                 </p>
//               </div>
//             </div>

//             <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[65px] flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mt-auto pb-6 sm:pb-8">
//               <div 
//                 className="flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[252px] h-10 sm:h-[39.40px] p-3 sm:p-[13.70px] rounded-[20px] border border-[#b25cf3] flex justify-center items-center cursor-pointer hover:bg-[#b25cf3] hover:text-white transition-colors"
//                 onClick={handleShareClick}
//               >
//                 <div className="text-[#b25cf3] hover:text-white transition-colors text-base sm:text-lg md:text-[19.18px] font-bold font-karla">
//                   Share
//                 </div>
//               </div>

//               {user?.user?.self === true ? (
//                 <div
//                   className="flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[250px] h-10 sm:h-[39.40px] p-3 sm:p-[13.70px] bg-[#2fbc74] rounded-[20px] flex justify-center items-center cursor-pointer"
//                   onClick={handleEditClick}
//                 >
//                   <div className="text-white text-base sm:text-lg md:text-[19.18px] font-bold font-karla">
//                     Edit
//                   </div>
//                 </div>
//               ) : (
//                 <button
//                   className={`flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[250px] h-10 sm:h-[39.40px] px-4 py-2 ${
//                     isFollowing
//                       ? "bg-gray-500 hover:bg-gray-600"
//                       : "bg-[#2fbc74] hover:bg-[#25a866]"
//                   } text-white rounded-[20px] font-bold font-karla transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
//                   onClick={() => handleToggleFollow(user?.user?._id)}
//                   disabled={followLoading}
//                 >
//                   {followLoading ? (
//                     <div className="flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       {isFollowing ? "Unfollowing..." : "Following..."}
//                     </div>
//                   ) : isFollowing ? (
//                     "Unfollow"
//                   ) : (
//                     "Follow"
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="w-full xl:w-1/2 min-h-[250px] sm:min-h-[280px] md:min-h-[302px] rounded-lg shadow-md">
//             <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-[30px] gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8">
//               <div>
//                 <p className="text-black text-sm sm:text-base font-bold font-karla leading-tight mb-2">
//                   Description
//                 </p>
//                 <p className="text-[#515151] text-sm sm:text-base font-medium font-karla leading-normal">
//                   {user?.user?.description || "No description provided"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-black text-sm sm:text-base font-bold font-karla leading-tight mb-2">
//                   Joined Kuku
//                 </p>
//                 <p className="text-[#515151] text-sm sm:text-base font-medium font-karla leading-normal">
//                   {format(user?.user?.joinedOn)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ShareModal
//         isOpen={isShareModalOpen}
//         onClose={handleCloseShareModal}
//         userDetails={user}
//       />

//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         showCloseButton={false}
//       >
//         <div className="flex flex-col w-full max-w-xs mx-auto h-auto max-h-[85vh] sm:max-w-sm rounded-lg bg-white shadow-lg m-2 sm:m-4">
//           <div className="flex items-center justify-between p-4 sm:p-4 lg:p-5 border-b border-gray-200 bg-white rounded-t-lg">
//             <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
//               Edit Profile
//             </h2>
//             <button
//               onClick={handleCloseModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               aria-label="Close modal"
//             >
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div 
//             className="flex-1 overflow-y-auto p-4 sm:p-4 lg:p-5 bg-white rounded-b-lg min-h-[200px] max-h-[70vh]"
//             style={{
//               msOverflowStyle: 'none',
//               scrollbarWidth: 'none'
//             }}
//           >
//             <style jsx>{`
//               div::-webkit-scrollbar {
//                 display: none;
//               }
//             `}</style>
            
//             <div className="flex justify-center mb-4 sm:mb-6">
//               <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-[#fde504] flex justify-center items-center relative flex-shrink-0">
//                 <Image
//                   unoptimized
//                   width={80}
//                   height={80}
//                   className="w-full h-full rounded-full object-cover"
//                   src={
//                     typeof window !== "undefined" &&
//                     formData.avatar instanceof File
//                       ? URL.createObjectURL(formData.avatar)
//                       : user?.user?.avatar
//                       ? user?.user?.avatar
//                       : imageSrc
//                   }
//                   alt="Profile Picture"
//                 />

//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   onChange={handleImageChange}
//                 />

//                 <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white rounded-full flex justify-center items-center cursor-pointer shadow-sm border-2 border-gray-200">
//                   <Image
//                     className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
//                     unoptimized
//                     width={20}
//                     height={20}
//                     src={"/edit.png"}
//                     alt="Edit"
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={handleImageChange}
//                   />
//                 </div>

//                 {hasSelectedNewImage && (
//                   <button
//                     onClick={handleRemoveImage}
//                     className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-red-600 transition-colors text-sm sm:text-base shadow-sm"
//                     type="button"
//                   >
//                     ×
//                   </button>
//                 )}
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3">
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7]"
//                   placeholder="Full Name"
//                 />
//                 {formErrors.name && (
//                   <p className="text-red-500 text-xs sm:text-sm mt-1">
//                     {formErrors.name}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <input
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7]"
//                   placeholder="Email address"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//                 {formErrors.email && (
//                   <p className="text-red-500 text-xs sm:text-sm mt-1">
//                     {formErrors.email}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7]"
//                   placeholder="Phone Number"
//                 />
//                 {formErrors.phone && (
//                   <p className="text-red-500 text-xs sm:text-sm mt-1">
//                     {formErrors.phone}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <textarea
//                   rows={3}
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7] resize-none min-h-[80px]"
//                   placeholder="Description (optional)"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                 />
//                 {formErrors.description && (
//                   <p className="text-red-500 text-xs sm:text-sm mt-1">
//                     {formErrors.description}
//                   </p>
//                 )}
//               </div>

//               {/* <div> // Commented out
//                 <textarea
//                   rows={3}
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7] resize-none min-h-[80px]"
//                   placeholder="Address"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                 />
//                 {formErrors.location && (
//                   <p className="text-red-500 text-xs sm:text-sm mt-1">
//                     {formErrors.location}
//                   </p>
//                 )}
//               </div> */}

//               <div className="pt-4 sm:pt-4 lg:pt-5">
//                 <button
//                   type="submit"
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 shadow-sm hover:shadow-md active:bg-yellow-700"
//                 >
//                   Save Details
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Modal>

//       <FollowersModal
//         isOpen={isFollowersModalOpen}
//         onClose={handleCloseFollowersModal}
//         type="followers"
//         userId={user?.user?._id}
//         refreshTrigger={refreshTrigger}
//       />

//       <FollowersModal
//         isOpen={isFollowingModalOpen}
//         onClose={handleCloseFollowingModal}
//         type="following"
//         userId={user?.user?._id}
//         refreshTrigger={refreshTrigger}
//       />

//       {successMessage && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded shadow-lg z-50 transition-opacity duration-500 text-sm sm:text-base max-w-[90vw] text-center">
//           {successMessage}
//         </div>
//       )}

//       {error && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded shadow-lg z-50 transition-opacity duration-500 text-sm sm:text-base max-w-[90vw] text-center">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileSection;











// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import Modal from "./Modal";
// import ShareModal from "./ShareModal";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { format } from "timeago.js";
// import FollowersModal from "./FollowersModal";

// const ProfileSection = (userDetails) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
//   const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [imageSrc, setImageSrc] = useState("/kuku-suit 2.png");
//   const [image, setImage] = useState("/kuku-suit 2.png");
//   const [error, setError] = useState();
//   const [successMessage, setSuccessMessage] = useState("");
//   const [user, setUser] = useState(userDetails);
//   const [hasSelectedNewImage, setHasSelectedNewImage] = useState(false);
//   const [followLoading, setFollowLoading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const details = useSelector((state) => state.auth.user);
//   const id = details?._id;

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setHasSelectedNewImage(true);
//       setFormData((prevState) => ({
//         ...prevState,
//         avatar: file,
//       }));
//     }
//   };

//   const handleEditClick = () => {
//     setIsModalOpen(true);
//     setFormData({
//       ...user.user, // Initialize with all user data
//       description: user.user?.description || "",
//       anonymous: user.user?.anonymous || false,
//     });
//     setHasSelectedNewImage(false);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setHasSelectedNewImage(false);
//   };

//   const handleShareClick = () => {
//     setIsShareModalOpen(true);
//   };

//   const handleCloseShareModal = () => {
//     setIsShareModalOpen(false);
//   };

//   const handleFollowersClick = () => {
//     setModalType("followers");
//     setIsFollowersModalOpen(true);
//   };

//   const handleFollowingClick = () => {
//     setModalType("following");
//     setIsFollowingModalOpen(true);
//   };

//   const handleCloseFollowersModal = () => {
//     setIsFollowersModalOpen(false);
//     setModalType("");
//   };

//   const handleCloseFollowingModal = () => {
//     setIsFollowingModalOpen(false);
//     setModalType("");
//   };

//   const [formData, setFormData] = useState({
//     avatar: null,
//     name: "",
//     email: "",
//     phone: "",
//     description: "",
//     anonymous: false, // Default to false
//   });

//   const [formErrors, setFormErrors] = useState({
//     avatar: null,
//     name: "",
//     email: "",
//     phone: "",
//     description: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const validateForm = () => {
//     let errors = {};
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email address is invalid";
//     }
//     if (!String(formData.phone).trim()) {
//       errors.phone = "Phone Number is required";
//     }
//     return errors;
//   };

//   const uploadImage = async (imageFile) => {
//     const imageData = new FormData();
//     imageData.append("file", imageFile);
//     imageData.append("folder", "avatar");

//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/single`,
//         imageData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.fileUrl;
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     const token = JSON.parse(Cookies.get("auth"));

//     if (Object.keys(errors).length === 0) {
//       try {
//         let uploadedImage = formData.avatar;

//         if (uploadedImage && typeof uploadedImage !== "string") {
//           uploadedImage = await uploadImage(uploadedImage);
//         }

//         let data = { ...formData };
//         if (uploadedImage) {
//           data.avatar = uploadedImage;
//         } else {
//           delete data.avatar;
//         }

//         // Preserve name value, only set fallback if empty
//         if (!data.name.trim()) {
//           data.name = user.user.name || user.user.username; // Fallback to existing name or username
//         }

//         const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/edit/${id}`;
//         const response = await axios.patch(apiUrl, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setSuccessMessage("Profile updated successfully!");
//         setTimeout(() => {
//           setSuccessMessage("");
//         }, 3000);

//         setIsModalOpen(false);
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);

//         setFormData(response.data.profile);
//         setFormErrors({
//           email: "",
//           phone: "",
//           description: "",
//         });
//       } catch (error) {
//         console.error("Error during form submission:", error);
//         setFormErrors({ api: "An error occurred while submitting the form." });
//       }
//     } else {
//       setFormErrors(errors);
//     }
//   };

//   const handleToggleFollow = async (followerId) => {
//     setFollowLoading(true);
//     setError(null);

//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/toggleFollowUser/${followerId}`;

//       const response = await axios.post(
//         url,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const currentlyFollowing = user?.user?.followers?.includes(id);
//       let updatedFollowers = currentlyFollowing
//         ? user.user.followers.filter((followerId) => followerId !== id)
//         : [...(user.user.followers || []), id];

//       setUser({
//         ...user,
//         user: {
//           ...user.user,
//           followers: updatedFollowers,
//         },
//       });

//       setRefreshTrigger((prev) => prev + 1);

//       setSuccessMessage(
//         !currentlyFollowing
//           ? "Successfully followed user!"
//           : "Successfully unfollowed user!"
//       );
//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 3000);
//     } catch (error) {
//       console.error("Error while toggling follow status:", error);
//       setError("Failed to update follow status. Please try again.");
//       setTimeout(() => {
//         setError(null);
//       }, 3000);
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const handleRemoveImage = () => {
//     setFormData((prevState) => ({
//       ...prevState,
//       avatar: null,
//     }));
//     setHasSelectedNewImage(false);
//     setSuccessMessage("Profile picture removed!");
//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);
//   };

//   const showRemoveButton =
//     hasSelectedNewImage || (formData.avatar && !hasSelectedNewImage);

//   const isFollowing = user?.user?.followers?.includes(id);

//   // Always show username in profile display
//   const displayName = user?.user?.username;

//   return (
//     <div className="max-w-[1550px] mx-auto">
//       <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[70px] pt-4 sm:pt-6 md:pt-[28px]">
//         <div className="w-full h-[1px] bg-[#e6e6e6] mt-4"></div>

//         <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-[21px] mt-16 sm:mt-20 md:mt-24 lg:mt-[103px]">
//           <div className="w-full xl:w-1/2 min-h-[250px] sm:min-h-[280px] md:min-h-[302px] rounded-lg shadow-md relative flex flex-col">
//             <Image
//               unoptimized
//               src={user?.user?.avatar || image}
//               width={120}
//               height={120}
//               className="absolute object-cover border bg-[#AF65E6] border-yellow-400 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-[140px] xl:h-[140px] left-4 sm:left-6 md:left-8 lg:left-12 xl:left-[49px] top-[-40px] sm:top-[-48px] md:top-[-56px] lg:top-[-64px] xl:top-[-80px] p-1 sm:p-1.5 md:p-2"
//               alt="Profile"
//             />

//             <div className="flex flex-wrap sm:flex-nowrap px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[64px] pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-[93px] gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-[52px]">
//               <div className="flex flex-col min-w-0 flex-1 sm:flex-none">
//                 <p className="text-black/60 text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla truncate mt-4">
//                   {displayName}
//                 </p>
//               </div>

//               <div
//                 className="flex flex-col text-center sm:text-left cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
//                 onClick={handleFollowersClick}
//               >
//                 <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
//                   {user?.user?.followers?.length}
//                 </p>
//                 <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-normal font-karla leading-normal">
//                   Followers
//                 </p>
//               </div>

//               <div
//                 className="flex flex-col text-center sm:text-left cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
//                 onClick={handleFollowingClick}
//               >
//                 <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
//                   {user?.user?.following?.length}
//                 </p>
//                 <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla">
//                   Following
//                 </p>
//               </div>

//               <div className="flex flex-col text-center sm:text-left">
//                 <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
//                   <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
//                     {user?.user?.averageSellerRating?.toFixed(1) || "0"}
//                   </p>
//                   <Image
//                     width={18}
//                     height={18}
//                     className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
//                     src="/rating.svg"
//                     alt="Rating"
//                   />
//                 </div>
//                 <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla">
//                   Rating
//                 </p>
//               </div>
//             </div>

//             <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[65px] flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mt-auto pb-6 sm:pb-8">
//               <div 
//                 className="flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[252px] h-10 sm:h-[39.40px] p-3 sm:p-[13.70px] rounded-[20px] border border-[#b25cf3] flex justify-center items-center cursor-pointer hover:bg-[#b25cf3] hover:text-white transition-colors"
//                 onClick={handleShareClick}
//               >
//                 <div className="text-[#b25cf3] hover:text-white transition-colors text-base sm:text-lg md:text-[19.18px] font-bold font-karla">
//                   Share
//                 </div>
//               </div>

//               {user?.user?.self === true ? (
//                 <div
//                   className="flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[250px] h-10 sm:h-[39.40px] p-3 sm:p-[13.70px] bg-[#2fbc74] rounded-[20px] flex justify-center items-center cursor-pointer"
//                   onClick={handleEditClick}
//                 >
//                   <div className="text-white text-base sm:text-lg md:text-[19.18px] font-bold font-karla">
//                     Edit
//                   </div>
//                 </div>
//               ) : (
//                 <button
//                   className={`flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[250px] h-10 sm:h-[39.40px] px-4 py-2 ${
//                     isFollowing
//                       ? "bg-gray-500 hover:bg-gray-600"
//                       : "bg-[#2fbc74] hover:bg-[#25a866]"
//                   } text-white rounded-[20px] font-bold font-karla transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
//                   onClick={() => handleToggleFollow(user?.user?._id)}
//                   disabled={followLoading}
//                 >
//                   {followLoading ? (
//                     <div className="flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       {isFollowing ? "Unfollowing..." : "Following..."}
//                     </div>
//                   ) : isFollowing ? (
//                     "Unfollow"
//                   ) : (
//                     "Follow"
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="w-full xl:w-1/2 min-h-[250px] sm:min-h-[280px] md:min-h-[302px] rounded-lg shadow-md">
//             <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-[30px] gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8">
//               <div>
//                 <p className="text-black text-sm sm:text-base font-bold font-karla leading-tight mb-2">
//                   Description
//                 </p>
//                 <p className="text-[#515151] text-sm sm:text-base font-medium font-karla leading-normal">
//                   {user?.user?.description || "No description provided"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-black text-sm sm:text-base font-bold font-karla leading-tight mb-2">
//                   Joined Kuku
//                 </p>
//                 <p className="text-[#515151] text-sm sm:text-base font-medium font-karla leading-normal">
//                   {format(user?.user?.joinedOn)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ShareModal
//         isOpen={isShareModalOpen}
//         onClose={handleCloseShareModal}
//         userDetails={user}
//       />

//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         showCloseButton={false}
//       >
//         <div className="flex flex-col w-full max-w-xs mx-auto h-auto max-h-[85vh] sm:max-w-sm rounded-lg bg-white shadow-lg m-2 sm:m-4">
//           <div className="flex items-center justify-between p-4 sm:p-4 lg:p-5 border-b border-gray-200 bg-white rounded-t-lg">
//             <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
//               Edit Profile
//             </h2>
//             <button
//               onClick={handleCloseModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               aria-label="Close modal"
//             >
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div 
//             className="flex-1 overflow-y-auto p-4 sm:p-4 lg:p-5 bg-white rounded-b-lg min-h-[200px] max-h-[70vh]"
//             style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
//           >
//             <style jsx>{`
//               div::-webkit-scrollbar {
//                 display: none;
//               }
//             `}</style>
            
//             <div className="flex justify-center mb-4 sm:mb-6">
//               <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-[#fde504] flex justify-center items-center relative flex-shrink-0">
//                 <Image
//                   unoptimized
//                   width={80}
//                   height={80}
//                   className="w-full h-full rounded-full object-cover"
//                   src={
//                     typeof window !== "undefined" &&
//                     formData.avatar instanceof File
//                       ? URL.createObjectURL(formData.avatar)
//                       : user?.user?.avatar
//                       ? user?.user?.avatar
//                       : imageSrc
//                   }
//                   alt="Profile Picture"
//                 />

//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   onChange={handleImageChange}
//                 />

//                 <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white rounded-full flex justify-center items-center cursor-pointer shadow-sm border-2 border-gray-200">
//                   <Image
//                     className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
//                     unoptimized
//                     width={20}
//                     height={20}
//                     src={"/edit.png"}
//                     alt="Edit"
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={handleImageChange}
//                   />
//                 </div>

//                 {hasSelectedNewImage && (
//                   <button
//                     onClick={handleRemoveImage}
//                     className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-red-600 transition-colors text-sm sm:text-base shadow-sm"
//                     type="button"
//                   >
//                     ×
//                   </button>
//                 )}
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3">
//               {!formData.anonymous && (
//                 <div>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7]"
//                     placeholder="Full Name"
//                   />
//                   {formErrors.name && (
//                     <p className="text-red-500 text-xs sm:text-sm mt-1">
//                       {formErrors.name}
//                     </p>
//                   )}
//                 </div>
//               )}

//               <div>
//                 <input
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7]"
//                   placeholder="Email address"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//                 {formErrors.email && (
//                   <p className="text-red-500 text-xs sm:text-sm mt-1">
//                     {formErrors.email}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7]"
//                   placeholder="Phone Number"
//                 />
//                 {formErrors.phone && (
//                   <p className="text-red-500 text-xs sm:text-sm mt-1">
//                     {formErrors.phone}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <textarea
//                   rows={3}
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7] resize-none min-h-[80px]"
//                   placeholder="Description (optional)"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                 />
//                 {formErrors.description && (
//                   <p className="text-red-500 text-xs sm:text-sm mt-1">
//                     {formErrors.description}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="anonymous"
//                     checked={formData.anonymous}
//                     onChange={handleInputChange}
//                     className="mr-2"
//                   />
//                   <span>Stay Anonymous</span>
//                 </label>
//                 <p className="text-xs text-gray-500 mt-1">
//                   If checked, only your KuKu identity will be shown, not your full name.
//                 </p>
//               </div>

//               <div className="pt-4 sm:pt-4 lg:pt-5">
//                 <button
//                   type="submit"
//                   className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 shadow-sm hover:shadow-md active:bg-yellow-700"
//                 >
//                   Save Details
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Modal>

//       <FollowersModal
//         isOpen={isFollowersModalOpen}
//         onClose={handleCloseFollowersModal}
//         type="followers"
//         userId={user?.user?._id}
//         refreshTrigger={refreshTrigger}
//       />

//       <FollowersModal
//         isOpen={isFollowingModalOpen}
//         onClose={handleCloseFollowingModal}
//         type="following"
//         userId={user?.user?._id}
//         refreshTrigger={refreshTrigger}
//       />

//       {successMessage && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded shadow-lg z-50 transition-opacity duration-500 text-sm sm:text-base max-w-[90vw] text-center">
//           {successMessage}
//         </div>
//       )}

//       {error && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded shadow-lg z-50 transition-opacity duration-500 text-sm sm:text-base max-w-[90vw] text-center">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileSection;







"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import ShareModal from "./ShareModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "timeago.js";
import FollowersModal from "./FollowersModal";

const ProfileSection = (userDetails) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [imageSrc, setImageSrc] = useState("/kuku-suit 2.png");
  const [image, setImage] = useState("/kuku-suit 2.png");
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(userDetails);
  const [hasSelectedNewImage, setHasSelectedNewImage] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const details = useSelector((state) => state.auth.user);
  const id = details?._id;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHasSelectedNewImage(true);
      setFormData((prevState) => ({
        ...prevState,
        avatar: file,
      }));
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
    setFormData({
      ...user.user, // Initialize with all user data
      description: user.user?.description || "",
      anonymous: user.user?.anonymous || false,
    });
    setHasSelectedNewImage(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHasSelectedNewImage(false);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  const handleFollowersClick = () => {
    setModalType("followers");
    setIsFollowersModalOpen(true);
  };

  const handleFollowingClick = () => {
    setModalType("following");
    setIsFollowingModalOpen(true);
  };

  const handleCloseFollowersModal = () => {
    setIsFollowersModalOpen(false);
    setModalType("");
  };

  const handleCloseFollowingModal = () => {
    setIsFollowingModalOpen(false);
    setModalType("");
  };

  const [formData, setFormData] = useState({
    avatar: null,
    name: "",
    email: "",
    phone: "",
    description: "",
    anonymous: false, // Default to false
  });

  const [formErrors, setFormErrors] = useState({
    avatar: null,
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!String(formData.phone).trim()) {
      errors.phone = "Phone Number is required";
    }
    return errors;
  };

  const uploadImage = async (imageFile) => {
    const imageData = new FormData();
    imageData.append("file", imageFile);
    imageData.append("folder", "avatar");

    try {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/single`,
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.fileUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    const token = JSON.parse(Cookies.get("auth"));

    if (Object.keys(errors).length === 0) {
      try {
        let uploadedImage = formData.avatar;

        if (uploadedImage && typeof uploadedImage !== "string") {
          uploadedImage = await uploadImage(uploadedImage);
        }

        let data = { ...formData };
        if (uploadedImage) {
          data.avatar = uploadedImage;
        } else {
          delete data.avatar;
        }

        // Preserve name value, only set fallback if empty
        if (!data.name.trim()) {
          data.name = user.user.name || user.user.username; // Fallback to existing name or username
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/edit/${id}`;
        const response = await axios.patch(apiUrl, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setIsModalOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        setFormData(response.data.profile);
        setFormErrors({
          email: "",
          phone: "",
          description: "",
        });
      } catch (error) {
        console.error("Error during form submission:", error);
        setFormErrors({ api: "An error occurred while submitting the form." });
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleToggleFollow = async (followerId) => {
    setFollowLoading(true);
    setError(null);

    try {
      const token = JSON.parse(Cookies.get("auth"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/toggleFollowUser/${followerId}`;

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const currentlyFollowing = user?.user?.followers?.includes(id);
      let updatedFollowers = currentlyFollowing
        ? user.user.followers.filter((followerId) => followerId !== id)
        : [...(user.user.followers || []), id];

      setUser({
        ...user,
        user: {
          ...user.user,
          followers: updatedFollowers,
        },
      });

      setRefreshTrigger((prev) => prev + 1);

      setSuccessMessage(
        !currentlyFollowing
          ? "Successfully followed user!"
          : "Successfully unfollowed user!"
      );
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error while toggling follow status:", error);
      setError("Failed to update follow status. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      avatar: null,
    }));
    setHasSelectedNewImage(false);
    setSuccessMessage("Profile picture removed!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const showRemoveButton =
    hasSelectedNewImage || (formData.avatar && !hasSelectedNewImage);

  const isFollowing = user?.user?.followers?.includes(id);

  // Always show username in profile display
  const displayName = user?.user?.username;

  return (
    <div className="max-w-[1550px] mx-auto">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[70px] pt-4 sm:pt-6 md:pt-[28px]">
        <div className="w-full h-[1px] bg-[#e6e6e6] mt-4"></div>

        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-[21px] mt-16 sm:mt-20 md:mt-24 lg:mt-[103px]">
          <div className="w-full xl:w-1/2 min-h-[250px] sm:min-h-[280px] md:min-h-[302px] rounded-lg shadow-md relative flex flex-col">
            <Image
              unoptimized
              src={user?.user?.avatar || image}
              width={120}
              height={120}
              className="absolute object-cover border bg-[#AF65E6] border-yellow-400 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-[140px] xl:h-[140px] left-4 sm:left-6 md:left-8 lg:left-12 xl:left-[49px] top-[-40px] sm:top-[-48px] md:top-[-56px] lg:top-[-64px] xl:top-[-80px] p-1 sm:p-1.5 md:p-2"
              alt="Profile"
            />

            {/* Fixed stats section with proper alignment */}
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[64px] pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-[93px] pb-4">
              {/* Username section */}
              <div className="flex flex-col justify-center min-w-0">
                <p className="text-black/60 text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla truncate">
                  {displayName}
                </p>
              </div>

              {/* Stats section with equal spacing */}
              <div className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-[52px]">
                {/* Followers */}
                <div
                  className="flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors min-w-[60px]"
                  onClick={handleFollowersClick}
                >
                  <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
                    {user?.user?.followers?.length}
                  </p>
                  <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-normal font-karla leading-tight">
                    Followers
                  </p>
                </div>

                {/* Following */}
                <div
                  className="flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors min-w-[60px]"
                  onClick={handleFollowingClick}
                >
                  <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
                    {user?.user?.following?.length}
                  </p>
                  <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla leading-tight">
                    Following
                  </p>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-center text-center min-w-[60px]">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
                      {user?.user?.averageSellerRating?.toFixed(1) || "0.0"}
                    </p>
                    <Image
                      width={18}
                      height={18}
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                      src="/rating.svg"
                      alt="Rating"
                    />
                  </div>
                  <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla leading-tight">
                    Rating
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons section */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[65px] flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mt-auto pb-6 sm:pb-8">
              <div 
                className="flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[252px] h-10 sm:h-[39.40px] p-3 sm:p-[13.70px] rounded-[20px] border border-[#b25cf3] flex justify-center items-center cursor-pointer hover:bg-[#b25cf3] hover:text-white transition-colors"
                onClick={handleShareClick}
              >
                <div className="text-[#b25cf3] hover:text-white transition-colors text-base sm:text-lg md:text-[19.18px] font-bold font-karla">
                  Share
                </div>
              </div>

              {user?.user?.self === true ? (
                <div
                  className="flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[250px] h-10 sm:h-[39.40px] p-3 sm:p-[13.70px] bg-[#2fbc74] rounded-[20px] flex justify-center items-center cursor-pointer"
                  onClick={handleEditClick}
                >
                  <div className="text-white text-base sm:text-lg md:text-[19.18px] font-bold font-karla">
                    Edit
                  </div>
                </div>
              ) : (
                <button
                  className={`flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[250px] h-10 sm:h-[39.40px] px-4 py-2 ${
                    isFollowing
                      ? "bg-gray-500 hover:bg-gray-600"
                      : "bg-[#2fbc74] hover:bg-[#25a866]"
                  } text-white rounded-[20px] font-bold font-karla transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={() => handleToggleFollow(user?.user?._id)}
                  disabled={followLoading}
                >
                  {followLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isFollowing ? "Unfollowing..." : "Following..."}
                    </div>
                  ) : isFollowing ? (
                    "Unfollow"
                  ) : (
                    "Follow"
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="w-full xl:w-1/2 min-h-[250px] sm:min-h-[280px] md:min-h-[302px] rounded-lg shadow-md">
            <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-[30px] gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8">
              <div>
                <p className="text-black text-sm sm:text-base font-bold font-karla leading-tight mb-2">
                  Description
                </p>
                <p className="text-[#515151] text-sm sm:text-base font-medium font-karla leading-normal">
                  {user?.user?.description || "No description provided"}
                </p>
              </div>
              <div>
                <p className="text-black text-sm sm:text-base font-bold font-karla leading-tight mb-2">
                  Joined Kuku
                </p>
                <p className="text-[#515151] text-sm sm:text-base font-medium font-karla leading-normal">
                  {format(user?.user?.joinedOn)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleCloseShareModal}
        userDetails={user}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        showCloseButton={false}
      >
        <div className="flex flex-col w-full max-w-xs mx-auto h-auto max-h-[85vh] sm:max-w-sm rounded-lg bg-white shadow-lg m-2 sm:m-4">
          <div className="flex items-center justify-between p-4 sm:p-4 lg:p-5 border-b border-gray-200 bg-white rounded-t-lg">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
              Edit Profile
            </h2>
            <button
              onClick={handleCloseModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              type="button"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div 
            className="flex-1 overflow-y-auto p-4 sm:p-4 lg:p-5 bg-white rounded-b-lg min-h-[200px] max-h-[70vh]"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-[#fde504] flex justify-center items-center relative flex-shrink-0">
                <Image
                  unoptimized
                  width={80}
                  height={80}
                  className="w-full h-full rounded-full object-cover"
                  src={
                    typeof window !== "undefined" &&
                    formData.avatar instanceof File
                      ? URL.createObjectURL(formData.avatar)
                      : user?.user?.avatar
                      ? user?.user?.avatar
                      : imageSrc
                  }
                  alt="Profile Picture"
                />

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />

                <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white rounded-full flex justify-center items-center cursor-pointer shadow-sm border-2 border-gray-200">
                  <Image
                    className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
                    unoptimized
                    width={20}
                    height={20}
                    src={"/edit.png"}
                    alt="Edit"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>

                {hasSelectedNewImage && (
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-red-600 transition-colors text-sm sm:text-base shadow-sm"
                    type="button"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3">
              {!formData.anonymous && (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7]"
                    placeholder="Full Name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>
              )}

              <div>
                <input
                  className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7]"
                  placeholder="Email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7]"
                  placeholder="Phone Number"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-[#F7F7F7] resize-none min-h-[80px]"
                  placeholder="Description (optional)"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {formErrors.description && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {formErrors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Stay Anonymous</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  If checked, only your KuKu identity will be shown, not your full name.
                </p>
              </div>

              <div className="pt-4 sm:pt-4 lg:pt-5">
                <button
                  type="submit"
                  className="w-full px-4 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3 text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 shadow-sm hover:shadow-md active:bg-yellow-700"
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={handleCloseFollowersModal}
        type="followers"
        userId={user?.user?._id}
        refreshTrigger={refreshTrigger}
      />

      <FollowersModal
        isOpen={isFollowingModalOpen}
        onClose={handleCloseFollowingModal}
        type="following"
        userId={user?.user?._id}
        refreshTrigger={refreshTrigger}
      />

      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded shadow-lg z-50 transition-opacity duration-500 text-sm sm:text-base max-w-[90vw] text-center">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded shadow-lg z-50 transition-opacity duration-500 text-sm sm:text-base max-w-[90vw] text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;


"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // Adjust the import path as needed
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "timeago.js";
import FollowersModal from "./FollowersModal"; // Import the new modal component

const ProfileSection = (userDetails) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "followers" or "following"
  const [imageSrc, setImageSrc] = useState("/kuku-suit 2.png");
  const [image, setImage] = useState("/kuku-suit 2.png");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(userDetails);
  const [hasSelectedNewImage, setHasSelectedNewImage] = useState(false);
  console.log(user);

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
      ...user.user,
      // Make sure to include the description field
      description: user.user?.Discription || "",
    });
    setHasSelectedNewImage(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHasSelectedNewImage(false);
  };

  // New handlers for followers/following modals
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
    location: "",
    description: "", // Added description field
  });

  const [formErrors, setFormErrors] = useState({
    avatar: null,
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "", // Added description field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = "Full Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!String(formData.phone).trim()) {
      errors.phone = "Phone Number is required";
    }
    if (!formData.location.trim()) {
      errors.location = "Address is required";
    }
    // Description is optional, so no validation required
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

      console.log("Image upload successful:", response.data);
      return response.data.fileUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const fetchProfileData = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/${user.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      console.log("Fetched profile data:", response.data);
      setFormData({
        ...response.data.user,
        description: response.data.user?.Discription || "",
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError("Failed to fetch updated profile data");
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

        // Map description to Discription for API consistency
        if (data.description !== undefined) {
          data.Discription = data.description;
          delete data.description;
        }

        if (uploadedImage) {
          data.avatar = uploadedImage;
        } else {
          delete data.avatar;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/edit/${id}`;

        const response = await axios.patch(apiUrl, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Form submission successful:", response.data);

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
          fullName: "",
          email: "",
          phoneNumber: "",
          address: "",
          description: "",
          api: "",
        });
      } catch (error) {
        console.error("Error during form submission:", error);
        setFormErrors({ api: "An error occurred while submitting the form." });
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleFollow = async (id, type) => {
    setLoading(true);

    try {
      const token = JSON.parse(Cookies.get("auth"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/${type}/${id}`;
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedFollowers = res.data.followers;
      console.log("updatedFollowers", updatedFollowers);

      setUser({
        ...user,
        user: {
          ...user.user,
          followers: updatedFollowers,
        },
      });
    } catch (error) {
      console.error("Error while following/unfollowing", error);
    } finally {
      setLoading(false);
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

  console.log("user", user);

  return (
    <div className="max-w-[1550px] mx-auto">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[70px] pt-4 sm:pt-6 md:pt-[28px]">
        {/* Divider */}
        <div className="w-full h-[1px] bg-[#e6e6e6] mt-4"></div>

        {/* Main Profile Section */}
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-[21px] mt-16 sm:mt-20 md:mt-24 lg:mt-[103px]">
          {/* Left Card - Profile Info */}
          <div className="w-full xl:w-1/2 min-h-[250px] sm:min-h-[280px] md:min-h-[302px] rounded-lg shadow-md relative flex flex-col">
            {/* Profile Image */}
            <Image
              unoptimized
              src={user?.user?.avatar || image}
              width={120}
              height={120}
              className="absolute object-cover border bg-[#AF65E6] border-yellow-400 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-[140px] xl:h-[140px] left-4 sm:left-6 md:left-8 lg:left-12 xl:left-[49px] top-[-40px] sm:top-[-48px] md:top-[-56px] lg:top-[-64px] xl:top-[-80px] p-1 sm:p-1.5 md:p-2"
              alt="Profile"
            />

            {/* Stats Section */}
            <div className="flex flex-wrap sm:flex-nowrap px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[64px] pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-[93px] gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-[52px]">
              {/* Name and Username */}
              <div className="flex flex-col min-w-0 flex-1 sm:flex-none">
               
                <p className="text-black/60 text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla truncate mt-4">
                  {user?.user?.username}
                </p>
              </div>

              {/* Followers - Now clickable */}
              <div 
                className="flex flex-col text-center sm:text-left cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onClick={handleFollowersClick}
              >
                <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
                  {user?.user?.followers?.length}
                </p>
                <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-normal font-karla leading-normal">
                  Followers
                </p>
              </div>

              {/* Following - Now clickable */}
              <div 
                className="flex flex-col text-center sm:text-left cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onClick={handleFollowingClick}
              >
                <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
                  {user?.user?.following?.length}
                </p>
                <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla">
                  Following
                </p>
              </div>

              {/* Rating */}
              <div className="flex flex-col text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
                  <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[28px] font-bold font-karla">
                    {user?.user?.rating}
                  </p>
                  <Image
                    width={18}
                    height={18}
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    src="/rating.svg"
                    alt="Rating"
                  />
                </div>
                <p className="text-black text-sm sm:text-base md:text-lg lg:text-lg xl:text-[20px] font-normal font-karla">
                  Rating
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[65px] flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mt-auto pb-6 sm:pb-8">
              {/* Share Button */}
              <div className="flex-1 sm:flex-none sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[252px] h-10 sm:h-[39.40px] p-3 sm:p-[13.70px] rounded-[20px] border border-[#b25cf3] flex justify-center items-center">
                <div className="text-[#b25cf3] text-base sm:text-lg md:text-[19.18px] font-bold font-karla">
                  Share
                </div>
              </div>

              {/* Edit/Follow Button */}
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
                    user?.user?.followers?.includes(id)
                      ? "bg-gray-500"
                      : "bg-[#2fbc74]"
                  } text-white rounded-[20px] font-bold font-karla`}
                  onClick={() =>
                    user?.user?.followers?.includes(id)
                      ? handleFollow(user.user._id, "unfollow", user?.user?._id)
                      : handleFollow(user.user._id, "follow", user?.user?._id)
                  }
                  disabled={loading}
                >
                  {user?.user?.followers?.includes(id) ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>

          {/* Right Card - Details */}
          <div className="w-full xl:w-1/2 min-h-[250px] sm:min-h-[280px] md:min-h-[302px] rounded-lg shadow-md">
            <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-[30px] gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8">
              {/* Description */}
              <div>
                <p className="text-black text-sm sm:text-base font-bold font-karla leading-tight mb-2">
                  Description
                </p>
                <p className="text-[#515151] text-sm sm:text-base font-medium font-karla leading-normal">
                  {user?.user?.Discription || "No description provided"}
                </p>
              </div>

              {/* Location */}
              {/* <div>
                <p className="text-black text-sm sm:text-base font-bold font-karla leading-tight mb-2">
                  Lives In
                </p>
                <p className="text-[#515151] text-sm sm:text-base font-medium font-karla leading-normal">
                  {user?.user?.defaultAddress?.[0]}
                </p>
              </div> */}

              {/* Join Date */}
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

      {/* Edit Profile Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div
          className="flex flex-col items-center p-4 sm:p-6 max-h-[90vh] overflow-y-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <h2 className="text-[#070707] text-lg sm:text-xl md:text-[22.91px] font-bold font-karla leading-7 pb-4 sm:pb-6 md:pb-8 text-center">
            Edit Profile
          </h2>

          {/* Profile Image Section */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-[114px] md:h-[114px] rounded-full bg-[#fde504] flex justify-center items-center relative mb-4 sm:mb-6 flex-shrink-0">
            <Image
              unoptimized
              width={80}
              height={80}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px] rounded-full object-cover"
              src={
                typeof window !== "undefined" && formData.avatar instanceof File
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

            {/* Edit Icon */}
            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 md:w-[30px] md:h-[30px] bg-white rounded-full flex justify-center items-center cursor-pointer shadow-sm">
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

            {/* Remove Button */}
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

          {/* Form Container with proper scrolling */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-200 rounded-[13px] w-full p-2 sm:p-3 bg-[#F7F7F7] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Full Name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <input
                  className="border border-gray-200 rounded-[13px] w-full p-2 sm:p-3 bg-[#F7F7F7] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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

              {/* Phone Input */}
              <div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border border-gray-200 rounded-[13px] w-full p-2 sm:p-3 bg-[#F7F7F7] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Phone Number"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <textarea
                  rows={3}
                  className="border border-gray-200 rounded-[13px] w-full p-2 sm:p-3 bg-[#F7F7F7] resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent scrollbar-hide overflow-hidden"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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

              {/* Address Input */}
              <div>
                <textarea
                  rows={3}
                  className="border border-gray-200 rounded-[13px] w-full p-2 sm:p-3 bg-[#F7F7F7] resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent scrollbar-hide overflow-hidden"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  placeholder="Address"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                {formErrors.location && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {formErrors.location}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-[13px] px-4 py-2 sm:py-3 w-full font-medium text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* Followers Modal */}
      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={handleCloseFollowersModal}
        type="followers"
        userId={user?.user?._id}
      />

      {/* Following Modal */}
      <FollowersModal
        isOpen={isFollowingModalOpen}
        onClose={handleCloseFollowingModal}
        type="following"
        userId={user?.user?._id}
      />

      {/* Success Notification */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded shadow-lg z-50 transition-opacity duration-500 text-sm sm:text-base max-w-[90vw] text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;

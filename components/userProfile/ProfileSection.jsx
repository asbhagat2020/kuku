"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // Adjust the import path as needed
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "timeago.js";


const ProfileSection = (user) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("/kuku-suit 2.png");
  const [image, setImage] = useState("/profile_icon.svg");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  // const [user, setUser] = useState();

  const details = useSelector((state) => state.auth.user);
  const id = details._id;

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      avatar: e.target.files[0],
    }));
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
    setFormData(user.user);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [formData, setFormData] = useState({
    avatar: null,
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [formErrors, setFormErrors] = useState({
    avatar: null,
    name: "",
    email: "",
    phone: "",
    location: "",
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
    } else if (!/^\d{10}$/.test(String(formData.phone).trim())) {
      errors.phone = "Phone Number must be 10 digits";
    }
    if (!formData.location.trim()) {
      errors.location = "Address is required";
    }
    return errors;
  };

  const uploadImage = async (imageFile) => {
    const imageData = new FormData();
    imageData.append("file", imageFile);
    imageData.append("folder", "avatar"); // Append the folder field to the FormData

    try {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/single`,
        imageData, // Pass the FormData directly
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Image upload successful:", response.data);
      return response.data.fileUrl; // Assuming the response contains the image URL or relevant data
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error; // Re-throw the error for handling in the calling function
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

        // Create the data object, excluding avatar if no imageUrl is generated
        let data = { ...formData };

        if (uploadedImage) {
          data.avatar = uploadedImage; // Add avatar only if imageUrl is generated
        } else {
          delete data.avatar; // Remove avatar if no imageUrl is generated or if it's null
        }

        // Replace with your actual API endpoint URL
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/edit/${id}`;

        // Make the PATCH request with the updated formData
        const response = await axios.patch(apiUrl, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Form submission successful:", response.data);

        // Set success message and hide it after a few seconds
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => {
          setSuccessMessage(""); // Clear the success message after 3 seconds
        }, 3000);

        // Close modal and reset form state
        setIsModalOpen(false);
        setUser(response.data.profile);
        setFormData(response.data.profile);

        setFormErrors({
          fullName: "",
          email: "",
          phoneNumber: "",
          address: "",
          api: "", // clear API error message
        });
      } catch (error) {
        console.error("Error during form submission:", error);

        // Handle errors (e.g., display error message)
        setFormErrors({ api: "An error occurred while submitting the form." });
      }
    } else {
      setFormErrors(errors); // Show form validation errors if any
    }
  };

  return (
    <div className="max-w-[1550px] mx-auto">
      <div className="lg:px-[70px] px-[20px] pt-[28px]">
        <div className="flex  items-center ">
          <Link href="/">
            <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px]">
              Home
            </p>
          </Link>
          <div class="w-[2px] h-3 bg-black mx-2"></div>

          <Link href="/">
            <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px]">
              Categories
            </p>
          </Link>
          <div class="w-[2px] h-3 bg-black mx-2"></div>
          <Link href="/">
            <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px]">
              Tshirt
            </p>
          </Link>
          <div class="w-[1px] h-3 bg-black mx-2"></div>
          <p className="text-black text-base font-semibold font-karla  leading-[17.60px]">
            Nike Black rounded tshirt
          </p>
        </div>
        <div className="w-[95%] h-[1px]  bg-[#e6e6e6] mt-4"></div>
        <div className="flex flex-col lg:flex-row gap-[21px] mt-[103px]">
          <div className="lg:w-1/2 w-full min-h-[302px] rounded-lg shadow relative flex flex-col gap-[80px] ">
            <Image
              src={user?.user?.avatar || image}
              width={155}
              height={155}
              layout=""
              className="absolute left-[49px] top-[-80px]"
              alt=""
            />
            <div className="flex px-[37px] lg:px-[64px] pt-[93px] gap-2 lg:gap-4 xl:gap-[52px]">
              <div className="flex flex-col">
                <p className="text-black xl:text-[28px] font-bold font-karla">
                  {user?.user?.name}
                </p>
                <p className="text-black/40 xl:text-[20px] font-normal font-karla">
                  {user?.user?.username}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-black xl:text-[28px] font-bold font-karla">
                  {user?.user?.followers?.length}
                </p>
                <p className="text-black xl:text-xl font-normal font-karla leading-normal">
                  Followers
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-black xl:text-[28px] font-bold font-karla">
                  {user?.user?.following?.length}
                </p>
                <p className="text-black xl:text-[20px] font-normal font-karla">
                  Following
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-[16px]">
                  <p className="text-black xl:text-[28px] font-bold font-karla">
                    {user?.user?.rating}
                  </p>
                  <Image width={23} height={23} src="/rating.svg" alt="" />
                </div>
                <p className="text-black xl:text-[20px] font-normal font-karla">
                  Rating
                </p>
              </div>
            </div>
            <div className="px-[65px] flex gap-6">
              <div className="w-[252px] h-[39.40px] p-[13.70px] rounded-[20px] border border-[#b25cf3] justify-center items-center gap-[13.70px] inline-flex">
                <div className="text-[#b25cf3] text-[19.18px] font-bold font-karla leading-[23.02px]">
                  Share
                </div>
              </div>
              {user?.user?.self ? (
        <div
          className="w-[250px] h-[39.40px] p-[13.70px] bg-[#2fbc74] rounded-[20px] justify-center items-center gap-[13.70px] inline-flex cursor-pointer"
          onClick={handleEditClick}
        >
          <div className="text-white text-[19.18px] font-bold font-karla leading-[23.02px]">
            Edit
          </div>
        </div>
      ) : (
        <div
          className="w-[250px] h-[39.40px] p-[13.70px] bg-[#2fbc74] rounded-[20px] justify-center items-center gap-[13.70px] inline-flex cursor-pointer"
        >
          <div className="text-white text-[19.18px] font-bold font-karla leading-[23.02px]">
            Follow
          </div>
        </div>
      )}
            </div>
          </div>
          <div className="lg:w-1/2 w-full min-h-[302px] rounded-lg shadow ">
            <div className="flex flex-col px-[30px] gap-8 py-8">
              <p className="text-black text-base font-bold font-karla leading-tight ">
                Description
              </p>
              <p className="text-[#515151] text-base font-medium font-karla leading-normal">
                {user?.user?.description}
              </p>
              <p className="text-black text-base font-bold font-karla leading-tight ">
                Lives In
              </p>
              <p className=" text-[#515151] text-base font-medium font-karla leading-normal">
                {user?.user?.location}
              </p>
              <p className="text-black text-base font-bold font-karla leading-tight ">
                Joined Kuku
              </p>
              <p className=" text-[#515151] text-base font-medium font-karla leading-normal">
                {format(user?.user?.joinedOn)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* Modal Content Here */}
        <div className="flex min-h-fit flex-col items-center p-4 md:p-6">
          <h2 className="text-[#070707] text-[22.91px] font-bold font-karla leading-7 pb-[20px] md:pb-[57px]">
            Edit Profile
          </h2>
          <div className="w-[80px] h-[80px] md:w-[114px] md:h-[114px] rounded-full bg-[#fde504] flex justify-center items-center relative">
            {/* Profile Image */}
            <Image
              unoptimized
              width={100}
              height={100}
              className="rounded-full object-cover"
              src={
                typeof window !== "undefined" && formData.avatar instanceof File
                  ? URL.createObjectURL(formData.avatar)
                  : user?.user?.avatar
                  ? user?.user?.avatar
                  : imageSrc
              }
              alt="Profile Picture"
            />

            {/* Hidden file input to change the image */}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />

            {/* Edit Icon in the bottom-right corner */}
            <div className="absolute bottom-0 right-0 w-[20px] h-[20px] md:w-[30px] md:h-[30px] bg-white rounded-full flex justify-center items-center cursor-pointer">
              <Image
                unoptimized
                width={24}
                height={24}
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
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-4 w-full max-w-xs md:max-w-md"
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border rounded-[13px] w-full p-2 bg-[#F7F7F7]"
                placeholder="Full Name"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              )}
            </div>
            <div className="mt-4">
              <input
                className="border rounded-[13px] w-full p-2 bg-[#F7F7F7]"
                placeholder="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
            <div className="mt-4">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border rounded-[13px] w-full p-2 bg-[#F7F7F7]"
                placeholder="Phone Number"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm">{formErrors.phone}</p>
              )}
            </div>
            <div className="mt-4">
              <textarea
                rows={2}
                className="border rounded-[13px] w-full p-2 bg-[#F7F7F7] resize-none"
                placeholder="Address"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
              {formErrors.location && (
                <p className="text-red-500 text-sm">{formErrors.location}</p>
              )}
            </div>
            <div className="mt-4 flex justify-center w-full">
              <button
                type="submit"
                className="bg-yellow-500 text-white rounded-[13px] px-4 py-2 w-full"
              >
                Save Details
              </button>
            </div>
          </form>
        </div>
      </Modal>
     {/* Success notification */}
     {successMessage && (
       <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded shadow-lg z-50 transition-opacity duration-500">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;

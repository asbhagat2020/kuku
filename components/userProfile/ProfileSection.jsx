"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import Modal from './Modal'; // Adjust the import path as needed
import Link from 'next/link';

const ProfileSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('/kuku-suit 2.png');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
        }
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
    });
    const [formErrors, setFormErrors] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
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
        if (!formData.fullName.trim()) {
            errors.fullName = 'Full Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Phone Number must be 10 digits';
        }
        if (!formData.address.trim()) {
            errors.address = 'Address is required';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // No errors, proceed to submit the form
            console.log('Form data:', formData);
            setIsModalOpen(false);
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                address: '',
            })
            setFormErrors({
                fullName: '',
                email: '',
                phoneNumber: '',
                address: '',
            })
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className='max-w-[1550px] mx-auto'>
            <div className='lg:px-[70px] px-[20px] pt-[28px]'>
                <div className='flex  items-center '>
                    <Link href='/'>
                        <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px]">Home</p></Link>
                    <div class="w-[2px] h-3 bg-black mx-2"></div>

                    <Link href='/'>
                        <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px]">Categories</p></Link>
                    <div class="w-[2px] h-3 bg-black mx-2"></div>
                    <Link href='/'>
                        <p className="text-[#6a6a6a] text-base font-normal font-karla underline leading-[17.60px]">Tshirt</p></Link>
                    <div class="w-[1px] h-3 bg-black mx-2"></div>
                    <p className="text-black text-base font-semibold font-karla  leading-[17.60px]">Nike Black rounded tshirt</p>
                </div>
                <div className='w-[95%] h-[1px]  bg-[#e6e6e6] mt-4'></div>
                <div className='flex flex-col lg:flex-row gap-[21px] mt-[103px]'>
                    <div className='lg:w-1/2 w-full min-h-[302px] rounded-lg shadow relative flex flex-col gap-[80px] '>
                        <Image src="profile_icon.svg" width={155} height={155} layout="" className='absolute left-[49px] top-[-80px]' alt='' />
                        <div className='flex px-[64px] pt-[93px] gap-2 lg:gap-4 xl:gap-[52px] '>
                            <div className='flex flex-col'>
                                <p className="text-black xl:text-[28px] font-bold font-karla">Rohan</p>
                                <p className="text-black/40 xl:text-[20px] font-normal font-karla">Kuku1222</p>
                            </div>
                            <div className='flex flex-col'>
                                <p className="text-black xl:text-[28px] font-bold font-karla">53</p>
                                <p className="text-black xl:text-xl font-normal font-karla leading-normal">Followers</p>
                            </div>
                            <div className='flex flex-col'>
                                <p className="text-black xl:text-[28px] font-bold font-karla">453</p>
                                <p className="text-black xl:text-[20px] font-normal font-karla">Following</p>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex gap-[16px]'>
                                    <p className="text-black xl:text-[28px] font-bold font-karla">4.7</p>
                                    <Image width={23} height={23} src='rating.svg' alt='' />
                                </div>
                                <p className="text-black xl:text-[20px] font-normal font-karla">Rating</p>
                            </div>
                        </div>
                        <div className='px-[65px] flex gap-6'>
                            <div className="w-[252px] h-[39.40px] p-[13.70px] rounded-[20px] border border-[#b25cf3] justify-center items-center gap-[13.70px] inline-flex">
                                <div className="text-[#b25cf3] text-[19.18px] font-bold font-karla leading-[23.02px]">Share</div>
                            </div>
                            <div
                                className="w-[250px] h-[39.40px] p-[13.70px] bg-[#2fbc74] rounded-[20px] justify-center items-center gap-[13.70px] inline-flex cursor-pointer"
                                onClick={handleEditClick}
                            >
                                <div className="text-white text-[19.18px] font-bold font-karla leading-[23.02px]">Edit</div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/2 w-full min-h-[302px] rounded-lg shadow '>
                        <div className='flex flex-col px-[30px] gap-8 py-8'>
                            <p className="text-black text-base font-bold font-karla leading-tight ">Description</p>
                            <p className="text-[#515151] text-base font-medium font-karla leading-normal">Discover your unique style with our curated collection at my feed. I offer a diverse range of trendy and timeless pieces, from chic dresses and casual wear to statement accessories and footwear.</p>
                            <p className="text-black text-base font-bold font-karla leading-tight ">Lives In</p>
                            <p className=" text-[#515151] text-base font-medium font-karla leading-normal">Dubai, UAE</p>
                            <p className="text-black text-base font-bold font-karla leading-tight ">Joined Kuku</p>
                            <p className=" text-[#515151] text-base font-medium font-karla leading-normal">1 year Ago</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {/* Modal Content Here */}
                <div className='flex min-h-fit flex-col items-center'>
                    <h2 className="text-[#070707] text-[22.91px] font-bold font-karla leading-7 pb-[57px]">Edit Profile</h2>
                    <div className='w-[114px] h-[114px] rounded-full bg-[#fde504] flex justify-center items-center relative'>
                        {/* Profile Image */}
                        <Image unoptimized width={100} height={100} className='rounded-full object-cover' src={imageSrc} alt='Profile Picture' />

                        {/* Hidden file input to change the image */}
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                        />

                        {/* Edit Icon in the bottom-right corner */}
                        <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-white rounded-full flex justify-center items-center cursor-pointer">
                            <Image unoptimized width={24} height={24} src={'/edit.png'} alt='Edit' />
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4">
                        <div>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="border rounded-[13px] w-full p-2 bg-[#F7F7F7]"
                                placeholder='Full Name'
                            />
                            {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
                        </div>
                        <div className="mt-4">
                            <input className="border rounded-[13px] w-full p-2 bg-[#F7F7F7]" placeholder="Email address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange} />
                            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="border rounded-[13px] w-full p-2 bg-[#F7F7F7]"
                                placeholder='Phone Number'
                            />
                            {formErrors.phoneNumber && <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>}
                        </div>
                        <div className="mt-4">
                            <textarea rows={2} className="border rounded-[13px]  w-full p-2 bg-[#F7F7F7] resize-none " placeholder="Add Address" name="address"
                                value={formData.address} onChange={handleInputChange} />
                            {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                        </div>
                        <div className="mt-4 flex justify-center w-[400px]">
                            <button type="submit" className="bg-yellow-500 text-white rounded-[13px] px-4 py-2 mr-2 w-[400px]" >Save Details</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ProfileSection;

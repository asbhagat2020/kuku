"use client"; // Ensure Client-Side rendering

import { useState } from "react";

export default function Account() {
  // State variables for form inputs
  const [KukuUsername, setKukuUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [Description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form data
    console.log({ KukuUsername, fullName, Description, location, isChecked });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col md:flex-row h-[800px]">
      {/* Left Image Section */}
      <div className="w-1/2 bg-gray-100">
        <img
          src="/bag-promotional-image-bag-advertising-image-fashion-banner-poster-fashion-banner-fashion-shop-banner 2.png"
          alt="Promotional"
          className="w-[703px] h-[800px] object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-[150px] py-2">
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-8">
          <img src="/Group1.svg" alt="KUKU Logo" className="h-14 w-14" />
          <div className="text-black text-3xl font-['Palanquin Dark'] font-bold">KUKU</div>
        </div>

        <div className="text-black text-xl font-karla font-bold mb-6">
          Let’s set your account up
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* Kuku Username */}
          <div className="mb-4">
            <label className="text-black text-base font-karla font-bold mb-2 block">
              Kuku Username
            </label>
            <input
              type="text"
              placeholder="Enter your Kuku username"
              value={KukuUsername}
              onChange={(e) => setKukuUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg"
              required
            />
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="text-black text-base font-karla font-bold mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="text-black text-base font-karla font-bold mb-2 block">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter a brief description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="text-black text-base font-karla font-bold mb-2 block">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg"
              required
            />
          </div>

          {/* Checkbox */}
          <div className="flex flex-col items-start h-1 mb-12">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className=" text-black text-sm font-normal font-karla leading-none">
                By clicking here, Kuku lets you disclose your full name, but your Kuku username will be visible to all.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-yellow-400 text-black font-semibold font-karla rounded-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

import Image from "next/image";
import React, { useState } from "react";
import DraggableProgressBar from "./DraggableProgressBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomDateInput from "./CustomDateInput";
import CustomTimeInput from "./CustomTimeInput";

const KukuitMain = () => {
  const Modal = ({ onClose }) => {
    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={handleOutsideClick} // Close on outside click
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
            Sit back & relax while we send an email confirmation from our team
            for the further steps
          </div>
          {/* <div className="mt-6 flex justify-end">
                        <button onClick={onClose} className="bg-[#e4086f] text-white py-2 px-4 sm:px-6 rounded-lg font-karla text-sm sm:text-base">Close</button>
                    </div> */}
        </div>
      </div>
    );
  };

  const [submit, setSubmit] = useState(false);
  const [modal, setModal] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const router = useRouter();
  const validateForm = () => {
    let newErrors = {};
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number is invalid";
    if (submit) {
      if (!formData.date) newErrors.date = "Date is required";
      if (!formData.time) newErrors.time = "Time is required";
      if (!formData.agreeTerms)
        newErrors.agreeTerms = "You must agree to the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = () => {
    if (validateForm()) {
      setSubmit(true);
    }
  };

  const handleConfirmClick = () => {
    if (validateForm()) {
      setModal(true);
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    router.push("/");
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
        <div className="px-4 sm:px-8 lg:px-[94px] mt-8 sm:mt-[56px]">
          {submit ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
                  Choose the number of items
                </p>
                <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
                  Step 2 of 3
                </p>
              </div>
              <DraggableProgressBar />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 sm:mt-[76px] mb-4">
                <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
                  Choose the pickup date
                </p>
                <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
                  Step 3 of 3
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-[56px] mt-4 sm:mt-[56px]">
                {/* <div className="relative w-full sm:w-1/2">
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date || ""}
                                        onChange={handleInputChange}
                                        className="w-full h-[50px] border-2 rounded-lg px-5 text-gray-700"
                                    />
                                    {!formData.date && (
                                        <label
                                            htmlFor="date"
                                            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                                        >
                                            Choose pickup time
                                        </label>
                                    )}
                                    {errors.date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                                    )}
                                </div> */}
                <CustomDateInput
                  placeholder="Choose pickup date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  error={errors.date}
                />

                <CustomTimeInput
                  value={formData.time}
                  onChange={handleInputChange}
                  name="time"
                  error={errors.time}
                />
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
                  onClick={handleConfirmClick}
                  className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
                >
                  Confirm Pickup
                </button>
                <Link href={"/"}>
                  <button className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla">
                    Cancel
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">
                  Pickup Details
                </p>
                <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">
                  Step 1 of 3
                </p>
              </div>
              <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla">
                Please enter your pickup details
              </p>
              <div className="w-full h-[200px] sm:h-[392px] mt-6 sm:mt-[36px] shadow">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3613.8073542448806!2d55.1406664!3d25.0745178!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1728306215066!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]">
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  {/* Country */}
                  <div className="flex flex-col">
                    <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                      Country
                    </p>
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
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div className="flex flex-col">
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
                      <option value="dubai">Dubai</option>
                      <option value="abudhabi">Abu Dhabi</option>
                      <option value="sharjah">Sharjah</option>
                      <option value="ajman">Ajman</option>
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* Address Line 1 */}
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.addressLine1}
                      </p>
                    )}
                  </div>

                  {/* Address Line 2 */}
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
                  {/* First Name */}
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <style jsx>{`
                @media (max-width: 768px) {
                  /* Adjust this value based on your mobile breakpoint */
                  .flex-col {
                    flex-direction: column;
                  }
                  .flex-row {
                    flex-direction: column; /* Stack columns on mobile */
                  }
                }
              `}</style>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
                <button
                  onClick={handleClick}
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
          )}
        </div>
      </div>
      {modal && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default KukuitMain;

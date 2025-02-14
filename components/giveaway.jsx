'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import clothHangerAnimation from '../public/lottieFiles/cloth_hanger.json';
import playgroundAnimation from '../public/lottieFiles/playground.json';
import giftboxAnimation from '../public/lottieFiles/giftbox.json';
import homeAnimation from '../public/lottieFiles/kukuhomenew.json';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showSuccessNotification } from '@/utils/Notification/notif';

const AddressSelection = ({ addresses, selectedAddress, onSelect, onAddNew }) => {
  return (
    <div className="space-y-4">
      {addresses.map((address, index) => (
        <div
          key={index}
          onClick={() => onSelect(address)}
          className={`p-4 border-2 rounded-lg cursor-pointer ${
            selectedAddress === address ? 'border-green-500' : 'hover:border-green-500'
          }`}
        >
          <p className="font-bold">{`${address.firstName} ${address.lastName}`}</p>
          <p>{address.addressLine1}</p>
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          <p>{`${address.city}, ${address.country}`}</p>
        </div>
      ))}
      <button
        onClick={onAddNew}
        className="w-full p-4 border-2 border-dashed rounded-lg text-center hover:border-green-500"
      >
        + Add New Address
      </button>
    </div>
  );
};

const Giveaway = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pickTime: '',
    firstName: '',
    lastName: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    weight: '',
    items: [],
    category: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [sampleAddresses, setSampleAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAddress = async () => {
    try {
      const token = JSON.parse(Cookies.get('auth'));

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pickup/get`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      setSampleAddresses(response?.data?.addresses);
    } catch (err) {
      console.log(err);

      if (err.response && err.response.status === 401) {
        // If unauthorized, clear token and redirect to homepage
        Cookies.remove('auth');
        router.push('/');
      } else {
        console.log('error');
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    if (currentStep === 2) {
      if (!formData.firstName.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    } else if (currentStep === 3 && showAddressForm) {
      if (!formData.addressLine1) errors.addressLine1 = 'Address Line 1 is required';
      if (!formData.city) errors.city = 'City is required';
      if (!formData.country) errors.country = 'Country is required';
      if (!formData.pickTime) errors.pickTime = 'Pick time is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (!validateForm()) return;
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
    setShowFinalScreen(true);
    const finalData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,

      address: selectedAddress
        ? `${selectedAddress.addressLine1}, ${selectedAddress.addressLine2}, ${selectedAddress.city}, ${selectedAddress.country}`
        : `${formData.addressLine1}, ${formData.addressLine2}, ${formData.city}, ${formData.country}`,

      pickupTime: formData.pickTime,
      numberOfItems: formData.weight,
      items: formData.items,
      category: formData.category,
    };
    try {
      console.log(finalData, 'finaldata');
      const token = JSON.parse(Cookies.get('auth'));

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/giveaways/giveaways`, finalData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response, 'llllllllll');
      if (response.status === 201) {
        showSuccessNotification('Giveaway Created successfully');
      } else {
        throw new Error(response.data.message || 'Failed to create order');
      }
    } catch (error) {
      console.log(error, 'failed to create an giveaway');
    }
    // console.log('Final Form Data:', finalData);
  };

  const handleFinalScreenClick = () => {
    setShowFinalScreen(false);
    setCurrentStep(1);
    setFormData({
      name: '',
      phone: '',
      address: '',
      pickTime: '',
      firstName: '',
      lastName: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      items: [],
      category: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleItemsChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      items: prev.items.includes(value)
        ? prev.items.filter((item) => item !== value) // Remove if already selected
        : [...prev.items, value], // Add new item
    }));
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 font-karla">
              Reuse Repurpose Recycle, let KuKu handle your textile by giving the reusable to charity or recycling them
              partnered with textile recyclers.
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
            <h2 className="text-2xl font-bold mb-12 text-center font-karla">Fill Up the details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {formErrors.firstName && <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.firstName}</p>}
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {formErrors.lastName && <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.lastName}</p>}
              </div>
              <div className="col-span-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.email}</p>}
              </div>
              <div className="col-span-1">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {formErrors.phone && <p className="text-red-500 text-sm mt-1 ml-4">{formErrors.phone}</p>}
              </div>
            </div>
            <div className="text-center mt-12">
              <button
                onClick={handleNext}
                className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition border border-black"
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
              <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">Pickup Details</p>
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
                  setFormData({
                    ...formData,
                    addressLine1: address.addressLine1,
                    addressLine2: address.addressLine2,
                    city: address.city,
                    country: address.country,
                  });
                }}
                onAddNew={() => {
                  setShowAddressForm(true);
                  setSelectedAddress(null);
                  setFormData({
                    ...formData,
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    country: '',
                  });
                }}
              />
            </div>
            {showAddressForm && (
              <div className="flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]">
                <div className="w-full flex flex-col gap-6">
                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Country</p>
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
                      {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">City</p>
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
                      {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-6">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Address Line 1</p>
                      <input
                        maxLength={25}
                        placeholder="Enter your address line 1"
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                      />
                      {formErrors.addressLine1 && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.addressLine1}</p>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Address Line 2</p>
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
                </div>
              </div>
            )}
            <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-6">
              <div className="flex-1 flex flex-col">
                <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Time</p>
                <select
                  name="pickTime"
                  value={formData.pickTime}
                  onChange={handleInputChange}
                  className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
                    formErrors.pickTime ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select pickup time</option>
                  <option value="morning">9:30-12:00</option>
                  <option value="afternoon">12:00-4:00</option>
                  <option value="evening">4:00-8:00</option>
                </select>
                {formErrors.pickTime && <p className="text-red-500 text-sm mt-1">{formErrors.pickTime}</p>}
              </div>

              <div className="flex-1 flex flex-col">
                <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Number of items</p>
                <input
                  maxLength={25}
                  placeholder="Enter number of items"
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                />
              </div>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-6">
              <div className="flex-1 flex flex-col">
                <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Items</p>
                <select
                  name="items"
                  onChange={handleItemsChange}
                  className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                >
                  <option value="">Select Item</option>
                  <option value="cloths">Clothes</option>
                  <option value="curtain">Curtains</option>
                  <option value="bedsheet">Bedsheets</option>
                </select>

                {/* Display Selected Items */}
                {formData.items.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-karla font-bold">Selected Items:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.items.map((item) => (
                        <span key={item} className="bg-gray-200 text-sm px-3 py-1 rounded-lg flex items-center gap-2">
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

              <div className="flex-1 flex flex-col">
                <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Category</p>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla ${
                    formErrors.category ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Reusable">Reusable</option>
                  <option value="Repurposeable">Repurposeable</option>
                  <option value="Recyclable">Recyclable</option>
                </select>
                {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]">
              <button
                onClick={handleFinalScreen}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla"
              >
                List Now
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
      currentStep === 1 ? homeAnimation : currentStep === 2 ? clothHangerAnimation : playgroundAnimation;

    if (isMobileView) {
      return (
        <div className="absolute inset-0 w-full h-full">
          <Lottie
            loop
            play
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            animationData={animationData}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              position: 'absolute',
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
          <div className="fixed inset-0 w-screen h-screen">{renderLottieAnimation()}</div>

          <div className="relative z-10 w-full max-w-7xl px-6 pt-4">
            <div className="flex justify-between items-center mb-8">
              <Link href="/">
                <img src="/gv_arrow.png" alt="Back" className="w-8 h-8" />
              </Link>
              <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
            </div>

            <div className="w-full md:w-[88%] flex justify-center items-center mb-12 mx-auto">
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  onClick={() => goToStep(step)}
                  className={`w-1/3 h-1 mx-3 cursor-pointer ${
                    currentStep >= step ? 'bg-green-500' : 'bg-gray-300'
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
          </div>
          <button className="px-8 py-2 mt-8 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition relative z-10">
            Share on social
          </button>
          <Lottie
            loop
            play
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            animationData={giftboxAnimation}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              position: 'absolute',
              left: 0,
              top: 0,
              marginBottom: '10px',
            }}
          />
          <button className="absolute top-4 right-4 z-10">
            <img src="/help_gv.png" alt="Help" className="w-24 h-8" />
          </button>
        </div>
      )}
    </>
  );
};

export default Giveaway;

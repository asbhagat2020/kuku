import Image from "next/image";
import React, { useEffect, useState } from "react";
import DraggableProgressBar from "./DraggableProgressBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomDateInput from "./CustomDateInput";
import Cookies from 'js-cookie';
import axios from "axios";
import toast from 'react-hot-toast';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';

// import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
// const useMapEvents = dynamic(() => import('react-leaflet').then(mod => mod.useMapEvents), { ssr: false });
let L;
if (typeof window !== "undefined") {
  L = require('leaflet');
}



const KukuitMain = () => {
  const notify = () => toast.success('Please Login');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
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

  // const defaultMarkerIcon = new L.Icon({
  //   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  //   shadowSize: [41, 41],
  // });

  const [markerIcon, setMarkerIcon] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined" && L) {
      const icon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
      });
      setMarkerIcon(icon); // Set the marker icon in state
    }
  }, []);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
          await fetchAddress(latitude, longitude);
        },
        (err) => console.error('Geolocation error:', err)
      );
    }
  }, []);

  // Function to reverse geocode coordinates
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCl2ftJURDx6LbMCxcXzpVZ-KFXJNT7DfY`
      );
      const data = await response.json();
      if (data?.results?.length > 0) {
        const formattedAddress = data?.results[0]?.formatted_address;
        setAddress(formattedAddress);
        setLocation({ latitude, longitude });
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    if (addressType && address) {
      const addressarry = address?.split(",")
      setFormData((prevData) => ({
        ...prevData,          // Spread the previous form data
        country: addressarry[addressarry?.length - 1],
        city: addressarry?.length > 2 ? addressarry[addressarry?.length - 3] + "," + addressarry[addressarry?.length - 2] : addressarry[addressarry?.length - 2],
        addressLine1: addressarry?.length > 3 ? addressarry[addressarry?.length - 4] : "",
        addressLine2: addressarry?.length > 4 ? addressarry[addressarry?.length - 5] : "",    // Update the country field with the new value
      }));
    }
  }, [addressType, address])



  function MapClickHandler() {
    console.log("function called");

    const map = useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        console.log("Map clicked", lat, lng);
        setMarkerPosition([lat, lng]); // Update marker position
        fetchAddress(lat, lng); // Fetch address for the clicked coordinates
      },
    });
    console.log("map", map);

    return null; // This component doesn't render anything itself
  }
  console.log("address", address);


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





  const router = useRouter();
  // const validateStep2 = () => {
  //   let newErrors = {};
  //   if (!formData.date) newErrors.date = "Date is required";
  //   if (!formData.time) newErrors.time = "Time is required";
  //   if (!formData.agreeTerms)
  //     newErrors.agreeTerms = "You must agree to the terms";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const validateForm = () => {
  //   let newErrors = {};
  //   if (!formData.country) newErrors.country = "Country is required";
  //   if (!formData.city) newErrors.city = "City is required";
  //   if (!formData.addressLine1)
  //     newErrors.addressLine1 = "Address Line 1 is required";
  //   if (!formData.firstName) newErrors.firstName = "First name is required";
  //   if (!formData.lastName) newErrors.lastName = "Last name is required";
  //   if (!formData.email) newErrors.email = "Email is required";
  //   else if (!/\S+@\S+\.\S+/.test(formData.email))
  //     newErrors.email = "Email is invalid";
  //   if (!formData.phone) newErrors.phone = "Phone number is required";
  //   else if (!/^\d{10}$/.test(formData.phone))
  //     newErrors.phone = "Phone number is invalid";
  //   if (submit) {
  //     if (!formData.date) newErrors.date = "Date is required";
  //     if (!formData.time) newErrors.time = "Time is required";
  //     if (!formData.agreeTerms)
  //       newErrors.agreeTerms = "You must agree to the terms";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };


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

  // const validateStep1 = () => {
  //   if (selectedScale === null && customNumber === "") {
  //     return false;
  //   }


  //   if (selectedScale === null && customNumber !== "") {
  //     return false;
  //   }

  //   return true;
  // };

const validateStep1 = () => {
  if (!selectedScale || selectedScale < 5) {
    setErrors({ numberOfItems: "Please select at least 5 items" });
    return false;
  }
  return true;
};

  const handleClick = () => {
    if (validateForm()) {
      setSubmit(true);
      setCurrentStep(3);
    }
  };

  // const handleConfirmClick = async () => {
  //   if (!validateForm()) return; // Exit if the form is invalid

  //   try {
  //     // Prepare the data to be sent
  //     const details = {
  //       numberOfItems: selectedScale,
  //       pickupDate: new Date(formData.date).getTime(),
  //       pickupTime: formData.time,

  //       // Replace with your form data
  //     };

  //     const pickupLocation = {
  //       country: formData.country,
  //       city: formData.city,
  //       addressLine1: formData.addressLine1,
  //       addressLine2: formData.addressLine2,
  //       firstName: formData.firstName, // Replace with your form data
  //       lastName: formData.lastName,
  //       email: formData.email, // Replace with your form data
  //       phone: formData.phone,
  //     };


  //     console.log("Cookies.get('auth')", Cookies.get('auth'));

  //     if (Cookies.get('auth')) {
  //       // Get token from cookies
  //       const token = JSON.parse(Cookies.get('auth'));
  //       console.log("token", token);

  //       // Make the API call
  //       const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/kukuits/add`, // Replace with your endpoint
  //         { details, pickupLocation },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       // Handle successful response
  //       if (response.status === 201 || response.status === 200) {
  //         setModal(true); // Show the modal on success
  //       } else {
  //         console.error("Failed to add kukuit:", response.statusText);
  //       }
  //     }
  //     else {
  //       notify();
  //     }
  //   } catch (error) {
  //     // Handle errors
  //     console.error("An error occurred:", error.message);
  //   }
  // };

const handleConfirmClick = async () => {
  if (!validateForm()) return; // Exit if form validation fails

  try {
    // Prepare the data to send
    const details = {
      numberOfItems: selectedScale, // Ensure this is a number >= 5
      pickupDate: formData.date, // Send as ISO string (e.g., "2025-07-13")
      pickupTime: formData.time, // Ensure this is a non-empty string
      variation: "", // Optional: Add default or dynamic value if needed
      Amount: 0, // Default value as per schema
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

    // Log payload for debugging
    console.log("Payload:", { ...details, pickupLocation });

    if (Cookies.get("auth")) {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/kukuits/add`,
        { ...details, pickupLocation }, // Send as a single object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setModal(true); // Show success modal
      } else {
        console.error("Failed to add kukuit:", response.statusText);
        toast.error("Failed to schedule pickup");
      }
    } else {
      notify(); // Show login prompt
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




  const renderStepContent = (markerPosition) => {
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
            {/* <DraggableProgressBar setSelectedScale={setSelectedScale} /> */}
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
                <p className="text-red-500 text-sm mt-1">Please select either from scale or enter the number of items manually</p>
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
              {/* <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3613.8073542448806!2d55.1406664!3d25.0745178!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1728306215066!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe> */}

              <MapContainer
                center={markerPosition}
                zoom={13}
                // style={{ width: '100%', height: '450px' }}
                className="w-full h-full"

              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* MapClickHandler listens for map click events */}
                <MapClickHandler />


                {markerIcon && (  // Ensure the icon is set before rendering the marker
                  <Marker position={markerPosition} icon={markerIcon}>
                    <Popup>{address}</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
            <div>
              <button style={{ color: "rgb(228 8 111 / var(--tw-bg-opacity))" }} onClick={() => setAddressType(!addressType)}>Select address from Map</button>
            </div>
            <div className="flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]">
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    Country
                  </p>

                  {addressType ?
                    <input
                      maxLength={25}
                      placeholder="Enter your address line 1"
                      type="text"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                    /> : <select
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
                    </select>}


                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">
                    City
                  </p>
                  {addressType ?
                    <input
                      maxLength={25}
                      placeholder="Enter your address line 1"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla"
                    /> : <select
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
                    </select>}
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.addressLine1}
                    </p>
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
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
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${modal ? "opacity-50" : "opacity-100"
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

        {/* Step Indicator */}
        <div className="flex justify-center gap-4 mt-8">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => handleStepClick(step)}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${step === currentStep
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
          {renderStepContent(markerPosition)}
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
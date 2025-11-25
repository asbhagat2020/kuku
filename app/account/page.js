

// "use client"; // Ensure Client-Side rendering

// import { updateDetails } from "@/store/auth/authSlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";

// export default function Account() {
//   // State variables for form inputs
//   const [KukuUsername, setKukuUsername] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [Description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [isChecked, setIsChecked] = useState(false);
//   const [id, setId] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const dispatch = useDispatch();
//   const name = useSelector((state) => state.auth.user);
//   const router = useRouter();

//   // Fetch user data from Redux and update local state on component load
//   useEffect(() => {
//     if (name) {
//       setKukuUsername(name?.username || "");
//       setFullName(name?.name || "");
//       setId(name?._id || "");
//       // If phone exists, strip +971 for display (local UAE number only)
//       setPhone(name?.phone ? name.phone.replace("+971", "") : "");
//       setDescription(name?.description || "");
//       setLocation(name?.location || "");
//       setIsChecked(name?.anonymous || false); // Set checkbox based on anonymous field
//     }
//   }, [name]);

//   // Phone number validation function (same as login/registration)
//   const validatePhoneNumber = (phoneNumber) => {
//     const phoneRegexUAE = /^[5][0-9]{8}$/; // UAE local: 9 digits starting with 5
//     if (!phoneNumber) {
//       return "Phone number is required";
//     }
//     if (!phoneRegexUAE.test(phoneNumber)) {
//       return "Please enter a valid 9-digit UAE number starting with 5 (e.g., 543781819)";
//     }
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setIsLoading(true);

//     // Validate phone number before submission
//     const phoneError = validatePhoneNumber(phone);
//     if (phoneError) {
//       setErrors({ phone: phoneError });
//       setIsLoading(false);
//       return;
//     }

//     console.log({
//       KukuUsername,
//       fullName,
//       Description,
//       phone,
//       location,
//       isChecked,
//     });

//     const resultAction = await dispatch(
//       updateDetails({
//         KukuUsername,
//         fullName,
//         Description,
//         phone: `+971${phone}`, // Add +971 for backend
//         location,
//         isChecked,
//         id,
//       })
//     );

//     console.log("Result Action:", resultAction); // Debug log

//     if (updateDetails.fulfilled.match(resultAction)) {
//       // toast.success("Details updated successfully!");
//       router.push("/");
//     } else if (updateDetails.rejected.match(resultAction)) {
//       const errorData = resultAction.payload;

//       // If there's a specific field error (like username), highlight that field
//       if (errorData?.field) {
//         setErrors({
//           [errorData.field]: errorData.message,
//         });
//       } else {
//         setErrors({ general: errorData?.message || "Failed to update details" });
//       }

//       // Toast is already handled in authSlice, but you can reinforce here if needed
//       console.error("Update failed:", errorData?.message);
//     }

//     setIsLoading(false);
//   };

//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   const handleUsernameChange = (e) => {
//     setKukuUsername(e.target.value);
//     // Clear username error when user starts typing
//     if (errors.username) {
//       setErrors((prev) => ({ ...prev, username: null }));
//     }
//   };

//   const handlePhoneChange = (e) => {
//     const inputValue = e.target.value;
//     // Only allow numbers (no +, spaces, or other characters)
//     const filteredValue = inputValue.replace(/[^0-9]/g, "");
//     setPhone(filteredValue);

//     // Clear phone error when user starts typing
//     if (errors.phone) {
//       setErrors((prev) => ({ ...prev, phone: null }));
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-[800px]">
//       {/* Left Image Section */}
//       <div className="w-1/2 bg-gray-100">
//         <img
//           src="/bag-promotional-image-bag-advertising-image-fashion-banner-poster-fashion-banner-fashion-shop-banner 2.png"
//           alt="Promotional"
//           className="w-[703px] h-[800px] object-cover"
//         />
//       </div>

//       {/* Right Form Section */}
//       <div className="w-1/2 flex flex-col justify-center items-center px-[150px] py-2">
//         {/* Logo Section */}
//         <div className="flex items-center gap-2 mb-8">
//           <img src="/Group1.svg" alt="KUKU Logo" className="h-14 w-14" />
//           <div className="text-black text-3xl font-['Palanquin Dark'] font-bold">
//             KUKU
//           </div>
//         </div>

//         <div className="text-black text-xl font-karla font-bold mb-6">
//           Let&#39;s set your account up
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="w-full max-w-md">
//           <div className="mb-4">
//             <label className="text-black text-base font-karla font-bold mb-2 block">
//               Kuku Username
//             </label>
//             <input
//               type="text"
//               value={KukuUsername}
//               readOnly
//               className="w-full p-3 border border-gray-300 bg-gray-200 cursor-not-allowed rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none"
//             />
//             <p className="text-gray-500 text-xs mt-1">
//               Your KuKu username cannot be changed.
//             </p>
//             {errors.username && (
//               <p className="text-red-500 text-xs mt-1">{errors.username}</p>
//             )}
//           </div>

//           {/* Full Name */}
//           <div className="mb-4">
//             <label className="text-black text-base font-karla font-bold mb-2 block">
//               Full Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none"
//               required={!isChecked} // Optional if anonymous
//             />
//           </div>

//           {/* Phone Number */}
//           <div className="mb-4">
//             <label className="text-black text-base font-karla font-bold mb-2 block">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               placeholder="Enter your UAE phone number (e.g., 543781819)"
//               value={phone}
//               onChange={handlePhoneChange}
//               className={`w-full p-3 border ${
//                 errors.phone ? "border-red-500" : "border-gray-300"
//               } bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none`}
//               required
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
//             )}
//             <p className="text-gray-500 text-xs mt-1">
//               Enter a 9-digit UAE phone number starting with 5 (e.g., 543781819).
//             </p>
//           </div>

//           {/* Checkbox */}
//           <div className="flex flex-col items-start h-auto mb-12">
//             <label className="flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={handleCheckboxChange}
//                 className="mr-2"
//               />
//               <span className="text-black text-sm font-normal font-karla leading-none">
//                 Stay Anonymous
//               </span>
//             </label>
//             <span className="text-black text-xs font-normal font-karla leading-none mt-1 ml-6">
//               If checked, KuKu will only show your KuKu identity and not your
//               full name.
//             </span>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full p-3 ${
//               isLoading ? "bg-gray-400" : "bg-yellow-400"
//             } text-black font-semibold font-karla rounded-lg`}
//           >
//             {isLoading ? "Updating..." : "Continue"}
//           </button>
//           {errors.general && (
//             <p className="text-red-500 text-xs mt-2">{errors.general}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }







"use client"; // Ensure Client-Side rendering

import { updateDetails } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

export default function Account() {
  // State variables for form inputs
  const [KukuUsername, setKukuUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [Description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [id, setId] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user);
  const router = useRouter();

  // Fetch user data from Redux and update local state on component load
  useEffect(() => {
    if (name) {
      setKukuUsername(name?.username || "");
      setFullName(name?.name || "");
      setId(name?._id || "");
      // If phone exists, strip +971 for display (local UAE number only)
      setPhone(name?.phone ? name.phone.replace("+971", "") : "");
      setDescription(name?.description || "");
      setLocation(name?.location || "");
      setIsChecked(name?.anonymous || false); // Set checkbox based on anonymous field
    }
  }, [name]);

  // Validation functions
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegexUAE = /^[5][0-9]{8}$/; // UAE local: 9 digits starting with 5
    if (!phoneNumber) {
      return "Phone number is required";
    }
    if (!phoneRegexUAE.test(phoneNumber)) {
      return "Please enter a valid 9-digit UAE number starting with 5 (e.g., 543781819)";
    }
    return null;
  };

  const validateFullName = (fullNameValue, anonymous) => {
    if (!anonymous && (!fullNameValue || fullNameValue.trim() === '')) {
      return "Full name is required";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Client-side validations
    const phoneError = validatePhoneNumber(phone);
    const fullNameError = validateFullName(fullName, isChecked);

    if (phoneError) {
      setErrors({ phone: phoneError });
      setIsLoading(false);
      return;
    }

    if (fullNameError) {
      setErrors({ fullName: fullNameError });
      setIsLoading(false);
      return;
    }

    console.log({
      KukuUsername,
      fullName,
      Description,
      phone: `+971${phone}`,  // Log prefixed for debug
      location,
      isChecked,
      id,
    });

    const resultAction = await dispatch(
      updateDetails({
        KukuUsername,
        fullName,
        Description,
        phone: `+971${phone}`, // Add +971 for backend
        location,
        isChecked,
        id,
      })
    );

    console.log("Result Action:", resultAction); // Debug log

    if (updateDetails.fulfilled.match(resultAction)) {
      toast.success("Details updated successfully!");  // Uncommented for feedback
      router.push("/");
    } else if (updateDetails.rejected.match(resultAction)) {
      const errorData = resultAction.payload;

      // If there's a specific field error (like username), highlight that field
      if (errorData?.field) {
        setErrors({
          [errorData.field]: errorData.message,
        });
      } else {
        setErrors({ general: errorData?.message || "Failed to update details" });
      }

      console.error("Update failed:", errorData?.message);
    }

    setIsLoading(false);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    // Clear fullName error if switching to anonymous
    if (e.target.checked && errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: null }));
    }
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: null }));
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    // Only allow numbers (no +, spaces, or other characters)
    const filteredValue = inputValue.replace(/[^0-9]/g, "");
    setPhone(filteredValue);

    // Clear phone error when user starts typing
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
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
          <div className="text-black text-3xl font-['Palanquin Dark'] font-bold">
            KUKU
          </div>
        </div>

        <div className="text-black text-xl font-karla font-bold mb-6">
          Let&apos;s set your account up
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label className="text-black text-base font-karla font-bold mb-2 block">
              Kuku Username
            </label>
            <input
              type="text"
              value={KukuUsername}
              readOnly
              className="w-full p-3 border border-gray-300 bg-gray-200 cursor-not-allowed rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none"
            />
            <p className="text-gray-500 text-xs mt-1">
              Your KuKu username cannot be changed.
            </p>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
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
              onChange={handleFullNameChange}  // ✅ Added handler for error clear
              className={`w-full p-3 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none`}
              required={!isChecked} // Optional if anonymous
              aria-invalid={!!errors.fullName}  // ✅ Accessibility
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="text-black text-base font-karla font-bold mb-2 block">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your UAE phone number (e.g., 543781819)"
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full p-3 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none`}
              required
              aria-invalid={!!errors.phone}  // ✅ Accessibility
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Enter a 9-digit UAE phone number starting with 5 (e.g., 543781819).
            </p>
          </div>

          {/* Checkbox */}
          <div className="flex flex-col items-start h-auto mb-12">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className="text-black text-sm font-normal font-karla leading-none">
                Stay Anonymous
              </span>
            </label>
            <span className="text-black text-xs font-normal font-karla leading-none mt-1 ml-6">
              If checked, KuKu will only show your KuKu identity and not your
              full name.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500"
            } text-black font-semibold font-karla rounded-lg transition-colors`}
          >
            {isLoading ? "Updating..." : "Continue"}
          </button>
          {errors.general && (
            <p className="text-red-500 text-xs mt-2 text-center">{errors.general}</p>
          )}
        </form>
      </div>
    </div>
  );
}




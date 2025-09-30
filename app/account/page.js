// "use client"; // Ensure Client-Side rendering

// import { updateDetails } from "@/store/auth/authSlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function Account() {
//   // State variables for form inputs
//   const [KukuUsername, setKukuUsername] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [Description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [isChecked, setIsChecked] = useState(false);
//   const [id,setId]=useState('')
//   const dispatch = useDispatch();
//   const name=useSelector((state)=>state.auth.user)


//   const router=useRouter()
//   // Fetch user data from Redux and update local state on component load
//   useEffect(() => {
//     if (name) {
//       setKukuUsername(name?.username || "");
//       setFullName(name?.name || "");
//       setId(name?._id || "")
//     }
//   }, [name]);

//   // Handle form submission
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     console.log({ KukuUsername, fullName, Description,phone, location, isChecked });
//     const res=await dispatch(updateDetails({ KukuUsername, fullName,phone, Description, location, isChecked,id}))
//     if(res.type==="auth/updateDetails/fulfilled"){
//       router.push('/')
//     }
//   };

//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
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
//           <div className="text-black text-3xl font-['Palanquin Dark'] font-bold">KUKU</div>
//         </div>

//         <div className="text-black text-xl font-karla font-bold mb-6">
//           Let’s set your account up
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="w-full max-w-md">
//           {/* Kuku Username */}
//           <div className="mb-4">
//             <label className="text-black text-base font-karla font-bold mb-2 block">
//               Kuku Username
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your Kuku username"
//               value={KukuUsername}
//               onChange={(e) => setKukuUsername(e.target.value)}
//               className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none"
//               required
//             />
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
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="text-black text-base font-karla font-bold mb-2 block">
//               Phone Number
//             </label>
//             <input
//               type="tel"           
//   pattern="[\+]{0,1}[0-9]{10,15}"
//               placeholder="Enter your phone number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none"
//               required
//             />
//           </div>

//           {/* Description */}
//           {/* <div className="mb-4">
//             <label className="text-black text-base font-karla font-bold mb-2 block">
//               Description
//             </label>
//             <input
//               type="text"
//               placeholder="Enter a brief description"
//               value={Description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none"
//             />
//           </div> */}

//           {/* Location */}
//           {/* <div className="mb-4">
//             <label className="text-black text-base font-karla font-bold mb-2 block">
//               Location
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none"
//               required
//             />
//           </div> */}

//           {/* Checkbox */}
//           <div className="flex flex-col items-start h-1 mb-12">
//             <label className="flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={handleCheckboxChange}
//                 className="mr-2"
//               />
//               <span className=" text-black text-sm font-normal font-karla leading-none">
//                 By clicking here, Kuku lets you disclose your full name, but your Kuku username will be visible to all.
//               </span>
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full p-3 bg-yellow-400 text-black font-semibold font-karla rounded-lg"
//           >
//             Continue
//           </button>
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
      setPhone(name?.phone || "");
      setDescription(name?.description || "");
      setLocation(name?.location || "");
      setIsChecked(name?.anonymous || false); // Set checkbox based on anonymous field
    }
  }, [name]);

  // Phone number validation function
  const validatePhoneNumber = (phoneNumber) => {
    // Remove any whitespace
    const cleanPhone = phoneNumber.replace(/\s/g, '');
    
    // Check if it contains only numbers and optional + at the beginning
    const phoneRegex = /^[\+]?[0-9]{10,15}$/;
    
    if (!cleanPhone) {
      return "Phone number is required";
    }
    
    if (!phoneRegex.test(cleanPhone)) {
      return "Phone number must contain only numbers (10-15 digits) and can start with +";
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    
    // Validate phone number before submission
    const phoneError = validatePhoneNumber(phone);
    if (phoneError) {
      setErrors({ phone: phoneError });
      setIsLoading(false);
      return;
    }
    
    console.log({ KukuUsername, fullName, Description, phone, location, isChecked });
    
    const resultAction = await dispatch(updateDetails({ 
      KukuUsername, 
      fullName, 
      Description, 
      phone, 
      location, 
      isChecked, 
      id 
    }));
    
    console.log("Result Action:", resultAction); // Debug log

    if (updateDetails.fulfilled.match(resultAction)) {
      router.push('/');
    } else if (updateDetails.rejected.match(resultAction)) {
      const errorData = resultAction.payload;
      
      // If there's a specific field error (like username), highlight that field
      if (errorData?.field) {
        setErrors({
          [errorData.field]: errorData.message
        });
      }
      
      // The toast is already shown in the slice, but you can add additional handling here
      console.error("Update failed:", errorData?.message);
    }
    
    setIsLoading(false);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleUsernameChange = (e) => {
    setKukuUsername(e.target.value);
    // Clear username error when user starts typing
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: null }));
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    
    // Only allow numbers, + symbol (at the beginning), and spaces
    const filteredValue = inputValue.replace(/[^0-9+\s]/g, '');
    
    // Ensure + can only be at the beginning
    let cleanValue = filteredValue;
    if (filteredValue.includes('+')) {
      const plusCount = (filteredValue.match(/\+/g) || []).length;
      if (plusCount > 1 || filteredValue.indexOf('+') !== 0) {
        // Remove extra + signs or + signs not at the beginning
        cleanValue = filteredValue.charAt(0) === '+' ? 
          '+' + filteredValue.slice(1).replace(/\+/g, '') : 
          filteredValue.replace(/\+/g, '');
      }
    }
    
    setPhone(cleanValue);
    
    // Clear phone error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: null }));
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
          <div className="text-black text-3xl font-['Palanquin Dark'] font-bold">KUKU</div>
        </div>

        <div className="text-black text-xl font-karla font-bold mb-6">
          Let's set your account up
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
              onChange={handleUsernameChange}
              className={`w-full p-3 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none`}
              required
            />
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
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none"
              required={!isChecked} // Optional if anonymous
            />
          </div>

          <div className="mb-4">
            <label className="text-black text-base font-karla font-bold mb-2 block">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number (e.g., +1234567890)"
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full p-3 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } bg-gray-100 rounded-lg text-start text-black text-sm font-normal font-karla leading-none outline-none`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Only numbers allowed (10-15 digits). Country code with + is optional.
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
              If checked, KuKu will only show your KuKu identity and not your full name.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 ${
              isLoading ? 'bg-gray-400' : 'bg-yellow-400'
            } text-black font-semibold font-karla rounded-lg`}
          >
            {isLoading ? 'Updating...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
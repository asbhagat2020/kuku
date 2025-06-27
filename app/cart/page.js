// "use client";

// import Link from "next/link";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import DownloadKuku from "@/components/home/DownloadKuku";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Cookies from "js-cookie";
// // import { showSuccessNotification } from "@/utils/Notification/notif";
// import AddressList from "@/components/userProfile/AddressList";
// import CartAddress from "@/components/userProfile/CartAddress";
// import toast from "react-hot-toast";

// export default function Cart() {
//   const [isCouponPopupVisible, setIsCouponPopupVisible] = useState(false);
//   const [appliedCoupon, setAppliedCoupon] = useState("");
//   const [isCouponApplied, setisCouponApplied] = useState(false);
//   const [subtotal, setSubtotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [error, setError] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [selectAll, setSelectAll] = useState(false);
//   const dispatch = useDispatch();
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showAddress, setShowAddress] = useState(true);

//   const cartItems = useSelector((state) => state.cart.items);
//   const { token } = useSelector((store) => store.auth);
//   const router = useRouter();
//   // Handle select all functionality
//   const handleSelectAll = (checked) => {
//     setSelectAll(checked);
//     const newSelectedItems = {};
//     cart.forEach((item) => {
//       newSelectedItems[item._id] = checked;
//     });
//     setSelectedItems(newSelectedItems);
//     calculateTotals(newSelectedItems);
//   };

//   // Handle individual item selection
//   const handleSelectItem = (itemId, checked) => {
//     const newSelectedItems = { ...selectedItems, [itemId]: checked };
//     setSelectedItems(newSelectedItems);
//     setSelectAll(Object.values(newSelectedItems).every((value) => value));
//     calculateTotals(newSelectedItems);
//   };

//   // Calculate totals based on selected items
//   const calculateTotals = (selected) => {
//     const total = cart.reduce((sum, item) => {
//       if (selected[item._id]) {
//         return sum + (item.price || 0);
//       }
//       return sum;
//     }, 0);
//     setSubtotal(total);
//   };

// const handleCheckout = async () => {
//   setShowAddress(false);
//   try {
//     setLoading(true);
//     console.log("Starting checkout process...");

//     // Create the products array based on selected items
//     const selectedProducts = cart
//       .filter((item) => selectedItems[item._id])
//       .map((item) => ({
//         product: item._id,
//         productName: item.name,
//         quantity: 1,
//         price: item.price,
//         size: item.size || "",
//       }));

//     // Log the selected products array
//     console.log("Selected Products for Order:", selectedProducts);

//     // Only proceed if there are selected items
//     if (selectedProducts.length === 0) {
//       console.log("No products selected");
//       setErrorMessage("Please select at least one item to checkout");
//       setErrorPopupOpen(true);
//       setLoading(false);
//       return;
//     }

//     // Debugging user information
//     console.log("Getting user data from cookies");
//     let user;
//     try {
//       user = JSON.parse(Cookies.get("user"));
//       console.log("User data retrieved:", user ? "Success" : "No user data");
//     } catch (cookieError) {
//       console.error("Error parsing user cookie:", cookieError);
//       throw new Error("Invalid user data");
//     }

//     // Prepare the order data
//     const orderData = {
//       products: selectedProducts,
//       totalAmount: total,
//       discount: discount,
//       // couponCode: appliedCoupon || null,
//       buyer: user?._id,
//       finalAmount: total - discount,
//     };

//     console.log("Order data prepared:", orderData);

//     // Make the API call to create order
//     console.log("Sending API request to create order...");
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/create`,
//       orderData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("API Response received:", {
//       status: response.status,
//       statusText: response.statusText,
//       data: response.data
//     });

//     // Handle successful response
//     console.log("Processing response data...");
//     if (response.data) {
//       console.log("Response data exists");

//       if (response.data.updatedCart) {
//         console.log("Updated cart received, updating state");
//         setCart(response.data.updatedCart);
//         toast.success("Order placed successfully");
//         setSelectedItems({});
//         return; // Exit successfully
//       } else {
//         console.warn("No updatedCart in response data");
//       }

//       // Even if no updated cart, show success if we have an order
//       if (response.data.order) {
//         console.log("Order created successfully");
//         toast.success("Order placed successfully");
//         setSelectedItems({});
//         return; // Exit successfully
//       }
//     }

//     // If we got here, something is wrong with the response
//     console.error("Invalid response structure:", response.data);
//     throw new Error("Invalid response from server");

//   } catch (error) {
//     console.error("Checkout Error Details:", {
//       message: error.message,
//       responseData: error.response?.data,
//       responseStatus: error.response?.status,
//       stack: error.stack
//     });

//     setErrorMessage(
//       error.response?.data?.message || error.message || "Failed to process checkout"
//     );
//     setErrorPopupOpen(true);
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon("");
//     setisCouponApplied(false);
//     setDiscount(0);
//   };

//   const handleRemove = async (item) => {
//     try {
//       let id = item.productId
//       let _id = item._id
//       const token = JSON.parse(Cookies.get('auth'));
//       const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/remove/${id}`, {},{
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       let newUpdatedData = cart.filter((el => el.productId !== id));

//       // Update selected items after removal
//       setCart(newUpdatedData);
//       const newSelectedItems = { ...selectedItems };
//       delete newSelectedItems[_id];
//       setSelectedItems(newSelectedItems);
//       calculateTotals(newSelectedItems);
//     } catch (err) {
//       setError("Failed to remove item from cart");
//       setErrorMessage("Failed to remove item from cart");
//       setErrorPopupOpen(true);
//     }
//   };

//   const coupons = [
//     {
//       id: 1,
//       code: "SAVE10",
//       description: "Get 10% off on your order",
//       type: "percentage",
//       value: 10,
//     },
//     {
//       id: 2,
//       code: "FREESHIP",
//       description: "Free shipping on orders over AED 100",
//       type: "freeShipping",
//     },
//     {
//       id: 3,
//       code: "DISCOUNT20",
//       description: "Flat 20 AED off on all items",
//       type: "flat",
//       value: 20,
//     },
//   ];

//   const handleApplyCoupon = (couponCode) => {
//     const coupon = coupons.find((c) => c.code === couponCode);
//     if (coupon) {
//       setAppliedCoupon(couponCode);
//       setIsCouponPopupVisible(false);
//       setisCouponApplied(true);

//       if (coupon.type === "percentage") {
//         setDiscount((subtotal * coupon.value) / 100);
//       } else if (coupon.type === "flat") {
//         setDiscount(coupon.value);
//       } else if (coupon.type === "freeShipping") {
//         setDiscount(0);
//       }
//     }
//   };

//   const total = subtotal - discount;

//   const fetchCartDetails = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/details`;
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response of user cart...", response.data.products);
//       setCart(response.data.products);
//       // Initialize selected items
//       const initialSelected = {};
//       response.data.cart.forEach((item) => {
//         initialSelected[item._id] = false;
//       });
//       setSelectedItems(initialSelected);
//     } catch (err) {
//       // showSuccessNotification("Please login")
//       // setError("Failed to fetch cart details");
//       // setErrorMessage("Failed to fetch cart details");
//       // setErrorPopupOpen(true);

//     }
//   };

//   const handleAddToWishlist = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const response = await axios.post(
//         // `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/wishlist/${id}`,
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
//         {productId:id},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         router.push("/wishlist");
//       } else {
//         setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || error.message);
//       setErrorPopupOpen(true);
//     }
//   };

//   // useEffect(() => {
//   //   if(token) {
//   //     fetchCartDetails();
//   //   }
//   // }, [token]);
//   useEffect(() => {
//     fetchCartDetails();

//   }, [])

//   // Get selected items count
//   const selectedCount = Object.values(selectedItems).filter(Boolean).length;
//   const totalItems = cart.length;

//   return (
//     <>
//       <Header />
//       <div className="px-4 py-8 md:px-8 lg:px-[70px] lg:py-[70px]">
//         <div className="text-[#070707] text-2xl md:text-3xl lg:text-[36.8px] font-normal font-luckiest leading-tight mb-6">
//           YOUR CART
//         </div>

//         {cart.length > 0 ? (
//           <>
//             <div className="flex items-center gap-2 mb-4">
//               <label className="custom-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={selectAll}
//                   onChange={(e) => handleSelectAll(e.target.checked)}
//                 />
//                 <span className="checkmark"></span>
//               </label>
//               <div className="text-[#4f4f4f] text-sm md:text-xl font-normal font-karla">
//                 {selectedCount}/{totalItems} Items selected
//               </div>
//             </div>

//             <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
//               <div className="w-full lg:w-2/3">
//                 {cart.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex flex-col md:flex-row items-start gap-4 mb-4"
//                   >
//                     <label className="custom-checkbox">
//                       <input
//                         type="checkbox"
//                         checked={selectedItems[item._id] || false}
//                         onChange={(e) =>
//                           handleSelectItem(item._id, e.target.checked)
//                         }
//                       />
//                       <span className="checkmark"></span>
//                     </label>

//                     <img
//                       className="w-24 h-auto md:w-[159.2px] rounded-md"
//                       src={item?.image}
//                       alt="Product"
//                     />

//                     <div className="flex flex-col justify-start items-start gap-3 w-full">
//                       <div>
//                         <div className="text-black text-lg md:text-[18px] font-bold font-karla">
//                           {item?.name}
//                         </div>
//                         <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla">
//                           {item?.description}
//                         </div>
//                       </div>

//                       <div className="flex justify-between md:justify-start items-center gap-4">
//                         <div className="flex items-center gap-3">
//                           <div className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
//                             SIZE
//                           </div>
//                           <div className="inline-flex border border-[#e4086f] justify-center items-center px-2 py-1">
//                             <div className="text-[#e4086f] text-sm md:text-[16px] font-normal font-karla">
//                               {item?.size || 'N/A'}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-3">
//                           <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
//                             CONDITION:
//                           </span>
//                           <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
//                             {item?.condition || 'N/A'}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex flex-col md:flex-row mt-2 gap-4 w-full">
//                         <button
//                           onClick={() => handleRemove(item)}
//                           className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg hover:border-white hover:text-white text-black border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]"
//                         >
//                           <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
//                             Remove
//                           </span>
//                         </button>
//                         <button
//                           className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg text-black hover:border-white hover:text-white border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]"
//                           onClick={() => handleAddToWishlist(item.productId)}
//                         >
//                           <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
//                             Add to Wishlist
//                           </span>
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex flex-col items-start gap-2 ml-[-15px]">
//                       <div className="flex items-center gap-1 mr-2">
//                         <div className="text-black text-sm md:text-[16px] font-bold font-karla">
//                           AED&nbsp;{item?.price}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 <Link href="/selling-page">
//                   <button className="w-full h-[40px] md:h-[50px] rounded-lg hover:text-white text-[#e4086f] hover:bg-[#e4086f] hover:border-white border-2 border-[#e4086f] flex justify-center items-center">
//                     <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
//                       Add more items
//                     </span>
//                   </button>
//                 </Link>
//               </div>

//               <div className="w-full lg:w-1/4 mt-8 lg:mt-[-50px]">
//                 {isCouponApplied ? (
//                   <div className="bg-white flex justify-between items-center border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
//                     <p className="text-[#4f4f4f] text-sm md:text-[18px] font-bold font-karla">
//                       {appliedCoupon}
//                     </p>
//                     <button
//                       onClick={handleRemoveCoupon}
//                       className="px-4 py-2 bg-[#e4086f] rounded-2xl text-white"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="bg-white flex justify-between items-center border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
//                     <p className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
//                       Available coupons
//                     </p>
//                     <button
//                       onClick={() => setIsCouponPopupVisible(true)}
//                       className="px-4 py-2 bg-[#e4086f] rounded-2xl text-white"
//                     >
//                       Show
//                     </button>
//                   </div>
//                 )}

//                 {!isCouponApplied && (
//                   <div className="bg-white border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
//                     <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
//                       Have a coupon?
//                     </div>
//                     <div className="flex gap-4 mt-2">
//                       <input
//                         type="text"
//                         placeholder="Add coupon"
//                         className="w-[150px] md:w-[200px] h-[36px] p-2 border border-[#b4b4b4] rounded-lg text-sm font-karla outline-[#e4086f] outline-4"
//                       />
//                       <button className="text-[#e4086f] text-sm md:text-[16px] font-medium">
//                         Apply
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-xl">
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
//                       Subtotal:
//                     </div>
//                     <div className="text-[#292929] text-sm md:text-[16px] font-karla">
//                       AED {subtotal.toFixed(2)}
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
//                       Discount:
//                     </div>
//                     <div className="text-[#e4086f] text-sm md:text-[16px] font-karla">
//                       AED {discount.toFixed(2)}
//                     </div>
//                   </div>
//                   <div className="w-full h-px bg-gray-200 mb-2"></div>
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="text-[#1c1c1c] text-base md:text-[18px] font-semibold">
//                       Total:
//                     </div>
//                     <div className="text-[#e4086f] text-base md:text-[18px] font-bold">
//                       AED {total.toFixed(2)}
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleCheckout}
//                     disabled={loading || selectedCount === 0}
//                     className="w-full h-[40px] p-2 bg-[#fde504] rounded-lg md:rounded-[16px] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <div className="text-center text-[#070707] text-sm md:text-[14px] font-medium">
//                       {loading ? "Processing..." : "Checkout"}
//                     </div>
//                   </button>

//                   <div className="flex justify-around mt-3">
//                     <img className="h-5" src="/payment1.png" alt="Payment1" />
//                     <img
//                       className="h-5"
//                       src="/mastercard.png"
//                       alt="MasterCard"
//                     />
//                     <img className="h-5" src="/paypal.png" alt="PayPal" />
//                     <img className="h-5" src="/visa.png" alt="Visa" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="w-full h-[50vh] flex justify-center items-center">
//             <div className="text-center">
//               <h2 className="font-luckiest text-4xl mb-4">No items here :</h2>
//               <Link
//                 className="text-pink-400 font-karla text-xl"
//                 href={"/selling-page"}
//               >
//                 Continue purchase
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>

//       {isCouponPopupVisible && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-4 shadow-lg">
//             <h2 className="text-lg font-bold mb-4 text-center">
//               Available Coupons
//             </h2>
//             <ul className="space-y-3">
//               {coupons.map((coupon) => (
//                 <li
//                   key={coupon.id}
//                   className="flex justify-between items-center border p-2 rounded-lg"
//                 >
//                   <div>
//                     <div className="font-semibold">{coupon.code}</div>
//                     <div className="text-sm text-gray-500">
//                       {coupon.description}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleApplyCoupon(coupon.code)}
//                     className="px-4 py-2 bg-[#e4086f] text-white rounded-lg"
//                   >
//                     Apply
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={() => setIsCouponPopupVisible(false)}
//               className="mt-4 w-full px-4 py-2 bg-gray-300 rounded-lg text-black"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {errorPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
//             <p className="text-red-600 font-semibold text-center">
//               {errorMessage}
//             </p>
//             <button
//               onClick={() => setErrorPopupOpen(false)}
//               className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//       {/* <AddressList/> */}
//       {cart.length > 0 && (
//         <>
//           <CartAddress />
//         </>
//       )}
//       <DownloadKuku />
//       <Footer />
//     </>
//   );
// }

"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
// import { showSuccessNotification } from "@/utils/Notification/notif";
import AddressList from "@/components/userProfile/AddressList";
import CartAddress from "@/components/userProfile/CartAddress";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Cart() {
  const [isCouponPopupVisible, setIsCouponPopupVisible] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isCouponApplied, setisCouponApplied] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddress, setShowAddress] = useState(true);

  // New state for coupons
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const { token } = useSelector((store) => store.auth);
  const router = useRouter();

  // Fetch coupons from API
  const fetchCoupons = async () => {
    try {
      setCouponLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/coupon/getCoupons`
      );

      if (response.data && response.data.coupons) {
        // Filter active coupons and check date validity
        const activeCoupons = response.data.coupons.filter((coupon) => {
          const currentDate = new Date();
          const startDate = new Date(coupon.startDate);
          const endDate = new Date(coupon.endDate);

          return (
            coupon.isActive &&
            currentDate >= startDate &&
            currentDate <= endDate &&
            coupon.usedCount < coupon.usageLimit
          );
        });

        setCoupons(activeCoupons);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast.error("Failed to load coupons");
    } finally {
      setCouponLoading(false);
    }
  };

  // Check if coupon is applicable based on conditions
  const isCouponApplicable = (coupon) => {
    // Check minimum purchase amount
    if (subtotal < coupon.minPurchase) {
      return {
        applicable: false,
        reason: `Minimum purchase of AED ${coupon.minPurchase} required`,
      };
    }

    // Check usage limit
    if (coupon.usedCount >= coupon.usageLimit) {
      return {
        applicable: false,
        reason: "Coupon usage limit exceeded",
      };
    }

    // Check date validity
    const currentDate = new Date();
    const startDate = new Date(coupon.startDate);
    const endDate = new Date(coupon.endDate);

    if (currentDate < startDate || currentDate > endDate) {
      return {
        applicable: false,
        reason: "Coupon has expired or not yet active",
      };
    }

    return { applicable: true };
  };

  // Calculate discount based on coupon
  const calculateDiscount = (coupon, amount) => {
    if (coupon.discountType === "Percentage") {
      const discountAmount = (amount * coupon.discountValue) / 100;
      return Math.min(discountAmount, coupon.maxDiscount || discountAmount);
    } else if (coupon.discountType === "Fixed") {
      return Math.min(coupon.discountValue, amount);
    }
    return 0;
  };

  // Handle select all functionality
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    const newSelectedItems = {};
    cart.forEach((item) => {
      newSelectedItems[item._id] = checked;
    });
    setSelectedItems(newSelectedItems);
    calculateTotals(newSelectedItems);
  };

  // Handle individual item selection
  const handleSelectItem = (itemId, checked) => {
    const newSelectedItems = { ...selectedItems, [itemId]: checked };
    setSelectedItems(newSelectedItems);
    setSelectAll(Object.values(newSelectedItems).every((value) => value));
    calculateTotals(newSelectedItems);
  };

  // Calculate totals based on selected items
  const calculateTotals = (selected) => {
    const total = cart.reduce((sum, item) => {
      if (selected[item._id]) {
        return sum + (item.price || 0);
      }
      return sum;
    }, 0);
    setSubtotal(total);

    // Recalculate discount if coupon is applied
    if (isCouponApplied && appliedCoupon) {
      const coupon = coupons.find((c) => c.code === appliedCoupon);
      if (coupon) {
        const newDiscount = calculateDiscount(coupon, total);
        setDiscount(newDiscount);
      }
    }
  };

  const handleCheckout = async () => {
    setShowAddress(false);
    try {
      setLoading(true);
      console.log("Starting checkout process...");

      // Create the products array based on selected items
      const selectedProducts = cart
        .filter((item) => selectedItems[item._id])
        .map((item) => ({
          product: item._id,
          productName: item.name,
          quantity: 1,
          price: item.price,
          size: item.size || "",
        }));

      // Log the selected products array
      console.log("Selected Products for Order:", selectedProducts);

      // Only proceed if there are selected items
      if (selectedProducts.length === 0) {
        console.log("No products selected");
        setErrorMessage("Please select at least one item to checkout");
        setErrorPopupOpen(true);
        setLoading(false);
        return;
      }

      // Debugging user information
      console.log("Getting user data from cookies");
      let user;
      try {
        user = JSON.parse(Cookies.get("user"));
        console.log("User data retrieved:", user ? "Success" : "No user data");
      } catch (cookieError) {
        console.error("Error parsing user cookie:", cookieError);
        throw new Error("Invalid user data");
      }

      // Prepare the order data
      const orderData = {
        products: selectedProducts,
        totalAmount: total,
        discount: discount,
        couponCode: appliedCoupon || null,
        buyer: user?._id,
        finalAmount: total - discount,
      };

      console.log("Order data prepared:", orderData);

      // Make the API call to create order
      console.log("Sending API request to create order...");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response received:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });

      // Handle successful response
      console.log("Processing response data...");
      if (response.data) {
        console.log("Response data exists");

        if (response.data.updatedCart) {
          console.log("Updated cart received, updating state");
          setCart(response.data.updatedCart);
          toast.success("Order placed successfully");
          setSelectedItems({});
          return; // Exit successfully
        } else {
          console.warn("No updatedCart in response data");
        }

        // Even if no updated cart, show success if we have an order
        if (response.data.order) {
          console.log("Order created successfully");
          toast.success("Order placed successfully");
          setSelectedItems({});
          return; // Exit successfully
        }
      }

      // If we got here, something is wrong with the response
      console.error("Invalid response structure:", response.data);
      throw new Error("Invalid response from server");
    } catch (error) {
      console.error("Checkout Error Details:", {
        message: error.message,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        stack: error.stack,
      });

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to process checkout"
      );
      setErrorPopupOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    setisCouponApplied(false);
    setDiscount(0);
    setCouponCode("");
  };

  const handleRemove = async (item) => {
    try {
      let id = item.productId;
      let _id = item._id;
      const token = JSON.parse(Cookies.get("auth"));
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/remove/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let newUpdatedData = cart.filter((el) => el.productId !== id);

      // Update selected items after removal
      setCart(newUpdatedData);
      const newSelectedItems = { ...selectedItems };
      delete newSelectedItems[_id];
      setSelectedItems(newSelectedItems);
      calculateTotals(newSelectedItems);
    } catch (err) {
      setError("Failed to remove item from cart");
      setErrorMessage("Failed to remove item from cart");
      setErrorPopupOpen(true);
    }
  };

  // Apply coupon from popup
  const handleApplyCoupon = (couponCode) => {
    const coupon = coupons.find((c) => c.code === couponCode);
    if (coupon) {
      const applicabilityCheck = isCouponApplicable(coupon);

      if (!applicabilityCheck.applicable) {
        toast.error(applicabilityCheck.reason);
        return;
      }

      const discountAmount = calculateDiscount(coupon, subtotal);

      setAppliedCoupon(couponCode);
      setIsCouponPopupVisible(false);
      setisCouponApplied(true);
      setDiscount(discountAmount);
      setCouponCode(couponCode);

      toast.success(`Coupon ${couponCode} applied successfully!`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  // Apply coupon from input field
  const handleApplyCouponFromInput = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );
    if (coupon) {
      const applicabilityCheck = isCouponApplicable(coupon);

      if (!applicabilityCheck.applicable) {
        toast.error(applicabilityCheck.reason);
        return;
      }

      const discountAmount = calculateDiscount(coupon, subtotal);

      setAppliedCoupon(coupon.code);
      setisCouponApplied(true);
      setDiscount(discountAmount);

      toast.success(`Coupon ${coupon.code} applied successfully!`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const total = subtotal - discount;

  const fetchCartDetails = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/details`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response of user cart...", response.data.products);
      setCart(response.data.products);
      // Initialize selected items
      const initialSelected = {};
      response.data.cart.forEach((item) => {
        initialSelected[item._id] = false;
      });
      setSelectedItems(initialSelected);
    } catch (err) {
      // showSuccessNotification("Please login")
      // setError("Failed to fetch cart details");
      // setErrorMessage("Failed to fetch cart details");
      // setErrorPopupOpen(true);
    }
  };

  const handleAddToWishlist = async (id) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.post(
        // `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/wishlist/${id}`,
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        router.push("/wishlist");
      } else {
        setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setErrorPopupOpen(true);
    }
  };

  useEffect(() => {
    fetchCartDetails();
    fetchCoupons();
  }, []);

  // Get selected items count
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;
  const totalItems = cart.length;

  return (
    <>
      <Header />
      <div className="px-4 py-8 md:px-8 lg:px-[70px] lg:py-[70px]">
        <div className="text-[#070707] text-2xl md:text-3xl lg:text-[36.8px] font-normal font-luckiest leading-tight mb-6">
          YOUR CART
        </div>

        {cart.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>
              <div className="text-[#4f4f4f] text-sm md:text-xl font-normal font-karla">
                {selectedCount}/{totalItems} Items selected
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="w-full lg:w-2/3">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col md:flex-row items-start gap-4 mb-4"
                  >
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems[item._id] || false}
                        onChange={(e) =>
                          handleSelectItem(item._id, e.target.checked)
                        }
                      />
                      <span className="checkmark"></span>
                    </label>

                    {/* <img
                      className="w-24 h-auto md:w-[159.2px] rounded-md"
                      src={item?.image}
                      alt="Product"
                    /> */}

                    <Image
                      className="rounded-md"
                      src={item?.image}
                      alt="Product"
                      width={159} // set appropriate width
                      height={200} // set appropriate height
                    />

                    <div className="flex flex-col justify-start items-start gap-3 w-full">
                      <div>
                        <div className="text-black text-lg md:text-[18px] font-bold font-karla">
                          {item?.name}
                        </div>
                        <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla">
                          {item?.description}
                        </div>
                      </div>

                      <div className="flex justify-between md:justify-start items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                            SIZE
                          </div>
                          <div className="inline-flex border border-[#e4086f] justify-center items-center px-2 py-1">
                            <div className="text-[#e4086f] text-sm md:text-[16px] font-normal font-karla">
                              {item?.size || "N/A"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                            CONDITION:
                          </span>
                          <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                            {item?.condition || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row mt-2 gap-4 w-full">
                        <button
                          onClick={() => handleRemove(item)}
                          className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg hover:border-white hover:text-white text-black border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]"
                        >
                          <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
                            Remove
                          </span>
                        </button>
                        <button
                          className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg text-black hover:border-white hover:text-white border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]"
                          onClick={() => handleAddToWishlist(item.productId)}
                        >
                          <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
                            Add to Wishlist
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 ml-[-15px]">
                      <div className="flex items-center gap-1 mr-2">
                        <div className="text-black text-sm md:text-[16px] font-bold font-karla">
                          AED&nbsp;{item?.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Link href="/selling-page">
                  <button className="w-full h-[40px] md:h-[50px] rounded-lg hover:text-white text-[#e4086f] hover:bg-[#e4086f] hover:border-white border-2 border-[#e4086f] flex justify-center items-center">
                    <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
                      Add more items
                    </span>
                  </button>
                </Link>
              </div>

              <div className="w-full lg:w-1/4 mt-8 lg:mt-[-50px]">
                {isCouponApplied ? (
                  <div className="bg-white flex justify-between items-center border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
                    <div>
                      <p className="text-[#4f4f4f] text-sm md:text-[18px] font-bold font-karla">
                        {appliedCoupon}
                      </p>
                      <p className="text-[#e4086f] text-xs">
                        Saved AED {discount.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="px-4 py-2 bg-[#e4086f] rounded-2xl text-white"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="bg-white flex justify-between items-center border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
                    <p className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                      Available coupons ({coupons.length})
                    </p>
                    <button
                      onClick={() => setIsCouponPopupVisible(true)}
                      className="px-4 py-2 bg-[#e4086f] rounded-2xl text-white"
                      disabled={couponLoading}
                    >
                      {couponLoading ? "Loading..." : "Show"}
                    </button>
                  </div>
                )}

                {!isCouponApplied && (
                  <div className="bg-white border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
                    <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                      Have a coupon?
                    </div>
                    <div className="flex gap-4 mt-2">
                      <input
                        type="text"
                        placeholder="Add coupon"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        className="w-[150px] md:w-[200px] h-[36px] p-2 border border-[#b4b4b4] rounded-lg text-sm font-karla outline-[#e4086f] outline-4"
                      />
                      <button
                        onClick={handleApplyCouponFromInput}
                        className="text-[#e4086f] text-sm md:text-[16px] font-medium hover:underline"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                      Subtotal:
                    </div>
                    <div className="text-[#292929] text-sm md:text-[16px] font-karla">
                      AED {subtotal.toFixed(2)}
                    </div>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                        Discount:
                      </div>
                      <div className="text-[#e4086f] text-sm md:text-[16px] font-karla">
                        -AED {discount.toFixed(2)}
                      </div>
                    </div>
                  )}
                  <div className="w-full h-px bg-gray-200 mb-2"></div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-[#1c1c1c] text-base md:text-[18px] font-semibold">
                      Total:
                    </div>
                    <div className="text-[#e4086f] text-base md:text-[18px] font-bold">
                      AED {total.toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading || selectedCount === 0}
                    className="w-full h-[40px] p-2 bg-[#fde504] rounded-lg md:rounded-[16px] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-center text-[#070707] text-sm md:text-[14px] font-medium">
                      {loading ? "Processing..." : "Checkout"}
                    </div>
                  </button>

                  {/* <div className="flex justify-around mt-3">
                    <img className="h-5" src="/payment1.png" alt="Payment1" />
                    <img
                      className="h-5"
                      src="/mastercard.png"
                      alt="MasterCard"
                    />
                    <img className="h-5" src="/paypal.png" alt="PayPal" />
                    <img className="h-5" src="/visa.png" alt="Visa" />
                  </div> */}

                  <div className="flex justify-around mt-3">
                    <Image
                      className="h-5"
                      src="/payment1.png"
                      alt="Payment1"
                      width={40} // Add appropriate width
                      height={20} // Add appropriate height
                    />
                    <Image
                      className="h-5"
                      src="/mastercard.png"
                      alt="MasterCard"
                      width={40}
                      height={20}
                    />
                    <Image
                      className="h-5"
                      src="/paypal.png"
                      alt="PayPal"
                      width={40}
                      height={20}
                    />
                    <Image
                      className="h-5"
                      src="/visa.png"
                      alt="Visa"
                      width={40}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <div className="text-center">
              <h2 className="font-luckiest text-4xl mb-4">No items here :</h2>
              <Link
                className="text-pink-400 font-karla text-xl"
                href={"/selling-page"}
              >
                Continue purchase
              </Link>
            </div>
          </div>
        )}
      </div>

      {isCouponPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[500px] max-h-[80vh] overflow-y-auto p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center">
              Available Coupons
            </h2>
            {couponLoading ? (
              <div className="text-center py-4">Loading coupons...</div>
            ) : coupons.length > 0 ? (
              <ul className="space-y-3">
                {coupons.map((coupon) => {
                  const applicabilityCheck = isCouponApplicable(coupon);
                  const potentialDiscount = calculateDiscount(coupon, subtotal);

                  return (
                    <li
                      key={coupon._id}
                      className={`border p-3 rounded-lg ${
                        applicabilityCheck.applicable
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-lg">
                            {coupon.code}
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            {coupon.description}
                          </div>
                          <div className="text-xs text-gray-500">
                            {coupon.discountType === "Percentage"
                              ? `${coupon.discountValue}% off (max AED ${coupon.maxDiscount})`
                              : `AED ${coupon.discountValue} off`}
                          </div>
                          <div className="text-xs text-gray-500">
                            Min purchase: AED {coupon.minPurchase}
                          </div>
                          {applicabilityCheck.applicable && (
                            // <div className="text-xs text-green-600 font-medium">
                            //   You'll save: AED {potentialDiscount.toFixed(2)}
                            // </div>
                            <div className="text-xs text-green-600 font-medium">
                              You&apos;ll save: AED{" "}
                              {potentialDiscount.toFixed(2)}
                            </div>
                          )}
                          {!applicabilityCheck.applicable && (
                            <div className="text-xs text-red-600">
                              {applicabilityCheck.reason}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleApplyCoupon(coupon.code)}
                          disabled={!applicabilityCheck.applicable}
                          className={`px-4 py-2 rounded-lg ml-2 ${
                            applicabilityCheck.applicable
                              ? "bg-[#e4086f] text-white hover:bg-[#c5076b]"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          Apply
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No active coupons available
              </div>
            )}
            <button
              onClick={() => setIsCouponPopupVisible(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-300 rounded-lg text-black hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {errorPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <p className="text-red-600 font-semibold text-center">
              {errorMessage}
            </p>
            <button
              onClick={() => setErrorPopupOpen(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* <AddressList/> */}
      {cart.length > 0 && (
        <>
          <CartAddress />
        </>
      )}
      <DownloadKuku />
      <Footer />
    </>
  );
}

//Payment Integration code

// "use client";

// import Link from "next/link";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import DownloadKuku from "@/components/home/DownloadKuku";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Cookies from "js-cookie";
// import AddressList from "@/components/userProfile/AddressList";
// import CartAddress from "@/components/userProfile/CartAddress";
// import toast from "react-hot-toast";
// import { loadStripe } from "@stripe/stripe-js";

// // Initialize Stripe with your publishable key
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

// export default function Cart() {
//   const [isCouponPopupVisible, setIsCouponPopupVisible] = useState(false);
//   const [appliedCoupon, setAppliedCoupon] = useState("");
//   const [isCouponApplied, setisCouponApplied] = useState(false);
//   const [subtotal, setSubtotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [error, setError] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [selectAll, setSelectAll] = useState(false);
//   const dispatch = useDispatch();
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showAddress, setShowAddress] = useState(true);
//   const [processingPayment, setProcessingPayment] = useState(false);

//   const cartItems = useSelector((state) => state.cart.items);
//   const { token } = useSelector((store) => store.auth);
//   const router = useRouter();

//   // Handle select all functionality
//   const handleSelectAll = (checked) => {
//     setSelectAll(checked);
//     const newSelectedItems = {};
//     cart.forEach((item) => {
//       newSelectedItems[item._id] = checked;
//     });
//     setSelectedItems(newSelectedItems);
//     calculateTotals(newSelectedItems);
//   };

//   // Handle individual item selection
//   const handleSelectItem = (itemId, checked) => {
//     const newSelectedItems = { ...selectedItems, [itemId]: checked };
//     setSelectedItems(newSelectedItems);
//     setSelectAll(Object.values(newSelectedItems).every((value) => value));
//     calculateTotals(newSelectedItems);
//   };

//   // Calculate totals based on selected items
//   const calculateTotals = (selected) => {
//     const total = cart.reduce((sum, item) => {
//       if (selected[item._id]) {
//         return sum + (item.price || 0);
//       }
//       return sum;
//     }, 0);
//     setSubtotal(total);
//   };

// const prepareItemsForStripe = () => {
//   return cart
//     .filter((item) => selectedItems[item._id])
//     .map((item) => {
//       // Make sure image URL is absolute and properly formatted
//       let imageUrl = item.image;
//       if (imageUrl && !imageUrl.startsWith('http')) {
//         // If you have relative URLs, make them absolute
//         imageUrl = window.location.origin + imageUrl;
//       }

//       return {
//         id: item.productId,
//         name: item.name || "Product",
//         description: item.description || "Product details",
//         image: imageUrl, // Send properly formatted image URL
//         price: item.price,
//         count: 1,
//         size: item.size || "Standard",
//         condition: item.condition || "New",
//         qty: item.qty || 1,
//         subtotal: item.subtotal || item.price
//       };
//     });
// };

// const handleCheckout = async () => {
//   try {
//     setProcessingPayment(true);

//     // Get selected products formatted for Stripe
//     const selectedProducts = prepareItemsForStripe();

//     // Validate that there are products to checkout
//     if (selectedProducts.length === 0) {
//       setErrorMessage("Please select at least one item to checkout");
//       setErrorPopupOpen(true);
//       setProcessingPayment(false);
//       return;
//     }

//   console.log("Image URLs being sent:", selectedProducts.map(p => p.image)); // Log image URLs specifically
//     console.log("Sending to backend:", JSON.stringify(selectedProducts, null, 2)); // Enhanced debug log

//     // Make API call to create Stripe session
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/makePayment`,
//       selectedProducts,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       }
//     );

//     const session = response.data;

//     // Get Stripe instance
//     const stripe = await stripePromise;

//     console.log("Stripe session:", session); // Debug log

//     // Redirect to Stripe checkout
//     if (session?.id) {
//       const { error } = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (error) {
//         console.error("Error redirecting to checkout:", error);
//         setErrorMessage("Payment processing failed. Please try again.");
//         setErrorPopupOpen(true);
//       }
//     } else {
//       throw new Error("Failed to create payment session");
//     }
//   } catch (error) {
//     console.error("Stripe checkout error:", error);
//     setErrorMessage(
//       error.response?.data?.error ||
//       error.message ||
//       "Payment processing failed"
//     );
//     setErrorPopupOpen(true);
//   } finally {
//     setProcessingPayment(false);
//   }
// };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon("");
//     setisCouponApplied(false);
//     setDiscount(0);
//   };

//   const handleRemove = async (item) => {
//     try {
//       let id = item.productId;
//       let _id = item._id;
//       const token = JSON.parse(Cookies.get("auth"));
//       const res = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/remove/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       let newUpdatedData = cart.filter((el) => el.productId !== id);

//       // Update selected items after removal
//       setCart(newUpdatedData);
//       const newSelectedItems = { ...selectedItems };
//       delete newSelectedItems[_id];
//       setSelectedItems(newSelectedItems);
//       calculateTotals(newSelectedItems);
//     } catch (err) {
//       setError("Failed to remove item from cart");
//       setErrorMessage("Failed to remove item from cart");
//       setErrorPopupOpen(true);
//     }
//   };

//   const coupons = [
//     {
//       id: 1,
//       code: "SAVE10",
//       description: "Get 10% off on your order",
//       type: "percentage",
//       value: 10,
//     },
//     {
//       id: 2,
//       code: "FREESHIP",
//       description: "Free shipping on orders over AED 100",
//       type: "freeShipping",
//     },
//     {
//       id: 3,
//       code: "DISCOUNT20",
//       description: "Flat 20 AED off on all items",
//       type: "flat",
//       value: 20,
//     },
//   ];

//   const handleApplyCoupon = (couponCode) => {
//     const coupon = coupons.find((c) => c.code === couponCode);
//     if (coupon) {
//       setAppliedCoupon(couponCode);
//       setIsCouponPopupVisible(false);
//       setisCouponApplied(true);

//       if (coupon.type === "percentage") {
//         setDiscount((subtotal * coupon.value) / 100);
//       } else if (coupon.type === "flat") {
//         setDiscount(coupon.value);
//       } else if (coupon.type === "freeShipping") {
//         setDiscount(0);
//       }
//     }
//   };

//   const total = subtotal - discount;

//   const fetchCartDetails = async () => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/details`;
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response of user cart...", response.data.products);
//       setCart(response.data.products);
//       // Initialize selected items
//       const initialSelected = {};
//       response.data.cart?.forEach((item) => {
//         initialSelected[item._id] = false;
//       });
//       setSelectedItems(initialSelected);
//     } catch (err) {
//       console.error("Failed to fetch cart details", err);
//     }
//   };

//   const handleAddToWishlist = async (id) => {
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
//         { productId: id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         router.push("/wishlist");
//       } else {
//         setErrorMessage(`Failed to add to wishlist: ${response.data.message}`);
//         setErrorPopupOpen(true);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || error.message);
//       setErrorPopupOpen(true);
//     }
//   };

//   useEffect(() => {
//     fetchCartDetails();

//     // Check if returning from a successful payment
//     const query = new URLSearchParams(window.location.search);
//     const success = query.get("success");
//     const canceled = query.get("canceled");

//     if (success) {
//       toast.success("Payment completed successfully!");
//       // You could reset the cart or reload cart data here
//     }

//     if (canceled) {
//       toast.error("Payment was canceled.");
//     }
//   }, []);

//   // Get selected items count
//   const selectedCount = Object.values(selectedItems).filter(Boolean).length;
//   const totalItems = cart.length;

//   return (
//     <>
//       <Header />
//       <div className="px-4 py-8 md:px-8 lg:px-[70px] lg:py-[70px]">
//         <div className="text-[#070707] text-2xl md:text-3xl lg:text-[36.8px] font-normal font-luckiest leading-tight mb-6">
//           YOUR CART
//         </div>

//         {cart.length > 0 ? (
//           <>
//             <div className="flex items-center gap-2 mb-4">
//               <label className="custom-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={selectAll}
//                   onChange={(e) => handleSelectAll(e.target.checked)}
//                 />
//                 <span className="checkmark"></span>
//               </label>
//               <div className="text-[#4f4f4f] text-sm md:text-xl font-normal font-karla">
//                 {selectedCount}/{totalItems} Items selected
//               </div>
//             </div>

//             <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
//               <div className="w-full lg:w-2/3">
//                 {cart.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex flex-col md:flex-row items-start gap-4 mb-4"
//                   >
//                     <label className="custom-checkbox">
//                       <input
//                         type="checkbox"
//                         checked={selectedItems[item._id] || false}
//                         onChange={(e) =>
//                           handleSelectItem(item._id, e.target.checked)
//                         }
//                       />
//                       <span className="checkmark"></span>
//                     </label>

//                     <img
//                       className="w-24 h-auto md:w-[159.2px] rounded-md"
//                       src={item?.image}
//                       alt="Product"
//                     />

//                     <div className="flex flex-col justify-start items-start gap-3 w-full">
//                       <div>
//                         <div className="text-black text-lg md:text-[18px] font-bold font-karla">
//                           {item?.name}
//                         </div>
//                         <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla">
//                           {item?.description}
//                         </div>
//                       </div>

//                       <div className="flex justify-between md:justify-start items-center gap-4">
//                         <div className="flex items-center gap-3">
//                           <div className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
//                             SIZE
//                           </div>
//                           <div className="inline-flex border border-[#e4086f] justify-center items-center px-2 py-1">
//                             <div className="text-[#e4086f] text-sm md:text-[16px] font-normal font-karla">
//                               {item?.size || "N/A"}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-3">
//                           <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
//                             CONDITION:
//                           </span>
//                           <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
//                             {item?.condition || "N/A"}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex flex-col md:flex-row mt-2 gap-4 w-full">
//                         <button
//                           onClick={() => handleRemove(item)}
//                           className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg hover:border-white hover:text-white text-black border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]"
//                         >
//                           <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
//                             Remove
//                           </span>
//                         </button>
//                         <button
//                           className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg text-black hover:border-white hover:text-white border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]"
//                           onClick={() => handleAddToWishlist(item.productId)}
//                         >
//                           <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
//                             Add to Wishlist
//                           </span>
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex flex-col items-start gap-2 ml-[-15px]">
//                       <div className="flex items-center gap-1 mr-2">
//                         <div className="text-black text-sm md:text-[16px] font-bold font-karla">
//                           AED&nbsp;{item?.price}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 <Link href="/selling-page">
//                   <button className="w-full h-[40px] md:h-[50px] rounded-lg hover:text-white text-[#e4086f] hover:bg-[#e4086f] hover:border-white border-2 border-[#e4086f] flex justify-center items-center">
//                     <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
//                       Add more items
//                     </span>
//                   </button>
//                 </Link>
//               </div>

//               <div className="w-full lg:w-1/4 mt-8 lg:mt-[-50px]">
//                 {isCouponApplied ? (
//                   <div className="bg-white flex justify-between items-center border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
//                     <p className="text-[#4f4f4f] text-sm md:text-[18px] font-bold font-karla">
//                       {appliedCoupon}
//                     </p>
//                     <button
//                       onClick={handleRemoveCoupon}
//                       className="px-4 py-2 bg-[#e4086f] rounded-2xl text-white"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="bg-white flex justify-between items-center border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
//                     <p className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
//                       Available coupons
//                     </p>
//                     <button
//                       onClick={() => setIsCouponPopupVisible(true)}
//                       className="px-4 py-2 bg-[#e4086f] rounded-2xl text-white"
//                     >
//                       Show
//                     </button>
//                   </div>
//                 )}

//                 {!isCouponApplied && (
//                   <div className="bg-white border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
//                     <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
//                       Have a coupon?
//                     </div>
//                     <div className="flex gap-4 mt-2">
//                       <input
//                         type="text"
//                         placeholder="Add coupon"
//                         className="w-[150px] md:w-[200px] h-[36px] p-2 border border-[#b4b4b4] rounded-lg text-sm font-karla outline-[#e4086f] outline-4"
//                       />
//                       <button className="text-[#e4086f] text-sm md:text-[16px] font-medium">
//                         Apply
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-xl">
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
//                       Subtotal:
//                     </div>
//                     <div className="text-[#292929] text-sm md:text-[16px] font-karla">
//                       AED {subtotal.toFixed(2)}
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
//                       Discount:
//                     </div>
//                     <div className="text-[#e4086f] text-sm md:text-[16px] font-karla">
//                       AED {discount.toFixed(2)}
//                     </div>
//                   </div>
//                   <div className="w-full h-px bg-gray-200 mb-2"></div>
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="text-[#1c1c1c] text-base md:text-[18px] font-semibold">
//                       Total:
//                     </div>
//                     <div className="text-[#e4086f] text-base md:text-[18px] font-bold">
//                       AED {total.toFixed(2)}
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleCheckout}
//                     disabled={
//                       loading || processingPayment || selectedCount === 0
//                     }
//                     className="w-full h-[40px] p-2 bg-[#fde504] rounded-lg md:rounded-[16px] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <div className="text-center text-[#070707] text-sm md:text-[14px] font-medium">
//                       {processingPayment
//                         ? "Processing Payment..."
//                         : loading
//                         ? "Processing..."
//                         : "Pay with Stripe"}
//                     </div>
//                   </button>

//                   <div className="flex justify-around mt-3">
//                     <img className="h-5" src="/payment1.png" alt="Payment1" />
//                     <img
//                       className="h-5"
//                       src="/mastercard.png"
//                       alt="MasterCard"
//                     />
//                     <img className="h-5" src="/paypal.png" alt="PayPal" />
//                     <img className="h-5" src="/visa.png" alt="Visa" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="w-full h-[50vh] flex justify-center items-center">
//             <div className="text-center">
//               <h2 className="font-luckiest text-4xl mb-4">No items here :</h2>
//               <Link
//                 className="text-pink-400 font-karla text-xl"
//                 href={"/selling-page"}
//               >
//                 Continue purchase
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>

//       {isCouponPopupVisible && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-4 shadow-lg">
//             <h2 className="text-lg font-bold mb-4 text-center">
//               Available Coupons
//             </h2>
//             <ul className="space-y-3">
//               {coupons.map((coupon) => (
//                 <li
//                   key={coupon.id}
//                   className="flex justify-between items-center border p-2 rounded-lg"
//                 >
//                   <div>
//                     <div className="font-semibold">{coupon.code}</div>
//                     <div className="text-sm text-gray-500">
//                       {coupon.description}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleApplyCoupon(coupon.code)}
//                     className="px-4 py-2 bg-[#e4086f] text-white rounded-lg"
//                   >
//                     Apply
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={() => setIsCouponPopupVisible(false)}
//               className="mt-4 w-full px-4 py-2 bg-gray-300 rounded-lg text-black"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {errorPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
//             <p className="text-red-600 font-semibold text-center">
//               {errorMessage}
//             </p>
//             <button
//               onClick={() => setErrorPopupOpen(false)}
//               className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {cart.length > 0 && showAddress && <CartAddress />}
//       <DownloadKuku />
//       <Footer />
//     </>
//   );
// }

"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/store/cart/cartSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function Cart() {
  const [isCouponPopupVisible, setIsCouponPopupVisible] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isCouponApplied, setisCouponApplied] = useState(false);
  const [subtotal, setSubtotal] = useState(250); // Initial subtotal
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState({});
  const [cart, setCart] = useState({});
  const dispatch = useDispatch();
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    setisCouponApplied(false);
    setDiscount(0); // Reset discount
  };
  const handleRemove = async (id) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/cart/${id}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   
      setCart(response.data.cart);
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };
  const coupons = [
    {
      id: 1,
      code: "SAVE10",
      description: "Get 10% off on your order",
      type: "percentage",
      value: 10,
    },
    {
      id: 2,
      code: "FREESHIP",
      description: "Free shipping on orders over AED 100",
      type: "freeShipping",
    },
    {
      id: 3,
      code: "DISCOUNT20",
      description: "Flat 20 AED off on all items",
      type: "flat",
      value: 20,
    },
  ];

  const handleApplyCoupon = (couponCode) => {
    const coupon = coupons.find((c) => c.code === couponCode);
    console.log(coupon);

    if (coupon) {
      setAppliedCoupon(couponCode);
      setIsCouponPopupVisible(false);
      setisCouponApplied(true);

      // Calculate discount based on coupon type
      if (coupon.type === "percentage") {
        setDiscount((subtotal * coupon.value) / 100);
      } else if (coupon.type === "flat") {
        setDiscount(coupon.value);
      } else if (coupon.type === "freeShipping") {
        // No discount, but you can show a free shipping message
        setDiscount(0);
      }
    }
  };

  // const total = subtotal - discount;

  const subTotal = cartItems.reduce(
    (total, item) => total + item?.pricing?.currentPrice,
    0
  );
  const total = subtotal - discount;

  // Update state dynamically
  useEffect(() => {
    setSubtotal(subTotal);
  }, [cartItems, discount]);

  const token = useSelector((store) => store.auth.token);

  const username = useSelector((store) => store.auth.user);

  const router = useRouter();
  // useEffect(() => {
  //   if (!token) {
  //     router.push("/");
  //   }
  // }, [token]);

  const fetchCartDetails = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get/cart`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setCart(response.data.cart);
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (id) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));

      // Make the POST request to your API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/wishlist/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } // or any other data you need to send
      );

      if (response.status === 201) {
        // If the request is successful, dispatch the action to add to cart

        // Navigate to the cart page
        router.push("/wishlist");
      } else {
        // Handle the case where the request is not successful
        console.error(
          "Failed to add product to wishlist:",
          response.statusText
        );
        setErrorMessage(`Failed to submit offer: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(
        "An error occurred while adding product to wishlist:",
        error
      );
      setErrorMessage(` ${error.response?.data?.message || error.message}`);
      setErrorPopupOpen(true);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCartDetails();
    }
  }, [token]);

  return (
    <>
      <Header />
      <div className="px-4 py-8 md:px-8 lg:px-[70px] lg:py-[70px]">
        {/* Title Section */}
        <div className="text-[#070707] text-2xl md:text-3xl lg:text-[36.8px] font-normal font-luckiest leading-tight mb-6">
          YOUR CART
        </div>

        {/* Checkbox and Selected Items */}
        {cart.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <div className="text-[#4f4f4f] text-sm md:text-xl font-normal font-karla">
                1/1 Items selected
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              {/* Left Section: Cart */}
              <div className="w-full lg:w-2/3">
                {cart.map((item) => {
                  return (
                    <>
                      <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
                        <label className="custom-checkbox">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>

                        {/* Product Image */}
                        <img
                          className="w-24 h-auto md:w-[159.2px] rounded-md"
                          src={item?.images?.[0]}
                          alt="Product"
                        />

                        {/* Product Info */}
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
                                  {item?.size}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                                CONDITION:
                              </span>
                              <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                                {item?.condition}
                              </span>
                            </div>
                          </div>

                          {/* Buttons */}
                          <div className="flex flex-col md:flex-row mt-2 gap-4 w-full">
                            {/* <Link href="/selling-page"> */}
                            <button
                              onClick={() => handleRemove(item._id)}
                              className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg hover:border-white hover:text-white text-black border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]"
                            >
                              <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
                                Remove
                              </span>
                            </button>
                            {/* </Link> */}
                            {/* <Link href="/wishlist"> */}
                            <button
                              className="w-full md:w-[200px] h-[40px] md:h-[50px] rounded-lg text-black hover:border-white hover:text-white border-2 border-[#0f0f0f] flex justify-center items-center hover:bg-[#e4086f]"
                              onClick={() => handleAddToWishlist(item._id)}
                            >
                              <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
                                Add to Wishlist
                              </span>
                            </button>
                            {/* </Link> */}
                          </div>
                        </div>

                        {/* Price and Discount */}
                        <div className="flex flex-col items-start gap-2 ml-[-15px]">
                          <div className="flex items-center gap-1 mr-2">
                            {" "}
                            {/* Adjusted with a negative margin */}
                            <div className="text-black text-sm md:text-[16px] font-bold font-karla">
                              AED{item?.pricing?.currentPrice}
                            </div>
                            <div className="text-[#30bd75] text-sm md:text-[16px] font-bold font-karla whitespace-nowrap">
                              ({item?.pricing?.discountPercentage}% OFF)
                            </div>
                          </div>
                          <div className="text-[#b4b4b4] text-sm md:text-xl font-normal font-karla line-through">
                            MRP AED{item?.pricing?.originalPrice}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}

                {/* Add More Items Button */}
                <Link href="/selling-page">
                  <button className="w-full h-[40px] md:h-[50px] rounded-lg hover:text-white text-[#e4086f] hover:bg-[#e4086f] hover:border-white border-2 border-[#e4086f] flex justify-center items-center">
                    <span className="text-sm md:text-[14px] font-bold font-karla uppercase">
                      Add more items
                    </span>
                  </button>
                </Link>
              </div>

              {/* Right Section: Coupon and Pricing Summary */}
              <div className="w-full lg:w-1/4 mt-8 lg:mt-[-50px]">
                {isCouponApplied ? (
                  <>
                    <div className="bg-white flex justify-between items-center border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
                      <p className="text-[#4f4f4f] text-sm md:text-[18px] font-bold font-karla">
                        {appliedCoupon}
                      </p>
                      <button
                        onClick={handleRemoveCoupon}
                        className="px-4 py-2 bg-[#e4086f] rounded-2xl text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white flex justify-between items-center border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
                      <p className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                        Available coupons
                      </p>
                      <button
                        onClick={() => setIsCouponPopupVisible(true)}
                        className="px-4 py-2 bg-[#e4086f] rounded-2xl text-white"
                      >
                        Show
                      </button>
                    </div>
                  </>
                )}

                {/* Coupon Section */}
                {!isCouponApplied && (
                  <div className="bg-white border border-gray-100 rounded-lg shadow-xl p-4 mb-4">
                    <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                      Have a coupon?
                    </div>
                    <div className="flex gap-4 mt-2">
                      <input
                        type="text"
                        placeholder="Add coupon"
                        className="w-[150px] md:w-[200px] h-[36px] p-2 border border-[#b4b4b4] rounded-lg text-sm font-karla outline-[#e4086f] outline-4"
                      />
                      <button className="text-[#e4086f] text-sm md:text-[16px] font-medium">
                        Apply
                      </button>
                    </div>
                  </div>
                )}

                {/* Pricing Summary */}
                <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                      Subtotal:
                    </div>
                    <div className="text-[#292929] text-sm md:text-[16px] font-karla">
                      AED {subtotal.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-[#4f4f4f] text-sm md:text-[16px] font-karla">
                      Discount:
                    </div>
                    <div className="text-[#e4086f] text-sm md:text-[16px] font-karla">
                      AED {discount.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-200 mb-2"></div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-[#1c1c1c] text-base md:text-[18px] font-semibold">
                      Total:
                    </div>
                    <div className="text-[#e4086f] text-base md:text-[18px] font-bold">
                      AED {total.toFixed(2)}
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full h-[40px] p-2 bg-[#fde504] rounded-lg md:rounded-[16px] mt-2">
                    <div className="text-center text-[#070707] text-sm md:text-[14px] font-medium">
                      Checkout
                    </div>
                  </button>

                  {/* Payment Methods */}
                  <div className="flex justify-around mt-3">
                    <img className="h-5" src="/payment1.png" alt="Payment1" />
                    <img
                      className="h-5"
                      src="/mastercard.png"
                      alt="MasterCard"
                    />
                    <img className="h-5" src="/paypal.png" alt="PayPal" />
                    <img className="h-5" src="/visa.png" alt="Visa" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-[50vh] flex justify-center items-center">
              <div className="text-center ">
                <h2 className="font-luckiest text-4xl mb-4">
                  No items here :(
                </h2>
                <Link
                  className="text-pink-400 font-karla text-xl"
                  href={"/selling-page"}
                >
                  Continue purchase
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      {isCouponPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center">
              Available Coupons
            </h2>
            <ul className="space-y-3">
              {coupons.map((coupon) => (
                <li
                  key={coupon.id}
                  className="flex justify-between items-center border p-2 rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{coupon.code}</div>
                    <div className="text-sm text-gray-500">
                      {coupon.description}
                    </div>
                  </div>
                  <button
                    onClick={() => handleApplyCoupon(coupon.code)}
                    className="px-4 py-2 bg-[#e4086f] text-white rounded-lg"
                  >
                    Apply
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsCouponPopupVisible(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-300 rounded-lg text-black"
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
      <DownloadKuku />
      <Footer />
    </>
  );
}

"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import CartAddress from "@/components/userProfile/CartAddress";
import toast from "react-hot-toast";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Cart() {
  const [isCouponPopupVisible, setIsCouponPopupVisible] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { token } = useSelector((store) => store.auth);
  const router = useRouter();

  const fetchCoupons = async () => {
    try {
      setCouponLoading(true);
      if (!token) throw new Error("No auth token available");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/coupon/getCoupons`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data && response.data.coupons) {
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

  const isCouponApplicable = (coupon) => {
    if (subtotal < coupon.minPurchase) {
      return {
        applicable: false,
        reason: `Minimum purchase of AED ${coupon.minPurchase} required`,
      };
    }
    if (coupon.usedCount >= coupon.usageLimit) {
      return { applicable: false, reason: "Coupon usage limit exceeded" };
    }
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

  const calculateDiscount = (coupon, amount) => {
    if (coupon.discountType === "Percentage") {
      const discountAmount = (amount * coupon.discountValue) / 100;
      return Number(
        Math.min(discountAmount, coupon.maxDiscount || discountAmount).toFixed(
          2
        )
      );
    } else if (coupon.discountType === "Fixed") {
      return Number(Math.min(coupon.discountValue, amount).toFixed(2));
    }
    return 0;
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    const newSelectedItems = {};
    cart.forEach((item) => {
      newSelectedItems[item._id] = checked;
    });
    setSelectedItems(newSelectedItems);
    calculateTotals(newSelectedItems);
  };

  const handleSelectItem = (itemId, checked) => {
    const newSelectedItems = { ...selectedItems, [itemId]: checked };
    setSelectedItems(newSelectedItems);
    setSelectAll(Object.values(newSelectedItems).every((value) => value));
    calculateTotals(newSelectedItems);
  };

  const calculateTotals = (selected) => {
    const total = cart.reduce((sum, item) => {
      if (selected[item._id]) {
        const price = item.offerPrice || item.price || 0;
        return sum + price * (item.qty || 1);
      }
      return sum;
    }, 0);
    setSubtotal(total);

    if (isCouponApplied && appliedCoupon) {
      const coupon = coupons.find((c) => c.code === appliedCoupon);
      if (coupon) {
        const applicabilityCheck = isCouponApplicable(coupon);
        if (applicabilityCheck.applicable) {
          const newDiscount = calculateDiscount(coupon, total);
          setDiscount(newDiscount);
        } else {
          setAppliedCoupon("");
          setIsCouponApplied(false);
          setDiscount(0);
          setCouponCode("");
          toast.error(applicabilityCheck.reason);
        }
      }
    }
  };

  const prepareItemsForStripe = (items) => {
    const totalPrice = items.reduce(
      (sum, item) =>
        sum + (item.offerPrice || item.price || 0) * (item.qty || 1),
      0
    );
    const discountProportion =
      discount > 0 && totalPrice > 0 ? discount / totalPrice : 0;

    return items.map((item) => {
      let imageUrl = item.image;
      if (imageUrl && !imageUrl.startsWith("http")) {
        imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`;
      }
      const price = item.offerPrice || item.price || 0;
      const discountedPrice =
        discountProportion > 0
          ? Number(
              (
                Math.max(0, price * (1 - discountProportion)) * (item.qty || 1)
              ).toFixed(2)
            )
          : Number((price * (item.qty || 1)).toFixed(2));

      return {
        product: item.productId,
        name: item.name || "Product",
        description: item.description || "No description available",
        image: imageUrl,
        price: discountedPrice,
        count: item.qty || 1,
        size: item.size?.sizeName || "Standard",
        condition: item.condition?.conditionName || "New",
        offerId: item.offerId || null,
      };
    });
  };

  const reAddOfferToCart = async (offerId) => {
    try {
      let user = JSON.parse(Cookies.get("user") || "{}");
      if (!user?._id) throw new Error("User not found");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add-offer`,
        { offerId, userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCartDetails();
      toast.success("Offer re-added to cart. Try checkout again.");
      return true;
    } catch (error) {
      console.error("Error re-adding offer to cart:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to re-add offer to cart";
      if (errorMsg.includes("already sold")) {
        toast.error("This item has been sold. Please remove it from cart.");
      } else {
        toast.error(
          errorMsg + ". Please add the offer item again from the offers page."
        );
      }
      return false;
    }
  };

  const handleCheckout = async () => {
    setShowAddress(false);
    try {
      setLoading(true);
      setProcessingPayment(true);
      console.log("Starting checkout process...");
      console.log("Auth Token:", token);
      console.log("Cart:", cart);
      console.log("Selected Items:", selectedItems);

      if (!token) {
        console.error("No auth token found");
        setErrorMessage("Please log in to proceed with checkout");
        setErrorPopupOpen(true);
        return;
      }

      const selectedProducts = cart.filter((item) => selectedItems[item._id]);
      if (selectedProducts.length === 0) {
        console.log("No products selected");
        setErrorMessage("Please select at least one item to checkout");
        setErrorPopupOpen(true);
        return;
      }

      if (!selectedAddress?._id) {
        console.log("No shipping address selected");
        setErrorMessage("Please select a shipping address before proceeding.");
        setErrorPopupOpen(true);
        return;
      }

      // Check if total amount is at least AED 50
      const finalAmount = subtotal - discount;
      if (finalAmount < 50) {
        console.log("Total amount is less than AED 50");
        setErrorMessage("Total amount must be at least AED 50 to proceed with checkout");
        setErrorPopupOpen(true);
        return;
      }

      // Validate offer-based items
      const invalidOfferItems = selectedProducts.filter(
        (item) => item.offerId && (!item.offerPrice || item.offerPrice <= 0)
      );
      if (invalidOfferItems.length > 0) {
        console.error("Invalid offer items:", invalidOfferItems);
        setErrorMessage(
          "One or more offer items have invalid offer prices. Please remove and add again from the offers page."
        );
        setErrorPopupOpen(true);
        return;
      }

      let user;
      try {
        user = JSON.parse(Cookies.get("user"));
        console.log("User data retrieved:", user ? "Success" : "No user data");
      } catch (cookieError) {
        console.error("Error parsing user cookie:", cookieError);
        throw new Error("Invalid user data");
      }

      const total = subtotal - discount;

      const offerProducts = selectedProducts
        .filter((item) => item.offerId)
        .map((item) => ({
          product: item.productId,
          productName: item.name,
          quantity: item.qty || 1,
          price: item.offerPrice || item.price,
          offerId: item.offerId,
          size: item.size?.sizeName || "",
        }));

      const regularProducts = selectedProducts
        .filter((item) => !item.offerId)
        .map((item) => ({
          product: item.productId,
          productName: item.name,
          quantity: item.qty || 1,
          price: item.price,
          size: item.size?.sizeName || "",
        }));

      console.log("Offer Products:", offerProducts);
      console.log("Regular Products:", regularProducts);

      let offerOrderResponse = null;
      let regularOrderResponse = null;

      if (offerProducts.length > 0) {
        const offerOrderData = {
          products: offerProducts,
          totalAmount: offerProducts.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          discount: discount,
          couponCode: appliedCoupon || null,
          buyer: user?._id,
          buyerName: user?.name || "",
          finalAmount: total,
          shippingAddress: selectedAddress._id,
          paymentMethod: "Credit Card",
        };

        console.log("Offer Order Data:", offerOrderData);

        offerOrderResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/create-offer`,
          offerOrderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Offer Order API Response:", {
          status: offerOrderResponse.status,
          statusText: offerOrderResponse.statusText,
          data: offerOrderResponse.data,
        });

        if (!offerOrderResponse.data.order) {
          throw new Error("Failed to create offer order");
        }
      }

      if (regularProducts.length > 0) {
        const regularOrderData = {
          products: regularProducts,
          totalAmount: regularProducts.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          discount: appliedCoupon ? discount : 0,
          couponCode: appliedCoupon || null,
          buyer: user?._id,
          buyerName: user?.name || "",
          finalAmount: regularProducts.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          shippingAddress: selectedAddress._id,
          paymentMethod: "Credit Card",
        };

        console.log("Regular Order Data:", regularOrderData);

        regularOrderResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/create`,
          regularOrderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Regular Order API Response:", {
          status: regularOrderResponse.status,
          statusText: regularOrderResponse.statusText,
          data: regularOrderResponse.data,
        });

        if (!regularOrderResponse.data.order) {
          throw new Error("Failed to create regular order");
        }
      }

      const stripeItems = prepareItemsForStripe(selectedProducts);
      console.log(
        "Stripe items prepared:",
        JSON.stringify(stripeItems, null, 2)
      );

      if (stripeItems.length === 0) {
        console.error("No items prepared for Stripe payment");
        throw new Error("No items selected for payment");
      }

      if (offerOrderResponse) {
        try {
          const stripeResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkout-offer`,
            {
              products: stripeItems.filter((item) => item.offerId),
              orderId: offerOrderResponse.data.order._id,
              discount: discount,
              finalAmount: total,
              shippingAddress: selectedAddress._id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const session = stripeResponse.data;
          console.log("Offer Stripe session:", session);

          if (session?.id) {
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
              sessionId: session.id,
            });

            if (error) {
              console.error("Error redirecting to offer checkout:", error);
              setErrorMessage(
                "Offer payment processing failed. Please try again."
              );
              setErrorPopupOpen(true);
              return;
            }
          } else {
            throw new Error("Failed to create offer payment session");
          }
        } catch (error) {
          console.error("Checkout-offer error:", error);
          const errorMsg = error.response?.data?.message || error.message;
          if (
            errorMsg.includes("not in a valid checkout state") &&
            offerProducts.length > 0
          ) {
            setErrorMessage(
              "Offer is not in a valid state. Attempting to re-add offer to cart..."
            );
            setErrorPopupOpen(true);
            const reAdded = await reAddOfferToCart(offerProducts[0].offerId);
            if (reAdded) {
              setErrorMessage(
                "Offer re-added to cart. Please try checkout again."
              );
              setErrorPopupOpen(true);
              return;
            } else {
              setErrorMessage(
                errorMsg.includes("already sold")
                  ? "This item has been sold. Please remove it from cart."
                  : "Failed to re-add offer to cart. Please add the offer item again from the offers page."
              );
              setErrorPopupOpen(true);
              return;
            }
          }
          throw error;
        }
      }

      if (regularOrderResponse) {
        const stripeResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/buyMakePayment`,
          {
            products: stripeItems.filter((item) => !item.offerId),
            orderId: regularOrderResponse.data.order._id,
            discount: 0,
            finalAmount: regularProducts.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const session = stripeResponse.data;
        console.log("Regular Stripe session:", session);

        if (session?.id) {
          const stripe = await stripePromise;
          const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (error) {
            console.error("Error redirecting to regular checkout:", error);
            setErrorMessage(
              "Regular payment processing failed. Please try again."
            );
            setErrorPopupOpen(true);
            return;
          }
        } else {
          throw new Error("Failed to create regular payment session");
        }
      }

      // Update cart after successful order creation
      await fetchCartDetails();
      setSelectedItems({});
      toast.success("Order created successfully, redirecting to payment...");
    } catch (error) {
      console.error("Checkout Error Details:", {
        message: error.message,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        stack: error.stack,
      });

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to process checkout";

      if (errorMsg.includes("shippingAddress")) {
        setErrorMessage("Please provide a valid shipping address.");
      } else if (errorMsg.includes("User not authenticated")) {
        setErrorMessage("Please log in to proceed with checkout");
      } else if (errorMsg.includes("already sold")) {
        setErrorMessage("One or more offer items have already been sold.");
        await fetchCartDetails();
      } else {
        setErrorMessage(errorMsg);
      }
      setErrorPopupOpen(true);
    } finally {
      setLoading(false);
      setProcessingPayment(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    setIsCouponApplied(false);
    setDiscount(0);
    setCouponCode("");
  };

  const handleRemove = async (item) => {
    try {
      let id = item.productId;
      let _id = item._id;
      console.log("Auth Token for handleRemove:", token);
      if (!token) throw new Error("No auth token available");
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/remove/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      let newUpdatedData = cart.filter((el) => el.productId !== id);
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
      setIsCouponApplied(true);
      setDiscount(discountAmount);
      setCouponCode(couponCode);
      toast.success(`Coupon ${couponCode} applied successfully!`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

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
      setIsCouponApplied(true);
      setDiscount(discountAmount);
      toast.success(`Coupon ${coupon.code} applied successfully!`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const fetchCartDetails = async () => {
    try {
      console.log("Auth Token for fetchCartDetails:", token);
      if (!token) {
        setErrorMessage("Please log in to view your cart");
        setErrorPopupOpen(true);
        return;
      }
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/details`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const products = response.data.products || [];
        console.log("response of user cart...", products);
        
        setCart(products);

        const invalidOfferItems = products.filter(
          (item) => item.offerId && (!item.offerPrice || item.offerPrice <= 0)
        );
        if (invalidOfferItems.length > 0) {
          toast.error(
            "Some offer items have invalid prices. Please remove and add again."
          );
          const validProducts = products.filter(
            (item) => !item.offerId || (item.offerPrice && item.offerPrice > 0)
          );
          setCart(validProducts);
        }

        const initialSelected = {};
        products.forEach((item) => {
          initialSelected[item._id] = false;
        });
        setSelectedItems(initialSelected);
        setSelectAll(false);
      } else {
        setErrorMessage("Failed to fetch cart details. Please try again.");
        setErrorPopupOpen(true);
      }
    } catch (err) {
      console.error("Failed to fetch cart details:", err);
      setErrorMessage(
        err.response?.data?.message || "Failed to fetch cart details. Please try again."
      );
      setErrorPopupOpen(true);
    }
  };

  const handleAddToWishlist = async (id) => {
    try {
      console.log("Auth Token for handleAddToWishlist:", token);
      if (!token) throw new Error("No auth token available");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
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
    if (token) {
      fetchCartDetails();
      fetchCoupons();
    } else {
      setErrorMessage("Please log in to view your cart");
      setErrorPopupOpen(true);
    }

    const query = new URLSearchParams(window.location.search);
    const success = query.get("success");
    const canceled = query.get("canceled");

    if (success) {
      toast.success("Payment completed successfully!");
      fetchCartDetails();
    }
    if (canceled) {
      toast.error("Payment was canceled.");
    }
  }, [token]);

  useEffect(() => {
    calculateTotals(selectedItems);
  }, [cart, selectedItems]);

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;
  const totalItems = cart.length;

  const handleShowAddress = () => {
    setShowAddress(true);
  };

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

                    <Image
                      className="rounded-md"
                      src={item?.image || "/placeholder.png"}
                      alt="Product"
                      width={159}
                      height={200}
                    />

                    <div className="flex flex-col justify-start items-start gap-3 w-full">
                      <div>
                        <div className="text-black text-lg md:text-[18px] font-bold font-karla">
                          {item?.name || "Unnamed Product"}
                        </div>
                        <div className="text-[#b4b4b4] text-sm md:text-base font-normal font-karla">
                          {item?.description || "No description"}
                          {item.offerId && item.offerPrice ? (
                            <span className="text-[#30bd75] font-bold">
                              {" "}
                              (Offer Price: AED {item.offerPrice?.toFixed(2)})
                            </span>
                          ) : item.offerId ? (
                            <span className="text-[#ff0000] font-bold">
                              {" "}
                              (Invalid Offer Price)
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex justify-between md:justify-start items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                            SIZE
                          </div>
                          <div className="inline-flex border border-[#e4086f] justify-center items-center px-2 py-1">
                            <div className="text-[#e4086f] text-sm md:text-[16px] font-normal font-karla">
                              {item?.size?.sizeName || "N/A"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[#383838] text-sm md:text-[16px] font-bold font-karla">
                            CONDITION:
                          </span>
                          <span className="text-[#383838] size-sm md:text-[16px] font-bold font-karla">
                            {item?.condition?.conditionName || "N/A"}
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
                          AED {(item.offerPrice || item.price || 0).toFixed(2)}
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
                      AED {(subtotal - discount).toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={
                      loading ||
                      processingPayment ||
                      selectedCount === 0 ||
                      !selectedAddress
                    }
                    className="w-full h-[40px] p-2 bg-[#fde504] rounded-lg md:rounded-[16px] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-center text-[#070707] text-sm md:text-[14px] font-medium">
                      {processingPayment
                        ? "Processing Payment..."
                        : loading
                        ? "Processing..."
                        : "Pay Now"}
                    </div>
                  </button>

                  <div className="flex justify-around mt-3">
                    <Image
                      className="h-5"
                      src="/visa.png"
                      alt="Visa"
                      width={40}
                      height={20}
                    />
                    <Image
                      className="h-5"
                      src="/mastercard.png"
                      alt="MasterCard"
                      width={40}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>

            {selectedCount > 0 && !showAddress && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleShowAddress}
                  className="px-6 py-2 bg-[#e4086f] text-white rounded-lg hover:bg-[#c5076b]"
                >
                  Select Shipping Address
                </button>
              </div>
            )}
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

      {showAddress && <CartAddress onAddressSelect={setSelectedAddress} />}

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

      <DownloadKuku />
      <Footer />
    </>
  );
}
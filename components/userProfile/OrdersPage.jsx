



"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const details = useSelector((state) => state.auth.user);
  const id = details?._id;

  useEffect(() => {
    setUserId(id);
  }, [id]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        const token = Cookies.get("auth");
        if (!token) {
          toast.error("Please login to view orders");
          setLoading(false);
          return;
        }
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/UserOrders/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-luckiest mb-8 text-center md:text-left">
        All Orders
      </h1>
      <div className="flex-1 mt-[70px]">
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Image
                  src="/delivery_icon.png"
                  alt="Delivery"
                  width={20}
                  height={20}
                  className="w-8 h-8"
                />
                <div>
                  <span className="text-pink-500 font-medium">
                    {order.orderStatus}
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    {new Date(order.paidAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {order.products.map((product, index) => (
                <div key={product._id} className="flex items-start gap-6 mb-6">
                  <div className="w-[120px] h-[120px] flex-shrink-0">
                    <Image
                      src={product.product?.images?.[0] || "/product-image.png"}
                      alt={product.productName}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-2">
                      {product.isRental && (
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold text-red-500">
                            Rent
                          </h2>
                          {product.product?.rent?.length > 0 && (
                            <span className="text-sm text-gray-500">
                              (RENTAL PERIOD: {new Date(
                                product.product.rent[0].startDate
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                product.product.rent[0].endDate
                              ).toLocaleDateString()})
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-karla font-semibold text-gray-900 mb-1">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.product?.description || "No description"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Brand:{" "}
                          {product.product?.brand?.brandName || "Unknown Brand"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[15px] font-semibold">
                          AED{order.finalAmount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          MRP AED{order.totalAmount.toFixed(2)}
                        </p>
                        <span className="text-green-500 text-sm">
                          {order.discount > 0
                            ? `${((order.discount / order.totalAmount) * 100).toFixed(0)}%OFF`
                            : "No Discount"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-8 mt-6 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">SIZE</span>
                        <span className="px-2 py-0.5 border border-[#E4086F] text-[#E4086F] rounded text-sm bg-white">
                          {product.product?.size?.sizeName || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-karla text-sm font-semibold">
                          CONDITION:
                        </span>
                        <span className="text-sm text-gray-500 font-semibold">
                          {product.product?.condition?.conditionName || "Unknown Condition"}
                        </span>
                      </div>
                    </div>

                    {index === 0 && (
                      <div className="flex gap-4">
                        <Link href={`/orderdetails?orderId=${order._id}`}>
                          <button className="text-blue-500 font-medium text-sm border-b border-blue-500">
                            ORDER DETAILS
                          </button>
                        </Link>
                        {/* {order.orderStatus === "Delivered" && (
                          <Link href={`/returnorder?orderId=${order._id}`}>
                            <button className="text-pink-500 font-medium text-sm border-b border-pink-500">
                              RETURN ORDER
                            </button>
                          </Link>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
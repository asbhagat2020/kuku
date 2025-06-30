"use client";
import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export const Orders = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Orders");

  const orderData = [
    {
      id: "122-44445555-55555",
      status: "Delivered",
      datePlaced: "June 2, 2024",
      dateDelivered: "June 5",
      total: "AED 120",
      shipTo: "Dubai Mall",
      productImage: "/orders-image.png",
      discount: "",
      originalPrice: "MRP AED 650",
      discountedPrice: "AED 250 (55% OFF)",
    },
  ];

  const renderTabContent = () => {
    if (activeTab === "Orders") {
      return (
        <>
          {orderData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-300 rounded-lg mb-8 shadow-md p-6 h-500"
            >
              <div className="border-b pb-4 mb-4 flex justify-between items-center bg-[#F7F7F6] -mt-6 px-1">
                <div className="grid grid-cols-3 text-gray-500 text-sm mr-3 gap-[45px]">
                  <div>
                    <p>Order placed:</p>
                    <p className="font-semibold text-black">June 2, 2024</p>
                  </div>
                  <div>
                    <p>Total:</p>
                    <p className="font-semibold text-black">AED 120</p>
                  </div>
                  <div>
                    <p>Ship to:</p>
                    <p className="font-semibold text-black">Dubai Mall</p>
                  </div>
                </div>

                <div>
                  <p
                    className="font-semibold mb-2"
                    style={{
                      color: "#525252",
                      textShadow:
                        "4px 4px 8px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Order #122-44445555-55555
                  </p>

                  <div className="flex items-center space-x-3">
                    <button
                      className="font-semibold underline text-sm"
                      style={{ color: "#30BD75" }}
                    >
                      View order details
                    </button>
                    <span>|</span>
                    <button
                      className="font-semibold underline text-sm"
                      style={{ color: "#30BD75" }}
                    >
                      View invoice
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 text-yellow-800 rounded-md px-4 py-3 flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 mr-2" />
                  <p className="text-sm">
                    Please rate your experience with the seller
                  </p>
                </div>
                <button className="text-xl font-bold text-yellow-800">×</button>
              </div>

              <div>
                <div className="flex items-center mb-2" style={{ textAlign: "left" }}>
                  <img
                    src="/green-tick.png"
                    alt="Delivered Icon"
                    className="w-4 h-4 mr-2"
                  />
                  <p className="text-black font-bold">
                    {item.status}, {item.dateDelivered}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <img
                    src={item.productImage}
                    alt="Product"
                    className="w-32 h-34 object-cover rounded-md mr-6"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-bold text-black mb-2">
                      Lorem ipsum dolor sit amet consectetur. Cursus
                      <br />
                      facilisi ipsum vel risus venenatis sit sit risus
                      ultricies.
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Lorem ipsum dolor sit amet consectetur. Sed lobortis diam.
                    </p>

                    <div className="flex space-x-4">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                        View Your Item
                      </button>
                      <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md text-sm">
                        Track Order
                      </button>
                    </div>
                  </div>
                  <div className="text-right mb-[113px]">
                    <p className="font-bold text-gray-900">
                      {item.discountedPrice}
                    </p>
                    <p className="line-through text-gray-500 text-sm">
                      {item.originalPrice}
                    </p>
                    <p className="text-green-600 font-semibold text-sm">
                      {item.discount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return <p className="text-gray-500 text-center">No items in this tab.</p>;
    }
  };

  return (
    <div className="bg-white-100 min-h-screen text-black font-sans">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-luckiest">Your Orders</h1>
          <div
            className="bg-[#F3F3F2] text-black rounded-full px-3 py-1 text-lg"
            style={{
              marginRight: "840px",
            }}
          >
            2
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div
            className="bg-gray-200 rounded-lg flex items-start gap-4"
            style={{
              width: "500px",
              padding: "8px",
            }}
          >
            {["Orders", "Not yet shipped", "Cancelled orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-semibold transition-transform duration-300 ${
                  activeTab === tab ? "bg-white text-black" : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <select className="bg-gray-200 text-black px-4 py-2 rounded-md">
            <option>Past Week</option>
            <option>Past Month</option>
            <option>Past Year</option>
          </select>
        </div>

        {renderTabContent()}

        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-black text-white rounded-md">
              1
            </button>
            <button className="px-4 py-2 bg-gray-200 text-black rounded-md">
              2
            </button>
            <button className="px-4 py-2 bg-gray-200 text-black rounded-md">
              3
            </button>
          </div>
          <button className="bg-yellow-500 text-black px-6 py-2 rounded-md">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

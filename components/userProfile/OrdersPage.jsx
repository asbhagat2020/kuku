"use client"

import { useState } from 'react';
import Image from 'next/image';

const OrdersPage = () => {
  const [activeSection, setActiveSection] = useState('orders');

  const orders = [
    {
      id: 1,
      productName: "AMIRI | Men Oversize T-shirt",
      description: "Lorem ipsum dollor dummy text",
      price: 250.00,
      mrp: 650,
      discount: "55%OFF",
      size: "OS",
      condition: "GOOD",
      deliveryDate: "Dec Tue 31'Dec",
      image: "/product-image.png"
    },
    {
      id: 2,
      productName: "AMIRI | Men Oversize T-shirt",
      description: "Lorem ipsum dollor dummy text",
      price: 250.00,
      mrp: 650,
      discount: "55%OFF",
      size: "OS",
      condition: "GOOD",
      deliveryDate: "Dec Tue 31'Dec",
      image: "/product-image.png"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-8">
         <div className="w-full md:w-64">
         <h1 className="text-4xl font-luckiest mb-8 text-center md:text-left">
            All Orders
          </h1>
      {/* Sidebar */}
     
        <div className="bg-white rounded-lg shadow-sm p-8 w-[300px]">
        
          
          <div className="space-y-8">
            <div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase mb-4">ORDERS</p>
              <div>
                <button 
                  className={`w-full text-left py-1 text-[13px] ${
                    activeSection === 'orders' ? 'text-pink-500 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => setActiveSection('orders')}
                >
                  Order & Returns
                </button>
              </div>
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase mb-4">CREDITS</p>
              <div>
                <button 
                  className={`w-full text-left py-1 text-[13px] ${
                    activeSection === 'coupons' ? 'text-pink-500 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => setActiveSection('coupons')}
                >
                  Coupons
                </button>
              </div>
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase mb-4">ACCOUNTS</p>
              <div className="space-y-2">
                <button 
                  className={`w-full text-left py-1 text-[13px] ${
                    activeSection === 'profile' ? 'text-pink-500 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => setActiveSection('profile')}
                >
                  Profile
                </button>
                <button 
                  className={`w-full text-left py-1 text-[13px] ${
                    activeSection === 'addresses' ? 'text-pink-500 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => setActiveSection('addresses')}
                >
                  Addresses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-16 mt-[70px]">
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Image
                  src="/delivery_icon.png"
                  alt="Delivery"
                  width={20}
                  height={20}
                  className="w-8 h-8"
                />
                <div>
                  <span className="text-pink-500 font-medium">Delivered</span>
                  <span className="text-gray-400 text-sm ml-2">{order.deliveryDate}</span>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="w-[120px] h-[120px] flex-shrink-0">
                  <Image
                    src={order.image}
                    alt={order.productName}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-karla font-semibold text-gray-900 mb-1">{order.productName}</h3>
                      <p className="text-sm text-gray-500">{order.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[15px] font-semibold">AED{order.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-400 line-through">MRP AED{order.mrp}</p>
                      <span className="text-green-500 text-sm">({order.discount})</span>
                    </div>
                  </div>

                  <div className="flex gap-8 mt-6 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">SIZE</span>
                      <span className="px-2 py-0.5 border border-[#E4086F] text-[#E4086F] rounded text-sm bg-white">
                        {order.size}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-karla text-sm font-semibold">CONDITION:</span>
                      <span className="text-sm text-gray-500 font-semibold">{order.condition}</span>
                    </div>
                  </div>

                  <button className="text-pink-500 font-medium text-sm border-b border-pink-500">
                    RETURN ORDER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
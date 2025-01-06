import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ReturnOrderPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [selectedPickupMethod, setSelectedPickupMethod] = useState("");
  const [selectedReimbursement, setSelectedReimbursement] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTrackingScreen, setShowTrackingScreen] = useState(false);

  const steps = [
    { icon: "/bagadd.png", text: "Your Details", active: currentStep === 1 },
    {
      icon: "/returnr.png",
      text: "Reason for Return",
      active: currentStep === 2,
    },
    { icon: "/truck.png", text: "Pickup Method", active: currentStep === 3 },
    {
      icon: "/paymenthand.png",
      text: "Payment Reimbursement",
      active: currentStep === 4,
    },
    { icon: "/review.png", text: "Review & Submit", active: currentStep === 5 },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setShowSuccessModal(true);
  };

  const handleTrackStatus = () => {
    setShowSuccessModal(false);
    setShowTrackingScreen(true);
  };

  if (showTrackingScreen) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">TRACK RETURN STATUS</h1>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex gap-8">
            {/* Left side - Timeline */}
            <div className="w-64">
              <div className="relative">
                {/* Return started */}
                <div className="flex items-start gap-3 mb-8">
                  <div className="w-6 h-6 rounded-full bg-[#E4086F] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Return started</p>
                    <p className="text-[#E4086F] text-sm">
                      Get return label and instructions
                    </p>
                  </div>
                </div>

                {/* Drop off item */}
                <div className="flex items-start gap-3 mb-8">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                  </div>
                  <p className="text-gray-500">
                    Drop off the item by Fri, Jan 3
                  </p>
                </div>

                {/* Refund sent */}
                <div className="flex items-start gap-3 mb-8">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                  </div>
                  <p className="text-gray-500">
                    Refund sent once we get the item
                  </p>
                </div>

                {/* Refund on card */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                  </div>
                  <p className="text-gray-500">Refund on your card</p>
                </div>

                {/* Vertical line connecting circles */}
                <div className="absolute left-3 top-6 w-0.5 h-[calc(100%-24px)] bg-gray-200"></div>
              </div>
            </div>

            {/* Right side - Product details */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src="/delivery_icon.png"
                  alt="Delivery"
                  width={28}
                  height={28}
                />
                <div>
                  <span className="text-[#E4086F] font-medium">Delivered</span>
                  <span className="text-gray-400 text-sm block">
                    On Dec 31'Dec
                  </span>
                </div>
              </div>

              <div className="flex gap-6">
                <Image
                  src="/product-image.png"
                  alt="AMIRI T-shirt"
                  width={120}
                  height={160}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">
                        AMIRI | Men Oversize T-shirt
                      </h3>
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor dummy text
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">AED250.00</span>
                        <span className="text-green-500">(55%OFF)</span>
                      </div>
                      <p className="text-sm text-gray-400 line-through">
                        MRP AED650
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">SIZE</span>
                      <span className="px-2 py-0.5 border border-[#E4086F] text-[#E4086F] rounded text-sm">
                        OS
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">CONDITION:</span>
                      <span className="text-sm">GOOD</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href="/orderdetails">
                      <button className="text-[#00A811] text-sm underline">
                        CANCEL ORDER RETURN
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <div className="flex gap-8 text-sm">
                  <div>
                    <span className="text-gray-500 block">Order Id:</span>
                    <span>#75567Z</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Return Term:</span>
                    <span>02/01/2024</span>
                  </div>
                </div>
              </div>

              <button className="mt-8 w-full bg-[#E4086F] text-white py-3 rounded-full font-medium">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-luckiest font-bold mb-8">
        Return My Order(s)
      </h1>

      <div className="flex gap-12">
        {/* Left Side - Progress Steps */}
        <div className="w-72 bg-white rounded-lg p-6 shadow-md h-fit">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 relative">
                <div
                  className={`w-10 h-10 rounded-full ${
                    step.active || index + 1 < currentStep
                      ? "bg-[#B25CF3]"
                      : "border-2 border-gray-200"
                  } flex items-center justify-center`}
                >
                  <Image
                    src={step.icon}
                    alt={step.text}
                    width={45}
                    height={45}
                    className={
                      step.active || index + 1 < currentStep ? "" : "opacity-50"
                    }
                  />
                </div>
                <span
                  className={`text-sm ${
                    step.active ? "text-[#E4086F] font-medium" : "text-gray-500"
                  }`}
                >
                  {step.text}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-5 top-10 w-0.5 h-14 ${
                      index + 1 < currentStep ? "bg-[#B25CF3]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex-1">
          {currentStep === 1 && (
            <>
              {/* Product Details Box */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex gap-8" style={{ marginTop: "-25px" }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-start gap-4 mb-4">
                      <Image
                        src="/delivery_icon.png"
                        alt="Delivery"
                        width={28}
                        height={28}
                      />
                      <div className="flex flex-col">
                        <span className="text-[#E4086F] font-medium">
                          Delivered
                        </span>
                        <span className="text-gray-400 text-sm">
                          On Dec 31'Dec
                        </span>
                      </div>
                    </div>
                    <Image
                      src="/product-image.png"
                      alt="AMIRI T-shirt"
                      width={180}
                      height={600}
                      className="rounded-md object-cover h-[160px]"
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="flex justify-between items-start"
                      style={{ marginTop: "62px" }}
                    >
                      <div>
                        <h3 className="font-medium">
                          AMIRI | Men Oversize T-shirt
                        </h3>
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor dummy text
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">AED250.00</p>
                          <span className="text-green-500 text-sm">
                            (55% OFF)
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 line-through mt-1">
                          MRP AED650
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-8 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">SIZE</span>
                        <span className="px-2 py-0.5 border border-[#E4086F] text-[#E4086F] rounded text-sm">
                          OS
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">CONDITION:</span>
                        <span className="text-sm text-gray-500">GOOD</span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <Link href="/orderdetails">
                        <button className="text-[#00A811] text-sm underline">
                          CANCEL ORDER RETURN
                        </button>
                      </Link>
                      <div className="flex gap-8 text-sm">
                        <div>
                          <span className="text-gray-500 block">Order Id:</span>
                          <span>#12345</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">
                            Return Term:
                          </span>
                          <span>02/01/2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Reason Box */}
              <div className="bg-white rounded-lg p-6 mt-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-2">
                  Select the reason for your return
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  To help us process your request quickly, please answer the
                  following questions.
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium mb-4">
                      What is the product's current condition?
                    </h4>
                    <div className="space-y-3">
                      {[
                        "I would like to return a sealed product.",
                        "I want to return as item ordered by mistake.",
                        "The product is defective or damage.",
                        "I wish to return an unsealed but functional product",
                        "Received the wrong product.",
                      ].map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="condition"
                            value={option}
                            checked={selectedCondition === option}
                            onChange={() => setSelectedCondition(option)}
                            className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F]"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-4">
                      What is the primary reason for returning the product?
                    </h4>
                    <div className="space-y-3">
                      {[
                        "The product quality is unsatisfactory.",
                        "I need to return a non-functional, unsealed product.",
                        "I changed my mind or the product was not as expected.",
                        "The product information was misleading.",
                        "The product was not delivered.",
                      ].map((reason) => (
                        <label
                          key={reason}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedReasons.includes(reason)}
                            onChange={() => {
                              setSelectedReasons((prev) =>
                                prev.includes(reason)
                                  ? prev.filter((r) => r !== reason)
                                  : [...prev, reason]
                              );
                            }}
                            className="w-4 h-4 text-[#E4086F] border-gray-300 rounded focus:ring-[#E4086F]"
                          />
                          <span className="text-sm">{reason}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="mt-8 bg-[#E4086F] text-white px-12 py-2.5 rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-xl font-medium mb-6">
                Choose the method for returning the product
              </h2>

              <div className="space-y-4">
                <label className="block p-4 border rounded-lg cursor-pointer transition-all hover:border-[#E4086F] hover:bg-pink-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="pickupMethod"
                      value="standard"
                      checked={selectedPickupMethod === "standard"}
                      onChange={(e) => setSelectedPickupMethod(e.target.value)}
                      className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          Standard Shipping &nbsp;-$40
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Send it by tomorrow
                      </p>
                    </div>
                  </div>
                </label>

                <label className="block p-4 border rounded-lg cursor-pointer transition-all hover:border-[#E4086F] hover:bg-pink-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="pickupMethod"
                      value="instore"
                      checked={selectedPickupMethod === "instore"}
                      onChange={(e) => setSelectedPickupMethod(e.target.value)}
                      className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">In-store pickup</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Send it by 03/01/2025
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={handlePrevious}
                  className="px-8 py-2.5 border border-[#E4086F] text-[#E4086F] rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-xl font-medium mb-6">
                Choose the method for receiving payment
              </h2>

              <div className="space-y-4">
                <label className="block p-4 border rounded-lg cursor-pointer transition-all hover:border-[#E4086F] hover:bg-pink-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="reimbursement"
                      value="voucher"
                      checked={selectedReimbursement === "voucher"}
                      onChange={(e) => setSelectedReimbursement(e.target.value)}
                      className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          I would like a store voucher
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Receive an instant voucher to use on new orders.
                      </p>
                    </div>
                  </div>
                </label>

                <label className="block p-4 border rounded-lg cursor-pointer transition-all hover:border-[#E4086F] hover:bg-pink-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="reimbursement"
                      value="refund"
                      checked={selectedReimbursement === "refund"}
                      onChange={(e) => setSelectedReimbursement(e.target.value)}
                      className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">I want a refund</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        We will process your refund, which may take up to 7
                        business days.
                      </p>
                    </div>
                  </div>
                </label>

                <label className="block p-4 border rounded-lg cursor-pointer transition-all hover:border-[#E4086F] hover:bg-pink-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="reimbursement"
                      value="replacement"
                      checked={selectedReimbursement === "replacement"}
                      onChange={(e) => setSelectedReimbursement(e.target.value)}
                      className="w-4 h-4 text-[#E4086F] border-gray-300 focus:ring-[#E4086F]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          I would like a replacement product
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        We will replace your order with another one.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={handlePrevious}
                  className="px-8 py-2.5 border border-[#E4086F] text-[#E4086F] rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-xl font-medium mb-6">
                Review your return request
              </h2>

              <div className="space-y-6">
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <Image
                      src="/product-image.png"
                      alt="AMIRI T-shirt"
                      width={180}
                      height={600}
                      className="rounded-md object-cover h-[160px]"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">
                      AMIRI | Men Oversize T-shirt
                    </h3>
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor dummy text
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-medium">AED250.00</span>
                      <span className="text-green-500 text-sm">(55% OFF)</span>
                    </div>
                    <div className="flex gap-8 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">SIZE:</span>
                        <span className="px-2 py-0.5 border border-[#E4086F] text-[#E4086F] rounded text-sm">
                          OS
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">CONDITION:</span>
                        <span className="text-sm text-gray-500">GOOD</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Current state of the product:
                    </h4>
                    <p className="mt-1">{selectedCondition}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Main reason for returning the product:
                    </h4>
                    <p className="mt-1">{selectedReasons.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Method for returning the product:
                    </h4>
                    <p className="mt-1">
                      {selectedPickupMethod === "standard"
                        ? "Standard Shipping - $40"
                        : "In-store pickup - Free"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Method for receiving the product:
                    </h4>
                    <p className="mt-1">
                      {selectedReimbursement === "voucher" && "Store voucher"}
                      {selectedReimbursement === "refund" &&
                        "Refund to original payment method"}
                      {selectedReimbursement === "replacement" &&
                        "Product replacement"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    onClick={handlePrevious}
                    className="px-8 py-2.5 border border-[#E4086F] text-[#E4086F] rounded-full text-sm font-medium hover:bg-pink-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">
                Your return request has been successfully received.
              </h3>
              <p className="text-gray-500 mb-6">
                We are currently reviewing your request to return your items.
                You can track the progress for updates
              </p>
              <button
                onClick={handleTrackStatus}
                className="px-8 py-2.5 bg-[#E4086F] text-white rounded-full text-sm font-medium hover:bg-[#c9075f] transition-colors"
              >
                Track Return status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnOrderPage;

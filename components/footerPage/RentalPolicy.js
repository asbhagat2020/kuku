import React from 'react';
import { Calendar, Package, Truck, Shield, CheckCircle, XCircle, AlertTriangle, Clock, DollarSign, RefreshCw, Mail } from 'lucide-react';

export const RentalPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <RefreshCw className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Rental Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            This policy explains how KuKu’s rental service works — including eligibility, deposits, logistics, and user responsibilities.
          </p>
          <p className="text-lg text-blue-200 mt-2">
            By using KuKu’s rental service, you agree to the following terms and conditions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Rental Eligibility */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Rental Eligibility</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Only items meeting <strong>all</strong> the following conditions are eligible for rental through KuKu:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Type:</strong> Apparel only (dresses, suits, ethnic wear, etc.)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Condition:</strong> Excellent, freshly cleaned, and fully wearable</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Value:</strong> Retail or resale price must exceed <strong>AED 500</strong></span>
            </li>
          </ul>

          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start">
            <XCircle className="w-6 h-6 mr-3 text-red-700 flex-shrink-0" />
            <div>
              <p className="font-bold text-red-900">Not Allowed for Rental:</p>
              <ul className="mt-2 space-y-1 text-red-800">
                <li>• Accessories (jewelry, bags, belts, hats, sunglasses)</li>
                <li>• Footwear</li>
                <li>• Undergarments, lingerie, or swimwear</li>
                <li>• Home textiles or décor</li>
                <li>• Items valued below AED 500</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Rental Duration */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Rental Duration</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Minimum:</strong> 1 day</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Maximum:</strong> 10 days</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Longer rental periods may be approved for <strong>commercial or event-based rentals</strong> on request.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The renter <strong>must return the item by the agreed end date</strong>. Late fees apply after the grace period.</span>
            </li>
          </ul>
        </div>

        {/* 3. Pricing & Fees */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 mr-3 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Pricing & Fees</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The <strong>seller (lender) sets the rental price</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu takes a <strong>fixed commission from the rental fee only</strong> (not from the deposit).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The <strong>renter (borrower) pays:</strong></span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The <strong>rental fee</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>A <strong>mandatory refundable security deposit</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Applicable delivery and handling charges</strong></span>
            </li>
          </ul>
        </div>

        {/* 4. Logistics */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500">
          <div className="flex items-center mb-4">
            <Truck className="w-6 h-6 mr-3 text-purple-700" />
            <h2 className="text-xl font-bold text-gray-800">4. Logistics</h2>
          </div>
          <p className="text-gray-800 mb-3">
            KuKu manages the <strong>entire rental journey</strong> to ensure quality and reliability:
          </p>
          <ul className="space-y-2 text-gray-800">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Pickup from the seller</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Delivery to the renter</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Pickup from the renter post-use</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Return to the seller after final QC</span>
            </li>
          </ul>
          <p className="mt-3 text-purple-900 font-medium">
            <strong>Note:</strong> All packaging and hangers provided with the rental <strong>must be returned</strong> with the item.
          </p>
        </div>

        {/* 5. Quality Check (QC) */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Quality Check (QC)</h2>
          </div>
          <p className="text-gray-700 mb-3">To maintain trust and quality:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Pre-Rental QC:</strong> Confirms item condition, authenticity, and readiness.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Post-Rental QC:</strong> Conducted upon return to check for damage, stains, odor, or misuse.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 italic">
            If post-rental QC identifies issues, <strong>deductions may apply</strong> to the renter’s deposit.
          </p>
        </div>

        {/* 6. Security Deposit (Mandatory) */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Security Deposit (Mandatory)</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>A <strong>fully refundable deposit</strong> is held by KuKu at the time of checkout.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The deposit is refunded within <strong>5–7 business days</strong> if:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The item is <strong>returned on time</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>It <strong>passes post-rental QC</strong> with no damage, stains, or misuse.</span>
            </li>
          </ul>

          <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0" />
            <div>
              <p className="font-bold text-amber-900">Deductions Apply If:</p>
              <ul className="mt-2 space-y-1 text-amber-900">
                <li>• The item is returned late.</li>
                <li>• The item is damaged, altered, or missing.</li>
                <li>• Any cleaning or restoration is required due to misuse.</li>
              </ul>
              <p className="mt-2 text-amber-900">
                KuKu will share a <strong>detailed QC report and photos</strong> before any deduction. Final decisions are made within <strong>3–5 working days</strong> of return inspection.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Late Returns */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Late Returns</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>A <strong>24-hour grace period</strong> applies after the return deadline.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>After that, a <strong>late fee of AED 100 per day</strong> applies.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>If an item is <strong>not returned after 5 days</strong>, the deposit will be <strong>forfeited</strong>, and the renter may be charged the <strong>full replacement cost</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Repeat violations</strong> may lead to <strong>account suspension</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 8. Cancellations */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">8. Cancellations</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Buyer (Renter) Cancellations:</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span><strong>Free cancellation</strong> up to <strong>24 hours before scheduled delivery</strong>.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Late cancellations may incur <strong>logistics or handling charges</strong>.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Seller (Lender) Cancellations:</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Sellers are <strong>not permitted to cancel</strong> after the rental has been confirmed.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span><strong>Repeated seller cancellations</strong> may result in <strong>penalties or suspension</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 9. Dispute Resolution */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">9. Dispute Resolution</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Any dispute must be raised within <strong>48 hours after item return</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu’s decision will be based on:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>QC inspection reports</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Photographic evidence</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Communication records and timelines</span>
            </li>
          </ul>
          <p className="mt-3 text-purple-900 font-medium">
            All KuKu decisions are <strong>final and binding</strong> for platform-related transactions.
          </p>
        </div>

        {/* 10. Liability & Disclaimer */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">10. Liability & Disclaimer</h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>KuKu acts as an <strong>intermediary platform</strong> facilitating rentals between users.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>KuKu is <strong>not responsible</strong> for any damage, allergic reaction, or misuse <strong>once the item has been handed over</strong>.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Users agree to use rented items at their <strong>own discretion and responsibility</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 11. Contact Us - Styled Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
          <p className="text-lg mb-4">
            Need help? Our team is always happy to assist you.
          </p>
          <div className="space-y-2">
            <a
              href="mailto:support@letskuku.com"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300"
            >
              support@letskuku.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
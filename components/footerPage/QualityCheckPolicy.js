import React from 'react';
import { CheckCircle, Package, Truck, XCircle, Shield, AlertTriangle, RefreshCw, Star, Heart } from 'lucide-react';

export const QualityCheckPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Quality Check (QC) Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            At KuKu, Quality Check (QC) is one of our strongest value promises. Every eligible item — whether sold directly by KuKu or through an independent seller listing — is physically inspected by our QC team after purchase and before delivery.
          </p>
          <p className="text-lg text-blue-200 mt-2">
            This ensures that what you see on the platform is exactly what you receive.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Purpose & Our USP */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500">
          <div className="flex items-center mb-4">
            <Star className="w-6 h-6 mr-3 text-emerald-700" />
            <h2 className="text-xl font-bold text-gray-800">1. Purpose & Our USP</h2>
          </div>
          <p className="text-gray-800">
            Every eligible item — whether sold directly by KuKu or through an independent seller — is <strong>physically inspected</strong> by our QC team <strong>after purchase and before delivery</strong>.
          </p>
          <p className="text-gray-800 mt-2">
            This ensures <strong>what you see is what you get</strong> — our core promise of trust and reliability.
          </p>
        </div>

        {/* 2. When Quality Checks Happen */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">2. When Quality Checks Happen</h2>
          </div>
          <ol className="space-y-3 text-gray-700 list-decimal pl-6">
            <li><strong>Buyer places an order</strong> (for sale or rental items)</li>
            <li>Item is <strong>picked up from the seller</strong> and delivered to KuKu’s QC Centre</li>
            <li><strong>QC inspection</strong> is carried out based on listing description and photos</li>
            <li><strong>Pass or Fail decision is made:</strong></li>
          </ol>
          <div className="ml-8 mt-3 space-y-2">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600 mt-0.5" />
              <p><strong>Pass</strong> → Item is packed and sent to the buyer</p>
            </div>
            <div className="flex items-start">
              <XCircle className="w-5 h-5 mr-2 text-red-600 mt-0.5" />
              <p><strong>Fail</strong> → Item is returned to the seller with a warning notice <em>(Please refer to Quality Check Fail Policy for Buyer and Seller)</em></p>
            </div>
          </div>
          <p className="mt-4 text-gray-700 italic">
            In case of <strong>failed pickup attempts</strong> due to seller unavailability, the order may be <strong>cancelled</strong>, and <strong>penalties may apply</strong>.
          </p>
        </div>

        {/* 3. Inspection Standards */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Inspection Standards</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Every item is checked to ensure it <strong>matches the listing description and photos</strong>. This includes:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">a. Condition Match</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Item must match the declared condition (e.g., “New with tags,” “Like new,” “Gently used”)</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>No undisclosed defects, stains, odors, or damage</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span><strong>Any discrepancy</strong> between listed photos and actual item → <strong>immediate QC failure</strong></span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">b. Accuracy</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Correct size, color, brand, and model as described</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>All parts, accessories, and packaging included if stated</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">c. Cleanliness</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Washed or professionally cleaned</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>No pet hair, mold, or unpleasant odors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Luxury Item Protocol */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-purple-700" />
            <h2 className="text-xl font-bold text-gray-800">4. Luxury Item Protocol</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>For luxury items, KuKu’s QC team takes <strong>maximum precaution</strong> to verify authenticity based on experience, brand details, and available documentation.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>However, <strong>KuKu does not provide full authentication guarantees</strong> for luxury goods.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 font-medium">Buyers are strongly advised to:</p>
          <ul className="space-y-2 text-gray-700 mt-2 pl-6">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Review the <strong>seller’s profile and trustworthiness</strong> before purchasing</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Request <strong>original receipts, certificates, or serial numbers</strong> where applicable</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Request <strong>add-on luxury authentication service</strong> at extra charge for higher assurance</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 italic">
            If an item fails authenticity checks at QC, it will be <strong>returned to the seller</strong> and marked as a <strong>violation</strong>.
          </p>
        </div>

        {/* 5. Failure Consequences */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Failure Consequences</h2>
          </div>
          <p className="text-gray-700 mb-3">If an item fails QC:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Seller receives a <strong>written warning</strong> and item is returned</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Repeated violations</strong> → Seller may face:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Listing restrictions</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Account suspension or permanent ban</strong></span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            Please refer to the <strong>Quality Check Fail Policy for Buyers and Sellers</strong> for more details.
          </p>
          <p className="mt-3 text-gray-700 font-medium">QC failure reasons may include:</p>
          <ul className="space-y-2 text-gray-700 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Misrepresentation of condition, brand, or authenticity</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Incomplete item (missing parts/accessories promised)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Unacceptable hygiene or damage</span>
            </li>
          </ul>
        </div>

        {/* 6. Rental Item QC */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RefreshCw className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Rental Item QC</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Before Dispatch:</strong> Rental items undergo <strong>full QC</strong> to ensure readiness for use.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Upon Return:</strong> Rental items found <strong>damaged beyond normal wear</strong> may result in:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Full item charge</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Forfeiture of renter’s deposit</strong> as per the Rental Policy</span>
            </li>
          </ul>
        </div>

        {/* 7. Disclaimer */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">7. Disclaimer</h3>
              <p className="text-gray-800">
                While KuKu’s QC process aims to uphold the <strong>highest quality standards</strong>, KuKu <strong>disclaims liability</strong> for <strong>subjective dissatisfaction</strong> such as fit, comfort, or user preference, as also stated in the Terms & Conditions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
import React from 'react';
import { Package, Shield, Home, Clock, AlertTriangle, CheckCircle, Recycle, Truck } from 'lucide-react';

export const StorageAndHandlingPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Package className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Storage & Handling Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            At KuKu, we take pride in ensuring that every item entrusted to us is stored and handled responsibly.
          </p>
          <p className="text-lg text-blue-200 mt-2">
            This policy outlines how KuKu manages items at our facilities until they are delivered, returned, donated, or recycled.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Scope of Policy */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Scope of Policy</h2>
          </div>
          <p className="text-gray-700 mb-3">This policy applies to all items temporarily held in KuKu’s custody, including:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Items stored under the <strong>Ku-Kit Service</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Items handled under the <strong>Rental Service</strong> (during pickup, QC, or between rentals).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Items <strong>awaiting Quality Check (QC)</strong> before buyer delivery.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Items collected under the <strong>Giveaway & Recycling Service</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 2. Storage Standards */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500">
          <div className="flex items-center mb-4">
            <Home className="w-6 h-6 mr-3 text-emerald-700" />
            <h2 className="text-xl font-bold text-gray-800">2. Storage Standards</h2>
          </div>
          <ul className="space-y-2 text-gray-800">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>All items are stored in a <strong>clean, organized, and climate-appropriate environment</strong>, free from dust, pests, and extreme temperatures.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Luxury or high-value items</strong> are stored in <strong>secure, access-controlled areas</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Clothing and textiles</strong> are covered and protected to prevent stains or tears.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Perishable, flammable, or hazardous items</strong> are <strong>not accepted</strong> for storage under any circumstance.</span>
            </li>
          </ul>
        </div>

        {/* 3. Handling Procedures */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Handling Procedures</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Each item is <strong>tagged, scanned, and tracked</strong> through KuKu’s internal system to ensure traceability.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Only authorized and trained KuKu staff</strong> are allowed to handle items.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>After <strong>QC approval</strong>, items are <strong>carefully re-packed</strong> for delivery or secure storage.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Returned, giveaway, and recycled items</strong> are stored <strong>separately</strong> to prevent mix-ups.</span>
            </li>
          </ul>
        </div>

        {/* 4. Storage Duration */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Storage Duration</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>QC items:</strong> Stored until QC completion and decision (approved, returned, or recycled).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Ku-Kit items:</strong> Stored for the agreed listing duration or until sold/withdrawn by the seller.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Rental items:</strong> Stored temporarily between pickup, QC, and next rental dispatch.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Giveaway items:</strong> Stored until sorting and final allocation for donation or recycling.</span>
            </li>
          </ul>
        </div>

        {/* 5. Seller & User Responsibility */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Seller & User Responsibility</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Sellers remain the legal owners</strong> of their items until sale, rental, donation, or recycling.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers must ensure items are <strong>clean, damage-free, and accurately described</strong> before handover.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu is <strong>not liable</strong> for <strong>natural wear and tear, fabric aging, or color fading</strong> occurring during storage.</span>
            </li>
          </ul>
        </div>

        {/* 6. Liability & Limitations */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">6. Liability & Limitations</h3>
              <p className="text-gray-800 mb-3">
                While KuKu takes all reasonable precautions to safeguard items, <strong>KuKu is not an insurer</strong> and cannot guarantee protection against all risks.
              </p>
              <p className="text-gray-800 mb-3">KuKu will <strong>not be liable</strong> for:</p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span><strong>Pre-existing damage</strong> or undisclosed defects.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span><strong>Normal handling wear</strong> during inspection or packaging.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span><strong>Damage or loss due to force majeure</strong> (fire, flood, natural disasters, etc.).</span>
                </li>
              </ul>
              <p className="mt-3 text-amber-900 font-medium">
                In the rare event of <strong>proven negligence by KuKu staff</strong>, compensation may be offered up to <strong>AED 500 or 50% of the item’s declared value</strong>, whichever is lower.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Unclaimed or Expired Items */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Truck className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Unclaimed or Expired Items</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Items remaining <strong>unclaimed 30 days after notification</strong> (e.g., QC failures, return refusals, or expired listings) may be:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Returned to the seller</strong> (with applicable delivery fees).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Donated or recycled</strong> under KuKu’s Giveaway & Recycling Policy if the seller is unresponsive.</span>
            </li>
          </ul>
        </div>

        {/* Purpose Statement */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
          <div className="flex items-start">
            <CheckCircle className="w-6 h-6 mr-3 text-teal-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-teal-900 mb-2">Purpose of this policy:</h3>
              <p className="text-gray-800">
                To ensure <strong>transparency, accountability, and mutual trust</strong> between KuKu and its users while maintaining <strong>safe handling practices</strong> for all items under our care.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
import React from 'react';
import { AlertTriangle, Package, XCircle, Ban, RefreshCw, Heart, Recycle, Truck } from 'lucide-react';

export const QcFailPolicies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Authentication Fail Policies for Seller/Buyer
          </h1>
          <h2 className="text-2xl font-semibold mb-3">Seller Penalty Policy</h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            To ensure product quality and reliability on KuKu, penalties may be applied for repeated quality check failures.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. First & Second Warning */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-yellow-700" />
            <h2 className="text-xl font-bold text-gray-800">1. First & Second Warning</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">1)</span>
              <span>Sellers will receive <strong>detailed feedback</strong> without penalty.</span>
            </li>
          </ul>
        </div>

        {/* 2. Third & Fourth Warning */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-700" />
            <h2 className="text-xl font-bold text-gray-800">2. Third & Fourth Warning</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">1)</span>
              <span>A <strong>penalty fee of 20% of the product value</strong> will be deducted to cover operational costs.</span>
            </li>
          </ul>
        </div>

        {/* 3. Fifth QC Fail Action */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-red-700" />
            <h2 className="text-xl font-bold text-gray-800">3. Fifth QC Fail Action</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">1)</span>
              <span><strong>Temporary suspension</strong> of the seller’s ability to list new items for <strong>10 days</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 4. Over 5 QC Fail Violations */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-rose-600">
          <div className="flex items-center mb-4">
            <Ban className="w-6 h-6 mr-3 text-rose-700" />
            <h2 className="text-xl font-bold text-gray-800">4. Over 5 QC Fail Violations</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">1)</span>
              <span><strong>Permanent removal from the platform</strong> if quality standards are consistently not met.</span>
            </li>
          </ul>
        </div>

        {/* Additional Notes */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
          <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center">
            <Package className="w-6 h-6 mr-2" />
            Important Options After QC Fail
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <Truck className="w-5 h-5 mr-3 text-teal-700 mt-1 flex-shrink-0" />
              <p className="text-gray-800">
                <strong>If the seller wants the item returned:</strong> They must <strong>bear the delivery cost</strong>.
              </p>
            </div>

            <div className="flex items-start">
              <RefreshCw className="w-5 h-5 mr-3 text-teal-700 mt-1 flex-shrink-0" />
              <p className="text-gray-800">
                <strong>If the seller chooses to leave the item with KuKu:</strong> The KuKu team can <strong>update the listing</strong> with the QC fail reason and revised details.
              </p>
            </div>

            <div className="flex items-start">
              <Recycle className="w-5 h-5 mr-3 text-teal-700 mt-1 flex-shrink-0" />
              <p className="text-gray-800">
                <strong>If the item is not good enough for listing:</strong> KuKu team will suggest <strong>Recycling</strong> or <strong>Charity donation</strong> for the item.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
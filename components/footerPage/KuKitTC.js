import React from 'react';
import { Package, CheckCircle, AlertTriangle, Clock, Recycle, Gift, Truck, Shield, RefreshCw, AlertCircle } from 'lucide-react';

export const KuKitTC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Package className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ku-Kit Terms & Conditions & Item Retention Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Helping your closet breathe, one listing at a time!
          </p>
          <p className="text-lg text-blue-200 mt-2">
            Here’s how KuKu takes care of your Ku-Kit items from start to finish.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Item Storage & Listing Period */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Item Storage & Listing Period</h2>
          </div>
          <p className="text-gray-700">
            Once KuKu receives your items under the Ku-Kit service, they are securely stored and listed on the platform after passing our Quality Check (QC).
          </p>
          <p className="text-gray-700 mt-2">
            Items remain listed for <strong>90 days</strong> from the date they go live on the app.
          </p>
        </div>

        {/* 2. Quality Check (QC) Process */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Quality Check (QC) Process</h2>
          </div>
          <p className="text-gray-700 mb-3">
            We love giving pre-loved fashion a second life — but only if it meets our quality standards.
          </p>
          <p className="text-gray-700 mb-2">Each item undergoes in-house QC to verify:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Good condition (no major stains, tears, or excessive wear)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Marketability and demand</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Authenticity (where applicable)</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            If an item does not pass QC, we will notify you via email or app notification.
          </p>
        </div>

        {/* 3. Items That Don’t Pass QC */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Items That Don’t Pass QC</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Once notified, you’ll have <strong>14 days</strong> to choose one of the following options:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">Recycle</span>
              <span><strong>Recycle it sustainably</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">Gift</span>
              <span><strong>Donate it</strong> to one of our charity partners</span>
            </li>
            <li className="flex">
              <span className="mr-2">Truck</span>
              <span><strong>Request it to be returned</strong> to you (return and handling fees apply)</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-600 italic">
            If no response is received within 14 days, KuKu may recycle or donate the items at its discretion, in alignment with our sustainability goals.
          </p>
        </div>

        {/* 4. Unsold Items After 90 Days */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Unsold Items After 90 Days</h2>
          </div>
          <p className="text-gray-700 mb-3">
            If an item remains unsold after 90 days:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>On the <strong>91st day</strong>, KuKu will contact you via phone, email, or app notification.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>You can choose to:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">Check</span>
              <span>Request your items back (return fee applies)</span>
            </li>
            <li className="flex">
              <span className="mr-2">Recycle</span>
              <span>Donate or recycle them through KuKu</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-600 italic">
            If we are unable to reach you, or if no decision is made within <strong>7 days</strong> of our outreach, KuKu reserves the right to responsibly donate or recycle the items.
          </p>
        </div>

        {/* 5. Return Charges */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Truck className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Return Charges</h2>
          </div>
          <p className="text-gray-700 mb-3">
            For QC-rejected or unsold items returned to the seller:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>A <strong>handling and return delivery fee</strong> applies, based on the number of items and delivery location.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Exact charges will be communicated upon your request.</span>
            </li>
          </ul>
        </div>

        {/* 6. Communication */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 mr-3 text-amber-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Communication</h2>
          </div>
          <p className="text-gray-700">
            All updates and notifications will be sent via the <strong>registered contact details</strong> linked to your KuKu account.
          </p>
          <p className="text-gray-700 mt-2">
            Please ensure your information is <strong>accurate and current</strong> to avoid missing important updates.
          </p>
        </div>

        {/* 7. Ownership & Responsibility */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Ownership & Responsibility</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>All items sent to KuKu remain <strong>your property until sold</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Once sold, ownership transfers to the buyer.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu takes utmost care in handling your items but is <strong>not liable for minor damage</strong> that may occur due to standard handling, storage, or wear, unless caused by gross negligence.</span>
            </li>
          </ul>
        </div>

        {/* 8. Our Promise */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500">
          <p className="text-gray-800 font-medium">
            <strong>Our Promise:</strong> We’re here to build a smarter, kinder fashion ecosystem — and your items make that possible.
          </p>
          <p className="text-gray-800 mt-2">
            Whether your pieces are sold, donated, recycled, or returned, KuKu ensures they are handled with <strong>care, transparency, and purpose</strong>.
          </p>
        </div>

        {/* 9. Policy Updates */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RefreshCw className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">9. Policy Updates</h2>
          </div>
          <p className="text-gray-700">
            KuKu reserves the right to amend or update this Ku-Kit Terms & Conditions and Item Retention Policy at any time.
          </p>
          <p className="text-gray-700 mt-2">
            Users will be notified of significant changes via <strong>email or in-app alerts</strong>. Continued participation in the Ku-Kit program constitutes acceptance of the latest terms.
          </p>
        </div>

        {/* NO CONTACT SECTION — AS PER YOUR PATTERN (only added when requested) */}

      </div>
    </div>
  );
};
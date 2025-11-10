import React from 'react';
import { Shield, UserCheck, Smartphone, Mail, Package, CheckCircle, XCircle, AlertTriangle, Ban, FileText, Star } from 'lucide-react';

export const VarificationAndAuthentication = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Verification & Authentication Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            At KuKu, trust and safety are the foundation of our community.
          </p>
          <p className="text-lg text-blue-200 mt-2">
            To ensure a secure and transparent marketplace, we verify users and review listed items through a thorough Quality Check (QC) process.
          </p>
          <p className="mt-4 text-blue-100">
            This policy outlines how KuKu handles user verification and item authentication responsibilities.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. User Verification */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <UserCheck className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. User Verification</h2>
          </div>
          <p className="text-gray-700 mb-4">
            To maintain a safe and reliable platform, <strong>all KuKu users</strong> — including sellers, buyers, renters, and donors — must verify their identity before transacting.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Basic Verification (Mandatory for All Users):</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <Smartphone className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" />
                  <span><strong>Valid mobile number verification</strong> (OTP).</span>
                </li>
                <li className="flex">
                  <Mail className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" />
                  <span><strong>Valid email address confirmation</strong>.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Advanced Verification (Mandatory for Sellers & Renters):</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <FileText className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" />
                  <span>Upload of a <strong>valid government-issued ID</strong> (e.g., Emirates ID, Passport).</span>
                </li>
                <li className="flex">
                  <Package className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" />
                  <span><strong>Address verification</strong> (KuKu may request a utility bill, tenancy contract, or bank statement).</span>
                </li>
                <li className="flex">
                  <CheckCircle className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" />
                  <span><strong>Payment method verification</strong> (linked bank account, wallet, or card).</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Business or Influencer Sellers:</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <Star className="w-5 h-5 mr-2 text-indigo-600 mt-0.5" />
                  <span>May be required to submit <strong>trade licenses, brand proof, or social media links</strong> for verification.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-700 flex-shrink-0" />
            <p className="text-red-900">
              KuKu reserves the right to <strong>suspend or deactivate accounts</strong> that provide <strong>false, incomplete, or misleading information</strong>.
            </p>
          </div>
        </div>

        {/* 2. Item Authentication & Quality Check (QC) */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-emerald-700" />
            <h2 className="text-xl font-bold text-gray-800">2. Item Authentication & Quality Check (QC)</h2>
          </div>
          <p className="text-gray-800 mb-4">
            KuKu aims to ensure that all items listed are <strong>authentic, safe, and accurately represented</strong>.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Quality Check (QC):</h3>
              <ul className="space-y-2 text-gray-800 pl-6">
                <li className="flex">
                  <CheckCircle className="w-5 h-5 mr-2 text-emerald-700 mt-0.5" />
                  <span>Every item sold through KuKu undergoes <strong>QC before being shipped</strong> to the buyer.</span>
                </li>
                <li className="flex">
                  <CheckCircle className="w-5 h-5 mr-2 text-emerald-700 mt-0.5" />
                  <span>QC verifies that the item <strong>matches its photos, description, and stated condition</strong>.</span>
                </li>
                <li className="flex">
                  <XCircle className="w-5 h-5 mr-2 text-red-700 mt-0.5" />
                  <span>Items that <strong>fail QC</strong> are <strong>not shipped</strong> to the buyer and are <strong>returned to the seller</strong>.</span>
                </li>
                <li className="flex">
                  <Ban className="w-5 h-5 mr-2 text-red-700 mt-0.5" />
                  <span>Sellers with <strong>repeated QC failures</strong> may face <strong>account suspension</strong>.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Luxury Items:</h3>
              <ul className="space-y-2 text-gray-800 pl-6">
                <li className="flex">
                  <Star className="w-5 h-5 mr-2 text-purple-700 mt-0.5" />
                  <span>Sellers listing luxury or designer items must <strong>clearly state brand details</strong> and provide <strong>proof of authenticity</strong> (e.g., purchase receipts, certificates, original packaging).</span>
                </li>
                <li className="flex">
                  <Shield className="w-5 h-5 mr-2 text-purple-700 mt-0.5" />
                  <span>KuKu’s QC team will perform a <strong>visual and physical inspection</strong> for basic signs of authenticity (e.g., materials, logos, stitching, serial numbers).</span>
                </li>
                <li className="flex">
                  <AlertTriangle className="w-5 h-5 mr-2 text-amber-700 mt-0.5" />
                  <span>However, <strong>KuKu does not provide or guarantee full authentication</strong> of luxury items at this stage.</span>
                </li>
                <li className="flex">
                  <UserCheck className="w-5 h-5 mr-2 text-amber-700 mt-0.5" />
                  <span><strong>Sellers are solely responsible</strong> for ensuring that all listed items are genuine.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0" />
            <div>
              <p className="font-bold text-amber-900">Disclaimer:</p>
              <p className="text-amber-900">
                KuKu’s QC process is a <strong>visual verification only</strong>. It is <strong>not an expert or third-party authentication</strong> and should <strong>not be relied upon as proof of authenticity</strong>.
              </p>
              <p className="text-amber-900 mt-1">
                KuKu is <strong>not liable</strong> if a seller provides <strong>counterfeit or misrepresented items</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Prohibited Items */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Ban className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Prohibited Items</h2>
          </div>
          <p className="text-gray-700 mb-3">The following items are <strong>strictly prohibited</strong> on KuKu:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Counterfeit, replica, or “inspired”</strong> branded items.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Stolen goods</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Items <strong>infringing trademarks or intellectual property rights</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Illegal, restricted, or unsafe products</strong> under UAE law.</span>
            </li>
          </ul>
        </div>

        {/* 4. Dispute Handling */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Dispute Handling</h2>
          </div>
          <p className="text-gray-700 mb-3">If a buyer questions the authenticity of an item after purchase:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu may request <strong>supporting evidence</strong> (e.g., photos, receipts).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu will <strong>review the case</strong> and may contact the seller for <strong>proof of authenticity</strong>.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 font-medium">If the item is proven counterfeit:</p>
          <ul className="space-y-2 text-gray-700 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The <strong>buyer will be refunded</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The <strong>seller’s account may be suspended or permanently banned</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu may <strong>escalate the matter to the appropriate authorities</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 5. Seller Responsibilities */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <UserCheck className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Seller Responsibilities</h2>
          </div>
          <p className="text-gray-700 mb-3"><strong>Sellers must:</strong></p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>List <strong>only genuine, lawful items</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Provide <strong>accurate item details</strong>, including condition and defects.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Include <strong>proof of authenticity</strong> for branded or luxury goods when possible.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 font-medium">Violations may result in:</p>
          <ul className="space-y-2 text-gray-700 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Removal of listings</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Monetary penalties or withheld payouts</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Permanent suspension from KuKu</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 6. Buyer Responsibilities */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Buyer Responsibilities</h2>
          </div>
          <p className="text-gray-700 mb-3"><strong>Buyers should:</strong></p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Carefully review</strong> seller ratings, reviews, and item photos before purchasing.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Request additional information or proof of authenticity</strong> from the seller for high-value or luxury items.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Understand that KuKu’s QC is not a professional authentication process</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 7. Future Integration */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
          <div className="flex items-start">
            <Star className="w-6 h-6 mr-3 text-teal-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-teal-900 mb-2">7. Future Integration</h3>
              <p className="text-gray-800">
                KuKu plans to introduce a <strong>third-party luxury authentication service</strong> in future phases to strengthen item verification.
              </p>
              <p className="text-gray-800 mt-2">
                Until then, <strong>sellers remain responsible</strong> for providing proof of authenticity and ensuring all listings are genuine.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
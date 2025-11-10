import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Package, FileWarning, Gavel, RefreshCw } from 'lucide-react';

export const LuxuryAuthenticationPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Luxury Authentication Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            To ensure trust, transparency, and authenticity of all luxury items listed on KuKu while protecting both buyers and KuKu during the early phase when third-party authentication is not yet integrated.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Seller Responsibility for Authenticity */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileWarning className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Seller Responsibility for Authenticity</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers listing luxury or designer-branded items (e.g., bags, shoes, accessories, watches, apparel, etc.) <strong>must guarantee the authenticity</strong> of each item they list.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers are required to upload clear photos of:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The item’s <strong>serial number, authenticity card, brand tag, and original packaging</strong> (if available).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Any <strong>receipts, proof of purchase, or certificates of authenticity</strong>, if available.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            The seller must explicitly confirm in the listing process that the item is <strong>“100% authentic and not counterfeit”</strong>.
          </p>
        </div>

        {/* 2. KuKu Quality Check (QC) Process */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">2. KuKu Quality Check (QC) Process</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu conducts a <strong>visual and physical inspection</strong> of all items before delivery to buyers.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>However, as third-party authentication is not yet available, KuKu’s verification is <strong>limited to visible quality and accuracy checks</strong> (materials, stitching, logos, labeling, serial tags, etc.).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>KuKu does not guarantee authenticity</strong> unless verified by an authorized authentication partner.</span>
            </li>
          </ul>
        </div>

        {/* 3. Buyer Awareness */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Buyer Awareness</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Buyers are encouraged to <strong>review product images and documentation carefully</strong> before purchase.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu will clearly mark listings as:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">Check</span>
              <span><strong>“Seller-Verified Authentic”</strong> — where seller has provided proof (receipts, certificates, etc.)</span>
            </li>
            <li className="flex">
              <span className="mr-2">Warning</span>
              <span><strong>“Unverified Authenticity”</strong> — where seller has not provided proof, and authenticity has not been confirmed.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            Buyers acknowledge that in the absence of third-party verification, <strong>they purchase at their own discretion</strong>.
          </p>
        </div>

        {/* 4. Dispute Resolution & Penalties */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Gavel className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Dispute Resolution & Penalties</h2>
          </div>
          <p className="text-gray-700 mb-3">
            If a buyer reports an item as fake:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu will request <strong>proof of authenticity from the seller</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>If proof cannot be provided and evidence suggests counterfeit activity, the listing will be <strong>removed immediately</strong>, and the seller may face:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Permanent suspension</strong> after repeated offenses.</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 mt-3">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu will facilitate a <strong>refund to the buyer</strong> in confirmed counterfeit cases.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu reserves the right to <strong>report counterfeit activity to relevant authorities in the UAE</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 5. Future Authentication Integration */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RefreshCw className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Future Authentication Integration</h2>
          </div>
          <p className="text-gray-700">
            KuKu is in the process of onboarding <strong>verified third-party authentication partners</strong>. Once integrated, <strong>all luxury listings will be mandatory authenticated</strong> through these partners before approval for sale.
          </p>
        </div>

        {/* 6. Disclaimer */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Disclaimer</h3>
              <p className="text-gray-800">
                KuKu acts as a <strong>facilitator and not as the certifier of authenticity</strong> in the current phase. By listing or purchasing luxury items, sellers and buyers agree that <strong>KuKu is not liable for any counterfeit claims</strong> unless proven negligence or fraud by KuKu is established.
              </p>
            </div>
          </div>
        </div>

        {/* NO CONTACT SECTION — AS PER YOUR PATTERN */}

      </div>
    </div>
  );
};
import React from 'react';
import { UserCheck, Package, Camera, CheckCircle, XCircle, Truck, Shield, AlertTriangle, Mail, Ban, DollarSign } from 'lucide-react';

export const SellerPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <UserCheck className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Seller Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            This Seller Policy explains the rules and expectations for listing, selling, and managing products on the KuKu platform, including individual listings and Ku-Kit services. By listing an item on KuKu, you agree to follow this policy.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Who Can Sell on KuKu */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <UserCheck className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Who Can Sell on KuKu</h2>
          </div>
          <p className="text-gray-700 mb-3">You can sell on KuKu if:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>You are <strong>at least 18 years old</strong> (or have guardian consent).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>You have a <strong>valid UAE ID</strong> or <strong>business license</strong> (for professional sellers).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>You agree to abide by our <strong>Terms & Conditions</strong> and undergo <strong>verification checks</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 2. What You Can Sell */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">2. What You Can Sell</h2>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Allowed categories (subject to approval):</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Women’s, men’s, and kids’ clothing</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Accessories (bags, scarves, belts, etc.)</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Fashion rentals <em>(see Rental Policy)</em></span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Giveaways (clothes, home textiles, etc.)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-red-700 mb-2">Not Allowed:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Footwear <em>(until further notice)</em></span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Select jewelry (non-precious)</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Used undergarments or socks</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Home décor, kitchenware, cosmetics, or skincare</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span><strong>Counterfeit, replica, or trademark-infringing items</strong></span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Listing Requirements */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Camera className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Listing Requirements</h2>
          </div>
          <p className="text-gray-700 mb-3">All listings must:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Use <strong>clear, high-resolution images</strong> of the actual item</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Include <strong>accurate details</strong> (brand, size, condition, flaws)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Mention if the product is <strong>new, worn once, or pre-loved</strong></span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            Condition must be one of:
          </p>
          <ul className="space-y-2 text-gray-700 mt-2 ml-6">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Never Used</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Used once</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Rarely used</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Well used</strong></span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 italic">
            Any listing that <strong>misrepresents condition, brand, or authenticity</strong> will be <strong>rejected</strong>.
          </p>
        </div>

        {/* 4. Quality Check Process */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Quality Check Process</h2>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">a. Standard Listings:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>When a buyer places an order, KuKu will:</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700 ml-8 mt-2">
              <li className="flex">
                <span className="mr-2">•</span>
                <span><strong>Pick up the item</strong></span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span><strong>Conduct a QC check</strong> (for hygiene, damage, accuracy)</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span><strong>Approve or reject</strong> before delivering</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">b. KuKit Listings:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>You send a <strong>batch of items</strong> to KuKu in advance.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>We <strong>inspect, photograph, and list items</strong> for you.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Items failing QC are:</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700 ml-8 mt-2">
              <li className="flex">
                <span className="mr-2">•</span>
                <span><strong>Returned to you (at your cost)</strong>, or</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span><strong>Donated or recycled</strong> (if agreed)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Rejection Reasons */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 mr-3 text-red-700" />
            <h2 className="text-xl font-bold text-gray-800">5. Rejection Reasons</h2>
          </div>
          <p className="text-gray-700 mb-3">An item may be rejected if it:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Is <strong>stained, torn, stretched, faded, or smelly</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Is <strong>not the same as described</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Shows signs of <strong>unwashed use</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Is <strong>fake, counterfeit, or unverifiable</strong></span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 italic">
            Sellers with <strong>repeated QC rejections</strong> may be <strong>suspended or banned</strong>.
          </p>
        </div>

        {/* 6. Pricing & Earnings */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Pricing & Earnings</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers <strong>set their own prices</strong> for items.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu reserves the right to <strong>suggest pricing adjustments</strong> for faster sales.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>After sale, sellers receive the sale amount <strong>minus KuKu’s commission</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><em>Please refer to our payments and commissions policy.</em></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Payouts are made to your <strong>wallet or bank account within 14 days</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 7. Shipping & Delivery */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Truck className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Shipping & Delivery</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers are <strong>not responsible for delivery</strong>. KuKu handles <strong>pickup, QC, and shipping</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers must <strong>prepare items for handover</strong> upon the <strong>confirmed time and date</strong> with KuKu team after an order is placed.</span>
            </li>
          </ul>
        </div>

        {/* 8. Cancellations & Returns */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">8. Cancellations & Returns</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>If a seller <strong>cancels an order after it's placed</strong>, a <strong>penalty may apply</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Returned items (post-sale) due to <strong>QC failure or buyer dissatisfaction</strong> may be sent back to the seller. <em>Please refer to QC Fail Policy.</em></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu reserves the right to <strong>withhold payment</strong> in the case of <strong>poor item condition or unresolved disputes</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 9. Code of Conduct */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">9. Code of Conduct</h2>
          </div>
          <p className="text-gray-700 mb-3">Sellers must:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Be <strong>responsive and professional</strong> in communication with the KuKu team.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Avoid spam, fake listings, or misleading claims</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Not attempt offline sales</strong> to KuKu customers</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 italic">
            Violations may result in <strong>temporary suspension or permanent removal</strong>.
          </p>
        </div>

        {/* 10. Taxes & Legal Compliance */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Ban className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">10. Taxes & Legal Compliance</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers are <strong>responsible for declaring any earnings</strong> per local tax regulations.</span>
            </li>
          </ul>
        </div>

        {/* 11. Contact & Support */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Contact & Support</h2>
          <p className="text-lg mb-4">
            For questions about selling or QC, contact us at:
          </p>
          <a
            href="mailto:support@letskuku.com"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300"
          >
            support@letskuku.com
          </a>
        </div>

      </div>
    </div>
  );
};
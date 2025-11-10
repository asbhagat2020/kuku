import React from 'react';
import { Recycle, Package, CheckCircle, XCircle, AlertTriangle, Truck, Mail, Shield } from 'lucide-react';

export const GiveawayPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Recycle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Giveaway & Recycling Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            KuKu’s Giveaway & Recycling Service enables users to donate unused or gently used textile items — including clothing, curtains, bedsheets, and more — to promote sustainability, reduce landfill waste, and support local communities in need.
          </p>
          <p className="text-lg text-blue-200 mt-2">
            Our goal is to make fashion circular and accessible — giving every fabric a meaningful second life.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Overview */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Overview</h2>
          </div>
          <p className="text-gray-700">
            KuKu’s Giveaway & Recycling Service enables users to donate unused or gently used textile items — including clothing, curtains, bedsheets, and more — to promote sustainability, reduce landfill waste, and support local communities in need.
          </p>
          <p className="text-gray-700 mt-2">
            Our goal is to make fashion circular and accessible — giving every fabric a meaningful second life.
          </p>
        </div>

        {/* 2. What We Accept */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">2. What We Accept</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Accepted Items:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Women’s, men’s, and children’s clothing</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Bedsheets, curtains, cushion covers, and tablecloths</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Clean towels and other washable textiles</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <XCircle className="w-5 h-5 mr-2 text-red-600" />
                Not Accepted:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Torn, soiled, or unusable items</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Wet or moldy fabrics</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Undergarments or socks (unless new and sealed)</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Non-textile items such as electronics, plastic goods, or paper</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
            <strong>All items must be:</strong>
          </p>
          <ul className="space-y-2 text-gray-700 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Clean and washed</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>In wearable or repairable condition</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Free from mold, strong odors, or infestations</span>
            </li>
          </ul>
        </div>

        {/* 3. How the Giveaway Process Works */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Truck className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">3. How the Giveaway Process Works</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">a. Schedule a Pickup</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Users can schedule a <strong>free pickup</strong> through the KuKu app or website.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Minimum donation quantity: <strong>10 items</strong>.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">b. Collection by KuKu</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>KuKu will confirm the pickup by call or email and arrange a convenient collection time.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Items must be packed in a <strong>clean bag or box</strong> for smooth pickup.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">c. Sorting & Processing at KuKu Center</h3>
              <p className="text-gray-700 mb-2">
                Once received, all donations are inspected and sorted into four categories:
              </p>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">Check</span>
                  <span><strong>Reusable</strong> – Donated directly to charity partners</span>
                </li>
                <li className="flex">
                  <span className="mr-2">ShoppingBag</span>
                  <span><strong>Resellable</strong> – Suitable for resale on the KuKu platform</span>
                </li>
                <li className="flex">
                  <span className="mr-2">RefreshCw</span>
                  <span><strong>Repurposable</strong> – Used for upcycling into new products</span>
                </li>
                <li className="flex">
                  <span className="mr-2">Recycle</span>
                  <span><strong>Recyclable</strong> – Sent for responsible textile recycling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. What Happens to Your Items */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Recycle className="w-6 h-6 mr-3 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">4. What Happens to Your Items</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Reusable Items:</strong> Donated to verified local charities and NGOs.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Repurposable Items:</strong> Used for creative upcycling initiatives.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Recyclable Items:</strong> Processed through certified textile recycling partners.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            Every outcome is designed to maximize social impact and environmental responsibility.
          </p>
        </div>

        {/* 5. No Compensation Policy */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">5. No Compensation Policy</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu does not provide financial compensation, store credits, or returns for giveaway items.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Once collected, all donated items become the property of KuKu and <strong>will not be returned under any circumstance</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 6. Legal & Safety Disclaimer */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Legal & Safety Disclaimer</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu reserves the right to decline pickup of items that are unsafe, unhygienic, or inappropriate.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu is not responsible for any personal belongings mistakenly included in donation bags (e.g., wallets, jewelry, IDs, or documents).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Users agree that participation in the Giveaway & Recycling program is <strong>voluntary and non-reversible</strong> once pickup has occurred.</span>
            </li>
          </ul>
        </div>

        {/* 7. Contact Us - Styled Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
          <p className="text-lg mb-4">For questions or to schedule a pickup, reach us at:</p>
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
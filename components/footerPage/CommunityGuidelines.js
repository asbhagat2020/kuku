import React from 'react';
import { Heart, Shield, AlertTriangle, CheckCircle, MessageCircle, Ban, Users, Star, Flag } from 'lucide-react';

export const CommunityGuidelines = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Community Guidelines
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            KuKu is more than a platform — it’s a community built on trust, quality, and respect. These guidelines help keep everyone’s experience safe, fair, and enjoyable — whether you’re buying, selling, renting, or giving items away.
          </p>
          <p className="text-lg text-blue-200 mt-2">
            By using KuKu, you agree to follow these rules.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Respect Others */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Respect Others</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Treat all members with kindness and professionalism.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Avoid abusive, discriminatory, or offensive language in chats, reviews, or listings.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>No harassment, threats, or bullying of any kind.</span>
            </li>
          </ul>
        </div>

        {/* 2. Be Honest and Accurate */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Be Honest and Accurate</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Describe items truthfully — include condition, size, brand, and any visible wear or defects.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Upload real photos of the actual item (stock images only if clearly stated).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Never misrepresent an item’s authenticity, origin, or performance.</span>
            </li>
          </ul>
        </div>

        {/* 3. Prohibited Items */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Ban className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Prohibited Items</h2>
          </div>
          <p className="text-gray-700 mb-3">
            You may not list, sell, rent, or give away:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Counterfeit or replica goods</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Stolen or illegally obtained items</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Weapons, drugs, or controlled substances</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Items posing safety risks (e.g., recalled baby products)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Anything violating intellectual property or local laws</span>
            </li>
          </ul>
        </div>

        {/* 4. Luxury Items */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Luxury Items</h2>
          </div>
          <p className="text-gray-700">
            Sellers listing counterfeit or misrepresented luxury goods will face <strong>immediate suspension or permanent removal</strong>.
          </p>
        </div>

        {/* 5. Respect the Transaction Process */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Respect the Transaction Process</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>No off-platform or cash-only deals. All transactions must go through KuKu for protection.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Ship or hand over items promptly once payment is confirmed.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Follow our Return, Rental, and Deposit Policies for a smooth experience.</span>
            </li>
          </ul>
        </div>

        {/* 6. Safety First */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Safety First</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>For any in-person exchanges (if applicable in your region), always meet in public, well-lit areas.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Never share private details (home address, bank info, or contact numbers) outside KuKu’s secure chat.</span>
            </li>
          </ul>
        </div>

        {/* 7. Quality Standards (KuKu QC) */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Quality Standards (KuKu QC)</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Every item goes through a post-purchase inspection before reaching the buyer.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers with repeated QC failures may receive warnings, temporary suspension, or permanent removal.</span>
            </li>
          </ul>
        </div>

        {/* 8. Feedback & Ratings */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Star className="w-6 h-6 mr-3 text-amber-600" />
            <h2 className="text-xl font-bold text-gray-800">8. Feedback & Ratings</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Leave fair, honest feedback — it helps others make informed decisions.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Do not offer incentives or manipulate reviews.</span>
            </li>
          </ul>
        </div>

        {/* 9. Consequences for Violations */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">9. Consequences for Violations</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Depending on severity, violations may result in:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Warnings</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Temporary suspension</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Permanent account removal</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Referral to legal authorities (for criminal or fraudulent activity)</span>
            </li>
          </ul>
        </div>

        {/* 10. Reporting Issues */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Flag className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">10. Reporting Issues</h2>
          </div>
          <p className="text-gray-700">
            If you encounter suspicious activity, prohibited listings, or misconduct, please report it to:
          </p>
          <p className="mt-3 font-semibold text-purple-700">
            support@letskuku.com
          </p>
        </div>

        {/* Final Note */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-emerald-500">
          <p className="text-gray-800 font-medium">
            <strong>Remember:</strong> KuKu thrives on trust. By following these guidelines, you help create a community where people feel safe to share, shop, and connect.
          </p>
        </div>
      </div>
    </div>
  );
};
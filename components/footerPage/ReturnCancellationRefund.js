import React from 'react';
import { Package, RefreshCw, XCircle, Clock, Mail, Gift, AlertCircle } from 'lucide-react';

export default function ReturnCancellationRefund() {
  const policies = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Standard Listing Orders (List & Chill)",
      details: [
        "KuKu picks up the item from the seller, performs a Quality Check (QC), and delivers it to the buyer.",
        "If the delivered item does not match the listing description (wrong size, unauthentic, significant damage, undisclosed defects), the buyer must raise a return request within 8 hours of receiving the item.",
        "KuKu will arrange a return pickup and issue a refund once the item is returned and verified at the QC Centre.",
        "If the item matches the listing description and passes QC, the sale is considered final.",
        "Returns will not be accepted for personal preference, incorrect sizing, or change of mind."
      ]
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Ku-Kit Orders (Pre-Submitted Inventory)",
      details: [
        "Returns are accepted only if:",
        "The buyer receives the wrong item, or",
        "There is an undisclosed defect or authenticity concern.",
        "Buyers must raise a return request within 8 hours of delivery.",
        "Once verified, KuKu will process the return and issue a refund accordingly."
      ]
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Giveaway Items",
      details: [
        "Items received under KuKu's Giveaway feature are non-returnable and non-refundable.",
        "These are zero-value, charitable transactions, and KuKu does not facilitate exchanges, returns, or compensation for such items."
      ]
    }
  ];

  const cancellationRules = [
    {
      title: "Buyer Cancellations",
      rules: [
        {
          type: "Standard Listing Orders",
          policy: "Buyers may cancel their order before KuKu has arranged pickup from the seller. Once pickup is confirmed, cancellations are no longer possible."
        },
        {
          type: "Ku-Kit Orders",
          policy: "Buyers may cancel their order within 2 hours of placing it. After processing begins, the order is considered final."
        }
      ]
    },
    {
      title: "Seller Cancellations",
      rules: [
        {
          type: "Important",
          policy: "Sellers cannot cancel orders after confirmation from KuKu's team post-purchase."
        },
        {
          type: "Consequences",
          policy: "Failure to hand over the item or last-minute cancellations may result in: Temporary suspension of selling privileges, or Penalty fees, as per the Seller Policy."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Keep Shadow & Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <RefreshCw className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Return, Refund & Cancellation Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            This policy outlines how returns, refunds, and cancellations are handled across all KuKu services — including Standard Listings, Ku-Kit, and Giveaways.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Policy Sections - No Shadow, Simple Layout */}
        {policies.map((policy, index) => (
          <div key={index} className="rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 text-gray-700">{policy.icon}</div>
              <h2 className="text-xl font-bold text-gray-800">{policy.title}</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              {policy.details.map((detail, idx) => (
                <li key={idx} className="flex">
                  <span className="mr-2">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Cancellation Policy - Simple */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <XCircle className="w-6 h-6 mr-2 text-red-500" />
            Order Cancellation Policy
          </h2>
          {cancellationRules.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">{section.title}</h3>
              <div className="space-y-3">
                {section.rules.map((rule, idx) => (
                  <div key={idx} className="pl-4">
                    <p className="font-medium text-gray-700">{rule.type}:</p>
                    <p className="text-gray-600 text-sm">{rule.policy}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Refund Timeline - Simple */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-teal-500" />
            Refund Timelines
          </h2>
          <p className="text-gray-700 mb-3 font-medium">Once a return is approved and the item is received back:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Refunds are processed within 10–14 business days.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Refunds are issued to the original payment method or credited to the KuKu Wallet, as applicable.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Buyers will receive a notification via email or app once the refund is initiated.</span>
            </li>
          </ul>
        </div>

        {/* How to Request - Simple */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">How to Request a Return or Refund</h2>
          <p className="text-gray-700 mb-3">You can initiate a return or refund request directly through:</p>
          <div className="space-y-3">
            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="font-semibold text-gray-800">KuKu App</p>
              <p className="text-gray-600 text-sm">Orders → Select Item → Request Return</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-gray-800">KuKu Website</p>
              <p className="text-gray-600 text-sm">My Orders → Request Return</p>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-sm">Once submitted, our support team will review your request and coordinate pickup and refund accordingly.</p>
        </div>

        {/* Contact - Keep Shadow & Gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Need Help?</h2>
          <p className="text-lg mb-4">If you have questions or need assistance, please contact:</p>
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
}
import React from 'react';
import { Wallet, CreditCard, Package, Truck, AlertTriangle, Shield, Clock, CheckCircle } from 'lucide-react';

export const PaymentsAndCommissions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Wallet className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Wallet, Payments & Commissions Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            At KuKu, transparency is key. This policy explains how sellers earn, how commissions are applied, how payouts work, and how the KuKu Wallet functions. By using KuKu, you agree to the terms below.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. KuKu Wallet Overview */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Wallet className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. KuKu Wallet Overview</h2>
          </div>
          <p className="text-gray-700 mb-3">
            The KuKu Wallet is a digital balance within the app, used for:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Sellers:</strong> Receiving payouts for completed sales, rentals, or Ku-Kit items.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Buyers:</strong> Storing refunds, promotional credits, or top-ups for future purchases.</span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 font-medium">Important Notes:</p>
          <ul className="space-y-2 text-gray-700 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Wallet funds are <strong>not interest-bearing</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Wallet balances are <strong>securely held by KuKu</strong> until payout or use.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Wallet credits are <strong>non-transferable</strong> to other users.</span>
            </li>
          </ul>
        </div>

        {/* 2. Sources of Wallet Credits */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Sources of Wallet Credits</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Your KuKu Wallet may be credited from:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sales proceeds (after KuKu commission, fees, and adjustments).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Refunds from canceled or returned orders.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Promotional vouchers or KuKu credits.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            Wallet credits can be used for purchases on KuKu or requested as payouts for sellers.
          </p>
        </div>

        {/* 3. Payments & Commissions */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Payments & Commissions</h2>
          </div>

          {/* Ku-Kit Service */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2 text-indigo-600" />
              Ku-Kit Service
            </h3>
            <p className="text-gray-700 mb-3">
              When you hand over items to KuKu, we handle storage, listing, delivery, and QC. Your payout is based on the selling price:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 font-medium">Selling Price (AED)</th>
                    <th className="px-4 py-2 font-medium">KuKu Commission</th>
                    <th className="px-4 py-2 font-medium">Seller Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">15 – 30</td>
                    <td className="px-4 py-2">70%</td>
                    <td className="px-4 py-2">30%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">30 – 60</td>
                    <td className="px-4 py-2">50%</td>
                    <td className="px-4 py-2">50%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">60 – 100</td>
                    <td className="px-4 py-2">30%</td>
                    <td className="px-4 py-2">70%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Over 100</td>
                    <td className="px-4 py-2">20%</td>
                    <td className="px-4 py-2">80%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Single Order Service */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-blue-600" />
              Single Order Service
            </h3>
            <p className="text-gray-700 mb-3">
              For direct sales from your closet, KuKu handles pickup, QC, and delivery:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 font-medium">Selling Price (AED)</th>
                    <th className="px-4 py-2 font-medium">KuKu Commission</th>
                    <th className="px-4 py-2 font-medium">Seller Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">50 – 100</td>
                    <td className="px-4 py-2">35%</td>
                    <td className="px-4 py-2">65%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">100 – 150</td>
                    <td className="px-4 py-2">30%</td>
                    <td className="px-4 py-2">70%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">150 – 200</td>
                    <td className="px-4 py-2">20%</td>
                    <td className="px-4 py-2">80%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">200 – 1,000</td>
                    <td className="px-4 py-2">15%</td>
                    <td className="px-4 py-2">85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Rental Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Rental Service
            </h3>
            <p className="text-gray-700 mb-3">
              For rentals, KuKu commissions vary by rental price:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 font-medium">Rental Price (AED)</th>
                    <th className="px-4 py-2 font-medium">KuKu Commission</th>
                    <th className="px-4 py-2 font-medium">Seller Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">100 – 150</td>
                    <td className="px-4 py-2">30%</td>
                    <td className="px-4 py-2">70%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">150 – 250</td>
                    <td className="px-4 py-2">25%</td>
                    <td className="px-4 py-2">75%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">250 – 1,000</td>
                    <td className="px-4 py-2">20%</td>
                    <td className="px-4 py-2">80%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">1,000 – 3,000</td>
                    <td className="px-4 py-2">15%</td>
                    <td className="px-4 py-2">85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 text-gray-700 italic">
            Commission covers logistics, QC, secure delivery, and promotional support.
          </p>
        </div>

        {/* 4. Seller Payouts */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Seller Payouts</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Sellers are eligible for payouts only after:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The item <strong>passes KuKu Quality Check (QC)</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The item is <strong>delivered successfully</strong> to the buyer.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The <strong>return/refund window</strong> (if applicable) has expired.</span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            <strong>Processing Time:</strong> Payouts are processed within <strong>7–14 working days</strong>.<br />
            <strong>Payment Method:</strong> Bank transfer or digital wallet (subject to KuKu approval).<br />
            <strong>Minimum Threshold:</strong> Sellers must have at least <strong>AED 100</strong> to request a payout.
          </p>
        </div>

        {/* 5. Refunds & Returns */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Refunds & Returns</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Refunds for canceled orders, failed QC, or approved returns are <strong>credited to the buyer’s KuKu Wallet</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Refunds can also be issued to the <strong>original payment method</strong> at KuKu’s discretion.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Wallet refunds are <strong>immediately usable</strong> for future purchases.</span>
            </li>
          </ul>
        </div>

        {/* 6. Withholding & Deductions */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Withholding & Deductions</h2>
          </div>
          <p className="text-gray-700 mb-3">
            KuKu may withhold payouts if:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>There is a <strong>dispute</strong> between buyer and seller.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Suspected <strong>fraud, counterfeit items, or policy violations</strong> occur.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Investigations regarding <strong>QC or authenticity</strong> are pending.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Wallet balance is <strong>negative</strong> due to penalties or chargebacks.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            KuKu may deduct <strong>transaction fees, payment gateway charges, or penalties</strong> before releasing a payout.
          </p>
        </div>

        {/* 7. Expiry of Credits */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Expiry of Credits</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Promotional credits or vouchers</strong> may have an expiry date, which will be communicated.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Sales proceeds and refunds do not expire</strong> but must comply with KuKu’s active account policy.</span>
            </li>
          </ul>
        </div>

        {/* 8. Seller Responsibilities */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">8. Seller Responsibilities</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Ensure items listed are <strong>accurate, genuine, and ready for QC</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Provide all required details for <strong>smooth payout processing</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Keep <strong>banking and wallet information updated</strong> to avoid delays.</span>
            </li>
          </ul>
        </div>

        {/* 9. Liability Disclaimer */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">9. Liability Disclaimer</h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>KuKu is <strong>not liable for delays</strong> caused by incorrect seller bank details or external payment issues.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>KuKu reserves the right to <strong>amend payout timelines</strong> due to operational or regulatory reasons.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
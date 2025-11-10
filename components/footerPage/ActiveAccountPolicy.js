import React from 'react';
import { AlertCircle, CheckCircle, Clock, Shield, UserX } from 'lucide-react';

export const ActiveAccountPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Same as Return Page */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Active Account, Dispute & Suspension Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            At KuKu, we want to ensure a safe, trustworthy, and smooth experience for all users — buyers, sellers, renters, and donors. To achieve this, all users must maintain an active account in good standing by complying with KuKu’s rules, policies, and community guidelines.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Active Account Requirements */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Active Account Requirements</h2>
          </div>
          <p className="text-gray-700 mb-4">
            To keep your KuKu account active, you must:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Provide accurate, truthful, and updated information at all times.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Ensure all listings and items meet KuKu’s Quality Check (QC) standards.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Follow all KuKu policies (Seller Policy, Rental Policy, Giveaway Policy, QC Policy, etc.).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Respect community guidelines — no harassment, abuse, or inappropriate content.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Maintain good standing with transactions (no excessive cancellations, failed pickups, or repeated QC failures).</span>
            </li>
          </ul>
          <p className="mt-4 text-gray-600 italic">
            <strong>Failure to comply</strong> may lead to warnings, suspension, or permanent account termination.
          </p>
        </div>

        {/* 2. Dispute Resolution */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Dispute Resolution</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Disputes may arise between buyers and sellers, or sellers and KuKu, especially regarding QC outcomes, returns, or product authenticity. KuKu has a structured dispute resolution process:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">1. Raising a Dispute</h3>
              <ul className="space-y-1 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">a.</span>
                  <span>Buyers must raise disputes <strong>within 48 hours of delivery</strong> through the app.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">b.</span>
                  <span>Sellers may dispute QC failures <strong>within 24 hours of notification</strong>.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">2. Investigation Process</h3>
              <ul className="space-y-1 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">a.</span>
                  <span>KuKu reviews the case, QC records, and communication.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">b.</span>
                  <span>Additional evidence (photos, receipts, proof of authenticity) may be requested.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">3. Resolution</h3>
              <ul className="space-y-1 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">a.</span>
                  <span>KuKu will provide a <strong>final decision</strong> after review.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">b.</span>
                  <span>Outcomes may include: refund to buyer, return to seller, or re-listing.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">c.</span>
                  <span><strong>KuKu’s decision is final and binding</strong> to protect fairness and consistency.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Account Suspension & Termination */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <UserX className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Account Suspension & Termination</h2>
          </div>
          <p className="text-gray-700 mb-4">
            To maintain platform integrity, KuKu may suspend or terminate accounts for violations.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Grounds for Suspension/Termination</h3>
              <ul className="space-y-1 text-gray-700">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Repeated QC failures (e.g., listing items not as described).</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Selling or attempting to sell counterfeit, stolen, or prohibited items.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Fraudulent activity (false claims, payment fraud, chargebacks).</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Abusive or inappropriate behavior towards staff or users.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Violation of rental rules, including damage or non-return of items.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Repeated policy breaches after prior warnings.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Types of Action</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 font-bold">1.</span>
                  <div><strong>Warning Notice</strong> – for minor or first-time violations.</div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">2.</span>
                  <div><strong>Temporary Suspension</strong> – account frozen for investigation or penalty.</div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">3.</span>
                  <div><strong>Permanent Ban</strong> – account closed, no further access to KuKu services.</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
            <h4 className="font-semibold text-amber-900 mb-1">Appeals</h4>
            <ul className="text-amber-800 text-sm space-y-1">
              <li>• Suspended or banned users may appeal by contacting <strong>support@letskuku.com</strong> within <strong>14 days</strong> of notice.</li>
              <li>• Appeals will be reviewed, but KuKu reserves the right to uphold or overturn decisions.</li>
            </ul>
          </div>
        </div>

        {/* 4. Inactive Accounts */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 mr-3 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Inactive Accounts</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Accounts with <strong>no activity for 12 months</strong> may be marked inactive.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Wallet balances (if any) must be claimed within this period.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu may archive or delete inactive accounts <strong>after notice</strong>.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Handshake, Clock, AlertTriangle, CheckCircle, XCircle, Package, Shield } from 'lucide-react';

export const MakeAnOfferPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Handshake className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Make an Offer Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            The “Make an Offer” feature on KuKu enables buyers and sellers to negotiate prices in a fair, transparent, and structured way while maintaining platform integrity and trust.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. How It Works */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Handshake className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. How It Works</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Buyers can make an offer on items where the <strong>“Make an Offer”</strong> option is enabled.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers can <strong>accept, reject, or counter</strong> the offer.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Negotiations are limited to a <strong>maximum of three (3) rounds</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>If no agreement is reached within three rounds, the buyer may:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">Check</span>
              <span>Purchase the item at the <strong>listed price</strong>, or</span>
            </li>
            <li className="flex">
              <span className="mr-2">X</span>
              <span><strong>Withdraw</strong> from negotiation.</span>
            </li>
          </ul>
        </div>

        {/* 2. Offer Acceptance & Checkout Window */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Offer Acceptance & Checkout Window</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Once a seller <strong>accepts an offer</strong>, the buyer has <strong>24 hours</strong> to complete checkout at the agreed price.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>During this 24-hour period:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The item <strong>remains live at its listed price</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Other buyers can still purchase it</strong> at the listed price.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>If another buyer checks out first, <strong>they get the item</strong>.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 font-medium text-amber-700">
            To avoid losing the item, <strong>check out immediately</strong> after offer acceptance.
          </p>
        </div>

        {/* 3. Offer Rules */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Offer Rules</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>All offers must be made in <strong>good faith</strong> and represent genuine interest.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Offers are <strong>binding upon acceptance</strong> — once accepted, the buyer is expected to proceed with the purchase.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Buyers <strong>cannot make offers below 50% of the listed price</strong> to prevent spamming and misuse.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers are <strong>not obligated</strong> to accept or respond to any offer.</span>
            </li>
          </ul>
        </div>

        {/* 4. Offer Expiry & Cancellation */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Offer Expiry & Cancellation</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>If the buyer does not complete checkout within <strong>24 hours</strong>, the offer <strong>automatically expires</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Expired offers <strong>cannot be reinstated</strong> — the buyer must submit a new offer.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers may <strong>withdraw from an ongoing offer</strong> before buyer checkout, provided the item has not yet been sold.</span>
            </li>
          </ul>
        </div>

        {/* 5. Prohibited Behaviors */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Prohibited Behaviors</h2>
          </div>
          <p className="text-gray-700 mb-3">Users may not:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Spam multiple low-value or insincere offers.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Delay checkout intentionally to block other buyers.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Cancel after offer acceptance without valid reason.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Attempt to negotiate, exchange contact details, or complete the sale <strong>outside the KuKu platform</strong>.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-600 italic">
            Violations may lead to <strong>warnings, temporary suspension, or account termination</strong> under KuKu’s Community Guidelines.
          </p>
        </div>

        {/* 6. Final Sale & Quality Check (QC) */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Final Sale & Quality Check (QC)</h2>
          </div>
          <p className="text-gray-700 mb-3">After successful checkout:</p>
          <ol className="space-y-2 text-gray-700 list-decimal pl-6">
            <li>KuKu arranges <strong>item pickup</strong> from the seller.</li>
            <li>The item undergoes <strong>Quality Check (QC)</strong> at the KuKu Center.</li>
            <li>If the item <strong>passes QC</strong>, it is delivered to the buyer.</li>
            <li>If the item <strong>fails QC</strong>, the sale is cancelled, and the buyer receives a <strong>full refund</strong>.</li>
          </ol>
        </div>

        {/* 7. Disputes & Misuse */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Disputes & Misuse</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Any issues arising from offers or negotiations will be addressed under <strong>KuKu’s Dispute Resolution Policy</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Repeated misuse of the Make an Offer feature may lead to <strong>account restrictions or permanent suspension</strong>.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
import React from 'react';
import { Truck, Package, CheckCircle, XCircle, AlertTriangle, Shield, Recycle, Gift } from 'lucide-react';

export const PickupAndDeliveryPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Truck className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Pickup & Delivery Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            At KuKu, we ensure that the movement of items between sellers, buyers, and donors is seamless, reliable, and transparent. This policy sets out how pickups and deliveries are managed on the platform.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Pickup from Sellers & Donors */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Pickup from Sellers & Donors</h2>
          </div>

          {/* Standard Listings */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-600" />
              Standard Listings (Independent Sellers)
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Items are picked up <strong>only after a confirmed purchase</strong>.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Our logistics partner collects the item directly from the <strong>seller’s registered address</strong>.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>The item is transported to the <strong>KuKu Quality Check (QC) Center</strong>.</span>
              </li>
              <li className="flex">
                <span className="mr-2">Check</span>
                <span><strong>If QC is passed</strong> → item proceeds to the buyer.</span>
              </li>
              <li className="flex">
                <span className="mr-2">X</span>
                <span><strong>If QC fails</strong> → item is returned to the seller, and a <strong>warning may be issued</strong> for misrepresentation.</span>
              </li>
            </ul>
          </div>

          {/* Ku-Kit Sellers */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2 text-emerald-600" />
              Ku-Kit Sellers (Batch Submissions)
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Sellers may request KuKu to collect <strong>multiple items in bulk</strong>.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Items are brought to KuKu, <strong>stored securely</strong>, and listed online on the seller’s behalf.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Once an item is sold, it is shipped <strong>directly from KuKu’s stock</strong> to the buyer.</span>
              </li>
            </ul>
          </div>

          {/* Giveaway Items */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Gift className="w-5 h-5 mr-2 text-teal-600" />
              Giveaway Items (Donors)
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Giveaway pickups are <strong>not linked to purchases</strong>.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Donors may <strong>schedule item collection</strong> directly with KuKu.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Pickups are subject to <strong>KuKu’s logistics availability</strong>.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>KuKu reserves the right to <strong>decline items</strong> that do not meet basic donation, repurposing, or recycling standards.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span>Once collected, KuKu sorts items into three streams:</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700 ml-8 mt-2">
              <li className="flex">
                <span className="mr-2">Heart</span>
                <span><strong>Donation</strong> (reusable textiles/items given to charity)</span>
              </li>
              <li className="flex">
                <span className="mr-2">RefreshCw</span>
                <span><strong>Repurposing</strong> (items converted into other usable products)</span>
              </li>
              <li className="flex">
                <span className="mr-2">Recycle</span>
                <span><strong>Recycling</strong> (items responsibly recycled)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Delivery to Buyers */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Truck className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Delivery to Buyers</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Once an item <strong>passes QC</strong>, it is shipped to the buyer through <strong>KuKu’s logistics partner</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Buyers receive <strong>tracking updates</strong> and an <strong>estimated delivery timeline</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Delivery fees</strong>, if applicable, are displayed at checkout.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Buyers are responsible for providing <strong>accurate delivery details</strong>. KuKu is <strong>not liable</strong> for delays caused by incorrect addresses or missed deliveries.</span>
            </li>
          </ul>
        </div>

        {/* 3. Special Provisions */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Special Provisions</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Luxury Items:</strong> Additional authentication services may be requested (<strong>extra charges apply</strong>).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Large Items:</strong> Pickups/deliveries for oversized or bulkier items may require <strong>separate arrangements and charges</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Unsuccessful Deliveries:</strong> If a delivery cannot be completed after multiple attempts, the item will be <strong>returned to KuKu</strong> and the buyer may be charged for <strong>re-delivery</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 4. Liability Disclaimer */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
          <div className="flex items-start">
            <Shield className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">4. Liability Disclaimer</h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>KuKu ensures items are <strong>handled with care</strong> during pickup, QC, and delivery.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>However, KuKu is <strong>not liable</strong> for delays or damages caused by <strong>third-party logistics providers</strong> beyond reasonable control.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Sellers and buyers are expected to comply with KuKu’s <strong>packaging and address accuracy requirements</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
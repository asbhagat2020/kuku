import React from 'react';
import { FileText, User, Package, Shield, CheckCircle, XCircle, Truck, DollarSign, RefreshCw, AlertTriangle, Mail, Globe, Recycle } from 'lucide-react';

export const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Welcome to KuKu, a curated platform for buying, selling, renting, and giving away fashion and lifestyle products.
          </p>
          <p className="text-lg text-blue-200 mt-2">
            These Terms & Conditions govern your access to and use of the KuKu mobile application, website, and related services.
          </p>
          <p className="mt-4 text-blue-100 font-medium">
            By creating an account or using KuKu in any way, you agree to be bound by these Terms. If you do not agree, please do not use the platform.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Definitions */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Definitions</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>"KuKu"</strong> refers to the app/platform operated by <strong>KuTech Global LLC FZ</strong> or its authorized entity.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>"User"</strong> refers to any person using the KuKu platform.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>"Seller"</strong> refers to any user listing an item for sale, rent, or giveaway.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>"Buyer"</strong> refers to any user purchasing or renting an item on KuKu.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>"KuKit"</strong> is KuKu’s managed inventory and fulfillment service for batch items.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>"Giveaway"</strong> refers to donation of eligible textiles/items via the platform.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>"Rental"</strong> refers to the temporary use of a product by a renter for a fee.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>"Quality Check" (QC)</strong> is KuKu’s internal inspection process for verifying item condition and eligibility.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>“Standard Listing Service”</strong> – where sellers retain items until sold.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>“KuKu Wallet”</strong> – in-app balance for payouts and refunds.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>“User Content”</strong> – user-uploaded text, images, and listings.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>“KuKu Center”</strong> – the physical or designated hub for QC and logistics.</span>
            </li>
          </ul>
        </div>

        {/* 2. Eligibility to Use KuKu */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Eligibility to Use KuKu</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>You must be <strong>at least 18 years old</strong> or have <strong>legal parental/guardian consent</strong> to use the app.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>You must provide <strong>accurate, complete, and updated</strong> personal and contact information during registration.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu reserves the right to <strong>approve, suspend, or terminate accounts</strong> at its discretion, particularly in cases of abuse, fraud, or violations.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 italic">
            Please refer to <strong>KuKu Active Account Policy</strong> for more information.
          </p>
        </div>

        {/* 3. User Responsibilities */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">3. User Responsibilities</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Users are <strong>solely responsible</strong> for activity on their account and must maintain the <strong>confidentiality of their login credentials</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Users must not:</strong></span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Upload or list <strong>prohibited, illegal, or counterfeit goods</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Harass, impersonate, or abuse others</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Circumvent KuKu processes</strong> (e.g. offline payments, unapproved shipping)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Upload or communicate content that violates <strong>intellectual property, privacy, or decency laws</strong>.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            KuKu reserves the right to <strong>report illegal activities to authorities</strong>.
          </p>
        </div>

        {/* 4. Listings & Item Guidelines */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Listings & Item Guidelines</h2>
          </div>
          <p className="text-gray-700 mb-3"><strong>All listings must:</strong></p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Accurately describe</strong> the product (brand, size, condition, flaws)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Use <strong>clear, unaltered photos</strong> of the actual item</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Follow KuKu’s <strong>content, authenticity, and hygiene standards</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers are responsible for ensuring they have the <strong>right to sell or rent</strong> the item listed.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            KuKu reserves the right to:
          </p>
          <ul className="space-y-2 text-gray-700 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Edit, remove, or reject</strong> any listing that violates platform standards</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Ban users</strong> for repeated violations</span>
            </li>
          </ul>
        </div>

        {/* 5. Quality Check Policy */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Quality Check Policy</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Every item listed on KuKu undergoes a <strong>mandatory Quality Check (QC)</strong> before being shipped to buyers or for rent.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Items that <strong>fail QC</strong> due to damage, poor hygiene, counterfeit branding, not aligning with item description, or unacceptable condition will be <strong>rejected and returned</strong> to the seller.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 italic">
            Please refer to <strong>Quality Check Fail Policy</strong> for more information.
          </p>
          <p className="mt-2 text-gray-700">
            KuKu reserves the right to <strong>permanently ban sellers</strong> who repeatedly submit ineligible or misleading items.
          </p>
        </div>

        {/* 6. KuKit (Managed Seller Service) */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-purple-700" />
            <h2 className="text-xl font-bold text-gray-800">6. KuKit (Managed Seller Service)</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>KuKit</strong> allows sellers to send a batch of items to KuKu for storage, quality check, listing, and fulfillment.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu will:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>List approved items on the seller’s behalf</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Handle order processing, returns, and delivery</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Pay the seller their share after a successful sale</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 mt-3">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers must agree to <strong>KuKit’s item intake and rejection policies</strong> separately.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Unsold items after 180 days</strong> may be returned to the seller or donated at KuKu’s discretion.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu is <strong>not responsible</strong> for loss or damage due to force majeure or courier delays.</span>
            </li>
          </ul>
        </div>

        {/* 7. Payments & Commission */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 mr-3 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Payments & Commission</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Minimum purchase per seller is AED 50</strong>. User has to make sure they purchase minimum AED 50 worth of items from per seller.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Payments are made through <strong>secure third-party gateways</strong> integrated in the app.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>All commissions and fees are <strong>exclusive of applicable VAT</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Sellers are applicable for any taxes</strong> applicable to their earnings.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Sellers receive payouts via the <strong>KuKu wallet or linked bank account</strong> after commission deductions.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700 italic">
            (Refer to the <strong>Commission & Fees Policy</strong> for full breakdown.)
          </p>
        </div>

        {/* 8. Rentals */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RefreshCw className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">8. Rentals</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Renters must return items in the <strong>same condition as received</strong>, by the <strong>due date</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Late returns or damage</strong> will incur penalties as outlined in the <strong>Rental Policy</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 9. Giveaways & Donations */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Recycle className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">9. Giveaways & Donations</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Users may donate <strong>clean, usable textiles</strong> such as clothing, bedsheets, curtains, etc.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu will:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Conduct a quality check</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Donate usable items to charity</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Recycle or repurpose</strong> damaged items sustainably</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            Giveaways are <strong>not returnable</strong> and are handled at KuKu’s discretion. KuKu does <strong>not guarantee</strong> that all donated items will be accepted by charities; non-eligible items will be <strong>repurposed/recycled/upcycled/resold responsibly</strong>.
          </p>
        </div>

        {/* 10. Returns & Refunds */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Truck className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">10. Returns & Refunds</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu accepts return requests only within the specified window of <strong>8 hours after delivery</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Item must be:</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 ml-8 mt-2">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>In the <strong>same condition</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Unused and not washed or altered</strong></span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            Once approved, refunds will be issued via <strong>original payment method or KuKu wallet credit</strong>.
          </p>
          <p className="mt-2 text-gray-700 italic">
            (Refer to the <strong>Return & Refund Policy</strong> for detailed terms.)
          </p>
        </div>

        {/* 11. Liability & Disclaimers */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">11. Liability & Disclaimers</h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>KuKu quality checks every item to ensure condition, hygiene, and compliance with listing claims.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Despite QC, KuKu does <strong>not guarantee</strong> fit, subjective satisfaction, or allergen-free fabrics.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>KuKu is <strong>not liable</strong> for:</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-800 ml-8 mt-2">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Wear and tear after delivery</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Lost or stolen items post-delivery</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Misuse or allergic reactions to fabrics</span>
                </li>
              </ul>
              <p className="mt-3 text-gray-800">
                In the rare case an item is found <strong>counterfeit or misrepresented post-QC</strong>, KuKu may offer return/refund and take corrective action against the seller.
              </p>
              <p className="mt-2 text-gray-800">
                KuKu acts only as an <strong>intermediary</strong> and is <strong>not the legal seller</strong> of items except under KuKit.
              </p>
              <p className="mt-2 text-gray-800 font-medium">
                Users agree that their use of the platform is <strong>at their sole risk</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* 12. Intellectual Property */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">12. Intellectual Property</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>KuKu content</strong> (logos, app UI, text, etc.) is the intellectual property of KuKu and may not be reused without consent.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Unauthorized use</strong> of KuKu’s trademarks, branding, or likeness for commercial purposes is <strong>strictly prohibited</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>By uploading photos, sellers grant KuKu a <strong>royalty-free license</strong> to use them for marketing or promotional purposes.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Users retain ownership of their content but grant KuKu a <strong>non-exclusive license</strong> to use, display, and distribute it.</span>
            </li>
          </ul>
        </div>

        {/* 13. Account Suspension & Termination */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">13. Account Suspension & Termination</h2>
          </div>
          <p className="text-gray-700 mb-3">
            KuKu may <strong>suspend or permanently disable</strong> accounts that:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Upload <strong>fraudulent listings</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Repeatedly fail QC</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Harass staff or customers</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Circumvent platform rules</strong></span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            Users may <strong>request account deletion</strong> at any time.
          </p>
        </div>

        {/* 14. Modifications to Terms */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RefreshCw className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">14. Modifications to Terms</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu may <strong>update these Terms at any time</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Users will be notified of <strong>material changes</strong> via email or app notification.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Continued use of the platform constitutes acceptance</strong> of updated terms.</span>
            </li>
          </ul>
        </div>

        {/* 15. Governing Law & Jurisdiction */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">15. Governing Law & Jurisdiction</h2>
          </div>
          <p className="text-gray-700">
            These Terms & Conditions are <strong>governed by the laws of the United Arab Emirates</strong>. Any disputes shall be resolved through <strong>UAE courts</strong>, unless otherwise mutually agreed.
          </p>
        </div>

        {/* 16. Contact Us - Styled Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
          <p className="text-lg mb-4">
            If you have questions about these Terms, please contact us at:
          </p>
          <div className="space-y-2">
            <a
              href="mailto:support@letskuku.com"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300"
            >
              support@letskuku.com
            </a>
            <p className="text-sm mt-2">
              KuTech Global LLC FZ, Dubai, UAE
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
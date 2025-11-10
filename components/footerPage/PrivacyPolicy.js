import React from 'react';
import { Shield, User, Package, Smartphone, FileText, Cookie, Lock, Globe, RefreshCw, Mail, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            KuKu is committed to protecting your privacy. This Privacy Policy explains what personal data we collect, how we use it, and your rights as a user of our platform.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Information We Collect */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Information We Collect</h2>
          </div>
          <p className="text-gray-700 mb-4">
            We may collect the following categories of information:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">a. Personal Information</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Name, email address, phone number</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Date of birth, gender</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Delivery address and location</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">b. Account & Profile Data</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Username, encrypted password</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Profile photo, bio, and linked social media handles (if provided)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">c. Transaction Data</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Order history and payment information (secured through trusted payment gateways)</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Wallet balance and payout details (for sellers)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">d. Device & Usage Data</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Device type, IP address, browser information</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>App interactions, clicks, and usage patterns</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">e. Content Uploaded</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Item photos, descriptions, and condition details</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Reviews, ratings, and messages exchanged on the platform</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. How We Use Your Information */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">2. How We Use Your Information</h2>
          </div>
          <p className="text-gray-700 mb-3">We use your information to:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Enable account creation and login</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Facilitate item listings, rentals, giveaways, and purchases</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Process payments and seller payouts</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Conduct quality checks and provide customer support</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Improve our product, user experience, and recommendations</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Detect and prevent fraud, misuse, or security breaches</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Comply with legal and regulatory obligations</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Send transactional and promotional communications <strong>(only if you’ve opted in)</strong></span>
            </li>
          </ul>
        </div>

        {/* 3. Sharing Your Information */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Sharing Your Information</h2>
          </div>
          <p className="text-gray-700 mb-3">
            KuKu <strong>does not sell</strong> your personal data. However, we may share limited information with:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Logistics partners (for pickups and deliveries)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Payment processors (e.g., Stripe, Telr, etc.)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Cloud service providers (for secure data storage)</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Marketing and analytics tools <strong>(only if you’ve opted in)</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Law enforcement or regulators, <strong>when required by applicable law</strong></span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            All third-party partners are <strong>bound by confidentiality and data-protection obligations</strong>.
          </p>
        </div>

        {/* 4. Data Retention */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Data Retention</h2>
          </div>
          <p className="text-gray-700">
            We retain your data for as long as your account is active or as needed for business, legal, or regulatory purposes. You may <strong>request deletion</strong> of your account and associated data at any time by emailing <strong>support@letskuku.com</strong>.
          </p>
        </div>

        {/* 5. Cookies & Tracking */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Cookie className="w-6 h-6 mr-3 text-amber-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Cookies & Tracking</h2>
          </div>
          <p className="text-gray-700 mb-3">KuKu uses cookies and similar technologies to:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Remember your login and preferences</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Improve recommendations and browsing experience</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Analyze performance and platform usage</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            You can <strong>manage or disable cookies</strong> through your browser settings.
          </p>
        </div>

        {/* 6. Your Rights */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Your Rights</h2>
          </div>
          <p className="text-gray-700 mb-3">Depending on your jurisdiction, you may have the right to:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Access</strong> your personal data</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Correct</strong> inaccurate information</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Request deletion</strong> of your data</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Object</strong> to processing for marketing purposes</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Withdraw consent</strong> at any time</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            To exercise these rights, please contact <strong>support@letskuku.com</strong>.
          </p>
        </div>

        {/* 7. Data Security */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Data Security</h2>
          </div>
          <p className="text-gray-700">
            We use <strong>industry-standard encryption, secure servers, and restricted access protocols</strong> to protect your data. However, <strong>no method of transmission or storage is completely secure</strong>. We encourage users to maintain <strong>strong passwords</strong> and safeguard their login credentials.
          </p>
        </div>

        {/* 8. Children’s Privacy */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">8. Children’s Privacy</h2>
          </div>
          <p className="text-gray-700">
            KuKu is <strong>not intended for users under 13 years old</strong>. If we discover that an account belongs to an underage user, it will be <strong>deleted along with all associated data</strong>.
          </p>
        </div>

        {/* 9. International Users */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">9. International Users</h2>
          </div>
          <p className="text-gray-700">
            If you access KuKu from outside the UAE, you consent to your data being <strong>stored and processed in the UAE</strong> or in any other country where our service providers operate, in compliance with applicable data-protection laws.
          </p>
        </div>

        {/* 10. Updates to This Policy */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RefreshCw className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">10. Updates to This Policy</h2>
          </div>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. Any changes will be communicated via the <strong>app or email</strong>. Continued use of KuKu after updates indicates your <strong>acceptance of the revised policy</strong>.
          </p>
        </div>

        {/* 11. Contact Us - Styled Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
          <p className="text-lg mb-4">For privacy-related inquiries or data-access requests, please contact:</p>
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
import React from 'react';
import { AlertCircle, Cookie, Shield, Eye, Settings, RefreshCw, Mail } from 'lucide-react';

export const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Cookie className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Cookie Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            This Cookie Policy explains how KuKu (“we,” “our,” “us”) uses cookies and similar technologies on our website and mobile application. It also explains your rights and choices regarding these technologies.
          </p>
          <p className="text-lg text-blue-200 mt-2">
            This Cookie Policy forms part of KuKu’s Privacy Policy and should be read together with it.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. What Are Cookies? */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. What Are Cookies?</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Cookies are small text files stored on your device when you visit a website or use an app. They help remember your preferences, improve functionality, and provide a better user experience.
          </p>
          <p className="text-gray-700 mb-3">Cookies can be:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Session Cookies:</strong> Temporary, deleted when you close your browser.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Persistent Cookies:</strong> Remain on your device until they expire or are deleted.</span>
            </li>
          </ul>
        </div>

        {/* 2. Types of Cookies We Use */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Types of Cookies We Use</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">a) Strictly Necessary Cookies</h3>
              <p className="text-gray-700 mb-3">Essential for KuKu’s operation. They allow you to:</p>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Log in to your account</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Navigate the platform securely</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Use shopping cart and checkout features</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-2">These cookies cannot be disabled as they are required for core functionality.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">b) Performance & Analytics Cookies</h3>
              <p className="text-gray-700 mb-3">Help us understand:</p>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>How visitors use our platform</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Which pages or features are most popular</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>How users navigate</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-2">We use this data to improve performance and user experience (e.g., Google Analytics).</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">c) Functional Cookies</h3>
              <p className="text-gray-700 mb-3">Remember your preferences such as:</p>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Language, location, or currency</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Saved items or filters</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-2">They make your experience more personalized and convenient.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">d) Advertising & Targeting Cookies</h3>
              <p className="text-gray-700 mb-3">Used to:</p>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Show you relevant ads on KuKu or partner platforms</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Measure ad performance</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Avoid repetitive ads</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-2">We may share anonymized or aggregated data with advertising partners to improve ad relevance.</p>
            </div>
          </div>
        </div>

        {/* 3. Third-Party Cookies */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Third-Party Cookies</h2>
          </div>
          <p className="text-gray-700">
            Some cookies are set by third parties (e.g., analytics providers, advertising networks, or social media platforms). These third parties have their own privacy and cookie policies, which we encourage you to review.
          </p>
        </div>

        {/* 4. Your Cookie Choices */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Settings className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Your Cookie Choices</h2>
          </div>
          <p className="text-gray-700 mb-3">You can manage cookies through:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Cookie Banner:</strong> When you first visit KuKu, you can accept or reject non-essential cookies.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Opt-Out Tools:</strong> Some providers (e.g., Google) offer tools to control ad preferences.</span>
            </li>
          </ul>
          <p className="mt-3 text-gray-600 italic">
            <strong>Note:</strong> Disabling some cookies may affect site functionality or limit your experience.
          </p>
        </div>

        {/* 5. Changes to This Policy */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RefreshCw className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Changes to This Policy</h2>
          </div>
          <p className="text-gray-700">
            We may update this Cookie Policy periodically to reflect changes in our practices, technologies, or legal requirements. Updated versions will be posted here with a revised “Effective Date.”
          </p>
        </div>

        {/* 6. Contact Us - Styled Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
          <p className="text-lg mb-4">If you have any questions about this Cookie Policy or our use of cookies, please contact us at:</p>
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
import React from 'react';
import { Shield, Image, Ban, AlertTriangle, FileWarning, Flag, RefreshCw, Mail } from 'lucide-react';

export const ContentPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Content Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            This policy governs all user-generated content uploaded to KuKu, including product photos, descriptions, rental listings, comments, and messages. KuKu aims to maintain a safe, respectful, and inclusive platform for all users.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Purpose */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileWarning className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Purpose</h2>
          </div>
          <p className="text-gray-700">
            This policy governs all user-generated content uploaded to KuKu, including product photos, descriptions, rental listings, comments, and messages. KuKu aims to maintain a safe, respectful, and inclusive platform for all users.
          </p>
        </div>

        {/* 2. Prohibited Content */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Ban className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Prohibited Content</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Users are strictly prohibited from uploading, sharing, or displaying any content that includes or promotes the following:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">a. Inappropriate or Offensive Material</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Nudity, sexually explicit, or suggestive imagery</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Hate speech, discriminatory remarks, or threats based on race, gender, religion, nationality, disability, or sexual orientation</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Profanity, harassment, or abusive language in listings or communications</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">b. Illegal or Restricted Items</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Counterfeit or replica goods</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Weapons, drugs, or any items prohibited under UAE law</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Stolen property or items listed without proof of ownership</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">c. Misleading or False Information</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>False or exaggerated claims about brand, quality, or condition</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Unauthorized use of trademarks, brand names, or logos</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Manipulated or excessively edited images that misrepresent the item</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Image & Listing Guidelines */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Image className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">3. Image & Listing Guidelines</h2>
          </div>
          <p className="text-gray-700 mb-4">
            To ensure visual consistency and transparency across the platform:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">a. Product Photos Must:</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Clearly and accurately show the actual item</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Be well-lit and in focus</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Avoid excessive filters, collages, text overlays, or watermarks</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Be original (taken by the seller or authorized representative, not from the internet)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">b. Descriptions Must:</h3>
              <ul className="space-y-2 text-gray-700 pl-6">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Be truthful, detailed, and relevant</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Avoid excessive capitalization, emojis, or personal promotional messages (e.g., “DM me,” “Contact me directly”)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Restricted Promotional Behavior */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Restricted Promotional Behavior</h2>
          </div>
          <p className="text-gray-700">
            Users may not promote or link to external websites, stores, or social media pages in listings unless they are registered self-influencer accounts approved by KuKu.
          </p>
        </div>

        {/* 5. Intellectual Property Rights */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Intellectual Property Rights</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Users may upload only content they own or have authorization to use. KuKu reserves the right to remove any listing that violates copyright, trademark, or other intellectual property rights.
          </p>
          <p className="text-gray-700">
            If you believe your intellectual property has been infringed upon, please contact us at <strong>support@letskuku.com</strong>.
          </p>
        </div>

        {/* 6. Consequences of Policy Violations */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Consequences of Policy Violations</h2>
          </div>
          <p className="text-gray-700 mb-3">
            Violations of this policy may result in:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Immediate removal of content</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Temporary suspension or permanent ban from the platform</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Legal action in cases of fraud, impersonation, or copyright infringement</span>
            </li>
          </ul>
        </div>

        {/* 7. Reporting Inappropriate Content */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Flag className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Reporting Inappropriate Content</h2>
          </div>
          <p className="text-gray-700">
            Users can report inappropriate or suspicious content directly through the KuKu app or website. Our moderation team will review and take appropriate action promptly.
          </p>
        </div>

        {/* 8. Updates to this Policy */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <RefreshCw className="w-6 h-6 mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">8. Updates to this Policy</h2>
          </div>
          <p className="text-gray-700">
            KuKu may update this Content Policy at any time. Users will be notified of significant updates via email or in-app notifications. Continued use of the platform after changes constitutes acceptance of the updated terms.
          </p>
        </div>

        {/* NO CONTACT SECTION — REMOVED AS REQUESTED */}

      </div>
    </div>
  );
};
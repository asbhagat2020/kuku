import React from 'react';
import { UserCheck, Mail, Smartphone, Shield, AlertTriangle, Lock, FileText, Ban, RefreshCw } from 'lucide-react';

export const SignUpPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <UserCheck className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Sign-Up Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            At KuKu, we’re building a safe, transparent, and trustworthy community for buyers, sellers, renters, and donors.
          </p>
          <p className="text-lg text-blue-200 mt-2">
            To uphold this standard, all users must meet the following eligibility and verification requirements when creating an account.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* 1. Eligibility */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <UserCheck className="w-6 h-6 mr-3 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">1. Eligibility</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>You must be <strong>at least 18 years old</strong> to create a KuKu account.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Users under 18 may only use KuKu <strong>under the supervision of a parent or guardian</strong> who holds the account.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>By signing up, you confirm that <strong>all information provided is true, accurate, and complete</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 2. Account Creation Requirements */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">2. Account Creation Requirements</h2>
          </div>
          <p className="text-gray-700 mb-3">When registering with KuKu, you must provide:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>A <strong>valid email address</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>A <strong>valid mobile number</strong> (verified via OTP).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>A <strong>unique username</strong> (assigned or approved by KuKu).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>A <strong>secure password</strong> — users are fully responsible for maintaining the confidentiality of their login details.</span>
            </li>
          </ul>
        </div>

        {/* 3. Verification */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 mr-3 text-emerald-700" />
            <h2 className="text-xl font-bold text-gray-800">3. Verification</h2>
          </div>
          <p className="text-gray-800 mb-3">
            To maintain security and trust, KuKu may require additional verification steps, including:
          </p>
          <ul className="space-y-2 text-gray-800">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>A <strong>government-issued ID</strong> (e.g., Emirates ID or Passport).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Proof of address</strong> (utility bill, tenancy contract, etc.).</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Payment method verification</strong> (linked bank account, wallet, or card).</span>
            </li>
          </ul>
          <p className="mt-4 text-emerald-900 font-semibold flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Enhanced verification applies to <strong>sellers, renters, and business accounts</strong>.
          </p>
        </div>

        {/* 4. Prohibited Sign-Ups */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Ban className="w-6 h-6 mr-3 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">4. Prohibited Sign-Ups</h2>
          </div>
          <p className="text-gray-700 mb-3">You may not create a KuKu account if you:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Have been <strong>previously suspended or banned</strong> from the platform.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Use <strong>false, misleading, or stolen information</strong> during registration.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>Create <strong>multiple accounts for fraudulent purposes</strong> (e.g., manipulating reviews, avoiding penalties, or bypassing restrictions).</span>
            </li>
          </ul>
        </div>

        {/* 5. Account Usage */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">5. Account Usage</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Each user is permitted only one personal account</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>You are <strong>solely responsible</strong> for all activity that occurs under your account.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Sharing or selling your account access is strictly prohibited</strong>.</span>
            </li>
          </ul>
        </div>

        {/* 6. Account Suspension or Termination */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-3 text-rose-600" />
            <h2 className="text-xl font-bold text-gray-800">6. Account Suspension or Termination</h2>
          </div>
          <p className="text-gray-700 mb-3">
            KuKu reserves the right to <strong>suspend or permanently terminate</strong> accounts if:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>False or fraudulent information</strong> is provided.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>The account is used to list <strong>prohibited items</strong> or engage in <strong>policy violations</strong>.</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>There are <strong>repeated or severe breaches</strong> of KuKu’s policies, community guidelines, or applicable UAE laws.</span>
            </li>
          </ul>
        </div>

        {/* 7. Consent to KuKu Policies */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">7. Consent to KuKu Policies</h2>
          </div>
          <p className="text-gray-700 mb-3">By signing up, you agree to abide by:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu’s <strong>Terms & Conditions</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span>KuKu’s <strong>Privacy Policy</strong></span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>All other applicable KuKu platform policies</strong> (e.g., Seller Policy, QC Policy, Community Guidelines).</span>
            </li>
          </ul>
        </div>

        {/* 8. Disclaimer */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">8. Disclaimer</h3>
              <p className="text-gray-800">
                KuKu reserves the right to <strong>update or amend this policy at any time</strong> to ensure compliance with operational or regulatory requirements.
              </p>
              <p className="text-gray-800 mt-2">
                <strong>Continued use of KuKu after any update constitutes acceptance of the revised policy</strong>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
import React from "react";
import {
  Sparkles,
  Leaf,
  ShoppingBag,
  Star,
  Heart,
  Users,
  FileText,
  Package,
  AlertCircle,
  Cookie,
  Gift,
  Shield,
  DollarSign,
  Truck,
  Lock,
  CheckCircle,
  UserPlus,
  CreditCard,
  RefreshCw,
  Globe,
} from "lucide-react";

export const AllPolicy = () => {
  const policies = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      name: "How It Works",
      path: "/how-it-works",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      name: "How We Calculate Our Carbon Footprint",
      path: "/how-we-calculate-our-carbon-footprint",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      name: "Our Services and Features",
      path: "/our-services-and-features",
    },
    {
      icon: <Star className="w-6 h-6" />,
      name: "Seller Education Guidelines",
      path: "/seller-education-guidelines",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      name: "Tips and Tricks on How to Sell on KuKu",
      path: "/tips-and-tricks",
    },
    {
      icon: <Users className="w-6 h-6" />,
      name: "Who We Are",
      path: "/who-we-are",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      name: "Content Policy",
      path: "/content-policy",
    },
    {
      icon: <Package className="w-6 h-6" />,
      name: "Ku-Kit T&C",
      path: "/ku-kit-t&c",
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      name: "KuKu Active Account Policy",
      path: "/active-account-policy",
    },
    {
      icon: <Users className="w-6 h-6" />,
      name: "KuKu Community Guidelines",
      path: "/community-guidelines",
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      name: "KuKu Cookie Policy",
      path: "/cookie-policy",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      name: "KuKu Giveaway Policy",
      path: "/giveaway-policy",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      name: "KuKu Rental Policy",
      path: "/rental-policy",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      name: "KuKu Luxury Authentication Policy Phase 1",
      path: "/luxeury-authentication-policy",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      name: "KuKu Make An Offer Policy",
      path: "/make-an-offer-policy",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      name: "KuKu Pick Up and Delivery Policy",
      path: "/pickup-and-delivery-policy",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      name: "KuKu Privacy Policy",
      path: "/privacy-policy",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      name: "KuKu Quality Check (QC) Policy",
      path: "/quality-check-policy",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      name: "KuKu Seller Policy",
      path: "/seller-policy",
    },
    {
      icon: <UserPlus className="w-6 h-6" />,
      name: "KuKu Sign-Up Policy",
      path: "/sign-up-policy",
    },
    {
      icon: <Package className="w-6 h-6" />,
      name: "KuKu Storage and Handling Policy",
      path: "/storage-handling-policy",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      name: "KuKu Terms and Conditions",
      path: "/terms-and-conditions",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      name: "KuKu Verification and Authentication",
      path: "/varification-and-authentication",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      name: "Payments and Commissions",
      path: "/payments-and-commissions",
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      name: "QC Fail Policies for B and S",
      path: "/qc-fail-policies",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      name: "Return Refund Cancellation",
      path: "/return-cancellation-refund",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All KuKu Policies & Guidelines
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to know about using KuKu safely, sustainably,
            and successfully.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy, index) => (
            <a
              key={index}
              href={policy.path}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 hover:bg-purple-50 border border-gray-100"
            >
              <div className="text-purple-600">{policy.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {policy.name}
              </h3>
            </a>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-10 text-white text-center">
          <FileText className="w-14 h-14 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Our support team is here to help with any policy or guideline
            inquiries.
          </p>
          <a
            href="mailto:support@letskuku.com"
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Heart, ShoppingBag, Package, Sparkles, Shield, Wallet, RefreshCw, Recycle, CheckCircle, HelpCircle, Mail } from 'lucide-react';

export default function Faq() {
  const faqSections = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "About KuKu",
      color: "text-orange-600",
      qa: [
        { q: "What is KuKu?", a: "KuKu is a lifestyle platform where you can buy, sell, rent, or give away fashion and home items — all through one trusted community." },
        { q: "How does KuKu work?", a: "KuKu connects sellers and buyers through verified listings. You can list items yourself (Standard Listing) or let KuKu handle it (Ku-Kit). Every item is quality-checked before reaching a buyer." },
        { q: "Where is KuKu available?", a: "KuKu currently operates in the UAE, with pickups, deliveries, and QC done locally. Expansion to other regions is planned soon." }
      ]
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Buying on KuKu",
      color: "text-indigo-600",
      qa: [
        { q: "How do I purchase an item?", a: "Simply browse, add items to your cart, and checkout securely. KuKu will collect the item from the seller, verify its condition, and then deliver it to you." },
        { q: "What if the item I receive doesn&apos;t match the description?", a: "You can raise a Return Request within 8 hours of delivery (12 hours for Ku-Kit items). Once verified, KuKu arranges return pickup and processes a refund." },
        { q: "Can I negotiate prices?", a: "Yes! All listings allow offers. You can “Make an Offer,” and the seller can accept, reject, or counter." },
        { q: "How long does delivery take?", a: "Once your order passes quality check, delivery usually takes 2–5 working days within the UAE." },
        { q: "Can I cancel my order?", a: "You may cancel before the seller ships or KuKu picks up the item. After pickup, cancellation is not possible as the item is already in process." }
      ]
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Selling on KuKu",
      color: "text-purple-600",
      qa: [
        { q: "How do I sell my items?", a: "Choose between two options:<br/>· Standard Listing: You keep the item until it&apos;s sold. KuKu confirms pick up for QC after a buyer confirms purchase.<br/>· Ku-Kit: KuKu picks up your batch, stores it, lists each item for you, and delivers when sold." },
        { q: "What can I sell on KuKu?", a: "You can sell clothing, accessories, shoes, bags, and small home items that are clean and in good condition. Certain items (underwear, replicas, damaged goods) are not allowed." },
        { q: "What are KuKu&apos;s selling fees or commissions?", a: "KuKu charges a small commission per successful sale, depending on item type and price range. Our commission covers logistics, QC, and platform operations." },
        { q: "When do I get paid?", a: "After your item is sold, passes QC, delivered to the buyer, and the return window closes — payments are processed within 7–14 working days." },
        { q: "What happens if my item fails QC?", a: "The item will be returned to you first and second time, then penalty will be applicable. Repeated offense will lead to suspension or permanent removal. You&apos;ll receive a message explaining why (e.g., stains, defects, or misdescription)." }
      ]
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Luxury & Authentic Items",
      color: "text-pink-600",
      qa: [
        { q: "Does KuKu authenticate luxury items?", a: "Currently, KuKu does not integrate with third-party authentication. Sellers are required to upload proof of authenticity (invoice, receipt, certificate). KuKu performs visual checks but does not certify authenticity." },
        { q: "What proof should I provide when selling luxury items?", a: "Accepted proofs include original receipts, serial numbers, authentication cards, or certificates from trusted services. Listings without valid proof may be rejected." },
        { q: "If a buyer claims an item is fake, who is responsible?", a: "Sellers are solely responsible for ensuring authenticity. KuKu facilitates the transaction and QC but does not hold liability for counterfeit items. Buyers are encouraged to review all proof before purchase." }
      ]
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Payments, Commissions & KuKu Wallet",
      color: "text-green-600",
      qa: [
        { q: "What is the KuKu Wallet?", a: "It&apos;s your in-app wallet for earnings, refunds, and credits. You can use it to shop or request a payout to your bank account (for verified sellers)." },
        { q: "How do I withdraw money from KuKu Wallet?", a: "Go to “My Wallet” → “Withdraw Funds.” Enter your bank details. Withdrawals are processed within 7–10 working days once your balance meets the minimum threshold." },
        { q: "What happens if a buyer requests a refund?", a: "Refunds are deducted from your pending payout only if the claim is valid (QC-verified). KuKu ensures fair resolution for both sides." },
        { q: "Does KuKu charge any extra fees?", a: "No hidden fees. Commission and delivery charges are clearly shared." }
      ]
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Rentals",
      color: "text-teal-600",
      qa: [
        { q: "How do rentals work on KuKu?", a: "Renters can browse rentable items, pay a rental fee plus a refundable security deposit. KuKu handles pickup, delivery, and QC both before and after use." },
        { q: "What happens if the rented item is damaged?", a: "The renter&apos;s deposit is used to cover repair or replacement based on KuKu&apos;s damage assessment policy." },
        { q: "Can I list my items for rent?", a: "Yes! You can mark your item as “Available for Rent” while listing. KuKu reviews each rental listing before approval." }
      ]
    },
    {
      icon: <Recycle className="w-6 h-6" />,
      title: "Giveaways & Recycling",
      color: "text-emerald-600",
      qa: [
        { q: "What is the Giveaway Service?", a: "You can donate clean, reusable textiles like clothes, curtains, and bedsheets. KuKu collects, inspects, and sorts them for charity, repurpose, or recycling." },
        { q: "Do I get paid for Giveaway items?", a: "No, giveaways are solely KuKu&apos;s responsibility for repurposing or reselling or donation." },
        { q: "What happens to items that can&apos;t be reused?", a: "They are responsibly recycled or upcycled into new materials through our sustainability partners." }
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Quality Control & Safety",
      color: "text-blue-600",
      qa: [
        { q: "How does KuKu ensure quality?", a: "Every sold or rented item goes through a QC process checking cleanliness, accuracy, and usability. Items failing QC are not approved for sale." },
        { q: "What items are prohibited on KuKu?", a: "Fake items, used undergarments, damaged or unhygienic items, and illegal products are strictly prohibited." },
        { q: "How can I stay safe while using KuKu?", a: "Always communicate and pay through the app, never share OTPs, and avoid external deals. KuKu protects transactions done within the platform." }
      ]
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "Account & Support",
      color: "text-gray-700",
      qa: [
        { q: "How do I verify my account?", a: "You&apos;ll be asked to confirm your email, mobile number, and in some cases, your Emirates ID for seller verification." },
        { q: "I forgot my password — what do I do?", a: "Tap “Forgot Password?” on the login page and follow the email reset instructions." },
        { q: "How can I contact KuKu support?", a: "Through the Help tab in the app or email support@letskuku.com. Our team replies within 24–48 hours." }
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sustainability & Vision",
      color: "text-emerald-700",
      qa: [
        { q: "Why is KuKu focused on re-use and recycling?", a: "KuKu was built to reduce textile waste and make circular fashion mainstream. Every item you sell, rent, or give away extends its life and reduces landfill impact." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu — Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Everything you need to know about buying, selling, renting, and giving away on KuKu.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* FAQ Sections */}
        {faqSections.map((section, index) => (
          <div key={index} className="rounded-lg p-6">
            <div className="flex items-center mb-6">
              <div className={`mr-3 ${section.color}`}>{section.icon}</div>
              <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
            </div>
            <div className="space-y-6">
              {section.qa.map((item, idx) => (
                <div key={idx} className="border-l-4 border-gray-300 pl-6">
                  <p className="font-semibold text-gray-800 mb-1">
                    Q{index * 10 + idx + 1}. {item.q}
                  </p>
                  <p 
                    className="text-gray-700 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-lg mb-4">
            Our support team is here to help you 24/7.
          </p>
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
}
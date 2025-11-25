import React from 'react';
import { User, Camera, Tag, DollarSign, Heart, RefreshCw, Globe } from 'lucide-react';

export const TipsAndTricks = () => {
  const tips = [
    {
      icon: <User className="w-6 h-6" />,
      title: "1. Your Profile = Your Storefront",
      details: [
        "You don't need to be a fashion influencer. Just be you, but a little KuKu.",
        "Upload a profile pic - your face, your fav shoe, your dog- just no grey icons.",
        "Write a quick, fun bio - “Serial declutterer. Occasional impulse shopper. Closet for rent.”",
        "Stay active - more listings = more eyeballs = more love."
      ]
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "2. Photos That Slay",
      details: [
        "Nobody wants to buy a mystery blur. Make your pieces shine!",
        "Natural light is your BFF - it shows true color and fabric.",
        "Show all sides - front, back, close-up of tags, cute details, and even that tiny mark you promised to disclose.",
        "Clean, tidy background - your duvet doesn't need a cameo.",
        "Bonus: A styled flat-lay or hanger shot adds pro-level vibes."
      ]
    },
    {
      icon: <Tag className="w-6 h-6" />,
      title: "3. Let the Listing Do the Talking",
      details: [
        "No DMs? No problem. Your listing is your pitch. Make it work!",
        "Title it right -“Mango Floral Wrap Dress, Size S” is fire",
        "Condition check - Be real about wear, stains, or tags. Honesty = trust = cha-ching.",
        "Add sizing details - actual measurements score major points.",
        "Suggest how to style - “Perfect for coffee dates or last-minute weddings.”"
      ]
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "4. Be a Bargain Boss",
      details: [
        "The Bargain Button is ON – that means buyers can send offers anytime. Your job? Respond quickly!",
        "Fast replies = better chances of sealing the deal.",
        "If someone likes your item, that's your cue to show them some price love.",
        "Counter-offers are cool too -it's a friendly haggle, not a battle.",
        "Bundle up similar items and offer a discount - it's like a thrift-store treasure chest."
      ]
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "5. Use the Social Sauce",
      details: [
        "You're not just a seller- you're part of the KuKu crew. So mingle a bit!",
        "Like other listings - KuKu's algorithm might just return the favor.",
        "Follow sellers you vibe with - builds your own following too.",
        "Regular activity keeps your listings fresh in the feed."
      ]
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Bonus Round: Keep It Moving",
      details: [
        "New listings = new chances to sell. Post often!",
        "Mark sold items quickly – keep your profile sharp.",
        "Update prices if an item's been sitting too long – it might just need a nudge."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <DollarSign className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tips and Tricks
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            How to Sell Like a Total KuKu Star
          </p>
          <p className="text-lg text-blue-100 mt-4 max-w-4xl mx-auto">
            Closet full? Style evolved? Cash flow dreams? Welcome to the big leagues of sustainable style. Here&apos;s how to make your listings pop and your items drop (into someone else&apos;s cart, that is).
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Tips */}
        {tips.map((tip, index) => (
          <div key={index} className="rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 text-gray-700">{tip.icon}</div>
              <h2 className="text-xl font-bold text-gray-800">{tip.title}</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              {tip.details.map((detail, idx) => (
                <li key={idx} className="flex">
                  <span className="mr-2">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Closing */}
        <div className="rounded-lg p-6 text-center bg-green-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Globe className="w-8 h-8 mr-2 text-green-600" />
            One Last Thing... You&apos;re a Planet Hero
          </h2>
          <p className="text-lg text-gray-700">
            Every item you sell gives it a second life and saves it from landfill fate.<br />
            You&apos;re not just decluttering. You&apos;re doing climate good.
          </p>
        </div>

        {/* CTA */}
        {/* <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Heart className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Ready to Become a KuKu Star?</h2>
          <p className="text-lg mb-4">Start listing and watch your closet (and wallet) thank you!</p>
          <a 
            href="/sell" 
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300"
          >
            List Now & Shine
          </a>
        </div> */}
      </div>
    </div>
  );
};
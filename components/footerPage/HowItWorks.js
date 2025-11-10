import React from 'react';
import { Package, Sparkles, Recycle, Camera, DollarSign, Truck, Heart, Users } from 'lucide-react';

export const HowItWorks = () => {
  const options = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Option 1: List & Chill (aka the “I’ll keep it till it’s sold” method)",
      details: [
        "1. List Your Item: Take a cute pic, write a quick description, set your price. Done!",
        "2. Wait for the Ka-Ching: Your item stays with you until someone buys it. No pickup. No pressure. Closet = still full (for now).",
        "3. We Pick It Up: Once it’s sold, we pick it up from you, quality-check it, and deliver it to the buyer.",
        "4. You Get Paid: If it passes the check, your wallet gets a happy little boost. If not, we return it-no hard feelings."
      ]
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Option 2: Ku-Kit (aka “Take all this off my hands now, please”)",
      details: [
        "1. Give Us the Goods: You hand over a bunch of items in one go-we pick them up straight from your doorstep.",
        "2. We Work the Magic: We sort, clean, shoot, and list everything for you. You relax. Maybe have a snack.",
        "3. It Sells, We Ship, You Smile: When something sells, we ship it out fast-and you get paid without lifting a finger."
      ]
    },
    {
      icon: <Recycle className="w-6 h-6" />,
      title: "Option 3: Giveaway Mode (aka “I don’t want to sell this, just take it!”)",
      details: [
        "1. Declutter What You Don’t Want: Clothes, bedsheets, curtains-anything in good condition or even a little worn.",
        "2. We Pick It Up by the Kilo: Schedule a pickup and we’ll collect everything in one go-priced per kg (super affordable).",
        "3. We Find It a New Purpose: We sort and either: Donate to charity Recycle responsibly Repurpose creatively Resell with proceeds supporting circular initiatives",
        "4. Feel-Good Bonus: No effort, no waste, and all the good feels."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Keep Shadow & Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works?
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Three ways to KuKu your clutter! Whether you&apos;re a DIY lister or a &quot;please just handle it&quot; kind of person-we got you. KuKu offers three super easy ways to turn your extra stuff into cash, space, or good vibes.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Policy Sections - No Shadow, Simple Layout */}
        {options.map((option, index) => (
          <div key={index} className="rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 text-gray-700">{option.icon}</div>
              <h2 className="text-xl font-bold text-gray-800">{option.title}</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              {option.details.map((detail, idx) => (
                <li key={idx} className="flex">
                  <span className="mr-2">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Footer Text - Simple */}
        <div className="rounded-lg p-6 text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">
            No sketchy chats. No meetups. Just smooth, smart, circular selling.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Decluttering should feel fun, not like a part-time job.<br />
            With KuKu, you list it-or let us-and we&apos;ll do the heavy lifting. Literally.
          </p>
          <p className="text-3xl font-bold text-purple-600">
            So go ahead:<br />
            List it. Kit it. KuKu it.
          </p>
        </div>

        {/* Contact - Keep Shadow & Gradient */}
        {/* <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Heart className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Ready to KuKu?</h2>
          <p className="text-lg mb-4">Get started today and turn your clutter into something amazing!</p>
          <a 
            href="/signup" 
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300"
          >
            Start Now
          </a>
        </div> */}
      </div>
    </div>
  );
};
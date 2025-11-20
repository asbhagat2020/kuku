import React from 'react';
import { ShoppingBag, Package, Gift, RefreshCw, Users, AlertTriangle, ShieldCheck } from 'lucide-react';

export const OurServicesAndFeatures = () => {
  const services = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Sell Your Stuff",
      details: [
        "Got clothes or home items you no longer use? List them on KuKu, and we’ll pick them up only after they’re sold.",
        "We do a quality check to make sure the buyer gets exactly what they saw-and you get paid stress-free."
      ]
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Ku-Kit",
      details: [
        "Too busy to list? Just send us a bunch of items. We’ll take care of everything-from photography to listings to delivery.",
        "All you have to do is sit back and watch the sales roll in."
      ]
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Giveaway Service",
      details: [
        "Don’t want to sell? Declutter the easy way.",
        "We’ll pick up your old clothes, curtains, or bedsheets by weight, and either:",
        "Donate them",
        "Recycle them",
        "Repily them",
        "Resell for circular good"
      ]
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Renting Service",
      details: [
        "Need something for a short time? KuKu lets you rent items from other users-perfect for one-time events, shoots, or short-term needs.",
        "Coming soon to your app experience!"
      ]
    }
  ];

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Socio-Commerce Vibes",
      details: [
        "KuKu isn’t just a marketplace - it’s a community.",
        "Follow your favorite sellers",
        "Like the items you love",
        "Bargain directly with sellers (yes, it’s built in!)",
        "Stay connected and shop with personality"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Emergency Listings",
      details: [
        "Need something ASAP?",
        "Use the Emergency Section to post urgent needs - whether it’s a costume, or a last-minute dress. Help and offers roll in fast from nearby users."
      ]
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Quality Check Guarantee",
      details: [
        "We personally check every sold item before it reaches the buyer - so what you see is exactly what you get.",
        "No surprises. No catfish clothing."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Keep Shadow & Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services and Features
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Services */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4"> Our Services</h2>
        </div>

        {services.map((service, index) => (
          <div key={index} className="rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 text-gray-700">{service.icon}</div>
              <h2 className="text-xl font-bold text-gray-800">{service.title}</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              {service.details.map((detail, idx) => (
                <li key={idx} className="flex">
                  <span className="mr-2">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Features */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4"> Our Features</h2>
        </div>

        {features.map((feature, index) => (
          <div key={index} className="rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 text-gray-700">{feature.icon}</div>
              <h2 className="text-xl font-bold text-gray-800">{feature.title}</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              {feature.details.map((detail, idx) => (
                <li key={idx} className="flex">
                  <span className="mr-2">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Closing */}
        <div className="rounded-lg p-6 text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">
             Smart. Social. Sustainable.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            KuKu makes it fun to buy less, share more, and keep stuff moving. Whether you’re here to clean out your closet, score great finds, or just support circular living - you’re in the right place.
          </p>
          <p className="text-3xl font-bold text-purple-600">
            Ready to KuKu it?
          </p>
        </div>
      </div>
    </div>
  );
};
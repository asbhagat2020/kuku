import React from 'react';
import { Leaf, AlertCircle, TreePine, Globe, CheckCircle, Mail, Recycle, Heart } from 'lucide-react';

export default function Sustainability() {
  const challenges = [
    "Every year, <strong>92 million tonnes</strong> of textiles end up in landfills — equivalent to a garbage truck of clothes dumped <strong>every second</strong>.",
    "The fashion industry contributes <strong>5–10%</strong> of global greenhouse gas emissions — surpassing shipping and aviation combined.",
    "It consumes roughly <strong>215 trillion liters</strong> of water annually — enough to fill <strong>86 million Olympic-sized swimming pools</strong>.",
    "Generates <strong>20%</strong> of all industrial wastewater.",
    "Less than <strong>1%</strong> of clothing material is recycled into new garments — over <strong>85%</strong> is incinerated or buried."
  ];

  const reuseBenefits = [
    "Reusing just <strong>1 kg</strong> of clothing saves approximately <strong>25 kg of CO₂</strong> compared to new production.",
    "Extending the life of a garment by <strong>nine months</strong> can reduce its carbon, water, and waste footprint by <strong>20–30%</strong>.",
    "The environmental impact of second-hand clothing is estimated to be <strong>70 times lower</strong> than producing new items."
  ];

  const framework = [
    {
      icon: <TreePine className="w-6 h-6" />,
      title: "Extending Garment Lifespan",
      details: [
        "Every item listed, rented, or donated through KuKu reduces pressure on new production — cutting emissions, conserving water, and minimizing chemical waste."
      ]
    },
    {
      icon: <Recycle className="w-6 h-6" />,
      title: "Diverting Textiles from Landfill",
      details: [
        "Our Giveaway Service sorts excess textiles to:",
        "Donate wearable items to communities in need",
        "Recycle textiles into fibers, insulation, or raw materials",
        "Repurpose materials creatively for upcycled products",
        "Resell some items, supporting reuse economies"
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Quality Assurance to Cut Emissions",
      details: [
        "Pre-shipment checks reduce returns and avoid excess transportation emissions, ensuring buyers receive precisely what was listed."
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Transparency & Accountability",
      details: [
        "We track key metrics like tonnes of textiles saved, CO₂ emissions avoided, and donations distributed — partnering only with certified recyclers and charities."
      ]
    }
  ];

  const commitment = [
    "We will publish an <strong>annual impact report</strong>, showcasing textile volumes diverted, CO₂ savings, and reuse outcomes.",
    "Our network includes <strong>certified partners</strong> to guarantee responsible end-of-life material handling.",
    "We are committed to <strong>continuous process improvements</strong> — optimizing pickup, quality control, logistics, and partnerships for maximum environmental benefit."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Leaf className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Sustainability Commitment
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            At KuKu, sustainability is foundational — woven into every sale, rental, and donation. We&apos;re focused on reducing textile waste, lowering carbon emissions, and promoting a circular economy built on durability and impact.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">

        {/* The Challenge */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 mr-3 text-amber-600" />
            <h2 className="text-xl font-bold text-gray-800">The Challenge: Textile Waste and Environmental Cost</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            {challenges.map((item, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2">•</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Power of Reuse */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <TreePine className="w-6 h-6 mr-3 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-800">The Power of Reuse and Resale</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            {reuseBenefits.map((item, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2">•</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Sustainability Framework */}
        {framework.map((section, index) => (
          <div key={index} className="rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 text-gray-700">{section.icon}</div>
              <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              {section.details.map((detail, idx) => (
                <li key={idx} className="flex">
                  <span className="mr-2">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Why It Matters */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Why It Matters</h2>
          <p className="text-gray-700 mb-3">
            Every action — selling, renting, donating — adds up:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Space saved</strong> in homes</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Pollution reduced</strong> from avoided manufacturing</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Water conserved</strong> by reusing over producing</span>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <span><strong>Communities supported</strong> through donations</span>
            </li>
          </ul>
          <p className="text-gray-700 mt-4">
            Our collective impacts deepen as our community grows.
          </p>
        </div>

        {/* Ongoing Commitment */}
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Our Ongoing Commitment</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            {commitment.map((item, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2">•</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Final Message */}
        <div className="rounded-lg p-8 bg-gradient-to-r from-emerald-700 to-teal-800 text-white text-center">
          <TreePine className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            KuKu isn&apos;t just cleaning closets — it&apos;s building a sustainable future.
          </h2>
          <p className="text-xl">
            Every garment kept in circulation is a step toward <strong>environmental resilience</strong>.
          </p>
        </div>

        {/* Contact */}
        {/* <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Join the Movement</h2>
          <p className="text-lg mb-4">
            Have questions about our sustainability efforts? Reach out:
          </p>
          <a 
            href="mailto:support@letskuku.com" 
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300"
          >
            support@letskuku.com
          </a>
        </div> */}

      </div>
    </div>
  );
}
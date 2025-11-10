import React from 'react';
import { Leaf, Calculator, Globe, CheckCircle } from 'lucide-react';

export const HowWeCalculateOurFarbonFootprint = () => {
  const methodologySteps = [
    {
      title: "Step 1: Assign Emission Factors (kg CO₂e per Item)",
      details: [
        "We use global averages based on lifecycle studies (sourced from WRAP, Ellen MacArthur Foundation, and EPA) to estimate the carbon footprint of clothing items. These values reflect the CO₂ equivalent emitted during:",
        "· Raw material production",
        "· Manufacturing",
        "· Packaging & transport",
        "· First-use lifecycle"
      ]
    },
    {
      title: "Step 2: Map Items to Emission Categories",
      details: [
        "Each item listed or donated on KuKu is automatically matched to one of the above categories.",
        "Example:",
        "· A Men’s Jacket is mapped to Outerwear → 32.0 kg CO₂e",
        "· A Denim Jacket is mapped to Denim → 20.0 kg CO₂e"
      ]
    },
    {
      title: "Step 3: Apply the Reuse Factor (82% Savings)",
      details: [
        "Studies show that buying secondhand avoids 82% of original emissions, excluding minimal impact from shipping or cleaning.",
        "We apply this factor:",
        "Carbon Savings = Emission Factor × 0.82",
        "So if you resell a pair of jeans:",
        "20.0 kg × 0.82 = 16.4 kg CO₂e saved"
      ]
    },
    {
      title: "Step 4: Show the Impact to Users",
      details: [
        "We convert this into meaningful equivalents to help you visualize your contribution.",
        "Example:",
        "👖 “You saved 16.4 kg of CO₂ by selling your jeans on KuKu. That’s like avoiding 40 km of car travel!”"
      ]
    }
  ];

  const emissionTable = [
    { type: "T-shirts / Tops / Tanks", value: "6.5 kg" },
    { type: "Shirts / Blouses", value: "7.0 kg" },
    { type: "Pants / Trousers / Leggings", value: "11.5 kg" },
    { type: "Shorts / Skirts", value: "6.0 kg" },
    { type: "Jeans / Denim", value: "20.0 kg" },
    { type: "Jackets / Coats / Outerwear", value: "32.0 kg" },
    { type: "Sweaters / Cardigans", value: "17.0 kg" },
    { type: "Suits / Blazers / Tuxedos", value: "25.0 kg" },
    { type: "Dresses (Casual/Party)", value: "15.0 – 25.0 kg" },
    { type: "Sleepwear / Loungewear", value: "8.0 kg" },
    { type: "Swimwear / Beachwear", value: "5.0 kg" },
    { type: "Maternity Wear", value: "10.0 kg" },
    { type: "Activewear / Co-ords", value: "9.0 kg" },
    { type: "Jumpsuits / Bodysuits", value: "13.0 kg" },
    { type: "Wedding Dress", value: "40.0 – 60.0 kg" }
  ];

  const sources = [
    "WRAP (Waste & Resources Action Program)",
    "Ellen MacArthur Foundation – Circular Fashion Reports",
    "U.S. Environmental Protection Agency (EPA)",
    "Green Story Inc. and academic LCA studies"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Same Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Leaf className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ♻️ How KuKu Calculates Carbon Savings
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            At KuKu, we believe in making sustainability measurable. Every time you resell, give away, or rent an item through our platform, you’re reducing the demand for new production - and that saves carbon.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Intro */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            Step-by-Step: Our Carbon Savings Methodology
          </h2>
        </div>

        {/* Methodology Steps */}
        {methodologySteps.map((step, index) => (
          <div key={index} className="rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 text-gray-700">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{step.title}</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              {step.details.map((detail, idx) => (
                <li key={idx} className="flex">
                  <span className="mr-2">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Emission Table */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Clothing Type → Avg CO₂e per Item
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-gray-800 font-semibold">Clothing Type</th>
                  <th className="py-3 px-4 text-gray-800 font-semibold">Avg CO₂e per Item</th>
                </tr>
              </thead>
              <tbody>
                {emissionTable.map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{row.type}</td>
                    <td className="py-3 px-4 text-gray-700 font-medium">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sources */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Globe className="w-6 h-6 mr-2 text-teal-500" />
            📚 Sources:
          </h2>
          <ul className="space-y-2 text-gray-700">
            {sources.map((source, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2">•</span>
                <span>{source}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing */}
        <div className="rounded-lg p-6 text-center bg-green-50">
          <p className="text-2xl font-bold text-gray-800 mb-4">
            Your impact is real. Every item resold or reused avoids waste, saves emissions, and helps create a circular fashion economy. 💚
          </p>
        </div>

        {/* CTA */}
        {/* <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Leaf className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Start Saving Carbon Today</h2>
          <p className="text-lg mb-4">List, Kit, or Giveaway — every action counts!</p>
          <a 
            href="/list-item" 
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300"
          >
            Make an Impact Now
          </a>
        </div> */}
      </div>
    </div>
  );
};
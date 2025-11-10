import React from 'react';
import { Package, Camera, CheckCircle, Truck, AlertTriangle, Star, Mail, Phone } from 'lucide-react';

export const SellerEducationGuidelines = () => {
  const sections = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "1. Preparing Your Products for Listing",
      subsections: [
        {
          subtitle: "1.1 Accurate Descriptions",
          details: [
            "Be Specific: Clearly describe the product’s material, size, color, and any unique features.",
            "Condition: Specify if the item is use, rarely used, well used etc.",
            "Damages: Mention any visible defects or signs of wear.",
            "Keywords: Use relevant and searchable terms in your product title and description."
          ]
        },
        {
          subtitle: "1.2 High-Quality Images",
          details: [
            "Lighting: Use natural or bright light for clear images.",
            "Background: Ensure a clean, clutter-free background (preferably white).",
            "Angles: Include photos from multiple angles, highlighting details and imperfections (if any).",
            "No Stock Images: Upload actual photos of the product."
          ]
        }
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "2. Quality Standards for Products",
      subsections: [
        {
          subtitle: "2.1 General Standards",
          details: [
            "Products must match the description and images provided.",
            "Items must be clean, undamaged, and free from odors or stains."
          ]
        }
      ]
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "3. Packaging Guidelines",
      subsections: [
        {
          subtitle: "3.1 Before Packing",
          details: [
            "Ensure the item is in its best possible condition.",
            "Double-check that all parts are included."
          ]
        }
      ]
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "4. After the Sale: Pickup and Delivery",
      subsections: [
        {
          subtitle: "4.1 For Sellers Listing Items on the App",
          details: [
            "Ensure the item is ready for pickup within the specified time frame as decided.",
            "Respond promptly to any pickup or delivery queries from the KuKu team."
          ]
        },
        {
          subtitle: "4.2 For Ku-Kit Sellers",
          details: [
            "Items must be sorted, labeled, and ready for bulk pickup.",
            "Include a list of items in the batch for easier processing at KuKu centers."
          ]
        }
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "5. Avoiding Quality Check Failures",
      subsections: [
        {
          subtitle: "5.1 Common Reasons for Rejection",
          details: [
            "Product does not match description or photos.",
            "Item has damage, stains, or missing parts not disclosed during listing."
          ]
        },
        {
          subtitle: "5.2 Best Practices",
          details: [
            "Be honest and transparent in your listings.",
            "Check the product carefully before it’s listed and before pickup.",
            "Follow all packaging and shipping guidelines."
          ]
        }
      ]
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "6. Seller Score and Benefits",
      subsections: [
        {
          subtitle: "6.1 Seller Score",
          details: [
            "KuKu tracks seller performance through a scorecard based on:",
            "Quality check success rate.",
            "On-time availability for pickups.",
            "Buyer satisfaction and feedback.",
            "Buyer Reviews"
          ]
        },
        {
          subtitle: "6.2 Benefits of a High Score",
          details: [
            "Higher visibility for your listings.",
            "Access to promotional features (e.g., featured listings).",
            "Eligibility for exclusive seller rewards and discounts on fees."
          ]
        }
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "7. What Happens If You Fail a Quality Check?",
      details: [
        "First, Second and Third Failure: Receive detailed feedback to help you improve.",
        "Fourth and Fifth Failure: A penalty fee may be applied.",
        "Over Five Failure: Your account may be temporarily restricted.",
        "Over Eight Failure: Repeated failures may lead to permanent removal from the platform."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Star className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KuKu Seller Educational Guidelines
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Welcome to KuKu!<br />
            Thank you for partnering with us. To ensure a seamless experience for buyers and sellers, we’ve created this guideline to help you meet KuKu’s quality and operational standards.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Sections */}
        {sections.map((section, index) => (
          <div key={index} className="rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 text-gray-700">{section.icon}</div>
              <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
            </div>
            {section.subsections ? (
              section.subsections.map((sub, subIdx) => (
                <div key={subIdx} className="ml-8 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">{sub.subtitle}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {sub.details.map((detail, idx) => (
                      <li key={idx} className="flex">
                        <span className="mr-2">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <ul className="space-y-2 text-gray-700">
                {section.details.map((detail, idx) => (
                  <li key={idx} className="flex">
                    <span className="mr-2">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Contact */}
        <div className="rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Mail className="w-6 h-6 mr-2 text-indigo-500" />
            8. Contact KuKu Support
          </h2>
          <p className="text-gray-700 mb-3">If you have questions or need assistance, reach out to us anytime:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>Email: </span>
              <a href="mailto:support@letskuku.com" className="ml-2 text-indigo-600 underline">support@letskuku.com</a>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>Phone: +971 543781819</span>
            </li>
          </ul>
        </div>

        {/* Closing */}
        <div className="rounded-lg p-6 text-center bg-gradient-to-r from-blue-50 to-purple-50">
          <p className="text-xl font-bold text-gray-800">
            By following these guidelines, you help KuKu maintain high-quality standards and build trust with buyers. Together, we can create a thriving, sustainable e-commerce community.
          </p>
        </div>

        {/* CTA */}
        {/* <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Star className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Start Selling on KuKu Today!</h2>
          <a 
            href="/sell" 
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300"
          >
            List Your First Item
          </a>
        </div> */}
      </div>
    </div>
  );
};
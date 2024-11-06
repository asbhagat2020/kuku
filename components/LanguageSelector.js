import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  const countries = [
    { code: "sa", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "ae", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "kw", name: "Kuwait", flag: "🇰🇼" },
    { code: "qa", name: "Qatar", flag: "🇶🇦" },
    { code: "bh", name: "Bahrain", flag: "🇧🇭" },
    { code: "om", name: "Oman", flag: "🇴🇲" },
    { code: "iq", name: "Iraq", flag: "🇮🇶" },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".language-selector")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Toggle body scroll when dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const switchLanguage = (lang) => {
    setCurrentLang(lang);
    setIsOpen(false);
  };

  return (
    <>
      {/* Blue overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-blue-500/20 backdrop-blur-sm z-40" />
      )}

      <div
        className="relative language-selector bg-[#0D0D0D]"
        dir={currentLang === "ar" ? "rtl" : "ltr"}
      >
        {/* Language Toggle Button */}
        <button
          onClick={toggleDropdown}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md bg-transparent transition-colors duration-200 ${
            isOpen ? "text-blue-600" : "text-gray-800 hover:text-gray-600"
          }`}
        >
          <span
            className={`flex items-center ${
              currentLang === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <span className="mx-2 text-white">
              {currentLang === "en" ? "English" : "العربية"}
            </span>
            <ChevronDown
              className={`h-4 w-4 color-white transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-1 right-0 w-64 bg-white rounded-lg shadow-xl z-50 border border-blue-100">
            <div className="py-1">
              {/* Language Options */}
              <button
                onClick={() => switchLanguage("en")}
                className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center justify-between"
              >
                <span>English</span>
                {currentLang === "en" && (
                  <span className="text-blue-500">✓</span>
                )}
              </button>
              <button
                onClick={() => switchLanguage("ar")}
                className="w-full px-4 py-2 text-right hover:bg-blue-50 flex items-center justify-between"
              >
                <span>العربية</span>
                {currentLang === "ar" && (
                  <span className="text-blue-500">✓</span>
                )}
              </button>

              {/* Divider */}
              <hr className="my-2 border-blue-100" />

              {/* Country List */}
              <div className="max-h-48 overflow-y-auto">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    className="px-4 py-2 hover:bg-blue-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>{country.name}</span>
                    <span className="text-xl">{country.flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageSelector;

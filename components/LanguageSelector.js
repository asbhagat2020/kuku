import React, { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");

  const languages = [
    { code: "en", name: "EN", dir: "ltr" },
    { code: "ar", name: "العربية", dir: "rtl" },
  ];

  const handleLanguageChange = (language) => {
    setSelectedLang(language.name);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-0 py-0 text-xl rounded-lg  border-gray-200 hover:bg-gray-50 transition-colors min-w-auto"
      >
        <Globe className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        <span className="text-xs sm:text-sm">{selectedLang}</span>
        <ChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg z-50">
          <ul className="py-2">
            {languages.map((language) => (
              <li key={language.code}>
                <button
                  onClick={() => handleLanguageChange(language)}
                  className="w-full px-6 py-3 text-[16px] text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <span
                    className={`${
                      selectedLang === language.name ? "font-medium" : ""
                    }`}
                  >
                    {language.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

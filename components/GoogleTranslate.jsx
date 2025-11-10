// components/GoogleTranslate.jsx
"use client";
import { useState } from "react";
import { Globe, ChevronDown, RefreshCw } from "lucide-react";
import { useTranslation } from "../lib/TranslationContext";

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLang, languages, changeLanguage, isTranslating, forceTranslate } = useTranslation();

  const getCurrentLanguage = () => {
    const lang = languages.find((l) => l.googleCode === currentLang);
    return lang ? lang.code : "EN";
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95 notranslate"
          disabled={isTranslating}
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">{getCurrentLanguage()}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Force Retranslate Button */}
        {currentLang !== "en" && (
          <button
            onClick={() => forceTranslate()}
            disabled={isTranslating}
            className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95 notranslate disabled:opacity-50 disabled:cursor-not-allowed"
            title="Retranslate Page"
          >
            <RefreshCw className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>

      <div
        className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 transition-all duration-300 notranslate ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-800 notranslate">Select Language</span>
          </div>
          {isTranslating && (
            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Translating...
            </p>
          )}
        </div>

        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500 mb-3 font-medium notranslate">SELECT LANGUAGE</p>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all duration-150 notranslate ${
                  currentLang === lang.googleCode
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => {
                  changeLanguage(lang.code, lang.googleCode);
                  setIsOpen(false);
                }}
                disabled={isTranslating}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-xs bg-gray-100 px-2 py-1 rounded notranslate">
                    {lang.code}
                  </span>
                  <span className="notranslate">{lang.name}</span>
                </div>
                {currentLang === lang.googleCode && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
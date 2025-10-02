// "use client";
// import { useEffect, useState } from "react";
// import { Globe, ChevronDown } from "lucide-react";

// export default function GoogleTranslate() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentLang, setCurrentLang] = useState("EN");

//   // Language mappings for Google Translate
//   const languages = [
//     { code: 'EN', name: 'English', googleCode: 'en' },
//     { code: 'AR', name: 'Arabic', googleCode: 'ar' },
//     { code: 'ES', name: 'Español', googleCode: 'es' },
//     { code: 'FR', name: 'Français', googleCode: 'fr' },
//     { code: 'DE', name: 'Deutsch', googleCode: 'de' },
//     { code: 'JA', name: '日本語', googleCode: 'ja' },
//     { code: 'KO', name: '한국어', googleCode: 'ko' },
//     { code: 'ZH', name: '中文', googleCode: 'zh' },
   

//   ];

//   // Get current language display name
//   const getCurrentLanguage = () => {
//     const lang = languages.find(l => l.code === currentLang);
//     return lang ? lang.code : 'EN';
//   };

//   const handleLanguageChange = (langCode, googleCode) => {
//     console.log(`Changing language to: ${langCode} (${googleCode})`);
    
//     // Update UI immediately
//     setCurrentLang(langCode);
//     setIsOpen(false);

//     // Handle translation
//     setTimeout(() => {
//       if (googleCode === 'en') {
//         // Reset to original English - FORCE RELOAD METHOD
//         console.log('Resetting to English - Force reload');
        
//         // Clear any Google Translate artifacts
//         window.location.hash = '';
        
//         // Remove any Google Translate cookies
//         document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//         document.cookie = 'googtrans=/auto/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
//         // Clear localStorage if it exists
//         try {
//           localStorage.removeItem('googtrans');
//           sessionStorage.removeItem('googtrans');
//         } catch (e) {
//           console.log('Storage not available');
//         }
        
//         // Force immediate reload - this is the most reliable way
//         window.location.reload(true);
        
//       } else {
//         // Trigger Google Translate for other languages
//         console.log(`Translating to: ${googleCode}`);
        
//         // Method 1: Try using Google Translate select element
//         const selectElement = document.querySelector('.goog-te-combo');
        
//         if (selectElement) {
//           console.log('Using Google Translate select element');
          
//           // Set the value and trigger events
//           selectElement.value = googleCode;
          
//           // Create and dispatch change event
//           const changeEvent = new Event('change', { bubbles: true });
//           selectElement.dispatchEvent(changeEvent);
          
//           // Additional trigger methods
//           setTimeout(() => {
//             selectElement.value = googleCode;
//             const event = document.createEvent('HTMLEvents');
//             event.initEvent('change', true, true);
//             selectElement.dispatchEvent(event);
//           }, 100);
          
//         } else {
//           console.log('Google Translate select not found, using hash method');
//           // Method 2: Use hash and reload method
//           window.location.hash = `#googtrans(en|${googleCode})`;
//           setTimeout(() => {
//             window.location.reload();
//           }, 300);
//         }
//       }
//     }, 100);
//   };

//   useEffect(() => {
//     // Check if page is already translated on load
//     const checkCurrentLanguage = () => {
//       // Method 1: Check URL hash
//       const hash = window.location.hash;
//       if (hash.includes('googtrans')) {
//         const match = hash.match(/googtrans\(en\|(\w+)\)/);
//         if (match) {
//           const googleCode = match[1];
//           const lang = languages.find(l => l.googleCode === googleCode);
//           if (lang) {
//             console.log(`Detected current language from hash: ${lang.code}`);
//             setCurrentLang(lang.code);
//             return;
//           }
//         }
//       }
      
//       // Method 2: Check cookies for Google Translate state
//       const cookies = document.cookie.split(';');
//       for (let cookie of cookies) {
//         const [name, value] = cookie.trim().split('=');
//         if (name === 'googtrans') {
//           const match = value.match(/\/auto\/(\w+)/);
//           if (match && match[1] !== 'en') {
//             const googleCode = match[1];
//             const lang = languages.find(l => l.googleCode === googleCode);
//             if (lang) {
//               console.log(`Detected current language from cookie: ${lang.code}`);
//               setCurrentLang(lang.code);
//               return;
//             }
//           }
//         }
//       }
      
//       // Method 3: Check Google Translate select element
//       setTimeout(() => {
//         const selectElement = document.querySelector('.goog-te-combo');
//         if (selectElement && selectElement.value && selectElement.value !== 'en') {
//           const googleCode = selectElement.value;
//           const lang = languages.find(l => l.googleCode === googleCode);
//           if (lang) {
//             console.log(`Detected current language from select: ${lang.code}`);
//             setCurrentLang(lang.code);
//           }
//         } else if (!hash.includes('googtrans') && !cookies.some(c => c.includes('googtrans'))) {
//           // If no translation detected, make sure we're in English
//           console.log('No translation detected, setting to English');
//           setCurrentLang('EN');
//         }
//       }, 1500);
//     };

//     // Load Google Translate widget
//     const addGoogleTranslateScript = () => {
//       if (window.google?.translate) {
//         console.log('Google Translate already loaded');
//         return;
//       }

//       console.log('Loading Google Translate script');
//       const script = document.createElement("script");
//       script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       script.onerror = () => console.error('Failed to load Google Translate script');
//       document.body.appendChild(script);

//       window.googleTranslateElementInit = () => {
//         console.log('Initializing Google Translate');
//         try {
//           new window.google.translate.TranslateElement(
//             {
//               pageLanguage: "en",
//               includedLanguages: "en,es,fr,de,ja,ko,zh,ar",
//               layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//               autoDisplay: false,
//             },
//             "google_translate_element"
//           );
//           console.log('Google Translate initialized successfully');
//         } catch (error) {
//           console.error('Error initializing Google Translate:', error);
//         }
//       };
//     };

//     // Inject CSS to hide Google controls but keep them functional
//     const injectCSS = () => {
//       const style = document.createElement("style");
//       style.innerHTML = `
//         /* Hide Google Translate banner but keep elements functional */
//         iframe.goog-te-banner-frame { 
//           display: none !important; 
//           visibility: hidden !important;
//           position: absolute !important;
//           top: -9999px !important;
//         }
//         .goog-te-banner-frame.skiptranslate { 
//           display: none !important; 
//           visibility: hidden !important;
//         }
//         body { top: 0px !important; }
//         .goog-logo-link { display: none !important; }
//         .goog-te-banner { display: none !important; }
//         .goog-te-menu-value { display: none !important; }
//         .skiptranslate { 
//           visibility: hidden !important;
//           position: absolute !important;
//           top: -9999px !important;
//         }
        
//         /* Hide the Google Translate widget visually but keep it functional */
//         #google_translate_element { 
//           visibility: hidden !important;
//           position: absolute !important;
//           top: -9999px !important;
//           height: 1px !important;
//           width: 1px !important;
//           opacity: 0 !important;
//         }
        
//         /* Hide dropdown menu when it appears */
//         .goog-te-menu-frame { 
//           display: none !important;
//           visibility: hidden !important;
//         }
        
//         /* Keep combo box hidden but functional */
//         .goog-te-combo { 
//           visibility: hidden !important;
//           position: absolute !important;
//           top: -9999px !important;
//         }
        
//         /* Hide Google branding */
//         .goog-te-spinner-pos { display: none !important; }
//         .goog-te-ftab { display: none !important; }
//         .goog-te-gadget { 
//           visibility: hidden !important;
//           position: absolute !important;
//           top: -9999px !important;
//         }

//         /* Prevent translation of language selector */
//         .notranslate {
//           -webkit-transform: none !important;
//           -moz-transform: none !important;
//           -ms-transform: none !important;
//           -o-transform: none !important;
//           transform: none !important;
//         }
        
//         /* Additional hiding for persistent elements */
//         .goog-te-ftab-float { display: none !important; }
//         .goog-te-menu2 { display: none !important; }
//         .goog-te-balloon-frame { display: none !important; }
//       `;
//       document.head.appendChild(style);
//     };

//     checkCurrentLanguage();
//     addGoogleTranslateScript();
//     injectCSS();

//     // Monitor for Google Translate initialization with better detection
//     const checkForTranslateReady = () => {
//       let attempts = 0;
//       const maxAttempts = 20;
      
//       const interval = setInterval(() => {
//         attempts++;
//         const selectElement = document.querySelector('.goog-te-combo');
        
//         if (selectElement) {
//           console.log('Google Translate is ready');
//           clearInterval(interval);
          
//           // Check current language state after Google Translate loads
//           setTimeout(() => {
//             checkCurrentLanguage();
//           }, 1500);
          
//           // Hide any visible Google elements after initialization
//           setTimeout(() => {
//             const elementsToHide = [
//               '.goog-te-banner-frame',
//               '.skiptranslate',
//               '.goog-te-ftab',
//               '.goog-te-menu-frame',
//               '.goog-te-spinner-pos',
//               '.goog-te-ftab-float',
//               '.goog-te-menu2',
//               '.goog-te-balloon-frame'
//             ];
            
//             elementsToHide.forEach(selector => {
//               const elements = document.querySelectorAll(selector);
//               elements.forEach(el => {
//                 el.style.visibility = 'hidden';
//                 el.style.position = 'absolute';
//                 el.style.top = '-9999px';
//                 el.style.display = 'none';
//               });
//             });
//           }, 200);
//         } else if (attempts >= maxAttempts) {
//           console.log('Google Translate failed to initialize after maximum attempts');
//           clearInterval(interval);
//         }
//       }, 500);
//     };

//     checkForTranslateReady();

//     // Additional cleanup on page visibility change
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'visible') {
//         setTimeout(() => {
//           checkCurrentLanguage();
//         }, 500);
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     // Cleanup
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, []);

//   // Monitor for changes in the Google Translate select element
//   useEffect(() => {
//     const monitorGoogleTranslate = () => {
//       const selectElement = document.querySelector('.goog-te-combo');
//       if (selectElement) {
//         const observer = new MutationObserver(() => {
//           const currentValue = selectElement.value;
//           if (currentValue) {
//             const lang = languages.find(l => l.googleCode === currentValue);
//             if (lang && lang.code !== currentLang) {
//               console.log(`Language changed externally to: ${lang.code}`);
//               setCurrentLang(lang.code);
//             }
//           }
//         });

//         observer.observe(selectElement, {
//           attributes: true,
//           attributeFilter: ['value']
//         });

//         return () => observer.disconnect();
//       }
//     };

//     const timeoutId = setTimeout(monitorGoogleTranslate, 2000);
//     return () => clearTimeout(timeoutId);
//   }, [currentLang]);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95 notranslate"
//       >
//         <Globe className="w-4 h-4" />
//         <span className="text-sm">{getCurrentLanguage()}</span>
//         <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {/* Dropdown - Protected from translation */}
//       <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 transition-all duration-300 notranslate ${
//         isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
//       }`}>
        
//         {/* Header */}
//         <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
//           <div className="flex items-center gap-2">
//             <Globe className="w-5 h-5 text-blue-600" />
//             <span className="font-semibold text-gray-800 notranslate">Select Language</span>
//           </div>
//         </div>

//         {/* Google Translate Widget (Hidden but functional) */}
//         <div style={{ visibility: 'hidden', position: 'absolute', top: '-9999px', height: '1px', width: '1px' }}>
//           <div id="google_translate_element" />
//         </div>

//         {/* Language List */}
//         <div className="px-4 pb-4">
//           <p className="text-xs text-gray-500 mb-3 font-medium notranslate">SELECT LANGUAGE</p>
//           <div className="space-y-1 max-h-64 overflow-y-auto">
//             {languages.map((lang) => (
//               <button
//                 key={lang.code}
//                 className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all duration-150 notranslate ${
//                   currentLang === lang.code 
//                     ? 'bg-blue-50 text-blue-700 border border-blue-200' 
//                     : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//                 onClick={() => handleLanguageChange(lang.code, lang.googleCode)}
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="font-medium text-xs bg-gray-100 px-2 py-1 rounded notranslate">
//                     {lang.code}
//                   </span>
//                   <span className="notranslate">{lang.name}</span>
//                 </div>
//                 {currentLang === lang.code && (
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Backdrop */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </div>
//   );
// }











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
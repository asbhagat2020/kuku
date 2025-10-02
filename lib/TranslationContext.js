// // lib/TranslationContext.js
// "use client";
// import { createContext, useContext, useState, useEffect } from "react";

// const TranslationContext = createContext();

// export const TranslationProvider = ({ children }) => {
//   const [currentLang, setCurrentLang] = useState("en");
//   const [isTranslating, setIsTranslating] = useState(false);
  
//   const languages = [
//     { code: "EN", name: "English", googleCode: "en" },
//     { code: "AR", name: "Arabic", googleCode: "ar" },
//     { code: "ES", name: "Español", googleCode: "es" },
//     { code: "FR", name: "Français", googleCode: "fr" },
//     { code: "DE", name: "Deutsch", googleCode: "de" },
//     { code: "JA", name: "日本語", googleCode: "ja" },
//     { code: "KO", name: "한국어", googleCode: "ko" },
//     { code: "ZH", name: "中文", googleCode: "zh-CN" },
//   ];

//   // Batch translation - sabhi text ek saath bhejenge
//   const translateTextBatch = async (texts, targetLang) => {
//     if (!texts || texts.length === 0 || targetLang === "en") return texts;
    
//     console.log(`🔄 Batch translating ${texts.length} texts to ${targetLang}`);
    
//     try {
//       const response = await fetch("/api/translate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           texts: texts,
//           targetLang 
//         }),
//       });
      
//       if (response.ok) {
//         const translations = await response.json();
//         console.log("✅ Batch translation successful!");
//         return translations;
//       }
      
//       console.log("⚠️ Batch translation failed, using original texts");
//       return texts;
//     } catch (error) {
//       console.error("❌ Batch translation error:", error);
//       return texts;
//     }
//   };

//   const translatePage = async (targetLang, forceRetranslate = false) => {
//     if (isTranslating && !forceRetranslate) {
//       console.log("⏳ Translation already in progress...");
//       return;
//     }
    
//     console.log("🌍 Starting page translation to:", targetLang);
//     setIsTranslating(true);
    
//     try {
//       // Wait for DOM to be fully ready
//       await new Promise(resolve => setTimeout(resolve, 200));
      
//       const walker = document.createTreeWalker(
//         document.body,
//         NodeFilter.SHOW_TEXT,
//         {
//           acceptNode: (node) => {
//             if (!node.nodeValue) {
//               return NodeFilter.FILTER_REJECT;
//             }
            
//             // Check parent element
//             const parent = node.parentElement;
//             if (!parent) {
//               return NodeFilter.FILTER_REJECT;
//             }
            
//             // Skip notranslate elements
//             if (parent.classList.contains("notranslate")) {
//               return NodeFilter.FILTER_REJECT;
//             }
            
//             // Skip script and style tags
//             const tagName = parent.tagName?.toLowerCase();
//             if (tagName === 'script' || tagName === 'style' || tagName === 'noscript') {
//               return NodeFilter.FILTER_REJECT;
//             }
            
//             // Skip if already translated (unless force retranslate)
//             if (!forceRetranslate && parent.dataset.translated === "true") {
//               return NodeFilter.FILTER_REJECT;
//             }
            
//             const trimmedValue = node.nodeValue.trim();
//             if (!trimmedValue) {
//               return NodeFilter.FILTER_REJECT;
//             }
            
//             return NodeFilter.FILTER_ACCEPT;
//           },
//         }
//       );

//       const nodes = [];
//       let node;
      
//       while ((node = walker.nextNode())) {
//         nodes.push(node);
//       }
      
//       console.log(`📝 Found ${nodes.length} text nodes to translate`);

//       // Sabhi texts ek array mein collect karo
//       // Filter out very short texts (like single chars) and duplicates
//       const textMap = new Map();
//       nodes.forEach((node, index) => {
//         const text = node.nodeValue?.trim();
//         if (text && text.length > 1) {  // Skip single characters
//           if (!textMap.has(text)) {
//             textMap.set(text, []);
//           }
//           textMap.get(text).push(index);
//         }
//       });
      
//       const uniqueTexts = Array.from(textMap.keys());
      
//       if (uniqueTexts.length === 0) {
//         console.log("⚠️ No texts to translate");
//         setIsTranslating(false);
//         return;
//       }
      
//       console.log(`📝 Unique texts to translate: ${uniqueTexts.length} (from ${nodes.length} nodes)`);
      
//       const texts = uniqueTexts;

//       // Ek hi API call mein sabhi translate karo (FAST!)
//       const translations = await translateTextBatch(texts, targetLang);
      
//       console.log("✅ All translations received");

//       // Create translation map
//       const translationMap = new Map();
//       texts.forEach((text, index) => {
//         translationMap.set(text, translations[index]);
//       });

//       // Ab replace karo using the map
//       nodes.forEach((node) => {
//         const originalText = node.nodeValue?.trim();
//         if (originalText && translationMap.has(originalText)) {
//           node.nodeValue = translationMap.get(originalText);
          
//           // Mark parent as translated
//           if (node.parentElement) {
//             node.parentElement.dataset.translated = "true";
            
//             // Original text save karo
//             if (!node.parentElement.dataset.originalText) {
//               node.parentElement.dataset.originalText = originalText;
//             }
//           }
//         }
//       });
      
//       console.log("🎉 Page translation complete!");
//     } catch (error) {
//       console.error("❌ Translation error:", error);
//     } finally {
//       setIsTranslating(false);
//     }
//   };

//   const resetToEnglish = () => {
//     console.log("🔙 Resetting to English");
    
//     document.querySelectorAll("[data-original-text]").forEach((el) => {
//       const originalText = el.dataset.originalText;
//       el.textContent = originalText;
//       delete el.dataset.translated;
//     });
    
//     console.log("✅ Reset complete!");
//   };

//   const changeLanguage = async (langCode, googleCode) => {
//     console.log(`🌐 Changing language to: ${langCode} (${googleCode})`);
    
//     setCurrentLang(googleCode);
    
//     if (googleCode === "en") {
//       resetToEnglish();
//     } else {
//       await translatePage(googleCode, true);
//     }
//   };

//   const forceTranslate = async () => {
//     if (currentLang !== "en") {
//       console.log("🔄 Force retranslating page...");
//       // Clear all translated markers first
//       document.querySelectorAll("[data-translated]").forEach((el) => {
//         delete el.dataset.translated;
//       });
//       await translatePage(currentLang, true);
//     }
//   };

//   // Jab bhi component mount ho ya page change ho, translate karo
//   useEffect(() => {
//     const savedLang = localStorage.getItem("language");
//     console.log("💾 Saved language from localStorage:", savedLang);
    
//     if (savedLang && savedLang !== "en") {
//       setCurrentLang(savedLang);
//       // Wait for Next.js hydration to complete
//       const timer = setTimeout(() => {
//         translatePage(savedLang, true);
//       }, 500);
      
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   // Jab language change ho, save karo
//   useEffect(() => {
//     console.log("💾 Saving language to localStorage:", currentLang);
//     localStorage.setItem("language", currentLang);
//   }, [currentLang]);

//   // Route change aur dynamic content ke liye
//   useEffect(() => {
//     if (typeof window === 'undefined') return;
    
//     if (currentLang !== "en") {
//       let timeoutId = null;
      
//       const observer = new MutationObserver((mutations) => {
//         // Clear previous timeout
//         if (timeoutId) {
//           clearTimeout(timeoutId);
//         }
        
//         // Check if there are significant changes
//         const hasNewContent = mutations.some(mutation => {
//           return Array.from(mutation.addedNodes).some(node => {
//             // Check if it's an element with text content
//             if (node.nodeType === Node.ELEMENT_NODE) {
//               const element = node;
//               return element.textContent && element.textContent.trim().length > 0;
//             }
//             return false;
//           });
//         });
        
//         if (hasNewContent && !isTranslating) {
//           console.log("🔄 New content detected, re-translating...");
          
//           // Debounce: wait 500ms before translating
//           timeoutId = setTimeout(() => {
//             translatePage(currentLang);
//           }, 500);
//         }
//       });

//       observer.observe(document.body, {
//         childList: true,
//         subtree: true,
//       });

//       return () => {
//         observer.disconnect();
//         if (timeoutId) {
//           clearTimeout(timeoutId);
//         }
//       };
//     }
//   }, [currentLang, isTranslating]);

//   return (
//     <TranslationContext.Provider value={{ currentLang, languages, changeLanguage, isTranslating, forceTranslate }}>
//       {children}
//     </TranslationContext.Provider>
//   );
// };

// export const useTranslation = () => useContext(TranslationContext);






// lib/TranslationContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  
  const languages = [
    { code: "EN", name: "English", googleCode: "en" },
    { code: "AR", name: "Arabic", googleCode: "ar" },
    { code: "ES", name: "Español", googleCode: "es" },
    { code: "FR", name: "Français", googleCode: "fr" },
    { code: "DE", name: "Deutsch", googleCode: "de" },
    { code: "JA", name: "日本語", googleCode: "ja" },
    { code: "KO", name: "한국어", googleCode: "ko" },
    { code: "ZH", name: "中文", googleCode: "zh-CN" },
  ];

  const translateTextBatch = async (texts, targetLang) => {
    if (!texts || texts.length === 0 || targetLang === "en") return texts;
    
    console.log(`🔄 Batch translating ${texts.length} texts to ${targetLang}`);
    
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          texts: texts,
          targetLang 
        }),
      });
      
      if (response.ok) {
        const translations = await response.json();
        console.log("✅ Batch translation successful!");
        return translations;
      }
      
      console.log("⚠️ Batch translation failed, using original texts");
      return texts;
    } catch (error) {
      console.error("❌ Batch translation error:", error);
      return texts;
    }
  };

  const translateElement = async (element, targetLang) => {
    if (!element || targetLang === "en") return;
    
    console.log("⚡ Instant translating element:", element.tagName);
    
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
          
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          if (parent.classList.contains("notranslate")) return NodeFilter.FILTER_REJECT;
          if (parent.dataset.translated === "true") return NodeFilter.FILTER_REJECT;
          
          const tagName = parent.tagName?.toLowerCase();
          if (tagName === 'script' || tagName === 'style' || tagName === 'noscript') {
            return NodeFilter.FILTER_REJECT;
          }
          
          const trimmedValue = node.nodeValue.trim();
          if (!trimmedValue || trimmedValue.length < 2) return NodeFilter.FILTER_REJECT;
          
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }

    if (nodes.length === 0) return;

    const textMap = new Map();
    nodes.forEach((node) => {
      const text = node.nodeValue?.trim();
      if (text && text.length > 1) {
        if (!textMap.has(text)) {
          textMap.set(text, []);
        }
        textMap.get(text).push(node);
      }
    });

    const uniqueTexts = Array.from(textMap.keys());
    if (uniqueTexts.length === 0) return;

    const translations = await translateTextBatch(uniqueTexts, targetLang);
    const translationMap = new Map();
    uniqueTexts.forEach((text, index) => {
      translationMap.set(text, translations[index]);
    });

    textMap.forEach((nodeList, originalText) => {
      const translatedText = translationMap.get(originalText);
      if (translatedText) {
        nodeList.forEach((node) => {
          node.nodeValue = translatedText;
          if (node.parentElement) {
            node.parentElement.dataset.translated = "true";
            if (!node.parentElement.dataset.originalText) {
              node.parentElement.dataset.originalText = originalText;
            }
          }
        });
      }
    });

    console.log(`⚡ Instantly translated ${uniqueTexts.length} texts in element`);
  };

  const translatePage = async (targetLang, forceRetranslate = false) => {
    if (isTranslating && !forceRetranslate) {
      console.log("⏳ Translation already in progress...");
      return;
    }
    
    console.log("🌍 Starting page translation to:", targetLang);
    setIsTranslating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const hiddenElements = [];
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
          hiddenElements.push({
            element: el,
            originalDisplay: el.style.display,
            originalVisibility: el.style.visibility,
            originalOpacity: el.style.opacity,
          });
          el.style.position = 'absolute';
          el.style.left = '-9999px';
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
      
      console.log(`👁️ Temporarily showing ${hiddenElements.length} hidden elements`);
      
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
            
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            
            if (parent.classList.contains("notranslate")) return NodeFilter.FILTER_REJECT;
            
            const tagName = parent.tagName?.toLowerCase();
            if (tagName === 'script' || tagName === 'style' || tagName === 'noscript') {
              return NodeFilter.FILTER_REJECT;
            }
            
            if (!forceRetranslate && parent.dataset.translated === "true") {
              return NodeFilter.FILTER_REJECT;
            }
            
            const trimmedValue = node.nodeValue.trim();
            if (!trimmedValue || trimmedValue.length < 2) return NodeFilter.FILTER_REJECT;
            
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      const nodes = [];
      let node;
      while ((node = walker.nextNode())) {
        nodes.push(node);
      }
      
      hiddenElements.forEach(({ element, originalDisplay, originalVisibility, originalOpacity }) => {
        element.style.display = originalDisplay;
        element.style.visibility = originalVisibility;
        element.style.opacity = originalOpacity;
        element.style.position = '';
        element.style.left = '';
      });
      
      console.log(`📝 Found ${nodes.length} text nodes to translate (including hidden content)`);

      const textMap = new Map();
      nodes.forEach((node) => {
        const text = node.nodeValue?.trim();
        if (text && text.length > 1) {
          if (!textMap.has(text)) {
            textMap.set(text, []);
          }
          textMap.get(text).push(node);
        }
      });
      
      const uniqueTexts = Array.from(textMap.keys());
      
      if (uniqueTexts.length === 0) {
        console.log("⚠️ No texts to translate");
        setIsTranslating(false);
        return;
      }
      
      console.log(`📝 Unique texts to translate: ${uniqueTexts.length} (from ${nodes.length} nodes)`);

      const translations = await translateTextBatch(uniqueTexts, targetLang);
      console.log("✅ All translations received");

      const translationMap = new Map();
      uniqueTexts.forEach((text, index) => {
        translationMap.set(text, translations[index]);
      });

      textMap.forEach((nodeList, originalText) => {
        const translatedText = translationMap.get(originalText);
        if (translatedText) {
          nodeList.forEach((node) => {
            node.nodeValue = translatedText;
            if (node.parentElement) {
              node.parentElement.dataset.translated = "true";
              if (!node.parentElement.dataset.originalText) {
                node.parentElement.dataset.originalText = originalText;
              }
            }
          });
        }
      });
      
      console.log("🎉 Page translation complete (including all hidden content)!");
    } catch (error) {
      console.error("❌ Translation error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const resetToEnglish = () => {
    console.log("🔙 Resetting to English");
    
    document.querySelectorAll("[data-original-text]").forEach((el) => {
      const originalText = el.dataset.originalText;
      el.textContent = originalText;
      delete el.dataset.translated;
    });
    
    console.log("✅ Reset complete!");
  };

  const changeLanguage = async (langCode, googleCode) => {
    console.log(`🌐 Changing language to: ${langCode} (${googleCode})`);
    
    setCurrentLang(googleCode);
    
    if (googleCode === "en") {
    //   resetToEnglish();
     window.location.reload();
    } else {
      await translatePage(googleCode, true);
    }
  };

  const forceTranslate = async () => {
    if (currentLang !== "en") {
      console.log("🔄 Force retranslating page...");
      document.querySelectorAll("[data-translated]").forEach((el) => {
        delete el.dataset.translated;
      });
      await translatePage(currentLang, true);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    console.log("💾 Saved language from localStorage:", savedLang);
    
    if (savedLang && savedLang !== "en") {
      setCurrentLang(savedLang);
      const timer = setTimeout(() => {
        translatePage(savedLang, true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    console.log("💾 Saving language to localStorage:", currentLang);
    localStorage.setItem("language", currentLang);
  }, [currentLang]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (currentLang !== "en") {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node;
              
              if (element.dataset.translated === "true") return;
              
              const hasText = element.textContent && element.textContent.trim().length > 0;
              
              if (hasText) {
                console.log("⚡ New element detected, instant translating...");
                translateElement(element, currentLang);
              }
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      const handleMouseEnter = (e) => {
        const target = e.target;
        const hasDropdown = target.querySelector('[class*="menu"], [class*="dropdown"], [class*="mega"]');
        
        if (hasDropdown && !target.dataset.hoverTranslated) {
          console.log("🎯 Hover detected on menu element, pre-translating...");
          target.dataset.hoverTranslated = "true";
          
          setTimeout(() => {
            const dropdown = target.querySelector('[class*="menu"], [class*="dropdown"], [class*="mega"]');
            if (dropdown && !dropdown.dataset.translated) {
              translateElement(dropdown, currentLang);
            }
          }, 50);
        }
      };

      document.querySelectorAll('nav, [role="navigation"], header').forEach(nav => {
        nav.addEventListener('mouseenter', handleMouseEnter, true);
      });

      return () => {
        observer.disconnect();
        document.querySelectorAll('nav, [role="navigation"], header').forEach(nav => {
          nav.removeEventListener('mouseenter', handleMouseEnter, true);
        });
      };
    }
  }, [currentLang]);

  return (
    <TranslationContext.Provider value={{ currentLang, languages, changeLanguage, isTranslating, forceTranslate, translateElement }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
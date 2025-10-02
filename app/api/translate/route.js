// app/api/translate/route.js
import { NextResponse } from "next/server";
import axios from "axios";

// Google Translate API ka limit: max 128 texts per request
const BATCH_SIZE = 10000;

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Check if it's batch translation (array) or single text
    const isBatch = Array.isArray(body.texts);
    const targetLang = body.targetLang;
    
    console.log(`🔄 API: Translating ${isBatch ? body.texts.length + ' texts' : 'single text'} to ${targetLang}`);
    
    if (targetLang === "en") {
      return NextResponse.json(isBatch ? body.texts : body.text);
    }

    if (isBatch) {
      // Batch translation with chunking
      const textsToTranslate = body.texts;
      
      if (!textsToTranslate || textsToTranslate.length === 0) {
        return NextResponse.json([]);
      }

      // Agar texts zyada hain to chunks mein divide karo
      if (textsToTranslate.length > BATCH_SIZE) {
        console.log(`📦 Splitting ${textsToTranslate.length} texts into chunks of ${BATCH_SIZE}`);
        
        const allTranslations = [];
        
        // Process in chunks
        for (let i = 0; i < textsToTranslate.length; i += BATCH_SIZE) {
          const chunk = textsToTranslate.slice(i, i + BATCH_SIZE);
          console.log(`🔄 Processing chunk ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(textsToTranslate.length/BATCH_SIZE)}`);
          
          const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
            {
              q: chunk,
              target: targetLang,
              format: "text",
            }
          );

          const chunkTranslations = response.data.data.translations.map(
            (t) => t.translatedText
          );
          
          allTranslations.push(...chunkTranslations);
        }
        
        console.log(`✅ API: All chunks translated (${allTranslations.length} items)`);
        return NextResponse.json(allTranslations);
        
      } else {
        // Normal batch translation (under limit)
        const response = await axios.post(
          `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
          {
            q: textsToTranslate,
            target: targetLang,
            format: "text",
          }
        );

        const translations = response.data.data.translations.map(
          (t) => t.translatedText
        );
        
        console.log(`✅ API: Batch translation successful (${translations.length} items)`);
        return NextResponse.json(translations);
      }
      
    } else {
      // Single text translation (backward compatibility)
      const text = body.text;
      
      if (!text) {
        return NextResponse.json("");
      }

      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
        {
          q: text,
          target: targetLang,
          format: "text",
        }
      );
      
      console.log("✅ API: Single translation successful");
      return NextResponse.json(response.data.data.translations[0].translatedText);
    }
    
  } catch (error) {
    console.error("❌ API: Translation error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Translation failed", details: error.response?.data || error.message }, 
      { status: 500 }
    );
  }
}

import { GoogleGenAI } from "@google/genai";

// Ensure API key is available
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Analyzes a safety snapshot using Gemini 3 Flash.
 * Designed to detect PPE violations, hazards, and generate a safety report.
 * 
 * @param imageBase64 The base64 string of the snapshot.
 * @param imageMimeType The mime type (e.g., 'image/jpeg').
 * @returns A promise resolving to the analysis text.
 */
export const analyzeSafetySnapshot = async (
  imageBase64: string,
  imageMimeType: string
): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return "AI Analysis Unavailable: API Key missing.";
  }

  try {
    // Clean base64 string if it contains the data URL prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: imageMimeType,
            },
          },
          {
            text: `
              Act as an Industrial Safety Officer AI. Analyze this CCTV snapshot.
              
              Identify the following:
              1. PPE Compliance: Are workers wearing helmets, vests, and safety boots?
              2. Hazards: Detect trip hazards, spills, or unsafe machinery proximity.
              3. Behavior: Is anyone running or in a restricted zone?
              
              Output a concise, structured safety report suitable for a mobile notification.
              Start with a severity assessment (LOW, MEDIUM, CRITICAL).
            `,
          },
        ],
      },
    });

    return response.text || "No analysis generated.";
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    return "Unable to process image. Please check network connection.";
  }
};

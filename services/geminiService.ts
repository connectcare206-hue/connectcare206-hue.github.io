import { GoogleGenAI, Type } from "@google/genai";

// Guideline: Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
export async function getCostComparison(role: string, region: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a cost comparison for hiring a ${role} in ${region} vs hiring through Connectcare Services (India-based). 
                 Highlight that local costs are typically $15-30/hour while Connectcare provides talent at 60-70% less (around $4.5-5/hour). 
                 Format the output in a short JSON structure with localAvg, nexusAvg, and savingsPercentage.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            localAvg: { type: Type.STRING },
            nexusAvg: { type: Type.STRING },
            savingsPercentage: { type: Type.STRING },
            analysis: { type: Type.STRING, description: 'A short 2-sentence summary.' }
          },
          required: ['localAvg', 'nexusAvg', 'savingsPercentage', 'analysis']
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
}

// Guideline: Create a new GoogleGenAI instance right before making an API call.
export async function classifyInquiryIntent(message: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Classify the following recruitment inquiry message into 'Employer', 'Candidate', or 'General'.
                 Message: "${message}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            intent: { type: Type.STRING, enum: ['Employer', 'Candidate', 'General'] },
            confidence: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ['intent', 'confidence', 'reasoning']
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { intent: 'General', confidence: 0.5, reasoning: "Error fallback." };
  }
}

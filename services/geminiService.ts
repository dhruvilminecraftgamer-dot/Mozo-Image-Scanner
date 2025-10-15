import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeImage = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    if (response.text) {
        return response.text;
    } else {
        throw new Error("API returned no text in the response.");
    }

  } catch (error) {
    console.error("Error calling Mozo Image Scanner API:", error);
    if (error instanceof Error) {
        throw new Error(`Mozo Image Scanner API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the Mozo Image Scanner API.");
  }
};
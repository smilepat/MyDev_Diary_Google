
import { GoogleGenAI, Type } from "@google/genai";

export const enhanceLinkInfo = async (name: string, url: string): Promise<{ description: string; categoryId: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the app name "${name}" and the URL "${url}", please provide a concise one-sentence description (max 100 chars) and categorize it into one of these: frontend, backend, data, docs, apis, or general.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          description: {
            type: Type.STRING,
            description: "A short, engaging description of what this link might be."
          },
          categoryId: {
            type: Type.STRING,
            description: "The suggested category ID from the provided list."
          }
        },
        required: ["description", "categoryId"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      description: `Quick link to ${name}`,
      categoryId: 'all'
    };
  }
};

export const GEMINI_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Recommended)' },
  { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
  { id: 'gemini-3-flash', name: 'Gemini 3 Flash' },
  { id: 'gemini-3-pro', name: 'Gemini 3 Pro' },
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro Preview (Latest)' },
];

export const testGeminiConnection = async (apiKey?: string, model?: string): Promise<{ success: boolean; latency: number; message: string }> => {
    const start = Date.now();
    try {
      const key = apiKey || process.env.GEMINI_API_KEY || "";
      if (!key) throw new Error("No API Key provided");

      const selectedModel = model || 'gemini-2.5-flash';
      const ai = new GoogleGenAI({ apiKey: key });
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: "Test connection",
      });

      const latency = Date.now() - start;
      return { success: true, latency, message: `Connected with ${selectedModel}` };
    } catch (error: any) {
      return {
        success: false,
        latency: 0,
        message: error.message || "Connection failed"
      };
    }
  };


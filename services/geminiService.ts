
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

export const testGeminiConnection = async (apiKey?: string): Promise<{ success: boolean; latency: number; message: string }> => {
    const start = Date.now();
    try {
      const key = apiKey || process.env.GEMINI_API_KEY || "";
      if (!key) throw new Error("No API Key provided");

      const ai = new GoogleGenAI({ apiKey: key });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: "Test connection",
      });

      const latency = Date.now() - start;
      return { success: true, latency, message: "Connected successfully" };
    } catch (error: any) {
      return {
        success: false,
        latency: 0,
        message: error.message || "Connection failed"
      };
    }
  };


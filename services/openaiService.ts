
import { OpenAI } from "openai";

export const OPENAI_MODELS = [
  { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini (Recommended)' },
  { id: 'gpt-4.1', name: 'GPT-4.1' },
  { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano' },
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
  { id: 'o3', name: 'o3 (Reasoning)' },
  { id: 'o4-mini', name: 'o4 Mini (Reasoning)' },
];

export const testOpenAIConnection = async (apiKey: string, model?: string): Promise<{ success: boolean; latency: number; message: string }> => {
    const start = Date.now();
    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true // Required for client-side testing
        });

        const selectedModel = model || 'gpt-4.1-mini';
        const response = await openai.chat.completions.create({
            model: selectedModel,
            messages: [{ role: 'user', content: 'Test' }],
            max_tokens: 5,
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

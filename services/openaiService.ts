
import { OpenAI } from "openai";

export const testOpenAIConnection = async (apiKey: string): Promise<{ success: boolean; latency: number; message: string }> => {
    const start = Date.now();
    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true // Required for client-side testing
        });

        await openai.models.list();

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

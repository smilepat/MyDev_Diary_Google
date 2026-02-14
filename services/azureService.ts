
import { OpenAI } from "openai";

export const testAzureConnection = async (
    endpoint: string,
    apiKey: string,
    deployment: string
): Promise<{ success: boolean; latency: number; message: string }> => {
    const start = Date.now();
    try {
        const apiVersion = "2024-05-01-preview"; // Default fallback
        const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

        // Azure OpenAI using fetch directly to avoid complex client config for simple test
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: "Test" }],
                max_tokens: 1
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Status: ${response.status}`);
        }

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

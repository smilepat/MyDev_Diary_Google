export const ANTHROPIC_MODELS = [
  { id: 'claude-sonnet-4-5-20250929', name: 'Claude Sonnet 4.5 (Recommended)' },
  { id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5' },
  { id: 'claude-opus-4-5-20251001', name: 'Claude Opus 4.5' },
  { id: 'claude-sonnet-4-6-20260217', name: 'Claude Sonnet 4.6 (Latest)' },
  { id: 'claude-opus-4-6-20260205', name: 'Claude Opus 4.6 (Latest)' },
];

export const testAnthropicConnection = async (apiKey: string, model?: string): Promise<{ success: boolean; latency: number; message: string }> => {
    const start = Date.now();
    try {
        if (!apiKey) throw new Error("No API Key provided");

        const selectedModel = model || 'claude-sonnet-4-5-20250929';
        const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
                "content-type": "application/json",
                "anthropic-version": "2023-06-01",
                "anthropic-dangerous-direct-browser-access": "true",
            },
            body: JSON.stringify({
                model: selectedModel,
                max_tokens: 10,
                messages: [{ role: "user", content: "Test" }],
            }),
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || `status=${res.status}`);
        }
        const latency = Date.now() - start;
        return { success: true, latency, message: `Connected with ${selectedModel}` };
    } catch (error: any) {
        return {
            success: false,
            latency: 0,
            message: error.message || "Connection failed",
        };
    }
};
export const testAnthropicConnection = async (apiKey: string): Promise<{ success: boolean; latency: number; message: string }> => {
    const start = Date.now();
    try {
        if (!apiKey) throw new Error("No API Key provided");
        const res = await fetch("https://api.anthropic.com/v1/models", {
            method: "GET",
            headers: {
                "x-api-key": apiKey,
            },
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || `status=${res.status}`);
        }
        const latency = Date.now() - start;
        return { success: true, latency, message: "Connected successfully" };
    } catch (error: any) {
        return {
            success: false,
            latency: 0,
            message: error.message || "Connection failed",
        };
    }
};
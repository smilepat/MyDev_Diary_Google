
import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Server, Key, Cpu, Sparkles } from 'lucide-react';
import { testGeminiConnection } from '../services/geminiService';
import { testOpenAIConnection } from '../services/openaiService';
import { testAzureConnection } from '../services/azureService';
import { testAnthropicConnection } from '../services/anthropicService';

interface ApiStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ServiceType = 'gemini' | 'openai' | 'azure' | 'anthropic';

export default function ApiStatusModal({ isOpen, onClose }: ApiStatusModalProps) {
    const [activeTab, setActiveTab] = useState<ServiceType>('gemini');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string; latency?: number } | null>(null);

    // Form States
    const [geminiKey, setGeminiKey] = useState('');
    const [openaiKey, setOpenaiKey] = useState('');
    const [azureEndpoint, setAzureEndpoint] = useState('');
    const [azureKey, setAzureKey] = useState('');
    const [azureDeployment, setAzureDeployment] = useState('');
    const [anthropicKey, setAnthropicKey] = useState('');

    if (!isOpen) return null;

    const handleTest = async () => {
        setLoading(true);
        setResult(null);
        try {
            let res;
            if (activeTab === 'gemini') {
                res = await testGeminiConnection(geminiKey);
            } else if (activeTab === 'openai') {
                res = await testOpenAIConnection(openaiKey);
            } else if (activeTab === 'anthropic') {
                res = await testAnthropicConnection(anthropicKey);
            } else {
                res = await testAzureConnection(azureEndpoint, azureKey, azureDeployment);
            }
            setResult(res);
        } catch (e: any) {
            setResult({ success: false, message: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <Server className="mr-2 text-indigo-600" size={20} />
                        API Connection Test
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                        <X size={20} />
                    </button>
                </div>

                {/* content */}
                <div className="p-6 flex-1 overflow-y-auto">
                    {/* Tabs */}
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                        {(['gemini', 'openai', 'azure', 'anthropic'] as ServiceType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setResult(null); }}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all capitalize ${activeTab === tab
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'gemini' && (
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Gemini API Key (Optional)</label>
                                <div className="relative">
                                    <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        placeholder="Leave empty to use env var"
                                        value={geminiKey}
                                        onChange={(e) => setGeminiKey(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'openai' && (
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">OpenAI API Key</label>
                                <div className="relative">
                                    <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        placeholder="sk-..."
                                        value={openaiKey}
                                        onChange={(e) => setOpenaiKey(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === 'anthropic' && (
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Anthropic API Key</label>
                                <div className="relative">
                                    <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                        placeholder="anthropic-key"
                                        value={anthropicKey}
                                        onChange={(e) => setAnthropicKey(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'azure' && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Endpoint URL</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                                        placeholder="https://resource-name.openai.azure.com"
                                        value={azureEndpoint}
                                        onChange={(e) => setAzureEndpoint(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Deployment Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                                        placeholder="gpt-4o"
                                        value={azureDeployment}
                                        onChange={(e) => setAzureDeployment(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">API Key</label>
                                    <input
                                        type="password"
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                                        placeholder="Azure API Key"
                                        value={azureKey}
                                        onChange={(e) => setAzureKey(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleTest}
                            disabled={loading}
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Sparkles size={18} className="mr-2" />}
                            {loading ? 'Testing Connection...' : 'Test Connection'}
                        </button>
                    </div>

                    {/* Result Area */}
                    {result && (
                        <div className={`mt-6 p-4 rounded-xl border ${result.success ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'} animate-in fade-in slide-in-from-bottom-2`}>
                            <div className="flex items-start">
                                {result.success ? (
                                    <CheckCircle className="text-emerald-500 mt-0.5 mr-3" size={20} />
                                ) : (
                                    <AlertCircle className="text-red-500 mt-0.5 mr-3" size={20} />
                                )}
                                <div>
                                    <h4 className={`font-bold text-sm ${result.success ? 'text-emerald-800' : 'text-red-800'}`}>
                                        {result.success ? 'Connection Successful' : 'Connection Failed'}
                                    </h4>
                                    <p className={`text-xs mt-1 ${result.success ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {result.message}
                                    </p>
                                    {result.latency && (
                                        <div className="mt-2 text-xs font-mono bg-white/50 px-2 py-1 rounded inline-block">
                                            Latency: {result.latency}ms
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

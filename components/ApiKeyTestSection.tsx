
import React, { useState } from 'react';
import { Key, Loader2, CheckCircle, AlertCircle, Zap, ChevronDown } from 'lucide-react';
import { testGeminiConnection, GEMINI_MODELS } from '../services/geminiService';
import { testOpenAIConnection, OPENAI_MODELS } from '../services/openaiService';
import { testAnthropicConnection, ANTHROPIC_MODELS } from '../services/anthropicService';

type Provider = 'gemini' | 'openai' | 'anthropic';

interface ModelOption {
  id: string;
  name: string;
}

interface ProviderConfig {
  name: string;
  placeholder: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  buttonColor: string;
  buttonHover: string;
  models: ModelOption[];
}

const PROVIDERS: Record<Provider, ProviderConfig> = {
  gemini: {
    name: 'Gemini',
    placeholder: 'AIzaSy...',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    iconBg: 'bg-blue-100',
    buttonColor: 'bg-blue-600',
    buttonHover: 'hover:bg-blue-700',
    models: GEMINI_MODELS,
  },
  openai: {
    name: 'OpenAI',
    placeholder: 'sk-...',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    iconBg: 'bg-emerald-100',
    buttonColor: 'bg-emerald-600',
    buttonHover: 'hover:bg-emerald-700',
    models: OPENAI_MODELS,
  },
  anthropic: {
    name: 'Anthropic',
    placeholder: 'sk-ant-...',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100',
    iconBg: 'bg-orange-100',
    buttonColor: 'bg-orange-600',
    buttonHover: 'hover:bg-orange-700',
    models: ANTHROPIC_MODELS,
  },
};

export default function ApiKeyTestSection() {
  const [keys, setKeys] = useState<Record<Provider, string>>({ gemini: '', openai: '', anthropic: '' });
  const [selectedModels, setSelectedModels] = useState<Record<Provider, string>>({
    gemini: GEMINI_MODELS[0].id,
    openai: OPENAI_MODELS[0].id,
    anthropic: ANTHROPIC_MODELS[0].id,
  });
  const [loading, setLoading] = useState<Record<Provider, boolean>>({ gemini: false, openai: false, anthropic: false });
  const [results, setResults] = useState<Record<Provider, { success: boolean; message: string; latency?: number } | null>>({
    gemini: null, openai: null, anthropic: null,
  });

  const handleTest = async (provider: Provider) => {
    const key = keys[provider];
    const model = selectedModels[provider];
    if (!key) return;

    setLoading(prev => ({ ...prev, [provider]: true }));
    setResults(prev => ({ ...prev, [provider]: null }));

    try {
      let res;
      if (provider === 'gemini') {
        res = await testGeminiConnection(key, model);
      } else if (provider === 'openai') {
        res = await testOpenAIConnection(key, model);
      } else {
        res = await testAnthropicConnection(key, model);
      }
      setResults(prev => ({ ...prev, [provider]: res }));
    } catch (e: any) {
      setResults(prev => ({ ...prev, [provider]: { success: false, message: e.message } }));
    } finally {
      setLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center mb-4">
        <Key className="text-indigo-500 mr-2" size={20} />
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">API Key Test</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(PROVIDERS) as Provider[]).map((provider) => {
          const cfg = PROVIDERS[provider];
          const result = results[provider];
          const isLoading = loading[provider];

          return (
            <div
              key={provider}
              className={`${cfg.bgColor} border ${cfg.borderColor} rounded-2xl p-5 shadow-sm transition-all`}
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 ${cfg.iconBg} rounded-lg flex items-center justify-center mr-3`}>
                  <Zap size={16} className={cfg.color} />
                </div>
                <h3 className={`font-bold text-sm ${cfg.color}`}>{cfg.name}</h3>
              </div>

              {/* API Key Input */}
              <div className="relative mb-3">
                <Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder={cfg.placeholder}
                  value={keys[provider]}
                  onChange={(e) => setKeys(prev => ({ ...prev, [provider]: e.target.value }))}
                />
              </div>

              {/* Model Selector */}
              <div className="relative mb-3">
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer"
                  value={selectedModels[provider]}
                  onChange={(e) => setSelectedModels(prev => ({ ...prev, [provider]: e.target.value }))}
                >
                  {cfg.models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Test Button */}
              <button
                onClick={() => handleTest(provider)}
                disabled={isLoading || !keys[provider]}
                className={`w-full py-2 ${cfg.buttonColor} ${cfg.buttonHover} text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Testing...
                  </>
                ) : (
                  'Test Connection'
                )}
              </button>

              {/* Result */}
              {result && (
                <div className={`mt-3 p-3 rounded-xl border ${result.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-start">
                    {result.success ? (
                      <CheckCircle className="text-emerald-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    ) : (
                      <AlertCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    )}
                    <div className="min-w-0">
                      <p className={`font-bold text-xs ${result.success ? 'text-emerald-700' : 'text-red-700'}`}>
                        {result.success ? 'Success' : 'Failed'}
                      </p>
                      <p className={`text-[11px] mt-0.5 ${result.success ? 'text-emerald-600' : 'text-red-600'} break-words`}>
                        {result.message}
                      </p>
                      {result.latency != null && result.latency > 0 && (
                        <p className="text-[10px] font-mono text-gray-500 mt-1">
                          {result.latency}ms
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { X, Cloud, Link, Copy, Check, Info, Settings, Database, Play } from 'lucide-react';
import { SyncConfig } from '../types';
import { APPS_SCRIPT_TEMPLATE } from '../services/sheetsService';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SyncConfig;
  onSaveConfig: (config: SyncConfig) => void;
  onSyncNow: () => void;
  onRestore: () => void;
  isSyncing: boolean;
}

const SyncModal: React.FC<SyncModalProps> = ({ 
  isOpen, onClose, config, onSaveConfig, onSyncNow, onRestore, isSyncing 
}) => {
  const [url, setUrl] = useState(config.sheetUrl);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveConfig({
      ...config,
      sheetUrl: url,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-emerald-50/50">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <Cloud className="mr-2 text-emerald-600" size={20} />
            Cloud Persistence (Google Sheets)
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-8">
          {/* Settings Side */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Web App URL</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="https://script.google.com/macros/s/..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-sm font-medium"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center">
                <Settings size={14} className="mr-2" /> Operations
              </h4>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={onSyncNow}
                  disabled={!url || isSyncing}
                  className="flex items-center justify-center w-full px-4 py-2.5 bg-white border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 rounded-xl transition-all text-sm font-semibold disabled:opacity-50"
                >
                  <Cloud size={16} className={`mr-2 ${isSyncing ? 'animate-bounce' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Push to Sheets Now'}
                </button>
                <button 
                  onClick={onRestore}
                  disabled={!url || isSyncing}
                  className="flex items-center justify-center w-full px-4 py-2.5 bg-white border border-gray-200 hover:border-amber-500 hover:text-amber-600 rounded-xl transition-all text-sm font-semibold disabled:opacity-50"
                >
                  <Database size={16} className="mr-2" />
                  Restore From Sheets
                </button>
              </div>
            </div>

            <div className="flex items-center text-[11px] text-gray-400 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
              <Info size={14} className="mr-2 text-blue-500 shrink-0" />
              This ensures your data is safe even if the app code is modified or browser data is cleared.
            </div>
          </div>

          {/* Guide Side */}
          <div className="w-full md:w-64 space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Setup Guide</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                <p className="text-xs text-gray-600">Create a <b>Google Sheet</b></p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                <p className="text-xs text-gray-600">Go to <b>Extensions &gt; Apps Script</b></p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-2">Paste this code & <b>Deploy</b></p>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center w-full px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-[10px] font-medium"
                  >
                    {copied ? <Check size={12} className="mr-2 text-emerald-400" /> : <Copy size={12} className="mr-2" />}
                    {copied ? 'Copied Script!' : 'Copy Script Code'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncModal;

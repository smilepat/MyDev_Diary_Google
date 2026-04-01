
import React, { useState } from 'react';
import { Plus, Settings, ChevronRight, ExternalLink, Pencil, Trash2, Check, X } from 'lucide-react';
import { Category } from '../types';
import { getCategoryIcon, QUICK_ACCESS_GROUPS } from '../constants';
import { formatUrl } from '../utils/url';

interface SidebarProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  onAddCategory: () => void;
  onEditCategory: (id: string, newName: string) => void;
  onDeleteCategory: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      onEditCategory(editingId, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (cat: Category) => {
    if (confirm(`"${cat.name}" 테마를 삭제하시겠습니까?`)) {
      onDeleteCategory(cat.id);
    }
  };

  return (
    <div className="w-64 flex flex-col border-r border-gray-200 bg-white h-full fixed left-0 top-0 pt-20 pb-6">
      <div className="px-6 mb-6 overflow-y-auto flex-1 custom-scrollbar">
        {/* Themes Section */}
        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Themes</h2>
        <div className="space-y-1 mb-8">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative">
              {editingId === cat.id ? (
                <div className="flex items-center gap-1 px-2 py-1.5">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit();
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                    autoFocus
                    className="flex-1 text-sm px-2 py-1 border border-indigo-300 rounded-md outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                  <button onClick={handleSaveEdit} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded">
                    <Check size={14} />
                  </button>
                  <button onClick={handleCancelEdit} className="p-1 text-gray-400 hover:bg-gray-100 rounded">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategoryId === cat.id
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`mr-3 ${selectedCategoryId === cat.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                      {getCategoryIcon(cat.icon, "w-4 h-4")}
                    </span>
                    <span className="truncate">{cat.name}</span>
                  </div>
                  {selectedCategoryId === cat.id ? (
                    <ChevronRight size={14} />
                  ) : (
                    cat.id !== 'all' && (
                      <div className="hidden group-hover:flex items-center gap-0.5">
                        <span
                          role="button"
                          onClick={(e) => { e.stopPropagation(); handleStartEdit(cat); }}
                          className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                        >
                          <Pencil size={12} />
                        </span>
                        <span
                          role="button"
                          onClick={(e) => { e.stopPropagation(); handleDelete(cat); }}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={12} />
                        </span>
                      </div>
                    )
                  )}
                </button>
              )}
            </div>
          ))}
          <button
            onClick={onAddCategory}
            className="flex items-center w-full px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all text-xs font-semibold mt-2"
          >
            <Plus size={14} className="mr-2" />
            Create Theme
          </button>
        </div>

        {/* Quick Access Section */}
        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Access</h2>
        <div className="space-y-6">
          {QUICK_ACCESS_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-[10px] font-bold text-indigo-400 mb-2 px-1">{group.title}</h3>
              <div className="grid grid-cols-1 gap-1">
                {group.links.map((link) => (
                  <a
                    key={link.name}
                    href={formatUrl(link.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-indigo-50 transition-all text-xs text-gray-600 hover:text-indigo-700"
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-400 group-hover:text-indigo-500 transition-colors">
                        {link.icon}
                      </span>
                      {link.name}
                    </div>
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-40" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-auto pt-4 border-t border-gray-100">
        <button className="flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <Settings size={18} className="mr-2" />
          Settings
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;


import React, { useState, useRef, useEffect } from 'react';
import { Plus, Settings, ChevronRight, ExternalLink, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Category } from '../types';
import { getCategoryIcon, QUICK_ACCESS_GROUPS } from '../constants';
import { formatUrl } from '../utils/url';

interface SidebarProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  onAddCategory: () => void;
  onEditCategory?: (id: string, newName: string) => void;
  onDeleteCategory?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}) => {
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-focus edit input
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setMenuOpenId(null);
  };

  const handleFinishEdit = () => {
    if (editingId && editName.trim() && onEditCategory) {
      onEditCategory(editingId, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (id: string) => {
    setMenuOpenId(null);
    if (onDeleteCategory) {
      onDeleteCategory(id);
    }
  };

  return (
    <div className="w-64 flex flex-col border-r border-gray-200 bg-white h-full fixed left-0 top-0 pt-20 pb-6">
      <div className="px-6 mb-6 overflow-y-auto flex-1 custom-scrollbar">
        {/* Themes Section */}
        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Themes</h2>
        <div className="space-y-1 mb-8">
          {categories.map((cat) => {
            const isEditing = editingId === cat.id;
            const isDefault = cat.id === 'all';

            return (
              <div key={cat.id} className="relative group">
                {isEditing ? (
                  <div className="flex items-center px-3 py-2">
                    <span className="mr-3 text-indigo-600">
                      {getCategoryIcon(cat.icon, "w-4 h-4")}
                    </span>
                    <input
                      ref={editInputRef}
                      type="text"
                      placeholder="Theme name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={handleFinishEdit}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleFinishEdit();
                        if (e.key === 'Escape') { setEditingId(null); setEditName(''); }
                      }}
                      className="flex-1 text-sm font-medium bg-white border border-indigo-300 rounded px-2 py-0.5 outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
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
                    <div className="flex items-center min-w-0">
                      <span className={`mr-3 flex-shrink-0 ${selectedCategoryId === cat.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                        {getCategoryIcon(cat.icon, "w-4 h-4")}
                      </span>
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      {!isDefault && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpenId(menuOpenId === cat.id ? null : cat.id);
                          }}
                          className="p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all cursor-pointer"
                        >
                          <MoreHorizontal size={14} />
                        </span>
                      )}
                      {selectedCategoryId === cat.id && !menuOpenId && <ChevronRight size={14} />}
                    </div>
                  </button>
                )}

                {/* Context Menu */}
                {menuOpenId === cat.id && (
                  <div
                    ref={menuRef}
                    className="absolute right-2 top-full mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-36 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <button
                      onClick={() => handleStartEdit(cat)}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Pencil size={14} className="mr-2 text-gray-400" />
                      Rename
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
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

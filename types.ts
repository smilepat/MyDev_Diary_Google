
export interface LinkItem {
  id: string;
  name: string;
  url: string;
  description: string;
  categoryId: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface SyncConfig {
  sheetUrl: string;
  isAutoSync: boolean;
  lastSyncedAt: number | null;
}

export type LayoutType = 'grid' | 'list';

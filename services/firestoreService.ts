
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  type Unsubscribe
} from 'firebase/firestore';
import { db } from './firebase';
import { LinkItem, Category, TodoItem } from '../types';

const LINKS_COLLECTION = 'links';
const CATEGORIES_COLLECTION = 'categories';
const TODOS_COLLECTION = 'todos';

// Links
export const saveLink = async (link: LinkItem): Promise<void> => {
  await setDoc(doc(db, LINKS_COLLECTION, link.id), link);
};

export const deleteLink = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, LINKS_COLLECTION, id));
};

export const fetchLinks = async (): Promise<LinkItem[]> => {
  const snapshot = await getDocs(collection(db, LINKS_COLLECTION));
  return snapshot.docs.map(d => d.data() as LinkItem);
};

export const subscribeLinks = (callback: (links: LinkItem[]) => void): Unsubscribe => {
  return onSnapshot(collection(db, LINKS_COLLECTION), (snapshot) => {
    const links = snapshot.docs.map(d => d.data() as LinkItem);
    callback(links);
  });
};

// Categories
export const saveCategory = async (category: Category): Promise<void> => {
  await setDoc(doc(db, CATEGORIES_COLLECTION, category.id), category);
};

export const deleteCategory = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
};

export const fetchCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
  return snapshot.docs.map(d => d.data() as Category);
};

export const subscribeCategories = (callback: (categories: Category[]) => void): Unsubscribe => {
  return onSnapshot(collection(db, CATEGORIES_COLLECTION), (snapshot) => {
    const categories = snapshot.docs.map(d => d.data() as Category);
    callback(categories);
  });
};

// Todos
export const saveTodo = async (todo: TodoItem): Promise<void> => {
  await setDoc(doc(db, TODOS_COLLECTION, todo.id), todo);
};

export const deleteTodo = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, TODOS_COLLECTION, id));
};

export const fetchTodos = async (): Promise<TodoItem[]> => {
  const snapshot = await getDocs(collection(db, TODOS_COLLECTION));
  return snapshot.docs.map(d => d.data() as TodoItem);
};

export const subscribeTodos = (callback: (todos: TodoItem[]) => void): Unsubscribe => {
  return onSnapshot(collection(db, TODOS_COLLECTION), (snapshot) => {
    const todos = snapshot.docs.map(d => d.data() as TodoItem);
    callback(todos);
  });
};

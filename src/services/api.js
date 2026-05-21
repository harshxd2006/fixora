import { problems } from '../data/problems';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { matchQuery } from '../utils/helpers';
import { semanticSearchProblems } from './ai';

// Mock API calls to simulate backend data fetching
// In a real app, these would query Supabase

export const getProblems = async () => {
  return new Promise(resolve => setTimeout(() => resolve(problems), 500));
};

export const getProblemById = async (id) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(problems.find(p => p.id === id)), 500);
  });
};

export const getProducts = async (filters = {}) => {
  let result = [...products];
  if (filters.category) {
    result = result.filter(p => p.category === filters.category);
  }
  if (filters.query) {
    result = await matchQuery(filters.query, result, ['name', 'description', 'tags']);
  }
  if (filters.featured) {
    result = result.filter(p => p.isFeatured);
  }
  
  // Keep delay to simulate network
  await new Promise(r => setTimeout(r, 500));
  return result;
};

export const getProductById = async (id) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(products.find(p => p.id === id)), 500);
  });
};

export const getCategories = async () => {
  return new Promise(resolve => setTimeout(() => resolve(categories), 300));
};

export const searchProblems = async (query) => {
  return await semanticSearchProblems(query, problems);
};

// Wishlist mock API (uses localStorage for demo purposes)
const WISHLIST_KEY = 'fixora_wishlist';

export const getWishlist = async (userId) => {
  return new Promise(resolve => {
    const data = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    resolve(data);
  });
};

export const addToWishlist = async (userId, productId) => {
  return new Promise(resolve => {
    const data = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    if (!data.includes(productId)) {
      data.push(productId);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(data));
    }
    resolve({ success: true });
  });
};

export const removeFromWishlist = async (userId, productId) => {
  return new Promise(resolve => {
    let data = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    data = data.filter(id => id !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(data));
    resolve({ success: true });
  });
};

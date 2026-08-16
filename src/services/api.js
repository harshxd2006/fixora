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

  // 1. Category Filter
  if (filters.category && filters.category !== 'All') {
    result = result.filter(p => p.category === filters.category);
  }

  // 2. Search Query (Case-insensitive search across name, description, category, and tags)
  if (filters.query && filters.query.trim()) {
    const q = filters.query.trim().toLowerCase();
    result = result.filter(p => 
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      (Array.isArray(p.tags) && p.tags.some(tag => tag.toLowerCase().includes(q))) ||
      (p.shortSolution && p.shortSolution.toLowerCase().includes(q))
    );
  }

  // 3. Featured Filter
  if (filters.featured) {
    result = result.filter(p => p.isFeatured);
  }

  // 4. Price Filter
  if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice > 0) {
    result = result.filter(p => p.price >= filters.minPrice);
  }
  if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice > 0) {
    result = result.filter(p => p.price <= filters.maxPrice);
  }

  // 5. Sorting
  if (filters.sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === 'rating-desc') {
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Simulate fast network latency
  await new Promise(r => setTimeout(r, 150));
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

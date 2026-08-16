import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { productCategories } from '../data/products';
import { getProducts } from '../services/api';

const PRICE_OPTIONS = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-1000', label: 'Under ₹1,000', min: 0, max: 1000 },
  { id: '1000-2500', label: '₹1,000 – ₹2,500', min: 1000, max: 2500 },
  { id: '2500-5000', label: '₹2,500 – ₹5,000', min: 2500, max: 5000 },
  { id: '5000-plus', label: '₹5,000+', min: 5000, max: Infinity },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Sort: Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating-desc', label: 'Highest Rated' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter values from URL search params
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceFilter, setPriceFilter] = useState(searchParams.get('price') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state changes to URL Search Params
  const updateUrlParams = (cat, search, price, sort) => {
    const params = {};
    if (cat && cat !== 'All') params.category = cat;
    if (search && search.trim()) params.search = search.trim();
    if (price && price !== 'all') params.price = price;
    if (sort && sort !== 'featured') params.sort = sort;
    setSearchParams(params, { replace: true });
  };

  // Fetch recommended products on mount
  useEffect(() => {
    const fetchRecommended = async () => {
      const saved = JSON.parse(localStorage.getItem('fixora_recent_searches') || '[]');
      const lastThree = saved.slice(0, 3);
      if (lastThree.length > 0) {
        const combinedQuery = lastThree.join(' ');
        const results = await getProducts({ query: combinedQuery });
        setRecommendedProducts(results.slice(0, 4));
      }
    };
    fetchRecommended();
  }, []);

  // Fetch filtered products with debouncing
  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setIsLoading(true);

      // Save recent search if valid query
      if (searchQuery.trim().length >= 2) {
        const saved = JSON.parse(localStorage.getItem('fixora_recent_searches') || '[]');
        const q = searchQuery.trim();
        const updated = [q, ...saved.filter(item => item !== q)].slice(0, 5);
        localStorage.setItem('fixora_recent_searches', JSON.stringify(updated));
      }

      // Determine price min/max from selected option
      const selectedPrice = PRICE_OPTIONS.find(p => p.id === priceFilter);
      const minPrice = selectedPrice?.min;
      const maxPrice = selectedPrice?.max === Infinity ? null : selectedPrice?.max;

      const results = await getProducts({
        category: activeCategory === 'All' ? null : activeCategory,
        query: searchQuery.trim() || null,
        minPrice,
        maxPrice,
        sortBy
      });

      if (active) {
        setFilteredProducts(results);
        setIsLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [activeCategory, searchQuery, priceFilter, sortBy]);

  // Handlers
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    updateUrlParams(cat, searchQuery, priceFilter, sortBy);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateUrlParams(activeCategory, val, priceFilter, sortBy);
  };

  const handlePriceChange = (price) => {
    setPriceFilter(price);
    updateUrlParams(activeCategory, searchQuery, price, sortBy);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    updateUrlParams(activeCategory, searchQuery, priceFilter, sort);
  };

  const handleClearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setPriceFilter('all');
    setSortBy('featured');
    setSearchParams({}, { replace: true });
  };

  const isFilterActive = activeCategory !== 'All' || searchQuery.trim() !== '' || priceFilter !== 'all' || sortBy !== 'featured';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-12 pb-24 px-4 sm:px-6 md:px-8 min-h-screen bg-transparent text-white relative z-10 overflow-x-hidden"
    >
      <Helmet>
        <title>All Products - Fixora</title>
        <meta name="description" content="Browse our curated collection of problem-solving products. High quality, tested, and guaranteed to work." />
      </Helmet>

      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-8 md:mb-12">
          <SectionHeading 
            label="ALL PRODUCTS" 
            title="Tools to fix your life."
            subtitle="Browse our curated collection of problem-solving products. High quality, tested, and guaranteed to work."
            dark
          />
        </div>

        {/* Recommended For You */}
        {recommendedProducts.length > 0 && !searchQuery && activeCategory === 'All' && priceFilter === 'all' && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-6">Recommended for You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product, i) => (
                <motion.div
                  key={`rec-${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CONTROLS & FILTERS ROW */}
        <div className="space-y-4 mb-8 border-b border-white/10 pb-6">
          
          {/* CATEGORIES SCROLLABLE PILL BAR */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === 'All' 
                  ? 'bg-[#E5B268] text-ink shadow-md' 
                  : 'bg-white/10 text-white/80 border border-white/15 hover:bg-white/20 hover:text-white'
              }`}
            >
              All Products
            </button>
            {productCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-[#E5B268] text-ink shadow-md' 
                    : 'bg-white/10 text-white/80 border border-white/15 hover:bg-white/20 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* SEARCH, PRICE RANGE, SORTING & CLEAR CONTROLS */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3">
            
            {/* SEARCH INPUT */}
            <div className="relative flex-1 min-w-[220px]">
              <input 
                type="text" 
                placeholder="Search products by name, description or tags..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-11 bg-white/10 border border-white/15 rounded-full pl-10 pr-10 text-xs sm:text-sm text-white focus:border-[#E5B268] outline-none transition-colors placeholder:text-white/50"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60" />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* SECONDARY CONTROLS (PRICE, SORT, CLEAR) */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* PRICE DROPDOWN */}
              <select
                value={priceFilter}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="h-11 bg-white/10 border border-white/15 rounded-full px-4 text-xs sm:text-sm text-white outline-none focus:border-[#E5B268] transition-colors cursor-pointer"
              >
                {PRICE_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id} className="bg-[#1A1A1A] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* SORT DROPDOWN */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-11 bg-white/10 border border-white/15 rounded-full px-4 text-xs sm:text-sm text-white outline-none focus:border-[#E5B268] transition-colors cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id} className="bg-[#1A1A1A] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* CLEAR FILTERS BUTTON */}
              {isFilterActive && (
                <button
                  onClick={handleClearFilters}
                  className="h-11 px-4 bg-[#E5B268]/20 border border-[#E5B268]/40 rounded-full flex items-center gap-1.5 text-xs font-bold text-[#E5B268] hover:bg-[#E5B268]/30 transition-colors"
                >
                  <RotateCcw size={14} /> Clear Filters
                </button>
              )}
            </div>

          </div>

        </div>

        {/* PRODUCT GRID */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white/10 rounded-[20px] h-[380px] border border-white/15"></div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeCategory}-${searchQuery}-${priceFilter}-${sortBy}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* EMPTY STATE */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-16 px-6 bg-white/5 border border-white/15 rounded-[24px] text-white">
            <Search size={44} className="mx-auto text-[#E5B268]/60 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
            <p className="text-sm text-white/70 max-w-md mx-auto mb-6">
              Try changing your search query or price filters to explore our workspace solutions.
            </p>
            <button
              onClick={handleClearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default Products;

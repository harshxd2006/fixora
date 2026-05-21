import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { productCategories } from '../data/products';
import { getProducts } from '../services/api';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recommended products on mount
  useEffect(() => {
    const fetchRecommended = async () => {
      const saved = JSON.parse(localStorage.getItem('fixora_recent_searches') || '[]');
      const lastThree = saved.slice(0, 3);
      if (lastThree.length > 0) {
        const combinedQuery = lastThree.join(' ');
        const results = await getProducts({ query: combinedQuery });
        // We only want to show a few recommended
        setRecommendedProducts(results.slice(0, 4));
      }
    };
    fetchRecommended();
  }, []);

  // Fetch filtered products & save search
  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setIsLoading(true);
      
      // Save search query if valid
      if (searchQuery.trim().length >= 2) {
        const saved = JSON.parse(localStorage.getItem('fixora_recent_searches') || '[]');
        const q = searchQuery.trim();
        const updated = [q, ...saved.filter(item => item !== q)].slice(0, 5);
        localStorage.setItem('fixora_recent_searches', JSON.stringify(updated));
      }

      const results = await getProducts({ 
        category: activeCategory === 'All' ? null : activeCategory,
        query: searchQuery.trim() || null
      });
      
      if (active) {
        setFilteredProducts(results);
        setIsLoading(false);
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [activeCategory, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-12 pb-24 px-6 min-h-screen bg-warm-white"
    >
      <Helmet>
        <title>All Products - Fixora</title>
        <meta name="description" content="Browse our curated collection of problem-solving products. High quality, tested, and guaranteed to work." />
      </Helmet>
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <SectionHeading 
            label="ALL PRODUCTS" 
            title="Tools to fix your life."
            subtitle="Browse our curated collection of problem-solving products. High quality, tested, and guaranteed to work."
          />
        </div>

        {/* Recommended For You */}
        {recommendedProducts.length > 0 && !searchQuery && activeCategory === 'All' && (
          <div className="mb-16">
            <h3 className="text-[20px] font-bold text-ink mb-6">Recommended for You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

        {/* Controls Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 mt-12 border-b border-border-light pb-6">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
            <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                activeCategory === 'All' 
                  ? 'bg-ink text-white' 
                  : 'bg-white text-slate-muted border border-border-light hover:border-ink hover:text-ink'
              }`}
            >
              All Products
            </button>
            {productCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                  activeCategory === cat.id 
                    ? 'bg-ink text-white' 
                    : 'bg-white text-slate-muted border border-border-light hover:border-ink hover:text-ink'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 bg-white border border-border-light rounded-full pl-10 pr-4 text-[14px] text-ink focus:border-ink outline-none transition-colors placeholder:text-[#9E9E98]"
              />
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-muted" />
            </div>
            <button className="w-10 h-10 bg-white border border-border-light rounded-full flex items-center justify-center text-ink hover:bg-soft-white transition-colors flex-shrink-0">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-[20px] h-[400px] border border-border-light"></div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white border border-border-light rounded-[24px] shadow-sm">
            <Search size={48} className="mx-auto text-border-light mb-4" />
            <h3 className="text-[18px] font-semibold text-ink mb-2">No products found</h3>
            <p className="text-[14px] text-slate-muted">Try adjusting your search or filters.</p>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default Products;

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Zap, Loader2, Sparkles, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ProblemCard from '../components/ProblemCard';
import ProductCard from '../components/ProductCard';
import BundleCard from '../components/BundleCard';
import SearchBar from '../components/SearchBar';
import SectionHeading from '../components/SectionHeading';
import { problems, problemCategories } from '../data/problems';
import { getProblemRecommendations } from '../services/ai';

const Problems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // AI Problem Recommendation State
  const [aiResult, setAiResult] = useState(null);
  const [isSearchingAI, setIsSearchingAI] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setAiResult(null);
      setIsSearchingAI(false);
      return;
    }

    let active = true;
    setIsSearchingAI(true);

    getProblemRecommendations(searchQuery.trim()).then((res) => {
      if (active) {
        setAiResult(res);
        setIsSearchingAI(false);
      }
    }).catch(err => {
      console.error('Error fetching AI recommendations:', err);
      if (active) {
        setAiResult({
          problemSummary: searchQuery,
          recommendations: [],
          bundle: null,
          hasMatch: false
        });
        setIsSearchingAI(false);
      }
    });

    return () => {
      active = false;
    };
  }, [searchQuery]);

  const filteredProblems = useMemo(() => {
    if (activeCategory === 'All') return problems;
    return problems.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleClearSearch = () => {
    setSearchParams({}, { replace: true });
    setAiResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-12 pb-24 px-4 sm:px-6 md:px-8 min-h-screen bg-transparent text-white relative z-10 overflow-x-hidden"
    >
      <Helmet>
        <title>{searchQuery ? `Fix for "${searchQuery}" - Fixora AI` : 'Browse Problems - Fixora'}</title>
        <meta name="description" content="Search by symptoms, annoyances, or daily frustrations. Our AI will match you with the perfect solutions." />
      </Helmet>
      
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <SectionHeading 
            label="PROBLEM-FIRST DISCOVERY" 
            title="Tell us what's bothering you."
            subtitle="Describe your daily frustration or pain in plain English. Fixora AI will find the exact tools designed to solve it."
            dark
          />
          
          <div className="mt-8 relative max-w-xl">
            <SearchBar placeholder="E.g., My neck hurts after working on my laptop all day..." />
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-white/70">
              <Zap size={14} className="text-[#E5B268] fill-[#E5B268]" />
              <span>AI Intent Engine • Analyzes symptoms to match real products</span>
            </div>
          </div>
        </div>

        {/* AI SEARCH RESULTS VIEW (Triggered when user searches a problem) */}
        {searchQuery.trim() && (
          <div className="mb-16 border-b border-white/10 pb-16">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B268]/15 border border-[#E5B268]/30 text-xs font-extrabold text-[#E5B268] mb-2 uppercase tracking-wider">
                  <Sparkles size={14} /> AI Problem Diagnosis
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Solutions for: <span className="text-[#E5B268]">"{searchQuery}"</span>
                </h2>
              </div>
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full text-xs font-bold text-white flex items-center gap-1.5 transition-colors flex-shrink-0"
              >
                <RotateCcw size={14} /> Clear Search
              </button>
            </div>

            {/* AI LOADING STATE */}
            {isSearchingAI ? (
              <div className="glass-card p-12 text-center text-white/70">
                <Loader2 size={36} className="animate-spin text-[#E5B268] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">Analyzing Your Problem...</h3>
                <p className="text-xs text-white/60">Extracting ergonomic needs & scoring catalog products...</p>
              </div>
            ) : aiResult && aiResult.hasMatch && aiResult.recommendations.length > 0 ? (
              <div className="space-y-12">
                
                {/* AI SPECIFIC DIAGNOSIS & ANALYSIS CARD */}
                {aiResult.intent && (
                  <div className="glass-card p-6 md:p-8 border-[#E5B268]/40 bg-white/5 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={20} className="text-[#E5B268] fill-[#E5B268]" />
                      <h3 className="text-lg font-bold text-white">AI Analysis & Diagnosis</h3>
                    </div>

                    {aiResult.intent.root_cause && (
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#E5B268] mb-1">
                          Root Cause
                        </h4>
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                          {aiResult.intent.root_cause}
                        </p>
                      </div>
                    )}

                    {aiResult.intent.the_fix && (
                      <div className="border-t border-white/10 pt-4">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#E5B268] mb-1">
                          The Fix
                        </h4>
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                          {aiResult.intent.the_fix}
                        </p>
                      </div>
                    )}

                    {aiResult.intent.needs && aiResult.intent.needs.length > 0 && (
                      <div className="border-t border-white/10 pt-4">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#E5B268] mb-2">
                          Identified Needs
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {aiResult.intent.needs.map((need, idx) => (
                            <span key={idx} className="text-xs font-semibold bg-white/10 text-white px-3 py-1 rounded-full border border-white/15">
                              ✓ {need}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* AI BUNDLE RECOMMENDATION (IF APPLICABLE) */}
                {aiResult.bundle && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Zap size={20} className="text-[#E5B268]" /> Recommended Solution Bundle (15% Off)
                    </h3>
                    <div className="max-w-2xl">
                      <BundleCard bundle={aiResult.bundle} />
                    </div>
                  </div>
                )}

                {/* MATCHED PRODUCTS GRID WITH "WHY THIS HELPS" REASONING */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">
                    Matched Products ({aiResult.recommendations.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {aiResult.recommendations.map((product) => (
                      <div key={product.id} className="flex flex-col h-full">
                        <ProductCard product={product} />
                        {/* WHY THIS HELPS BADGE */}
                        <div className="mt-3 p-3 glass-card border-[#E5B268]/30 text-xs text-white/90 leading-relaxed rounded-xl">
                          <span className="font-extrabold text-[#E5B268] block mb-1 uppercase tracking-wider text-[10px]">
                            Why This Helps:
                          </span>
                          {product.whyItHelps}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* NO MATCH / UNRELATED QUERY STATE */
              <div className="glass-card p-12 text-center">
                <AlertCircle size={40} className="mx-auto text-[#E5B268]/60 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">We couldn't find a strong match for this problem</h3>
                <p className="text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
                  Try describing the problem differently (e.g., "neck hurts", "tangled cables", "dark desk"), or browse our curated catalog below.
                </p>
                <button
                  onClick={handleClearSearch}
                  className="btn-primary"
                >
                  Browse All Solutions
                </button>
              </div>
            )}
          </div>
        )}

        {/* DEFAULT CATALOG BROWSER (CATEGORIES & PROBLEMS) */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full hide-scrollbar">
              <button
                onClick={() => setActiveCategory('All')}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                  activeCategory === 'All' 
                    ? 'bg-[#E5B268] text-ink font-bold shadow-sm' 
                    : 'bg-white/10 text-white/80 border border-white/15 hover:bg-white/20 hover:text-white'
                }`}
              >
                All Problems
              </button>
              {problemCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                    activeCategory === cat.id 
                      ? 'bg-[#E5B268] text-ink font-bold shadow-sm' 
                      : 'bg-white/10 text-white/80 border border-white/15 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 rounded-full text-[14px] font-medium text-white hover:bg-white/20 transition-colors"
            >
              <Filter size={16} /> Filters
            </button>
          </div>

          {/* Problems Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProblems.map((problem, i) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ProblemCard problem={problem} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProblems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/70 text-[16px]">No problems found in this category.</p>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default Problems;

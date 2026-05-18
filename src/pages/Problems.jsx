import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ProblemCard from '../components/ProblemCard';
import SearchBar from '../components/SearchBar';
import SectionHeading from '../components/SectionHeading';
import { problems, problemCategories } from '../data/problems';

const Problems = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProblems = useMemo(() => {
    if (activeCategory === 'All') return problems;
    return problems.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-12 pb-24 px-6 min-h-screen bg-warm-white"
    >
      <Helmet>
        <title>Browse Problems - Fixora</title>
        <meta name="description" content="Search by symptoms, annoyances, or daily frustrations. Our AI will match you with the perfect solutions." />
      </Helmet>
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <SectionHeading 
            label="BROWSE PROBLEMS" 
            title="Find the fix for what's bothering you."
            subtitle="Search by symptoms, annoyances, or daily frustrations. Our AI will match you with the perfect solutions."
          />
          
          <div className="mt-8 relative max-w-xl">
            <SearchBar placeholder="E.g., My back hurts when I sit at my desk..." />
            <div className="absolute -bottom-8 left-4 text-[12px] font-medium text-slate-muted flex items-center gap-1.5">
              <Zap size={14} className="text-lime" />
              AI Semantic Search Enabled
            </div>
          </div>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 mt-16 border-b border-border-light pb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full hide-scrollbar">
            <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                activeCategory === 'All' 
                  ? 'bg-ink text-white' 
                  : 'bg-white text-slate-muted border border-border-light hover:border-ink hover:text-ink'
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
                    ? 'bg-ink text-white' 
                    : 'bg-white text-slate-muted border border-border-light hover:border-ink hover:text-ink'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-border-light rounded-full text-[14px] font-medium text-ink hover:bg-soft-white transition-colors"
          >
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Grid */}
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
            <p className="text-slate-muted text-[16px]">No problems found in this category.</p>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default Problems;

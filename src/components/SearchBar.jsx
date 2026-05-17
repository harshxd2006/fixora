import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, Target } from 'lucide-react';
import { useProblemSearch } from '../hooks/useProblemSearch';

const SearchBar = ({ 
  placeholder = "Describe what's bothering you...", 
  autoFocus = false,
  className = "",
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  const { 
    query, 
    setQuery, 
    results, 
    isSearching,
    clearSearch
  } = useProblemSearch();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleResultClick = (problem) => {
    setIsOpen(false);
    clearSearch();
    if (onSelect) {
      onSelect(problem);
    } else {
      navigate(`/problems/${problem.id}`);
    }
  };

  const handleClear = () => {
    clearSearch();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`relative w-full z-40 ${className}`} ref={containerRef}>
      <div className={`
        relative flex items-center w-full h-14 bg-white border rounded-2xl transition-all duration-200
        ${isOpen && query.length > 0 ? 'rounded-b-none border-ink shadow-card' : 'border-border-light hover:border-ink shadow-sm'}
      `}>
        <div className="pl-4 flex-shrink-0 text-slate-muted">
          {isSearching ? (
            <Loader2 size={20} className="animate-spin text-lime" />
          ) : (
            <Search size={20} className={isOpen ? 'text-ink' : ''} />
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none outline-none px-3 text-[15px] text-ink placeholder:text-[#9E9E98]"
        />
        
        {query && (
          <button 
            onClick={handleClear}
            className="pr-4 flex-shrink-0 text-slate-muted hover:text-ink transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border border-t-0 border-ink rounded-b-2xl shadow-card-hover overflow-hidden"
          >
            <div className="max-h-[360px] overflow-y-auto">
              {results.length > 0 ? (
                <ul>
                  {results.map((problem, index) => (
                    <li key={problem.id}>
                      <button
                        onClick={() => handleResultClick(problem)}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-soft-white transition-colors
                          ${index !== results.length - 1 ? 'border-b border-border-light' : ''}
                        `}
                      >
                        <div className="mt-1 w-8 h-8 rounded-lg bg-warm-white flex items-center justify-center flex-shrink-0">
                          <Target size={16} className="text-ink" />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-semibold text-ink line-clamp-1">{problem.title}</h4>
                          <p className="text-[13px] text-slate-muted mt-0.5 line-clamp-1">{problem.shortDesc}</p>
                          
                          {/* Match indicator for AI search */}
                          {problem.matchScore && problem.matchScore > 0 && (
                            <div className="mt-1.5 flex items-center gap-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.5 rounded-sm">
                                {Math.round(problem.matchScore * 100)}% Match
                              </span>
                            </div>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-8 text-center text-slate-muted">
                  <Search size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-[14px]">No problems found matching "{query}"</p>
                  <p className="text-[12px] mt-1">Try describing it differently.</p>
                </div>
              )}
            </div>
            
            <div className="bg-warm-white border-t border-border-light px-4 py-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-muted">AI-Powered Search</span>
              <span className="text-[11px] text-slate-muted bg-white border border-border-light px-1.5 py-0.5 rounded shadow-sm">Enter ↵</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;

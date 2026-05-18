import { useState, useEffect } from 'react';
import { searchProblems } from '../services/api';

export const useProblemSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let active = true;
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(async () => {
      const data = await searchProblems(query);
      if (active) {
        setResults(data);
        setIsSearching(false);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return { query, setQuery, results, isSearching, clearSearch };
};

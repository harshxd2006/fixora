import { useState, useEffect } from 'react';
import { searchProblems } from '../services/api';

export const useProblemSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      setLoading(true);
      const data = await searchProblems(query);
      if (active) {
        setResults(data);
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300); // debounce

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  return { results, loading };
};

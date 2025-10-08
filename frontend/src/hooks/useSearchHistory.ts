import { useState, useEffect } from 'react';

export interface SearchHistoryItem {
  id: string;
  query: string;
  astroId: string;
  planetName: string;
  timestamp: number;
  userEmail: string;
}

export const useSearchHistory = (userEmail: string | undefined) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    if (userEmail) {
      loadHistory();
    }
  }, [userEmail]);

  const loadHistory = () => {
    if (!userEmail) return;
    const stored = localStorage.getItem(`search_history_${userEmail}`);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  };

  const addSearch = (query: string, astroId: string, planetName: string) => {
    if (!userEmail || !query.trim()) return;

    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query: query.trim(),
      astroId,
      planetName,
      timestamp: Date.now(),
      userEmail
    };

    const updatedHistory = [newItem, ...history].slice(0, 50); // Keep last 50 searches
    setHistory(updatedHistory);
    localStorage.setItem(`search_history_${userEmail}`, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    if (!userEmail) return;
    setHistory([]);
    localStorage.removeItem(`search_history_${userEmail}`);
  };

  return { history, addSearch, clearHistory };
};

import React, { createContext, useState, useEffect } from 'react';
import { generateDynamicPath } from '../api/pathGenerator';

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [xp, setXp] = useState(() => {
    try { return parseInt(localStorage.getItem('gem_xp') || '0', 10); } catch(e) { return 0; }
  });

  const [collection, setCollection] = useState(() => {
    try { const raw = localStorage.getItem('gem_collection'); return raw ? JSON.parse(raw) : []; } catch(e){ return []; }
  });
  const [visitedPieces, setVisitedPieces] = useState(() => {
    try { const raw = localStorage.getItem('gem_visited') || '[]'; return JSON.parse(raw); } catch(e){ return []; }
  });

  const [path, setPath] = useState([]);

  useEffect(() => {
    try { localStorage.setItem('gem_xp', String(xp)); } catch(e) {}
  }, [xp]);

  useEffect(() => {
    try { localStorage.setItem('gem_collection', JSON.stringify(collection)); } catch(e) {}
  }, [collection]);

  useEffect(() => {
    try { localStorage.setItem('gem_visited', JSON.stringify(visitedPieces)); } catch(e) {}
  }, [visitedPieces]);

  useEffect(() => {
    try { if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user'); } catch(e) {}
  }, [user]);

  const addXp = (amount = 100) => {
    setXp(prev => Math.max(0, prev + amount));
  };

  const addToCollection = (id, artifact) => {
    if (user?.role === 'guest') {
      alert('Please sign up to save items to your collection.');
      return;
    }
    setCollection(prev => {
      if (prev.find(it => it.id === id)) return prev;
      return [...prev, { id, ...artifact }];
    });
  };

  const addVisitedPiece = (id) => {
    setVisitedPieces(prev => {
      if (prev.includes(id)) return prev;
      // award xp for visiting
      setXp(x => x + 150);
      return [...prev, id];
    });
  };

  const generateAndSetPath = (persona, era) => {
    const newPath = generateDynamicPath(persona, era);
    setPath(newPath);
  };

  const setUserWithSubscription = (userData) => {
    if (userData) {
      setUser({ ...userData, isSubscribed: userData.isSubscribed || false });
    } else {
      setUser(null);
    }
  };

  const value = {
    user,
    setUser: setUserWithSubscription, // Use the new wrapper function
    xp,
    addXp,
    collection,
    addToCollection,
    visitedPieces,
    addVisitedPiece,
    path,
    generateAndSetPath,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

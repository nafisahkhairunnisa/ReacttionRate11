import { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';

const defaultGamification = {
  xp: 150,
  badges: ['badge-starter'],
  currentRank: 'Pelajar Kinetika'
};

const GamificationContext = createContext(null);

export function GamificationProvider({ children }) {
  const [data, setData] = useState(() =>
    getStorageItem(STORAGE_KEYS.GAMIFICATION, defaultGamification)
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.GAMIFICATION, data);
  }, [data]);

  const addXP = (amount) => {
    setData((prev) => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const awardBadge = (badgeId) => {
    setData((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badgeId]
      };
    });
  };

  return (
    <GamificationContext.Provider
      value={{
        xp: data.xp,
        badges: data.badges,
        currentRank: data.currentRank,
        addXP,
        awardBadge,
        hasBadge: (badgeId) => data.badges.includes(badgeId)
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}

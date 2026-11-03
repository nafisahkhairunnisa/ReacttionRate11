import { useContext } from 'react';
import { GamificationContext } from '../context/gamificationContext';

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}

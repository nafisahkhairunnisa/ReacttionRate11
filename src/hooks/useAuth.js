import { useContext } from 'react';
import { AuthContext } from '../context/authContextDef';

/**
 * Custom Hook useAuth
 * Memudahkan akses status autentikasi, info pengguna aktif, login, dan logout.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


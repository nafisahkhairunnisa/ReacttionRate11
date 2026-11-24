import { useState, useEffect } from 'react';
import { AuthContext } from './authContextDef';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/storage';
import { getFriendlyErrorMessage } from '../utils/authErrors';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  doc,
  setDoc,
  getDoc,
  isFirebaseConfigured
} from '../config/firebase';

/**
 * AuthProvider Component - ChemVerse
 * Mendukung autentikasi Firebase asli (Email & Google Sign-In)
 * dengan sinkronisasi profil Firestore serta fallback Local-First.
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() =>
    getStorageItem(STORAGE_KEYS.AUTH, null)
  );
  // Initialize loading directly based on auth presence to avoid synchronous setState in effect
  const [authLoading, setAuthLoading] = useState(() => Boolean(auth));
  const [authError, setAuthError] = useState('');

  // 1. Pantau status autentikasi Firebase secara real-time
  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let userRole = 'siswa';
        let userClass = 'XI MIPA 1';
        let userAvatar = '🧪';

        // Baca profil dari Firestore jika ada
        if (db) {
          try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
              const data = userSnap.data();
              userRole = data.role || userRole;
              userClass = data.className || userClass;
              userAvatar = data.avatar || userAvatar;
            }
          } catch (err) {
            console.warn('[Firestore Read Profile Warning]', err);
          }
        }

        // Cek localStorage jika Firestore belum diset
        const localCached = getStorageItem(STORAGE_KEYS.AUTH, null);
        if (localCached && localCached.id === firebaseUser.uid) {
          userRole = localCached.role || userRole;
          userClass = localCached.className || userClass;
          userAvatar = localCached.avatar || userAvatar;
        }

        const userObj = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Siswa Kinetika',
          role: userRole,
          className: userClass,
          avatar: userAvatar,
          photoURL: firebaseUser.photoURL || null,
          isFirebaseUser: true,
          loggedInAt: new Date().toISOString()
        };

        setCurrentUser(userObj);
        setStorageItem(STORAGE_KEYS.AUTH, userObj);
        if (userObj.name) {
          setStorageItem(STORAGE_KEYS.PROFILE, { name: userObj.name });
        }
      } else {
        // Jika tidak ada user Firebase yang login
        const localCached = getStorageItem(STORAGE_KEYS.AUTH, null);
        if (localCached && !localCached.isFirebaseUser) {
          setCurrentUser(localCached);
        } else {
          setCurrentUser(null);
          removeStorageItem(STORAGE_KEYS.AUTH);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Masuk dengan Email & Password Firebase
  const loginWithEmail = async (email, password) => {
    setAuthError('');
    if (!auth) {
      throw new Error('Firebase Auth belum terhubung. Periksa konfigurasi .env Anda.');
    }
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return cred.user;
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setAuthError(friendlyMsg);
      throw new Error(friendlyMsg);
    }
  };

  // 3. Daftar Akun Baru dengan Email & Password Firebase
  const registerWithEmail = async (email, password, displayName, role = 'siswa', className = 'XI MIPA 1', avatar = '🧪') => {
    setAuthError('');
    if (!auth) {
      throw new Error('Firebase Auth belum terhubung. Periksa konfigurasi .env Anda.');
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // Perbarui Display Name di Firebase Auth
      await updateProfile(user, { displayName });

      // Simpan data profil ke Firestore
      if (db) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            uid: user.uid,
            email,
            name: displayName,
            role,
            className,
            avatar,
            createdAt: new Date().toISOString()
          });
        } catch (dbErr) {
          console.warn('[Firestore Profile Save Warning]', dbErr);
        }
      }

      const userObj = {
        id: user.uid,
        email,
        name: displayName,
        role,
        className,
        avatar,
        photoURL: null,
        isFirebaseUser: true,
        loggedInAt: new Date().toISOString()
      };

      setCurrentUser(userObj);
      setStorageItem(STORAGE_KEYS.AUTH, userObj);
      setStorageItem(STORAGE_KEYS.PROFILE, { name: displayName });

      return userObj;
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setAuthError(friendlyMsg);
      throw new Error(friendlyMsg);
    }
  };

  // 4. Masuk dengan Akun Google (Popup)
  const loginWithGoogle = async (role = 'siswa', className = 'XI MIPA 1', avatar = '⚛️') => {
    setAuthError('');
    if (!auth || !googleProvider) {
      throw new Error('Firebase Google Auth belum terhubung. Periksa konfigurasi .env Anda.');
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Periksa apakah user sudah punya dokumen profil di Firestore
      let finalRole = role;
      let finalClass = className;
      let finalAvatar = avatar;

      if (db) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            finalRole = data.role || role;
            finalClass = data.className || className;
            finalAvatar = data.avatar || avatar;
          } else {
            // Pengguna Google baru, buat dokumen profil awal
            await setDoc(userDocRef, {
              uid: user.uid,
              email: user.email,
              name: user.displayName || user.email?.split('@')[0],
              role: finalRole,
              className: finalClass,
              avatar: finalAvatar,
              photoURL: user.photoURL,
              createdAt: new Date().toISOString()
            });
          }
        } catch (dbErr) {
          console.warn('[Firestore Google Profile Warning]', dbErr);
        }
      }

      const userObj = {
        id: user.uid,
        email: user.email || '',
        name: user.displayName || user.email?.split('@')[0] || 'Siswa Kinetika',
        role: finalRole,
        className: finalClass,
        avatar: finalAvatar,
        photoURL: user.photoURL,
        isFirebaseUser: true,
        loggedInAt: new Date().toISOString()
      };

      setCurrentUser(userObj);
      setStorageItem(STORAGE_KEYS.AUTH, userObj);
      if (userObj.name) {
        setStorageItem(STORAGE_KEYS.PROFILE, { name: userObj.name });
      }

      return userObj;
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setAuthError(friendlyMsg);
      throw new Error(friendlyMsg);
    }
  };

  // 5. Masuk Mode Demo / Offline (Instan untuk pengujian)
  const loginDemo = (userData) => {
    const user = {
      id: userData.id || `demo_${Date.now()}`,
      name: userData.name || 'Siswa Kinetika',
      role: userData.role || 'siswa',
      className: userData.className || 'XI MIPA 1',
      avatar: userData.avatar || '🧪',
      isFirebaseUser: false,
      loggedInAt: new Date().toISOString()
    };
    setCurrentUser(user);
    setStorageItem(STORAGE_KEYS.AUTH, user);
    setStorageItem(STORAGE_KEYS.PROFILE, { name: user.name });
    return user;
  };

  // 6. Keluar (Logout)
  const logout = async () => {
    if (auth && currentUser?.isFirebaseUser) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('[SignOut Error]', err);
      }
    }
    setCurrentUser(null);
    removeStorageItem(STORAGE_KEYS.AUTH);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        isTeacher: currentUser?.role === 'guru',
        isStudent: currentUser?.role === 'siswa',
        authLoading,
        authError,
        isFirebaseConfigured,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginDemo,
        login: loginDemo,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

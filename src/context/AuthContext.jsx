import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { adminLogin, adminLogout, getCurrentUser } from '../services/api';
import { setUnauthorizedHandler, tokenStorage } from '../lib/api-client.js';

const AuthContext = createContext(null);

const ADMIN_STORAGE_KEY = 'chinasky_admin_user';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user) {
  try {
    if (user) localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(ADMIN_STORAGE_KEY);
  } catch { /* ignore */ }
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());
  const [initializing, setInitializing] = useState(() => Boolean(tokenStorage.get()));
  const [error, setError] = useState(null);

  // Rehydrate session on boot
  useEffect(() => {
    let cancelled = false;
    if (!tokenStorage.get()) {
      setInitializing(false);
      return;
    }
    getCurrentUser()
      .then(profile => {
        if (cancelled || !profile) return;
        setUser(profile);
        writeStoredUser(profile);
      })
      .catch(() => {
        if (cancelled) return;
        tokenStorage.clear();
        writeStoredUser(null);
        setUser(null);
      })
      .finally(() => {
        if (!cancelled) setInitializing(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Clear session on 401
  useEffect(() => {
    setUnauthorizedHandler(() => {
      tokenStorage.clear();
      writeStoredUser(null);
      setUser(null);
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const response = await adminLogin(email, password);
      if (response?.token) tokenStorage.set(response.token);
      const nextUser = response?.user || response;
      setUser(nextUser);
      writeStoredUser(nextUser);
      return nextUser;
    } catch (err) {
      setError(err.message || 'Sign in failed');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } catch { /* still clear local state */ }
    tokenStorage.clear();
    writeStoredUser(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, initializing, error, login, logout }),
    [user, initializing, error, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAdminAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside <AdminAuthProvider>');
  return ctx;
};

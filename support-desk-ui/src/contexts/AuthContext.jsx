import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'support-desk-auth';

function readStoredAuth() {
  if (typeof window === 'undefined') {
    return { user: null, token: null };
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }) {
  const initialAuth = readStoredAuth();
  const [user, setUser] = useState(initialAuth.user);
  const [token, setToken] = useState(initialAuth.token);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
  }, [user, token]);

  async function login(email, password) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.message || 'Login failed');
    }

    const data = await response.json();
    setUser(data.user);
    setToken(data.token);
    return data;
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
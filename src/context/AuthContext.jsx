import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';
const Ctx = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user'); return u ? JSON.parse(u) : null;
  });
  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };
  const logout = () => { localStorage.clear(); setUser(null); };
  const refresh = async () => {
    try { const { data } = await api.get('/api/auth/me'); const merged = { ...user, ...data }; localStorage.setItem('user', JSON.stringify(merged)); setUser(merged); } catch {}
  };
  useEffect(() => { if (user) refresh(); /* eslint-disable-next-line */ }, []);
  return <Ctx.Provider value={{ user, login, logout, refresh }}>{children}</Ctx.Provider>;
};
export const useAuth = () => useContext(Ctx);

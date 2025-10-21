import React from 'react';
import AuthContextDefault from '../context/AuthContext';

export function AuthTestProvider({ children, user = { name: 'Test User', email: 'test@example.com' } }) {
  const Ctx = AuthContextDefault || React.createContext({ user: null, login: () => {}, logout: () => {} });
  const value = { user, login: () => {}, logout: () => {} };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

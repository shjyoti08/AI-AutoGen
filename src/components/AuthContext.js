import React, { createContext, useState, } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem('username', user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

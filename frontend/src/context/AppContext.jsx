import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'Guest', balance: 500 });
  const [recharges, setRecharges] = useState([]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  
  const addRecharge = (recharge) => {
    setRecharges(prev => [recharge, ...prev]);
    setUser(prev => ({ ...prev, balance: prev.balance - recharge.amount }));
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, setUser, recharges, addRecharge }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

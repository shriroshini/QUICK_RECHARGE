import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Shri',
    email: 'shri@example.com',
    balance: 1250,
    isLoggedIn: true
  });

  const [recharges, setRecharges] = useState([]);

  const addRecharge = (recharge) => {
    setRecharges(prev => [recharge, ...prev]);
  };

  return (
    <UserContext.Provider value={{ user, setUser, recharges, addRecharge }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

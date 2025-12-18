import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themeColors = {
  light: {
    background: 'bg-gradient-to-br from-[#FCE7EB] via-[#F8D8E0] to-[#FCE7EB]',
    primary: 'bg-[#E4A5B8]',
    secondary: 'bg-[#F8D8E0]',
    accent1: 'bg-[#C53030]',
    accent2: 'bg-[#8B2635]',
    text: 'text-[#3A0713]',
    cardBg: 'bg-[#FCE7EB]/95',
    inputBg: 'bg-[#F8D8E0]/50',
    border: 'border-[#E4A5B8]/40',
    navBg: 'bg-gradient-to-r from-[#FCE7EB]/95 via-[#F8D8E0]/95 to-[#E4A5B8]/95',
    buttonPrimary: 'bg-gradient-to-r from-[#C53030] to-[#8B2635]',
    buttonSecondary: 'bg-gradient-to-r from-[#E4A5B8] to-[#C53030]',
    shadow: 'shadow-[0_20px_50px_rgba(197,48,48,0.3)]',
  },
  dark: {
    background: 'bg-gradient-to-br from-[#3A0713] via-[#5C1322] to-[#3A0713]',
    primary: 'bg-[#8B2635]',
    secondary: 'bg-[#5C1322]',
    accent1: 'bg-[#C53030]',
    accent2: 'bg-[#E4A5B8]',
    text: 'text-[#F8D8E0]',
    cardBg: 'bg-[#5C1322]/90',
    inputBg: 'bg-[#3A0713]/50',
    border: 'border-[#8B2635]/60',
    navBg: 'bg-gradient-to-r from-[#3A0713]/95 via-[#5C1322]/95 to-[#8B2635]/95',
    buttonPrimary: 'bg-gradient-to-r from-[#8B2635] to-[#C53030]',
    buttonSecondary: 'bg-gradient-to-r from-[#C53030] to-[#E4A5B8]',
    shadow: 'shadow-[0_20px_50px_rgba(58,7,19,0.5)]',
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      <div className={`min-h-screen transition-all duration-700 ${colors.background}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

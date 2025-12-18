import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-4 rounded-2xl transition-all duration-500 transform ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#F8D8E0] to-[#E4A5B8] text-[#3A0713] shadow-[#E4A5B8]/50'
          : 'bg-gradient-to-br from-[#8B2635] to-[#C53030] text-white shadow-[#C53030]/50'
      } shadow-2xl hover:scale-110 hover:rotate-12 active:scale-95`}
      aria-label="Toggle theme"
    >
      <div className={`transition-transform duration-500 ${
        theme === 'dark' ? 'rotate-180' : 'rotate-0'
      }`}>
        {theme === 'dark' ? (
          <Sun className="w-8 h-8" />
        ) : (
          <Moon className="w-8 h-8" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;

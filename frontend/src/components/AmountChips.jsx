import React from 'react';
import { useTheme } from '../context/ThemeContext';

function AmountChips({ amounts, selectedAmount, onSelect }) {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {amounts.map((amount) => (
        <button
          key={amount}
          onClick={() => onSelect(amount)}
          className={`py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
            selectedAmount === amount
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105 shadow-xl'
              : theme === 'dark'
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          ₹{amount}
        </button>
      ))}
    </div>
  );
}

export default AmountChips;

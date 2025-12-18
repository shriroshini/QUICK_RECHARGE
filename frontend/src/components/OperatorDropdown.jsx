import React from 'react';
import { useTheme } from '../context/ThemeContext';

function OperatorDropdown({ value, onChange, error }) {
  const { theme } = useTheme();

  const operators = [
    { id: 'airtel', name: 'Airtel', icon: '📱' },
    { id: 'jio', name: 'Jio', icon: '📶' },
    { id: 'vi', name: 'Vi', icon: '📡' },
    { id: 'bsnl', name: 'BSNL', icon: '📞' }
  ];

  return (
    <div>
      <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        Select Operator
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-4 rounded-xl font-semibold text-lg transition-all ${
          theme === 'dark'
            ? 'bg-gray-700 text-white border-gray-600'
            : 'bg-white text-gray-800 border-gray-300'
        } border-2 focus:outline-none focus:ring-4 focus:ring-purple-300 ${
          error ? 'border-red-500' : ''
        }`}
      >
        <option value="">Choose operator...</option>
        {operators.map(op => (
          <option key={op.id} value={op.id}>
            {op.icon} {op.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1 font-semibold">{error}</p>}
    </div>
  );
}

export default OperatorDropdown;

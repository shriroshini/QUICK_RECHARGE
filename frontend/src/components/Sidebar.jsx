import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function Sidebar({ activePage }) {
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'recharge', icon: '📱', label: 'Recharge' },
    { id: 'plans', icon: '💳', label: 'Plans' },
    { id: 'history', icon: '📊', label: 'History' },
    { id: 'offers', icon: '🎁', label: 'Offers' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <aside className={`${
      isCollapsed ? 'w-20' : 'w-64'
    } ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } rounded-3xl shadow-2xl p-4 transition-all duration-300 hidden lg:block`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`w-full p-3 rounded-xl mb-4 font-bold ${
          theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <nav className="space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`w-full p-4 rounded-xl font-bold transition-all flex items-center gap-3 ${
              activePage === item.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

import React from 'react';
import { useTheme } from '../context/ThemeContext';

function UserGreeting({ name, balance, isLoggedIn, loginTime }) {
  const { theme, colors } = useTheme();

  if (!isLoggedIn) {
    return (
      <div className={`p-8 rounded-3xl shadow-2xl backdrop-blur-xl border-4 ${colors.border} ${colors.cardBg} transition-all duration-500`}>
        <p className={`text-2xl font-bold ${colors.text}`}>
          🔒 Please login to continue
        </p>
      </div>
    );
  }

  return (
    <div className={`p-10 rounded-3xl shadow-2xl mb-8 backdrop-blur-xl border-4 transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-[#483D8B] via-[#9370DB] to-[#AA98A9] border-[#9370DB]' 
        : 'bg-gradient-to-r from-[#E6E6FA] via-[#FFDAB9] to-[#B0E0E6] border-[#E6E6FA]'
    }`}>
      <h2 className={`text-5xl font-black mb-3 ${
        theme === 'dark' ? 'text-[#C0C0C0]' : 'text-[#36454F]'
      }`}>
        Welcome back, {name}! 👋
      </h2>
      <p className={`text-lg font-semibold mb-6 ${
        theme === 'dark' ? 'text-[#C0C0C0]/80' : 'text-[#36454F]/80'
      }`}>
        Last login: {loginTime || 'Just now'}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <div className={`backdrop-blur-md px-8 py-4 rounded-full border-3 shadow-xl ${
          theme === 'dark' ? 'bg-[#9370DB]/40 border-[#AA98A9]' : 'bg-white/60 border-[#FFDAB9]'
        }`}>
          <p className={`font-black text-2xl ${
            theme === 'dark' ? 'text-[#FFDAB9]' : 'text-[#5F9EA0]'
          }`}>
            💰 Balance: ₹{balance}
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-8 py-4 rounded-full shadow-xl border-3 border-white">
          <p className="text-white font-black text-xl">✓ Verified Account</p>
        </div>
        <div className={`backdrop-blur-md px-8 py-4 rounded-full border-3 shadow-xl ${
          theme === 'dark' ? 'bg-[#5F9EA0]/40 border-[#B0E0E6]' : 'bg-[#F5FFFA]/60 border-[#B0E0E6]'
        }`}>
          <p className={`font-black text-xl ${
            theme === 'dark' ? 'text-[#B0E0E6]' : 'text-[#36454F]'
          }`}>
            ⭐ Premium Member
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserGreeting;

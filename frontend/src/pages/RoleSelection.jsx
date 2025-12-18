import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function RoleSelection() {
  const { theme, colors } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-500 ${colors.background} flex items-center justify-center px-6`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className={`text-6xl font-black mb-8 drop-shadow-lg ${colors.gradientText}`}>
          Choose Your Role
        </h1>
        <p className={`text-2xl font-bold mb-16 ${colors.text}`}>
          Select how you want to access the platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Link
            to="/admin-login"
            className={`group p-12 rounded-3xl backdrop-blur-xl border-4 shadow-2xl hover:scale-105 transition-all duration-500 ${colors.cardBg} ${colors.border} ${colors.shadow}`}
          >
            <h2 className={`text-4xl font-black mb-4 ${colors.text}`}>
              Admin
            </h2>
            <p className={`text-xl font-semibold ${colors.text} opacity-80`}>
              Manage plans, users, and system settings
            </p>
            <div className={`mt-8 px-8 py-4 ${colors.buttonPrimary} text-white font-black text-xl rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
              Admin Login
            </div>
          </Link>

          <Link
            to="/login"
            className={`group p-12 rounded-3xl backdrop-blur-xl border-4 shadow-2xl hover:scale-105 transition-all duration-500 ${colors.cardBg} ${colors.border} ${colors.shadow}`}
          >
            <h2 className={`text-4xl font-black mb-4 ${colors.text}`}>
              User
            </h2>
            <p className={`text-xl font-semibold ${colors.text} opacity-80`}>
              Recharge your mobile and manage your account
            </p>
            <div className={`mt-8 px-8 py-4 ${colors.buttonPrimary} text-white font-black text-xl rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
              User Login
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
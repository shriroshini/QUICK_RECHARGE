import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuthIntegrated } from '../context/AuthContextIntegrated';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

function NavbarIntegrated() {
  const { theme, colors } = useTheme();
  const { isLoggedIn, user, logout } = useAuthIntegrated();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      colors.navBg
    } border-b-4 ${colors.border} shadow-2xl backdrop-blur-xl`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">

            <h1 className={`text-3xl font-black transition-all duration-300 ${
              theme === 'dark' ? 'text-[#F8D8E0]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#8B2635] via-[#C53030] to-[#E4A5B8]'
            }`}>
              QuickRecharge
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`font-bold text-lg transition-all hover:scale-110 px-3 py-2 rounded-xl ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-[#C53030] to-[#8B2635] text-white'
                  : `${colors.text} hover:bg-white/20`
              }`}
            >
              Home
            </Link>
            <Link
              to="/plans"
              className={`font-bold text-lg transition-all hover:scale-110 px-3 py-2 rounded-xl ${
                isActive('/plans') 
                  ? 'bg-gradient-to-r from-[#C53030] to-[#8B2635] text-white'
                  : `${colors.text} hover:bg-white/20`
              }`}
            >
              Plans
            </Link>
            {isLoggedIn && (
              <Link
                to="/history"
                className={`font-bold text-lg transition-all hover:scale-110 px-3 py-2 rounded-xl ${
                  isActive('/history') 
                    ? 'bg-gradient-to-r from-[#C53030] to-[#8B2635] text-white'
                    : `${colors.text} hover:bg-white/20`
                }`}
              >
                History
              </Link>
            )}
            
            <ThemeToggle />

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 ${
                  theme === 'dark' ? 'bg-[#5C1322]/40' : 'bg-[#F8D8E0]/60'
                } backdrop-blur-md border-2 ${colors.border} shadow-lg`}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C53030] to-[#8B2635] flex items-center justify-center text-white font-black text-xl border-3 border-white shadow-lg">
                    {user?.username?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                  <span className={`font-bold text-lg ${colors.text}`}>
                    Welcome, {user?.username || user?.email?.split('@')[0] || 'User'}!
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className={`font-bold text-lg transition-all hover:scale-110 px-4 py-2 rounded-xl ${
                    isActive('/login') 
                      ? 'bg-gradient-to-r from-[#C53030] to-[#8B2635] text-white'
                      : `${colors.text} hover:bg-white/20`
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-gradient-to-r from-[#C53030] to-[#8B2635] text-white font-black rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8 text-gray-600" />
            ) : (
              <Menu className="w-8 h-8 text-gray-600" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3">
            <Link to="/" className="block py-2 font-bold">
              Home
            </Link>
            <Link to="/plans" className="block py-2 font-bold">
              Plans
            </Link>
            {isLoggedIn && (
              <Link to="/history" className="block py-2 font-bold">
                History
              </Link>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/login" className="block py-2 font-bold">
                  Login
                </Link>
                <Link to="/signup" className="block py-2 font-bold">
                  Signup
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button onClick={logout} className="block py-2 font-bold text-red-500">
                Logout
              </button>
            )}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarIntegrated;
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuthIntegrated } from '../context/AuthContextIntegrated';

function UserHome() {
  const { theme, colors } = useTheme();
  const { user } = useAuthIntegrated();

  const quickActions = [
    { title: 'Recharge Plans', desc: 'Browse and select plans', link: '/plans', icon: '📱' },
    { title: 'Quick Recharge', desc: 'Instant mobile recharge', link: '/recharge', icon: '⚡' },
    { title: 'Recharge History', desc: 'View past transactions', link: '/history', icon: '📋' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${colors.background} py-12 px-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-6xl font-black mb-4 drop-shadow-lg ${colors.gradientText}`}>
            Welcome, {user?.name || 'User'}!
          </h1>
          <p className={`text-2xl font-bold ${colors.text}`}>
            Your mobile recharge dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`group p-8 rounded-3xl backdrop-blur-xl border-4 shadow-2xl hover:scale-105 transition-all duration-500 ${colors.cardBg} ${colors.border} ${colors.shadow}`}
            >
              <div className="text-6xl mb-4 text-center">{action.icon}</div>
              <h3 className={`text-2xl font-black mb-3 text-center ${colors.text}`}>
                {action.title}
              </h3>
              <p className={`text-lg font-semibold text-center ${colors.text} opacity-80`}>
                {action.desc}
              </p>
            </Link>
          ))}
        </div>

        <div className={`p-8 rounded-3xl backdrop-blur-xl border-4 shadow-2xl ${colors.cardBg} ${colors.border} ${colors.shadow} text-center`}>
          <h2 className={`text-3xl font-black mb-4 ${colors.text}`}>
            Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-[#9370DB]/30' : 'bg-white/80'}`}>
              <p className={`text-2xl font-black ${colors.text}`}>Total Recharges</p>
              <p className={`text-4xl font-black ${colors.text} mt-2`}>0</p>
            </div>
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-[#9370DB]/30' : 'bg-white/80'}`}>
              <p className={`text-2xl font-black ${colors.text}`}>Amount Spent</p>
              <p className={`text-4xl font-black ${colors.text} mt-2`}>₹0</p>
            </div>
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-[#9370DB]/30' : 'bg-white/80'}`}>
              <p className={`text-2xl font-black ${colors.text}`}>Cashback Earned</p>
              <p className={`text-4xl font-black ${colors.text} mt-2`}>₹0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
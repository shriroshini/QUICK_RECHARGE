import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

function RechargeHistory() {
  const { theme, colors } = useTheme();
  const { recharges } = useUser();
  const [isExpanded, setIsExpanded] = useState(true);

  const statusColors = {
    success: 'bg-green-500',
    pending: 'bg-yellow-500',
    failed: 'bg-red-500'
  };

  return (
    <div className={`p-8 rounded-3xl shadow-2xl backdrop-blur-xl border-4 transition-all duration-500 ${
      colors.border
    } ${colors.cardBg}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-4xl font-black ${colors.text}`}>
          Recent Recharges
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:scale-110 ${
            theme === 'dark' ? 'bg-[#9370DB] text-white' : 'bg-[#FFDAB9] text-[#36454F]'
          }`}
        >
          {isExpanded ? '▲ Hide' : '▼ Show'}
        </button>
      </div>

      {isExpanded && (
        <div className="animate-fadeIn">
          {recharges.length === 0 ? (
            <p className={`text-center py-8 text-xl font-bold ${colors.text}`}>
              No recharges yet. Start your first recharge!
            </p>
          ) : (
            <div className="space-y-4">
              {recharges.map(recharge => (
                <div
                  key={recharge.id}
                  className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 border-3 shadow-xl ${
                    theme === 'dark' ? 'bg-[#9370DB]/30 border-[#AA98A9]' : 'bg-white/80 border-[#E6E6FA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-3xl font-black ${colors.text}`}>
                        ₹{recharge.amount}
                      </p>
                      <p className={`font-bold text-lg mt-1 ${
                        theme === 'dark' ? 'text-[#C0C0C0]/70' : 'text-[#36454F]/70'
                      }`}>
                        {recharge.number}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`${statusColors[recharge.status]} text-white px-5 py-3 rounded-full font-black text-sm shadow-lg border-2 border-white`}>
                        {recharge.status.toUpperCase()}
                      </span>
                      <p className={`text-sm mt-2 font-semibold ${
                        theme === 'dark' ? 'text-[#C0C0C0]/70' : 'text-[#36454F]/70'
                      }`}>
                        {recharge.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RechargeHistory;

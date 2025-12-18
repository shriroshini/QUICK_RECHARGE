import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function InteractiveToggles() {
  const { theme, colors } = useTheme();
  const [showRecharges, setShowRecharges] = useState(true);
  const [autoRecharge, setAutoRecharge] = useState(false);
  const [savePayment, setSavePayment] = useState(false);

  return (
    <div className={`p-8 rounded-3xl shadow-2xl transition-all duration-500 backdrop-blur-xl border-4 ${
      colors.border
    } ${colors.cardBg}`}>
      <h3 className={`text-3xl font-black mb-6 ${colors.text}`}>
        ⚙️ Settings & Preferences
      </h3>

      <div className="space-y-6">
        {/* Show/Hide Recent Recharges Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-bold text-lg ${colors.text}`}>Show Recent Recharges</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-[#C0C0C0]/70' : 'text-[#36454F]/70'}`}>
              Display transaction history
            </p>
          </div>
          <button
            onClick={() => setShowRecharges(!showRecharges)}
            className={`relative w-20 h-10 rounded-full transition-all duration-500 ${
              showRecharges
                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                : theme === 'dark' ? 'bg-[#483D8B]' : 'bg-gray-300'
            } shadow-lg`}
          >
            <span
              className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-500 ${
                showRecharges ? 'translate-x-10' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Auto-recharge Switch */}
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-bold text-lg ${colors.text}`}>Auto-Recharge</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-[#C0C0C0]/70' : 'text-[#36454F]/70'}`}>
              Automatic balance top-up
            </p>
          </div>
          <button
            onClick={() => setAutoRecharge(!autoRecharge)}
            className={`relative w-20 h-10 rounded-full transition-all duration-500 ${
              autoRecharge
                ? 'bg-gradient-to-r from-[#FFDAB9] to-[#B0E0E6]'
                : theme === 'dark' ? 'bg-[#483D8B]' : 'bg-gray-300'
            } shadow-lg`}
          >
            <span
              className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-500 ${
                autoRecharge ? 'translate-x-10' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Save Payment Method Checkbox */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSavePayment(!savePayment)}
            className={`w-8 h-8 rounded-lg border-4 transition-all duration-300 flex items-center justify-center ${
              savePayment
                ? 'bg-gradient-to-br from-[#E6E6FA] to-[#FFDAB9] border-[#FFDAB9] scale-110'
                : `${colors.border} ${theme === 'dark' ? 'bg-[#483D8B]' : 'bg-white'}`
            }`}
          >
            {savePayment && <span className="text-2xl">✓</span>}
          </button>
          <div>
            <p className={`font-bold text-lg ${colors.text}`}>Save Payment Method</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-[#C0C0C0]/70' : 'text-[#36454F]/70'}`}>
              Remember for future transactions
            </p>
          </div>
        </div>
      </div>

      {/* Status Display */}
      <div className={`mt-6 p-4 rounded-2xl ${
        theme === 'dark' ? 'bg-[#9370DB]/30' : 'bg-[#E6E6FA]/50'
      } border-2 ${colors.border}`}>
        <p className={`font-bold ${colors.text}`}>
          Current Settings: 
          <span className={showRecharges ? 'text-green-500' : 'text-red-500'}> History {showRecharges ? 'ON' : 'OFF'}</span> | 
          <span className={autoRecharge ? 'text-green-500' : 'text-red-500'}> Auto {autoRecharge ? 'ON' : 'OFF'}</span> | 
          <span className={savePayment ? 'text-green-500' : 'text-red-500'}> Save {savePayment ? 'ON' : 'OFF'}</span>
        </p>
      </div>
    </div>
  );
}

export default InteractiveToggles;

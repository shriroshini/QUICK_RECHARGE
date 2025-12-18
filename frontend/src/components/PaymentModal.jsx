import React from 'react';
import { useTheme } from '../context/ThemeContext';

function PaymentModal({ isOpen, onClose, amount, mobileNumber }) {
  const { theme, colors } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative z-10 w-full max-w-md p-8 rounded-3xl shadow-2xl transition-all duration-500 transform scale-100 border-4 ${
        colors.border
      } ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-[#483D8B] to-[#9370DB]' 
          : 'bg-gradient-to-br from-[#FFFFF0] to-[#E6E6FA]'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full font-bold text-2xl transition-all hover:scale-110 hover:rotate-90 ${
            theme === 'dark' ? 'bg-[#9370DB] text-white' : 'bg-[#FFDAB9] text-[#36454F]'
          }`}
        >
          ×
        </button>

        <div className="text-center">
          <div className="text-6xl mb-4">💳</div>
          <h2 className={`text-3xl font-black mb-4 ${colors.text}`}>
            Confirm Payment
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${
            theme === 'dark' ? 'bg-[#9370DB]/40' : 'bg-white/80'
          } backdrop-blur-sm border-2 ${colors.border}`}>
            <p className={`text-lg font-bold mb-2 ${colors.text}`}>
              Mobile Number
            </p>
            <p className={`text-2xl font-black mb-4 ${
              theme === 'dark' ? 'text-[#FFDAB9]' : 'text-[#9370DB]'
            }`}>
              {mobileNumber}
            </p>
            
            <p className={`text-lg font-bold mb-2 ${colors.text}`}>
              Amount
            </p>
            <p className={`text-4xl font-black ${
              theme === 'dark' ? 'text-[#B0E0E6]' : 'text-[#5F9EA0]'
            }`}>
              ₹{amount}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              ✓ Confirm Payment
            </button>
            <button
              onClick={onClose}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#483D8B] text-white hover:bg-[#9370DB]' 
                  : 'bg-gray-200 text-[#36454F] hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;

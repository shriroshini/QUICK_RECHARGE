import React from 'react';
import { useTheme } from '../context/ThemeContext';
import RechargeHistory from '../components/RechargeHistory';

function History() {
  const { colors } = useTheme();

  return (
    <div className="min-h-screen transition-all duration-700">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-6xl font-black mb-4 drop-shadow-lg animate-pulse ${colors.gradientText}`}>
            Recharge History
          </h1>
          <p className={`text-2xl font-bold ${colors.text}`}>
            Track all your recharge transactions
          </p>
        </div>
        
        <RechargeHistory />
      </div>
    </div>
  );
}

export default History;
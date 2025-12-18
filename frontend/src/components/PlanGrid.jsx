import React from 'react';
import PlanCard from './PlanCard';
import { useTheme } from '../context/ThemeContext';

function PlanGrid({ plans }) {
  const { theme, colors } = useTheme();

  return (
    <div className="mb-12">
      <div className={`text-center mb-10 p-8 rounded-3xl backdrop-blur-xl border-4 shadow-2xl transition-all duration-500 ${
        colors.border
      } ${colors.cardBg}`}>
        <h2 className={`text-5xl font-black mb-4 ${colors.text}`}>
          🔥 Popular Recharge Plans
        </h2>
        <p className={`text-xl font-bold ${
          theme === 'dark' ? 'text-[#C0C0C0]/80' : 'text-[#36454F]/80'
        }`}>
          Choose the perfect plan for your needs - Props demonstration with different badges!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map(plan => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}

export default PlanGrid;

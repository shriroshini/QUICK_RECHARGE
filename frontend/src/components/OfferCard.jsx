import React from 'react';
import { useTheme } from '../context/ThemeContext';

function OfferCard({ offer }) {
  const { theme, colors } = useTheme();

  return (
    <div className={`p-6 rounded-3xl backdrop-blur-xl border-4 shadow-2xl hover:scale-105 transition-all duration-500 ${colors.cardBg} ${colors.border} ${colors.shadow}`}>
      <div className="text-center">
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-black mb-4 ${
          offer.simType === 'Prepaid' 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          {offer.simType}
        </div>
        
        <h3 className={`text-2xl font-black mb-3 ${colors.text}`}>
          {offer.title}
        </h3>
        
        <p className={`text-lg font-semibold mb-4 ${colors.text} opacity-80`}>
          {offer.description}
        </p>
        
        <div className={`text-4xl font-black mb-4 ${colors.text}`}>
          {offer.discount}% OFF
        </div>
        
        <button className={`w-full py-3 ${colors.buttonPrimary} text-white font-black rounded-2xl shadow-lg hover:scale-105 transition-all duration-300`}>
          Apply Offer
        </button>
      </div>
    </div>
  );
}

export default OfferCard;
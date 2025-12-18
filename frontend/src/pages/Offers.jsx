import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import OfferCard from '../components/OfferCard';
import { offerService } from '../services/offerService';
import { Loader, AlertCircle } from 'lucide-react';

function Offers() {
  const { colors } = useTheme();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await offerService.getOffers();
      setOffers(response.offers || []);
    } catch (err) {
      setError('Failed to load offers. Please try again.');
      console.error('Error fetching offers:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOffers = filter === 'all' 
    ? offers 
    : offers.filter(offer => offer.simType.toLowerCase() === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-[#C53030]" />
          <p className={`text-xl font-bold ${colors.text}`}>Loading offers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <p className="text-xl font-bold text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchOffers}
            className={`px-6 py-3 rounded-xl font-bold ${colors.buttonPrimary} text-white`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-all duration-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-6xl font-black mb-4 drop-shadow-lg animate-pulse ${colors.gradientText}`}>
            Special Offers
          </h1>
          <p className={`text-2xl font-bold ${colors.text}`}>
            Grab the best deals and discounts
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-8 py-4 rounded-3xl font-black text-lg transition-all duration-500 shadow-xl hover:scale-105 ${
                filter === 'all'
                  ? `${colors.buttonPrimary} text-white scale-110 ${colors.shadow}`
                  : `${colors.cardBg} ${colors.text} ${colors.shadow}`
              } backdrop-blur-md border-2 border-white/50`}
            >
              All Offers
            </button>
            <button
              onClick={() => setFilter('prepaid')}
              className={`px-8 py-4 rounded-3xl font-black text-lg transition-all duration-500 shadow-xl hover:scale-105 ${
                filter === 'prepaid'
                  ? `${colors.buttonPrimary} text-white scale-110 ${colors.shadow}`
                  : `${colors.cardBg} ${colors.text} ${colors.shadow}`
              } backdrop-blur-md border-2 border-white/50`}
            >
              Prepaid
            </button>
            <button
              onClick={() => setFilter('postpaid')}
              className={`px-8 py-4 rounded-3xl font-black text-lg transition-all duration-500 shadow-xl hover:scale-105 ${
                filter === 'postpaid'
                  ? `${colors.buttonPrimary} text-white scale-110 ${colors.shadow}`
                  : `${colors.cardBg} ${colors.text} ${colors.shadow}`
              } backdrop-blur-md border-2 border-white/50`}
            >
              Postpaid
            </button>
          </div>
        </div>

        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-xl font-bold ${colors.text}`}>No offers available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {filteredOffers.map(offer => (
              <OfferCard key={offer._id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Offers;
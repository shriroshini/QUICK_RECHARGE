import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import PlanCard from '../components/PlanCard';
import { planService } from '../services/planService';
import { Loader, AlertCircle } from 'lucide-react';

function RechargePlansIntegrated() {
  const { colors } = useTheme();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await planService.getPlans();
      setPlans(response.plans || []);
    } catch (err) {
      setError('Failed to load plans. Please try again.');
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = activeFilter === 'all' 
    ? plans 
    : plans.filter(plan => plan.category?.toLowerCase() === activeFilter);

  const filters = [
    { id: 'all', label: 'All Plans' },
    { id: 'prepaid', label: 'Prepaid' },
    { id: 'postpaid', label: 'Postpaid' },
    { id: 'topup', label: 'Topup' },
    { id: 'data', label: 'Data Plans' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-[#C53030]" />
          <p className={`text-xl font-bold ${colors.text}`}>Loading plans...</p>
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
            onClick={fetchPlans}
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
            Browse All Recharge Plans
          </h1>
          <p className={`text-2xl font-bold ${colors.text}`}>
            Find the perfect plan for your needs
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-8 py-4 rounded-3xl font-black text-lg transition-all duration-500 shadow-xl hover:scale-105 ${
                  activeFilter === filter.id
                    ? `${colors.buttonPrimary} text-white scale-110 ${colors.shadow}`
                    : `${colors.cardBg} ${colors.text} ${colors.shadow}`
                } backdrop-blur-md border-2 border-white/50`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className={`mb-8 p-6 rounded-3xl text-center ${colors.cardBg} backdrop-blur-md border-2 border-white/60 shadow-xl ${colors.shadow} transition-all duration-700`}>
            <h2 className={`text-3xl font-black ${colors.gradientText}`}>
              <span className="mr-2">{filters.find(f => f.id === activeFilter)?.icon}</span>
              {filters.find(f => f.id === activeFilter)?.label}
            </h2>
            <p className={`text-lg font-semibold mt-2 ${colors.text}`}>
              {filteredPlans.length} plans available
            </p>
          </div>

          {filteredPlans.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-xl font-bold ${colors.text}`}>No plans available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
              {filteredPlans.map(plan => (
                <div
                  key={plan._id}
                  className="transform hover:scale-105 transition-all duration-300"
                >
                  <PlanCard plan={{
                    id: plan._id,
                    price: plan.price,
                    validity: plan.validity,
                    data: plan.data,
                    calls: 'Unlimited',
                    features: plan.description || 'Standard features'
                  }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RechargePlansIntegrated;
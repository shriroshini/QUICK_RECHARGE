import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import PlanCard from '../components/PlanCard';
import PromoBanner from '../components/PromoBanner';


function LandingPage() {
  const { theme, colors } = useTheme();

  const featuredPlans = [
    { id: 1, price: 199, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited', features: '100 SMS/day, Free roaming', badge: 'Best Value' },
    { id: 2, price: 299, validity: '28 days', data: '2GB/day', calls: 'Unlimited', features: '100 SMS/day, Free roaming', badge: 'Most Popular' },
    { id: 3, price: 399, validity: '56 days', data: '2GB/day', calls: 'Unlimited', features: '100 SMS/day, Free roaming', badge: 'Trending' }
  ];

  const features = [
    { title: 'Lightning Fast', desc: 'Instant recharges in seconds' },
    { title: 'Secure Payments', desc: 'Bank-grade security' },
    { title: 'Best Cashback', desc: 'Up to 10% cashback on every recharge' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${colors.background}`}>
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <PromoBanner />
        </div>
      </section>

      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#8B2635]/20' : 'bg-[#E4A5B8]/20'} backdrop-blur-sm`}></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className={`text-7xl font-black ${colors.text} mb-6 drop-shadow-2xl animate-pulse`}>
            Welcome to QuickRecharge
          </h1>
          <p className={`text-3xl font-bold ${colors.text} mb-12 drop-shadow-lg`}>
            Lightning-fast mobile recharges with best offers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/role-selection"
              className={`px-12 py-6 ${colors.buttonPrimary} text-white font-black text-2xl rounded-3xl shadow-2xl hover:scale-110 ${colors.shadow} transition-all duration-500 border-4 border-white/70 backdrop-blur-sm`}
            >
Get Started
            </Link>
            <Link
              to="/plans"
              className={`px-12 py-6 ${colors.cardBg} backdrop-blur-xl ${colors.text} font-black text-2xl rounded-3xl ${colors.border} border-4 hover:scale-110 ${colors.shadow} transition-all duration-500`}
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-black text-center mb-16 drop-shadow-lg ${theme === 'dark' ? 'text-[#F8D8E0]' : 'bg-gradient-to-r from-[#8B2635] to-[#C53030] bg-clip-text text-transparent'}`}>
            Why Choose QuickRecharge?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl backdrop-blur-xl border-4 border-white/60 shadow-2xl hover:scale-105 transition-all duration-500 ${colors.cardBg} ${colors.shadow}`}
              >

                <h3 className={`text-2xl font-black mb-4 text-center ${colors.text}`}>
                  {feature.title}
                </h3>
                <p className={`text-lg font-semibold text-center ${colors.text}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-black text-center mb-16 drop-shadow-lg ${theme === 'dark' ? 'text-[#F8D8E0]' : 'bg-gradient-to-r from-[#8B2635] to-[#C53030] bg-clip-text text-transparent'}`}>
            Featured Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPlans.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/plans"
              className={`px-10 py-4 ${colors.buttonPrimary} text-white font-black text-xl rounded-3xl shadow-2xl hover:scale-110 ${colors.shadow} transition-all duration-500`}
            >
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`p-12 rounded-3xl backdrop-blur-xl border-4 border-white/60 shadow-2xl transition-all duration-700 ${colors.cardBg} ${colors.shadow}`}>
            <h2 className={`text-4xl font-black mb-6 ${theme === 'dark' ? 'text-[#F8D8E0]' : 'bg-gradient-to-r from-[#8B2635] to-[#C53030] bg-clip-text text-transparent'}`}>
              Ready to Start Recharging?
            </h2>
            <p className={`text-xl font-semibold mb-8 ${colors.text}`}>
              Join thousands of satisfied customers and experience the fastest recharge service!
            </p>
            <Link
              to="/login"
              className={`px-12 py-6 ${colors.buttonPrimary} text-white font-black text-2xl rounded-3xl shadow-2xl hover:scale-110 ${colors.shadow} transition-all duration-500 border-4 border-white/70 backdrop-blur-sm animate-pulse`}
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
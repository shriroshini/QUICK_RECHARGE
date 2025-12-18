import React, { useState, useEffect } from 'react';
import { Sparkles, Tv, Smartphone, Gift, Star, Crown, Zap, Diamond, ChevronLeft, ChevronRight } from 'lucide-react';

function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const banners = [
    {
      id: 1,
      gradient: 'from-[#3A0713] via-[#5C1322] to-[#8B2635]',
      title: '2-Month FREE',
      subtitle: 'Premium Plans',
      description: 'Exclusive Recharge Benefits • Unlimited Data • All OTT Apps',
      price: '₹299',
      validity: '2GB/day • 28 days',
      icon: <Gift className="w-8 h-8 text-yellow-400 animate-pulse" />,
      label: 'SPECIAL OFFER'
    },
    {
      id: 2,
      gradient: 'from-[#8B2635] via-[#C53030] to-[#E4A5B8]',
      title: '50% OFF',
      subtitle: 'Annual Plans',
      description: 'Save Big • 365 Days Validity • Premium Benefits',
      price: '₹999',
      validity: '5GB/day • 365 days',
      icon: <Crown className="w-8 h-8 text-gold-400 animate-pulse" />,
      label: 'LIMITED TIME'
    },
    {
      id: 3,
      gradient: 'from-[#C53030] via-[#E4A5B8] to-[#F8D8E0]',
      title: 'CASHBACK',
      subtitle: 'Up to ₹500',
      description: 'Instant Cashback • All Operators • Quick Recharge',
      price: '₹199',
      validity: '1.5GB/day • 28 days',
      icon: <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />,
      label: 'MEGA DEAL'
    },
    {
      id: 4,
      gradient: 'from-[#E4A5B8] via-[#F8D8E0] to-[#FCE7EB]',
      title: 'PREMIUM',
      subtitle: 'OTT Bundle',
      description: 'Netflix + Prime + Disney+ • HD Streaming • No Ads',
      price: '₹599',
      validity: '3GB/day • 84 days',
      icon: <Diamond className="w-8 h-8 text-cyan-400 animate-pulse" />,
      label: 'EXCLUSIVE'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
  };

  const currentBanner = banners[currentSlide];

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-3xl shadow-2xl">
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div 
            key={banner.id}
            className={`min-w-full h-full relative bg-gradient-to-br ${banner.gradient}`}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse"></div>
            
            {/* Moving Particles */}
            <div className="absolute inset-0">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Sliding Curtain Effect */}
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-red-700/80 to-transparent transform translate-x-0 animate-pulse"></div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex items-center justify-between px-12">
              {/* Left Content */}
              <div className="flex-1 space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3">
                  {banner.icon}
                  <span className="text-yellow-400 font-bold text-lg tracking-wider">{banner.label}</span>
                </div>
                
                <h1 className="text-5xl font-black text-white leading-tight">
                  <span className="bg-gradient-to-r from-[#C53030] via-[#E4A5B8] to-[#F8D8E0] bg-clip-text text-transparent animate-pulse">
                    {banner.title}
                  </span>
                  <br />
                  <span className="text-white">{banner.subtitle}</span>
                </h1>
                
                <p className="text-xl text-blue-200 font-semibold">
                  {banner.description}
                </p>
                
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-[#C53030] to-[#8B2635] text-white font-black text-lg rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 animate-bounce">
                    <Gift className="w-6 h-6 inline mr-2" />
                    Claim Now
                  </button>
                  <button className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right Device */}
              <div className="flex-1 flex justify-center items-center">
                <div className="relative animate-float">
                  <div className="w-64 h-80 bg-gradient-to-b from-gray-800 to-black rounded-3xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-4 relative overflow-hidden">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Smartphone className="w-6 h-6 text-white" />
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="w-1 h-4 bg-green-400 rounded-full animate-pulse"></div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-center text-white">
                          <h3 className="text-lg font-bold">{banner.price} Plan</h3>
                          <p className="text-sm opacity-80">{banner.validity}</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {['Netflix', 'Prime', 'Disney+', 'Hotstar', 'Zee5', 'Sony'].map((app, i) => (
                            <div key={i} className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:scale-110 transition-transform">
                              <Tv className="w-6 h-6 text-white" />
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 p-3 bg-green-500/20 rounded-xl border border-green-400/30 animate-pulse">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 animate-spin" />
                            <span className="text-white text-sm font-bold">Special Offer!</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl -z-10 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-br from-[#E4A5B8] to-[#C53030] transform rotate-45 animate-ping opacity-70"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${5 + Math.random() * 90}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1.5 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentSlide(index); setIsAutoPlaying(false); }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default PromoBanner;

// Add custom animations to index.css
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// @keyframes float {
//   0%, 100% { transform: translateY(0px) rotate(3deg); }
//   50% { transform: translateY(-10px) rotate(0deg); }
// }
// .animate-fadeIn { animation: fadeIn 1s ease-out; }
// .animate-float { animation: float 3s ease-in-out infinite; }
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, X } from 'lucide-react';

function SuccessModal({ isOpen, onClose, plan, rechargedNumber, transactionId, paymentMethod }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-white via-green-50 to-emerald-100 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-bounceIn border-4 border-green-200" style={{ position: 'relative', zIndex: 10000 }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Success Animation */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <CheckCircle className="w-20 h-20 text-green-500 animate-pulse mx-auto mb-4" />
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-green-500/20 animate-ping mx-auto" />
          </div>
          <h2 className="text-3xl font-black text-green-700 mb-2 animate-slideUp">
            Recharge Successful!
          </h2>
          <p className="text-lg font-bold text-green-600 animate-slideUp delay-100">
            Your plan has been activated
          </p>
        </div>

        {/* Plan Details */}
        <div className="bg-white/80 rounded-2xl p-6 mb-6 shadow-lg animate-slideUp delay-200">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl font-black text-green-700">₹{plan?.price}</span>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Validity
              </span>
              <span className="font-bold text-gray-800">{plan?.validity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Data
              </span>
              <span className="font-bold text-gray-800">{plan?.data}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Calls
              </span>
              <span className="font-bold text-gray-800">{plan?.calls}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Features
              </span>
              <span className="font-bold text-gray-800 text-right">{plan?.features}</span>
            </div>
          </div>
        </div>

        {/* Celebration Elements */}
        <div className="text-center">
          <p className="text-sm font-semibold text-green-600">
            Enjoy your new plan!
          </p>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-green-400 rounded-full animate-ping delay-300" />
        <div className="absolute top-8 right-8 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-500" />
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-green-300 rounded-full animate-ping delay-700" />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default SuccessModal;
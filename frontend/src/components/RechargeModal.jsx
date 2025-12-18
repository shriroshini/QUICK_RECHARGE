import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Smartphone, CreditCard, Wallet, Building, Check, Loader, User, Phone, AlertCircle } from 'lucide-react';

function RechargeModal({ isOpen, onClose, plan, onRecharge }) {
  const { colors } = useTheme();
  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showShakeAnimation, setShowShakeAnimation] = useState(false);
  const [walletDetails, setWalletDetails] = useState({
    walletNumber: '',
    walletPin: ''
  });

  const validateMobileNumber = (number) => {
    if (!number) return { isValid: false, error: '' };
    if (!/^\d+$/.test(number)) return { isValid: false, error: 'Only numeric characters allowed' };
    if (number.length !== 10) return { isValid: false, error: 'Mobile number must be exactly 10 digits' };
    if (!/^[6-9]/.test(number)) return { isValid: false, error: 'Mobile number must start with 6, 7, 8, or 9' };
    if (/^0+$/.test(number)) return { isValid: false, error: 'Mobile number cannot be all zeros' };
    return { isValid: true, error: '' };
  };
  
  const mobileValidation = validateMobileNumber(mobileNumber);
  const isMobileValid = mobileValidation.isValid;

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'wallet', name: 'Digital Wallet', icon: <Wallet className="w-5 h-5" /> },
    { id: 'netbanking', name: 'Net Banking', icon: <Building className="w-5 h-5" /> }
  ];

  const handleRecharge = async () => {
    if (!mobileValidation.isValid) {
      setShowShakeAnimation(true);
      setTimeout(() => setShowShakeAnimation(false), 500);
      return;
    }
    
    if (!paymentMethod) return;
    if (paymentMethod === 'wallet' && (!walletDetails.walletNumber || !walletDetails.walletPin)) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      onRecharge({
        mobileNumber,
        paymentMethod,
        amount: plan.price,
        walletDetails: paymentMethod === 'wallet' ? walletDetails : null
      });
      setIsProcessing(false);
      onClose();
      setMobileNumber('');
      setPaymentMethod('');
      setWalletDetails({ walletNumber: '', walletPin: '' });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${colors.cardBg} backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-4 border-white/60 w-full max-w-md`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-black ${colors.gradientText}`}>
            Recharge ₹{plan.price}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Mobile Number Input */}
          <div>
            <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
              Mobile Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                onBlur={() => {
                  if (mobileNumber && !mobileValidation.isValid) {
                    setShowShakeAnimation(true);
                    setTimeout(() => setShowShakeAnimation(false), 500);
                  }
                }}
                className={`w-full p-4 pl-12 rounded-2xl border-3 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                  mobileNumber && !mobileValidation.isValid
                    ? `border-red-400 bg-red-50 ring-2 ring-red-200 ${showShakeAnimation ? 'animate-pulse' : ''}`
                    : `${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`
                } ${showShakeAnimation ? 'animate-bounce' : ''}`}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
              />
              <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
            {mobileNumber && !mobileValidation.isValid && (
              <p className={`text-red-500 text-sm mt-2 font-bold flex items-center gap-1 transition-all duration-300 ${showShakeAnimation ? 'animate-pulse' : ''}`}>
                <AlertCircle className="w-4 h-4" /> 
                {mobileValidation.error || 'Please enter a valid 10-digit mobile number'}
              </p>
            )}
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className={`block text-sm font-bold mb-3 ${colors.text}`}>
              Payment Method
            </label>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 rounded-2xl border-2 font-semibold text-left transition-all duration-300 flex items-center gap-3 ${
                    paymentMethod === method.id
                      ? 'border-[#C53030] bg-[#C53030]/10 text-[#C53030]'
                      : `${colors.border} ${colors.inputBg} ${colors.text} hover:border-[#E4A5B8]`
                  }`}
                >
                  {method.icon}
                  {method.name}
                  {paymentMethod === method.id && (
                    <Check className="w-5 h-5 ml-auto text-[#C53030]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Digital Wallet Details */}
          {paymentMethod === 'wallet' && (
            <div className={`p-4 rounded-2xl ${colors.inputBg} border-2 border-[#C53030] bg-[#C53030]/5`}>
              <h3 className={`font-bold text-lg mb-4 ${colors.text} flex items-center gap-2`}>
                <Wallet className="w-5 h-5 text-[#C53030]" />
                Digital Wallet Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                    Wallet Number/ID
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={walletDetails.walletNumber}
                      onChange={(e) => setWalletDetails(prev => ({ ...prev, walletNumber: e.target.value }))}
                      className={`w-full p-3 pl-10 rounded-xl border-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 ${colors.border} ${colors.inputBg} focus:border-[#C53030] focus:ring-[#C53030]/30`}
                      placeholder="Enter wallet number"
                      maxLength="10"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                    Wallet PIN
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={walletDetails.walletPin}
                      onChange={(e) => setWalletDetails(prev => ({ ...prev, walletPin: e.target.value }))}
                      className={`w-full p-3 pl-10 rounded-xl border-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 ${colors.border} ${colors.inputBg} focus:border-[#C53030] focus:ring-[#C53030]/30`}
                      placeholder="Enter 4-digit PIN"
                      maxLength="4"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Plan Details */}
          <div className={`p-4 rounded-2xl ${colors.inputBg} border-2 ${colors.border}`}>
            <h3 className={`font-bold text-lg mb-2 ${colors.text}`}>Plan Details</h3>
            <div className={`space-y-1 text-sm ${colors.text}`}>
              <p><strong>Amount:</strong> ₹{plan.price}</p>
              <p><strong>Validity:</strong> {plan.validity}</p>
              <p><strong>Data:</strong> {plan.data}</p>
              <p><strong>Calls:</strong> {plan.calls}</p>
            </div>
          </div>

          {/* Recharge Button */}
          <button
            onClick={handleRecharge}
            disabled={!isMobileValid || !paymentMethod || isProcessing || (paymentMethod === 'wallet' && (!walletDetails.walletNumber || !walletDetails.walletPin))}
            className={`w-full py-4 rounded-3xl font-black text-lg transition-all duration-500 shadow-xl ${
              !isMobileValid || !paymentMethod || isProcessing || (paymentMethod === 'wallet' && (!walletDetails.walletNumber || !walletDetails.walletPin))
                ? 'bg-gray-400 cursor-not-allowed opacity-60'
                : `${colors.buttonPrimary} hover:scale-105 ${colors.shadow} hover:shadow-2xl`
            } text-white`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="w-5 h-5 animate-spin" /> Processing Payment...
              </span>
            ) : (
              `Pay ₹${plan.price}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RechargeModal;
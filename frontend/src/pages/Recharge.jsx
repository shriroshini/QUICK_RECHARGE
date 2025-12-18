import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { ArrowLeft, Smartphone, CreditCard, Wallet, Building, Check, Loader, Calendar, BarChart3, Phone } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';

function Recharge() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { addRecharge } = useUser();
  const plan = location.state?.selectedPlan;

  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    walletProvider: '',
    bankName: '',
    accountNumber: ''
  });

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'wallet', name: 'Digital Wallet', icon: <Wallet className="w-5 h-5" /> },
    { id: 'netbanking', name: 'Net Banking', icon: <Building className="w-5 h-5" /> }
  ];

  const handleRecharge = async () => {
    const newErrors = {};
    
    // Validate mobile number
    if (!mobileNumber) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d+$/.test(mobileNumber)) {
      newErrors.mobile = 'Mobile number should contain only digits';
    } else if (mobileNumber.length !== 10) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    } else if (!/^[6-9]/.test(mobileNumber)) {
      newErrors.mobile = 'Mobile number must start with 6, 7, 8, or 9';
    } else if (/^0+$/.test(mobileNumber)) {
      newErrors.mobile = 'Invalid mobile number format';
    }
    
    if (!paymentMethod) {
      newErrors.payment = 'Please select a payment method';
    }

    // Validate payment method specific details
    if (paymentMethod === 'upi') {
      if (!paymentDetails.upiId) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/.test(paymentDetails.upiId)) {
        newErrors.upiId = 'Please enter a valid UPI ID (e.g., user@paytm)';
      }
    }

    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be exactly 16 digits';
      }
      
      if (!paymentDetails.cardholderName) {
        newErrors.cardholderName = 'Cardholder name is required';
      } else if (paymentDetails.cardholderName.length < 2) {
        newErrors.cardholderName = 'Please enter a valid cardholder name';
      }
      
      if (!paymentDetails.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expiryDate)) {
        newErrors.expiryDate = 'Please enter valid expiry date (MM/YY)';
      }
      
      if (!paymentDetails.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3}$/.test(paymentDetails.cvv)) {
        newErrors.cvv = 'CVV must be exactly 3 digits';
      }
    }

    if (paymentMethod === 'wallet') {
      if (!paymentDetails.walletProvider) {
        newErrors.walletProvider = 'Please select a wallet provider';
      }
    }

    if (paymentMethod === 'netbanking') {
      if (!paymentDetails.bankName) {
        newErrors.bankName = 'Please select your bank';
      }
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      const newRecharge = {
        id: Date.now(),
        amount: plan.price,
        number: mobileNumber.replace(/(.{2})(.*)(.{2})/, '$1*****$3'),
        status: 'success',
        date: 'Just now',
        paymentMethod: paymentMethod
      };
      addRecharge(newRecharge);
      
      setIsProcessing(false);
      setShowSuccessModal(true);
      setSuccessData({
        rechargedNumber: mobileNumber,
        transactionId: 'TXN' + Date.now() + Math.floor(Math.random() * 10000),
        paymentMethod: paymentMethods.find(m => m.id === paymentMethod)?.name || paymentMethod
      });
    }, 2000);
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No plan selected</h2>
          <button
            onClick={() => navigate('/plans')}
            className="px-6 py-3 bg-[#C53030] text-white rounded-xl font-bold"
          >
            Go to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate('/plans')}
            className={`p-4 rounded-full ${colors.cardBg} ${colors.shadow} hover:scale-105 transition-all`}
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className={`text-5xl font-black ${colors.gradientText}`}>
            Complete Recharge
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Plan Details */}
          <div className={`${colors.cardBg} backdrop-blur-xl p-12 rounded-3xl shadow-2xl border-4 border-white/60 h-fit`}>
            <h2 className={`text-3xl font-black mb-8 ${colors.gradientText}`}>
              Selected Plan
            </h2>
            
            <div className="text-center mb-10">
              <h3 className={`text-7xl font-black mb-6 ${colors.gradientText}`}>
                ₹{plan.price}
              </h3>
              {plan.badge && (
                <div className={`inline-block ${colors.buttonPrimary} text-white px-6 py-3 rounded-full font-black text-lg shadow-xl`}>
                  {plan.badge}
                </div>
              )}
            </div>

            <div className={`space-y-6 ${colors.text}`}>
              <div className="flex items-center gap-4 font-bold text-xl p-4 rounded-2xl bg-blue-50">
                <Calendar className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Validity</p>
                  <p className="text-xl font-black">{plan.validity}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 font-bold text-xl p-4 rounded-2xl bg-green-50">
                <BarChart3 className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Data</p>
                  <p className="text-xl font-black">{plan.data}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 font-bold text-xl p-4 rounded-2xl bg-purple-50">
                <Phone className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Calls</p>
                  <p className="text-xl font-black">{plan.calls}</p>
                </div>
              </div>
              {plan.features && (
                <div className={`mt-6 p-6 rounded-2xl ${colors.inputBg} border-2 ${colors.border}`}>
                  <p className="font-bold text-lg">{plan.features}</p>
                </div>
              )}
            </div>
          </div>

          {/* Recharge Form */}
          <div className={`${colors.cardBg} backdrop-blur-xl p-12 rounded-3xl shadow-2xl border-4 border-white/60`}>
            <h2 className={`text-3xl font-black mb-8 ${colors.gradientText}`}>
              Recharge Details
            </h2>

            <div className="space-y-8">
              {/* Mobile Number Input */}
              <div>
                <label className={`block text-lg font-bold mb-3 ${colors.text}`}>
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (errors.mobile) {
                        setErrors({...errors, mobile: ''});
                      }
                    }}
                    className={`w-full p-5 pl-14 rounded-2xl border-3 font-semibold text-xl transition-all duration-300 focus:outline-none focus:ring-4 ${
                      errors.mobile 
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200'
                        : `${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`
                    }`}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                  />
                  <Smartphone className="absolute left-5 top-1/2 transform -translate-y-1/2 w-7 h-7 text-gray-400" />
                </div>
                {errors.mobile && (
                  <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded-xl">
                    <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                      {errors.mobile}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className={`block text-lg font-bold mb-4 ${colors.text}`}>
                  Payment Method
                </label>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => {
                        setPaymentMethod(method.id);
                        if (errors.payment) {
                          setErrors({...errors, payment: ''});
                        }
                      }}
                      className={`w-full p-5 rounded-2xl border-3 font-semibold text-left transition-all duration-300 flex items-center gap-4 text-lg ${
                        paymentMethod === method.id
                          ? 'border-[#C53030] bg-[#C53030]/10 text-[#C53030]'
                          : `${colors.border} ${colors.inputBg} ${colors.text} hover:border-[#E4A5B8]`
                      }`}
                    >
                      {method.icon}
                      {method.name}
                      {paymentMethod === method.id && (
                        <Check className="w-6 h-6 ml-auto text-[#C53030]" />
                      )}
                    </button>
                  ))}
                </div>
                {errors.payment && (
                  <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded-xl">
                    <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                      {errors.payment}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Details Forms */}
              {paymentMethod === 'upi' && (
                <div className={`p-6 rounded-2xl ${colors.inputBg} border-2 ${colors.border} space-y-4`}>
                  <h3 className={`text-xl font-bold ${colors.text}`}>UPI Details</h3>
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., user@paytm)"
                    value={paymentDetails.upiId}
                    onChange={(e) => {
                      setPaymentDetails({...paymentDetails, upiId: e.target.value});
                      if (errors.upiId) setErrors({...errors, upiId: ''});
                    }}
                    className={`w-full p-4 rounded-xl border-2 font-semibold text-lg ${
                      errors.upiId ? 'border-red-400 bg-red-50' : colors.border
                    }`}
                  />
                  {errors.upiId && (
                    <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                      {errors.upiId}
                    </p>
                  )}
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className={`p-6 rounded-2xl ${colors.inputBg} border-2 ${colors.border} space-y-4`}>
                  <h3 className={`text-xl font-bold ${colors.text}`}>Card Details</h3>
                  <div>
                    <input
                      type="text"
                      placeholder="Card Number (16 digits)"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setPaymentDetails({...paymentDetails, cardNumber: value});
                        if (errors.cardNumber) setErrors({...errors, cardNumber: ''});
                      }}
                      className={`w-full p-4 rounded-xl border-2 font-semibold text-lg ${
                        errors.cardNumber ? 'border-red-400 bg-red-50' : colors.border
                      }`}
                      maxLength="16"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-600 font-semibold text-sm mt-2 flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={paymentDetails.cardholderName}
                      onChange={(e) => {
                        setPaymentDetails({...paymentDetails, cardholderName: e.target.value});
                        if (errors.cardholderName) setErrors({...errors, cardholderName: ''});
                      }}
                      className={`w-full p-4 rounded-xl border-2 font-semibold text-lg ${
                        errors.cardholderName ? 'border-red-400 bg-red-50' : colors.border
                      }`}
                    />
                    {errors.cardholderName && (
                      <p className="text-red-600 font-semibold text-sm mt-2 flex items-center gap-2">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                        {errors.cardholderName}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) value = value.substring(0,2) + '/' + value.substring(2,4);
                          setPaymentDetails({...paymentDetails, expiryDate: value});
                          if (errors.expiryDate) setErrors({...errors, expiryDate: ''});
                        }}
                        className={`p-4 rounded-xl border-2 font-semibold text-lg ${
                          errors.expiryDate ? 'border-red-400 bg-red-50' : colors.border
                        }`}
                        maxLength="5"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-600 font-semibold text-xs mt-1">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="CVV (3 digits)"
                        value={paymentDetails.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setPaymentDetails({...paymentDetails, cvv: value});
                          if (errors.cvv) setErrors({...errors, cvv: ''});
                        }}
                        className={`p-4 rounded-xl border-2 font-semibold text-lg ${
                          errors.cvv ? 'border-red-400 bg-red-50' : colors.border
                        }`}
                        maxLength="3"
                      />
                      {errors.cvv && (
                        <p className="text-red-600 font-semibold text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className={`p-6 rounded-2xl ${colors.inputBg} border-2 ${colors.border} space-y-4`}>
                  <h3 className={`text-xl font-bold ${colors.text}`}>Wallet Details</h3>
                  <select
                    value={paymentDetails.walletProvider}
                    onChange={(e) => {
                      setPaymentDetails({...paymentDetails, walletProvider: e.target.value});
                      if (errors.walletProvider) setErrors({...errors, walletProvider: ''});
                    }}
                    className={`w-full p-4 rounded-xl border-2 font-semibold text-lg ${
                      errors.walletProvider ? 'border-red-400 bg-red-50' : colors.border
                    }`}
                  >
                    <option value="">Select Wallet Provider</option>
                    <option value="paytm">Paytm</option>
                    <option value="phonepe">PhonePe</option>
                    <option value="googlepay">Google Pay</option>
                    <option value="amazonpay">Amazon Pay</option>
                  </select>
                  {errors.walletProvider && (
                    <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                      {errors.walletProvider}
                    </p>
                  )}
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className={`p-6 rounded-2xl ${colors.inputBg} border-2 ${colors.border} space-y-4`}>
                  <h3 className={`text-xl font-bold ${colors.text}`}>Net Banking Details</h3>
                  <select
                    value={paymentDetails.bankName}
                    onChange={(e) => {
                      setPaymentDetails({...paymentDetails, bankName: e.target.value});
                      if (errors.bankName) setErrors({...errors, bankName: ''});
                    }}
                    className={`w-full p-4 rounded-xl border-2 font-semibold text-lg ${
                      errors.bankName ? 'border-red-400 bg-red-50' : colors.border
                    }`}
                  >
                    <option value="">Select Your Bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                  {errors.bankName && (
                    <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                      {errors.bankName}
                    </p>
                  )}
                </div>
              )}

              {/* Recharge Button */}
              <button
                onClick={handleRecharge}
                disabled={!mobileNumber || !paymentMethod || isProcessing}
                className={`w-full py-6 rounded-3xl font-black text-2xl transition-all duration-500 shadow-xl ${
                  !mobileNumber || !paymentMethod || isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : `${colors.buttonPrimary} hover:scale-105 ${colors.shadow}`
                } text-white`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader className="w-7 h-7 animate-spin" /> Processing Payment...
                  </span>
                ) : (
                  `Pay ₹${plan.price}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/history');
        }}
        plan={plan}
        {...successData}
      />
    </div>
  );
}

export default Recharge;
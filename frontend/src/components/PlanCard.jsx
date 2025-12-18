import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuthIntegrated } from '../context/AuthContextIntegrated';
import { useUser } from '../context/UserContext';
import { Calendar, BarChart3, Phone, ChevronDown, ChevronUp, Check, Loader, Smartphone } from 'lucide-react';
import SuccessModal from './SuccessModal';
import RechargeModal from './RechargeModal';

function PlanCard({ plan }) {
  const { theme, colors } = useTheme();
  const { isLoggedIn } = useAuthIntegrated();
  const { addRecharge } = useUser();
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRechargeModal, setShowRechargeModal] = useState(false);

  const { price, validity, data, calls, features, badge, icon, gradient } = plan;

  const handleSelectPlan = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    setIsSelected(true);
  };

  const handleRecharge = (rechargeData) => {
    // Strict validation - block ALL invalid numbers
    const mobileNumber = rechargeData.mobileNumber;
    
    if (!mobileNumber || 
        typeof mobileNumber !== 'string' ||
        !/^\d+$/.test(mobileNumber) ||
        mobileNumber.length !== 10 || 
        !/^[6-9]/.test(mobileNumber) ||
        /^0+$/.test(mobileNumber)) {
      console.error('BLOCKED: Invalid mobile number:', mobileNumber);
      alert('Invalid mobile number! Please enter a valid 10-digit number starting with 6-9.');
      return;
    }
    
    console.log('VALID: Processing recharge for:', mobileNumber);
    
    // Add to recharge history only if valid
    const newRecharge = {
      id: Date.now(),
      amount: rechargeData.amount,
      number: rechargeData.mobileNumber.replace(/(.{2})(.*)(.{2})/, '$1*****$3'),
      status: 'success',
      date: 'Just now',
      paymentMethod: rechargeData.paymentMethod
    };
    addRecharge(newRecharge);
    
    setShowSuccessModal(true);
    setIsSelected(false);
  };

  const cardGradient = colors.cardBg;

  return (
    <div
      className={`relative p-8 rounded-3xl transition-all duration-700 cursor-pointer backdrop-blur-lg border-4 ${
        isSelected
          ? `scale-110 shadow-2xl ring-8 ring-[#C53030] animate-pulse border-[#C53030] ${colors.shadow}`
          : `hover:scale-105 shadow-xl border-white/60 ${colors.shadow}`
      } ${cardGradient}`}
      onClick={() => setIsSelected(!isSelected)}
    >
      {badge && (
        <div className={`absolute -top-4 -right-4 ${colors.buttonPrimary} text-white px-5 py-3 rounded-full font-black text-sm shadow-2xl animate-bounce border-4 border-white ${colors.shadow}`}>
{badge}
        </div>
      )}



      <h3 className={`text-5xl font-black mb-4 text-center transition-all duration-500 ${colors.gradientText}`}>
        ₹{price}
      </h3>

      <div className={`space-y-3 mb-6 ${colors.text}`}>
        <p className="flex items-center gap-3 font-bold text-lg">
          <Calendar className="w-6 h-6 text-blue-500" /> {validity}
        </p>
        <p className="flex items-center gap-3 font-bold text-lg">
          <BarChart3 className="w-6 h-6 text-green-500" /> {data}
        </p>
        <p className="flex items-center gap-3 font-bold text-lg">
          <Phone className="w-6 h-6 text-purple-500" /> {calls || 'Unlimited calls'}
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-500 ${colors.inputBg} ${colors.text} ${colors.shadow}`}
        >
          {showDetails ? (
            <><ChevronUp className="w-4 h-4 inline mr-1" /> Hide Details</>
          ) : (
            <><ChevronDown className="w-4 h-4 inline mr-1" /> View Details</>
          )}
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
              navigate('/login');
              return;
            }
            // Navigate to recharge page with plan data
            navigate('/recharge', { state: { selectedPlan: plan } });
          }}
          disabled={isProcessing}
          className={`w-full py-4 rounded-3xl font-black text-lg transition-all duration-500 shadow-xl hover:shadow-2xl ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : `${colors.buttonPrimary} text-white ${colors.shadow} hover:scale-105`
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="w-5 h-5 animate-spin" /> Processing...
            </span>
          ) : (
            'Recharge Now'
          )}
        </button>
      </div>

      {showDetails && (
        <div className={`mt-4 p-5 backdrop-blur-md rounded-2xl border-2 transition-all duration-700 animate-fadeIn ${colors.cardBg} border-white/60 shadow-lg`}>
          <p className={`font-bold text-base ${colors.text}`}>
{features || '100 SMS/day, Free roaming'}
          </p>
        </div>
      )}
      
      <RechargeModal
        isOpen={showRechargeModal}
        onClose={() => setShowRechargeModal(false)}
        plan={plan}
        onRecharge={handleRecharge}
      />
      
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        plan={plan}
      />
    </div>
  );
}

export default PlanCard;

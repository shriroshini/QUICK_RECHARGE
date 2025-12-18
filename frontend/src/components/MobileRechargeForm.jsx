import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { rechargeSchema } from '../validation/schemas';
import AmountChips from './AmountChips';
import OperatorDropdown from './OperatorDropdown';
import Notification from './Notification';
import PaymentModal from './PaymentModal';
import { AlertCircle } from 'lucide-react';

function MobileRechargeForm() {
  const { theme, colors } = useTheme();
  const { addRecharge } = useUser();
  
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(rechargeSchema),
    defaultValues: {
      mobileNumber: '',
      operator: '',
      amount: null
    }
  });

  const amounts = [199, 299, 399, 599, 799, 999];
  const watchedAmount = watch('amount');
  const watchedOperator = watch('operator');

  const onSubmit = (data) => {
    setShowModal(true);
  };

  const confirmPayment = () => {
    setShowModal(false);
    const formData = watch();
    
    setTimeout(() => {
      const newRecharge = {
        id: Date.now(),
        amount: formData.amount,
        number: formData.mobileNumber.slice(0, 5) + '*****',
        status: 'success',
        date: 'Just now'
      };
      addRecharge(newRecharge);
      setNotification({ type: 'success', message: `Recharge of ₹${formData.amount} successful!` });
      reset();
    }, 2000);
  };

  return (
    <div className={`p-8 rounded-3xl shadow-2xl backdrop-blur-xl border-4 transition-all duration-500 ${
      colors.border
    } ${colors.cardBg}`}>
      <h2 className={`text-4xl font-black mb-8 ${colors.text}`}>
        ⚡ Quick Recharge
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className={`block text-sm font-bold mb-3 ${colors.text}`}>
            Mobile Number
          </label>
          <input
            {...register('mobileNumber')}
            type="tel"
            placeholder="Enter 10-digit number"
            className={`w-full p-5 rounded-2xl font-bold text-lg transition-all duration-300 border-4 focus:outline-none focus:ring-4 shadow-lg ${
              colors.inputBg
            } ${colors.text} ${
              theme === 'dark' ? 'focus:ring-[#9370DB]' : 'focus:ring-[#FFDAB9]'
            } ${
              errors.mobileNumber ? 'border-red-500 animate-shake' : colors.border
            }`}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-2 font-bold animate-fadeIn flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.mobileNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-bold mb-3 ${colors.text}`}>
            Select Operator
          </label>
          <select
            {...register('operator')}
            className={`w-full p-5 rounded-2xl font-bold text-lg transition-all duration-300 border-4 focus:outline-none focus:ring-4 shadow-lg ${
              colors.inputBg
            } ${colors.text} ${
              theme === 'dark' ? 'focus:ring-[#9370DB]' : 'focus:ring-[#FFDAB9]'
            } ${
              errors.operator ? 'border-red-500' : colors.border
            }`}
          >
            <option value="">Choose operator</option>
            <option value="airtel">Airtel</option>
            <option value="jio">Jio</option>
            <option value="vi">Vi</option>
            <option value="bsnl">BSNL</option>
          </select>
          {errors.operator && (
            <p className="text-red-500 text-sm mt-2 font-bold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.operator.message}
            </p>
          )}
        </div>

        <div>
          <label className={`block text-sm font-bold mb-3 ${colors.text}`}>
            Select Amount
          </label>
          <div className="grid grid-cols-3 gap-3">
            {amounts.map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => setValue('amount', amt)}
                className={`p-4 rounded-xl font-bold text-lg transition-all duration-300 border-2 ${
                  watchedAmount === amt
                    ? 'bg-[#C53030] text-white border-[#C53030] scale-105'
                    : `${colors.cardBg} ${colors.text} ${colors.border} hover:scale-105`
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-2 font-bold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.amount.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed animate-pulse'
              : `${colors.buttonPrimary} hover:scale-105 ${colors.shadow}`
          } text-white border-4 border-white`}
        >
          {isSubmitting ? '⏳ Processing...' : '🚀 Recharge Now'}
        </button>
      </form>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <PaymentModal
        isOpen={showModal}
        onClose={confirmPayment}
        amount={watchedAmount}
        mobileNumber={watch('mobileNumber')}
      />
    </div>
  );
}

export default MobileRechargeForm;
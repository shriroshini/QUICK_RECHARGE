import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthIntegrated } from '../context/AuthContextIntegrated';
import { useTheme } from '../context/ThemeContext';
import { signupSchema } from '../validation/schemas';
import { User, Mail, Smartphone, Lock, Shield, AlertCircle, Loader, Eye, EyeOff, CheckCircle } from 'lucide-react';

function SignupIntegrated() {
  const { theme, colors } = useTheme();
  const { signup } = useAuthIntegrated();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(signupSchema)
  });

  const password = watch('password');

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 'none', color: 'gray', text: '', width: '0%' };
    if (password.length < 6) return { strength: 'weak', color: 'red', text: 'Weak', width: '33%' };
    if (password.length < 8) return { strength: 'medium', color: 'yellow', text: 'Medium', width: '66%' };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
      return { strength: 'strong', color: 'green', text: 'Strong', width: '100%' };
    }
    return { strength: 'medium', color: 'yellow', text: 'Medium', width: '66%' };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setSignupError('');
    setSignupSuccess('');
    
    const userData = {
      username: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.mobile
    };
    
    const result = await signup(userData);
    
    if (result.success) {
      setSignupSuccess('Registration successful! Redirecting to login...');
      reset();
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setSignupError(result.error);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-all duration-700 ${colors.background}`}>
      <div className="w-full max-w-lg">
        <div className={`${colors.cardBg} backdrop-blur-xl p-10 rounded-3xl shadow-2xl border-4 border-white/60 ${colors.shadow} transition-all duration-700`}>
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-black mb-2 ${theme === 'dark' ? 'text-[#F8D8E0]' : 'bg-gradient-to-r from-[#8B2635] to-[#C53030] bg-clip-text text-transparent'}`}>
              Join QuickRecharge!
            </h1>
            <p className={`text-lg font-semibold ${colors.text}`}>
              Create your account and start recharging
            </p>
          </div>

          {signupError && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl">
              <p className="text-red-600 font-bold text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" /> {signupError}
              </p>
            </div>
          )}

          {signupSuccess && (
            <div className="mb-6 p-4 bg-green-100 border-2 border-green-300 rounded-xl">
              <p className="text-green-600 font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" /> {signupSuccess}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Full Name
              </label>
              <div className="relative">
                <input
                  {...register('fullName')}
                  type="text"
                  className={`w-full p-4 pl-12 rounded-2xl border-3 font-semibold text-lg transition-all duration-500 focus:outline-none focus:ring-4 ${
                    errors.fullName
                      ? 'border-red-300 bg-red-50'
                      : `${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`
                  }`}
                  placeholder="Enter your full name"
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2 font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Email Address
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full p-4 pl-12 rounded-2xl border-3 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                    errors.email
                      ? 'border-red-300 bg-red-50'
                      : `${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`
                  }`}
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Mobile Number
              </label>
              <div className="relative">
                <input
                  {...register('mobile')}
                  type="tel"
                  className={`w-full p-4 pl-12 rounded-2xl border-3 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                    errors.mobile
                      ? 'border-red-300 bg-red-50'
                      : `${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`
                  }`}
                  placeholder="Enter 10-digit mobile number"
                />
                <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-2 font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.mobile.message}
                </p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full p-4 pl-12 pr-16 rounded-2xl border-3 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                    errors.password
                      ? 'border-red-300 bg-red-50'
                      : `${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`
                  }`}
                  placeholder="Create a strong password"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.color === 'red' ? 'bg-red-300' :
                          passwordStrength.color === 'yellow' ? 'bg-yellow-300' :
                          'bg-green-300'
                        }`}
                        style={{ width: passwordStrength.width }}
                      />
                    </div>
                    <span className={`text-sm font-bold ${
                      passwordStrength.color === 'red' ? 'text-red-500' :
                      passwordStrength.color === 'yellow' ? 'text-yellow-600' :
                      'text-green-500'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`w-full p-4 pl-12 pr-16 rounded-2xl border-3 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                    errors.confirmPassword
                      ? 'border-red-300 bg-red-50'
                      : `${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`
                  }`}
                  placeholder="Confirm your password"
                />
                <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2 font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                {...register('acceptTerms')}
                type="checkbox"
                id="acceptTerms"
                className="mt-1 w-5 h-5 text-[#C53030] border-2 border-gray-300 rounded focus:ring-[#C53030] focus:ring-2"
              />
              <label htmlFor="acceptTerms" className={`text-sm font-semibold ${colors.text} leading-relaxed`}>
                I accept the{' '}
                <span className="text-[#C53030] font-bold hover:underline cursor-pointer">
                  Terms & Conditions
                </span>
                {' '}and{' '}
                <span className="text-[#C53030] font-bold hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm font-bold flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.acceptTerms.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-3xl font-black text-xl transition-all duration-500 shadow-2xl ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : `${colors.buttonPrimary} hover:scale-105 ${colors.shadow}`
              } text-white`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-6 h-6 animate-spin" /> Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className={`${colors.text} font-semibold`}>
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#C53030] font-black hover:text-[#8B2635] transition-colors duration-300"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupIntegrated;
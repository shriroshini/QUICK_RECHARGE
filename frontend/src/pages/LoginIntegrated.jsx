import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthIntegrated } from '../context/AuthContextIntegrated';
import { useTheme } from '../context/ThemeContext';
import { loginSchema } from '../validation/schemas';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';

function LoginIntegrated() {
  const { theme, colors } = useTheme();
  const { login } = useAuthIntegrated();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setLoginError('');
    
    // Check for admin credentials
    if (data.email === 'admin@quickrecharge.com' && data.password === 'admin@roshini') {
      localStorage.setItem('adminToken', 'admin-authenticated');
      reset();
      navigate('/admin');
      return;
    }
    
    const result = await login(data);
    
    if (result.success) {
      reset();
      navigate('/plans');
    } else {
      setLoginError(result.error);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-all duration-500 ${colors.background}`}>
      <div className="w-full max-w-md">
        <div className={`${colors.cardBg} backdrop-blur-xl p-10 rounded-3xl shadow-2xl border-4 border-white/60 ${colors.shadow} transition-all duration-700`}>
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-black mb-2 ${theme === 'dark' ? 'text-[#F8D8E0]' : 'bg-gradient-to-r from-[#8B2635] to-[#C53030] bg-clip-text text-transparent'}`}>
              Welcome Back!
            </h1>
            <p className={`text-lg font-semibold ${colors.text}`}>
              Login to your QuickRecharge account
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl">
              <p className="text-red-600 font-bold text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" /> {loginError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Email Address
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full p-4 pl-12 rounded-2xl border-3 font-semibold text-lg transition-all duration-500 focus:outline-none focus:ring-4 ${
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
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full p-4 pl-12 pr-16 rounded-2xl border-3 font-semibold text-lg transition-all duration-500 focus:outline-none focus:ring-4 ${
                    errors.password
                      ? 'border-red-300 bg-red-50'
                      : `${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`
                  }`}
                  placeholder="Enter your password"
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.password.message}
                </p>
              )}
            </div>

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
                  <Loader className="w-6 h-6 animate-spin" /> Logging in...
                </span>
              ) : (
                "Login to Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className={`${colors.text} font-semibold`}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[#C53030] font-black hover:text-[#8B2635] transition-colors duration-300"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginIntegrated;
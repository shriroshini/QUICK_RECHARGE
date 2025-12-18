import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { loginSchema } from '../validation/schemas';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';

function Login() {
  const { theme, colors } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);
      
      if (result.success) {
        reset();
        navigate('/plans');
      } else {
        setError('root', { message: result.error || 'Invalid credentials' });
      }
    } catch (error) {
      setError('root', { message: 'Login failed. Please try again.' });
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

          {errors.root && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl">
              <p className="text-red-600 font-bold text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" /> {errors.root.message}
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
                  required
                  className={`w-full p-4 pl-12 rounded-2xl border-3 font-semibold text-lg transition-all duration-500 focus:outline-none focus:ring-4 ${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`}
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
                  required
                  minLength="6"
                  className={`w-full p-4 pl-12 pr-16 rounded-2xl border-3 font-semibold text-lg transition-all duration-500 focus:outline-none focus:ring-4 ${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-[#C53030] rounded focus:ring-[#C53030]"
                />
                <span className={`ml-2 text-sm font-semibold ${colors.text}`}>
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className={`text-sm font-bold text-[#C53030] hover:text-[#8B2635] transition-colors duration-300`}
              >
                Forgot password?
              </Link>
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

export default Login;
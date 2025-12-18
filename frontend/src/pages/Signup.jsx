import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Smartphone, Lock, Shield, AlertCircle, Loader, Eye, EyeOff } from 'lucide-react';

function Signup() {
  const { theme, colors } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  });

  const validateConfirmPassword = (value) => {
    const password = watch('password');
    return value === password || 'Passwords do not match';
  };

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
    setErrorMessage('');
    const result = await signup(data);

    if (result.success) {
      reset();
      navigate('/login');
    } else {
      setErrorMessage(result.message);
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
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}
          </div>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Full Name
              </label>
              <div className="relative">
                <input
                  {...register('fullName')}
                  type="text"
                  required
                  className={`w-full p-4 pl-12 rounded-2xl border-3 font-semibold text-lg transition-all duration-500 focus:outline-none focus:ring-4 ${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`}
                  placeholder="Enter your full name"
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>

            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Email Address
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  required
                  className={`w-full p-4 pl-12 rounded-2xl border-3 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`}
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>

            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Mobile Number
              </label>
              <div className="relative">
                <input
                  {...register('mobile')}
                  type="tel"
                  required
                  pattern="[6-9][0-9]{9}"
                  title="Please enter a valid 10-digit mobile number starting with 6-9"
                  className={`w-full p-4 pl-12 rounded-2xl border-3 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`}
                  placeholder="Enter 10-digit mobile number"
                />
                <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>

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
                  className={`w-full p-4 pl-12 pr-16 rounded-2xl border-3 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${colors.border} ${colors.inputBg} focus:border-[#E4A5B8] focus:ring-[#C53030]/30`}
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

            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword', { validate: validateConfirmPassword })}
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

            <div>
              <label className="flex items-start gap-3">
                <input
                  {...register('acceptTerms')}
                  type="checkbox"
                  className="w-5 h-5 text-[#C53030] rounded focus:ring-[#C53030] mt-1"
                />
                <span className={`text-sm font-semibold ${colors.text}`}>
                  I accept the{' '}
                  <Link to="/terms" className="text-[#C53030] font-bold">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#C53030] font-bold">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm mt-2 font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.acceptTerms.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-3xl font-black text-xl transition-all duration-500 shadow-2xl ${colors.buttonPrimary} hover:scale-105 ${colors.shadow} text-white`}
            >
              Create Account
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

export default Signup;
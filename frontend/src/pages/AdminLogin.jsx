import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function AdminLogin() {
  const { theme, colors } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    console.log('Login attempt:', formData);
    
    // Admin credentials
    if (formData.email.trim() === 'admin@quickrecharge.com' && formData.password.trim() === 'admin@roshini') {
      localStorage.setItem('adminToken', 'admin-authenticated');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Use: admin@quickrecharge.com / admin@roshini');
    }
  };

  const handleChange = (e) => {
    setError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${colors.background} py-12 px-6`}>
      <div className={`max-w-md w-full p-8 rounded-3xl backdrop-blur-xl border-4 border-white/60 shadow-2xl ${colors.cardBg}`}>
        <h2 className={`text-3xl font-black text-center mb-8 ${colors.text}`}>
          Admin Login
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 ${colors.border} ${colors.cardBg} ${colors.text} focus:outline-none focus:border-[#C53030]`}
              placeholder="admin@quickrecharge.com"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-bold mb-2 ${colors.text}`}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 ${colors.border} ${colors.cardBg} ${colors.text} focus:outline-none focus:border-[#C53030]`}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#C53030] to-[#8B2635] text-white font-black rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Login as Admin
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className={`text-sm ${colors.text}`}>
            Demo credentials: admin@quickrecharge.com / admin@roshini
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
import API from '../api/axios';

export const authService = {
  login: async (credentials) => {
    const response = await API.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await API.post('/api/auth/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await API.get('/api/users/profile');
    return response.data;
  }
};
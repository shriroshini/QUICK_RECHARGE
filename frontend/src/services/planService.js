import API from '../api/axios';
import axios from 'axios';

// Public API instance for unauthenticated requests
const PublicAPI = axios.create({
  baseURL: 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const planService = {
  getPlans: async () => {
    try {
      // Try with public API first (no auth required)
      const response = await PublicAPI.get('/plans');
      return response.data;
    } catch (error) {
      // Fallback to authenticated API if needed
      const response = await API.get('/plans');
      return response.data;
    }
  },

  getPlan: async (id) => {
    try {
      // Try with public API first (no auth required)
      const response = await PublicAPI.get(`/plans/${id}`);
      return response.data;
    } catch (error) {
      // Fallback to authenticated API if needed
      const response = await API.get(`/plans/${id}`);
      return response.data;
    }
  }
};
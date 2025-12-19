import API from '../api/axios';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Public API instance for unauthenticated requests
const PublicAPI = axios.create({
  baseURL: 'https://quick-recharge-3-backend.onrender.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const planService = {
  getPlans: async (retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        // Wake up backend on first attempt
        if (i === 0) {
          try {
            await axios.get('https://quick-recharge-3-backend.onrender.com/ping', { timeout: 5000 });
            await delay(2000); // Wait for backend to fully wake up
          } catch (e) {
            // Ignore ping errors
          }
        }
        
        const response = await PublicAPI.get('/plans');
        return response.data;
      } catch (error) {
        console.log(`Plans fetch attempt ${i + 1} failed:`, error.message);
        
        if (i === retries - 1) {
          throw error;
        }
        
        // Exponential backoff
        await delay(Math.pow(2, i) * 2000);
      }
    }
  },

  getPlan: async (id) => {
    try {
      const response = await PublicAPI.get(`/plans/${id}`);
      return response.data;
    } catch (error) {
      const response = await API.get(`/plans/${id}`);
      return response.data;
    }
  }
};
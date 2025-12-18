import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect to login for plans endpoint - allow public access
      if (!error.config.url.includes('/plans')) {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
          // For admin, don't logout on 401, just reject the promise
          // Admin can handle the error without being logged out
        } else {
          // User logout
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
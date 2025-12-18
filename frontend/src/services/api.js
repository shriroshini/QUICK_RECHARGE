const API_BASE_URL = 'http://localhost:3002/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      let errorMessage = data.message || 'Something went wrong';
      
      // Parse MongoDB duplicate key errors
      if (errorMessage.includes('E11000 duplicate key error')) {
        if (errorMessage.includes('email_1')) {
          errorMessage = 'This email is already registered. Please use a different email.';
        } else if (errorMessage.includes('phone_1')) {
          errorMessage = 'This phone number is already registered. Please use a different number.';
        } else if (errorMessage.includes('username_1')) {
          errorMessage = 'This username is already taken. Please choose a different username.';
        } else {
          errorMessage = 'An account with these details already exists.';
        }
      }
      
      throw new Error(errorMessage);
    }

    return data;
  }

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: userData.fullName,
        email: userData.email,
        password: userData.password,
        phone: userData.mobile
      }),
    });
  }

  async getPlans() {
    return this.request('/plans');
  }

  async getUserProfile() {
    return this.request('/users/profile');
  }
}

export default new ApiService();
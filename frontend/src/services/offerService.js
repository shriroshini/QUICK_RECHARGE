import axios from '../api/axios';

export const offerService = {
  getOffers: async () => {
    const response = await axios.get('/api/offers');
    return response.data;
  }
};
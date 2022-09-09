import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getEvents = (category = '') => {
  return axios.get('http://127.0.0.1:8000/api/events?category=' + category, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getAllCities = () => {
  return axios.get('http://127.0.0.1:8000/api/cities', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

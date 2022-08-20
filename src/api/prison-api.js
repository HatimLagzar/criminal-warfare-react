import axios from 'axios';
import authService from '../services/auth/AuthService';

export const bailFromPrison = () => {
  return axios.post('http://127.0.0.1:8000/api/prison/bail', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const escapePrisonUsingKey = () => {
  return axios.post('http://127.0.0.1:8000/api/prison/use-key', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

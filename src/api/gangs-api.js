import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getGangsList = () => {
  return axios.get('http://127.0.0.1:8000/api/gangs', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

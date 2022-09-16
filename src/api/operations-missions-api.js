import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getItemInProgress = () => {
  return axios.get('http://127.0.0.1:8000/api/missions-operations', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

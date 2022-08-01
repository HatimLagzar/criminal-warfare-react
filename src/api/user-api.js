import axios from 'axios';
import authService from '../services/auth/AuthService';

export const fetchAuthenticatedUserInfo = () => {
  return axios.get('http://127.0.0.1:8000/api/me', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

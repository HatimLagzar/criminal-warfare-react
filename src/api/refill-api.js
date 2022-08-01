import axios from 'axios';
import authService from '../services/auth/AuthService';

export const refill = (type) => {
  return axios.post(
    'http://127.0.0.1:8000/api/refill',
    { type },
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

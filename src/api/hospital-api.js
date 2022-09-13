import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getCriminalsInHospital = () => {
  return axios.get('http://127.0.0.1:8000/api/hospital', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getAllAchievements = () => {
  return axios.get('http://127.0.0.1:8000/api/achievements', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

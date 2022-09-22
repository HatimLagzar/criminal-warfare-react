import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getAllAchievements = () => {
  return axios.get(getBaseApiUrl() + '/achievements', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

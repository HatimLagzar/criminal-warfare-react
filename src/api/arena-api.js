import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getArenaStats = () => {
  return axios.get(getBaseApiUrl() + '/api/arena/stats', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

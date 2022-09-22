import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getEvents = (category = '') => {
  return axios.get(getBaseApiUrl() + '/events?category=' + category, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

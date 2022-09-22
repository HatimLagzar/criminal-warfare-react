import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getItemInProgress = () => {
  return axios.get(getBaseApiUrl() + '/missions-operations', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

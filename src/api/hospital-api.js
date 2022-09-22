import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getCriminalsInHospital = () => {
  return axios.get(getBaseApiUrl() + '/hospital', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

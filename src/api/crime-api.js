import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getAllCrimes = () => {
  return axios.get(getBaseApiUrl() + '/crimes', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const doCrime = (crimeId) => {
  return axios.post(getBaseApiUrl() + '/crimes/' + crimeId + '/slow', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const doCrimeFast = (crimeId) => {
  return axios.post(getBaseApiUrl() + '/crimes/' + crimeId + '/fast', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

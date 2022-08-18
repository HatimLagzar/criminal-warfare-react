import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getAllCrimes = () => {
  return axios.get('http://127.0.0.1:8000/api/crimes', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const doCrime = (crimeId) => {
  return axios.post('http://127.0.0.1:8000/api/crimes/' + crimeId + '/slow', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const doCrimeFast = (crimeId) => {
  return axios.post('http://127.0.0.1:8000/api/crimes/' + crimeId + '/fast', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

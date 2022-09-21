import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getGangsList = () => {
  return axios.get('http://127.0.0.1:8000/api/gangs', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getGangActions = () => {
  return axios.get('http://127.0.0.1:8000/api/gangs/actions', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getActiveWeapons = () => {
  return axios.get('http://127.0.0.1:8000/api/gangs/weapons/active', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getGangInfo = (gangId) => {
  return axios.get('http://127.0.0.1:8000/api/gangs/' + gangId, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getCriminalsInPrison = () => {
  return axios.get('http://127.0.0.1:8000/api/prison', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getPrisonKeysLeft = () => {
  return axios.get('http://127.0.0.1:8000/api/prison/prison-key', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const bailFromPrison = () => {
  return axios.post('http://127.0.0.1:8000/api/prison/bail', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const bustFromPrison = (userId) => {
  return axios.post('http://127.0.0.1:8000/api/bust/' + userId, {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const escapePrisonUsingKey = () => {
  return axios.post('http://127.0.0.1:8000/api/prison/use-key', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

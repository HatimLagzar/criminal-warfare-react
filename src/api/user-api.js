import axios from 'axios';
import authService from '../services/auth/AuthService';

export const fetchAuthenticatedUserInfo = () => {
  return axios.get('http://127.0.0.1:8000/api/me', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const searchForUserByUsername = (value) => {
  return axios.get(`http://127.0.0.1:8000/api/users/search?username=${value}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const ignoreUser = (userId) => {
  return axios.post(
    `http://127.0.0.1:8000/api/users/${userId}/ignore`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

import axios from 'axios';
import authService from "../services/auth/AuthService";

export const login = (formData) => {
  return axios.post('http://127.0.0.1:8000/api/login', formData);
};

export const refresh = (token) => {
  return axios.post(
    'http://127.0.0.1:8000/api/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const logout = () => {
  return axios.post(
    'http://127.0.0.1:8000/api/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

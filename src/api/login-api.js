import axios from 'axios';
import authService from "../services/auth/AuthService";
import {getBaseApiUrl} from "./base-api";

export const login = (formData) => {
  return axios.post(getBaseApiUrl() + '/login', formData);
};

export const refresh = (token) => {
  return axios.post(
    getBaseApiUrl() + '/refresh',
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
    getBaseApiUrl() + '/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getGangsList = () => {
  return axios.get(getBaseApiUrl() + '/gangs', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getGangActions = () => {
  return axios.get(getBaseApiUrl() + '/gangs/actions', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getActiveWeapons = () => {
  return axios.get(getBaseApiUrl() + '/gangs/weapons/active', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getGangInfo = (gangId) => {
  return axios.get(getBaseApiUrl() + '/gangs/' + gangId, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getGangMailMessages = () => {
  return axios.get(getBaseApiUrl() + '/gangs/mail', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const sendGangMailMessage = (message) => {
  const formData = new FormData();
  formData.set('message', message);

  return axios.post(getBaseApiUrl() + '/gangs/mail', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

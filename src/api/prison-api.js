import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getCriminalsInPrison = () => {
  return axios.get(getBaseApiUrl() + '/prison', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getPrisonKeysLeft = () => {
  return axios.get(getBaseApiUrl() + '/prison/prison-key', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const bailFromPrison = () => {
  return axios.post(getBaseApiUrl() + '/prison/bail', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const bustFromPrison = (userId) => {
  return axios.post(getBaseApiUrl() + '/bust/' + userId, {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const escapePrisonUsingKey = () => {
  return axios.post(getBaseApiUrl() + '/prison/use-key', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

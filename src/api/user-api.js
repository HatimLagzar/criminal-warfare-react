import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const fetchAuthenticatedUserInfo = () => {
  return axios.get(getBaseApiUrl() + '/me', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const searchForUserByUsername = (value) => {
  return axios.get(`${getBaseApiUrl()}/users/search?username=${value}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const searchForPlayers = (params) => {
  return axios.get(`${getBaseApiUrl()}/users/search?` + params, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getOthsAndOtds = () => {
  return axios.get(`${getBaseApiUrl()}/otds-oths`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getTopFiveOthOtd = (name) => {
  return axios.get(`${getBaseApiUrl()}/otds-oths/top-five/${name}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getThroneData = () => {
  return axios.get(`${getBaseApiUrl()}/cities/throne`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const ignoreUser = (userId) => {
  return axios.post(
    `${getBaseApiUrl()}/users/${userId}/ignore`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const attack = (userId) => {
  return axios.post(
    `${getBaseApiUrl()}/attack/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const mug = (userId) => {
  return axios.post(
    `${getBaseApiUrl()}/mug/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

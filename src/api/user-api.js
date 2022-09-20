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

export const searchForPlayers = (params) => {
  return axios.get(`http://127.0.0.1:8000/api/users/search?` + params, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getOthsAndOtds = () => {
  return axios.get(`http://127.0.0.1:8000/api/otds-oths`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getTopFiveOthOtd = (name) => {
  return axios.get(`http://127.0.0.1:8000/api/otds-oths/top-five/${name}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getThroneData = () => {
  return axios.get(`http://127.0.0.1:8000/api/cities/throne`, {
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

export const attack = (userId) => {
  return axios.post(
    `http://127.0.0.1:8000/api/attack/${userId}`,
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
    `http://127.0.0.1:8000/api/mug/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const checkIsInJob = () => {
  return axios.get(getBaseApiUrl() + '/jobs/is-in-job', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getClockIns = () => {
  return axios.get(getBaseApiUrl() + '/jobs/clock-ins', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const clockIn = () => {
  return axios.post(
    getBaseApiUrl() + '/jobs/clock-in',
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

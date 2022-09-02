import axios from 'axios';
import authService from '../services/auth/AuthService';

export const checkIsInJob = () => {
  return axios.get('http://127.0.0.1:8000/api/jobs/is-in-job', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getClockIns = () => {
  return axios.get('http://127.0.0.1:8000/api/jobs/clock-ins', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const clockIn = () => {
  return axios.post(
    'http://127.0.0.1:8000/api/jobs/clock-in',
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

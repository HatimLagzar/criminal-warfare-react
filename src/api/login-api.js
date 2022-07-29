import axios from 'axios';

export const login = (formData) => {
  return axios.post('/api/login', formData);
};

export const refresh = (token) => {
  return axios.post(
    '/api/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

import axios from 'axios';

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

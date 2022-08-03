import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getBankInfo = () => {
  return axios.get('http://127.0.0.1:8000/api/bank', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const withdrawMoney = (amount) => {
  return axios.post(
    'http://127.0.0.1:8000/api/bank/withdraw',
    {
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const depositMoney = (amount) => {
  return axios.post(
    'http://127.0.0.1:8000/api/bank/deposit',
    {
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

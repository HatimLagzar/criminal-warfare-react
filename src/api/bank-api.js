import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getBankInfo = () => {
  return axios.get(getBaseApiUrl() + '/bank', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const withdrawMoney = (amount) => {
  return axios.post(
    getBaseApiUrl() + '/bank/withdraw',
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
    getBaseApiUrl() + '/bank/deposit',
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

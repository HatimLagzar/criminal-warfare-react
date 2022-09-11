import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getConversations = (abortController) => {
  return axios.get(
    'http://127.0.0.1:8000/api/mailbox',
    {
      headers: {
        signal: abortController.signal,
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const createMailbox = (userId) => {
  return axios.post(
    'http://127.0.0.1:8000/api/mailbox/' + userId,
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

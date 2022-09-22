import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getChats = (includeAuthUser = true) => {
  return axios.get(getBaseApiUrl() + 'chat?' + (includeAuthUser ? 'include_user=1' : 'include_user=0'), {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const reportChat = (chatId) => {
  const formData = new FormData();
  formData.set('chatId', chatId);

  return axios.post(getBaseApiUrl() + 'chat/report', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const sendMessage = (message) => {
  const formData = new FormData();
  formData.set('message', message);

  return axios.post(getBaseApiUrl() + 'chat', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getChats = (includeAuthUser = true) => {
  return axios.get('http://127.0.0.1:8000/api/chat?' + (includeAuthUser ? 'include_user=1' : 'include_user=0'), {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const reportChat = (chatId) => {
  const formData = new FormData();
  formData.set('chatId', chatId);

  return axios.post('http://127.0.0.1:8000/api/chat/report', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const sendMessage = (message) => {
  const formData = new FormData();
  formData.set('message', message);

  return axios.post('http://127.0.0.1:8000/api/chat', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
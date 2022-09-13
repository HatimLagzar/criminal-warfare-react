import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getConversations = (abortController) => {
  return axios.get('http://127.0.0.1:8000/api/mailbox', {
    headers: {
      signal: abortController.signal,
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
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

export const sendMessage = (mailboxId, message) => {
  const formData = new FormData();
  formData.set('mailboxId', mailboxId);
  formData.set('message', message);

  return axios.post('http://127.0.0.1:8000/api/mailbox/message', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const reportMessageInMailbox = (messageId) => {
  return axios.post(
    `http://127.0.0.1:8000/api/mailbox/${messageId}/report`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const deleteMailbox = (mailboxId) => {
  return axios.delete('http://127.0.0.1:8000/api/mailbox/' + mailboxId, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getMailboxMessages = (mailboxId) => {
  return axios.get(
    'http://127.0.0.1:8000/api/mailbox/' + mailboxId + '/messages',
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getConversations = (abortController) => {
  return axios.get(getBaseApiUrl() + '/mailbox', {
    headers: {
      signal: abortController.signal,
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const createMailbox = (userId) => {
  return axios.post(
    getBaseApiUrl() + '/mailbox/' + userId,
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

  return axios.post(getBaseApiUrl() + '/mailbox/message', formData, {
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
  return axios.delete(getBaseApiUrl() + '/mailbox/' + mailboxId, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getMailboxMessages = (mailboxId) => {
  return axios.get(
    getBaseApiUrl() + '/mailbox/' + mailboxId + '/messages',
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

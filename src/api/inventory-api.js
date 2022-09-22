import axios from 'axios';
import authService from './../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getAuthenticatedUserInventory = () => {
  return axios.get(getBaseApiUrl() + '/inventory', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const unequipItem = (type) => {
  const formData = new FormData();
  formData.set('type', type);

  return axios.post(getBaseApiUrl() + '/inventory/unequip', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const equipItem = (type, itemId) => {
  const formData = new FormData();
  formData.set('type', type);

  return axios.post(
    getBaseApiUrl() + '/inventory/' + itemId + '/equip',
    formData,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const consumeItem = (itemId, targetId = null) => {
  const formData = new FormData();
  if (targetId !== null) {
    formData.set('targetId', targetId);
  }

  return axios.post(
    getBaseApiUrl() + '/inventory/' + itemId + '/use',
    formData,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

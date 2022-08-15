import axios from 'axios';
import authService from './../services/auth/AuthService';

export const getAuthenticatedUserInventory = () => {
  return axios.get('http://127.0.0.1:8000/api/inventory', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const unequipItem = (type) => {
  const formData = new FormData();
  formData.set('type', type);

  return axios.post('http://127.0.0.1:8000/api/inventory/unequip', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const equipItem = (type, itemId) => {
  const formData = new FormData();
  formData.set('type', type);

  return axios.post(
    'http://127.0.0.1:8000/api/inventory/' + itemId + '/equip',
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
    'http://127.0.0.1:8000/api/inventory/' + itemId + '/use',
    formData,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

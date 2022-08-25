import axios from "axios";
import authService from "../services/auth/AuthService";

export const getAllOperations = () => {
  return axios.get('http://127.0.0.1:8000/api/operations', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const toggleOperationsAutoStarter = () => {
  return axios.post('http://127.0.0.1:8000/api/operations/autostart', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const startOperation = (operationId) => {
  return axios.post('http://127.0.0.1:8000/api/operations/' + operationId + '/start', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const buyPremiumOperation = (opSet) => {
  const formData = new FormData();
  formData.set('opSet', opSet);

  return axios.post('http://127.0.0.1:8000/api/operations/premium/buy', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

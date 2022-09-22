import axios from "axios";
import authService from "../services/auth/AuthService";
import {getBaseApiUrl} from "./base-api";

export const getAllOperations = () => {
  return axios.get(getBaseApiUrl() + '/operations', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const toggleOperationsAutoStarter = () => {
  return axios.post(getBaseApiUrl() + '/operations/autostart', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const startOperation = (operationId) => {
  return axios.post(getBaseApiUrl() + '/operations/' + operationId + '/start', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const buyPremiumOperation = (opSet) => {
  const formData = new FormData();
  formData.set('opSet', opSet);

  return axios.post(getBaseApiUrl() + '/operations/premium/buy', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

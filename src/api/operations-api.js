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

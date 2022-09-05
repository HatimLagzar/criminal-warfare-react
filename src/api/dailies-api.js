import axios from "axios";
import authService from "../services/auth/AuthService";

export const getDailies = () => {
  return axios.get('http://127.0.0.1:8000/api/dailies', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
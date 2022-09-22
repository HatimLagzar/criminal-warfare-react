import axios from "axios";
import authService from "../services/auth/AuthService";
import {getBaseApiUrl} from "./base-api";

export const train = (type, energy) => {
  const formData = new FormData();
  formData.set('type', type);
  formData.set('energy', energy);

  return axios.post(
    getBaseApiUrl() + '/gym/train',
    formData,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

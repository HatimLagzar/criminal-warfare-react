import axios from "axios";
import authService from "../services/auth/AuthService";

export const train = (type, energy) => {
  const formData = new FormData();
  formData.set('type', type);
  formData.set('energy', energy);

  return axios.post(
    'http://127.0.0.1:8000/api/gym/train',
    formData,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

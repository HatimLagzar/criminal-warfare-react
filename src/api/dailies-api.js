import axios from "axios";
import authService from "../services/auth/AuthService";

export const getDailies = () => {
  return axios.get('http://127.0.0.1:8000/api/dailies', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const spinSlotMachine = (bet, turns) => {
  const formData = new FormData();
  formData.set('bet', bet);
  formData.set('turns', turns);

  return axios.post('http://127.0.0.1:8000/api/dailies/slot-machine', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}

export const searchDowntown = () => {
  return axios.post('http://127.0.0.1:8000/api/dailies/search-downtown', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}

export const playLuckyDip = () => {
  return axios.post('http://127.0.0.1:8000/api/dailies/lucky-dip', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}

export const runRussianRoulette = (bullets) => {
  const formData = new FormData();
  formData.set('bullets', bullets);

  return axios.post('http://127.0.0.1:8000/api/dailies/russian-roulette', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}
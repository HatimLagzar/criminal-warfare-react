import axios from "axios";
import authService from "../services/auth/AuthService";
import {getBaseApiUrl} from "./base-api";

export const getDailies = () => {
  return axios.get(getBaseApiUrl() + '/dailies', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getHighLowInfo = () => {
  return axios.get(getBaseApiUrl() + '/dailies/high-low', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const spinSlotMachine = (bet, turns) => {
  const formData = new FormData();
  formData.set('bet', bet);
  formData.set('turns', turns);

  return axios.post(getBaseApiUrl() + '/dailies/slot-machine', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}

export const searchDowntown = () => {
  return axios.post(getBaseApiUrl() + '/dailies/search-downtown', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}

export const playLuckyDip = () => {
  return axios.post(getBaseApiUrl() + '/dailies/lucky-dip', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}

/**
 *
 * @param choice {string}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const playHighLow = (choice) => {
  const formData = new FormData();
  formData.set('choice', choice);

  return axios.post(getBaseApiUrl() + '/dailies/high-low', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}

export const runRussianRoulette = (bullets) => {
  const formData = new FormData();
  formData.set('bullets', bullets);

  return axios.post(getBaseApiUrl() + '/dailies/russian-roulette', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}
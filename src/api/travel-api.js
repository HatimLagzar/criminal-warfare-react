import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

/**
 * Fetch all cities
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAllCities = () => {
  return axios.get(getBaseApiUrl() + '/cities', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

/**
 * Travel to another city
 *
 * @param cityId {int}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const travel = (cityId) => {
  return axios.post(getBaseApiUrl() + '/cities/' + cityId, {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

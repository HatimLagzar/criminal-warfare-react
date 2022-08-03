import axios from 'axios';
import authService from '../services/auth/AuthService';

/**
 * Fetch all cities
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAllCities = () => {
  return axios.get('http://127.0.0.1:8000/api/cities', {
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
  return axios.post('http://127.0.0.1:8000/api/cities/' + cityId, {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

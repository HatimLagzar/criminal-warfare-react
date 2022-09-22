import axios from "axios";
import authService from "../services/auth/AuthService";
import {getBaseApiUrl} from "./base-api";

export const getAllMissions = () => {
  return axios.get(getBaseApiUrl() + '/missions', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const startMission = (missionId) => {
  return axios.post(getBaseApiUrl() + '/missions/' + missionId + '/start', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

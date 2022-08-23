import axios from "axios";
import authService from "../services/auth/AuthService";

export const getAllMissions = () => {
  return axios.get('http://127.0.0.1:8000/api/missions', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const startMission = (missionId) => {
  return axios.post('http://127.0.0.1:8000/api/missions/' + missionId + '/start', {}, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

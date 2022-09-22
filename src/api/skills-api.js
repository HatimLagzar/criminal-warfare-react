import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getSkills = () => {
  return axios.get(getBaseApiUrl() + '/skills', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const enableSkill = (skillId, objective) => {
  const formData = new FormData();
  formData.set('objective', objective);

  return axios.post(
    getBaseApiUrl() + '/skills/' + skillId + '/enable',
    formData,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const upgradeSkill = (type) => {
  const formData = new FormData();
  formData.set('type', type);

  return axios.post(getBaseApiUrl() + '/skills/upgrade', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const downgradeSkill = (type) => {
  const formData = new FormData();
  formData.set('type', type);

  return axios.post(getBaseApiUrl() + '/skills/downgrade', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const submitSkillsUpgrades = () => {
  return axios.post(
    getBaseApiUrl() + '/skills/submit-upgrades',
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

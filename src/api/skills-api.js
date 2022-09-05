import axios from 'axios';
import authService from '../services/auth/AuthService';

export const getSkills = () => {
  return axios.get('http://127.0.0.1:8000/api/skills', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const enableSkill = (skillId, objective) => {
  const formData = new FormData();
  formData.set('objective', objective);

  return axios.post(
    'http://127.0.0.1:8000/api/skills/' + skillId + '/enable',
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

  return axios.post('http://127.0.0.1:8000/api/skills/upgrade', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const downgradeSkill = (type) => {
  const formData = new FormData();
  formData.set('type', type);

  return axios.post('http://127.0.0.1:8000/api/skills/downgrade', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const submitSkillsUpgrades = () => {
  return axios.post(
    'http://127.0.0.1:8000/api/skills/submit-upgrades',
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

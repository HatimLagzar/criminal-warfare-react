import React from 'react';
import { useSelector } from 'react-redux';
import authService from '../../services/auth/AuthService';

export default function useAuthenticationStatus() {
  const token = useSelector((state) => state.auth.token);

  return token !== null && authService.isExpired() === false;
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../services/auth/AuthService';
import userService from '../services/auth/UserService';
import { setGeneralInfo } from '../store/features/auth/authSlice';
import {
  setAttributes,
  setEquippedAttributes,
  setCriminalCareer,
  setBattleStats,
} from '../store/features/pages/homeSlice';
import { HTTP_OK } from '../utils/constants/response-codes';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import Middle from './Middle/Middle';
import Router from './Router/Router';

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token === null) {
      authService.restoreLogin(dispatch);
    }
  }, [token]);

  useEffect(() => {
    if (authService.isExpired() === false) {
      userService.fetchAuthenticatedUserInfo().then((response) => {
        if (response.status === HTTP_OK) {
          dispatch(setGeneralInfo(response.data.data.generalInfo));
          dispatch(setAttributes(response.data.data.attributes));
          dispatch(setBattleStats(response.data.data.battleStats));
          dispatch(setCriminalCareer(response.data.data.criminalCareer));
          dispatch(
            setEquippedAttributes(response.data.data.equippedAttributes)
          );
        }
      });
    }
  }, []);

  return (
    <>
      <Header />
      <Middle>
        <Router />
      </Middle>
      <Footer />
    </>
  );
}

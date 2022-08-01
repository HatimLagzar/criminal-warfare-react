import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../services/auth/AuthService';
import userService from '../services/auth/UserService';
import { setGeneralInfo } from '../store/features/auth/authSlice';
import { HTTP_OK } from '../utils/constants/response-codes';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import Middle from './Middle/Middle';
import Router from './Router/Router';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.restoreLogin(dispatch);

    if (authService.isExpired() === false) {
      userService.fetchAuthenticatedUserInfo().then((response) => {
        if (response.status === HTTP_OK) {
          dispatch(setGeneralInfo(response.data.data.generalInfo));
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

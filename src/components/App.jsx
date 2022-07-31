import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../services/auth/AuthService';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import Middle from './Middle/Middle';
import Router from './Router/Router';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.restoreLogin(dispatch);
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

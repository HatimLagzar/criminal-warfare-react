import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/Home/HomePage';
import LoginPage from '../../pages/Login/LoginPage';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}>
        <Route path='login' element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

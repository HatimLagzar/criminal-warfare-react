import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/Home/HomePage';
import LoginPage from '../../pages/Login/LoginPage';
import TravelPage from '../../pages/Travel/TravelPage';
import BankPage from "../../pages/Bank/BankPage";

export default function Router() {
  return (
    <Routes>
      <Route path='/' exact element={<HomePage />} />
      <Route path='travel' exact element={<TravelPage />} />
      <Route path='bank' exact element={<BankPage />} />
      <Route path='login' exact element={<LoginPage />} />
    </Routes>
  );
}

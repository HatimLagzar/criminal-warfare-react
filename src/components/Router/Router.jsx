import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from '../../pages/Home/HomePage';
import LoginPage from '../../pages/Login/LoginPage';
import TravelPage from '../../pages/Travel/TravelPage';
import BankPage from '../../pages/Bank/BankPage';
import InventoryPage from '../../pages/Inventory/InventoryPage';
import CrimePage from "../../pages/Crime/CrimePage";

export default function Router() {
  return (
    <Routes>
      <Route path='login' exact element={<LoginPage />} />
      <Route path='/' exact element={<HomePage />} />
      <Route path='travel' exact element={<TravelPage />} />
      <Route path='bank' exact element={<BankPage />} />
      <Route path='crime' exact element={<CrimePage />} />
      <Route path='inventory' exact element={<InventoryPage />} />
    </Routes>
  );
}

import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from '../../pages/Home/HomePage';
import LoginPage from '../../pages/Login/LoginPage';
import TravelPage from '../../pages/Travel/TravelPage';
import BankPage from '../../pages/Bank/BankPage';
import InventoryPage from '../../pages/Inventory/InventoryPage';
import CrimePage from '../../pages/Crime/CrimePage';
import GymPage from '../../pages/Gym/GymPage';
import MissionsPage from '../../pages/Missions/MissionsPage';
import OperationsPage from '../../pages/Operations/OperationsPage';
import JobsPage from '../../pages/Jobs/JobsPage';
import AchievementsPage from '../../pages/Achievements/AchievementsPage';
import ArenaPage from '../../pages/Arena/ArenaPage';
import SkillsPage from '../../pages/Skills/SkillsPage';
import DailiesPage from "../../pages/Dailies/DailiesPage";
import SlotMachinePage from "../../pages/SlotMachine/SlotMachinePage";
import SearchDowntownPage from "../../pages/SearchDowntown/SearchDowntownPage";
import RussianRoulettePage from "../../pages/RussianRoulette/RussianRoulettePage";

export default function Router() {
  return (
    <Routes>
      <Route path='login' exact element={<LoginPage />} />
      <Route path='/' exact element={<HomePage />} />
      <Route path='travel' exact element={<TravelPage />} />
      <Route path='bank' exact element={<BankPage />} />
      <Route path='crime' exact element={<CrimePage />} />
      <Route path='inventory' exact element={<InventoryPage />} />
      <Route path='gym' exact element={<GymPage />} />
      <Route path='missions' exact element={<MissionsPage />} />
      <Route path='operations' exact element={<OperationsPage />} />
      <Route path='jobs' exact element={<JobsPage />} />
      <Route path='achievements' exact element={<AchievementsPage />} />
      <Route path='arena' exact element={<ArenaPage />} />
      <Route path='skills' exact element={<SkillsPage />} />
      <Route path='dailies' exact element={<DailiesPage />} />
      <Route path='slot-machine' exact element={<SlotMachinePage />} />
      <Route path='search-downtown' exact element={<SearchDowntownPage />} />
      <Route path='russian-roulette' exact element={<RussianRoulettePage />} />
    </Routes>
  );
}

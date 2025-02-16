import React from "react";
import { Routes, Route } from "react-router";
import HomeView from "./features/home/HomeView";
import SettingsView from "./features/settings/SettingsView";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/settings" element={<SettingsView />} />
      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;

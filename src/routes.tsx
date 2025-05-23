import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/Layout";
import HomePage from "./pages/Home";

const AppRoutes: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;

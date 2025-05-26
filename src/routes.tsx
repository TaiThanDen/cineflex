import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";
import HomePage from "./pages/Home";
import PreviewFilm from "./pages/PreviewFilm";
import AdsPage from "../src/components/AdsPage";

const AppRoutes: React.FC = () => {
  return (
    <>
      <div className="w-screen">
        <Navbar />
        <Routes>
          {/* Định tuyến đến HeroBanner */}
          <Route path="/" element={<HomePage />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/preview/:id" element={<PreviewFilm />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default AppRoutes;

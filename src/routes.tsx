import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";
import HomePage from "./pages/Home";

const AppRoutes: React.FC = () => {
  return (
    <>
      <div className="w-screen">
        <Navbar />
        <Routes>
          {/* Định tuyến đến HeroBanner */}
          <Route path="/" element={<HomePage />} />
          {/* Thêm các Route khác nếu cần */}
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default AppRoutes;

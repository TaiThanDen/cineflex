import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./layout/footer";
import HomePage from "./pages/Home";
import { useIsMobile } from "./lib/hooks/use-mobile";
import VerticalSidebar from "./layout/VerticalSidebar";
import MobileBottomSidebar from "./layout/MobileBottomSidebar";
import { useRef, useState } from "react";
import PreviewFilm from "./pages/PreviewFilm";
import AdsPage from "../src/components/AdsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";
import Continue from "./pages/continue";
import WatchFilm from "./pages/WatchFilm";

const AppRoutes = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="w-full h-screen">
      <div className="flex h-full w-screen">
        {!isMobile && <VerticalSidebar />}
        <div
          ref={containerRef}
          className="w-full h-full overflow-y-auto relative"
          onScroll={() => {
            const container = containerRef.current;
            if (!container) return;

            setScrolled(container.scrollTop > 100);
          }}
        >
          <Navbar scrolled={scrolled} />
          {/* Hide VerticalSidebar on mobile */}
          <div className="absolute top-0 left-0 w-full h-max">
            <Routes>
              {/* Định tuyến đến HeroBanner */}
              <Route path="/" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/ads" element={<AdsPage />} />
              <Route path="/preview/:id" element={<PreviewFilm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/continue" element={<Continue />} />
              <Route path="/watch" element={<WatchFilm />} />
            </Routes>
            <Footer />
          </div>
          {isMobile && <MobileBottomSidebar />}
        </div>
      </div>
    </div>
  );
};

export default AppRoutes;

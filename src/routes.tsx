import { Routes, Route } from "react-router";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";
import HomePage from "./pages/Home";
import { useIsMobile } from "./lib/hooks/use-mobile";
import VerticalSidebar from "./layout/VerticalSidebar";
import MobileBottomSidebar from "./layout/MobileBottomSidebar";

const AppRoutes = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-screen">
      <div className="flex h-full w-screen">
        {!isMobile && <VerticalSidebar />}
        <div className="w-full h-full overflow-y-auto relative">
          <Navbar />
          {/* Hide VerticalSidebar on mobile */}
          <div className="absolute top-0 left-0 w-full h-max">
            <Routes>
              {/* Định tuyến đến HeroBanner */}
              <Route path="/" element={<HomePage />} />
              {/* Thêm các Route khác nếu cần */}
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

import { Routes, Route, matchPath, useLocation, Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./layout/footer";
import HomePage from "./pages/Home";
import { useIsMobile } from "./lib/hooks/use-mobile";
import VerticalSidebar from "./layout/VerticalSidebar";
import MobileBottomSidebar from "./layout/MobileBottomSidebar";
import { useRef, useState } from "react";
import PreviewFilm from "./pages/PreviewFilm";
import MobilePreviewFilm from "./components/PreviewFilm/MobilePreviewFilm";
import AdsPage from "./pages/AdsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";
import Continue from "./pages/continue";
import WatchFilm from "./pages/WatchFilm";
import SubscriptionPlan from "./pages/SubscriptionPlan";
import PlanPaymentConfirm from "./pages/PlanPaymentConfirm";
import AdminPage from "./pages/admin/admin";
import MovieAdminPage from "./pages/admin/MovieAdminPage";
import UserAdminPage from "./pages/admin/UserAdminPage.tsx"
import LayoutAdmin from "./layout/LayoutAdmin";
const AppRoutes = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Thêm dòng này

  const isWatchPage =
    matchPath("/watch/:id", location.pathname) ||
    location.pathname === "/watch";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="w-full h-screen">
      <div className="flex h-full w-screen">
        {/* Ẩn VerticalSidebar khi ở đầu trang /watch, chỉ hiện khi scroll */}
        {!isMobile && !isAdminPage && (!isWatchPage || scrolled) && (
          <VerticalSidebar />
        )}
        <div
          ref={containerRef}
          className="w-full scrollbar-hide h-full overflow-y-auto relative"
          onScroll={() => {
            const container = containerRef.current;
            if (!container) return;

            setScrolled(container.scrollTop > 100);
          }}
        >
          {/* Chỉ render Navbar khi KHÔNG phải trang /watch, hoặc đã scroll ở /watch */}
          {!isAdminPage && (location.pathname !== "/watch" || scrolled) ? (
            <Navbar scrolled={scrolled} />
          ) : null}
          {/* Hide VerticalSidebar on mobile */}
          <div className="absolute top-0 left-0 w-full h-max">
            <Routes>
              {/* Các route public */}
              <Route path="/" element={<HomePage />} />
              <Route path="/ads" element={<AdsPage />} />
              <Route
                path="/preview/:id"
                element={isMobile ? <MobilePreviewFilm /> : <PreviewFilm />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/continue" element={<Continue />} />
              <Route path="/watch" element={<WatchFilm />} />
              <Route path="/plans" element={<SubscriptionPlan />} />
              <Route path="/payment" element={<PlanPaymentConfirm />} />
              {/* Route admin bọc bằng LayoutAdmin */}
              <Route
                path="/admin"
                element={
                  <LayoutAdmin>
                    {" "}
                    <Outlet />{" "}
                  </LayoutAdmin>
                }
              >

                <Route path="dashboard" element={<AdminPage />} />
                <Route path="movies" element={<MovieAdminPage />}>
                  <Route path=":id" element={<MovieAdminPage />} />
                </Route>
                {/* Thêm các route admin khác ở đây */}
                <Route path="users" element={<UserAdminPage />} />
                <Route path="users/:id" element={<UserAdminPage />} />
              </Route>
            </Routes>
            <Footer />
          </div>
          {/* Chỉ render MobileBottomSidebar khi KHÔNG phải trang admin */}
          {isMobile && !isAdminPage && <MobileBottomSidebar />}
        </div>
      </div>
    </div>
  );
};

export default AppRoutes;

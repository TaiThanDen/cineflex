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
import UserAdminPage from "./pages/admin/UserAdminPage.tsx";
import LayoutAdmin from "./layout/LayoutAdmin";
import LayoutModerator from "./layout/LayoutModerator";
import CommentModeratorPage from "@/pages/moderator/CommentModeratorPage.tsx"; // <- bạn cần tạo file này nếu chưa có
import AllCommentsPage from "./components/moderator/AllCommentManagement/AllCommentPage.tsx";
import ReportsPage from "./components/moderator/ReportComment/ReportsPage.tsx";

const AppRoutes = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isWatchPage =
      matchPath("/watch/:id", location.pathname) ||
      location.pathname === "/watch";

  const isAdminPage = location.pathname.startsWith("/admin");
  const isModeratorPage = location.pathname.startsWith("/moderator");

  return (
      <div className="w-full h-screen">
        <div className="flex h-full w-screen">
          {!isMobile && !isAdminPage && !isModeratorPage && (!isWatchPage || scrolled) && (
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
            {!isAdminPage && !isModeratorPage && (location.pathname !== "/watch" || scrolled) && (
                <Navbar scrolled={scrolled} />
            )}

            <div className="absolute top-0 left-0 w-full h-max">
              <Routes>
                {/* Public routes */}
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

                {/* Admin routes */}
                <Route path="/admin" element={<LayoutAdmin><Outlet /></LayoutAdmin>}>
                  <Route path="dashboard" element={<AdminPage />} />
                  <Route path="movies" element={<MovieAdminPage />} />
                  <Route path="movies/:id" element={<MovieAdminPage />} />
                  <Route path="users" element={<UserAdminPage />} />
                  <Route path="users/:id" element={<UserAdminPage />} />
                </Route>

                {/* ✅ Moderator routes */}
                <Route path="/moderator" element={<LayoutModerator><Outlet /></LayoutModerator>}>
                  <Route path="/moderator/comment/:id" element={<CommentModeratorPage />} />
                  <Route path="/moderator/comment" element={<CommentModeratorPage />} />
                  <Route path="/moderator/all-comments" element={<AllCommentsPage />} />
                  <Route path="/moderator/reports" element={<ReportsPage />} />
                </Route>
              </Routes>
              <Footer />
            </div>

            {isMobile && !isAdminPage && !isModeratorPage && <MobileBottomSidebar />}
          </div>
        </div>
      </div>
  );
};

export default AppRoutes;

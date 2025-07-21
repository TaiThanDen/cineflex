import { Routes, Route, matchPath, useLocation, Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./layout/footer";
import HomePage from "./pages/Home";
import { useIsMobile } from "./lib/hooks/use-mobile";
import VerticalSidebar from "./layout/VerticalSidebar";
import MobileBottomSidebar from "./layout/MobileBottomSidebar";
import { useEffect, useRef, useState } from "react";
import PreviewFilm from "./pages/PreviewFilm";
import AdsPage from "./pages/AdsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";
import Continue from "./pages/continue";
import WatchFilm from "./pages/WatchFilm";
import SubscriptionPlan from "./pages/SubscriptionPlan";
// import PlanPaymentConfirm from "./pages/PlanPaymentConfirm";
import AdminPage from "./pages/admin/admin";
import UserAdminPage from "./pages/admin/UserAdminPage.tsx"
import LayoutAdmin from "./layout/LayoutAdmin";
import Landing from "./pages/landing.tsx";
import MailVerify from "./pages/mail-verify.tsx";
import Checkout from "./pages/CheckOut.tsx";
import AuthGuard from "./lib/route-guard/AuthGuard.tsx";
import AdminGuard from "./lib/route-guard/AdminGuard.tsx";
import SearchResults from "./pages/SearchResults";
import CommentModeratorPage from "@/pages/moderator/CommentModeratorPage.tsx";
import AllCommentsPage from "@/components/moderator/AllCommentManagement/AllCommentPage.tsx";
import ReportsPage from "@/components/moderator/ReportComment/ReportsPage.tsx";
import LayoutModerator from "@/layout/LayoutModerator.tsx";
import ShowAdminPage from "./pages/admin/ShowAdminPage.tsx";
import ShowDetailAdminPage from "./pages/admin/ShowDetailAdminPage.tsx";
import { useQuery } from "@tanstack/react-query";
import { isCurrentUserHasSubscription } from "./lib/api.ts";
import Subscription from "./context/Subscription.tsx";



const AppRoutes = () => {
  const subscriptionResult = useQuery({
    queryKey: ["user-subscription"],
    queryFn: () => isCurrentUserHasSubscription(),
  });
  
  const [subscription, setSubscription] = useState(false)
  useEffect(() => {
    if (subscriptionResult.isSuccess) {
      setSubscription(subscriptionResult.data);
    }
  }, [subscriptionResult.data, subscriptionResult.isSuccess])

  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isWatchPage =
    matchPath("/watch/:id", location.pathname) ||
    location.pathname === "/watch";
  const isAdminPage = location.pathname.startsWith("/admin");
  const isModeratorPage = location.pathname.startsWith("/moderator");
  const isLandingPage = location.pathname === "/";



  return (
    <Subscription.Provider value={subscription}>
    <div className="w-full h-screen">
      <div className="flex h-full w-screen">
        {/* Ẩn VerticalSidebar khi ở đầu trang /watch, chỉ hiện khi scroll */}
        {!isMobile && !isAdminPage && !isModeratorPage && !isLandingPage && (!isWatchPage || scrolled) && (
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
          {!isAdminPage && !isModeratorPage && (location.pathname !== "/watch" || scrolled) ? (
            <Navbar scrolled={scrolled} />
          ) : null}
          {/* Hide VerticalSidebar on mobile */}
          <div className="absolute top-0 left-0 w-full h-max">
            <Routes>
              {/* Các route public */}
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/ads" element={<AdsPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route
                path="/preview/:id"
                element={<PreviewFilm />}
              />
              <Route path="/login" element={
                <AuthGuard type="no">
                  <Login />
                </AuthGuard>
              } />
              <Route path="/register" element={
                <AuthGuard type="no">
                  <Register />
                </AuthGuard>
              } />
              <Route path="/profile" element={
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              } />
              <Route path="/continue" element={
              <AuthGuard>
                <Continue />
              </AuthGuard>} />
              <Route path="/watch/:id" element={<WatchFilm />} />
              <Route path="/plans" element={
                <AuthGuard>
                  <SubscriptionPlan />
                </AuthGuard>
              } />
              <Route path="/verify" element={<MailVerify />} />
              {/* <Route path="/payment" element={<PlanPaymentConfirm />} /> */}
              <Route path="/checkout/:id" element={
                <AuthGuard>
                  <Checkout />
                </AuthGuard>
              } />
              {/* Route admin bọc bằng LayoutAdmin */}
              <Route
                path="/admin"
                element={
                  <AdminGuard allowed={[2]}>
                    <LayoutAdmin>
                      <Outlet />
                    </LayoutAdmin>
                  </AdminGuard>
                }
              >

                <Route path="dashboard" element={<AdminPage />} />
                <Route path="movies" element={<ShowAdminPage />} />
                <Route path="movies/:id" element={<ShowDetailAdminPage />} />
                {/* Thêm các route admin khác ở đây */}
                <Route path="users" element={<UserAdminPage />} >
                  <Route path=":id" element={<UserAdminPage />} />
                </Route>
              </Route>
              {/* Moderator routes */}
              <Route
                  path="/moderator"
                  element={
                    <LayoutModerator>
                      <Outlet />
                    </LayoutModerator>
                  }
              >
                <Route path="comment/:id" element={<CommentModeratorPage />} />
                <Route path="comment" element={<CommentModeratorPage />} />
                <Route path="all-comments" element={<AllCommentsPage />} />
                <Route path="reports" element={<ReportsPage />} />
              </Route>
            </Routes>
            <Footer />
          </div>
          {/* Chỉ render MobileBottomSidebar khi KHÔNG phải trang admin */}
          {isMobile &&  !isModeratorPage && !isAdminPage && <MobileBottomSidebar />}
        </div>
      </div>
    </div>
    </Subscription.Provider>
  );
};

export default AppRoutes;

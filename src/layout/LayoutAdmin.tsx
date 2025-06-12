import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import VerticalSidebarAdmin from "../components/admin/LayoutAdmin/VerticalSidebar_admin";
import { FiMenu } from "react-icons/fi";

interface Props {
  children: ReactNode;
}

const LayoutAdmin = ({ children }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Đóng sidebar khi resize về desktop
  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-[#f6f8fa] relative">
      {/* Sidebar cho desktop */}
      {!isMobile && <VerticalSidebarAdmin />}
      {/* Sidebar cho mobile */}
      {isMobile && (
        <>
          <button
            className="fixed top-4 left-4 z-50 bg-white rounded-full shadow p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FiMenu size={24} />
          </button>
          {/* Overlay */}
          <div
            className={`fixed inset-0 z-40   ${
              sidebarOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar trượt ra */}
          <div
            className={`fixed top-0 left-0 h-full z-50 transition-transform  ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ width: 250, maxWidth: "80vw" }}
          >
            <VerticalSidebarAdmin />
          </div>
        </>
      )}
      <main className="flex-1 min-w-0 w-full relative z-0">{children}</main>
    </div>
  );
};

export default LayoutAdmin;

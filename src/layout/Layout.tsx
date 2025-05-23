import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import VerticalSidebar from "./VerticalSidebar";
import MobileBottomSidebar from "./MobileBottomSidebar";

interface props { children: ReactNode }

const Layout = ({ children }: props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#384230]">
      <Navbar />
      {!isMobile && <VerticalSidebar />}
      <div className={isMobile ? " pb-20" : "ml-16 "}>{children}</div>
      {isMobile && <MobileBottomSidebar />}
      <Footer />
    </div>
  );
};

export default Layout;

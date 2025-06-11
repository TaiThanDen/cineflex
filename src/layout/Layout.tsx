import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "./footer";
import VerticalSidebar from "./VerticalSidebar";
import MobileBottomSidebar from "./MobileBottomSidebar";

interface props {
  children: ReactNode;
}

const Layout = ({ children }: props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#384230]">
      {scrolled && <Navbar scrolled={scrolled} />}
      {!isMobile && <VerticalSidebar />}
      <div className={isMobile ? " pb-20" : "ml-16 "}>{children}</div>
      {isMobile && <MobileBottomSidebar />}
      <Footer />
    </div>
  );
};

export default Layout;

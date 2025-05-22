import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import MobileHeroBanner from "../components/MobileHeroBanner";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return <>{isMobile ? <MobileHeroBanner /> : <HeroBanner />}</>;
};

export default HomePage;

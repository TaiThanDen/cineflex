import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import MobileHeroBanner from "../components/MobileHeroBanner";
import ListFilms from "./ListFilms";
import AdBanner from "../components/AdBanner";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile ? <MobileHeroBanner /> : <HeroBanner />}
      <ListFilms />
      <AdBanner />
    </>
  );
};

export default HomePage;

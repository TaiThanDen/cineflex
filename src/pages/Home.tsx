import { useEffect, useState } from "react";
import FilmsMobileBanner from "../components/home/FilmsMobileBanner";
import ListFilms from "../components/home/ListFilms";
import AdBanner from "../components/AdBanner";
import FilmsHeroBanner from "../components/home/FilmsHeroBanner";
import AnimeHeroBanner from "../components/home/AnimeHeroBanner";
import AnimeMobileBanner from "../components/home/AnimeMobileBanner";
import VerticalSidebar from "../layout/VerticalSidebar"; // Thêm dòng này
import MobileBottomSidebar from "../layout/MobileBottomSidebar";
const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#384230]">
      {/* Hide VerticalSidebar on mobile */}
      {!isMobile && <VerticalSidebar />}
      <>
        {isMobile ? <FilmsMobileBanner /> : <FilmsHeroBanner />}
        <ListFilms />
        <AdBanner />
        {isMobile ? <AnimeMobileBanner /> : <AnimeHeroBanner />}
      </>

      {isMobile && <MobileBottomSidebar />}
    </div>
  );
};

export default HomePage;

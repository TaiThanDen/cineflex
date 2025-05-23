import { useEffect, useState } from "react";
import FilmsMobileBanner from "../components/home/FilmsMobileBanner";
import ListFilms from "../components/home/ListFilms";
import AdBanner from "../components/AdBanner";
import FilmsHeroBanner from "../components/home/FilmsHeroBanner";
import AnimeHeroBanner from "../components/home/AnimeHeroBanner";
import AnimeMobileBanner from "../components/home/AnimeMobileBanner";

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
      {isMobile ? <FilmsMobileBanner /> : <FilmsHeroBanner />}
      <ListFilms />
      <AdBanner />
      {isMobile ? <AnimeMobileBanner /> : <AnimeHeroBanner />}
    </>
  );
};

export default HomePage;

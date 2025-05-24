import ListFilms from "../components/home/ListFilms";
import AdBanner from "../components/AdBanner";
import AnimeHeroBanner from "../components/home/AnimeHeroBanner";
import AnimeMobileBanner from "../components/home/AnimeMobileBanner";
import { useIsMobile } from "../lib/hooks/use-mobile";
import FilmsMobileBanner from "@/components/home/FilmsMobileBanner";
import FilmsHeroBanner from "@/components/home/FilmsHeroBanner";
import ListAnime from "@/components/home/ListAnime";

const HomePage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative h-max bg-[#384230]">
      {isMobile ? <FilmsMobileBanner /> : <FilmsHeroBanner />}

      <ListFilms />
      <AdBanner />

      {isMobile ? <AnimeMobileBanner /> : <AnimeHeroBanner />}

      <ListAnime />
    </div>
  );
};

export default HomePage;

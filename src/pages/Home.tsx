import ListFilms from "../components/home/ListFilms";
import ListAnime from "@/components/home/ListAnime";
import Partners from "@/pages/Partners";
import FilmsBanner from "@/components/home/FilmsBanner";
import AnimeBanner from "@/components/home/AnimeBanner";
import RankingFavoriteMovies from "@/components/home/RankingFavoriteMovies";
// import FilmsBanner from "@/components/home/FilmsBanner";
import ContinueWatchings from "@/components/history/ContinueWatchingSection";
const HomePage = () => {

  return (
    <div className="relative h-max ">
      <FilmsBanner />
      <ContinueWatchings />
      <ListFilms />
      <Partners />
      <RankingFavoriteMovies />
      <AnimeBanner />
      <ListAnime />
    </div>
  );
};

export default HomePage;

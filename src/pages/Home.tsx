import ListFilms from "../components/home/ListFilms";
import ListAnime from "@/components/home/ListAnime";
import Partners from "@/pages/Partners";
import FilmsBanner from "@/components/home/FilmsBanner";
import AnimeBanner from "@/components/home/AnimeBanner";
// import FilmsBanner from "@/components/home/FilmsBanner";
const HomePage = () => {

  return (
    <div className="relative h-max bg-[#384230]">
      <FilmsBanner />

      <ListFilms />
      <Partners />

      <AnimeBanner />

      <ListAnime />
    </div>
  );
};

export default HomePage;

import { useParams } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import SeasonEpisodeList from "../components/PreviewFilm/SeasonEpisodeList";
import { unifiedData } from "../components/data/mockdata";
import CommentSection from "../components/CommentSection";
import RecommendedList from "@/components/RecommendedList";

const PreviewFilm = () => {
  const { id } = useParams();
  // Tìm cả film và anime
  const movie = unifiedData.find((m) => m.id === id);

  if (!movie) return <p className="text-white p-8">⚠️ Movie not found</p>;

  return (
    <div className="min-h-screen bg-[#23263a] text-white">
      <HeroBanner items={[movie]}>
        <SeasonEpisodeList
          seasonsData={
            movie.seasonsData || [{ season: 1, episodes: movie.episodes || [] }]
          }
        />
      </HeroBanner>
      <div className="flex flex-col lg:flex-row gap-8 text-white mt-10 px-6 bg-[#23263a]">
        <RecommendedList />
        <CommentSection />
      </div>
    </div>
  );
};

export default PreviewFilm;

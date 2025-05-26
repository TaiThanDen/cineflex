import { useParams } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import SeasonEpisodeList from "../components/PreviewFilm/SeasonEpisodeList";
import { unifiedData } from "../components/data/mockdata";

const PreviewFilm = () => {
  const { id } = useParams();
  // Tìm cả film và anime
  const movie = unifiedData.find((m) => m.id === id);

  if (!movie) return <p className="text-white p-8">⚠️ Movie not found</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroBanner items={[movie]}>
        <SeasonEpisodeList
          seasonsData={
            movie.seasonsData || [{ season: 1, episodes: movie.episodes || [] }]
          }
        />
      </HeroBanner>
    </div>
  );
};

export default PreviewFilm;

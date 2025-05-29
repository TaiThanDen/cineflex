import { useParams } from "react-router-dom";
import { unifiedData } from "../data/mockdata";
import HeroBanner from "../HeroBanner";
import type { MovieItem } from "../data/Movie";

const PreviewFilmBanner = () => {
  const { id } = useParams();

  const allItems: MovieItem[] = unifiedData;
  const movie = allItems.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="text-white text-center py-20">
        ⚠️ Movie not found with id: <b>{id}</b>
      </div>
    );
  }

  return <HeroBanner items={[movie]}></HeroBanner>;
};

export default PreviewFilmBanner;

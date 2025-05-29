import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { unifiedData } from "../data/mockdata";
import HeroBanner from "../HeroBanner";
import type { MovieItem } from "../data/Movie";

const PreviewFilmBanner = () => {
  const { id } = useParams();

  const allItems: MovieItem[] = unifiedData;
  const movie = allItems.find((m) => m.id === id);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [movie]);

  if (!movie) {
    return (
      <div className="text-white text-center py-20">
        ⚠️ Movie not found with id: <b>{id}</b>
      </div>
    );
  }

  return (
    <HeroBanner
      items={[movie]}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  );
};

export default PreviewFilmBanner;

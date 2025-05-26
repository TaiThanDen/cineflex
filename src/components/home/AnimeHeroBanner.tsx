import PopularAnimeSection from "./PopularAnimeSection";
import { unifiedData } from "../data/mockdata";
import { useState } from "react";
import type { MovieItem } from "../data/Movie";
import HeroBanner from "../HeroBanner";

const AnimeHeroBanner = () => {
  const AnimeData: MovieItem[] = unifiedData
    .filter((item) => item.type === "anime")
    .map((item) => ({
      ...item,
      episodes: item.episodes ?? [],
    }));

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (AnimeData.length === 0) {
    return (
      <div className="text-white text-center py-20">⚠️ No anime found.</div>
    );
  }

  const selected = AnimeData[selectedIndex];

  const handleSelect = (_: MovieItem, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <HeroBanner items={[selected]}>
      <PopularAnimeSection
        items={AnimeData}
        selectedTitle={selected.title}
        onSelect={handleSelect}
      />
    </HeroBanner>
  );
};

export default AnimeHeroBanner;

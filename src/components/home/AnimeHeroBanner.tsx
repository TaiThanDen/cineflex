import HeroBanner from "../HeroBanner";
import { unifiedData } from "../data/mockdata";
import { useState } from "react";
import PopularAnimeSection from "./PopularAnimeSection";
import type { AnimeItem } from "../data/AnimeItem"; // Use AnimeItem

const AnimeHeroBanner = () => {
  // Ensure episodes is always present for AnimeItem
  const AnimeData: AnimeItem[] = unifiedData
    .filter((item) => item.type === "anime")
    .map((item) => ({
      ...item,
      episodes: item.episodes ?? [],
    }));

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle empty AnimeData
  if (AnimeData.length === 0) {
    return (
      <div className="text-white text-center py-20">⚠️ No anime found.</div>
    );
  }

  const selected = AnimeData[selectedIndex];

  const handleSelect = (_: AnimeItem, index: number) => {
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

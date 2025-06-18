import { unifiedData } from "../data/mockdata";
import { useState } from "react";
import HeroBanner from "../HeroBanner";
import PopularFilmSection from "./PopularFilmSection";
import type { Show } from "@/lib/types/Show";

const AnimeHeroBanner = () => {
  const filmData = unifiedData;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = filmData[selectedIndex];

  const handleSelect = (_: Show, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <HeroBanner item={selected}>
      <PopularFilmSection
        items={filmData}
        selectedTitle={selected.title}
        onSelect={handleSelect}
      />
    </HeroBanner>
  );
};

export default AnimeHeroBanner;
